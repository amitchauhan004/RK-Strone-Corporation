// Only apply Google DNS fallback locally on Windows to prevent querySrv ECONNREFUSED
// Do NOT run on Vercel / AWS Lambda as modifying system DNS is restricted or breaks VPC resolution
if (!process.env.VERCEL && process.platform === 'win32') {
  try {
    const dns = require('dns');
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (dnsErr) {
    console.warn('DNS server override skipped:', dnsErr.message);
  }
}

const express = require('express');
const cors = require('cors');

// CORS configuration - dynamic origin to support all deployed frontend URLs and localhost
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server) or any web origin
    return callback(null, true);
  },
  credentials: true
};
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Detect serverless environment (Vercel, AWS Lambda)
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

// Serverless-ready MongoDB connection helper with caching
let isConnecting = false;
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return true;
  if (isConnecting) return false;
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI environment variable is missing in process.env.');
    return false;
  }
  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      bufferCommands: false, // Don't buffer commands indefinitely if disconnected
    });
    console.log('MongoDB Atlas connected successfully');
    if (typeof ensureAdminUser === 'function') {
      ensureAdminUser().catch(e => console.warn('Admin seed non-fatal warning:', e.message));
    }
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    return false;
  } finally {
    isConnecting = false;
  }
};

// Initial connection for traditional hosting / local dev (non-blocking)
if (!isServerless && process.env.MONGODB_URI) {
  connectDB().catch(() => {});
}

// Product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: { type: String, default: '' },
  code: { type: String, default: '' },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: 'piece' },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  stoneType: { type: String, default: '' },
  description: { type: String, default: '' },
  descriptionHi: { type: String, default: '' },
  features: { type: [String], default: [] },
  dimensions: { type: String, default: '' },
  leadTime: { type: String, default: '20-25 Days' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS with configured options
app.use(cors(corsOptions));
app.use(express.json());

// Fast Root & Healthcheck endpoints (never blocked by DB connection)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'RK Stone Corporation API',
    database: mongoose.connection.readyState >= 1 ? 'connected' : (process.env.MONGODB_URI ? 'connecting' : 'not_configured'),
    environment: isServerless ? 'vercel-serverless' : 'traditional-server',
    time: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    databaseState: mongoose.connection.readyState,
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    hasCloudinary: Boolean(process.env.CLOUDINARY_CLOUD_NAME)
  });
});

// Middleware: connect to MongoDB for API endpoints if not connected
app.use(async (req, res, next) => {
  // Skip DB connection for root health endpoints
  if (req.path === '/' || req.path === '/api/health') {
    return next();
  }
  if (mongoose.connection.readyState < 1) {
    try {
      await connectDB();
    } catch (_) {}
  }
  next();
});

// Client drawings, photos and attachments directory (safe for serverless read-only filesystem)
const uploadsDir = isServerless
  ? path.join('/tmp', 'uploads', 'inquiries')
  : path.join(__dirname, 'uploads', 'inquiries');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (fsErr) {
  console.warn('Upload directory creation skipped (safe fallback):', fsErr.message);
}

if (!isServerless) {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
} else {
  try {
    app.use('/uploads', express.static('/tmp/uploads'));
  } catch (_) {}
}

// Attachment sub-schema for client blueprints, photos, CAD files, ZIPs
const attachmentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, default: '' },
  fileType: { type: String, default: '' },
  size: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

// Inquiry model
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  projectType: { type: String, default: 'General Inquiry' },
  stonePreference: { type: String, default: 'Not Specified' },
  message: { type: String, required: true },
  source: { type: String, default: 'Website Form' },
  city: { type: String, default: '' },
  address: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  productName: { type: String, default: '' },
  estimatedBudget: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'In Design', 'Quoted', 'Completed'], default: 'New' },
  notes: { type: String, default: '' },
  attachments: { type: [attachmentSchema], default: [] },
  photos: { type: [String], default: [] }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);



