import FounderCircleHero from "../components/FounderCircleHero";
import FounderCircleStartups from "../components/FounderCircleStartups";
import FounderCircleCollaboration from "../components/FounderCircleCollaboration";
import FounderCircleProcess from "../components/FounderCircleProcess";
import FounderCircleEcosystem from "../components/FounderCircleEcosystem";
import FoundersCirclejoin from "../components/Founderjoin";
import SEO from "../components/SEO";

export default function FounderCirclePage() {
  return (
    <main className="initiatives-page">
      <SEO 
        title="Founder Circle | Exclusive Startup Ecosystem" 
        description="An exclusive ecosystem for founders in India to collaborate, share insights, and build high-impact ventures together with NX Research."
      />
      <div className="page-grid" />
      <FounderCircleHero />
      <FounderCircleStartups />
      <FounderCircleCollaboration />
      <FoundersCirclejoin/>
      <FounderCircleProcess />
      <FounderCircleEcosystem />
    </main>
  );
}
