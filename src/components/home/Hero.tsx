import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTherapies } from "@/lib/api";
import { ChevronDown, MapPin, Navigation, Map as MapIcon, Search } from "lucide-react";
import heroCala from "@/assets/hero_cala.jpg";
import { municipios, popularTherapies } from "@/data/municipios";
import type { Therapy } from "@/lib/mocks";

interface HeroProps {
  onAiSearch?: (query: string) => void;
  onClassicSearch?: (filters: { q?: string; therapyId?: string; city?: string }) => void;
}

interface TherapyPopoverProps {
  open: boolean;
  query: string;
  therapies: Therapy[];
  onPick: (label: string, id?: string) => void;
  onSeeAll: () => void;
}

function TherapyPopover({ open, query, therapies, onPick, onSeeAll }: TherapyPopoverProps) {
  if (!open) return null;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? therapies.filter((t) => t.name.es.toLowerCase().includes(q))
    : [];

  return (
    <div
      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[10px] shadow-xl z-50 max-h-[320px] overflow-y-auto"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
    >
      {q ? (
        <div className="py-2">
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <button
                key={t.id}
                onMouseDown={(e) => { e.preventDefault(); onPick(t.name.es, t.id); }}
                className="w-full text-left px-5 py-2.5 text-[14px] text-foreground/80 hover:bg-muted transition-colors"
              >
                {t.name.es}
              </button>
            ))
          ) : (
            <p className="px-5 py-3 text-[13px] text-muted-foreground italic">Sin resultados</p>
          )}
        </div>
      ) : (
        <>
          <p className="px-5 pt-4 pb-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground" style={{ fontWeight: 500 }}>
            Terapias más buscadas
          </p>
          <div className="pb-2">
            {popularTherapies.map((label) => {
              const matched = therapies.find((t) => t.name.es.toLowerCase() === label.toLowerCase());
              return (
                <button
                  key={label}
                  onMouseDown={(e) => { e.preventDefault(); onPick(label, matched?.id); }}
                  className="w-full text-left px-5 py-2 text-[14px] text-foreground/80 hover:bg-muted transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </div>
          <button
            onMouseDown={(e) => { e.preventDefault(); onSeeAll(); }}
            className="w-full text-left px-5 py-3 text-[13px] text-primary border-t border-border/40 hover:bg-muted/60 transition-colors"
            style={{ fontWeight: 500 }}
          >
            Ver todas las terapias →
          </button>
        </>
      )}
    </div>
  );
}

interface LocationPopoverProps {
  open: boolean;
  query: string;
  onPick: (label: string, special?: "near" | "all") => void;
}

function LocationPopover({ open, query, onPick }: LocationPopoverProps) {
  if (!open) return null;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? municipios.filter((m) => m.toLowerCase().includes(q))
    : municipios;

  return (
    <div
      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[10px] shadow-xl z-50 max-h-[320px] overflow-y-auto"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
    >
      <button
        onMouseDown={(e) => { e.preventDefault(); onPick("Cerca de mí", "near"); }}
        className="w-full text-left px-5 py-2.5 text-[14px] text-foreground/85 hover:bg-muted transition-colors flex items-center gap-2"
      >
        <Navigation size={14} className="text-primary" /> Cerca de mí
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); onPick("Toda Mallorca", "all"); }}
        className="w-full text-left px-5 py-2.5 text-[14px] text-foreground/85 hover:bg-muted transition-colors flex items-center gap-2 border-b border-border/40"
      >
        <MapIcon size={14} className="text-primary" /> Toda Mallorca
      </button>
      <div className="py-1">
        {filtered.map((m) => (
          <button
            key={m}
            onMouseDown={(e) => { e.preventDefault(); onPick(m); }}
            className="w-full text-left px-5 py-2 text-[14px] text-foreground/80 hover:bg-muted transition-colors"
          >
            {m}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-3 text-[13px] text-muted-foreground italic">Sin resultados</p>
        )}
      </div>
    </div>
  );
}

