import { useState } from "react";
import { 
  Building2, 
  Ruler, 
  FileCode, 
  CheckCircle2, 
  Download, 
  UploadCloud, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  HardHat,
  Cpu,
  FileText,
  X,
  Image as ImageIcon
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { API_URL } from "@/config/api";
import { toast } from "sonner";
import workshopImg from "@/assets/about-workshop.jpg";
import haveliImg from "@/assets/Heritage-Haveli.jpg";
import jaliImg from "@/assets/wall-panel.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Architects() {
  const { l } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; size: string; isImage: boolean; previewUrl?: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    firm: "",
    email: "",
    phone: "",
    projectType: "Private Luxury Residence / Villa",
    projectLocation: "",
    stoneRequirement: "Custom Temple / Haveli Elevation / CNC Jalis",
    estimatedArea: "",
    notes: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const combined = [...selectedFiles, ...incoming].slice(0, 10);
    setSelectedFiles(combined);

    const previews = combined.map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      isImage: f.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name),
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined
    }));
    setFilePreviews(previews);
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error(l("Please enter your name and phone number.", "कृपया अपना नाम और फ़ोन नंबर दर्ज करें।"));
      return;
    }
    setSubmitting(true);
    try {
      let uploadedAttachments: { url: string; filename: string; fileType: string; size: number }[] = [];
      let uploadedPhotos: string[] = [];

      // If user selected files, upload them to the server first
      if (selectedFiles.length > 0) {
        try {
          const uploadFormData = new FormData();
          selectedFiles.forEach((file) => {
            uploadFormData.append("files", file);
          });
          const uploadRes = await fetch(`${API_URL}/api/upload-attachment`, {
            method: "POST",
            body: uploadFormData
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            if (uploadData.files && Array.isArray(uploadData.files)) {
              uploadedAttachments = uploadData.files;
              uploadedPhotos = uploadData.files
                .filter((f: any) => f.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.url))
                .map((f: any) => f.url);
            }
          } else {
            console.warn("Upload failed, proceeding with text inquiry.");
          }
        } catch (uploadErr) {
          console.warn("Attachment upload network error:", uploadErr);
        }
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: "Architect Trade Partnership",
        projectType: `Architect Collab: ${formData.projectType}`,
        stonePreference: formData.stoneRequirement || "Architectural Stone",
        city: formData.projectLocation,
        dimensions: formData.estimatedArea,
        message: `Architect Project & Trade Partnership Request. Firm: ${formData.firm}. Project Type: ${formData.projectType}. Location: ${formData.projectLocation}. Approx Area: ${formData.estimatedArea || 'N/A'}. Requirement: ${formData.stoneRequirement}. Notes: ${formData.notes || 'None'}`,
        attachments: uploadedAttachments,
        photos: uploadedPhotos
      };
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success(l("Trade partnership request & drawings submitted! Our technical team will connect within 2 hours.", "आर्किटेक्ट पार्टनरशिप अनुरोध व ड्राइंग दर्ज हो गई है! हमारी तकनीकी टीम शीघ्र संपर्क करेगी।"));
        setSubmitted(true);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || l("Failed to submit. Please WhatsApp directly.", "दर्ज नहीं हो सका। कृपया व्हाट्सएप पर संपर्क करें।"));
      }
    } catch {
      toast.error(l("Network error. Please connect directly via WhatsApp.", "नेटवर्क समस्या। कृपया व्हाट्सएप पर संपर्क करें।"));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const technicalServices = [
    {
      icon: Cpu,
      title: l("5-Axis CNC Precision + Hand Carving", "5-एक्सिस सीएनसी कटिंग व हाथ की नक्काशी"),
      description: l(
        "Our Jaipur facility operates multi-axis computer-controlled saws paired with experienced artisans to execute 3D curves with millimeter precision.",
        "हमारी जयपुर वर्कशॉप में आधुनिक सीएनसी मशीनें और अनुभवी कारीगर मिलकर 3D डिज़ाइन और जालियों को सटीक नाप में तैयार करते हैं।"
      )
    },
    {
      icon: Ruler,
      title: l("Dry Cladding & Structural Anchors", "ड्राई क्लैडिंग व एसएस क्लैंप्स"),
      description: l(
        "Complete engineering drawings for stainless steel SS-304/316 undercut anchor systems, dead-load calculations, and expansion joint detailing.",
        "मजबूत स्टेनलेस स्टील एसएस-304 क्लैंप सिस्टम और सुरक्षा मानकों के अनुसार सुरक्षित क्लैडिंग की पूरी सुविधा।"
      )
    },
    {
      icon: FileCode,
      title: l("BIM / CAD / Rhino Integration", "CAD व 3D डिज़ाइन सहयोग"),
      description: l(
        "Send us your 2D DWG elevations or 3D Rhino/SketchUp models. Our draftsmen return shop-drawings and stone cutting schedules within 48 hours.",
        "हमें अपने CAD प्लान या 3D मॉडल भेजें। हमारी ड्राफ्ट्समैन टीम 48 घंटे में स्टोन कटिंग प्लान और कोटेशन प्रदान करती है।"
      )
    },
    {
      icon: HardHat,
      title: l("Pan-India On-Site Installation", "पूरे भारत में सुरक्षित फिटिंग"),
      description: l(
        "We dispatch our master Rajasthani stone fitters and supervisors on-site across India for seamless turnkey handover.",
        "हम सिर्फ पत्थर सप्लाई नहीं करते, बल्कि हमारे कुशल कारीगर भारत के किसी भी शहर में जाकर साइट पर पूरी फिटिंग करते हैं।"
      )
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: l("Architectural Drawing Review", "ड्राइंग व प्लान समीक्षा"),
      description: l(
        "Submit your architectural drawings or CAD elevations. Our engineers review wall thickness, stone load, and relief depths.",
        "अपने प्लान या ड्राइंग भेजें। हमारे इंजीनियर पत्थर के वजन, मोटाई और नक्काशी की गहराई की जांच करते हैं।"
      )
    },
    {
      step: "02",
      title: l("Quarry Block Selection", "खदान से पत्थर चयन"),
      description: l(
        "We hand-select solid stone blocks at Dholpur, Bansi Paharpur, or Karauli quarries. Inspect blocks in-person or via live video call.",
        "धौलपुर, बंसी पहाड़पुर या करौली खदान से मजबूत पत्थर चुने जाते हैं। आप व्यक्तिगत रूप से या लाइव वीडियो कॉल पर ब्लॉक देख सकते हैं।"
      )
    },
    {
      step: "03",
      title: l("1:1 Prototype & Mockup", "सैंपल व प्रोटोटाइप"),
      description: l(
        "For complex jali screens, temple columns, or haveli arches, we produce a 1:1 scale physical mockup for your sign-off.",
        "जटिल जाली या खंभों के लिए बड़े काम से पहले संतुष्टि हेतु 1:1 स्केल का असली सैंपल तैयार किया जाता है।"
      )
    },
    {
      step: "04",
      title: l("Precision Carving & QC", "सटीक कटिंग व नक्काशी"),
      description: l(
        "Stone pieces undergo precision CNC profiling, fine chisel detailing by hand, and rigorous dry-assembly checks.",
        "सीएनसी कटिंग और हाथ की नक्काशी के बाद कारखाने में जोड़ मिलाकर पूरी जांच की जाती है।"
      )
    },
    {
      step: "05",
      title: l("Numbered Crating & Site Erection", "पैकिंग व ऑन-साइट फिटिंग"),
      description: l(
        "Every stone unit is numbered, securely packed in wooden boxes, and installed on-site by our expert team.",
        "हर पत्थर को नंबर देकर मजबूत लकड़ी के बॉक्स में सुरक्षित भेजा जाता है और साइट पर सटीक फिटिंग की जाती है।"
      )
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "For Architects & Interior Designers | RK Stone Corporation Jaipur",
          "आर्किटेक्ट्स व डिज़ाइनर्स के लिए | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Collaborate with Jaipur's premier direct architectural stone workshop. 5-axis CNC carving, CAD conversion, and turnkey on-site installation across India.",
          "आर्किटेक्ट्स और बिल्डर्स के लिए विशेष सुविधा: सीएनसी स्टोन कटिंग, CAD ड्राइंग सहयोग और पूरे भारत में ऑन-साइट फिटिंग।"
        )}
        keywords="architectural stone manufacturer jaipur, stone dry cladding engineering, cad dwg stone carving, stone temple architect partner, cnc stone screen fabrication"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${workshopImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("BRINGING YOUR DESIGNS TO LIFE IN", "आपके डिज़ाइनों को साकार करते हैं")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Handcrafted Natural Stone", "सुंदर प्राकृतिक पत्थरों में")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "We partner with leading architectural studios, landscape designers, and builders across India to translate complex CAD designs into timeless stone craftsmanship.",
                "हम पूरे भारत के प्रमुख आर्किटेक्ट्स और बिल्डर्स के साथ मिलकर उनके CAD और 3D डिज़ाइनों को प्राकृतिक पत्थरों में वास्तविकता का रूप देते हैं।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#blueprint-upload">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("SUBMIT YOUR DRAWING OR PLAN", "ड्राइंग / CAD प्लान भेजें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a 
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I am an architect and would like to discuss technical stone specifications for an ongoing project."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP ARCHITECT DESK", "व्हाट्सएप आर्किटेक्ट डेस्क")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Technical Capabilities Matrix */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("PRECISION CUTTING & TRADITIONAL CARVING", "सटीक मशीनिंग व पारंपरिक नक्काशी")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "From facade engineering to large temples, our Jaipur workshop combines modern CNC machines with the hand-carving skill of traditional artisans.",
                  "एलिवेशन से लेकर भव्य मंदिरों तक, हमारी जयपुर वर्कशॉप आधुनिक मशीनों और कुशल कारीगरों की बारीक नक्काशी का बेहतरीन संतुलन पेश करती है।"
                )}
              </p>
            </Reveal>
          </div>

          {/* 4 Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalServices.map((svc, i) => (
              <Reveal 
                key={i}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={0.1 * (i % 2 + 1)}
              >
                <div className="h-full p-8 sm:p-10 bg-white border border-stone-200/90 shadow-sm hover:border-accent transition-all duration-300">
                  <div className="w-12 h-12 bg-stone-950 text-accent flex items-center justify-center mb-6">
                    <svc.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-medium text-xl uppercase tracking-wide text-stone-950 mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-stone-700 font-light text-sm sm:text-base leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* The 5-Step Architect Workflow */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal direction="down" duration={0.8} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-white tracking-wide leading-tight">
              {l("FROM BLUEPRINT TO ON-SITE COMPLETION", "ड्राइंग से लेकर साइट पर फिटिंग तक")}
            </h2>
          </Reveal>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workflowSteps.map((step, idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "up", "right"];
              return (
                <Reveal 
                  key={idx}
                  direction={directions[idx] || "up"}
                  delay={idx * 0.1}
                >
                  <div className="h-full p-6 bg-white/5 border border-white/10 flex flex-col justify-between hover:border-accent/50 transition-colors">
                    <div>
                      <span className="font-body text-3xl font-bold text-accent block mb-4">
                        {step.step}
                      </span>
                      <h3 className="font-heading font-medium text-base uppercase text-white tracking-wide mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-xs font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* Blueprint & CAD Submission Form */}
      <section id="blueprint-upload" className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" duration={0.85} className="max-w-4xl mx-auto bg-white border border-stone-300 shadow-xl p-8 sm:p-14">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide">
                {l("SUBMIT ARCHITECTURAL DRAWINGS & PLANS", "अपनी ड्राइंग व प्लान हमें भेजें")}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light mt-3 max-w-xl mx-auto">
                {l(
                  "Share your CAD drawings, 3D models, or dimensions. Our fabrication team will provide a stone schedule and estimate within 2 business days.",
                  "अपने CAD प्लान, 3D रेंडर या नाप शेयर करें। हमारी टीम 2 दिनों में स्टोन शेड्यूल और लागत का अनुमान देगी।"
                )}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-stone-100 border border-accent/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
                <h3 className="text-xl font-heading font-medium uppercase text-stone-950">
                  {l("Drawings Received Successfully", "ड्राइंग सफलतापूर्वक प्राप्त हुईं")}
                </h3>
                <p className="text-stone-700 text-sm max-w-md mx-auto">
                  {l(
                    `Thank you, ${formData.name} (${formData.firm}). Our chief fabrication team has received your details and will connect via WhatsApp.`,
                    `धन्यवाद, ${formData.name}! हमारी टीम आपके प्रोजेक्ट विवरण का अध्ययन कर शीघ्र संपर्क करेगी।`
                  )}
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/919414784562?text=${encodeURIComponent(
                      `Hi RK Stone Corporation, Ar. ${formData.name} from ${formData.firm} here. I just submitted drawings for ${formData.projectType}. Please connect with your fabrication team.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-accent text-stone-950 hover:bg-accent/90 font-bold uppercase text-xs tracking-wider px-6 py-4 rounded-none cursor-pointer">
                      <WhatsAppIcon className="mr-2 w-4 h-4" />
                      {l("CHAT ON WHATSAPP FOR QUICK REVIEW", "व्हाट्सएप पर तुरंत समीक्षा करें")}
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Principal Architect / Contact Name *", "आर्किटेक्ट / संपर्ककर्ता का नाम *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={l("e.g. Ar. Ananya Sharma", "उदा. आर्किटेक्ट अनन्या शर्मा")}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Studio / Firm Name *", "स्टूडियो / फर्म का नाम *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firm}
                      onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                      placeholder={l("e.g. Sharma Architects & Associates", "उदा. शर्मा आर्किटेक्ट्स")}
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
                      placeholder="studio@architects.com"
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
                      {l("Project Type", "प्रोजेक्ट का प्रकार")}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    >
                      <option value="Private Luxury Residence / Villa">{l("Private Luxury Residence / Villa", "प्राइवेट विला / लक्जरी कोठी")}</option>
                      <option value="Sacred Temple / Religious Complex">{l("Sacred Temple / Religious Complex", "पत्थर का मंदिर / धार्मिक स्थल")}</option>
                      <option value="Heritage Haveli / Resort">{l("Heritage Haveli / Resort", "हवेली / हेरिटेज होटल")}</option>
                      <option value="Commercial High-Rise Facade">{l("Commercial Facade / CNC Jalis", "कमर्शियल एलिवेशन / सीएनसी जाली")}</option>
                      <option value="Courtyard & Landscape">{l("Courtyard & Landscape", "आंगन व लैंडस्केप")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      {l("Project Location (City, State) *", "प्रोजेक्ट का स्थान (शहर, राज्य) *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder={l("e.g. Udaipur, Delhi, Mumbai, Jaipur", "उदा. उदयपुर, दिल्ली, मुंबई, जयपुर")}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    {l("Scope of Work & Notes", "कार्य का विवरण व विशेष आवश्यकताएं")}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={l(
                      "Specify stone preference (Dholpur Sandstone, Red Sandstone, Bansi Paharpur), dimensions, heights, or queries...",
                      "पत्थर की पसंद (धौलपुर सैंडस्टोन, लाल सैंडस्टोन, बंसी पहाड़पुर), अनुमानित नाप, ऊंचाई आदि लिखें..."
                    )}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                  />
                </div>

                <div className="p-4 sm:p-5 bg-stone-50 border-2 border-dashed border-stone-300 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 text-stone-900 flex items-center justify-center">
                        <UploadCloud className="w-5 h-5 text-stone-900" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-stone-900">
                          {l("Attach Drawings, Photos or CAD (PDF, DWG, Images, or ZIP)", "ड्राइंग या फोटो संलग्न करें (PDF, DWG, फोटो या ZIP)")}
                        </div>
                        <div className="text-[11px] text-stone-500 font-body tracking-wider">
                          {l("Select photos or drawings (up to 10 files). Will be shown in Admin Panel immediately.", "अधिकतम 10 फोटो या फाइलें चुनें। एडमिन पैनल में तुरंत दिखाई देंगी।")}
                        </div>
                      </div>
                    </div>
                    <label className="bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 cursor-pointer transition-colors inline-flex items-center gap-2">
                      <UploadCloud className="w-3.5 h-3.5 text-accent" />
                      {l("Choose Files / Photos", "फाइल / फोटो चुनें")}
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.dwg,.dxf,.zip,.rar"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Selected files preview strip */}
                  {filePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-3 border-t border-stone-200">
                      {filePreviews.map((item, idx) => (
                        <div key={idx} className="relative group p-2 bg-white border border-stone-300 shadow-sm flex flex-col items-center text-center">
                          {item.isImage && item.previewUrl ? (
                            <img src={item.previewUrl} alt={item.name} className="w-full h-20 object-cover mb-1.5 border border-stone-200" />
                          ) : (
                            <div className="w-full h-20 bg-stone-100 flex flex-col items-center justify-center text-stone-600 mb-1.5">
                              <FileText className="w-6 h-6 text-stone-400" />
                              <span className="text-[9px] font-mono uppercase mt-1">Document</span>
                            </div>
                          )}
                          <span className="text-[11px] font-medium text-stone-900 truncate w-full" title={item.name}>{item.name}</span>
                          <span className="text-[10px] font-mono text-stone-500">{item.size}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute -top-1.5 -right-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-1 shadow-md cursor-pointer"
                            title="Remove file"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-stone-200">
                  <div className="text-xs text-stone-500 font-body tracking-wider">
                    {l("CONFIDENTIAL ARCHITECTURAL SPECIFICATION DESK", "आपकी ड्राइंग व जानकारी पूरी तरह सुरक्षित रहेगी")}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer disabled:opacity-50"
                  >
                    {submitting
                      ? l("TRANSMITTING SPECIFICATION...", "भेजा जा रहा है...")
                      : l("SUBMIT FOR ESTIMATE", "अनुमानित लागत मांगें")}
                    <ArrowRight className="ml-2 w-4 h-4 text-accent" />
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
