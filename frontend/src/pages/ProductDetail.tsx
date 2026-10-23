import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Phone, 
  ShieldCheck, 
  Ruler, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  FileUp, 
  Share2, 
  Layers, 
  Award, 
  MapPin,
  Clock,
  Hammer
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import ImageGallery from "@/components/product/ImageGallery";
import Reviews from "@/components/product/Reviews";
import InquiryForm from "@/components/product/InquiryForm";
import SpecsTable from "@/components/product/SpecsTable";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import DrawingUploadModal from "@/components/home/DrawingUploadModal";
import SampleKitModal from "@/components/home/SampleKitModal";
import { products as defaultProducts, getProductCode } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_URL } from "@/config/api";

interface Product {
  _id?: string;
  id: string;
  code?: string;
  name: string;
  price?: number;
  image: string;
  images?: string[];
  category: string;
  stoneType?: string;
  description: string;
  features?: string[];
  dimensions?: string;
  leadTime?: string;
  specs?: Record<string, string>;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Custom dimensions state
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [customDepth, setCustomDepth] = useState<string>('');
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  // Fetch related products
  const fetchRelatedProducts = async (currentProduct: Product) => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const allProducts = await res.json();
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        const related = allProducts
          .filter((p: any) =>
            p.category === currentProduct.category &&
            (p._id !== currentProduct._id && p.id !== currentProduct.id)
          )
          .slice(0, 4)
          .map((p: any) => ({
            ...p,
            id: p._id || p.id,
            _id: p._id || p.id,
            image: p.image || "/placeholder.png"
          }));
        if (related.length > 0) {
          setRelatedProducts(related);
          return;
        }
      }
    } catch {
      // fallback
    }

    const fallbackRelated = defaultProducts
      .filter((p: any) =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id &&
        p._id !== currentProduct._id
      )
      .slice(0, 4)
      .map((p: any) => ({
        ...p,
        id: p.id || p._id,
        _id: p._id || p.id,
        features: p.features || []
      }));

    if (fallbackRelated.length < 4) {
      const remaining = defaultProducts
        .filter((p: any) => p.id !== currentProduct.id && !fallbackRelated.some(r => r.id === p.id))
        .slice(0, 4 - fallbackRelated.length)
        .map((p: any) => ({
          ...p,
          id: p.id || p._id,
          _id: p._id || p.id,
          features: p.features || []
        }));
      setRelatedProducts([...fallbackRelated, ...remaining]);
    } else {
      setRelatedProducts(fallbackRelated);
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setProduct(null);
    setRelatedProducts([]);

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
        fetchRelatedProducts(productData);
      })
      .catch(() => {
        // Fallback to static catalog (match by id, _id or code)
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
          fetchRelatedProducts(itemData);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#FAF8F5] flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-3 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-stone-600 font-heading tracking-widest uppercase text-xs">
          Loading Masterpiece Specifications...
        </p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#FAF8F5] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 bg-stone-200 rounded-full flex items-center justify-center text-stone-600">
            <Ruler className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-heading font-normal uppercase tracking-wide mb-3 text-stone-900">
            Design Not Found
          </h1>
          <p className="text-stone-600 text-sm mb-6">
            The requested architectural stone piece could not be located in our current catalogue.
          </p>
          <Link to="/shop">
            <Button className="bg-stone-950 hover:bg-stone-900 text-white font-medium rounded-none uppercase text-xs tracking-wider px-6 py-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Stone Catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Masterpiece Code (e.g. RK-PROD-01)
  const productCode = product.code || getProductCode(product);

  // Images resolution
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const { l } = useLanguage();
  const primaryImage = images[0] || "/placeholder.png";

  // Build WhatsApp URL with custom or standard dimensions
  const dimensionString = useCustomSize && (customWidth || customHeight || customDepth)
    ? `Custom Dimensions: ${customWidth || '—'}W x ${customHeight || '—'}H ${customDepth ? `x ${customDepth}D` : ''} ft`
    : (product.dimensions ? `Standard Size: ${product.dimensions}` : 'Custom Sizing Required');

  const whatsappMessage = encodeURIComponent(
    `Namaste RK Stone Corporation,\n\nI am inquiring about Masterpiece [${productCode}]:\n*${product.name}*\n• Item Code: ${productCode}\n• Stone: ${product.stoneType || 'Natural Sandstone/Marble'}\n• Category: ${product.category}\n• Dimensions: ${dimensionString}\n${product.price > 0 ? `• Workshop Rate: ₹${Number(product.price).toLocaleString('en-IN')} / ${product.priceUnit || 'unit'}\n` : ''}\nPlease share fabrication lead time, workshop quotation, and transport details to my location.`
  );
  const whatsappUrl = `https://wa.me/919414784562?text=${whatsappMessage}`;

  // Technical Specs Object
  const technicalSpecs: Record<string, string> = {
    [l("Product Code", "उत्पाद कोड")]: productCode,
    [l("Stone Material", "पत्थर प्रकार")]: product.stoneType || l("Natural Architectural Stone", "प्राकृतिक पत्थर"),
    [l("Standard Dimensions", "मानक माप")]: product.dimensions || l("Customized to site specs", "साइट अनुसार कस्टमाइज़"),
    [l("Fabrication Time", "निर्माण समय")]: product.leadTime || l("20 - 35 Days (Carving & Dry-Fit)", "20 - 35 दिन"),
    [l("Origin & Quarry", "उत्पत्ति व खदान")]: l("Jaipur & Rajasthan Quarry Blocks", "जयपुर व राजस्थान खदान का पत्थर"),
    [l("Artisan Work", "शिल्पकला")]: l("Traditional Hand Carving", "पारंपरिक हस्त नक्काशी"),
    [l("Surface Finish", "फिनिश")]: l("Hand Chiseled / Honed / Smooth", "हस्त नक्काशी / स्मूथ"),
    ...(typeof (product as any).specs === "object" ? (product as any).specs : {})
  };

  const handleShare = () => {
    const shareTitle = `[${productCode}] ${product.name} | RK Stone Corporation Jaipur`;
    const shareText = `Explore [${productCode}] ${product.name} (${product.stoneType || "Natural Stone"}) handcrafted by RK Stone Corporation Jaipur:`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareTitle}\n${shareUrl}`);
      alert(`Product [${productCode}] link copied to clipboard!`);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={`[${productCode}] ${product.name} | RK Stone Corporation Jaipur`}
        description={`[${productCode}] ${product.name}. Handcrafted in ${product.stoneType || 'Natural Stone'} by RK Stone Corporation Jaipur. ${product.description}`}
        image={primaryImage}
        type="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": images,
          "description": product.description,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": "RK Stone Corporation"
          },
          "offers": {
            "@type": "Offer",
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

      {/* Top Editorial Breadcrumb Bar */}
      <div className="pt-28 md:pt-32 pb-4 bg-stone-950 text-white border-b border-white/10 select-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-400 flex-wrap">
              <Link to="/shop" className="hover:text-accent flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>CATALOGUE</span>
              </Link>
              <span>/</span>
              <span className="uppercase text-stone-300">{product.category.replace(/-/g, ' ')}</span>
              <span>/</span>
              <span className="text-accent font-bold tracking-wider">{productCode}</span>
              <span>/</span>
              <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Image Gallery & Workshop Assurances (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="left" duration={0.6}>
              <ImageGallery images={images} alt={product.name} />
            </Reveal>

            {/* Workshop Assurance Badges Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white border border-stone-200 p-3.5 flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">100% Genuine Stone</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">High-density zero-synthetic quarry extracted slabs</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-3.5 flex items-start gap-3 shadow-2xs">
                <Hammer className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Sompura Guild Artisans</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">Generations of Vedic Shilpa Shastra stone carvers</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-3.5 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Workshop Dry-Fit</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">Pre-assembled trial before crated dispatch</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-3.5 flex items-start gap-3 shadow-2xs">
                <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">White-Glove Transit</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">Insured foam & timber crating all over India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Narrative, Custom Sizing & Instant Quotation (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="right" duration={0.6}>
              
              {/* Category, Item Code & Stone Material Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-accent text-stone-950 text-xs font-black tracking-widest uppercase shadow-xs">
                  {productCode}
                </span>
                <span className="px-3 py-1 bg-stone-900 text-white text-[11px] font-bold tracking-widest uppercase">
                  {product.category.replace(/-/g, ' ')}
                </span>
                {product.stoneType && (
                  <span className="px-3 py-1 bg-accent/15 text-stone-900 text-[11px] font-bold tracking-widest uppercase border border-accent/30">
                    {product.stoneType}
                  </span>
                )}
                <span className="px-3 py-1 bg-stone-200 text-stone-800 text-[11px] font-semibold tracking-wider uppercase">
                  DIRECT FACTORY
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight mb-3">
                {l(product.name, product.nameHi || product.name)}
              </h1>

              {/* Standard Dimensions Highlight */}
              {product.dimensions && (
                <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-3.5 py-2 border-l-2 border-accent mb-6">
                  <Ruler className="w-4 h-4 text-accent shrink-0" />
                  <span>
                    <strong className="text-stone-900">Reference Dimensions:</strong> {product.dimensions}
                  </span>
                </div>
              )}

              {/* ================= BESPOKE QUOTATION & SIZING CARD ================= */}
              <div className="bg-white border border-stone-300 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block">
                      {l(`ITEM CODE: ${productCode}`, `कोड: ${productCode}`)}
                    </span>
                    <h3 className="font-heading font-medium text-lg uppercase text-stone-950">
                      {l("Direct Workshop Price Quotation", "सीधे कारखाने का भाव कोटेशन")}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    {product.price > 0 ? (
                      <div className="flex flex-col sm:items-end">
                        <div className="text-xl sm:text-2xl font-heading font-bold text-stone-950">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                          <span className="text-xs text-stone-500 font-body font-normal"> / {product.priceUnit || 'sq.ft'}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                          {l("Direct Workshop Rate", "वर्कशॉप दर")}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-block text-[11px] font-bold text-[#1EBE5D] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 uppercase tracking-wider">
                        {l("Direct Manufacturer Price", "सीधा निर्माता भाव")}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {l(
                    "Each stone work is custom-crafted to your site dimensions, thickness, and design. Get an instant direct quote from our Jaipur workshop team.",
                    "प्रत्येक काम आपके साइट के नाप, मोटाई और डिज़ाइन के अनुसार तैयार किया जाता है। तुरंत हमारी जयपुर वर्कशॉप टीम से कोटेशन प्राप्त करें।"
                  )}
                </p>

                {/* Custom Dimensions Toggle */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCustomSize}
                        onChange={(e) => setUseCustomSize(e.target.checked)}
                        className="w-4 h-4 accent-stone-950 rounded cursor-pointer"
                        id="customSizeToggle"
                      />
                      <span>{l("Enter Custom Measurements", "कस्टम नाप / माप दर्ज करें")}</span>
                    </Label>
                    {useCustomSize && (
                      <span className="text-[11px] text-accent font-semibold uppercase">
                        {l("Custom Size Active", "कस्टम माप सक्रिय")}
                      </span>
                    )}
                  </div>

                  {useCustomSize && (
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-50 border border-stone-200 animate-in fade-in duration-200">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">
                          {l("Width (Feet)", "चौड़ाई (फीट)")}
                        </label>
                        <Input
                          placeholder="e.g. 6 ft"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(e.target.value)}
                          className="text-xs h-9 bg-white rounded-none border-stone-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">
                          {l("Height (Feet)", "ऊंचाई (फीट)")}
                        </label>
                        <Input
                          placeholder="e.g. 8 ft"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          className="text-xs h-9 bg-white rounded-none border-stone-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">
                          {l("Depth / Thick", "गहराई / मोटाई")}
                        </label>
                        <Input
                          placeholder="e.g. 4 ft"
                          value={customDepth}
                          onChange={(e) => setCustomDepth(e.target.value)}
                          className="text-xs h-9 bg-white rounded-none border-stone-300"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons: WhatsApp Quote & Direct Call */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-6 rounded-none text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>{l("Get Instant Rate on WhatsApp", "व्हाट्सएप पर रेट पूछें")}</span>
                    </Button>
                  </a>

                  <a href="tel:+919414784562" className="sm:w-auto">
                    <Button 
                      variant="outline"
                      className="w-full border-stone-400 hover:border-stone-950 text-stone-900 hover:bg-stone-100 py-6 px-5 rounded-none text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 mr-2 text-accent" />
                      <span>{l("Call Workshop", "कॉल करें")}</span>
                    </Button>
                  </a>
                </div>

                {/* Fast Drawing & Sample Kit Modals Triggers */}
                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-100 text-xs gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDrawingModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium underline underline-offset-4 cursor-pointer"
                  >
                    <FileUp className="w-3.5 h-3.5 text-accent" />
                    <span>{l("Upload Drawing / Photo for Quote", "ड्राइंग या फोटो भेजें")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSampleModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium underline underline-offset-4 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>{l("Request Stone Sample Box", "पत्थर का सैंपल बॉक्स मंगाएं")}</span>
                  </button>
                </div>
              </div>

              {/* Architectural Description */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  {l("Product Description & Craft Details", "उत्पाद विवरण व नक्काशी")}
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed font-light">
                  {l(product.description, product.descriptionHi || product.description)}
                </p>
              </div>

              {/* Features List with Gold Bullets */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Masterwork Distinctions & Durability
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              <SpecsTable specs={technicalSpecs} />

              {/* Share & Location Row */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Fabricated at: Mansarovar Industrial Area, Jaipur, Rajasthan</span>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= WORKSHOP FABRICATION PROCESS ================= */}
      <section className="bg-stone-950 text-white py-16 border-t border-white/10 mt-12 select-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block mb-2">
              {l("WORKSHOP FABRICATION STEPS", "निर्माण चरण")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-normal uppercase tracking-wide">
              {l("HOW WE CRAFT & DELIVER YOUR ORDER", "हम कैसे तैयार और डिलीवर करते हैं")}
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-2">
              {l(
                "From stone selection to workshop carving, pre-assembly trial, and safe delivery across India.",
                "पत्थर चयन से लेकर नक्काशी, असेंबली जांच और पूरे भारत में सुरक्षित डिलीवरी तक।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 relative">
              <span className="text-3xl font-heading font-light text-accent/50 block mb-3">01</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                {l("Design & Measurements", "डिज़ाइन व नाप")}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed font-light">
                {l(
                  "We finalize the design, height, and custom dimensions to start block cutting.",
                  "आपकी पसंद और साइट के नाप के अनुसार सही पत्थर काटने की योजना बनाई जाती है।"
                )}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 relative">
              <span className="text-3xl font-heading font-light text-accent/50 block mb-3">02</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                {l("Raw Stone Selection", "पत्थर का चयन")}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed font-light">
                {l(
                  "Selected high-density natural stone blocks from certified Rajasthan quarries.",
                  "राजस्थान की प्रमाणित खदानों से ठोस और मजबूत प्राकृतिक पत्थर चुना जाता है।"
                )}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 relative">
              <span className="text-3xl font-heading font-light text-accent/50 block mb-3">03</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                {l("Hand Carving & Trial", "नक्काशी व ट्रायल")}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed font-light">
                {l(
                  "Master craftsmen chisel the details and pre-assemble all parts to ensure perfect fit.",
                  "कारीगरों द्वारा बारीक नक्काशी और वर्कशॉप में जोड़कर फिटिंग की जांच।"
                )}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 relative">
              <span className="text-3xl font-heading font-light text-accent/50 block mb-3">04</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                {l("Packing & Delivery", "पैकिंग व डिलीवरी")}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed font-light">
                {l(
                  "Cushioned in sturdy wooden boxes and delivered safely to your location anywhere in India.",
                  "मजबूत लकड़ी के बॉक्स में सुरक्षित पैकिंग और भारत में आपके पते पर डिलीवरी।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RELATED MASTERPIECES SECTION ================= */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block">
                COMPLEMENTARY WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-normal uppercase text-stone-950 tracking-wide mt-1">
                RELATED ARCHITECTURAL MASTERWORKS
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-stone-900 hover:text-accent uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All 22+ Works</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct, idx) => (
              <Card
                key={relProduct._id || relProduct.id || idx}
                className="bg-white border-stone-200 rounded-none overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-stone-950/80 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {relProduct.category.replace(/-/g, ' ')}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    {relProduct.stoneType && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block truncate">
                        {relProduct.stoneType}
                      </span>
                    )}
                    <h3 className="font-heading font-normal uppercase text-stone-950 text-sm tracking-wide line-clamp-2 group-hover:text-accent transition-colors">
                      {relProduct.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
                  <Link
                    to={`/product/${relProduct.id || relProduct._id}`}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-[11px] font-bold uppercase rounded-none border-stone-300 hover:border-stone-950 hover:bg-stone-50"
                    >
                      Details
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/919414784562?text=${encodeURIComponent(
                      `Hi RK Stone Corporation, please quote for related masterpiece: ${relProduct.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      size="sm"
                      className="w-full text-[11px] font-bold uppercase rounded-none bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xs"
                    >
                      <WhatsAppIcon className="w-3 h-3 mr-1" />
                      Quote
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ================= INQUIRY & CLIENT REVIEWS ================= */}
      <section className="bg-stone-100/70 border-t border-stone-200 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
            
            {/* Custom Inquiry Card */}
            <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase block">
                  TECHNICAL CONSULTATION
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal uppercase tracking-wide text-stone-950 mt-1">
                  Ask About This Piece (विशेष शिल्प परामर्श)
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  Leave your contact details and our master craftsman will revert with technical drawings, stone density reports, and price estimate within 4 hours.
                </p>
              </div>

              <InquiryForm
                productId={product.id || product._id || "inquiry"}
                productName={product.name}
              />
            </div>

            {/* Verified Client Reviews */}
            <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-2xs">
              <Reviews productId={product.id || product._id || "reviews"} />
            </div>

          </div>
        </div>
      </section>

      {/* Modals for Drawing Upload and Sample Kit */}
      <DrawingUploadModal
        isOpen={isDrawingModalOpen}
        onClose={() => setIsDrawingModalOpen(false)}
        defaultCraft={product.name}
      />
      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
}