// Site Settings Model & Defaults
const DEFAULT_SITE_SETTINGS = {
  // 1. Company Identity & Credentials
  companyName: "RK Stone Corporation",
  tagline: "Direct Quarry Sourcing • Pan-India Installation",
  gstNumber: "08CUUPS3588K1ZE",
  workingHours: "Mon - Sun: 8:00 AM - 7:00 PM",
  businessNature: "Manufacturer, Supplier",
  businessStatus: "Individual - Proprietor",

  // 2. Hotlines & Workshop Location
  primaryPhone: "+91 94147 84562",
  whatsappNumber: "+91 94147 84562",
  email: "contact@rkstonecorporation.com",
  workshopCity: "Jaipur, Rajasthan",
  workshopAddress: "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India",

  // 3. Top Marquee Announcement Bar (No hardcoded default text line)
  announcementActive: false,
  announcementText: "",

  // 4. Hero Section Content (Homepage 3 Slides & CTA)
  heroBadge: "DIRECT JAIPUR WORKSHOP & MANUFACTURER",
  heroStonesStrip: "Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Makrana Marble",
  heroPrimaryBtnText: "EXPLORE WHAT WE MAKE",
  heroSecondaryBtnText: "SHARE DRAWING / PHOTO",

  // Slide 1 (Stone Mandirs & Temples)
  heroSlide1Tag: "HANDCRAFTED IN RAJASTHAN",
  heroSlide1Title: "CUSTOM STONE TEMPLES & HOME MANDIRS",
  heroSlide1Desc: "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts with pan-India delivery.",

  // Slide 2 (Royal Chhatris & Havelis)
  heroSlide2Tag: "HERITAGE STONE ARCHITECTURE",
  heroSlide2Title: "STONE CHHATRIS, JHAROKHAS & PILLARS",
  heroSlide2Desc: "Traditional garden chhatris, palace-style jharokhas, carved entrance gates, and round fluted pillars chiseled in authentic Dholpur and Jodhpur red sandstone.",

  // Slide 3 (3D CNC Jalis & Elevation Panels)
  heroSlide3Tag: "PRECISION STONE SCREENS",
  heroSlide3Title: "3D CNC STONE JALIS & WALL PANELS",
  heroSlide3Desc: "Custom cut 3D stone jalis and elevation screens in Gwalior mint stone and Dholpur sandstone for front elevations, boundary walls, and balconies.",

  // Legacy fallback aliases
  heroTitle: "CUSTOM STONE TEMPLES & HOME MANDIRS",
  heroDescription: "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts with pan-India delivery.",

  // 5. About RK Stone Corporation & Heritage
  founderName: "Mr. Rajendra Saini",
  estYear: "2009",
  employeesCount: "20+ Artisans & Staff",
  annualTurnover: "₹1 - 2 Crore",
  aboutHeading: "About RK Stone Corporation",
  aboutStory: "RK Stone Corporation, established in 2009 by Mr. Rajendra Saini in Jaipur, Rajasthan, is a renowned Manufacturer and Supplier of premium sandstone products. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, 3D CNC Stone Jalis, royal Chhatris, Gazebos, and Garden Fountains reflecting timeless Indian architecture.",

  // 6. Workshop & Craftsmanship Showcase
  workshopHeading: "EXPERIENCED CARVERS & MODERN MACHINERY",
  workshopStory: "RK Stone Corporation is a direct stone carving workshop based in Jaipur, Rajasthan. For over 40 years, our team of master craftsmen has hand-carved temples, royal chhatris, stone jalis, and haveli facades for homes and projects across India.",
  workshopMapLink: "https://maps.google.com/?q=RK+Stone+Corporation+Jaipur",

  // 7. Interactive Map & Official Social Media
  googleReviewsUrl: "https://www.google.com/maps/place/R+K+Stone+Carporation/",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
  socialInstagram: "https://www.instagram.com/haritage_stone_temple/",
  socialFacebook: "https://www.facebook.com/rkstone01",
  socialYoutube: "https://youtube.com/@rkstonecorporation",
};

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, default: "global", unique: true },
  companyName: { type: String, default: DEFAULT_SITE_SETTINGS.companyName },
  tagline: { type: String, default: DEFAULT_SITE_SETTINGS.tagline },
  primaryPhone: { type: String, default: DEFAULT_SITE_SETTINGS.primaryPhone },
  whatsappNumber: { type: String, default: DEFAULT_SITE_SETTINGS.whatsappNumber },
  email: { type: String, default: DEFAULT_SITE_SETTINGS.email },
  workshopAddress: { type: String, default: DEFAULT_SITE_SETTINGS.workshopAddress },
  workshopCity: { type: String, default: DEFAULT_SITE_SETTINGS.workshopCity },
  workingHours: { type: String, default: DEFAULT_SITE_SETTINGS.workingHours },
  gstNumber: { type: String, default: DEFAULT_SITE_SETTINGS.gstNumber },
  businessNature: { type: String, default: DEFAULT_SITE_SETTINGS.businessNature },
  businessStatus: { type: String, default: DEFAULT_SITE_SETTINGS.businessStatus },
  announcementActive: { type: Boolean, default: false },
  announcementText: { type: String, default: "" },
  heroBadge: { type: String, default: DEFAULT_SITE_SETTINGS.heroBadge },
  heroTitle: { type: String, default: DEFAULT_SITE_SETTINGS.heroTitle },
  heroDescription: { type: String, default: DEFAULT_SITE_SETTINGS.heroDescription },
  heroStonesStrip: { type: String, default: DEFAULT_SITE_SETTINGS.heroStonesStrip },
  heroPrimaryBtnText: { type: String, default: DEFAULT_SITE_SETTINGS.heroPrimaryBtnText },
  heroSecondaryBtnText: { type: String, default: DEFAULT_SITE_SETTINGS.heroSecondaryBtnText },

  // Hero 3 Slides Schema
  heroSlide1Tag: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide1Tag },
  heroSlide1Title: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide1Title },
  heroSlide1Desc: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide1Desc },
  heroSlide2Tag: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide2Tag },
  heroSlide2Title: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide2Title },
  heroSlide2Desc: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide2Desc },
  heroSlide3Tag: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide3Tag },
  heroSlide3Title: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide3Title },
  heroSlide3Desc: { type: String, default: DEFAULT_SITE_SETTINGS.heroSlide3Desc },

  founderName: { type: String, default: DEFAULT_SITE_SETTINGS.founderName },
  estYear: { type: String, default: DEFAULT_SITE_SETTINGS.estYear },
  employeesCount: { type: String, default: DEFAULT_SITE_SETTINGS.employeesCount },
  annualTurnover: { type: String, default: DEFAULT_SITE_SETTINGS.annualTurnover },
  aboutHeading: { type: String, default: DEFAULT_SITE_SETTINGS.aboutHeading },
  aboutStory: { type: String, default: DEFAULT_SITE_SETTINGS.aboutStory },
  workshopHeading: { type: String, default: DEFAULT_SITE_SETTINGS.workshopHeading },
  workshopStory: { type: String, default: DEFAULT_SITE_SETTINGS.workshopStory },
  workshopMapLink: { type: String, default: DEFAULT_SITE_SETTINGS.workshopMapLink },
  googleReviewsUrl: { type: String, default: DEFAULT_SITE_SETTINGS.googleReviewsUrl },
  mapEmbedUrl: { type: String, default: DEFAULT_SITE_SETTINGS.mapEmbedUrl },
  socialInstagram: { type: String, default: DEFAULT_SITE_SETTINGS.socialInstagram },
  socialFacebook: { type: String, default: DEFAULT_SITE_SETTINGS.socialFacebook },
  socialYoutube: { type: String, default: DEFAULT_SITE_SETTINGS.socialYoutube },
  lastUpdatedBy: { type: String, default: "admin" }
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

