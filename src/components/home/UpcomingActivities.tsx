import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { MapPin } from "lucide-react";
import { activities } from "@/lib/mocks";
import type { Locale } from "@/i18n/locales";

const MONTH_NAMES: Record<Locale, string[]> = {
  es: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
  ca: ["GEN","FEB","MAR","ABR","MAI","JUN","JUL","AGO","SET","OCT","NOV","DES"],
  en: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
  de: ["JAN","FEB","MÄR","APR","MAI","JUN","JUL","AUG","SEP","OKT","NOV","DEZ"],
};

export default function UpcomingActivities() {
  const { t, locale } = useI18n();

  const upcoming = activities
    .filter((a) => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          {t("activities.preview.title")}
        </h2>
        <p className="text-muted-foreground text-center mb-10 md:mb-14 text-sm md:text-base">
          {t("activities.preview.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {upcoming.map((act) => {
            const d = new Date(act.date);
            const day = d.getDate();
            const month = MONTH_NAMES[locale][d.getMonth()];

            return (
              <div
                key={act.id}
                className="bg-surface rounded-xl p-6 shadow-sm border border-border/40 flex flex-col"
              >
                {/* Date badge */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {day}
                  </span>
                  <span className="ml-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {month}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-primary text-base mb-2 leading-snug">
                  {act.title[locale] || act.title.es}
                </h3>

                {/* City */}
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{act.city}</span>
                </div>

                <div className="mt-auto pt-4">
                  <Link
                    to={`/activities`}
                    className="inline-block text-sm font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    {t("activities.preview.seeActivity")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/activities"
            className="text-accent font-medium text-base hover:opacity-80 transition-opacity"
          >
            {t("activities.preview.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
