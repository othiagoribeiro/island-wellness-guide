import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

const CATEGORIES = [
  {
    key: "explore.bodywork" as const,
    category: "bodywork",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C14.5 4 13 5.5 13 7.5C13 9.5 14.5 11 16 11C17.5 11 19 9.5 19 7.5C19 5.5 17.5 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14C8 14 10 12 16 12C22 12 24 14 24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 14V20C10 20 10 24 12 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 14V20C22 20 22 24 20 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 18H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "explore.mind" as const,
    category: "mind",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 20C12 20 8 17 8 12C8 7 11.5 4 16 4C20.5 4 24 7 24 12C24 17 20 20 16 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C12 12 13.5 14 16 14C18.5 14 20 12 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13" cy="10" r="1" fill="currentColor"/>
        <circle cx="19" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: "explore.energy" as const,
    category: "energy",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L14 14H18L16 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12C8 12 10 10 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 12C24 12 22 10 20 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 18C7 18 9 16 11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M25 18C25 18 23 16 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "explore.movement" as const,
    category: "movement",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 28L14 20L17 22V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 20L10 14L15 12L20 14L24 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: "explore.breath" as const,
    category: "breath",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 20C6 20 10 12 16 12C22 12 26 20 26 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 16C6 16 10 8 16 8C22 8 26 16 26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 24C10 24 12 20 16 20C20 20 22 24 22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "explore.traditional" as const,
    category: "traditional",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C16 4 8 10 8 18C8 22 11 28 16 28C21 28 24 22 24 18C24 10 16 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 16C12 16 14 18 16 18C18 18 20 16 20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function ExploreByTherapy() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10 md:mb-14">
          {t("explore.title")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.category} cat={cat} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/therapies"
            className="text-accent font-semibold text-base hover:opacity-80 transition-opacity"
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
      className="bg-surface rounded-xl p-6 shadow-sm border border-border/40 flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s, box-shadow 0.2s ease`,
      }}
    >
      <div className="text-accent group-hover:text-primary transition-colors duration-200">
        {cat.icon}
      </div>
      <span className="text-primary font-semibold text-[15px] text-center">
        {t(cat.key)}
      </span>
    </Link>
  );
}