app.post('/api/contact', async (req, res) => {
  const {
    name,
    email,
    phone,
    message,
    projectType,
    stonePreference,
    source,
    city,
    address,
    dimensions,
    productName,
    estimatedBudget,
    attachments,
    photos
  } = req.body;
  console.log('[Contact / Lead Form Submission]', req.body);
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  // Normalize attachments (support array of objects, array of URLs, or single URL string)
  let normalizedAttachments = [];
  if (Array.isArray(attachments)) {
    normalizedAttachments = attachments.map(item => {
      if (typeof item === 'string') {
        const ext = path.extname(item).toLowerCase();
        return {
          url: item,
          filename: path.basename(item) || 'Attachment',
          fileType: ext.includes('pdf') ? 'application/pdf' : 'image/jpeg',
          size: 0
        };
      }
      return {
        url: item.url || '',
        filename: item.filename || item.name || 'Attachment',
        fileType: item.fileType || item.type || '',
        size: Number(item.size) || 0
      };
    }).filter(a => a.url);
  } else if (typeof attachments === 'string' && attachments.trim()) {
    normalizedAttachments = [{
      url: attachments.trim(),
      filename: path.basename(attachments) || 'Attachment',
      fileType: 'image/jpeg',
      size: 0
    }];
  }

  // Extract photos list (all image attachments + explicit photos)
  const photoList = [];
  if (Array.isArray(photos)) {
    photos.forEach(p => { if (typeof p === 'string' && p.trim()) photoList.push(p.trim()); });
  }
  normalizedAttachments.forEach(att => {
    if (
      att.fileType?.startsWith('image/') ||
      /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(att.url)
    ) {
      if (!photoList.includes(att.url)) photoList.push(att.url);
    }
  });

  let savedInquiry = null;
  try {
    savedInquiry = new Inquiry({
      name,
      email: email || '',
      phone,
      projectType: projectType || 'Custom Stone Project Inquiry',
      stonePreference: stonePreference || 'Not Specified',
      message: message || `Inquiry from ${source || 'Website'}`,
      source: source || 'Contact Page',
      city: city || '',
      address: address || '',
      dimensions: dimensions || '',
      productName: productName || '',
      estimatedBudget: estimatedBudget || '',
      status: 'New',
      attachments: normalizedAttachments,
      photos: photoList
    });
    await savedInquiry.save();
  } catch (dbErr) {
    console.error('Failed to save inquiry to DB:', dbErr);
  }

  // Attempt nodemailer if configured
  try {
    if (process.env.GMAIL_ID && process.env.GMAIL_APP_PASSWORD) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });

      const mailBody = [
        `Name: ${name}`,
        `Email: ${email || 'N/A'}`,
        `Phone: ${phone}`,
        `Project: ${projectType || 'General'}`,
        `Stone: ${stonePreference || 'Not Specified'}`,
        `Message: ${message}`
      ].join('\n');

      await transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: process.env.GMAIL_ID,
        subject: `New Inquiry Lead: ${name} (${projectType || 'Project Inquiry'})`,
        text: mailBody,
      });
    }
  } catch (err) {
    console.warn('Contact email notification skipped/failed:', err.message);
  }

  res.status(200).json({ success: true, message: 'Inquiry received successfully.', inquiry: savedInquiry });
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_SECRET = process.env.AUTH_SECRET || 'secretkeyforjwt';

