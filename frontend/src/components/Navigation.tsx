import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Phone
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { categories, products } from "@/data/products";

const Navigation = () => {
  const { language, setLanguage, l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileArchOpen, setIsMobileArchOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string>("sandstone-temple");
  const location = useLocation();

  const activeCategory = categories.find((c) => c.id === hoveredCategory) || categories[0];
  const activeCategoryProducts = products.filter((p) => p.category === activeCategory.id);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close menus on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsOpen(false);
    setIsMobileArchOpen(false);
    document.body.style.overflow = "unset";
  }, [location.pathname]);

  return (
    <nav
      style={{ backgroundColor: isMobileMenuOpen || isScrolled ? "rgba(18, 18, 18, 0.99)" : "rgba(16, 16, 16, 0.92)" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 text-white shadow-2xl transition-all duration-300 ${
        isMobileMenuOpen ? "bg-[#121212]" : "backdrop-blur-xl"
      }`}
    >
      {/* Top Customizable Marquee Announcement Bar (Only renders when active & text is configured in Admin) */}
      {siteSettings.announcementActive && Boolean(siteSettings.announcementText?.trim()) && (
        <div className="bg-gradient-to-r from-stone-950 via-[#181510] to-stone-950 border-b border-accent/30 py-1.5 px-4 overflow-hidden select-none group">
          <div className="flex items-center overflow-hidden w-full">
            <div className="animate-marquee-infinite text-[11px] font-mono tracking-wider text-accent uppercase flex items-center gap-8 py-0.5">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-center gap-4 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>{siteSettings.announcementText.trim()}</span>
                  <span className="text-white/30">•</span>
                </div>
              ))}
            </div>
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

          {/* Clean Desktop Navigation (Focused & Clutter-Free) */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Home", "होम")}
            </Link>

            {/* Products Mega Dropdown with Hover Flyout matching Photo 2 */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                type="button"
                className={`font-body text-sm font-medium tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                  isCollectionsOpen || location.pathname === "/shop"
                    ? "text-accent"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                <span>{l("Products", "उत्पाद")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsOpen ? "rotate-180 text-accent" : "text-stone-400"}`} />
              </button>

              {/* 2-Column Luxury Dropdown matching user screenshot Image 2 */}
              {isCollectionsOpen && (
                <div 
                  className="absolute top-full -left-6 flex border border-stone-200 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.55)] rounded-none z-[100] animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  {/* Column 1: 16 Official Categories (width 320px, full names, NO truncation) */}
                  <div className="w-[320px] bg-white border-r border-stone-200 max-h-[82vh] overflow-y-auto select-none">
                    {/* Gold accent top indicator */}
                    <div className="sticky top-0 left-0 right-0 h-[2.5px] bg-[#ad6b10] z-20" />

                    <div className="divide-y divide-stone-100">
                      {categories.map((cat) => {
                        const isHovered = cat.id === activeCategory.id;
                        return (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.id}`}
                            onMouseEnter={() => setHoveredCategory(cat.id)}
                            onClick={() => setIsCollectionsOpen(false)}
                            className={`flex items-center justify-between px-5 py-3 text-xs font-body transition-colors cursor-pointer group ${
                              isHovered
                                ? "bg-[#ad6b10] text-white font-semibold"
                                : "text-stone-800 hover:bg-[#ad6b10]/10 hover:text-[#ad6b10]"
                            }`}
                          >
                            <span className="leading-snug tracking-wide">{l(cat.name, cat.hindi)}</span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 shrink-0 ml-3 transition-transform ${
                                isHovered
                                  ? "text-white translate-x-1"
                                  : "text-stone-400 group-hover:text-[#ad6b10]"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 2: Products Flyout for Hovered Category matching Photo 2 */}
                  <div className="w-[350px] bg-white flex flex-col justify-between max-h-[82vh] overflow-y-auto">
                    <div>
                      {/* Active Category Header */}
                      <div className="sticky top-0 bg-[#faf8f5] px-5 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-900 z-10">
                        <span className="uppercase tracking-wider text-[11px] font-mono text-[#ad6b10]">
                          {activeCategory.name}
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">
                          {activeCategoryProducts.length} {l("Products", "उत्पाद")}
                        </span>
                      </div>

                      {/* Product Items matching Photo 2 */}
                      <div className="divide-y divide-stone-100">
                        {activeCategoryProducts.length > 0 ? (
                          activeCategoryProducts.map((p) => (
                            <Link
                              key={p.id}
                              to={`/shop?category=${activeCategory.id}&product=${p.id}`}
                              onClick={() => setIsCollectionsOpen(false)}
                              className="block px-5 py-3 text-xs text-stone-700 hover:text-[#ad6b10] hover:bg-[#faf8f5] transition-colors leading-relaxed group"
                            >
                              <div className="font-medium text-stone-900 group-hover:text-[#ad6b10] transition-colors">
                                {l(p.name, p.nameHi || p.name)}
                              </div>
                              {p.dimensions && (
                                <div className="text-[10px] text-stone-400 font-light mt-0.5">
                                  {p.dimensions}
                                </div>
                              )}
                            </Link>
                          ))
                        ) : (
                          <div className="p-5 text-xs text-stone-500 italic">
                            {l("Explore collection in catalog", "कैटलॉग में संपूर्ण संग्रह देखें")}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prominent Gold "View All" Button at bottom (matching Photo 2) */}
                    <div className="sticky bottom-0 bg-white p-3 border-t border-stone-200 shadow-md">
                      <Link
                        to={`/shop?category=${activeCategory.id}`}
                        onClick={() => setIsCollectionsOpen(false)}
                        className="block w-full py-3 bg-[#ad6b10] hover:bg-[#92590a] text-white text-center text-xs uppercase font-bold tracking-wider rounded-none shadow-sm transition-all"
                      >
                        {l("View All", "सभी उत्पाद देखें")}
                      </Link>
                    </div>
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
              to="/flipbook"
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                location.pathname === "/flipbook" ? "text-accent font-semibold" : "text-stone-300 hover:text-white"
              }`}
            >
              {l("Flipbook", "फ्लिपबुक")}
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
      </div>

      {/* Mobile Drawer (Direct child of nav, full width across screen, directly under header) */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden w-full bg-[#121212] border-t border-stone-800 text-white overflow-y-auto overscroll-contain animate-in fade-in duration-150"
          style={{
            height: "calc(100vh - 5rem)",
            maxHeight: "calc(100vh - 5rem)",
            backgroundColor: "#121212"
          }}
        >
          <div className="px-5 py-5 space-y-4 pb-20">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
              <span className="text-xs text-stone-300 font-medium">
                {l("Language / भाषा:", "भाषा / Language:")}
              </span>
              <div className="inline-flex items-center bg-stone-900 border border-white/20 p-0.5 rounded-full">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    language === "en" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    language === "hi" ? "bg-accent text-stone-950 shadow-xs" : "text-stone-300 hover:text-white"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Navigation Links Group */}
            <div className="divide-y divide-white/5 border-y border-white/10">
              
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors ${
                  location.pathname === "/" ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                }`}
              >
                <span>{l("Home", "होम")}</span>
                {location.pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </Link>

              {/* Catalog & Shop */}
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors ${
                  location.pathname === "/shop" ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                }`}
              >
                <span>{l("Catalog & Shop", "कैटलॉग और शॉप")}</span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </Link>

              {/* Flipbook */}
              <Link
                to="/flipbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors ${
                  location.pathname === "/flipbook" ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{l("Flipbook", "फ्लिपबुक")}</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono bg-accent/20 text-accent border border-accent/40 font-bold uppercase">
                    3D Book
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </Link>

              {/* Products & Architectural Collections Dropdown Accordion */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setIsMobileArchOpen(!isMobileArchOpen)}
                  className={`w-full flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors cursor-pointer ${
                    isMobileArchOpen ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l("Products & Collections", "उत्पाद एवं श्रेणियां")}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-accent/20 text-accent font-bold">
                      16
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isMobileArchOpen ? "rotate-180 text-accent" : "text-stone-400"
                    }`}
                  />
                </button>

                {/* Dropdown Content with Thumbnail Photos & Counts */}
                {isMobileArchOpen && (
                  <div className="bg-[#181818] border border-white/10 p-2 my-2 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* Quick Link: All Products */}
                    <Link
                      to="/shop"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileArchOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 bg-accent hover:bg-accent/90 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>{l("Explore All Products", "सभी उत्पाद देखें")}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    {/* 16 Category Items */}
                    <div className="space-y-1 max-h-[48vh] overflow-y-auto overscroll-contain pr-1">
                      {categories.map((cat) => {
                        const catCount = products.filter((p) => p.category === cat.id).length;
                        return (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.id}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileArchOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 bg-stone-900/90 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-colors group"
                          >
                            {/* Category Photo */}
                            <div className="w-10 h-10 bg-stone-950 border border-stone-800 shrink-0 overflow-hidden">
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/carved-sandstone-temple-1769599633-8557987.jpeg";
                                }}
                              />
                            </div>

                            {/* Title (Only English as requested) */}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-xs text-stone-200 group-hover:text-accent transition-colors truncate">
                                {cat.name}
                              </div>
                            </div>

                            {/* Product Count & Arrow */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] font-mono text-stone-400 bg-white/5 px-1.5 py-0.5 border border-white/10">
                                {catCount}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* About Us */}
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors ${
                  location.pathname === "/about" ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                }`}
              >
                <span>{l("About Us", "हमारे बारे में")}</span>
                {location.pathname === "/about" && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3.5 px-1 font-body text-sm font-medium transition-colors ${
                  location.pathname === "/contact" ? "text-accent font-bold" : "text-stone-200 hover:text-white"
                }`}
              >
                <span>{l("Contact", "संपर्क")}</span>
                {location.pathname === "/contact" && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </Link>

            </div>

            {/* Direct Quick Action Buttons (Call & WhatsApp) */}
            <div className="pt-2 grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${siteSettings.primaryPhone || '+919414784562'}`}
                className="flex items-center justify-center gap-1.5 py-3 px-2 bg-white/5 hover:bg-white/10 border border-white/20 text-accent text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{l("Call Us", "कॉल करें")}</span>
              </a>

              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent("Hello RK Stone Corporation, I have an inquiry about custom stone work.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{l("WhatsApp", "व्हाट्सएप")}</span>
              </a>
            </div>

            {/* Workshop Address Card */}
            <div className="p-3 bg-stone-900/60 border border-white/5 text-[11px] text-stone-400 font-light space-y-1">
              <div className="font-semibold text-stone-300 uppercase tracking-wider font-mono text-[10px]">
                {l("Workshop Address:", "वर्कशॉप का पता:")}
              </div>
              <div>
                {siteSettings.workshopAddress || "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan"}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
