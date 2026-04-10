import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getProfessionals, getKeywordsForProfessional, getTherapies } from "@/lib/api";
import { CITIES } from "@/lib/mocks";
import { MapPin, Star, Search, ShieldCheck, Map as MapIcon, List, Compass } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";

export default function ProfessionalsPage() {
  const { t, locale } = useI18n();
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [therapyId, setTherapyId] = useState(searchParams.get("therapyId") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [showMap, setShowMap] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const therapies = getTherapies();

  const results = useMemo(
    () => getProfessionals({ q: q || undefined, therapyId: therapyId || undefined, city: city || undefined }),
    [q, therapyId, city]
  );

  const clearFilters = () => {
    setQ("");
    setTherapyId("");
    setCity("");
  };

  const handlePinClick = (id: string) => {
    setHighlightedId(id);
    const el = rowRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Page Header */}
      <div className="bg-card border-b" style={{ borderColor: "rgba(44,74,62,0.1)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
          <h1 className="text-2xl md:text-[28px] font-bold text-primary">{t("dir.title")}</h1>
          <p className="text-muted-foreground text-[15px] mt-1">{t("dir.subtitle")}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-20 bg-card border-b" style={{ borderColor: "rgba(44,74,62,0.1)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("dir.searchPlaceholder")}
              className="flex-1 bg-card border rounded-lg px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2"
              style={{
                height: 48,
                fontSize: 16,
                borderColor: "rgba(44,74,62,0.2)",
              }}
            />
            <select
              value={therapyId}
              onChange={(e) => setTherapyId(e.target.value)}
              className="bg-card border rounded-lg px-4 text-foreground focus:outline-none focus:ring-2"
              style={{ height: 48, fontSize: 16, borderColor: "rgba(44,74,62,0.2)" }}
            >
              <option value="">{t("hero.search.allTherapies")}</option>
              {therapies.map((th) => (
                <option key={th.id} value={th.id}>{th.name[locale]}</option>
              ))}
            </select>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-card border rounded-lg px-4 text-foreground focus:outline-none focus:ring-2"
              style={{ height: 48, fontSize: 16, borderColor: "rgba(44,74,62,0.2)" }}
            >
              <option value="">{t("dir.allCities")}</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              className="bg-primary text-primary-foreground font-semibold rounded-lg px-6 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ height: 48 }}
            >
              <Search size={18} />
              {t("dir.searchBtn")}
            </button>
            {/* Mobile map toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="lg:hidden flex items-center justify-center gap-2 border rounded-lg px-4 font-medium text-primary transition-colors hover:bg-primary/5"
              style={{ height: 48, borderColor: "hsl(var(--primary))" }}
            >
              {showMap ? <><List size={16} /> {t("dir.hideMap")}</> : <><MapIcon size={16} /> {t("dir.showMap")}</>}
            </button>
          </div>
          <p className="text-muted-foreground text-[13px] mt-3">
            {results.length} {t("dir.proFound")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex max-w-[1400px] mx-auto w-full">
        {/* List */}
        <div
          className={`w-full lg:w-[42%] overflow-y-auto p-4 ${showMap ? "hidden lg:block" : ""}`}
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Compass size={64} className="text-accent mb-4" />
              <p className="text-foreground font-medium mb-2">{t("dir.noResults")}</p>
              <button
                onClick={clearFilters}
                className="border rounded-lg px-5 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                style={{ borderColor: "hsl(var(--primary))" }}
              >
                {t("dir.clearFilters")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((pro) => {
                const kws = getKeywordsForProfessional(pro);
                const isHighlighted = highlightedId === pro.id;
                return (
                  <Link
                    key={pro.id}
                    ref={(el) => { rowRefs.current[pro.id] = el; }}
                    to={`/professionals/${pro.id}`}
                    className="bg-card rounded-xl p-5 transition-all flex gap-4 items-start"
                    style={{
                      boxShadow: isHighlighted
                        ? "0 4px 20px rgba(44,74,62,0.15)"
                        : "0 1px 4px rgba(44,74,62,0.08)",
                      borderLeft: isHighlighted ? "3px solid hsl(var(--accent))" : "3px solid transparent",
                    }}
                    onMouseEnter={() => setHighlightedId(pro.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                  >
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0 overflow-hidden"
                      style={{
                        background: pro.photo ? undefined : "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))",
                      }}
                    >
                      {pro.photo ? (
                        <img src={pro.photo} alt={pro.name} className="w-full h-full object-cover" />
                      ) : (
                        pro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-primary text-[16px]">{pro.name}</h3>
                        {pro.verificationStatus === "approved" && (
                          <span className="inline-flex items-center gap-0.5 text-accent text-xs font-medium">
                            <ShieldCheck size={12} /> {t("dir.verified")}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{pro.specialty[locale]}</p>
                      <div className="flex items-center gap-1 text-muted-foreground text-[13px] mt-1">
                        <MapPin size={12} /> {pro.city}
                      </div>
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {kws.slice(0, 4).map((kw) => (
                          <span
                            key={kw.id}
                            className="text-xs text-primary px-2.5 py-0.5 rounded-full"
                            style={{ background: "rgba(44,74,62,0.1)" }}
                          >
                            {kw.name[locale]}
                          </span>
                        ))}
                        {kws.length > 4 && (
                          <span className="text-xs text-muted-foreground px-2.5 py-0.5 rounded-full" style={{ background: "rgba(44,74,62,0.06)" }}>
                            +{kws.length - 4} {t("dir.more")}
                          </span>
                        )}
                      </div>
                      {/* Stars + profile link */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className="text-accent fill-accent" />
                          ))}
                        </div>
                        <span className="text-accent text-[13px] font-medium">{t("dir.viewProfile")}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Map */}
        <div
          className={`lg:w-[58%] lg:sticky lg:top-[140px] ${showMap ? "w-full" : "hidden lg:block"}`}
          style={{ height: "calc(100vh - 200px)" }}
        >
          <DirectoryMap
            professionals={results}
            highlightedId={highlightedId}
            onPinClick={handlePinClick}
          />
        </div>
      </div>
    </div>
  );
}
