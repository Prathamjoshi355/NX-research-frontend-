import PrivateResearchHero from "../components/PrivateResearchHero";
import PrivateResearchRoadmap from "../components/PrivateResearchRoadmap";
import PrivateResearchProjects from "../components/PrivateResearchProjects";
import PrivateResearchJoin from "../components/PrivateResearchJoin";
import PrivateResearchTestimonials from "../components/PrivateResearchTestimonials";

export default function PrivateResearchPage() {
  return (
    <main className="initiatives-page">
      <div className="page-grid" />
      <PrivateResearchHero />
      <PrivateResearchRoadmap />
      <PrivateResearchProjects />
      <PrivateResearchJoin />
      <PrivateResearchTestimonials />
    </main>
  );
}
