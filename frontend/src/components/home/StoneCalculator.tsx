import { useState, useEffect, useId } from "react";
import { Calculator, ArrowRight, CheckCircle2, Sparkles, RefreshCw, Zap, FileText } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_URL } from "@/config/api";

interface StoneRate {
  id: string;
  nameEn: string;
  nameHi: string;
  baseSqFtRate: number; // in INR per sq.ft approximate fabrication
  descEn: string;
  descHi: string;
  isAvailable?: boolean;
}

interface WorkType {
  id: string;
  nameEn: string;
  nameHi: string;
  factor: number;
  isAvailable?: boolean;
}

const DEFAULT_STONE_RATES: StoneRate[] = [
  { id: "gwalior-mint", nameEn: "Gwalior White Mint Stone", nameHi: "ग्वालियर व्हाइट मिंट स्टोन", baseSqFtRate: 450, descEn: "Ideal for fine CNC jalis & wall panels", descHi: "सीएनसी जाली व दीवार पैनल के लिए उपयुक्त" },
  { id: "dhaulpur-beige", nameEn: "Dholpur Beige / Pink Sandstone", nameHi: "धौलपुर सैंडस्टोन", baseSqFtRate: 480, descEn: "Ideal for haveli facades & carved pillars", descHi: "हवेली अग्रभाग व नक्काशीदार खंभों के लिए" },
  { id: "bansi-paharpur", nameEn: "Bansi Paharpur Pink Stone", nameHi: "बंसी पहाड़पुर पिंक स्टोन", baseSqFtRate: 650, descEn: "Temple grade, highest durability", descHi: "मंदिर निर्माण हेतु सबसे मजबूत पत्थर" },
  { id: "jodhpur-red", nameEn: "Jodhpur Imperial Red Stone", nameHi: "जोधपुर रेड स्टोन", baseSqFtRate: 520, descEn: "Heavy load-bearing, gates & pillars", descHi: "मजबूत खंभों, मुख्य द्वारों के लिए" },
  { id: "makrana-white", nameEn: "Makrana Pure White Marble", nameHi: "मकराना सफेद संगमरमर", baseSqFtRate: 1250, descEn: "Pure calcite white marble", descHi: "शुद्ध सफेद मकराना मार्बल" },
];

const DEFAULT_WORK_TYPES: WorkType[] = [
  { id: "cnc-jali", nameEn: "3D CNC Stone Jali & Screens", nameHi: "3D सीएनसी स्टोन जाली", factor: 1.0 },
  { id: "temple-mandir", nameEn: "Handcrafted Stone Temple (Mandir)", nameHi: "हाथ से तराशा पत्थर का मंदिर", factor: 1.8 },
  { id: "haveli-facade", nameEn: "Haveli Facade, Pillars & Jharokhas", nameHi: "हवेली एलिवेशन, खंभे व झरोखे", factor: 1.4 },
  { id: "stone-chhatri", nameEn: "Stone Chhatri & Garden Pavilion", nameHi: "पत्थर की छतरी व मंडप", factor: 1.6 },
  { id: "wall-cladding", nameEn: "Stone Exterior Wall Cladding", nameHi: "बाहरी दीवार स्टोन क्लैडिंग", factor: 0.85 },
];

