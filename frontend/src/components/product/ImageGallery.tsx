import { useState } from 'react';
import { ZoomIn, X, ShieldCheck } from 'lucide-react';

interface Props {
  images?: string[];
  alt?: string;
}

export default function ImageGallery({ images = [], alt = '' }: Props) {
  const imgs = images.length ? images : ['/placeholder.png'];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="space-y-4 select-none">
      {/* Main Feature Image Container */}
      <div 
        className="relative aspect-[4/3] sm:aspect-square bg-stone-100 border border-stone-200 overflow-hidden cursor-zoom-in group shadow-xs"
        onClick={() => setZoom(true)}
      >
        <img 
          src={imgs[active]} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Authentic Quarry Tag */}
        <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 flex items-center gap-1.5 border border-white/10 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          100% Authentic Hand Carving
        </div>

        {/* Zoom Hint */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-stone-900 text-xs px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-stone-200 font-medium group-hover:bg-accent group-hover:text-stone-950 transition-colors">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Click to Enlarge</span>
        </div>
      </div>

      {/* Thumbnails row */}
      {imgs.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {imgs.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 bg-stone-100 border-2 overflow-hidden transition-all duration-200 ${
                i === active 
                  ? 'border-accent shadow-sm scale-95' 
                  : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
              }`}
            >
              <img src={src} alt={`${alt}-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full Screen Lightbox Modal */}
      {zoom && (
        <div 
          className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200" 
          onClick={() => setZoom(false)}
        >
          <button 
            type="button"
            onClick={() => setZoom(false)}
            className="absolute top-6 right-6 text-white hover:text-accent p-2 transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[90vh] overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imgs[active]} 
              alt={alt} 
              className="max-w-full max-h-[82vh] object-contain shadow-2xl border border-white/10" 
            />
            <p className="mt-3 text-white/80 text-xs sm:text-sm font-medium tracking-wide uppercase text-center">
              {alt} • Authentic Natural Stone Craftsmanship
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