// Admin User Schema for MongoDB-persisted admin credentials
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, default: ADMIN_USERNAME },
  password: { type: String, required: true, default: ADMIN_PASSWORD },
  role: { type: String, default: 'Super Administrator' },
  lastLogin: { type: Date },
  lastPasswordChanged: { type: Date, default: Date.now }
}, { timestamps: true });

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Helper to seed initial admin user if not present (called automatically upon DB connection)
async function ensureAdminUser() {
  try {
    if (mongoose.connection.readyState < 1) return;
    let admin = await AdminUser.findOne();
    if (!admin) {
      admin = new AdminUser({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        role: 'Super Administrator',
        lastPasswordChanged: new Date()
      });
      await admin.save();
      console.log('Seeded Admin User in MongoDB Atlas:', admin.username);
    }
  } catch (err) {
    console.warn('Admin user seed warning:', err.message);
  }
}

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password).trim();

    // Query admin strictly from MongoDB Atlas
    let admin = await AdminUser.findOne({ username: cleanUsername });

    // If no admin user found by this username
    if (!admin) {
      // Check if collection is completely empty (bootstrap edge-case only)
      const count = await AdminUser.countDocuments();
      if (count === 0 && cleanUsername === ADMIN_USERNAME && cleanPassword === ADMIN_PASSWORD) {
        admin = new AdminUser({
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          role: 'Super Administrator',
          lastLogin: new Date()
        });
        await admin.save();
      } else {
        return res.status(401).json({ error: 'Invalid username or password. Please use your updated credentials.' });
      }
    }

    if (admin && admin.password === cleanPassword) {
      admin.lastLogin = new Date();
      await admin.save();
      const token = jwt.sign({ username: admin.username, role: admin.role }, AUTH_SECRET, { expiresIn: '24h' });
      return res.json({
        token,
        username: admin.username,
        role: admin.role,
        lastPasswordChanged: admin.lastPasswordChanged
      });
    }

    return res.status(401).json({ error: 'Invalid username or password. Please use your updated credentials.' });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Login service failed.' });
  }
});

