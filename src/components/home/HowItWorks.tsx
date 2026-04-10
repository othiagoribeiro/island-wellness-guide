import { useI18n } from "@/i18n/useI18n";
import { ShieldCheck, Layers, MapPin } from "lucide-react";

export default function HowItWorks() {
  const { t } = useI18n();

  const cards = [
    { icon: ShieldCheck, titleKey: "how.verified.title" as const, descKey: "how.verified.desc" as const },
    { icon: Layers, titleKey: "how.multi.title" as const, descKey: "how.multi.desc" as const },
    { icon: MapPin, titleKey: "how.local.title" as const, descKey: "how.local.desc" as const },
  ];

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brown text-center mb-12">{t("how.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {cards.map((card) => (
            <div key={card.titleKey} className="bg-surface rounded-xl p-5 md:p-8 text-center shadow-sm">
              <card.icon size={36} className="text-terracotta mx-auto mb-4" />
              <h3 className="font-semibold text-brown text-lg mb-2">{t(card.titleKey)}</h3>
              <p className="text-stone text-sm">{t(card.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
