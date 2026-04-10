import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

import { type Locale, detectLocale, saveLocale } from "./locales";
import translations, { type TranslationKey } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    saveLocale(l);
  }, []);

  useEffect(() => {
    saveLocale(locale);
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = translations[key];
      if (!entry) return key;
      return (entry as Record<Locale, string>)[locale] || (entry as Record<Locale, string>).es || key;
    },
    [locale]
  );

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
