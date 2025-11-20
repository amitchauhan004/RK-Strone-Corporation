import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "919414784562";
  const message = encodeURIComponent(
    "Hi! I'm interested in your stone products. Can you help me?"
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      // Raised a bit on small screens so it sits above the bottom center popup
      className="fixed bottom-24 sm:bottom-8 left-4 sm:left-8 z-50 animate-fade-in"
    >
      <Button
        size="lg"
        className="shadow-gold bg-green-600 hover:bg-green-700 text-white rounded-full h-14 px-6"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Request Quote</span>
        <span className="sm:hidden">Quote</span>
      </Button>
    </a>
  );
};

export default WhatsAppButton;