export default function Hero({ onClassicSearch }: HeroProps) {
  const navigate = useNavigate();
  const therapies = getTherapies();

  const [therapyText, setTherapyText] = useState("");
  const [therapyId, setTherapyId] = useState<string | undefined>(undefined);
  const [therapyOpen, setTherapyOpen] = useState(false);

  const [locationText, setLocationText] = useState("");
  const [locationMode, setLocationMode] = useState<"near" | "all" | "city" | "">("");
  const [locationOpen, setLocationOpen] = useState(false);

  const therapyWrapRef = useRef<HTMLDivElement>(null);
  const locationWrapRef = useRef<HTMLDivElement>(null);
  const therapyWrapRefM = useRef<HTMLDivElement>(null);
  const locationWrapRefM = useRef<HTMLDivElement>(null);

  // Click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inTherapy = therapyWrapRef.current?.contains(target) || therapyWrapRefM.current?.contains(target);
      const inLocation = locationWrapRef.current?.contains(target) || locationWrapRefM.current?.contains(target);
      if (!inTherapy) setTherapyOpen(false);
      if (!inLocation) setLocationOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = useCallback(() => {
    const filters: { q?: string; therapyId?: string; city?: string } = {};
    if (therapyId) filters.therapyId = therapyId;
    else if (therapyText.trim()) filters.q = therapyText.trim();
    if (locationMode === "city" && locationText.trim()) filters.city = locationText.trim();
    // "near" and "all" => no city filter

    if (onClassicSearch) {
      onClassicSearch(filters);
    } else {
      const params = new URLSearchParams();
      if (filters.therapyId) params.set("therapyId", filters.therapyId);
      if (filters.q) params.set("q", filters.q);
      if (filters.city) params.set("city", filters.city);
      navigate(`/professionals?${params.toString()}`);
    }
  }, [therapyId, therapyText, locationMode, locationText, navigate, onClassicSearch]);

  const handleTherapyPick = (label: string, id?: string) => {
    setTherapyText(label);
    setTherapyId(id);
    setTherapyOpen(false);
  };

  const handleLocationPick = (label: string, special?: "near" | "all") => {
    setLocationText(label);
    setLocationMode(special ?? "city");
    setLocationOpen(false);
  };

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        minHeight: "60vh",
        backgroundImage: `url(${heroCala})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.18) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <p
          className="text-[13px] uppercase mb-3"
          style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400, letterSpacing: "3px" }}
        >
          MALLORCA · BIENESTAR · COMUNIDAD
        </p>

        <h1
          className="uppercase mb-1 leading-tight"
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 300,
            letterSpacing: "5px",
            color: "white",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
        >
          ENCUENTRA TU BIENESTAR
        </h1>

        <p
          className="uppercase mb-4"
          style={{
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontWeight: 300,
            letterSpacing: "6px",
            color: "white",
            textShadow: "0 1px 10px rgba(0,0,0,0.2)",
          }}
        >
          EN MALLORCA
        </p>

        <p
          className="mx-auto mb-6"
          style={{
            fontSize: "clamp(14px, 1.1vw, 17px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            maxWidth: "560px",
          }}
        >
          Profesionales verificados en terapias naturales y complementarias
        </p>

        {/* Search bar */}
        <div className="mx-auto" style={{ maxWidth: "780px" }}>
          {/* Desktop pill */}
          <div
            className="hidden md:flex items-stretch bg-white rounded-full overflow-visible relative"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
          >
            {/* Therapy field */}
            <div ref={therapyWrapRef} className="flex-1 relative">
              <input
                value={therapyText}
                onChange={(e) => { setTherapyText(e.target.value); setTherapyId(undefined); setTherapyOpen(true); }}
                onFocus={() => setTherapyOpen(true)}
                placeholder="Terapia, síntoma o nombre"
                className="w-full h-14 pl-5 pr-9 bg-transparent text-foreground/85 text-[15px] focus:outline-none rounded-l-full"
                style={{ fontSize: "16px" }}
              />
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
              <TherapyPopover
                open={therapyOpen}
                query={therapyText}
                therapies={therapies}
                onPick={handleTherapyPick}
                onSeeAll={() => { setTherapyOpen(false); navigate("/therapies"); }}
              />
            </div>

            <div className="w-px h-8 self-center bg-border/60" />

            {/* Location field */}
            <div ref={locationWrapRef} className="flex-1 relative">
              <input
                value={locationText}
                onChange={(e) => { setLocationText(e.target.value); setLocationMode("city"); setLocationOpen(true); }}
                onFocus={() => setLocationOpen(true)}
                placeholder="Cerca de mí, Código Postal..."
                className="w-full h-14 pl-5 pr-9 bg-transparent text-foreground/85 text-[15px] focus:outline-none"
                style={{ fontSize: "16px" }}
              />
              <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
              <LocationPopover
                open={locationOpen}
                query={locationMode === "city" ? locationText : ""}
                onPick={handleLocationPick}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground font-medium text-[14px] tracking-wide px-7 h-14 rounded-full m-1 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              VER PROFESIONALES
            </button>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden flex flex-col gap-3">
            <div ref={therapyWrapRefM} className="relative bg-white rounded-full" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              <input
                value={therapyText}
                onChange={(e) => { setTherapyText(e.target.value); setTherapyId(undefined); setTherapyOpen(true); }}
                onFocus={() => setTherapyOpen(true)}
                placeholder="Terapia, síntoma o nombre"
                className="w-full h-12 pl-5 pr-10 bg-transparent text-foreground/85 text-[15px] focus:outline-none rounded-full"
                style={{ fontSize: "16px" }}
              />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
              <TherapyPopover
                open={therapyOpen}
                query={therapyText}
                therapies={therapies}
                onPick={handleTherapyPick}
                onSeeAll={() => { setTherapyOpen(false); navigate("/therapies"); }}
              />
            </div>

            <div ref={locationWrapRefM} className="relative bg-white rounded-full" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              <input
                value={locationText}
                onChange={(e) => { setLocationText(e.target.value); setLocationMode("city"); setLocationOpen(true); }}
                onFocus={() => setLocationOpen(true)}
                placeholder="Cerca de mí, Código Postal..."
                className="w-full h-12 pl-5 pr-10 bg-transparent text-foreground/85 text-[15px] focus:outline-none rounded-full"
                style={{ fontSize: "16px" }}
              />
              <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
              <LocationPopover
                open={locationOpen}
                query={locationMode === "city" ? locationText : ""}
                onPick={handleLocationPick}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground font-medium text-[14px] tracking-wide h-12 rounded-full hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              <Search size={16} /> VER PROFESIONALES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
