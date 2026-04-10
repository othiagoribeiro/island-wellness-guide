export type Locale = "es" | "ca" | "en" | "de";

export const LOCALES: Locale[] = ["es", "ca", "en", "de"];

export function detectLocale(): Locale {
  const saved = localStorage.getItem("mh_locale") as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;

  const lang = navigator.language?.toLowerCase() || "";
  if (lang === "de" || lang.startsWith("de")) return "de";
  if (lang === "en" || lang.startsWith("en")) return "en";
  if (lang === "ca" || lang.startsWith("ca")) return "ca";
  return "es";
}

export function saveLocale(locale: Locale) {
  localStorage.setItem("mh_locale", locale);
}
