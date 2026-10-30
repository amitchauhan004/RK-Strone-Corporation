import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Upload,
  RefreshCw,
  Building2,
  X,
  ChevronDown,
  Menu,
  Shield,
  Layers,
  ArrowUpRight,
  UserCheck,
  Save,
  RotateCcw,
  Sliders,
  DollarSign,
  Percent,
  Tag,
  AlertCircle,
  Check,
  Globe,
  MessageSquare,
  MapPin,
  Share2,
  Sparkles,
  Megaphone,
  Palette,
  Smartphone,
  FileText,
  Download,
  Paperclip,
  ZoomIn,
  Key,
  Lock,
  User,
  ShieldCheck,
  EyeOff,
  Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { API_URL } from "@/config/api";
import { useLanguage } from "@/contexts/LanguageContext";

export const customCategories = [
  { id: "sandstone-temple", name: "Sandstone Temple & Mandir", hindi: "सैंडस्टोन मंदिर" },
  { id: "sandstone-temple-entry-gate", name: "Sandstone Temple Entry Gate", hindi: "मंदिर प्रवेश द्वार व तोरण" },
  { id: "dholpur-sandstone-temple", name: "Dholpur Sandstone Temple", hindi: "धौलपुर सैंडस्टोन मंदिर" },
  { id: "sandstone-grill", name: "Sandstone Grill & 3D CNC Jali", hindi: "सैंडस्टोन जाली व ग्रिल" },
  { id: "sandstone-lamp", name: "Sandstone Lamp & Bollard", hindi: "सैंडस्टोन लैंप व दीपस्तंभ" },
  { id: "sandstone-gazebo", name: "Sandstone Gazebo (Chhatri)", hindi: "सैंडस्टोन छतरी व गज़ेबो" },
  { id: "sandstone-fountains", name: "Sandstone Water Fountains", hindi: "सैंडस्टोन वाटर फाउंटेन" },
  { id: "sandstone-garden-bench", name: "Sandstone Garden Bench", hindi: "सैंडस्टोन गार्डन बेंच" },
  { id: "sandstone-planter", name: "Sandstone Planters & Urns", hindi: "सैंडस्टोन गमले व कलश" },
  { id: "sandstone-ball-sphere", name: "Sandstone Ball Sphere & Finials", hindi: "सैंडस्टोन बॉल व स्फेयर" },
  { id: "sandstone-elephant-statue", name: "Sandstone Elephant Statue", hindi: "सैंडस्टोन हाथी मूर्ति" },
  { id: "sandstone-god-statue", name: "Sandstone God Statue", hindi: "सैंडस्टोन भगवान मूर्ति" },
  { id: "sandstone-wall-mural", name: "Sandstone Wall Mural Bas-Relief", hindi: "सैंडस्टोन वॉल म्यूरल" },
  { id: "sandstone-angel-garden-statue", name: "Sandstone Angel Garden Statue", hindi: "सैंडस्टोन एंजल गार्डन मूर्ति" },
  { id: "sandstone-mother-child-statue", name: "Sandstone Mother Child Statue", hindi: "सैंडस्टोन मदर चाइल्ड मूर्ति" },
  { id: "red-sandstone-ashok-stambh", name: "Red Sandstone Ashok Stambh with Pillar", hindi: "रेड सैंडस्टोन अशोक स्तंभ" },
];

