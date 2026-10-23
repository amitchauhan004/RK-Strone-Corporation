import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  ArrowLeft,
  Phone,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Gem
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Seo } from "@/components/Seo";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.warn("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/shop");
    }
  };

  const quickCategories = [
    {
      title: l("Stone Temples & Mandirs", "पत्थर के मंदिर"),
      desc: l("Pure Makrana marble & pink sandstone mandirs", "मकराना मार्बल व गुलाबी सैंडस्टोन मंदिर"),
      path: "/stone-temple-jaipur",
      image: "/products/Stone%20Temple/3.jpg",
      tag: l("SACRED CRAFT", "मंदिर शिल्प")
    },
    {
      title: l("3D CNC Stone Jalis", "3D सीएनसी जाली"),
      desc: l("Precision facade screens & decorative panels", "सटीक एलिवेशन व वेंटिलेशन जाली"),
      path: "/cnc-jali-jaipur",
      image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
      tag: l("PRECISION JALI", "सीएनसी जाली")
    },
    {
      title: l("Heritage Havelis & Jharokhas", "हवेली झरोखे व खंभे"),
      desc: l("Palace balconies, entrance arches & fluted columns", "राजस्थानी झरोखे व नक्काशीदार खंभे"),
      path: "/heritage-havelis",
      image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg",
      tag: l("RAJASTHANI HERITAGE", "हवेली शिल्प")
    },
    {
      title: l("Courtyard Fountains & Chhatris", "फव्वारे व छतरियां"),
      desc: l("Cascading water features, garden pavilions & statues", "शाही वाटर फाउंटेन व गार्डन छतरियां"),
      path: "/courtyard-artifacts",
      image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
      tag: l("GARDEN DÉCOR", "गार्डन शिल्प")
    }
  ];

  return (
    <div className="min-h-[85vh] bg-stone-950 text-white relative overflow-hidden flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 selection:bg-accent selection:text-stone-950">
      <Seo
        title={l(
          "Page Not Found (404) | RK Stone Corporation Jaipur",
          "पृष्ठ उपलब्ध नहीं है (404) | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "The requested architectural stone page does not exist. Explore our stone temples, CNC jalis, haveli facades, and fountains in Jaipur.",
          "आप जिस पेज को ढूंढ रहे हैं, वह मौजूद नहीं है। जयपुर की हमारी वर्कशॉप के मंदिर, जाली और फव्वारे देखें।"
        )}
        type="website"
      />

      {/* Ambient Architectural Stone Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(218,175,114,0.22),rgba(10,10,10,0.98))] pointer-events-none" />

      {/* Subtle Geometric Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "36px 36px"
        }}
      />

      {/* Decorative Golden Corner Frames */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-accent/30 pointer-events-none hidden sm:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-accent/30 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-accent/30 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-accent/30 pointer-events-none hidden sm:block" />

      <div className="container relative z-10 mx-auto max-w-5xl text-center space-y-12">
        
        {/* Brand Crest & Sculpted 404 Display */}
        <div className="space-y-4">
          <div className="relative inline-block my-2">
            <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-heading font-light tracking-[0.18em] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-600 drop-shadow-[0_0_45px_rgba(218,175,114,0.25)] select-none">
              404
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-white tracking-wide">
            {l("THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST", "यह पेज या डिज़ाइन उपलब्ध नहीं है")}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
            {l(
              "The architectural pathway or link you followed may have moved, been updated, or does not exist. Use the search bar below or explore our popular stone craft collections.",
              "आप जिस लिंक या पेज को ढूंढ रहे हैं, वह स्थानांतरित कर दिया गया है या मौजूद नहीं है। आप नीचे सर्च कर सकते हैं या हमारी मुख्य श्रेणियों को देख सकते हैं।"
            )}
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/5 border border-white/20 p-1.5 backdrop-blur-md shadow-2xl focus-within:border-accent transition-colors">
            <div className="pl-3 text-stone-400">
              <Search className="w-4 h-4 text-accent" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={l(
                "Search by product, stone, mandir, jali, fountain...",
                "मंदिर, जाली, फव्वारा, मकराना मार्बल या धौलपुर स्टोन खोजें..."
              )}
              className="border-0 bg-transparent text-white text-xs sm:text-sm font-sans focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-stone-500 h-10"
            />
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-stone-950 text-xs font-bold uppercase tracking-wider px-5 h-10 rounded-none shadow-gold cursor-pointer shrink-0"
            >
              <span>{l("Search", "खोजें")}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <Link to="/">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs tracking-wider px-7 py-6 rounded-none shadow-gold cursor-pointer"
            >
              <Home className="mr-2 w-4 h-4" />
              {l("RETURN TO HOMEPAGE", "होमपेज पर वापस जाएं")}
            </Button>
          </Link>

          <Link to="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer"
            >
              <Layers className="mr-2 w-4 h-4 text-accent" />
              {l("BROWSE FULL CATALOG", "पूरा कैटलॉग देखें")}
            </Button>
          </Link>

          <a
            href={`https://wa.me/919414784562?text=${encodeURIComponent(
              "Hi RK Stone Corporation, I got a 404 page while browsing your website. I am looking for information on custom stone work."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold uppercase text-xs tracking-wider px-6 py-6 rounded-none shadow-md cursor-pointer"
            >
              <WhatsAppIcon className="mr-2 w-4 h-4 text-white" />
              {l("WHATSAPP HELP DESK", "व्हाट्सएप पर सहायता लें")}
            </Button>
          </a>
        </div>

        {/* Popular Category Cards Grid */}
        <div className="pt-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
              {l("EXPLORE POPULAR ARCHITECTURAL COLLECTIONS", "लोकप्रिय पत्थर श्रेणियां")}
            </span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {quickCategories.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="group relative bg-[#141414] border border-white/10 hover:border-accent p-4 transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-1 block"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-stone-900 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-wider text-accent bg-black/80 px-2 py-0.5 border border-accent/30">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-heading font-normal uppercase text-white group-hover:text-accent transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent" />
                </h3>
                <p className="text-[11px] text-stone-400 font-light mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Direct Help Callout Banner */}
        <div className="border border-white/15 bg-white/5 p-6 max-w-3xl mx-auto backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                {l("Looking for a Specific Dimension or Design?", "कोई विशेष नाप या डिज़ाइन चाहिए?")}
              </div>
              <div className="text-[11px] text-stone-400 font-light mt-0.5">
                {l(
                  "Call our Jaipur workshop master craftsmen directly for instant guidance.",
                  "तुरंत जानकारी के लिए सीधे हमारे जयपुर वर्कशॉप कारीगरों से बात करें।"
                )}
              </div>
            </div>
          </div>
          <a
            href={`tel:${siteSettings.primaryPhone || '+919414784562'}`}
            className="text-xs font-mono font-bold text-accent hover:text-white uppercase tracking-wider px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-accent/30 shrink-0 transition-colors"
          >
            {siteSettings.primaryPhone || "+91 94147 84562"}
          </a>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
