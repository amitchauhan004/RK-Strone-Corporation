import { Link } from "react-router-dom";
import { 
  Award, 
  Target, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  MapPin, 
  ArrowRight, 
  Users, 
  Building2, 
  CheckCircle2,
  Calendar,
  User,
  Briefcase,
  TrendingUp,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/ui/Reveal";
import workshopImg from "@/assets/about-workshop.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/products";

export default function About() {
  const { l } = useLanguage();

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      <Seo
        title={l(
          "About RK Stone Corporation Jaipur | Established 2009 | Founder Mr. Rajendra Saini",
          "आरके स्टोन कॉर्पोरेशन जयपुर के बारे में | स्थापना 2009 | संस्थापक श्री राजेंद्र सैनी"
        )}
        description={l(
          "Established in 2009 by Mr. Rajendra Saini, RK Stone Corporation is Jaipur's renowned Manufacturer and Supplier of handcrafted Sandstone Temples, Entry Gates, Dholpur Temples, CNC Jalis, and Fountains.",
          "2009 में श्री राजेंद्र सैनी द्वारा स्थापित, आरके स्टोन कॉर्पोरेशन जयपुर में सैंडस्टोन मंदिर, प्रवेश द्वार, धौलपुर मंदिर, सीएनसी जाली व फव्वारों का प्रमुख निर्माता व आपूर्तिकर्ता है।"
        )}
        keywords="rk stone corporation jaipur, rajendra saini jaipur, sandstone temple manufacturer, dholpur sandstone temple, sandstone entry gate, jaipur stone artisan"
      />

      {/* Editorial Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-stone-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${workshopImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          
          {/* Badge */}
          <Reveal direction="down">
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono tracking-widest uppercase mb-4">
              {l("ESTABLISHED IN 2009 • JAIPUR, RAJASTHAN", "स्थापना वर्ष 2009 • जयपुर, राजस्थान")}
            </span>
          </Reveal>

          {/* Heading */}
          <Reveal direction="down" duration={0.9}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal uppercase text-white tracking-wide leading-[1.12] mb-6">
              {l("TIMELESS DEVOTION & ARCHITECTURE,", "सच्चे पत्थरों में तराशी कला,")}{" "}
              <br className="hidden sm:inline" />
              <span className="text-accent font-serif italic normal-case font-normal">
                {l("Chiseled by Master Artisans", "आस्था व शिल्पकला का संगम")}
              </span>
            </h1>
          </Reveal>

          {/* Paragraph */}
          <Reveal direction="up" delay={0.15} duration={0.9}>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {l(
                "RK Stone Corporation, established in 2009 by Mr. Rajendra Saini, is a renowned Manufacturer and Supplier of premium sandstone products based in Rajasthan, India.",
                "श्री राजेंद्र सैनी द्वारा 2009 में स्थापित, आरके स्टोन कॉर्पोरेशन राजस्थान में प्रीमियम सैंडस्टोन उत्पादों का एक प्रतिष्ठित निर्माता व आपूर्तिकर्ता है।"
              )}
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.3} duration={0.9}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-stone-950 font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none shadow-gold cursor-pointer">
                  {l("START YOUR PROJECT", "नया प्रोजेक्ट शुरू करें")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href="https://maps.google.com/?q=RK+Stone+Corporation+Jaipur" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border border-white/30 text-white bg-white/5 hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold tracking-wider uppercase text-xs sm:text-sm px-7 py-6 rounded-none backdrop-blur-md transition-all cursor-pointer">
                  <MapPin className="mr-2 w-4 h-4 text-accent" />
                  {l("VISIT JAIPUR WORKSHOP", "जयपुर वर्कशॉप आएं")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Founding Narrative & Core Profile */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal direction="down">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-accent rounded-full shrink-0" />
                  <h2 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
                    {l("ABOUT RK STONE CORPORATION", "आरके स्टोन कॉर्पोरेशन का परिचय")}
                  </h2>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.15}>
                <p className="text-base sm:text-lg text-stone-700 font-light leading-relaxed">
                  {l(
                    "RK Stone Corporation, established in 2009, is a renowned Manufacturer and Supplier of a wide range of premium Sandstone Products in Rajasthan, India. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, and Dholpur Sandstone Temples that reflect timeless Indian architecture.",
                    "आरके स्टोन कॉर्पोरेशन, 2009 में स्थापित, राजस्थान में प्रीमियम सैंडस्टोन उत्पादों का एक प्रतिष्ठित निर्माता और आपूर्तिकर्ता है। कंपनी उत्कृष्ट सैंडस्टोन मंदिर, मंदिर प्रवेश द्वार और धौलपुर सैंडस्टोन मंदिर तराशने में माहिर है जो कालातीत भारतीय वास्तुकला को दर्शाते हैं।"
                  )}
                </p>
              </Reveal>

              <Reveal direction="left" delay={0.25}>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  {l(
                    "Its diverse product range includes Sandstone Grills, Lamps, Gazebos, Fountains, Garden Benches, Planters, and Decorative Sandstone Spheres. With a steadfast commitment to high standards of quality, precision craftsmanship, and aesthetic elegance, RK Stone Corporation serves as a trusted name for residential, commercial, and religious projects across India.",
                    "हमारी विविध उत्पाद श्रृंखला में सैंडस्टोन जाली/ग्रिल, लैंप, गज़ेबो/छतरियां, वाटर फाउंटेन, गार्डन बेंच, प्लांटर्स और नक्काशीदार स्टोन बॉल्स शामिल हैं। गुणवत्ता, सटीक शिल्पकला और सौंदर्य के प्रति अटूट प्रतिबद्धता के साथ, आरके स्टोन कॉर्पोरेशन पूरे भारत में आवासीय, व्यावसायिक और धार्मिक प्रोजेक्ट्स के लिए एक विश्वसनीय नाम है।"
                  )}
                </p>
              </Reveal>

              {/* Fast Stats Row */}
              <Reveal direction="up" delay={0.35}>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                  <div>
                    <div className="text-2xl sm:text-3xl font-heading font-medium text-stone-950">2009</div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-accent mt-0.5 font-semibold">
                      {l("Est. Year", "स्थापना वर्ष")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-heading font-medium text-stone-950">20+</div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-accent mt-0.5 font-semibold">
                      {l("Artisans & Staff", "कारीगर व स्टाफ")}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-heading font-medium text-stone-950">₹1-2 Cr</div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-accent mt-0.5 font-semibold">
                      {l("Turnover", "वार्षिक टर्नओवर")}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Photo Frame */}
            <Reveal direction="right" duration={0.9} className="lg:col-span-6">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 sm:-inset-4 rounded-2xl border-2 border-accent/40 translate-x-3 translate-y-3 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-950 aspect-[4/3] sm:aspect-[5/4] border border-stone-200">
                  <img
                    src={workshopImg}
                    alt="RK Stone Corporation Stone Workshop in Jaipur"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-body tracking-wide">
                    <div className="text-accent uppercase tracking-widest text-[10px] mb-1 font-mono font-semibold">
                      {l("WORKSHOP & MANUFACTURING YARD", "वर्कशॉप व निर्माण केंद्र")}
                    </div>
                    <div className="text-sm font-semibold">
                      {l("Front of Surya City, Paldi Meena, Agra Road, Jaipur, Rajasthan", "सूर्य सिटी के सामने, पालड़ी मीणा, आगरा रोड, जयपुर, राजस्थान")}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Official Corporate Credentials Table (From Client Documents) */}
      <section className="py-20 bg-stone-100/70 border-y border-stone-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Reveal direction="down" className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
              {l("COMPANY FACT SHEET & PROFILE", "कंपनी की आधिकारिक जानकारी")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal uppercase text-stone-950">
              {l("Official Business Credentials", "कंपनी का परिचय एवं विवरण")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
              <div className="divide-y divide-stone-200 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Nature of Business", "व्यवसाय का प्रकार")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0 font-medium">
                    {l("Manufacturer, Supplier", "निर्माता व आपूर्तिकर्ता (Manufacturer & Supplier)")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <User className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Name of Founder", "संस्थापक का नाम")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-900 font-semibold mt-1 sm:mt-0">
                    {l("Mr. Rajendra Saini", "श्री राजेंद्र सैनी")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Year of Establishment", "स्थापना वर्ष")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0">
                    2009
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Total Number of Employees", "कर्मचारियों की कुल संख्या")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0">
                    {l("20 Employees (Master Artisans & Staff)", "20 कर्मचारी (कुशल शिल्पकार व स्टाफ)")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Legal Status of Firm", "फर्म की कानूनी स्थिति")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0">
                    {l("Individual - Proprietor", "एकल स्वामित्व - प्रोपराइटरशिप (Individual - Proprietor)")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Annual Turnover", "वार्षिक टर्नओवर")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0">
                    {l("Rs. 1 - 2 Crore", "1 से 2 करोड़ रुपये")}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("Registered Location & Workshop", "वर्कशॉप व कार्यस्थल")}</span>
                  </div>
                  <div className="sm:col-span-2 text-stone-700 mt-1 sm:mt-0 leading-relaxed">
                    {l(
                      "Front of Surya City, Paldi Meena, Agra Road, Jaipur - 302031, Rajasthan, India",
                      "सूर्य सिटी के सामने, पालड़ी मीणा, आगरा रोड, जयपुर - 302031, राजस्थान, भारत"
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 hover:bg-stone-50 transition-colors">
                  <div className="font-semibold text-stone-950 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>{l("GSTIN Registration", "जीएसटी नंबर")}</span>
                  </div>
                  <div className="sm:col-span-2 font-mono text-stone-800 mt-1 sm:mt-0">
                    08CUUPS3588K1ZE
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Our Range (16 Categories Grid) */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="down" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
              {l("EXPLORE OUR COMPLETE RANGE", "हमारा संपूर्ण उत्पाद संग्रह")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-stone-950 tracking-wide leading-tight">
              {l("Handcrafted Architectural Stone Works", "हाथ से तराशे गए सैंडस्टोन उत्पाद")}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4 font-light leading-relaxed">
              {l(
                "From consecrated temples to monumental gates, 3D CNC grills, royal pavilions, and fountains, inspect all 16 specialized product disciplines crafted directly in our Jaipur workshop.",
                "भव्य मंदिरों से लेकर मुख्य द्वार तोरण, 3D सीएनसी जाली, शाही छतरियां व वाटर फाउंटेन तक — हमारी सभी 16 प्रमुख श्रेणियों का अवलोकन करें।"
              )}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <Reveal key={cat.id} direction="up" delay={0.05 * (idx % 6)}>
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:border-accent hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-950 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-medium text-sm sm:text-base text-stone-950 group-hover:text-accent transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <div className="text-xs font-body text-stone-500 mt-1 line-clamp-1">
                      {cat.hindi}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-accent font-semibold group-hover:translate-x-1 transition-transform">
                      <span>{l("View Products", "उत्पाद देखें")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Visit CTA */}
      <section className="py-20 md:py-28 bg-stone-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">

          <Reveal direction="down" duration={0.8}>
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
              {l("LIVE CARVING WORKSHOP", "सीधी वर्कशॉप विजिट")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-normal uppercase text-white tracking-wide leading-tight mb-6">
              {l("VISIT OUR WORKSHOP IN JAIPUR", "जयपुर में हमारी वर्कशॉप देखने आएं")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.8}>
            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {l(
                "Meet Founder Mr. Rajendra Saini and our 20+ master artisans carving pillars and shikhars in real time. Inspect natural stone blocks, feel the textures, and consult directly for your project.",
                "संस्थापक श्री राजेंद्र सैनी और हमारे 20+ कुशल कारीगरों से लाइव मिलें। मकराना मार्बल व धौलपुर सैंडस्टोन के असली ब्लॉक देखें और अपनी जरूरत के अनुसार सलाह लें।"
              )}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-stone-950 font-bold tracking-wider uppercase text-xs sm:text-sm px-8 py-6 rounded-none cursor-pointer">
                  {l("SCHEDULE WORKSHOP VISIT", "वर्कशॉप विजिट प्लान करें")}
                </Button>
              </Link>
              <a href="tel:+919414784562">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:text-white hover:border-white hover:bg-white/10 uppercase font-semibold text-xs sm:text-sm px-8 py-6 rounded-none transition-all cursor-pointer">
                  {l("CALL: +91 94147 84562", "कॉल करें: +91 94147 84562")}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