export interface Product {
  _id?: string;
  id?: string;
  code?: string;
  name: string;
  nameHi?: string;
  price: number;
  priceUnit?: string;
  image: string;
  category: string;
  stoneType?: string;
  description: string;
  descriptionHi?: string;
  features: string[];
  dimensions?: string;
  leadTime?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface InquiryAttachment {
  url: string;
  filename?: string;
  fileType?: string;
  size?: number;
  uploadedAt?: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  projectType: string;
  stonePreference: string;
  message: string;
  source?: string;
  city?: string;
  address?: string;
  dimensions?: string;
  productName?: string;
  estimatedBudget?: string;
  status: "New" | "Contacted" | "In Design" | "Quoted" | "Completed";
  notes?: string;
  attachments?: InquiryAttachment[];
  photos?: string[];
  createdAt: string;
}

export interface ReviewItem {
  _id: string;
  name: string;
  rating: number;
  text: string;
  productId?: {
    _id: string;
    name: string;
    category: string;
  } | string;
  createdAt?: string;
  date?: string;
}



const emptyProduct: Product = {
  code: "",
  name: "",
  nameHi: "",
  price: 0,
  priceUnit: "piece",
  image: "",
  category: "stone-temple",
  stoneType: "Natural Dholpur Sandstone",
  description: "",
  descriptionHi: "",
  features: [],
  dimensions: "",
  leadTime: "20-25 Days",
  isActive: true,
  isFeatured: false,
};

export default function AdminDashboard() {
  const { language, setLanguage, l } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "inquiries" | "settings">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [productStatusFilter, setProductStatusFilter] = useState<"all" | "active" | "disabled">("all");
  const [togglingProductId, setTogglingProductId] = useState<string | null>(null);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("all");
  const [inquirySourceFilter, setInquirySourceFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryNotesEdit, setInquiryNotesEdit] = useState("");
  const [savingInquiryNotes, setSavingInquiryNotes] = useState(false);
  const [showAddInquiryModal, setShowAddInquiryModal] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<{ url: string; title: string; filename?: string } | null>(null);

  // Admin Master Profile & Security Credentials State
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    username: "admin",
    role: "Super Administrator",
    lastPasswordChanged: ""
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatingCredentials, setUpdatingCredentials] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  // Website Customization Studio State
  const [siteSettings, setSiteSettings] = useState({
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

    // 3. Top Marquee Announcement Bar (No default text line)
    announcementActive: false,
    announcementText: "",

    // 4. Hero Section Content (Homepage 3 Slides & CTA)
    heroBadge: "DIRECT JAIPUR WORKSHOP & MANUFACTURER",
    heroTitle: "CUSTOM STONE TEMPLES & HOME MANDIRS",
    heroDescription: "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts with pan-India delivery.",
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

    // 7. Interactive Map & Social Media (Owner's Official Links)
    googleReviewsUrl: "https://maps.google.com/?q=RK+Stone+Corporation+Jaipur",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
    socialInstagram: "https://www.instagram.com/haritage_stone_temple/",
    socialFacebook: "https://www.facebook.com/rkstone01",
    socialYoutube: "https://youtube.com/@rkstonecorporation",
  });
  const [selectedHeroSlideTab, setSelectedHeroSlideTab] = useState<1 | 2 | 3>(1);
  const [siteSettingsLoading, setSiteSettingsLoading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsLastUpdated, setSettingsLastUpdated] = useState<string>("");
  const [manualInquiry, setManualInquiry] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Stone Temple Mandir",
    stonePreference: "Dholpur Beige Sandstone",
    message: "",
    status: "New" as const
  });

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalReviews: 0,
    categoryCounts: {} as Record<string, number>,
  });

  // Check auth
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    toast.success("Signed out of Admin Portal.");
    navigate("/admin/login", { replace: true });
  };

  // Fetch data
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/products?all=true`);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/inquiries`);
      setInquiries(Array.isArray(res.data) ? res.data : []);
    } catch {
      // Inquiries might be empty initially
      setInquiries([]);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/admin/reviews`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch {
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/stats`);
      if (res.data) {
        setStats({
          totalProducts: res.data.totalProducts || 0,
          totalInquiries: res.data.totalInquiries || 0,
          newInquiries: res.data.newInquiries || 0,
          totalReviews: res.data.totalReviews || 0,
          categoryCounts: res.data.categoryCounts || {},
        });
      }
    } catch {
      // fallback calculation
      setStats({
        totalProducts: products.length,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter(i => i.status === "New").length,
        totalReviews: reviews.length,
        categoryCounts: {},
      });
    }
  };



  // Website Customization Studio Handlers
  const fetchSiteSettings = async () => {
    setSiteSettingsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/site-settings`);
      if (res.data) {
        setSiteSettings(prev => ({ ...prev, ...res.data }));
        if (res.data.updatedAt) setSettingsLastUpdated(new Date(res.data.updatedAt).toLocaleString("en-IN"));
      }
    } catch {
      toast.error("Failed to load website settings.");
    } finally {
      setSiteSettingsLoading(false);
    }
  };

  const handleSaveSiteSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await axios.put(`${API_URL}/api/admin/site-settings`, {
        ...siteSettings,
        updatedBy: "Admin"
      });
      if (res.data.success) {
        toast.success("Website customization settings saved successfully! Changes are live across the entire website.");
        setSettingsLastUpdated(new Date().toLocaleString("en-IN"));
        window.dispatchEvent(new CustomEvent("site-settings-updated", { detail: res.data.settings }));
      }
    } catch {
      toast.error("Failed to save website customization settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleResetSiteSettings = async () => {
    if (!window.confirm("Are you sure you want to reset all website customization settings to factory defaults?")) return;
    setSavingSettings(true);
    try {
      const res = await axios.post(`${API_URL}/api/admin/site-settings/reset`);
      if (res.data.success && res.data.settings) {
        const sanitized = {
          ...res.data.settings,
          announcementActive: false,
          announcementText: "",
          socialInstagram: "https://www.instagram.com/haritage_stone_temple/",
          socialFacebook: "https://www.facebook.com/rkstone01",
        };
        setSiteSettings(sanitized);
        toast.success("Website settings reset to factory defaults.");
        window.dispatchEvent(new CustomEvent("site-settings-updated", { detail: sanitized }));
      }
    } catch {
      toast.error("Failed to reset website settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveInquiryNotes = async () => {
    if (!selectedInquiry) return;
    setSavingInquiryNotes(true);
    try {
      const res = await axios.put(`${API_URL}/api/inquiries/${selectedInquiry._id}`, {
        notes: inquiryNotesEdit
      });
      if (res.data) {
        setInquiries(prev => prev.map(inq => inq._id === selectedInquiry._id ? { ...inq, notes: inquiryNotesEdit } : inq));
        setSelectedInquiry(prev => prev ? { ...prev, notes: inquiryNotesEdit } : null);
        toast.success("Internal notes updated for client inquiry.");
      }
    } catch {
      toast.error("Failed to save inquiry notes.");
    } finally {
      setSavingInquiryNotes(false);
    }
  };


  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/credentials`);
      if (res.data) {
        setAdminProfile({
          username: res.data.username || "admin",
          role: res.data.role || "Super Administrator",
          lastPasswordChanged: res.data.lastPasswordChanged ? new Date(res.data.lastPasswordChanged).toLocaleDateString("en-IN") : "Initial Setup"
        });
        setNewUsername(res.data.username || "admin");
      }
    } catch {
      // fallback
    }
  };

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password to proceed.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    if (newPassword && newPassword.length < 4) {
      toast.error("New password must be at least 4 characters long.");
      return;
    }
    if (newUsername && newUsername.trim().length < 3) {
      toast.error("New username must be at least 3 characters long.");
      return;
    }

    setUpdatingCredentials(true);
    try {
      const res = await axios.put(`${API_URL}/api/admin/change-credentials`, {
        currentPassword,
        newUsername: newUsername.trim(),
        newPassword: newPassword ? newPassword.trim() : undefined
      });

      if (res.data.success) {
        toast.success(res.data.message || "Admin credentials updated successfully in MongoDB Atlas!");
        setAdminProfile(prev => ({
          ...prev,
          username: res.data.username || newUsername.trim(),
          lastPasswordChanged: new Date().toLocaleDateString("en-IN")
        }));
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowCredentialsModal(false);
      } else {
        toast.error(res.data.error || "Failed to update credentials.");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Invalid current password or server error.";
      toast.error(msg);
    } finally {
      setUpdatingCredentials(false);
    }
  };

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchInquiries();
    fetchReviews();
    fetchStats();
    fetchSiteSettings();
    fetchAdminProfile();
  }, []);

  // Update stats whenever products or inquiries change
  useEffect(() => {
    fetchStats();
  }, [products.length, inquiries.length, reviews.length]);

  // Product Form Actions
  const openAddProduct = () => {
    setForm(emptyProduct);
    setEditId(null);
    setFeatureInput("");
    setShowProductModal(true);
  };

  const openEditProduct = (p: Product) => {
    setForm({
      code: p.code || "",
      name: p.name || "",
      nameHi: p.nameHi || "",
      price: p.price || 0,
      priceUnit: p.priceUnit || "piece",
      image: p.image || "",
      category: p.category || "stone-temple",
      stoneType: p.stoneType || "",
      description: p.description || "",
      descriptionHi: p.descriptionHi || "",
      dimensions: p.dimensions || "",
      leadTime: p.leadTime || "20-25 Days",
      features: p.features || [],
      isActive: p.isActive !== false,
      isFeatured: Boolean(p.isFeatured),
    });
    setEditId(p._id || p.id || null);
    setFeatureInput("");
    setShowProductModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await axios.post(`${API_URL}/api/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({ ...f, image: res.data.url }));
      toast.success("Image uploaded to Cloudinary successfully!");
    } catch {
      toast.error("Cloudinary upload failed. You can paste an image URL directly.");
    } finally {
      setUploadingImage(false);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm((f) => ({ ...f, features: [...f.features, featureInput.trim()] }));
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== idx),
    }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      toast.error("Product name and category are required.");
      return;
    }
    try {
      if (editId) {
        await axios.put(`${API_URL}/api/products/${editId}`, form);
        toast.success(`"${form.name}" updated successfully.`);
      } else {
        await axios.post(`${API_URL}/api/products`, form);
        toast.success(`"${form.name}" added to catalog.`);
      }
      setShowProductModal(false);
      fetchProducts();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to save product.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      toast.success("Product removed from catalog.");
      setConfirmDeleteId(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleToggleProductStatus = async (id: string) => {
    setTogglingProductId(id);
    try {
      const res = await axios.patch(`${API_URL}/api/products/${id}/toggle-status`);
      if (res.data && typeof res.data.isActive === "boolean") {
        setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? { ...p, isActive: res.data.isActive } : p));
        toast.success(res.data.message || "Product status updated.");
      }
    } catch {
      toast.error("Failed to update product status.");
    } finally {
      setTogglingProductId(null);
    }
  };

  // Inquiry Actions
  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      await axios.put(`${API_URL}/api/inquiries/${id}`, { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status } : inq))
      );
      toast.success(`Status updated to "${status}".`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client inquiry?")) return;
    try {
      await axios.delete(`${API_URL}/api/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      toast.success("Inquiry deleted.");
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch {
      toast.error("Failed to delete inquiry.");
    }
  };

  const handleManualInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInquiry.name || !manualInquiry.phone) {
      toast.error("Client name and phone number are required.");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/inquiries`, manualInquiry);
      setInquiries((prev) => [res.data, ...prev]);
      setShowAddInquiryModal(false);
      setManualInquiry({
        name: "",
        phone: "",
        email: "",
        projectType: "Stone Temple Mandir",
        stonePreference: "Dholpur Beige Sandstone",
        message: "",
        status: "New"
      });
      toast.success("Client lead logged successfully.");
    } catch {
      toast.error("Failed to save client lead.");
    }
  };

  // Review Actions
  const handleDeleteReview = async (id: string) => {
    if (!window.confirm("Delete this customer review?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review removed.");
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  // Filtered Products
  const activeProductsCount = products.filter((p) => p.isActive !== false).length;
  const disabledProductsCount = products.filter((p) => p.isActive === false).length;

  const filteredProducts = products.filter((p) => {
    const q = productSearch.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
      (p.code && p.code.toLowerCase().includes(q)) ||
      (p.stoneType && p.stoneType.toLowerCase().includes(q)) ||
      (p.dimensions && p.dimensions.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q));
    const matchesCategory =
      productCategoryFilter === "all" || p.category === productCategoryFilter;
    const matchesStatus =
      productStatusFilter === "all" ||
      (productStatusFilter === "active" ? p.isActive !== false : p.isActive === false);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const q = inquirySearch.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.projectType?.toLowerCase().includes(q) ||
      inq.stonePreference?.toLowerCase().includes(q) ||
      inq.source?.toLowerCase().includes(q) ||
      inq.city?.toLowerCase().includes(q) ||
      inq.address?.toLowerCase().includes(q) ||
      inq.dimensions?.toLowerCase().includes(q) ||
      inq.productName?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q);
    const matchesStatus =
      inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
    const matchesSource =
      inquirySourceFilter === "all" ||
      (inq.source && inq.source.toLowerCase().includes(inquirySourceFilter.toLowerCase()));
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getSourceBadge = (source?: string) => {
    const s = (source || "").toLowerCase();
    if (s.includes("sample")) {
      return {
        label: "Sample Box Request",
        badge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
        icon: Package
      };
    }
    if (s.includes("drawing") || s.includes("cad")) {
      return {
        label: "Drawing / CAD Upload",
        badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
        icon: Upload
      };
    }
    if (s.includes("calculator") || s.includes("estimator")) {
      return {
        label: "Cost Estimator Lead",
        badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
        icon: FileText
      };
    }
    if (s.includes("architect")) {
      return {
        label: "Architect Trade Lead",
        badge: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
        icon: Building2
      };
    }
    if (s.includes("product")) {
      return {
        label: "Product Catalog Lead",
        badge: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
        icon: Tag
      };
    }
    return {
      label: source || "Contact Page Form",
      badge: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
      icon: MessageSquare
    };
  };

  const getStatusBadge = (status: Inquiry["status"]) => {
    switch (status) {
      case "New":
        return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
      case "Contacted":
        return "bg-sky-500/15 text-sky-400 border border-sky-500/30";
      case "In Design":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      case "Quoted":
        return "bg-purple-500/15 text-purple-400 border border-purple-500/30";
      case "Completed":
        return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
      default:
        return "bg-stone-500/15 text-stone-400 border border-stone-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-stone-100 flex font-sans">

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#141414] border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ease-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* Admin Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="RK Stone Corporation"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-accent/60"
              />
              <div>
                <span className="font-heading font-normal text-sm tracking-[0.16em] uppercase text-white block">
                  RK STONE CORP
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent font-semibold block">
                  ADMIN DASHBOARD
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setActiveTab("overview");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${activeTab === "overview"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>{l("Overview & Metrics", "अवलोकन एवं मेट्रिक्स")}</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("products");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${activeTab === "products"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>{l("Stone Catalog", "पत्थर शिल्प कैटलॉग")}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-mono ${activeTab === "products" ? "bg-stone-950 text-accent" : "bg-white/10 text-stone-300"}`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("inquiries");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${activeTab === "inquiries"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>{l("Client Inquiries", "ग्राहक पूछताछ व लीड्स")}</span>
              </div>
              {inquiries.filter(i => i.status === "New").length > 0 && (
                <span className="text-[10px] px-2 py-0.5 font-mono bg-rose-500 text-white font-bold animate-pulse">
                  {inquiries.filter(i => i.status === "New").length} {l("NEW", "नई")}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${activeTab === "settings"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>{l("Website Customization", "वेबसाइट कस्टमाइजेशन")}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-mono ${activeTab === "settings" ? "bg-stone-950 text-accent font-bold" : "bg-accent/20 text-accent font-semibold"}`}>
                {l("LIVE", "लाइव")}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Interactive Language Selector Option in Sidebar */}
          <div className="px-3 py-2 bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-stone-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-accent" />
              <span>{l("Language", "भाषा")}</span>
            </span>
            <div className="inline-flex items-center bg-black/60 border border-white/15 p-0.5 rounded-full">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                  language === "en" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                  language === "hi" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300 hover:text-white"
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="px-3 py-2 bg-white/5 border border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {l("API Online", "एपीआई ऑनलाइन")}
            </span>
            <span>Jaipur: 26°55'N</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
            <span>{l("Open Public Website", "लाइव वेबसाइट खोलें")}</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{l("Sign Out", "लॉग आउट")}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">

        {/* Top Operational Header */}
        <header className="sticky top-0 z-30 min-h-16 h-auto py-2.5 sm:py-0 bg-[#141414]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-8 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-stone-300 hover:text-white p-2 border border-white/10 shrink-0 bg-white/5 active:bg-white/15"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-accent block truncate leading-tight">
                RK STONE CORP • {l(activeTab.toUpperCase(), activeTab === "overview" ? "अवलोकन" : activeTab === "products" ? "कैटलॉग" : activeTab === "inquiries" ? "पूछताछ" : "कस्टमाइजेशन")}
              </span>
              <h1 className="text-xs sm:text-base lg:text-lg font-heading font-normal uppercase text-white tracking-wide truncate leading-tight mt-0.5">
                {activeTab === "overview" && l("Executive Summary", "कार्यकारी सारांश")}
                {activeTab === "products" && l("Stone Product Catalog", "पत्थर उत्पाद कैटलॉग")}
                {activeTab === "inquiries" && l("Customer Inquiries & Leads", "ग्राहक पूछताछ एवं लीड्स")}
                {activeTab === "reviews" && l("Customer Testimonials", "ग्राहक समीक्षाएं")}
                {activeTab === "settings" && l("Customization Studio", "वेबसाइट कस्टमाइजेशन स्टूडियो")}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Interactive Language Switcher Toggle in Top Header */}
            <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded-full shrink-0">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-accent text-stone-950 font-bold shadow-xs"
                    : "text-stone-300 hover:text-white"
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  language === "hi"
                    ? "bg-accent text-stone-950 font-bold shadow-xs"
                    : "text-stone-300 hover:text-white"
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>

            {activeTab === "products" && (
              <Button
                onClick={openAddProduct}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                title={l("Add New Product", "नया उत्पाद जोड़ें")}
              >
                <Plus className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{l("Add Product", "नया उत्पाद")}</span>
              </Button>
            )}

            {activeTab === "inquiries" && (
              <Button
                onClick={() => setShowAddInquiryModal(true)}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                title={l("Log Manual Lead", "मैन्युअल लीड जोड़ें")}
              >
                <Plus className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{l("Log Manual Lead", "मैन्युअल लीड")}</span>
                <span className="sm:hidden text-[10px]">{l("Lead", "लीड")}</span>
              </Button>
            )}

            {activeTab === "settings" && (
              <Button
                onClick={handleSaveSiteSettings}
                disabled={savingSettings}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold disabled:opacity-50"
                title={l("Save Customizations", "कस्टमाइजेशन सेव करें")}
              >
                <Save className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{savingSettings ? l("Saving Live...", "सेव हो रहा है...") : l("Save Customization", "कस्टमाइजेशन सेव करें")}</span>
                <span className="sm:hidden text-[10px]">{savingSettings ? "..." : l("Save", "सेव")}</span>
              </Button>
            )}

            <button
              onClick={() => {
                fetchProducts();
                fetchInquiries();
                fetchReviews();
                fetchStats();
                toast.success(l("All data synchronized.", "सभी डेटा सिंक हो गया।"));
              }}
              title={l("Refresh Data", "डेटा रीफ्रेश करें")}
              className="p-1.5 sm:p-2 text-stone-400 hover:text-accent border border-white/10 hover:border-accent transition-colors bg-white/5 shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Interactive Admin Master Profile Menu Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all cursor-pointer group"
                title="Admin Master Profile & System Controls"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-accent/60 shadow-sm bg-stone-950 shrink-0">
                  <img
                    src={logo}
                    alt="RK Stone Corporation"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#141414]" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-medium text-xs leading-none">
                      {adminProfile.username === "admin" ? "Admin Master" : adminProfile.username}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isProfileMenuOpen ? "rotate-180 text-accent" : ""}`} />
                  </div>
                  <span className="text-[10px] text-accent font-mono block mt-0.5">
                    Jaipur HQ • Super Admin
                  </span>
                </div>
              </button>

              {/* Dropdown Popup Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-[#161616] border-2 border-accent/40 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header Profile Info */}
                  <div className="p-4 bg-gradient-to-b from-white/10 to-transparent border-b border-white/10 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-accent shadow-gold bg-stone-950 shrink-0">
                        <img
                          src={logo}
                          alt="RK Stone Corporation"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#161616]" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-heading font-medium text-sm text-white tracking-wide block truncate">
                          RK STONE CORPORATION
                        </span>
                        <span className="text-[11px] font-mono text-accent block truncate">
                          @{adminProfile.username} • {adminProfile.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1.5 border-t border-white/5">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" /> Secure 256-Bit SSL
                      </span>
                      <span>Jaipur Workshop</span>
                    </div>
                  </div>

                  {/* Action Menu List */}
                  <div className="p-2 space-y-1 text-xs font-mono">
                    {/* 1. Change Credentials */}
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setShowCredentialsModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-stone-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <Key className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block font-medium text-white truncate">{l("Change Admin Username & Password", "एडमिन यूज़रनेम व पासवर्ड बदलें")}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{l("Update security credentials in MongoDB", "सुरक्षा क्रेडेंशियल्स अपडेट करें")}</span>
                      </div>
                    </button>

                    {/* 2. Live Website Preview */}
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-stone-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <Globe className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">{l("View Live Public Website", "लाइव मुख्य वेबसाइट देखें")}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{l("Open client site in new window", "नई विंडो में वेबसाइट खोलें")}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    </a>

                    {/* 4. Website Customization */}
                    <button
                      onClick={() => {
                        setActiveTab("settings");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-stone-200 hover:text-white hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <Palette className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">{l("Website Customization Studio", "वेबसाइट कस्टमाइजेशन स्टूडियो")}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{l("Phone, WhatsApp, address, announcement", "फोन, व्हाट्सएप, पता, मार्की घोषणा")}</span>
                      </div>
                    </button>

                    {/* 5. Direct WhatsApp Support */}
                    <a
                      href="https://wa.me/919414784562?text=Namaste%20RK%20Stone%20Corporation%20Admin%20Desk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-stone-200 hover:text-white hover:bg-white/5 transition-colors group"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">{l("Direct WhatsApp Desk", "सीधा व्हाट्सएप डेस्क")}</span>
                        <span className="text-[10px] text-stone-400 block truncate">+91 94147 84562</span>
                      </div>
                    </a>

                    {/* 6. Quick Refresh Data */}
                    <button
                      onClick={() => {
                        fetchProducts();
                        fetchInquiries();
                        fetchReviews();
                        fetchStats();
                        fetchAdminProfile();
                        toast.success(l("System data refreshed.", "सिस्टम डेटा सिंक हो गया।"));
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-stone-200 hover:text-white hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-accent shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">{l("Sync System Data", "सिस्टम डेटा सिंक करें")}</span>
                        <span className="text-[10px] text-stone-400 block truncate">{l("Reload database state", "डेटाबेस रीलोड करें")}</span>
                      </div>
                    </button>
                  </div>

                  {/* Footer: Sign Out */}
                  <div className="p-2 border-t border-white/10 bg-black/40">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{l("Sign Out Securely", "सत्र सुरक्षित लॉग आउट करें")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="p-3 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">

          {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                <div
                  onClick={() => setActiveTab("products")}
                  className="p-4 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/60 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>{l("Products in Catalog", "कैटलॉग में उत्पाद")}</span>
                    <Package className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {products.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span>{l("Active Stone Pieces", "सक्रिय पत्थर शिल्प")}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">{l("Manage →", "प्रबंधन करें →")}</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("inquiries")}
                  className="p-4 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/60 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>{l("Total Client Inquiries", "कुल ग्राहक पूछताछ")}</span>
                    <Inbox className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {inquiries.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span className="text-rose-400 font-semibold">{inquiries.filter(i => i.status === "New").length} {l("Awaiting Reply", "उत्तर प्रतीक्षित")}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">{l("Review Leads →", "लीड्स देखें →")}</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("settings")}
                  className="p-4 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/60 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>{l("Website Customization", "वेबसाइट कस्टमाइजेशन")}</span>
                    <Palette className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {l("Live", "लाइव")}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span className="text-emerald-400 font-semibold">● {l("8 Content Sections", "8 कंटेंट सेक्शन्स")}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">{l("Customize →", "कस्टमाइज़ करें →")}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-[#161616] border border-white/10">
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>{l("Active Categories", "सक्रिय श्रेणियां")}</span>
                    <Layers className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {customCategories.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2">
                    <span>{customCategories.filter(c => products.some(p => p.category === c.id)).length} {l("Active with Specimens", "शिल्पों के साथ उपलब्ध")}</span>
                  </div>
                </div>
              </div>

              {/* Two Column Section: Recent Inquiries & Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">

                {/* Recent Inquiries List */}
                <div className="lg:col-span-7 bg-[#161616] border border-white/10 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-sm sm:text-base font-heading font-normal uppercase text-white tracking-wider">
                        {l("Recent Client Inquiries & Leads", "हालिया ग्राहक पूछताछ एवं लीड्स")}
                      </h2>
                      <span className="text-[11px] sm:text-xs text-stone-400">{l("Direct website submissions awaiting reply", "वेबसाइट से प्राप्त पूछताछ जिनका जवाब देना बाकी है")}</span>
                    </div>
                    <Button
                      onClick={() => setActiveTab("inquiries")}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-xs uppercase tracking-wider text-stone-300 hover:text-white hover:bg-white/10 hover:border-white/40 self-start sm:self-auto"
                    >
                      {l("View All", "सभी देखें")} ({inquiries.length})
                    </Button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-12 text-center text-stone-500 text-xs font-mono">
                      No customer inquiries logged yet. Test by submitting the public contact form!
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq._id}
                          className="p-3.5 sm:p-4 bg-white/5 border border-white/10 hover:border-accent/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-white text-sm">{inq.name}</span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 uppercase ${getStatusBadge(inq.status)}`}>
                                {inq.status}
                              </span>
                            </div>
                            <div className="text-xs text-stone-400 flex flex-wrap items-center gap-2 sm:gap-3">
                              <span>📞 {inq.phone}</span>
                              <span>•</span>
                              <span className="text-accent">{inq.projectType}</span>
                            </div>
                            <p className="text-xs text-stone-300 line-clamp-1 italic">
                              "{inq.message}"
                            </p>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/5">
                            <a
                              href={`https://wa.me/91${inq.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                `Hi ${inq.name}, this is RK Stone Corporation Jaipur regarding your inquiry for ${inq.projectType}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                              WhatsApp
                            </a>
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setActiveTab("inquiries");
                              }}
                              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stone Category Breakdown */}
                <div className="lg:col-span-5 bg-[#161616] border border-white/10 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm sm:text-base font-heading font-normal uppercase text-white tracking-wider mb-1">
                      {l("Catalog Distribution", "कैटलॉग वितरण")}
                    </h2>
                    <span className="text-[11px] sm:text-xs text-stone-400 block mb-4 sm:mb-6">{l("Inventory by architectural typologies", "शिल्प प्रकारों के अनुसार वितरण")}</span>

                    <div className="space-y-3.5">
                      {[...customCategories]
                        .map((cat) => {
                          const count = products.filter(p => p.category === cat.id).length;
                          const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                          return { ...cat, count, percentage };
                        })
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 7)
                        .map((cat) => (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-stone-300 truncate max-w-[200px]" title={l(cat.name, cat.hindi)}>
                                {l(cat.name, cat.hindi)}
                              </span>
                              <span className="text-accent font-mono font-bold">{cat.count} {l("pcs", "शिल्प")}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-accent transition-all duration-500"
                                style={{ width: `${Math.max(cat.percentage, 4)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-5 sm:pt-6 border-t border-white/10 mt-5 sm:mt-6">
                    <Button
                      onClick={openAddProduct}
                      className="w-full bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs tracking-wider py-4 sm:py-5 rounded-none cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {l("Add New Product Specimen", "नया उत्पाद शिल्प जोड़ें")}
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 2: PRODUCTS MANAGEMENT ================= */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-in fade-in duration-300">

              {/* Search, Status Filter & Controls Toolbar */}
              <div className="bg-[#161616] border border-white/10 p-3.5 sm:p-5 space-y-3 sm:space-y-4">

                {/* Status Toggle Filter Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mr-1">
                      {l("Filter:", "फिल्टर:")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("all")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${productStatusFilter === "all"
                          ? "bg-accent text-stone-950 font-bold shadow-sm"
                          : "bg-white/5 text-stone-300 hover:bg-white/10"
                        }`}
                    >
                      {l("All", "सभी")} ({products.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("active")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${productStatusFilter === "active"
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                        }`}
                    >
                      <span>🟢 {l("Live on Site", "वेबसाइट पर लाइव")}</span>
                      <span className="font-bold">({activeProductsCount})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("disabled")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${productStatusFilter === "disabled"
                          ? "bg-rose-600 text-white font-bold shadow-sm"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                        }`}
                    >
                      <span>🔴 {l("Hidden", "छिपे हुए")}</span>
                      <span className="font-bold">({disabledProductsCount})</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <span className="text-[11px] sm:text-xs font-mono text-stone-400">
                      {filteredProducts.length} {l("of", "में से")} {products.length} {l("Products", "उत्पाद")}
                    </span>
                    <Button
                      onClick={openAddProduct}
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-3 sm:px-5 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      {l("Add Product", "उत्पाद जोड़ें")}
                    </Button>
                  </div>
                </div>

                {/* Search & Category Filter Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      placeholder={l("Search product, code (RK-PROD-01), stone variety...", "उत्पाद, कोड या पत्थर प्रकार खोजें...")}
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                    <select
                      value={productCategoryFilter}
                      onChange={(e) => setProductCategoryFilter(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-white/10 text-white text-xs h-10 px-3 uppercase tracking-wider rounded-none focus:border-accent cursor-pointer"
                    >
                      <option value="all">{l("All Categories", "सभी श्रेणियां")} ({products.length})</option>
                      {customCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {l(c.name, c.hindi)} ({products.filter(p => p.category === c.id).length})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Products Grid */}
              {productsLoading ? (
                <div className="py-24 text-center text-stone-400 font-mono text-xs">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-accent" />
                  {l("Loading stone catalog from database...", "डेटाबेस से कैटलॉग लोड हो रहा है...")}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-24 bg-[#161616] border border-white/10 text-center space-y-4">
                  <Package className="w-12 h-12 text-stone-600 mx-auto" />
                  <h3 className="text-base uppercase tracking-wider text-stone-300">{l("No Stone Products Match Filters", "फिल्टर के अनुसार कोई उत्पाद नहीं मिला")}</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    {l("Try changing your status filter (Live / Disabled), search query, or add a new piece to your product catalog.", "फिल्टर या खोज बदलें या कैटलॉग में नया उत्पाद जोड़ें।")}
                  </p>
                  <Button
                    onClick={openAddProduct}
                    className="bg-accent text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer"
                  >
                    {l("Add Product", "उत्पाद जोड़ें")}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => {
                    const categoryObj = customCategories.find((c) => c.id === p.category);
                    const isLive = p.isActive !== false;
                    const isToggling = togglingProductId === (p._id || p.id);

                    return (
                      <div
                        key={p._id || p.id}
                        className={`bg-[#161616] border flex flex-col justify-between overflow-hidden transition-all duration-300 ${isLive
                            ? "border-white/10 hover:border-accent/60"
                            : "border-dashed border-rose-500/30 opacity-75 hover:opacity-100"
                          }`}
                      >
                        <div>
                          {/* Image Thumbnail */}
                          <div className="relative h-56 bg-stone-900 overflow-hidden group">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-stone-600">
                                <Package className="w-8 h-8 mb-1" />
                                <span className="text-[10px] font-mono">No Image</span>
                              </div>
                            )}

                            {/* Top Left: Category & Code */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[70%]">
                              {p.code && (
                                <span className="bg-stone-950/90 text-accent font-mono text-[10px] font-bold px-2 py-0.5 border border-accent/30">
                                  {p.code}
                                </span>
                              )}
                              <span className="bg-stone-950/90 text-stone-300 text-[10px] font-mono uppercase px-2 py-0.5 truncate max-w-[120px]">
                                {categoryObj ? categoryObj.name.split("&")[0].trim() : p.category}
                              </span>
                            </div>

                            {/* Top Right: Status Badge */}
                            <div className="absolute top-2.5 right-2.5">
                              {isLive ? (
                                <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                                  🟢 {l("Live", "लाइव")}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-rose-950/90 text-rose-400 border border-rose-500/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                                  🔴 {l("Hidden", "छिपा हुआ")}
                                </span>
                              )}
                            </div>

                            {/* Bottom Right: Best Price on Request (Price removed per user request) */}
                            <div className="absolute bottom-2.5 right-2.5 bg-stone-950/90 px-2 py-0.5 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/30">
                              {l("Best Price on Request", "अनुरोध पर सर्वोत्तम मूल्य")}
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4 space-y-2">
                            <div>
                              <h3 className="font-heading font-medium text-sm uppercase text-white tracking-wide truncate" title={p.name}>
                                {p.name}
                              </h3>
                              {p.nameHi && (
                                <p className="text-xs text-stone-400 font-sans truncate" title={p.nameHi}>
                                  {p.nameHi}
                                </p>
                              )}
                            </div>

                            {/* Stone Type & Dimensions badges */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {p.stoneType && (
                                <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 border border-accent/20 truncate max-w-full">
                                  🪨 {p.stoneType}
                                </span>
                              )}
                              {p.dimensions && (
                                <span className="text-[10px] font-mono text-stone-400 bg-white/5 px-2 py-0.5 border border-white/10 truncate max-w-full">
                                  📐 {p.dimensions}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-stone-400 font-light line-clamp-2 leading-relaxed pt-1">
                              {p.description || "Bespoke natural stone architectural commission crafted in Jaipur."}
                            </p>

                            {/* Features preview */}
                            {p.features && p.features.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {p.features.slice(0, 2).map((f, i) => (
                                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-stone-300">
                                    ✓ {f}
                                  </span>
                                ))}
                                {p.features.length > 2 && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 text-stone-500">
                                    +{p.features.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Action Buttons: 1-Click Status Toggle, Edit, Site Preview, Delete */}
                        <div className="p-4 pt-0 border-t border-white/5 mt-3 grid grid-cols-4 gap-1.5">

                          {/* 1. Status Toggle Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleProductStatus(p._id || p.id || "")}
                            disabled={isToggling}
                            className={`py-2 text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer border ${isLive
                                ? "bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 border-rose-500/30"
                                : "bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 font-bold"
                              }`}
                            title={isLive ? l("Click to hide from customer website", "वेबसाइट से छिपाने के लिए क्लिक करें") : l("Click to publish live on website", "वेबसाइट पर लाइव करने के लिए क्लिक करें")}
                          >
                            {isToggling ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : isLive ? (
                              <span>{l("Hide", "छिपाएं")}</span>
                            ) : (
                              <span>{l("Enable", "दिखाएं")}</span>
                            )}
                          </button>

                          {/* 2. Edit Button */}
                          <button
                            type="button"
                            onClick={() => openEditProduct(p)}
                            className="py-2 bg-white/5 hover:bg-white/15 text-stone-200 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
                            title={l("Edit full product specifications", "उत्पाद संपादित करें")}
                          >
                            <Edit className="w-3 h-3 text-sky-400" />
                            {l("Edit", "एडिट")}
                          </button>

                          {/* 3. View Live on Site Link */}
                          <a
                            href={`/product/${p.code || p._id || p.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 bg-white/5 hover:bg-white/15 text-stone-200 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
                            title={l("View product details page on website", "वेबसाइट पर देखें")}
                          >
                            <ExternalLink className="w-3 h-3 text-accent" />
                            {l("Site", "वेबसाइट")}
                          </a>

                          {/* 4. Delete Button */}
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(p._id || p.id || null)}
                            className="py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center justify-center border border-rose-500/20 transition-colors cursor-pointer"
                            title={l("Delete permanently from database", "डेटाबेस से स्थायी हटाएं")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: CLIENT INQUIRIES & CRM ================= */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 animate-in fade-in duration-300">

              {/* Inquiries Status & Source Filter Strip */}
              <div className="bg-[#161616] border border-white/10 p-3.5 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {["all", "New", "Contacted", "In Design", "Quoted", "Completed"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${inquiryStatusFilter === st
                            ? "bg-accent text-stone-950 font-bold shadow-sm"
                            : "bg-white/5 text-stone-300 hover:bg-white/10"
                          }`}
                      >
                        {st === "all"
                          ? `${l("All", "सभी")} (${inquiries.length})`
                          : `${l(st, st === "New" ? "नई" : st === "Contacted" ? "संपर्क किया" : st === "In Design" ? "डिज़ाइन में" : st === "Quoted" ? "कोटेशन दिया" : "पूर्ण")} (${inquiries.filter(i => i.status === st).length})`}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-auto sm:min-w-[240px] flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      placeholder={l("Search client, phone, city, source, project...", "ग्राहक का नाम, फोन, शहर या प्रोजेक्ट खोजें...")}
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-9 bg-white/5 border-white/10 text-xs h-9 rounded-none text-white focus:border-accent"
                    />
                  </div>
                </div>

                {/* Sub-filter by Lead Source */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-white/5 text-xs font-mono">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider mr-1">{l("Source:", "स्रोत:")}</span>
                  {[
                    { id: "all", label: l("All Forms", "सभी फॉर्म") },
                    { id: "sample", label: `📦 ${l("Sample Box", "सैंपल बॉक्स")}` },
                    { id: "drawing", label: `📐 ${l("Drawing", "ड्राइंग")}` },
                    { id: "estimator", label: `🧮 ${l("Estimator", "कैलकुलेटर")}` },
                    { id: "contact", label: `✉️ ${l("Contact", "संपर्क")}` },
                    { id: "architect", label: `🏛️ ${l("Architect", "आर्किटेक्ट")}` },
                    { id: "product", label: `🏷️ ${l("Product", "उत्पाद")}` },
                  ].map((sf) => (
                    <button
                      key={sf.id}
                      onClick={() => setInquirySourceFilter(sf.id)}
                      className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono tracking-wider transition-all cursor-pointer ${inquirySourceFilter === sf.id
                          ? "bg-accent/20 text-accent border border-accent/60 font-bold"
                          : "bg-white/5 text-stone-400 hover:text-white"
                        }`}
                    >
                      {sf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Feed */}
              {inquiriesLoading ? (
                <div className="py-20 text-center font-mono text-xs text-stone-400">
                  {l("Loading client commissions and inquiries...", "ग्राहक पूछताछ एवं लीड्स लोड हो रही हैं...")}
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-24 bg-[#161616] border border-white/10 text-center space-y-4">
                  <Inbox className="w-12 h-12 text-stone-600 mx-auto" />
                  <h3 className="text-base uppercase tracking-wider text-stone-300">{l("No Inquiries Found", "कोई पूछताछ नहीं मिली")}</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    {l("No client inquiries match the current filter. Website leads from any form on the public website will automatically arrive here.", "वर्तमान फिल्टर के अनुसार कोई पूछताछ नहीं मिली। वेबसाइट पर भरे गए फॉर्म्स सीधे यहाँ प्राप्त होते हैं।")}
                  </p>
                  <Button
                    onClick={() => setShowAddInquiryModal(true)}
                    className="bg-accent text-stone-950 font-bold uppercase text-xs rounded-none cursor-pointer"
                  >
                    {l("Log Manual Lead", "मैन्युअल लीड जोड़ें")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => {
                    const cleanPhone = inq.phone.replace(/\D/g, "");
                    const srcInfo = getSourceBadge(inq.source);
                    const SrcIcon = srcInfo.icon;
                    const dateFormatted = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : "Recent";

                    return (
                      <div
                        key={inq._id}
                        className="p-3.5 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6"
                      >
                        {/* Client & Project Details */}
                        <div className="space-y-2.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-base font-semibold text-white">{inq.name}</span>

                            {/* Source Form Badge */}
                            <span className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider flex items-center gap-1 ${srcInfo.badge}`}>
                              <SrcIcon className="w-3 h-3" />
                              {srcInfo.label}
                            </span>

                            {/* Status Badge */}
                            <span className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider ${getStatusBadge(inq.status)}`}>
                              {inq.status}
                            </span>

                            {/* Customer Photo / Attachment Indicator */}
                            {((inq.attachments && inq.attachments.length > 0) || (inq.photos && inq.photos.length > 0)) && (
                              <span className="text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold flex items-center gap-1 shadow-sm">
                                📷 {(inq.photos?.length || 0) + (inq.attachments?.length || 0)} Photo / File Attached
                              </span>
                            )}

                            <span className="text-xs text-stone-500 font-mono">
                              Received: {dateFormatted}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-300">
                            <a href={`tel:${inq.phone}`} className="hover:text-accent flex items-center gap-1 font-semibold text-white">
                              📞 {inq.phone}
                            </a>
                            {inq.email && (
                              <a href={`mailto:${inq.email}`} className="hover:text-accent flex items-center gap-1 text-stone-400">
                                ✉️ {inq.email}
                              </a>
                            )}
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-accent">
                              Project: {inq.projectType}
                            </span>
                            {inq.stonePreference && inq.stonePreference !== "Not Specified" && (
                              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-stone-300">
                                Stone: {inq.stonePreference}
                              </span>
                            )}
                            {(inq.city || inq.address) && (
                              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-accent" />
                                {inq.city ? inq.city : inq.address}
                              </span>
                            )}
                            {inq.dimensions && (
                              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1">
                                📐 {inq.dimensions}
                              </span>
                            )}
                            {inq.estimatedBudget && (
                              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                                💰 {inq.estimatedBudget}
                              </span>
                            )}
                            {inq.productName && (
                              <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent">
                                🏷️ {inq.productName}
                              </span>
                            )}
                          </div>

                          <div className="p-3 bg-white/5 border border-white/10 text-xs text-stone-300 font-light leading-relaxed">
                            {inq.message}
                          </div>

                          {/* Customer Photos & Attached Files Strip */}
                          {(() => {
                            const cardPhotos: string[] = [];
                            if (Array.isArray(inq.photos)) {
                              inq.photos.forEach(p => { if (p && !cardPhotos.includes(p)) cardPhotos.push(p); });
                            }
                            if (Array.isArray(inq.attachments)) {
                              inq.attachments.forEach(att => {
                                if (att.url && (att.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(att.url))) {
                                  if (!cardPhotos.includes(att.url)) cardPhotos.push(att.url);
                                }
                              });
                            }
                            const cardDocs = (inq.attachments || []).filter(att =>
                              att.url && !att.fileType?.startsWith("image/") && !/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(att.url)
                            );

                            if (cardPhotos.length === 0 && cardDocs.length === 0) return null;

                            return (
                              <div className="p-3 bg-amber-950/20 border border-amber-500/30 space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                    <Paperclip className="w-3.5 h-3.5" />
                                    CUSTOMER ATTACHED PHOTOS &amp; DRAWINGS ({cardPhotos.length + cardDocs.length})
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-400">
                                    Click any photo to enlarge
                                  </span>
                                </div>

                                {/* Photo Thumbnails */}
                                {cardPhotos.length > 0 && (
                                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                                    {cardPhotos.map((pUrl, pIdx) => {
                                      const matched = inq.attachments?.find(a => a.url === pUrl);
                                      return (
                                        <div
                                          key={pIdx}
                                          onClick={() => setActivePhotoModal({ url: pUrl, title: `${inq.name} - Photo #${pIdx + 1}`, filename: matched?.filename })}
                                          className="group relative w-16 h-16 bg-black border border-white/20 hover:border-amber-400 overflow-hidden cursor-pointer shadow-md transition-all"
                                          title="Click to enlarge customer photo"
                                        >
                                          <img
                                            src={pUrl}
                                            alt={`Customer photo ${pIdx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-115 transition duration-200"
                                          />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <ZoomIn className="w-4 h-4 text-accent" />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* Non-Image Documents (PDF, DWG, ZIP) */}
                                {cardDocs.length > 0 && (
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    {cardDocs.map((doc, dIdx) => (
                                      <a
                                        key={dIdx}
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-accent text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors group cursor-pointer"
                                      >
                                        <FileText className="w-3.5 h-3.5 text-accent" />
                                        <span className="max-w-[150px] truncate">{doc.filename || "Document"}</span>
                                        <Download className="w-3 h-3 text-stone-400 group-hover:text-white" />
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {inq.notes && (
                            <div className="text-[11px] font-mono text-accent bg-accent/5 border border-accent/20 p-2 flex items-center gap-1.5">
                              <span>📌 Admin Note:</span>
                              <span className="text-stone-300">{inq.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Status Changer & Quick Outreach Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0 w-full lg:w-auto pt-3 border-t border-white/5 lg:border-0 lg:pt-0">

                          {/* Status Dropdown */}
                          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
                            <span className="text-[11px] text-stone-400 font-mono uppercase">Status:</span>
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq._id, e.target.value as Inquiry["status"])}
                              className="bg-[#1e1e1e] border border-white/20 text-xs text-white px-2.5 py-1.5 uppercase font-mono rounded-none focus:border-accent cursor-pointer flex-1 sm:flex-initial"
                            >
                              <option value="New">🔴 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="In Design">🟡 In Design</option>
                              <option value="Quoted">🟣 Quoted</option>
                              <option value="Completed">🟢 Completed</option>
                            </select>
                          </div>

                          {/* Quick Action Links */}
                          <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setInquiryNotesEdit(inq.notes || "");
                              }}
                              className="px-2.5 sm:px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
                              title="View Full Dossier"
                            >
                              <Eye className="w-3.5 h-3.5 text-accent" />
                              <span className="truncate">Dossier</span>
                            </button>

                            <a
                              href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                                `Namaste ${inq.name}, this is RK Stone Corporation Jaipur following up on your inquiry for ${inq.projectType}. How can our stone team assist you with sizes and pricing estimates?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 sm:px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer shadow-sm transition-colors"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                              <span className="truncate">Chat</span>
                            </a>

                            <a
                              href={`tel:${inq.phone}`}
                              className="px-2.5 sm:px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span className="truncate">Call</span>
                            </a>

                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              className="p-2 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer col-span-3 sm:col-span-1 flex items-center justify-center"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}



          {/* ================= TAB 5: WEBSITE CUSTOMIZATION & BRANDING STUDIO ================= */}
          {activeTab === "settings" && (
            <div className="max-w-5xl space-y-8 animate-in fade-in duration-300">

              {/* Studio Header Bar */}
              <div className="bg-[#161616] border border-white/10 p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-accent px-2 py-0.5 bg-accent/10 border border-accent/20">
                      {l("LIVE WEBSITE CUSTOMIZATION STUDIO", "लाइव वेबसाइट कस्टमाइजेशन स्टूडियो")}
                    </span>
                    {settingsLastUpdated && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">
                        • {l("Last saved:", "अंतिम सुरक्षित:")} {settingsLastUpdated}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-heading font-normal uppercase text-white tracking-wide">
                    {l("Website Customization & Branding Studio", "वेबसाइट कस्टमाइजेशन एवं ब्रांडिंग स्टूडियो")}
                  </h2>
                  <p className="text-xs text-stone-400 font-light mt-1 max-w-2xl">
                    {l(
                      "Customize website branding, business credentials, contact numbers, workshop address, marquee announcement bar, and hero slides. Changes apply instantly to the live website.",
                      "वेबसाइट ब्रांडिंग, कंपनी विवरण, संपर्क सूत्र, वर्कशॉप पता, मार्की घोषणा पट्टी और मुख्य हीरो स्लाइड्स कस्टमाइज़ करें। बदलाव तुरंत लाइव वेबसाइट पर लागू होंगे।"
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetSiteSettings}
                    disabled={savingSettings}
                    className="border-white/20 text-stone-300 hover:text-white hover:bg-white/10 text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-3 sm:px-4 rounded-none cursor-pointer flex-1 sm:flex-initial"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    {l("Reset", "रीसेट")}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSaveSiteSettings}
                    disabled={savingSettings}
                    className="bg-accent hover:bg-accent/90 text-stone-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-4 sm:px-6 rounded-none cursor-pointer shadow-gold flex-1 sm:flex-initial"
                  >
                    {savingSettings ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                        {l("Saving...", "सेव हो रहा है...")}
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        {l("Publish Changes", "वेबसाइट पर प्रकाशित करें")}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Real-Time Live Visual Preview Card */}
              <div className="bg-[#141414] border border-accent/30 p-6 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                      {l("Live Customer Preview (Real-Time Website Simulation)", "लाइव कस्टमर प्रीव्यू (वास्तविक समय वेबसाइट सिमुलेशन)")}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                    ● {l("Real-Time Sync", "रियल-टाइम सिंक")}
                  </span>
                </div>

                {/* Simulated Announcement Bar */}
                <div className="border border-white/10 bg-black/60 rounded-none overflow-hidden">
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1.5 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <span className="font-semibold text-stone-300">{l("1. Top Announcement Marquee Ticker:", "1. शीर्ष घोषणा मार्की टिकर:")}</span>
                    <span className={siteSettings.announcementActive && siteSettings.announcementText?.trim() ? "text-emerald-400 font-bold" : "text-amber-400"}>
                      {siteSettings.announcementActive && siteSettings.announcementText?.trim() ? l("● Live Scrolling Marquee", "● लाइव स्क्रॉलिंग मार्की") : l("○ Hidden (No Marquee Bar)", "○ छुपा हुआ (कोई मार्की पट्टी नहीं)")}
                    </span>
                  </div>
                  {siteSettings.announcementActive && siteSettings.announcementText?.trim() ? (
                    <div className="bg-stone-950 border-b border-accent/20 px-4 py-2 overflow-hidden">
                      <div className="inline-block whitespace-nowrap animate-marquee-infinite text-xs text-stone-300 font-sans tracking-wide">
                        <span className="text-accent font-semibold mr-6">✦ {siteSettings.announcementText}</span>
                        <span className="text-accent font-semibold mr-6">✦ {siteSettings.announcementText}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-center text-xs text-stone-500 italic font-mono bg-stone-950/60">
                      [{l("Announcement marquee is currently disabled/empty - top bar is completely hidden", "मार्की घोषणा अभी निष्क्रिय या खाली है - शीर्ष पट्टी पूरी तरह से छिपी हुई है")}]
                    </div>
                  )}

                  {/* Simulated Nav branding */}
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1.5 bg-white/5 border-y border-white/10 font-semibold text-stone-300">
                    {l("2. Navigation Branding & Quick Hotlines:", "2. नेविगेशन ब्रांडिंग एवं संपर्क नंबर:")}
                  </div>
                  <div className="px-3.5 py-3 bg-[#0d0d0d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-sm font-heading uppercase text-white font-bold tracking-wider block">
                        {siteSettings.companyName || "RK Stone Corporation"}
                      </span>
                      <span className="text-[10px] text-accent tracking-widest uppercase font-mono">
                        {siteSettings.workshopCity || "Jaipur, Rajasthan"} • {siteSettings.tagline}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-stone-300">
                      <span className="text-white font-semibold">📞 {siteSettings.primaryPhone}</span>
                      <span className="text-emerald-400 font-semibold">💬 WhatsApp: {siteSettings.whatsappNumber}</span>
                    </div>
                  </div>

                  {/* Simulated Hero Badges with 3 Slide Switcher */}
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1.5 bg-white/5 border-y border-white/10 flex flex-wrap items-center justify-between gap-2 font-semibold text-stone-300">
                    <span>{l("3. Hero Section (3 Slide Visualizations):", "3. हीरो सेक्शन (3 स्लाइड्स प्रीव्यू):")}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedHeroSlideTab(1)}
                        className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer transition-colors ${selectedHeroSlideTab === 1 ? 'bg-accent text-stone-950 font-bold' : 'bg-white/10 text-stone-300 hover:bg-white/20'}`}
                      >
                        {l("Slide 1: Mandir", "स्लाइड 1: मंदिर")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedHeroSlideTab(2)}
                        className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer transition-colors ${selectedHeroSlideTab === 2 ? 'bg-accent text-stone-950 font-bold' : 'bg-white/10 text-stone-300 hover:bg-white/20'}`}
                      >
                        {l("Slide 2: Chhatri", "स्लाइड 2: छतरी")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedHeroSlideTab(3)}
                        className={`px-2 py-0.5 text-[10px] font-mono cursor-pointer transition-colors ${selectedHeroSlideTab === 3 ? 'bg-accent text-stone-950 font-bold' : 'bg-white/10 text-stone-300 hover:bg-white/20'}`}
                      >
                        {l("Slide 3: Jali", "स्लाइड 3: जाली")}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-stone-950 space-y-2">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent">
                      {selectedHeroSlideTab === 1
                        ? (siteSettings.heroSlide1Tag || siteSettings.heroBadge)
                        : selectedHeroSlideTab === 2
                          ? (siteSettings.heroSlide2Tag || siteSettings.heroBadge)
                          : (siteSettings.heroSlide3Tag || siteSettings.heroBadge)}
                    </span>
                    <h4 className="text-sm sm:text-base font-heading uppercase text-white tracking-wider font-semibold">
                      {selectedHeroSlideTab === 1
                        ? (siteSettings.heroSlide1Title || siteSettings.heroTitle)
                        : selectedHeroSlideTab === 2
                          ? siteSettings.heroSlide2Title
                          : siteSettings.heroSlide3Title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 font-light">
                      {selectedHeroSlideTab === 1
                        ? (siteSettings.heroSlide1Desc || siteSettings.heroDescription)
                        : selectedHeroSlideTab === 2
                          ? siteSettings.heroSlide2Desc
                          : siteSettings.heroSlide3Desc}
                    </p>
                    <div className="text-xs text-stone-300 font-mono pt-1">
                      Stones Catalog Strip: <span className="text-accent font-semibold">{siteSettings.heroStonesStrip}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono">
                      <span className="px-2 py-0.5 bg-accent text-stone-950 font-bold">BTN 1: {siteSettings.heroPrimaryBtnText}</span>
                      <span className="px-2 py-0.5 bg-white/10 text-stone-200 border border-white/20">BTN 2: {siteSettings.heroSecondaryBtnText}</span>
                    </div>
                  </div>

                  {/* Simulated About Section Preview */}
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1.5 bg-white/5 border-y border-white/10 font-semibold text-stone-300">
                    4. About Section Credentials &amp; Narrative:
                  </div>
                  <div className="p-3.5 bg-[#0d0d0d] space-y-1.5 text-xs">
                    <div className="text-accent font-heading uppercase text-xs tracking-wider">{siteSettings.aboutHeading}</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1 text-[10px] font-mono">
                      <div className="p-1.5 bg-white/5 border border-white/10"><span className="text-stone-400 block">Founder:</span> <span className="text-white font-bold">{siteSettings.founderName}</span></div>
                      <div className="p-1.5 bg-white/5 border border-white/10"><span className="text-stone-400 block">Est. Year:</span> <span className="text-accent font-bold">{siteSettings.estYear}</span></div>
                      <div className="p-1.5 bg-white/5 border border-white/10"><span className="text-stone-400 block">Team:</span> <span className="text-white font-bold">{siteSettings.employeesCount}</span></div>
                      <div className="p-1.5 bg-white/5 border border-white/10"><span className="text-stone-400 block">Volume:</span> <span className="text-accent font-bold">{siteSettings.annualTurnover}</span></div>
                    </div>
                    <p className="text-[11px] text-stone-400 font-light line-clamp-2">{siteSettings.aboutStory}</p>
                  </div>
                </div>
              </div>

              {/* Form Grid Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Section 1: Company Profile & Business Identity */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Building2 className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("1. Company Identity & Credentials", "1. कंपनी पहचान एवं आधिकारिक विवरण")}
                    </h3>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Company Brand Name *", "कंपनी का नाम *")}
                    </label>
                    <Input
                      value={siteSettings.companyName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                      placeholder="e.g. RK Stone Corporation"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Brand Tagline / Slogan", "टैगलाइन / स्लोगन")}
                    </label>
                    <Input
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      placeholder="e.g. Direct Quarry Sourcing • Pan-India Installation"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Nature of Business", "व्यवसाय का प्रकार")}
                    </label>
                    <Input
                      value={siteSettings.businessNature}
                      onChange={(e) => setSiteSettings({ ...siteSettings, businessNature: e.target.value })}
                      placeholder="e.g. Direct Manufacturer, Quarry Wholesaler & Temple Artisan"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Business Legal Status", "फर्म का प्रकार")}
                    </label>
                    <Input
                      value={siteSettings.businessStatus}
                      onChange={(e) => setSiteSettings({ ...siteSettings, businessStatus: e.target.value })}
                      placeholder="e.g. Sole Proprietorship / Registered MSME Enterprise"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("GSTIN Number (Official Tax Registration)", "जीएसटी नंबर (आधिकारिक पंजीकरण)")}
                    </label>
                    <Input
                      value={siteSettings.gstNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, gstNumber: e.target.value })}
                      placeholder="e.g. 08CUUPS3588K1ZE"
                      className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Workshop Operating Hours", "काम के घंटे")}
                    </label>
                    <Input
                      value={siteSettings.workingHours}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                      placeholder="e.g. Mon - Sun: 8:00 AM - 7:00 PM"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 2: Contact Hotlines & Workshop Location */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Phone className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("2. Hotlines & Workshop Location", "2. संपर्क नंबर एवं वर्कशॉप का पता")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Master Phone *", "मुख्य फोन नंबर *")}
                      </label>
                      <Input
                        value={siteSettings.primaryPhone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, primaryPhone: e.target.value })}
                        placeholder="+91 94147 84562"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("WhatsApp Number *", "व्हाट्सएप नंबर *")}
                      </label>
                      <Input
                        value={siteSettings.whatsappNumber}
                        onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                        placeholder="+91 94147 84562"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Official Email Address *", "आधिकारिक ईमेल पता *")}
                    </label>
                    <Input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      placeholder="contact@rkstonecorporation.com"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Workshop City / State Label", "शहर / राज्य")}
                    </label>
                    <Input
                      value={siteSettings.workshopCity}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workshopCity: e.target.value })}
                      placeholder="Jaipur, Rajasthan"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Full Physical Yard & Workshop Address", "वर्कशॉप एवं यार्ड का पूरा पता")}
                    </label>
                    <Textarea
                      rows={2}
                      value={siteSettings.workshopAddress}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workshopAddress: e.target.value })}
                      placeholder="Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India"
                      className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 3: Top Announcement Marquee Bar */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-accent" />
                      <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                        {l("3. Top Announcement Marquee Bar", "3. शीर्ष घोषणा मार्की पट्टी")}
                      </h3>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="checkbox"
                        checked={siteSettings.announcementActive}
                        onChange={(e) => setSiteSettings({ ...siteSettings, announcementActive: e.target.checked })}
                        className="accent-accent w-4 h-4 cursor-pointer"
                      />
                      <span className={siteSettings.announcementActive ? "text-accent font-bold" : "text-stone-400"}>
                        {siteSettings.announcementActive ? l("Active", "सक्रिय") : l("Disabled", "निष्क्रिय")}
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    {l(
                      "This announcement ticker scrolls continuously at the very top of every page. If disabled or empty, no marquee bar will appear on the website.",
                      "यह टिकर/मार्की वेबसाइट के सबसे ऊपर हर पेज पर लगातार स्क्रॉल करता है। अगर यह Disabled या खाली होगा, तो वेबसाइट पर कोई भी पट्टी नहीं दिखेगी।"
                    )}
                  </p>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Marquee Banner Message Text", "मार्की घोषणा संदेश टेक्स्ट")}
                    </label>
                    <Textarea
                      rows={3}
                      value={siteSettings.announcementText}
                      onChange={(e) => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                      placeholder={l("Type your marquee announcement here, e.g.: Direct Jaipur Workshop & Quarry Sourcing | Best Sandstone Temples & Jalis...", "यहाँ अपना संदेश लिखें, जैसे: Direct Jaipur Workshop & Quarry Sourcing | Best Sandstone Temples & Jalis...")}
                      className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 4: Hero Section & Action Buttons */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Palette className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("4. Hero Section (3 Slide Visualizations & CTA)", "4. हीरो सेक्शन (3 मुख्य स्लाइड्स व एक्शन बटन)")}
                    </h3>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    {l(
                      "The homepage hero banner features 3 distinct slides (Mandir, Chhatri, Jali). Customize unique headings, tags, and descriptions for each slide below.",
                      "होमपेज के मुख्य हीरो सेक्शन में 3 अलग-अलग स्लाइड्स (मंदिर, छतरी, जाली) हैं। आप तीनों स्लाइड्स की अलग-अलग हेडिंग, टैग और विवरण यहाँ से कस्टमाइज़ कर सकते हैं।"
                    )}
                  </p>

                  {/* 3 Slide Switcher Tabs */}
                  <div className="flex border border-white/10 bg-white/5 p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedHeroSlideTab(1)}
                      className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${selectedHeroSlideTab === 1
                          ? "bg-accent text-stone-950 font-bold shadow"
                          : "text-stone-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      {l("Slide 1: Mandir", "स्लाइड 1: मंदिर")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedHeroSlideTab(2)}
                      className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${selectedHeroSlideTab === 2
                          ? "bg-accent text-stone-950 font-bold shadow"
                          : "text-stone-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      {l("Slide 2: Chhatri", "स्लाइड 2: छतरी")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedHeroSlideTab(3)}
                      className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${selectedHeroSlideTab === 3
                          ? "bg-accent text-stone-950 font-bold shadow"
                          : "text-stone-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      {l("Slide 3: Jali", "स्लाइड 3: जाली")}
                    </button>
                  </div>

                  {/* Slide 1 Form Fields */}
                  {selectedHeroSlideTab === 1 && (
                    <div className="space-y-3 p-3 bg-black/40 border border-white/10 animate-in fade-in duration-200">
                      <div className="text-[11px] font-mono text-accent font-semibold uppercase flex items-center gap-1.5">
                        <span>{l("● Photo 1: Stone Mandirs & Temples", "● फोटो 1: नक्काशीदार मंदिर")}</span>
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 1 Tag / Subtitle", "स्लाइड 1 टैग / उपशीर्षक")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide1Tag}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide1Tag: e.target.value })}
                          placeholder="HANDCRAFTED IN RAJASTHAN"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 1 Main Heading *", "स्लाइड 1 मुख्य शीर्षक *")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide1Title}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide1Title: e.target.value, heroTitle: e.target.value })}
                          placeholder="CUSTOM STONE TEMPLES & HOME MANDIRS"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 1 Description", "स्लाइड 1 विवरण")}
                        </label>
                        <Textarea
                          rows={2}
                          value={siteSettings.heroSlide1Desc}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide1Desc: e.target.value, heroDescription: e.target.value })}
                          placeholder="Handcrafted stone temples carved in authentic Bansi Paharpur..."
                          className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Slide 2 Form Fields */}
                  {selectedHeroSlideTab === 2 && (
                    <div className="space-y-3 p-3 bg-black/40 border border-white/10 animate-in fade-in duration-200">
                      <div className="text-[11px] font-mono text-accent font-semibold uppercase flex items-center gap-1.5">
                        <span>{l("● Photo 2: Royal Chhatris, Jharokhas & Pillars", "● फोटो 2: शाही छतरियां, झरोखे व स्तंभ")}</span>
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 2 Tag / Subtitle", "स्लाइड 2 टैग / उपशीर्षक")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide2Tag}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide2Tag: e.target.value })}
                          placeholder="HERITAGE STONE ARCHITECTURE"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 2 Main Heading *", "स्लाइड 2 मुख्य शीर्षक *")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide2Title}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide2Title: e.target.value })}
                          placeholder="STONE CHHATRIS, JHAROKHAS & PILLARS"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 2 Description", "स्लाइड 2 विवरण")}
                        </label>
                        <Textarea
                          rows={2}
                          value={siteSettings.heroSlide2Desc}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide2Desc: e.target.value })}
                          placeholder="Traditional garden chhatris, palace-style jharokhas..."
                          className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Slide 3 Form Fields */}
                  {selectedHeroSlideTab === 3 && (
                    <div className="space-y-3 p-3 bg-black/40 border border-white/10 animate-in fade-in duration-200">
                      <div className="text-[11px] font-mono text-accent font-semibold uppercase flex items-center gap-1.5">
                        <span>{l("● Photo 3: 3D CNC Stone Jalis & Wall Panels", "● फोटो 3: 3D सीएनसी जाली व वॉल पैनल्स")}</span>
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 3 Tag / Subtitle", "स्लाइड 3 टैग / उपशीर्षक")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide3Tag}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide3Tag: e.target.value })}
                          placeholder="PRECISION STONE SCREENS"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 3 Main Heading *", "स्लाइड 3 मुख्य शीर्षक *")}
                        </label>
                        <Input
                          value={siteSettings.heroSlide3Title}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide3Title: e.target.value })}
                          placeholder="3D CNC STONE JALIS & WALL PANELS"
                          className="bg-white/5 border-white/20 text-white text-xs h-9 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                          {l("Slide 3 Description", "स्लाइड 3 विवरण")}
                        </label>
                        <Textarea
                          rows={2}
                          value={siteSettings.heroSlide3Desc}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSlide3Desc: e.target.value })}
                          placeholder="Custom cut 3D stone jalis and elevation screens..."
                          className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Common Hero Badges & Buttons */}
                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Hero Direct Workshop Badge Tagline", "हीरो वर्कशॉप बैज टैगलाइन")}
                      </label>
                      <Input
                        value={siteSettings.heroBadge}
                        onChange={(e) => setSiteSettings({ ...siteSettings, heroBadge: e.target.value })}
                        placeholder="DIRECT JAIPUR WORKSHOP & MANUFACTURER"
                        className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Hero Stone Catalog Highlights Strip", "पत्थर कैटलॉग हाइलाइट्स पट्टी")}
                      </label>
                      <Input
                        value={siteSettings.heroStonesStrip}
                        onChange={(e) => setSiteSettings({ ...siteSettings, heroStonesStrip: e.target.value })}
                        placeholder="Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Red Sandstone"
                        className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                          {l("Primary CTA Button", "मुख्य एक्शन बटन")}
                        </label>
                        <Input
                          value={siteSettings.heroPrimaryBtnText}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroPrimaryBtnText: e.target.value })}
                          placeholder="Explore Stone Collection"
                          className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                          {l("Secondary CTA Button", "द्वितीयक एक्शन बटन")}
                        </label>
                        <Input
                          value={siteSettings.heroSecondaryBtnText}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSecondaryBtnText: e.target.value })}
                          placeholder="Direct Workshop Enquiry"
                          className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: About Section & Heritage Narrative */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Layers className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("5. About RK Stone Corporation & Heritage", "5. आर.के. स्टोन कॉर्पोरेशन व धरोहर परिचय")}
                    </h3>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    {l(
                      "Founder name, years of experience, number of artisans, and brand story shown on homepage and About Us page.",
                      "होमपेज और About Us पेज पर दिखने वाले संस्थापक का नाम, अनुभव के वर्ष, कारीगरों की संख्या और कंपनी की कहानी।"
                    )}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Founder / Head Artisan", "संस्थापक / मुख्य शिल्पी")}
                      </label>
                      <Input
                        value={siteSettings.founderName}
                        onChange={(e) => setSiteSettings({ ...siteSettings, founderName: e.target.value })}
                        placeholder="Radheshyam Chauhan"
                        className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Establishment Year", "स्थापना वर्ष")}
                      </label>
                      <Input
                        value={siteSettings.estYear}
                        onChange={(e) => setSiteSettings({ ...siteSettings, estYear: e.target.value })}
                        placeholder="1998"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Skilled Artisans & Crew", "दक्ष कारीगर एवं शिल्प दल")}
                      </label>
                      <Input
                        value={siteSettings.employeesCount}
                        onChange={(e) => setSiteSettings({ ...siteSettings, employeesCount: e.target.value })}
                        placeholder="45+ Master Artisans & Cutters"
                        className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Annual Stone Delivered Volume", "वार्षिक डिलीवर किया गया पत्थर वॉल्यूम")}
                      </label>
                      <Input
                        value={siteSettings.annualTurnover}
                        onChange={(e) => setSiteSettings({ ...siteSettings, annualTurnover: e.target.value })}
                        placeholder="10,000+ Tonnes Delivered"
                        className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("About Section Main Heading", "अबाउट सेक्शन मुख्य शीर्षक")}
                    </label>
                    <Input
                      value={siteSettings.aboutHeading}
                      onChange={(e) => setSiteSettings({ ...siteSettings, aboutHeading: e.target.value })}
                      placeholder="25+ Years of Devotional Stone Craftsmanship"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("About Heritage Story Narrative", "धरोहर एवं शिल्प की विस्तृत कथा")}
                    </label>
                    <Textarea
                      rows={3}
                      value={siteSettings.aboutStory}
                      onChange={(e) => setSiteSettings({ ...siteSettings, aboutStory: e.target.value })}
                      placeholder="Founded with a devotion to preserving ancient Indian temple architecture..."
                      className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 6: Jaipur Workshop & Craft Showcase */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <MapPin className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("6. Jaipur Workshop & Carving Yard Showcase", "6. जयपुर वर्कशॉप एवं नक्काशी यार्ड शोकेस")}
                    </h3>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    {l(
                      "Heading, description, and Google Maps directions link inviting visitors to the Jaipur workshop on homepage.",
                      "होमपेज पर विजिटर को जयपुर वर्कशॉप आमंत्रित करने वाले सेक्शन का शीर्षक, विवरण और गूगल मैप्स दिशा-निर्देश लिंक।"
                    )}
                  </p>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Workshop Section Heading", "वर्कशॉप सेक्शन मुख्य शीर्षक")}
                    </label>
                    <Input
                      value={siteSettings.workshopHeading}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workshopHeading: e.target.value })}
                      placeholder="VISIT OUR LIVE JAIPUR WORKSHOP & CARVING YARD"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Workshop Story / Narrative", "वर्कशॉप विवरण व कहानी")}
                    </label>
                    <Textarea
                      rows={3}
                      value={siteSettings.workshopStory}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workshopStory: e.target.value })}
                      placeholder="Experience traditional craftsmanship fused with high-precision 3D CNC diamond wire saws..."
                      className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      {l("Workshop Directions Google Map Link", "वर्कशॉप दिशा-निर्देश गूगल मैप लिंक")}
                    </label>
                    <Input
                      value={siteSettings.workshopMapLink}
                      onChange={(e) => setSiteSettings({ ...siteSettings, workshopMapLink: e.target.value })}
                      placeholder="https://maps.google.com/?q=..."
                      className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 7: Map & Social Media Links (Full Width) */}
                <div className="md:col-span-2 bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Globe className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      {l("7. Interactive Map & Social Media Channels", "7. इंटरैक्टिव मैप एवं सोशल मीडिया चैनल्स")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Google Maps Embed URL (Iframe src for Contact Page)", "गूगल मैप्स एम्बेड यूआरएल (कॉन्टैक्ट पेज iframe)")}
                      </label>
                      <Input
                        value={siteSettings.mapEmbedUrl}
                        onChange={(e) => setSiteSettings({ ...siteSettings, mapEmbedUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Google Maps / Business Profile Link", "गूगल मैप्स / बिजनेस प्रोफाइल लिंक")}
                      </label>
                      <Input
                        value={siteSettings.googleReviewsUrl}
                        onChange={(e) => setSiteSettings({ ...siteSettings, googleReviewsUrl: e.target.value })}
                        placeholder="https://www.google.com/maps/place/..."
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Instagram Profile Link", "इंस्टाग्राम प्रोफाइल लिंक")}
                      </label>
                      <Input
                        value={siteSettings.socialInstagram}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialInstagram: e.target.value })}
                        placeholder="https://www.instagram.com/haritage_stone_temple/"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("Facebook Page Link", "फेसबुक पेज लिंक")}
                      </label>
                      <Input
                        value={siteSettings.socialFacebook}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialFacebook: e.target.value })}
                        placeholder="https://www.facebook.com/rkstone01"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        {l("YouTube Channel Link", "यूट्यूब चैनल लिंक")}
                      </label>
                      <Input
                        value={siteSettings.socialYoutube}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialYoutube: e.target.value })}
                        placeholder="https://youtube.com/@rkstonecorporation"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 8: Cloud Diagnostics */}
                <div className="md:col-span-2 bg-[#161616] border border-white/10 p-6 space-y-4">
                  <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    {l("8. Cloud Infrastructure & Diagnostics", "8. क्लाउड इन्फ्रास्ट्रक्चर एवं सिस्टम डायग्नोस्टिक्स")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">
                        {l("Database Engine", "डेटाबेस इंजन")}
                      </span>
                      <span className="text-emerald-400 font-bold block">MongoDB Atlas</span>
                      <span className="text-[10px] text-stone-500">Cluster: rkstonedb</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">
                        {l("Media Storage CDN", "मीडिया स्टोरेज सीडीएन")}
                      </span>
                      <span className="text-emerald-400 font-bold block">Cloudinary CDN</span>
                      <span className="text-[10px] text-stone-500">Cloud: dngtvnh69</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">
                        {l("API Server Endpoint", "एपीआई सर्वर एंडपॉइंट")}
                      </span>
                      <span className="text-accent font-bold block truncate" title={API_URL}>{API_URL}</span>
                      <span className="text-[10px] text-stone-500">Node / Express Active</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="p-3.5 sm:p-5 bg-[#161616] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 sticky bottom-4 shadow-2xl z-20">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-stone-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {l(
                      "Changes apply across all pages upon publishing.",
                      "सेव करने पर सभी बदलाव पूरी वेबसाइट पर तुरंत लागू हो जाएंगे।"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetSiteSettings}
                    disabled={savingSettings}
                    className="border-white/20 text-stone-300 hover:text-white hover:bg-white/10 text-[11px] sm:text-xs uppercase rounded-none h-9 sm:h-10 flex-1 sm:flex-initial"
                  >
                    {l("Reset", "रीसेट")}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveSiteSettings}
                    disabled={savingSettings}
                    className="bg-accent hover:bg-accent/90 text-stone-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider px-4 sm:px-6 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold flex-1 sm:flex-initial"
                  >
                    {savingSettings ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                        {l("Saving...", "सेव हो रहा है...")}
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        {l("Publish Changes", "बदलाव पब्लिश करें")}
                      </>
                    )}
                  </Button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="w-[95vw] sm:max-w-3xl bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-0.5">
                  {l("PRODUCT CATALOG STUDIO", "उत्पाद कैटलॉग स्टूडियो")}
                </span>
                <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
                  {editId ? `${l("Edit Product", "उत्पाद संपादित करें")}: ${form.name || form.code || ''}` : l("Add New Stone Product Specimen", "नया पत्थर उत्पाद जोड़ें")}
                </DialogTitle>
              </div>
              {form.code && (
                <span className="text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30 px-2.5 py-1">
                  {form.code}
                </span>
              )}
            </div>
          </DialogHeader>

          <form onSubmit={handleProductSubmit} className="space-y-5 pt-3">

            {/* Row 1: Title English & Hindi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Product Title (English) *", "उत्पाद शीर्षक (अंग्रेजी) *")}
                </label>
                <Input
                  required
                  value={form.name}
                  name="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Handcrafted Dholpur Sandstone Mandir"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Product Title (Hindi)", "उत्पाद शीर्षक (हिंदी)")}
                </label>
                <Input
                  value={form.nameHi || ""}
                  name="nameHi"
                  onChange={(e) => setForm({ ...form, nameHi: e.target.value })}
                  placeholder={l("e.g. Makrana Pure White Marble Vedic Mandir", "उदा. मकराना शुद्ध सफेद संगमरमर वैदिक मंदिर")}
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>
            </div>

            {/* Row 2: Product Code & Architectural Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Product Identification Code (e.g. RK-PROD-01)", "उत्पाद कोड (उदा. RK-PROD-01)")}
                </label>
                <Input
                  value={form.code || ""}
                  name="code"
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. RK-PROD-01"
                  className="bg-white/5 border-white/20 text-white font-mono text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Architectural Category *", "वास्तु श्रेणी *")}
                </label>
                <select
                  required
                  value={form.category}
                  name="category"
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-11 px-3 uppercase rounded-none focus:border-accent cursor-pointer"
                >
                  {customCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Stone Variety / Material (Pricing removed per request: Quote on Request) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Stone Variety / Material", "पत्थर का प्रकार / सामग्री")}
                </label>
                <Input
                  value={form.stoneType || ""}
                  name="stoneType"
                  onChange={(e) => setForm({ ...form, stoneType: e.target.value })}
                  placeholder="e.g. Natural Dholpur & Bansi Sandstone"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Pricing Policy", "मूल्य नीति")}
                </label>
                <div className="h-11 px-3.5 bg-white/5 border border-white/20 flex items-center justify-between text-xs text-stone-300">
                  <span className="text-accent font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {l("Custom Best Price on Request", "अनुरोध पर सर्वोत्तम मूल्य (कोटेशन)")}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {l("Direct WhatsApp Inquiry", "सीधी व्हाट्सएप पूछताछ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 4: Dimensions & Production Lead Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Dimensions / Physical Sizing", "आकार / माप")}
                </label>
                <Input
                  value={form.dimensions || ""}
                  name="dimensions"
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="e.g. 7ft Height x 5ft Width x 3ft Depth"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Production / Dispatch Lead Time", "निर्माण एवं डिलीवरी समय")}
                </label>
                <Input
                  value={form.leadTime || ""}
                  name="leadTime"
                  onChange={(e) => setForm({ ...form, leadTime: e.target.value })}
                  placeholder="e.g. 20-25 Days"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>
            </div>

            {/* Cloudinary Image Upload & URL input */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                {l("Product Specimen Photograph (Upload File or Enter URL)", "उत्पाद फ़ोटो (फ़ाइल अपलोड करें या लिंक दर्ज करें)")}
              </label>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="border-white/20 bg-white/5 hover:bg-white/15 text-white hover:text-white hover:border-white/40 text-xs uppercase tracking-wider rounded-none cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2 text-accent" />
                    {uploadingImage ? l("Uploading to Cloudinary...", "क्लाउडिनरी पर अपलोड हो रहा है...") : l("Choose Image File", "इमेज फ़ाइल चुनें")}
                  </Button>
                  <span className="text-xs text-stone-400 font-mono">
                    {l("or paste direct image URL below:", "या नीचे सीधा इमेज लिंक दर्ज करें:")}
                  </span>
                </div>

                <Input
                  value={form.image}
                  name="image"
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/... or /products/Stone%20Temple/3.jpg"
                  className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent font-mono"
                />

                {form.image && (
                  <div className="relative w-40 h-28 bg-stone-900 border border-white/20 overflow-hidden mt-2">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-1 right-1 bg-black/80 text-white p-1 rounded-full hover:bg-rose-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description (English & Hindi) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Artisan Description (English)", "शिल्प विवरण (अंग्रेजी)")}
                </label>
                <Textarea
                  rows={3}
                  value={form.description}
                  name="description"
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Handcrafted in authentic Dholpur and Bansi Paharpur sandstone, featuring durable architectural carving..."
                  className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Artisan Description (Hindi)", "शिल्प विवरण (हिंदी)")}
                </label>
                <Textarea
                  rows={3}
                  value={form.descriptionHi || ""}
                  name="descriptionHi"
                  onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })}
                  placeholder="शुद्ध धौलपुर व बंसी पहाड़पुर सैंडस्टोन से तराशा गया भव्य मंदिर। बारीक नक्काशी व दीर्घायु टिकाऊपन..."
                  className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                />
              </div>
            </div>

            {/* Feature Bullets Builder */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                {l("Key Features & Technical Highlights (Add points)", "मुख्य विशेषताएं एवं तकनीकी बिंदु (बिंदु जोड़ें)")}
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  placeholder={l("e.g. 100% Genuine Weatherproof Sandstone (Press Enter or Add)", "उदा. 100% शुद्ध मौसम प्रतिरोधी सैंडस्टोन (Enter या Add दबाएं)")}
                  className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  className="bg-white/10 hover:bg-white/20 text-white uppercase text-xs rounded-none shrink-0"
                >
                  {l("Add Bullet", "बिंदु जोड़ें")}
                </Button>
              </div>

              {form.features && form.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.features.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/20 text-stone-200 text-xs font-mono"
                    >
                      <span>✓ {feat}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="hover:text-rose-400 p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Live Visibility & Featured Toggles */}
            <div className="p-4 bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive !== false}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="accent-accent w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                    {l("Live on Website", "ग्राहक वेबसाइट पर लाइव दिखाएं")}
                  </span>
                  <span className="text-[11px] text-stone-400 font-light block mt-0.5">
                    {l(
                      "When checked, this product is visible to public visitors. When unchecked, it is immediately hidden.",
                      "चेक रखने पर यह उत्पाद वेबसाइट के कैटलॉग पर लाइव दिखेगा। अनचेक करने पर यह तुरंत वेबसाइट से छिप जाएगा।"
                    )}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(form.isFeatured)}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="accent-accent w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                    {l("Featured on Homepage", "होमपेज पर हाइलाइट करें")}
                  </span>
                  <span className="text-[11px] text-stone-400 font-light block mt-0.5">
                    {l(
                      "When checked, this product is displayed in featured works on the homepage.",
                      "चेक रखने पर यह उत्पाद होमपेज के मुख्य फीचर्ड वर्क्स में प्रदर्शित होगा।"
                    )}
                  </span>
                </div>
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProductModal(false)}
                className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white/40 text-xs uppercase rounded-none"
              >
                {l("Cancel", "रद्द करें")}
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold"
              >
                {editId ? l("Update Product", "उत्पाद अपडेट करें") : l("Save to Database", "डेटाबेस में सेव करें")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: MANUAL LEAD CREATION ================= */}
      <Dialog open={showAddInquiryModal} onOpenChange={setShowAddInquiryModal}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
              {l("Log Client Inquiry / Lead", "नया ग्राहक संपर्क / लीड दर्ज करें")}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleManualInquirySubmit} className="space-y-4 pt-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                {l("Client Name *", "ग्राहक का नाम *")}
              </label>
              <Input
                required
                value={manualInquiry.name}
                onChange={(e) => setManualInquiry({ ...manualInquiry, name: e.target.value })}
                placeholder="e.g. Vikramaditya Rathore"
                className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                  {l("Phone Number *", "फ़ोन नंबर *")}
                </label>
                <Input
                  required
                  value={manualInquiry.phone}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, phone: e.target.value })}
                  placeholder="e.g. 9829012345"
                  className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                  {l("Email Address", "ईमेल पता")}
                </label>
                <Input
                  value={manualInquiry.email}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, email: e.target.value })}
                  placeholder="client@gmail.com"
                  className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                  {l("Project Discipline", "परियोजना श्रेणी")}
                </label>
                <select
                  value={manualInquiry.projectType}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, projectType: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-10 px-2.5 rounded-none"
                >
                  <option value="Stone Temple Mandir">{l("Stone Temple Mandir", "मंदिर शिल्प (Stone Mandir)")}</option>
                  <option value="Heritage Haveli Elevation">{l("Heritage Haveli Elevation", "हवेली एलिवेशन (Haveli Elevation)")}</option>
                  <option value="3D CNC Jali Screen">{l("3D CNC Jali Screen", "3D सीएनसी जाली (CNC Jali Screen)")}</option>
                  <option value="Garden Water Fountain">{l("Garden Water Fountain", "फाउंटेन / फव्वारा (Water Fountain)")}</option>
                  <option value="Architect Blueprint Review">{l("Architect Blueprint Review", "आर्किटेक्ट ब्लूप्रिंट समीक्षा")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                  {l("Stone Medium", "पत्थर का प्रकार")}
                </label>
                <select
                  value={manualInquiry.stonePreference}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, stonePreference: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-10 px-2.5 rounded-none"
                >
                  <option value="Dholpur Beige Sandstone">{l("Dholpur Beige Sandstone", "धौलपुर बेज सैंडस्टोन")}</option>
                  <option value="Red Sandstone (Agra/Karauli)">{l("Red Sandstone (Agra/Karauli)", "लाल सैंडस्टोन (आगरा/करौली)")}</option>
                  <option value="Makrana White Marble">{l("Makrana White Marble", "मकराना सफेद संगमरमर")}</option>
                  <option value="Gwalior White Mint">{l("Gwalior White Mint", "ग्वालियर व्हाइट मिंट")}</option>
                  <option value="Imperial Red Sandstone">{l("Imperial Red Sandstone", "इम्पीरियल रेड सैंडस्टोन")}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                {l("Project Notes & Scope", "परियोजना विवरण एवं नोट्स")}
              </label>
              <Textarea
                rows={3}
                value={manualInquiry.message}
                onChange={(e) => setManualInquiry({ ...manualInquiry, message: e.target.value })}
                placeholder={l(
                  "Client contacted via phone for 8x6 ft private mandir for residential villa in Mumbai...",
                  "ग्राहक ने मुंबई में आवासीय विला के लिए 8x6 फीट के निजी मंदिर हेतु फोन पर संपर्क किया..."
                )}
                className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddInquiryModal(false)}
                className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white/40 text-xs uppercase rounded-none"
              >
                {l("Cancel", "रद्द करें")}
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-5 rounded-none cursor-pointer"
              >
                {l("Save Client Lead", "लीड सुरक्षित करें")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: QUICK VIEW PRODUCT ================= */}
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent className="w-[95vw] sm:max-w-xl bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[92vh] overflow-y-auto">
          {viewProduct && (
            <div className="space-y-4">
              <div className="relative h-64 bg-stone-900 border border-white/10 overflow-hidden">
                <img src={viewProduct.image} alt={viewProduct.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-stone-950/85 px-3 py-1 text-accent text-xs font-mono font-bold uppercase">
                  {viewProduct.category}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-medium uppercase text-white tracking-wide">
                  {viewProduct.name}
                </h3>
                <div className="text-accent text-sm font-bold font-mono uppercase mt-1">
                  {l("Pricing: Best Price on Request", "मूल्य: अनुरोध पर सर्वोत्तम मूल्य")}
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {viewProduct.description || l(
                  "Bespoke stone craftsmanship manufactured directly at RK Stone Corporation Jaipur.",
                  "आर.के. स्टोन कॉर्पोरेशन जयपुर द्वारा निर्मित प्रामाणिक व उत्कृष्ट पाषाण शिल्प।"
                )}
              </p>

              {viewProduct.features && viewProduct.features.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase text-accent block mb-2">
                    {l("Specifications:", "विशिष्टताएं:")}
                  </span>
                  <div className="space-y-1.5">
                    {viewProduct.features.map((feat, i) => (
                      <div key={i} className="text-xs text-stone-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter className="pt-4 border-t border-white/10 flex justify-end">
                <Button
                  onClick={() => setViewProduct(null)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs uppercase rounded-none"
                >
                  {l("Close", "बंद करें")}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent className="w-[95vw] sm:max-w-md bg-[#141414] border border-rose-500/30 text-white rounded-none p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-heading font-normal uppercase text-rose-400 tracking-wide flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              {l("Confirm Permanent Deletion", "स्थायी रूप से हटाने की पुष्टि करें")}
            </DialogTitle>
          </DialogHeader>

          <p className="text-xs text-stone-300 leading-relaxed pt-2">
            {l(
              "Are you sure you want to remove this piece from the catalog? This will delete the product listing permanently from the live catalog and MongoDB.",
              "क्या आप वाकई इस उत्पाद को कैटलॉग से हटाना चाहते हैं? यह उत्पाद लाइव कैटलॉग और डेटाबेस से स्थायी रूप से हटा दिया जाएगा।"
            )}
          </p>

          <DialogFooter className="pt-4 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDeleteId(null)}
              className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white/40 text-xs uppercase rounded-none"
            >
              {l("Cancel", "रद्द करें")}
            </Button>
            <Button
              type="button"
              onClick={() => confirmDeleteId && handleDeleteProduct(confirmDeleteId)}
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs uppercase font-bold rounded-none cursor-pointer"
            >
              {l("Confirm Delete", "हटाने की पुष्टि करें")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* ================= MODAL: INQUIRY DOSSIER & CRM ================= */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[90vh] overflow-y-auto">
          {selectedInquiry && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1">
                      {l("CLIENT INQUIRY & PROJECT DETAILS", "ग्राहक पूछताछ एवं परियोजना विवरण")}
                    </span>
                    <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
                      {selectedInquiry.name}
                    </DialogTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const srcInfo = getSourceBadge(selectedInquiry.source);
                      const SrcIcon = srcInfo.icon;
                      return (
                        <span className={`text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider flex items-center gap-1.5 ${srcInfo.badge}`}>
                          <SrcIcon className="w-3.5 h-3.5" />
                          {srcInfo.label}
                        </span>
                      );
                    })()}
                    <span className={`text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider ${getStatusBadge(selectedInquiry.status)}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                </div>
              </DialogHeader>

              {/* Client Quick Contact Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white/5 border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                    {l("Phone Number", "फ़ोन नंबर")}
                  </span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-white font-bold hover:text-accent flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    {selectedInquiry.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                    {l("Email Address", "ईमेल पता")}
                  </span>
                  {selectedInquiry.email ? (
                    <a href={`mailto:${selectedInquiry.email}`} className="text-stone-300 hover:text-accent truncate block">
                      {selectedInquiry.email}
                    </a>
                  ) : (
                    <span className="text-stone-500">{l("Not provided", "उपलब्ध नहीं")}</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                    {l("Received Date", "प्राप्त तिथि")}
                  </span>
                  <span className="text-stone-300">
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString(language === "hi" ? "hi-IN" : "en-IN") : l("Recent", "हाल ही में")}
                  </span>
                </div>
              </div>

              {/* Commission Specifications */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                  {l("Project Requirements & Dimensions", "परियोजना आवश्यकताएं एवं आयाम")}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                      {l("Project Discipline", "परियोजना श्रेणी")}
                    </span>
                    <span className="text-white font-semibold">{selectedInquiry.projectType || l("General Inquiry", "सामान्य पूछताछ")}</span>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                      {l("Stone Preference", "पत्थर प्राथमिकता")}
                    </span>
                    <span className="text-accent font-semibold">{selectedInquiry.stonePreference || l("Not Specified", "निर्दिष्ट नहीं")}</span>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                      {l("Delivery City / Site", "डिलीवरी शहर / साइट")}
                    </span>
                    <span className="text-white font-semibold">{selectedInquiry.city || selectedInquiry.address || l("Not Specified", "निर्दिष्ट नहीं")}</span>
                  </div>

                  {selectedInquiry.dimensions && (
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                        {l("Dimensions / Area", "आयाम / क्षेत्रफल")}
                      </span>
                      <span className="text-white font-semibold">{selectedInquiry.dimensions}</span>
                    </div>
                  )}

                  {selectedInquiry.estimatedBudget && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                        {l("Estimated Budget", "अनुमानित बजट")}
                      </span>
                      <span className="text-emerald-400 font-bold">{selectedInquiry.estimatedBudget}</span>
                    </div>
                  )}

                  {selectedInquiry.productName && (
                    <div className="p-3 bg-accent/10 border border-accent/30">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">
                        {l("Product Specimen", "संबंधित उत्पाद")}
                      </span>
                      <span className="text-accent font-semibold">{selectedInquiry.productName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CLIENT ATTACHMENTS, DRAWINGS & PHOTOS GALLERY */}
              {(() => {
                const inq = selectedInquiry;
                const inqPhotos: string[] = [];
                if (Array.isArray(inq.photos)) {
                  inq.photos.forEach(p => { if (p && !inqPhotos.includes(p)) inqPhotos.push(p); });
                }
                if (Array.isArray(inq.attachments)) {
                  inq.attachments.forEach(att => {
                    if (att.url && (att.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(att.url))) {
                      if (!inqPhotos.includes(att.url)) inqPhotos.push(att.url);
                    }
                  });
                }
                const docAttachments = (inq.attachments || []).filter(att =>
                  att.url && !att.fileType?.startsWith("image/") && !/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(att.url)
                );

                if (inqPhotos.length === 0 && docAttachments.length === 0) return null;

                return (
                  <div className="p-5 bg-gradient-to-r from-amber-950/20 via-black/40 to-stone-900/40 border-2 border-accent/40 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                          {l("📷 CUSTOMER ATTACHED PHOTOS & DRAWINGS", "📷 ग्राहक द्वारा संलग्न तस्वीरें व नक़्शे")} ({inqPhotos.length + docAttachments.length})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        {l("Click any photo to enlarge or download", "बड़ा देखने या डाउनलोड करने हेतु किसी भी फ़ोटो पर क्लिक करें")}
                      </span>
                    </div>

                    {/* Photo Gallery Grid */}
                    {inqPhotos.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase text-stone-300 block font-semibold">
                          {l("Customer Photos & Site References:", "ग्राहक फ़ोटो एवं साइट संदर्भ:")}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {inqPhotos.map((photoUrl, pIdx) => {
                            const matchedAtt = inq.attachments?.find(a => a.url === photoUrl);
                            const label = matchedAtt?.filename || `Photo #${pIdx + 1}`;
                            return (
                              <div key={pIdx} className="group relative bg-black/80 border border-white/20 hover:border-accent overflow-hidden transition-all shadow-md">
                                <div
                                  onClick={() => setActivePhotoModal({ url: photoUrl, title: `${inq.name} - ${label}`, filename: matchedAtt?.filename })}
                                  className="cursor-pointer aspect-square w-full overflow-hidden relative"
                                >
                                  <img
                                    src={photoUrl}
                                    alt={label}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] font-mono font-bold bg-accent text-stone-950 px-2 py-1 uppercase tracking-wider flex items-center gap-1 shadow">
                                      <ZoomIn className="w-3.5 h-3.5" /> {l("Enlarge", "बड़ा देखें")}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-2 flex items-center justify-between gap-1 text-[10px] font-mono bg-black/90 border-t border-white/10">
                                  <span className="text-stone-300 truncate" title={label}>{label}</span>
                                  <a
                                    href={photoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="text-accent hover:text-white shrink-0 p-1"
                                    title={l("Open full resolution", "पूर्ण रिज़ॉल्यूशन में खोलें")}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Non-image documents (CAD, PDF, DWG, ZIP) */}
                    {docAttachments.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-[11px] font-mono uppercase text-stone-300 block font-semibold">
                          {l("CAD Drawings & Documents:", "सीएडी नक़्शे एवं दस्तावेज़:")}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {docAttachments.map((doc, dIdx) => (
                            <a
                              key={dIdx}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="p-3 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-accent text-white flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 bg-accent/20 text-accent flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-mono font-bold truncate group-hover:text-accent">
                                    {doc.filename || `Document #${dIdx + 1}`}
                                  </div>
                                  <div className="text-[10px] text-stone-400 font-mono">
                                    {doc.size ? `${(doc.size / (1024 * 1024)).toFixed(2)} MB` : l("Attachment", "संलग्न फ़ाइल")} • {doc.fileType || "File"}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-accent shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                {l("Download", "डाउनलोड")} <ExternalLink className="w-3.5 h-3.5" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Full Client Message */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold block mb-1.5">
                  {l("Client Request & Scope Details", "ग्राहक संदेश व परियोजना विवरण")}
                </span>
                <div className="p-4 bg-white/5 border border-white/10 text-xs text-stone-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedInquiry.message || l("No additional message supplied.", "कोई अतिरिक्त संदेश नहीं दिया गया।")}
                </div>
              </div>

              {/* Status Update & Internal Notes */}
              <div className="p-4 bg-black/60 border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    {l("Workflow Status & Internal Notes", "कार्यप्रवाह स्थिति एवं आंतरिक नोट्स")}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400 uppercase">{l("Status:", "स्थिति:")}</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => {
                        const newSt = e.target.value as Inquiry["status"];
                        updateInquiryStatus(selectedInquiry._id, newSt);
                        setSelectedInquiry({ ...selectedInquiry, status: newSt });
                      }}
                      className="bg-[#1e1e1e] border border-white/20 text-xs text-white px-3 py-1 uppercase font-mono rounded-none focus:border-accent cursor-pointer"
                    >
                      <option value="New">{l("🔴 New Lead", "🔴 नई लीड")}</option>
                      <option value="Contacted">{l("🔵 Contacted", "🔵 संपर्क किया")}</option>
                      <option value="In Design">{l("🟡 In Design & CAD", "🟡 डिज़ाइनिंग व सीएडी")}</option>
                      <option value="Quoted">{l("🟣 Official Quote Sent", "🟣 कोटेशन भेजा गया")}</option>
                      <option value="Completed">{l("🟢 Completed & Delivered", "🟢 पूर्ण व डिलीवर")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1 block">
                    {l("Admin / Mason Notes (Saved for Internal Reference):", "एडमिन / कारीगर नोट्स (आंतरिक संदर्भ हेतु सुरक्षित):")}
                  </label>
                  <Textarea
                    rows={3}
                    value={inquiryNotesEdit}
                    onChange={(e) => setInquiryNotesEdit(e.target.value)}
                    placeholder={l(
                      "e.g. Sent PDF drawing on WhatsApp. Client requested sample of Bansi Paharpur. Follow up on Tuesday...",
                      "उदा. व्हाट्सएप पर पीडीएफ ड्राइंग भेजी। ग्राहक ने बंसी पहाड़पुर का नमूना मांगा। मंगलवार को फॉलो-अप करें..."
                    )}
                    className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleSaveInquiryNotes}
                    disabled={savingInquiryNotes}
                    className="bg-accent hover:bg-accent/90 text-stone-950 font-bold text-xs uppercase px-4 h-9 rounded-none cursor-pointer"
                  >
                    {savingInquiryNotes ? l("Saving Notes...", "नोट्स सेव हो रहे हैं...") : l("Save Internal Note", "आंतरिक नोट सेव करें")}
                  </Button>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/91${selectedInquiry.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Namaste ${selectedInquiry.name}, this is RK Stone Corporation Jaipur regarding your inquiry for ${selectedInquiry.projectType}. How can our chief artisan assist you with the quarry selection and quotation?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    {l("Chat on WhatsApp", "व्हाट्सएप पर चैट करें")}
                  </a>

                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {l("Call Client", "ग्राहक को कॉल करें")}
                  </a>
                </div>

                <Button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-xs uppercase rounded-none"
                >
                  {l("Close Dossier", "डोज़ियर बंद करें")}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: CUSTOMER PHOTO FULL RESOLUTION LIGHTBOX ================= */}
      <Dialog open={!!activePhotoModal} onOpenChange={() => setActivePhotoModal(null)}>
        <DialogContent className="w-[96vw] sm:max-w-4xl bg-[#121212] border-2 border-accent text-white rounded-none p-3 sm:p-6 max-h-[95vh] flex flex-col">
          {activePhotoModal && (
            <div className="flex flex-col h-full space-y-4">
              <DialogHeader>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <DialogTitle className="text-base font-heading font-normal uppercase text-white tracking-wide truncate">
                    {activePhotoModal.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={activePhotoModal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-accent text-stone-950 font-bold font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-accent/90 cursor-pointer shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {l("Open Full Resolution", "पूर्ण रिज़ॉल्यूशन में खोलें")}
                    </a>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 flex items-center justify-center bg-black/90 p-2 min-h-[300px] max-h-[70vh] overflow-hidden border border-white/10">
                <img
                  src={activePhotoModal.url}
                  alt={activePhotoModal.title}
                  className="max-h-[68vh] max-w-full object-contain mx-auto shadow-2xl"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-stone-400 pt-2 border-t border-white/10">
                <span className="truncate max-w-md">{activePhotoModal.filename || activePhotoModal.url}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActivePhotoModal(null)}
                  className="border-white/20 text-white hover:bg-white/10 text-xs uppercase rounded-none cursor-pointer"
                >
                  {l("Close Preview", "पूर्वावलोकन बंद करें")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: CHANGE ADMIN USERNAME & PASSWORD ================= */}
      <Dialog open={showCredentialsModal} onOpenChange={setShowCredentialsModal}>
        <DialogContent className="w-[95vw] sm:max-w-md bg-[#141414] border-2 border-accent text-white rounded-none p-4 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <div className="w-12 h-12 bg-accent/15 border border-accent/40 text-accent flex items-center justify-center mb-2 mx-auto">
              <Key className="w-6 h-6 text-accent" />
            </div>
            <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide text-center">
              {l("Change Admin Credentials", "एडमिन लॉगिन क्रेडेंशियल्स बदलें")}
            </DialogTitle>
            <p className="text-xs text-stone-400 text-center font-light">
              {l(
                "Update Admin panel username and password. Saved securely in MongoDB Atlas.",
                "एडमिन पैनल का यूजरनेम और पासवर्ड बदलें। नए क्रेडेंशियल्स मोंगोडीबी में सुरक्षित सेव होंगे।"
              )}
            </p>
          </DialogHeader>

          <form onSubmit={handleChangeCredentials} className="space-y-4 pt-3">
            {/* Current Password (Required for security verification) */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                <span>{l("Current Password *", "वर्तमान पासवर्ड *")}</span>
                <span className="text-[10px] text-amber-400">
                  {l("Required for verification", "सत्यापन हेतु आवश्यक")}
                </span>
              </label>
              <div className="relative">
                <Input
                  required
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={l("Enter your current admin password", "अपना वर्तमान एडमिन पासवर्ड दर्ज करें")}
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Username */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                {l("New Admin Username", "नया एडमिन यूजरनेम")}
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. admin or rkstone_master"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block font-mono">
                {l("Current active username:", "वर्तमान सक्रिय यूजरनेम:")} <b className="text-accent">{adminProfile.username}</b>
              </span>
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                {l("New Password", "नया पासवर्ड")}
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={l("Leave blank if you only want to change username", "यदि केवल यूजरनेम बदलना हो तो इसे खाली छोड़ें")}
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            {newPassword.length > 0 && (
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  {l("Confirm New Password", "नए पासवर्ड की पुष्टि करें")}
                </label>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={l("Re-enter new password", "नया पासवर्ड पुनः दर्ज करें")}
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>
            )}

            <DialogFooter className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCredentialsModal(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="border-white/20 text-white hover:text-white hover:bg-white/10 text-xs uppercase rounded-none"
              >
                {l("Cancel", "रद्द करें")}
              </Button>

              <Button
                type="submit"
                disabled={updatingCredentials}
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold disabled:opacity-50"
              >
                {updatingCredentials ? l("Updating Security...", "सुरक्षा अपडेट हो रही है...") : l("Save Credentials", "क्रेडेंशियल्स सुरक्षित करें")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
