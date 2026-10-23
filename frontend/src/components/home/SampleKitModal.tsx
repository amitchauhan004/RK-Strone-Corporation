import { useState } from "react";
import { Package, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { API_URL } from "@/config/api";

export default function SampleKitModal({ isOpen, onClose }: SampleKitModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("Architect / Interior Designer");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedStones, setSelectedStones] = useState<string[]>([
    "Gwalior White Mint",
    "Dhaulpur Beige Sandstone",
    "Bansi Paharpur Pink",
  ]);
  const [loading, setLoading] = useState(false);

  const toggleStone = (stone: string) => {
    setSelectedStones((prev) =>
      prev.includes(stone) ? prev.filter((s) => s !== stone) : [...prev, stone]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !deliveryAddress) {
      toast.error("Please fill in your name, phone and delivery address");
      return;
    }

    setLoading(true);
    try {
      const messageContent = `[PHYSICAL STONE SPECIMEN BOX REQUEST]
Client Profession: ${profession}
Stones Requested: ${selectedStones.join(", ")}
Courier Address: ${deliveryAddress}`;

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          projectType: "Stone Sample Kit Request",
          stonePreference: selectedStones.join(", "),
          source: "Sample Kit Request Modal",
          address: deliveryAddress,
          message: messageContent,
        }),
      });

      if (res.ok) {
        toast.success("Sample Box request confirmed! Our courier team will dispatch tracking within 24 hours.");
        onClose();
      } else {
        toast.error("Failed to submit request. Please WhatsApp us directly.");
      }
    } catch {
      toast.error("Network issue. Please WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white border border-stone-300 p-6 sm:p-8 rounded-none">
        <DialogHeader>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            <Package className="w-3.5 h-3.5" />
            DIRECT COURIER DISPATCH • पत्थर के सैंपल्स
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-heading font-normal uppercase text-stone-950 tracking-wide">
            REQUEST STONE SPECIMEN BOX
          </DialogTitle>
          <DialogDescription className="text-xs text-stone-600 font-light">
            Architects, designers aur luxury villa clients ke liye real stone sample tiles ka box aapke address par dispatch kiya jata hai.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Stones Choice */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-stone-900">
              Select Sample Stones (Up to 4)
            </Label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                "Gwalior White Mint",
                "Dhaulpur Beige Sandstone",
                "Bansi Paharpur Pink",
                "Jodhpur Red Sandstone",
                "Makrana White Marble",
              ].map((st) => (
                <label
                  key={st}
                  className={`flex items-center gap-2 p-2.5 border cursor-pointer transition-colors ${
                    selectedStones.includes(st)
                      ? "bg-accent/15 border-accent text-stone-950 font-semibold"
                      : "bg-stone-50 border-stone-200 text-stone-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedStones.includes(st)}
                    onChange={() => toggleStone(st)}
                    className="w-3.5 h-3.5 accent-stone-950"
                  />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-stone-900">Name *</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ar. Vikram Singhania"
                className="rounded-none border-stone-300"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-stone-900">Phone / WhatsApp *</Label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="rounded-none border-stone-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-stone-900">Profession / Requirement</Label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full h-10 px-3 border border-stone-300 bg-white text-xs font-medium rounded-none"
            >
              <option value="Architect / Interior Designer">Architect / Interior Designer</option>
              <option value="Luxury Homeowner / Villa Builder">Luxury Homeowner / Villa Builder</option>
              <option value="Temple Trust Committee">Temple Trust Committee</option>
              <option value="Landscape Designer / Contractor">Landscape Designer / Contractor</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-stone-900">Courier Shipping Address *</Label>
            <Textarea
              required
              rows={2}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Studio/Office/Home complete address with Pincode..."
              className="rounded-none border-stone-300 text-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs tracking-wider py-6 rounded-none cursor-pointer shadow-md"
          >
            {loading ? "PROCESSING..." : "DISPATCH MY SAMPLE SPECIMEN BOX"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
