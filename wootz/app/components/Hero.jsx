import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import "../styles/Hero.css"; // Import the CSS file
import { useRouter } from "next/navigation";

export function Hero() {

  const router = useRouter();
  return (
    <section id="hero">
      <BackgroundLines className="hero-container">
        <h2 className="hero-heading" data-aos="fade-down">
          Wootz 2025 <br /> Empowering the Future with Metals
        </h2>

        {/* Subtext */}
        <p className="hero-subtext" data-aos="fade-up" data-aos-delay="300">
          Join us for an incredible experience filled with innovation, workshops, and fun events. Register now!
        </p>

        {/* Buttons */}
        <div className="hero-buttons" data-aos="zoom-in" data-aos-delay="600">
          <button className="hero-button" onClick={() => router.push("/auth/login")}>
            Login
          </button>
          <button className="hero-button" onClick={() => router.push("/auth/signup")}>
            Register
          </button>
        </div>
      </BackgroundLines>
    </section>
  );
}

export default Hero;