// Get current Admin profile info
app.get('/api/admin/credentials', async (req, res) => {
  try {
    let admin = await AdminUser.findOne();
    if (!admin) {
      admin = { username: ADMIN_USERNAME, role: 'Super Administrator' };
    }
    res.json({
      username: admin.username,
      role: admin.role || 'Super Administrator',
      lastPasswordChanged: admin.lastPasswordChanged,
      lastLogin: admin.lastLogin
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve admin details.' });
  }
});

// Update Admin Username & Password in MongoDB
app.put('/api/admin/change-credentials', async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required to change credentials.' });
    }

    let admin = await AdminUser.findOne();
    if (!admin) {
      admin = new AdminUser({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        role: 'Super Administrator'
      });
      await admin.save();
    }

    // Verify current password strictly against database record
    if (admin.password !== String(currentPassword).trim()) {
      return res.status(400).json({ error: 'Incorrect current password. Please enter your valid current password.' });
    }

    if (newUsername && newUsername.trim()) {
      const cleanUsername = newUsername.trim();
      if (cleanUsername.length < 3) {
        return res.status(400).json({ error: 'New username must be at least 3 characters long.' });
      }
      admin.username = cleanUsername;
    }

    if (newPassword && newPassword.trim()) {
      const cleanPass = newPassword.trim();
      if (cleanPass.length < 4) {
        return res.status(400).json({ error: 'New password must be at least 4 characters long.' });
      }
      admin.password = cleanPass;
    }

    admin.lastPasswordChanged = new Date();
    await admin.save();

    console.log(`[Security Alert] Admin credentials updated in MongoDB: Username is now "${admin.username}"`);
    res.json({
      success: true,
      message: 'Admin username and password updated successfully in MongoDB Atlas!',
      username: admin.username,
      role: admin.role,
      lastPasswordChanged: admin.lastPasswordChanged
    });
  } catch (err) {
    console.error('Error changing admin credentials:', err);
    res.status(500).json({ error: 'Failed to update credentials. ' + err.message });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for Cloudinary uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rkstone-products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit' }, // Resize large images
      { quality: 'auto' }, // Automatic quality optimization
      { fetch_format: 'auto' } // Automatic format optimization
    ]
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  // Return the Cloudinary URL of the uploaded file
  const imageUrl = req.file.path; // Cloudinary URL is available in path property
  res.json({ url: imageUrl });
});

// Local disk storage for client drawings, CAD files, ZIPs, PDFs, and images
const clientAttachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});

const uploadAttachment = multer({
  storage: clientAttachmentStorage,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB limit per file
  }
});

