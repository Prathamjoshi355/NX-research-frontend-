
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Summit from './pages/Summit';
import GovResearch from './pages/GovResearch';
import PrivateResearch from './pages/PrivateResearch';
import StudentInitiative from './pages/StudentInitiative';
import PowerEmpowerment from './pages/PowerEmpowerment';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

// Scroll to top on every route change to ensure a "new page" feel
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
        {/* Pages with standard Header/Footer */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/summit" element={<><Header /><Summit /><Footer /></>} />
        <Route path="/government" element={<><Header /><GovResearch /><Footer /></>} />
        <Route path="/private" element={<><Header /><PrivateResearch /><Footer /></>} />
        <Route path="/initiative" element={<><Header /><StudentInitiative /><Footer /></>} />
        <Route path="/power" element={<><Header /><PowerEmpowerment /><Footer /></>} />
        <Route path="/login" element={<><Header /><Login /><Footer /></>} />

        {/* Isolated Layouts (No standard Header/Footer) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
