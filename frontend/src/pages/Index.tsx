import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Star,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import heroImage from "@/assets/hero-bg.jpg";
import Seo from "@/components/Seo";
import Reveal from "@/components/ui/Reveal";
import CraftExplorerGrid from "@/components/home/CraftExplorerGrid";
import CustomOrderProcess from "@/components/home/CustomOrderProcess";
import WorkshopShowcase from "@/components/home/WorkshopShowcase";
import DrawingUploadModal from "@/components/home/DrawingUploadModal";
import SampleKitModal from "@/components/home/SampleKitModal";
import { AboutSection } from "@/components/home/AboutSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const Index = () => {
  const { l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const heroSlides = [
    {
      id: "mandir",
      num: "01",
      tag: l("HANDCRAFTED IN RAJASTHAN", "राजस्थान की पारंपरिक शिल्पकला"),
      title: l("CUSTOM STONE TEMPLES & HOME MANDIRS", "सुंदर नक्काशीदार पत्थर के मंदिर"),
      description: l(
        "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts.",
        "बंसी पहाड़पुर और धौलपुर सैंडस्टोन में हाथ से तराशे सुंदर मंदिर। घरों और संस्थाओं के लिए मनचाहे साइज़ में उपलब्ध।"
      ),
      image: "/products/Stone%20Temple/3.jpg",
      link: "#what-we-make",
      shortTitle: l("STONE MANDIRS", "पत्थर के मंदिर"),
    },
    {
      id: "chhatri-haveli",
      num: "02",
      tag: l("HERITAGE STONE ARCHITECTURE", "हवेली व छतरी निर्माण"),
      title: l("STONE CHHATRIS, JHAROKHAS & PILLARS", "शाही छतरियां, झरोखे व नक्काशीदार खंभे"),
      description: l(
        "Traditional garden chhatris, palace-style jharokhas, carved entrance gates, and round fluted pillars chiseled in authentic Dholpur and Jodhpur red sandstone.",
        "प्राकृतिक धौलपुर और जोधपुर लाल पत्थर से बनी शाही छतरियां, झरोखे और सुंदर नक्काशीदार खंभे। आपके घर और बगीचे को दें शाही लुक।"
      ),
      image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
      link: "#what-we-make",
      shortTitle: l("CHHATRIS & HAVELIS", "छतरियां व हवेलियां"),
    },
    {
      id: "gwalior-jali",
      num: "03",
      tag: l("PRECISION STONE SCREENS", "बारीक सीएनसी स्टोन जाली"),
      title: l("3D CNC STONE JALIS & WALL PANELS", "3D सीएनसी स्टोन जाली व एलिवेशन पैनल"),
      description: l(
        "Custom cut 3D stone jalis and elevation screens in Gwalior mint stone and Dholpur sandstone for front elevations, boundary walls, and balconies.",
        "ग्वालियर मिंट स्टोन और धौलपुर सैंडस्टोन में सीएनसी से तराशी गई मजबूत व सुंदर जालियां। घर के फ्रंट एलिवेशन और बालकनी के लिए बेहतरीन।"
      ),
      image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
      link: "#what-we-make",
      shortTitle: l("CNC STONE JALIS", "सीएनसी जालियां"),
    },
    {
      id: "fountain-gates",
      num: "04",
      tag: l("GARDEN & COURTYARD DÉCOR", "बगीचे व द्वार की सुंदरता"),
      title: l("STONE WATER FOUNTAINS & ENTRANCE GATES", "पत्थर के वाटर फाउंटेन व भव्य प्रवेश द्वार"),
      description: l(
        "Multi-tier carved stone fountains, grand ceremonial entrance gates, and hand-sculpted animal figures to elevate your garden and courtyard.",
        "हाथ से तराशे बहुमंजिला पानी के फव्वारे, भव्य प्रवेश द्वार और पत्थर की मूर्तियां आपके बगीचे और प्रांगण की शोभा बढ़ाने के लिए।"
      ),
      image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
      link: "#what-we-make",
      shortTitle: l("FOUNTAINS & GATES", "फाउंटेन व मुख्य द्वार"),
    },
  ];

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Auto-advance hero slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      <Seo
        title={l(
          "RK Stone Corporation | Handcrafted Stone Temples, CNC Jalis & Havelis in Jaipur",
          "आरके स्टोन कॉर्पोरेशन | नक्काशीदार पत्थर के मंदिर, सीएनसी जाली व हवेली शिल्प जयपुर"
        )}
        description={l(
          "RK Stone Corporation is Jaipur's direct manufacturer for handcrafted stone temples, 3D CNC jalis, heritage haveli facades, carved pillars, and courtyard fountains. Direct Red & Dholpur sandstone quarry sourcing with pan-India delivery.",
          "आरके स्टोन कॉर्पोरेशन जयपुर: हाथ से तराशे सैंडस्टोन मंदिर, 3D सीएनसी जाली, हेरिटेज हवेली झरोखे, खंभे और फव्वारे। डायरेक्ट खदान भाव व पूरे भारत में डिलीवरी।"
        )}
        image={heroImage}
        type="website"
        canonicalUrl="https://rkstonecorporation.com/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            logo:
              typeof window !== "undefined"
                ? `${window.location.origin}/favicon.png`
                : "https://rkstonecorporation.com/favicon.png",
            sameAs: [],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                typeof window !== "undefined"
                  ? `${window.location.origin}/shop?query={search_term_string}`
                  : "https://rkstonecorporation.com/shop?query={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            telephone: "+91 94147 84562",
            email: "contact@rkstonecorporation.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Front of Surya City, Paldi Meena, Agra Road",
              addressLocality: "Jaipur",
              addressRegion: "Rajasthan",
              postalCode: "302031",
              addressCountry: "IN",
            },
            hasMap:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 26.88321687556189,
              longitude: 75.90287731088574,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
            ],
            priceRange: "₹₹",
            sameAs: [
              "https://www.google.com/maps/place/R+K+Stone+Carporation/",
            ],
            areaServed: ["Jaipur", "Rajasthan", "India"],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item:
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://rkstonecorporation.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collections",
                item:
                  typeof window !== "undefined"
                    ? `${window.location.origin}/shop`
                    : "https://rkstonecorporation.com/shop",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: [
              "Home",
              "Shop",
              "Stone Temple Jaipur",
              "CNC Jali Jaipur",
              "Sandstone Supplier Jaipur",
              "About",
              "Contact",
            ],
            url: [
              typeof window !== "undefined"
                ? `${window.location.origin}/`
                : "https://rkstonecorporation.com/",
              typeof window !== "undefined"
                ? `${window.location.origin}/shop`
                : "https://rkstonecorporation.com/shop",
              typeof window !== "undefined"
                ? `${window.location.origin}/stone-temple-jaipur`
                : "https://rkstonecorporation.com/stone-temple-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/cnc-jali-jaipur`
                : "https://rkstonecorporation.com/cnc-jali-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/sandstone-supplier-jaipur`
                : "https://rkstonecorporation.com/sandstone-supplier-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/about`
                : "https://rkstonecorporation.com/about",
              typeof window !== "undefined"
                ? `${window.location.origin}/contact`
                : "https://rkstonecorporation.com/contact",
            ],
          },
        ]}
      />
      {/* Modern Cinematic Architectural Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-stone-950 text-white select-none">
        
        {/* Background Showcase Crossfade */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
              activeHeroSlide === idx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Cinematic Dual Vignette Overlays for Depth and Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/80 pointer-events-none" />


        {/* Main Hero Center Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 my-auto flex flex-col justify-center">
          <div className="max-w-4xl">
            

            {/* Impressive Architectural Headline */}
            <Reveal direction="down" duration={0.9}>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.12] mb-4 sm:mb-5 drop-shadow-md">
                {heroSlides[activeHeroSlide].title}
              </h1>
            </Reveal>

            {/* Editorial Description */}
            <Reveal direction="up" delay={0.15} duration={0.9}>
              <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-6 sm:mb-8">
                {heroSlides[activeHeroSlide].description}
              </p>
            </Reveal>

            {/* Action Buttons */}
            <Reveal direction="up" delay={0.3} duration={0.9}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <a href="#what-we-make" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 py-5 sm:py-6 rounded-none shadow-gold transition-all duration-300 group cursor-pointer"
                  >
                    {l("EXPLORE WHAT WE MAKE", "हमारे उत्पाद देखें")}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </Button>
                </a>

                <Button
                  size="lg"
                  onClick={() => setIsDrawingModalOpen(true)}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-5 sm:px-7 py-5 sm:py-6 rounded-none transition-smooth cursor-pointer shadow-md"
                >
                  <WhatsAppIcon className="mr-2 w-4 h-4" />
                  {l("SHARE DRAWING / PHOTO", "ड्राइंग / फोटो भेजें")}
                </Button>
              </div>
            </Reveal>

          </div>
        </div>

      </section>

      {/* 01: About RK Stone Corporation Narrative & Credentials */}
      <AboutSection />

      {/* 02: What We Make • Master Disciplines Grid */}
      <div id="what-we-make">
        <CraftExplorerGrid onOpenQuickQuote={() => setIsDrawingModalOpen(true)} />
      </div>

      {/* 03: How Custom Orders Work (Transparent 4-Step Process) */}
      <CustomOrderProcess />

      {/* 04: Inside Our Jaipur Workshop */}
      <WorkshopShowcase />

      {/* Dedicated Architects & Specifiers Collaboration Showcase */}
      <section className="py-24 md:py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Specifications - Moves Left to Right */}
            <Reveal direction="left" duration={0.9} className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:5xl font-heading font-normal uppercase text-white tracking-wide leading-[1.15]">
                {l("WE BRING YOUR STONE IDEAS TO LIFE", "आपके सपनों को पत्थर में साकार करते हैं")}
              </h2>

              <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
                {l("Whether you need a stone jali screen, haveli pillars, or a temple mandir, our Jaipur workshop helps you at every step—from 3D drawings to safe on-site installation.", "चाहे आपको जाली, हवेली के खंभे, या बड़ा मंदिर बनवाना हो, हमारी जयपुर वर्कशॉप 3D ड्राइंग से लेकर साइट पर पूरी फिटिंग की सुविधा देती है।")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-accent font-body text-xs font-bold tracking-wider block mb-1">{l("0.1MM ACCURACY", "सटीक फिनिशिंग")}</span>
                  <span className="text-sm font-semibold text-white block">{l("5-Axis CNC & Waterjet Saws", "आधुनिक सीएनसी मशीनें")}</span>
                  <span className="text-xs text-white/60 font-light mt-0.5 block">{l("Sub-millimeter accuracy paired with generational hand-carving.", "सटीक मशीन कटिंग और कुशल कारीगरों की बारीक नक्काशी।")}</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-accent font-body text-xs font-bold tracking-wider block mb-1">{l("DRY CLADDING", "सुरक्षित फिटिंग")}</span>
                  <span className="text-sm font-semibold text-white block">{l("Structural Stainless Anchors", "स्टेनलेस स्टील क्लैम्प्स")}</span>
                  <span className="text-xs text-white/60 font-light mt-0.5 block">{l("SS-304 mechanical fixing and structural safety calculations.", "मजबूत एसएस क्लैम्प्स और सुरक्षा मानकों के साथ फिटिंग।")}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/architects">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer"
                  >
                    {l("ARCHITECT & BUILDER DESK", "आर्किटेक्ट व बिल्डर सहयोग")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsSampleModalOpen(true)}
                  className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 uppercase text-xs sm:text-sm px-7 py-6 rounded-none transition-all cursor-pointer"
                >
                  {l("ORDER STONE SAMPLE KIT", "स्टोन सैंपल बॉक्स मंगवाएं")}
                </Button>
              </div>
            </Reveal>

            {/* Right Service Box - Moves Right to Left */}
            <Reveal direction="right" duration={0.9} className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-8 sm:p-10 space-y-6 backdrop-blur-md">
                <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-accent block">
                  {l("WHY CLIENTS CHOOSE US", "हमारी मुख्य सेवाएं")}
                </span>

                <div className="space-y-4 text-xs sm:text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span><strong>{l("DWG / CAD & 3D Conversion:", "DWG / CAD व 3D रूपांतरण:")}</strong> {l("We convert concept elevations into stone piece schedules within 48 hours.", "हम 48 घंटों में आपके प्लान को स्टोन कटिंग शेड्यूल में बदलते हैं।")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span><strong>{l("Live Video Inspection:", "लाइव वीडियो इंस्पेक्शन:")}</strong> {l("Live video inspection of stone quality before cutting begins.", "कटिंग शुरू होने से पहले पत्थर के ब्लॉक की लाइव वीडियो दिखाई जाती है।")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span><strong>{l("Sample Approval:", "सैंपल अप्रूवल:")}</strong> {l("Physical samples for your approval before production.", "बड़े काम से पहले क्लाइंट की संतुष्टि के लिए सैंपल तैयार किया जाता है।")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span><strong>{l("Pan-India Delivery & Installation:", "पूरे भारत में डिलीवरी व फिटिंग:")}</strong> {l("Our skilled craftsmen deliver and install stone across India.", "हमारे कुशल कारीगर भारत के किसी भी शहर में जाकर फिटिंग करते हैं।")}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-center">
                  <a
                    href="tel:+919414784562"
                    className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-accent hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {l("CALL OUR WORKSHOP TEAM: +91 94147 84562", "वर्कशॉप टीम से सीधे बात करें: +91 94147 84562")}
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 06: Architect & Patron Testimonials */}
      <section className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide mb-4">
                {l("WHAT OUR CLIENTS SAY", "ग्राहकों और आर्किटेक्ट्स का भरोसा")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
                {l("Serving prominent architectural studios, temple trusts, and homeowners across Rajasthan and India.", "राजस्थान और पूरे भारत के प्रमुख आर्किटेक्ट्स, मंदिर ट्रस्ट और घर मालिकों की पहली पसंद।")}
              </p>
            </Reveal>
          </div>

          {/* Testimonial Cards - Moving from Left, Bottom, Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <Reveal direction="left" delay={0.1}>
              <div className="h-full p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm font-light leading-relaxed italic mb-6">
                    {l(
                      '"The quality of Dholpur sandstone and Red sandstone we received for our palatial villa project was second to none. RK Stone Corporation is our trusted workshop for custom pillars and jalis."',
                      '"विला प्रोजेक्ट के लिए धौलपुर सैंडस्टोन और लाल सैंडस्टोन की क्वालिटी बेहतरीन थी। खंभों और जालियों के लिए आरके स्टोन पर पूरा भरोसा है।"'
                    )}
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4">
                  <h4 className="font-heading font-medium text-sm uppercase text-stone-950">Rajesh Sharma</h4>
                  <p className="text-xs text-stone-500">{l("Interior Designer & Architect, Jaipur", "इंटीरियर डिज़ाइनर और आर्किटेक्ट, जयपुर")}</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <div className="h-full p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm font-light leading-relaxed italic mb-6">
                    {l(
                      '"They carved a magnificent white marble mandir for our residence. Every curve of the shikhar and the sanctum pillars carries genuine Vedic authenticity. Truly exceptional craftsmanship."',
                      '"इन्होंने हमारे घर के लिए बहुत सुंदर संगमरमर का मंदिर बनाया। शिखर और खंभों की नक्काशी सचमुच लाजवाब है।"'
                    )}
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4">
                  <h4 className="font-heading font-medium text-sm uppercase text-stone-950">Priya Patel</h4>
                  <p className="text-xs text-stone-500">{l("Private Homeowner, Ahmedabad", "गृहस्वामिनी, अहमदाबाद")}</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.4}>
              <div className="h-full p-8 bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm font-light leading-relaxed italic mb-6">
                    {l(
                      '"Reliable material sourcing, transparent dimensional estimates, and flawless on-site installation. Their precision CNC stone screens elevated our hotel courtyard completely."',
                      '"समय पर काम, पारदर्शी हिसाब और बढ़िया फिटिंग। इनके द्वारा तैयार की गई सीएनसी जालियों ने हमारे होटल के आंगन की सुंदरता बढ़ा दी।"'
                    )}
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4">
                  <h4 className="font-heading font-medium text-sm uppercase text-stone-950">Amit Chauhan</h4>
                  <p className="text-xs text-stone-500">{l("Senior Architect, New Delhi", "सीनियर आर्किटेक्ट, नई दिल्ली")}</p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 07: Grand Call-to-Action Strip */}
      <section className="py-24 md:py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          
          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.1] mb-6">
              {l("START YOUR CUSTOM STONE PROJECT", "अपना मनपसंद स्टोन वर्क शुरू करें")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Planning a stone temple, haveli carving, CNC stone jali, or water fountain? Talk directly with our craftsmen in Jaipur.",
                "पत्थर का मंदिर, हवेली का काम, सीएनसी जाली या फाउंटेन बनवाना चाहते हैं? जयपुर में सीधे हमारे कारीगरों से बात करें।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I want to discuss a stone project. Please connect me with your master artisans."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold transition-all duration-300 cursor-pointer"
                >
                  <WhatsAppIcon className="mr-2 w-4 h-4" />
                  {l("WHATSAPP US", "व्हाट्सएप पर बात करें")}
                </Button>
              </a>

              <a href="tel:+919414784562">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer"
                >
                  <Phone className="mr-2 w-4 h-4 text-accent" />
                  {l("CALL US: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>

              <Link to="/contact">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 font-medium text-xs sm:text-sm uppercase tracking-wider px-6 py-6 rounded-none"
                >
                  {l("GET A FREE QUOTE →", "मुफ़्त कोटेशन मांगें →")}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Custom Drawing & Sample Kit Modals */}
      <DrawingUploadModal
        isOpen={isDrawingModalOpen}
        onClose={() => setIsDrawingModalOpen(false)}
      />
      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
};

export default Index;
