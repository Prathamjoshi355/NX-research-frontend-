import Hero from "../components/Hero";
import EcosystemPillars from "../components/EcosystemPillars";
import FounderCirclePreview from "../components/FounderCirclePreview";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import VisionMission from "../components/VisionMission";

export default function Home() {
  return (
    <main>
      <Hero />
      <EcosystemPillars />
      <FounderCirclePreview />
      <HowItWorks />
      <Testimonials />
      <VisionMission />
    </main>
  );
}
