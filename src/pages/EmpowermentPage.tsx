import EmpowermentHero from "../components/EmpowermentHero";
import EmpowermentRoadmap from "../components/EmpowermentRoadmap";
import EmpowermentPhases from "../components/EmpowermentPhases";
import EmpowermentTracks from "../components/EmpowermentTracks";
import EmpowermentDirections from "../components/EmpowermentDirections";
import EmpowermentSupport from "../components/EmpowermentSupport";

export default function EmpowermentPage() {
  return (
    <main>
      <EmpowermentHero />
      <EmpowermentRoadmap />
      <EmpowermentPhases />
      <EmpowermentTracks />
      <EmpowermentDirections />
      <EmpowermentSupport />
    </main>
  );
}
