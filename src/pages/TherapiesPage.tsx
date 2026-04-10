import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { getTherapies } from "@/lib/api";

const THERAPY_IMAGES = [
  "https://images.unsplash.com/photo-1519823551278-64ac92734314?w=600&q=80", // osteopathy
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", // chiromassage
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80", // acupuncture
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80", // reiki
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", // mindfulness
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80", // yoga
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", // breathwork
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80", // coaching
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80", // constellations
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80", // drainage
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", // pilates
  "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80", // naturopathy
];

export default function TherapiesPage() {
  const { t, locale } = useI18n();
  const therapies = getTherapies();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">{t("ther.title")}</h1>
        <p className="text-muted-foreground mb-10 max-w-lg">
          {t("explore.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {therapies.map((th, i) => (
            <Link
              key={th.id}
              to={`/therapies/${th.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex items-end"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${THERAPY_IMAGES[i] || THERAPY_IMAGES[0]})` }}
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />
              {/* Text */}
              <div className="relative z-10 p-5 w-full">
                <h3 className="text-white font-semibold text-lg mb-1">{th.name[locale]}</h3>
                <p className="text-white/60 text-sm leading-snug line-clamp-2">{th.description[locale]}</p>
              </div>
              {/* Hover border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
