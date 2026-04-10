import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="bg-terracotta py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "white" }}>
          {t("cta.title")}
        </h2>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
          {t("cta.subtitle")}
        </p>
        <Link
          to="/pro/register"
          className="inline-block bg-primary text-primary-foreground font-semibold px-9 py-4 rounded-lg hover:shadow-lg hover:opacity-90 transition-all"
        >
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
