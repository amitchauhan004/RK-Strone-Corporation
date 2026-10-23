import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Calendar,
  Layers,
  Compass,
  Eye,
  ChevronRight
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import templeImg from "@/assets/Stone-Temple.jpg";
import haveliImg from "@/assets/Heritage-Haveli.jpg";
import jaliImg from "@/assets/wall-panel.jpg";
import fountainImg from "@/assets/garden-fountain.jpg";
import chhatriImg from "@/assets/chhatri.jpg";
import gateImg from "@/assets/Gate.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Portfolio() {
  const { l } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "temples" | "havelis" | "screens" | "courtyard">("all");

  const caseStudies = [
    {
      id: "sovereign-mandir-hyderabad",
      title: l("White Marble Home Mandir", "भव्य सफेद संगमरमर मंदिर"),
      category: "temples" as const,
      categoryLabel: l("Sacred Temple Architecture", "पारंपरिक मंदिर शिल्प"),
      location: l("Jubilee Hills, Hyderabad", "जुबली हिल्स, हैदराबाद"),
      year: "2024",
      materialsUsed: l("Pristine Makrana White Marble (Pure Calcite)", "शुद्ध मकराना सफेद संगमरमर (प्योर मार्बल)"),
      scope: l("12-Foot Carved Shikhar, Garbhagriha, 8 Carved Pillars", "12 फीट ऊंचा शिखर, गर्भगृह, 8 नक्काशीदार खंभे"),
      description: l(
        "Handcrafted for a private residence in Jubilee Hills. Made from 100% natural Makrana White marble. The shikhar and pillars feature detailed traditional hand-carvings made to exact proportions.",
        "हैदराबाद के निजी आवास के लिए तैयार किया गया। बिना किसी केमिकल पॉलिश के शुद्ध मकराना सफेद संगमरमर से निर्मित। शिखर और खंभों पर पारंपरिक वैदिक अनुपातों में बारीक नक्काशी की गई है।"
      ),
      image: templeImg,
      highlights: [
        l("100% Calcitic Non-Yellowing Marble", "शुद्ध मकराना संगमरमर"),
        l("Invisible Precision Joints", "सटीक जोड़ व फिटिंग"),
        l("Sanctum Lighting Integration", "लाइटिंग के लिए विशेष प्रावधान")
      ]
    },
    {
      id: "marwar-palatial-facade",
      title: l("Royal Haveli Facade & Columns", "शाही हवेली अग्रभाग व खंभे"),
      category: "havelis" as const,
      categoryLabel: l("Heritage Haveli Architecture", "पारंपरिक हवेली वास्तुकला"),
      location: l("Heritage Resort & Estate, Alwar", "हेरिटेज रिसॉर्ट, अलवर"),
      year: "2023",
      materialsUsed: l("Royal Dholpur Pink & Bansi Paharpur Sandstone", "धौलपुर पिंक व बंसी पहाड़पुर सैंडस्टोन"),
      scope: l("3,800 Sq.Ft Exterior Elevation, 16 Classical Columns, 4 Jharokhas", "3,800 वर्ग फीट एलिवेशन, 16 खंभे, 4 झरोखे"),
      description: l(
        "A heritage facade expansion featuring hand-carved sandstone arches, traditional Rajasthani balconies (jharokhas), and strong carved stone pillars crafted by our Jaipur artisans.",
        "भव्य हवेली एलिवेशन जिसमें हाथ से तराशे गए सैंडस्टोन मेहराब, पारंपरिक राजस्थानी झरोखे और मजबूत नक्काशीदार खंभे शामिल हैं।"
      ),
      image: haveliImg,
      highlights: [
        l("Dry-Cladding Stainless Steel Anchors", "स्टेनलेस स्टील क्लैंप सिस्टम"),
        l("Deep Floral Cornices", "बारीक नक्काशीदार कंगनी"),
        l("Traditional Lime-Cured Joints", "पारंपरिक मजबूत जोड़")
      ]
    },
    {
      id: "parametric-cnc-screens-gurugram",
      title: l("Architectural Stone Screen Facade", "आधुनिक सीएनसी स्टोन जाली"),
      category: "screens" as const,
      categoryLabel: l("CNC Jalis & Wall Panels", "सीएनसी जाली व पैनल"),
      location: l("Golf Course Road, Gurugram", "गोल्फ कोर्स रोड, गुरुग्राम"),
      year: "2024",
      materialsUsed: l("Dholpur Beige Sandstone (50mm Solid Slabs)", "धौलपुर बेज सैंडस्टोन (50mm ठोस स्लैब)"),
      scope: l("1,200 Sq.Ft Double-Height Architectural Screen", "1,200 वर्ग फीट डबल-हाइट जाली"),
      description: l(
        "Precision 5-axis CNC milled stone panels providing privacy, solar shading, and dramatic interplay of sunlight and shadow across a modern triplex living area.",
        "आधुनिक पेंटहाउस के लिए तैयार की गई 5-एक्सिस सीएनसी कटिंग जाली, जो धूप और हवा के संतुलन के साथ घर को सुंदर लुक देती है।"
      ),
      image: jaliImg,
      highlights: [
        l("Custom 3D Lattice Motif", "कस्टम 3D जाली डिज़ाइन"),
        l("Concealed Structural Subframe", "अदृश्य स्टील फ्रेमिंग"),
        l("Integrated Backlighting Channels", "बैकलाइटिंग का प्रावधान")
      ]
    },
    {
      id: "royal-tiered-fountain-udaipur",
      title: l("Courtyard Tiered Water Fountain", "शाही बहुस्तरीय पत्थर फव्वारा"),
      category: "courtyard" as const,
      categoryLabel: l("Courtyard Artifacts", "आंगन व गार्डन शिल्प"),
      location: l("Lake Pichola Private Villa, Udaipur", "पिछोला झील विला, उदयपुर"),
      year: "2023",
      materialsUsed: l("Jodhpur Imperial Sandstone & Makrana Marble", "जोधपुर सैंडस्टोन व मकराना मार्बल"),
      scope: l("18-Foot Diameter Octagonal Lotus Basin, 3-Tier Fountain", "18 फीट चौड़ा कमल कुंड, 3-स्तरीय फव्वारा"),
      description: l(
        "Hand-turned and chiseled from single monolithic sandstone drums. The fountain features hand-carved lion spouts, fluted water channels, and soothing water cascade acoustics for the villa courtyard.",
        "एक ही पत्थर के टुकड़ों से तराशा गया सुंदर फव्वारा, जिसमें हाथ से बने नक्काशीदार कुंड और पानी का शांत प्रवाह आंगन को मनमोहक बनाता है।"
      ),
      image: fountainImg,
      highlights: [
        l("Submersible Pump Ready", "सबमर्सिबल पंप इंटीग्रेशन"),
        l("Water Repellent Sealant", "वॉटरप्रूफ सीलेंट कोटिंग"),
        l("Acoustic Flow Balancing", "शांत व मधुर जल प्रवाह")
      ]
    },
    {
      id: "vedic-shikhara-sanctuary-ahmedabad",
      title: l("The Heritage Shikhara Temple", "शिखरबद्ध पारंपरिक मंदिर"),
      category: "temples" as const,
      categoryLabel: l("Sacred Temple Architecture", "पारंपरिक मंदिर शिल्प"),
      location: l("Spiritual Trust Complex, Ahmedabad", "धार्मिक ट्रस्ट, अहमदाबाद"),
      year: "2024",
      materialsUsed: l("Bansi Paharpur Pink Sandstone", "बंसी पहाड़पुर गुलाबी सैंडस्टोन"),
      scope: l("24-Foot Monumental Shikhar, Mandapam, 24 Sacred Pillars", "24 फीट ऊंचा शिखर, मंडप, 24 नक्काशीदार खंभे"),
      description: l(
        "A multigenerational temple built to endure centuries of worship. Every stone block was cataloged, precision sawn in our Jaipur workshop, and assembled on-site with traditional interlocking techniques.",
        "सैकड़ों वर्षों तक अक्षुण्ण रहने वाला भव्य मंदिर। हर पत्थर को जयपुर वर्कशॉप में तराश कर साइट पर पारंपरिक इंटरलॉकिंग तकनीक से स्थापित किया गया।"
      ),
      image: chhatriImg,
      highlights: [
        l("Nagar-Style Authentic Shikhara", "नागर शैली का प्रामाणिक शिखर"),
        l("Interlocking Jointing System", "इंटरलॉकिंग जोड़ प्रणाली"),
        l("Earthquake Resilient Design", "भूकंप रोधी संरचना")
      ]
    },
    {
      id: "monumental-toran-gateway",
      title: l("Imperial Rajput Gate & Pavilion", "शाही राजपूताना प्रवेश द्वार"),
      category: "havelis" as const,
      categoryLabel: l("Heritage Haveli Architecture", "पारंपरिक हवेली वास्तुकला"),
      location: l("Private Estate, Chattarpur, New Delhi", "छतरपुर, नई दिल्ली"),
      year: "2023",
      materialsUsed: l("Red Sandstone & Gwalior Mint Stone", "लाल सैंडस्टोन व ग्वालियर मिंट स्टोन"),
      scope: l("22-Foot Double Toran Gateway with Carved Elephant Brackets", "22 फीट ऊंचा तोरण द्वार, हाथी ब्रैकेट"),
      description: l(
        "An awe-inspiring arrival portal evoking the entrance to Rajasthan's royal palaces. Massive load-bearing red sandstone pillars support an intricately chiseled lintel crowned with elephant brackets and floral rosettes.",
        "राजस्थान के महलों की भव्यता दर्शाता विशाल मुख्य द्वार। मजबूत लाल पत्थर के खंभों पर हाथ से तराशे गए गजराज (हाथी) ब्रैकेट और सुंदर नक्काशी।"
      ),
      image: gateImg,
      highlights: [
        l("Monolithic Elephant Brackets", "एकल पत्थर में तराशे हाथी"),
        l("Wide Vehicular Clearance", "गाड़ियों के आवागमन योग्य चौड़ाई"),
        l("Architectural Concealed Lighting", "छिपी हुई आकर्षक लाइटिंग")
      ]
    }
  ];

  const filteredProjects = selectedFilter === "all"
    ? caseStudies
    : caseStudies.filter(p => p.category === selectedFilter);

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Selected Works & Stone Portfolio | RK Stone Corporation Jaipur",
          "हमारे प्रमुख प्रोजेक्ट्स व पोर्टफोलियो | आरके स्टोन कॉर्पोरेशन जयपुर"
        )}
        description={l(
          "Explore our portfolio of sacred temples, palatial haveli facades, CNC jali screens, and fountains commissioned across India.",
          "हमारे द्वारा बनाए गए पत्थर के मंदिर, हवेलियों के एलिवेशन, सीएनसी जालियां और वाटर फाउंटेन के वास्तविक प्रोजेक्ट्स देखें।"
        )}
        keywords="stone temple portfolio, haveli facade projects, luxury stone architecture cases, makrana marble temple photos, stone carving jaipur works"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${templeImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("MONUMENTS OF DEVOTION", "आस्था और भव्यता का संगम")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("& Palatial Stone Mastery", "प्राकृतिक पत्थर की अमर शिल्पकला")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "A showcase of our completed stone commissions—from sacred white marble home mandirs to royal haveli facades and modern CNC stone screens across India.",
                "हमारे द्वारा पूरे किए गए मुख्य प्रोजेक्ट्स—संगमरमर के भव्य मंदिर, हवेली के नक्काशीदार खंभे, झरोखे और आधुनिक सीएनसी जाली के वास्तविक काम।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("ORDER SIMILAR WORK", "ऐसा काम करवाने के लिए पूछें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I am viewing your Selected Works portfolio and would like to request high-resolution photo dossiers and pricing."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP PHOTOS & PRICING", "व्हाट्सएप पर फोटो व रेट मांगें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <span className="text-xs font-body font-bold uppercase tracking-wider text-stone-500 mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent" /> {l("CATEGORY:", "श्रेणी:")}
            </span>
            {[
              { id: "all", label: l("All Selected Works", "सभी प्रोजेक्ट्स") },
              { id: "temples", label: l("Sacred Mandirs", "पत्थर के मंदिर") },
              { id: "havelis", label: l("Heritage Havelis", "हवेली व खंभे") },
              { id: "screens", label: l("CNC Jalis", "सीएनसी जाली") },
              { id: "courtyard", label: l("Fountains & Chhatris", "फव्वारे व छतरियां") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-none border ${
                  selectedFilter === tab.id
                    ? "bg-stone-950 text-white border-stone-950 shadow-sm"
                    : "bg-white text-stone-700 border-stone-300 hover:border-stone-950 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-stone-500 font-body tracking-wider hidden md:block">
            {l("AUTHENTIC JAIPUR CRAFTSMANSHIP", "प्रमाणित जयपुर कारीगरी")}
          </div>
        </div>
      </section>

      {/* Case Studies Editorial Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("SELECTED STONE PROJECTS", "हमारे प्रमुख प्रोजेक्ट्स")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "Explore completed private mandirs, haveli restorations, CNC facade installations, and courtyard water features across India.",
                  "पूरे भारत में बनाए गए सुंदर मंदिर, हवेलियों के एलिवेशन, सीएनसी स्टोन जालियां और आंगन के फव्वारे देखें।"
                )}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "right"];
              const dir = directions[idx % 3];
              return (
                <Reveal
                  key={project.id}
                  direction={dir}
                  delay={(idx % 3) * 0.15}
                >
                  <div className="h-full bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                    <div>
                      {/* Photo Frame */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-stone-950">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md px-3 py-1 text-accent text-[11px] font-body font-bold tracking-widest uppercase">
                          {project.categoryLabel}
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-body tracking-wide">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            {project.location}
                          </span>
                          <span>{project.year}</span>
                        </div>
                      </div>

                      {/* Narrative Body */}
                      <div className="p-6 sm:p-8 space-y-4">
                        <h3 className="font-heading font-normal text-xl sm:text-2xl uppercase text-stone-950 tracking-wide leading-snug group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Meta Specs */}
                        <div className="border-t border-stone-100 pt-4 space-y-2 text-xs">
                          <div>
                            <span className="font-body font-semibold text-stone-400 uppercase tracking-wider block text-[10px]">
                              {l("Material Used", "उपयोग किया गया पत्थर")}
                            </span>
                            <span className="font-semibold text-stone-900">
                              {project.materialsUsed}
                            </span>
                          </div>
                          <div>
                            <span className="font-body font-semibold text-stone-400 uppercase tracking-wider block text-[10px]">
                              {l("Scale & Scope", "माप व कार्य विवरण")}
                            </span>
                            <span className="text-stone-700">
                              {project.scope}
                            </span>
                          </div>
                        </div>

                        {/* Highlights Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] font-body font-semibold tracking-wide uppercase border border-stone-200"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-6 sm:p-8 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, I am interested in commissioning a project similar to "${project.title}" (${project.location}). Please share more details and pricing estimate.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold uppercase tracking-wider text-accent hover:text-stone-950 flex items-center gap-1.5 transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        {l("INQUIRE ABOUT THIS WORK", "इस कार्य की जानकारी लें")}
                      </a>

                      <Link
                        to="/contact"
                        className="text-xs font-semibold text-stone-500 hover:text-stone-950 flex items-center gap-1 transition-colors"
                      >
                        <span>{l("CUSTOMIZE", "कस्टमाइज")}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Consultation Banner */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("YOUR HOME DESERVES A", "अपने घर को दें")} <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Living Legacy in Natural Stone", "सच्चे पत्थरों की अमर सुंदरता")}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Whether designing a home mandir, haveli facade, or CNC stone jali, speak directly with our master stone carvers in Jaipur.",
                "घर का मंदिर, हवेली एलिवेशन या सीएनसी जाली बनवाने के लिए जयपुर के हमारे अनुभवी कारीगरों से सीधे बात करें।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("REQUEST QUOTE & DRAWINGS", "कोटेशन व ड्राइंग मांगें")}
                </Button>
              </Link>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  {l("CALL DIRECT: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
