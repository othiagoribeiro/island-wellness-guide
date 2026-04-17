import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";

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
          const duration = 1200;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
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
    <span ref={ref} className="text-3xl md:text-4xl text-primary">
      {count}{suffix}
    </span>
  );
}

export default function TrustStrip() {
  const { t } = useI18n();

  return (
    <section className="bg-background py-16 md:py-28 border-t border-border/50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounter target={64} />
          <p className="text-sm text-muted-foreground tracking-wide">{t("trust.professionals")}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounter target={12} />
          <p className="text-sm text-muted-foreground tracking-wide">{t("trust.specialties")}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounter target={1500} suffix="+" />
          <p className="text-sm text-muted-foreground tracking-wide">{t("trust.community")}</p>
        </div>
      </div>
    </section>
  );
}
