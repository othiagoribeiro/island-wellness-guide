import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedProfessionals from "@/components/home/FeaturedProfessionals";
import HowItWorks from "@/components/home/HowItWorks";
import RecentBlog from "@/components/home/RecentBlog";
import CTASection from "@/components/home/CTASection";
import FAQ from "@/components/home/FAQ";

export default function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProfessionals />
      <HowItWorks />
      <RecentBlog />
      <CTASection />
      <FAQ />
    </>
  );
}
