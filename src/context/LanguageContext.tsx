"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Translations } from "@/lib/translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState("EN");
  const [isRTL, setIsRTL] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from local storage if available
    const savedLang = localStorage.getItem("tree-india-lang");
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
      setIsRTL(savedLang === "AR");
      document.documentElement.dir = savedLang === "AR" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang.toLowerCase();
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem("tree-india-lang", lang);
      // Handle RTL for Arabic
      setIsRTL(lang === "AR");
      // Update body direction
      document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
      document.documentElement.lang = lang.toLowerCase();
    }
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations["EN"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
