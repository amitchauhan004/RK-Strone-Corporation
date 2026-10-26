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
    hindiTitle: "पत्थर के नक्काशीदार मंदिर",
    tag: "HANDCRAFTED TEMPLE STONE",
    description: "Stone mandirs carved in pure Dholpur sandstone & Bansi Paharpur pink stone. Built with carved shikhars and pillars with lifetime durability.",
    image: "/products/Stone%20Temple/3.jpg",
    galleryImages: [
      "/products/Stone%20Temple/1.jpg",
      "/products/Stone%20Temple/2.jpg",
      "/products/Stone%20Temple/3.jpg",
      "/products/Stone%20Temple/4.jpg",
    ],
    link: "/shop?category=sandstone-temple",
    materials: ["Dholpur Beige Sandstone", "Bansi Paharpur Pink Stone", "Jodhpur Sandstone"],
    features: ["100% Vedic Proportions", "Hand-carved celestial deities", "Zero joint seepage engineering"],
    customizableParams: ["Height: 3ft to 31ft+", "Pooja room or freestanding temple", "Dholpur or Bansi Sandstone"],
  },
  {
    id: "chhatri",
    title: "Royal Stone Chhatris & Garden Gazebos",
    hindiTitle: "शाही पत्थर की छतरियां",
    tag: "ROYAL RAJASTHANI CHHATRIS",
    description: "Traditional octagonal and circular stone chhatris with hand-turned fluted pillars, lotus finials, and carved domes. Perfect for luxury farmhouses, gardens, and heritage memorials.",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    galleryImages: [
      "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.22_d16a22d7.jpg",
      "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
      "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.24_b7721eb3.jpg",
      "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_c0476882.jpg",
    ],
    link: "/shop?category=chhatri",
    materials: ["Dholpur Heritage Beige Stone", "Red Sandstone", "Gwalior Stone"],
    features: ["Monolithic pillar bases", "Interlocking stone dome", "Weather-proof century durability"],
    customizableParams: ["4-Pillar, 6-Pillar, 8-Pillar or 12-Pillar", "Diameter 6ft to 25ft+", "Single or multi-tier"],
  },
  {
    id: "wall-panel",
    title: "3D CNC Jalis & Architectural Screens",
    hindiTitle: "3D सीएनसी जाली व दीवार पैनल्स",
    tag: "3D CNC STONE SCREENS",
    description: "Precision CNC milled natural sandstone jalis for luxury exterior elevation, natural airflow screens, boundary walls, pooja room partitions, and dramatic sun-shading facades.",
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    galleryImages: [
      "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
      "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_2a71e700.jpg",
      "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.29_a6af2408.jpg",
      "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.27_bf264f94.jpg",
    ],
    link: "/shop?category=wall-panel",
    materials: ["Gwalior White Mint Stone", "Dholpur Beige", "Teakwood Sandstone"],
    features: ["Any CAD / 3D pattern supported", "25mm to 75mm slab thickness", "Seamless multi-panel matching"],
    customizableParams: ["Custom geometric or floral motif", "Dry cladding anchor holes pre-drilled", "Custom panel dimensions"],
  },
  {
    id: "heritage-haveli",
    title: "Rajasthani Jharokhas & Haveli Facades",
    hindiTitle: "पारंपरिक नक्काशीदार झरोखे व हवेली एलिवेशन",
    tag: "ROYAL RAJPUTANA ARCHITECTURE",
    description: "Carved stone jharokhas with peacock brackets, pillars, and balconies. Gives your house or hotel elevation an authentic royal look.",
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg",
    galleryImages: [
      "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg",
      "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_4f57584b.jpg",
      "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.11_bdce4b58.jpg",
      "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.13_406c99ae.jpg",
    ],
    link: "/shop?category=heritage-haveli",
    materials: ["Dholpur Pink & Beige Stone", "Jodhpur Red Sandstone", "Gwalior Stone"],
    features: ["Hand-carved decorative brackets", "Ornate stone canopy (Chajja)", "Structural cantilever anchors"],
    customizableParams: ["Window opening size", "Single or triple jharokha bay", "Custom relief patterns"],
  },
  {
    id: "gate",
    title: "Grand Entrance Gates, Arches & Pillars",
    hindiTitle: "भव्य प्रवेश द्वार (तोरण) व नक्काशीदार पिलर्स",
    tag: "ENTRANCE GATES & PILLARS",
    description: "Carved stone toran gates, entrance archways, and load-bearing fluted pillars for farmhouses, gated communities, sacred temples, and royal estates.",
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    galleryImages: [
      "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
      "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_982679c9.jpg",
      "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.26_e1be2ed5.jpg",
      "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.27_bc9f1230.jpg",
    ],
    link: "/shop?category=gate",
    materials: ["Jodhpur Imperial Red Stone", "Dholpur Beige", "Bansi Paharpur"],
    features: ["Heavy structural load capability", "Deep bas-relief carvings", "Modular interlocking drums"],
    customizableParams: ["Entry span 10ft to 40ft+", "Clearance height 12ft to 25ft", "Matching boundary wall pillars"],
  },
  {
    id: "garden-fountain",
    title: "Tiered Courtyard Fountains & Sculptures",
    hindiTitle: "शाही वाटर फाउंटेन व पत्थर की मूर्तियां",
    tag: "COURTYARD FOUNTAINS & STATUES",
    description: "Multi-tier water fountains, lotus basins, lion head spouts, and carved animal statues (elephants, lions) sculpted from single stone blocks.",
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    galleryImages: [
      "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
      "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_bf455c63.jpg",
      "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
      "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.02_5e13a207.jpg",
    ],
    link: "/shop?category=garden-fountain",
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
