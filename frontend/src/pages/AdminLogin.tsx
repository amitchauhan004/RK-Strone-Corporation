import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  KeyRound, 
  HelpCircle,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import { API_URL } from "@/config/api";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, {
        username: username.trim(),
        password: password.trim(),
      });
      sessionStorage.setItem("adminToken", res.data.token);
      if (res.data.username) {
        sessionStorage.setItem("adminUsername", res.data.username);
      }
      toast({ 
        title: "Access Granted", 
        description: `Welcome back, ${res.data.username || "Admin Master"}. Initializing console...` 
      });
      // Redirect to Admin Products Dashboard
      window.location.replace("/admin/products");
    } catch (err: any) {
      const message = err?.response?.data?.error || "Invalid username or password. Please try again.";
      toast({ title: "Authentication Failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-stone-950 text-white px-4 py-12 overflow-hidden selection:bg-accent selection:text-stone-950">
      
      {/* Ambient Architectural Stone Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(218,183,114,0.18),rgba(10,10,10,0.95))]" />
      
      {/* Subtle Geometric Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Floating Back to Site Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-[430px] z-10 space-y-6">
        
        {/* Brand Identity Crest */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-accent via-amber-200 to-amber-600 shadow-[0_0_40px_rgba(218,183,114,0.25)] mx-auto">
              <img
                src={logo}
                alt="RK Stone Corporation"
                className="w-full h-full rounded-full object-cover bg-stone-900"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#161616] border border-accent/60 flex items-center justify-center text-accent shadow-sm">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-accent font-semibold">
              JAIPUR • HERITAGE ARCHITECTURAL CRAFT
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-normal uppercase text-white tracking-wider mt-1">
              RK STONE CORPORATION
            </h1>
            <p className="text-xs text-stone-400 font-light mt-1">
              Executive Management &amp; Content Control Studio
            </p>
          </div>
        </div>

        {/* Login Glass Card */}
        <div className="bg-[#141414]/90 backdrop-blur-xl border border-accent/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-7 sm:p-9 relative">
          
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500">
                  <User className="w-4 h-4" />
                </div>
                <Input
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="pl-10 h-11 bg-black/60 border-white/15 text-white text-xs font-mono rounded-none focus:border-accent focus:ring-0 tracking-wide placeholder:text-stone-600 transition-colors"
                />
              </div>
            </div>

            {/* Password Input with Show/Hide */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-300 block">
                  Secure Password
                </label>
                <span className="text-[10px] font-mono text-stone-500">
                  Case-Sensitive
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="pl-10 pr-10 h-11 bg-black/60 border-white/15 text-white text-xs font-mono rounded-none focus:border-accent focus:ring-0 tracking-wide placeholder:text-stone-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-accent transition-colors p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-stone-950 font-heading font-semibold uppercase text-xs sm:text-sm tracking-[0.16em] rounded-none cursor-pointer shadow-gold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    VERIFYING CREDENTIALS...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    AUTHENTICATE &amp; ENTER
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Emergency Access & Help Dropdown */}
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="text-xs font-mono text-stone-400 hover:text-accent transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need Help or Forgot Credentials?</span>
          </button>

          {showHelp && (
            <div className="p-4 bg-[#141414] border border-white/10 text-left text-xs font-mono space-y-2 animate-in fade-in duration-200">
              <div className="text-accent font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>Technical Architecture &amp; System Administration</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-white font-semibold text-xs font-sans">
                  Amit Chauhan
                </p>
                <p className="text-accent text-[11px] font-mono">
                  Founder &amp; CEO, ZAMYT
                </p>
                <p className="text-stone-400 text-[10px] font-sans leading-relaxed">
                  Principal Full-Stack Software Architect &amp; Enterprise IT Engineering Consultant
                </p>
              </div>
              <div className="pt-1.5 space-y-1 text-stone-300 text-[11px] border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-accent" />
                  <a href="tel:+918058637318" className="hover:text-white font-mono">+91 8058637318</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-accent" />
                  <a href="mailto:amitchauhan@zamyt.in" className="hover:text-white font-mono">amitchauhan@zamyt.in</a>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer Copyright */}
      <div className="mt-8 text-center text-[10px] font-mono text-stone-600">
        &copy; {new Date().getFullYear()} RK STONE CORPORATION • JAIPUR, RAJASTHAN. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
};

export default AdminLogin;
