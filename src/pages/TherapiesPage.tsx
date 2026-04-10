import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getTherapies } from "@/lib/api";

export default function TherapiesPage() {
  const { t, locale } = useI18n();
  const therapies = getTherapies();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brown mb-8">{t("ther.title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapies.map((th) => (
            <Link
              key={th.id}
              to={`/therapies/${th.id}`}
              className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-brown text-lg mb-2 group-hover:text-terracotta transition-colors">
                {th.name[locale]}
              </h3>
              <p className="text-stone text-sm">{th.description[locale]}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
