import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, Shield, Compass, Layers } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { STONE_PALETTE, StoneType } from "@/data/stoneShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StonePaletteExplorer() {
  const { language, l } = useLanguage();
  const [activeStoneId, setActiveStoneId] = useState<string>("gwalior-stone");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const currentStone = STONE_PALETTE.find((s) => s.id === activeStoneId) || STONE_PALETTE[0];

  return (
    <section className="py-20 md:py-32 bg-[#121212] text-white border-b border-white/10 select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal direction="down">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-tight mb-4">
              {l("OUR STONE VARIETIES", "हमारे पत्थरों की किस्में")}
            </h2>
            <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {l(
                "We source pure Gwalior Mint, Dholpur Sandstone, Bansi Paharpur Pink, Jodhpur Red, and Makrana Marble directly from certified quarries. Any design can be custom made in the stone of your choice.",
                "हम सीधे खदानों से ग्वालियर मिंट, धौलपुर सैंडस्टोन, बंसी पहाड़पुर पिंक, जोधपुर लाल पत्थर और मकराना संगमरमर लाते हैं। आप किसी भी पत्थर में अपनी पसंद का काम करवा सकते हैं।"
              )}
            </p>
          </Reveal>
        </div>

        {/* Stone Selector Tabs */}
        <Reveal direction="up" delay={0.15}>
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {STONE_PALETTE.map((stone) => {
              const isActive = stone.id === activeStoneId;
              const displayName = language === "hi" ? stone.hindiName : stone.name.split("(")[0].trim();
              return (
                <button
                  key={stone.id}
                  onClick={() => {
                    setActiveStoneId(stone.id);
                    setSelectedImage("");
                  }}
                  className={`px-4 sm:px-6 py-3.5 sm:py-4 shrink-0 transition-all duration-300 text-left border cursor-pointer ${
                    isActive
                      ? "bg-accent text-stone-950 border-accent font-bold shadow-gold scale-102"
                      : "bg-white/5 text-white/70 border-white/15 hover:border-white/40 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="text-[10px] tracking-wider uppercase opacity-75">
                    {stone.quarry}
                  </div>
                  <div className="text-xs sm:text-sm font-heading uppercase tracking-wide">
                    {displayName}
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Selected Stone Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/5 border border-white/10 p-6 sm:p-10 lg:p-12">
          
          {/* Left: Authentic Photos Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden border border-white/15 shadow-2xl">
              <img
                src={selectedImage || currentStone.image}
                alt={currentStone.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold">
                  AUTHENTIC WORKSHOP SPECIMEN
                </span>
                <div className="text-lg sm:text-xl font-heading text-white uppercase tracking-wide">
                  {currentStone.name}
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-3">
              {currentStone.sampleImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[4/3] bg-stone-900 overflow-hidden border transition-all cursor-pointer ${
                    (selectedImage || currentStone.image) === img
                      ? "border-accent ring-2 ring-accent/50 scale-102"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical Specs & Recommendation */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">
                {l("QUARRY ORIGIN:", "खदान का स्थान:")} {currentStone.quarry}
              </div>
              <h3 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-white tracking-wide mb-1">
                {language === "hi" ? currentStone.hindiName : currentStone.name.split("(")[0].trim()}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {currentStone.description}
            </p>

            {/* Key Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-y border-white/10">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-accent flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  {l("Durability & Life:", "मजबूती और जीवन:")}
                </span>
                <p className="text-xs text-white/90 font-light">
                  {currentStone.durability}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-accent flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {l("Best Suited For:", "किसके लिए उपयुक्त:")}
                </span>
                <p className="text-xs text-white/90 font-light">
                  {currentStone.bestFor}
                </p>
              </div>
            </div>

            {/* Surface Finishes */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-white/60">
                {l("AVAILABLE FINISHES:", "उपलब्ध फिनिश:")}
              </span>
              <div className="flex flex-wrap gap-2">
                {currentStone.textureFinish.map((finish, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-xs bg-white/10 text-white px-3 py-1 border border-white/15"
                  >
                    {finish}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to action for this stone */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  `Hi RK Stone Corporation, I want to inquire about custom work in ${currentStone.name}. Please share slab rates and photos.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-accent hover:bg-accent/90 text-stone-950 font-bold uppercase text-xs sm:text-sm tracking-wider px-6 py-6 rounded-none cursor-pointer shadow-gold">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-stone-950" />
                  {l(`INQUIRE FOR ${currentStone.name.split(" ")[0].toUpperCase()}`, `${currentStone.name.split(" ")[0]} के लिए रेट जानें`)}
                </Button>
              </a>

              <Link to="/materials">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 uppercase text-xs sm:text-sm tracking-wider px-5 py-6 rounded-none cursor-pointer"
                >
                  {l("VIEW ALL STONES", "सभी पत्थर देखें")}
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