// Client Attachment / Drawing Upload endpoint (accepts single or multiple files)
app.post('/api/upload-attachment', uploadAttachment.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const uploaded = [];

    for (const file of req.files) {
      let fileUrl = `${protocol}://${host}/uploads/inquiries/${file.filename}`;

      // Upload to Cloudinary for resilient CDN hosting in production if credentials exist
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'rkstone-inquiries',
            resource_type: 'auto'
          });
          if (result && result.secure_url) {
            fileUrl = result.secure_url;
          }
        } catch (cErr) {
          console.warn('Cloudinary upload fallback to local static URL:', cErr.message);
        }
      }

      uploaded.push({
        url: fileUrl,
        filename: file.originalname,
        fileType: file.mimetype,
        size: file.size
      });
    }

    res.json({ success: true, files: uploaded });
  } catch (err) {
    console.error('Attachment upload failed:', err);
    res.status(500).json({ error: 'Failed to upload attachments.' });
  }
});

// CRUD API endpoints for products
// Get all products (Public returns active only; all=true returns all for Admin)
app.get('/api/products', async (req, res) => {
  try {
    const { all, category, search } = req.query;
    const filter = {};
    if (all !== 'true') {
      filter.isActive = { $ne: false };
    }
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { nameHi: new RegExp(search, 'i') },
        { code: new RegExp(search, 'i') },
        { stoneType: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// Get single product by ID, Code, or Slug
app.get('/api/products/:id', async (req, res) => {
  try {
    const param = req.params.id;
    let product = null;
    if (mongoose.Types.ObjectId.isValid(param)) {
      product = await Product.findById(param);
    }
    if (!product) {
      product = await Product.findOne({
        $or: [
          { code: new RegExp(`^${param}$`, 'i') },
          { name: new RegExp(`^${param.replace(/[-_]/g, ' ')}$`, 'i') }
        ]
      });
    }
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// Create a product
app.post('/api/products', async (req, res) => {
  try {
    const {
      name, nameHi, code, price, priceUnit, image, category,
      stoneType, description, descriptionHi, features, dimensions,
      leadTime, isActive, isFeatured
    } = req.body;

    const normalizedFeatures = Array.isArray(features)
      ? features
      : (typeof features === 'string' && features.trim())
        ? features.split('\n').map(s => s.trim()).filter(Boolean)
        : [];

    const product = new Product({
      name,
      nameHi: nameHi || '',
      code: code || '',
      price: Number(price) || 0,
      priceUnit: priceUnit || 'piece',
      image: image || '',
      category: category || 'stone-temple',
      stoneType: stoneType || '',
      description: description || '',
      descriptionHi: descriptionHi || '',
      features: normalizedFeatures,
      dimensions: dimensions || '',
      leadTime: leadTime || '20-25 Days',
      isActive: isActive !== false,
      isFeatured: Boolean(isFeatured),
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product.', details: err.message });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const {
      name, nameHi, code, price, priceUnit, image, category,
      stoneType, description, descriptionHi, features, dimensions,
      leadTime, isActive, isFeatured
    } = req.body;

    const normalizedFeatures = Array.isArray(features)
      ? features
      : (typeof features === 'string' && features.trim())
        ? features.split('\n').map(s => s.trim()).filter(Boolean)
        : [];

    const updateData = {
      name,
      nameHi: nameHi || '',
      code: code || '',
      price: Number(price) || 0,
      priceUnit: priceUnit || 'piece',
      image: image || '',
      category: category || 'stone-temple',
      stoneType: stoneType || '',
      description: description || '',
      descriptionHi: descriptionHi || '',
      features: normalizedFeatures,
      dimensions: dimensions || '',
      leadTime: leadTime || '20-25 Days',
      isActive: isActive !== false,
      isFeatured: Boolean(isFeatured),
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product.', details: err.message });
  }
});

// Toggle product Active / Disabled status
app.patch('/api/products/:id/toggle-status', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    product.isActive = product.isActive === false ? true : false;
    await product.save();
    res.json({
      success: true,
      message: `Product "${product.name}" is now ${product.isActive ? 'Active (Live on website)' : 'Disabled (Hidden from public)'}`,
      isActive: product.isActive,
      product
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle product status.' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// Review model and routes
const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ownerId: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

// Get reviews for a product
app.get('/api/products/:productId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ date: -1 });
    res.json(reviews.map(r => ({ id: r._id, name: r.name, rating: r.rating, text: r.text, date: r.date, ownerId: r.ownerId })));
  } catch (err) {
    console.error('Failed to fetch reviews', err);
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
});

// Create a review for a product
app.post('/api/products/:productId/reviews', async (req, res) => {
  try {
    const { name, rating, text, ownerId } = req.body;
    if (!rating || !text) return res.status(400).json({ error: 'Rating and text are required.' });
    const review = new Review({ productId: req.params.productId, name: name || 'Anonymous', rating, text, ownerId });
    await review.save();
    return res.status(201).json({ id: review._id, name: review.name, rating: review.rating, text: review.text, date: review.date, ownerId: review.ownerId });
  } catch (err) {
    console.error('Failed to create review', err);
    res.status(500).json({ error: 'Failed to create review.' });
  }
});

// Update a review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { name, rating, text, ownerId } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    // Owner check (basic): ownerId must match
    if (review.ownerId && ownerId && review.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Not authorized to edit this review.' });
    }
    review.name = name || review.name;
    review.rating = rating || review.rating;
    review.text = text || review.text;
    review.date = new Date();
    await review.save();
    return res.json({ id: review._id, name: review.name, rating: review.rating, text: review.text, date: review.date, ownerId: review.ownerId });
  } catch (err) {
    console.error('Failed to update review', err);
    res.status(500).json({ error: 'Failed to update review.' });
  }
});

// Delete a review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const ownerId = req.body?.ownerId || req.query?.ownerId;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    if (review.ownerId && ownerId && review.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Not authorized to delete this review.' });
    }
    await Review.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Review deleted.' });
  } catch (err) {
    console.error('Failed to delete review', err);
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

// Inquiries API endpoints
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, projectType, stonePreference, message, status, notes, attachments, photos } = req.body;
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      projectType,
      stonePreference,
      message,
      status: status || 'New',
      notes,
      attachments: Array.isArray(attachments) ? attachments : [],
      photos: Array.isArray(photos) ? photos : []
    });
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create inquiry.' });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  try {
    const { status, notes, projectType, stonePreference } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status, notes, projectType, stonePreference } },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// Admin Reviews API
app.get('/api/admin/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId', 'name category').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
});

