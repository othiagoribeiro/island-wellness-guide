import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { professionals, activities } from "@/lib/mocks";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold">
      {count}{suffix}
    </span>
  );
}

export default function TrustStrip() {
  const { t } = useI18n();
  const proCount = professionals.filter((p) => p.published && p.verificationStatus === "approved").length;
  const actCount = activities.length;

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-primary-foreground">
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounter target={proCount} suffix="+" />
          <p className="text-sm font-medium opacity-80 tracking-wide">{t("trust.professionals")}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounter target={actCount} />
          <p className="text-sm font-medium opacity-80 tracking-wide">{t("trust.activities")}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl md:text-4xl font-bold">ES · CA · EN · DE</span>
          <p className="text-sm font-medium opacity-80 tracking-wide">{t("trust.multilingual")}</p>
        </div>
      </div>
    </section>
  );
}
