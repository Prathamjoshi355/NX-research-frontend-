import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InitiativesPage from "./pages/InitiativesPage";
import EmpowermentPage from "./pages/EmpowermentPage";
import GovResearchPage from "./pages/GovResearchPage";
import PrivateResearchPage from "./pages/PrivateResearchPage";
import FounderCirclePage from "./pages/FounderCirclePage";
import JoinPage from "./pages/JoinPage";
import FCCPage from "./pages/FCC";
import ScrollToTop from "./components/ScrollToTop";
import FCCregistration from "./pages/FCCregistration"
import NXForm from "./pages/JoinPage";

function AppContent() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-neon-cyan/30 selection:text-neon-cyan">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/initiatives" element={<InitiativesPage />} />
        <Route path="/empowerment" element={<EmpowermentPage />} />
        <Route path="/gov-research" element={<GovResearchPage />} />
        <Route path="/private-research" element={<PrivateResearchPage />} />
        <Route path="/founder-circle" element={<FounderCirclePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/FCC" element={<FCCPage />} />
        <Route path="/join" element={<NXForm />} />
        <Route path="/FCCregistration" element={<FCCregistration/>}/>
        {/* Add more routes here as they are built */}
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
