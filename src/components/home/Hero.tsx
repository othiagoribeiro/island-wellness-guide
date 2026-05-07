import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTherapies } from "@/lib/api";
import { ChevronDown, MapPin } from "lucide-react";
import heroCala from "@/assets/hero_cala.jpg";

interface HeroProps {
  onAiSearch?: (query: string) => void;
  onClassicSearch?: (filters: { q?: string; therapyId?: string; city?: string }) => void;
}

export default function Hero({ onClassicSearch }: HeroProps) {
  const navigate = useNavigate();
  const [therapyId, setTherapyId] = useState("");
  const [location, setLocation] = useState("");
  const therapies = getTherapies();

  const handleSearch = useCallback(() => {
    const filters: { therapyId?: string; city?: string } = {};
    if (therapyId) filters.therapyId = therapyId;
    if (location) filters.city = location;
    if (onClassicSearch) {
      onClassicSearch(filters);
    } else {
      const params = new URLSearchParams();
      if (therapyId) params.set("therapyId", therapyId);
      if (location) params.set("city", location);
      navigate(`/professionals?${params.toString()}`);
    }
  }, [therapyId, location, navigate, onClassicSearch]);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "85vh",
        backgroundImage: `url(${heroCala})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <p
          className="text-[13px] uppercase mb-6"
          style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400, letterSpacing: "3px" }}
        >
          MALLORCA · BIENESTAR · COMUNIDAD
        </p>

        {/* Main title */}
        <h1
          className="uppercase mb-3 leading-tight"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "6px",
            color: "white",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
        >
          ENCUENTRA TU BIENESTAR
        </h1>

        {/* Subtitle */}
        <p
          className="uppercase mb-6"
          style={{
            fontSize: "clamp(18px, 2vw, 24px)",
            fontWeight: 300,
            letterSpacing: "8px",
            color: "white",
            textShadow: "0 1px 10px rgba(0,0,0,0.2)",
          }}
        >
          EN MALLORCA
        </p>

        {/* Tagline */}
        <p
          className="mx-auto mb-10"
          style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            maxWidth: "600px",
          }}
        >
          Profesionales verificados en terapias naturales y complementarias
        </p>

        {/* Search bar */}
        <div className="mx-auto" style={{ maxWidth: "720px" }}>
          {/* Desktop: horizontal bar */}
          <div
            className="hidden md:flex items-center bg-white rounded-full overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
          >
            {/* Therapy dropdown */}
            <div className="flex-1 relative">
              <select
                value={therapyId}
                onChange={(e) => setTherapyId(e.target.value)}
                className="w-full h-14 pl-5 pr-10 bg-transparent text-foreground/80 text-[15px] appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">Terapia, síntoma o nombre</option>
                {therapies.map((th) => (
                  <option key={th.id} value={th.id}>{th.name.es}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-border/60" />

            {/* Location input */}
            <div className="flex-1 relative">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cerca de mí, Código Postal..."
                className="w-full h-14 pl-5 pr-10 bg-transparent text-foreground/80 text-[15px] focus:outline-none"
                style={{ fontSize: "16px" }}
              />
              <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground font-medium text-[14px] tracking-wide px-7 h-14 rounded-full mr-1 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              VER PROFESIONALES
            </button>
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden flex flex-col gap-3">
            <div
              className="relative bg-white rounded-full overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
            >
              <select
                value={therapyId}
                onChange={(e) => setTherapyId(e.target.value)}
                className="w-full h-12 pl-5 pr-10 bg-transparent text-foreground/80 text-[15px] appearance-none focus:outline-none"
              >
                <option value="">Terapia, síntoma o nombre</option>
                {therapies.map((th) => (
                  <option key={th.id} value={th.id}>{th.name.es}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>

            <div
              className="relative bg-white rounded-full overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
            >
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cerca de mí, Código Postal..."
                className="w-full h-12 pl-5 pr-10 bg-transparent text-foreground/80 text-[15px] focus:outline-none"
                style={{ fontSize: "16px" }}
              />
              <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>

            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground font-medium text-[14px] tracking-wide h-12 rounded-full hover:opacity-90 transition-opacity"
            >
              VER PROFESIONALES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
