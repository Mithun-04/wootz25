"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PricePool from "./components/PricePool";
import Events from "./components/Events";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1400, once: false });
  }, []);

  return (
    <div>
      <Header onRegisterClick={() => {
        console.log("Opening dashboard...");
        setShowDashboard(true)
      }
      } />
      <Hero onRegisterClick={() => {
        console.log("Opening dashboard...");
        setShowDashboard(true)
      }
      } />
      <PricePool />
      <Events />
      <Dashboard isOpen={showDashboard} onBackClick={() => setShowDashboard(false)} />
    </div>
  );
}
