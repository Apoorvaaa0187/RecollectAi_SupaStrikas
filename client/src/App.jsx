import { Routes, Route, useLocation } from "react-router-dom";
import LandingHeader from "./components/LandingHeader";
import DashboardHeader from "./components/DashboardHeader";
import Footer from "./components/Footer";
import ConstellationCanvas from './components/ConstellationCanvas'
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#050510] via-[#0a0a1a] to-[#07343a] text-white">
      <ConstellationCanvas />
      {isDashboard ? <DashboardHeader /> : <LandingHeader />}

      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
