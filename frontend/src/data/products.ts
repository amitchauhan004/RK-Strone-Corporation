// Comprehensive Product Catalog for RK Stone Corporation
// All items link to real, authentic photographs in public/products

export interface Product {
  id: string;
  _id?: string;
  code?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stoneType?: string;
  description: string;
  features?: string[];
  dimensions?: string;
  leadTime?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  // 1. Stone Temples
  {
    id: "temple-makrana-1",
    code: "RK-PROD-01",
    name: "Pure Makrana White Marble Vedic Mandir",
    price: 349999,
    image: "/products/Stone%20Temple/3.jpg",
    category: "stone-temple",
    stoneType: "Makrana Pure White Marble",
    dimensions: "7ft Height x 5ft Width x 3ft Depth (Customizable)",
    leadTime: "25-30 Days",
    description: "Handcrafted consecrated Vedic mandir carved from pristine Makrana white marble. Features hand-carved shikhara with kalash, fluted mandapam pillars, and zero-yellowing calcitic durability.",
    features: [
      "100% Genuine Makrana 98%+ Calcite Marble",
      "Hand-chiseled celestial motifs adhering to Shilpa Shastra",
      "Concealed wiring channels for sanctum lighting",
      "Custom sizes available for villas and pooja rooms"
    ],
  },
  {
    id: "temple-pink-2",
    code: "RK-PROD-02",
    name: "Bansi Paharpur Pink Sandstone Temple",
    price: 489999,
    image: "/products/Stone%20Temple/2.jpg",
    category: "stone-temple",
    stoneType: "Bansi Paharpur Pink Sandstone",
    dimensions: "9ft Height x 6ft Width x 4ft Depth (Customizable)",
    leadTime: "30-45 Days",
    description: "Ayodhya Ram Mandir grade Bansi Paharpur pink sandstone sacred mandir. Built with heavy monolithic stone shikhara, carved toran arches, and 500+ years weather endurance.",
    features: [
      "Certified Bansi Paharpur quarry stone",
      "Interlocking stone tongue-and-groove jointing",
      "Rich terracotta pink hue that gains character with age",
      "Suitable for outdoor garden temples or prayer halls"
    ],
  },
  {
    id: "temple-freestanding-3",
    code: "RK-PROD-03",
    name: "Carved White Marble Home Mandir",
    price: 275000,
    image: "/products/Stone%20Temple/1.jpg",
    category: "stone-temple",
    stoneType: "Dholpur & Makrana Composite",
    dimensions: "6ft Height x 4.5ft Width x 2.5ft Depth",
    leadTime: "20-25 Days",
    description: "Compact temple featuring carved garbhagriha, peacocks, bell carvings, and pull-out marble prasad tray.",
    features: [
      "Traditional Sompura guild craftsmanship",
      "Hand-polished stain-resistant surface finish",
      "Foam-padded timber crating for zero transit shock"
    ],
  },
  {
    id: "temple-monumental-4",
    code: "RK-PROD-04",
    name: "Grand Trust Temple Mandapam & Shikhara",
    price: 650000,
    image: "/products/Stone%20Temple/4.jpg",
    category: "stone-temple",
    stoneType: "Bansi Paharpur & Dholpur Stone",
    dimensions: "15ft Height x 12ft Width (Turnkey Project)",
    leadTime: "60-90 Days",
    description: "Architectural public trust temple structure with multiple carved pillars, circumambulatory pathway, and high-relief deity panels.",
    features: [
      "Structural dead-load engineering support",
      "Full on-site turnkey erection across India",
      "Vedic Vastu-compliant geometric proportions"
    ],
  },

