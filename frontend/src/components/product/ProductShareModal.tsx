import { useState } from "react";
import { 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Share2 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProductShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    code: string;
    category?: string;
    image: string;
    stoneType?: string;
  };
}

export default function ProductShareModal({
  isOpen,
  onClose,
  product
}: ProductShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = `[${product.code}] ${product.name} | RK Stone Corporation Jaipur`;
  const shareText = `Check out ${product.name} (Code: ${product.code}) handcrafted by RK Stone Corporation Jaipur:`;

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success("Product link copied to clipboard!");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const openApp = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        onClose();
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          toast.error("Device share failed, please use app buttons below");
        }
      }
    } else {
      toast.info("Native device share not supported on this browser. Please use the app buttons below.");
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const shareApps = [
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#1ebe5d]",
      textColor: "text-[#25D366]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.994.542 1.777.82 2.796.82 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.697.073-2.112-.513-1.619-.671-2.651-2.316-2.732-2.424-.08-.108-.654-.87-.654-1.66 0-.79.414-1.18.561-1.341.144-.162.315-.202.42-.202.105 0 .21.002.302.007.098.006.229-.037.358.272.133.319.455 1.109.495 1.19.04.081.067.175.013.283-.053.108-.08.175-.159.268-.08.093-.167.208-.239.28-.08.08-.163.167-.07.327.093.16.413.682.887 1.104.609.542 1.122.709 1.282.79.16.08.254.067.348-.04.093-.108.4-.467.507-.628.107-.16.213-.134.359-.08.147.054.933.44 1.093.52.16.08.267.12.307.187.04.068.04.39-.104.795z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.136 8.136 0 01-4.316-1.234l-.309-.184-2.966.778.792-2.893-.201-.321A8.139 8.139 0 1112 20.182z"/>
        </svg>
      ),
      action: () => openApp(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`)
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      textColor: "text-[#1877F2]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => openApp(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
    },
    {
      name: "X (Twitter)",
      color: "bg-black hover:bg-neutral-800",
      textColor: "text-black",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => openApp(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)
    },
    {
      name: "Telegram",
      color: "bg-[#229ED9] hover:bg-[#1e8ec3]",
      textColor: "text-[#229ED9]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ),
      action: () => openApp(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`)
    },
    {
      name: "SMS / Text",
      color: "bg-[#10B981] hover:bg-[#059669]",
      textColor: "text-[#10B981]",
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      action: () => openApp(`sms:?&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)
    },
    {
      name: "Email",
      color: "bg-[#EA4335] hover:bg-[#d33828]",
      textColor: "text-[#EA4335]",
      icon: <Mail className="w-5 h-5 text-white" />,
      action: () => openApp(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`)
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border border-stone-300 rounded-[4px] shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#f7f8fa] border-b border-stone-200 px-5 py-4 pr-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b25e19] block">
            Share Masterpiece
          </span>
          <DialogTitle className="text-base sm:text-lg font-heading font-normal uppercase tracking-wide text-stone-950">
            Share With All Apps
          </DialogTitle>
        </div>

        <div className="p-5 space-y-5">

          {/* Product Mini Snippet */}
          <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-[3px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 object-cover rounded-[2px] border border-stone-200 shrink-0 bg-white"
            />
            <div className="flex-1 min-w-0">
              <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-[#b25e19] text-[10px] font-mono font-bold rounded-xs mb-1">
                {product.code}
              </span>
              <h4 className="text-xs sm:text-sm font-heading font-medium uppercase tracking-wide text-stone-950 truncate">
                {product.name}
              </h4>
              <p className="text-[11px] text-stone-500 truncate">
                RK Stone Corporation • Jaipur
              </p>
            </div>
          </div>

          {/* Apps Grid */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-3">
              Tap App to Share Directly:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {shareApps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  onClick={app.action}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-[4px] hover:bg-stone-100 active:scale-95 transition-all cursor-pointer group"
                >
                  <div className={`w-11 h-11 rounded-full ${app.color} text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                    {app.icon}
                  </div>
                  <span className="text-[11px] font-medium text-stone-700 text-center leading-tight">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Native Device Share Button (if supported or on mobile) */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-[3px] flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#d4af37]" />
              <span>More Installed Apps (Device System Share)</span>
            </button>
          )}

          {/* Copy Link Input Bar */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1.5">
              Or Copy Page Link:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-stone-50 border border-stone-300 rounded-[3px]">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent px-2.5 text-xs text-stone-700 truncate font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={copyLink}
                className="shrink-0 px-3.5 py-1.5 bg-[#b25e19] hover:bg-[#974d12] text-white text-xs font-bold rounded-[2px] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
