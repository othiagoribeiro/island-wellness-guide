import { useI18n } from "@/i18n/useI18n";
import { MessageCircle, Search, CalendarCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    titleKey: "how.step1.title" as const,
    bodyKey: "how.step1.body" as const,
  },
  {
    icon: Search,
    titleKey: "how.step2.title" as const,
    bodyKey: "how.step2.body" as const,
  },
  {
    icon: CalendarCheck,
    titleKey: "how.step3.title" as const,
    bodyKey: "how.step3.body" as const,
  },
];

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-36 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-14 md:mb-20">
          {t("how.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              {/* Arrow connector — desktop only */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 translate-x-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/40">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Icon with terracotta reticle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: "hsl(24 40% 92%)",
                  border: "1px solid hsl(24 30% 85%)",
                }}
              >
                <step.icon
                  size={34}
                  strokeWidth={1.4}
                  className="text-stone"
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-primary text-lg mb-2">
                {t(step.titleKey)}
              </h3>

              {/* Body */}
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                {t(step.bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
