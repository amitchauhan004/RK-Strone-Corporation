import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_URL } from "@/config/api";

export interface SiteSettings {
  companyName: string;
  tagline: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  workshopAddress: string;
  workshopCity: string;
  workingHours: string;
  gstNumber: string;
  announcementActive: boolean;
  announcementText: string;
  heroBadge: string;
  heroStonesStrip: string;
  googleReviewsUrl: string;
  mapEmbedUrl: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "RK Stone Corporation",
  tagline: "Direct Quarry Sourcing • Pan-India Installation",
  primaryPhone: "+91 94147 84562",
  whatsappNumber: "+91 94147 84562",
  email: "contact@rkstonecorporation.com",
  workshopAddress: "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India",
  workshopCity: "Jaipur, Rajasthan",
  workingHours: "Mon - Sun: 8:00 AM - 7:00 PM",
  gstNumber: "08CUUPS3588K1ZE",
  announcementActive: true,
  announcementText: "✨ DIRECT JAIPUR WORKSHOP & MANUFACTURER: Handcrafted Temples, 3D CNC Stone Jalis & Chhatris",
  heroBadge: "DIRECT JAIPUR WORKSHOP & MANUFACTURER",
  heroStonesStrip: "Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Makrana Marble",
  googleReviewsUrl: "https://www.google.com/maps/place/R+K+Stone+Carporation/",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
  socialInstagram: "https://instagram.com/rkstonecorporation",
  socialFacebook: "https://facebook.com/rkstonecorporation",
  socialYoutube: "https://youtube.com/@rkstonecorporation",
};

interface SiteSettingsContextType {
  siteSettings: SiteSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<{ success: boolean; message?: string }>;
  resetSiteSettings: () => Promise<{ success: boolean; message?: string }>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/site-settings`);
      if (res.ok) {
        const data = await res.json();
        setSiteSettings((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (err) {
      console.warn("Failed to load site settings, using defaults:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
    const handleUpdate = () => {
      fetchSettings();
    };
    window.addEventListener("site-settings-updated", handleUpdate);
    return () => window.removeEventListener("site-settings-updated", handleUpdate);
  }, [fetchSettings]);

  const updateSiteSettings = async (data: Partial<SiteSettings>) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/site-settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        setSiteSettings((prev) => ({ ...prev, ...(resData.settings || data) }));
        return { success: true, message: resData.message || "Settings updated" };
      }
      return { success: false, message: resData.error || "Failed to update" };
    } catch {
      return { success: false, message: "Network error while saving settings" };
    }
  };

  const resetSiteSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/site-settings/reset`, {
        method: "POST",
      });
      const resData = await res.json();
      if (res.ok) {
        setSiteSettings(resData.settings || DEFAULT_SITE_SETTINGS);
        return { success: true, message: resData.message || "Reset to defaults" };
      }
      return { success: false, message: resData.error || "Failed to reset" };
    } catch {
      return { success: false, message: "Network error while resetting" };
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        siteSettings,
        loading,
        refreshSettings: fetchSettings,
        updateSiteSettings,
        resetSiteSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};
