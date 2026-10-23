import { Link } from "react-router-dom";
import { MessageSquare, Ruler, Hammer, Truck, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CustomOrderProcess() {
  const { language, l } = useLanguage();

  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: l("Share Your Drawing or Photo", "अपना डिज़ाइन या फोटो भेजें"),
      description: l(
        "Send a photo, architectural CAD drawing, or hand sketch on WhatsApp. We review your sizing and provide an immediate free estimate.",
        "कोई भी फोटो, आर्किटेक्ट ड्राइंग या रफ स्केच व्हाट्सएप पर भेजें। हम साइज देखकर तुरंत बजट बताएंगे।"
      ),
      badge: l("Step 1 • Initial Contact", "चरण 1 • शुरुआत"),
    },
    {
      step: "02",
      icon: Ruler,
      title: l("Stone Selection & Size Approval", "पत्थर व साइज फाइनल करें"),
      description: l(
        "Choose your preferred stone: Gwalior, Dhaulpur, Bansi Paharpur, or Makrana Marble. We finalize exact dimensions before carving.",
        "ग्वालियर, धौलपुर, बंसी पहाड़पुर या मकराना मार्बल में से पत्थर चुनें। नक्काशी से पहले नाप फाइनल होगा।"
      ),
      badge: l("Step 2 • Material & Drawing", "चरण 2 • पत्थर व ड्राइंग"),
    },
    {
      step: "03",
      icon: Hammer,
      title: l("Artisan Carving & Workshop Trial", "कारीगरी व वर्कशॉप ट्रायल"),
      description: l(
        "Our Jaipur artisans chisel your piece with traditional tools and precision CNC. We assemble it at our yard to ensure perfect fit.",
        "हमारे अनुभवी कारीगर नक्काशी करते हैं। कारखाने में जोड़ मिलाकर ट्रायल किया जाता है ताकि फिटिंग बिल्कुल सही हो।"
      ),
      badge: l("Step 3 • Fabrication", "चरण 3 • नक्काशी"),
    },
    {
      step: "04",
      icon: Truck,
      title: l("Crated Delivery & Installation", "सुरक्षित डिलीवरी व फिटिंग"),
      description: l(
        "Every stone block is packed in foam-lined wooden crates and delivered across India, with on-site fitting guidance.",
        "मजबूत लकड़ी के बक्सों में सुरक्षित पैकिंग करके पूरे भारत में डिलीवरी और साइट फिटिंग सहायता दी जाती है।"
      ),
      badge: l("Step 4 • Safe Delivery", "चरण 4 • सुरक्षित डिलीवरी"),
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <Reveal direction="down">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight mb-4">
              {l("EASY 4-STEP ORDER PROCESS", "कस्टम ऑर्डर करने के 4 आसान चरण")}
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {l(
                "Ordering custom stone architectural work is simple. We keep you updated at each stage with photos and video calls.",
                "कस्टम पत्थर का काम ऑर्डर करना बहुत आसान है। हर चरण पर आपको फोटो और वीडियो अपडेट मिलते हैं।"
              )}
            </p>
          </Reveal>
        </div>

        {/* 4 Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} direction="up" delay={0.1 * (idx + 1)}>
                <div className="relative h-full bg-[#FAF8F5] border border-stone-200 p-7 flex flex-col justify-between group hover:border-accent hover:shadow-xl transition-all duration-300">
                  
                  {/* Top Step Counter & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl sm:text-5xl font-heading font-light text-stone-300 group-hover:text-accent transition-colors">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-none bg-stone-900 text-accent flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-accent tracking-widest uppercase mb-1">
                      {item.badge}
                    </div>

                    <h3 className="text-lg font-heading font-medium uppercase text-stone-950 tracking-wide mb-3 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Step bottom accent line */}
                  <div className="pt-6 mt-4 border-t border-stone-200/80 flex items-center gap-1.5 text-[11px] font-medium text-stone-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Quality Certified Step</span>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Bar */}
        <Reveal direction="up" delay={0.3}>
          <div className="mt-14 p-6 sm:p-8 bg-stone-100 border border-stone-300 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-bold tracking-wider uppercase text-stone-500">
                NO DRAWING READY? NO WORRIES!
              </div>
              <h4 className="text-xl font-heading uppercase text-stone-950">
                Sirf Apni Jagah Ka Size & Photo Bhejein
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 font-light">
                Hamare stone architect aapko 3D design aur pathar ke suggestions free of cost provide karenge.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hello RK Stone Corporation, I want to discuss a custom stone project. Please share how we can start the design consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs sm:text-sm tracking-wider px-7 py-6 rounded-none cursor-pointer shadow-md">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  START CUSTOM PROJECT
                </Button>
              </a>
              <Link to="/architects">
                <Button
                  variant="outline"
                  className="border-stone-400 text-stone-900 hover:bg-stone-200 uppercase text-xs sm:text-sm tracking-wider px-6 py-6 rounded-none cursor-pointer"
                >
                  FOR ARCHITECTS
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
