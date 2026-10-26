import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Phone, 
  Mail,
  Ruler, 
  Share2, 
  ChevronRight,
  ChevronLeft,
  Edit3,
  Copy,
  Check
} from "lucide-react";
import Seo from "@/components/Seo";
import ProductShareModal from "@/components/product/ProductShareModal";
import { toast } from "sonner";
import { products as defaultProducts, getProductCode } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_URL } from "@/config/api";

interface Product {
  _id?: string;
  id: string;
  code?: string;
  name: string;
  nameHi?: string;
  price?: number;
  image: string;
  images?: string[];
  category: string;
  stoneType?: string;
  description: string;
  descriptionHi?: string;
  features?: string[];
  dimensions?: string;
  leadTime?: string;
  specs?: Record<string, string>;
}

// Bulletproof clipboard copy function that works across HTTP, HTTPS, desktop & mobile
const copyTextToClipboard = async (text: string): Promise<boolean> => {
  // 1. Modern Clipboard API (available in secure contexts like HTTPS/localhost)
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  // 2. DOM fallback for mobile HTTP / WebViews / Safari
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); // Mobile iOS selection

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Clipboard copy error:", err);
    return false;
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const { l } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Form states matching screenshot
  const [enquiryQuantity, setEnquiryQuantity] = useState("1");
  const [enquiryUnit, setEnquiryUnit] = useState("Piece");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPurpose, setFormPurpose] = useState("End Use");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const detailsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Fetch related products
  const fetchRelatedProducts = async (currentProduct: Product) => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const allProducts = await res.json();
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        const related = allProducts
          .filter((p: any) =>
            (p._id !== currentProduct._id && p.id !== currentProduct.id)
          )
          .map((p: any) => ({
            ...p,
            id: p._id || p.id,
            _id: p._id || p.id,
            image: p.image || "/placeholder.png"
          }));

        // Sort same-category first
        related.sort((a: any, b: any) => {
          if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
          if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1;
          return 0;
        });

        if (related.length > 0) {
          setRelatedProducts(related);
          return;
        }
      }
    } catch {
      // fallback
    }

    const fallbackRelated = defaultProducts
      .filter((p: any) => p.id !== currentProduct.id && p._id !== currentProduct._id)
      .map((p: any) => ({
        ...p,
        id: p.id || p._id,
        _id: p._id || p.id,
        features: p.features || []
      }));

    fallbackRelated.sort((a: any, b: any) => {
      if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
      if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1;
      return 0;
    });

    setRelatedProducts(fallbackRelated);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setProduct(null);
    setRelatedProducts([]);
    setCarouselOffset(0);

    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        const productData = {
          ...data,
          id: data._id || data.id,
          _id: data._id || data.id,
          image: data.image || "/placeholder.png"
        };
        setProduct(productData);
        setNotFound(false);
        const code = productData.code || getProductCode(productData);
        setFormMessage(`I am interested in ${productData.name} (Item Code: ${code}). Kindly send the quotation for the same.`);
        fetchRelatedProducts(productData);
      })
      .catch(() => {
        const match = defaultProducts.find((p: any) => 
          p.id === id || 
          p._id === id || 
          p.code?.toLowerCase() === id?.toLowerCase() ||
          p.id.toLowerCase() === id?.toLowerCase()
        );
        if (match) {
          const itemData = {
            ...match,
            id: match.id || match._id,
            _id: match._id || match.id,
            features: match.features || []
          };
          setProduct(itemData);
          setNotFound(false);
          const code = itemData.code || getProductCode(itemData);
          setFormMessage(`I am interested in ${itemData.name} (Item Code: ${code}). Kindly send the quotation for the same.`);
          fetchRelatedProducts(itemData);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#f0f2f5] flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-3 border-[#b25e19] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-stone-600 font-heading tracking-widest uppercase text-xs">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#f0f2f5] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-stone-200 rounded-full flex items-center justify-center text-stone-600">
            <Ruler className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-heading font-normal uppercase tracking-wide mb-3 text-stone-900">
            Product Not Found
          </h1>
          <p className="text-stone-600 text-sm mb-6">
            The requested architectural stone piece could not be located in our current catalogue.
          </p>
          <Link to="/shop">
            <button className="bg-stone-950 hover:bg-stone-900 text-white font-medium rounded-none uppercase text-xs tracking-wider px-6 py-3 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const productCode = product.code || getProductCode(product);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const primaryImage = images[0] || "/placeholder.png";

  // Robust All-Apps Share Handler (opens share dialog with WhatsApp, Facebook, X, Telegram, SMS, Email & Device Share)
  const handleShare = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsShareModalOpen(true);
  };

  // Copy product code to clipboard with visual feedback
  const handleCopyCode = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const ok = await copyTextToClipboard(productCode);
    if (ok) {
      setCopiedCode(true);
      toast.success(`Item Code "${productCode}" copied to clipboard!`);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          source: "Product Detail Enquiry Form",
          productName: product.name,
          projectType: `${product.name} (Code: ${productCode})`,
          stonePreference: product.stoneType || "Sandstone",
          dimensions: `Qty: ${enquiryQuantity} ${enquiryUnit} | Code: ${productCode} | Purpose: ${formPurpose}`,
          message: formMessage
        })
      });

      if (res.ok) {
        setFormSuccess(true);
        toast.success("Enquiry sent successfully! Our craftsmen will contact you shortly.");
      } else {
        toast.error("Failed to send enquiry. Please call or WhatsApp us directly.");
      }
    } catch {
      setFormSuccess(true);
      toast.success("Enquiry received. Please confirm on WhatsApp for instant quote.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Carousel handlers for Explore More Products
  const visibleCardsCount = 4;
  const maxOffset = Math.max(0, relatedProducts.length - visibleCardsCount);

  const handlePrev = () => {
    setCarouselOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselOffset((prev) => Math.min(maxOffset, prev + 1));
  };

  const visibleRelated = relatedProducts.slice(carouselOffset, carouselOffset + visibleCardsCount);

  return (
    <div className="bg-[#f0f2f5] text-stone-900 min-h-screen pb-16">
      <Seo
        title={`[${productCode}] ${product.name} | RK Stone Corporation Jaipur`}
        description={`${product.name} (Code: ${productCode}). Handcrafted in ${product.stoneType || 'Natural Sandstone'} by RK Stone Corporation Jaipur. ${product.description}`}
        image={primaryImage}
        type="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "sku": productCode,
          "mpn": productCode,
          "image": images,
          "description": product.description,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": "RK Stone Corporation"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "price": "0",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceType": "https://schema.org/CustomQuote"
            },
            "availability": "https://schema.org/InStock",
            "url": typeof window !== "undefined" ? window.location.href : undefined
          }
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-24 md:pt-28 space-y-4">

        {/* 1. TOP BREADCRUMB STRIP (Card-aligned Box matching Screenshot + Product Code) */}
        <div className="bg-[#f7f8fa] border border-[#dce0e6] rounded-[3px] px-4 py-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 flex-wrap font-medium">
            <Link to="/" className="hover:text-[#b25e19] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <Link to="/shop" className="hover:text-[#b25e19] transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-[#b25e19] transition-colors capitalize">
              {product.category.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-[#b25e19] font-mono font-bold tracking-wider">{productCode}</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-semibold">{product.name}</span>
          </div>
        </div>

        {/* 2. MAIN TOP PRODUCT CARD (Exact B2B Portal Layout from Screenshot) */}
        <div className="bg-white rounded-[3px] border border-[#dce0e6] shadow-2xs p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
            
            {/* Left: Product Image & Gallery */}
            <div className="md:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-square bg-stone-50 border border-stone-200 rounded-[2px] overflow-hidden group">
                <img
                  src={primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails if multiple images exist */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-14 h-14 object-cover border border-stone-200 rounded-[2px] cursor-pointer hover:border-[#b25e19]"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Actions */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Product Title, Item Code Badge & Mobile-Friendly Share Button */}
              <div className="flex items-start justify-between gap-3 border-b border-[#e5e7eb] pb-3">
                <div className="space-y-1.5 flex-1 pr-2">
                  {/* Product Code Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-[#b25e19] border border-amber-200 text-xs font-semibold rounded-[2px]">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider">Item Code:</span>
                      <span className="font-mono font-bold tracking-wide">{productCode}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      title="Copy Item Code"
                      className="text-stone-400 hover:text-[#b25e19] text-xs inline-flex items-center p-1 rounded-sm cursor-pointer transition-colors active:scale-95"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-normal uppercase tracking-wide text-stone-950 leading-tight">
                    {l(product.name, product.nameHi || product.name)}
                  </h1>
                </div>

                {/* Mobile-Friendly Share Button with comfortable 40px touch target & touch-manipulation */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-stone-300 hover:border-[#b25e19] hover:text-[#b25e19] active:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors shrink-0 cursor-pointer bg-white shadow-2xs touch-manipulation"
                  title="Share Product"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4 pointer-events-none" />
                </button>
              </div>

              {/* Quantity, Unit & Get Best Price Button Row */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <div className="flex items-center border border-stone-300 rounded-[2px] bg-white text-xs h-9">
                  <span className="px-3 text-stone-500 font-medium bg-stone-50 border-r border-stone-200 h-full flex items-center">
                    Quantity
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={enquiryQuantity}
                    onChange={(e) => setEnquiryQuantity(e.target.value)}
                    className="w-14 px-2 h-full text-center text-stone-900 font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 border border-stone-300 rounded-[2px] px-3 bg-white text-xs text-stone-700 h-9">
                  <span className="font-medium">{enquiryUnit}</span>
                  <button
                    type="button"
                    onClick={() => setEnquiryUnit(enquiryUnit === "Piece" ? "Sq. Ft" : "Piece")}
                    className="text-[#b25e19] hover:underline font-semibold inline-flex items-center gap-0.5 text-[11px] cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <a
                  href="tel:+919414784562"
                  className="inline-flex items-center justify-center px-5 h-9 bg-[#b25e19] hover:bg-[#974d12] text-white text-xs font-bold rounded-[2px] shadow-2xs transition-colors cursor-pointer"
                >
                  Get Best Price
                </a>
              </div>

              {/* Clean Key-Value Table matching screenshot */}
              <div className="pt-2 text-xs divide-y divide-[#eceef1] border-t border-b border-[#eceef1]">
                <div className="grid grid-cols-12 py-2.5">
                  <span className="col-span-4 text-stone-500 font-medium">Item Code</span>
                  <span className="col-span-8 text-[#b25e19] font-mono font-bold flex items-center gap-2">
                    <span>{productCode}</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="text-stone-400 hover:text-stone-700 text-[11px] inline-flex items-center gap-0.5 cursor-pointer"
                      title="Copy Code"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </span>
                </div>
                <div className="grid grid-cols-12 py-2.5">
                  <span className="col-span-4 text-stone-500 font-medium">Business Type</span>
                  <span className="col-span-8 text-stone-900 font-semibold">Manufacturer, Supplier</span>
                </div>
                <div className="grid grid-cols-12 py-2.5">
                  <span className="col-span-4 text-stone-500 font-medium">Material</span>
                  <span className="col-span-8 text-stone-900 font-semibold">{product.stoneType || "Sandstone"}</span>
                </div>
                <div className="grid grid-cols-12 py-2.5">
                  <span className="col-span-4 text-stone-500 font-medium">Color</span>
                  <span className="col-span-8 text-stone-900 font-semibold">
                    {product.stoneType?.toLowerCase().includes("red") ? "Red" : product.stoneType?.toLowerCase().includes("pink") ? "Pink" : "Red / Beige / Cream"}
                  </span>
                </div>
                <div className="grid grid-cols-12 py-2.5">
                  <span className="col-span-4 text-stone-500 font-medium">Packaging</span>
                  <span className="col-span-8 text-stone-900 font-semibold">Secure Packaging</span>
                </div>
                <div className="py-2">
                  <button
                    type="button"
                    onClick={() => detailsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[#b25e19] hover:underline font-semibold text-xs cursor-pointer"
                  >
                    Click to view more
                  </button>
                </div>
              </div>

              {/* Action Buttons: Request a Call & Send Enquiry matching screenshot */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:+919414784562"
                  className="inline-flex items-center justify-center gap-2 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 font-bold py-2.5 text-xs rounded-[2px] shadow-2xs transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-stone-700" />
                  <span>Request a Call</span>
                </a>

                <button
                  type="button"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 bg-[#b25e19] hover:bg-[#974d12] text-white font-bold py-2.5 text-xs rounded-[2px] shadow-2xs transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 3. PRODUCT DETAILS CARD matching screenshot */}
        <div ref={detailsRef} className="bg-white rounded-[3px] border border-[#dce0e6] shadow-2xs p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-heading font-normal uppercase tracking-wide text-stone-950 border-b border-[#e5e7eb] pb-3 mb-4">
            Product Details
          </h2>

          {/* Clean 4-Column Specs directly on white card matching screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6 text-xs mb-5">
            <div>
              <span className="text-stone-500 font-medium block">Style</span>
              <span className="text-stone-900 font-bold mt-1 block">Carved</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Finishing</span>
              <span className="text-stone-900 font-bold mt-1 block">Smooth</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Technique</span>
              <span className="text-stone-900 font-bold mt-1 block">Handmade</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Item Code</span>
              <span className="text-[#b25e19] font-mono font-bold mt-1 block">{productCode}</span>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal mb-6">
            {l(
              product.description || `We offer exquisitely crafted ${product.name} in a striking natural sandstone. Handmade with precision, the smooth finishing and intricate carvings showcase our expertise. Each piece is securely packaged to ensure safe delivery. As a leading manufacturer and supplier, we take pride in providing high-quality sandstone temples that add elegance to any space. Elevate your decor with our beautifully carved sandstone temple, a timeless piece that reflects artistry and craftsmanship.`,
              product.descriptionHi || product.description
            )}
          </p>

          {/* Yes! I am interested CTA Button */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-2.5 bg-[#b25e19] hover:bg-[#974d12] text-white font-bold text-xs rounded-[2px] shadow-2xs transition-colors cursor-pointer"
            >
              Yes! I am interested
            </button>
          </div>
        </div>

        {/* 4. "LOOKING FOR '[PRODUCT NAME]' ?" ENQUIRY FORM CARD matching screenshot */}
        <div ref={formRef} className="bg-white rounded-[3px] border border-[#dce0e6] shadow-2xs p-5 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-heading font-normal uppercase tracking-wide text-stone-950 text-center mb-6">
            Looking for <span className="text-[#b25e19]">"{product.name}"</span> <span className="text-stone-500 text-xs sm:text-sm font-mono tracking-wider block sm:inline font-normal">({productCode})</span> ?
          </h2>

          <form onSubmit={handleEnquirySubmit} className="max-w-3xl mx-auto space-y-4">
            
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right">
                  Name
                </label>
                <Input
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-9 text-xs rounded-[2px] bg-white border-stone-300 focus-visible:ring-1 focus-visible:ring-[#b25e19]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right">
                  Email
                </label>
                <Input
                  required
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-9 text-xs rounded-[2px] bg-white border-stone-300 focus-visible:ring-1 focus-visible:ring-[#b25e19]"
                />
              </div>
            </div>

            {/* Row 2: Mobile No and Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right">
                  Mobile No.
                </label>
                <div className="flex w-full">
                  <span className="inline-flex items-center gap-1 px-2.5 border border-r-0 border-stone-300 bg-stone-50 text-[11px] text-stone-700 rounded-l-[2px]">
                    🇮🇳 +91
                  </span>
                  <Input
                    required
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Enter Mobile No."
                    className="h-9 text-xs rounded-l-none rounded-r-[2px] bg-white border-stone-300 focus-visible:ring-1 focus-visible:ring-[#b25e19]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right">
                  Quantity
                </label>
                <div className="flex gap-1.5 w-full">
                  <Input
                    type="number"
                    min="1"
                    value={enquiryQuantity}
                    onChange={(e) => setEnquiryQuantity(e.target.value)}
                    placeholder="Estimated Quantity"
                    className="h-9 text-xs rounded-[2px] bg-white border-stone-300 flex-1 focus-visible:ring-1 focus-visible:ring-[#b25e19]"
                  />
                  <div className="flex items-center gap-1.5 px-3 border border-stone-300 bg-white text-xs text-stone-700 rounded-[2px] h-9 shrink-0">
                    <span>{enquiryUnit}</span>
                    <button
                      type="button"
                      onClick={() => setEnquiryUnit(enquiryUnit === "Piece" ? "Sq. Ft" : "Piece")}
                      className="text-[#b25e19] text-[11px] font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Purpose of Requirement */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right">
                Purpose of Requirement
              </label>
              <div className="flex items-center gap-6 text-xs text-stone-700 border border-stone-200 rounded-[2px] px-3.5 py-2 bg-stone-50/50 flex-1">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="purpose"
                    value="Reselling"
                    checked={formPurpose === "Reselling"}
                    onChange={(e) => setFormPurpose(e.target.value)}
                    className="accent-[#b25e19]"
                  />
                  <span>Reselling</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="purpose"
                    value="End Use"
                    checked={formPurpose === "End Use"}
                    onChange={(e) => setFormPurpose(e.target.value)}
                    className="accent-[#b25e19]"
                  />
                  <span>End Use</span>
                </label>
              </div>
            </div>

            {/* Row 4: Requirement Details */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <label className="text-xs text-stone-600 font-medium w-16 sm:w-20 shrink-0 text-left sm:text-right pt-2">
                Requirement Details
              </label>
              <textarea
                rows={3}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="I am interested. Kindly send the quotation for the same."
                className="w-full border border-stone-300 rounded-[2px] p-2.5 text-xs bg-white focus:outline-none focus:border-[#b25e19] leading-relaxed"
              />
            </div>

            {/* Row 5: Send Enquiry Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={formSubmitting}
                className="bg-[#2c2d30] hover:bg-black text-white font-bold px-10 py-2.5 text-xs rounded-[2px] cursor-pointer shadow-2xs transition-colors tracking-wide"
              >
                {formSubmitting ? "Submitting..." : "Send Enquiry"}
              </button>
            </div>

            {formSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-[2px] text-center">
                ✓ Thank you! Your enquiry for {product.name} ({productCode}) has been received. Our team will contact you shortly.
              </div>
            )}
          </form>
        </div>

        {/* 5. EXPLORE MORE PRODUCTS CARD WITH SLIDER ARROWS matching screenshot */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-[3px] border border-[#dce0e6] shadow-2xs p-5 sm:p-6 relative">
            <h2 className="text-xl sm:text-2xl font-heading font-normal uppercase tracking-wide text-stone-950 text-center mb-6">
              Explore More Products
            </h2>

            <div className="relative">
              {/* Left Arrow Button */}
              {carouselOffset > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-10 bg-white/95 hover:bg-white border border-stone-300 rounded-sm shadow-md flex items-center justify-center text-stone-700 hover:text-[#b25e19] transition-colors cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Right Arrow Button */}
              {carouselOffset < maxOffset && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-10 bg-white/95 hover:bg-white border border-stone-300 rounded-sm shadow-md flex items-center justify-center text-stone-700 hover:text-[#b25e19] transition-colors cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Product Cards Grid (4 items side by side matching screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {visibleRelated.map((relProduct, idx) => (
                  <div
                    key={relProduct._id || relProduct.id || idx}
                    className="border border-stone-200 rounded-[2px] overflow-hidden bg-white hover:shadow-sm transition-shadow flex flex-col justify-between"
                  >
                    <Link to={`/product/${relProduct.id || relProduct._id}`} className="block">
                      <div className="aspect-square bg-stone-50 overflow-hidden">
                        <img
                          src={relProduct.image}
                          alt={relProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs sm:text-sm font-heading font-medium uppercase tracking-wide text-stone-950 hover:text-[#b25e19] line-clamp-2 text-center transition-colors">
                          {relProduct.name}
                        </h3>
                      </div>
                    </Link>

                    <div className="p-3 pt-0 text-center">
                      <Link to={`/product/${relProduct.id || relProduct._id}`}>
                        <button
                          type="button"
                          className="w-full bg-[#b25e19] hover:bg-[#974d12] text-white font-bold text-[11px] py-1.5 px-3 rounded-[2px] transition-colors cursor-pointer"
                        >
                          Get Best Quote
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* All-Apps Share Modal (WhatsApp, Facebook, X, Telegram, SMS, Email, Native Share, Copy Link) */}
      <ProductShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={{
          name: product.name,
          code: productCode,
          category: product.category,
          image: primaryImage,
          stoneType: product.stoneType
        }}
      />
    </div>
  );
}
