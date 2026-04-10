import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getKeywordsForProfessional } from "@/lib/api";
import type { Professional } from "@/lib/mocks";
import { Heart, MapPin, Star, ArrowRight, RotateCcw, Users } from "lucide-react";

interface OrientResultsProps {
  query: string;
  explanation: string;
  professionals: Professional[];
  onNewSearch: () => void;
}

export default function OrientResults({ query, explanation, professionals, onNewSearch }: OrientResultsProps) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll into view on mount
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, []);

  return (
    <section ref={containerRef} className="py-12 md:py-16 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-card rounded-2xl shadow-md border border-border/50 overflow-hidden animate-fade-in">
          {/* Empathetic message */}
          <div className="p-6 md:p-8">
            <div className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart size={18} className="text-primary" />
                </div>
              </div>
              <p className="text-foreground text-sm md:text-base leading-relaxed">
                {explanation}
              </p>
            </div>
          </div>

          {/* Recommended professionals */}
          <div className="border-t border-border/50 px-6 md:px-8 py-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {t("orient.professionals")}
            </h3>

            <div className="flex flex-col divide-y divide-border/50">
              {professionals.map((pro) => {
                const kws = getKeywordsForProfessional(pro).slice(0, 3);
                return (
                  <Link
                    key={pro.id}
                    to={`/professionals/${pro.id}`}
                    className="flex items-center gap-4 py-4 group hover:bg-muted/20 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 ring-1 ring-border">
                      {pro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">
                          {pro.name}
                        </span>
                        <div className="flex items-center gap-0.5 text-primary">
                          <Star size={12} className="fill-primary" />
                          <span className="text-xs font-medium">4.9</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {pro.specialty[locale as keyof typeof pro.specialty]}
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                        <MapPin size={10} className="shrink-0" /> {pro.city}
                      </div>
                    </div>

                    {/* Keywords + arrow */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                      {kws.map((kw) => (
                        <span
                          key={kw.id}
                          className="text-xs border border-border text-foreground px-2 py-0.5 rounded-full"
                        >
                          {kw.name[locale as keyof typeof kw.name]}
                        </span>
                      ))}
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-t border-border/50 px-6 md:px-8 py-5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNewSearch}
              className="flex-1 flex items-center justify-center gap-2 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              style={{ height: 48 }}
            >
              <RotateCcw size={16} />
              {t("orient.newSearch")}
            </button>
            <button
              onClick={() => navigate("/professionals")}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              style={{ height: 48 }}
            >
              <Users size={16} />
              {t("orient.morePros")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
