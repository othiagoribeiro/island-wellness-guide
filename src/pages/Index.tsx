import { useState, useCallback } from "react";
import Hero from "@/components/home/Hero";
import FeaturedProfessionals from "@/components/home/FeaturedProfessionals";
import TrustStrip from "@/components/home/TrustStrip";
import HowItWorks from "@/components/home/HowItWorks";
import ExploreByTherapy from "@/components/home/ExploreByTherapy";
import VerificationTrust from "@/components/home/VerificationTrust";
import UpcomingActivities from "@/components/home/UpcomingActivities";
import RecentBlog from "@/components/home/RecentBlog";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import OrientResults from "@/components/home/OrientResults";
import { getOrientResults } from "@/lib/api";
import { useI18n } from "@/i18n/useI18n";
import type { Professional } from "@/lib/mocks";

// Empathetic mock responses based on keywords
function getEmpathyText(query: string, locale: string): string {
  const q = query.toLowerCase();
  const responses: Record<string, Record<string, string>> = {
    stress: {
      es: "Siento mucho que estés atravesando este momento de estrés; es una sensación muy desgastante. Para ayudarte a encontrar alivio, he seleccionado profesionales que pueden trabajar tanto en la relajación física como en el equilibrio emocional. Estos recursos están pensados para ayudarte a reducir la tensión y recuperar tu bienestar.",
      ca: "Sento molt que estiguis passant per aquest moment d'estrès; és una sensació molt esgotadora. Per ajudar-te a trobar alleujament, he seleccionat professionals que poden treballar tant en la relaxació física com en l'equilibri emocional.",
      en: "I'm sorry you're going through this stressful time; it can be truly exhausting. To help you find relief, I've selected professionals who can work on both physical relaxation and emotional balance. These resources are designed to help you reduce tension and restore your wellbeing.",
      de: "Es tut mir leid, dass Sie gerade unter Stress leiden; das kann wirklich erschöpfend sein. Um Ihnen zu helfen, habe ich Fachleute ausgewählt, die sowohl an körperlicher Entspannung als auch am emotionalen Gleichgewicht arbeiten können.",
    },
    pain: {
      es: "Siento mucho que estés lidiando con dolor; sé lo limitante que puede ser. He seleccionado profesionales especializados en terapias manuales y tratamientos que pueden ayudarte a aliviar las molestias y mejorar tu movilidad.",
      ca: "Sento molt que estiguis lluitant amb el dolor; sé com de limitant pot ser. He seleccionat professionals especialitzats en teràpies manuals i tractaments que poden ajudar-te a alleujar les molèsties.",
      en: "I'm sorry you're dealing with pain; I know how limiting it can be. I've selected professionals specializing in manual therapies and treatments that can help relieve your discomfort and improve your mobility.",
      de: "Es tut mir leid, dass Sie mit Schmerzen zu kämpfen haben. Ich habe Fachleute ausgewählt, die auf manuelle Therapien spezialisiert sind und Ihnen helfen können, Ihre Beschwerden zu lindern.",
    },
    default: {
      es: "Siento mucho que estés atravesando este momento de agotamiento y falta de energía; es una sensación muy desgastante. Para ayudarte a recuperar tu vitalidad, he seleccionado profesionales que pueden trabajar tanto en la recuperación física como en el equilibrio de tu campo energético. Estos recursos están pensados para identificar la raíz de ese cansancio y ayudarte a sentirte con fuerzas nuevamente.",
      ca: "Sento molt que estiguis passant per aquest moment d'esgotament i falta d'energia. Per ajudar-te a recuperar la teva vitalitat, he seleccionat professionals que poden treballar tant en la recuperació física com en l'equilibri del teu camp energètic.",
      en: "I'm sorry you're going through this moment of exhaustion and lack of energy; it can be truly draining. To help you recover your vitality, I've selected professionals who can work on both physical recovery and the balance of your energy field. These resources are designed to identify the root of your fatigue and help you feel strong again.",
      de: "Es tut mir leid, dass Sie diese Phase der Erschöpfung und des Energiemangels durchmachen. Um Ihnen zu helfen, Ihre Vitalität wiederzuerlangen, habe ich Fachleute ausgewählt, die sowohl an der körperlichen Erholung als auch am Gleichgewicht Ihres Energiefeldes arbeiten können.",
    },
  };

  const stressWords = ["estrés", "estrès", "stress", "gestresst", "ansied", "anxiety", "angst"];
  const painWords = ["dolor", "pain", "schmerz", "tensión", "tension", "cuello", "neck", "espalda", "back"];

  let category = "default";
  if (stressWords.some((w) => q.includes(w))) category = "stress";
  else if (painWords.some((w) => q.includes(w))) category = "pain";

  return responses[category][locale] || responses[category]["es"];
}

export default function Index() {
  const { locale } = useI18n();
  const [orientResult, setOrientResult] = useState<{
    query: string;
    explanation: string;
    professionals: Professional[];
  } | null>(null);

  const handleAiSearch = useCallback(
    (query: string) => {
      const results = getOrientResults(query);
      const explanation = getEmpathyText(query, locale);
      setOrientResult({
        query,
        explanation,
        professionals: results.professionals,
      });
    },
    [locale]
  );

  const handleNewSearch = useCallback(() => {
    setOrientResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* 1. Hero */}
      <Hero onAiSearch={handleAiSearch} />

      {/* Orient results (conditional) */}
      {orientResult && (
        <OrientResults
          query={orientResult.query}
          explanation={orientResult.explanation}
          professionals={orientResult.professionals}
          onNewSearch={handleNewSearch}
        />
      )}

      {/* 2. Community counter strip */}
      <TrustStrip />

      {/* 3. How it works — patient journey */}
      <HowItWorks />

      {/* 4. Therapy categories grid */}
      <ExploreByTherapy />

      {/* 5. Verification trust block */}
      <VerificationTrust />

      {/* 6. Upcoming activities */}
      <UpcomingActivities />

      {/* 7. Blog preview */}
      <RecentBlog />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Minimal therapist CTA */}
      <CTASection />
    </>
  );
}
