import { useState } from 'react';

interface Props {
  variants?: { id: string; name: string; priceModifier?: number }[];
  onChange?: (variantId: string) => void;
}

export default function VariantsSelector({ variants = [], onChange }: Props) {
  const [selected, setSelected] = useState(variants[0]?.id ?? '');

  if (!variants || variants.length === 0) return null;

  const handle = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Variants</label>
      <div className="flex gap-2 flex-wrap">
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => handle(v.id)}
            className={`px-3 py-1 border rounded-md ${selected === v.id ? 'ring-2 ring-accent border-accent bg-accent/10' : 'border-neutral-200 hover:shadow-sm'}`}
          >
            {v.name}{v.priceModifier ? ` (+₹${v.priceModifier})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
