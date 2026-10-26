import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Sparkles, X, ArrowRight, CheckCircle2, Compass, Layers } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import { products as defaultProducts, getProductCode } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_URL } from "@/config/api";

const customCategories = [
  { id: 'sandstone-temple', name: 'Sandstone Temple', hindi: 'सैंडस्टोन मंदिर' },
  { id: 'sandstone-temple-entry-gate', name: 'Sandstone Temple Entry Gate', hindi: 'मंदिर प्रवेश द्वार व तोरण' },
  { id: 'dholpur-sandstone-temple', name: 'Dholpur Sandstone Temple', hindi: 'धौलपुर सैंडस्टोन मंदिर' },
  { id: 'sandstone-grill', name: 'Sandstone Grill (Jali)', hindi: 'सैंडस्टोन जाली व ग्रिल' },
  { id: 'sandstone-lamp', name: 'Sandstone Lamp', hindi: 'सैंडस्टोन लैंप व दीपस्तंभ' },
  { id: 'sandstone-gazebo', name: 'Sandstone Gazebo (Chhatri)', hindi: 'सैंडस्टोन छतरी व गज़ेबो' },
  { id: 'sandstone-fountains', name: 'Sandstone Fountains', hindi: 'सैंडस्टोन वाटर फाउंटेन' },
  { id: 'sandstone-garden-bench', name: 'Sandstone Garden Bench', hindi: 'सैंडस्टोन गार्डन बेंच' },
  { id: 'sandstone-planter', name: 'Sandstone Planter', hindi: 'सैंडस्टोन गमले व कलश' },
  { id: 'sandstone-ball-sphere', name: 'Sandstone Ball Sphere', hindi: 'सैंडस्टोन बॉल व स्फेयर' },
  { id: 'sandstone-elephant-statue', name: 'Sandstone Elephant Statue', hindi: 'सैंडस्टोन हाथी मूर्ति' },
  { id: 'sandstone-god-statue', name: 'Sandstone God Statue', hindi: 'सैंडस्टोन भगवान मूर्ति' },
  { id: 'sandstone-wall-mural', name: 'Sandstone Wall Mural', hindi: 'सैंडस्टोन वॉल म्यूरल' },
  { id: 'sandstone-angel-garden-statue', name: 'Sandstone Angel Garden Statue', hindi: 'सैंडस्टोन एंजल गार्डन मूर्ति' },
  { id: 'sandstone-mother-child-statue', name: 'Sandstone Mother Child Statue', hindi: 'सैंडस्टोन मदर चाइल्ड मूर्ति' },
  { id: 'red-sandstone-ashok-stambh', name: 'Red Sandstone Ashok Stambh with Pillar', hindi: 'रेड सैंडस्टोन अशोक स्तंभ' },
];

