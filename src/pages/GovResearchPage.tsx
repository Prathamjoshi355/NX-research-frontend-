import GovResearchHero from "../components/GovResearchHero";
import GovResearchStats from "../components/GovResearchStats";
import GovResearchRoadmap from "../components/GovResearchRoadmap";
import GovResearchProjects from "../components/GovResearchProjects";
import GovResearchTransformation from "../components/GovResearchTransformation";
import GovResearchTestimonials from "../components/GovResearchTestimonials";

export default function GovResearchPage() {
  return (
    <main className="initiatives-page">
      <div className="page-grid" />
      <GovResearchHero />
      <GovResearchStats />
      <GovResearchRoadmap />
      <GovResearchProjects />
      <GovResearchTransformation />
      <GovResearchTestimonials />
    </main>
  );
}
