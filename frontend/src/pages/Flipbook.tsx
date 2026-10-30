import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Grid, 
  Share2, 
  BookOpen, 
  ArrowLeft, 
  Phone, 
  Check, 
  MapPin, 
  Mail, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  User,
  Building,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { products as allProducts } from "@/data/products";
import logoImg from "@/assets/logo.png";

// Helper to look up a product by name from our scraped database of 122 products
function getProductData(name: string) {
  const found = allProducts.find(p => p.name.toLowerCase() === name.toLowerCase());
  return {
    name: found?.name || name,
    nameHi: found?.nameHi || name,
    image: found?.image || "/placeholder.png",
    code: found?.code || "",
    category: found?.category || "stone-temple",
    id: found?.id || ""
  };
}

// 59 Products across Pages 3, 4, 5, 6, 7 structured exactly as in the official flipbook
const FLIPBOOK_PAGES_DATA = [
  // Page 1: Cover
  {
    pageNum: 1,
    type: "cover" as const,
    titleEn: "Cover: Natural Sandstone Products",
    titleHi: "कवर: प्राकृतिक सैंडस्टोन उत्पाद",
    scannedSrc: "/flipbook/page-1.jpg"
  },
  // Page 2: About Us
  {
    pageNum: 2,
    type: "about" as const,
    titleEn: "About Us: RK Stone Corporation",
    titleHi: "हमारे बारे में: आर.के. स्टोन कॉर्पोरेशन",
    scannedSrc: "/flipbook/page-2.jpg"
  },
  // Page 3: Sandstone Temples & Temple Entry Gates (12 Products)
  {
    pageNum: 3,
    type: "products" as const,
    titleEn: "Sandstone Temples & Entry Gates",
    titleHi: "सैंडस्टोन मंदिर एवं प्रवेश द्वार",
    scannedSrc: "/flipbook/page-3.jpg",
    sections: [
      {
        titleEn: "SANDSTONE TEMPLE",
        titleHi: "सैंडस्टोन मंदिर",
        items: [
          "Carved Sandstone Temple",
          "Hand Carved Sandstone Temple",
          "Handcrafted Sandstone Temple",
          "High Quality White Sandstone Temple",
          "Indian Style Sandstone Temple",
          "Natural Red Sandstone Temple",
          "Premium Sandstone Hindu Temple",
          "Sandstone Outdoor Temple"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE TEMPLE ENTRY GATE",
        titleHi: "सैंडस्टोन मंदिर प्रवेश द्वार",
        items: [
          "Designer Sandstone Temple Entrance Gate",
          "Hand Carved Sandstone Temple Entry Gate",
          "Handcrafted Sandstone Temple Main Gate",
          "Heavy Duty Sandstone Entry Gate for Temple"
        ].map(getProductData)
      }
    ]
  },
  // Page 4: Temple Entry Gates (Cont.) & Dholpur Temples (11 Products)
  {
    pageNum: 4,
    type: "products" as const,
    titleEn: "Entry Gates & Dholpur Temples",
    titleHi: "प्रवेश द्वार एवं धौलपुर मंदिर",
    scannedSrc: "/flipbook/page-4.jpg",
    sections: [
      {
        titleEn: "SANDSTONE TEMPLE ENTRY GATE (CONT.)",
        titleHi: "सैंडस्टोन मंदिर प्रवेश द्वार (क्रमशः)",
        items: [
          "Natural Sandstone Entry Gate with Traditional Carving",
          "Solid Sandstone Temple Entry Gate",
          "Traditional Sandstone Entry Gate for Temple"
        ].map(getProductData)
      },
      {
        titleEn: "DHOLPUR SANDSTONE TEMPLE",
        titleHi: "धौलपुर सैंडस्टोन मंदिर",
        items: [
          "17 Foot Dholpur Pink Sand Stone Temple",
          "20 Feet Dholpur Sand Stone Temple",
          "21 Feet Dholpur Sandstone Temple",
          "23 Feet Dholpur Sandstone Temple",
          "Custom Made Dholpur Sandstone Temple",
          "Dholpur Pink Sandstone Temple",
          "Dholpur Red Sandstone Temple",
          "Dholpur Stone Outdoor Temple"
        ].map(getProductData)
      }
    ]
  },
  // Page 5: Sandstone Grills, Lamps & Gazebos (12 Products)
  {
    pageNum: 5,
    type: "products" as const,
    titleEn: "Sandstone Grills, Lamps & Gazebos",
    titleHi: "सैंडस्टोन जाली, लैंप एवं गज़ेबो",
    scannedSrc: "/flipbook/page-5.jpg",
    sections: [
      {
        titleEn: "SANDSTONE GRILL",
        titleHi: "सैंडस्टोन जाली / ग्रिल",
        items: [
          "Artistic Sandstone Grill",
          "Custom Made Sandstone Grill",
          "Decorative Sandstone Grill for Exterior Walls",
          "Designer Sandstone Grill for Temple"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE LAMP",
        titleHi: "सैंडस्टोन लैंप / प्रकाश स्तंभ",
        items: [
          "Artistic Sandstone Lamp Post",
          "Contemporary White Sandstone Lamp",
          "Custom Made Sandstone Lamp Post",
          "Decorative Sandstone Lamp Post"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE GAZEBO",
        titleHi: "सैंडस्टोन गज़ेबो / छतरी",
        items: [
          "Brown Sandstone Outdoor Gazebo",
          "Decorative Sandstone Gazebo for Luxury Garden",
          "Dome White Sandstone Garden Gazebo",
          "Handcrafted Sandstone Gazebo"
        ].map(getProductData)
      }
    ]
  },
  // Page 6: Fountains, Garden Benches & Planters (12 Products)
  {
    pageNum: 6,
    type: "products" as const,
    titleEn: "Fountains, Garden Benches & Planters",
    titleHi: "वाटर फाउंटेन, गार्डन बेंच एवं गमले",
    scannedSrc: "/flipbook/page-6.jpg",
    sections: [
      {
        titleEn: "SANDSTONE FOUNTAINS",
        titleHi: "सैंडस्टोन वाटर फाउंटेन",
        items: [
          "Hand Carved Sandstone Fountains",
          "Handcrafted Sandstone Water Fountains",
          "Heritage Style Sandstone Fountains",
          "Natural Sandstone Fountains for Outdoor"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE GARDEN BENCH",
        titleHi: "सैंडस्टोन गार्डन बेंच / बैठक",
        items: [
          "2 Seater Sandstone Garden Bench",
          "Designer Round Sandstone Table Bench Set",
          "Handcrafted Red Sandstone Table Bench Set",
          "Red Sandstone Garden Bench"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE PLANTER",
        titleHi: "सैंडस्टोन गमले / प्लांटर",
        items: [
          "Brown Sandstone Garden Planter",
          "Decorative Garden Sandstone Planter",
          "Hand Carved Sandstone Planter",
          "Handcrafted Sandstone Planter"
        ].map(getProductData)
      }
    ]
  },
  // Page 7: Spheres, Elephant Statues & God Statues (12 Products)
  {
    pageNum: 7,
    type: "products" as const,
    titleEn: "Spheres, Elephants & God Statues",
    titleHi: "सजावटी बॉल्स, गजराज एवं देव प्रतिमाएं",
    scannedSrc: "/flipbook/page-7.jpg",
    sections: [
      {
        titleEn: "SANDSTONE BALL SPHERE",
        titleHi: "सैंडस्टोन बॉल / सजावटी स्फीयर",
        items: [
          "Decorative Sandstone Sphere",
          "Modern Polished Rainbow Sandstone Ball",
          "Natural Sandstone Sphere",
          "Solid Rainbow Sandstone Ball"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE ELEPHANT STATUE",
        titleHi: "सैंडस्टोन गजराज (हाथी) मूर्ति",
        items: [
          "Artisan Crafted Sandstone Elephant Sculpture",
          "Decorative Sandstone Elephant Statue",
          "Hand Carved Sandstone Elephant Statue",
          "Handcrafted Sandstone Elephant Statue"
        ].map(getProductData)
      },
      {
        titleEn: "SANDSTONE GOD STATUE",
        titleHi: "सैंडस्टोन देव प्रतिमाएं",
        items: [
          "Sandstone Adi Guru Shankaracharya Statue",
          "Sandstone Sherawali Mata Statue",
          "Sandstone Standing Vishnu Bhagwan Statue",
          "White Sandstone Buddha Statue"
        ].map(getProductData)
      }
    ]
  },
  // Page 8: Contact Us / Back Cover
  {
    pageNum: 8,
    type: "contact" as const,
    titleEn: "Contact Us: Jaipur Workshop & Headquarters",
    titleHi: "संपर्क: जयपुर वर्कशॉप एवं मुख्यालय",
    scannedSrc: "/flipbook/page-8.jpg"
  }
];

export default function Flipbook() {
  const { l, language } = useLanguage();
  const { siteSettings } = useSiteSettings();
  const [currentPage, setCurrentPage] = useState(1);
  const [isTwoPage, setIsTwoPage] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto detect screen size for single vs two-page spread
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 960) {
        setIsTwoPage(false);
      } else {
        setIsTwoPage(true);
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isTwoPage, isFullscreen]);

  const playTurnSound = () => {
    if (isSoundEnabled) {
      try {
        const audio = new Audio("/flipbook/turnPage.mp3");
        audio.volume = 0.4;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  const goToNext = () => {
    if (isTwoPage) {
      if (currentPage === 1) {
        changePage(2);
      } else if (currentPage >= 2 && currentPage <= 5) {
        changePage(currentPage + 2);
      } else if (currentPage === 6 || currentPage === 7) {
        changePage(8);
      }
    } else {
      if (currentPage < 8) {
        changePage(currentPage + 1);
      }
    }
  };

  const goToPrev = () => {
    if (isTwoPage) {
      if (currentPage === 8) {
        changePage(6);
      } else if (currentPage > 2) {
        changePage(currentPage - 2);
      } else if (currentPage === 2 || currentPage === 3) {
        changePage(1);
      }
    } else {
      if (currentPage > 1) {
        changePage(currentPage - 1);
      }
    }
  };

  const changePage = (newPage: number) => {
    if (newPage === currentPage) return;
    setIsFlipping(true);
    playTurnSound();
    setCurrentPage(newPage);
    setTimeout(() => {
      setIsFlipping(false);
    }, 380);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine left and right page numbers
  let leftPageNum: number | null = null;
  let rightPageNum: number | null = null;

  if (isTwoPage) {
    if (currentPage === 1) {
      rightPageNum = 1;
    } else if (currentPage === 8) {
      leftPageNum = 8;
    } else {
      const start = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      leftPageNum = start;
      rightPageNum = start + 1 <= 8 ? start + 1 : null;
    }
  } else {
    rightPageNum = currentPage;
  }

  const leftPageData = leftPageNum ? FLIPBOOK_PAGES_DATA[leftPageNum - 1] : null;
  const rightPageData = rightPageNum ? FLIPBOOK_PAGES_DATA[rightPageNum - 1] : null;

  // Header Banner Component for Catalog Pages (Matching original black & gold header)
  const renderCatalogHeader = (sectionLabel: string) => (
    <div className="relative bg-black text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between overflow-hidden shadow-sm shrink-0">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-2 z-10">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-stone-900 border border-amber-500/60 p-0.5 flex items-center justify-center">
          <img src={logoImg} alt="RK Stone" className="w-full h-full object-contain" />
        </div>
        <span className="font-heading font-semibold text-xs sm:text-sm tracking-wider text-white">
          RK Stone Corporation
        </span>
      </div>

      {/* Decorative Diagonal Gold/Amber Stripes */}
      <div className="absolute right-24 sm:right-32 top-0 bottom-0 w-24 sm:w-32 flex -skew-x-30 opacity-80 pointer-events-none">
        <div className="flex-1 bg-[#D4AF37]" />
        <div className="w-2 bg-black" />
        <div className="flex-1 bg-[#8B5A2B]" />
        <div className="w-2 bg-black" />
        <div className="flex-1 bg-[#D4AF37]" />
      </div>

      {/* Right: Section Title */}
      <div className="z-10 font-heading font-extrabold text-sm sm:text-base tracking-wider uppercase text-[#D4AF37] drop-shadow-xs">
        {sectionLabel}
      </div>
    </div>
  );

  // Render a Single Flipbook Page
  const renderPage = (page: typeof FLIPBOOK_PAGES_DATA[0], isLeftOfSpread: boolean) => {

    // ================= PAGE 1: COVER =================
    if (page.type === "cover") {
      return (
        <div 
          className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-white overflow-hidden select-text"
          style={{
            backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.75), rgba(0, 0, 0, 0.90)), url('/assets/Stone-Temple.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Top Gold Corner Motifs */}
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-amber-300 font-bold">
                JAIPUR • RAJASTHAN • INDIA
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-300 uppercase">
              ESTD. 2009
            </span>
          </div>

          {/* Central Title */}
          <div className="text-center space-y-3 my-auto py-6">
            <div className="inline-block p-1 border border-amber-500/30 bg-black/40 backdrop-blur-xs">
              <img src={logoImg} alt="RK Stone Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto object-contain" />
            </div>
            
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-wider uppercase text-white drop-shadow-lg">
              RK STONE CORPORATION
            </h1>
            
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            
            <p className="font-serif text-sm sm:text-base lg:text-lg tracking-widest uppercase text-amber-300 font-medium">
              {l("NATURAL SANDSTONE PRODUCTS", "प्राकृतिक सैंडस्टोन उत्पाद संग्रह")}
            </p>
            
            <div className="pt-2">
              <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 font-mono text-xs uppercase tracking-wider">
                {l("Official Flipbook Catalogue • 59 Key Works", "आधिकारिक फ्लिपबुक कैटलॉग • 59 प्रमुख उत्पाद")}
              </span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="border-t border-amber-500/40 pt-3 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-300">
              {l("Direct Workshop & Quarry Sourcing", "डायरेक्ट वर्कशॉप एवं खदान आपूर्ति")}
            </span>
            <Button
              onClick={goToNext}
              size="sm"
              className="bg-[#D4AF37] hover:bg-[#b89528] text-stone-950 font-bold font-mono text-xs uppercase tracking-wider rounded-none cursor-pointer"
            >
              <span>{l("Open Catalog", "कैटलॉग खोलें")}</span>
              <ChevronRight className="ml-1 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      );
    }

    // ================= PAGE 2: ABOUT US =================
    if (page.type === "about") {
      return (
        <div className="relative w-full h-full bg-[#FAF9F6] text-stone-900 flex flex-col justify-between overflow-hidden select-text">
          {/* Header */}
          {renderCatalogHeader("ABOUT US")}

          {/* Main About Us Body */}
          <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto">
            {/* Left: Company Narrative */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-heading font-bold text-lg sm:text-xl uppercase text-stone-950 tracking-wide border-b-2 border-amber-500/40 pb-1.5">
                {l("ABOUT RK STONE CORPORATION", "आर.के. स्टोन कॉर्पोरेशन के बारे में")}
              </h2>

              <p className="text-xs sm:text-[13px] text-stone-700 font-light leading-relaxed text-justify">
                {l(
                  "RK Stone Corporation, established in 2009, is a renowned Manufacturer and Supplier of premium sandstone products based in Rajasthan, India. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, and Dholpur Sandstone Temples that reflect timeless Indian architecture. Its diverse product range includes Sandstone Grills, Lamps, Gazebos, Fountains, Garden Benches, Planters, and Decorative Sandstone Spheres.",
                  "आर.के. स्टोन कॉर्पोरेशन, जिसकी स्थापना वर्ष 2009 में हुई थी, राजस्थान (भारत) में स्थित प्रीमियम सैंडस्टोन उत्पादों का एक प्रतिष्ठित निर्माता एवं आपूर्तिकर्ता है। कंपनी विशेष रूप से हस्तनिर्मित सैंडस्टोन मंदिर, भव्य मंदिर प्रवेश द्वार, एवं धौलपुर सैंडस्टोन मंदिर निर्माण में दक्ष है जो पारंपरिक भारतीय स्थापत्य कला को दर्शाते हैं। इसके विस्तृत उत्पाद संग्रह में सैंडस्टोन जाली/ग्रिल, लैंप पोस्ट, गज़ेबो (छतरी), फाउंटेन, गार्डन बेंच, गमले एवं सजावटी पाषाण बॉल्स शामिल हैं।"
                )}
              </p>

              <p className="text-xs sm:text-[13px] text-stone-700 font-light leading-relaxed text-justify">
                {l(
                  "RK Stone Corporation is also known for artistic sandstone statues such as Elephants, Gods, Angels, Mother Child figures, Wall Murals, and Red Sandstone Ashok Stambh with Pillar. With skilled craftsmanship and quality focus, the company serves domestic markets reliably.",
                  "कंपनी कलात्मक पाषाण मूर्तियों जैसे अलंकृत हाथी, देवी-देवताओं की प्रतिमाएं, वॉल म्यूरल एवं लाल सैंडस्टोन अशोक स्तंभ निर्माण हेतु भी विख्यात है। कुशल कारीगरी और गुणवत्ता पर अटूट ध्यान के साथ कंपनी पूरे देश में विश्वसनीय आपूर्ति करती है।"
                )}
              </p>

              {/* Founder & Corporate Highlights Box */}
              <div className="space-y-2 pt-2">
                <div className="p-2.5 bg-stone-900 text-white flex items-center justify-between border-l-4 border-amber-400">
                  <span className="text-xs font-mono uppercase text-stone-300">{l("Name of Founder:", "संस्थापक का नाम:")}</span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-amber-300">Mr. Rajendra Saini</span>
                </div>
                <div className="p-2.5 bg-stone-900 text-white flex items-center justify-between border-l-4 border-amber-400">
                  <span className="text-xs font-mono uppercase text-stone-300">{l("Year of Establishment:", "स्थापना वर्ष:")}</span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-amber-300">2009</span>
                </div>
                <div className="p-2.5 bg-stone-900 text-white flex items-center justify-between border-l-4 border-amber-400">
                  <span className="text-xs font-mono uppercase text-stone-300">{l("Nature of Business:", "व्यवसाय का प्रकार:")}</span>
                  <span className="font-heading font-bold text-xs sm:text-sm text-amber-300">Manufacturer, Supplier</span>
                </div>
              </div>
            </div>

            {/* Right: Specimen Photographs */}
            <div className="flex flex-col justify-between gap-2.5">
              <div className="aspect-[16/10] bg-stone-200 rounded-lg overflow-hidden border border-stone-300 shadow-sm relative group">
                <img 
                  src="https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/designer-sandstone-temple-entrance-gate-1769601091-8558036.jpeg" 
                  alt="Temple Entrance Gate" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-1.5 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5">
                  {l("Temple Entry Gates", "मंदिर प्रवेश द्वार")}
                </span>
              </div>

              <div className="aspect-[16/10] bg-stone-200 rounded-lg overflow-hidden border border-stone-300 shadow-sm relative group">
                <img 
                  src="https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/premium-white-sandstone-lamp-post-1769680741-8559738.jpeg" 
                  alt="Sandstone Lamp Posts" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-1.5 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5">
                  {l("Sandstone Lamp Posts", "सैंडस्टोन लैंप पोस्ट")}
                </span>
              </div>

              <div className="aspect-[16/10] bg-stone-200 rounded-lg overflow-hidden border border-stone-300 shadow-sm relative group">
                <img 
                  src="https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/designer-round-sandstone-table-bench-set-1769685508-8559988.jpeg" 
                  alt="Sandstone Garden Benches" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-1.5 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5">
                  {l("Sandstone Garden Benches", "सैंडस्टोन गार्डन बेंच")}
                </span>
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="bg-stone-100 border-t border-stone-300 px-4 py-1.5 flex items-center justify-between text-[10px] font-mono text-stone-600">
            <span>RK Stone Corporation • Jaipur</span>
            <span className="font-bold text-stone-900">Page 2 of 8</span>
          </div>
        </div>
      );
    }

    // ================= PAGES 3, 4, 5, 6, 7: PRODUCTS (PHOTO + NAME) =================
    if (page.type === "products") {
      return (
        <div className="relative w-full h-full bg-[#FFFFFF] text-stone-950 flex flex-col justify-between overflow-hidden select-text">
          {/* Header */}
          {renderCatalogHeader("PRODUCTS")}

          {/* Product Sections Container */}
          <div className="flex-1 p-3 sm:p-4 md:p-5 overflow-y-auto space-y-4 sm:space-y-5">
            {page.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                {/* Section Title */}
                <div className="border-b-2 border-stone-900 pb-1 flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-stone-950">
                    {language === "hi" ? section.titleHi : section.titleEn}
                  </h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    {section.items.length} {l("Items", "उत्पाद")}
                  </span>
                </div>

                {/* Clean Product Grid: Photo + Name Only */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {section.items.map((prod, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="flex flex-col items-center group cursor-pointer text-center"
                      onClick={() => {
                        window.open(
                          `https://wa.me/919414784562?text=${encodeURIComponent(
                            `Hi RK Stone Corporation, I am inquiring about: ${prod.name} (from Flipbook Page ${page.pageNum}). Please share price and catalog details.`
                          )}`,
                          "_blank"
                        );
                      }}
                      title={l(`Inquire on WhatsApp for ${prod.name}`, `${prod.name} हेतु व्हाट्सएप पर पूछताछ करें`)}
                    >
                      {/* Photo Container */}
                      <div className="w-full aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-300 shadow-2xs group-hover:border-accent group-hover:shadow-md transition-all duration-300 relative">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                      </div>

                      {/* Name Below Photo */}
                      <span className="mt-1 text-[9px] sm:text-[10.5px] font-semibold text-stone-900 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                        {language === "hi" ? prod.nameHi : prod.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Page Footer */}
          <div className="bg-stone-100 border-t border-stone-200 px-4 py-1.5 flex items-center justify-between text-[10px] font-mono text-stone-600 shrink-0">
            <span className="truncate max-w-[200px] sm:max-w-sm">
              {language === "hi" ? page.titleHi : page.titleEn}
            </span>
            <span className="font-bold text-stone-900">Page {page.pageNum} of 8</span>
          </div>
        </div>
      );
    }

    // ================= PAGE 8: CONTACT US (BACK COVER) =================
    if (page.type === "contact") {
      return (
        <div className="relative w-full h-full bg-[#FAF9F6] flex flex-col justify-between overflow-hidden select-text text-stone-900">
          {/* Header */}
          {renderCatalogHeader("CONTACT")}

          {/* Main Content Area */}
          <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
            
            {/* Brand Title */}
            <div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase text-stone-950 tracking-wider">
                RK STONE
              </h2>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase text-[#D4AF37] tracking-wider -mt-1">
                CORPORATION
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mt-2 mb-4" />
            </div>

            {/* Official Contact Directory - Exactly Matching Our Site */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              
              {/* Contact Person */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("CONTACT PERSON", "संपर्क सूत्र")}
                  </strong>
                  <span className="text-stone-800 font-semibold text-sm">Mr. Rajendra Saini</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("ADDRESS (JAIPUR WORKSHOP & YARD)", "कारखाना एवं वर्कशॉप का पता")}
                  </strong>
                  <span className="text-stone-800 leading-snug">
                    {siteSettings.workshopAddress || "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India"}
                  </span>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("CALL US", "फ़ोन / कॉल करें")}
                  </strong>
                  <div className="flex items-center gap-2 font-mono font-bold text-sm">
                    <a href="tel:+919414784562" className="text-stone-950 hover:text-accent">
                      +91 94147 84562
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("EMAIL ID", "ईमेल")}
                  </strong>
                  <a href="mailto:contact@rkstonecorporation.com" className="text-stone-800 hover:underline font-mono">
                    contact@rkstonecorporation.com
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("WEBSITE", "आधिकारिक वेबसाइट")}
                  </strong>
                  <a 
                    href="https://www.rkstonecorporation.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-950 font-bold hover:text-accent underline font-mono text-sm inline-flex items-center gap-1"
                  >
                    <span>www.rkstonecorporation.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                  </a>
                </div>
              </div>

              {/* GSTIN */}
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-stone-950 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-950 block font-heading uppercase text-xs tracking-wider">
                    {l("GST REGISTRATION", "जीएसटी नंबर")}
                  </strong>
                  <span className="font-mono font-bold text-stone-900 tracking-wider">
                    {siteSettings.gstNumber || "08CUUPS3588K1ZE"}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row: QR Code & Direct Buttons */}
            <div className="pt-2 border-t border-stone-300 flex items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-mono uppercase text-stone-600 block">
                  {l("Scan with mobile to visit website & view 122+ works:", "मोबाइल से स्कैन कर 122+ उत्पाद देखें:")}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/919414784562?text=Hi%20RK%20Stone%20Corporation,%20I%20have%20reviewed%20your%20flipbook.%20Please%20connect%20regarding%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-[11px] font-bold uppercase px-3 py-2 rounded-sm shadow-xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919414784562"
                    className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white font-mono text-[11px] font-bold uppercase px-3 py-2 rounded-sm shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{l("Call", "कॉल")}</span>
                  </a>
                </div>
              </div>

              {/* Scannable QR Code */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 p-1.5 bg-white border-2 border-stone-900 rounded-sm shrink-0 shadow-md">
                <img 
                  src="/flipbook/qr-website.png" 
                  alt="QR to www.rkstonecorporation.com" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>

          {/* Page Footer */}
          <div className="bg-stone-900 text-white px-4 py-2 flex items-center justify-between text-[10px] font-mono shrink-0">
            <span className="text-stone-300">www.rkstonecorporation.com • Direct Quarry & Workshop</span>
            <span className="font-bold text-amber-400">Page 8 of 8</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-[#111111] text-white flex flex-col ${isFullscreen ? "p-0" : "pt-24 pb-16"}`}
      style={{
        backgroundImage: "radial-gradient(ellipse at 50% 20%, rgba(173,107,16,0.18) 0%, rgba(10,10,10,0.98) 75%), url('/flipbook/flip-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <Seo 
        title="Official Product Catalog Flipbook | RK Stone Corporation Jaipur"
        description="Explore all 59 signature sandstone works across temples, 3D CNC jalis, haveli gates, fountains, and royal chhatris in the official interactive flipbook of RK Stone Corporation Jaipur."
      />

      {/* Top Floating Controls Bar */}
      <div className="container mx-auto px-4 max-w-7xl mb-4">
        <div className="bg-[#181818]/95 backdrop-blur-md border border-white/15 p-3 sm:p-4 rounded-none shadow-2xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Back link */}
          <div className="flex items-center gap-2">
            <Link 
              to="/shop" 
              className="p-2 border border-white/20 bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5"
              title={l("Back to Products", "उत्पाद सूची पर लौटें")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">{l("Back to Shop", "शॉप पर लौटें")}</span>
            </Link>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            
            {/* Page Jump Selector */}
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/20 px-2.5 py-1.5 text-xs font-mono">
              <span className="text-stone-400 text-[11px] hidden md:inline">{l("Page", "पृष्ठ")}:</span>
              <select
                value={currentPage}
                onChange={(e) => changePage(Number(e.target.value))}
                aria-label={l("Select Page", "पृष्ठ चुनें")}
                className="bg-transparent text-accent font-bold cursor-pointer outline-none text-xs"
              >
                {FLIPBOOK_PAGES_DATA.map((p) => (
                  <option key={p.pageNum} value={p.pageNum} className="bg-stone-900 text-white">
                    {p.pageNum}: {l(p.titleEn, p.titleHi)}
                  </option>
                ))}
              </select>
              <span className="text-stone-500">/ 8</span>
            </div>

            {/* Layout Toggle: Single vs Two-Page (Desktop only) */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTwoPage(!isTwoPage)}
              className="hidden md:flex border-white/20 bg-white/5 hover:bg-white/10 text-xs text-stone-300 rounded-none h-8 px-2.5"
              title={isTwoPage ? l("Switch to Single Page", "एकल पृष्ठ पर स्विच करें") : l("Switch to Two-Page Spread", "दोहरे पृष्ठ पर स्विच करें")}
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-accent" />
              <span>{isTwoPage ? l("2-Page Spread", "दोहरा पृष्ठ") : l("Single Page", "एकल पृष्ठ")}</span>
            </Button>

            {/* Sound Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-xs text-stone-300 rounded-none h-8 w-8 p-0"
              title={isSoundEnabled ? l("Mute Turn Sound", "आवाज बंद करें") : l("Enable Turn Sound", "आवाज चालू करें")}
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-accent" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
            </Button>

            {/* Zoom Controls */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(prev => prev < 1.5 ? prev + 0.25 : 1)}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-xs text-stone-300 rounded-none h-8 w-8 p-0"
              title={l("Zoom Page", "बड़ा करें")}
            >
              {zoom > 1 ? <RotateCcw className="w-3.5 h-3.5 text-accent" /> : <ZoomIn className="w-3.5 h-3.5" />}
            </Button>

            {/* Thumbnails Drawer Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`border-white/20 text-xs rounded-none h-8 px-2.5 ${showThumbnails ? "bg-accent text-stone-950 font-bold" : "bg-white/5 hover:bg-white/10 text-stone-300"}`}
              title={l("Toggle Thumbnails", "थंबनेल देखें")}
            >
              <Grid className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">{l("Pages", "पृष्ठ")}</span>
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="hidden sm:flex border-white/20 bg-white/5 hover:bg-white/10 text-xs text-stone-300 rounded-none h-8 w-8 p-0"
              title={isFullscreen ? l("Exit Fullscreen", "फुलस्क्रीन से बाहर निकलें") : l("Fullscreen", "फुलस्क्रीन")}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-accent" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </Button>

            {/* Share Link */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-xs text-stone-300 rounded-none h-8 w-8 p-0"
              title={l("Copy Link", "लिंक कॉपी करें")}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </Button>

            {/* Direct PDF Download */}
            <a
              href="/flipbook/rk_stone_corporation_catalog.pdf"
              download="RK_Stone_Corporation_Jaipur_Brochure.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-stone-950 text-xs font-bold font-mono uppercase tracking-wider rounded-none shadow-gold transition-transform hover:scale-[1.02]"
              title={l("Download Official Flipbook PDF (3.8 MB)", "आधिकारिक फ्लिपबुक पीडीएफ डाउनलोड करें (3.8 MB)")}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{l("Download PDF", "पीडीएफ डाउनलोड")}</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Flipbook Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-2 sm:px-6 my-auto select-none">
        
        {/* Prev Arrow */}
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/90 hover:bg-accent border border-white/20 hover:border-accent text-white hover:text-stone-950 flex items-center justify-center transition-all shadow-2xl backdrop-blur-sm cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed group ${currentPage === 1 ? "pointer-events-none" : ""}`}
          aria-label={l("Previous Page", "पिछला पृष्ठ")}
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={goToNext}
          disabled={currentPage === 8}
          className={`absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/90 hover:bg-accent border border-white/20 hover:border-accent text-white hover:text-stone-950 flex items-center justify-center transition-all shadow-2xl backdrop-blur-sm cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed group ${currentPage === 8 ? "pointer-events-none" : ""}`}
          aria-label={l("Next Page", "अगला पृष्ठ")}
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3D Book Container */}
        <div 
          className="relative max-w-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          <div 
            className={`flex items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.9)] border-2 border-accent/40 bg-white relative overflow-hidden transition-all duration-300 ${
              isFlipping ? "opacity-90 scale-[0.995]" : "opacity-100 scale-100"
            }`}
            style={{
              height: isFullscreen ? "88vh" : "80vh",
              aspectRatio: isTwoPage && currentPage > 1 && currentPage < 8 ? "1.414 / 1" : "0.707 / 1"
            }}
          >

            {/* Left Page (When in Two-Page Spread) */}
            {isTwoPage && leftPageData && currentPage > 1 && currentPage < 8 && (
              <div 
                className="relative h-full flex-1 overflow-hidden border-r border-stone-300"
              >
                {renderPage(leftPageData, true)}
                {/* Book Spine Shadow on right edge */}
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Right Page (or Single Cover / Back Cover) */}
            {rightPageData && (
              <div 
                className="relative h-full flex-1 overflow-hidden"
              >
                {renderPage(rightPageData, false)}
                {/* Book Spine Shadow on left edge if two page spread */}
                {isTwoPage && currentPage > 1 && currentPage < 8 && (
                  <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                )}
              </div>
            )}

            {/* Back Cover Single View */}
            {isTwoPage && currentPage === 8 && leftPageData && (
              <div 
                className="relative h-full flex-1 overflow-hidden"
              >
                {renderPage(leftPageData, false)}
              </div>
            )}

          </div>
        </div>

        {/* Current Viewing Label */}
        <div className="mt-4 flex items-center gap-3 text-xs font-mono text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {isTwoPage && leftPageNum && rightPageNum ? (
              <span>{l(`Viewing Pages ${leftPageNum} & ${rightPageNum} of 8`, `पृष्ठ ${leftPageNum} एवं ${rightPageNum} (कुल 8)`)}</span>
            ) : (
              <span>{l(`Viewing Page ${currentPage} of 8`, `पृष्ठ ${currentPage} (कुल 8)`)}</span>
            )}
          </span>
          <span>•</span>
          <span className="text-stone-300">
            {l("Use Left / Right Arrows or click to flip", "पलटने के लिए बाएँ / दाएँ तीर का प्रयोग करें")}
          </span>
        </div>

      </div>

      {/* Slide-out Thumbnails Drawer */}
      {showThumbnails && (
        <div className="container mx-auto px-4 max-w-7xl mt-4">
          <div className="bg-[#181818]/95 backdrop-blur-md border border-white/15 p-4 rounded-none shadow-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Grid className="w-4 h-4" />
                {l("Browse All 8 Flipbook Pages", "सभी 8 पृष्ठों के थंबनेल")}
              </span>
              <button 
                onClick={() => setShowThumbnails(false)}
                className="text-stone-400 hover:text-white text-xs font-mono"
              >
                ✕ {l("Close", "बंद करें")}
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {FLIPBOOK_PAGES_DATA.map((page) => {
                const isActive = currentPage === page.pageNum || (isTwoPage && (leftPageNum === page.pageNum || rightPageNum === page.pageNum));
                return (
                  <button
                    key={page.pageNum}
                    onClick={() => {
                      changePage(page.pageNum);
                      setShowThumbnails(false);
                    }}
                    className={`relative aspect-[0.707/1] border-2 transition-all p-1 bg-stone-950 group cursor-pointer text-left ${
                      isActive ? "border-accent shadow-gold scale-102" : "border-white/15 hover:border-accent/60 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={page.scannedSrc} 
                      alt={page.titleEn} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
                    <span className="absolute bottom-1 left-1 bg-black/80 text-accent font-mono text-[9px] font-bold px-1.5 py-0.5 border border-accent/20">
                      #{page.pageNum}
                    </span>
                    <span className="absolute top-1 right-1 text-[8px] font-mono text-white/90 truncate max-w-[80%] uppercase font-semibold">
                      {page.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticky Mobile Quick Action Bar */}
      <div className="fixed bottom-3 left-3 right-3 sm:hidden z-40 bg-stone-950/95 backdrop-blur-md border border-accent/40 p-2 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className="flex-1 py-2 bg-stone-900 border border-white/20 text-white text-xs font-mono font-bold uppercase disabled:opacity-30"
        >
          ← {l("Prev", "पिछला")}
        </button>
        <span className="text-xs font-mono text-accent font-bold px-2">
          {currentPage}/8
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage === 8}
          className="flex-1 py-2 bg-accent text-stone-950 text-xs font-mono font-bold uppercase disabled:opacity-30"
        >
          {l("Next", "अगला")} →
        </button>
        <a
          href="https://wa.me/919414784562?text=Hi%20RK%20Stone%20Corporation,%20I%20am%20viewing%20your%20digital%20flipbook.%20Please%20share%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#25D366] text-white"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
