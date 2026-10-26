import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Crown, 
  Building2, 
  Grid3X3, 
  Droplets, 
  Briefcase,
  Globe
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { categories } from "@/data/products";

const Navigation = () => {
  const { language, setLanguage, l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileArchOpen, setIsMobileArchOpen] = useState(false);
  const location = useLocation();

  const isArchitectureRoute = [
    "/stone-temple-jaipur",
    "/heritage-havelis",
    "/cnc-jali-jaipur",
    "/courtyard-artifacts",
    "/architects"
  ].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsOpen(false);
    if (!isArchitectureRoute) {
      setIsMobileArchOpen(false);
    }
  }, [location.pathname, isArchitectureRoute]);

  const disciplines = [
    {
      name: l("Temples & Mandirs", "नक्काशीदार मंदिर"),
      desc: l("Makrana White Marble & Sandstone", "मकराना सफेद मार्बल व सैंडस्टोन"),
      path: "/stone-temple-jaipur",
      icon: Crown
    },
    {
      name: l("Haveli Facades & Columns", "हवेली व नक्काशीदार पिलर्स"),
      desc: l("Rajasthani Pillars & Jharokhas", "राजस्थानी खंभे व नक्काशीदार झरोखे"),
      path: "/heritage-havelis",
      icon: Building2
    },
    {
      name: l("CNC Stone Jalis", "3D सीएनसी पत्थर जाली"),
      desc: l("Ventilation Lattices & Screens", "दीवार व वेंटिलेशन जाली स्क्रीन्स"),
      path: "/cnc-jali-jaipur",
      icon: Grid3X3
    },
    {
      name: l("Courtyard & Fountains", "वाटर फाउंटेन व छतरियां"),
      desc: l("Fountains, Chhatris & Sculptures", "शाही फव्वारे, छतरियां व मूर्तियां"),
      path: "/courtyard-artifacts",
      icon: Droplets
    },
    {
      name: l("For Architects & Designers", "आर्किटेक्ट्स व डिजाइनर्स"),
      desc: l("CAD Support & 3D Fabrication", "CAD सहायता व 3D पत्थर फैब्रिकेशन"),
      path: "/architects",
      icon: Briefcase
    }
  ];

  return (
    <nav
      style={{ backgroundColor: isScrolled ? "rgba(16, 16, 16, 0.98)" : "rgba(16, 16, 16, 0.92)" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl transition-all duration-300"
    >
      {/* Top Customizable Announcement Bar */}
      {siteSettings.announcementActive && siteSettings.announcementText && (
        <div className="bg-gradient-to-r from-stone-950 via-black to-stone-950 border-b border-accent/25 py-1 px-4 text-center text-[11px] font-body tracking-wider text-accent overflow-hidden whitespace-nowrap">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="truncate">{siteSettings.announcementText}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Minimalist Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-85 group"
          >
            <img
              src={logo}
              alt={siteSettings.companyName || "RK Stone Corporation"}
              className="h-10 w-10 object-cover rounded-full ring-1 ring-accent/60 shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-heading font-medium text-xs sm:text-sm md:text-base tracking-[0.16em] uppercase text-white leading-tight">
                {siteSettings.companyName || "RK STONE CORPORATION"}
              </span>
              <span className="text-[10px] font-body tracking-wider uppercase text-accent font-medium">
                {siteSettings.workshopCity || l("JAIPUR, RAJASTHAN", "जयपुर, राजस्थान")}
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation (Only 5 Spaced Items) */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Products / Architecture Dropdown matching official catalog */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                type="button"
                className={`font-body text-sm font-medium tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  isCollectionsOpen || ["/stone-temple-jaipur", "/heritage-havelis", "/cnc-jali-jaipur", "/courtyard-artifacts", "/architects"].includes(location.pathname)
                    ? "text-accent"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                <span>{l("Products (Architecture)", "उत्पाद व शिल्पकला")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsOpen ? "rotate-180 text-accent" : "text-stone-400"}`} />
              </button>

              {/* Exact 16-Category Dropdown matching user screenshot Image 2 */}
              {isCollectionsOpen && (
                <div 
                  style={{ backgroundColor: "#141414" }}
                  className="absolute top-full -left-4 w-84 max-h-[80vh] overflow-y-auto border border-stone-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-none z-[100] animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {/* Gold accent top indicator */}
                  <div className="sticky top-0 left-0 right-0 h-[2px] bg-accent shadow-[0_0_8px_#d4af37] z-10" />

                  {/* Header Title */}
                  <div className="sticky top-0.5 bg-[#141414]/95 backdrop-blur-sm px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-accent z-10">
                    <span>{l("16 Product Categories", "16 प्रमुख उत्पाद श्रेणियां")}</span>
                    <Link to="/shop" className="text-white/60 hover:text-white underline text-[10px]">
                      {l("View All", "सभी देखें")}
                    </Link>
                  </div>

                  {/* 16 Category Items matching Image 2 */}
                  <div className="divide-y divide-white/5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        onClick={() => setIsCollectionsOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-body text-stone-200 hover:text-stone-950 hover:bg-accent transition-all duration-150 group"
                      >
                        <span className="font-medium tracking-wide line-clamp-1">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-950 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>

                  {/* Footer Bar */}
                  <div className="sticky bottom-0 bg-[#0d0d0d] p-3 border-t border-stone-800 flex items-center justify-between text-[11px] font-body text-white/70">
                    <Link to="/architects" className="text-accent hover:underline flex items-center gap-1">
                      <span>{l("Custom Bespoke Projects", "कस्टम प्रोजेक्ट्स")}</span>
                    </Link>
                    <span className="text-[10px] text-accent/80 font-mono">EST. 2009</span>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/shop"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/shop" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Catalog & Shop", "कैटलॉग और शॉप")}
            </Link>

            <Link
              to="/materials"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/materials" ? "text-accent" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Materials", "पत्थर प्रकार")}
            </Link>

            <Link
              to="/portfolio"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/portfolio" ? "text-accent" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Portfolio", "हमारे काम")}
            </Link>

            <Link
              to="/about"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/about" ? "text-accent" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("About Us", "हमारे बारे में")}
            </Link>

            <Link
              to="/contact"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/contact" ? "text-accent" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Contact", "संपर्क")}
            </Link>

          </div>

          {/* Right: Inquire Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            <Link to="/contact" className="hidden sm:inline-flex">
              <span className="font-body text-xs font-medium tracking-wide uppercase px-5 py-2.5 border border-accent/40 bg-accent/10 hover:bg-accent text-accent hover:text-stone-950 transition-all duration-300 rounded-none cursor-pointer shadow-sm">
                {l("Inquire", "पूछताछ")}
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle Navigation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-accent" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>

        </div>

        {/* Clean Mobile Drawer */}
        {isMobileMenuOpen && (
          <div 
            style={{ backgroundColor: "#141414" }}
            className="lg:hidden py-5 border-t border-stone-800 text-white animate-in fade-in duration-150"
          >
            <div className="space-y-1 px-4">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-800">
                <span className="text-xs text-stone-400 font-medium">
                  {l("Language / भाषा:", "भाषा / Language:")}
                </span>
                <div className="inline-flex items-center bg-white/10 border border-white/20 p-0.5 rounded-full">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      language === "en" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("hi")}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      language === "hi" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>
              
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("Home", "होम")}
              </Link>

              {/* Catalog & Shop */}
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/shop" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("Catalog & Shop", "कैटलॉग और शॉप")}
              </Link>

              {/* Mobile Products & Architecture Dropdown Accordion */}
              <div className="border-y border-stone-800/80 my-1 py-1">
                <button
                  type="button"
                  onClick={() => setIsMobileArchOpen(!isMobileArchOpen)}
                  className={`w-full flex items-center justify-between font-body text-sm font-medium py-2.5 transition-colors cursor-pointer ${
                    isMobileArchOpen ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l("Products & Architecture", "उत्पाद व शिल्पकला")}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-accent/20 text-accent font-bold">16</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileArchOpen ? "rotate-180 text-accent" : "text-stone-400"
                    }`}
                  />
                </button>

                {isMobileArchOpen && (
                  <div className="bg-[#1a1a1a] border-l-2 border-accent pl-2 pr-2 py-2 my-1 space-y-0.5 rounded-none max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 divide-y divide-white/5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileArchOpen(false);
                        }}
                        className="flex items-center justify-between p-2 text-xs text-stone-300 hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        <span className="line-clamp-1">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Materials */}
              <Link
                to="/materials"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/materials" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("Materials", "पत्थर प्रकार")}
              </Link>

              {/* Portfolio */}
              <Link
                to="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/portfolio" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("Portfolio", "हमारे काम")}
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/about" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("About Us", "हमारे बारे में")}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block font-body text-sm font-medium py-2.5 transition-colors ${
                  location.pathname === "/contact" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
                }`}
              >
                {l("Contact", "संपर्क")}
              </Link>

              {/* Mobile Footer Inquiry & Call */}
              <div className="pt-4 mt-2 border-t border-stone-800 flex items-center justify-between">
                <a
                  href={`tel:${siteSettings.primaryPhone || '+919414784562'}`}
                  className="font-body text-xs font-medium text-accent hover:underline"
                >
                  {l(`Call: ${siteSettings.primaryPhone || '+91 94147 84562'}`, `कॉल: ${siteSettings.primaryPhone || '+91 94147 84562'}`)}
                </a>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-body text-xs font-semibold uppercase tracking-wider text-white underline hover:text-accent"
                >
                  {l("Start Inquiry →", "पूछताछ करें →")}
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navigation;
