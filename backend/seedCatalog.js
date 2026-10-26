require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: { type: String, default: '' },
  code: { type: String, default: '' },
  price: { type: Number, required: true },
  priceUnit: { type: String, default: 'piece' },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  stoneType: { type: String, default: '' },
  description: { type: String, default: '' },
  descriptionHi: { type: String, default: '' },
  features: { type: [String], default: [] },
  dimensions: { type: String, default: '' },
  leadTime: { type: String, default: '20-25 Days' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const MASTER_PRODUCTS = [
  // 1. Sandstone Temple
  {
    code: "RK-PROD-01",
    name: "Pure Makrana White Marble Vedic Mandir",
    nameHi: "मकराना शुद्ध सफेद संगमरमर वैदिक मंदिर",
    price: 349999,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/3.jpg",
    category: "sandstone-temple",
    stoneType: "Makrana Pure White Marble",
    dimensions: "7ft Height x 5ft Width x 3ft Depth (Customizable)",
    leadTime: "25-30 Days",
    description: "Handcrafted consecrated Vedic mandir carved from pristine Makrana white marble. Features hand-carved shikhara with kalash, fluted mandapam pillars, and zero-yellowing calcitic durability.",
    descriptionHi: "शुद्ध मकराना संगमरमर से तराशा गया भव्य वैदिक मंदिर। इसमें नक्काशीदार शिखर, कलश, खंभे और स्थायी चमक की गारंटी शामिल है।",
    features: [
      "100% Genuine Makrana 98%+ Calcite Marble",
      "Hand-chiseled celestial motifs adhering to Shilpa Shastra",
      "Concealed wiring channels for sanctum lighting",
      "Custom sizes available for villas and pooja rooms"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-02",
    name: "Bansi Paharpur Pink Sandstone Temple",
    nameHi: "बंसी पहाड़पुर गुलाबी सैंडस्टोन मंदिर",
    price: 489999,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/2.jpg",
    category: "sandstone-temple",
    stoneType: "Bansi Paharpur Pink Sandstone",
    dimensions: "9ft Height x 6ft Width x 4ft Depth (Customizable)",
    leadTime: "30-45 Days",
    description: "Ayodhya Ram Mandir grade Bansi Paharpur pink sandstone sacred mandir. Built with heavy monolithic stone shikhara, carved toran arches, and 500+ years weather endurance.",
    descriptionHi: "अयोध्या राम मंदिर में प्रयुक्त बंसी पहाड़पुर गुलाबी पत्थर से निर्मित भव्य मंदिर। सदियों तक टिकने वाली मजबूती और नक्काशी।",
    features: [
      "Certified Bansi Paharpur quarry stone",
      "Interlocking stone tongue-and-groove jointing",
      "Rich terracotta pink hue that gains character with age",
      "Suitable for outdoor garden temples or prayer halls"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-03",
    name: "Carved Sandstone Sanctum Home Mandir",
    nameHi: "नक्काशीदार गर्भगृह होम मंदिर",
    price: 275000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/1.jpg",
    category: "sandstone-temple",
    stoneType: "Dholpur & Makrana Composite",
    dimensions: "6ft Height x 4.5ft Width x 2.5ft Depth",
    leadTime: "20-25 Days",
    description: "Compact temple featuring carved garbhagriha, peacocks, bell carvings, and pull-out marble prasad tray.",
    descriptionHi: "घरों और विला के लिए उपयुक्त नक्काशीदार मंदिर जिसमें मोर आकृति, घंटियां और प्रसाद ट्रे शामिल है।",
    features: [
      "Traditional Sompura guild craftsmanship",
      "Hand-polished stain-resistant surface finish",
      "Foam-padded timber crating for zero transit shock"
    ],
    isActive: true,
    isFeatured: false
  },
  {
    code: "RK-PROD-04",
    name: "Grand Public Trust Temple Mandapam & Shikhara",
    nameHi: "भव्य सार्वजनिक ट्रस्ट मंदिर मंडप व शिखर",
    price: 650000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/4.jpg",
    category: "sandstone-temple",
    stoneType: "Bansi Paharpur & Dholpur Stone",
    dimensions: "15ft Height x 12ft Width (Turnkey Project)",
    leadTime: "60-90 Days",
    description: "Architectural public trust temple structure with multiple carved pillars, circumambulatory pathway, and high-relief deity panels.",
    descriptionHi: "सार्वजनिक ट्रस्ट और धार्मिक स्थलों के लिए पूर्ण टर्नकी मंदिर निर्माण, खंभे, शिखर व प्रदक्षिणा पथ सहित।",
    features: [
      "Structural dead-load engineering support",
      "Full on-site turnkey erection across India",
      "Vedic Vastu-compliant geometric proportions"
    ],
    isActive: true,
    isFeatured: false
  },

  // 2. Sandstone Temple Entry Gate
  {
    code: "RK-PROD-05",
    name: "Monumental Sandstone Temple Entry Gate (Toran)",
    nameHi: "भव्य नक्काशीदार मंदिर प्रवेश तोरण द्वार",
    price: 550000,
    priceUnit: "piece",
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    category: "sandstone-temple-entry-gate",
    stoneType: "Jodhpur Red & Dholpur Sandstone",
    dimensions: "24ft Span Width x 18ft Clearance Height",
    leadTime: "40-60 Days",
    description: "Majestic fortress-style carved entrance gateway with twin structural pillars, carved brackets, and decorative stone beam.",
    descriptionHi: "कॉलोनी, आश्रम, विला या मंदिर के मुख्य द्वार के लिए विशालकाय नक्काशीदार पत्थर का तोरण द्वार।",
    features: [
      "Massive monolithic load-bearing columns",
      "Deep relief auspicious motifs (Gajraj, Kalash, Toran)",
      "Pan-India on-site crane and artisan installation"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-06",
    name: "Carved Red Sandstone Temple Entry Gate",
    nameHi: "नक्काशीदार लाल पत्थर मंदिर प्रवेश द्वार",
    price: 480000,
    priceUnit: "piece",
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.26_a9c02ff4.jpg",
    category: "sandstone-temple-entry-gate",
    stoneType: "Jodhpur Imperial Red Sandstone",
    dimensions: "20ft Width x 16ft Height",
    leadTime: "30-45 Days",
    description: "Heritage temple gate carved in deep Jodhpur red stone with auspicious kalash and gajraj arches.",
    descriptionHi: "गहरे लाल जोधपुर पत्थर में नक्काशीदार मंदिर प्रवेश द्वार, मंगल कलश व गजराज मेहराब सहित।",
    features: [
      "Weather-immune dense sandstone",
      "Interlocking mortise-tenon stone joints",
      "Heavy duty foundation anchors"
    ],
    isActive: true,
    isFeatured: false
  },
  {
    code: "RK-PROD-07",
    name: "Carved White Sandstone Temple Entry Gate",
    nameHi: "नक्काशीदार सफेद सैंडस्टोन मंदिर द्वार",
    price: 520000,
    priceUnit: "piece",
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.27_6cfd0d50.jpg",
    category: "sandstone-temple-entry-gate",
    stoneType: "Dholpur White Sandstone",
    dimensions: "18ft Span x 15ft Height",
    leadTime: "30-40 Days",
    description: "Classical white sandstone entrance gateway with fluted side pillars, peacock brackets, and ornate carved architraves.",
    descriptionHi: "सफेद सैंडस्टोन में सुंदर मोर ब्रैकेट और पिलर्स के साथ निर्मित भव्य मंदिर प्रवेश द्वार।",
    features: [
      "Fine Dholpur white stone texture",
      "Intricate hand carved floral friezes",
      "Complete assembly instructions & on-site fitting"
    ],
    isActive: true,
    isFeatured: false
  },

  // 3. Dholpur Sandstone Temple
  {
    code: "RK-PROD-08",
    name: "Hand Carved Dholpur Sandstone Temple",
    nameHi: "हाथ से तराशा धौलपुर सैंडस्टोन मंदिर",
    price: 399999,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/1.jpg",
    category: "dholpur-sandstone-temple",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "8ft Height x 5.5ft Width x 3.5ft Depth",
    leadTime: "25-30 Days",
    description: "Authentic Dholpur sandstone mandir crafted with carved columns, sanctum dome, and traditional bells.",
    descriptionHi: "धौलपुर सैंडस्टोन से निर्मित भव्य मंदिर जिसमें नक्काशीदार खंभे, गर्भगृह और गुंबद शामिल हैं।",
    features: [
      "Finest quarry-selected Dholpur stone",
      "Anti-stain stone protective coating",
      "Vedic Vastu proportions"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-09",
    name: "Dholpur White Sandstone Mandir with Shikhara",
    nameHi: "धौलपुर व्हाइट सैंडस्टोन मंदिर शिखर सहित",
    price: 360000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/3.jpg",
    category: "dholpur-sandstone-temple",
    stoneType: "Dholpur White Sandstone",
    dimensions: "7.5ft Height x 5ft Width x 3ft Depth",
    leadTime: "20-25 Days",
    description: "Pristine white Dholpur stone temple with hand chiseled floral borders and sanctum steps.",
    descriptionHi: "सफेद धौलपुर पत्थर से तैयार किया गया आकर्षक होम मंदिर।",
    features: [
      "Natural stone with velvet matte finish",
      "Easy dry-dust maintenance",
      "Auspicious Om and Swastika carvings"
    ],
    isActive: true,
    isFeatured: false
  },

  // 4. Sandstone Grill (Jali)
  {
    code: "RK-PROD-10",
    name: "Parametric 3D CNC Sandstone Facade Screen (Grill)",
    nameHi: "पैरामीट्रिक 3D सीएनसी सैंडस्टोन एलिवेशन जाली / ग्रिल",
    price: 480,
    priceUnit: "sq.ft",
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    category: "sandstone-grill",
    stoneType: "Dholpur Teakwood Sandstone",
    dimensions: "6ft Height x 3ft Width x 35mm",
    leadTime: "7-10 Days",
    description: "Modern architectural CNC sandstone screen designed for daylight diffusion, thermal cooling, and privacy.",
    descriptionHi: "आधुनिक वास्तुकला के अनुकूल 3D वेव जाली जो सीधी धूप कम करती है और हवादार बनाती है।",
    features: [
      "Precision 5-axis computerized milling",
      "High natural thermal insulation",
      "Suitable for double-height architectural elevations"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-11",
    name: "Traditional Floral Lattice Sandstone Grill",
    nameHi: "पारंपरिक फ्लोरल नक्काशीदार सैंडस्टोन जाली",
    price: 420,
    priceUnit: "sq.ft",
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_2a71e700.jpg",
    category: "sandstone-grill",
    stoneType: "Gwalior White Mint",
    dimensions: "5ft Height x 3ft Width x 30mm",
    leadTime: "8-12 Days",
    description: "Mughal and Rajasthani inspired pierced lattice screen (jali) hand-dressed after CNC cutting.",
    descriptionHi: "पारंपरिक मुगल व राजस्थानी ज्यामितीय नक्काशीदार जाली, दीवार व बालकनी के लिए।",
    features: [
      "Subtle shadow-play interplay",
      "Weatherproof natural stone density",
      "Pre-squared edges for seamless tile-matching"
    ],
    isActive: true,
    isFeatured: false
  },

  // 5. Sandstone Lamp
  {
    code: "RK-PROD-12",
    name: "Handcrafted Sandstone Garden Lamp (Lantern)",
    nameHi: "हस्तनिर्मित सैंडस्टोन गार्डन लैंप (लालटेन)",
    price: 14500,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_37a17d6c.jpg",
    category: "sandstone-lamp",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "3ft Height x 14in Base",
    leadTime: "7-10 Days",
    description: "Turned and carved stone garden lamp with pierced ventilation windows for soft ambient LED lighting in walkways and lawns.",
    descriptionHi: "बगीचे, वॉकवे और पोर्च के लिए नक्काशीदार सैंडस्टोन गार्डन लैंप जिसमें आंतरिक लाइटिंग व्यवस्था है।",
    features: [
      "Concealed internal electrical wire conduit",
      "Removable top canopy for bulb replacement",
      "Heavy stable base resisting strong winds"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-13",
    name: "Carved Sandstone Pillar Lamp (Deepstambh)",
    nameHi: "नक्काशीदार सैंडस्टोन दीपस्तंभ लैंप",
    price: 28000,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.25_5da9f974.jpg",
    category: "sandstone-lamp",
    stoneType: "Dholpur & Jodhpur Sandstone",
    dimensions: "5ft Height x 16in Base",
    leadTime: "10-14 Days",
    description: "Monumental Vedic deepstambh pillar lamp with carved oil diya tiers and stone finial.",
    descriptionHi: "मंदिर प्रांगण और मुख्य द्वार हेतु पारंपरिक सैंडस्टोन दीपस्तंभ लैंप।",
    features: [
      "Authentic Vedic temple architecture",
      "Hand-chiseled tiered brackets",
      "Suitable for real oil lamps or electric fixtures"
    ],
    isActive: true,
    isFeatured: false
  },

  // 6. Sandstone Gazebo
  {
    code: "RK-PROD-14",
    name: "Royal 8-Pillar Sandstone Gazebo (Chhatri)",
    nameHi: "शाही 8 खंभा सैंडस्टोन गज़ेबो / छतरी",
    price: 399999,
    priceUnit: "piece",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    category: "sandstone-gazebo",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "12ft Diameter x 16ft Height",
    leadTime: "30-40 Days",
    description: "Monumental Rajasthani royal stone chhatri with 8 fluted monolithic pillars, carved kalash finial, and cantilevered sunshade chajjas.",
    descriptionHi: "पारंपरिक राजस्थानी 8 खंभों वाली नक्काशीदार छतरी, गुंबद और कंगूरे सहित। फार्महाउस और बगीचों के लिए उत्तम।",
    features: [
      "Interlocking self-supporting dome craft",
      "Hand-carved floral capital brackets (Toddis)",
      "High weather and heat resistance for open gardens"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-15",
    name: "Heritage Sandstone Garden Gazebo Pavilion",
    nameHi: "हेरिटेज सैंडस्टोन गार्डन गज़ेबो पवेलियन",
    price: 449999,
    priceUnit: "piece",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.22_d16a22d7.jpg",
    category: "sandstone-gazebo",
    stoneType: "Dholpur & Red Sandstone",
    dimensions: "10ft Diameter x 14ft Height",
    leadTime: "30-35 Days",
    description: "Palatial open-air stone seating pavilion for luxury farmhouses and courtyard gardens, providing natural shading and majestic royalty.",
    descriptionHi: "विला और बगीचे में बैठने के लिए सुंदर खुला पत्थर का पवेलियन और जालीदार रेलिंग।",
    features: [
      "Carved stone railing (Jali balustrade)",
      "Integrated stone seating bench (Asana)",
      "Pan-India on-site assembly by master masons"
    ],
    isActive: true,
    isFeatured: false
  },

  // 7. Sandstone Fountains
  {
    code: "RK-PROD-16",
    name: "Palatial 3-Tier Cascading Sandstone Fountain",
    nameHi: "शाही 3-मंजिला सैंडस्टोन वाटर फाउंटेन",
    price: 299999,
    priceUnit: "piece",
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    category: "sandstone-fountains",
    stoneType: "Dholpur & Jodhpur Sandstone",
    dimensions: "10ft Basin Diameter x 8ft Total Height",
    leadTime: "25-35 Days",
    description: "Monumental tiered sandstone fountain with hand-carved lion water spouts, fluted overflow bowls, and soothing acoustic resonance.",
    descriptionHi: "हाथ से तराशा गया 3 मंजिला प्राकृतिक पत्थर का फव्वारा जिसमें शेर मुख जल निकास और बड़ा कुंड शामिल है।",
    features: [
      "Includes concealed Italian submersible pump plumbing channels",
      "Hydrostatic water-repellent sealing treatment",
      "Turned from monolithic stone drums for zero leakages"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-17",
    name: "Hand-Carved Lotus Basin Sandstone Fountain",
    nameHi: "हस्तनिर्मित कमल कुंड सैंडस्टोन फाउंटेन",
    price: 185000,
    priceUnit: "piece",
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_bf455c63.jpg",
    category: "sandstone-fountains",
    stoneType: "Gwalior Mint Stone",
    dimensions: "6ft Basin Diameter x 5ft Height",
    leadTime: "20-25 Days",
    description: "Single-tier sculpted lotus petal fountain basin with center bubbling urn, ideal for villa central courtyards and terraces.",
    descriptionHi: "कमल की पंखुड़ियों से बना शांत और सुंदर गार्डन फव्वारा, विला आंगन के लिए बेहतरीन।",
    features: [
      "Natural stone non-slip textured rim",
      "Low maintenance recirculation system",
      "Rust and algae-resistant stone coating"
    ],
    isActive: true,
    isFeatured: false
  },

  // 8. Sandstone Garden Bench
  {
    code: "RK-PROD-18",
    name: "Classical Carved Sandstone Garden Bench",
    nameHi: "क्लासिकल नक्काशीदार सैंडस्टोन गार्डन बेंच",
    price: 38000,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_bb5957bd.jpg",
    category: "sandstone-garden-bench",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "5ft Length x 20in Depth x 32in Back Height",
    leadTime: "10-15 Days",
    description: "Handcrafted natural stone bench with carved lion legs and floral backrest, enduring generations outdoors without fading.",
    descriptionHi: "धूप व बारिश में हमेशा सुरक्षित रहने वाली नक्काशीदार पत्थर की सुंदर गार्डन बेंच।",
    features: [
      "Carved monolithic armrests and lion feet",
      "Zero paint or polish requirement (100% natural stone)",
      "High comfort ergonomic slope"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-19",
    name: "Curved Heritage Sandstone Park Bench",
    nameHi: "शाही घुमावदार सैंडस्टोन सिटिंग बेंच",
    price: 45000,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.25_5da9f974.jpg",
    category: "sandstone-garden-bench",
    stoneType: "Jodhpur Red Sandstone",
    dimensions: "6ft Arc Length x 22in Depth",
    leadTime: "12-16 Days",
    description: "Curved radial stone bench ideal for circular fire pits, tree surrounds, and formal garden courtyards.",
    descriptionHi: "वृत्ताकार बगीचों और अलाव स्थलों के लिए आकर्षक घुमावदार पत्थर की बेंच।",
    features: [
      "Heavy monolithic load bearing capacity",
      "Smooth honed seating surface",
      "Weather-immune stone density"
    ],
    isActive: true,
    isFeatured: false
  },

  // 9. Sandstone Planter
  {
    code: "RK-PROD-20",
    name: "Handcrafted Stone Courtyard Planter Urn",
    nameHi: "हस्तनिर्मित सैंडस्टोन आंगन गमला / कलश",
    price: 18500,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg",
    category: "sandstone-planter",
    stoneType: "Dholpur Beige Stone",
    dimensions: "3ft Height x 2ft Top Rim Diameter",
    leadTime: "7-10 Days",
    description: "Turned stone garden urn with classical fluted bowl and pedestal base for terraces, entrance steps, and pool decks.",
    descriptionHi: "टेरेस, पोर्च और बगीचे के लिए शास्त्रीय नक्काशीदार पत्थर का गमला कलश।",
    features: [
      "Drilled drainage hole with root-safe interior finish",
      "Heavy wind-resistant base",
      "Frost and freeze-thaw resistant natural stone"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-21",
    name: "Fluted Sandstone Pedestal Planter Urn Pair",
    nameHi: "नक्काशीदार सैंडस्टोन गमला कलश (जोड़ी)",
    price: 34000,
    priceUnit: "pair",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_925bcf0c.jpg",
    category: "sandstone-planter",
    stoneType: "Dholpur White Sandstone",
    dimensions: "2.5ft Height x 18in Diameter (Pair of 2)",
    leadTime: "8-12 Days",
    description: "Pair of matching classical stone urn planters with relief acanthus leaves for front door welcoming.",
    descriptionHi: "मुख्य द्वार के दोनों ओर रखने के लिए नक्काशीदार सफेद सैंडस्टोन गमलों की खूबसूरत जोड़ी।",
    features: [
      "Hand-turned symmetrical bowls",
      "Root aeration natural stone porosity",
      "Anti-topple stable weight"
    ],
    isActive: true,
    isFeatured: false
  },

  // 10. Sandstone Ball Sphere
  {
    code: "RK-PROD-22",
    name: "Decorative Turned Sandstone Ball Sphere",
    nameHi: "सजावटी नक्काशीदार सैंडस्टोन बॉल स्फेयर",
    price: 8500,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_0d900ff3.jpg",
    category: "sandstone-ball-sphere",
    stoneType: "Dholpur Teakwood Sandstone",
    dimensions: "16in Diameter (Spherical)",
    leadTime: "5-7 Days",
    description: "Precision-turned solid natural sandstone sphere with organic rainbow striations for garden walkways and gate piers.",
    descriptionHi: "गेट पिलर्स और बगीचे की सुंदरता बढ़ाने के लिए शुद्ध प्राकृतिक सैंडस्टोन बॉल।",
    features: [
      "100% Solid monolithic stone turning",
      "Organic teakwood natural grain",
      "Flat mounting base with anchor hole"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-23",
    name: "Carved Sandstone Pillar Finial Ball Pair",
    nameHi: "खंभों के लिए नक्काशीदार सैंडस्टोन कंगूरा बॉल (जोड़ी)",
    price: 15000,
    priceUnit: "pair",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.24_d267235a.jpg",
    category: "sandstone-ball-sphere",
    stoneType: "Red & Beige Sandstone",
    dimensions: "14in Diameter with 12in Base (Pair of 2)",
    leadTime: "6-8 Days",
    description: "Pair of ornate stone sphere finials with lotus bases for main gates and boundary pillars.",
    descriptionHi: "मुख्य गेट और बाउंड्री पिलर्स के ऊपर लगाने के लिए कमल बेस वाली पत्थर की बॉल जोड़ी।",
    features: [
      "Carved lotus petal collar",
      "Easy mounting with structural rod",
      "Weather-immune stone density"
    ],
    isActive: true,
    isFeatured: false
  },

  // 11. Sandstone Elephant Statue
  {
    code: "RK-PROD-24",
    name: "Monolithic Hand-Carved Royal Stone Elephant Pair",
    nameHi: "शाही अखंड नक्काशीदार पत्थर के हाथी (जोड़ा)",
    price: 195000,
    priceUnit: "pair",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
    category: "sandstone-elephant-statue",
    stoneType: "Dholpur Heritage Sandstone",
    dimensions: "4ft Height x 5ft Length each (Pair of 2)",
    leadTime: "20-25 Days",
    description: "Pair of monumental welcoming royal elephants with raised trunks (Gajraj) holding lotus flowers, carved from single stone blocks.",
    descriptionHi: "एक ही पत्थर से तराशे गए गजराज हाथियों की शुभ जोड़ी, मुख्य द्वार और आंगन के स्वागत के लिए।",
    features: [
      "Auspicious Vastu placement for palace gates and villas",
      "Finely detailed howdah saddle and jewelry carvings",
      "Heavy monolithic anti-theft base"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-25",
    name: "Welcoming Sandstone Gajraj Statue with Raised Trunk",
    nameHi: "सैंडस्टोन स्वागत गजराज मूर्ति (सूंड़ ऊपर)",
    price: 110000,
    priceUnit: "piece",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_4dc3c1da.jpg",
    category: "sandstone-elephant-statue",
    stoneType: "Jodhpur Sandstone",
    dimensions: "4.5ft Height x 5ft Length",
    leadTime: "15-20 Days",
    description: "Single large welcoming stone elephant holding bell and garland, carved with royal Rajputana ornaments.",
    descriptionHi: "राजपूताना नक्काशी और घंटी के साथ भव्य अकेला गजराज पत्थर हाथी।",
    features: [
      "Deeply chiseled tusks and saddle drape",
      "High compression strength sandstone",
      "Vastu-harmonious posture"
    ],
    isActive: true,
    isFeatured: false
  },

  // 12. Sandstone God Statue
  {
    code: "RK-PROD-26",
    name: "Handcrafted Sandstone Lord Ganesha Statue",
    nameHi: "हस्तनिर्मित सैंडस्टोन भगवान गणेश मूर्ति",
    price: 75000,
    priceUnit: "piece",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.03_9fa8d27a.jpg",
    category: "sandstone-god-statue",
    stoneType: "Dholpur Pink & Beige Sandstone",
    dimensions: "3.5ft Height x 2.5ft Width x 18in Depth",
    leadTime: "15-20 Days",
    description: "Consecrated seated Ganesha idol chiseled from natural stone with modak, trunk to the left, and blessing mudra.",
    descriptionHi: "प्राकृतिक सैंडस्टोन से तराशी गई मंगलकारी भगवान श्री गणेश की भव्य मूर्ति।",
    features: [
      "Carved strictly according to Shilpa Shastra",
      "Hand-polished facial features with serene expression",
      "Suitable for outdoor garden niche or pooja room"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-27",
    name: "Carved Sandstone Shivling & Nandi Shrine",
    nameHi: "नक्काशीदार सैंडस्टोन शिवलिंग व नंदी धाम",
    price: 85000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/1.jpg",
    category: "sandstone-god-statue",
    stoneType: "Bansi Paharpur & Dholpur Stone",
    dimensions: "3ft Height with 4ft Jaladhari",
    leadTime: "15-20 Days",
    description: "Sacred stone Shivling with carved serpent canopy, jaladhari, and seated Nandi devotee statue.",
    descriptionHi: "पवित्र शिवलिंग, जलाधारी और नंदी महाराज की संपूर्ण पत्थर नक्काशीदार प्रतिमा।",
    features: [
      "Smooth jaladhari for abhishek drainage",
      "Certified sacred natural stone",
      "Permanent polish lasting centuries"
    ],
    isActive: true,
    isFeatured: false
  },

  // 13. Sandstone Wall Mural
  {
    code: "RK-PROD-28",
    name: "Deep Bas-Relief Carved Sandstone Wall Mural",
    nameHi: "उभरी हुई नक्काशीदार सैंडस्टोन वॉल म्यूरल",
    price: 1450,
    priceUnit: "sq.ft",
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
    category: "sandstone-wall-mural",
    stoneType: "Gwalior Mint Stone",
    dimensions: "6ft Height x 4ft Width x 50mm",
    leadTime: "14-20 Days",
    description: "Deep relief decorative floral and heritage stone panel for drawing room feature walls, entrance foyers, and villa facades.",
    descriptionHi: "लिविंग रूम और विला के मुख्य प्रवेश द्वार के लिए उभरी हुई नक्काशीदार पत्थर की पट्टिका।",
    features: [
      "Deep 3D hand-chiseled bas-relief",
      "Satin honed velvety tactile surface",
      "Custom motif reproduction from CAD/sketches"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-29",
    name: "Rajasthani Royal Court Heritage Stone Mural",
    nameHi: "राजस्थानी दरबार हेरिटेज स्टोन म्यूरल",
    price: 85000,
    priceUnit: "piece",
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
    category: "sandstone-wall-mural",
    stoneType: "Bansi Paharpur Red Sandstone",
    dimensions: "5ft x 3.5ft x 45mm",
    leadTime: "15-20 Days",
    description: "Traditional Rajput court procession stone mural with elephants, horses, and royal umbrellas.",
    descriptionHi: "राजपूताना शाही जुलूस और दरबारी भव्यता को दर्शाती अनूठी पत्थर वॉल म्यूरल।",
    features: [
      "Solid natural red sandstone",
      "Zero artificial colors or paints",
      "Framed with carved stone border"
    ],
    isActive: true,
    isFeatured: false
  },

  // 14. Sandstone Angel Garden Statue
  {
    code: "RK-PROD-30",
    name: "Hand-Carved Sandstone Angel Garden Statue",
    nameHi: "हस्तनिर्मित सैंडस्टोन एंजल गार्डन मूर्ति",
    price: 68000,
    priceUnit: "piece",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_e336e10d.jpg",
    category: "sandstone-angel-garden-statue",
    stoneType: "Dholpur White Sandstone",
    dimensions: "4ft Height x 20in Width x 18in Base",
    leadTime: "15-20 Days",
    description: "Artistic winged angel statue sculpted in white Dholpur stone with fine feather detail and peaceful expression for lush gardens.",
    descriptionHi: "बगीचे और वॉटर बॉडी के पास स्थापित करने के लिए सफेद सैंडस्टोन में नक्काशीदार परी (एंजल) मूर्ति।",
    features: [
      "Detailed feathery wings and flowing stone robe",
      "Weather-proof exterior stone durability",
      "Optional water-spouting fountain conversion"
    ],
    isActive: true,
    isFeatured: true
  },

  // 15. Sandstone Mother Child Statue
  {
    code: "RK-PROD-31",
    name: "Artistically Sculpted Sandstone Mother & Child Statue",
    nameHi: "भावपूर्ण नक्काशीदार सैंडस्टोन वात्सल्य / मदर चाइल्ड मूर्ति",
    price: 72000,
    priceUnit: "piece",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.04_52d3a373.jpg",
    category: "sandstone-mother-child-statue",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "4ft Height x 22in Width x 18in Base",
    leadTime: "15-20 Days",
    description: "Heartwarming sculpture depicting eternal maternal love (Vatsalya), carved from dense sandstone with smooth flowing contours.",
    descriptionHi: "मां और बच्चे के अटूट प्रेम और वात्सल्य को दर्शाती अद्वितीय सैंडस्टोन कलाकृति। विला व लॉन के लिए सर्वोत्तम।",
    features: [
      "Emotional realism and graceful figurative posture",
      "Satin stone polish that sheds rainwater",
      "Monolithic stone base"
    ],
    isActive: true,
    isFeatured: true
  },

  // 16. Red Sandstone Ashok Stambh with Pillar
  {
    code: "RK-PROD-32",
    name: "Red Sandstone Ashok Stambh with Pillar (Lion Capital)",
    nameHi: "रेड सैंडस्टोन अशोक स्तंभ चार शेर शीर्ष सहित",
    price: 285000,
    priceUnit: "piece",
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_4437a324.jpg",
    category: "red-sandstone-ashok-stambh",
    stoneType: "Jodhpur & Bansi Paharpur Red Sandstone",
    dimensions: "12ft Height x 22in Shaft Diameter",
    leadTime: "25-35 Days",
    description: "Monumental National Emblem Ashoka Pillar carved from authentic Rajasthan red sandstone. Features the four lions standing back-to-back, Ashoka Chakra, bull, horse, and fluted column.",
    descriptionHi: "भारत के गौरवशाली राष्ट्रीय प्रतीक चार मुखी शेर और चक्र सहित निर्मित विशालकाय लाल पत्थर का अशोक स्तंभ।",
    features: [
      "Exact architectural proportions of the Sarnath capital",
      "Carved from weather-immune high density red sandstone",
      "Ideal for government institutions, universities, memorials, and grand villas"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-33",
    name: "Carved Red Sandstone Architectural Stambh Pillar",
    nameHi: "नक्काशीदार लाल सैंडस्टोन आर्किटेक्चरल स्तंभ खंभा",
    price: 65000,
    priceUnit: "piece",
    image: "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
    category: "red-sandstone-ashok-stambh",
    stoneType: "Jodhpur Desert Red Sandstone",
    dimensions: "10ft Height x 16in Base Diameter",
    leadTime: "15-20 Days",
    description: "Structural load-bearing red sandstone pillar with classical rings, lotus capital, and pedestal base.",
    descriptionHi: "मजबूत लोड-बेयरिंग लाल सैंडस्टोन खंभा, मुख्य द्वारों व बरामदों के लिए।",
    features: [
      "Solid one-piece stone turning",
      "High compression bearing rating",
      "Traditional Marwar craftsmanship"
    ],
    isActive: true,
    isFeatured: false
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    let inserted = 0;
    let updated = 0;

    for (const item of MASTER_PRODUCTS) {
      const existing = await Product.findOne({
        $or: [
          { code: item.code },
          { name: item.name }
        ]
      });

      if (existing) {
        await Product.updateOne({ _id: existing._id }, { $set: item });
        updated++;
      } else {
        await Product.create(item);
        inserted++;
      }
    }

    const totalInDb = await Product.countDocuments();
    console.log(`Seeding complete! Inserted: ${inserted}, Updated: ${updated}, Total in DB: ${totalInDb}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
