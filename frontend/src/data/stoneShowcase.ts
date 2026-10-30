// Master Data for RK Stone Corporation Craftsmanship & Stones
// Directly referencing authentic photos from the Products folder

export interface CraftItem {
  id: string;
  title: string;
  hindiTitle: string;
  tag: string;
  description: string;
  image: string;
  galleryImages: string[];
  link: string;
  materials: string[];
  features: string[];
  customizableParams: string[];
  modelCount?: string;
}

export interface StoneType {
  id: string;
  name: string;
  hindiName: string;
  quarry: string;
  colorTone: string;
  durability: string;
  bestFor: string;
  description: string;
  image: string;
  sampleImages: string[];
  textureFinish: string[];
}

export const CRAFT_CATEGORIES: CraftItem[] = [
  {
    id: "stone-temple",
    title: "Handcrafted Stone Temples & Mandirs",
    hindiTitle: "पत्थर के नक्काशीदार वैदिक मंदिर",
    tag: "HANDCRAFTED TEMPLE STONE",
    modelCount: "15+ Models",
    description: "Authentic Hindu temples and home mandirs hand-carved in pure Bansi Paharpur pink stone and Dholpur sandstone. Complete with ornate monolithic shikhara, carved pillars, and sanctum garbhagriha.",
    image: "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/21-feet-dholpur-sandstone-temple-1769601432-8558083.jpeg",
    galleryImages: [
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/21-feet-dholpur-sandstone-temple-1769601432-8558083.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/dholpur-pink-sandstone-temple-1769601284-8558070.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/carved-sandstone-temple-1769599633-8557987.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/handcrafted-sandstone-temple-1769599759-8557996.jpeg",
    ],
    link: "/shop?category=sandstone-temple",
    materials: ["Dholpur Beige Sandstone", "Bansi Paharpur Pink Stone", "Jodhpur Sandstone"],
    features: ["100% Vedic Proportions", "Hand-carved celestial deities", "Zero joint seepage engineering"],
    customizableParams: ["Height: 3ft to 31ft+", "Pooja room or freestanding temple", "Dholpur or Bansi Sandstone"],
  },
  {
    id: "chhatri",
    title: "Royal Stone Chhatris & Garden Gazebos",
    hindiTitle: "शाही नक्काशीदार छतरियां व गज़ेबो",
    tag: "ROYAL RAJASTHANI CHHATRIS",
    modelCount: "8+ Styles",
    description: "Regal Rajasthani sandstone chhatris and garden pavilions carved with traditional arches, turned fluted pillars, lotus finials, and interlocking stone dome canopies. Designed for heritage gardens and estates.",
    image: "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/brown-sandstone-outdoor-gazebo-1769683058-8559875.jpeg",
    galleryImages: [
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/brown-sandstone-outdoor-gazebo-1769683058-8559875.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/traditional-sandstone-gazebo-1769686591-8560038.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/handcrafted-sandstone-gazebo-1769686055-8560014.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/dome-white-sandstone-garden-gazebo-1769683179-8559876.jpeg",
    ],
    link: "/shop?category=sandstone-gazebo",
    materials: ["Dholpur Heritage Beige Stone", "Red Sandstone", "Gwalior Stone"],
    features: ["Monolithic pillar bases", "Interlocking stone dome", "Weather-proof century durability"],
    customizableParams: ["4-Pillar, 6-Pillar, 8-Pillar or 12-Pillar", "Diameter 6ft to 25ft+", "Single or multi-tier"],
  },
  {
    id: "wall-panel",
    title: "3D CNC Jalis & Architectural Screens",
    hindiTitle: "3D सीएनसी नक्काशीदार जाली व स्क्रीन्स",
    tag: "3D CNC STONE SCREENS",
    modelCount: "14+ Designs",
    description: "Precision CNC-milled perforated stone jalis and elevation panels carved in Gwalior mint and Dholpur sandstone. Ideal for villa exterior facades, boundary walls, and mandir partition screens.",
    image: "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/sandstone-boundary-grill-1769677056-8559529.jpeg",
    galleryImages: [
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/sandstone-boundary-grill-1769677056-8559529.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/handcrafted-sandstone-grill-1770294210-8559366.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/decorative-sandstone-grill-for-exterior-walls-1769602673-8558151.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/sandstone-ventilation-grill-with-artistic-pattern-1769603132-8558164.jpeg",
    ],
    link: "/shop?category=sandstone-grill",
    materials: ["Gwalior White Mint Stone", "Dholpur Beige", "Teakwood Sandstone"],
    features: ["Any CAD / 3D pattern supported", "25mm to 75mm slab thickness", "Seamless multi-panel matching"],
    customizableParams: ["Custom geometric or floral motif", "Dry cladding anchor holes pre-drilled", "Custom panel dimensions"],
  },
  {
    id: "heritage-haveli",
    title: "Rajasthani Jharokhas & Haveli Facades",
    hindiTitle: "राजस्थानी झरोखे व हवेली तोरण",
    tag: "ROYAL RAJPUTANA ARCHITECTURE",
    modelCount: "Bespoke Works",
    description: "Ornate palace-style stone jharokhas, sculpted peacock brackets, fluted balcony balustrades, and royal haveli wall murals carved to give residences and luxury resorts timeless majesty.",
    image: "/assets/Heritage-Haveli.jpg",
    galleryImages: [
      "/assets/Heritage-Haveli.jpg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/grey-sandstone-radha-krishna-wall-mural-1769679262-8559665.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/sandstone-ram-darbar-wall-mural-1769679177-8559661.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/sandstone-krishna-makhan-leela-wall-mural-1769679362-8559669.jpeg",
    ],
    link: "/shop?category=sandstone-wall-mural",
    materials: ["Dholpur Pink & Beige Stone", "Jodhpur Red Sandstone", "Gwalior Stone"],
    features: ["Hand-carved decorative brackets", "Ornate stone canopy (Chajja)", "Structural cantilever anchors"],
    customizableParams: ["Window opening size", "Single or triple jharokha bay", "Custom relief patterns"],
  },
  {
    id: "gate",
    title: "Grand Entrance Gates, Arches & Pillars",
    hindiTitle: "भव्य पाषाण प्रवेश द्वार (तोरण) व पिलर्स",
    tag: "ENTRANCE GATES & PILLARS",
    modelCount: "8+ Toran Gates",
    description: "Handcrafted monolithic stone toran gates, entrance arches, and structural load-bearing fluted pillars for farmhouses, temple complexes, gated estates, and institutional entrances.",
    image: "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/handcrafted-sandstone-temple-main-gate-1769600695-8558045.jpeg",
    galleryImages: [
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/handcrafted-sandstone-temple-main-gate-1769600695-8558045.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/designer-sandstone-temple-entrance-gate-1769601091-8558036.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/natural-sandstone-entry-gate-with-traditional-1769600898-8558056.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/solid-sandstone-temple-entry-gate-1769600983-8558059.jpeg",
    ],
    link: "/shop?category=sandstone-temple-entry-gate",
    materials: ["Jodhpur Imperial Red Stone", "Dholpur Beige", "Bansi Paharpur"],
    features: ["Heavy structural load capability", "Deep bas-relief carvings", "Modular interlocking drums"],
    customizableParams: ["Entry span 10ft to 40ft+", "Clearance height 12ft to 25ft", "Matching boundary wall pillars"],
  },
  {
    id: "garden-fountain",
    title: "Tiered Courtyard Fountains & Sculptures",
    hindiTitle: "शाही वाटर फाउंटेन व पाषाण प्रतिमाएं",
    tag: "COURTYARD FOUNTAINS & STATUES",
    modelCount: "17+ Works",
    description: "Multi-tier cascading stone fountains, hand-carved lotus basins, lion and elephant spouts, and majestic monolithic sandstone elephant statues sculpted directly from quarry blocks.",
    image: "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/weather-resistant-sandstone-fountains-1769684308-8559936.jpeg",
    galleryImages: [
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/weather-resistant-sandstone-fountains-1769684308-8559936.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/hand-carved-sandstone-fountains-1769683786-8559907.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/artisan-crafted-sandstone-elephant-sculpture-1769677868-8559594.jpeg",
      "https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/decorative-sandstone-elephant-statue-1769677748-8559586.jpeg",
    ],
    link: "/shop?category=sandstone-fountains",
    materials: ["Dholpur Sandstone", "Gwalior Stone", "Red Sandstone"],
    features: ["Integrated concealed water plumbing", "Hydrophobic protective sealing", "Acoustic splashing resonance"],
    customizableParams: ["Diameter 4ft to 20ft+", "1-tier, 2-tier or 3-tier cascade", "Animal spouts or floral carvings"],
  },
];

