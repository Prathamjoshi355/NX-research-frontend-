
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import StudentLearning from './pages/StudentLearning';
import Mentors from './pages/Mentors';
import Impact from './pages/Impact';
import Challenges from './pages/Challenges';
import Summit from './pages/Summit';
import GovResearch from './pages/GovResearch';
import PrivateResearch from './pages/PrivateResearch';
import StudentInitiative from './pages/StudentInitiative';
import PowerEmpowerment from './pages/PowerEmpowerment';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminPanel from './pages/AdminPanel';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing Pages with Header/Footer */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/learning-power" element={<><Header /><StudentLearning /><Footer /></>} />
        <Route path="/mentors" element={<><Header /><Mentors /><Footer /></>} />
        <Route path="/impact" element={<><Header /><Impact /><Footer /></>} />
        <Route path="/challenges" element={<><Header /><Challenges /><Footer /></>} />
        <Route path="/summit" element={<><Header /><Summit /><Footer /></>} />
        <Route path="/government" element={<><Header /><GovResearch /><Footer /></>} />
        <Route path="/private" element={<><Header /><PrivateResearch /><Footer /></>} />
        <Route path="/initiative" element={<><Header /><StudentInitiative /><Footer /></>} />
        <Route path="/power" element={<><Header /><PowerEmpowerment /><Footer /></>} />
        <Route path="/login" element={<><Header /><Login /><Footer /></>} />
        <Route path="/registration" element={<><Header /><Registration /><Footer /></>} />

        {/* Dashboards - No Header/Footer (Self-contained Layouts) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/mentor" element={<MentorDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
