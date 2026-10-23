import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Grid3X3, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Ruler, 
  UploadCloud 
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import jaliImg from "@/assets/wall-panel.jpg";
import haveliImg from "@/assets/Heritage-Haveli.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CncJaliJaipur() {
  const { l } = useLanguage();

  const jaliFamilies = [
    {
      id: "parametric-modern-facades",
      title: l("Contemporary Modern Facade Screens", "आधुनिक सीएनसी एलिवेशन स्क्रीन"),
      subtitle: l("Solar Shading & Architectural Privacy Skins", "धूप नियंत्रण व गोपनीयता के लिए सुंदर जाली"),
      thickness: l("30mm to 75mm Solid Natural Slabs", "30mm से 75mm ठोस पत्थर स्लैब"),
      bestStones: l("Dholpur Beige & Gwalior Mint Sandstone", "धौलपुर बेज व ग्वालियर मिंट सैंडस्टोन"),
      description: l(
        "Designed for modern luxury villas and commercial towers. High-density sandstone panels milled with continuous patterns that filter direct solar glare while casting dramatic geometric shadow plays inside.",
        "आधुनिक विला और घरों के लिए। यह जाली तेज धूप को रोककर ठंडी हवा का संचार करती है और घर के अंदर आकर्षक रोशनी और छाया का सुंदर प्रभाव बनाती है।"
      ),
      applications: [
        l("Double-Height Exterior Facades", "डबल-हाइट बाहरी एलिवेशन"),
        l("Balcony & Boundary Wall Screens", "बालकनी व बाउंड्री वॉल जाली"),
        l("Staircase Natural Ventilation", "सीढ़ियों के पास हवादार स्क्रीन")
      ]
    },
    {
      id: "traditional-heritage-patterns",
      title: l("Heritage Mughal & Rajasthani Lattice Jalis", "पारंपरिक राजस्थानी व मुगल जाली"),
      subtitle: l("Authentic Geometries & Floral Filigree", "पारंपरिक ज्यामितीय व फूल-पत्ती पैटर्न"),
      thickness: l("25mm to 50mm Precision Slabs", "25mm से 50mm स्लैब"),
      bestStones: l("Makrana White Marble & Bansi Paharpur Pink", "मकराना सफेद मार्बल व गुलाबी सैंडस्टोन"),
      description: l(
        "Inspired by the fretwork of Jaipur's Amber Fort. Precision 5-axis waterjet and diamond blade profiling, hand-finished to reflect natural daylight with regal softness.",
        "आमेर किले और राजस्थानी महलों से प्रेरित पारंपरिक जालियां। बारीक कटिंग और हाथ की फिनिशिंग के साथ, जो धूप को छानकर कमरे को ठंडा और शांत रखती हैं।"
      ),
      applications: [
        l("Balcony Railing & Parapet Screens", "बालकनी रेलिंग व पैरापेट जाली"),
        l("Temple Mandap Accents & Backlit Jalis", "मंदिर बैकड्रॉप व लाइटिंग जाली"),
        l("Courtyard & Partition Walls", "आंगन व इनडोर पार्टीशन")
      ]
    },
    {
      id: "3d-bas-relief-fluted-panels",
      title: l("3D Textured & Fluted Wall Panels", "3D नक्काशीदार वॉल पैनल"),
      subtitle: l("Deep Sculptural Wave & Bas-Relief Stone Slabs", "गहरी 3D नक्काशी व वेव्स पैनल"),
      thickness: l("40mm to 100mm Monolithic Panels", "40mm से 100mm ठोस पैनल"),
      bestStones: l("Jodhpur Sandstone, Red Stone & Makrana Marble", "जोधपुर सैंडस्टोन, लाल पत्थर व मार्बल"),
      description: l(
        "Monolithic accent slabs with deep multi-dimensional carving. Creates tactile luxury in entrance foyers, master bedrooms, and water feature backdrops with integrated backlighting.",
        "गहरी 3D नक्काशी वाले पत्थर के पैनल। घर के मुख्य प्रवेश द्वार, लिविंग रूम की दीवार या फव्वारे के पीछे लगाने पर यह घर को लक्जरी लुक देते हैं।"
      ),
      applications: [
        l("Villa Entrance Feature Walls", "विला मुख्य प्रवेश द्वार की दीवार"),
        l("Fountain & Waterbody Backdrop Panels", "वाटर फाउंटेन के पीछे की वॉल"),
        l("Luxury Living Room Statement Cladding", "लिविंग रूम व लॉबी पैनल")
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "Architectural CNC Stone Jalis & Wall Panels Jaipur | RK Stone Corporation",
          "सीएनसी स्टोन जाली व 3D वॉल पैनल जयपुर | आरके स्टोन कॉर्पोरेशन"
        )}
        description={l(
          "Custom 5-axis CNC-cut marble and sandstone jalis in Jaipur. Parametric facade screens, traditional Rajasthani lattice, and 3D fluted panels. Direct manufacturer.",
          "जयपुर में निर्मित सीएनसी स्टोन जालियां, मार्बल जाली, सैंडस्टोन वॉल पैनल और एलिवेशन स्क्रीन्स। सीधे कारखाने से आपूर्ति।"
        )}
        keywords="cnc jali jaipur, stone facade screen jaipur, sandstone jali manufacturer, 3d stone wall panel jaipur, exterior architectural screen, makrana marble jali"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${jaliImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("ARCHITECTURAL CNC JALIS &", "आधुनिक सीएनसी स्टोन जाली व")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("3D Stone Facade Screens", "3D नक्काशीदार वॉल पैनल")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "Precision 5-axis CNC milling paired with master craftsman hand-finishing. We fabricate parametric solar screens, traditional lattice panels, and 3D textured stone elevations for luxury architecture across India.",
                "आधुनिक सीएनसी कटिंग और कुशल कारीगरों की बारीक फिनिशिंग। हम धूप और हवा के संतुलन के साथ बालकनी, एलिवेशन और दीवारों के लिए सुंदर जालियां तैयार करते हैं।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("SUBMIT JALI DRAWINGS FOR QUOTE", "जाली डिज़ाइन भेजकर रेट लें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href={`https://wa.me/919414784562?text=${encodeURIComponent(
                  "Hi RK Stone Corporation, I have a CAD drawing / pattern for a CNC Stone Jali. Please review and provide pricing estimate."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                  {l("WHATSAPP CAD FILES / PHOTOS", "व्हाट्सएप पर डिज़ाइन भेजें")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering Specs Strip */}
      <section className="py-16 bg-[#161616] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal direction="left" delay={0.1}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("CUTTING ACCURACY", "सटीक फिनिशिंग")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("±0.5MM TOLERANCE", "सटीक सीएनसी कटिंग")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Diamond-tooled CNC router paths ensuring crisp internal edges with zero chipping.",
                    "डायमंड कटर द्वारा सटीक कटिंग, जिससे किनारों पर कोई टूट-फूट नहीं होती।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("EASY MOUNTING", "आसान फिटिंग")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("DRY CLAMP GROOVES", "क्लैंप व ग्रूव्स सिस्टम")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Edges pre-slotted for concealed stainless steel mechanical clips.",
                    "दीवार पर फिक्स करने के लिए एसएस क्लैंप्स लगाने की उचित व्यवस्था।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("WEATHER RESISTANCE", "मौसम प्रतिरोधी")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("WATER REPELLENT COAT", "वॉटरप्रूफ कोटिंग")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Impregnating sealants applied to repel dust, rainwater stains, and algae.",
                    "धूल और बारिश के पानी के दागों से बचाने वाला विशेष सीलेंट।"
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.4}>
              <div className="p-4">
                <div className="text-accent font-body text-xs font-bold uppercase tracking-widest mb-1">
                  {l("DESIGN COMPATIBILITY", "डिज़ाइन सुविधा")}
                </div>
                <div className="text-lg font-heading font-medium uppercase">
                  {l("ANY CAD / PHOTO PATTERN", "मनचाहा पैटर्न उपलब्ध")}
                </div>
                <p className="text-xs text-white/60 mt-1 max-w-xs mx-auto">
                  {l(
                    "Send your custom vector design or choose from our 500+ curated motifs.",
                    "अपनी पसंद का कोई भी डिज़ाइन भेजें या हमारे 500+ कैटलॉग से चुनें।"
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Jali Families Showcase */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-20">
            <Reveal direction="down">
              <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                {l("SCREENS FOR LIGHT, SHADOW & PRIVACY", "रोशनी, हवा व सुंदरता का संतुलन")}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-stone-600 text-base font-light mt-4 leading-relaxed">
                {l(
                  "Explore our fabrication series crafted in natural Rajasthan sandstones and Makrana marbles for facades, interior dividers, and exterior walls.",
                  "सैंडस्टोन और संगमरमर में बनी हमारी प्रमुख सीएनसी जाली श्रेणियां, जो घर के एलिवेशन और इनडोर डेकोरेशन दोनों के लिए श्रेष्ठ हैं।"
                )}
              </p>
            </Reveal>
          </div>

          {/* Jali Family Cards */}
          <div className="space-y-16">
            {jaliFamilies.map((fam, idx) => (
              <Reveal 
                key={fam.id} 
                direction={idx % 2 === 0 ? "left" : "right"} 
                delay={0.1}
                duration={0.85}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-stone-200/90 shadow-sm p-8 sm:p-12 items-center hover:border-accent transition-all duration-300">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 text-accent text-xs font-body font-bold tracking-widest uppercase">
                      <span>{l("SERIES", "सीरीज़")} 0{idx + 1}</span>
                      <span>•</span>
                      <span>{fam.subtitle}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-normal uppercase text-stone-950 tracking-wide">
                      {fam.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed">
                      {fam.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-stone-50 border border-stone-200 p-3">
                        <span className="text-[10px] font-body font-semibold text-stone-500 uppercase tracking-wider block">
                          {l("Thickness Options", "मोटाई")}
                        </span>
                        <span className="text-xs font-semibold text-stone-950">{fam.thickness}</span>
                      </div>
                      <div className="bg-stone-50 border border-stone-200 p-3">
                        <span className="text-[10px] font-body font-semibold text-stone-500 uppercase tracking-wider block">
                          {l("Recommended Stones", "उपयुक्त पत्थर")}
                        </span>
                        <span className="text-xs font-semibold text-accent">{fam.bestStones}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {fam.applications.map((app, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-8">
                    <span className="text-xs font-body font-semibold text-stone-500 uppercase tracking-wider">
                      {l("Direct Workshop Pricing", "सीधा कारखाना भाव")}
                    </span>
                    <div className="text-sm font-semibold text-stone-950">
                      {l("Per square foot estimate based on thickness & stone", "पत्थर व मोटाई अनुसार प्रति वर्ग फीट दर")}
                    </div>

                    <div className="pt-2 space-y-2">
                      <a
                        href={`https://wa.me/919414784562?text=${encodeURIComponent(
                          `Hi RK Stone Corporation, please share catalogue, sizes and pricing for ${fam.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold tracking-wider uppercase text-xs py-5 rounded-none cursor-pointer">
                          <WhatsAppIcon className="mr-2 w-4 h-4 text-accent" />
                          {l("INQUIRE SQ.FT RATE", "स्क्वायर फीट रेट पूछें")}
                        </Button>
                      </a>

                      <Link to="/contact" className="block w-full">
                        <Button variant="outline" className="w-full border border-stone-300 hover:border-stone-950 text-stone-800 hover:text-stone-950 hover:bg-stone-100 text-xs uppercase tracking-wider py-5 rounded-none transition-all cursor-pointer">
                          {l("REQUEST DRAWINGS", "ड्राइंग मांगें")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Blueprint Submission Banner */}
      <section className="py-24 bg-stone-950 text-white">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">

          <Reveal direction="down" duration={0.8}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.08] mb-6">
              {l("SEND US YOUR CAD / PHOTO", "अपनी पसंद की ड्राइंग या फोटो भेजें")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("& Get Quick Custom Estimates", "और तुरंत अनुमानित लागत पाएं")}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Our design team reviews your measurements, stone selection, and cutting details to provide an accurate schedule and rate.",
                "हमारी टीम आपके नाप और पसंद के पत्थर के आधार पर सटीक कोटेशन और डिलीवरी टाइमलाइन तैयार करती है।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("UPLOAD DRAWINGS / DETAILS", "ड्राइंग / विवरण भेजें")}
                </Button>
              </Link>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  {l("CALL WORKSHOP: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
