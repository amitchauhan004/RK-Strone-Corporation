import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      sessionStorage.setItem("adminToken", res.data.token);
      toast({ title: "Logged in", description: "Welcome, admin." });
      // Use hard redirect to ensure route guard re-evaluates immediately
      window.location.replace('/admin/products');
    } catch (err: any) {
      const message = err?.response?.data?.error || "Login failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#f8f9fa] px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black,transparent)] pointer-events-none" />
      
      <div className="w-full max-w-[400px] z-10">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="RK Stone Corporation"
            className="mx-auto h-24 w-auto mb-6"
          />
          <h2 className="text-3xl font-heading font-bold tracking-tight text-gray-900 mb-2">
            Admin Portal
          </h2>
          <p className="text-sm text-muted-foreground">
            Login To Manage Products And Settings
          </p>
        </div>
        
        <Card className="p-8 shadow-xl bg-white/80 backdrop-blur border border-border/5 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/90">Username</label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-11 px-4 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/90">Password</label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-11 px-4 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-accent/30"
              />
            </div>
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-11 bg-[#DAB772] hover:bg-[#C7A665] text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Log In"
                )}
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={(e) => {
              const details = e.currentTarget.nextElementSibling;
              if (details) {
                details.classList.toggle('hidden');
              }
            }}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            Need Help? Contact System Administrator
          </button>
          <div className="hidden mt-4 text-sm space-y-1 bg-muted/30 p-4 rounded-lg">
            <p className="font-medium text-foreground">Amit Chauhan (Founder & CEO, ZAMYT)</p>
            <p className="text-muted-foreground">
              <a href="tel:+918058637318" className="hover:text-accent">+91 8058637318</a>
            </p>
            <p className="text-muted-foreground">
              <a href="mailto:amitchauhan@zamyt.in" className="hover:text-accent">amitchauhan@zamyt.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


