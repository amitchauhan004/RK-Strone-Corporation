import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
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

interface DrawingUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCraft?: string;
}

import { API_URL } from "@/config/api";

export default function DrawingUploadModal({ isOpen, onClose, defaultCraft }: DrawingUploadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stone, setStone] = useState("Dhaulpur Beige Sandstone");
  const [craft, setCraft] = useState(defaultCraft || "Stone Temple / Mandir");
  const [dimensions, setDimensions] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; size: string; isImage: boolean; previewUrl?: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const combined = [...selectedFiles, ...incoming].slice(0, 5);
    setSelectedFiles(combined);

    const previews = combined.map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      isImage: f.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name),
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined
    }));
    setFilePreviews(previews);
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please enter your name and phone number");
      return;
    }

    setSubmitting(true);
    try {
      let uploadedAttachments: { url: string; filename: string; fileType: string; size: number }[] = [];
      let uploadedPhotos: string[] = [];

      if (selectedFiles.length > 0) {
        try {
          const formData = new FormData();
          selectedFiles.forEach((f) => formData.append("files", f));
          const uploadRes = await fetch(`${API_URL}/api/upload-attachment`, {
            method: "POST",
            body: formData
          });
          if (uploadRes.ok) {
            const upJson = await uploadRes.json();
            if (upJson.files && Array.isArray(upJson.files)) {
              uploadedAttachments = upJson.files;
              uploadedPhotos = upJson.files
                .filter((f: any) => f.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.url))
                .map((f: any) => f.url);
            }
          }
        } catch (upErr) {
          console.warn("File upload error:", upErr);
        }
      }

      const messageContent = `[CUSTOM DRAWING / PROJECT INQUIRY]
Craft Requirement: ${craft}
Stone Preference: ${stone}
Dimensions: ${dimensions || "To be discussed"}
Notes: ${notes || "Customer attached drawings/photos for review"}`;

      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          projectType: craft,
          stonePreference: stone,
          source: "Drawing / CAD Upload Modal",
          dimensions: dimensions || "Custom Dimensions",
          message: messageContent,
          attachments: uploadedAttachments,
          photos: uploadedPhotos
        }),
      });

      if (res.ok) {
        toast.success("Inquiry & design files received! Our senior stone draftsman will contact you within 2 hours.");
        setSelectedFiles([]);
        setFilePreviews([]);
        onClose();
      } else {
        toast.error("Could not submit. Please connect directly via WhatsApp.");
      }
    } catch {
      toast.error("Network issue. Please connect directly via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = `Hi RK Stone Corporation,
I have a custom stone project requirement:
- Craft: ${craft}
- Stone: ${stone}
- Approx Dimensions: ${dimensions || "Not specified"}
- Name: ${name || "Client"}
I want to share my drawing/photo for quotation.`;
    window.open(`https://wa.me/919414784562?text=${encodeURIComponent(text)}`, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white border border-stone-300 p-6 sm:p-8 rounded-none">
        <DialogHeader>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            DIRECT JAIPUR WORKSHOP ESTIMATE
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-heading font-normal uppercase text-stone-950 tracking-wide">
            SHARE YOUR DESIGN OR DRAWING
          </DialogTitle>
          <DialogDescription className="text-xs text-stone-600 font-light">
            Apna rough sketch, CAD drawing ya photo details share karein. Hamare senior Sompura karigar aur draftsmen 2 ghante me quotation denge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-stone-900">Your Name *</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-stone-900">Craft Type</Label>
              <select
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
                className="w-full h-10 px-3 border border-stone-300 bg-white text-xs font-medium rounded-none"
              >
                <option value="Stone Temple / Mandir">Stone Temple / Mandir</option>
                <option value="Stone Chhatri / Gazebo">Stone Chhatri / Gazebo</option>
                <option value="3D CNC Jali Screen">3D CNC Jali Screen</option>
                <option value="Rajasthani Jharokha">Rajasthani Jharokha</option>
                <option value="Haveli Facade & Pillars">Haveli Facade & Pillars</option>
                <option value="Courtyard Water Fountain">Courtyard Water Fountain</option>
                <option value="Gate Toran & Entrance Arch">Gate Toran & Entrance Arch</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-stone-900">Stone Preference</Label>
              <select
                value={stone}
                onChange={(e) => setStone(e.target.value)}
                className="w-full h-10 px-3 border border-stone-300 bg-white text-xs font-medium rounded-none"
              >
                <option value="Gwalior White Mint Stone">Gwalior White Mint Stone</option>
                <option value="Dhaulpur Beige Sandstone">Dhaulpur Beige Sandstone</option>
                <option value="Bansi Paharpur Pink Stone">Bansi Paharpur Pink Stone</option>
                <option value="Jodhpur Red Sandstone">Jodhpur Red Sandstone</option>
                <option value="Makrana Pure White Marble">Makrana Pure White Marble</option>
                <option value="Need Expert Recommendation">Need Expert Recommendation</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-stone-900">Approx Dimensions / Site Size</Label>
            <Input
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. 12ft Width x 10ft Height x 3ft Depth"
              className="rounded-none border-stone-300"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-stone-900">Project Details / Message</Label>
            <Textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your design, special motifs, or questions..."
              className="rounded-none border-stone-300 text-xs"
            />
          </div>

          {/* Attach Photos / Drawings */}
          <div className="p-3 bg-stone-50 border border-dashed border-stone-300 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-stone-800" />
                <div>
                  <div className="text-[11px] font-bold uppercase text-stone-900">
                    Attach Photo, Sketch or CAD (Optional)
                  </div>
                  <div className="text-[10px] text-stone-500">
                    PNG, JPG, PDF, DWG up to 15MB
                  </div>
                </div>
              </div>
              <label className="bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold uppercase px-3 py-1.5 cursor-pointer inline-flex items-center gap-1.5">
                <UploadCloud className="w-3 h-3 text-accent" />
                Choose File
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.dwg,.dxf,.zip"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Previews */}
            {filePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                {filePreviews.map((item, idx) => (
                  <div key={idx} className="relative group p-1.5 bg-white border border-stone-300 shadow-xs flex flex-col items-center text-center">
                    {item.isImage && item.previewUrl ? (
                      <img src={item.previewUrl} alt={item.name} className="w-full h-14 object-cover mb-1 border border-stone-200" />
                    ) : (
                      <div className="w-full h-14 bg-stone-100 flex flex-col items-center justify-center text-stone-600 mb-1">
                        <FileText className="w-5 h-5 text-stone-400" />
                      </div>
                    )}
                    <span className="text-[10px] font-medium text-stone-900 truncate w-full" title={item.name}>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-0.5 shadow-sm cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-stone-950 hover:bg-stone-800 text-white font-bold uppercase text-xs tracking-wider py-5 rounded-none cursor-pointer"
            >
              {submitting ? "SUBMITTING..." : "SUBMIT FOR QUOTATION"}
            </Button>

            <Button
              type="button"
              onClick={handleDirectWhatsApp}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold uppercase text-xs tracking-wider py-5 rounded-none cursor-pointer"
            >
              <WhatsAppIcon className="mr-1.5 w-4 h-4" />
              SEND ON WHATSAPP
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