app.delete('/api/admin/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json({ message: 'Review deleted by administrator.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

// Admin Stats Overview API
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [totalProducts, totalInquiries, newInquiries, totalReviews, recentInquiries, recentProducts, allProducts] = await Promise.all([
      Product.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Review.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
      Product.find().sort({ createdAt: -1 }).limit(5),
      Product.find().select('category price')
    ]);

    // Calculate category distribution
    const categoryCounts = {};
    allProducts.forEach(p => {
      const cat = p.category || 'other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    res.json({
      totalProducts,
      totalInquiries,
      newInquiries,
      totalReviews,
      categoryCounts,
      recentInquiries,
      recentProducts
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats.' });
  }
});



// Site Settings APIs (Public GET, Admin PUT & Reset)
app.get('/api/site-settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: "global" });
    if (!settings) {
      settings = new SiteSettings({ key: "global", ...DEFAULT_SITE_SETTINGS });
      await settings.save();
    }
    let needsSave = false;
    // Permanently remove hardcoded / default announcement line if it contains legacy test/default text
    if (
      settings.announcementText === "Website Under Development | By Amit Chauhan" ||
      settings.announcementText?.includes("Handcrafted Temples, 3D CNC Stone Jalis & Chhatris")
    ) {
      settings.announcementText = "";
      settings.announcementActive = false;
      needsSave = true;
    }
    // Ensure official social media links provided by the owner are saved and preserved
    if (!settings.socialInstagram || settings.socialInstagram.includes("instagram.com/rkstonecorporation")) {
      settings.socialInstagram = "https://www.instagram.com/haritage_stone_temple/";
      needsSave = true;
    }
    if (!settings.socialFacebook || settings.socialFacebook.includes("facebook.com/rkstonecorporation")) {
      settings.socialFacebook = "https://www.facebook.com/rkstone01";
      needsSave = true;
    }
    if (settings.gstNumber === "08AAAAA0000A1Z5" || !settings.gstNumber) {
      settings.gstNumber = "08CUUPS3588K1ZE";
      needsSave = true;
    }
    for (const [key, val] of Object.entries(DEFAULT_SITE_SETTINGS)) {
      if (settings[key] === undefined || settings[key] === null) {
        settings[key] = val;
        needsSave = true;
      }
    }
    if (needsSave) {
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    console.warn("Site settings fallback:", err.message);
    res.json({ key: "global", ...DEFAULT_SITE_SETTINGS, fallback: true });
  }
});

