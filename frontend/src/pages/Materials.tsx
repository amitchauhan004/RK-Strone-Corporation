import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { API_URL } from "@/config/api";
import { toast } from "sonner";
import makranaImg from "@/assets/Stone-Temple.jpg";
import dholpurImg from "@/assets/Heritage-Haveli.jpg";
import redStoneImg from "@/assets/red-sand-stone.jpg";
import jaliImg from "@/assets/wall-panel.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Materials() {
  const { l } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "marble" | "sandstone" | "specialty">("all");
  const [sampleRequested, setSampleRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studio: "",
    email: "",
    phone: "",
    profession: "Architect / Interior Designer",
    projectLocation: "",
    shippingAddress: ""
  });

  const stoneMaterials = [
    {
      id: "makrana-white-marble",
      name: l("Pure Makrana White Marble (Sangemarmar)", "शुद्ध मकराना सफेद संगमरमर (प्योर मार्बल)"),
      geologicalName: l("Calcitic Metamorphic Marble (98%+ Pure)", "98%+ शुद्ध प्राकृतिक कैल्साइट मार्बल"),
      quarryLocation: l("Makrana, Nagaur District, Rajasthan", "मकराना खदान, नागौर, राजस्थान"),
      category: "marble" as const,
      colorProfile: l("Pristine Milky White with natural subtle veins", "दूधिया सफेद रंग, प्राकृतिक हल्की धारी"),
      texture: l("Fine crystalline grain, mirror polish or soft honed", "चिकनी सतह, मिरर पॉलिश या साटन मैट"),
      durability: l("Century-Grade (Zero yellowing, water resistant)", "सैकड़ों वर्ष तक टिकाऊ, पीला नहीं पड़ता"),
      recommendedFor: [
        l("Sacred Temple Shikhars", "मंदिर शिखर"),
        l("Sanctum Pillars", "गर्भगृह खंभे"),
        l("Carved Murtis", "नक्काशीदार मूर्तियां"),
        l("Palatial Interior Walls", "विला इंटीरियर")
      ],
      description: l(
        "Extracted directly from Makrana quarries—the historic stone chosen for the Taj Mahal and Victoria Memorial. Impervious to water seepage and moisture, carrying sacred Vedic purity and exceptional longevity.",
        "विश्व प्रसिद्ध मकराना खदानों से सीधा उपलब्ध। वही पत्थर जिससे ताजमहल बना है। पानी सोखता नहीं है, पीला नहीं पड़ता और सदियों तक इसकी पवित्रता और चमक वैसी ही बनी रहती है।"
      ),
      image: makranaImg,
      finishOptions: [
        l("Mirror Polish", "मिरर पॉलिश"),
        l("Satin Honed", "साटन मैट"),
        l("Hand-Chiseled Relief", "हाथ की नक्काशी"),
        l("Fluted Pillars", "नक्काशीदार खंभे")
      ]
    },
    {
      id: "bansi-paharpur-pink",
      name: l("Bansi Paharpur Pink Sandstone", "बंसी पहाड़पुर गुलाबी सैंडस्टोन"),
      geologicalName: l("Quartzite-Rich Natural Sandstone", "क्वार्टजाइट युक्त मजबूत सैंडस्टोन"),
      quarryLocation: l("Bharatpur / Bayana Belt, Rajasthan", "भरतपुर / बयाना क्षेत्र, राजस्थान"),
      category: "sandstone" as const,
      colorProfile: l("Warm Coral Pink & Ochre Terracotta", "मनमोहक गुलाबी और हल्का गेरुआ रंग"),
      texture: l("Fine-grained, strong structural density", "मजबूत बनावट, बारीक दाना"),
      durability: l("500+ years lifespan in extreme weather", "500 से अधिक वर्षों तक मौसम प्रतिरोधी"),
      recommendedFor: [
        l("Grand Haveli Facades", "हवेली एलिवेशन"),
        l("Temple Pillars & Arches", "मंदिर खंभे व मेहराब"),
        l("Monolithic Chhatris", "शाही छतरियां"),
        l("Exterior Boundary Walls", "बाहरी दीवारें")
      ],
      description: l(
        "The famous pink stone chosen for India's most grand temples, including the Ayodhya Ram Mandir. Renowned for resisting hot sun and heavy rain while growing more beautiful with time.",
        "अयोध्या राम मंदिर और अक्षरधाम जैसे पवित्र धामों में इस्तेमाल होने वाला प्रसिद्ध गुलाबी पत्थर। धूप, बारिश और हवा के थपेड़ों को आसानी से सहने वाला सबसे टिकाऊ पत्थर।"
      ),
      image: redStoneImg,
      finishOptions: [
        l("Hand Chiseled", "हाथ की गढाई"),
        l("Shot Blasted", "शॉट ब्लास्ट"),
        l("Hand-Carved Relief", "पारंपरिक नक्काशी"),
        l("Precision CNC Milled", "सीएनसी कटिंग")
      ]
    },
    {
      id: "dholpur-beige-sandstone",
      name: l("Royal Dholpur Beige Sandstone", "धौलपुर बेज / क्रीम सैंडस्टोन"),
      geologicalName: l("Fine Quartz Sedimentary Sandstone", "बारीक क्वार्ट्ज सैंडस्टोन"),
      quarryLocation: l("Dholpur Quarry Basin, Rajasthan", "धौलपुर खदान क्षेत्र, राजस्थान"),
      category: "sandstone" as const,
      colorProfile: l("Warm Buff, Cream Ivory with Teakwood grain", "हल्का क्रीम, बेज और टीकवुड दानेदार"),
      texture: l("Velvety smooth honed surface with micro-grain", "चिकनी मखमली फिनिश, बारीक बनावट"),
      durability: l("High weather & freeze-thaw endurance", "धूप व सर्दी में लंबे समय तक टिकाऊ"),
      recommendedFor: [
        l("Contemporary CNC Jalis", "सीएनसी नक्काशी जाली"),
        l("Courtyard Fountains", "आंगन के फव्वारे"),
        l("Balcony Jharokhas", "बालकनी झरोखे"),
        l("Facade Cladding", "एक्सटीरियर क्लैडिंग")
      ],
      description: l(
        "Celebrated in Rajasthani royal architecture, Dholpur stone exhibits subtle grain patterns reminiscent of exotic teakwood. Its uniform grain allows our master craftsmen to carve ultra-intricate 3D lattice screens.",
        "राजस्थान के महलों की पहली पसंद। इसमें लकड़ी जैसी प्राकृतिक सुंदर रेखाएं होती हैं। इसकी एकसमान बनावट के कारण इससे बारीक से बारीक 3D जालियां और झरोखे तैयार किए जाते हैं।"
      ),
      image: dholpurImg,
      finishOptions: [
        l("Micro-Honed", "स्मूथ मैट"),
        l("Sandblasted", "सैंडब्लास्ट"),
        l("Deep 3D CNC Relief", "गहरी 3D नक्काशी"),
        l("Linear Grooves", "लाइनर ग्रूव्स")
      ]
    },
    {
      id: "jodhpur-red-sandstone",
      name: l("Jodhpur Imperial Red Sandstone", "जोधपुर लाल सैंडस्टोन"),
      geologicalName: l("Iron-Oxide Cemented Quartz Sandstone", "आयरन-ऑक्साइड युक्त लाल पत्थर"),
      quarryLocation: l("Jodhpur Desert Belt, Rajasthan", "जोधपुर खदान क्षेत्र, राजस्थान"),
      category: "sandstone" as const,
      colorProfile: l("Deep Maroon & Sunset Crimson", "गहरा लाल और सिंदूरी रंग"),
      texture: l("Heavy density, earthy robust stone", "वजनी, मजबूत और ठोस बनावट"),
      durability: l("Ultra-heavy load bearing; wind immune", "अत्यधिक भार सहने की क्षमता, हवा प्रतिरोधी"),
      recommendedFor: [
        l("Grand Entry Gateways (Torans)", "शाही प्रवेश द्वार (तोरण)"),
        l("Palatial Columns", "मजबूत खंभे"),
        l("Exterior Cladding", "बाहरी दीवार क्लैडिंग"),
        l("Carved Brackets", "नक्काशीदार तोडे / ब्रैकेट")
      ],
      description: l(
        "The historic stone of Rajput forts like Mehrangarh and Umaid Bhawan Palace. Provides natural thermal cooling in harsh summers while imparting a majestic royal presence to any estate.",
        "मेहरानगढ़ और उम्मेद भवन जैसे किलों का गौरवशाली लाल पत्थर। गर्मियों में घर को स्वाभाविक रूप से ठंडा रखता है और घर के प्रवेश द्वार को शाही लुक देता है।"
      ),
      image: redStoneImg,
      finishOptions: [
        l("Traditional Hand Dressed", "पारंपरिक गढाई"),
        l("Sawn Honed", "मशीन कट स्मूथ"),
        l("Antique Fluted", "नक्काशीदार धारियां"),
        l("Carved Pillars", "नक्काशीदार पिलर")
      ]
    },
    {
      id: "gwalior-mint-sandstone",
      name: l("Gwalior White Mint Sandstone", "ग्वालियर व्हाइट मिंट सैंडस्टोन"),
      geologicalName: l("Fine-Grained White Quartzitic Sandstone", "सफेद क्वार्टजाइट सैंडस्टोन"),
      quarryLocation: l("Gwalior - Chambal Basin", "ग्वालियर - चंबल खदान क्षेत्र"),
      category: "specialty" as const,
      colorProfile: l("Soft Mint White with subtle pale ochre", "हल्का मिंट सफेद रंग, सौम्य आभा"),
      texture: l("Silky tactile touch with uniform grain", "रेशमी एहसास, एकसमान दाना"),
      durability: l("Low water absorption (<1.2%), weather proof", "कम पानी सोखने वाला (<1.2%), वेदरप्रूफ"),
      recommendedFor: [
        l("Modern Facades", "मॉडर्न एलिवेशन"),
        l("Courtyard Paving", "आंगन व पेविंग"),
        l("Pool Decks", "स्विमिंग पूल एरिया"),
        l("Air Lattice Jalis", "हवादार जालियां")
      ],
      description: l(
        "A favorite for modern luxury homes combining the warmth of natural sandstone with the bright reflectance of white stone. Ideal for contemporary villas and outdoor spaces.",
        "आधुनिक विला और घरों के लिए पसंदीदा पत्थर। यह सैंडस्टोन की मजबूती के साथ सफेद पत्थर की चमक देता है। बालकनी, फ्लोरिंग और जालियों के लिए एकदम उपयुक्त।"
      ),
      image: jaliImg,
      finishOptions: [
        l("Sandblasted", "सैंडब्लास्ट"),
        l("Diamond Sawn", "डायमंड सॉन"),
        l("Brushed Antique", "एंटीक फिनिश"),
        l("Precision CNC Jalis", "सटीक सीएनसी जाली")
      ]
    }
  ];

  const finishTechniques = [
    {
      name: l("Mirror Gloss & Satin Honed", "मिरर पॉलिश व साटन फिनिश"),
      description: l(
        "Multi-stage diamond abrasive polishing revealing natural crystalline veins with a soft, glare-free architectural sheen.",
        "हीरे के पैड से कई चरणों में पॉलिश, जिससे पत्थर की स्वाभाविक चमक और धारियां बिना किसी चकाचौंध के निखरती हैं।"
      ),
      bestFor: l("Temple Sanctuaries, Murtis, Interior Cladding", "मंदिर गर्भगृह, मूर्तियां, विला इंटीरियर")
    },
    {
      name: l("Precision CNC 3D Relief", "सटीक 3D सीएनसी कटिंग"),
      description: l(
        "Computer numerical 5-axis sculpting calibrated to 0.1mm tolerances, followed by master artisan hand-carved finishing.",
        "आधुनिक 5-एक्सिस मशीनों द्वारा 0.1 मिमी की सटीकता से कटिंग, और उसके बाद कारीगरों द्वारा हाथ से फिनिशिंग।"
      ),
      bestFor: l("Lattice Screens, Geometric Jalis, Wall Panels", "सीएनसी जाली, वॉल पैनल, नक्काशीदार स्क्रीन")
    },
    {
      name: l("Bush-Hammered & Sandblasted", "बुश-हैमर्ड व सैंडब्लास्ट"),
      description: l(
        "Mechanical micro-impact treatment creating uniform tactile stippling for timeless slip-resistance and diffused light.",
        "पत्थर पर हलके दानेदार निशान बनाकर सतह को एंटी-स्किड और वाटर-रेसिस्टेंट बनाया जाता है।"
      ),
      bestFor: l("Courtyard Paving, Steps, Fountain Decks", "आंगन पेविंग, सीढ़ियां, फव्वारे के आसपास")
    },
    {
      name: l("Antique Hand-Chiseled", "पारंपरिक हाथ की गढाई"),
      description: l(
        "Generational hammer & chisel dressing by master Rajasthani stone carvers for an authentic heritage palace patina.",
        "पारंपरिक हथौड़े और छेनी से कुशल कारीगरों द्वारा की गई गढाई, जो सदियों पुरानी राजस्थानी विरासत का अहसास कराती है।"
      ),
      bestFor: l("Haveli Pillars, Traditional Mandirs, Balconies", "हवेली के खंभे, मंदिर शिखर, झरोखे")
    }
  ];

  const filteredMaterials = selectedCategory === "all"
    ? stoneMaterials
    : stoneMaterials.filter(m => m.category === selectedCategory);

  const handleSubmitSample = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.shippingAddress) {
      toast.error(l("Please enter your name, phone and shipping address.", "कृपया अपना नाम, फ़ोन और पता भरें।"));
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: "Materials Sample Box",
        projectType: `Stone Sample Box (${formData.profession || "Design Professional"})`,
        stonePreference: formData.studio ? `Firm: ${formData.studio}` : "Rajasthan Natural Stones Specimen Box",
        city: formData.projectLocation,
        address: formData.shippingAddress,
        message: `Architect Sample Box Request. Profession: ${formData.profession}. Studio/Firm: ${formData.studio || 'N/A'}. Location: ${formData.projectLocation || 'N/A'}. Delivery Address: ${formData.shippingAddress}`
      };
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(l("Sample Box requested successfully! Our team will dispatch tracking soon.", "सैंपल बॉक्स का अनुरोध दर्ज हो गया है! ट्रैकिंग विवरण जल्द भेजा जाएगा।"));
        setSampleRequested(true);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || l("Failed to submit request. Please connect on WhatsApp.", "अनुरोध दर्ज नहीं हो सका। कृपया व्हाट्सएप पर संपर्क करें।"));
      }
    } catch {
      toast.error(l("Network error. Please connect via WhatsApp.", "नेटवर्क समस्या। कृपया व्हाट्सएप पर संपर्क करें।"));
      setSampleRequested(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Material Library & Natural Stones | RK Stone Corporation Jaipur",
          "प्राकृतिक पत्थर व सामग्री विवरण | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Explore Rajasthan's finest natural stones: Makrana White Marble, Bansi Paharpur Pink Sandstone, Dholpur Beige, and Jodhpur Red. Direct quarry blocks.",
          "राजस्थान के बेहतरीन पत्थरों की जानकारी: मकराना सफेद संगमरमर, बंसी पहाड़पुर, धौलपुर बेज और जोधपुर लाल सैंडस्टोन। सीधी खदानों से आपूर्ति।"
        )}
        keywords="makrana marble jaipur, bansi paharpur pink stone, dholpur sandstone supplier, rajasthan stone materials, architectural stone finishes, bespoke temple stones"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${makranaImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("NATURAL STONES OF RAJASTHAN,", "राजस्थान के प्राकृतिक पत्थर,")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Chiseled for Generations", "सदियों तक रहने वाली मजबूती")}
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "For over four decades, RK Stone Corporation has sourced solid stone blocks directly from Rajasthan's legendary quarries—from pure Makrana white marble to weather-immune Dholpur and Bansi Paharpur sandstones.",
                "चार दशकों से अधिक समय से, आरके स्टोन कॉर्पोरेशन राजस्थान की प्रसिद्ध खदानों से सीधे पत्थर मंगवाता है—शुद्ध मकराना संगमरमर से लेकर धौलपुर, बंसी पहाड़पुर और जोधपुर सैंडस्टोन तक।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#sample-box">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("REQUEST STONE SAMPLE BOX", "स्टोन सैंपल बॉक्स मंगवाएं")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I want to consult on stone selection and specifications for my project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("SPEAK WITH OUR STONE EXPERT", "स्टोन एक्सपर्ट से बात करें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <span className="text-xs font-body font-bold uppercase tracking-wider text-stone-500 mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent" /> {l("FILTER BY STONE:", "पत्थर अनुसार चुनें:")}
            </span>
            {[
              { id: "all", label: l("All Stones", "सभी पत्थर") },
              { id: "marble", label: l("Makrana White Marble", "मकराना सफेद संगमरमर") },
              { id: "sandstone", label: l("Heritage Sandstones", "सैंडस्टोन (गुलाबी/बेज/लाल)") },
              { id: "specialty", label: l("Mint Sandstone", "ग्वालियर मिंट स्टोन") },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-none border ${
                  selectedCategory === cat.id
                    ? "bg-stone-950 text-white border-stone-950 shadow-sm"
                    : "bg-white text-stone-700 border-stone-300 hover:border-stone-950 hover:bg-stone-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-stone-500 font-body tracking-wider hidden md:block">
            {l("DIRECT FROM RAJASTHAN QUARRIES", "सीधे राजस्थान की खदानों से शुद्ध पत्थर")}
          </div>
        </div>
      </section>

      {/* Stone Catalog Cards */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {filteredMaterials.map((stone, idx) => {
              const imageFromLeft = idx % 2 === 0;
              return (
                <div
                  key={stone.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-stone-200/80 pb-20 last:border-b-0"
                >
                  {/* Visual Side */}
                  <Reveal
                    direction={imageFromLeft ? "left" : "right"}
                    duration={0.85}
                    className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative group overflow-hidden bg-stone-950 shadow-xl">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-xs font-body font-semibold text-accent tracking-widest uppercase mb-1">
                          {l("QUARRY ORIGIN", "खदान का स्थान")}
                        </div>
                        <div className="text-sm font-semibold tracking-wide flex items-center gap-2">
                          <Compass className="w-4 h-4 text-accent" />
                          {stone.quarryLocation}
                        </div>
                      </div>

                      <div className="absolute top-6 left-6 bg-stone-950/85 backdrop-blur-md px-3.5 py-1 text-accent text-xs font-body font-bold tracking-widest uppercase">
                        0{idx + 1} • {stone.category.toUpperCase()}
                      </div>
                    </div>
                  </Reveal>

                  {/* Details Side */}
                  <Reveal
                    direction={imageFromLeft ? "right" : "left"}
                    duration={0.85}
                    className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.25em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{stone.geologicalName}</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-snug">
                      {stone.name}
                    </h2>

                    <p className="text-base text-stone-700 font-light leading-relaxed">
                      {stone.description}
                    </p>

                    {/* Technical Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 bg-white border border-stone-200 p-5 shadow-sm">
                      <div>
                        <span className="block text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider mb-1">
                          {l("Color Tone", "रंग व आभा")}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-stone-950">{stone.colorProfile}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider mb-1">
                          {l("Durability", "टिकाऊपन")}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-stone-950">{stone.durability}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider mb-1">
                          {l("Surface Texture", "सतह की बनावट")}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-stone-950">{stone.texture}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-body font-semibold text-stone-500 uppercase tracking-wider mb-1">
                          {l("Direct Supply", "सीधी आपूर्ति")}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-accent">
                          {l("Custom Blocks & Slabs", "कस्टम ब्लॉक व स्लैब")}
                        </span>
                      </div>
                    </div>

                    {/* Recommended Applications */}
                    <div>
                      <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-stone-500 mb-3">
                        {l("BEST SUITED FOR", "किन कार्यों के लिए सर्वश्रेष्ठ")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {stone.recommendedFor.map((app, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-stone-100 text-stone-800 border border-stone-300 text-xs font-medium tracking-wide uppercase"
                          >
                            ✓ {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Finishes Available */}
                    <div>
                      <h3 className="text-xs font-body font-semibold tracking-widest uppercase text-stone-500 mb-2">
                        {l("AVAILABLE FINISHES", "उपलब्ध फिनिश")}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-stone-700">
                        {stone.finishOptions.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-4">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, please send detailed technical spec sheets and quarry block pricing for ${stone.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs px-6 py-5 rounded-none cursor-pointer">
                          <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                          {l("INQUIRE ABOUT THIS STONE", "इस पत्थर की जानकारी लें")}
                        </Button>
                      </a>
                      <Link to="/contact">
                        <Button variant="outline" className="border border-stone-300 hover:border-stone-950 text-stone-800 hover:text-stone-950 hover:bg-stone-100 text-xs uppercase tracking-wider px-5 py-5 rounded-none transition-all cursor-pointer">
                          {l("REQUEST ESTIMATE", "अनुमानित लागत मांगें")}
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

      {/* Surface Finishing Techniques Section */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-white tracking-wide leading-tight mb-6">
                {l("STONE FINISHING METHODS", "पत्थर तराशने और फिनिशिंग की विधियां")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-400 font-light text-base leading-relaxed">
                {l(
                  "Every stone piece requires careful attention to light, shadow, and touch. Our Jaipur workshop offers four specialized finishing methods.",
                  "हर प्रोजेक्ट के लिए सही फिनिश जरूरी होती है। हमारी वर्कशॉप में आधुनिक मशीनों और कुशल कारीगरों द्वारा ये चार मुख्य फिनिश दी जाती हैं।"
                )}
              </p>
            </Reveal>
          </div>

          {/* 4 Finishing Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {finishTechniques.map((tech, idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <Reveal
                  key={idx}
                  direction={directions[idx] || "up"}
                  delay={idx * 0.1}
                >
                  <div className="h-full p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-accent/60 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                        {l("METHOD", "विधि")} 0{idx + 1}
                      </span>
                      <h3 className="font-heading font-medium text-lg uppercase tracking-wide text-white mb-3">
                        {tech.name}
                      </h3>
                      <p className="text-white/70 text-sm font-light leading-relaxed mb-6">
                        {tech.description}
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <span className="text-[11px] font-body font-semibold uppercase tracking-wider text-accent block mb-1">
                        {l("Recommended For", "उपयुक्त उपयोग")}
                      </span>
                      <span className="text-xs text-white/80 font-medium">
                        {tech.bestFor}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architect Sample Box Request Form */}
      <section id="sample-box" className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" duration={0.85} className="max-w-4xl mx-auto bg-white border border-stone-300 shadow-xl p-8 sm:p-14">

            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide">
                {l("REQUEST A NATURAL STONE SAMPLE BOX", "प्राकृतिक पत्थर का सैंपल बॉक्स मंगवाएं")}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light mt-3 max-w-xl mx-auto">
                {l(
                  "Receive precision-cut physical specimens of Makrana White Marble, Bansi Paharpur Pink, and Dholpur Beige delivered directly to your home or office.",
                  "मकराना मार्बल, बंसी पहाड़पुर और धौलपुर सैंडस्टोन के असली कटे हुए स्टोन सैंपल सीधे अपने पते पर मंगवाएं।"
                )}
              </p>
            </div>

            {sampleRequested ? (
              <div className="p-8 bg-stone-100 border border-accent/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
                <h3 className="text-xl font-heading font-medium uppercase text-stone-950">
                  {l("Sample Box Request Sent", "सैंपल बॉक्स अनुरोध प्राप्त हुआ")}
                </h3>
                <p className="text-stone-700 text-sm max-w-md mx-auto">
                  {l(
                    `Thank you, ${formData.name}. Our team will contact you and dispatch your curated stone sample box via express courier.`,
                    `धन्यवाद, ${formData.name}! हमारी टीम आपसे संपर्क करके कुरियर द्वारा सैंपल बॉक्स रवाना करेगी।`
                  )}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/919414784562?text=${encodeURIComponent(
                      `Hi RK Stone Corporation, I just submitted an architect sample box request for ${formData.name}. Please confirm dispatch.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-accent text-stone-950 hover:bg-accent/90 font-bold uppercase text-xs tracking-wider px-6 py-4 rounded-none cursor-pointer">
                      <WhatsAppIcon className="mr-2 w-4 h-4" />
                      {l("CONFIRM ON WHATSAPP", "व्हाट्सएप पर पुष्टि करें")}
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitSample} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Full Name *", "आपका पूरा नाम *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={l("e.g. Rajesh Mehta", "उदा. राजेश मेहता")}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Firm / Homeowner Name", "फर्म या घर का नाम")}
                    </label>
                    <input
                      type="text"
                      value={formData.studio}
                      onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                      placeholder={l("e.g. Private Residence / Studio", "उदा. निजी निवास / ऑफिस")}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Email Address *", "ईमेल पता *")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Phone / WhatsApp Number *", "फ़ोन / व्हाट्सएप नंबर *")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 94147 84562"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Your Profession / Role", "आपका पेशा")}
                    </label>
                    <select
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    >
                      <option value="Homeowner">{l("Private Homeowner / Villa Owner", "निजी घर / विला मालिक")}</option>
                      <option value="Architect">{l("Architect / Architectural Studio", "आर्किटेक्ट / स्टूडियो")}</option>
                      <option value="Interior Designer">{l("Interior Designer / Contractor", "इंटीरियर डिज़ाइनर / ठेकेदार")}</option>
                      <option value="Temple Trust">{l("Temple Trust / Spiritual Patron", "मंदिर ट्रस्ट / संस्था")}</option>
                      <option value="Developer">{l("Hotel / Resort Developer", "होटल / रिसॉर्ट डेवलपर")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Project City / State", "प्रोजेक्ट का शहर / राज्य")}
                    </label>
                    <input
                      type="text"
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder={l("e.g. Mumbai, New Delhi, Jaipur", "उदा. मुंबई, दिल्ली, जयपुर")}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    {l("Delivery Address for Sample Box *", "सैंपल बॉक्स भेजने का पूरा पता *")}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder={l(
                      "Enter complete delivery address with pincode...",
                      "पिनकोड सहित पूरा पता लिखें..."
                    )}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                  />
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-stone-200">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-body tracking-wider">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>{l("INCLUDES REAL STONE SPECIMENS DELIVERED PAN-INDIA", "पूरे भारत में कूरियर द्वारा असली पत्थर के नमूने")}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer disabled:opacity-50"
                  >
                    <Send className="mr-2 w-4 h-4 text-accent" />
                    {submitting
                      ? l("DISPATCHING REQUEST...", "भेजा जा रहा है...")
                      : l("DISPATCH SAMPLE BOX", "सैंपल बॉक्स भेजें")}
                  </Button>
                </div>
              </form>
            )}

          </Reveal>
        </div>
      </section>

    </div>
  );
}
