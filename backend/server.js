const express = require('express');
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
};
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// MongoDB connection (driver v4+ doesn't need deprecated options)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: { type: [String], default: [] },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS with configured options
app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('[Contact Form]', req.body); // debugging: log incoming data
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    if (!process.env.GMAIL_ID || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(500).json({
        error: 'Email service not configured. Set GMAIL_ID and GMAIL_APP_PASSWORD in backend .env',
      });
    }
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        // Some networks inject a self-signed cert; allow in this environment
        rejectUnauthorized: false,
      },
    });

    // Verify transporter config for clearer errors
    await transporter.verify();

    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message}`
    ].join('\n');

    await transporter.sendMail({
      from: process.env.GMAIL_ID,
      to: process.env.GMAIL_ID,
      subject: 'New Contact Form Submission',
      text: mailBody,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: `Failed to send email: ${err.message || 'Unknown error'}` });
  }
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_SECRET = process.env.AUTH_SECRET || 'secretkeyforjwt';

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: ADMIN_USERNAME }, AUTH_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
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

// CRUD API endpoints for products
// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// Create a product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image, category, description, features } = req.body;
    const normalizedFeatures = Array.isArray(features)
      ? features
      : (typeof features === 'string' && features.trim())
        ? features.split('\n').map(s => s.trim()).filter(Boolean)
        : [];
    const product = new Product({ name, price, image, category, description, features: normalizedFeatures });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, image, category, description, features } = req.body;
    const normalizedFeatures = Array.isArray(features)
      ? features
      : (typeof features === 'string' && features.trim())
        ? features.split('\n').map(s => s.trim()).filter(Boolean)
        : [];
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, category, description, features: normalizedFeatures },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product.' });
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
