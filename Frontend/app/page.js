"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PricePool from "./components/PricePool";
import Events from "./components/Events";
import Dashboard from "./components/Dashboard";
import Workshop from "./components/Workshop";
import FaQ from "./components/FaQ";
import Contact from "./components/Contact";

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
      <Workshop />
      <FaQ />
      <Contact />
      <Dashboard isOpen={showDashboard} onBackClick={() => setShowDashboard(false)} />
    </div>
  );
}
