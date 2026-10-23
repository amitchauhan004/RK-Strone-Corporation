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
  Calculator,
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
  EyeOff
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

export const customCategories = [
  { id: "stone-temple", name: "Stone Temple & Mandirs" },
  { id: "heritage-haveli", name: "Heritage Haveli Facades & Pillars" },
  { id: "wall-panel", name: "3D CNC Jalis & Wall Panels" },
  { id: "garden-fountain", name: "Garden Fountains & Water Cascades" },
  { id: "chhatri", name: "Royal Stone Chhatris & Gazebos" },
  { id: "animals", name: "Monolithic Animal Sculptures" },
  { id: "gate", name: "Monumental Entrance Torans & Gates" },
  { id: "stone-carving", name: "Bas-Relief Stone Carvings" },
  { id: "dhaulpur-stone", name: "Dholpur Sandstone Blocks" },
  { id: "pink-sand-stone", name: "Bansi Paharpur Pink Sandstone" },
  { id: "jodhpur-stone", name: "Jodhpur Imperial Red Sandstone" },
  { id: "gwalior-stone", name: "Gwalior White Mint Sandstone" },
  { id: "red-stone", name: "Rajasthan Red Sandstone" },
  { id: "garden-ornaments", name: "Courtyard Planters & Urns" },
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

export interface AdminStoneRate {
  id: string;
  nameEn: string;
  nameHi: string;
  baseSqFtRate: number;
  descEn: string;
  descHi: string;
  isAvailable: boolean;
}

export interface AdminWorkType {
  id: string;
  nameEn: string;
  nameHi: string;
  factor: number;
  isAvailable: boolean;
}

const emptyProduct: Product = {
  code: "",
  name: "",
  nameHi: "",
  price: 0,
  priceUnit: "piece",
  image: "",
  category: "stone-temple",
  stoneType: "Makrana Pure White Marble",
  description: "",
  descriptionHi: "",
  features: [],
  dimensions: "",
  leadTime: "20-25 Days",
  isActive: true,
  isFeatured: false,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "inquiries" | "reviews" | "calculator" | "settings">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Calculator State
  const [calcStoneRates, setCalcStoneRates] = useState<AdminStoneRate[]>([]);
  const [calcWorkTypes, setCalcWorkTypes] = useState<AdminWorkType[]>([]);
  const [calcWastage, setCalcWastage] = useState<number>(8);
  const [calcInstallation, setCalcInstallation] = useState<number>(120);
  const [calcRatesLoading, setCalcRatesLoading] = useState<boolean>(false);
  const [savingRates, setSavingRates] = useState<boolean>(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string>("");

  const [showAddStoneModal, setShowAddStoneModal] = useState<boolean>(false);
  const [newStone, setNewStone] = useState<AdminStoneRate>({
    id: "",
    nameEn: "",
    nameHi: "",
    baseSqFtRate: 500,
    descEn: "",
    descHi: "",
    isAvailable: true,
  });

  const [showAddWorkModal, setShowAddWorkModal] = useState<boolean>(false);
  const [newWorkType, setNewWorkType] = useState<AdminWorkType>({
    id: "",
    nameEn: "",
    nameHi: "",
    factor: 1.0,
    isAvailable: true,
  });

  // Calculator Live Simulator state inside Admin
  const [simLength, setSimLength] = useState<number>(10);
  const [simHeight, setSimHeight] = useState<number>(8);
  const [simStoneId, setSimStoneId] = useState<string>("gwalior-mint");
  const [simWorkId, setSimWorkId] = useState<string>("cnc-jali");
  const [simIncludeInstallation, setSimIncludeInstallation] = useState<boolean>(true);

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
    companyName: "RK Stone Corporation",
    tagline: "Direct Quarry Sourcing • Pan-India Installation",
    primaryPhone: "+91 94147 84562",
    whatsappNumber: "+91 94147 84562",
    email: "contact@rkstonecorporation.com",
    workshopAddress: "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India",
    workshopCity: "Jaipur, Rajasthan",
    workingHours: "Mon - Sun: 8:00 AM - 7:00 PM",
    gstNumber: "08AAAAA0000A1Z5",
    announcementActive: true,
    announcementText: "✨ DIRECT JAIPUR WORKSHOP & MANUFACTURER: Handcrafted Temples, 3D CNC Stone Jalis & Chhatris",
    heroBadge: "DIRECT JAIPUR WORKSHOP & MANUFACTURER",
    heroStonesStrip: "Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Makrana Marble",
    googleReviewsUrl: "https://www.google.com/maps/place/R+K+Stone+Carporation/",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
    socialInstagram: "https://instagram.com/rkstonecorporation",
    socialFacebook: "https://facebook.com/rkstonecorporation",
    socialYoutube: "https://youtube.com/@rkstonecorporation",
  });
  const [siteSettingsLoading, setSiteSettingsLoading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsLastUpdated, setSettingsLastUpdated] = useState<string>("");
  const [manualInquiry, setManualInquiry] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Stone Temple Mandir",
    stonePreference: "Makrana White Marble",
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

  const fetchCalculatorRates = async () => {
    setCalcRatesLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/calculator-rates`);
      if (res.data) {
        if (Array.isArray(res.data.stoneRates)) setCalcStoneRates(res.data.stoneRates);
        if (Array.isArray(res.data.workTypes)) setCalcWorkTypes(res.data.workTypes);
        if (typeof res.data.wastagePercent === "number") setCalcWastage(res.data.wastagePercent);
        if (typeof res.data.installationSurcharge === "number") setCalcInstallation(res.data.installationSurcharge);
        if (res.data.updatedAt) setRatesLastUpdated(new Date(res.data.updatedAt).toLocaleString("en-IN"));
      }
    } catch {
      toast.error("Failed to load calculator rates.");
    } finally {
      setCalcRatesLoading(false);
    }
  };

  const handleSaveCalculatorRates = async () => {
    setSavingRates(true);
    try {
      const res = await axios.put(`${API_URL}/api/admin/calculator-rates`, {
        stoneRates: calcStoneRates,
        workTypes: calcWorkTypes,
        wastagePercent: calcWastage,
        installationSurcharge: calcInstallation,
        updatedBy: "Admin"
      });
      if (res.data.success) {
        toast.success("Stone & Cost Estimator rates updated successfully! Changes are live on the website.");
        setRatesLastUpdated(new Date().toLocaleString("en-IN"));
      }
    } catch {
      toast.error("Failed to save calculator rates.");
    } finally {
      setSavingRates(false);
    }
  };

  const handleResetCalculatorRates = async () => {
    if (!window.confirm("Are you sure you want to reset all stone rates to factory defaults?")) return;
    setSavingRates(true);
    try {
      const res = await axios.post(`${API_URL}/api/admin/calculator-rates/reset`);
      if (res.data.success && res.data.config) {
        setCalcStoneRates(res.data.config.stoneRates || []);
        setCalcWorkTypes(res.data.config.workTypes || []);
        setCalcWastage(res.data.config.wastagePercent || 8);
        setCalcInstallation(res.data.config.installationSurcharge || 15);
        toast.success("Calculator rates reset to factory defaults.");
      }
    } catch {
      toast.error("Failed to reset calculator rates.");
    } finally {
      setSavingRates(false);
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
        setSiteSettings(res.data.settings);
        toast.success("Website settings reset to factory defaults.");
        window.dispatchEvent(new CustomEvent("site-settings-updated", { detail: res.data.settings }));
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

  const handleAddStone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStone.nameEn || !newStone.baseSqFtRate) {
      toast.error("Please provide stone name and base rate.");
      return;
    }
    const id = newStone.id.trim() || newStone.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const updated = [...calcStoneRates, { ...newStone, id }];
    setCalcStoneRates(updated);
    setShowAddStoneModal(false);
    setNewStone({
      id: "",
      nameEn: "",
      nameHi: "",
      baseSqFtRate: 500,
      descEn: "",
      descHi: "",
      isAvailable: true,
    });
    toast.success("New stone added to table. Click 'Save All Rates' to apply to live website.");
  };

  const handleDeleteStone = (id: string) => {
    if (calcStoneRates.length <= 1) {
      toast.error("At least one stone rate is required.");
      return;
    }
    setCalcStoneRates(calcStoneRates.filter(s => s.id !== id));
    toast.info("Stone removed from list. Click 'Save All Rates' to apply.");
  };

  const handleAddWorkType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkType.nameEn || !newWorkType.factor) {
      toast.error("Please provide craft name and factor.");
      return;
    }
    const id = newWorkType.id.trim() || newWorkType.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const updated = [...calcWorkTypes, { ...newWorkType, id }];
    setCalcWorkTypes(updated);
    setShowAddWorkModal(false);
    setNewWorkType({
      id: "",
      nameEn: "",
      nameHi: "",
      factor: 1.0,
      isAvailable: true,
    });
    toast.success("New craft category added. Click 'Save All Rates' to apply to live website.");
  };

  const handleDeleteWorkType = (id: string) => {
    if (calcWorkTypes.length <= 1) {
      toast.error("At least one craft category is required.");
      return;
    }
    setCalcWorkTypes(calcWorkTypes.filter(w => w.id !== id));
    toast.info("Craft category removed. Click 'Save All Rates' to apply.");
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
    fetchCalculatorRates();
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
        stonePreference: "Makrana White Marble",
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
        icon: Calculator
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
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#141414] border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ease-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview &amp; Metrics</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("products");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Stone Catalog</span>
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
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Client Inquiries</span>
              </div>
              {inquiries.filter(i => i.status === "New").length > 0 && (
                <span className="text-[10px] px-2 py-0.5 font-mono bg-rose-500 text-white font-bold animate-pulse">
                  {inquiries.filter(i => i.status === "New").length} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("reviews");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span>Reviews &amp; Ratings</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-mono ${activeTab === "reviews" ? "bg-stone-950 text-accent" : "bg-white/10 text-stone-300"}`}>
                {reviews.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("calculator");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4" />
                <span>Rates &amp; Calculator</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-mono ${activeTab === "calculator" ? "bg-stone-950 text-accent font-bold" : "bg-emerald-500/20 text-emerald-400 font-semibold"}`}>
                LIVE
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-accent text-stone-950 font-semibold shadow-gold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>Website Customization</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-mono ${activeTab === "settings" ? "bg-stone-950 text-accent font-bold" : "bg-accent/20 text-accent font-semibold"}`}>
                LIVE
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 bg-white/5 border border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Online
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
            <span>Open Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
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
                RK STONE CORP • {activeTab.toUpperCase()}
              </span>
              <h1 className="text-xs sm:text-base lg:text-lg font-heading font-normal uppercase text-white tracking-wide truncate leading-tight mt-0.5">
                {activeTab === "overview" && "Executive Summary"}
                {activeTab === "products" && "Stone Product Catalog"}
                {activeTab === "inquiries" && "Customer Inquiries & Leads"}
                {activeTab === "reviews" && "Customer Testimonials"}
                {activeTab === "calculator" && "Live Rates Manager"}
                {activeTab === "settings" && "Customization Studio"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {activeTab === "products" && (
              <Button
                onClick={openAddProduct}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                title="Add New Product"
              >
                <Plus className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Add Product</span>
              </Button>
            )}

            {activeTab === "inquiries" && (
              <Button
                onClick={() => setShowAddInquiryModal(true)}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                title="Log Manual Lead"
              >
                <Plus className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Log Manual Lead</span>
                <span className="sm:hidden text-[10px]">Lead</span>
              </Button>
            )}

            {activeTab === "settings" && (
              <Button
                onClick={handleSaveSiteSettings}
                disabled={savingSettings}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-2.5 sm:px-4 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold disabled:opacity-50"
                title="Save Customizations"
              >
                <Save className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{savingSettings ? "Saving Live..." : "Save Customization"}</span>
                <span className="sm:hidden text-[10px]">{savingSettings ? "..." : "Save"}</span>
              </Button>
            )}

            <button
              onClick={() => {
                fetchProducts();
                fetchInquiries();
                fetchReviews();
                fetchStats();
                toast.success("All data synchronized.");
              }}
              title="Refresh Data"
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
                        <span className="block font-medium text-white truncate">Change Admin Username &amp; Password</span>
                        <span className="text-[10px] text-stone-400 block truncate">Update security credentials in MongoDB</span>
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
                        <span className="block text-white truncate">View Live Public Website</span>
                        <span className="text-[10px] text-stone-400 block truncate">Open client site in new window</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    </a>

                    {/* 3. Rates & Calculator */}
                    <button
                      onClick={() => {
                        setActiveTab("calculator");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-stone-200 hover:text-white hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">Stone Rates &amp; Calculator</span>
                        <span className="text-[10px] text-stone-400 block truncate">Manage real-time stone &amp; craft rates</span>
                      </div>
                    </button>

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
                        <span className="block text-white truncate">Website Customization Studio</span>
                        <span className="text-[10px] text-stone-400 block truncate">Phone, WhatsApp, address, announcement</span>
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
                        <span className="block text-white truncate">Direct WhatsApp Desk</span>
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
                        toast.success("System data refreshed.");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left text-stone-200 hover:text-white hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-accent shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                      <div className="flex-1 text-left min-w-0">
                        <span className="block text-white truncate">Sync System Data</span>
                        <span className="text-[10px] text-stone-400 block truncate">Reload database state</span>
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
                      <span>Sign Out Securely</span>
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
                    <span>Products in Catalog</span>
                    <Package className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {products.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span>Active Stone Pieces</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">Manage →</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("inquiries")}
                  className="p-4 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/60 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>Total Client Inquiries</span>
                    <Inbox className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {inquiries.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span className="text-rose-400 font-semibold">{inquiries.filter(i => i.status === "New").length} Awaiting Reply</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">Review Leads →</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("reviews")}
                  className="p-4 sm:p-6 bg-[#161616] border border-white/10 hover:border-accent/60 transition-all cursor-pointer relative group"
                >
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>Verified Reviews</span>
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    {reviews.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 flex items-center justify-between">
                    <span>Average 5.0 Rating</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">Moderate →</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-[#161616] border border-white/10">
                  <div className="flex items-center justify-between text-stone-400 text-xs font-mono uppercase mb-2 sm:mb-4">
                    <span>Active Categories</span>
                    <Layers className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-heading font-light text-white tracking-wide">
                    14
                  </div>
                  <div className="text-xs text-stone-400 mt-2">
                    <span>Temples, Havelis, Jalis &amp; Sculptures</span>
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
                        Recent Client Inquiries &amp; Leads
                      </h2>
                      <span className="text-[11px] sm:text-xs text-stone-400">Direct website submissions awaiting reply</span>
                    </div>
                    <Button
                      onClick={() => setActiveTab("inquiries")}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-xs uppercase tracking-wider text-stone-300 hover:text-white hover:bg-white/10 hover:border-white/40 self-start sm:self-auto"
                    >
                      View All ({inquiries.length})
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
                      Catalog Distribution
                    </h2>
                    <span className="text-[11px] sm:text-xs text-stone-400 block mb-4 sm:mb-6">Inventory by architectural typologies</span>

                    <div className="space-y-3.5">
                      {customCategories.slice(0, 7).map((cat) => {
                        const count = products.filter(p => p.category === cat.id).length;
                        const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                        return (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-stone-300 truncate max-w-[200px]">{cat.name}</span>
                              <span className="text-accent font-mono">{count} pcs</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-accent transition-all duration-500"
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-5 sm:pt-6 border-t border-white/10 mt-5 sm:mt-6">
                    <Button
                      onClick={openAddProduct}
                      className="w-full bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs tracking-wider py-4 sm:py-5 rounded-none cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Product Specimen
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
                      Filter:
                    </span>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("all")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        productStatusFilter === "all"
                          ? "bg-accent text-stone-950 font-bold shadow-sm"
                          : "bg-white/5 text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      All ({products.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("active")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        productStatusFilter === "active"
                          ? "bg-emerald-600 text-white font-bold shadow-sm"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                      }`}
                    >
                      <span>🟢 Live</span>
                      <span className="font-bold">({activeProductsCount})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductStatusFilter("disabled")}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        productStatusFilter === "disabled"
                          ? "bg-rose-600 text-white font-bold shadow-sm"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                      }`}
                    >
                      <span>🔴 Hidden</span>
                      <span className="font-bold">({disabledProductsCount})</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <span className="text-[11px] sm:text-xs font-mono text-stone-400">
                      {filteredProducts.length} of {products.length} Products
                    </span>
                    <Button
                      onClick={openAddProduct}
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-[11px] sm:text-xs tracking-wider px-3 sm:px-5 h-9 sm:h-10 rounded-none cursor-pointer shadow-gold"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Add Product
                    </Button>
                  </div>
                </div>

                {/* Search & Category Filter Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      placeholder="Search product, code (RK-PROD-01), stone variety..."
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
                      <option value="all">All Categories ({products.length})</option>
                      {customCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({products.filter(p => p.category === c.id).length})
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
                  Loading stone catalog from database...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-24 bg-[#161616] border border-white/10 text-center space-y-4">
                  <Package className="w-12 h-12 text-stone-600 mx-auto" />
                  <h3 className="text-base uppercase tracking-wider text-stone-300">No Stone Products Match Filters</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Try changing your status filter (Live / Disabled), search query, or add a new piece to your product catalog.
                  </p>
                  <Button
                    onClick={openAddProduct}
                    className="bg-accent text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer"
                  >
                    Add Product
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
                        className={`bg-[#161616] border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                          isLive
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
                                  🟢 Live
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-rose-950/90 text-rose-400 border border-rose-500/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                                  🔴 Disabled
                                </span>
                              )}
                            </div>

                            {/* Bottom Right: Price */}
                            <div className="absolute bottom-2.5 right-2.5 bg-stone-950/90 px-2.5 py-1 text-white text-xs font-bold font-mono border border-white/10">
                              ₹{Number(p.price || 0).toLocaleString()} <span className="text-[10px] font-normal text-stone-400">/ {p.priceUnit || 'piece'}</span>
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
                            className={`py-2 text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer border ${
                              isLive
                                ? "bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 border-rose-500/30"
                                : "bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40 font-bold"
                            }`}
                            title={isLive ? "Click to hide from customer website" : "Click to publish live on website"}
                          >
                            {isToggling ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : isLive ? (
                              <span>Hide</span>
                            ) : (
                              <span>Enable</span>
                            )}
                          </button>

                          {/* 2. Edit Button */}
                          <button
                            type="button"
                            onClick={() => openEditProduct(p)}
                            className="py-2 bg-white/5 hover:bg-white/15 text-stone-200 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
                            title="Edit full product specifications"
                          >
                            <Edit className="w-3 h-3 text-sky-400" />
                            Edit
                          </button>

                          {/* 3. View Live on Site Link */}
                          <a
                            href={`/product/${p.code || p._id || p.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 bg-white/5 hover:bg-white/15 text-stone-200 text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
                            title="View product details page on website"
                          >
                            <ExternalLink className="w-3 h-3 text-accent" />
                            Site
                          </a>

                          {/* 4. Delete Button */}
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(p._id || p.id || null)}
                            className="py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center justify-center border border-rose-500/20 transition-colors cursor-pointer"
                            title="Delete permanently from database"
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
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          inquiryStatusFilter === st
                            ? "bg-accent text-stone-950 font-bold shadow-sm"
                            : "bg-white/5 text-stone-300 hover:bg-white/10"
                        }`}
                      >
                        {st === "all" ? `All (${inquiries.length})` : `${st} (${inquiries.filter(i => i.status === st).length})`}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-auto sm:min-w-[240px] flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      placeholder="Search client, phone, city, source, project..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-9 bg-white/5 border-white/10 text-xs h-9 rounded-none text-white focus:border-accent"
                    />
                  </div>
                </div>

                {/* Sub-filter by Lead Source */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-white/5 text-xs font-mono">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider mr-1">Source:</span>
                  {[
                    { id: "all", label: "All Forms" },
                    { id: "sample", label: "📦 Sample Box" },
                    { id: "drawing", label: "📐 Drawing" },
                    { id: "estimator", label: "🧮 Estimator" },
                    { id: "contact", label: "✉️ Contact" },
                    { id: "architect", label: "🏛️ Architect" },
                    { id: "product", label: "🏷️ Product" },
                  ].map((sf) => (
                    <button
                      key={sf.id}
                      onClick={() => setInquirySourceFilter(sf.id)}
                      className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                        inquirySourceFilter === sf.id
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
                  Loading client commissions and inquiries...
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-24 bg-[#161616] border border-white/10 text-center space-y-4">
                  <Inbox className="w-12 h-12 text-stone-600 mx-auto" />
                  <h3 className="text-base uppercase tracking-wider text-stone-300">No Inquiries Found</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    No client inquiries match the current filter. Website leads from any form on the public website will automatically arrive here.
                  </p>
                  <Button
                    onClick={() => setShowAddInquiryModal(true)}
                    className="bg-accent text-stone-950 font-bold uppercase text-xs rounded-none cursor-pointer"
                  >
                    Log Manual Lead
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

          {/* ================= TAB 4: REVIEWS MODERATION ================= */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#161616] border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm sm:text-base font-heading font-normal uppercase text-white tracking-wider">
                    Customer Reviews &amp; Testimonial Moderation
                  </h2>
                  <span className="text-[11px] sm:text-xs text-stone-400">Total verified client ratings: {reviews.length}</span>
                </div>
                <Button
                  onClick={fetchReviews}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-xs uppercase tracking-wider text-stone-300 hover:text-white hover:bg-white/10 hover:border-white/40 self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Refresh
                </Button>
              </div>

              {reviewsLoading ? (
                <div className="py-20 text-center font-mono text-xs text-stone-400">
                  Loading customer reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div className="py-24 bg-[#161616] border border-white/10 text-center space-y-3">
                  <Star className="w-10 h-10 text-stone-600 mx-auto" />
                  <h3 className="text-base uppercase tracking-wider text-stone-300">No Reviews Logged Yet</h3>
                  <p className="text-xs text-stone-500">Reviews left by visitors on product detail pages will appear here for moderation.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="p-4 sm:p-6 bg-[#161616] border border-white/10 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-sm">{rev.name}</span>
                          <div className="flex items-center gap-1 text-accent">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-accent" : "text-stone-600"}`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-stone-300 font-light leading-relaxed italic">
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                        <span>{rev.date ? new Date(rev.date).toLocaleDateString() : "Verified Client"}</span>
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="text-rose-400 hover:text-rose-300 uppercase tracking-wider text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4B: RATES & STONE CALCULATOR ================= */}
          {activeTab === "calculator" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Header Action Bar */}
              <div className="bg-[#161616] border border-white/10 p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-accent">
                      STONE &amp; COST ESTIMATOR CONTROL
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-heading font-normal uppercase text-white tracking-wide">
                    Live Stone Rates &amp; Craft Multipliers
                  </h2>
                  <p className="text-xs text-stone-400 font-light mt-1 max-w-2xl">
                    Change prices according to current market rates (बाज़ार व खदान भाव). Customers using the website calculator see these real-time rates immediately.
                  </p>
                  {ratesLastUpdated && (
                    <span className="inline-block mt-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
                      ✓ Last synced: {ratesLastUpdated}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    onClick={handleResetCalculatorRates}
                    disabled={savingRates}
                    variant="outline"
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-3 sm:px-4 rounded-none cursor-pointer flex-1 sm:flex-initial"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                    Reset
                  </Button>

                  <Button
                    onClick={() => setShowAddStoneModal(true)}
                    className="border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-3 sm:px-4 rounded-none cursor-pointer flex-1 sm:flex-initial"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Add Stone
                  </Button>

                  <Button
                    onClick={() => setShowAddWorkModal(true)}
                    className="border border-white/20 bg-white/5 hover:bg-white/10 text-white text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-3 sm:px-4 rounded-none cursor-pointer flex-1 sm:flex-initial"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1 text-accent" />
                    Add Craft
                  </Button>

                  <Button
                    onClick={handleSaveCalculatorRates}
                    disabled={savingRates}
                    className="bg-accent hover:bg-accent/90 text-stone-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider h-9 sm:h-11 px-4 sm:px-6 rounded-none cursor-pointer shadow-gold w-full sm:w-auto"
                  >
                    {savingRates ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Save All Rates
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Two Column Grid: 1. Stone Varieties (₹ / sq.ft), 2. Craft Multipliers */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* 1. Stone Varieties Table (7 cols on XL) */}
                <div className="xl:col-span-7 bg-[#161616] border border-white/10 p-3.5 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="text-sm sm:text-base font-heading font-normal uppercase text-white tracking-wider flex items-center gap-2">
                        <span>Natural Stone Rates (₹ per Sq.Ft)</span>
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-stone-400 font-light mt-0.5">
                        खदान व पत्थर का बेस रेट (प्रति वर्ग फुट)
                      </p>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-accent">
                      {calcStoneRates.length} Stones Configured
                    </span>
                  </div>

                  {calcRatesLoading ? (
                    <div className="py-12 text-center text-stone-400 font-mono text-xs">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-accent" />
                      Loading stone rates...
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {calcStoneRates.map((stone, idx) => (
                        <div
                          key={stone.id || idx}
                          className={`p-3.5 sm:p-4 border transition-all ${
                            stone.isAvailable !== false
                              ? "bg-white/5 border-white/10 hover:border-accent/40"
                              : "bg-white/2 border-dashed border-white/10 opacity-60"
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                            
                            {/* Stone Name & Hindi Name */}
                            <div className="md:col-span-6 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-accent font-bold px-1.5 py-0.5 bg-accent/10 border border-accent/20">
                                  #{idx + 1}
                                </span>
                                <input
                                  type="text"
                                  value={stone.nameEn}
                                  onChange={(e) => {
                                    const updated = [...calcStoneRates];
                                    updated[idx].nameEn = e.target.value;
                                    setCalcStoneRates(updated);
                                  }}
                                  placeholder="Stone Name (English)"
                                  className="w-full bg-transparent text-sm font-semibold text-white border-b border-transparent focus:border-accent focus:outline-none"
                                />
                              </div>
                              <input
                                type="text"
                                value={stone.nameHi || ""}
                                onChange={(e) => {
                                  const updated = [...calcStoneRates];
                                  updated[idx].nameHi = e.target.value;
                                  setCalcStoneRates(updated);
                                }}
                                placeholder="पत्थर का नाम (हिंदी)"
                                className="w-full bg-transparent text-xs text-stone-400 border-b border-transparent focus:border-accent focus:outline-none"
                              />
                              <input
                                type="text"
                                value={stone.descEn || ""}
                                onChange={(e) => {
                                  const updated = [...calcStoneRates];
                                  updated[idx].descEn = e.target.value;
                                  setCalcStoneRates(updated);
                                }}
                                placeholder="Short description (e.g. Ideal for CNC jalis)"
                                className="w-full bg-transparent text-[11px] text-stone-500 border-b border-transparent focus:border-white/20 focus:outline-none"
                              />
                            </div>

                            {/* Base Rate Input */}
                            <div className="md:col-span-4">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                                Base Rate (₹/sq.ft)
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-accent font-bold text-sm">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  min={50}
                                  max={20000}
                                  value={stone.baseSqFtRate}
                                  onChange={(e) => {
                                    const updated = [...calcStoneRates];
                                    updated[idx].baseSqFtRate = Number(e.target.value) || 0;
                                    setCalcStoneRates(updated);
                                  }}
                                  className="w-full bg-black/60 border border-white/20 focus:border-accent text-white font-mono font-bold text-base h-10 pl-8 pr-3 rounded-none focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Status & Delete */}
                            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 pt-2 border-t border-white/5 md:border-0 md:pt-0">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...calcStoneRates];
                                  updated[idx].isAvailable = updated[idx].isAvailable === false ? true : false;
                                  setCalcStoneRates(updated);
                                }}
                                className={`text-[10px] font-mono uppercase px-2 py-1 cursor-pointer transition-colors ${
                                  stone.isAvailable !== false
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : "bg-stone-800 text-stone-400 border border-stone-700"
                                }`}
                                title="Click to toggle availability in customer calculator"
                              >
                                {stone.isAvailable !== false ? "Active" : "Disabled"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteStone(stone.id)}
                                className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete stone rate"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Craft Complexity Multipliers (5 cols on XL) */}
                <div className="xl:col-span-5 bg-[#161616] border border-white/10 p-3.5 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="text-sm sm:text-base font-heading font-normal uppercase text-white tracking-wider flex items-center gap-2">
                        <span>Craft Complexity Factors</span>
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-stone-400 font-light mt-0.5">
                        कारीगरी दर व गुणक (जाली = 1.0x, मंदिर = 1.8x)
                      </p>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-accent">
                      {calcWorkTypes.length} Types
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {calcWorkTypes.map((work, idx) => (
                      <div
                        key={work.id || idx}
                        className={`p-3.5 sm:p-4 border transition-all ${
                          work.isAvailable !== false
                            ? "bg-white/5 border-white/10 hover:border-accent/40"
                            : "bg-white/2 border-dashed border-white/10 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1 flex-1 min-w-0">
                            <input
                              type="text"
                              value={work.nameEn}
                              onChange={(e) => {
                                const updated = [...calcWorkTypes];
                                updated[idx].nameEn = e.target.value;
                                setCalcWorkTypes(updated);
                              }}
                              placeholder="Craft Name (English)"
                              className="w-full bg-transparent text-sm font-semibold text-white border-b border-transparent focus:border-accent focus:outline-none"
                            />
                            <input
                              type="text"
                              value={work.nameHi || ""}
                              onChange={(e) => {
                                const updated = [...calcWorkTypes];
                                updated[idx].nameHi = e.target.value;
                                setCalcWorkTypes(updated);
                              }}
                              placeholder="कारीगरी का नाम (हिंदी)"
                              className="w-full bg-transparent text-xs text-stone-400 border-b border-transparent focus:border-accent focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 border-t border-white/5 sm:border-0 sm:pt-0">
                            {/* Factor Input */}
                            <div className="w-24">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5 sm:mb-1">
                                Multiplier
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  step={0.05}
                                  min={0.2}
                                  max={10}
                                  value={work.factor}
                                  onChange={(e) => {
                                    const updated = [...calcWorkTypes];
                                    updated[idx].factor = Number(e.target.value) || 1.0;
                                    setCalcWorkTypes(updated);
                                  }}
                                  className="w-full bg-black/60 border border-white/20 focus:border-accent text-accent font-mono font-bold text-sm h-9 sm:h-10 px-2 text-center rounded-none focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 pt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...calcWorkTypes];
                                  updated[idx].isAvailable = updated[idx].isAvailable === false ? true : false;
                                  setCalcWorkTypes(updated);
                                }}
                                className={`text-[10px] font-mono uppercase px-2 py-1 cursor-pointer transition-colors ${
                                  work.isAvailable !== false
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : "bg-stone-800 text-stone-400 border border-stone-700"
                                }`}
                              >
                                {work.isAvailable !== false ? "Active" : "Off"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteWorkType(work.id)}
                                className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete craft type"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* General Parameters & Live Test Simulator */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* General Parameters */}
                <div className="lg:col-span-5 bg-[#161616] border border-white/10 p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-heading font-normal uppercase text-white tracking-wider">
                      Calculation Formula Settings
                    </h3>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      वेस्टेज बफर व साइट फिटिंग खर्च
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300">
                          Cutting &amp; Carving Wastage Buffer (%)
                        </label>
                        <span className="text-accent font-mono font-bold">{calcWastage}%</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={calcWastage}
                        onChange={(e) => setCalcWastage(Number(e.target.value) || 0)}
                        className="w-full bg-black/60 border border-white/20 focus:border-accent text-white font-mono h-10 px-3 text-sm rounded-none focus:outline-none"
                      />
                      <p className="text-[11px] text-stone-400">
                        Automatically added to square footage so the customer gets enough stone for corner joints and carving margins.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono uppercase tracking-wider text-stone-300">
                          Site Installation Surcharge (₹ per Sq.Ft)
                        </label>
                        <span className="text-accent font-mono font-bold">₹{calcInstallation} / sq.ft</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        max={2000}
                        value={calcInstallation}
                        onChange={(e) => setCalcInstallation(Number(e.target.value) || 0)}
                        className="w-full bg-black/60 border border-white/20 focus:border-accent text-white font-mono h-10 px-3 text-sm rounded-none focus:outline-none"
                      />
                      <p className="text-[11px] text-stone-400">
                        Added per sq.ft when customer checks "Include On-Site Fitting (+Pan-India)".
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Estimator Simulator */}
                <div className="lg:col-span-7 bg-[#161616] border border-accent/40 p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest block">
                        ADMIN TEST SIMULATOR
                      </span>
                      <h3 className="text-base font-heading font-normal uppercase text-white tracking-wider">
                        Live Estimator Preview (ग्राहकों को क्या रेट दिखेगा)
                      </h3>
                    </div>
                    <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Preview
                    </span>
                  </div>

                  {/* Simulator Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Select Craft
                      </label>
                      <select
                        value={simWorkId}
                        onChange={(e) => setSimWorkId(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 text-white text-xs h-10 px-3 rounded-none focus:border-accent"
                      >
                        {calcWorkTypes.map((w) => (
                          <option key={w.id} value={w.id}>
                            {w.nameEn} ({w.factor}x)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Select Stone
                      </label>
                      <select
                        value={simStoneId}
                        onChange={(e) => setSimStoneId(e.target.value)}
                        className="w-full bg-black/60 border border-white/20 text-white text-xs h-10 px-3 rounded-none focus:border-accent"
                      >
                        {calcStoneRates.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.nameEn} (₹{s.baseSqFtRate}/sq.ft)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Length (Feet)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={simLength}
                        onChange={(e) => setSimLength(Number(e.target.value) || 1)}
                        className="w-full bg-black/60 border border-white/20 text-white font-mono text-xs h-10 px-3 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                        Height (Feet)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={simHeight}
                        onChange={(e) => setSimHeight(Number(e.target.value) || 1)}
                        className="w-full bg-black/60 border border-white/20 text-white font-mono text-xs h-10 px-3 rounded-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {/* Simulator Calculations */}
                  {(() => {
                    const stone = calcStoneRates.find(s => s.id === simStoneId) || calcStoneRates[0] || { baseSqFtRate: 450, nameEn: "Stone" };
                    const work = calcWorkTypes.find(w => w.id === simWorkId) || calcWorkTypes[0] || { factor: 1.0, nameEn: "Work" };
                    const rawSqFt = Math.max(0, simLength * simHeight);
                    const buffer = Math.round(rawSqFt * (calcWastage / 100));
                    const totalSqFt = rawSqFt + buffer;
                    const installCost = simIncludeInstallation ? calcInstallation : 0;
                    const rate = Math.round(stone.baseSqFtRate * work.factor + installCost);
                    const min = Math.round(totalSqFt * rate * 0.95);
                    const max = Math.round(totalSqFt * rate * 1.15);

                    return (
                      <div className="p-4 bg-black/80 border border-accent/30 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center border-b border-white/10 pb-3">
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-mono block">Surface Area</span>
                            <span className="text-white font-mono font-bold text-sm">{rawSqFt} sq.ft</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-mono block">Buffer (+{calcWastage}%)</span>
                            <span className="text-accent font-mono font-bold text-sm">+{buffer} sq.ft</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-mono block">Total Sq.Ft</span>
                            <span className="text-white font-mono font-bold text-sm">{totalSqFt} sq.ft</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase font-mono block">Effective Rate</span>
                            <span className="text-emerald-400 font-mono font-bold text-sm">₹{rate}/sq.ft</span>
                          </div>
                        </div>

                        <div className="text-center pt-1">
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1">
                            Estimated Price Range Shown to Customer:
                          </span>
                          <span className="text-2xl sm:text-3xl font-heading font-bold text-accent tracking-wide">
                            ₹{min.toLocaleString("en-IN")} - ₹{max.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                </div>

              </div>

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
                      LIVE WEBSITE CUSTOMIZATION STUDIO
                    </span>
                    {settingsLastUpdated && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-stone-400">
                        • Last saved: {settingsLastUpdated}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-heading font-normal uppercase text-white tracking-wide">
                    Website Customization &amp; Branding Studio
                  </h2>
                  <p className="text-xs text-stone-400 font-light mt-1 max-w-2xl">
                    Admin Panel से पूरी वेबसाइट की ब्रांडिंग, कंपनी नाम, संपर्क नंबर, व्हाट्सएप, ईमेल, वर्कशॉप पता, जीएसटी, टॉप अनाउंसमेंट बार और हीरो सेक्शन को कस्टमाइज़ करें। बदलाव तुरंत लाइव वेबसाइट पर लागू होंगे।
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
                    Reset
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Publish Changes
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
                      Live Customer Preview (Real-Time Website Simulation)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                    ● Real-Time Sync
                  </span>
                </div>

                {/* Simulated Announcement Bar */}
                <div className="border border-white/10 bg-black/60 rounded-none overflow-hidden">
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1 bg-white/5 border-b border-white/10 flex justify-between">
                    <span>1. Top Announcement Header Bar:</span>
                    <span className={siteSettings.announcementActive ? "text-emerald-400" : "text-rose-400"}>
                      {siteSettings.announcementActive ? "Active & Visible" : "Hidden (Disabled)"}
                    </span>
                  </div>
                  {siteSettings.announcementActive ? (
                    <div className="bg-stone-950 border-b border-accent/20 px-4 py-2 text-center text-xs text-stone-300 font-sans tracking-wide">
                      <span className="text-accent font-semibold">{siteSettings.announcementText}</span>
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-center text-xs text-stone-500 italic font-mono">
                      [Announcement banner is currently hidden for visitors]
                    </div>
                  )}

                  {/* Simulated Nav branding */}
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1 bg-white/5 border-y border-white/10">
                    2. Navigation Branding &amp; Quick Hotlines:
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

                  {/* Simulated Hero Badges */}
                  <div className="text-[10px] font-mono text-stone-500 uppercase px-3 py-1 bg-white/5 border-y border-white/10">
                    3. Hero Section Badge &amp; Stone Catalog Strip:
                  </div>
                  <div className="p-4 bg-stone-950 space-y-2">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent">
                      {siteSettings.heroBadge}
                    </span>
                    <div className="text-xs text-stone-300 font-mono">
                      Stones Catalog Strip: <span className="text-accent font-semibold">{siteSettings.heroStonesStrip}</span>
                    </div>
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
                      1. Company Identity &amp; Credentials
                    </h3>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      Company Brand Name *
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
                      Brand Tagline / Slogan
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
                      GSTIN Number (Official Tax Registration)
                    </label>
                    <Input
                      value={siteSettings.gstNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, gstNumber: e.target.value })}
                      placeholder="e.g. 08AAAAA0000A1Z5"
                      className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      Workshop Operating Hours
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
                      2. Hotlines &amp; Workshop Location
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        Master Phone *
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
                        WhatsApp Number *
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
                      Official Email Address *
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
                      Workshop City / State Label
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
                      Full Physical Yard &amp; Workshop Address
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

                {/* Section 3: Top Announcement Bar */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-accent" />
                      <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                        3. Top Announcement Header Bar
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
                        {siteSettings.announcementActive ? "Active" : "Disabled"}
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    यह बैनर वेबसाइट के सबसे ऊपर हर पेज पर दिखता है। यहाँ आप स्पेशल ऑफर, डायरेक्ट वर्कशॉप मैन्युफैक्चरर मैसेज या नोटिस सेट कर सकते हैं।
                  </p>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      Announcement Banner Message Text
                    </label>
                    <Textarea
                      rows={3}
                      value={siteSettings.announcementText}
                      onChange={(e) => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                      placeholder="✨ DIRECT JAIPUR WORKSHOP & MANUFACTURER: Handcrafted Temples, 3D CNC Stone Jalis & Chhatris"
                      className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 4: Hero Section & Stone Catalog Strip */}
                <div className="bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Palette className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      4. Hero Section &amp; Stone Catalog Strip
                    </h3>
                  </div>

                  <p className="text-[11px] text-stone-400 font-light">
                    होमपेज के मुख्य हीरो सेक्शन में दिखने वाली मुख्य हेडिंग बैज और स्टोन वैरायटी स्ट्रिप यहाँ से बदलें।
                  </p>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                      Hero Badge Tagline Text
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
                      Hero Stone Catalog Highlights Strip
                    </label>
                    <Input
                      value={siteSettings.heroStonesStrip}
                      onChange={(e) => setSiteSettings({ ...siteSettings, heroStonesStrip: e.target.value })}
                      placeholder="Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Makrana Marble"
                      className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Section 5: Map & Social Media Links (Full Width) */}
                <div className="md:col-span-2 bg-[#161616] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Globe className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider">
                      5. Interactive Map &amp; Social Media Channels
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        Google Maps Embed URL (Iframe src for Contact Page)
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
                        Google Maps / Business Profile Link
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
                        Instagram Profile Link
                      </label>
                      <Input
                        value={siteSettings.socialInstagram}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialInstagram: e.target.value })}
                        placeholder="https://instagram.com/rkstonecorporation"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        Facebook Page Link
                      </label>
                      <Input
                        value={siteSettings.socialFacebook}
                        onChange={(e) => setSiteSettings({ ...siteSettings, socialFacebook: e.target.value })}
                        placeholder="https://facebook.com/rkstonecorporation"
                        className="bg-white/5 border-white/20 text-white font-mono text-xs h-10 rounded-none focus:border-accent"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                        YouTube Channel Link
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

                {/* Section 6: Cloud Diagnostics */}
                <div className="md:col-span-2 bg-[#161616] border border-white/10 p-6 space-y-4">
                  <h3 className="text-sm font-heading font-normal uppercase text-white tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    6. Cloud Infrastructure &amp; Diagnostics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">Database Engine</span>
                      <span className="text-emerald-400 font-bold block">MongoDB Atlas</span>
                      <span className="text-[10px] text-stone-500">Cluster: rkstonedb</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">Media Storage CDN</span>
                      <span className="text-emerald-400 font-bold block">Cloudinary CDN</span>
                      <span className="text-[10px] text-stone-500">Cloud: dngtvnh69</span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase block">API Server Endpoint</span>
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
                  <span>Changes apply across all pages upon publishing.</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetSiteSettings}
                    disabled={savingSettings}
                    className="border-white/20 text-stone-300 hover:text-white hover:bg-white/10 text-[11px] sm:text-xs uppercase rounded-none h-9 sm:h-10 flex-1 sm:flex-initial"
                  >
                    Reset
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Publish Changes
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
                  PRODUCT CATALOG STUDIO
                </span>
                <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
                  {editId ? `Edit Product: ${form.name || form.code || ''}` : "Add New Stone Product Specimen"}
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
                  Product Title (English) *
                </label>
                <Input
                  required
                  value={form.name}
                  name="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Pure Makrana White Marble Vedic Mandir"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Product Title (हिंदी)
                </label>
                <Input
                  value={form.nameHi || ""}
                  name="nameHi"
                  onChange={(e) => setForm({ ...form, nameHi: e.target.value })}
                  placeholder="उदा. मकराना शुद्ध सफेद संगमरमर वैदिक मंदिर"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>
            </div>

            {/* Row 2: Product Code & Architectural Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Product Identification Code (e.g. RK-PROD-01)
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
                  Architectural Category *
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

            {/* Row 3: Stone Variety & Price + Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Stone Variety / Material
                </label>
                <Input
                  value={form.stoneType || ""}
                  name="stoneType"
                  onChange={(e) => setForm({ ...form, stoneType: e.target.value })}
                  placeholder="e.g. Makrana Pure White Marble"
                  className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Price (₹ INR) *
                </label>
                <Input
                  required
                  type="number"
                  value={form.price}
                  name="price"
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  placeholder="e.g. 349999"
                  className="bg-white/5 border-white/20 text-white font-mono font-bold text-xs h-11 rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Price Unit
                </label>
                <select
                  value={form.priceUnit || "piece"}
                  name="priceUnit"
                  onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-11 px-3 uppercase rounded-none focus:border-accent cursor-pointer"
                >
                  <option value="piece">Per Piece / Unit</option>
                  <option value="sq.ft">Per Sq. Ft.</option>
                  <option value="pair">Per Pair (जोड़ा)</option>
                  <option value="running ft">Per Running Ft.</option>
                  <option value="set">Per Complete Set</option>
                </select>
              </div>
            </div>

            {/* Row 4: Dimensions & Production Lead Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Dimensions / Physical Sizing
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
                  Production / Dispatch Lead Time
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
                Product Specimen Photograph (Upload File or Enter URL)
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
                    {uploadingImage ? "Uploading to Cloudinary..." : "Choose Image File"}
                  </Button>
                  <span className="text-xs text-stone-400 font-mono">or paste direct image URL below:</span>
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
                  Artisan Description (English)
                </label>
                <Textarea
                  rows={3}
                  value={form.description}
                  name="description"
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Handcrafted in pristine Makrana white marble, featuring 100% monolithic calcite composition..."
                  className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                  Artisan Description (हिंदी)
                </label>
                <Textarea
                  rows={3}
                  value={form.descriptionHi || ""}
                  name="descriptionHi"
                  onChange={(e) => setForm({ ...form, descriptionHi: e.target.value })}
                  placeholder="शुद्ध मकराना संगमरमर से तराशा गया भव्य वैदिक मंदिर। बारीक नक्काशी व दीर्घायु टिकाऊपन..."
                  className="bg-white/5 border-white/20 text-white text-xs rounded-none focus:border-accent"
                />
              </div>
            </div>

            {/* Feature Bullets Builder */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Key Features &amp; Technical Highlights (Add points)
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
                  placeholder="e.g. 100% Genuine Makrana 98%+ Calcite Marble (Press Enter or Add)"
                  className="bg-white/5 border-white/20 text-white text-xs h-10 rounded-none focus:border-accent"
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  className="bg-white/10 hover:bg-white/20 text-white uppercase text-xs rounded-none shrink-0"
                >
                  Add Bullet
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
                    Live on Website (ग्राहक वेबसाइट पर दिखाएं)
                  </span>
                  <span className="text-[11px] text-stone-400 font-light block mt-0.5">
                    चेक रखने पर यह प्रोडक्ट वेबसाइट के कैटलॉग पर लाइव दिखेगा। अनचेक करने पर यह तुरंत वेबसाइट से छिप जाएगा।
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
                    Featured on Homepage (होमपेज पर हाइलाइट करें)
                  </span>
                  <span className="text-[11px] text-stone-400 font-light block mt-0.5">
                    चेक रखने पर यह प्रोडक्ट होमपेज के मुख्य फीचर्ड वर्क्स में प्रदर्शित होगा।
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
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold"
              >
                {editId ? "Update Product" : "Save to Database"}
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
              Log Client Inquiry / Lead
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleManualInquirySubmit} className="space-y-4 pt-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                Client Name *
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
                  Phone Number *
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
                  Email Address
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
                  Project Discipline
                </label>
                <select
                  value={manualInquiry.projectType}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, projectType: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-10 px-2.5 rounded-none"
                >
                  <option>Stone Temple Mandir</option>
                  <option>Heritage Haveli Elevation</option>
                  <option>3D CNC Jali Screen</option>
                  <option>Garden Water Fountain</option>
                  <option>Architect Blueprint Review</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                  Stone Medium
                </label>
                <select
                  value={manualInquiry.stonePreference}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, stonePreference: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-white/20 text-white text-xs h-10 px-2.5 rounded-none"
                >
                  <option>Makrana White Marble</option>
                  <option>Bansi Paharpur Pink Sandstone</option>
                  <option>Dholpur Beige Sandstone</option>
                  <option>Gwalior White Mint</option>
                  <option>Imperial Red Sandstone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1 block">
                Project Notes &amp; Scope
              </label>
              <Textarea
                rows={3}
                value={manualInquiry.message}
                onChange={(e) => setManualInquiry({ ...manualInquiry, message: e.target.value })}
                placeholder="Client contacted via phone for 8x6 ft private mandir for residential villa in Mumbai..."
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
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-5 rounded-none cursor-pointer"
              >
                Save Client Lead
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
                <div className="text-accent text-lg font-bold font-mono mt-1">
                  ₹{Number(viewProduct.price || 0).toLocaleString()} <span className="text-xs text-stone-400 font-normal">/ sq. ft.</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {viewProduct.description || "Bespoke stone craftsmanship manufactured directly at RK Stone Corporation Jaipur."}
              </p>

              {viewProduct.features && viewProduct.features.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase text-accent block mb-2">Specifications:</span>
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
                  Close
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
              Confirm Permanent Deletion
            </DialogTitle>
          </DialogHeader>

          <p className="text-xs text-stone-300 leading-relaxed pt-2">
            Are you sure you want to remove this piece from the catalog? This will delete the product listing permanently from the live catalog and MongoDB.
          </p>

          <DialogFooter className="pt-4 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDeleteId(null)}
              className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-white/40 text-xs uppercase rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => confirmDeleteId && handleDeleteProduct(confirmDeleteId)}
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs uppercase font-bold rounded-none cursor-pointer"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: ADD NEW STONE RATE ================= */}
      <Dialog open={showAddStoneModal} onOpenChange={setShowAddStoneModal}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
              Add New Stone Variety Rate
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddStone} className="space-y-4 pt-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Stone Name (English) *
              </label>
              <Input
                required
                value={newStone.nameEn}
                onChange={(e) => setNewStone({ ...newStone, nameEn: e.target.value })}
                placeholder="e.g. Kota Brown Natural Stone"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Stone Name (हिंदी)
              </label>
              <Input
                value={newStone.nameHi}
                onChange={(e) => setNewStone({ ...newStone, nameHi: e.target.value })}
                placeholder="उदा. कोटा ब्राउन नेचुरल स्टोन"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Direct Quarry Rate (₹ per Sq.Ft) *
              </label>
              <Input
                required
                type="number"
                min={50}
                max={20000}
                value={newStone.baseSqFtRate}
                onChange={(e) => setNewStone({ ...newStone, baseSqFtRate: Number(e.target.value) || 0 })}
                placeholder="e.g. 520"
                className="bg-white/5 border-white/20 text-white font-mono text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Short Description (English)
              </label>
              <Input
                value={newStone.descEn}
                onChange={(e) => setNewStone({ ...newStone, descEn: e.target.value })}
                placeholder="e.g. Ideal for exterior flooring & carved boundary panels"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Short Description (हिंदी)
              </label>
              <Input
                value={newStone.descHi}
                onChange={(e) => setNewStone({ ...newStone, descHi: e.target.value })}
                placeholder="उदा. बाहरी फर्श व चारदीवारी पैनल के लिए उपयुक्त"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <DialogFooter className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddStoneModal(false)}
                className="border-white/20 text-white hover:text-white hover:bg-white/10 text-xs uppercase rounded-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold"
              >
                Add Stone to Table
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: ADD NEW WORK TYPE ================= */}
      <Dialog open={showAddWorkModal} onOpenChange={setShowAddWorkModal}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-[#141414] border border-white/20 text-white rounded-none p-4 sm:p-8 max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-normal uppercase text-white tracking-wide">
              Add New Craft Category Multiplier
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddWorkType} className="space-y-4 pt-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Craft Category Name (English) *
              </label>
              <Input
                required
                value={newWorkType.nameEn}
                onChange={(e) => setNewWorkType({ ...newWorkType, nameEn: e.target.value })}
                placeholder="e.g. Ornate Fluted Pillars & Arches"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Craft Category Name (हिंदी)
              </label>
              <Input
                value={newWorkType.nameHi}
                onChange={(e) => setNewWorkType({ ...newWorkType, nameHi: e.target.value })}
                placeholder="उदा. नक्काशीदार खंभे व मेहराब"
                className="bg-white/5 border-white/20 text-white text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                Complexity Multiplier Factor (e.g. 1.0 for CNC Jali, 1.8 for Temple) *
              </label>
              <Input
                required
                type="number"
                step={0.05}
                min={0.2}
                max={10}
                value={newWorkType.factor}
                onChange={(e) => setNewWorkType({ ...newWorkType, factor: Number(e.target.value) || 1.0 })}
                placeholder="e.g. 1.45"
                className="bg-white/5 border-white/20 text-white font-mono text-xs h-11 rounded-none focus:border-accent"
              />
            </div>

            <DialogFooter className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddWorkModal(false)}
                className="border-white/20 text-white hover:text-white hover:bg-white/10 text-xs uppercase rounded-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold"
              >
                Add Craft Category
              </Button>
            </DialogFooter>
          </form>
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
                      CLIENT INQUIRY &amp; PROJECT DETAILS
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
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-white font-bold hover:text-accent flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    {selectedInquiry.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Email Address</span>
                  {selectedInquiry.email ? (
                    <a href={`mailto:${selectedInquiry.email}`} className="text-stone-300 hover:text-accent truncate block">
                      {selectedInquiry.email}
                    </a>
                  ) : (
                    <span className="text-stone-500">Not provided</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Received Date</span>
                  <span className="text-stone-300">
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString("en-IN") : "Recent"}
                  </span>
                </div>
              </div>

              {/* Commission Specifications */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold block">
                  Project Requirements &amp; Dimensions
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Project Discipline</span>
                    <span className="text-white font-semibold">{selectedInquiry.projectType || "General Inquiry"}</span>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Stone Preference</span>
                    <span className="text-accent font-semibold">{selectedInquiry.stonePreference || "Not Specified"}</span>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Delivery City / Site</span>
                    <span className="text-white font-semibold">{selectedInquiry.city || selectedInquiry.address || "Not Specified"}</span>
                  </div>

                  {selectedInquiry.dimensions && (
                    <div className="p-3 bg-white/5 border border-white/10">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Dimensions / Area</span>
                      <span className="text-white font-semibold">{selectedInquiry.dimensions}</span>
                    </div>
                  )}

                  {selectedInquiry.estimatedBudget && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Estimated Budget</span>
                      <span className="text-emerald-400 font-bold">{selectedInquiry.estimatedBudget}</span>
                    </div>
                  )}

                  {selectedInquiry.productName && (
                    <div className="p-3 bg-accent/10 border border-accent/30">
                      <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Product Specimen</span>
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
                          📷 CUSTOMER ATTACHED PHOTOS &amp; DRAWINGS ({inqPhotos.length + docAttachments.length})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        Click any photo to enlarge or download
                      </span>
                    </div>

                    {/* Photo Gallery Grid */}
                    {inqPhotos.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase text-stone-300 block font-semibold">
                          Customer Photos &amp; Site References:
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
                                      <ZoomIn className="w-3.5 h-3.5" /> Enlarge
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
                                    title="Open full resolution"
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
                          CAD Drawings &amp; Documents:
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
                                    {doc.size ? `${(doc.size / (1024 * 1024)).toFixed(2)} MB` : "Attachment"} • {doc.fileType || "File"}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-accent shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                Download <ExternalLink className="w-3.5 h-3.5" />
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
                  Client Request &amp; Scope Details
                </span>
                <div className="p-4 bg-white/5 border border-white/10 text-xs text-stone-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedInquiry.message || "No additional message supplied."}
                </div>
              </div>

              {/* Status Update & Internal Notes */}
              <div className="p-4 bg-black/60 border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Workflow Status &amp; Internal Notes
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400 uppercase">Status:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => {
                        const newSt = e.target.value as Inquiry["status"];
                        updateInquiryStatus(selectedInquiry._id, newSt);
                        setSelectedInquiry({ ...selectedInquiry, status: newSt });
                      }}
                      className="bg-[#1e1e1e] border border-white/20 text-xs text-white px-3 py-1 uppercase font-mono rounded-none focus:border-accent cursor-pointer"
                    >
                      <option value="New">🔴 New Lead</option>
                      <option value="Contacted">🔵 Contacted</option>
                      <option value="In Design">🟡 In Design &amp; CAD</option>
                      <option value="Quoted">🟣 Official Quote Sent</option>
                      <option value="Completed">🟢 Completed &amp; Delivered</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1 block">
                    Admin / Mason Notes (Saved for Internal Reference):
                  </label>
                  <Textarea
                    rows={3}
                    value={inquiryNotesEdit}
                    onChange={(e) => setInquiryNotesEdit(e.target.value)}
                    placeholder="e.g. Sent PDF drawing on WhatsApp. Client requested sample of Bansi Paharpur. Follow up on Tuesday..."
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
                    {savingInquiryNotes ? "Saving Notes..." : "Save Internal Note"}
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
                    Chat on WhatsApp
                  </a>

                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Client
                  </a>
                </div>

                <Button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-xs uppercase rounded-none"
                >
                  Close Dossier
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
                      <ExternalLink className="w-3.5 h-3.5" /> Open Full Resolution
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
                  Close Preview
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
              Change Admin Credentials
            </DialogTitle>
            <p className="text-xs text-stone-400 text-center font-light">
              Admin panel का Username और Password बदलें। नए क्रेडेंशियल्स MongoDB Atlas में सुरक्षित सेव होंगे।
            </p>
          </DialogHeader>

          <form onSubmit={handleChangeCredentials} className="space-y-4 pt-3">
            {/* Current Password (Required for security verification) */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Current Password *</span>
                <span className="text-[10px] text-amber-400">सुरक्षा हेतु आवश्यक</span>
              </label>
              <div className="relative">
                <Input
                  required
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current admin password"
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
                New Admin Username
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
                Current active username: <b className="text-accent">{adminProfile.username}</b>
              </span>
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 mb-1.5 block">
                New Password (नया पासवर्ड)
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank if you only want to change username"
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
                  Confirm New Password (पुष्टि करें)
                </label>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
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
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={updatingCredentials}
                className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs px-6 rounded-none cursor-pointer shadow-gold disabled:opacity-50"
              >
                {updatingCredentials ? "Updating Security..." : "Save Credentials"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