  // 2. Chhatri & Gazebos
  {
    id: "chhatri-royal-1",
    code: "RK-PROD-05",
    name: "Royal 8-Pillar Stone Chhatri (Octagonal Dome)",
    price: 399999,
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    category: "chhatri",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "12ft Diameter x 16ft Height",
    leadTime: "30-40 Days",
    description: "Traditional Rajasthani royal stone chhatri with 8 carved pillars, kalash finial, and sunshade chajjas.",
    features: [
      "Interlocking self-supporting dome craft",
      "Hand-carved floral capital brackets (Toddis)",
      "High weather and heat resistance for open gardens"
    ],
  },
  {
    id: "chhatri-gazebo-2",
    code: "RK-PROD-06",
    name: "Heritage Sandstone Garden Gazebo",
    price: 449999,
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.22_d16a22d7.jpg",
    category: "chhatri",
    stoneType: "Dholpur & Red Sandstone",
    dimensions: "10ft Diameter x 14ft Height",
    leadTime: "30-35 Days",
    description: "Palatial open-air stone seating pavilion for luxury farmhouses and courtyard gardens, providing natural shading and majestic royalty.",
    features: [
      "Carved stone railing (Jali balustrade)",
      "Integrated stone seating bench (Asana)",
      "Pan-India on-site assembly by master masons"
    ],
  },
  {
    id: "chhatri-memorial-3",
    code: "RK-PROD-07",
    name: "Traditional Memorial Stone Chhatri with Finial",
    price: 325000,
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.24_b7721eb3.jpg",
    category: "chhatri",
    stoneType: "Dholpur Pink Sandstone",
    dimensions: "8ft Diameter x 12ft Height",
    leadTime: "25-30 Days",
    description: "4-pillar classical heritage canopy crafted with authentic Rajputana stone architectural details.",
    features: [
      "Deep bas-relief carved ceiling medallion",
      "Solid one-piece pillar bases",
      "Weather-sealed protective coating"
    ],
  },

  // 3. Gwalior Stone Craft
  {
    id: "gwalior-jali-1",
    code: "RK-PROD-08",
    name: "Gwalior White Mint Stone 3D CNC Screen",
    price: 34999,
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.00_d29799fe.jpg",
    category: "gwalior-stone",
    stoneType: "Gwalior White Mint Stone",
    dimensions: "6ft Height x 4ft Width x 35mm Thickness",
    leadTime: "10-14 Days",
    description: "Ultra-fine CNC milled Gwalior mint stone screen with high tensile density. Ideal for exterior ventilation, balcony facades, and privacy lattices.",
    features: [
      "Zero-chipping high density natural quartzitic matrix",
      "Sub-millimeter CNC lattice accuracy",
      "Pre-drilled stainless steel SS-304 dry-cladding points"
    ],
  },
  {
    id: "gwalior-panel-2",
    code: "RK-PROD-09",
    name: "Gwalior Stone Hand-Carved Floral Wall Panel",
    price: 42000,
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
    category: "gwalior-stone",
    stoneType: "Gwalior Mint Stone",
    dimensions: "5ft Height x 3ft Width x 50mm",
    leadTime: "12-16 Days",
    description: "Deep relief decorative floral and paisley stone panel for drawing room feature walls, entrance foyers, and villa facades.",
    features: [
      "Deep 3D hand-chiseled bas-relief",
      "Satin honed velvety tactile surface",
      "Custom motif reproduction from CAD/sketches"
    ],
  },

  // 4. Heritage Haveli Craft & Jharokhas
  {
    id: "haveli-jharokha-1",
    code: "RK-PROD-10",
    name: "Royal Rajasthani Carved Stone Jharokha",
    price: 85000,
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg",
    category: "heritage-haveli",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "5ft Height x 4ft Width x 2ft Projection",
    leadTime: "18-22 Days",
    description: "Traditional carved Rajasthani jharokha with peacock brackets, arched balustrades, and stone sunshades.",
    features: [
      "Cantilever mechanical anchoring for exterior walls",
      "Deep hand-chiseled Rajputana motifs",
      "Adds iconic heritage grandeur to modern building elevations"
    ],
  },
  {
    id: "haveli-column-2",
    code: "RK-PROD-11",
    name: "Dholpur Stone Fluted Haveli Pillar (Pair)",
    price: 48000,
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_4f57584b.jpg",
    category: "heritage-haveli",
    stoneType: "Royal Dholpur Teak Sandstone",
    dimensions: "9ft Height x 14in Base Diameter",
    leadTime: "15-20 Days",
    description: "Turned and hand-chiseled structural load-bearing sandstone columns with classical tiered bases and ornate capitals.",
    features: [
      "Fluted shaft with organic teakwood grain",
      "Load-bearing structural capacity",
      "Pairs seamlessly with stone arches and porticos"
    ],
  },
  {
    id: "haveli-arch-3",
    code: "RK-PROD-12",
    name: "Heritage Palatial Entrance Archway",
    price: 125000,
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.11_bdce4b58.jpg",
    category: "heritage-haveli",
    stoneType: "Dholpur Beige & Pink Stone",
    dimensions: "10ft Span x 12ft Height",
    leadTime: "20-25 Days",
    description: "Ornate multi-foil stone arch for grand entryways, porticos, and courtyard verandahs.",
    features: [
      "Modular interlocking keystone design",
      "Fine relief acanthus and floral carvings",
      "Engineered for heavy masonry spans"
    ],
  },