export const STONE_PALETTE: StoneType[] = [
  {
    id: "gwalior-stone",
    name: "Gwalior White Mint Stone",
    hindiName: "ग्वालियर मिंट स्टोन",
    quarry: "Gwalior - Chambal Basin",
    colorTone: "Subtle White, Mint Cream & Pale Ivory",
    durability: "Ultra-High Weather & Acid-Rain Resistance",
    bestFor: "3D CNC Jalis, Detailed Relief Carvings & Contemporary Elevation",
    description: "A dense, fine-grained quartzitic natural stone known for its uniform texture. It allows our 5-axis CNC machines and master artisans to carve razor-sharp, ultra-detailed jali screens and ornamental wall panels without chipping or eroding.",
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.00_d29799fe.jpg",
    sampleImages: [
      "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.00_d29799fe.jpg",
      "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
      "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.01_b7082331.jpg",
    ],
    textureFinish: ["Honed Velvet Finish", "3D Precision CNC Cut", "Bush Hammered", "Hand Chiseled Bas-Relief"],
  },
  {
    id: "dhaulpur-stone",
    name: "Royal Dholpur Sandstone (Beige & Pink)",
    hindiName: "धौलपुर सैंडस्टोन (बेज व पिंक)",
    quarry: "Dholpur Quarry Basin, Rajasthan",
    colorTone: "Warm Buff Beige, Teakwood Grain & Coral Pink",
    durability: "Century-grade exterior endurance in severe rain/heat",
    bestFor: "Haveli Facades, Carved Jharokhas, Royal Pillars & Chhatris",
    description: "The crown jewel of Rajasthani architectural stone. Celebrated for centuries across historic forts and palaces, Dholpur stone exhibits subtle wood-like grains and a dignified royal tone that matures into a richer patina with age.",
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_4f57584b.jpg",
    sampleImages: [
      "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_4f57584b.jpg",
      "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
      "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    ],
    textureFinish: ["Natural Sawn Honed", "Antique Hand Chiseled", "Deep Fluted Relief", "Teakwood Grain Polish"],
  },
  {
    id: "bansi-paharpur",
    name: "Bansi Paharpur Pink Sandstone",
    hindiName: "बंसी पहाड़पुर पिंक स्टोन (मंदिर ग्रेड)",
    quarry: "Bayana - Bharatpur Belt, Rajasthan",
    colorTone: "Sacred Terracotta Pink & Sunset Coral",
    durability: "Extremely High (100+ years lifespan)",
    bestFor: "Carved Stone Temples, Traditional Shikhars & Mandap Pillars",
    description: "The famous temple stone chosen for India's grand temples, including the Ayodhya Ram Mandir and Akshardham. Renowned worldwide for resisting moisture, intense heat, and heavy rain.",
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
    sampleImages: [
      "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
      "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_c543e9a6.jpg",
      "/products/Stone%20Temple/2.jpg",
    ],
    textureFinish: ["Traditional Carved Finish", "Hand Chiseled Antique", "Fine Raked Linear", "Smooth Sawn Finish"],
  },
  {
    id: "jodhpur-stone",
    name: "Jodhpur Imperial Red Sandstone",
    hindiName: "जोधपुर लाल सैंडस्टोन",
    quarry: "Jodhpur Desert Belt, Rajasthan",
    colorTone: "Deep Maroon, Desert Terracotta & Fiery Red",
    durability: "Ultra-heavy load-bearing, immune to desert wind erosion",
    bestFor: "Grand Entrance Gates (Torans), Pillars & Facades",
    description: "The historic cornerstone of Rajput fortifications like Mehrangarh and Umaid Bhawan Palace. Provides outstanding thermal insulation, keeping interiors cool during extreme summers while radiating stately royal dominance.",
    image: "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
    sampleImages: [
      "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
      "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_ff9ccaa5.jpg",
      "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    ],
    textureFinish: ["Rockface Split", "Traditional Hand Chiseled", "Smooth Calibrated", "Ornate Carved Motifs"],
  },
  {
    id: "red-sandstone",
    name: "Agra & Karauli Red Sandstone",
    hindiName: "आगरा व करौली लाल सैंडस्टोन",
    quarry: "Karauli / Dholpur Red Basin, Rajasthan",
    colorTone: "Rich Terracotta Red & Deep Rustic Ochre",
    durability: "Century-Grade All-Weather Exterior Strength & Density",
    bestFor: "Ashok Stambh, Wall Murals, Temples, Planters & Boundary Facades",
    description: "The historic red sandstone famous throughout India's monumental architecture, including Agra Fort and Fatehpur Sikri. Naturally resistant to extreme heat and rain, it provides dignified strength and timeless heritage elegance.",
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
    sampleImages: [
      "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
      "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_c543e9a6.jpg",
      "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.17_26d4001b.jpg",
    ],
    textureFinish: ["Rockface Split", "Natural Hand Chiseled", "Shot Blasted", "Smooth Calibrated"],
  },
];
