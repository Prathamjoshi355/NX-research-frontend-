import PrivateResearchHero from "../components/PrivateResearchHero";
import PrivateResearchRoadmap from "../components/PrivateResearchRoadmap";
import PrivateResearchProjects from "../components/PrivateResearchProjects";
import PrivateResearchJoin from "../components/PrivateResearchJoin";
import PrivateResearchTestimonials from "../components/PrivateResearchTestimonials";
import SEO from "../components/SEO";

export default function PrivateResearchPage() {
  return (
    <main className="initiatives-page">
      <SEO 
        title="Private Research" 
        description="Deep research and strategic consulting for private enterprises, helping them navigate innovation and growth."
      />
      <div className="page-grid" />
      <PrivateResearchHero />
      <PrivateResearchRoadmap />
      <PrivateResearchProjects />
      <PrivateResearchJoin />
      <PrivateResearchTestimonials />
    </main>
  );
}
