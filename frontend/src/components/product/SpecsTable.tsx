import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  specs?: Record<string, any> | string;
}

export default function SpecsTable({ specs }: Props) {
  const { l } = useLanguage();
  if (!specs) return null;

  let entries: [string, any][] = [];
  if (typeof specs === "object" && !Array.isArray(specs)) {
    entries = Object.entries(specs).filter(([_, v]) => v !== undefined && v !== null && v !== "");
  } else if (typeof specs === "string") {
    entries = [["Specifications", specs]];
  }

  if (entries.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-stone-200">
      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
        {l("Technical Specifications", "तकनीकी विवरण")}
      </h3>
      <div className="bg-white border border-stone-200 divide-y divide-stone-100">
        {entries.map(([k, v]) => (
          <div key={k} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 text-xs">
            <span className="font-semibold text-stone-600 uppercase tracking-wider">{k}</span>
            <span className="text-stone-900 font-medium mt-1 sm:mt-0">{String(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
