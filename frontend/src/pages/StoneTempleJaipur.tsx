import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Compass,
  CheckCircle2,
  Layers,
  Ruler,
  HelpCircle
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import templeImg from "@/assets/Stone-Temple.jpg";
import chhatriImg from "@/assets/chhatri.jpg";
import haveliImg from "@/assets/Heritage-Haveli.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StoneTempleJaipur() {
  const { l } = useLanguage();

  const templeTypologies = [
    {
      id: "luxury-residence-ghar-mandir",
      title: l("Home & Penthouse Stone Mandirs", "घर व विला के लिए नक्काशीदार मंदिर"),
      subtitle: l("Indoor & Home Stone Mandirs", "मनचाहे साइज़ में इनडोर व होम मंदिर"),
      scale: l("Heights: 4 Feet to 10 Feet | Widths: 3 Feet to 12 Feet", "ऊंचाई: 4 से 10 फीट | चौड़ाई: 3 से 12 फीट"),
      stoneUsed: l("Natural Dholpur Beige & Bansi Paharpur Pink Sandstone", "धौलपुर बेज व बंसी पहाड़पुर गुलाबी सैंडस्टोन"),
      description: l(
        "Beautiful stone temples handcrafted for homes and villas. Features hand-carved pillars, LED lighting channels, and smooth drawers for pooja samagri.",
        "घरों और विला के लिए विशेष रूप से तैयार मंदिर। नक्काशीदार खंभे, पूजा सामग्री के लिए गुप्त ड्रॉअर और एलईडी लाइटिंग की सुंदर व्यवस्था।"
      ),
      features: [
        l("Zero Joint Mortar Appearance with Micro Interlocks", "सटीक जोड़ व इंटरलॉकिंग सिस्टम"),
        l("Vedic Vastu Orientation Consultation Included", "वास्तु अनुसार उचित दिशा व अनुपात"),
        l("Concealed LED Strip Channelling Ready", "छिपी हुई आकर्षक लाइटिंग की सुविधा")
      ]
    },
    {
      id: "estate-courtyard-temple",
      title: l("Courtyard & Garden Shikhara Temples", "आंगन व फार्महाउस के लिए शिखरबद्ध मंदिर"),
      subtitle: l("Outdoor Temples with Carved Shikhars", "शिखर सहित खुले स्थानों के लिए भव्य मंदिर"),
      scale: l("Heights: 10 Feet to 24 Feet Monolithic Shikhars", "ऊंचाई: 10 से 24 फीट शिखर"),
      stoneUsed: l("Bansi Paharpur Pink & Dholpur Sandstone", "बंसी पहाड़पुर गुलाबी व धौलपुर सैंडस्टोन"),
      description: l(
        "Freestanding architectural temples designed for farmhouses, resort courtyards, and ancestral estates. Built with stepped shikhars, parikrama circumambulatory paths, and hand-carved guard elephants.",
        "फार्महाउस और खुले प्रांगण के लिए स्वतंत्र मंदिर। नक्काशीदार शिखर, परिक्रमा मार्ग और द्वारपाल गजराज (हाथी) की सुंदर मूर्तियां।"
      ),
      features: [
        l("Immune to Weathering, Rain & Extreme Sun", "धूप, बारिश व ठंड में 100% सुरक्षित"),
        l("Monolithic Carved Kalash & Amrit Ghat", "एकल पत्थर में तराशा अमृत कलश व ध्वजदंड"),
        l("Reinforced Structural Internal Anchors", "मजबूत आंतरिक सपोर्ट व सुरक्षित नींव")
      ]
    },
    {
      id: "monumental-trust-temple",
      title: l("Community & Trust Temples", "सार्वजनिक व ट्रस्ट के भव्य मंदिर"),
      subtitle: l("Large-Scale Temple Projects", "विशाल धार्मिक परिसर व नागर शैली मंदिर"),
      scale: l("Complexes from 1,000 to 15,000+ Square Feet", "1,000 से 15,000+ वर्ग फीट का परिसर"),
      stoneUsed: l("Selected Quarry Bansi Paharpur & Dholpur Sandstone", "बंसी पहाड़पुर व धौलपुर सैंडस्टोन"),
      description: l(
        "Built strictly according to traditional temple architecture treatises. Complete turnkey fabrication from foundation stones to garbhagriha, sabhamandap, and tall shikhars.",
        "प्राचीन नागर व द्रविड़ शैलियों के अनुसार निर्मित। गर्भगृह, सभामंडप और भव्य शिखरों के साथ संपूर्ण प्रोजेक्ट का निर्माण व ऑन-साइट स्थापना।"
      ),
      features: [
        l("Engineered for 500+ Years Multigenerational Longevity", "सैकड़ों वर्षों तक अक्षुण्ण रहने वाला निर्माण"),
        l("Interlocking Dry Stone Masonry & Copper Dowels", "पारंपरिक इंटरलॉकिंग व तांबे के डॉवेल्स"),
        l("Certified Earthquake-Resilient Structural Detailing", "भूकंप रोधी मजबूत संरचना")
      ]
    }
  ];

  const templeAnatomy = [
    {
      step: "01",
      name: l("The Shikhara & Amalaka", "शिखर व आमलक"),
      meaning: l("The Sacred Ascent", "ऊर्ध्वमुखी दिव्य ऊर्जा"),
      description: l(
        "Carved from solid stone layers with authentic traditional details that crown the temple.",
        "ठोस पत्थर की परतों से तराशा गया शिखर, जो मंदिर के गर्भगृह में सकारात्मक ऊर्जा का संचार करता है।"
      )
    },
    {
      step: "02",
      name: l("The Garbhagriha & Singhasan", "गर्भगृह व सिंहासन"),
      meaning: l("The Divine Sanctum", "ईश्वरीय आसन"),
      description: l(
        "Solid natural sandstone pedestal with integrated abhishek water drainage grooves and hand-carved backdrop.",
        "ठोस प्राकृतिक सैंडस्टोन से बना सिंहासन, अभिषेक जल निकासी का उचित मार्ग और सुंदर नक्काशीदार बैकड्रॉप।"
      )
    },
    {
      step: "03",
      name: l("Carved Mandap Pillars", "नक्काशीदार मंडप खंभे"),
      meaning: l("Pillars of Creation", "कला व शक्ति के प्रतीक"),
      description: l(
        "Hand-carved stone pillars decorated with peacocks, lotus petals, bells, and floral designs.",
        "हाथ से तराशे गए खंभे जिन पर मोर, कमल दल, घंटियां और पारंपरिक मांगलिक आकृतियां उकेरी जाती हैं।"
      )
    },
    {
      step: "04",
      name: l("The Adhishthana Base", "अधिष्ठान (मजबूत आधार)"),
      meaning: l("Vedic Foundation", "ठोस व स्थिर नींव"),
      description: l(
        "Heavy load-bearing molded stone plinth carved with elephant processions and sacred floral rosettes.",
        "वजनी व ठोस पत्थरों से बना आधार, जिस पर गजराज और पुष्पों की सुंदर नक्काशी मजबूती प्रदान करती है।"
      )
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Custom Stone Temples & Mandirs in Jaipur | Sandstone & Mandir Stone",
          "हाथ से बने पत्थर के मंदिर व होम मंदिर जयपुर | सैंडस्टोन व मंदिर शिल्प"
        )}
        description={l(
          "Commission bespoke sacred stone temples and mandirs handcrafted in Jaipur. Pure Dholpur sandstone, Bansi Paharpur pink stone, and pan-India installation.",
          "जयपुर में बने सैंडस्टोन के भव्य मंदिर। धौलपुर व बंसी पहाड़पुर गुलाबी सैंडस्टोन, सुंदर नक्काशी और पूरे भारत में सुरक्षित फिटिंग।"
        )}
        keywords="stone temple jaipur, custom mandir jaipur, sandstone temple manufacturer, bansi paharpur temple, dholpur mandir jaipur, ghar mandir jaipur, shikhara temple craft"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${templeImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.12] mb-4 sm:mb-6">
              {l("SACRED STONE TEMPLES &", "पारंपरिक पत्थर के मंदिर व")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Handcrafted Mandirs in Jaipur", "सुंदर नक्काशीदार होम मंदिर")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-sm sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
              {l(
                "Handcrafted in Jaipur from authentic Dholpur sandstone and holy Bansi Paharpur pink sandstone. Built with strict adherence to traditional proportions, long-lasting durability, and divine aesthetics.",
                "धौलपुर सैंडस्टोन और बंसी पहाड़पुर गुलाबी पत्थर से निर्मित। पारंपरिक अनुपातों, बारीक कारीगरी और सदियों तक टिकने वाली मजबूती के साथ।"
              )}
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 py-5 sm:py-6 rounded-none shadow-gold cursor-pointer">
                  {l("ORDER CUSTOM MANDIR", "मंदिर बनवाने के लिए पूछें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I want to discuss a custom Stone Mandir. Please share designs, marble options, and pricing."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-5 sm:px-7 py-5 sm:py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP CONSULTATION", "व्हाट्सएप पर डिज़ाइन व रेट लें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vedic Sanctity Credentials Strip */}
      <section className="py-16 bg-[#161616] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal direction="left" delay={0.1}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("PURITY ASSURED", "शुद्धता की गारंटी")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("100% NATURAL SANDSTONE", "100% शुद्ध सैंडस्टोन")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Dense, pure quarry-cut stone that never deteriorates or cracks under extreme weather.",
                    "ठोस प्राकृतिक सैंडस्टोन जो कभी खराब नहीं होता और हर मौसम में सुरक्षित रहता है।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("SACRED RATIOS", "वैदिक अनुपात")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("TRADITIONAL PROPORTIONS", "शास्त्रीय नाप-जोख")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Proportioned to cultivate positive vibrational energy in your sanctuary.",
                    "पारंपरिक नियमों के अनुसार सही अनुपातों में तराशा गया मंदिर।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("EXPERT CRAFTSMEN", "कुशल कारीगर")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("HERITAGE ARTISANS", "पारंपरिक शिल्पकार")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Sculpted by master stone carvers carrying generations of temple masonry heritage.",
                    "पीढ़ियों से मंदिर निर्माण में लगे अनुभवी शिल्पकारों द्वारा हाथ की बारीक नक्काशी।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.4}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("SAFE INSTALLATION", "सुरक्षित फिटिंग")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("PAN-INDIA SITE CREW", "पूरे भारत में सेवा")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Delivered in reinforced foam-padded crates and assembled on-site by our specialists.",
                    "मजबूत लकड़ी के बॉक्स में सुरक्षित पैकिंग और आपकी साइट पर कुशल कारीगरों द्वारा फिटिंग।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Temple Typologies Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-20">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("FROM HOME MANDIRS TO COMMUNITY TEMPLES", "घर के मंदिर से लेकर विशाल सार्वजनिक मंदिर तक")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "Every space of worship has unique spatial and spiritual requirements. We craft our stone mandirs to harmonize with modern interiors or palatial open courtyards.",
                  "हर घर और जगह की अपनी जरूरत होती है। हम आपके कमरे की ऊंचाई और स्थान के अनुसार सही नाप में सुंदर मंदिर तैयार करते हैं।"
                )}
              </p>
            </Reveal>
          </div>

          {/* Typologies Cards */}
          <div className="space-y-16">
            {templeTypologies.map((item, idx) => (
              <Reveal
                key={item.id}
                direction={idx % 2 === 0 ? "left" : "right"}
                delay={0.1}
                duration={0.85}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-stone-200/90 shadow-sm p-8 sm:p-12 items-center hover:border-accent transition-all duration-300">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-body font-bold tracking-widest uppercase">
                      <span>{l("FORMAT", "प्रारूप")} 0{idx + 1}</span>
                      <span>•</span>
                      <span>{item.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-normal uppercase text-stone-950 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-stone-50 border border-stone-200 p-3">
                        <span className="text-[10px] font-body font-semibold text-stone-500 uppercase tracking-wider block">
                          {l("Dimensions", "अनुमानित नाप")}
                        </span>
                        <span className="text-xs font-semibold text-stone-950">{item.scale}</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-200 p-3">
                        <span className="text-[10px] font-body font-semibold text-stone-500 uppercase tracking-wider block">
                          {l("Stone Material", "पत्थर")}
                        </span>
                        <span className="text-xs font-semibold text-accent">{item.stoneUsed}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {item.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-8">
                    <span className="text-xs font-body font-semibold text-stone-500 uppercase tracking-wider">
                      {l("Custom Sizes Available", "मनचाहा साइज़ उपलब्ध")}
                    </span>
                    <div className="text-sm font-semibold text-stone-950">
                      {l("Includes 3D visual preview & exact stone measurements", "3D ड्राइंग व उचित नाप परामर्श शामिल")}
                    </div>

                    <div className="pt-2 space-y-2">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, please share catalogue, sizes and pricing for ${item.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs py-5 rounded-none cursor-pointer">
                          <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                          {l("INQUIRE SIZES & PRICING", "साइज़ व रेट की जानकारी लें")}
                        </Button>
                      </a>

                      <Link to="/contact" className="block w-full">
                        <Button variant="outline" className="w-full border border-stone-300 hover:border-stone-950 text-stone-800 hover:text-stone-950 hover:bg-stone-100 text-xs uppercase tracking-wider py-5 rounded-none transition-all cursor-pointer">
                          {l("REQUEST DRAWINGS", "ड्राइंग मांगें")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Anatomy of Sacred Temple Architecture */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal direction="down" duration={0.8} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-white tracking-wide leading-tight">
              {l("THE ANATOMY OF A SACRED MANDIR", "मंदिर शिल्प के मुख्य भाग")}
            </h2>
          </Reveal>

          {/* 4 Anatomy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {templeAnatomy.map((part, idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <Reveal
                  key={idx}
                  direction={directions[idx] || "up"}
                  delay={idx * 0.1}
                >
                  <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-accent transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                        {l("PART", "भाग")} {part.step}
                      </span>
                      <h3 className="font-heading font-medium text-lg uppercase text-white tracking-wide mb-1">
                        {part.name}
                      </h3>
                      <div className="text-xs font-serif italic text-accent/90 mb-4">
                        "{part.meaning}"
                      </div>
                      <p className="text-white/70 text-xs font-light leading-relaxed">
                        {part.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          <Reveal direction="down" duration={0.8} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide">
              {l("FREQUENTLY ASKED QUESTIONS", "अक्सर पूछे जाने वाले सवाल")}
            </h2>
          </Reveal>

          <div className="space-y-6">
            <Reveal direction="up" delay={0.1}>
              <div className="p-6 sm:p-8 bg-white border border-stone-200">
                <h3 className="font-heading font-medium text-base sm:text-lg uppercase text-stone-950 mb-2">
                  {l(
                    "Why is Bansi Paharpur & Dholpur Sandstone ideal for temples?",
                    "मंदिर निर्माण के लिए बंसी पहाड़पुर व धौलपुर सैंडस्टोन क्यों सबसे उत्तम माना जाता है?"
                  )}
                </h3>
                <p className="text-stone-700 text-sm font-light leading-relaxed">
                  {l(
                    "Bansi Paharpur pink stone and Dholpur sandstone are the sacred time-tested stones chosen for India's grandest temples, including the Ayodhya Ram Mandir and Akshardham. Highly weather-resistant, structurally dense, and developing a richer antique patina over centuries.",
                    "अयोध्या राम मंदिर और अक्षरधाम जैसे पवित्र धामों में इस्तेमाल होने वाला प्रसिद्ध बंसी पहाड़पुर गुलाबी पत्थर और धौलपुर सैंडस्टोन सदियों तक मौसम की मार को आसानी से सहता है और समय के साथ इसकी सुंदरता और निखरती है।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-6 sm:p-8 bg-white border border-stone-200">
                <h3 className="font-heading font-medium text-base sm:text-lg uppercase text-stone-950 mb-2">
                  {l(
                    "What is the typical time needed to make a custom mandir?",
                    "कस्टम मंदिर बनने में कितना समय लगता है?"
                  )}
                </h3>
                <p className="text-stone-700 text-sm font-light leading-relaxed">
                  {l(
                    "A home mandir (5 to 8 ft) takes 15 to 25 days from drawing confirmation. Larger outdoor temples with big shikhars take 40 to 60 days depending on stone extraction and hand-carving depth.",
                    "घर के 5 से 8 फीट के मंदिर को बनने में 15 से 25 दिन लगते हैं। बड़े शिखरों वाले आउटडोर मंदिरों में 40 से 60 दिन का समय लगता है।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="p-6 sm:p-8 bg-white border border-stone-200">
                <h3 className="font-heading font-medium text-base sm:text-lg uppercase text-stone-950 mb-2">
                  {l(
                    "How is on-site delivery and installation handled across India?",
                    "पूरे भारत में डिलीवरी और फिटिंग कैसे होती है?"
                  )}
                </h3>
                <p className="text-stone-700 text-sm font-light leading-relaxed">
                  {l(
                    "We pack all stone parts in strong wooden boxes with protective foam cushioning. Our experienced stone fitters travel to your location anywhere in India to safely install and assemble the temple.",
                    "मंदिर के सभी हिस्सों को मजबूत लकड़ी के बॉक्स में सुरक्षित पैक करके भेजा जाता है और हमारे अनुभवी कारीगर खुद आपकी साइट पर आकर सटीक फिटिंग करते हैं।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.2} className="mt-16 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer">
                {l("START YOUR MANDIR PROJECT", "आज ही अपना मंदिर ऑर्डर करें")}
                <ArrowRight className="ml-2 w-4 h-4 text-accent" />
              </Button>
            </Link>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