  // 5. 3D CNC Stone Jalis & Wall Panels
  {
    id: "wall-panel-cnc-1",
    code: "RK-PROD-13",
    name: "Parametric 3D CNC Sandstone Facade Screen",
    price: 26000,
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    category: "wall-panel",
    stoneType: "Dholpur Teakwood Sandstone",
    dimensions: "6ft Height x 3ft Width x 35mm",
    leadTime: "7-10 Days",
    description: "Modern architectural CNC sandstone screen designed for daylight diffusion, thermal cooling, and privacy.",
    features: [
      "Precision 5-axis computerized milling",
      "High natural thermal insulation",
      "Suitable for double-height architectural elevations"
    ],
  },
  {
    id: "wall-panel-lattice-2",
    code: "RK-PROD-14",
    name: "Traditional Floral Lattice Jali Screen",
    price: 29500,
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_2a71e700.jpg",
    category: "wall-panel",
    stoneType: "Gwalior White Mint",
    dimensions: "5ft Height x 3ft Width x 30mm",
    leadTime: "8-12 Days",
    description: "Mughal and Rajasthani inspired pierced lattice screen (jali) hand-dressed after CNC cutting.",
    features: [
      "Subtle shadow-play interplay",
      "Weatherproof natural stone density",
      "Pre-squared edges for seamless tile-matching"
    ],
  },

  // 6. Courtyard Water Fountains
  {
    id: "fountain-tier-1",
    code: "RK-PROD-15",
    name: "Royal 3-Tier Cascading Stone Water Fountain",
    price: 299999,
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    category: "garden-fountain",
    stoneType: "Dholpur & Jodhpur Sandstone",
    dimensions: "10ft Basin Diameter x 8ft Total Height",
    leadTime: "25-35 Days",
    description: "Large 3-tier sandstone fountain with hand-carved lion water spouts and fluted bowls.",
    features: [
      "Includes concealed Italian submersible pump plumbing channels",
      "Hydrostatic water-repellent sealing treatment",
      "Turned from monolithic stone drums for zero leakages"
    ],
  },
  {
    id: "fountain-lotus-2",
    code: "RK-PROD-16",
    name: "Hand-Carved Lotus Basin Garden Fountain",
    price: 185000,
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_bf455c63.jpg",
    category: "garden-fountain",
    stoneType: "Gwalior Mint Stone",
    dimensions: "6ft Basin Diameter x 5ft Height",
    leadTime: "20-25 Days",
    description: "Single-tier sculpted lotus petal fountain basin with center bubbling urn, ideal for villa central courtyards and terraces.",
    features: [
      "Natural stone non-slip textured rim",
      "Low maintenance recirculation system",
      "Rust and algae-resistant stone coating"
    ],
  },

  // 7. Monumental Gates & Torans
  {
    id: "gate-toran-1",
    code: "RK-PROD-17",
    name: "Grand Stone Entrance Gate (Toran)",
    price: 550000,
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    category: "gate",
    stoneType: "Jodhpur Red & Dholpur Sandstone",
    dimensions: "24ft Span Width x 18ft Clearance Height",
    leadTime: "40-60 Days",
    description: "Majestic fortress-style carved entrance gateway with twin structural pillars, carved brackets, and decorative stone beam.",
    features: [
      "Massive monolithic load-bearing columns",
      "Deep relief auspicious motifs (Gajraj, Kalash, Toran)",
      "Pan-India on-site crane and artisan installation"
    ],
  },

  // 8. Animal Sculptures
  {
    id: "animals-elephant-1",
    code: "RK-PROD-18",
    name: "Hand-Carved Royal Stone Elephant Pair (Gajraj)",
    price: 195000,
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
    category: "animals",
    stoneType: "Dholpur Heritage Sandstone",
    dimensions: "4ft Height x 5ft Length each (Pair of 2)",
    leadTime: "20-25 Days",
    description: "Pair of welcoming royal stone elephants with raised trunks (Gajraj) holding lotus flowers, carved from single stone blocks.",
    features: [
      "Auspicious Vastu placement for palace gates and villas",
      "Finely detailed howdah saddle and jewelry carvings",
      "Heavy monolithic anti-theft base"
    ],
  },
  {
    id: "animals-lion-2",
    code: "RK-PROD-19",
    name: "Imperial Rajputana Stone Lion Guard Pair",
    price: 220000,
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.02_5e13a207.jpg",
    category: "animals",
    stoneType: "Jodhpur Imperial Sandstone",
    dimensions: "4.5ft Height x 3.5ft Length (Pair of 2)",
    leadTime: "25-30 Days",
    description: "Majestic seated stone lions carved with dramatic manes and muscular contours, representing royal power and protection.",
    features: [
      "Classical Mehrangarh fort architectural lineage",
      "Carved from weather-immune dense sandstone",
      "Polished paw and facial expressions"
    ],
  },

