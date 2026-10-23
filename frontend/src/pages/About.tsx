import { Link } from "react-router-dom";
import { 
  Award, 
  Target, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  ArrowRight, 
  Users, 
  Building2, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import workshopImg from "@/assets/about-workshop.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { l } = useLanguage();

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Our Heritage & Master Stone Craftsmanship | RK Stone Corporation Jaipur",
          "हमारी विरासत व पत्थर शिल्पकला | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Four decades of stone masonry, direct quarry extraction, and architecture in Jaipur, Rajasthan. Meet our artisans and discover our lineage.",
          "चार दशकों से राजस्थान की पारंपरिक पत्थर शिल्पकला, मकराना मार्बल और धौलपुर सैंडस्टोन के मंदिर, छतरियां व जालियों का निर्माण।"
        )}
        keywords="rk stone corporation jaipur, stone craftsmanship jaipur, sompura artisans jaipur, makrana marble quarry, stone temple workshop jaipur"
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
              {l("FOUR DECADES OF DEVOTION,", "चार दशकों की निष्ठा,")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Chiseled into Eternal Stone", "सच्चे पत्थरों में तराशी कला")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "Founded in 1984 on the ancient stone traditions of Rajasthan, RK Stone Corporation is Jaipur's direct manufacturer of marble temples, royal haveli facades, and architectural stone works.",
                "1984 में स्थापित, आरके स्टोन कॉर्पोरेशन राजस्थान की पारंपरिक शिल्पकला से संगमरमर के भव्य मंदिर, हवेलियों के अग्रभाग और आकर्षक पत्थर शिल्प का सीधा निर्माता है।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("START YOUR PROJECT", "नया प्रोजेक्ट शुरू करें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href="https://maps.google.com/?q=RK+Stone+Corporation+Jaipur" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <MapPin className="mr-2 w-4 h-4 text-accent" />
                  {l("VISIT JAIPUR WORKSHOP", "जयपुर वर्कशॉप आएं")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Founding Narrative */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="down">
                <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                  {l("WHERE TRADITION MEETS MODERN ARCHITECTURE", "जहां परंपरा और आधुनिक शिल्पकला का मिलन होता है")}
                </h2>
              </Reveal>

              <Reveal direction="left" delay={0.15}>
                <p className="text-base sm:text-lg text-stone-700 font-light leading-relaxed">
                  {l(
                    "Rajasthan holds the world’s finest stone heritage. Over four decades ago, RK Stone Corporation was founded to preserve the living traditions of Rajasthani stone carvers while bringing modern precision to contemporary homes and projects.",
                    "राजस्थान की धरती प्राकृतिक पत्थरों की समृद्ध धरोहर समेटे हुए है। चार दशकों पहले आरके स्टोन कॉर्पोरेशन की शुरुआत हमारे पारंपरिक कारीगरों के हुनर को सहेजने और आधुनिक घरों तक शुद्ध पत्थरों की कला पहुंचाने के उद्देश्य से हुई।"
                  )}
                </p>
              </Reveal>

              <Reveal direction="left" delay={0.25}>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  {l(
                    "From our extensive workshop on Agra Road in Jaipur, we manage the entire process—from selecting solid blocks directly at Makrana, Bansi Paharpur, and Dholpur quarries, to computer CNC cutting, hand-carving by master artisans, and safe on-site installation across India.",
                    "जयपुर के आगरा रोड स्थित हमारी वर्कशॉप में खदानों से पत्थर चुनने से लेकर कटिंग, बारीक नक्काशी और पूरे भारत में सुरक्षित फिटिंग तक का हर काम सीधे हमारी देखरेख में होता है।"
                  )}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.35}>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                  <div>
                    <div className="text-3xl sm:text-4xl font-heading font-light text-stone-950">40+</div>
                    <div className="text-xs font-body font-semibold uppercase tracking-wider text-accent mt-1">
                      {l("Years Heritage", "वर्षों का अनुभव")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-heading font-light text-stone-950">5,000+</div>
                    <div className="text-xs font-body font-semibold uppercase tracking-wider text-accent mt-1">
                      {l("Works Completed", "सफल प्रोजेक्ट्स")}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Photo Frame */}
            <Reveal direction="right" duration={0.9} className="lg:col-span-6">
              <div className="relative group overflow-hidden bg-stone-950 shadow-2xl">
                <img
                  src={workshopImg}
                  alt="RK Stone Corporation Stone Workshop in Jaipur"
                  className="w-full h-[450px] sm:h-[540px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-body tracking-wide">
                  <div className="text-accent uppercase tracking-widest text-[10px] mb-1">
                    {l("WORKSHOP & MANUFACTURING YARD", "वर्कशॉप व निर्माण केंद्र")}
                  </div>
                  <div className="text-sm font-semibold">
                    {l("Agra Road Workshop & Saw Yards, Jaipur", "आगरा रोड वर्कशॉप, जयपुर, राजस्थान")}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal direction="down" duration={0.8} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-white tracking-wide leading-tight">
              {l("WHY CLIENTS CHOOSE RK STONE", "ग्राहक और आर्किटेक्ट हमें क्यों चुनते हैं")}
            </h2>
          </Reveal>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal direction="left" delay={0.1}>
              <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-accent transition-all duration-300">
                <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                  {l("PILLAR 01", "स्तंभ 01")}
                </span>
                <h3 className="font-heading font-medium text-lg uppercase text-white mb-2">
                  {l("Direct Quarry Sourcing", "सीधी खदानों से पत्थर")}
                </h3>
                <p className="text-white/70 text-xs font-light leading-relaxed">
                  {l(
                    "No middlemen. We select blocks directly at Makrana and Dholpur quarries, ensuring pure stone and authentic natural colors.",
                    "बिना किसी बिचौलिये के सीधे मकराना और धौलपुर की प्रसिद्ध खदानों से मजबूत और शुद्ध पत्थर के ब्लॉक चुने जाते हैं।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-accent transition-all duration-300">
                <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                  {l("PILLAR 02", "स्तंभ 02")}
                </span>
                <h3 className="font-heading font-medium text-lg uppercase text-white mb-2">
                  {l("Authentic Temple Craft", "पारंपरिक मंदिर शिल्प")}
                </h3>
                <p className="text-white/70 text-xs font-light leading-relaxed">
                  {l(
                    "Sacred temples are carved strictly according to traditional designs, preserving clean proportions and timeless beauty.",
                    "मंदिरों का निर्माण शास्त्रीय नियमों और सही अनुपातों के अनुसार किया जाता है, जिससे पवित्रता और सुंदरता बनी रहे।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-accent transition-all duration-300">
                <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                  {l("PILLAR 03", "स्तंभ 03")}
                </span>
                <h3 className="font-heading font-medium text-lg uppercase text-white mb-2">
                  {l("CNC Precision & Hand-Carving", "सटीक कटिंग व नक्काशी")}
                </h3>
                <p className="text-white/70 text-xs font-light leading-relaxed">
                  {l(
                    "Modern computer-guided saws cut complex curves with exact precision before master artisans add hand-carved textures.",
                    "आधुनिक सीएनसी मशीनों से सटीक कटिंग और उसके बाद हमारे कुशल कारीगरों के हाथों से बारीक नक्काशी की जाती है।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.4}>
              <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-accent transition-all duration-300">
                <span className="font-body text-accent text-xs font-bold tracking-widest block mb-4">
                  {l("PILLAR 04", "स्तंभ 04")}
                </span>
                <h3 className="font-heading font-medium text-lg uppercase text-white mb-2">
                  {l("Pan-India Safe Delivery", "पूरे भारत में सुरक्षित फिटिंग")}
                </h3>
                <p className="text-white/70 text-xs font-light leading-relaxed">
                  {l(
                    "Carefully packed in wooden crates and dispatched with our experienced craftsmen across India for on-site fitting.",
                    "मजबूत लकड़ी के बॉक्स में सुरक्षित पैकिंग और हमारे अनुभवी कारीगरों द्वारा आपकी साइट पर जाकर सटीक फिटिंग की सुविधा।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Workshop Visit CTA */}
      <section className="py-24 md:py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">

          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight mb-6">
              {l("VISIT OUR WORKSHOP IN JAIPUR", "जयपुर में हमारी वर्कशॉप देखने आएं")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "See our master artisans carving pillars and shikhars in real time. Inspect natural stone blocks, feel the textures, and consult directly with our team.",
                "हमारे कारीगरों को लाइव नक्काशी करते हुए देखें। मकराना मार्बल व धौलपुर सैंडस्टोन के असली ब्लॉक देखें और अपनी जरूरत के अनुसार सलाह लें।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer">
                  {l("SCHEDULE WORKSHOP VISIT", "वर्कशॉप विजिट प्लान करें")}
                </Button>
              </Link>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border-stone-400 text-stone-900 hover:text-stone-950 hover:border-stone-950 hover:bg-stone-200 uppercase font-semibold text-xs sm:text-sm px-8 py-6 rounded-none transition-all cursor-pointer">
                  {l("CALL: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
