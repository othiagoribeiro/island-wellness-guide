import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-32 border-t border-border/50" style={{ background: "hsl(var(--primary) / 0.12)" }}>
      <div className="container mx-auto px-4 text-center">
        <span className="text-primary text-xs uppercase tracking-[0.15em] mb-4 block">
          {t("cta.eyebrow")}
        </span>
        <h2 className="text-2xl md:text-3xl text-primary mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-base text-foreground/70 mb-8 max-w-xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <Link
          to="/para-profesionales"
          className="inline-block bg-foreground text-background px-9 py-4 rounded-[10px] hover:opacity-90 transition-all"
          style={{ height: "56px", lineHeight: "24px" }}
        >
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
