import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import HowItWorks from "@/components/home/HowItWorks";
import RecentBlog from "@/components/home/RecentBlog";
import CTASection from "@/components/home/CTASection";

export default function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <RecentBlog />
      <CTASection />
    </>
  );
}
