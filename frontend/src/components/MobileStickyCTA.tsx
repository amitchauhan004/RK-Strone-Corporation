import { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const MobileStickyCTA = () => {
  const { siteSettings } = useSiteSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const phoneClean = (siteSettings.primaryPhone || "+919414784562").replace(/\s/g, "");
  const whatsappClean = (siteSettings.whatsappNumber || "9414784562").replace(/\D/g, "");
  const whatsappNumber = whatsappClean.startsWith("91") ? whatsappClean : `91${whatsappClean}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 md:hidden flex flex-col items-center gap-2.5 pointer-events-auto">
      {/* 1. Direct Call Icon Button */}
      <a
        href={`tel:${phoneClean}`}
        className="w-11 h-11 rounded-full bg-stone-900/95 backdrop-blur-md border border-accent/60 text-accent flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.55)] active:scale-95 transition-all"
        aria-label={`Call ${siteSettings.companyName || "RK Stone Corporation"}`}
        title="Call Now"
      >
        <Phone className="w-4 h-4 text-accent" />
      </a>

      {/* 2. Direct WhatsApp Icon Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hi ${siteSettings.companyName || "RK Stone Corporation"}, I am interested in your architectural stone works.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1EBE5D] to-[#25D366] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.45)] active:scale-95 transition-all relative"
        aria-label={`WhatsApp ${siteSettings.companyName || "RK Stone Corporation"}`}
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon variant="monochrome" className="w-5 h-5 text-white" />
      </a>

      {/* 3. Arrow / Scroll to Top Icon Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-accent hover:bg-accent/90 text-stone-950 flex items-center justify-center shadow-gold active:scale-95 transition-all cursor-pointer animate-fade-in"
          aria-label="Back to top"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};

export default MobileStickyCTA;


