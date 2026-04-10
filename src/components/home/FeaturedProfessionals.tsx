import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getProfessionals, getKeywordsForProfessional } from "@/lib/api";
import { MapPin, Star, Map as MapIcon, List } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";

export default function FeaturedProfessionals() {
  const { t, locale } = useI18n();
  const pros = getProfessionals();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 uppercase tracking-wider">
          {t("home.professionals.title")}
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-10 max-w-lg mx-auto">
          {t("home.professionals.subtitle")}
        </p>

        {/* Mobile toggle */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="inline-flex bg-card border border-border rounded-full p-1 gap-1">
            <button
              onClick={() => setShowMap(false)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !showMap ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={15} />
              {t("home.professionals.list")}
            </button>
            <button
              onClick={() => setShowMap(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                showMap ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapIcon size={15} />
              {t("home.professionals.map")}
            </button>
          </div>
        </div>

        <div className="flex gap-6 max-w-6xl mx-auto">
          {/* List */}
          <div className={`w-full lg:w-[45%] ${showMap ? "hidden lg:block" : ""}`}>
            <div className="flex flex-col divide-y divide-border">
              {pros.map((pro, index) => (
                <ProfessionalRow
                  key={pro.id}
                  pro={pro}
                  index={index}
                  locale={locale}
                  isHighlighted={highlightedId === pro.id}
                  onHover={setHighlightedId}
                />
              ))}
            </div>
          </div>

          {/* Map */}
          <div
            className={`lg:w-[55%] lg:sticky lg:top-20 lg:self-start ${
              showMap ? "w-full" : "hidden lg:block"
            }`}
            style={{ height: showMap ? "70vh" : undefined }}
          >
            <div className="h-[500px] lg:h-[calc(100vh-8rem)] rounded-xl overflow-hidden shadow-md border border-border/50">
              <DirectoryMap
                professionals={pros}
                highlightedId={highlightedId}
                onPinClick={(id) => setHighlightedId(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfessionalRow({
  pro,
  index,
  locale,
  isHighlighted,
  onHover,
}: {
  pro: ReturnType<typeof getProfessionals>[number];
  index: number;
  locale: string;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const kws = getKeywordsForProfessional(pro);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      to={`/professionals/${pro.id}`}
      className={`flex items-start gap-5 py-6 group transition-all duration-300 hover:bg-muted/30 px-3 rounded-lg -mx-3 ${
        isHighlighted ? "bg-primary/5 ring-1 ring-primary/20" : ""
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`,
      }}
      onMouseEnter={() => onHover(pro.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary font-bold text-lg shrink-0 overflow-hidden ring-2 ring-border group-hover:ring-primary/40 transition-all duration-300">
        {pro.photo ? (
          <img src={pro.photo} alt={pro.name} className="w-full h-full object-cover" />
        ) : (
          <span>
            {pro.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-primary group-hover:text-accent transition-colors duration-200">
          {pro.name}
        </h3>
        <p className="text-muted-foreground text-sm">{pro.specialty[locale as keyof typeof pro.specialty]}</p>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
          <MapPin size={12} className="shrink-0" /> {pro.city}
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mt-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={13} className="text-primary fill-primary" />
          ))}
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {kws.map((kw) => (
            <span
              key={kw.id}
              className="text-xs border border-border text-foreground px-2.5 py-0.5 rounded-full transition-colors group-hover:border-primary/30"
            >
              {kw.name[locale as keyof typeof kw.name]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
