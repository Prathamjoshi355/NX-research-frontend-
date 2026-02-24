import FounderCircleHero from "../components/FounderCircleHero";
import FounderCircleStartups from "../components/FounderCircleStartups";
import FounderCircleCollaboration from "../components/FounderCircleCollaboration";
import FounderCircleProcess from "../components/FounderCircleProcess";
import FounderCircleEcosystem from "../components/FounderCircleEcosystem";
import FoundersCirclejoin from "../components/Founderjoin";

export default function FounderCirclePage() {
  return (
    <main className="initiatives-page">
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
