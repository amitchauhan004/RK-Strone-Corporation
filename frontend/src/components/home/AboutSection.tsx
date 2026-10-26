import { Link } from "react-router-dom";
import { User, Calendar, Users, Briefcase, ArrowRight, MapPin, Building, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";
import aboutWorkshop from "@/assets/about-workshop.jpg";

export function AboutSection() {
  const { l } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] text-stone-900 relative overflow-hidden border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Brand Logo with Decorative Gold Outline Frame */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="left" duration={0.8}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative offset frame */}
                <div className="absolute -inset-3 sm:-inset-4 rounded-2xl border-2 border-accent/40 translate-x-3 translate-y-3 pointer-events-none" />
                
                {/* Main Logo Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-white via-white to-stone-50 aspect-[4/3] sm:aspect-[5/4] border border-stone-200 flex flex-col items-center justify-center p-6 sm:p-10 text-center group">
                  <div className="w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 my-auto">
                    <img
                      src={logo}
                      alt="RK Stone Corporation Official Logo"
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  
                  {/* Badge below logo */}
                  <div className="w-full pt-4 border-t border-stone-200 text-stone-700 text-xs font-body tracking-wide">
                    <div className="text-accent uppercase tracking-widest text-[10px] mb-1 font-mono font-bold">
                      {l("JAIPUR WORKSHOP & HEADQUARTERS", "जयपुर वर्कशॉप व मुख्यालय")}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-stone-900">
                      {l("Front of Surya City, Paldi Meena, Agra Road, Jaipur, Rajasthan", "सूर्य सिटी के सामने, पालड़ी मीणा, आगरा रोड, जयपुर, राजस्थान")}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: About Details and Credentials Grid */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="right" duration={0.8}>
              {/* Heading with Accent Bar */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-8 bg-accent rounded-full shrink-0" />
                <h2 className="text-2xl sm:text-4xl font-heading font-normal uppercase tracking-wide text-stone-950">
                  {l("About RK Stone Corporation", "आरके स्टोन कॉर्पोरेशन के बारे में")}
                </h2>
              </div>
            </Reveal>

            {/* Main Narrative Text */}
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-700 font-light text-sm sm:text-base leading-relaxed">
                {l(
                  "RK Stone Corporation, established in 2009, is a renowned Manufacturer and Supplier of premium sandstone products based in Rajasthan, India. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, and Dholpur Sandstone Temples that reflect timeless Indian architecture. Its diverse product range includes Sandstone Grills, Lamps, Gazebos, Fountains, Garden Benches, Planters, and Decorative Sandstone Spheres.",
                  "आरके स्टोन कॉर्पोरेशन, 2009 में स्थापित, राजस्थान में प्रीमियम सैंडस्टोन उत्पादों का एक प्रतिष्ठित निर्माता और आपूर्तिकर्ता है। कंपनी उत्कृष्ट सैंडस्टोन मंदिर, मंदिर प्रवेश द्वार और धौलपुर सैंडस्टोन मंदिर तराशने में माहिर है जो कालातीत भारतीय वास्तुकला को दर्शाते हैं। हमारी विविध उत्पाद श्रृंखला में सैंडस्टोन जाली/ग्रिल, लैंप, गज़ेबो/छतरियां, वाटर फाउंटेन, गार्डन बेंच, प्लांटर्स और नक्काशीदार स्टोन बॉल्स शामिल हैं।"
                )}
              </p>
            </Reveal>

            {/* View More CTA Button */}
            <Reveal direction="up" delay={0.25}>
              <Link to="/about">
                <Button className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase tracking-wider text-xs px-7 py-5 rounded-none shadow-gold transition-all duration-300 group cursor-pointer">
                  {l("View more", "और अधिक जानें")}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </Reveal>

            {/* Corporate Profile Matrix (4 Key Highlights from Client Docs) */}
            <Reveal direction="up" delay={0.35}>
              <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Name of Founder */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-accent/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      {l("Name of Founder", "संस्थापक का नाम")}
                    </div>
                    <div className="text-sm font-heading font-medium text-stone-950 mt-0.5">
                      {l("Mr. Rajendra Saini", "श्री राजेंद्र सैनी")}
                    </div>
                  </div>
                </div>

                {/* 2. Year of Establishment */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-accent/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      {l("Year of Establishment", "स्थापना वर्ष")}
                    </div>
                    <div className="text-sm font-heading font-medium text-stone-950 mt-0.5">
                      2009
                    </div>
                  </div>
                </div>

                {/* 3. Number of Employees */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-accent/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      {l("Number of Employees", "कारीगर व कर्मचारी")}
                    </div>
                    <div className="text-sm font-heading font-medium text-stone-950 mt-0.5">
                      {l("20 Employees", "20 कुशल कारीगर व स्टाफ")}
                    </div>
                  </div>
                </div>

                {/* 4. Nature of Business */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-accent/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                      {l("Nature of Business", "व्यवसाय का प्रकार")}
                    </div>
                    <div className="text-sm font-heading font-medium text-stone-950 mt-0.5">
                      {l("Manufacturer, Supplier", "निर्माता व आपूर्तिकर्ता")}
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Trust Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-600 font-light">
                <span className="inline-flex items-center gap-1.5 bg-stone-200/70 px-3 py-1 rounded-full text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  {l("Legal Status: Individual - Proprietor", "कानूनी स्थिति: प्रोपराइटरशिप")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-stone-200/70 px-3 py-1 rounded-full text-[11px]">
                  <Building className="w-3.5 h-3.5 text-accent" />
                  {l("Annual Turnover: ₹1 - 2 Crore", "वार्षिक टर्नओवर: ₹1 - 2 करोड़")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-stone-200/70 px-3 py-1 rounded-full text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {l("Jaipur, Rajasthan, India", "जयपुर, राजस्थान, भारत")}
                </span>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
