import { Phone, MessageCircle } from "lucide-react";

const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <div className="bg-card shadow-medium rounded-full overflow-hidden flex">
        <a
          href="tel:+919414784562"
          className="px-4 py-3 flex items-center gap-2 border-r"
          aria-label="Call RK Stone Corporation"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm font-medium">Call</span>
        </a>
        <a
          href="https://wa.me/919414784562?text=Hi%20I%20am%20interested%20in%20stone%20products"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 flex items-center gap-2"
          aria-label="WhatsApp RK Stone Corporation"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default MobileStickyCTA;


