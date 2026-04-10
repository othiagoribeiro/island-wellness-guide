import { useI18n } from "@/i18n/useI18n";
import { MessageCircle, Search, CalendarCheck } from "lucide-react";

const steps = [
  {
    num: "1",
    icon: MessageCircle,
    titleKey: "how.step1.title" as const,
    bodyKey: "how.step1.body" as const,
  },
  {
    num: "2",
    icon: Search,
    titleKey: "how.step2.title" as const,
    bodyKey: "how.step2.body" as const,
  },
  {
    num: "3",
    icon: CalendarCheck,
    titleKey: "how.step3.title" as const,
    bodyKey: "how.step3.body" as const,
  },
];

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12 md:mb-16">
          {t("how.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-5xl mx-auto relative">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center text-center relative">
              {/* Arrow connector — desktop only, between cards */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 translate-x-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent/50">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Step number */}
              <span className="text-[48px] font-bold text-accent/60 leading-none mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {step.num}
              </span>

              {/* Icon */}
              <step.icon size={28} className="text-accent mb-4" />

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
