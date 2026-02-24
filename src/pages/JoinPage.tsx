import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import JoinForm from "../components/JoinForm";

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const initialPath = searchParams.get("path");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-bg-primary min-h-screen">
     
      <JoinForm initialPath={initialPath} />
    </main>
  );
}
