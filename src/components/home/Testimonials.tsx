import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import type { Locale } from "@/i18n/locales";

interface Testimonial {
  name: string;
  city: string;
  initials: string;
  color: string;
  text: Record<Locale, string>;
}

const testimonials: Testimonial[] = [
  {
    name: "Laura M.",
    city: "Palma",
    initials: "LM",
    color: "hsl(160,26%,35%)",
    text: {
      es: "Encontré a mi osteópata en menos de cinco minutos. La verificación me dio mucha confianza.",
      ca: "Vaig trobar el meu osteòpata en menys de cinc minuts. La verificació em va donar molta confiança.",
      en: "I found my osteopath in less than five minutes. The verification gave me great confidence.",
      de: "Ich habe meinen Osteopathen in weniger als fünf Minuten gefunden. Die Verifizierung gab mir großes Vertrauen.",
    },
  },
  {
    name: "Thomas W.",
    city: "Sóller",
    initials: "TW",
    color: "hsl(24,40%,50%)",
    text: {
      es: "Después de años buscando un buen terapeuta en la isla, por fin tengo un lugar donde comparar y elegir con calma.",
      ca: "Després d'anys buscant un bon terapeuta a l'illa, per fi tinc un lloc on comparar i triar amb calma.",
      en: "After years searching for a good therapist on the island, I finally have a place to compare and choose calmly.",
      de: "Nach Jahren der Suche nach einem guten Therapeuten auf der Insel habe ich endlich einen Ort, um in Ruhe zu vergleichen und zu wählen.",
    },
  },
  {
    name: "Marta R.",
    city: "Pollença",
    initials: "MR",
    color: "hsl(200,30%,45%)",
    text: {
      es: "El buscador inteligente entendió exactamente lo que necesitaba. Me recomendó profesionales perfectos para mi caso.",
      ca: "El cercador intel·ligent va entendre exactament el que necessitava. Em va recomanar professionals perfectes per al meu cas.",
      en: "The smart search understood exactly what I needed. It recommended professionals perfect for my case.",
      de: "Die intelligente Suche verstand genau, was ich brauchte. Sie empfahl mir perfekte Fachleute für meinen Fall.",
    },
  },
  {
    name: "Klaus B.",
    city: "Deià",
    initials: "KB",
    color: "hsl(280,25%,45%)",
    text: {
      es: "Como residente alemán, valoro mucho que la plataforma esté en cuatro idiomas. Me sentí como en casa.",
      ca: "Com a resident alemany, valoro molt que la plataforma estigui en quatre idiomes. Em vaig sentir com a casa.",
      en: "As a German resident, I really appreciate the platform being in four languages. I felt right at home.",
      de: "Als deutscher Einwohner schätze ich es sehr, dass die Plattform in vier Sprachen verfügbar ist. Ich fühlte mich wie zu Hause.",
    },
  },
  {
    name: "Sofia P.",
    city: "Manacor",
    initials: "SP",
    color: "hsl(340,30%,50%)",
    text: {
      es: "Reservé mi primera sesión de mindfulness directamente desde el perfil. Todo fue súper fácil y rápido.",
      ca: "Vaig reservar la meva primera sessió de mindfulness directament des del perfil. Tot va ser súper fàcil i ràpid.",
      en: "I booked my first mindfulness session directly from the profile. Everything was super easy and fast.",
      de: "Ich habe meine erste Achtsamkeitssitzung direkt über das Profil gebucht. Alles war super einfach und schnell.",
    },
  },
  {
    name: "James L.",
    city: "Alcúdia",
    initials: "JL",
    color: "hsl(140,25%,40%)",
    text: {
      es: "Vine de vacaciones y necesitaba un quiromasajista urgente. En diez minutos ya tenía cita confirmada.",
      ca: "Vaig venir de vacances i necessitava un quiromassatgista urgent. En deu minuts ja tenia cita confirmada.",
      en: "I came on vacation and urgently needed a chiromassage therapist. In ten minutes I had a confirmed appointment.",
      de: "Ich kam im Urlaub und brauchte dringend einen Chiromasseur. In zehn Minuten hatte ich einen bestätigten Termin.",
    },
  },
];

const TITLES: Record<string, Record<string, string>> = {
  title: {
    es: "Lo que dicen nuestros usuarios",
    ca: "El que diuen els nostres usuaris",
    en: "What our users say",
    de: "Was unsere Nutzer sagen",
  },
};

export default function Testimonials() {
  const { locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number>(0);
  const scrollPos = useRef(0);

  // Duplicate items for seamless loop
  const items = [...testimonials, ...testimonials];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.4; // px per frame
    const singleSetWidth = el.scrollWidth / 2;

    const animate = () => {
      if (!isPaused) {
        scrollPos.current += speed;
        if (scrollPos.current >= singleSetWidth) {
          scrollPos.current -= singleSetWidth;
        }
        el.scrollLeft = scrollPos.current;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused]);

  return (
    <section className="py-24 md:py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-10 md:mb-14">
        <h2
          className="text-2xl md:text-3xl font-bold text-primary text-center"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {TITLES.title[locale] ?? TITLES.title.es}
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden cursor-grab select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {items.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="shrink-0 w-[340px] sm:w-[380px] bg-white rounded-2xl p-7 transition-shadow duration-300 hover:shadow-md"
            style={{
              boxShadow: "0 2px 16px rgba(44,74,62,0.07)",
            }}
          >
            {/* Quote */}
            <p className="text-[15px] leading-[1.7] mb-6" style={{ color: "rgba(0,0,0,0.85)" }}>
              "{t.text[locale]}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                style={{ backgroundColor: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-primary leading-tight">{t.name}</p>
                <p className="text-xs text-stone">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
