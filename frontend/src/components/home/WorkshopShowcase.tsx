import { Link } from "react-router-dom";
import { MapPin, Phone, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WorkshopShowcase() {
  const { l } = useLanguage();

  const workshopHighlights = [
    {
      title: l("Direct Quarry Stone Blocks", "खदानों से सीधा पत्थर"),
      description: l(
        "We source direct from Makrana, Dholpur, Bansi Paharpur and Gwalior quarries with no middleman markup.",
        "मकराना, धौलपुर, बंसी पहाड़पुर और ग्वालियर खदानों से सीधा पत्थर बिना किसी बिचौलिए के।"
      ),
    },
    {
      title: l("Traditional Master Sculptors", "पारंपरिक कुशल कारीगर"),
      description: l(
        "Skilled Sompura artisans specializing in temple carving, pillars, and haveli architecture.",
        "मंदिर निर्माण, स्तंभों और हवेली नक्काशी में माहिर अनुभवी सोमपुरा कारीगर।"
      ),
    },
    {
      title: l("Modern CNC Stone Cutting", "आधुनिक सीएनसी कटिंग"),
      description: l(
        "Computer-guided precision carving combined with fine hand finishing for clean edges and intricate detail.",
        "कंप्यूटर आधारित बारीक नक्काशी और कुशल हाथों द्वारा उत्कृष्ट फिनिशिंग।"
      ),
    },
    {
      title: l("Safe Wooden Packing & India-Wide Delivery", "सुरक्षित पैकिंग व पूरे भारत में डिलीवरी"),
      description: l(
        "Heavy-duty wooden crates and cushioned packing so your carved stone arrives safely anywhere in India.",
        "मजबूत लकड़ी के बॉक्स में सुरक्षित पैकिंग ताकि पत्थर बिना किसी नुकसान के सुरक्षित पहुंचे।"
      ),
    },
  ];

  const workshopPhotos = [
    { src: "/products/Stone%20Temple/1.jpg", caption: l("Temple Hand Carving", "मंदिर की नक्काशी") },
    { src: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_f84e85b8.jpg", caption: l("Carved Haveli Pillars", "हवेली के खंभे") },
    { src: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_c234b1e6.jpg", caption: l("Grand Stone Gate", "भव्य पत्थर का द्वार") },
    { src: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_35e2112e.jpg", caption: l("3D CNC Stone Jali", "3D सीएनसी जाली") },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Narrative & Credentials */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("EXPERIENCED CARVERS & MODERN MACHINERY", "पारंपरिक कारीगरी और आधुनिक तकनीक")}
              </h2>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed">
                {l(
                  "RK Stone Corporation is not a middleman or retail shop. We are a direct stone carving workshop based in Jaipur, Rajasthan. For over 40 years, our team of master craftsmen has hand-carved temples, royal chhatris, stone jalis, and haveli facades for homes and projects across India.",
                  "आर.के. स्टोन कॉर्पोरेशन कोई बिचौलिया या ट्रेडिंग दुकान नहीं है। हम जयपुर, राजस्थान में सीधे पत्थर के निर्माता और वर्कशॉप हैं। पिछले 4 दशकों से हमारे कारीगर पूरे भारत में मंदिरों, छतरियों, जालियों और हवेलियों के लिए पत्थर तराशने का काम कर रहे हैं।"
                )}
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.25}>
              <div className="space-y-4 pt-2">
                {workshopHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal direction="up" delay={0.35}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://maps.google.com/?q=RK+Stone+Corporation+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs sm:text-sm tracking-wider px-7 py-6 rounded-none cursor-pointer shadow-md">
                    <MapPin className="mr-2 w-4 h-4 text-accent" />
                    {l("VISIT OUR JAIPUR WORKSHOP", "जयपुर वर्कशॉप पर आएं")}
                  </Button>
                </a>

                <a
                  href={`https://wa.me/919414784562?text=${encodeURIComponent(
                    "Hello RK Stone Corporation, I would like to schedule a 15-minute live WhatsApp video tour of your Jaipur workshop and raw stone blocks."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-stone-400 text-stone-900 hover:bg-stone-200 uppercase text-xs sm:text-sm tracking-wider px-6 py-6 rounded-none cursor-pointer"
                  >
                    <WhatsAppIcon className="mr-2 w-4 h-4 text-[#25D366]" />
                    {l("SCHEDULE VIDEO CALL", "वीडियो कॉल पर देखें")}
                  </Button>
                </a>
              </div>
            </Reveal>

          </div>

          {/* Right: 4-Grid Authentic Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {workshopPhotos.map((photo, pIdx) => (
              <Reveal key={pIdx} direction="right" delay={0.1 * (pIdx + 1)}>
                <div className="relative aspect-square bg-stone-900 overflow-hidden border border-stone-300 shadow-md group">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white drop-shadow-sm">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
