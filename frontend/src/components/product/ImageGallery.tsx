import { useState } from 'react';

interface Props {
  images?: string[];
  alt?: string;
}

export default function ImageGallery({ images = [], alt = '' }: Props) {
  const imgs = images.length ? images : ['/placeholder.png'];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-zoom-in" onClick={() => setZoom(true)}>
        <img src={imgs[active]} alt={alt} className="w-full h-full object-cover transition-transform duration-300" />
      </div>

      <div className="mt-3 flex gap-3">
        {imgs.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-20 h-20 rounded overflow-hidden border ${i === active ? 'ring-2 ring-accent border-accent' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-accent transition`}
          >
            <img src={src} alt={`${alt}-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {zoom && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setZoom(false)}>
          <div className="max-w-4xl max-h-[90vh] overflow-auto p-2 bg-white rounded">
            <img src={imgs[active]} alt={alt} className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
