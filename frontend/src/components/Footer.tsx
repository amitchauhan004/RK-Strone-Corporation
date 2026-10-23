import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Crown,
  Building2,
  Grid3X3,
  Droplets,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileText,
  Globe,
  Check,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Reveal } from "@/components/ui/Reveal";

const Footer = () => {
  const { language, setLanguage, l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const whatsappClean = (siteSettings.whatsappNumber || "9414784562").replace(/\D/g, "");

  const marqueeItems = [
    { text: l("MAKRANA WHITE MARBLE", "मकराना सफेद संगमरमर"), icon: "✦" },
    { text: l("HANDCARVED STONE TEMPLES", "हस्तनिर्मित पत्थर के मंदिर"), icon: "✦" },
    { text: l("3D CNC STONE JALIS", "3D सीएनसी स्टोन जाली"), icon: "✦" },
    { text: l("BANSI PAHARPUR PINK STONE", "बंसी पहाड़पुर पिंक स्टोन"), icon: "✦" },
    { text: l("HERITAGE HAVELI JHAROKHAS", "हेरिटेज हवेली झरोखे"), icon: "✦" },
    { text: l("DHOLPUR SANDSTONE", "धौलपुर सैंडस्टोन"), icon: "✦" },
    { text: l("TIERED COURTYARD FOUNTAINS", "शाही वाटर फाउंटेन"), icon: "✦" },
    { text: l("ROUND FLUTED PILLARS", "नक्काशीदार गोल खंभे"), icon: "✦" },
    { text: l("DIRECT JAIPUR WORKSHOP", "जयपुर डायरेक्ट वर्कशॉप"), icon: "✦" },
    { text: l("SAFE PAN-INDIA CRATED DISPATCH", "सुरक्षित वुडन क्रेट डिलीवरी"), icon: "✦" },
  ];

  return (
    <footer className="bg-stone-950 text-white border-t border-white/10 selection:bg-accent selection:text-stone-950 relative overflow-hidden">
      
      {/* Ambient Moving Glow in Footer Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(218,175,114,0.07),transparent)] pointer-events-none" />

      {/* 1. Moving Golden Light Beam along the Top Edge */}
      <div className="relative w-full h-[2px] bg-white/10 overflow-hidden">
        <div className="absolute top-0 bottom-0 w-56 bg-gradient-to-r from-transparent via-accent to-transparent animate-light-beam" />
      </div>

      {/* 2. Infinite Moving Architectural Craft Tape / Marquee */}
      <div className="border-b border-white/10 py-3 bg-black/60 overflow-hidden relative">
        <div className="animate-marquee-infinite text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90 flex items-center">
          {/* First loop */}
          <div className="flex items-center shrink-0">
            {marqueeItems.map((item, idx) => (
              <span key={`loop1-${idx}`} className="inline-flex items-center mx-5 hover:text-white transition-colors cursor-default">
                <span className="text-accent mr-3 text-xs">{item.icon}</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
          {/* Second loop for seamless infinite repetition */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={`loop2-${idx}`} className="inline-flex items-center mx-5 hover:text-white transition-colors cursor-default">
                <span className="text-accent mr-3 text-xs">{item.icon}</span>
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Architectural Inscription Ribbon */}
      <div className="border-b border-white/10 py-5 bg-black/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="down" duration={1.2}>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-body uppercase tracking-wider text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-white font-medium">
                  {l("JAIPUR WORKSHOP & MANUFACTURING • RAJASTHAN, INDIA", "जयपुर वर्कशॉप व निर्माण केंद्र • राजस्थान, भारत")}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span>{l("FOUNDED 1984", "स्थापना 1984")}</span>
                <span className="text-accent font-semibold">{l("DIRECT MANUFACTURER & EXPORTER", "सीधा निर्माता व निर्यातक")}</span>
                <span className="hidden md:inline text-white/40">GSTIN: {siteSettings.gstNumber || "08CUUPS3588K1ZE"}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Manifesto Column */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal direction="up" delay={0.1}>
              <Link to="/" className="flex items-center gap-3.5 group inline-flex">
                <img
                  src={logo}
                  alt={`${siteSettings.companyName || "RK Stone Corporation"} Logo`}
                  className="h-12 w-12 object-cover rounded-full ring-2 ring-accent/60 shadow-lg group-hover:scale-105 group-hover:ring-accent transition-all duration-300"
                />
                <div>
                  <span className="text-xl font-heading font-medium uppercase tracking-wider text-white block group-hover:text-accent transition-colors">
                    {siteSettings.companyName || "RK STONE CORPORATION"}
                  </span>
                  <span className="text-[10px] font-body tracking-wider uppercase text-accent font-medium">
                    {siteSettings.tagline || l("HANDCRAFTED STONE WORKS", "पारंपरिक पत्थर शिल्पकला")}
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {l(
                  "For over four decades, RK Stone Corporation has been Jaipur's premier direct workshop and manufacturer for sacred Vedic mandirs, royal Rajasthani haveli facades, 3D CNC architectural screens, and courtyard water fountains.",
                  "चार दशकों से अधिक समय से आर.के. स्टोन कॉर्पोरेशन जयपुर में सीधे पत्थर के मंदिर, राजस्थानी हवेली एलिवेशन, सीएनसी स्टोन जाली और वाटर फाउंटेन का निर्माण कर रहा है।"
                )}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="space-y-2 text-xs font-body text-white/70 leading-relaxed">
                <div><strong className="text-white font-medium">{l("WORKSHOP:", "वर्कशॉप:")}</strong> {siteSettings.workshopAddress || l("Paldi Meena, Front of Surya City, Agra Road, Jaipur 302031, Rajasthan", "पालड़ी मीणा, सूर्य सिटी के सामने, आगरा रोड, जयपुर 302031, राजस्थान")}</div>
                <div><strong className="text-white font-medium">{l("PHONE / CALL:", "फ़ोन / कॉल:")}</strong> {siteSettings.primaryPhone || "+91 94147 84562"}</div>
                <div><strong className="text-white font-medium">{l("EMAIL:", "ईमेल:")}</strong> {siteSettings.email || "contact@rkstonecorporation.com"}</div>
                <div><strong className="text-white font-medium">{l("WORKING HOURS:", "खुलने का समय:")}</strong> {siteSettings.workingHours || "Mon - Sun: 8:00 AM - 7:00 PM"}</div>
              </div>
            </Reveal>

            {/* Social Media Channels & Google Map Profile */}
            <Reveal direction="up" delay={0.25}>
              <div className="flex items-center gap-2.5 pt-1">
                {siteSettings.socialInstagram && (
                  <a
                    href={siteSettings.socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent hover:text-stone-950 flex items-center justify-center text-white/80 transition-all duration-300 border border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-gold"
                    title="Follow on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialFacebook && (
                  <a
                    href={siteSettings.socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent hover:text-stone-950 flex items-center justify-center text-white/80 transition-all duration-300 border border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-gold"
                    title="Follow on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.socialYoutube && (
                  <a
                    href={siteSettings.socialYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent hover:text-stone-950 flex items-center justify-center text-white/80 transition-all duration-300 border border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-gold"
                    title="Subscribe on YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {siteSettings.googleReviewsUrl && (
                  <a
                    href={siteSettings.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent hover:text-stone-950 flex items-center justify-center text-white/80 transition-all duration-300 border border-white/10 hover:border-accent hover:-translate-y-1 hover:shadow-gold"
                    title="Google Business Profile & Reviews"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Architectural Disciplines */}
          <div className="lg:col-span-3 space-y-4">
            <Reveal direction="up" delay={0.2}>
              <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-accent mb-4">
                {l("ARCHITECTURAL DISCIPLINES", "शिल्प श्रेणियां")}
              </h4>
              <nav className="flex flex-col space-y-2.5 text-sm">
                <Link
                  to="/stone-temple-jaipur"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Crown className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Stone Temples & Mandirs", "पत्थर के मंदिर")}</span>
                </Link>
                <Link
                  to="/heritage-havelis"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Haveli Facades & Columns", "हवेली अग्रभाग व खंभे")}</span>
                </Link>
                <Link
                  to="/cnc-jali-jaipur"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Grid3X3 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("3D CNC Stone Jalis", "3D सीएनसी जाली")}</span>
                </Link>
                <Link
                  to="/courtyard-artifacts"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Droplets className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Courtyard Fountains & Chhatris", "वाटर फाउंटेन व छतरियां")}</span>
                </Link>
                <Link
                  to="/sandstone-supplier-jaipur"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Direct Sandstone Supply", "सैंडस्टोन सप्लायर")}</span>
                </Link>
                <Link
                  to="/shop"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Layers className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("All Catalogued Works", "सभी उत्पाद संग्रह")}</span>
                </Link>
              </nav>
            </Reveal>
          </div>

          {/* Materials & Specifiers */}
          <div className="lg:col-span-3 space-y-4">
            <Reveal direction="up" delay={0.3}>
              <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-accent mb-4">
                {l("EXPLORE & CONNECT", "अन्य लिंक")}
              </h4>
              <nav className="flex flex-col space-y-2.5 text-sm">
                <Link
                  to="/materials"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Layers className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Material Library & Stones", "पत्थरों की जानकारी")}</span>
                </Link>
                <Link
                  to="/materials#sample-box"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Order Stone Sample Box", "पत्थर का सैंपल बॉक्स मंगाएं")}</span>
                </Link>
                <Link
                  to="/architects"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("For Architects & Builders", "आर्किटेक्ट्स व बिल्डर्स के लिए")}</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Selected Works & Portfolio", "हमारा पोर्टफोलियो")}</span>
                </Link>
                <Link
                  to="/about"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("About Our Heritage", "हमारे बारे में")}</span>
                </Link>
                <Link
                  to="/contact"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Contact & Inquiry", "संपर्क व पूछताछ")}</span>
                </Link>
              </nav>
            </Reveal>
          </div>

          {/* Direct Consultation Box */}
          <div className="lg:col-span-2 space-y-4">
            <Reveal direction="up" delay={0.4}>
              <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-accent mb-4">
                {l("GET IN TOUCH", "संपर्क व पूछताछ")}
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                {l(
                  "Planning a stone mandir, haveli elevation, or CNC jali? Talk directly with our craftsmen.",
                  "मंदिर, छतरी, जाली या हवेली प्रोजेक्ट की योजना बना रहे हैं? सीधे हमारी वर्कशॉप टीम से बात करें।"
                )}
              </p>
              <div className="space-y-2.5 pt-3">
                <a
                  href={`tel:${siteSettings.primaryPhone || '+919414784562'}`}
                  className="block text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {l(`Call ${siteSettings.primaryPhone || '+91 94147 84562'}`, `कॉल करें: ${siteSettings.primaryPhone || '+91 94147 84562'}`)}
                </a>
                <a
                  href={`https://wa.me/${whatsappClean || '919414784562'}?text=${encodeURIComponent(
                    `Hi ${siteSettings.companyName || 'RK Stone Corporation'}, I want to discuss a stone project with you.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-center bg-accent hover:bg-accent/90 text-stone-950 text-xs font-bold uppercase tracking-wider py-3 shadow-gold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{l("WhatsApp Us", "व्हाट्सएप पर पूछें")}</span>
                </a>
              </div>
            </Reveal>
          </div>

        </div>

        {/* ================= DEDICATED LANGUAGE SELECTOR IN FOOTER ================= */}
        <Reveal direction="up" delay={0.2}>
          <div className="border border-white/15 bg-white/5 p-6 mt-16 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                <Globe className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-white block">
                  {l("SELECT WEBSITE LANGUAGE", "वेबसाइट की भाषा चुनें")}
                </span>
                <span className="text-xs text-white/60 font-light block">
                  {l(
                    "Switch between English and Hindi. The entire website will update automatically.",
                    "अंग्रेजी और हिंदी में से चुनें। पूरी वेबसाइट की भाषा तुरंत बदल जाएगी।"
                  )}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center bg-stone-900 border border-white/20 p-1 rounded-none shadow-inner">
              <button
                type="button"
                id="footer-lang-en"
                onClick={() => setLanguage("en")}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  language === "en"
                    ? "bg-accent text-stone-950 shadow-md font-extrabold"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>English</span>
                {language === "en" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <button
                type="button"
                id="footer-lang-hi"
                onClick={() => setLanguage("hi")}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  language === "hi"
                    ? "bg-accent text-stone-950 shadow-md font-extrabold"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>हिंदी (Hindi)</span>
                {language === "hi" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Bottom Legal Copyright */}
        <Reveal direction="up" delay={0.1}>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-body">
            <div className="font-light">
              {l(
                "© 1984 RK STONE CORPORATION • JAIPUR, RAJASTHAN. ALL RIGHTS RESERVED.",
                "© 1984 आर.के. स्टोन कॉर्पोरेशन • जयपुर, राजस्थान। सर्वाधिकार सुरक्षित।"
              )}
            </div>
            <div className="flex items-center gap-6 font-medium">
              <Link to="/terms" className="hover:text-accent transition-colors">
                {l("Terms & Conditions", "नियम व शर्तें")}
              </Link>
              <span className="text-white/30">•</span>
              <Link to="/privacy" className="hover:text-accent transition-colors">
                {l("Privacy Policy", "गोपनीयता नीति")}
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </footer>
  );
};

export default Footer;
