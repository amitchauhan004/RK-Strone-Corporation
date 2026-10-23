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
      className="hidden md:inline-flex fixed bottom-8 left-8 z-50 animate-fade-in"
      aria-label="Request Quote via WhatsApp"
    >
      <Button
        size="lg"
        className="shadow-gold bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full h-14 px-6 cursor-pointer"
      >
        <WhatsAppIcon variant="monochrome" className="w-5 h-5 mr-2 text-white" />
        <span className="font-semibold tracking-wide">Request Quote</span>
      </Button>
    </a>
  );
};

export default WhatsAppButton;
