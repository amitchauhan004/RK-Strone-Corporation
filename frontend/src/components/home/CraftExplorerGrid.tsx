import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Eye } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { CRAFT_CATEGORIES, CraftItem } from "@/data/stoneShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

interface CraftExplorerGridProps {
  onOpenQuickQuote?: (craftTitle?: string) => void;
}

export default function CraftExplorerGrid({ onOpenQuickQuote }: CraftExplorerGridProps) {
  const { language, l } = useLanguage();
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({});

  const handleThumbnailClick = (craftId: string, idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => ({ ...prev, [craftId]: idx }));
  };

  return (
    <section className="py-20 md:py-32 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <Reveal direction="down">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight mb-4">
              {l("STONE CRAFT CATEGORIES", "हमारे मुख्य पत्थर शिल्प")}
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {l(
                "Handcrafted temples, chhatris, CNC jalis, jharokhas, and courtyard fountains. Custom sizes and direct workshop prices for every project.",
                "नक्काशीदार मंदिर, शाही छतरियां, सीएनसी जाली, झरोखे और फव्वारे। आपकी पसंद के साइज और डिज़ाइन में तैयार।"
              )}
            </p>
          </Reveal>
        </div>

        {/* 6 High-Impact Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CRAFT_CATEGORIES.map((craft, idx) => {
            const currentImgIdx = activeImageIndex[craft.id] || 0;
            const currentImg = craft.galleryImages[currentImgIdx] || craft.image;

            return (
              <Reveal key={craft.id} direction="up" delay={0.08 * (idx + 1)}>
                <div className="group bg-white border border-stone-200 rounded-none overflow-hidden shadow-xs hover:shadow-2xl hover:border-accent/80 transition-all duration-500 flex flex-col h-full">
                  
                  {/* Image Container with Thumbnails */}
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src={currentImg}
                      alt={craft.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = craft.image;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges Row */}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <div className="bg-stone-950/90 text-accent text-[10px] sm:text-xs font-bold tracking-wider px-2.5 py-1 uppercase backdrop-blur-md border border-accent/30 truncate max-w-[70%]">
                        {craft.tag}
                      </div>
                      <div className="bg-accent text-stone-950 text-[10px] font-bold tracking-wider px-2.5 py-1 uppercase shadow-sm shrink-0">
                        CUSTOM SIZE
                      </div>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg sm:text-xl font-heading font-medium text-white tracking-wide leading-snug drop-shadow-sm">
                        {language === "hi" ? craft.hindiTitle : craft.title}
                      </h3>
                    </div>
                  </div>

                  {/* Thumbnail Switcher for Authentic Photos */}
                  <div className="flex items-center justify-between gap-2 p-2.5 bg-stone-100/90 border-b border-stone-200">
                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                      <span className="text-[10px] text-stone-500 font-semibold uppercase shrink-0 mr-1">
                        {l("PHOTOS:", "तस्वीरें:")}
                      </span>
                      {craft.galleryImages.map((thumb, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={(e) => handleThumbnailClick(craft.id, tIdx, e)}
                          className={`relative w-9 h-9 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                            currentImgIdx === tIdx
                              ? "border-accent ring-2 ring-accent/40 scale-105"
                              : "border-stone-300 opacity-60 hover:opacity-100"
                          }`}
                          title={`View Photo ${tIdx + 1}`}
                        >
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = craft.image;
                            }}
                          />
                        </button>
                      ))}
                    </div>

                    {craft.modelCount && (
                      <span className="shrink-0 px-2 py-0.5 bg-stone-900 text-accent text-[10px] font-bold uppercase tracking-wide border border-accent/20">
                        {craft.modelCount}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4">
                        {craft.description}
                      </p>

                      {/* Materials List */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {l("Available in Stones:", "उपलब्ध पत्थर:")}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {craft.materials.map((mat, mIdx) => (
                            <span
                              key={mIdx}
                              className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 border border-stone-200"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1 text-xs text-stone-600">
                        {craft.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-2">
                      <Link to={craft.link} className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-stone-900 text-stone-950 hover:bg-stone-900 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-none py-5 cursor-pointer"
                        >
                          {l("View Models", "मॉडल देखें")}
                          <ArrowRight className="ml-1 w-3.5 h-3.5" />
                        </Button>
                      </Link>

                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, I am interested in custom ${craft.title}. Please share available designs and prices.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          size="sm"
                          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-none py-5 cursor-pointer shadow-xs"
                        >
                          <WhatsAppIcon className="mr-1.5 w-4 h-4" />
                          {l("Get Quote", "रेट पूछें")}
                        </Button>
                      </a>
                    </div>

                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Requirement */}
        <Reveal direction="up" delay={0.3}>
          <div className="mt-14 p-6 sm:p-8 bg-stone-950 text-white border-l-4 border-accent flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-accent">
                {l("HAVE A CUSTOM DESIGN OR DRAWING?", "क्या आपके पास कोई विशेष डिज़ाइन है?")}
              </span>
              <h4 className="text-xl sm:text-2xl font-heading font-normal uppercase tracking-wide">
                {l("Send Us Your Photo, Sketch or CAD File", "अपना फोटो, स्केच या CAD फ़ाइल भेजें")}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light">
                {l(
                  "We will calculate stone quantities and share a direct factory price within 2 hours.",
                  "हम आपके साइज के अनुसार 2 घंटे के भीतर वर्कशॉप का पक्का रेट बताएंगे।"
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Namaste RK Stone Corporation, I have a custom architectural stone drawing/photo. Please review and share a quote."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-6 px-6 rounded-none text-xs uppercase tracking-wider shadow-sm">
                  <WhatsAppIcon className="mr-2 w-4 h-4" />
                  {l("Send on WhatsApp", "व्हाट्सएप पर भेजें")}
                </Button>
              </a>

              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-6 px-6 rounded-none text-xs font-semibold uppercase tracking-wider"
                >
                  {l("Contact Workshop", "वर्कशॉप संपर्क")}
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
