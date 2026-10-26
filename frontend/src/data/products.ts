// Comprehensive Official Product Catalog for RK Stone Corporation
// 100% synchronized with official corporate catalog and 16 categories

export interface Product {
  id: string;
  _id?: string;
  code?: string;
  name: string;
  nameHi?: string;
  price: number;
  priceUnit?: string;
  image: string;
  category: string;
  stoneType?: string;
  description: string;
  descriptionHi?: string;
  features?: string[];
  dimensions?: string;
  leadTime?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  hindi: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    "id": "carved-sandstone-temple",
    "name": "Carved Sandstone Temple",
    "nameHi": "नक्काशीदार सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 285000,
    "priceUnit": "piece",
    "stoneType": "Natural Dholpur & Bansi Sandstone",
    "dimensions": "8ft Height x 5ft Width x 3.5ft Depth",
    "leadTime": "25-35 Days",
    "image": "/products/Stone%20Temple/1.jpg",
    "description": "Authentic hand-chiseled sandstone mandir with intricate shikhara, carved pillars, jharokha mandapam, and deity sanctum pedestal.",
    "descriptionHi": "पारंपरिक कारीगरी से तैयार नक्काशीदार सैंडस्टोन मंदिर। इसमें नक्काशीदार शिखर, खंभे, गर्भगृह और वेदी शामिल हैं।",
    "features": [
      "Handcrafted by generational Sompura guild artisans",
      "Interlocking stone engineering for lifetime weather durability",
      "Pre-cut conduit routing for sanctum lighting",
      "Suitable for outdoor premises or home prayer halls"
    ],
    "isFeatured": true,
    "code": "RK-PROD-01",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-temple",
    "name": "Hand Carved Sandstone Temple",
    "nameHi": "हस्तनिर्मित सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 345000,
    "priceUnit": "piece",
    "stoneType": "Fine Grain Pink Sandstone",
    "dimensions": "9ft Height x 6ft Width x 4ft Depth",
    "leadTime": "30-40 Days",
    "image": "/products/Stone%20Temple/2.jpg",
    "description": "Exquisite hand-carved temple structure showcasing traditional Vedic architecture, floral friezes, and monolithic stone kalash top.",
    "descriptionHi": "वैदिक स्थापत्य शैली में निर्मित सुंदर नक्काशीदार मंदिर, पुष्प बेल-बूटे और अखंड कलश शीर्ष के साथ।",
    "features": [
      "100% monolithic hand carving on pillars and arches",
      "Weather and acid-rain resistant stone grade",
      "Custom dimension tailoring available on request"
    ],
    "isFeatured": true,
    "code": "RK-PROD-02",
    "isActive": true
  },
  {
    "id": "dholpur-red-sandstone-temple",
    "name": "Dholpur Red Sandstone Temple",
    "nameHi": "धौलपुर रेड सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 1450,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Red Sandstone",
    "dimensions": "Custom Modular Elevation (12ft - 25ft Height)",
    "leadTime": "30-45 Days",
    "image": "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.14_805c9354.jpg",
    "description": "Traditional red sandstone temple fabricated with precision-dressed blocks, fluted columns, and classical toran entries.",
    "descriptionHi": "धौलपुर के प्रसिद्ध लाल पत्थर से निर्मित मंदिर, मजबूत खंभों और भव्य तोरण द्वार के साथ।",
    "features": [
      "High density compression strength",
      "Aesthetic terracotta-red natural coloration",
      "Complete interlocking assembly kit with on-site fixing support"
    ],
    "isFeatured": false,
    "code": "RK-PROD-03",
    "isActive": true
  },
  {
    "id": "dholpur-stone-outdoor-temple",
    "name": "Dholpur Stone Outdoor Temple",
    "nameHi": "धौलपुर स्टोन आउटडोर मंदिर",
    "category": "sandstone-temple",
    "price": 1350,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Beige Sandstone",
    "dimensions": "Modular Temple Complex",
    "leadTime": "30-50 Days",
    "image": "/products/Stone%20Temple/4.jpg",
    "description": "Heavy-duty outdoor temple engineered for public parks, ashrams, society complexes, and open villa courtyards.",
    "descriptionHi": "खुले मैदानों, पार्कों और आश्रमों के लिए विशेष रूप से मजबूत धौलपुर स्टोन आउटडोर मंदिर।",
    "features": [
      "Zero color fading under harsh sun and monsoon",
      "Water repellant silicone pre-treatment option",
      "Complete architectural layout drawing included"
    ],
    "isFeatured": false,
    "code": "RK-PROD-04",
    "isActive": true
  },
  {
    "id": "17-foot-dholpur-pink-sand-stone-temple",
    "name": "17 Foot Dholpur Pink Sand Stone Temple",
    "nameHi": "17 फुट धौलपुर पिंक सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 1600,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Pink Sandstone",
    "dimensions": "17ft Height x 12ft Width x 10ft Depth",
    "leadTime": "40-60 Days",
    "image": "/products/Stone%20Temple/3.jpg",
    "description": "Monumental 17-foot temple elevation with high shikhara, octagonal mandapam, and intricate bell-and-chain friezes.",
    "descriptionHi": "17 फुट ऊंचा विशाल मंदिर शिखर, अष्टकोणीय मंडप और घंटियों की नक्काशीदार पट्टियों सहित।",
    "features": [
      "Ayodhya Ram Mandir grade pink sandstone",
      "Engineered load-bearing stone columns",
      "Comprehensive numbered stone crating for fast assembly"
    ],
    "isFeatured": true,
    "code": "RK-PROD-05",
    "isActive": true
  },
  {
    "id": "20-feet-dholpur-sand-stone-temple",
    "name": "20 Feet Dholpur Sand Stone Temple",
    "nameHi": "20 फुट धौलपुर सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 1750,
    "priceUnit": "sq. ft",
    "stoneType": "Premium Dholpur Sandstone",
    "dimensions": "20ft Height x 15ft Width x 12ft Depth",
    "leadTime": "45-70 Days",
    "image": "/products/Stone%20Temple/2.jpg",
    "description": "Grand 20-foot temple structure suitable for municipal pilgrimage sites, trusts, and grand residential estates.",
    "descriptionHi": "20 फुट ऊंचा विशालकाय धौलपुर पत्थर मंदिर, धार्मिक ट्रस्टों व सार्वजनिक परिसरों हेतु।",
    "features": [
      "Multi-tier shikhara with amalaka and kalash",
      "Turnkey stone fabrication and dispatch",
      "Generational heritage Sompura craftsmanship"
    ],
    "isFeatured": false,
    "code": "RK-PROD-06",
    "isActive": true
  },
  {
    "id": "21-feet-dholpur-sandstone-temple",
    "name": "21 Feet Dholpur Sandstone Temple",
    "nameHi": "21 फुट धौलपुर सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 1850,
    "priceUnit": "sq. ft",
    "stoneType": "Selected Quarry Dholpur Pink & Beige",
    "dimensions": "21ft Height x 16ft Width x 14ft Depth",
    "leadTime": "60-80 Days",
    "image": "/products/Stone%20Temple/1.jpg",
    "description": "Architectural marvel featuring 21 feet elevation, sculpted devta niches, parikrama walkway, and grand sanctum entrance.",
    "descriptionHi": "21 फुट की भव्य ऊंचाई, परिक्रमा मार्ग और देव मूर्तियों के लिए सुंदर आलों से सुसज्जित मंदिर।",
    "features": [
      "Architectural CAD blueprints matched to Shilpa Shastra",
      "High-load compressive test certified",
      "Precision tongue-in-groove structural joints"
    ],
    "isFeatured": false,
    "code": "RK-PROD-07",
    "isActive": true
  },
  {
    "id": "23-feet-dholpur-sandstone-temple",
    "name": "23 Feet Dholpur Sandstone Temple",
    "nameHi": "23 फुट धौलपुर सैंडस्टोन मंदिर",
    "category": "sandstone-temple",
    "price": 1950,
    "priceUnit": "sq. ft",
    "stoneType": "Bansi Paharpur & Dholpur Pink Sandstone",
    "dimensions": "23ft Height x 18ft Width x 15ft Depth",
    "leadTime": "60-90 Days",
    "image": "/products/Stone%20Temple/4.jpg",
    "description": "Our premier flagship temple commission standing 23 feet tall. Monolithic shikhara segments, carved elephant bas-reliefs, and grand steps.",
    "descriptionHi": "23 फुट ऊंचा हमारा सबसे भव्य मंदिर प्रोजेक्ट, हाथी आधार, विशाल शिखर व तोरण द्वार सहित।",
    "features": [
      "Monumental temple construction",
      "Dedicated project manager and master artisans",
      "Custom foundation and anchoring assistance"
    ],
    "isFeatured": true,
    "code": "RK-PROD-08",
    "isActive": true
  },
  {
    "id": "designer-sandstone-temple-entrance-gate",
    "name": "Designer Sandstone Temple Entrance Gate",
    "nameHi": "डिजाइनर सैंडस्टोन मंदिर प्रवेश द्वार",
    "category": "sandstone-temple-entry-gate",
    "price": 1250,
    "priceUnit": "sq. ft",
    "stoneType": "Rajasthan Sandstone & Red Stone",
    "dimensions": "15ft Width x 18ft Height (Customizable)",
    "leadTime": "20-30 Days",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    "description": "Monumental ceremonial entrance gate featuring Rajasthani floral brackets, fluted round pillars, and decorative stone architrave.",
    "descriptionHi": "भव्य तोरण प्रवेश द्वार, नक्काशीदार खंभों और पारंपरिक तोरण मेहराब के साथ।",
    "features": [
      "Heavy structural columns supporting steel or teak gates",
      "Weatherproof dry cladding or monolithic construction",
      "Custom carving of deities or company insignia"
    ],
    "isFeatured": true,
    "code": "RK-PROD-09",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-temple-entry-gate",
    "name": "Hand Carved Sandstone Temple Entry Gate",
    "nameHi": "हस्तनिर्मित सैंडस्टोन मंदिर प्रवेश तोरण",
    "category": "sandstone-temple-entry-gate",
    "price": 1380,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Beige Sandstone",
    "dimensions": "12ft Width x 15ft Height",
    "leadTime": "25-35 Days",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.26_594eb849.jpg",
    "description": "Consecrated entry toran with celestial motifs, kalash top finials, and fluted pillar pilasters for temples and sacred venues.",
    "descriptionHi": "पवित्र मंदिर प्रवेश तोरण जिसमें मंगल कलश, नक्काशीदार खंभे और देव आकृति शामिल हैं।",
    "features": [
      "Handcrafted by master stone carvers",
      "Precision dressed for seamless on-site jointing",
      "Anti-stain stone sealant applied before dispatch"
    ],
    "isFeatured": false,
    "code": "RK-PROD-10",
    "isActive": true
  },
  {
    "id": "handcrafted-sandstone-temple-main-gate",
    "name": "Handcrafted Sandstone Temple Main Gate",
    "nameHi": "हैंडक्राफ्टेड सैंडस्टोन मंदिर मुख्य द्वार",
    "category": "sandstone-temple-entry-gate",
    "price": 1420,
    "priceUnit": "sq. ft",
    "stoneType": "Pink & Red Sandstone",
    "dimensions": "14ft Width x 16ft Height",
    "leadTime": "25-35 Days",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.26_ecff744c.jpg",
    "description": "Grand ceremonial temple gateway with deep relief floral arches, guardian elephant pedestals, and carved stone lintel.",
    "descriptionHi": "हाथियों के आधार और सुंदर मेहराबदार नक्काशी के साथ तैयार मंदिर मुख्य द्वार।",
    "features": [
      "Deep sculpted heritage toran arch",
      "Includes high compressive load bearing tests",
      "Custom fitting support across India"
    ],
    "isFeatured": true,
    "code": "RK-PROD-11",
    "isActive": true
  },
  {
    "id": "heavy-duty-sandstone-entry-gate-for-temple",
    "name": "Heavy Duty Sandstone Entry Gate for Temple",
    "nameHi": "हैवी ड्यूटी सैंडस्टोन मंदिर प्रवेश द्वार",
    "category": "sandstone-temple-entry-gate",
    "price": 1480,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur & Jodhpur Sandstone",
    "dimensions": "16ft Width x 20ft Height",
    "leadTime": "30-40 Days",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.27_c764a784.jpg",
    "description": "Massive monolithic stone gateway engineered for high-footfall pilgrimage temples and historic shrine renovations.",
    "descriptionHi": "तीर्थस्थलों और बड़े मंदिरों के लिए विशेष रूप से मजबूत भारी पत्थर प्रवेश द्वार।",
    "features": [
      "Engineered for heavy double-leaf teak or brass doors",
      "Wind and seismic anchoring specifications",
      "Zero moisture seepage joints"
    ],
    "isFeatured": false,
    "code": "RK-PROD-12",
    "isActive": true
  },
  {
    "id": "natural-sandstone-entry-gate-with-traditional-carving",
    "name": "Natural Sandstone Entry Gate with Traditional Carving",
    "nameHi": "पारंपरिक नक्काशीदार नेचुरल सैंडस्टोन प्रवेश द्वार",
    "category": "sandstone-temple-entry-gate",
    "price": 1350,
    "priceUnit": "sq. ft",
    "stoneType": "Pure Natural Dholpur Sandstone",
    "dimensions": "12ft Width x 14ft Height",
    "leadTime": "20-30 Days",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.27_de3176fd.jpg",
    "description": "Traditional stone entry gate featuring authentic Sompura guild carvings, lotus rosettes, and ornamental side pillars.",
    "descriptionHi": "पारंपरिक शिल्प शैली में कमल और पुष्प नक्काशी से सजा प्राकृतिक सैंडस्टोन द्वार।",
    "features": [
      "Hand chiseled Sompura carvings",
      "Stain resistant natural stone sealant",
      "Easy dry-cladding or wet-fixing installation"
    ],
    "isFeatured": false,
    "code": "RK-PROD-13",
    "isActive": true
  },
  {
    "id": "dholpur-pink-sandstone-temple",
    "name": "Dholpur Pink Sandstone Temple",
    "nameHi": "धौलपुर पिंक सैंडस्टोन मंदिर",
    "category": "dholpur-sandstone-temple",
    "price": 1400,
    "priceUnit": "sq. ft",
    "stoneType": "Original Dholpur Pink Stone",
    "dimensions": "Custom Temple Elevation",
    "leadTime": "30-45 Days",
    "image": "/products/Stone%20Temple/2.jpg",
    "description": "Classic pink hue sandstone temple reflecting the architectural grace of northern India's royal shrines.",
    "descriptionHi": "प्रसिद्ध गुलाबी धौलपुर पत्थर से तैयार मंदिर, राजसी सुंदरता और मजबूती का प्रतीक।",
    "features": [
      "Natural terracotta-pink consistent vein",
      "Laser-measured pillar alignment",
      "Zero artificial colors used"
    ],
    "isFeatured": true,
    "code": "RK-PROD-14",
    "isActive": true
  },
  {
    "id": "custom-made-dholpur-sandstone-temple",
    "name": "Custom Made Dholpur Sandstone Temple",
    "nameHi": "कस्टम मेड धौलपुर सैंडस्टोन मंदिर",
    "category": "dholpur-sandstone-temple",
    "price": 1550,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Sandstone",
    "dimensions": "Built to Architect CAD Specifications",
    "leadTime": "35-50 Days",
    "image": "/products/Stone%20Temple/3.jpg",
    "description": "Customized to your exact plot dimensions, sanctum height, and vastu orientation with Sompura guild precision.",
    "descriptionHi": "आपके वास्तु और प्लॉट की माप के अनुसार विशेष रूप से तैयार कस्टम धौलपुर मंदिर।",
    "features": [
      "Vastu Shastra compliant design consultation",
      "3D CAD model approval prior to quarry cutting",
      "Pan-India delivery with skilled fixing team"
    ],
    "isFeatured": false,
    "code": "RK-PROD-15",
    "isActive": true
  },
  {
    "id": "handcrafted-dholpur-sandstone-hindu-temple",
    "name": "Handcrafted Dholpur Sandstone Hindu Temple",
    "nameHi": "हस्तनिर्मित धौलपुर सैंडस्टोन हिंदू मंदिर",
    "category": "dholpur-sandstone-temple",
    "price": 1650,
    "priceUnit": "sq. ft",
    "stoneType": "Selected Dholpur Rock Blocks",
    "dimensions": "Modular 10ft - 18ft Height",
    "leadTime": "30-50 Days",
    "image": "/products/Stone%20Temple/1.jpg",
    "description": "Traditional Hindu temple carved with deep relief floral motifs, deity niches, and solid stone shikhara.",
    "descriptionHi": "पारंपरिक हिंदू मंदिर जिसमें देव प्रतिमाओं के लिए आले, मंडप और अखंड शिखर शामिल हैं।",
    "features": [
      "Pure natural sandstone with fine texture",
      "Pre-treated against moss and efflorescence",
      "Foam padded crate packaging"
    ],
    "isFeatured": true,
    "code": "RK-PROD-16",
    "isActive": true
  },
  {
    "id": "artistic-sandstone-grill",
    "name": "Artistic Sandstone Grill",
    "nameHi": "कलात्मक सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 420,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Beige Sandstone",
    "dimensions": "25mm - 50mm Thickness (Custom Size)",
    "leadTime": "7-12 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    "description": "Artistic stone jali cut with intricate geometric lattices for natural cross-ventilation and diffused daylight.",
    "descriptionHi": "कलात्मक पत्थर जाली, प्राकृतिक हवा व रोशनी के लिए सुंदर ज्यामितीय डिजाइनों में।",
    "features": [
      "High precision CNC and hand touch finishing",
      "Custom patterns: Mughal, Moroccan, and contemporary",
      "High impact resistance for balconies and facade screens"
    ],
    "isFeatured": true,
    "code": "RK-PROD-17",
    "isActive": true
  },
  {
    "id": "custom-made-sandstone-grill",
    "name": "Custom Made Sandstone Grill",
    "nameHi": "कस्टम मेड सैंडस्टोन ग्रिल",
    "category": "sandstone-grill",
    "price": 460,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur / Gwalior White Sandstone",
    "dimensions": "Custom DWG / Vector Sizing",
    "leadTime": "10-15 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.29_356c9a6d.jpg",
    "description": "Custom fabricated stone jali matched precisely to your architectural elevation drawings.",
    "descriptionHi": "आर्किटेक्चरल एलिवेशन के अनुसार तैयार कस्टम सैंडस्टोन जाली।",
    "features": [
      "CAD/CAM waterjet and diamond wire routing",
      "Chamfered edges for smooth hand feel",
      "Available in 30mm, 40mm, 50mm slabs"
    ],
    "isFeatured": false,
    "code": "RK-PROD-18",
    "isActive": true
  },
  {
    "id": "decorative-sandstone-grill-for-exterior-walls",
    "name": "Decorative Sandstone Grill for Exterior Walls",
    "nameHi": "बाहरी दीवारों के लिए सजावटी सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 480,
    "priceUnit": "sq. ft",
    "stoneType": "Weather-Immune Red & Beige Sandstone",
    "dimensions": "Panel Sizes up to 6ft x 4ft Single Slab",
    "leadTime": "10-15 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.29_48b8ca70.jpg",
    "description": "Heavy-duty exterior wall jali providing privacy, thermal insulation, and timeless architectural luxury.",
    "descriptionHi": "विला और कोठियों के बाहरी एलिवेशन के लिए मजबूत और सुंदर जाली पैनल्स।",
    "features": [
      "Heat deflection and passive cooling properties",
      "Non-porous silicone weather coating",
      "Structural anchoring grooves provided"
    ],
    "isFeatured": true,
    "code": "RK-PROD-19",
    "isActive": true
  },
  {
    "id": "designer-sandstone-grill-for-temple",
    "name": "Designer Sandstone Grill for Temple",
    "nameHi": "मंदिर के लिए डिजाइनर सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 520,
    "priceUnit": "sq. ft",
    "stoneType": "Bansi Pink & Dholpur White Sandstone",
    "dimensions": "Custom Sizing",
    "leadTime": "12-18 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.29_d00b1fa6.jpg",
    "description": "Consecrated temple screens featuring Om, Swastik, lotus petals, and kalash cutwork motifs.",
    "descriptionHi": "मंदिरों के लिए विशेष जाली जिसमें ॐ, स्वस्तिक और कमल के फूल की नक्काशी शामिल है।",
    "features": [
      "Vedic iconography approved patterns",
      "Polished edges with crisp detail",
      "Easy mortar or clamp installation"
    ],
    "isFeatured": false,
    "code": "RK-PROD-20",
    "isActive": true
  },
  {
    "id": "dholpur-sandstone-grill-with-fine-finish",
    "name": "Dholpur Sandstone Grill with Fine Finish",
    "nameHi": "फाइन फिनिश धौलपुर सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 440,
    "priceUnit": "sq. ft",
    "stoneType": "Fine Grain Dholpur Beige",
    "dimensions": "Standard & Custom Panels",
    "leadTime": "8-14 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_4a0e4e7e.jpg",
    "description": "Ultra smooth polished sandstone grill with delicate filigree cutouts for interior partitions and window screens.",
    "descriptionHi": "अति चिकनी फिनिश वाली धौलपुर जाली, इनडोर पार्टीशन और खिड़कियों के लिए।",
    "features": [
      "Silky hand-honed matte finish",
      "Zero dust retention design",
      "Safe for indoor residential use"
    ],
    "isFeatured": false,
    "code": "RK-PROD-21",
    "isActive": true
  },
  {
    "id": "durable-sandstone-grill-for-long-lasting",
    "name": "Durable Sandstone Grill for Long Lasting",
    "nameHi": "लंबे समय तक चलने वाली मजबूत सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 410,
    "priceUnit": "sq. ft",
    "stoneType": "High Density Natural Sandstone",
    "dimensions": "40mm Thick Slabs",
    "leadTime": "7-12 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_82833075.jpg",
    "description": "Thick-section stone grill designed for boundary walls, parapets, and exterior air vents with century-long durability.",
    "descriptionHi": "बाउंड्री वॉल और छतों की रेलिंग के लिए अत्यधिक टिकाऊ मोटी पत्थर जाली।",
    "features": [
      "Extra tensile thickness against wind pressure",
      "Reinforced framing perimeter",
      "No chipping or crumbling guaranteed"
    ],
    "isFeatured": false,
    "code": "RK-PROD-22",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-grill",
    "name": "Hand Carved Sandstone Grill",
    "nameHi": "हस्तनिर्मित नक्काशीदार सैंडस्टोन जाली",
    "category": "sandstone-grill",
    "price": 580,
    "priceUnit": "sq. ft",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "Handcrafted to Order",
    "leadTime": "15-20 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_c93e433f.jpg",
    "description": "3D deep relief hand-chiseled grill exhibiting the authentic chisel marks of Rajasthan's master craftsmen.",
    "descriptionHi": "हाथ की छेनी-हथौड़े से तराशी गई 3D जाली, असली राजस्थानी शिल्पकला की मिसाल।",
    "features": [
      "Hand chiseled organic depth",
      "Collector-grade architectural finish",
      "Each piece is uniquely handcrafted"
    ],
    "isFeatured": true,
    "code": "RK-PROD-23",
    "isActive": true
  },
  {
    "id": "hand-crafted-sandstone-grill",
    "name": "Hand Crafted Sandstone Grill",
    "nameHi": "कारीगरी सैंडस्टोन ग्रिल",
    "category": "sandstone-grill",
    "price": 450,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Beige Stone",
    "dimensions": "Custom Rectangular & Arched Panels",
    "leadTime": "10-15 Days",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.31_a150bc28.jpg",
    "description": "Floral medallion jali screen with decorative arched top border for verandas and balconies.",
    "descriptionHi": "मेहराबदार शीर्ष और पुष्प आकृतियों से सजी बालकनी व बरामदा जाली।",
    "features": [
      "Available with custom arch radius",
      "Precise edge beveling",
      "Sturdy timber crating for freight"
    ],
    "isFeatured": false,
    "code": "RK-PROD-24",
    "isActive": true
  },
  {
    "id": "artistic-sandstone-lamp-post",
    "name": "Artistic Sandstone Lamp Post",
    "nameHi": "कलात्मक सैंडस्टोन लैंप पोस्ट",
    "category": "sandstone-lamp",
    "price": 18500,
    "priceUnit": "piece",
    "stoneType": "Dholpur Natural Sandstone",
    "dimensions": "6ft Height x 14in Base",
    "leadTime": "10-15 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_37a17d6c.jpg",
    "description": "Turned solid stone garden lantern pillar with jali light chamber, concealed electrical conduit, and tiered cap.",
    "descriptionHi": "बगीचों व फार्महाउस के लिए नक्काशीदार पत्थर लैंप पोस्ट, आंतरिक वायरिंग पाइप सहित।",
    "features": [
      "Pre-drilled hollow center for concealed wiring",
      "Fits standard E27 or LED warm fixtures",
      "Stable pedestal base with bolt anchoring"
    ],
    "isFeatured": true,
    "code": "RK-PROD-25",
    "isActive": true
  },
  {
    "id": "contemporary-white-sandstone-lamp",
    "name": "Contemporary White Sandstone Lamp",
    "nameHi": "समकालीन सफेद सैंडस्टोन लैंप",
    "category": "sandstone-lamp",
    "price": 12500,
    "priceUnit": "piece",
    "stoneType": "Gwalior White Sandstone",
    "dimensions": "3ft Height x 10in x 10in",
    "leadTime": "8-12 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_f81216d2.jpg",
    "description": "Minimalist cubic and cylindrical stone bollard luminaire for walkways, driveways, and terrace decks.",
    "descriptionHi": "वॉकवे और टेरेस के लिए आधुनिक सफेद सैंडस्टोन बोलाड लैंप।",
    "features": [
      "Contemporary clean architectural lines",
      "Soft ambient downward illumination",
      "Waterproof electrical junction ready"
    ],
    "isFeatured": false,
    "code": "RK-PROD-26",
    "isActive": true
  },
  {
    "id": "custom-made-sandstone-lamp-post",
    "name": "Custom Made Sandstone Lamp Post",
    "nameHi": "कस्टम मेड सैंडस्टोन लैंप पोस्ट",
    "category": "sandstone-lamp",
    "price": 24000,
    "priceUnit": "piece",
    "stoneType": "Dholpur & Jodhpur Sandstone",
    "dimensions": "8ft - 10ft Height (Custom)",
    "leadTime": "15-20 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.25_282f63fb.jpg",
    "description": "Tall estate entrance stone lamp post with multiple lantern brackets and fluted column detailing.",
    "descriptionHi": "बड़ी कोठियों व प्रवेश द्वारों के लिए 8 से 10 फुट ऊंचा कस्टम लैंप पोस्ट।",
    "features": [
      "Multi-arm mounting options",
      "High wind resistance monolithic stone base",
      "Hand-carved lion capital accents"
    ],
    "isFeatured": false,
    "code": "RK-PROD-27",
    "isActive": true
  },
  {
    "id": "decorative-sandstone-lamp-post",
    "name": "Decorative Sandstone Lamp Post",
    "nameHi": "सजावटी सैंडस्टोन लैंप पोस्ट",
    "category": "sandstone-lamp",
    "price": 16500,
    "priceUnit": "piece",
    "stoneType": "Pink Sandstone",
    "dimensions": "5ft Height x 12in Base",
    "leadTime": "10-14 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.25_574bc34d.jpg",
    "description": "Classical Rajasthani style stone lantern featuring floral carved panels and traditional domed top.",
    "descriptionHi": "राजस्थानी शैली में निर्मित सजावटी गार्डन लैंप, गुंबददार शीर्ष व पुष्प नक्काशी के साथ।",
    "features": [
      "Removable top dome for bulb replacement",
      "Weatherproof outdoor finish",
      "Direct quarry pricing"
    ],
    "isFeatured": true,
    "code": "RK-PROD-28",
    "isActive": true
  },
  {
    "id": "designer-sandstone-lamp-post",
    "name": "Designer Sandstone Lamp Post",
    "nameHi": "डिजाइनर सैंडस्टोन लैंप पोस्ट",
    "category": "sandstone-lamp",
    "price": 21000,
    "priceUnit": "piece",
    "stoneType": "Bansi Pink Sandstone",
    "dimensions": "7ft Height x 13in Base",
    "leadTime": "12-16 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.25_cc9ca5ff.jpg",
    "description": "Turnkey designer pillar lantern equipped with 4-sided stone lattice screens casting mesmerizing light patterns.",
    "descriptionHi": "चारों तरफ नक्काशीदार जाली वाला डिजाइनर लैंप जो रात में सुंदर प्रकाश आकृतियां बिखेरता है।",
    "features": [
      "4-way ambient light dispersion",
      "Solid stone lathe-turned column",
      "Moisture-sealed internal chamber"
    ],
    "isFeatured": false,
    "code": "RK-PROD-29",
    "isActive": true
  },
  {
    "id": "garden-sandstone-lamp-post",
    "name": "Garden Sandstone Lamp Post",
    "nameHi": "गार्डन सैंडस्टोन लैंप पोस्ट",
    "category": "sandstone-lamp",
    "price": 14500,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige",
    "dimensions": "4.5ft Height x 11in Base",
    "leadTime": "8-12 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_37a17d6c.jpg",
    "description": "Sturdy landscape lamp post suitable for garden borders, lawns, resort pathways, and step illumination.",
    "descriptionHi": "रिसॉर्ट्स और लॉन के रास्तों के लिए टिकाऊ गार्डन लैंप पोस्ट।",
    "features": [
      "Non-corrosive natural stone structure",
      "Low maintenance wipe-clean surface",
      "Easy ground installation"
    ],
    "isFeatured": false,
    "code": "RK-PROD-30",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-lamp-post",
    "name": "Hand Carved Sandstone Lamp Post",
    "nameHi": "हस्तनिर्मित नक्काशीदार सैंडस्टोन लैंप",
    "category": "sandstone-lamp",
    "price": 22500,
    "priceUnit": "piece",
    "stoneType": "Natural Pink & White Stone",
    "dimensions": "6.5ft Height x 14in Base",
    "leadTime": "14-20 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_f81216d2.jpg",
    "description": "Deeply hand-carved heritage lantern with peacock and bell motifs crafted by generational stone artists.",
    "descriptionHi": "मोर और घंटियों की बारीक नक्काशी वाला हस्तनिर्मित हेरिटेज लैंप।",
    "features": [
      "Hand chiseled detailing throughout shaft",
      "Reinforced anchor points",
      "Lifetime material guarantee"
    ],
    "isFeatured": false,
    "code": "RK-PROD-31",
    "isActive": true
  },
  {
    "id": "brown-sandstone-outdoor-gazebo",
    "name": "Brown Sandstone Outdoor Gazebo",
    "nameHi": "ब्राउन सैंडस्टोन आउटडोर गज़ेबो",
    "category": "sandstone-gazebo",
    "price": 1450,
    "priceUnit": "sq. ft",
    "stoneType": "Brown & Teakwood Sandstone",
    "dimensions": "10ft Diameter x 12ft Height (6 Pillars)",
    "leadTime": "25-35 Days",
    "image": "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    "description": "Grand hexagonal open stone pavilion with curved stone benches, fluted columns, and decorative cupola roof.",
    "descriptionHi": "6 नक्काशीदार खंभों और गोल गुंबद वाली सुंदर आउटडोर छतरी, बैठने के लिए पत्थर बेंच सहित।",
    "features": [
      "Interlocking monolithic dome segments",
      "Integrated carved bench seating around perimeter",
      "Complete numbered assembly guide included"
    ],
    "isFeatured": true,
    "code": "RK-PROD-32",
    "isActive": true
  },
  {
    "id": "decorative-sandstone-gazebo-for-luxury-garden",
    "name": "Decorative Sandstone Gazebo for Luxury Garden",
    "nameHi": "लक्जरी गार्डन के लिए सजावटी सैंडस्टोन गज़ेबो",
    "category": "sandstone-gazebo",
    "price": 1650,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Pink Sandstone",
    "dimensions": "12ft Diameter x 14ft Height (8 Pillars)",
    "leadTime": "30-45 Days",
    "image": "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.24_152e9da0.jpg",
    "description": "Royal 8-pillar Rajasthani chhatri with ornate brackets, kalash finials, and intricately carved ceiling rosettes.",
    "descriptionHi": "8 नक्काशीदार खंभों वाली शाही राजस्थानी छतरी, छत पर सुंदर नक्काशीदार झूमर डिज़ाइन के साथ।",
    "features": [
      "8 carved pillars with elephant head brackets",
      "Domed ceiling with concentric lotus carving",
      "Ideal centerpiece for luxury farmhouses and resorts"
    ],
    "isFeatured": true,
    "code": "RK-PROD-33",
    "isActive": true
  },
  {
    "id": "dome-white-sandstone-garden-gazebo",
    "name": "Dome White Sandstone Garden Gazebo",
    "nameHi": "गुंबददार सफेद सैंडस्टोन गार्डन गज़ेबो",
    "category": "sandstone-gazebo",
    "price": 490000,
    "priceUnit": "piece",
    "stoneType": "Gwalior White Sandstone",
    "dimensions": "10ft Diameter x 11.5ft Height",
    "leadTime": "30-40 Days",
    "image": "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.24_1832049c.jpg",
    "description": "Pristine white natural sandstone garden pavilion offering serene shaded seating in modern and classical landscapes.",
    "descriptionHi": "सफेद सैंडस्टोन से निर्मित सुंदर गुंबददार गज़ेबो, बाग-बगीचों में आरामदायक बैठने हेतु।",
    "features": [
      "High solar reflectivity keeping interior cool",
      "Pre-fitted stainless steel internal tension rings",
      "Turnkey nationwide installation team"
    ],
    "isFeatured": false,
    "code": "RK-PROD-34",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-fountains",
    "name": "Hand Carved Sandstone Fountains",
    "nameHi": "हस्तनिर्मित सैंडस्टोन वाटर फाउंटेन",
    "category": "sandstone-fountains",
    "price": 85000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige & Pink Sandstone",
    "dimensions": "5ft Height x 4ft Basin Diameter",
    "leadTime": "15-20 Days",
    "image": "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    "description": "Traditional 2-tier cascading sandstone fountain with lotus fluted bowls, water spouts, and pedestal base.",
    "descriptionHi": "2-मंजिला सुंदर वाटर फाउंटेन, कमल के आकार के कटोरे और नक्काशीदार पानी के फव्वारे के साथ।",
    "features": [
      "Pre-plumbed for standard submersible pumps",
      "Smooth water ripple soothing acoustic design",
      "Suitable for indoor atriums and outdoor courtyards"
    ],
    "isFeatured": true,
    "code": "RK-PROD-35",
    "isActive": true
  },
  {
    "id": "3-tier-cascading-sandstone-courtyard-fountain",
    "name": "3-Tier Cascading Sandstone Courtyard Fountain",
    "nameHi": "3-मंजिला कैस्केडिंग सैंडस्टोन वाटर फाउंटेन",
    "category": "sandstone-fountains",
    "price": 145000,
    "priceUnit": "piece",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "7.5ft Height x 6ft Master Basin",
    "leadTime": "20-25 Days",
    "image": "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_a3e874ce.jpg",
    "description": "Monumental 3-tier centerpiece fountain featuring lion face spouts, pineapple finial top, and deep collector basin.",
    "descriptionHi": "7.5 फुट ऊंचा 3-मंजिला भव्य फाउंटेन, सिंह मुख जल द्वारों और बड़े जल कुंड के साथ।",
    "features": [
      "Multi-tier water cascade with dramatic visual appeal",
      "Heavy monolithic base preventing any tipping",
      "Tested water flow balance before packaging"
    ],
    "isFeatured": true,
    "code": "RK-PROD-36",
    "isActive": true
  },
  {
    "id": "lotus-motif-carved-sandstone-basin-fountain",
    "name": "Lotus Motif Carved Sandstone Basin Fountain",
    "nameHi": "कमल आकृति नक्काशीदार सैंडस्टोन बेसिन फाउंटेन",
    "category": "sandstone-fountains",
    "price": 68000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige Stone",
    "dimensions": "3.5ft Basin Diameter x 2.5ft Height",
    "leadTime": "12-16 Days",
    "image": "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_f02381e3.jpg",
    "description": "Single-basin bubbling lotus fountain creating gentle water sheet flow for zen gardens and entry lobbies.",
    "descriptionHi": "प्रवेश द्वार और इनडोर गार्डन के लिए कमल के आकार का सौम्य वाटर फाउंटेन।",
    "features": [
      "Gentle soothing splash-free water flow",
      "Compact footprint for luxury residences",
      "Complete with silent pump kit"
    ],
    "isFeatured": false,
    "code": "RK-PROD-37",
    "isActive": true
  },
  {
    "id": "2-seater-sandstone-garden-bench",
    "name": "2 Seater Sandstone Garden Bench",
    "nameHi": "2 सीटर सैंडस्टोन गार्डन बेंच",
    "category": "sandstone-garden-bench",
    "price": 28000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Natural Sandstone",
    "dimensions": "4.5ft Length x 20in Depth x 34in Height",
    "leadTime": "10-15 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_bb5957bd.jpg",
    "description": "Comfortable 2-seater outdoor garden bench carved with floral arms, contoured stone seat slab, and scrolled legs.",
    "descriptionHi": "फूलों की नक्काशी और मजबूत पत्थरों से बनी आरामदायक 2 सीटर गार्डन बेंच।",
    "features": [
      "Solid stone interlocking parts without metal hardware",
      "All-weather frost and sun resistance",
      "Ergonomically contoured backrest"
    ],
    "isFeatured": true,
    "code": "RK-PROD-38",
    "isActive": true
  },
  {
    "id": "designer-round-sandstone-table-bench-set",
    "name": "Designer Round Sandstone Table Bench Set",
    "nameHi": "डिजाइनर गोल सैंडस्टोन टेबल व बेंच सेट",
    "category": "sandstone-garden-bench",
    "price": 75000,
    "priceUnit": "set",
    "stoneType": "Dholpur Beige & Pink Sandstone",
    "dimensions": "4ft Round Table + 4 Curved Benches",
    "leadTime": "15-22 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_8a1e2f89.jpg",
    "description": "Complete outdoor dining and leisure set consisting of 1 carved pedestal round table and 4 curved matching stone benches.",
    "descriptionHi": "1 गोल नक्काशीदार टेबल और 4 घुमावदार बेंच का पूरा गार्डन डाइनिंग सेट।",
    "features": [
      "Heavyweight stone stability against high winds",
      "Polished stain-resistant tabletop surface",
      "Seats 6 to 8 persons comfortably"
    ],
    "isFeatured": true,
    "code": "RK-PROD-39",
    "isActive": true
  },
  {
    "id": "handcrafted-red-sandstone-table-bench-set",
    "name": "Handcrafted Red Sandstone Table Bench Set",
    "nameHi": "हस्तनिर्मित लाल सैंडस्टोन टेबल व बेंच सेट",
    "category": "sandstone-garden-bench",
    "price": 82000,
    "priceUnit": "piece",
    "stoneType": "Rajasthan Red Sandstone",
    "dimensions": "5ft Rectangular Table + 2 Long Benches",
    "leadTime": "15-20 Days",
    "image": "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.15_c8216cb4.jpg",
    "description": "Rustic red stone picnic and courtyard furniture set with carved trestle legs and chamfered edges.",
    "descriptionHi": "लाल पत्थर से बना मजबूत टेबल बेंच सेट, बगीचे और फार्महाउस पर आउटडोर बैठने हेतु।",
    "features": [
      "Dense hard stone enduring generations",
      "Resistant to moisture absorption and stains",
      "Easy pressure-wash cleaning"
    ],
    "isFeatured": false,
    "code": "RK-PROD-40",
    "isActive": true
  },
  {
    "id": "brown-sandstone-garden-planter",
    "name": "Brown Sandstone Garden Planter",
    "nameHi": "ब्राउन सैंडस्टोन गार्डन गमला (प्लांटर)",
    "category": "sandstone-planter",
    "price": 8500,
    "priceUnit": "piece",
    "stoneType": "Natural Brown Sandstone",
    "dimensions": "20in Diameter x 22in Height",
    "leadTime": "7-10 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg",
    "description": "Urn style natural sandstone garden planter with flared fluted lip, drainage hole, and pedestal base.",
    "descriptionHi": "प्राकृतिक भूरे सैंडस्टोन से बना सुंदर गमला, जल निकासी छेद और नक्काशीदार आधार सहित।",
    "features": [
      "Integrated central drainage hole",
      "Insulates plant roots against summer heat",
      "Heavyweight prevents tip-over by pets or winds"
    ],
    "isFeatured": true,
    "code": "RK-PROD-41",
    "isActive": true
  },
  {
    "id": "decorative-garden-sandstone-planter",
    "name": "Decorative Garden Sandstone Planter",
    "nameHi": "सजावटी गार्डन सैंडस्टोन प्लांटर",
    "category": "sandstone-planter",
    "price": 11500,
    "priceUnit": "piece",
    "stoneType": "Dholpur Sandstone",
    "dimensions": "24in Square x 24in Height",
    "leadTime": "8-12 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_46b856ca.jpg",
    "description": "Square modular architectural planter with carved acanthus leaf borders, suitable for poolside and entrance steps.",
    "descriptionHi": "चौकोर नक्काशीदार प्लांटर, विला के मुख्य द्वार व स्विमिंग पूल के पास सजावट हेतु।",
    "features": [
      "Direct planting or pot-in-pot use",
      "Freeze-thaw fracture resistant",
      "Artisanal chisel textured sides"
    ],
    "isFeatured": false,
    "code": "RK-PROD-42",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-planter",
    "name": "Hand Carved Sandstone Planter",
    "nameHi": "हस्तनिर्मित नक्काशीदार सैंडस्टोन गमला",
    "category": "sandstone-planter",
    "price": 14000,
    "priceUnit": "piece",
    "stoneType": "Pink Sandstone",
    "dimensions": "26in Diameter x 28in Height",
    "leadTime": "10-14 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_281a8bfe.jpg",
    "description": "Royal palace style urn planter with deep relief carved swan handles and lotus bowl fluting.",
    "descriptionHi": "राजसी शैली में हंस आकृतियों और कमल पंखुड़ियों से तराशा गया बड़ा पत्थर गमला।",
    "features": [
      "Master artisan hand-chiseled motifs",
      "Antique stone wash finish",
      "Suitable for ornamental trees and flowering shrubs"
    ],
    "isFeatured": true,
    "code": "RK-PROD-43",
    "isActive": true
  },
  {
    "id": "decorative-sandstone-sphere",
    "name": "Decorative Sandstone Sphere",
    "nameHi": "सजावटी सैंडस्टोन बॉल (स्फेयर)",
    "category": "sandstone-ball-sphere",
    "price": 6500,
    "priceUnit": "piece",
    "stoneType": "Solid Natural Sandstone",
    "dimensions": "12in - 24in Diameter (Customizable)",
    "leadTime": "5-8 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_0d900ff3.jpg",
    "description": "Precision machine-lathed solid sandstone sphere ball for gate pillar finials, boundary caps, and zen gardens.",
    "descriptionHi": "मशीन द्वारा तराशी गई ठोस सैंडस्टोन बॉल, मुख्य द्वार के खंभों व गार्डन सजावट हेतु।",
    "features": [
      "100% solid monolithic stone turning",
      "Available in matte honed or smooth sandstone texture",
      "Flat base or drill pin mounting ready"
    ],
    "isFeatured": true,
    "code": "RK-PROD-44",
    "isActive": true
  },
  {
    "id": "polished-architectural-sandstone-gate-sphere",
    "name": "Polished Architectural Sandstone Gate Sphere",
    "nameHi": "पॉलिश सैंडस्टोन गेट पिलर बॉल",
    "category": "sandstone-ball-sphere",
    "price": 9500,
    "priceUnit": "piece",
    "stoneType": "Dholpur & Teakwood Sandstone",
    "dimensions": "18in Diameter with Integrated Base Cap",
    "leadTime": "7-10 Days",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_0d900ff3.jpg",
    "description": "Architectural gate post finial sphere resting on carved square base plinth for grand mansion entrances.",
    "descriptionHi": "गेट के खंभों के ऊपर लगाने हेतु बेस सहित पॉलिश सैंडस्टोन पिलर बॉल।",
    "features": [
      "Integrated base block for rock-solid adhesive mounting",
      "Natural swirling stone grain",
      "Resistant to fading and lichen"
    ],
    "isFeatured": false,
    "code": "RK-PROD-45",
    "isActive": true
  },
  {
    "id": "artisan-crafted-sandstone-elephant-sculpture",
    "name": "Artisan Crafted Sandstone Elephant Sculpture",
    "nameHi": "कारीगरी सैंडस्टोन गजराज (हाथी) मूर्ति",
    "category": "sandstone-elephant-statue",
    "price": 65000,
    "priceUnit": "piece",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "3ft Height x 4ft Length x 18in Width",
    "leadTime": "15-20 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
    "description": "Magnificent hand-carved stone elephant with raised trunk holding a sacred lotus, adorned with royal jhool tapestry.",
    "descriptionHi": "कमल पुष्प उठाए सूंड उठाए हुए शुभ गजराज की नक्काशीदार राजसी मूर्ति।",
    "features": [
      "Symbol of prosperity and welcoming vastu energy",
      "Detailed saddle carpet and trunk folds carving",
      "Available in facing pairs for entrance gates"
    ],
    "isFeatured": true,
    "code": "RK-PROD-46",
    "isActive": true
  },
  {
    "id": "decorative-sandstone-elephant-statue",
    "name": "Decorative Sandstone Elephant Statue",
    "nameHi": "सजावटी सैंडस्टोन हाथी मूर्ति",
    "category": "sandstone-elephant-statue",
    "price": 45000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige Sandstone",
    "dimensions": "2.5ft Height x 3ft Length",
    "leadTime": "12-16 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.02_dcb8582d.jpg",
    "description": "Compact carved elephant figurine designed for porches, entrance foyers, gardens, and resort walkways.",
    "descriptionHi": "प्रवेश द्वार और पोर्च के लिए सुंदर मध्यम आकार की नक्काशीदार हाथी मूर्ति।",
    "features": [
      "Finely polished tusk and ear details",
      "Weather-resistant outdoor durability",
      "Single block stone carving"
    ],
    "isFeatured": false,
    "code": "RK-PROD-47",
    "isActive": true
  },
  {
    "id": "hand-carved-sandstone-elephant-statue",
    "name": "Hand Carved Sandstone Elephant Statue",
    "nameHi": "हस्तनिर्मित सैंडस्टोन हाथी प्रतिमा",
    "category": "sandstone-elephant-statue",
    "price": 95000,
    "priceUnit": "piece",
    "stoneType": "Selected Block Red Sandstone",
    "dimensions": "4ft Height x 5ft Length x 2ft Width",
    "leadTime": "20-25 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.02_f9157833.jpg",
    "description": "Life-sized royal guardian elephant sculpted from a single boulder with ceremonial headgear and anklets.",
    "descriptionHi": "एक ही बड़े पत्थर से तराशी गई 4 फुट ऊंची भव्य शाही हाथी प्रतिमा।",
    "features": [
      "Monolithic boulder carving",
      "Lifelike eye and skin texture chisel work",
      "Heavy stable footprint requiring no anchor bolts"
    ],
    "isFeatured": true,
    "code": "RK-PROD-48",
    "isActive": true
  },
  {
    "id": "handcrafted-sandstone-elephant-statue",
    "name": "Handcrafted Sandstone Elephant Statue",
    "nameHi": "हैंडक्राफ्टेड सैंडस्टोन एलीफैंट स्टैच्यू",
    "category": "sandstone-elephant-statue",
    "price": 78000,
    "priceUnit": "piece",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "3.5ft Height x 4.5ft Length",
    "leadTime": "18-22 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_0bfe988a.jpg",
    "description": "Ceremonial gateway elephant pair sculpt with bell harness and lotus blossom pedestal.",
    "descriptionHi": "मंदिर और कोठी के मुख्य गेट के लिए विशेष नक्काशीदार हाथी प्रतिमा।",
    "features": [
      "Handcrafted by master animal sculptors",
      "Available in matched left/right gate pairs",
      "Shipped in reinforced wooden crates"
    ],
    "isFeatured": false,
    "code": "RK-PROD-49",
    "isActive": true
  },
  {
    "id": "white-sandstone-buddha-statue",
    "name": "White Sandstone Buddha Statue",
    "nameHi": "सफेद सैंडस्टोन बुद्ध प्रतिमा",
    "category": "sandstone-god-statue",
    "price": 55000,
    "priceUnit": "piece",
    "stoneType": "Gwalior White Sandstone",
    "dimensions": "4ft Height x 2.5ft Width x 18in Depth",
    "leadTime": "15-20 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_9fa8d27a.jpg",
    "description": "Meditative Dhyana Mudra Buddha statue hand-carved from pristine white natural sandstone, radiating serenity and peace.",
    "descriptionHi": "शांत मुद्रा में ध्यानस्थ भगवान बुद्ध की सफेद सैंडस्टोन प्रतिमा, आंतरिक शांति और ध्यान हेतु।",
    "features": [
      "Intricately carved robe folds and lotus throne",
      "Calming facial expression sculpted by master murtikars",
      "Ideal for zen gardens, water bodies, and yoga studios"
    ],
    "isFeatured": true,
    "code": "RK-PROD-50",
    "isActive": true
  },
  {
    "id": "sandstone-standing-vishnu-bhagwan-statue",
    "name": "Sandstone Standing Vishnu Bhagwan Statue",
    "nameHi": "सैंडस्टोन चतुर्भुज विष्णु भगवान प्रतिमा",
    "category": "sandstone-god-statue",
    "price": 85000,
    "priceUnit": "piece",
    "stoneType": "Bansi Pink Sandstone",
    "dimensions": "5ft Height x 2ft Width x 15in Depth",
    "leadTime": "20-25 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_8fe2200f.jpg",
    "description": "Chaturbhuja Lord Vishnu holding Shankha, Chakra, Gada, and Padma, wearing Kiritamukuta and ornate jewelry.",
    "descriptionHi": "शंख, चक्र, गदा और पद्म धारण किए भगवान विष्णु की नक्काशीदार 5 फुट ऊंची प्रतिमा।",
    "features": [
      "Shilpa Shastra compliant proportions",
      "Deep undercut jewelry and crown carving",
      "Consecrated temple grade quality"
    ],
    "isFeatured": true,
    "code": "RK-PROD-51",
    "isActive": true
  },
  {
    "id": "sandstone-sherawali-mata-statue",
    "name": "Sandstone Sherawali Mata Statue",
    "nameHi": "सैंडस्टोन शेरावाली माता प्रतिमा (सिंह वाहिनी)",
    "category": "sandstone-god-statue",
    "price": 95000,
    "priceUnit": "piece",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "4.5ft Height x 3ft Width",
    "leadTime": "22-28 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_9fa8d27a.jpg",
    "description": "Maa Durga seated upon her fierce lion with eight arms bearing divine weapons and granting abhaya blessing.",
    "descriptionHi": "सिंह पर विराजमान अष्टभुजा शेरावाली मां दुर्गा की नक्काशीदार सैंडस्टोन मूर्ति।",
    "features": [
      "Vibrant dynamic lion and goddess composition",
      "Exquisite weapon detailing in each hand",
      "Polished and treated for lifetime outdoor devotion"
    ],
    "isFeatured": false,
    "code": "RK-PROD-52",
    "isActive": true
  },
  {
    "id": "sandstone-adi-guru-shankaracharya-statue",
    "name": "Sandstone Adi Guru Shankaracharya Statue",
    "nameHi": "सैंडस्टोन आदि गुरु शंकराचार्य प्रतिमा",
    "category": "sandstone-god-statue",
    "price": 75000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige Stone",
    "dimensions": "4ft Height x 2.5ft Width",
    "leadTime": "18-22 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_8fe2200f.jpg",
    "description": "Venerated depiction of Jagadguru Adi Shankaracharya in preaching pose holding the danda and palm leaf manuscripts.",
    "descriptionHi": "दंड और ज्ञान मुद्रा धारण किए जगतगुरु आदि शंकराचार्य की पवित्र पत्थर प्रतिमा।",
    "features": [
      "Authentic ascetic drapery and posture",
      "Designed for mathas, ashrams, and spiritual trusts",
      "High weather durability"
    ],
    "isFeatured": false,
    "code": "RK-PROD-53",
    "isActive": true
  },
  {
    "id": "sandstone-ram-darbar-wall-mural",
    "name": "Sandstone RAM Darbar Wall Mural",
    "nameHi": "सैंडस्टोन राम दरबार वॉल म्यूरल",
    "category": "sandstone-wall-mural",
    "price": 850,
    "priceUnit": "sq. ft",
    "stoneType": "Fine Grain Pink & Beige Sandstone",
    "dimensions": "8ft Width x 5ft Height (Modular Panels)",
    "leadTime": "20-30 Days",
    "image": "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
    "description": "Magnificent high-relief wall mural depicting Bhagwan Ram, Mata Sita, Lakshman ji, and Bhakt Hanuman in royal darbar.",
    "descriptionHi": "प्रभु श्री राम, माता सीता, लक्ष्मण जी और हनुमान जी का नक्काशीदार भव्य राम दरबार वॉल म्यूरल।",
    "features": [
      "3D bas-relief depth up to 75mm",
      "Interlocking continuous stone panels",
      "Concealed rear clamp hanging slots"
    ],
    "isFeatured": true,
    "code": "RK-PROD-54",
    "isActive": true
  },
  {
    "id": "grey-sandstone-radha-krishna-wall-mural",
    "name": "Grey Sandstone Radha Krishna Wall Mural",
    "nameHi": "ग्रे सैंडस्टोन राधा कृष्ण वॉल म्यूरल",
    "category": "sandstone-wall-mural",
    "price": 820,
    "priceUnit": "sq. ft",
    "stoneType": "Natural Grey & Beige Sandstone",
    "dimensions": "6ft Height x 4ft Width",
    "leadTime": "15-20 Days",
    "image": "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.03_0b8759fb.jpg",
    "description": "Romantic divine scene of Radha and Krishna under the Kadamba tree with flute, peacocks, and floral creepers.",
    "descriptionHi": "कदंब वृक्ष तले बांसुरी बजाते श्री राधा-कृष्ण और मयूर का सुंदर वॉल म्यूरल।",
    "features": [
      "Fluid anatomical sculpting and garments",
      "Subtle two-tone natural stone texturing",
      "Ready for living room or puja wall backdrop installation"
    ],
    "isFeatured": true,
    "code": "RK-PROD-55",
    "isActive": true
  },
  {
    "id": "sandstone-krishna-makhan-leela-wall-mural",
    "name": "Sandstone Krishna Makhan Leela Wall Mural",
    "nameHi": "सैंडस्टोन कृष्ण माखन लीला वॉल म्यूरल",
    "category": "sandstone-wall-mural",
    "price": 890,
    "priceUnit": "sq. ft",
    "stoneType": "Dholpur Sandstone",
    "dimensions": "7ft Width x 4.5ft Height",
    "leadTime": "18-25 Days",
    "image": "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.03_a0d8c0b5.jpg",
    "description": "Joyful depiction of Bal Gopal Krishna stealing butter with his gopala friends and Yashoda Maiya.",
    "descriptionHi": "बाल गोपाल श्री कृष्ण की माखन चोरी और बाल लीलाओं का सजीव पत्थर म्यूरल।",
    "features": [
      "Intricate expressions on all child figures",
      "Hand-honed stain resistant sealant",
      "Custom borders matching room woodwork"
    ],
    "isFeatured": false,
    "code": "RK-PROD-56",
    "isActive": true
  },
  {
    "id": "sandstone-angel-garden-statue",
    "name": "Sandstone Angel Garden Statue",
    "nameHi": "सैंडस्टोन एंजल गार्डन प्रतिमा",
    "category": "sandstone-angel-garden-statue",
    "price": 48000,
    "priceUnit": "piece",
    "stoneType": "Gwalior White Sandstone",
    "dimensions": "3.5ft Height x 20in Base",
    "leadTime": "12-16 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_e336e10d.jpg",
    "description": "Graceful European style garden angel figurine with detailed feathered wings, draped robe, and peaceful gaze.",
    "descriptionHi": "पंखों वाली सुंदर परी (एंजल) की गार्डन प्रतिमा, लॉन और फव्वारों के किनारे सजावट हेतु।",
    "features": [
      "Detailed feathering on layered stone wings",
      "Sculpted from frost-immune high density sandstone",
      "Perfect accent for roses, water fountains, and lawns"
    ],
    "isFeatured": true,
    "code": "RK-PROD-57",
    "isActive": true
  },
  {
    "id": "classic-winged-cherub-sandstone-fountain-statue",
    "name": "Classic Winged Cherub Sandstone Fountain Statue",
    "nameHi": "क्लासिक विंग्ड चेरुब सैंडस्टोन फाउंटेन प्रतिमा",
    "category": "sandstone-angel-garden-statue",
    "price": 38000,
    "priceUnit": "piece",
    "stoneType": "Dholpur Beige Stone",
    "dimensions": "2.8ft Height x 16in Base",
    "leadTime": "10-14 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_e336e10d.jpg",
    "description": "Charming winged cherub angel holding a water pitcher plumbed for continuous water fountain spillover.",
    "descriptionHi": "घड़ा लिए हुए परी की सुंदर प्रतिमा, जिसमें से लगातार पानी का फव्वारा निकलता है।",
    "features": [
      "Internal 0.5-inch brass water delivery tube",
      "Smooth water cascade over stone contours",
      "Low maintenance mineral deposit resistant"
    ],
    "isFeatured": false,
    "code": "RK-PROD-58",
    "isActive": true
  },
  {
    "id": "sandstone-mother-child-statue",
    "name": "Sandstone Mother Child Statue",
    "nameHi": "सैंडस्टोन वात्सल्य (मां-बच्चा) प्रतिमा",
    "category": "sandstone-mother-child-statue",
    "price": 52000,
    "priceUnit": "piece",
    "stoneType": "Natural Pink Sandstone",
    "dimensions": "4ft Height x 22in Width",
    "leadTime": "14-18 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_52d3a373.jpg",
    "description": "Poignant figurative stone sculpture capturing eternal maternal love and nurturing affection with fluid contours.",
    "descriptionHi": "मां और बच्चे के असीम प्रेम और वात्सल्य को दर्शाती सुंदर सैंडस्टोन कलाकृति।",
    "features": [
      "Masterfully carved emotion and tender embrace",
      "Polished surface emphasizing the natural stone veins",
      "Ideal for family estates, hospitals, schools, and gardens"
    ],
    "isFeatured": true,
    "code": "RK-PROD-59",
    "isActive": true
  },
  {
    "id": "contemporary-abstract-mother-and-child-sandstone-sculpture",
    "name": "Contemporary Abstract Mother and Child Sandstone Sculpture",
    "nameHi": "आधुनिक अमूर्त मां-बच्चा सैंडस्टोन शिल्प",
    "category": "sandstone-mother-child-statue",
    "price": 46000,
    "priceUnit": "piece",
    "stoneType": "Gwalior Fine Sandstone",
    "dimensions": "3.2ft Height x 18in Width",
    "leadTime": "12-16 Days",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_52d3a373.jpg",
    "description": "Modern minimalist abstract silhouette celebrating motherhood, sculpted for contemporary villas and art galleries.",
    "descriptionHi": "आधुनिक आर्ट फॉर्म में मां और बच्चे का सुंदर मिनिमलिस्टिक स्टोन स्कल्पचर।",
    "features": [
      "Modern clean curving forms",
      "Smooth honed stone finish",
      "Heavy display pedestal included"
    ],
    "isFeatured": false,
    "code": "RK-PROD-60",
    "isActive": true
  },
  {
    "id": "red-sandstone-ashok-stambh-with-pillar",
    "name": "Red Sandstone Ashok Stambh with Pillar (Lion Capital)",
    "nameHi": "रेड सैंडस्टोन अशोक स्तंभ चार शेर शीर्ष सहित",
    "category": "red-sandstone-ashok-stambh",
    "price": 285000,
    "priceUnit": "piece",
    "stoneType": "Jodhpur & Bansi Paharpur Red Sandstone",
    "dimensions": "12ft Height x 22in Shaft Diameter",
    "leadTime": "25-35 Days",
    "image": "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_4437a324.jpg",
    "description": "Monumental National Emblem Ashoka Pillar carved from authentic Rajasthan red sandstone. Features the four lions standing back-to-back, Ashoka Chakra, bull, horse, and fluted column.",
    "descriptionHi": "भारत के गौरवशाली राष्ट्रीय प्रतीक चार मुखी शेर और चक्र सहित निर्मित विशालकाय लाल पत्थर का अशोक स्तंभ।",
    "features": [
      "Exact architectural proportions of the Sarnath capital",
      "Carved from weather-immune high density red sandstone",
      "Ideal for government institutions, universities, memorials, and grand villas"
    ],
    "isFeatured": true,
    "code": "RK-PROD-61",
    "isActive": true
  },
  {
    "id": "carved-red-sandstone-architectural-stambh-pillar",
    "name": "Carved Red Sandstone Architectural Stambh Pillar",
    "nameHi": "नक्काशीदार लाल सैंडस्टोन आर्किटेक्चरल स्तंभ खंभा",
    "category": "red-sandstone-ashok-stambh",
    "price": 65000,
    "priceUnit": "piece",
    "stoneType": "Jodhpur Desert Red Sandstone",
    "dimensions": "10ft Height x 16in Base Diameter",
    "leadTime": "15-20 Days",
    "image": "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
    "description": "Structural load-bearing red sandstone pillar with classical rings, lotus capital, and pedestal base.",
    "descriptionHi": "मजबूत लोड-बेयरिंग लाल सैंडस्टोन खंभा, मुख्य द्वारों व बरामदों के लिए।",
    "features": [
      "Solid one-piece stone turning",
      "High compression bearing rating",
      "Traditional Marwar craftsmanship"
    ],
    "isFeatured": false,
    "code": "RK-PROD-62",
    "isActive": true
  }
];

