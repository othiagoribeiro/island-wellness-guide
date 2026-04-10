import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getTherapies } from "@/lib/api";
import { CITIES } from "@/lib/mocks";
import { Sparkles, Search } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import heroCala from "@/assets/hero_cala.jpg";
import heroSerenity from "@/assets/hero_serenity.jpg";

const HERO_IMAGES = [heroCala, heroSerenity];

const ROTATING_TITLES: Record<Locale, string[]> = {
  es: [
    "Encuentra tu bienestar en Mallorca",
    "Terapias naturales, cerca de ti",
    "Tu cuerpo y mente, en equilibrio",
    "Profesionales verificados, resultados reales",
  ],
  ca: [
    "Troba el teu benestar a Mallorca",
    "Teràpies naturals, a prop teu",
    "El teu cos i ment, en equilibri",
    "Professionals verificats, resultats reals",
  ],
  en: [
    "Find your wellbeing in Mallorca",
    "Natural therapies, close to you",
    "Your body and mind, in balance",
    "Verified professionals, real results",
  ],
  de: [
    "Finde dein Wohlbefinden auf Mallorca",
    "Natürliche Therapien, in deiner Nähe",
    "Dein Körper und Geist, im Gleichgewicht",
    "Verifizierte Fachleute, echte Ergebnisse",
  ],
};

interface HeroProps {
  onAiSearch?: (query: string) => void;
  onClassicSearch?: (filters: { q?: string; therapyId?: string; city?: string }) => void;
}

export default function Hero({ onAiSearch, onClassicSearch }: HeroProps) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const [aiText, setAiText] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [therapyId, setTherapyId] = useState("");
  const [city, setCity] = useState("");

  const therapies = getTherapies();
  const titles = ROTATING_TITLES[locale] || ROTATING_TITLES.es;

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotating title
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleVisible(false);
      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setTitleVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const handleAiSubmit = useCallback(() => {
    if (aiText.trim()) {
      if (onAiSearch) {
        onAiSearch(aiText.trim());
      } else {
        navigate(`/orient?q=${encodeURIComponent(aiText.trim())}`);
      }
    }
  }, [aiText, navigate, onAiSearch]);

  const handleSearchSubmit = useCallback(() => {
    const filters: { q?: string; therapyId?: string; city?: string } = {};
    if (searchQ) filters.q = searchQ;
    if (therapyId) filters.therapyId = therapyId;
    if (city) filters.city = city;
    if (onClassicSearch) {
      onClassicSearch(filters);
    } else {
      const params = new URLSearchParams();
      if (searchQ) params.set("q", searchQ);
      if (therapyId) params.set("therapyId", therapyId);
      if (city) params.set("city", city);
      navigate(`/professionals?${params.toString()}`);
    }
  }, [searchQ, therapyId, city, navigate, onClassicSearch]);

  return (
    <section className="relative min-h-screen md:min-h-[720px] flex items-center justify-center overflow-hidden py-20 md:py-0">
      {/* Background slideshow */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === currentSlide ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 md:px-4 text-center">
        {/* Eyebrow */}
        <p
          className="text-xs font-medium tracking-[0.3em] uppercase mb-5"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {t("hero.eyebrow")}
        </p>

        {/* Rotating H1 */}
        <h1
          className="text-3xl md:text-5xl lg:text-[56px] font-bold mb-4 md:mb-5 leading-tight"
          style={{
            color: "white",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {titles[currentTitle]}
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {t("hero.subtitle")}
        </p>

        {/* Glass panels */}
        <div className="flex flex-col lg:flex-row max-w-[960px] mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Panel Left — AI */}
          <div className="p-5 md:p-8 lg:w-[55%] text-left">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
              <h2 className="text-lg font-semibold text-white">{t("hero.ai.title")}</h2>
            </div>
            <textarea
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              placeholder={t("hero.ai.placeholder")}
              className="w-full bg-transparent border-0 border-b text-white placeholder:text-white/40 text-base resize-none focus:outline-none transition-colors"
              style={{
                borderBottomColor: "rgba(255,255,255,0.2)",
                minHeight: "72px",
                fontSize: "16px",
              }}
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)"; }}
            />
            <button
              onClick={handleAiSubmit}
              className="mt-4 w-full font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                height: "48px",
                fontSize: "15px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              {t("hero.ai.button")}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div className="lg:hidden h-px mx-5" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

          {/* Panel Right — Search */}
          <div className="p-5 md:p-8 lg:w-[45%] text-left">
            <div className="flex items-center gap-2 mb-4">
              <Search size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
              <h2 className="text-lg font-semibold text-white">{t("hero.search.title")}</h2>
            </div>

            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder={t("hero.search.placeholder")}
              className="w-full rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 mb-2"
              style={{
                height: "44px",
                fontSize: "15px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            />

            <select
              value={therapyId}
              onChange={(e) => setTherapyId(e.target.value)}
              className="w-full rounded-lg px-4 text-white focus:outline-none focus:ring-1 focus:ring-white/30 mb-2 appearance-none"
              style={{
                height: "44px",
                fontSize: "15px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                colorScheme: "dark",
              }}
            >
              <option value="" style={{ background: "#2C4A3E" }}>{t("hero.search.allTherapies")}</option>
              {therapies.map((th) => (
                <option key={th.id} value={th.id} style={{ background: "#2C4A3E" }}>{th.name[locale]}</option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg px-4 text-white focus:outline-none focus:ring-1 focus:ring-white/30 mb-3 appearance-none"
              style={{
                height: "44px",
                fontSize: "15px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                colorScheme: "dark",
              }}
            >
              <option value="" style={{ background: "#2C4A3E" }}>{t("hero.search.allCities")}</option>
              {CITIES.map((c) => (
                <option key={c} value={c} style={{ background: "#2C4A3E" }}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="w-full bg-primary text-primary-foreground font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ height: "48px", fontSize: "15px" }}
            >
              {t("hero.search.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
