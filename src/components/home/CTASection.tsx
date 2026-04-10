import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-4 block">
          {t("cta.eyebrow")}
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {t("cta.title")}
        </h2>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
          {t("cta.subtitle")}
        </p>
        <Link
          to="/pro/register"
          className="inline-block bg-surface text-primary font-semibold px-9 py-4 rounded-[10px] hover:shadow-lg hover:opacity-95 transition-all"
          style={{ height: "56px", lineHeight: "24px" }}
        >
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
