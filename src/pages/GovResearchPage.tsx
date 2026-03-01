import GovResearchHero from "../components/GovResearchHero";
import GovResearchStats from "../components/GovResearchStats";
import GovResearchRoadmap from "../components/GovResearchRoadmap";
import GovResearchProjects from "../components/GovResearchProjects";
import SEO from "../components/SEO";
// import GovResearchTransformation from "../components/GovResearchTransformation";
// import GovResearchTestimonials from "../components/GovResearchTestimonials";

export default function GovResearchPage() {
  return (
    <main className="initiatives-page">
      <SEO 
        title="Government Research & Digital Transformation" 
        description="Strategic research and innovation projects for government entities in India, focusing on digital transformation and public impact."
      />
      <div className="page-grid" />
      <GovResearchHero />
      <GovResearchStats />
      <GovResearchRoadmap />
      <GovResearchProjects />
      {/* <GovResearchTestimonials /> */}
    </main>
  );
}
