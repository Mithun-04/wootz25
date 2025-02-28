"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PricePool from "./components/PricePool";
import Events from "./components/Events";


export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1400, once: false });
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <PricePool />
      <Events />
    </div>
  );
}
