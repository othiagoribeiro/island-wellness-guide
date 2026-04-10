import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getProfessionals, getKeywordsForProfessional, getTherapies } from "@/lib/api";
import { CITIES } from "@/lib/mocks";
import { MapPin, CheckCircle, Star, Search } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";

export default function ProfessionalsPage() {
  const { t, locale } = useI18n();
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [therapyId, setTherapyId] = useState(searchParams.get("therapyId") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [showMap, setShowMap] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const therapies = getTherapies();

  const results = useMemo(
    () => getProfessionals({ q: q || undefined, therapyId: therapyId || undefined, city: city || undefined }),
    [q, therapyId, city]
  );

  const handleSearch = () => {
    // filters already reactive
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brown mb-6">{t("dir.title")}</h1>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("hero.search.placeholder")}
            className="flex-1 bg-surface border border-border rounded-lg px-4 text-foreground placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-terracotta/30"
            style={{ height: 56, fontSize: 16 }}
          />
          <select
            value={therapyId}
            onChange={(e) => setTherapyId(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/30"
            style={{ height: 56, fontSize: 16 }}
          >
            <option value="">{t("hero.search.allTherapies")}</option>
            {therapies.map((th) => (
              <option key={th.id} value={th.id}>{th.name[locale]}</option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface border border-border rounded-lg px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-terracotta/30"
            style={{ height: 56, fontSize: 16 }}
          >
            <option value="">{t("hero.search.allCities")}</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-brown text-primary-foreground font-semibold rounded-lg px-6 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ height: 56 }}
          >
            <Search size={18} />
          </button>
        </div>

        {/* Mobile map toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-sm font-medium text-terracotta underline"
          >
            {showMap ? t("dir.hideMap") : t("dir.showMap")}
          </button>
        </div>

        <p className="text-stone text-sm mb-4">
          {results.length} {t("dir.results")}
        </p>

        <div className="flex gap-6">
          {/* List */}
          <div className={`w-full lg:w-[45%] ${showMap ? "hidden lg:block" : ""}`}>
            <div className="flex flex-col gap-4">
              {results.map((pro) => {
                const kws = getKeywordsForProfessional(pro);
                return (
                  <Link
                    key={pro.id}
                    to={`/professionals/${pro.id}`}
                    className={`bg-surface rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start ${
                      highlightedId === pro.id ? "ring-2 ring-terracotta" : ""
                    }`}
                    onMouseEnter={() => setHighlightedId(pro.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta/30 to-brown/20 flex items-center justify-center text-brown font-bold text-lg shrink-0">
                      {pro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-brown">{pro.name}</h3>
                        {pro.verificationStatus === "approved" && (
                          <CheckCircle size={16} className="text-terracotta shrink-0" />
                        )}
                      </div>
                      <p className="text-stone text-sm">{pro.specialty[locale]}</p>
                      <div className="flex items-center gap-1 text-stone text-xs mt-1">
                        <MapPin size={12} /> {pro.city}
                      </div>
                      {/* Stars */}
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className="text-terracotta fill-terracotta" />
                        ))}
                      </div>
                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {kws.map((kw) => (
                          <span key={kw.id} className="text-xs bg-terracotta/10 text-brown px-2 py-0.5 rounded-full">
                            {kw.name[locale]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div className={`lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] ${showMap ? "w-full" : "hidden lg:block"}`}>
            <DirectoryMap
              professionals={results}
              highlightedId={highlightedId}
              onPinClick={(id) => setHighlightedId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
