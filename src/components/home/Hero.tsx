import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getTherapies } from "@/lib/api";
import { CITIES } from "@/lib/mocks";
import { Sparkles, Search } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80",
];

export default function Hero() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // AI panel state
  const [aiText, setAiText] = useState("");

  // Search panel state
  const [searchQ, setSearchQ] = useState("");
  const [therapyId, setTherapyId] = useState("");
  const [city, setCity] = useState("");

  const therapies = getTherapies();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAiSubmit = useCallback(() => {
    if (aiText.trim()) {
      navigate(`/orient?q=${encodeURIComponent(aiText.trim())}`);
    }
  }, [aiText, navigate]);

  const handleSearchSubmit = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQ) params.set("q", searchQ);
    if (therapyId) params.set("therapyId", therapyId);
    if (city) params.set("city", city);
    navigate(`/professionals?${params.toString()}`);
  }, [searchQ, therapyId, city, navigate]);

  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === currentSlide ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <p className="text-terracotta text-xs font-medium tracking-[0.3em] uppercase mb-4">
          {t("hero.eyebrow")}
        </p>

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "white" }}>
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
          {t("hero.subtitle")}
        </p>

        {/* START HERE label */}
        <p className="text-sm font-medium tracking-[0.2em] mb-4" style={{ color: "white" }}>
          {t("hero.startHere")}
        </p>

        {/* Two panels */}
        <div className="flex flex-col lg:flex-row max-w-[960px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {/* Panel Left — AI */}
          <div className="bg-surface p-8 lg:w-[55%] text-left">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-terracotta" />
              <h2 className="text-lg font-semibold text-brown">{t("hero.ai.title")}</h2>
            </div>
            <textarea
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              placeholder={t("hero.ai.placeholder")}
              className="w-full bg-transparent border-0 border-b-2 text-foreground placeholder:text-stone text-base resize-none focus:outline-none focus:border-terracotta transition-colors"
              style={{
                borderBottomColor: "rgba(196,133,106,0.4)",
                minHeight: "100px",
                fontSize: "16px",
              }}
            />
            <button
              onClick={handleAiSubmit}
              className="mt-4 w-full bg-terracotta text-surface font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{ height: "56px", fontSize: "16px" }}
            >
              {t("hero.ai.button")}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px" style={{ backgroundColor: "rgba(196,133,106,0.3)" }} />

          {/* Panel Right — Search */}
          <div className="bg-surface p-8 lg:w-[45%] text-left">
            <div className="flex items-center gap-2 mb-3">
              <Search size={18} className="text-brown" />
              <h2 className="text-lg font-semibold text-brown">{t("hero.search.title")}</h2>
            </div>

            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder={t("hero.search.placeholder")}
              className="w-full bg-background border border-border rounded-lg px-4 text-foreground placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30 mb-3"
              style={{ height: "56px", fontSize: "16px" }}
            />

            <select
              value={therapyId}
              onChange={(e) => setTherapyId(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              style={{ height: "56px", fontSize: "16px" }}
            >
              <option value="">{t("hero.search.allTherapies")}</option>
              {therapies.map((th) => (
                <option key={th.id} value={th.id}>{th.name[locale]}</option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              style={{ height: "56px", fontSize: "16px" }}
            >
              <option value="">{t("hero.search.allCities")}</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="w-full bg-brown text-primary-foreground font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{ height: "56px", fontSize: "16px" }}
            >
              {t("hero.search.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
