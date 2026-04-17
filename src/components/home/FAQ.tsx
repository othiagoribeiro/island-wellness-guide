import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/locales";
import { Plus } from "lucide-react";

interface FAQItem {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: { es: "¿Cómo se verifican los profesionales?", ca: "Com es verifiquen els professionals?", en: "How are professionals verified?", de: "Wie werden die Fachleute überprüft?" },
    a: { es: "Cada profesional pasa por un proceso de verificación que incluye revisión de titulaciones, experiencia profesional y referencias. Solo los que cumplen nuestros estándares aparecen como verificados.", ca: "Cada professional passa per un procés de verificació que inclou revisió de titulacions, experiència professional i referències.", en: "Each professional undergoes a verification process that includes review of qualifications, professional experience, and references. Only those meeting our standards appear as verified.", de: "Jede Fachkraft durchläuft einen Verifizierungsprozess, der die Prüfung von Qualifikationen, Berufserfahrung und Referenzen umfasst." },
  },
  {
    q: { es: "¿Es gratuito buscar profesionales?", ca: "És gratuït cercar professionals?", en: "Is it free to search for professionals?", de: "Ist die Suche nach Fachleuten kostenlos?" },
    a: { es: "Sí, buscar y contactar profesionales a través de nuestro directorio es completamente gratuito para los usuarios.", ca: "Sí, cercar i contactar professionals a través del nostre directori és completament gratuït per als usuaris.", en: "Yes, searching and contacting professionals through our directory is completely free for users.", de: "Ja, die Suche und Kontaktaufnahme mit Fachleuten über unser Verzeichnis ist für Nutzer völlig kostenlos." },
  },
  {
    q: { es: "¿Qué tipo de terapias puedo encontrar?", ca: "Quin tipus de teràpies puc trobar?", en: "What types of therapies can I find?", de: "Welche Therapiearten kann ich finden?" },
    a: { es: "Ofrecemos un amplio abanico: osteopatía, acupuntura, reiki, mindfulness, yoga terapéutico, breathwork, naturopatía, pilates, coaching y más.", ca: "Oferim un ampli ventall: osteopatia, acupuntura, reiki, mindfulness, ioga terapèutic, breathwork, naturopatia, pilates, coaching i més.", en: "We offer a wide range: osteopathy, acupuncture, reiki, mindfulness, therapeutic yoga, breathwork, naturopathy, pilates, coaching and more.", de: "Wir bieten ein breites Spektrum: Osteopathie, Akupunktur, Reiki, Achtsamkeit, therapeutisches Yoga, Atemarbeit, Naturheilkunde, Pilates, Coaching und mehr." },
  },
  {
    q: { es: "¿Cómo funciona la orientación con IA?", ca: "Com funciona l'orientació amb IA?", en: "How does the AI guidance work?", de: "Wie funktioniert die KI-Empfehlung?" },
    a: { es: "Describe cómo te sientes y nuestro sistema te sugiere terapias y profesionales relevantes. Es orientativo y no sustituye el consejo médico.", ca: "Descriu com et sents i el nostre sistema et suggereix teràpies i professionals rellevants.", en: "Describe how you feel and our system suggests relevant therapies and professionals. It's informational and doesn't replace medical advice.", de: "Beschreiben Sie, wie Sie sich fühlen, und unser System schlägt relevante Therapien und Fachleute vor." },
  },
  {
    q: { es: "¿Puedo registrarme como profesional?", ca: "Puc registrar-me com a professional?", en: "Can I register as a professional?", de: "Kann ich mich als Fachkraft registrieren?" },
    a: { es: "Sí, si eres terapeuta o profesional del bienestar en Mallorca, puedes solicitar tu registro en nuestro directorio desde la sección 'Eres profesional'.", ca: "Sí, si ets terapeuta o professional del benestar a Mallorca, pots sol·licitar el teu registre al nostre directori des de la secció 'Ets professional'.", en: "Yes, if you're a therapist or wellness professional in Mallorca, you can request registration in our directory from the 'Are you a professional' section.", de: "Ja, wenn Sie Therapeut oder Wellness-Fachkraft auf Mallorca sind, können Sie Ihre Registrierung in unserem Verzeichnis beantragen." },
  },
];

function FAQRow({ item, locale }: { item: FAQItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className="border-b transition-colors"
      style={{ borderColor: "rgba(44,74,62,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-[15px] md:text-[16px] pr-6 group-hover:text-primary transition-colors duration-200">
          {item.q[locale]}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: open ? "hsl(var(--primary))" : "rgba(44,74,62,0.06)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus size={16} style={{ color: open ? "white" : "hsl(var(--primary))" }} />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height }}
      >
        <p className="text-muted-foreground text-sm md:text-[15px] pb-6 pr-12 leading-relaxed">
          {item.a[locale]}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t, locale } = useI18n();

  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-3">
          {t("faq.title")}
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-12">
          {t("faq.subtitle")}
        </p>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQRow key={i} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
