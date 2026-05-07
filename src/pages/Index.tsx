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
import { getOrientResults, getProfessionals } from "@/lib/api";
import type { Professional } from "@/lib/mocks";

export default function Index() {
  const [orientResult, setOrientResult] = useState<{
    query: string;
    explanation?: string;
    professionals: Professional[];
  } | null>(null);

  const handleClassicSearch = useCallback(
    (filters: { q?: string; therapyId?: string; city?: string }) => {
      const results = getProfessionals(filters);
      const queryLabel = filters.q || filters.therapyId || filters.city || "";
      setOrientResult({
        query: queryLabel,
        professionals: results,
      });
    },
    []
  );

  const handleNewSearch = useCallback(() => {
    setOrientResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* 1. Hero */}
      <Hero onClassicSearch={handleClassicSearch} />

      {/* Search results */}
      {orientResult && orientResult.professionals.length > 0 && (
        <OrientResults
          query={orientResult.query}
          professionals={orientResult.professionals}
          onNewSearch={handleNewSearch}
        />
      )}

      {/* 2. Emotional search */}
      <EmotionalSearch />

      {/* 3. Start here */}
      <StartHere />

      {/* 4. How it works */}
      <HowItWorks />

      {/* 3. Verification trust block */}
      <VerificationTrust />

      {/* 4. Upcoming activities */}
      <UpcomingActivities />

      {/* 5. Blog preview */}
      <RecentBlog />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. FAQ */}
      <FAQ />

      {/* 8. Therapist CTA */}
      <CTASection />
    </>
  );
}
