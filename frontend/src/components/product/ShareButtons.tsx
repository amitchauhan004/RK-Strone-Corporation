import { Clipboard, Facebook, Twitter, Share2, Link as LinkIcon, Linkedin } from 'lucide-react';
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useEffect, useRef, useState } from 'react';

interface Props {
  url: string;
  title?: string;
}

export default function ShareButtons({ url, title = '' }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const doShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || document.title || '');

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent((title ? title + ' - ' : '') + url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard'))
            .catch(() => prompt('Copy this link', url));
        } else {
          prompt('Copy this link', url);
        }
        break;
      case 'native':
        if ((navigator as any).share) {
          (navigator as any).share({ title: title || document.title, url }).catch(() => { });
        } else {
          // fallback
          setOpen(true);
        }
        break;
      default:
        break;
    }
    setOpen(false);
  };

  return (
    <div className="relative mt-4" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:shadow-sm"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <Share2 className="w-4 h-4" /> Share
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50 py-1">
          <button onClick={() => doShare('native')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share (Native)
          </button>
          <button onClick={() => doShare('twitter')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <Twitter className="w-4 h-4" /> Twitter
          </button>
          <button onClick={() => doShare('facebook')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <Facebook className="w-4 h-4" /> Facebook
          </button>
          <button onClick={() => doShare('whatsapp')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> WhatsApp
          </button>
          <button onClick={() => doShare('linkedin')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
          <button onClick={() => doShare('copy')} className="w-full text-left px-3 py-2 hover:bg-neutral-50 flex items-center gap-2">
            <Clipboard className="w-4 h-4" /> Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
