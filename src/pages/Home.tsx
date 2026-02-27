import Hero from "../components/Hero";
import EcosystemPillars from "../components/EcosystemPillars";
import FounderCirclePreview from "../components/FounderCirclePreview";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import VisionMission from "../components/VisionMission";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <main>
      <SEO 
        title="Home" 
        description="NX Research builds the next generation of ventures through deep research, elite networking, and strategic innovation. Join our ecosystem today."
      />
      <Hero />
      <EcosystemPillars />
      <FounderCirclePreview />
      <HowItWorks />
      <Testimonials />
      <VisionMission />
    </main>
  );
}
