import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import type { TranslationKey } from "@/i18n/translations";

const CATEGORY_IMAGES = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", // bodywork / massage
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", // mind / meditation
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80", // energy / reiki hands
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80", // movement / yoga
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", // breath / nature
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80", // traditional / herbs
];

const CATEGORIES: {
  key: TranslationKey;
  subKey: TranslationKey;
  category: string;
  image: string;
}[] = [
  { key: "explore.bodywork", subKey: "explore.bodywork.sub", category: "bodywork", image: CATEGORY_IMAGES[0] },
  { key: "explore.mind", subKey: "explore.mind.sub", category: "mind", image: CATEGORY_IMAGES[1] },
  { key: "explore.energy", subKey: "explore.energy.sub", category: "energy", image: CATEGORY_IMAGES[2] },
  { key: "explore.movement", subKey: "explore.movement.sub", category: "movement", image: CATEGORY_IMAGES[3] },
  { key: "explore.breath", subKey: "explore.breath.sub", category: "breath", image: CATEGORY_IMAGES[4] },
  { key: "explore.traditional", subKey: "explore.traditional.sub", category: "traditional", image: CATEGORY_IMAGES[5] },
];

export default function ExploreByTherapy() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          {t("explore.title")}
        </h2>
        <p className="text-muted-foreground text-center mb-10 md:mb-14 text-sm md:text-base">
          {t("explore.subtitle")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.category} cat={cat} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/therapies"
            className="text-accent font-medium text-base hover:opacity-80 transition-opacity"
          >
            {t("explore.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      to={`/professionals?category=${cat.category}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex items-end"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${cat.image})` }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)",
        }}
      />
      {/* Content */}
      <div className="relative z-10 p-4 md:p-5 w-full">
        <h3 className="text-white font-semibold text-[15px] md:text-[17px] mb-0.5">
          {t(cat.key)}
        </h3>
        <p className="text-white/60 text-xs md:text-[13px] leading-snug">
          {t(cat.subKey)}
        </p>
      </div>
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)",
          borderRadius: "inherit",
        }}
      />
    </Link>
  );
}
