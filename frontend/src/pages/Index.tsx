import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { products, categories, Category } from "@/data/products";
import Seo from "@/components/Seo";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const { addToCart } = useCart();
  const [testIndex, setTestIndex] = useState(0);
  const autoplayInterval = 5000; // ms
  const autoplayRef = useRef<number | null>(null);
  const pauseRef = useRef(false);

  // Fetch real products from backend for correct product links
  const [backendProducts, setBackendProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setBackendProducts(Array.isArray(data) ? data : []))
      .catch(() => setBackendProducts([]));
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Hand-selected stones with superior durability and finish",
    },
    {
      icon: Award,
      title: "Trusted Supplier",
      description: "Serving architects and homeowners since 2010",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Professional consultation for your perfect stone",
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Fast and secure delivery across Rajasthan",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Interior Designer",
      content:
        "The quality of stone we received was exceptional. RK Stone Corporation has become our go to supplier for all premium stone projects.",
    },
    {
      name: "Priya Patel",
      role: "Homeowner",
      content:
        "Professional service and beautiful granite countertops. The team helped us choose the perfect stone for our kitchen renovation.",
    },
    {
      name: "Amit Chauhan",
      role: "Architect",
      content:
        "Reliable, high-quality materials with excellent customer service. We've completed multiple projects with their stones.",
    },
    {
      name: "Neha Mehta",
      role: "Landscape Designer",
      content:
        "RK Stone Corporation supplied stunning sandstone for our outdoor project. The finishing and texture truly elevated the entire garden space.",
    },
    {
      name: "Vikas Jain",
      role: "Builder & Contractor",
      content:
        "Timely delivery, transparent pricing, and great stone variety. Their marble and granite selection is among the best in Jaipur.",
    },
    {
      name: "Sneha Kapoor",
      role: "Hotel Owner",
      content:
        "We used their marble for our hotel lobby and staircase the final result looks luxurious and durable. Highly recommended for premium spaces.",
    },
  ];

  // Ensure index is valid when testimonials length changes
  useEffect(() => {
    if (testimonials.length <= 3) {
      setTestIndex(0);
    } else {
      setTestIndex((t) => t % testimonials.length);
    }
  }, [testimonials.length]);

  // Autoplay with pause-on-hover
  useEffect(() => {
    function start() {
      stop();
      autoplayRef.current = window.setInterval(() => {
        if (!pauseRef.current) {
          setTestIndex((t) => (t + 1) % testimonials.length);
        }
      }, autoplayInterval) as unknown as number;
    }
    function stop() {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current as unknown as number);
        autoplayRef.current = null;
      }
    }
    if (testimonials.length > 3) start();
    return () => stop();
  }, [testimonials.length]);

  const categoryList: Category[] = categories as Category[];
  const featuredCategoryIds = [
    "stone-temple",
    "heritage-haveli",
    "animals",
    "gate",
  ];
  const featuredCategories = categoryList.filter((c) =>
    featuredCategoryIds.includes(c.id)
  );

  return (
    <div className="min-h-screen">
      <Seo
        title="RK Stone Corporation | Custom Stone Temples, Nameplates & CNC Jalis in Jaipur"
        description="Buy premium stone temples, nameplates, CNC jalis, and natural stones crafted in Jaipur. Trusted supplier for architects and homeowners."
        image={heroImage}
        type="website"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            logo:
              typeof window !== "undefined"
                ? `${window.location.origin}/favicon.png`
                : "https://rkstonecorporation.com/favicon.png",
            sameAs: [],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                typeof window !== "undefined"
                  ? `${window.location.origin}/shop?query={search_term_string}`
                  : "https://rkstonecorporation.com/shop?query={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "RK Stone Corporation",
            url:
              typeof window !== "undefined"
                ? window.location.origin
                : "https://rkstonecorporation.com",
            telephone: "+91 94147 84562",
            email: "contact@rkstonecorporation.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Front of Surya City, Paldi Meena, Agra Road",
              addressLocality: "Jaipur",
              addressRegion: "Rajasthan",
              postalCode: "302031",
              addressCountry: "IN",
            },
            hasMap:
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 26.88321687556189,
              longitude: 75.90287731088574,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
            ],
            priceRange: "₹₹",
            sameAs: [
              "https://www.google.com/maps/place/R+K+Stone+Carporation/",
            ],
            areaServed: ["Jaipur", "Rajasthan", "India"],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item:
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://rkstonecorporation.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collections",
                item:
                  typeof window !== "undefined"
                    ? `${window.location.origin}/shop`
                    : "https://rkstonecorporation.com/shop",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: [
              "Home",
              "Shop",
              "Stone Temple Jaipur",
              "CNC Jali Jaipur",
              "Sandstone Supplier Jaipur",
              "About",
              "Contact",
            ],
            url: [
              typeof window !== "undefined"
                ? `${window.location.origin}/`
                : "https://rkstonecorporation.com/",
              typeof window !== "undefined"
                ? `${window.location.origin}/shop`
                : "https://rkstonecorporation.com/shop",
              typeof window !== "undefined"
                ? `${window.location.origin}/stone-temple-jaipur`
                : "https://rkstonecorporation.com/stone-temple-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/cnc-jali-jaipur`
                : "https://rkstonecorporation.com/cnc-jali-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/sandstone-supplier-jaipur`
                : "https://rkstonecorporation.com/sandstone-supplier-jaipur",
              typeof window !== "undefined"
                ? `${window.location.origin}/about`
                : "https://rkstonecorporation.com/about",
              typeof window !== "undefined"
                ? `${window.location.origin}/contact`
                : "https://rkstonecorporation.com/contact",
            ],
          },
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
            Buy Custom Stone Temples, Nameplates & CNC Jalis Online from Jaipur
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Discover timeless craftsmanship with our custom stone temples,
            nameplates, and designer jalis crafted with precision and heritage
            artistry from Jaipur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-white/95 text-accent shadow-md border border-white/30 hover:bg-white"
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Summary Section */}
      <section className="py-20 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Premium Stone Temples, Havelis & Handcrafted Artistry
              </h2>
              <p className="text-lg text-muted-foreground">
                Authentic Rajasthani Stone Craftsmanship Since Decades
              </p>
            </div>

            {/* Main Summary Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  RK Stone Corporation is Jaipur's finest manufacturer of{" "}
                  <span className="font-semibold text-foreground">
                    handcrafted stone temples, heritage havelis, and authentic Rajasthani stone artistry
                  </span>
                  . Specializing in premium{" "}
                  <span className="font-semibold text-foreground">
                    Makrana marble, Dholpur stone, Gwalior stone, and colorful sandstones
                  </span>
                  , we create timeless pieces that embody tradition and devotion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our artisans expertly craft{" "}
                  <span className="font-semibold text-foreground">
                    stone temples, garden fountains, heritage elements, stone sculptures, and decorative wall panels
                  </span>
                  . Each creation combines traditional heritage techniques with precision craftsmanship, resulting in masterpieces that transform spaces and inspire devotion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From residential prayer rooms and garden embellishments to architectural installations and heritage preservation, we deliver{" "}
                  <span className="font-semibold text-foreground">
                    Dholpur stone slabs, Gwalior stone products, pink and red sandstone
                  </span>
                  {" "}along with custom-designed stone works for architects, builders, and homeowners across Rajasthan and beyond.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-accent mb-4">
                    Our Specialties
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>
                        <strong>Stone Temples:</strong> Custom-designed mandirs for homes and institutions
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>
                        <strong>Heritage Havelis:</strong> Authentic Rajasthani architectural elements
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>
                        <strong>Garden Sculptures:</strong> Fountains, animals, and decorative pieces
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>
                        <strong>Natural Stones:</strong> Marble, sandstone, and premium stone slabs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stone Varieties & Expertise */}

            {/* Stone Varieties & Expertise */}
            <div className="bg-muted/30 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
                Our Stone Collections
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">Makrana Marble</h4>
                  <p className="text-sm text-muted-foreground">
                    Premium white marble for temples and interiors
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">
                    Dholpur Stone
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Authentic heritage sandstone for traditional designs
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">
                    Gwalior Stone
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Durable pink and red colored natural stone
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">
                    Hand-Carved Works
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Temples, gates, fountains, and sculptures
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-smooth">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
              15+
                </p>
                <p className="text-sm text-muted-foreground">
              Years of Craftsmanship Excellence
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-smooth">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
              500+
                </p>
                <p className="text-sm text-muted-foreground">
              Happy Clients & Projects Completed
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-smooth">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
              Pan-India
                </p>
                <p className="text-sm text-muted-foreground">
              Delivery & Installation Services
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-smooth">
                <p className="text-3xl md:text-4xl font-heading font-bold text-accent mb-2">
              100%
                </p>
                <p className="text-sm text-muted-foreground">
              Customer Satisfaction Guarantee
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold text-lg px-8 py-6"
                >
                    Get Your Custom Order Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Search */}
      <section className="py-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <form action="/shop" method="get" className="relative">
            <input
              name="query"
              aria-label="Search stones, temples, jalis"
              placeholder="Search stones, temples, jalis..."
              className="w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground"
            >
              Search
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link
              to="/shop?category=stone-temple"
              className="px-3 py-1 rounded-full bg-muted hover:bg-muted/70"
            >
              Stone Temple
            </Link>
            <Link
              to="/cnc-jali-jaipur"
              className="px-3 py-1 rounded-full bg-muted hover:bg-muted/70"
            >
              CNC Jali
            </Link>
            <Link
              to="/sandstone-supplier-jaipur"
              className="px-3 py-1 rounded-full bg-muted hover:bg-muted/70"
            >
              Sandstone
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Featured Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse Our Curated Collection of Premium Natural Stones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-medium transition-smooth">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.name} stone category from RK Stone Corporation Jaipur`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-heading font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked Premium Stones From Our Exclusive Collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.slice(0, 4).map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-medium transition-smooth group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} premium stone product`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <h3 className="text-2xl font-heading font-bold mb-2">
              Best Sellers
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Customer-favorite stones chosen for looks and longevity.
            </p>
            <div className="space-y-3">
              {(backendProducts.length
                ? backendProducts.slice(0, 3)
                : products.slice(0, 3)
              ).map((p: any) => (
                <Link
                  key={p._id || p.id}
                  to={
                    p._id
                      ? `/product/${p._id}`
                      : `/shop?query=${encodeURIComponent(p.name)}`
                  }
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={
                      p.image?.startsWith?.("/uploads/")
                        ? `http://localhost:5000${p.image}`
                        : p.image
                    }
                    alt={p.name}
                    className="w-14 h-14 rounded object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="text-sm font-medium group-hover:text-accent transition-smooth">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{p.price?.toLocaleString?.() ?? p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-2xl font-heading font-bold mb-2">
              New Arrivals
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Fresh designs and recently added stone works.
            </p>
            <div className="space-y-3">
              {(backendProducts.length
                ? backendProducts.slice(1, 4)
                : products.slice(1, 4)
              ).map((p: any) => (
                <Link
                  key={p._id || p.id}
                  to={
                    p._id
                      ? `/product/${p._id}`
                      : `/shop?query=${encodeURIComponent(p.name)}`
                  }
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={
                      p.image?.startsWith?.("/uploads/")
                        ? `http://localhost:5000${p.image}`
                        : p.image
                    }
                    alt={p.name}
                    className="w-14 h-14 rounded object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="text-sm font-medium group-hover:text-accent transition-smooth">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{p.price?.toLocaleString?.() ?? p.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-2xl font-heading font-bold mb-2">
              Under ₹15,000
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Budget-friendly pieces without compromising craftsmanship.
            </p>
            <div className="space-y-3">
              {(backendProducts.length
                ? backendProducts.filter((p: any) => p.price < 15000)
                : products.filter((p) => p.price < 15000)
              )
                .slice(0, 3)
                .map((p: any) => (
                  <Link
                    key={p._id || p.id}
                    to={
                      p._id
                        ? `/product/${p._id}`
                        : `/shop?query=${encodeURIComponent(p.name)}`
                    }
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={
                        p.image?.startsWith?.("/uploads/")
                          ? `http://localhost:5000${p.image}`
                          : p.image
                      }
                      alt={p.name}
                      className="w-14 h-14 rounded object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="text-sm font-medium group-hover:text-accent transition-smooth">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{p.price?.toLocaleString?.() ?? p.price}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Since 1985</p>
              <p>Decades of Craft</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Pan-India Delivery
              </p>
              <p>Safe Packaging</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Custom Sizes</p>
              <p>Design to Install</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Trusted by Designers
              </p>
              <p>Architect Preferred</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Blocks */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-heading font-semibold mb-2">
              Stone Temple Jaipur
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Custom marble and sandstone mandirs by skilled Jaipur artisans.
            </p>
            <Link to="/stone-temple-jaipur" className="text-accent">
              Learn more →
            </Link>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-heading font-semibold mb-2">
              CNC Jali Jaipur
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Designer stone jalis for facades, railings, and partitions.
            </p>
            <Link to="/cnc-jali-jaipur" className="text-accent">
              Learn more →
            </Link>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-heading font-semibold mb-2">
              Sandstone Supplier Jaipur
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Dholpur, Gwalior, and Jodhpur sandstone for cladding and paving.
            </p>
            <Link to="/sandstone-supplier-jaipur" className="text-accent">
              Learn more →
            </Link>
          </Card>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
            FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Do you deliver and install outside Jaipur?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, we ship pan-India with reinforced packaging and offer
                on-site installation for select projects.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Can I order custom sizes and designs?
              </h3>
              <p className="text-sm text-muted-foreground">
                Absolutely. Share drawings or dimensions; we provide previews
                before production.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                What is the usual lead time?
              </h3>
              <p className="text-sm text-muted-foreground">
                Small items: 7–10 days, custom temples/jalis: 2–6 weeks
                depending on complexity.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Do you assist with stone selection?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, our team recommends the right stone, finish, and thickness
                for your use-case.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Why Choose RK Stone Corporation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your Trusted Partner For Premium Stone Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-medium transition-smooth animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted By Architects, Designers, And Homeowners Across Rajasthan
            </p>
          </div>

          <div className="relative">
            {/* Prev/Next buttons - hide if testimonials length <= visible */}
            {testimonials.length > 3 && (
              <>
                <button
                  aria-label="Previous testimonials"
                  onClick={() =>
                    setTestIndex(
                      (t) => (t - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-md ml-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next testimonials"
                  onClick={() =>
                    setTestIndex((t) => (t + 1) % testimonials.length)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-md mr-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              onMouseEnter={() => {
                if (pauseRef.current !== undefined) pauseRef.current = true;
              }}
              onMouseLeave={() => {
                if (pauseRef.current !== undefined) pauseRef.current = false;
              }}
            >
              {(() => {
                const visible = Math.min(3, testimonials.length);
                const items = Array.from({ length: visible }).map((_, i) => {
                  const idx = (testIndex + i) % testimonials.length;
                  const testimonial = testimonials[idx];
                  return (
                    <Card
                      key={idx}
                      className="p-8 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="mb-4">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, s) => (
                            <svg
                              key={s}
                              className="w-5 h-5 fill-accent"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-foreground mb-4 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </Card>
                  );
                });
                return items;
              })()}
            </div>
          </div>
        </div>
      </section>
      <MobileStickyCTA />
    </div>
  );
};

export default Index;
