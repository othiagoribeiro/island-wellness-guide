import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/locales";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: {
      es: "¿Cómo se verifican los profesionales?",
      ca: "Com es verifiquen els professionals?",
      en: "How are professionals verified?",
      de: "Wie werden die Fachleute überprüft?",
    },
    a: {
      es: "Cada profesional pasa por un proceso de verificación que incluye revisión de titulaciones, experiencia profesional y referencias. Solo los que cumplen nuestros estándares aparecen como verificados.",
      ca: "Cada professional passa per un procés de verificació que inclou revisió de titulacions, experiència professional i referències. Només els que compleixen els nostres estàndards apareixen com a verificats.",
      en: "Each professional undergoes a verification process that includes review of qualifications, professional experience, and references. Only those meeting our standards appear as verified.",
      de: "Jede Fachkraft durchläuft einen Verifizierungsprozess, der die Prüfung von Qualifikationen, Berufserfahrung und Referenzen umfasst. Nur diejenigen, die unsere Standards erfüllen, werden als geprüft angezeigt.",
    },
  },
  {
    q: {
      es: "¿Es gratuito buscar profesionales?",
      ca: "És gratuït cercar professionals?",
      en: "Is it free to search for professionals?",
      de: "Ist die Suche nach Fachleuten kostenlos?",
    },
    a: {
      es: "Sí, buscar y contactar profesionales a través de nuestro directorio es completamente gratuito para los usuarios.",
      ca: "Sí, cercar i contactar professionals a través del nostre directori és completament gratuït per als usuaris.",
      en: "Yes, searching and contacting professionals through our directory is completely free for users.",
      de: "Ja, die Suche und Kontaktaufnahme mit Fachleuten über unser Verzeichnis ist für Nutzer völlig kostenlos.",
    },
  },
  {
    q: {
      es: "¿Qué tipo de terapias puedo encontrar?",
      ca: "Quin tipus de teràpies puc trobar?",
      en: "What types of therapies can I find?",
      de: "Welche Therapiearten kann ich finden?",
    },
    a: {
      es: "Ofrecemos un amplio abanico: osteopatía, acupuntura, reiki, mindfulness, yoga terapéutico, breathwork, naturopatía, pilates, coaching y más.",
      ca: "Oferim un ampli ventall: osteopatia, acupuntura, reiki, mindfulness, ioga terapèutic, breathwork, naturopatia, pilates, coaching i més.",
      en: "We offer a wide range: osteopathy, acupuncture, reiki, mindfulness, therapeutic yoga, breathwork, naturopathy, pilates, coaching and more.",
      de: "Wir bieten ein breites Spektrum: Osteopathie, Akupunktur, Reiki, Achtsamkeit, therapeutisches Yoga, Atemarbeit, Naturheilkunde, Pilates, Coaching und mehr.",
    },
  },
  {
    q: {
      es: "¿Cómo funciona la orientación con IA?",
      ca: "Com funciona l'orientació amb IA?",
      en: "How does the AI guidance work?",
      de: "Wie funktioniert die KI-Empfehlung?",
    },
    a: {
      es: "Describe cómo te sientes y nuestro sistema te sugiere terapias y profesionales relevantes. Es orientativo y no sustituye el consejo médico.",
      ca: "Descriu com et sents i el nostre sistema et suggereix teràpies i professionals rellevants. És orientatiu i no substitueix el consell mèdic.",
      en: "Describe how you feel and our system suggests relevant therapies and professionals. It's informational and doesn't replace medical advice.",
      de: "Beschreiben Sie, wie Sie sich fühlen, und unser System schlägt relevante Therapien und Fachleute vor. Es ist informativ und ersetzt keine ärztliche Beratung.",
    },
  },
  {
    q: {
      es: "¿Puedo registrarme como profesional?",
      ca: "Puc registrar-me com a professional?",
      en: "Can I register as a professional?",
      de: "Kann ich mich als Fachkraft registrieren?",
    },
    a: {
      es: "Sí, si eres terapeuta o profesional del bienestar en Mallorca, puedes solicitar tu registro en nuestro directorio desde la sección 'Eres profesional'.",
      ca: "Sí, si ets terapeuta o professional del benestar a Mallorca, pots sol·licitar el teu registre al nostre directori des de la secció 'Ets professional'.",
      en: "Yes, if you're a therapist or wellness professional in Mallorca, you can request registration in our directory from the 'Are you a professional' section.",
      de: "Ja, wenn Sie Therapeut oder Wellness-Fachkraft auf Mallorca sind, können Sie Ihre Registrierung in unserem Verzeichnis über den Bereich 'Sind Sie Fachkraft' beantragen.",
    },
  },
];

function AccordionItem({ item, locale, index }: { item: FAQItem; locale: Locale; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className="border-b border-border last:border-b-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4 group-hover:text-primary transition-colors duration-200">
          {item.q[locale]}
        </span>
        <ChevronDown
          size={20}
          className="text-muted-foreground shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{ height }}
      >
        <p className="text-muted-foreground text-sm pb-5 pr-8 leading-relaxed">
          {item.a[locale]}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t, locale } = useI18n();

  return (
    <section className="py-12 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          {t("faq.title")}
        </h2>
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 px-6 md:px-8">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} item={item} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
