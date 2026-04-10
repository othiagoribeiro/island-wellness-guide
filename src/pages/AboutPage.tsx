import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";
import { ShieldCheck, BadgeCheck, Users, Check } from "lucide-react";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      {/* Section 1 — Hero text */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {t("about.hero.title")}
          </h1>
          <p className="text-foreground text-[16px] leading-[1.8]">
            {t("about.hero.body")}
          </p>
        </div>
      </section>

      {/* Section 2 — Principles */}
      <section className="bg-card py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl font-semibold text-primary text-center mb-10">
            {t("about.principles.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, titleKey: "about.principles.ethics" as const, bodyKey: "about.principles.ethics.body" as const },
              { icon: BadgeCheck, titleKey: "about.principles.verification" as const, bodyKey: "about.principles.verification.body" as const },
              { icon: Users, titleKey: "about.principles.community" as const, bodyKey: "about.principles.community.body" as const },
            ].map((card) => (
              <div
                key={card.titleKey}
                className="bg-card rounded-xl p-7 text-center"
                style={{ boxShadow: "0 2px 12px rgba(44,74,62,0.08)" }}
              >
                <card.icon size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">{t(card.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(card.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Deontological code */}
      <section className="bg-background py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {t("about.code.title")}
          </h2>
          <p className="text-foreground text-[16px] leading-[1.8] mb-6">
            {t("about.code.body")}
          </p>
          <div className="space-y-3 mb-6">
            {(["about.code.check1", "about.code.check2", "about.code.check3"] as const).map((key) => (
              <div key={key} className="flex items-start gap-3">
                <Check size={20} className="text-accent shrink-0 mt-0.5" />
                <span className="text-foreground text-[15px]">{t(key)}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-[13px] italic">
            {t("about.code.note")}
          </p>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {t("about.cta.title")}
          </h2>
          <p className="text-white/75 mb-6">{t("about.cta.body")}</p>
          <Link
            to="/pro/register"
            className="inline-flex items-center justify-center bg-white text-primary font-semibold rounded-[10px] px-8 hover:opacity-90 transition-opacity"
            style={{ height: 56 }}
          >
            {t("about.cta.button")}
          </Link>
          <p className="text-white/60 text-sm mt-4">hola@mallorcaholistica.com</p>
        </div>
      </section>
    </div>
  );
}
