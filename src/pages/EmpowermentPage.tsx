import EmpowermentHero from "../components/EmpowermentHero";
import EmpowermentRoadmap from "../components/EmpowermentRoadmap";
import EmpowermentPhases from "../components/EmpowermentPhases";
import EmpowermentTracks from "../components/EmpowermentTracks";
import EmpowermentDirections from "../components/EmpowermentDirections";
import EmpowermentSupport from "../components/EmpowermentSupport";
import SEO from "../components/SEO";

export default function EmpowermentPage() {
  return (
    <main>
      <SEO 
        title="Empowerment" 
        description="Empowering the next generation of founders through structured roadmaps, mentorship, and strategic support tracks."
      />
      <EmpowermentHero />
      <EmpowermentRoadmap />
      <EmpowermentPhases />
      <EmpowermentTracks />
      <EmpowermentDirections />
      <EmpowermentSupport />
    </main>
  );
}
