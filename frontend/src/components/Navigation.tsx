import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    // { name: "Stone Temple", path: "/stone-temple-jaipur" },
    // { name: "CNC Jali", path: "/cnc-jali-jaipur" },
    // { name: "Sandstone Supplier", path: "/sandstone-supplier-jaipur" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-medium"
          : "bg-card md:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-smooth hover:opacity-80"
          >
            <img
              src={logo}
              alt="RK Stone Corporation Logo"
              className="h-10 w-10 object-cover rounded-full shadow"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-heading font-bold text-secondary">
                RK Stone Corporation
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">
                GSTIN : 08CUUPS3588K1ZE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-smooth hover:text-accent ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919414784562"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-smooth"
            >
              <Phone className="w-4 h-4" />
              <span>+91 94147 84562</span>
            </a>

            <Link to="/cart" className="relative">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-smooth hover:text-accent px-4 py-2 ${
                    location.pathname === link.path
                      ? "text-accent bg-accent/10 rounded-lg"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+919414784562"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-smooth px-4 py-2"
              >
                <Phone className="w-4 h-4" />
                <span>+91 94147 84562</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
