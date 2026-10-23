import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Crown, 
  Columns, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Building 
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import haveliImg from "@/assets/Heritage-Haveli.jpg";
import gateImg from "@/assets/Gate.jpg";
import redStoneImg from "@/assets/red-sand-stone.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeritageHavelis() {
  const { l } = useLanguage();

  const haveliElements = [
    {
      id: "palatial-columns-pillars",
      title: l("Hand-Carved Heritage Pillars & Columns", "नक्काशीदार हवेली खंभे व पिलर"),
      subtitle: l("Load-Bearing & Cladded Architectural Columns", "मजबूत भार उठाने वाले व क्लैडिंग पिलर"),
      stoneRecommendation: l("Bansi Paharpur Pink & Jodhpur Sandstone", "बंसी पहाड़पुर व जोधपुर सैंडस्टोन"),
      description: l(
        "Monolithic turned and chiseled columns featuring classical Rajasthani bell-capitals, tiered lotus bases, and fluted shafts. Available in solid load-bearing structural formats or hollow cladding shells for RCC columns.",
        "राजस्थान के महलों की शैली में बने सुंदर खंभे। ठोस भार उठाने वाले पत्थर के रूप में भी उपलब्ध हैं और आरसीसी पिलर पर क्लैडिंग के लिए भी उपलब्ध हैं।"
      ),
      features: [
        l("Custom Heights: 8 Feet to 24 Feet Monolithic Sections", "ऊंचाई: 8 से 24 फीट मनचाहे साइज़ में"),
        l("Traditional Shekhawati & Rajput Motifs", "पारंपरिक शेखावाटी व राजपूताना नक्काशी"),
        l("Internal Steel Reinforcement Ready", "आंतरिक स्टील सपोर्ट का प्रावधान")
      ],
      image: haveliImg
    },
    {
      id: "royal-jharokhas-balconies",
      title: l("Traditional Rajasthani Jharokhas & Balconies", "शाही राजस्थानी झरोखे व बालकनी"),
      subtitle: l("Overhanging Enclosed Balconies with Carved Screens", "नक्काशीदार पत्थरों से बने सुंदर झरोखे"),
      stoneRecommendation: l("Royal Dholpur Beige Sandstone", "धौलपुर बेज / क्रीम सैंडस्टोन"),
      description: l(
        "Traditional Rajput palace balcony designs. Carved stone brackets support projecting windows with stone jalis, letting in natural light and cool breeze while giving your elevation a royal look.",
        "राजपूती महलों का मुख्य आकर्षण। बारीक नक्काशीदार तोडे (ब्रैकेट्स) और जालीदार स्क्रीन, जो घर के एलिवेशन को शाही और आकर्षक लुक देते हैं।"
      ),
      features: [
        l("Modular Interlocking Structural Brackets", "मजबूत इंटरलॉकिंग ब्रैकेट्स"),
        l("Louvered Stone Jalis for Natural Air & Light", "हवा व रोशनी के लिए सुंदर जाली"),
        l("Weather-Sealed Drainage & Water Deflection", "बारिश के पानी की सुरक्षित निकासी")
      ],
      image: haveliImg
    },
    {
      id: "monumental-torans-gateways",
      title: l("Grand Entrance Gates (Torans) & Arches", "शाही तोरण द्वार व प्रवेश मेहराब"),
      subtitle: l("Grand Portals for Private Estates and Resorts", "फार्महाउस, विला व रिसॉर्ट्स के मुख्य द्वार"),
      stoneRecommendation: l("Red Sandstone & Dholpur Stone", "लाल सैंडस्टोन व धौलपुर पत्थर"),
      description: l(
        "Impressive entrance gates with hand-carved elephants, arches, and kalash finials designed to give your home, farmhouse, or resort an elegant royal entrance.",
        "हाथ से तराशे गए हाथी, मेहराब और कलश से सजे भव्य प्रवेश द्वार, जो आपके निवास को शाही महलों जैसी प्रतिष्ठा प्रदान करते हैं।"
      ),
      features: [
        l("Clearance Widths up to 28 Feet for Luxury Vehicles", "वाहनों के लिए 28 फीट तक चौड़ा रास्ता"),
        l("Automated Gate Motor Mount Integration", "ऑटोमैटिक गेट मोटर लगाने की सुविधा"),
        l("Heavy Load Seismic Anchorage Detailing", "भारी भार व मजबूती के साथ सुरक्षित फिटिंग")
      ],
      image: gateImg
    },
    {
      id: "stone-chhajjas-cornices",
      title: l("Projecting Chhajjas, Brackets & Eaves", "पत्थर के छज्जे, कंगनी व तोडे"),
      subtitle: l("Architectural Sunshades with Carved Undersides", "धूप व बारिश से रक्षा करने वाले सुंदर छज्जे"),
      stoneRecommendation: l("Fine-Grained Sandstone & Mint Stone", "बारीक सैंडस्टोन व मिंट स्टोन"),
      description: l(
        "Sloping stone overhangs that protect exterior walls from monsoon rains and intense sunlight. Features hand-carved floral undersides and decorative stone eaves that cast dramatic architectural shadows.",
        "दीवारों को बारिश और तेज धूप से बचाने वाले राजस्थानी छज्जे। नीचे की तरफ सुंदर फूल-पत्तियों की बारीक नक्काशी जो घर को पारंपरिक आकर्षण देती है।"
      ),
      features: [
        l("High Strength Monolithic Blocks", "मजबूत व ठोस पत्थर के स्लैब"),
        l("Stainless Steel Anchor Tie-Backs", "एसएस क्लैंप्स से सुरक्षित फिक्सिंग"),
        l("Custom Drip-Groove Water Deflection", "पानी को दीवार से दूर रखने वाली ग्रूव्स")
      ],
      image: redStoneImg
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Royal Haveli Facades, Pillars & Jharokhas | RK Stone Corporation Jaipur",
          "हवेली एलिवेशन, नक्काशीदार खंभे व झरोखे जयपुर | आरके स्टोन कॉर्पोरेशन"
        )}
        description={l(
          "Commission authentic Rajasthani haveli architecture: hand-carved stone pillars, projecting jharokha balconies, entrance arches, and royal facade cladding in Jaipur.",
          "राजस्थान की पारंपरिक हवेली शिल्पकला: हाथ से तराशे पत्थर के खंभे, झरोखे, तोरण द्वार और पूरे एलिवेशन का निर्माण व फिटिंग।"
        )}
        keywords="haveli architecture jaipur, carved stone pillars, rajasthani jharokha supplier, stone haveli facade, royal entrance gate jaipur, bansi paharpur haveli pillars"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${haveliImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("COLUMNS, JHAROKHAS &", "नक्काशीदार खंभे, झरोखे व")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Royal Haveli Facades", "शाही हवेली एलिवेशन")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "Reviving the grandeur of Jaipur and Jodhpur palaces. We hand-carve sandstone pillars, entrance torans, and balcony jharokhas for luxury estates, heritage hotels, and bungalows.",
                "जयपुर और जोधपुर के महलों की भव्यता आपके घर में। हम नक्काशीदार खंभे, मुख्य तोरण द्वार और झरोखों का निर्माण विला, फार्महाउस और होटलों के लिए करते हैं।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("INQUIRE ABOUT HAVELI WORK", "हवेली कार्य के लिए पूछें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I am planning a haveli-style elevation / carved pillars for my property. Please share designs and estimates."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP ELEVATION DRAWINGS", "व्हाट्सएप पर ड्राइंग व रेट लें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto Strip */}
      <section className="py-16 bg-[#161616] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal direction="left" delay={0.1}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("STRUCTURAL STRENGTH", "मजबूत संरचना")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("LOAD-BEARING & CLADDING", "ठोस खंभे व क्लैडिंग")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Engineered for solid stone construction or lightweight RCC frame anchoring.",
                    "ठोस पत्थर के खंभे और आरसीसी पिलर पर लगाने वाली क्लैडिंग दोनों उपलब्ध।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("AUTHENTIC QUARRIES", "शुद्ध खदानों से पत्थर")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("DHOLPUR & BANSI PAHARPUR", "धौलपुर व बंसी पहाड़पुर")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Blocks hand-selected for uniform color saturation, minimal grain faults, and resilience.",
                    "एकसमान रंग और बिना दरार वाले मजबूत पत्थर के ब्लॉक से निर्माण।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.3}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("GENERATIONAL HERITAGE", "विरासत शिल्पकला")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("HERITAGE ARTISANS", "अनुभवी कारीगर")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Faithful hand-carving carrying the authentic soul of Rajasthani palaces.",
                    "पारंपरिक शैली में हाथ की बारीक नक्काशी जो सदियों तक अपनी पहचान बनाए रखती है।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Elements Detailed Showcase */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-20">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("MASTER CRAFTED PALATIAL ELEMENTS", "हवेली के मुख्य पत्थर शिल्प")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "Every curve, capital, and bracket is hand-chiseled by our artisans in Jaipur to recreate the regal majesty of Rajasthan's architectural era.",
                  "हर मेहराब, खंभा और झरोखा जयपुर के हमारे कुशल कारीगरों द्वारा हाथ से तराशा जाता है।"
                )}
              </p>
            </Reveal>
          </div>

          {/* Alternating Moving Elements */}
          <div className="space-y-24">
            {haveliElements.map((elem, idx) => {
              const imageFromLeft = idx % 2 === 0;
              return (
                <div 
                  key={elem.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-stone-200/80 pb-20 last:border-b-0"
                >
                  <Reveal 
                    direction={imageFromLeft ? "left" : "right"} 
                    duration={0.85}
                    className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative group overflow-hidden bg-stone-950 shadow-xl">
                      <img 
                        src={elem.image}
                        alt={elem.title}
                        className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-70" />
                      
                      <div className="absolute top-6 left-6 bg-stone-950/85 backdrop-blur-md px-3.5 py-1 text-accent text-xs font-body font-bold tracking-widest uppercase">
                        {l("ELEMENT", "शिल्प भाग")} 0{idx + 1}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-body tracking-wide">
                        <span className="text-accent uppercase tracking-wider block text-[10px]">
                          {l("Recommended Stone", "उपयुक्त पत्थर")}
                        </span>
                        <span className="font-semibold text-sm">{elem.stoneRecommendation}</span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal 
                    direction={imageFromLeft ? "right" : "left"} 
                    duration={0.85}
                    className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.25em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{elem.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-snug">
                      {elem.title}
                    </h3>

                    <p className="text-base text-stone-700 font-light leading-relaxed">
                      {elem.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {elem.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, please share catalogue and pricing for ${elem.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs px-6 py-5 rounded-none cursor-pointer">
                          <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                          {l("INQUIRE ABOUT THIS PIECE", "इस शिल्प की जानकारी लें")}
                        </Button>
                      </a>
                      <Link to="/contact">
                        <Button variant="outline" className="border border-stone-300 hover:border-stone-950 text-stone-800 hover:text-stone-950 hover:bg-stone-100 text-xs uppercase tracking-wider px-5 py-5 rounded-none transition-all cursor-pointer">
                          {l("REQUEST ELEVATION ESTIMATE", "पूरे एलिवेशन का कोटेशन मांगें")}
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("GIVE YOUR HOME A ROYAL HERITAGE", "अपने घर को दें राजसी शान")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("in Handcrafted Natural Stone", "हाथ से तराशे सच्चे पत्थरों में")}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Share your plot dimensions or architectural drawings. Our master carvers in Jaipur will prepare stone schedules, design proposals, and installation planning.",
                "अपने मकान का नाप या एलिवेशन ड्राइंग शेयर करें। जयपुर की हमारी टीम स्टोन कटिंग प्लान और उचित लागत का अनुमान बनाकर देगी।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("START YOUR HAVELI PROJECT", "हवेली काम शुरू करें")}
                </Button>
              </Link>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  {l("CALL US: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
