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
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  BookOpen
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
    { text: l("SANDSTONE TEMPLE", "सैंडस्टोन मंदिर"), id: "sandstone-temple", icon: "✦" },
    { text: l("SANDSTONE TEMPLE ENTRY GATE", "मंदिर प्रवेश द्वार व तोरण"), id: "sandstone-temple-entry-gate", icon: "✦" },
    { text: l("DHOLPUR SANDSTONE TEMPLE", "धौलपुर सैंडस्टोन मंदिर"), id: "dholpur-sandstone-temple", icon: "✦" },
    { text: l("SANDSTONE GRILL", "सैंडस्टोन जाली व ग्रिल"), id: "sandstone-grill", icon: "✦" },
    { text: l("SANDSTONE LAMP", "सैंडस्टोन लैंप व दीपस्तंभ"), id: "sandstone-lamp", icon: "✦" },
    { text: l("SANDSTONE GAZEBO", "सैंडस्टोन छतरी व गज़ेबो"), id: "sandstone-gazebo", icon: "✦" },
    { text: l("SANDSTONE FOUNTAINS", "सैंडस्टोन वाटर फाउंटेन"), id: "sandstone-fountains", icon: "✦" },
    { text: l("SANDSTONE GARDEN BENCH", "सैंडस्टोन गार्डन बेंच"), id: "sandstone-garden-bench", icon: "✦" },
    { text: l("SANDSTONE PLANTER", "सैंडस्टोन गमले व कलश"), id: "sandstone-planter", icon: "✦" },
    { text: l("SANDSTONE BALL SPHERE", "सैंडस्टोन बॉल व स्फेयर"), id: "sandstone-ball-sphere", icon: "✦" },
    { text: l("SANDSTONE ELEPHANT STATUE", "सैंडस्टोन हाथी मूर्ति"), id: "sandstone-elephant-statue", icon: "✦" },
    { text: l("SANDSTONE GOD STATUE", "सैंडस्टोन भगवान मूर्ति"), id: "sandstone-god-statue", icon: "✦" },
    { text: l("SANDSTONE WALL MURAL", "सैंडस्टोन वॉल म्यूरल"), id: "sandstone-wall-mural", icon: "✦" },
    { text: l("SANDSTONE ANGEL GARDEN STATUE", "सैंडस्टोन एंजल गार्डन मूर्ति"), id: "sandstone-angel-garden-statue", icon: "✦" },
    { text: l("SANDSTONE MOTHER CHILD STATUE", "सैंडस्टोन मदर चाइल्ड मूर्ति"), id: "sandstone-mother-child-statue", icon: "✦" },
    { text: l("RED SANDSTONE ASHOK STAMBH WITH PILLAR", "रेड सैंडस्टोन अशोक स्तंभ"), id: "red-sandstone-ashok-stambh", icon: "✦" },
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
              <Link
                key={`loop1-${idx}`}
                to={`/shop?category=${item.id}`}
                className="inline-flex items-center mx-5 hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-accent mr-3 text-xs">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
          {/* Second loop for seamless infinite repetition */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <Link
                key={`loop2-${idx}`}
                to={`/shop?category=${item.id}`}
                className="inline-flex items-center mx-5 hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-accent mr-3 text-xs">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
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
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span>{l("ESTD. 2009", "स्थापना 2009")}</span>
                <span className="text-accent font-semibold">{l("MANUFACTURER & SUPPLIER", "सीधा निर्माता व आपूर्तिकर्ता")}</span>
                <span className="font-mono text-white/90 bg-white/10 border border-white/20 px-2.5 py-1 rounded-[2px] tracking-wider text-[11px] font-semibold">
                  GSTIN: <span className="text-accent">08CUUPS3588K1ZE</span>
                </span>
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
                  "Established in 2009 by Founder Mr. Rajendra Saini, RK Stone Corporation is Jaipur's renowned Manufacturer and Supplier of exquisite Sandstone Temples, Temple Entry Gates, Dholpur Temples, 3D CNC Jalis, Fountains, Gazebos, and Garden Ornaments.",
                  "2009 में संस्थापक श्री राजेंद्र सैनी द्वारा स्थापित, आर.के. स्टोन कॉर्पोरेशन जयपुर में सैंडस्टोन मंदिर, मंदिर प्रवेश तोरण द्वार, धौलपुर मंदिर, 3D सीएनसी जाली, छतरियां व वाटर फाउंटेन का प्रसिद्ध निर्माता व सप्लायर है।"
                )}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="space-y-2.5 text-xs font-body text-white/70 leading-relaxed">
                <div><strong className="text-white font-medium">{l("FOUNDER:", "संस्थापक:")}</strong> {l("Mr. Rajendra Saini", "श्री राजेंद्र सैनी")}</div>
                <div><strong className="text-white font-medium">{l("WORKSHOP:", "वर्कशॉप:")}</strong> {siteSettings.workshopAddress || l("Paldi Meena, Front of Surya City, Agra Road, Jaipur 302031, Rajasthan", "पालड़ी मीणा, सूर्य सिटी के सामने, आगरा रोड, जयपुर 302031, राजस्थान")}</div>
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
                  to="/shop?category=sandstone-temple"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Crown className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Sandstone Temple", "सैंडस्टोन मंदिर")}</span>
                </Link>
                <Link
                  to="/shop?category=sandstone-temple-entry-gate"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Temple Entry Gates", "मंदिर प्रवेश द्वार")}</span>
                </Link>
                <Link
                  to="/shop?category=dholpur-sandstone-temple"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Crown className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Dholpur Sandstone Temple", "धौलपुर सैंडस्टोन मंदिर")}</span>
                </Link>
                <Link
                  to="/shop?category=sandstone-grill"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Grid3X3 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Sandstone Grill (Jali)", "3D सैंडस्टोन जाली")}</span>
                </Link>
                <Link
                  to="/shop?category=sandstone-gazebo"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Sandstone Gazebos & Chhatris", "सैंडस्टोन छतरी व गज़ेबो")}</span>
                </Link>
                <Link
                  to="/shop"
                  className="group text-accent hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-xs pt-1"
                >
                  <span>{l("Explore All 16 Collections →", "सभी 16 श्रेणियां देखें →")}</span>
                </Link>
              </nav>
            </Reveal>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <Reveal direction="up" delay={0.3}>
              <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-accent mb-4">
                {l("EXPLORE & CONNECT", "अन्य लिंक")}
              </h4>
              <nav className="flex flex-col space-y-2.5 text-sm">
                <Link
                  to="/flipbook"
                  className="group text-accent hover:text-white transition-colors flex items-center gap-2 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-bold">{l("Digital Flipbook Catalog (8 Pages)", "डिजिटल फ्लिपबुक कैटलॉग (8 पृष्ठ)")}</span>
                </Link>
                <Link
                  to="/stone-temple-jaipur"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Handcrafted Temples Jaipur", "नक्काशीदार मंदिर जयपुर")}</span>
                </Link>
                <Link
                  to="/cnc-jali-jaipur"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Grid3X3 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Architectural CNC Jalis", "आर्किटेक्चरल सीएनसी जाली")}</span>
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
                  to="/heritage-havelis"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("Heritage Havelis & Elevations", "हवेली शिल्प व एलिवेशन")}</span>
                </Link>
                <Link
                  to="/about"
                  className="group text-white/70 hover:text-accent transition-colors flex items-center gap-2 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">{l("About RK Stone (Estd. 2009)", "कंपनी परिचय (स्थापना 2009)")}</span>
                </Link>
              </nav>
            </Reveal>
          </div>

          {/* Direct Consultation Box */}
          <div className="lg:col-span-3 space-y-4">
            <Reveal direction="up" delay={0.4}>
              <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-accent mb-4">
                {l("WORKSHOP DESK", "सीधा संपर्क")}
              </h4>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                {l(
                  "Planning a stone temple, haveli elevation, or CNC jali? Talk directly with our craftsmen.",
                  "मंदिर, छतरी, जाली या हवेली प्रोजेक्ट की योजना बना रहे हैं? सीधे हमारी वर्कशॉप टीम से बात करें।"
                )}
              </p>
              <div className="space-y-2.5 pt-1 text-xs">
                <a
                  href={`tel:${siteSettings.primaryPhone || '+919414784562'}`}
                  className="flex items-center gap-3 text-white hover:text-accent transition-colors py-1 group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-accent group-hover:text-stone-950 flex items-center justify-center text-accent transition-all shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide text-[13px] font-bold text-white group-hover:text-accent transition-colors">{siteSettings.primaryPhone || '+91 94147 84562'}</span>
                </a>
                <a
                  href={`mailto:${siteSettings.email || 'contact@rkstonecorporation.com'}`}
                  className="flex items-center gap-3 text-white hover:text-accent transition-colors py-1 group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-accent group-hover:text-stone-950 flex items-center justify-center text-accent transition-all shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-[13px] tracking-wide text-white group-hover:text-accent transition-colors truncate">{siteSettings.email || 'contact@rkstonecorporation.com'}</span>
                </a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="group relative flex items-center justify-center gap-2.5 w-full bg-accent hover:bg-accent/90 text-stone-950 text-xs font-bold uppercase tracking-wider py-3 px-4 shadow-gold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-[2px]"
                >
                  <span className="tracking-widest whitespace-nowrap">{l("REQUEST CONSULTATION", "प्रोजेक्ट परामर्श लें")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* ================= DARK GLASS SUB-FOOTER STRIP: LANGUAGE FLAGS + SELECT ================= */}
      <div className="bg-stone-900/90 backdrop-blur-md text-stone-300 border-t border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="text-xs text-white/70 font-medium hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>
              {l(
                "Jaipur Handcrafted Stone Architecture • Manufacturer & Supplier",
                "जयपुर नक्काशीदार पत्थर शिल्पकला • निर्माता और आपूर्तिकर्ता"
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 ml-auto">
            {/* 4 Country Flags (UK, France, Germany, India) */}
            <div className="flex items-center gap-2">
              {/* UK Flag */}
              <button
                type="button"
                id="footer-lang-flag-en"
                onClick={() => setLanguage("en")}
                title="English (United Kingdom)"
                aria-label="English"
                className={`p-0.5 rounded transition-transform cursor-pointer ${
                  language === "en" ? "ring-2 ring-accent scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
              >
                <svg className="w-5 h-3.5 rounded-[2px] shadow-xs block" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="uk-flag-clip-1"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                  <clipPath id="uk-flag-clip-2"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
                  <g clipPath="url(#uk-flag-clip-1)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-clip-2)" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                  </g>
                </svg>
              </button>

              {/* France Flag */}
              <button
                type="button"
                id="footer-lang-flag-fr"
                onClick={() => setLanguage("en")}
                title="Français (French)"
                aria-label="French"
                className="p-0.5 rounded transition-transform cursor-pointer opacity-70 hover:opacity-100 hover:scale-105"
              >
                <svg className="w-5 h-3.5 rounded-[2px] shadow-xs block" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="40" fill="#002395" />
                  <rect x="20" width="20" height="40" fill="#FFFFFF" />
                  <rect x="40" width="20" height="40" fill="#ED2939" />
                </svg>
              </button>

              {/* Germany Flag */}
              <button
                type="button"
                id="footer-lang-flag-de"
                onClick={() => setLanguage("en")}
                title="Deutsch (German)"
                aria-label="German"
                className="p-0.5 rounded transition-transform cursor-pointer opacity-70 hover:opacity-100 hover:scale-105"
              >
                <svg className="w-5 h-3.5 rounded-[2px] shadow-xs block" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="13.33" fill="#000000" />
                  <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
                  <rect y="26.66" width="60" height="13.33" fill="#FFCE00" />
                </svg>
              </button>

              {/* India Flag */}
              <button
                type="button"
                id="footer-lang-flag-hi"
                onClick={() => setLanguage("hi")}
                title="हिंदी (India)"
                aria-label="Hindi"
                className={`p-0.5 rounded transition-transform cursor-pointer ${
                  language === "hi" ? "ring-2 ring-accent scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
              >
                <svg className="w-5 h-3.5 rounded-[2px] shadow-xs block" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="13.33" fill="#FF9933"/>
                  <rect y="13.33" width="60" height="13.33" fill="#FFFFFF"/>
                  <rect y="26.66" width="60" height="13.33" fill="#138808"/>
                  <circle cx="30" cy="20" r="4.5" fill="none" stroke="#000080" strokeWidth="0.8"/>
                  <circle cx="30" cy="20" r="0.8" fill="#000080"/>
                </svg>
              </button>
            </div>

            {/* Select Language Dropdown */}
            <div className="relative">
              <select
                id="footer-language-select"
                aria-label="Select Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
                className="bg-stone-950/80 text-white text-xs font-medium pl-3 pr-7 py-1.5 rounded border border-white/20 hover:border-accent focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer shadow-xs appearance-none transition-colors"
              >
                <option value="en" className="bg-stone-900 text-white">Select Language</option>
                <option value="en" className="bg-stone-900 text-white">English</option>
                <option value="hi" className="bg-stone-900 text-white">हिंदी (Hindi)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-stone-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= EXACT BOTTOM BLACK BAR (ALL RIGHTS RESERVED + AUTHENTIC B2B BADGES FROM SCREENSHOT) ================= */}
      <div className="bg-black py-4 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright & Legal */}
          <div className="text-xs text-white/90 font-body text-center md:text-left space-y-1">
            <div className="font-semibold tracking-wide">
              All Rights Reserved. {siteSettings.companyName || "RK Stone Corporation"}
            </div>
            <div className="text-[11px] text-white/60 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <span>{l("Manufacturer & Supplier • Estd. 2009", "निर्माता व आपूर्तिकर्ता • स्थापना 2009")}</span>
              <span>•</span>
              <Link to="/terms" className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                {l("Terms & Conditions", "नियम व शर्तें")}
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                {l("Privacy Policy", "गोपनीयता नीति")}
              </Link>
            </div>
          </div>

          {/* Right: Authentic B2B Verification Badges (Gatimann, Justdial, IndiaMART, ExportersIndia) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-3">
            
            {/* 1. V-TRUST Badge (ExportersIndia Trust Seal from screenshot) */}
            <a
              href="https://www.exportersindia.com/rk-stone-corporation/"
              target="_blank"
              rel="noopener noreferrer"
              title="V-Trust Verified on ExportersIndia"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1976D2] via-[#0D47A1] to-[#012563] border border-white/80 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0">
                <svg className="w-2.5 h-2.5 text-[#D32F2F]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.184L.918 8.824a1.473 1.473 0 0 1 1.96-2.195l3.528 3.15 6.945-8.318a.07.07 0 0 1 .134-.03z" />
                </svg>
              </div>
              <span className="text-[11px] font-black tracking-wider text-white uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] font-sans">
                V-TRUST
              </span>
            </a>

            {/* 2. Member ExportersIndia Badge (Exact from user screenshot) */}
            <a
              href="https://www.exportersindia.com/rk-stone-corporation/"
              target="_blank"
              rel="noopener noreferrer"
              title="Verified Member on ExportersIndia"
              className="relative inline-flex items-center bg-white rounded-[3px] border border-stone-200 shadow-sm px-2.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pt-2 mt-1 sm:mt-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#D32F2F] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-[0.5px] rounded-t-[2px] shadow-xs whitespace-nowrap">
                Member
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#0D47A1" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="12" y="16" textAnchor="middle" fill="#0D47A1" fontSize="13" fontWeight="bold" fontStyle="italic" fontFamily="serif">e</text>
                </svg>
                <span className="text-[11px] font-bold tracking-tight text-[#0D47A1]">
                  Exporters<span className="text-[#D32F2F]">India</span>
                </span>
              </div>
            </a>

            {/* 3. IndiaMART TrustSEAL Badge */}
            <a
              href="https://www.indiamart.com/rk-stone-corporation/"
              target="_blank"
              rel="noopener noreferrer"
              title="IndiaMART TrustSEAL Verified Business"
              className="relative inline-flex items-center bg-white rounded-[3px] border border-stone-200 shadow-sm px-2.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pt-2 mt-1 sm:mt-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#00875A] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-[0.5px] rounded-t-[2px] shadow-xs whitespace-nowrap">
                TrustSEAL
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="3" fill="#002D58" />
                  <path d="M5 18V6h2.8l2.4 6 2.4-6H15v12h-2.2v-7l-2.2 5.5h-1.2L7.2 11v7H5z" fill="#FFFFFF" />
                  <circle cx="19" cy="8" r="2" fill="#2EAA55" />
                </svg>
                <span className="text-[11px] font-bold tracking-tight text-[#002D58]">
                  india<span className="text-[#2EAA55]">MART</span>
                </span>
              </div>
            </a>

            {/* 4. Justdial JD Verified Badge */}
            <a
              href="https://www.justdial.com/Jaipur/R-K-Stone-Carporation/0141PX141-X141-251217143034-V6Q1_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              title="Justdial JD Verified Business Profile"
              className="relative inline-flex items-center bg-white rounded-[3px] border border-stone-200 shadow-sm px-2.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pt-2 mt-1 sm:mt-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0076D7] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-[0.5px] rounded-t-[2px] shadow-xs whitespace-nowrap">
                JD Verified
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-[2px] bg-[#0076D7] flex items-center justify-center text-[9px] font-black text-white shrink-0">
                  JD
                </div>
                <span className="text-[11px] font-bold tracking-tight text-[#0076D7]">
                  Just<span className="text-[#FF8200]">dial</span>
                </span>
              </div>
            </a>

            {/* 5. Gatimann Verified Member Badge */}
            <a
              href="https://gatimann.com/business/rk-stone-company"
              target="_blank"
              rel="noopener noreferrer"
              title="Gatimann Verified Stone Industry Directory"
              className="relative inline-flex items-center bg-white rounded-[3px] border border-stone-200 shadow-sm px-2.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pt-2 mt-1 sm:mt-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1B5E20] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-[0.5px] rounded-t-[2px] shadow-xs whitespace-nowrap">
                Verified
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-[2px] bg-[#1C1917] flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-[#DAAF72]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1l5 4v6l-5 4-5-4V5l5-4zm0 2.2L4.5 6v4L8 12.8 11.5 10V6L8 3.2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold tracking-tight text-stone-900">
                  Gatimann
                </span>
              </div>
            </a>

            {/* 6. IndianYellowPages Verified Badge */}
            <a
              href="https://www.indianyellowpages.com/dausa/rk-stone-corporation-agra-road-dausa-10109625/"
              target="_blank"
              rel="noopener noreferrer"
              title="IndianYellowPages Verified Business Listing"
              className="relative inline-flex items-center bg-white rounded-[3px] border border-stone-200 shadow-sm px-2.5 py-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer pt-2 mt-1 sm:mt-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#B45309] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-[0.5px] rounded-t-[2px] shadow-xs whitespace-nowrap">
                Verified
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-[2px] bg-[#F59E0B] flex items-center justify-center text-[8px] font-black text-stone-950 shrink-0">
                  YP
                </div>
                <span className="text-[11px] font-bold tracking-tight text-[#1E3A8A]">
                  Indian<span className="text-[#D97706]">YellowPages</span>
                </span>
              </div>
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
