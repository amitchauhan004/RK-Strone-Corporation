import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  UploadCloud, 
  ShieldCheck, 
  Building2,
  FileText,
  X
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { API_URL } from "@/config/api";

export default function Contact() {
  const { l } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Sacred Stone Temple / Mandir",
    stonePreference: "Makrana White Marble",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; size: string; isImage: boolean; previewUrl?: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const combined = [...selectedFiles, ...incoming].slice(0, 5);
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
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedAttachments: { url: string; filename: string; fileType: string; size: number }[] = [];
      let uploadedPhotos: string[] = [];

      if (selectedFiles.length > 0) {
        try {
          const uploadData = new FormData();
          selectedFiles.forEach((file) => uploadData.append("files", file));
          const uploadRes = await fetch(`${API_URL}/api/upload-attachment`, {
            method: "POST",
            body: uploadData
          });
          if (uploadRes.ok) {
            const upJson = await uploadRes.json();
            if (upJson.files && Array.isArray(upJson.files)) {
              uploadedAttachments = upJson.files;
              uploadedPhotos = upJson.files
                .filter((f: any) => f.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.url))
                .map((f: any) => f.url);
            }
          }
        } catch (upErr) {
          console.warn("Attachment upload issue:", upErr);
        }
      }

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          stonePreference: formData.stonePreference,
          source: "Contact Page Form",
          message: formData.message,
          attachments: uploadedAttachments,
          photos: uploadedPhotos
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(l(
          "Inquiry received! Our team will connect within 24 hours.",
          "आपकी पूछताछ प्राप्त हो गई है! हमारी टीम 24 घंटे में संपर्क करेगी।"
        ));
        setSubmitted(true);
      } else {
        toast.error(data.error || l("Failed to submit inquiry. Please connect via WhatsApp.", "पूछताछ दर्ज नहीं हो सकी। कृपया व्हाट्सएप पर संपर्क करें।"));
      }
    } catch {
      setSubmitted(true);
      toast.success(l(
        "Inquiry received. Please confirm on WhatsApp for immediate review.",
        "पूछताछ प्राप्त हुई। त्वरित जानकारी के लिए व्हाट्सएप पर संपर्क करें।"
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Contact & Order Stone Work | RK Stone Corporation Jaipur",
          "संपर्क व पूछताछ | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Get in touch with Jaipur's master stone artisans. Submit drawings, get price estimates, or visit our Agra Road workshop.",
          "जयपुर में हमारे मुख्य कारीगरों से संपर्क करें। ड्राइंग भेजें, लागत का अनुमान लें या वर्कशॉप विजिट प्लान करें।"
        )}
        keywords="commission stone temple, contact stone supplier jaipur, custom mandir consultation, architectural stone quote, rk stone corporation jaipur contact"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/90 to-stone-950/60" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <Reveal direction="down">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("CONNECT WITH OUR CRAFTSMEN", "हमारे कारीगरों से संपर्क करें")} <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("in Sacred Natural Stone", "सुंदर प्राकृतिक पत्थरों के कार्य के लिए")}
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "Whether planning a marble temple, royal haveli restoration, or custom CNC stone screens, speak directly with our craftsmen and fabrication team in Jaipur.",
                "संगमरमर का मंदिर, हवेली का कार्य, या सीएनसी जाली बनवाने की योजना बना रहे हैं? जयपुर में हमारे अनुभवी कारीगरों से सीधे बात करें।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I would like to schedule a project consultation with your master stone artisan."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4" />
                  {l("INSTANT WHATSAPP CHAT", "व्हाट्सएप पर तुरंत बात करें")}
                </Button>
              </a>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <Phone className="mr-2 w-4 h-4 text-accent" />
                  {l("CALL US: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Form and Contact Details Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Project Inquiry Form */}
            <div className="lg:col-span-7">
              <Reveal direction="left">
                <div className="bg-white border border-stone-300 shadow-xl p-8 sm:p-12">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-heading font-normal uppercase text-stone-950 tracking-wide">
                      {l("SEND US YOUR REQUIREMENTS", "अपनी आवश्यकताएं हमें भेजें")}
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
                      {l(
                        "Our team will review your dimensions and stone choices within 24 hours.",
                        "हमारी टीम 24 घंटे के भीतर आपके नाप और पसंद के पत्थर की जानकारी देकर संपर्क करेगी।"
                      )}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="p-8 bg-stone-100 border border-accent/40 text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
                      <h3 className="text-xl font-heading font-medium uppercase text-stone-950">
                        {l("Inquiry Sent Successfully", "पूछताछ सफलतापूर्वक भेजी गई")}
                      </h3>
                      <p className="text-stone-700 text-sm max-w-md mx-auto">
                        {l(
                          `Thank you, ${formData.name}. Our master carver has received your inquiry for ${formData.projectType}. For immediate drawings review, please connect on WhatsApp.`,
                          `धन्यवाद, ${formData.name}! हमें ${formData.projectType} के लिए आपकी पूछताछ मिल गई है। तुरंत बातचीत के लिए कृपया व्हाट्सएप पर संपर्क करें।`
                        )}
                      </p>
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/919414784562?text=${encodeURIComponent(
                            `Hi RK Stone Corporation, ${formData.name} here. I just submitted an inquiry on your website for ${formData.projectType} (${formData.stonePreference}). Please connect.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-accent text-stone-950 hover:bg-accent/90 font-bold uppercase text-xs tracking-wider px-6 py-4 rounded-none cursor-pointer">
                            <WhatsAppIcon className="mr-2 w-4 h-4" />
                            {l("CONNECT ON WHATSAPP NOW", "व्हाट्सएप पर अभी बात करें")}
                          </Button>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                            {l("Your Full Name *", "आपका पूरा नाम *")}
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={l("e.g. Rajesh Sharma", "उदा. राजेश शर्मा")}
                            className="rounded-none bg-[#FAF8F5] border-stone-300 py-3 text-sm focus:border-stone-950"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                            {l("Phone / WhatsApp Number *", "फ़ोन / व्हाट्सएप नंबर *")}
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 94147 84562"
                            className="rounded-none bg-[#FAF8F5] border-stone-300 py-3 text-sm focus:border-stone-950"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                            {l("Email Address *", "ईमेल पता *")}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="yourname@gmail.com"
                            className="rounded-none bg-[#FAF8F5] border-stone-300 py-3 text-sm focus:border-stone-950"
                          />
                        </div>

                        <div>
                          <Label className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                            {l("What do you want to make? *", "आप क्या बनवाना चाहते हैं? *")}
                          </Label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                          >
                            <option value="Sacred Stone Temple / Mandir">{l("Sacred Stone Temple / Mandir", "पत्थर का मंदिर / होम मंदिर")}</option>
                            <option value="Heritage Haveli Facade / Carved Columns">{l("Heritage Haveli Facade / Carved Columns", "हवेली एलिवेशन / नक्काशीदार खंभे")}</option>
                            <option value="Contemporary CNC Stone Jalis / Panels">{l("Contemporary CNC Stone Jalis / Panels", "सीएनसी स्टोन जाली / वॉल पैनल")}</option>
                            <option value="Courtyard Water Fountain / Chhatri">{l("Courtyard Water Fountain / Chhatri", "वाटर फाउंटेन / पत्थर की छतरी")}</option>
                            <option value="Raw Quarry Sandstone Block Supply">{l("Raw Quarry Sandstone Block Supply", "सीधा कच्चा पत्थर सैंडस्टोन सप्लाई")}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                          {l("Preferred Stone Material", "पसंदीदा पत्थर")}
                        </Label>
                        <select
                          value={formData.stonePreference}
                          onChange={(e) => setFormData({ ...formData, stonePreference: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-stone-950"
                        >
                          <option value="Makrana White Marble">{l("Makrana White Marble (Pure Sangemarmar)", "मकराना सफेद संगमरमर (प्योर मार्बल)")}</option>
                          <option value="Bansi Paharpur Pink Sandstone">{l("Bansi Paharpur Pink Sandstone", "बंसी पहाड़पुर गुलाबी सैंडस्टोन")}</option>
                          <option value="Dholpur Beige Sandstone">{l("Royal Dholpur Beige Sandstone", "धौलपुर बेज / क्रीम सैंडस्टोन")}</option>
                          <option value="Jodhpur Red Sandstone">{l("Jodhpur Red Sandstone", "जोधपुर लाल सैंडस्टोन")}</option>
                          <option value="Gwalior Mint Sandstone">{l("Gwalior White Mint Sandstone", "ग्वालियर मिंट सैंडस्टोन")}</option>
                          <option value="Guide Me">{l("Guide Me Based on My Project", "सलाह दें कि कौन सा पत्थर सही रहेगा")}</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-xs font-body font-semibold uppercase tracking-wider text-stone-700 mb-2 block">
                          {l("Dimensions, City & Special Notes *", "नाप, शहर व जरूरी विवरण *")}
                        </Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={l(
                            "Specify your approximate dimensions (e.g. 6x4 ft mandir), installation city, ceiling heights, or preferences...",
                            "अनुमानित नाप (उदा. 6x4 फीट मंदिर), आपका शहर, ऊंचाई या कोई विशेष इच्छा लिखें..."
                          )}
                          className="rounded-none bg-[#FAF8F5] border-stone-300 text-sm focus:border-stone-950"
                        />
                      </div>

                      {/* Optional Photo or Drawing Attachment */}
                      <div className="p-4 bg-stone-50 border border-dashed border-stone-300 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <UploadCloud className="w-5 h-5 text-accent" />
                            <div>
                              <div className="text-xs font-semibold uppercase text-stone-900">
                                {l("Attach Photos, Sketch or Plan (Optional)", "फोटो, स्केच या ड्राइंग संलग्न करें (वैकल्पिक)")}
                              </div>
                              <div className="text-[11px] text-stone-500">
                                {l("Attach photos of your site, space, or reference design.", "अपनी साइट, स्थान या पसंदीदा डिज़ाइन की फोटो चुनें।")}
                              </div>
                            </div>
                          </div>
                          <label className="bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase px-3.5 py-2 cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                            <UploadCloud className="w-3.5 h-3.5 text-accent" />
                            {l("Choose Photos", "फोटो चुनें")}
                            <input
                              type="file"
                              multiple
                              accept="image/*,.pdf,.dwg,.zip"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {filePreviews.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-200">
                            {filePreviews.map((item, idx) => (
                              <div key={idx} className="relative group p-2 bg-white border border-stone-300 shadow-2xs flex flex-col items-center text-center">
                                {item.isImage && item.previewUrl ? (
                                  <img src={item.previewUrl} alt={item.name} className="w-full h-16 object-cover mb-1 border border-stone-200" />
                                ) : (
                                  <div className="w-full h-16 bg-stone-100 flex flex-col items-center justify-center text-stone-600 mb-1">
                                    <FileText className="w-5 h-5 text-stone-400" />
                                  </div>
                                )}
                                <span className="text-[10px] font-medium text-stone-900 truncate w-full" title={item.name}>{item.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="absolute -top-1 -right-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-0.5 shadow-sm cursor-pointer"
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
                          {l("PAN-INDIA DELIVERY • CUSTOM SIZING AVAILABLE", "पूरे भारत में सुरक्षित डिलीवरी • मनचाहा साइज उपलब्ध")}
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          size="lg"
                          className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer"
                        >
                          {loading ? l("SENDING...", "भेजा जा रहा है...") : l("SUBMIT FOR ESTIMATE", "अनुमानित लागत मांगें")}
                          <ArrowRight className="ml-2 w-4 h-4 text-accent" />
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right: Workshop Details & Interactive Google Map */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal direction="right">
                <div className="bg-white border border-stone-300 p-8 shadow-sm space-y-6">
                  <div className="space-y-4 text-sm text-stone-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                      <div>
                        <strong className="text-stone-950 block">
                          {l("Jaipur Workshop & Carving Yards:", "जयपुर वर्कशॉप व निर्माण केंद्र:")}
                        </strong>
                        {siteSettings.workshopAddress || l(
                          "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India",
                          "सूर्य सिटी के सामने, पालड़ी मीणा, आगरा रोड, जयपुर 302031, राजस्थान, भारत"
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                      <div>
                        <strong className="text-stone-950 block">
                          {l("Phone / Call:", "फ़ोन / कॉल:")}
                        </strong>
                        <a href={`tel:${siteSettings.primaryPhone || '+919414784562'}`} className="text-stone-900 hover:text-accent font-semibold">
                          {siteSettings.primaryPhone || "+91 94147 84562"}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-accent shrink-0 mt-1" />
                      <div>
                        <strong className="text-stone-950 block">
                          {l("Email:", "ईमेल:")}
                        </strong>
                        <a href={`mailto:${siteSettings.email || 'contact@rkstonecorporation.com'}`} className="text-stone-900 hover:text-accent">
                          {siteSettings.email || "contact@rkstonecorporation.com"}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent shrink-0 mt-1" />
                      <div>
                        <strong className="text-stone-950 block">
                          {l("Opening Hours:", "खुलने का समय:")}
                        </strong>
                        {siteSettings.workingHours || l(
                          "Monday – Sunday: 8:00 AM – 7:30 PM (All 7 Days)",
                          "सोमवार – रविवार: सुबह 8:00 से शाम 7:30 बजे तक (सातों दिन)"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <span className="text-[11px] font-body font-semibold uppercase tracking-wider text-stone-500 block">
                      {l("GST REGISTRATION NUMBER", "जीएसटी नंबर (GSTIN)")}
                    </span>
                    <span className="font-body text-sm font-bold text-stone-950 tracking-wider">
                      {siteSettings.gstNumber || "08CUUPS3588K1ZE"}
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Live Google Map */}
              <Reveal direction="right" delay={200}>
                <div className="bg-white border border-stone-300 p-2 shadow-sm overflow-hidden">
                  <div className="aspect-[4/3] w-full">
                    <iframe
                      title="RK Stone Corporation Location"
                      src={siteSettings.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin"}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
