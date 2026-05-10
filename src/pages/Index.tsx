import { useState, useCallback } from "react";
import Hero from "@/components/home/Hero";
import EmotionalSearch from "@/components/home/EmotionalSearch";
import StartHere from "@/components/home/StartHere";
import HowItWorks from "@/components/home/HowItWorks";
import VerificationTrust from "@/components/home/VerificationTrust";
import UpcomingActivities from "@/components/home/UpcomingActivities";
import RecentBlog from "@/components/home/RecentBlog";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import Testimonials from "@/components/home/Testimonials";
import OrientResults from "@/components/home/OrientResults";
import { getProfessionals } from "@/lib/api";
import type { Professional } from "@/lib/mocks";

export default function Index() {
  const [orientResult, setOrientResult] = useState<{
    query: string;
    explanation?: string;
    professionals: Professional[];
    variant: "classic" | "emotional";
  } | null>(null);

  const handleClassicSearch = useCallback(
    (filters: { q?: string; therapyId?: string; city?: string }) => {
      const results = getProfessionals(filters);
      const queryLabel = filters.q || filters.therapyId || filters.city || "";
      setOrientResult({
        query: queryLabel,
        professionals: results,
        variant: "classic",
      });
    },
    []
  );

  const handleEmotionalSearch = useCallback((query: string) => {
    const results = getProfessionals({ q: query });
    setOrientResult({
      query,
      professionals: results.length > 0 ? results : getProfessionals().slice(0, 3),
      variant: "emotional",
    });
  }, []);

  const handleNewSearch = useCallback(() => {
    setOrientResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero onClassicSearch={handleClassicSearch} />

      {orientResult && orientResult.professionals.length > 0 && (
        <OrientResults
          query={orientResult.query}
          professionals={orientResult.professionals}
          onNewSearch={handleNewSearch}
          variant={orientResult.variant}
        />
      )}

      <EmotionalSearch onSearch={handleEmotionalSearch} />

      <StartHere />

      <HowItWorks />

      <VerificationTrust />

      <UpcomingActivities />

      <RecentBlog />

      <Testimonials />

      <FAQ />

      <CTASection />
    </>
  );
}