const categoryAliases: Record<string, string[]> = {
  'sandstone-temple': ['sandstone-temple', 'stone-temple'],
  'stone-temple': ['sandstone-temple', 'stone-temple'],
  'sandstone-temple-entry-gate': ['sandstone-temple-entry-gate', 'gate'],
  'gate': ['sandstone-temple-entry-gate', 'gate'],
  'dholpur-sandstone-temple': ['dholpur-sandstone-temple', 'dhaulpur-stone'],
  'dhaulpur-stone': ['dholpur-sandstone-temple', 'dhaulpur-stone'],
  'sandstone-grill': ['sandstone-grill', 'wall-panel', 'gwalior-stone'],
  'wall-panel': ['sandstone-grill', 'wall-panel'],
  'sandstone-lamp': ['sandstone-lamp'],
  'sandstone-gazebo': ['sandstone-gazebo', 'chhatri'],
  'chhatri': ['sandstone-gazebo', 'chhatri'],
  'sandstone-fountains': ['sandstone-fountains', 'garden-fountain'],
  'garden-fountain': ['sandstone-fountains', 'garden-fountain'],
  'sandstone-garden-bench': ['sandstone-garden-bench', 'garden-ornaments'],
  'sandstone-planter': ['sandstone-planter', 'garden-ornaments'],
  'sandstone-ball-sphere': ['sandstone-ball-sphere', 'garden-ornaments'],
  'garden-ornaments': ['sandstone-planter', 'sandstone-ball-sphere', 'sandstone-garden-bench', 'garden-ornaments'],
  'sandstone-elephant-statue': ['sandstone-elephant-statue', 'animals'],
  'sandstone-god-statue': ['sandstone-god-statue', 'animals'],
  'sandstone-angel-garden-statue': ['sandstone-angel-garden-statue', 'animals'],
  'sandstone-mother-child-statue': ['sandstone-mother-child-statue', 'animals'],
  'animals': ['sandstone-elephant-statue', 'sandstone-god-statue', 'sandstone-angel-garden-statue', 'sandstone-mother-child-statue', 'animals'],
  'sandstone-wall-mural': ['sandstone-wall-mural', 'wall-panel', 'gwalior-stone', 'red-stone'],
  'red-sandstone-ashok-stambh': ['red-sandstone-ashok-stambh', 'red-stone', 'jodhpur-stone'],
  'red-stone': ['red-sandstone-ashok-stambh', 'sandstone-wall-mural', 'red-stone'],
  'jodhpur-stone': ['red-sandstone-ashok-stambh', 'sandstone-temple-entry-gate', 'jodhpur-stone']
};

const stoneTypes = [
  { id: 'gwalior', nameEn: 'Gwalior Mint Stone', nameHi: 'ग्वालियर मिंट स्टोन' },
  { id: 'dholpur', nameEn: 'Dholpur Beige / Pink', nameHi: 'धौलपुर सैंडस्टोन' },
  { id: 'bansi-paharpur', nameEn: 'Bansi Paharpur Pink', nameHi: 'बंसी पहाड़पुर पिंक स्टोन' },
  { id: 'makrana', nameEn: 'Makrana White Marble', nameHi: 'मकराना सफेद संगमरमर' },
  { id: 'jodhpur', nameEn: 'Jodhpur Imperial Red', nameHi: 'जोधपुर लाल पत्थर' },
];

