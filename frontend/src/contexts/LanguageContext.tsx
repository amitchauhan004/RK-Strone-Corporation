import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  l: (en: string, hi: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.brand": "RK STONE CORPORATION",
    "nav.location": "JAIPUR, RAJASTHAN",
    "nav.architecture": "Architecture",
    "nav.shop": "Catalog & Shop",
    "nav.materials": "Materials",
    "nav.portfolio": "Portfolio",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.inquire": "Inquire",
    "nav.callArtisan": "Call Master Artisan",

    // Common CTAs & Badges
    "cta.getQuote": "Get Quote",
    "cta.whatsappQuote": "Get Quote on WhatsApp",
    "cta.viewDetails": "View Details",
    "cta.exploreAll": "Explore All Works",
    "cta.uploadDrawing": "Upload Drawing / Plan",
    "cta.sampleBox": "Request Stone Sample Box",
    "cta.customSize": "Custom Size Available",
    "cta.directWorkshop": "Direct Jaipur Workshop",
    "cta.genuineStone": "100% Natural Quarry Stone",
    "cta.allIndiaDelivery": "Pan-India Safe Delivery",

    // Home Hero
    "hero.badge": "HANDCRAFTED IN JAIPUR • DIRECT QUARRY",
    "hero.title": "CUSTOM STONE MANDIRS, CHHATRIS & JALIS",
    "hero.subtitle": "We make custom stone temples, garden chhatris, CNC jalis, and fountains in genuine Rajasthan sandstone and Makrana marble. Custom size made to your requirements.",
    "hero.exploreCatalog": "Explore Stone Catalog",
    "hero.orderCustom": "Order Custom Design",

    // Home What We Make
    "craft.badge": "WHAT WE MAKE",
    "craft.title": "OUR STONE WORK CATEGORIES",
    "craft.subtitle": "Temples, Chhatris, CNC Jalis, Jharokhas, and Fountains handcrafted from genuine Rajasthan stones. Any size, any design, made for your home or project.",

    // Home Stone Palette
    "stone.badge": "NATURAL RAJASTHAN STONES",
    "stone.title": "OUR STONE VARIETIES",
    "stone.subtitle": "We directly source pure Gwalior Mint, Dholpur Sandstone, Bansi Paharpur Pink, Jodhpur Red, and pure Makrana Marble. Choose any stone for your custom design.",

    // Home Process
    "process.badge": "EASY ORDER PROCESS",
    "process.title": "HOW TO ORDER FROM US",
    "process.subtitle": "From your idea or drawing to carving, fitting, and safe delivery at your site.",

    // Home Calculator
    "calc.badge": "ESTIMATE CALCULATOR",
    "calc.title": "CHECK ESTIMATED BUDGET",
    "calc.subtitle": "Select your stone and enter approximate size to get a quick idea of cost.",

    // Shop Page
    "shop.badge": "JAIPUR WORKSHOP & DIRECT QUARRY",
    "shop.title": "STONE PRODUCT CATALOG",
    "shop.subtitle": "Browse our handcrafted stone temples, royal chhatris, CNC jalis, wall panels, and fountains. Every piece can be customized to your exact dimensions.",
    "shop.searchPlaceholder": "Search by product, stone, or craft...",
    "shop.filterTitle": "FILTER PRODUCTS",
    "shop.filterByStone": "Filter by Stone",
    "shop.filterByCategory": "Filter by Category",
    "shop.resetFilters": "Reset Filters",
    "shop.showingResults": "Showing Masterpiece Works",
    "shop.noResults": "No products match your current filters.",

    // Product Detail Page
    "detail.backToCatalog": "Back to Catalog",
    "detail.catalogue": "CATALOGUE",
    "detail.itemCode": "ITEM ID",
    "detail.designCode": "DESIGN CODE",
    "detail.directQuote": "Direct Workshop Price",
    "detail.guaranteedPrice": "Direct Quarry Price",
    "detail.quoteNote": "Each architectural stone piece is custom made based on your site size and carving requirements. Contact us for an immediate rate from our Jaipur workshop.",
    "detail.customMeasurements": "Enter Custom Size for Quote",
    "detail.width": "Width (ft)",
    "detail.height": "Height (ft)",
    "detail.depth": "Depth (ft)",
    "detail.instantWhatsApp": "Get Instant Rate on WhatsApp",
    "detail.callArtisan": "Call Artisan",
    "detail.uploadElevation": "Upload Drawing / Blueprint for Quote",
    "detail.requestSample": "Request Stone Sample Box",
    "detail.description": "Product Details",
    "detail.features": "Key Features & Durability",
    "detail.specs": "Product Specifications",
    "detail.processTitle": "HOW WE MAKE & DELIVER YOUR WORK",
    "detail.processSubtitle": "From raw stone block selection to dry-fit trial and safe all-India delivery.",
    "detail.relatedWorks": "Related Stone Works",
    "detail.askQuestion": "Ask About This Piece",
    "detail.askSubtitle": "Send your question and our master craftsman will reply with drawings and prices within 4 hours.",
    "detail.reviews": "Verified Client Feedback",
  },
  hi: {
    // Navigation
    "nav.brand": "आरके स्टोन कॉर्पोरेशन",
    "nav.location": "जयपुर, राजस्थान",
    "nav.architecture": "शिल्प कला",
    "nav.shop": "कैटलॉग और शॉप",
    "nav.materials": "पत्थर प्रकार",
    "nav.portfolio": "हमारे काम",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.inquire": "पूछताछ करें",
    "nav.callArtisan": "कारीगर से बात करें",

    // Common CTAs & Badges
    "cta.getQuote": "रेट जानें",
    "cta.whatsappQuote": "व्हाट्सएप पर रेट पूछें",
    "cta.viewDetails": "विवरण देखें",
    "cta.exploreAll": "सभी काम देखें",
    "cta.uploadDrawing": "ड्राइंग या फोटो भेजें",
    "cta.sampleBox": "पत्थर का सैंपल मंगाएं",
    "cta.customSize": "कस्टम साइज में उपलब्ध",
    "cta.directWorkshop": "सीधा जयपुर कारखाना",
    "cta.genuineStone": "100% असली प्राकृतिक पत्थर",
    "cta.allIndiaDelivery": "पूरे भारत में सुरक्षित डिलीवरी",

    // Home Hero
    "hero.badge": "जयपुर में हस्तनिर्मित • सीधा खदान से",
    "hero.title": "कस्टम नक्काशीदार मंदिर, छतरियां और जाली",
    "hero.subtitle": "हम मकराना सफेद संगमरमर, बंसी पहाड़पुर और धौलपुर सैंडस्टोन में आपकी पसंद के साइज में मंदिर, छतरियां, सीएनसी जाली और फव्वारे बनाते हैं।",
    "hero.exploreCatalog": "कैटलॉग देखें",
    "hero.orderCustom": "कस्टम ऑर्डर दें",

    // Home What We Make
    "craft.badge": "हम क्या बनाते हैं",
    "craft.title": "हमारे पत्थर शिल्प की श्रेणियां",
    "craft.subtitle": "नक्काशीदार मंदिर, शाही छतरियां, सीएनसी जाली, झरोखे और वाटर फाउंटेन। आपके घर या प्रोजेक्ट के लिए किसी भी साइज और डिज़ाइन में तैयार।",

    // Home Stone Palette
    "stone.badge": "राजस्थान के प्राकृतिक पत्थर",
    "stone.title": "हमारे पत्थरों की किस्में",
    "stone.subtitle": "हम सीधे खदानों से ग्वालियर मिंट, धौलपुर सैंडस्टोन, बंसी पहाड़पुर पिंक, जोधपुर लाल पत्थर और मकराना मार्बल लाते हैं। अपनी पसंद के पत्थर में काम करवाएं।",

    // Home Process
    "process.badge": "ऑर्डर करने का आसान तरीका",
    "process.title": "हमसे कैसे ऑर्डर करें",
    "process.subtitle": "आपकी सोच या ड्राइंग से लेकर पत्थर तराशने, ट्रायल फिटिंग और साइट पर सुरक्षित डिलीवरी तक का सफर।",

    // Home Calculator
    "calc.badge": "बजट कैलकुलेटर",
    "calc.title": "अनुमानित खर्च जानें",
    "calc.subtitle": "अपनी पसंद का पत्थर और साइज चुनें और एक क्लिक में बजट का अनुमान प्राप्त करें।",

    // Shop Page
    "shop.badge": "जयपुर वर्कशॉप एवं सीधी खदान",
    "shop.title": "पत्थर शिल्प कैटलॉग",
    "shop.subtitle": "हमारे नक्काशीदार पत्थर मंदिर, शाही छतरियां, 3D सीएनसी जाली और फव्वारे देखें। हर एक डिज़ाइन आपके नाप के अनुसार कस्टमाइज किया जा सकता है।",
    "shop.searchPlaceholder": "उत्पाद, पत्थर या श्रेणी खोजें...",
    "shop.filterTitle": "फिल्टर करें",
    "shop.filterByStone": "पत्थर अनुसार चुनें",
    "shop.filterByCategory": "श्रेणी अनुसार चुनें",
    "shop.resetFilters": "सभी फिल्टर हटाएं",
    "shop.showingResults": "उपलब्ध मास्टरपीस शिल्प",
    "shop.noResults": "आपकी पसंद के अनुसार कोई उत्पाद नहीं मिला।",

    // Product Detail Page
    "detail.backToCatalog": "कैटलॉग पर वापस जाएं",
    "detail.catalogue": "कैटलॉग",
    "detail.itemCode": "आइटम कोड",
    "detail.designCode": "डिज़ाइन कोड",
    "detail.directQuote": "सीधा कारखाना भाव",
    "detail.guaranteedPrice": "खदान की गारंटीड दर",
    "detail.quoteNote": "प्रत्येक काम आपके साइट के साइज और नक्काशी के आधार पर कस्टमाइज होता है। जयपुर वर्कशॉप से तुरंत पक्का रेट जानने के लिए संपर्क करें।",
    "detail.customMeasurements": "अपने साइट का नाप (साइज) भरें",
    "detail.width": "चौड़ाई (फीट)",
    "detail.height": "ऊंचाई (फीट)",
    "detail.depth": "गहराई (फीट)",
    "detail.instantWhatsApp": "व्हाट्सएप पर तुरंत रेट पाएं",
    "detail.callArtisan": "कारीगर से बात करें",
    "detail.uploadElevation": "ड्राइंग या एलिवेशन भेजें",
    "detail.requestSample": "पत्थर का सैंपल मंगाएं",
    "detail.description": "शिल्प का विवरण",
    "detail.features": "मुख्य विशेषताएं और मजबूती",
    "detail.specs": "माप व तकनीकी विवरण",
    "detail.processTitle": "काम तैयार करने का तरीका",
    "detail.processSubtitle": "खदान से ब्लॉक चुनने से लेकर वर्कशॉप में ड्राई-फिट और पूरे भारत में सुरक्षित डिलीवरी।",
    "detail.relatedWorks": "अन्य संबंधित शिल्प",
    "detail.askQuestion": "इस काम के बारे में पूछें",
    "detail.askSubtitle": "अपना सवाल भेजें, हमारे मुख्य कारीगर 4 घंटे के भीतर ड्राइंग और रेट के साथ जवाब देंगे।",
    "detail.reviews": "ग्राहकों के अनुभव",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("rk_lang") as Language;
      return saved === "hi" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("rk_lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  const l = (en: string, hi: string): string => {
    return language === "hi" ? hi : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, l }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
