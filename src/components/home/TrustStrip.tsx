import { useI18n } from "@/i18n/useI18n";
import { professionals, activities } from "@/lib/mocks";

export default function TrustStrip() {
  const { t } = useI18n();
  const proCount = professionals.filter((p) => p.published && p.verificationStatus === "approved").length;
  const actCount = activities.length;

  return (
    <section className="bg-brown text-primary-foreground py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <span className="text-3xl font-bold">{proCount}+</span>
          <p className="text-sm font-medium mt-1 opacity-80">{t("trust.professionals")}</p>
        </div>
        <div>
          <span className="text-3xl font-bold">{actCount}</span>
          <p className="text-sm font-medium mt-1 opacity-80">{t("trust.activities")}</p>
        </div>
        <div>
          <span className="text-3xl font-bold">ES · CA · EN · DE</span>
          <p className="text-sm font-medium mt-1 opacity-80">Multilingual</p>
        </div>
      </div>
    </section>
  );
}
