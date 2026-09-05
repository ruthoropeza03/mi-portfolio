import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const getInitialLang = () => {
  const stored = localStorage.getItem("lang");
  return stored === "en" || stored === "es" ? stored : "es";
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