  // 9. Red Sand Stone & Jodhpur Stone
  {
    id: "red-stone-carved-1",
    code: "RK-PROD-20",
    name: "Bansi Paharpur Red Stone Carved Wall Relief",
    price: 45000,
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
    category: "red-stone",
    stoneType: "Bansi Paharpur Red Stone",
    dimensions: "4ft x 4ft x 40mm",
    leadTime: "12-15 Days",
    description: "Deep bas-relief carved red sandstone tile for boundary wall accents and temple facades.",
    features: [
      "Natural red stone coloration with zero synthetic dye",
      "Immune to moisture staining and moss growth",
      "Hand-chiseled antique dressed edge"
    ],
  },
  {
    id: "jodhpur-stone-pillar-1",
    code: "RK-PROD-21",
    name: "Jodhpur Desert Red Sandstone Pillar",
    price: 55000,
    image: "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
    category: "jodhpur-stone",
    stoneType: "Jodhpur Imperial Red Sandstone",
    dimensions: "10ft Height x 16in Diameter",
    leadTime: "15-20 Days",
    description: "High density iron-oxide cemented quartz sandstone pillar, celebrated for resisting harsh desert winds and heat.",
    features: [
      "Deep fluting with traditional leaf rings",
      "Exceptional structural compression resistance",
      "Authentic Marwar architectural character"
    ],
  },

  // 10. Garden Ornaments
  {
    id: "garden-urn-1",
    code: "RK-PROD-22",
    name: "Handcrafted Stone Courtyard Planter Urn",
    price: 18500,
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg",
    category: "garden-ornaments",
    stoneType: "Dholpur Beige Stone",
    dimensions: "3ft Height x 2ft Top Rim Diameter",
    leadTime: "7-10 Days",
    description: "Turned stone garden urn with classical fluted bowl and pedestal base for terraces, entrance steps, and pool decks.",
    features: [
      "Drilled drainage hole with root-safe interior finish",
      "Heavy wind-resistant base",
      "Frost and freeze-thaw resistant natural stone"
    ],
  },
];

export const getProductCode = (product?: Product | null, fallbackIndex?: number): string => {
  if (!product) return "RK-PROD-01";
  if (product.code) return product.code;
  const match = products.findIndex(p => p.id === product.id || p._id === product._id);
  const idx = match >= 0 ? match + 1 : (fallbackIndex !== undefined ? fallbackIndex + 1 : 1);
  return `RK-PROD-${String(idx).padStart(2, "0")}`;
};

export const categories: Category[] = [
  { id: 'stone-temple', name: 'Stone Temple & Mandirs', image: '/products/Stone%20Temple/3.jpg', description: 'Sacred handcrafted Vedic mandirs in Makrana marble & sandstone' },
  { id: 'chhatri', name: 'Royal Stone Chhatris', image: '/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg', description: 'Traditional dome pavilions and garden gazebos' },
  { id: 'gwalior-stone', name: 'Gwalior Stone Craft', image: '/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.00_d29799fe.jpg', description: 'Precision CNC screens and wall panels in Gwalior mint stone' },
  { id: 'heritage-haveli', name: 'Heritage Haveli & Jharokhas', image: '/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg', description: 'Carved pillars, arches, brackets and royal balconies' },
  { id: 'wall-panel', name: '3D CNC Stone Jalis', image: '/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg', description: 'Architectural ventilation screens and facade cladding' },
  { id: 'garden-fountain', name: 'Courtyard Water Fountains', image: '/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg', description: 'Multi-tiered cascading fountains and lotus basins' },
  { id: 'gate', name: 'Entrance Torans & Gates', image: '/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg', description: 'Carved stone entrance gates and pillars' },
  { id: 'animals', name: 'Animal Sculptures', image: '/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg', description: 'Monolithic carved stone elephants, lions and deities' },
  { id: 'red-stone', name: 'Red Sand Stone', image: '/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg', description: 'Bansi Paharpur and Rajasthan red sandstone carvings' },
  { id: 'jodhpur-stone', name: 'Jodhpur Stone', image: '/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg', description: 'Heavy desert sandstone pillars, gates and cornices' },
  { id: 'garden-ornaments', name: 'Garden Ornaments & Urns', image: '/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg', description: 'Stone courtyard planters, pedestals and lamps' },
];
