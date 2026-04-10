import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { professionals, activities } from "@/lib/mocks";
import { ShieldCheck, CalendarDays, Globe } from "lucide-react";

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
          const duration = 1400;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold tabular-nums">
      {count}{suffix}
    </span>
  );
}

function FadeInCard({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function TrustStrip() {
  const { t } = useI18n();
  const proCount = professionals.filter((p) => p.published && p.verificationStatus === "approved").length;
  const actCount = activities.length;

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Card 1 — Professionals */}
          <FadeInCard delay={0}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors duration-500 group">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={26} className="text-primary-foreground" />
              </div>
              <AnimatedCounter target={proCount} suffix="+" />
              <p className="text-primary-foreground/80 text-sm font-medium mt-2 tracking-wide">
                {t("trust.professionals")}
              </p>
            </div>
          </FadeInCard>

          {/* Card 2 — Activities */}
          <FadeInCard delay={0.12}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors duration-500 group text-primary-foreground">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                <CalendarDays size={26} className="text-primary-foreground" />
              </div>
              <AnimatedCounter target={actCount} />
              <p className="text-primary-foreground/80 text-sm font-medium mt-2 tracking-wide">
                {t("trust.activities")}
              </p>
            </div>
          </FadeInCard>

          {/* Card 3 — Multilingual */}
          <FadeInCard delay={0.24}>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors duration-500 group text-primary-foreground">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                <Globe size={26} className="text-primary-foreground" />
              </div>
              <span className="text-4xl md:text-5xl font-bold">4</span>
              <p className="text-primary-foreground/80 text-sm font-medium mt-2 tracking-wide">
                ES · CA · EN · DE
              </p>
            </div>
          </FadeInCard>
        </div>
      </div>
    </section>
  );
}
