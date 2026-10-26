import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Waves 
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import fountainImg from "@/assets/garden-fountain.jpg";
import chhatriImg from "@/assets/chhatri.jpg";
import animalImg from "@/assets/Animals.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CourtyardArtifacts() {
  const { l } = useLanguage();

  const courtyardPieces = [
    {
      id: "palatial-tiered-fountains",
      title: l("Multi-Tiered Lotus Fountains", "बहुस्तरीय पत्थर कमल फव्वारा"),
      subtitle: l("Natural Stone Cascading Water Fountains", "प्राकृतिक पत्थर से बना मधुर जल प्रवाह"),
      category: "fountain" as const,
      stoneType: l("Jodhpur Imperial Sandstone & Dholpur Stone", "जोधपुर सैंडस्टोन व धौलपुर पत्थर"),
      dimensionsAvailable: l("Diameters: 5 Feet to 20 Feet | Heights: 5 Feet to 16 Feet", "व्यास: 5 से 20 फीट | ऊंचाई: 5 से 16 फीट"),
      description: l(
        "Carved from solid sandstone drums with scalloped lotus-petal reservoirs and lion-head spouts. Calibrated so the gentle sound of falling water creates an oasis of serene luxury across open courtyards and villa gardens.",
        "एकल पत्थर के टुकड़ों से तराशा गया सुंदर फव्वारा। कमल की पंखुड़ियों जैसे कुंड और शांत जल प्रवाह आपके आंगन और गार्डन को शाही और शांत वातावरण प्रदान करता है।"
      ),
      engineeringFeatures: [
        l("Internal Water Pipework Channels Pre-Installed", "आंतरिक पाइपलाइन की पूर्व-व्यवस्था"),
        l("Waterproof Protective Sealant Coating", "काई व पानी के दाग से बचाने वाली कोटिंग"),
        l("Modular Interlocking Basin Segments", "आसान फिटिंग हेतु इंटरलॉकिंग हिस्से")
      ],
      image: fountainImg
    },
    {
      id: "heritage-stone-chhatris",
      title: l("Traditional 4, 8 & 12-Pillar Stone Chhatris", "पारंपरिक 4, 8 व 12 खंभों की छतरियां"),
      subtitle: l("Regal Domed Pavilions & Garden Gazebos", "गुंबददार राजस्थानी छतरी व गार्डन मंडप"),
      stoneRecommendation: l("Bansi Paharpur Pink & Dholpur Sandstone", "बंसी पहाड़पुर व धौलपुर सैंडस्टोन"),
      dimensionsAvailable: l("Base Footprint: 8x8 Feet to 20x20 Feet | Heights: 12 to 25 Feet", "चौड़ाई: 8x8 से 20x20 फीट | ऊंचाई: 12 से 25 फीट"),
      description: l(
        "Traditional Rajasthani stone chhatris featuring carved domes, pillars with elephant brackets, and ornamental kalash finials to make your garden or farmhouse look royal.",
        "राजस्थानी शिल्पकला की पहचान। ठोस पत्थर से तराशा गया गुंबद, नक्काशीदार खंभे, तोडे और ऊपर सुंदर अमृत कलश, जो गार्डन और फार्महाउस को राजसी रूप देते हैं।"
      ),
      engineeringFeatures: [
        l("Monolithic Carved Dome Segments with Interlocking Joints", "मजबूत इंटरलॉकिंग गुंबद हिस्से"),
        l("High Wind Velocity & Weather Resistance", "तेज आंधी व तूफान में 100% सुरक्षित"),
        l("Integrated Base Pedestal & Step Drainage", "मजबूत चबूतरा व सीढ़ियां")
      ],
      image: chhatriImg
    },
    {
      id: "sacred-animal-sculptures",
      title: l("Hand-Carved Stone Animal Sculptures", "हाथ से तराशी गई पत्थर की मूर्तियां"),
      subtitle: l("Royal Guard Elephants, Lions & Sacred Nandi", "शाही द्वारपाल हाथी, सिंह व नंदी"),
      category: "sculpture" as const,
      stoneType: l("Single-Block Sandstone & White Marble", "एकल पत्थर (सिंगल ब्लॉक) सैंडस्टोन व मार्बल"),
      dimensionsAvailable: l("Heights: 3 Feet to 8 Feet Monolithic Blocks", "ऊंचाई: 3 से 8 फीट ठोस पत्थर"),
      description: l(
        "Carved from single solid stone blocks by experienced Rajasthani sculptors. Beautifully detailed elephants, lions, and sacred nandi sculptures perfect for entrance gates and gardens.",
        "बिना किसी जोड़ के एक ही ठोस पत्थर से तराशी गई सजीव मूर्तियां। सजे-धजे हाथी, द्वारपाल शेर और पवित्र नंदी जो घर के प्रवेश द्वार की शोभा बढ़ाते हैं।"
      ),
      engineeringFeatures: [
        l("100% Single Boulder Zero-Joint Carving", "बिना जोड़ का एक ही ठोस पत्थर"),
        l("Integrated Ground Anchors for Stability", "मजबूत जमीन एंकरिंग"),
        l("Weather-Proof Natural Stone Patina", "धूप व पानी में रंग न उड़ने वाली प्राकृतिक फिनिश")
      ],
      image: animalImg
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Stone Fountains, Chhatris & Sculptures Jaipur | RK Stone Corporation",
          "पत्थर के फव्वारे, छतरियां व मूर्तियां जयपुर | आरके स्टोन कॉर्पोरेशन"
        )}
        description={l(
          "Handcrafted natural stone courtyard artifacts: multi-tiered lotus fountains, traditional Rajasthani chhatris, and elephant sculptures in Jaipur.",
          "प्राकृतिक पत्थर के वाटर फाउंटेन, शाही छतरियां, गार्डन गज़ेबो और हाथ से तराशे द्वारपाल हाथियों का सीधा निर्माण व फिटिंग।"
        )}
        keywords="stone fountain jaipur, stone chhatri manufacturer, rajasthani garden fountain, carved stone elephant jaipur, stone gazebo for villas"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${fountainImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("WATER FOUNTAINS,", "वाटर फाउंटेन,")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Chhatris & Garden Sculptures", "शाही छतरियां व सुंदर मूर्तियां")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "Elevating the beauty of open-air courtyards, luxury farmhouses, and gardens with handcrafted natural stone water fountains, royal chhatri gazebos, and monolithic animal sculptures.",
                "अपने आंगन, गार्डन और फार्महाउस को दें राजसी ठाठ। हाथ से तराशे पत्थर के फव्वारे, गुंबददार छतरियां और द्वारपाल हाथियों की सजीव मूर्तियां।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("ORDER FOUNTAINS & ARTIFACTS", "कोर्टयार्ड काम शुरू करें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I am looking for a stone fountain / chhatri for my garden or courtyard. Please share dimensions and catalogue."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP CATALOGUE", "व्हाट्सएप कैटलॉग मांगें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hydraulic & Engineering Guarantee Strip */}
      <section className="py-16 bg-[#161616] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal direction="left" delay={0.1}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("NO WATER LEAKAGE", "जल रिसाव रहित")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("WATERPROOF TREATMENT", "वॉटरप्रूफ सीलेंट")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Treated with quality sealants preventing water absorption and algae accumulation.",
                    "विशेष सीलेंट कोटिंग जिससे पानी पत्थर में नहीं रिसता और काई नहीं जमती।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("SOOTHING FLOW", "मधुर जल ध्वनि")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("BALANCED WATER CASCADE", "शांत व संतुलित प्रवाह")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Basin tiers calibrated to ensure soothing water sound without splashing outside.",
                    "कुंड के किनारों की ऐसी बनावट जिससे पानी बाहर नहीं छलकती और शांत जल ध्वनि मिलती है।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.3}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("SOLID MONOLITHIC", "ठोस पत्थर")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("GENUINE NATURAL STONE", "प्राकृतिक सैंडस्टोन व मार्बल")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Sculpted from continuous blocks of natural Rajasthan sandstone with structural integrity.",
                    "राजस्थान के असली व मजबूत पत्थर से तराशा गया जो सदियों तक धूप-छांव सहता है।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("HANDCRAFTED COURTYARD PIECES", "कोर्टयार्ड व गार्डन के प्रमुख शिल्प")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "Individually chiseled from blocks of pink, red, and beige sandstone to withstand all weather conditions outdoors.",
                  "गुलाबी, लाल और बेज सैंडस्टोन से तराशे गए कलात्मक फव्वारे और छतरियां जो खुली धूप और बारिश में पूरी तरह सुरक्षित रहते हैं।"
                )}
              </p>
            </Reveal>
          </div>

          <div className="space-y-24">
            {courtyardPieces.map((piece, idx) => {
              const imageFromLeft = idx % 2 === 0;
              return (
                <div 
                  key={piece.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-stone-200/80 pb-20 last:border-b-0"
                >
                  <Reveal 
                    direction={imageFromLeft ? "left" : "right"} 
                    duration={0.85}
                    className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative group overflow-hidden bg-stone-950 shadow-xl">
                      <img 
                        src={piece.image}
                        alt={piece.title}
                        className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-70" />
                      
                      <div className="absolute top-6 left-6 bg-stone-950/85 backdrop-blur-md px-3.5 py-1 text-accent text-xs font-body font-bold tracking-widest uppercase">
                        {l("COLLECTION", "संग्रह")} 0{idx + 1}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-body tracking-wide">
                        <span className="text-accent uppercase tracking-wider block text-[10px]">
                          {l("Stone Material", "पत्थर का प्रकार")}
                        </span>
                        <span className="font-semibold text-sm">{piece.stoneType}</span>
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
                      <span>{piece.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-snug">
                      {piece.title}
                    </h3>

                    <p className="text-base text-stone-700 font-light leading-relaxed">
                      {piece.description}
                    </p>

                    <div className="bg-white border border-stone-200 p-4">
                      <span className="text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                        {l("Custom Dimensions Available", "उपलब्ध नाप व साइज़")}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-950">
                        {piece.dimensionsAvailable}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      {piece.engineeringFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, please share catalogue, sizes and pricing for ${piece.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs px-6 py-5 rounded-none cursor-pointer">
                          <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                          {l("INQUIRE SIZES & RATE", "साइज़ व रेट पूछें")}
                        </Button>
                      </a>
                      <Link to="/contact">
                        <Button variant="outline" className="border border-stone-300 hover:border-stone-950 text-stone-800 hover:text-stone-950 hover:bg-stone-100 text-xs uppercase tracking-wider px-5 py-5 rounded-none transition-all cursor-pointer">
                          {l("PLAN YOUR COURTYARD", "प्रोजेक्ट प्लान करें")}
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

      {/* Commissioning Banner */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("TRANSFORM YOUR COURTYARD & GARDEN", "अपने आंगन व गार्डन को दें")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Into a Royal Stone Oasis", "राजसी ठाठ व सुंदरता")}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Direct from our Jaipur workshop to your doorstep across India. Insured freight crating, safe delivery, and master mason guidance on-site.",
                "जयपुर की वर्कशॉप से सीधे पूरे भारत में सुरक्षित डिलीवरी। मजबूत लकड़ी की पैकिंग और कुशल कारीगरों द्वारा ऑन-साइट फिटिंग की सुविधा।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("ORDER CUSTOM STONE WORK", "ऑर्डर व पूछताछ शुरू करें")}
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