export const getProductCode = (product?: Product | null, fallbackIndex?: number): string => {
  if (!product) return "RK-PROD-01";
  if (product.code) return product.code;
  const match = products.findIndex(p => p.id === product.id || p._id === product._id);
  const idx = match >= 0 ? match + 1 : (fallbackIndex !== undefined ? fallbackIndex + 1 : 1);
  return `RK-PROD-${String(idx).padStart(2, "0")}`;
};

export const categories: Category[] = [
  {
    "id": "sandstone-temple",
    "name": "Sandstone Temple",
    "hindi": "सैंडस्टोन मंदिर",
    "image": "/products/Stone%20Temple/3.jpg",
    "description": "Sacred handcrafted Vedic mandirs in natural sandstone and Makrana marble"
  },
  {
    "id": "sandstone-temple-entry-gate",
    "name": "Sandstone Temple Entry Gate",
    "hindi": "मंदिर प्रवेश द्वार व तोरण",
    "image": "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    "description": "Monumental carved stone torans, entrance architraves, and pillars"
  },
  {
    "id": "dholpur-sandstone-temple",
    "name": "Dholpur Sandstone Temple",
    "hindi": "धौलपुर सैंडस्टोन मंदिर",
    "image": "/products/Stone%20Temple/1.jpg",
    "description": "Authentic Dholpur pink, red, and beige sandstone sacred temples"
  },
  {
    "id": "sandstone-grill",
    "name": "Sandstone Grill",
    "hindi": "सैंडस्टोन जाली व ग्रिल",
    "image": "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    "description": "3D CNC and hand-carved stone lattice screens for facades and railings"
  },
  {
    "id": "sandstone-lamp",
    "name": "Sandstone Lamp",
    "hindi": "सैंडस्टोन लैंप व दीपस्तंभ",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_37a17d6c.jpg",
    "description": "Turned garden bollards, lantern pillars, and deepstambhs"
  },
  {
    "id": "sandstone-gazebo",
    "name": "Sandstone Gazebo",
    "hindi": "सैंडस्टोन छतरी व गज़ेबो",
    "image": "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    "description": "Traditional dome pavilions, garden gazebos, and 6/8-pillar chhatris"
  },
  {
    "id": "sandstone-fountains",
    "name": "Sandstone Fountains",
    "hindi": "सैंडस्टोन वाटर फाउंटेन",
    "image": "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    "description": "Multi-tier cascading stone fountains, lotus basins, and lion spouts"
  },
  {
    "id": "sandstone-garden-bench",
    "name": "Sandstone Garden Bench",
    "hindi": "सैंडस्टोन गार्डन बेंच",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_bb5957bd.jpg",
    "description": "Handcrafted outdoor park benches, round table sets, and curved seats"
  },
  {
    "id": "sandstone-planter",
    "name": "Sandstone Planter",
    "hindi": "सैंडस्टोन गमले व कलश",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg",
    "description": "Courtyard planter urns, fluted boxes, and decorative stone pots"
  },
  {
    "id": "sandstone-ball-sphere",
    "name": "Sandstone Ball Sphere",
    "hindi": "सैंडस्टोन बॉल व स्फेयर",
    "image": "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_0d900ff3.jpg",
    "description": "Turned solid stone spheres, gate pillar finials, and landscape spheres"
  },
  {
    "id": "sandstone-elephant-statue",
    "name": "Sandstone Elephant Statue",
    "hindi": "सैंडस्टोन हाथी मूर्ति",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
    "description": "Monolithic carved royal elephants (Gajraj) holding sacred lotuses"
  },
  {
    "id": "sandstone-god-statue",
    "name": "Sandstone God Statue",
    "hindi": "सैंडस्टोन भगवान मूर्ति",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_9fa8d27a.jpg",
    "description": "Buddha statues, Vishnu, Sherawali Mata, and Shankaracharya sculptures"
  },
  {
    "id": "sandstone-wall-mural",
    "name": "Sandstone Wall Mural",
    "hindi": "सैंडस्टोन वॉल म्यूरल",
    "image": "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
    "description": "Ram Darbar, Radha Krishna, and Krishna Makhan Leela bas-reliefs"
  },
  {
    "id": "sandstone-angel-garden-statue",
    "name": "Sandstone Angel Garden Statue",
    "hindi": "सैंडस्टोन एंजल गार्डन मूर्ति",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_e336e10d.jpg",
    "description": "Sculpted winged angel figurines and garden cherub water spouts"
  },
  {
    "id": "sandstone-mother-child-statue",
    "name": "Sandstone Mother Child Statue",
    "hindi": "सैंडस्टोन मदर चाइल्ड मूर्ति",
    "image": "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_52d3a373.jpg",
    "description": "Graceful stone sculptures celebrating eternal maternal love"
  },
  {
    "id": "red-sandstone-ashok-stambh",
    "name": "Red Sandstone Ashok Stambh with Pillar",
    "hindi": "रेड सैंडस्टोन अशोक स्तंभ",
    "image": "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_4437a324.jpg",
    "description": "National emblem Ashoka pillar with 4-lion capital in red sandstone"
  }
];
