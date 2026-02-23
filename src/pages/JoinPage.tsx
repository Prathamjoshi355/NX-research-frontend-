import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JoinHero from "../components/JoinHero";
import JoinForm from "../components/JoinForm";

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const initialPath = searchParams.get("path");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg-primary min-h-screen">
      <JoinHero />
      <JoinForm initialPath={initialPath} />
    </main>
  );
}