app.put('/api/admin/site-settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: "global" });
    if (!settings) {
      settings = new SiteSettings({ key: "global" });
    }
    const updatable = [
      'companyName', 'tagline', 'primaryPhone', 'whatsappNumber', 'email',
      'workshopAddress', 'workshopCity', 'workingHours', 'gstNumber',
      'businessNature', 'businessStatus',
      'announcementActive', 'announcementText',
      'heroBadge', 'heroTitle', 'heroDescription', 'heroStonesStrip',
      'heroPrimaryBtnText', 'heroSecondaryBtnText',
      'heroSlide1Tag', 'heroSlide1Title', 'heroSlide1Desc',
      'heroSlide2Tag', 'heroSlide2Title', 'heroSlide2Desc',
      'heroSlide3Tag', 'heroSlide3Title', 'heroSlide3Desc',
      'founderName', 'estYear', 'employeesCount', 'annualTurnover',
      'aboutHeading', 'aboutStory',
      'workshopHeading', 'workshopStory', 'workshopMapLink',
      'googleReviewsUrl', 'mapEmbedUrl', 'socialInstagram', 'socialFacebook', 'socialYoutube'
    ];
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });
    // Keep slide 1 and heroTitle/heroDesc synchronized
    if (req.body.heroSlide1Title && !req.body.heroTitle) {
      settings.heroTitle = req.body.heroSlide1Title;
    }
    if (req.body.heroSlide1Desc && !req.body.heroDescription) {
      settings.heroDescription = req.body.heroSlide1Desc;
    }
    settings.lastUpdatedBy = req.body.updatedBy || "admin";
    await settings.save();
    res.json({ success: true, message: "Website customization settings updated successfully.", settings });
  } catch (err) {
    console.error("Error updating site settings:", err);
    res.status(500).json({ error: "Failed to update website settings." });
  }
});

app.post('/api/admin/site-settings/reset', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: "global" });
    if (!settings) {
      settings = new SiteSettings({ key: "global" });
    }
    Object.assign(settings, DEFAULT_SITE_SETTINGS);
    // Explicitly guarantee marquee is disabled and completely empty on reset
    settings.announcementActive = false;
    settings.announcementText = "";
    // Explicitly guarantee owner's official social media links are preserved
    settings.socialInstagram = "https://www.instagram.com/haritage_stone_temple/";
    settings.socialFacebook = "https://www.facebook.com/rkstone01";
    settings.lastUpdatedBy = "factory-reset";
    await settings.save();
    res.json({ success: true, message: "Website settings reset to factory defaults.", settings });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset site settings." });
  }
});

// Start HTTP server only for local development or traditional hosting
if (!isServerless) {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the other process or set PORT to a different value.`);
    } else {
      throw err;
    }
  });
}

// Export Express app for Vercel Serverless Functions
module.exports = app;
