import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { getActivities } from "@/lib/api";
import { CITIES } from "@/lib/mocks";
import { MapPin, Calendar } from "lucide-react";

export default function ActivitiesPage() {
  const { t, locale } = useI18n();
  const [city, setCity] = useState("");
  const results = getActivities(city || undefined);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-brown mb-6">{t("act.title")}</h1>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-surface border border-border rounded-lg px-4 text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          style={{ height: 56, fontSize: 16 }}
        >
          <option value="">{t("act.allCities")}</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex flex-col gap-4">
          {results.map((act) => (
            <div key={act.id} className="bg-surface rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-brown text-lg">{act.title[locale]}</h3>
              <div className="flex items-center gap-4 text-stone text-sm mt-2">
                <span className="flex items-center gap-1"><MapPin size={14} /> {act.city}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(act.date).toLocaleDateString(locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : locale === "ca" ? "ca-ES" : "es-ES")}</span>
              </div>
              {act.description && <p className="text-foreground text-sm mt-3">{act.description[locale]}</p>}
              <a
                href={act.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-terracotta text-surface font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("act.signup")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
