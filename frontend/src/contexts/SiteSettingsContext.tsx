import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_URL } from "@/config/api";

export interface SiteSettings {
  // 1. Company Identity & Credentials
  companyName: string;
  tagline: string;
  gstNumber: string;
  workingHours: string;
  businessNature: string;
  businessStatus: string;

  // 2. Hotlines & Workshop Location
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  workshopCity: string;
  workshopAddress: string;

  // 3. Top Marquee Announcement Bar
  announcementActive: boolean;
  announcementText: string;

  // 4. Hero Section Content (Homepage 3 Slides & CTA)
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroStonesStrip: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;

  // Slide 1 (Stone Mandirs & Temples)
  heroSlide1Tag: string;
  heroSlide1Title: string;
  heroSlide1Desc: string;

  // Slide 2 (Royal Chhatris & Havelis)
  heroSlide2Tag: string;
  heroSlide2Title: string;
  heroSlide2Desc: string;

  // Slide 3 (3D CNC Jalis & Elevation Panels)
  heroSlide3Tag: string;
  heroSlide3Title: string;
  heroSlide3Desc: string;

  // 5. About RK Stone Corporation & Heritage
  founderName: string;
  estYear: string;
  employeesCount: string;
  annualTurnover: string;
  aboutHeading: string;
  aboutStory: string;

  // 6. Workshop & Craftsmanship Showcase
  workshopHeading: string;
  workshopStory: string;
  workshopMapLink: string;

  // 7. Interactive Map & Social Media
  googleReviewsUrl: string;
  mapEmbedUrl: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  // 1. Company Identity & Credentials
  companyName: "RK Stone Corporation",
  tagline: "Direct Quarry Sourcing • Pan-India Installation",
  gstNumber: "08CUUPS3588K1ZE",
  workingHours: "Mon - Sun: 8:00 AM - 7:00 PM",
  businessNature: "Manufacturer, Supplier",
  businessStatus: "Individual - Proprietor",

  // 2. Hotlines & Workshop Location
  primaryPhone: "+91 94147 84562",
  whatsappNumber: "+91 94147 84562",
  email: "contact@rkstonecorporation.com",
  workshopCity: "Jaipur, Rajasthan",
  workshopAddress: "Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India",

  // 3. Top Marquee Announcement Bar (No default text line)
  announcementActive: false,
  announcementText: "",

  // 4. Hero Section Content (Homepage 3 Slides & CTA)
  heroBadge: "DIRECT JAIPUR WORKSHOP & MANUFACTURER",
  heroTitle: "CUSTOM STONE TEMPLES & HOME MANDIRS",
  heroDescription: "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts with pan-India delivery.",
  heroStonesStrip: "Gwalior Stone • Dhaulpur Stone • Bansi Paharpur • Makrana Marble",
  heroPrimaryBtnText: "EXPLORE WHAT WE MAKE",
  heroSecondaryBtnText: "SHARE DRAWING / PHOTO",

  // Slide 1 (Stone Mandirs & Temples)
  heroSlide1Tag: "HANDCRAFTED IN RAJASTHAN",
  heroSlide1Title: "CUSTOM STONE TEMPLES & HOME MANDIRS",
  heroSlide1Desc: "Handcrafted stone temples carved in authentic Bansi Paharpur pink stone and Dholpur sandstone. Custom built to any size for residences and trusts with pan-India delivery.",

  // Slide 2 (Royal Chhatris & Havelis)
  heroSlide2Tag: "HERITAGE STONE ARCHITECTURE",
  heroSlide2Title: "STONE CHHATRIS, JHAROKHAS & PILLARS",
  heroSlide2Desc: "Traditional garden chhatris, palace-style jharokhas, carved entrance gates, and round fluted pillars chiseled in authentic Dholpur and Jodhpur red sandstone.",

  // Slide 3 (3D CNC Jalis & Elevation Panels)
  heroSlide3Tag: "PRECISION STONE SCREENS",
  heroSlide3Title: "3D CNC STONE JALIS & WALL PANELS",
  heroSlide3Desc: "Custom cut 3D stone jalis and elevation screens in Gwalior mint stone and Dholpur sandstone for front elevations, boundary walls, and balconies.",

  // 5. About RK Stone Corporation & Heritage
  founderName: "Mr. Rajendra Saini",
  estYear: "2009",
  employeesCount: "20+ Artisans & Staff",
  annualTurnover: "₹1 - 2 Crore",
  aboutHeading: "About RK Stone Corporation",
  aboutStory: "RK Stone Corporation, established in 2009 by Mr. Rajendra Saini in Jaipur, Rajasthan, is a renowned Manufacturer and Supplier of premium sandstone products. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, 3D CNC Stone Jalis, royal Chhatris, Gazebos, and Garden Fountains reflecting timeless Indian architecture.",

  // 6. Workshop & Craftsmanship Showcase
  workshopHeading: "EXPERIENCED CARVERS & MODERN MACHINERY",
  workshopStory: "RK Stone Corporation is a direct stone carving workshop based in Jaipur, Rajasthan. For over 40 years, our team of master craftsmen has hand-carved temples, royal chhatris, stone jalis, and haveli facades for homes and projects across India.",
  workshopMapLink: "https://maps.google.com/?q=RK+Stone+Corporation+Jaipur",

  // 7. Interactive Map & Social Media
  googleReviewsUrl: "https://www.google.com/maps/place/R+K+Stone+Carporation/",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201.27391904159717!2d75.90287731088574!3d26.88321687556189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db974c9f18089%3A0xc82bf12c6b0f9fa9!2sR%20K%20Stone%20Carporation!5e1!3m2!1sen!2sin!4v1761640201109!5m2!1sen!2sin",
  socialInstagram: "https://www.instagram.com/haritage_stone_temple/",
  socialFacebook: "https://www.facebook.com/rkstone01",
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
