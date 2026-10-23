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
  // 1. Stone Temples
  {
    code: "RK-PROD-01",
    name: "Pure Makrana White Marble Vedic Mandir",
    nameHi: "मकराना शुद्ध सफेद संगमरमर वैदिक मंदिर",
    price: 349999,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/3.jpg",
    category: "stone-temple",
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
    category: "stone-temple",
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
    name: "Sacred Carved Sanctum Freestanding Mandir",
    nameHi: "नक्काशीदार गर्भगृह होम मंदिर",
    price: 275000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/1.jpg",
    category: "stone-temple",
    stoneType: "Dholpur & Makrana Composite",
    dimensions: "6ft Height x 4.5ft Width x 2.5ft Depth",
    leadTime: "20-25 Days",
    description: "Compact yet deeply ornate temple featuring sanctified garbhagriha, carved peacocks, bell finials, and pull-out marble prasad tray.",
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
    name: "Monumental Trust Mandapam & Shikhara",
    nameHi: "भव्य सार्वजनिक ट्रस्ट मंदिर मंडप व शिखर",
    price: 650000,
    priceUnit: "piece",
    image: "/products/Stone%20Temple/4.jpg",
    category: "stone-temple",
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

  // 2. Chhatri & Gazebos
  {
    code: "RK-PROD-05",
    name: "Royal 8-Pillar Stone Chhatri (Octagonal Dome)",
    nameHi: "शाही 8 खंभा अष्टकोणीय पत्थर की छतरी",
    price: 399999,
    priceUnit: "piece",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.23_85e9d86f.jpg",
    category: "chhatri",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "12ft Diameter x 16ft Height",
    leadTime: "30-40 Days",
    description: "Monumental Rajasthani royal stone chhatri with 8 fluted monolithic pillars, carved kalash finial, and cantilevered sunshade chajjas.",
    descriptionHi: "पारंपरिक राजस्थानी 8 खंभों वाली नक्काशीदार छतरी, गुंबद और कंगूरे सहित। फॉर्महाउस और बगीचों के लिए उत्तम।",
    features: [
      "Interlocking self-supporting dome craft",
      "Hand-carved floral capital brackets (Toddis)",
      "High weather and heat resistance for open gardens"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-06",
    name: "Heritage Sandstone Garden Gazebo",
    nameHi: "हेरिटेज सैंडस्टोन गार्डन गज़ेबो",
    price: 449999,
    priceUnit: "piece",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.22_d16a22d7.jpg",
    category: "chhatri",
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
  {
    code: "RK-PROD-07",
    name: "Traditional Memorial Stone Chhatri with Finial",
    nameHi: "पारंपरिक नक्काशीदार स्मारक छतरी",
    price: 325000,
    priceUnit: "piece",
    image: "/products/Chhatri/WhatsApp%20Image%202025-10-29%20at%2016.30.24_b7721eb3.jpg",
    category: "chhatri",
    stoneType: "Dholpur Pink Sandstone",
    dimensions: "8ft Diameter x 12ft Height",
    leadTime: "25-30 Days",
    description: "4-pillar classical heritage canopy crafted with authentic Rajputana stone architectural details.",
    descriptionHi: "4 खंभों वाली शास्त्रीय राजपूताना छतरी जिसमें बारीक नक्काशीदार छत और कलश शामिल हैं।",
    features: [
      "Deep bas-relief carved ceiling medallion",
      "Solid one-piece pillar bases",
      "Weather-sealed protective coating"
    ],
    isActive: true,
    isFeatured: false
  },

  // 3. Gwalior Stone Craft
  {
    code: "RK-PROD-08",
    name: "Gwalior White Mint Stone 3D CNC Screen",
    nameHi: "ग्वालियर मिंट स्टोन 3D सीएनसी जाली",
    price: 450,
    priceUnit: "sq.ft",
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.00_d29799fe.jpg",
    category: "gwalior-stone",
    stoneType: "Gwalior White Mint Stone",
    dimensions: "6ft Height x 4ft Width x 35mm Thickness",
    leadTime: "10-14 Days",
    description: "Ultra-fine CNC milled Gwalior mint stone screen with high tensile density. Ideal for exterior ventilation, balcony facades, and privacy lattices.",
    descriptionHi: "ग्वालियर मिंट स्टोन में सटीक सीएनसी कटिंग जाली। बाहरी बालकनी, फ्रंट एलिवेशन और धूप नियंत्रण हेतु सर्वोत्तम।",
    features: [
      "Zero-chipping high density natural quartzitic matrix",
      "Sub-millimeter CNC lattice accuracy",
      "Pre-drilled stainless steel SS-304 dry-cladding points"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-09",
    name: "Gwalior Stone Hand-Carved Floral Wall Panel",
    nameHi: "ग्वालियर स्टोन हस्तनिर्मित फ्लोरल वॉल पैनल",
    price: 42000,
    priceUnit: "piece",
    image: "/products/Gwalior%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.25.02_bb05aa29.jpg",
    category: "gwalior-stone",
    stoneType: "Gwalior Mint Stone",
    dimensions: "5ft Height x 3ft Width x 50mm",
    leadTime: "12-16 Days",
    description: "Deep relief decorative floral and paisley stone panel for drawing room feature walls, entrance foyers, and villa facades.",
    descriptionHi: "लिविंग रूम और विला के मुख्य प्रवेश द्वार के लिए उभरी हुई नक्काशीदार पत्थर की पट्टिका।",
    features: [
      "Deep 3D hand-chiseled bas-relief",
      "Satin honed velvety tactile surface",
      "Custom motif reproduction from CAD/sketches"
    ],
    isActive: true,
    isFeatured: false
  },

  // 4. Heritage Haveli Craft & Jharokhas
  {
    code: "RK-PROD-10",
    name: "Royal Rajasthani Carved Stone Jharokha",
    nameHi: "शाही राजस्थानी नक्काशीदार झरोखा",
    price: 85000,
    priceUnit: "piece",
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_0d8c61da.jpg",
    category: "heritage-haveli",
    stoneType: "Dholpur Beige Sandstone",
    dimensions: "5ft Height x 4ft Width x 2ft Projection",
    leadTime: "18-22 Days",
    description: "Monumental carved Rajasthani jharokha with ornate peacock brackets, arched balustrades, and traditional fluted stone sunshades.",
    descriptionHi: "पारंपरिक मोर ब्रैकेट, मेहराब और छज्जे के साथ हवेली स्टाइल सुंदर पत्थर का झरोखा।",
    features: [
      "Cantilever mechanical anchoring for exterior walls",
      "Deep hand-chiseled Rajputana motifs",
      "Adds iconic heritage grandeur to modern building elevations"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    code: "RK-PROD-11",
    name: "Dholpur Stone Fluted Haveli Pillar (Pair)",
    nameHi: "धौलपुर सैंडस्टोन हवेली खंभे (जोड़ी)",
    price: 48000,
    priceUnit: "pair",
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.10_4f57584b.jpg",
    category: "heritage-haveli",
    stoneType: "Royal Dholpur Teak Sandstone",
    dimensions: "9ft Height x 14in Base Diameter",
    leadTime: "15-20 Days",
    description: "Turned and hand-chiseled structural load-bearing sandstone columns with classical tiered bases and ornate capitals.",
    descriptionHi: "लोड बेयरिंग मजबूत सैंडस्टोन खंभे, सुंदर नक्काशीदार बेस और कैपिटल के साथ।",
    features: [
      "Fluted shaft with organic teakwood grain",
      "Load-bearing structural capacity",
      "Pairs seamlessly with stone arches and porticos"
    ],
    isActive: true,
    isFeatured: false
  },
  {
    code: "RK-PROD-12",
    name: "Heritage Palatial Entrance Archway",
    nameHi: "शाही महल प्रवेश द्वार मेहराब",
    price: 125000,
    priceUnit: "piece",
    image: "/products/Heritage%20Haveli/WhatsApp%20Image%202025-10-29%20at%2016.17.11_bdce4b58.jpg",
    category: "heritage-haveli",
    stoneType: "Dholpur Beige & Pink Stone",
    dimensions: "10ft Span x 12ft Height",
    leadTime: "20-25 Days",
    description: "Ornate multi-foil stone arch for grand entryways, porticos, and courtyard verandahs.",
    descriptionHi: "प्रवेश द्वार और बरामदे के लिए बहु-मेहराबी नक्काशीदार पत्थर का आर्च।",
    features: [
      "Modular interlocking keystone design",
      "Fine relief acanthus and floral carvings",
      "Engineered for heavy masonry spans"
    ],
    isActive: true,
    isFeatured: false
  },

  // 5. 3D CNC Stone Jalis & Wall Panels
  {
    code: "RK-PROD-13",
    name: "Parametric 3D CNC Sandstone Facade Screen",
    nameHi: "पैरामीट्रिक 3D सीएनसी स्टोन एलिवेशन जाली",
    price: 480,
    priceUnit: "sq.ft",
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.28_c814d257.jpg",
    category: "wall-panel",
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
    code: "RK-PROD-14",
    name: "Traditional Floral Lattice Jali Screen",
    nameHi: "पारंपरिक मुगल फ्लोरल जाली स्क्रीन",
    price: 420,
    priceUnit: "sq.ft",
    image: "/products/Wall%20Panel/WhatsApp%20Image%202025-10-29%20at%2016.19.30_2a71e700.jpg",
    category: "wall-panel",
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

  // 6. Courtyard Water Fountains
  {
    code: "RK-PROD-15",
    name: "Palatial 3-Tier Cascading Water Fountain",
    nameHi: "शाही 3-मंजिला झरना वाटर फाउंटेन",
    price: 299999,
    priceUnit: "piece",
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.30_f109f25e.jpg",
    category: "garden-fountain",
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
    code: "RK-PROD-16",
    name: "Hand-Carved Lotus Basin Garden Fountain",
    nameHi: "हस्तनिर्मित कमल कुंड गार्डन फाउंटेन",
    price: 185000,
    priceUnit: "piece",
    image: "/products/Garden%20Fountains/WhatsApp%20Image%202025-10-29%20at%2016.28.31_bf455c63.jpg",
    category: "garden-fountain",
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

  // 7. Monumental Gates & Torans
  {
    code: "RK-PROD-17",
    name: "Monumental Stone Entrance Toran (Gateway)",
    nameHi: "भव्य नक्काशीदार प्रवेश तोरण द्वार",
    price: 550000,
    priceUnit: "piece",
    image: "/products/Gate/WhatsApp%20Image%202025-10-29%20at%2016.18.25_02128f77.jpg",
    category: "gate",
    stoneType: "Jodhpur Red & Dholpur Sandstone",
    dimensions: "24ft Span Width x 18ft Clearance Height",
    leadTime: "40-60 Days",
    description: "Majestic fortress-style carved entrance gateway with twin structural pillars, carved brackets, and decorative stone beam.",
    descriptionHi: "कॉलोनी, आश्रम, विला या फार्महाउस के मुख्य द्वार के लिए विशालकाय नक्काशीदार पत्थर का तोरण।",
    features: [
      "Massive monolithic load-bearing columns",
      "Deep relief auspicious motifs (Gajraj, Kalash, Toran)",
      "Pan-India on-site crane and artisan installation"
    ],
    isActive: true,
    isFeatured: true
  },

  // 8. Animal Sculptures
  {
    code: "RK-PROD-18",
    name: "Monolithic Hand-Carved Royal Stone Elephant Pair",
    nameHi: "शाही अखंड नक्काशीदार पत्थर के हाथी (जोड़ा)",
    price: 195000,
    priceUnit: "pair",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.01_908bfde4.jpg",
    category: "animals",
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
    code: "RK-PROD-19",
    name: "Imperial Rajputana Stone Lion Guard Pair",
    nameHi: "मेहरानगढ़ स्टाइल पत्थर के शेर (जोड़ा)",
    price: 220000,
    priceUnit: "pair",
    image: "/products/Animals/WhatsApp%20Image%202025-10-29%20at%2016.16.02_5e13a207.jpg",
    category: "animals",
    stoneType: "Jodhpur Imperial Sandstone",
    dimensions: "4.5ft Height x 3.5ft Length (Pair of 2)",
    leadTime: "25-30 Days",
    description: "Majestic seated stone lions carved with dramatic manes and muscular contours, representing royal power and protection.",
    descriptionHi: "शाही शक्ति और सुरक्षा के प्रतीक नक्काशीदार शेर की जोड़ी, जोधपुर लाल पत्थर से निर्मित।",
    features: [
      "Classical Mehrangarh fort architectural lineage",
      "Carved from weather-immune dense sandstone",
      "Polished paw and facial expressions"
    ],
    isActive: true,
    isFeatured: false
  },

  // 9. Red Sand Stone & Jodhpur Stone
  {
    code: "RK-PROD-20",
    name: "Bansi Paharpur Red Stone Carved Wall Relief",
    nameHi: "बंसी पहाड़पुर लाल पत्थर नक्काशी वॉल टाइल",
    price: 450,
    priceUnit: "sq.ft",
    image: "/products/Red%20Sand%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.20.16_b6329759.jpg",
    category: "red-stone",
    stoneType: "Bansi Paharpur Red Stone",
    dimensions: "4ft x 4ft x 40mm",
    leadTime: "12-15 Days",
    description: "Deep bas-relief carved red sandstone tile for boundary wall accents and temple facades.",
    descriptionHi: "दीवारों और मंदिर के लिए शुद्ध बंसी पहाड़पुर प्राकृतिक लाल पत्थर की नक्काशीदार टाइल।",
    features: [
      "Natural red stone coloration with zero synthetic dye",
      "Immune to moisture staining and moss growth",
      "Hand-chiseled antique dressed edge"
    ],
    isActive: true,
    isFeatured: false
  },
  {
    code: "RK-PROD-21",
    name: "Jodhpur Desert Red Sandstone Pillar",
    nameHi: "जोधपुर लाल सैंडस्टोन नक्काशीदार खंभा",
    price: 55000,
    priceUnit: "piece",
    image: "/products/Jodhpur%20Stone/WhatsApp%20Image%202025-10-29%20at%2016.21.01_1fb6fd38.jpg",
    category: "jodhpur-stone",
    stoneType: "Jodhpur Imperial Red Sandstone",
    dimensions: "10ft Height x 16in Diameter",
    leadTime: "15-20 Days",
    description: "High density iron-oxide cemented quartz sandstone pillar, celebrated for resisting harsh desert winds and heat.",
    descriptionHi: "तेज धूप और बारिश झेलने वाला अत्यधिक मजबूत जोधपुर लाल सैंडस्टोन खंभा।",
    features: [
      "Deep fluting with traditional leaf rings",
      "Exceptional structural compression resistance",
      "Authentic Marwar architectural character"
    ],
    isActive: true,
    isFeatured: false
  },

  // 10. Garden Ornaments
  {
    code: "RK-PROD-22",
    name: "Handcrafted Stone Courtyard Planter Urn",
    nameHi: "हस्तनिर्मित सैंडस्टोन आंगन गमला / कलश",
    price: 18500,
    priceUnit: "piece",
    image: "/products/Garden%20Ornaments/WhatsApp%20Image%202025-10-29%20at%2016.31.23_aecdcb40.jpg",
    category: "garden-ornaments",
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
      // Find if product with same code or name already exists
      const existing = await Product.findOne({
        $or: [
          { code: item.code },
          { name: item.name }
        ]
      });

      if (existing) {
        // Update fields while preserving _id
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
