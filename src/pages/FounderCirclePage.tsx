import FounderCircleHero from "../components/FounderCircleHero";
import FounderCircleCollaboration from "../components/FounderCircleCollaboration";
import FounderCircleProcess from "../components/FounderCircleProcess";
import FounderCircleEcosystem from "../components/FounderCircleEcosystem";

export default function FounderCirclePage() {
  return (
    <main className="initiatives-page">
      <div className="page-grid" />
      <FounderCircleHero />
      <FounderCircleCollaboration />
      <FounderCircleProcess />
      <FounderCircleEcosystem />
    </main>
  );
}