export default function StoneCalculator() {
  const { l } = useLanguage();
  const [stoneRates, setStoneRates] = useState<StoneRate[]>(DEFAULT_STONE_RATES);
  const [workTypes, setWorkTypes] = useState<WorkType[]>(DEFAULT_WORK_TYPES);
  const [wastagePercent, setWastagePercent] = useState<number>(8);
  const [isLiveRates, setIsLiveRates] = useState<boolean>(false);

  const [workType, setWorkType] = useState<string>("cnc-jali");
  const [stoneType, setStoneType] = useState<string>("gwalior-mint");
  const [lengthFt, setLengthFt] = useState<number>(10);
  const [heightFt, setHeightFt] = useState<number>(8);
  const [thickness, setThickness] = useState<string>("35mm");
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  // Lead Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteCity, setQuoteCity] = useState("");
  const [submittingQuote, setSubmittingQuote] = useState(false);

  const lengthInputId = useId();
  const heightInputId = useId();

  // Fetch live market rates from database
  useEffect(() => {
    fetch(`${API_URL}/api/calculator-rates`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          if (Array.isArray(data.stoneRates) && data.stoneRates.length > 0) {
            const available = data.stoneRates.filter((s: StoneRate) => s.isAvailable !== false);
            if (available.length > 0) setStoneRates(available);
          }
          if (Array.isArray(data.workTypes) && data.workTypes.length > 0) {
            const availableWork = data.workTypes.filter((w: WorkType) => w.isAvailable !== false);
            if (availableWork.length > 0) setWorkTypes(availableWork);
          }
          if (typeof data.wastagePercent === "number") {
            setWastagePercent(data.wastagePercent);
          }
          setIsLiveRates(true);
        }
      })
      .catch(() => {
        // Fallback gracefully to default rates
      });
  }, []);

  // Calculations
  const rawSqFt = Math.max(0, (lengthFt || 0) * (heightFt || 0));
  const wastageBuffer = Math.round(rawSqFt * (wastagePercent / 100));
  const totalSqFt = rawSqFt + wastageBuffer;

  const selectedStone = stoneRates.find((s) => s.id === stoneType) || stoneRates[0] || DEFAULT_STONE_RATES[0];
  const selectedWork = workTypes.find((w) => w.id === workType) || workTypes[0] || DEFAULT_WORK_TYPES[0];

  const thicknessMultiplier = thickness === "50mm" ? 1.25 : thickness === "75mm" ? 1.55 : 1.0;
  const installationCostPerSqFt = includeInstallation ? 120 : 0;

  const effectiveRate = Math.round(selectedStone.baseSqFtRate * selectedWork.factor * thicknessMultiplier + installationCostPerSqFt);
  const estimatedMin = Math.round(totalSqFt * effectiveRate * 0.95);
  const estimatedMax = Math.round(totalSqFt * effectiveRate * 1.15);

  const whatsappMessage = `Hi RK Stone Corporation, I used your Stone & Cost Calculator:
- Project: ${selectedWork.nameEn}
- Stone Preference: ${selectedStone.nameEn}
- Dimensions: ${lengthFt} ft x ${heightFt} ft (${rawSqFt} sq.ft)
- Thickness: ${thickness}
- Total With Buffer (${wastagePercent}%): ~${totalSqFt} sq.ft
- Estimated Budget Range: ₹${estimatedMin.toLocaleString("en-IN")} - ₹${estimatedMax.toLocaleString("en-IN")}`;

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) {
      toast.error(l("Please enter your name and phone number", "कृपया अपना नाम और फ़ोन नंबर दर्ज करें"));
      return;
    }
    setSubmittingQuote(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName,
          phone: quotePhone,
          city: quoteCity,
          source: "Stone & Cost Estimator",
          projectType: `Cost Estimator: ${selectedWork.nameEn}`,
          stonePreference: selectedStone.nameEn,
          dimensions: `${lengthFt} ft x ${heightFt} ft (${rawSqFt} sq.ft, thickness: ${thickness}, fitting: ${includeInstallation ? 'Included' : 'Excluded'})`,
          estimatedBudget: `₹${estimatedMin.toLocaleString("en-IN")} - ₹${estimatedMax.toLocaleString("en-IN")}`,
          message: `Online Estimator Calculation. Craft: ${selectedWork.nameEn}. Stone: ${selectedStone.nameEn}. Size: ${lengthFt}x${heightFt} ft (${rawSqFt} sq.ft + ${wastageBuffer} sq.ft buffer). Thickness: ${thickness}. Fitting: ${includeInstallation ? 'Yes' : 'No'}. Estimated Price Range: ₹${estimatedMin} - ₹${estimatedMax}. Client City: ${quoteCity || 'N/A'}`
        })
      });
      if (res.ok) {
        toast.success(l("Estimate inquiry registered! Our Jaipur workshop team will connect shortly.", "एस्टीमेट इंक्वायरी दर्ज हो गई है! हमारी जयपुर टीम जल्द आपसे संपर्क करेगी।"));
        setIsQuoteModalOpen(false);
        setQuoteName("");
        setQuotePhone("");
        setQuoteCity("");
      } else {
        toast.error(l("Failed to submit. Please connect on WhatsApp.", "दर्ज नहीं हो सका। कृपया व्हाट्सएप पर संपर्क करें।"));
      }
    } catch {
      toast.error(l("Network error. Please connect on WhatsApp.", "नेटवर्क समस्या। कृपया व्हाट्सएप पर संपर्क करें।"));
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <section id="stone-calculator" className="py-20 md:py-32 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <Reveal direction="down">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight mb-4">
              {l("STONE & COST ESTIMATOR", "पत्थर व लागत कैलकुलेटर")}
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {l(
                "Enter your project size and select a stone to calculate square footage, cutting buffer, and an approximate budget.",
                "अपने प्रोजेक्ट का माप और पत्थर चुनें। तुरंत कुल एरिया और अंदाज़न बजट की गणना करें।"
              )}
            </p>
          </Reveal>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto bg-white border border-stone-300 shadow-xl p-3 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 p-2 sm:p-0 space-y-5 sm:space-y-6">
              
              {/* 1. Work Type */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                  {l("1. Select What to Build", "1. क्या बनवाना चाहते हैं?")}
                </Label>
                <Select value={workType} onValueChange={setWorkType}>
                  <SelectTrigger className="w-full h-11 sm:h-12 rounded-none border-stone-300 bg-stone-50 font-medium text-xs sm:text-sm">
                    <SelectValue placeholder="Select work category" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypes.map((w) => (
                      <SelectItem key={w.id} value={w.id} className="text-xs sm:text-sm">
                        {l(w.nameEn, w.nameHi)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Stone Material */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                  {l("2. Choose Stone Material", "2. पत्थर का प्रकार चुनें")}
                </Label>
                <Select value={stoneType} onValueChange={setStoneType}>
                  <SelectTrigger className="w-full h-11 sm:h-12 rounded-none border-stone-300 bg-stone-50 font-medium text-xs sm:text-sm">
                    <SelectValue placeholder={l("Select stone type", "पत्थर चुनें")} />
                  </SelectTrigger>
                  <SelectContent>
                    {stoneRates.map((s) => (
                      <SelectItem key={s.id} value={s.id} className="text-xs sm:text-sm">
                        {l(s.nameEn, s.nameHi)} - {l(s.descEn, s.descHi)} (₹{s.baseSqFtRate}/sq.ft)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor={lengthInputId} className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                    {l("Length / Width (Feet)", "लंबाई / चौड़ाई (फीट)")}
                  </Label>
                  <Input
                    id={lengthInputId}
                    type="number"
                    min={1}
                    max={200}
                    value={lengthFt}
                    onChange={(e) => setLengthFt(Number(e.target.value) || 0)}
                    className="h-11 sm:h-12 rounded-none border-stone-300 bg-stone-50 text-sm sm:text-base font-semibold"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor={heightInputId} className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                    {l("Height (Feet)", "ऊंचाई (फीट)")}
                  </Label>
                  <Input
                    id={heightInputId}
                    type="number"
                    min={1}
                    max={200}
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value) || 0)}
                    className="h-11 sm:h-12 rounded-none border-stone-300 bg-stone-50 text-sm sm:text-base font-semibold"
                  />
                </div>
              </div>

              {/* 4. Thickness & Installation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                    {l("Stone Thickness", "पत्थर की मोटाई")}
                  </Label>
                  <Select value={thickness} onValueChange={setThickness}>
                    <SelectTrigger className="w-full h-11 sm:h-12 rounded-none border-stone-300 bg-stone-50 font-medium text-xs sm:text-sm">
                      <SelectValue placeholder={l("Select thickness", "मोटाई चुनें")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25mm">{l("25mm (Standard Screen)", "25mm (मानक जाली)")}</SelectItem>
                      <SelectItem value="35mm">{l("35mm (Recommended Facade)", "35mm (अनुशंसित एलिवेशन)")}</SelectItem>
                      <SelectItem value="50mm">{l("50mm (Solid Relief)", "50mm (गहरी नक्काशी)")}</SelectItem>
                      <SelectItem value="75mm">{l("75mm (Carved Stone)", "75mm (भारी नक्काशी)")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-900">
                    {l("Installation / Fitting", "फिटिंग व इंस्टॉलेशन")}
                  </Label>
                  <div className="flex items-center min-h-[44px] sm:min-h-[48px] h-auto gap-2.5 px-3 py-2 border border-stone-300 bg-stone-50">
                    <input
                      type="checkbox"
                      id="installation"
                      checked={includeInstallation}
                      onChange={(e) => setIncludeInstallation(e.target.checked)}
                      className="w-4 h-4 accent-stone-900 cursor-pointer shrink-0"
                    />
                    <label htmlFor="installation" className="text-[11px] sm:text-xs font-medium text-stone-800 cursor-pointer leading-tight">
                      {l("Include On-Site Fitting (+Pan-India)", "साइट पर कारीगर द्वारा फिटिंग जोड़ें")}
                    </label>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary Display */}
            <div className="lg:col-span-5 bg-stone-950 text-white p-4 sm:p-6 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 shadow-inner">
              
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    {l("ESTIMATION SUMMARY", "अनुमान सारांश")}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-heading font-normal uppercase text-white mt-0.5 sm:mt-1">
                    {l("PROJECT ESTIMATE", "प्रोजेक्ट का विवरण")}
                  </h3>
                </div>

                {/* Metrics */}
                <div className="space-y-2 sm:space-y-2.5 pt-1 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10 gap-2">
                    <span className="text-white/60 text-[11px] sm:text-xs">{l("Surface Area:", "कुल माप / एरिया:")}</span>
                    <span className="text-white font-mono font-bold text-xs sm:text-sm shrink-0">{rawSqFt} Sq.Ft</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10 gap-2">
                    <span className="text-white/60 text-[11px] sm:text-xs">{l(`Wastage Buffer (+${wastagePercent}%):`, `कटिंग वेस्टेज (+${wastagePercent}%):`)}</span>
                    <span className="text-accent font-mono text-xs sm:text-sm font-semibold shrink-0">+{wastageBuffer} Sq.Ft</span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-white/10 gap-2">
                    <span className="text-white/60 text-[11px] sm:text-xs">{l("Total Stone Needed:", "कुल आवश्यक पत्थर:")}</span>
                    <span className="text-white font-mono font-bold text-xs sm:text-sm shrink-0">{totalSqFt} Sq.Ft</span>
                  </div>

                  <div className="flex justify-between items-start py-1.5 border-b border-white/10 gap-2">
                    <span className="text-white/60 text-[11px] sm:text-xs shrink-0">{l("Selected Stone:", "चुना गया पत्थर:")}</span>
                    <span className="text-white text-right text-[11px] sm:text-xs font-medium leading-tight">{l(selectedStone.nameEn, selectedStone.nameHi)}</span>
                  </div>
                </div>

                {/* Estimated Budget Card */}
                <div className="p-3 sm:p-4 bg-white/5 border border-accent/40 text-center space-y-1 relative">
                  <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-400 font-semibold mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>{l("Live Direct Quarry & Market Rates", "ताज़ा खदान व बाज़ार भाव")}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70">
                    {l("Estimated Workshop Price Range:", "अंदाज़न कारखाना लागत:")}
                  </div>
                  <div className="text-lg sm:text-2xl font-heading font-bold text-accent tracking-wide py-0.5 flex items-center justify-center flex-wrap gap-1 leading-tight">
                    <span>₹{estimatedMin.toLocaleString("en-IN")}</span>
                    <span className="text-stone-400 font-light text-sm sm:text-base">–</span>
                    <span>₹{estimatedMax.toLocaleString("en-IN")}*</span>
                  </div>
                  <div className="text-[10px] text-white/50 leading-tight">
                    {l("*Approximate estimate. Final price depends on design details.", "*अंदाज़न मूल्य। अंतिम मूल्य डिज़ाइन और नक्काशी पर निर्भर करता है।")}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 sm:pt-6 space-y-2.5 sm:space-y-3">
                <a
                  href={`https://wa.me/919414784562?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <button
                    type="button"
                    className="w-full min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold uppercase text-[11px] sm:text-xs tracking-wider rounded-none cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span className="text-center">{l("SEND ESTIMATE ON WHATSAPP", "व्हाट्सएप पर एस्टीमेट भेजें")}</span>
                  </button>
                </a>

                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full min-h-[44px] sm:min-h-[48px] py-2.5 sm:py-3 px-3 border border-accent/60 bg-accent/10 hover:bg-accent hover:text-stone-950 text-accent font-bold uppercase text-[11px] sm:text-xs tracking-wider rounded-none cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="text-center leading-tight">{l("SAVE ESTIMATE & GET OFFICIAL QUOTE", "एस्टीमेट सेव करें व कोटेशन मांगें")}</span>
                </button>

                <p className="text-[10px] sm:text-[11px] text-center text-white/60 font-light">
                  {l("Direct connection with our Jaipur workshop team.", "सीधे हमारी जयपुर वर्कशॉप टीम से संपर्क करें।")}
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Official Quote Lead Capture Dialog */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="w-[94vw] max-w-md bg-white border border-stone-300 p-4 sm:p-7 rounded-none max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              <Calculator className="w-3.5 h-3.5" />
              OFFICIAL ESTIMATION RECORD
            </div>
            <DialogTitle className="text-xl font-heading font-normal uppercase text-stone-950 tracking-wide">
              {l("REQUEST OFFICIAL QUOTATION", "आधिकारिक कोटेशन का अनुरोध")}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600 font-light">
              {l(
                "Submit your contact details. Our Jaipur drafting team will review stone block sizes and provide a formalized project proposal.",
                "अपना नाम और फ़ोन नंबर दर्ज करें। हमारी जयपुर टीम आपको विस्तृत कोटेशन और विवरण भेजेगी।"
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Snapshot Summary */}
          <div className="p-3 bg-stone-50 border border-stone-200 text-xs font-mono space-y-1 my-2">
            <div className="flex justify-between text-stone-600">
              <span>Project:</span>
              <span className="font-bold text-stone-900">{selectedWork.nameEn}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Stone:</span>
              <span className="font-bold text-stone-900">{selectedStone.nameEn}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Approx Area:</span>
              <span className="font-bold text-stone-900">{rawSqFt} sq.ft (+{wastageBuffer} buffer)</span>
            </div>
            <div className="flex justify-between text-stone-600 border-t border-stone-200 pt-1">
              <span>Estimated Budget:</span>
              <span className="font-bold text-accent">₹{estimatedMin.toLocaleString("en-IN")} - ₹{estimatedMax.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-1">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1">
                {l("Your Name *", "आपका नाम *")}
              </Label>
              <Input
                required
                value={quoteName}
                onChange={(e) => setQuoteName(e.target.value)}
                placeholder={l("e.g. Rameshwar Agarwal", "उदा. रामेश्वर अग्रवाल")}
                className="h-11 rounded-none border-stone-300 bg-[#FAF8F5] text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1">
                {l("Phone / WhatsApp Number *", "फ़ोन / व्हाट्सएप नंबर *")}
              </Label>
              <Input
                required
                type="tel"
                value={quotePhone}
                onChange={(e) => setQuotePhone(e.target.value)}
                placeholder="+91 94147 84562"
                className="h-11 rounded-none border-stone-300 bg-[#FAF8F5] text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1">
                {l("Project Location (City / State)", "प्रोजेक्ट का शहर / राज्य")}
              </Label>
              <Input
                value={quoteCity}
                onChange={(e) => setQuoteCity(e.target.value)}
                placeholder={l("e.g. Jaipur, New Delhi, Surat, Lucknow", "उदा. जयपुर, दिल्ली, सूरत")}
                className="h-11 rounded-none border-stone-300 bg-[#FAF8F5] text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={submittingQuote}
              className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs tracking-wider py-5 rounded-none cursor-pointer disabled:opacity-50 mt-2"
            >
              {submittingQuote
                ? l("TRANSMITTING ESTIMATE...", "भेजा जा रहा है...")
                : l("SUBMIT ESTIMATE INQUIRY", "एस्टीमेट इंक्वायरी सबमिट करें")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
