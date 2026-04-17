import { useI18n } from "@/i18n/useI18n";
import { CheckCircle, ShieldCheck, Star, MapPin } from "lucide-react";

export default function VerificationTrust() {
  const { t } = useI18n();

  const checks = [
    t("trust.block.check1"),
    t("trust.block.check2"),
    t("trust.block.check3"),
  ];

  const stats = [
    { icon: ShieldCheck, titleKey: "trust.block.stat1.title" as const, bodyKey: "trust.block.stat1.body" as const },
    { icon: Star, titleKey: "trust.block.stat2.title" as const, bodyKey: "trust.block.stat2.body" as const },
    { icon: MapPin, titleKey: "trust.block.stat3.title" as const, bodyKey: "trust.block.stat3.body" as const },
  ];

  return (
    <section className="py-24 md:py-36 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-10 md:mb-14">
          {t("trust.block.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
          {/* Left column — text */}
          <div className="flex flex-col justify-center">
            <p className="text-foreground text-base leading-relaxed mb-6">
              {t("trust.block.body")}
            </p>

            <ul className="space-y-3 mb-6">
              {checks.map((text, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground text-[13px] italic leading-relaxed">
              {t("trust.block.disclaimer")}
            </p>
          </div>

          {/* Right column — stat cards */}
          <div className="flex flex-col gap-4">
            {stats.map((stat) => (
              <div
                key={stat.titleKey}
                className="bg-surface border border-border/40 rounded-[10px] p-5 shadow-sm flex items-start gap-4"
              >
                <stat.icon size={24} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary text-[15px] mb-1">{t(stat.titleKey)}</h4>
                  <p className="text-muted-foreground text-sm">{t(stat.bodyKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