const Shop = () => {
  const { l } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStones, setSelectedStones] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Products dynamically loaded from database
  const [products, setProducts] = useState<any[]>(defaultProducts);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch DB products, using fallback catalog:", err);
        setProducts(defaultProducts);
      });
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStoneToggle = (stoneId: string) => {
    setSelectedStones((prev) =>
      prev.includes(stoneId)
        ? prev.filter((id) => id !== stoneId)
        : [...prev, stoneId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedStones([]);
    setSearchQuery("");
  };

  const filteredProducts = products.filter((product) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      product.name?.toLowerCase().includes(q) ||
      product.nameHi?.toLowerCase().includes(q) ||
      product.code?.toLowerCase().includes(q) ||
      product.stoneType?.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q) ||
      product.descriptionHi?.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((catId) => {
        const allowed = categoryAliases[catId] || [catId];
        return allowed.includes(product.category) || product.category === catId;
      });

    const matchesStone =
      selectedStones.length === 0 ||
      selectedStones.some((st) =>
        (product.stoneType || "").toLowerCase().includes(st.toLowerCase()) ||
        (product.name || "").toLowerCase().includes(st.toLowerCase())
      );

    return matchesSearch && matchesCategory && matchesStone;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "name-desc") return (b.name || "").localeCompare(a.name || "");
    return 0;
  });

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title="Stone Collection | Custom Mandirs, Jalis, Chhatris & Havelis | RK Stone Corporation"
        description="Explore RK Stone Corporation's work: handcrafted stone temples, royal chhatris, 3D CNC jalis, jharokhas, and water fountains in Gwalior, Dhaulpur, and Makrana stones."
        type="website"
      />

      {/* Editorial Luxury Header (Matching About / Materials pages) */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-stone-950 text-white overflow-hidden border-b border-white/10 select-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/60" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <Reveal direction="down" duration={0.8}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.1] mb-4">
              {l("OUR STONE COLLECTION", "हमारा पत्थर संग्रह")}
            </h1>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {l(
                "Handcrafted temples, royal chhatris, 3D CNC jalis, haveli jharokhas, and courtyard fountains custom made in Gwalior, Dholpur, and Makrana stones.",
                "हाथ से तराशे मंदिर, छतरियां, सीएनसी जाली, झरोखे और फव्वारे। ग्वालियर, धौलपुर और मकराना पत्थर में उपलब्ध।"
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Body with Fixed/Sticky Sidebar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Search & Sort Controls Bar */}
        <div className="mb-8 p-4 sm:p-5 bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder={l(
                "Search by craft, stone (Gwalior, Dholpur...), or design...",
                "डिज़ाइन, श्रेणी या पत्थर (ग्वालियर, धौलपुर...) से खोजें..."
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-stone-300 rounded-none bg-stone-50/50 text-sm focus:border-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden border-stone-300 text-stone-900 rounded-none h-11 px-4 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2 text-accent" />
              {l("Filters", "फ़िल्टर")} ({selectedCategories.length + selectedStones.length})
            </Button>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-11 border-stone-300 rounded-none bg-white text-xs font-semibold uppercase tracking-wider">
                <SelectValue placeholder={l("Sort Works", "क्रमबद्ध करें")} />
              </SelectTrigger>
              <SelectContent className="rounded-none border-stone-200">
                <SelectItem value="newest" className="text-xs">{l("Featured Works", "विशेष उत्पाद")}</SelectItem>
                <SelectItem value="name-asc" className="text-xs">{l("Name: A to Z", "नाम: A से Z")}</SelectItem>
                <SelectItem value="name-desc" className="text-xs">{l("Name: Z to A", "नाम: Z से A")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedCategories.length > 0 || selectedStones.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1">
              {l("Active Filters:", "सक्रिय फ़िल्टर:")}
            </span>
            {selectedCategories.map((catId) => {
              const cat = customCategories.find((c) => c.id === catId);
              return (
                <span
                  key={catId}
                  className="inline-flex items-center gap-1.5 text-xs bg-stone-900 text-white px-3 py-1 rounded-none"
                >
                  {cat ? l(cat.name, cat.hindi) : catId}
                  <button onClick={() => handleCategoryToggle(catId)} className="hover:text-accent">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {selectedStones.map((stId) => {
              const st = stoneTypes.find((s) => s.id === stId);
              return (
                <span
                  key={stId}
                  className="inline-flex items-center gap-1.5 text-xs bg-accent text-stone-950 font-semibold px-3 py-1 rounded-none"
                >
                  {l("Stone:", "पत्थर:")} {st ? l(st.nameEn, st.nameHi) : stId}
                  <button onClick={() => handleStoneToggle(stId)} className="hover:opacity-75">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            <button
              onClick={clearAllFilters}
              className="text-xs text-stone-600 hover:text-stone-950 underline font-medium ml-2 cursor-pointer"
            >
              {l("Clear All", "सभी हटाएं")}
            </button>
          </div>
        )}

        {/* Layout: Sticky Fixed Sidebar + Products Grid */}
        <div className="relative flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= STICKY FIXED SIDEBAR ================= */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8.5rem)] lg:overflow-y-auto pr-1 select-none z-20`}
          >
            <div className="bg-white border border-stone-200 shadow-sm p-6 space-y-6">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  <span className="font-heading font-medium uppercase text-sm tracking-wide text-stone-950">
                    {l("Filter Products", "फ़िल्टर करें")}
                  </span>
                </div>
                {(selectedCategories.length > 0 || selectedStones.length > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] text-accent hover:underline font-semibold uppercase tracking-wider"
                  >
                    {l("Reset", "रीसेट")}
                  </button>
                )}
              </div>

              {/* 1. Filter by Stone Palette */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-accent" />
                  {l("Filter By Stone", "पत्थर अनुसार चुनें")}
                </Label>
                <div className="space-y-2">
                  {stoneTypes.map((stone) => {
                    const isChecked = selectedStones.includes(stone.id);
                    return (
                      <div
                        key={stone.id}
                        onClick={() => handleStoneToggle(stone.id)}
                        className={`flex items-center justify-between p-2 text-xs border cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-accent/15 border-accent text-stone-950 font-bold"
                            : "border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/50"
                        }`}
                      >
                        <span className="truncate">{l(stone.nameEn, stone.nameHi)}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 accent-stone-950 pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Filter by Craft Categories */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <Label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  {l("Categories", "शिल्प श्रेणियां")}
                </Label>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {customCategories.map((category) => {
                    const isChecked = selectedCategories.includes(category.id);
                    return (
                      <label
                        key={category.id}
                        className={`flex items-center justify-between p-2 text-xs border cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-stone-900 text-white border-stone-900 font-semibold"
                            : "border-stone-100 hover:border-stone-300 hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <span className="truncate">{l(category.name, category.hindi)}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="w-3.5 h-3.5 accent-accent"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 3. Direct Workshop Contact Card (Pinned inside Sidebar) */}
              <div className="p-4 bg-stone-950 text-white border-l-2 border-accent space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-accent">
                  {l("CUSTOM SIZES AVAILABLE", "कस्टम साइज़ उपलब्ध")}
                </div>
                <h4 className="text-xs font-heading uppercase text-white font-medium leading-snug">
                  {l("Need a Custom Size or Design?", "क्या आपको कस्टम साइज़ चाहिए?")}
                </h4>
                <p className="text-[11px] text-white/70 font-light leading-relaxed">
                  {l(
                    "Send your sketch, drawings or site measurements directly to our team on WhatsApp.",
                    "अपनी ड्राइंग, फोटो या नाप सीधे हमारी टीम को व्हाट्सएप पर भेजें।"
                  )}
                </p>
                <a
                  href={`https://wa.me/919414784562?text=${encodeURIComponent(
                    "Hello RK Stone Corporation, I am browsing your online catalog and want to discuss custom dimensions and stone options for our project."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pt-1"
                >
                  <Button
                    size="sm"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold uppercase tracking-wider py-4 rounded-none cursor-pointer"
                  >
                    <WhatsAppIcon className="mr-1.5 w-3.5 h-3.5" />
                    {l("WhatsApp Drawings", "व्हाट्सएप करें")}
                  </Button>
                </a>
              </div>

            </div>
          </aside>

          {/* ================= PRODUCTS GRID ================= */}
          <div className="flex-1 w-full min-w-0">
            
            {/* Header info */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {l(`Showing ${sortedProducts.length} Works`, `कुल ${sortedProducts.length} उत्पाद प्रदर्शित`)}
              </span>
              <span className="text-xs text-stone-400 font-light hidden sm:inline">
                {l("Direct Quarry Sourcing • Pan-India Installation", "खदानों से सीधा पत्थर • पूरे भारत में इंस्टॉलेशन")}
              </span>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-stone-200 p-8">
                <p className="text-stone-500 font-light text-base mb-4">
                  {l("No products found matching your current filters.", "चुने गए फ़िल्टर के अनुसार कोई उत्पाद नहीं मिला।")}
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider rounded-none px-6 py-5 cursor-pointer"
                >
                  {l("Reset All Filters", "सभी फ़िल्टर हटाएं")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => {
                  const cardDirs: Array<"left" | "up" | "right"> = ["left", "up", "right"];
                  const dir = cardDirs[index % 3];
                  const productLink = `/product/${product.code || product._id || product.id}`;
                  const stoneName = product.stoneType || "Natural Rajasthan Stone";

                  return (
                    <Reveal key={product._id || product.id || index} direction={dir} delay={(index % 3) * 80}>
                      <div className="group bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-accent transition-all duration-500 h-full flex flex-col justify-between">
                        
                        <div>
                          {/* Image Box */}
                          <Link to={productLink} className="block relative aspect-[4/3] bg-stone-950 overflow-hidden">
                            <img
                              src={product.image?.startsWith('/uploads/') ? `${API_URL}${product.image}` : (product.image || '/placeholder.png')}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/15 pointer-events-none" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 bg-stone-950/90 text-accent text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 backdrop-blur-md border border-accent/30 flex items-center gap-1.5">
                              <span className="text-white font-extrabold">{product.code || getProductCode(product, index)}</span>
                              <span className="text-stone-400">•</span>
                              <span>{product.category?.replace('-', ' ')?.toUpperCase()}</span>
                            </div>

                            <div className="absolute top-3 right-3 bg-accent text-stone-950 text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase shadow-xs">
                              {l("CUSTOM SIZE", "कस्टम साइज़")}
                            </div>
                          </Link>

                          {/* Content */}
                          <div className="p-5 space-y-2.5">
                            {/* Stone Material Tag */}
                            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 border border-stone-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <span className="truncate">{stoneName}</span>
                            </div>

                            {/* Title */}
                            <Link to={productLink} className="block">
                              <h3 className="font-heading font-medium text-base sm:text-lg uppercase text-stone-950 hover:text-accent transition-colors line-clamp-1 leading-snug">
                                {l(product.name, product.nameHi || product.name)}
                              </h3>
                            </Link>

                            {/* Description */}
                            <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-2">
                              {l(product.description, product.descriptionHi || product.description)}
                            </p>

                            {/* Price & Dimensions Info */}
                            <div className="flex items-center justify-between pt-1 gap-2">
                              {product.price > 0 ? (
                                <div className="text-xs font-bold text-stone-950">
                                  ₹{Number(product.price).toLocaleString('en-IN')}
                                  <span className="text-[10px] text-stone-500 font-normal"> / {product.priceUnit || 'sq.ft'}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] font-bold text-accent uppercase tracking-wider">
                                  {l("Price on Request", "कोटेशन पर")}
                                </div>
                              )}
                              {product.dimensions && (
                                <span className="text-[10px] text-stone-500 font-mono bg-stone-100 px-2 py-0.5 border border-stone-200 truncate max-w-[130px]" title={product.dimensions}>
                                  📐 {product.dimensions}
                                </span>
                              )}
                            </div>

                            {/* Features list */}
                            {product.features && product.features.length > 0 && (
                              <div className="pt-1 flex items-center gap-1 text-[11px] text-stone-500 font-light">
                                <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                                <span className="truncate">{product.features[0]}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="p-5 pt-0 border-t border-stone-100 grid grid-cols-2 gap-2 mt-3">
                          <Link to={productLink} className="w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-[11px] font-semibold uppercase tracking-wider py-5 rounded-none cursor-pointer transition-colors"
                            >
                              {l("Details", "विवरण")}
                              <ArrowRight className="ml-1 w-3 h-3" />
                            </Button>
                          </Link>

                          <a
                            href={`https://wa.me/919414784562?text=${encodeURIComponent(
                              `Hi RK Stone Corporation, I am inquiring about custom rate and dimensions for: ${product.name} (Stone: ${stoneName}). Please share details.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Button
                              size="sm"
                              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold uppercase tracking-wider py-5 rounded-none cursor-pointer shadow-xs"
                            >
                              <WhatsAppIcon className="mr-1 w-3.5 h-3.5" />
                              {l("Get Quote", "कोटेशन लें")}
                            </Button>
                          </a>
                        </div>

                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Shop;
