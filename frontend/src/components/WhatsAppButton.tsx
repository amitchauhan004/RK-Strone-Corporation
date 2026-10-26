import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const WhatsAppButton = () => {
  const { siteSettings } = useSiteSettings();
  const whatsappClean = (siteSettings.whatsappNumber || "9414784562").replace(/\D/g, "");
  const whatsappNumber = whatsappClean.startsWith("91") ? whatsappClean : `91${whatsappClean}`;
  const message = encodeURIComponent(
    `Namaste ${siteSettings.companyName || "RK Stone Corporation"}, I am browsing your website and would like to request product quotations and photos.`
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:inline-flex fixed bottom-6 right-20 z-40 animate-fade-in items-center gap-2 bg-[#1E7E34] hover:bg-[#18682B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
      aria-label="WhatsApp Us"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon variant="monochrome" className="w-4 h-4 text-white" />
      <span className="font-semibold tracking-wide">WhatsApp Us</span>
    </a>
  );
};

export default WhatsAppButton;
