import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  EyeOff, 
  FileCheck, 
  Database, 
  Share2, 
  UserCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Privacy() {
  const { l } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const privacySections = [
    {
      id: "blueprints",
      icon: Lock,
      number: "01",
      titleEn: "Architectural CAD, Drawings & Blueprint Confidentiality",
      titleHi: "आर्किटेक्चरल CAD ड्राइंग व डिज़ाइनों की गोपनीयता",
      descEn: "Strict non-disclosure protection for proprietary designs, 3D models, and site plans.",
      descHi: "ग्राहकों और आर्किटेक्ट्स द्वारा साझा की गई ड्राइंग और प्लान की पूर्ण सुरक्षा।",
      pointsEn: [
        "All CAD files (.DWG, .DXF), 3D Rhino/SketchUp models, elevation sketches, and photographs submitted by architects, interior designers, or private villa clients are treated under strict confidentiality.",
        "Your proprietary project plans are utilized exclusively by our senior stone draftsmen and CNC programming team for structural sizing and quotation purposes.",
        "We never share, publish, or reproduce client design blueprints without prior explicit written authorization from the commissioning studio or client."
      ],
      pointsHi: [
        "आर्किटेक्ट्स या ग्राहकों द्वारा भेजी गई CAD ड्राइंग, 3D मॉडल व साइट प्लान पूरी तरह गोपनीय रखे जाते हैं।",
        "आपके डिज़ाइनों का उपयोग केवल हमारी वर्कशॉप की तकनीकी टीम द्वारा नाप व कोटेशन तैयार करने के लिए ही किया जाता है।",
        "हम बिना आपकी अनुमति के किसी भी डिज़ाइन या प्लान को किसी तीसरे पक्ष के साथ साझा या सार्वजनिक नहीं करते।"
      ]
    },
    {
      id: "collection",
      icon: Database,
      number: "02",
      titleEn: "Information We Collect & Collection Methods",
      titleHi: "हम कौन-सी जानकारी एकत्र करते हैं",
      descEn: "We collect only information necessary to deliver custom stone estimates and orders.",
      descHi: "हम केवल वही जानकारी लेते हैं जो पत्थर आर्डर और कोटेशन के लिए जरूरी होती है।",
      pointsEn: [
        "Contact Data: Name, mobile/WhatsApp telephone number, email address, and architectural studio affiliation.",
        "Project Details: Stone preferences (e.g., Red Sandstone, Dholpur Sandstone), dimensions, site delivery location (City/State), and project notes.",
        "Technical Attachments: Photographs of site conditions, reference stone artifacts, and CAD blueprints uploaded via our portal.",
        "Commercial Billing Information: GSTIN number, billing address, and consignee details for e-Way bills and freight transport."
      ],
      pointsHi: [
        "संपर्क जानकारी: आपका नाम, मोबाइल/व्हाट्सएप नंबर, ईमेल और शहर।",
        "प्रोजेक्ट विवरण: पसंद का पत्थर (लाल सैंडस्टोन, धौलपुर सैंडस्टोन), साइज, डिलीवरी का स्थान और आवश्यक विवरण।",
        "संलग्न फाइलें: आपके द्वारा वेबसाइट पर अपलोड की गई फोटो, स्केच व CAD फाइलें।",
        "बिलिंग विवरण: ई-वे बिल और सुरक्षित ट्रांसपोर्ट के लिए आवश्यक जीएसटी नंबर व पता।"
      ]
    },
    {
      id: "usage",
      icon: FileCheck,
      number: "03",
      titleEn: "Purpose & Use of Your Personal Data",
      titleHi: "आपकी जानकारी का उपयोग कैसे होता है",
      descEn: "Your data is used solely to process your stone inquiry and pan-India delivery.",
      descHi: "आपकी जानकारी का इस्तेमाल केवल आपके आर्डर और सुरक्षित डिलीवरी के लिए किया जाता है।",
      pointsEn: [
        "Generating precise, direct-from-workshop stone estimates and fabrication schedules within 2 to 24 hours.",
        "Coordinating technical stone reviews, quarry block selections, and dry-fit photos via WhatsApp and telephone.",
        "Booking dedicated freight transport vehicles, generating Goods Consignment Notes (LR), and obtaining transit insurance for crated stone consignments.",
        "Providing ongoing customer assistance during on-site stone erection and dry-cladding installation."
      ],
      pointsHi: [
        "सटीक कोटेशन और पत्थर निर्माण की समय-सीमा तैयार करने के लिए।",
        "व्हाट्सएप या फ़ोन पर काम की प्रगति, फोटो और वीडियो साझा करने के लिए।",
        "सुरक्षित ट्रांसपोर्ट, ई-वे बिल और ट्रांजिट बीमा की व्यवस्था के लिए।",
        "साइट पर पत्थर की फिटिंग और स्थापना में तकनीकी मार्गदर्शन देने के लिए।"
      ]
    },
    {
      id: "no-sharing",
      icon: EyeOff,
      number: "04",
      titleEn: "Zero Data Monetization & No Third-Party Reselling",
      titleHi: "डेटा की कोई बिक्री या अनधिकृत शेयरिंग नहीं",
      descEn: "We hold an uncompromised commitment to client privacy.",
      descHi: "हम आपके डेटा की पूरी सुरक्षा की गारंटी देते हैं।",
      pointsEn: [
        "RK Stone Corporation does NOT sell, rent, lease, or monetize customer contact details to third-party marketing brokers or advertising networks under any circumstances.",
        "Data is shared only with essential logistic partners (registered transport lines, transit insurance providers) solely to deliver stone consignments to your designated site.",
        "All internal access is restricted to verified workshop personnel bound by company non-disclosure obligations."
      ],
      pointsHi: [
        "आरके स्टोन कॉर्पोरेशन कभी भी ग्राहकों का डेटा किसी विज्ञापन कंपनी या मार्केटिंग एजेंसी को नहीं बेचता।",
        "जानकारी केवल ट्रांसपोर्ट कंपनी के साथ माल पहुंचाने और बीमा के उद्देश्य से ही साझा की जाती है।",
        "वर्कशॉप के अधिकृत स्टाफ के अलावा किसी अन्य को आपके डेटा का एक्सेस नहीं होता।"
      ]
    },
    {
      id: "security",
      icon: Shield,
      number: "05",
      titleEn: "Enterprise Data Security & Cloud Protection",
      titleHi: "डेटा सुरक्षा व 256-बिट एन्क्रिप्शन",
      descEn: "Modern cryptographic safeguards protect all digital communications.",
      descHi: "आधुनिक एन्क्रिप्शन और सुरक्षित सर्वर द्वारा डेटा की सुरक्षा।",
      pointsEn: [
        "Website data transmissions are encrypted using industry-standard TLS / SSL (256-bit encryption).",
        "Customer inquiries and architectural file attachments are stored in secured, firewalled cloud databases with strict access-control protocols.",
        "Periodic vulnerability audits and secure backup protocols ensure resilient protection against data loss or unauthorized access."
      ],
      pointsHi: [
        "वेबसाइट पर सभी संपर्क फॉर्म 256-बिट एसएसएल सुरक्षा के तहत सुरक्षित भेजे जाते हैं।",
        "अपलोड की गई ड्राइंग और फोटो सुरक्षित डेटाबेस में एन्क्रिप्टेड रूप में रखी जाती हैं।",
        "अनधिकृत पहुंच को रोकने के लिए नियमित तकनीकी सुरक्षा जांच की जाती है।"
      ]
    },
    {
      id: "rights",
      icon: UserCheck,
      number: "06",
      titleEn: "Your Privacy Rights & Data Erasure Requests",
      titleHi: "आपके अधिकार व डेटा हटाने का अनुरोध",
      descEn: "Full control over your stored contact and project information.",
      descHi: "अपनी जानकारी में बदलाव या उसे हटाने का पूरा अधिकार।",
      pointsEn: [
        "You have the right to inspect, update, or correct any contact details or address records associated with your inquiry.",
        "Upon written request, you may request permanent deletion of your inquiry dossier and CAD drawings once your project fabrication and delivery is completed.",
        "To exercise any privacy rights, simply contact our Data Protection Desk via email or WhatsApp."
      ],
      pointsHi: [
        "आप किसी भी समय अपने संपर्क विवरण या पते में सुधार करवा सकते हैं।",
        "प्रोजेक्ट पूरा होने के बाद यदि आप अपनी ड्राइंग या विवरण को हमेशा के लिए हटवाना चाहें, तो हमें लिखकर सूचित कर सकते हैं।",
        "अपने डेटा से संबंधित किसी भी अनुरोध के लिए हमारी हेल्पडेस्क पर संपर्क करें।"
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Privacy Policy & Blueprint Confidentiality | RK Stone Corporation Jaipur",
          "गोपनीयता नीति | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Our commitment to client data protection, architectural CAD blueprint confidentiality, zero third-party data selling, and secure Pan-India logistics.",
          "आरके स्टोन कॉर्पोरेशन की डेटा सुरक्षा नीति, आर्किटेक्चरल ड्राइंग की पूर्ण गोपनीयता और सुरक्षित व्यावसायिक व्यवहार।"
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
              {l("PRIVACY POLICY", "गोपनीयता नीति")}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              {l(
                "How RK Stone Corporation Jaipur safeguards your personal information, architectural drawings, and project details with complete security.",
                "आरके स्टोन कॉर्पोरेशन जयपुर आपकी व्यक्तिगत जानकारी, आर्किटेक्चरल ड्राइंग और प्रोजेक्ट विवरण को पूरी ईमानदारी और सुरक्षा के साथ सुरक्षित रखता है।"
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Quick Navigation (Sticky on Desktop) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                
                <div className="bg-white border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-heading uppercase text-sm tracking-wider text-stone-950 font-semibold mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    {l("Policy Sections", "मुख्य बिंदु")}
                  </h3>

                  <nav className="space-y-1.5 text-xs font-mono">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                        activeTab === "all"
                          ? "bg-stone-950 text-white font-semibold"
                          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <span>{l("All Sections (Complete Policy)", "संपूर्ण गोपनीयता नीति")}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    </button>

                    {privacySections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setActiveTab(sec.id);
                          const el = document.getElementById(sec.id);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          activeTab === sec.id
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

                {/* Direct Privacy Officer Desk */}
                <div className="bg-stone-950 text-white p-6 border-l-4 border-accent shadow-md space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{l("DATA PROTECTION DESK", "डेटा सुरक्षा हेल्पडेस्क")}</span>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    {l(
                      "Need an official bilateral Non-Disclosure Agreement (NDA) executed before sharing monumental CAD designs or competitive tenders? Contact our office.",
                      "बड़े प्रोजेक्ट या टेंडर की ड्राइंग साझा करने से पहले यदि आप औपचारिक NDA साइन करवाना चाहते हैं, तो सीधे हमारे कार्यालय से संपर्क करें।"
                    )}
                  </p>
                  
                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-mono text-stone-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      <a href="tel:+919414784562" className="hover:text-white">+91 94147 84562</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      <a href="mailto:contact@rkstonecorporation.com" className="hover:text-white truncate">contact@rkstonecorporation.com</a>
                    </div>
                    <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Detailed Privacy Cards */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {l(
                    "Governed by the Digital Personal Data Protection Act (DPDP), 2023 of India. We uphold highest ethics in stone trade.",
                    "भारतीय डेटा सुरक्षा कानूनों (DPDP Act, 2023) के अनुसार संचालित। आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है।"
                  )}
                </span>
              </div>

              {privacySections
                .filter(sec => activeTab === "all" || activeTab === sec.id)
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

              {/* Bottom Assurance Card */}
              <div className="p-8 bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading uppercase text-stone-950 text-base font-normal">
                    {l("HAVE QUESTIONS ABOUT DATA CONFIDENTIALITY?", "डेटा सुरक्षा को लेकर कोई प्रश्न है?")}
                  </h3>
                  <p className="text-stone-500 text-xs font-light mt-1">
                    {l("Speak with our customer relations team in Jaipur.", "हमारी जयपुर कस्टमर सपोर्ट टीम से सीधे बात करें।")}
                  </p>
                </div>
                <Link to="/contact">
                  <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs tracking-wider px-6 py-5 rounded-none cursor-pointer">
                    {l("CONNECT WITH WORKSHOP", "वर्कशॉप से संपर्क करें")}
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