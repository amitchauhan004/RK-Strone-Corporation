import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Home,
  ShoppingBag,
  Info,
  Building2,
  Castle,
  Columns,
  LayoutGrid,
  Waves,
  Mountain,
  Gem,
  LandPlot,
  Building,
  Hammer,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-primary">
              RK Stone Corporation
            </h3>
            <p className="text-sm text-secondary-foreground/80">
              Elevating Spaces with Natural Stone Artistry Since 1985
            </p>
            <p className="text-sm text-secondary-foreground/80">
              Rajasthan's premier destination for exquisite marble temples, 
              intricate stone artistry, and architectural marvels. 
              Blending traditional craftsmanship with modern precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                to="/shop"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop
              </Link>
              <Link
                to="/about"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
              <Link
                to="/stone-temple-jaipur"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Stone Temple Jaipur
              </Link>
              <Link
                to="/cnc-jali-jaipur"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                CNC Jali Jaipur
              </Link>
              <Link
                to="/sandstone-supplier-jaipur"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Mountain className="w-4 h-4" />
                Sandstone Supplier Jaipur
              </Link>
              <Link
                to="/contact"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Our Products</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/shop?category=stone-temple"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Stone Temple
              </Link>
              <Link
                to="/shop?category=heritage-haveli"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Castle className="w-4 h-4" />
                Heritage Haveli
              </Link>
              <Link
                to="/shop?category=chhatri"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Columns className="w-4 h-4" />
                Chhatri
              </Link>
              <Link
                to="/shop?category=wall-panel"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Wall Panel
              </Link>
              <Link
                to="/shop?category=garden-fountain"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Waves className="w-4 h-4" />
                Garden Fountain
              </Link>
              <Link
                to="/shop?category=red-stone"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Mountain className="w-4 h-4" />
                Red Stone
              </Link>
              <Link
                to="/shop?category=pink-sand-stone"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Gem className="w-4 h-4" />
                Pink Sand Stone
              </Link>
              <Link
                to="/shop?category=jodhpur-stone"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <LandPlot className="w-4 h-4" />
                Jodhpur Stone
              </Link>
              <Link
                to="/shop?category=gwalior-stone"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Building className="w-4 h-4" />
                Gwalior Stone
              </Link>
              <Link
                to="/shop?category=stone-carving"
                className="text-sm text-secondary-foreground/80 hover:text-accent transition-smooth flex items-center gap-2"
              >
                <Hammer className="w-4 h-4" />
                Stone Carving
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+919414784562"
                className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-accent transition-smooth"
              >
                <Phone className="w-4 h-4" />
                <span>+91 94147 84562</span>
              </a>
              <a
                href="mailto:contact@rkstonecorporation.com"
                className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-accent transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>contact@rkstonecorporation.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  RK Stone Corporation, Front of Surya City, Paldi Meena, Agra
                  Road Jaipur 302031, Rajasthan
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-secondary-foreground/80 hover:text-accent transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-secondary-foreground/60">
            © 1985 RK Stone Corporation. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/terms" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">Terms &amp; Conditions</Link>
            <span className="text-secondary-foreground/40">|</span>
            <Link to="/privacy" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
