import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Truck, 
  Hammer, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Terms() {
  const { l } = useLanguage();
  const [activeSection, setActiveSection] = useState("all");

  const termsSections = [
    {
      id: "scope",
      icon: Scale,
      number: "01",
      titleEn: "Commercial Stone Fabrication & Scope of Work",
      titleHi: "पत्थर निर्माण व कार्य का दायरा",
      descEn: "RK Stone Corporation specializes in custom architectural stonework, hand-carved heritage elements, 5-axis CNC screens, and monolithic temple structures.",
      descHi: "आरके स्टोन कॉर्पोरेशन पारंपरिक नक्काशीदार पत्थर के मंदिर, 3D सीएनसी जालियां, हवेली एलिवेशन और हेरिटेज पत्थरों के कार्य में विशेषज्ञता रखता है।",
      pointsEn: [
        "All custom orders are executed strictly in accordance with approved drawings, sketches, or finalized 3D shop models.",
        "Any modifications or additions requested by the client after stone cutting or block roughing has commenced shall be billed as variation orders with revised delivery schedules.",
        "RK Stone Corporation acts as a direct fabrication partner and supplier, adhering to Indian Standard stone specifications (IS: 1121 and IS: 1123)."
      ],
      pointsHi: [
        "सभी कार्य स्वीकृत CAD ड्राइंग, आर्किटेक्चरल प्लान और 3D मॉडल के आधार पर ही तैयार किए जाते हैं।",
        "पत्थर की कटिंग या नक्काशी शुरू होने के बाद यदि ग्राहक द्वारा डिज़ाइन में बदलाव किया जाता है, तो अतिरिक्त शुल्क व समय लागू होगा।",
        "सभी पत्थरों की गुणवत्ता भारतीय मानक ब्यूरो (BIS/IS) के सुरक्षा मानकों के अनुसार परखी जाती है।"
      ]
    },
    {
      id: "variations",
      icon: AlertCircle,
      number: "02",
      titleEn: "Natural Stone Characteristics & Dimensional Tolerances",
      titleHi: "प्राकृतिक पत्थर की विशेषताएं व साइज सहनशीलता",
      descEn: "Natural stones are quarried geological materials formed over millions of years.",
      descHi: "प्राकृतिक पत्थर खदानों से निकाले जाते हैं और इनमें कुदरती रूप से रंग और शिराओं की विविधता होती है।",
      pointsEn: [
        "Variations in color hue, vein patterns, grain texture, and fossil mineral marks are intrinsic characteristics of authentic natural marble and sandstone. These variations do not constitute defects.",
        "Fabrication dimensional tolerance for machine-cut architectural dry-cladding panels is strictly ±1.5 mm to ±2.0 mm.",
        "Hand-carved artistic artifacts (murtis, animal sculptures, floral jali friezes) embody artisan nuances; minor dimensional tolerances of ±3 mm to ±5 mm are customary and celebrate authentic Rajasthani craftsmanship."
      ],
      pointsHi: [
        "सफेद मकराना मार्बल, धौलपुर या बंसी पहाड़पुर सैंडस्टोन में प्राकृतिक रेशे और रंग का मामूली अंतर पत्थर की असलियत का प्रमाण है, इसे खराबी नहीं माना जाता।",
        "मशीन से कटने वाले क्लैडिंग पत्थरों में ±1.5 mm से ±2.0 mm तक की सटीक टॉलरेंस रखी जाती है।",
        "हाथ की नक्काशी वाली मूर्तियों और जालियों में पारंपरिक शिल्पकारों की कलात्मक बारीकियों के कारण ±3 से 5 मिमी का अंतर सामान्य है।"
      ]
    },
    {
      id: "payments",
      icon: CreditCard,
      number: "03",
      titleEn: "Quotation Validity & Milestone Payments",
      titleHi: "कोटेशन की वैधता व भुगतान की शर्तें",
      descEn: "Standard payment milestones for custom stone fabrication orders.",
      descHi: "कस्टम पत्थर आर्डर के लिए चरणबद्ध भुगतान की प्रक्रिया।",
      pointsEn: [
        "Written quotations provided by our Jaipur estimation desk remain valid for thirty (30) calendar days from the date of issue.",
        "For custom orders: A mobilization advance of 40% is payable upon confirmation for raw quarry block procurement.",
        "A milestone payment of 40% is payable upon completion of workshop carving and pre-dispatch inspection (via high-resolution video/photos or physical factory visit).",
        "The balance 20% is payable prior to final wooden crating and dispatch from our Jaipur workshop."
      ],
      pointsHi: [
        "दी गई कोटेशन जारी होने की तारीख से 30 दिनों तक वैध रहती है।",
        "कस्टम आर्डर की पुष्टि पर खदान से पत्थर मंगवाने के लिए 40% अग्रिम राशि देय होती है।",
        "वर्कशॉप में नक्काशी पूरी होने और फोटो/वीडियो या व्यक्तिगत निरीक्षण के समय 40% भुगतान देय होता है।",
        "शेष 20% भुगतान लकड़ी के बॉक्स में सुरक्षित पैकिंग और डिस्पैच से ठीक पहले देय होता है।"
      ]
    },
    {
      id: "shipping",
      icon: Truck,
      number: "04",
      titleEn: "Packaging, Transport Logistics & Transit Insurance",
      titleHi: "पैकिंग, सुरक्षित परिवहन व ट्रांजिट इंश्योरेंस",
      descEn: "Pan-India turnkey transport with heavy-duty fumigated wooden crating.",
      descHi: "पूरे भारत में सुरक्षित मजबूत लकड़ी के बॉक्स पैकिंग के साथ डिलीवरी।",
      pointsEn: [
        "Every carved stone piece, pillar, and CNC jali is numbered for sequential site assembly, inter-padded with EPE foam, and crated in heavy-duty wooden boxes.",
        "Unloading at the customer's site (cranes, forklifts, manual labor) is the responsibility of the client unless turnkey site erection has been explicitly contracted.",
        "All long-distance freight consignments are dispatched with comprehensive all-risk transit insurance coverage."
      ],
      pointsHi: [
        "हर नक्काशीदार पत्थर, खंभे और जाली को नंबर देकर फोम के साथ मजबूत लकड़ी के बॉक्स में पैक किया जाता है।",
        "साइट पर अनलोडिंग (क्रेन या लेबर) की व्यवस्था ग्राहक द्वारा की जाती है, जब तक कि पूरी फिटिंग का अनुबंध न हो।",
        "सभी लंबी दूरी के माल का ट्रांजिट बीमा करवाकर ही सुरक्षित भेजा जाता है।"
      ]
    },
    {
      id: "erection",
      icon: Hammer,
      number: "05",
      titleEn: "On-Site Installation & Turnkey Erection",
      titleHi: "ऑन-साइट फिटिंग व सोमपुरा कारीगर स्थापना",
      descEn: "Turnkey erection services with experienced Rajasthani Sompura artisans.",
      descHi: "हमारे कुशल कारीगरों द्वारा साइट पर संपूर्ण फिटिंग की सुविधा।",
      pointsEn: [
        "When site erection is contracted, the client shall provide adequate scaffolding, uninterrupted 3-phase electricity, construction water, and safe secure storage for stone units.",
        "Our specialized team uses SS-304/316 undercut anchor brackets, non-staining epoxy adhesives, and elastomeric expansion joints conforming to seismic structural guidelines.",
        "RK Stone Corporation adheres to strict on-site occupational safety protocols (PPE, safety harnesses, hard hats)."
      ],
      pointsHi: [
        "ऑन-साइट फिटिंग के समय साइट पर पाड़ (स्कैफोल्डिंग), बिजली, पानी और पत्थरों को रखने की सुरक्षित जगह ग्राहक द्वारा उपलब्ध कराई जाती है।",
        "हम सुरक्षित ड्राई क्लैडिंग के लिए स्टेनलेस स्टील एसएस-304/316 क्लैंप्स और मजबूत केमिकल का उपयोग करते हैं।",
        "हमारे कारीगर साइट पर सुरक्षा मानकों (हेलमेट, सेफ्टी बेल्ट) का कड़ाई से पालन करते हैं।"
      ]
    },
    {
      id: "legal",
      icon: ShieldCheck,
      number: "06",
      titleEn: "Legal Jurisdiction & Governing Law",
      titleHi: "कानूनी क्षेत्राधिकार व नियम",
      descEn: "All contractual agreements are governed by the laws of India.",
      descHi: "सभी व्यावसायिक अनुबंध भारतीय कानूनों के तहत संचालित होते हैं।",
      pointsEn: [
        "Any disputes, claims, or controversies arising out of transactions with RK Stone Corporation shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India.",
        "Force Majeure: Neither party shall be liable for delivery delays arising from unseasonal quarry flooding, governmental transport curbs, or acts of God beyond reasonable control."
      ],
      pointsHi: [
        "किसी भी प्रकार के विवाद की स्थिति में केवल जयपुर (राजस्थान) स्थित न्यायालयों का ही क्षेत्राधिकार मान्य होगा।",
        "प्राकृतिक आपदा, खदानों में अप्रत्याशित बाढ़ या सरकारी पाबंदियों के कारण होने वाले विलंब के लिए विशेष परिस्थितियां लागू होंगी।"
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Terms & Conditions | Commercial Stonework & Fabrication | RK Stone Corporation",
          "नियम व शर्तें | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Official terms of business, quarry sourcing, payment milestones, dimensional tolerances, and Pan-India delivery for RK Stone Corporation Jaipur.",
          "आरके स्टोन कॉर्पोरेशन जयपुर के आधिकारिक नियम, पत्थर की गुणवत्ता मानक, भुगतान व डिलीवरी की शर्तें।"
        )}
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/25 via-stone-950 to-stone-950 opacity-90" />
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-tight mb-4">
              {l("TERMS & CONDITIONS", "नियम व शर्तें")}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              {l(
                "Transparent guidelines governing architectural stone procurement, precision fabrication, milestone billing, and turnkey site installation across India.",
                "पारदर्शी और स्पष्ट व्यावसायिक नियम — पत्थर चयन, नक्काशी कार्य, सुरक्षित डिलीवरी और ऑन-साइट फिटिंग के संबंध में।"
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Area with Sticky Navigation */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Quick Navigation (Sticky on Desktop) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                
                <div className="bg-white border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-heading uppercase text-sm tracking-wider text-stone-950 font-semibold mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    {l("Clauses Overview", "मुख्य खंड")}
                  </h3>

                  <nav className="space-y-1.5 text-xs font-mono">
                    <button
                      onClick={() => setActiveSection("all")}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                        activeSection === "all"
                          ? "bg-stone-950 text-white font-semibold"
                          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <span>{l("All Clauses (Complete Policy)", "सभी नियम (संपूर्ण नीति)")}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    </button>

                    {termsSections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setActiveSection(sec.id);
                          const el = document.getElementById(sec.id);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          activeSection === sec.id
                            ? "bg-accent text-stone-950 font-bold"
                            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                        }`}
                      >
                        <span className="truncate pr-2">{sec.number}. {l(sec.titleEn, sec.titleHi)}</span>
                        <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Direct Architect Support Box */}
                <div className="bg-stone-950 text-white p-6 border-l-4 border-accent shadow-md space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    {l("NEED COMMERCIAL CLARIFICATION?", "कोई सवाल या विशेष अनुबंध?")}
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    {l(
                      "Have a tender, large-scale temple project, or institutional stone contract with custom terms? Speak directly with our commercial desk.",
                      "बड़े मंदिर, सरकारी टेंडर या संस्थागत प्रोजेक्ट के विशेष अनुबंध के लिए सीधे हमारी लीगल डेस्क से बात करें।"
                    )}
                  </p>
                  <a
                    href="https://wa.me/919414784562?text=Hi%20RK%20Stone%20Corporation,%20I%20have%20queries%20regarding%20commercial%20terms%20for%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-accent hover:text-white transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Legal Desk &rarr;</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Right Detailed Terms Cards */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span>
                  {l(
                    "Last updated & verified: Current Fabrication Year. By ordering work with RK Stone Corporation, client accepts these terms.",
                    "अंतिम नवीनीकरण: वर्तमान सत्र। आरके स्टोन कॉर्पोरेशन के साथ आर्डर करने पर यह नियम मान्य होते हैं।"
                  )}
                </span>
              </div>

              {termsSections
                .filter(sec => activeSection === "all" || activeSection === sec.id)
                .map((sec, idx) => {
                  const Icon = sec.icon;
                  return (
                    <Reveal key={sec.id} delay={idx * 0.05}>
                      <div
                        id={sec.id}
                        className="bg-white border border-stone-200 p-6 sm:p-8 shadow-sm hover:border-accent/60 transition-all duration-300 scroll-mt-28"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-accent bg-accent/15 px-2.5 py-1 border border-accent/30">
                              {sec.number}
                            </span>
                            <h2 className="text-lg sm:text-xl font-heading font-medium uppercase text-stone-950 tracking-wide">
                              {l(sec.titleEn, sec.titleHi)}
                            </h2>
                          </div>
                          <div className="w-10 h-10 bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-stone-600 font-light mb-5 leading-relaxed">
                          {l(sec.descEn, sec.descHi)}
                        </p>

                        <div className="space-y-3">
                          {(l(sec.pointsEn, sec.pointsHi) as string[]).map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}

              {/* Bottom Quick Contact Strip */}
              <div className="p-8 bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading uppercase text-stone-950 text-base font-normal">
                    {l("READY TO COMMENCE YOUR STONE PROJECT?", "अपना पत्थर प्रोजेक्ट शुरू करने के लिए तैयार हैं?")}
                  </h3>
                  <p className="text-stone-500 text-xs font-light mt-1">
                    {l("Direct quarry sourcing from Jaipur with transparent commercial terms.", "पारदर्शी नियमों के साथ जयपुर से सीधा पत्थर कार्य।")}
                  </p>
                </div>
                <Link to="/contact">
                  <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs tracking-wider px-6 py-5 rounded-none cursor-pointer">
                    {l("CONTACT ESTIMATION TEAM", "कोटेशन हेतु संपर्क करें")}
                    <ArrowRight className="w-4 h-4 ml-2 text-accent" />
                  </Button>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}