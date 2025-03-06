"use client"; // Ensure it runs on the client side
import React, { useEffect, useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import "../styles/Hero.css";
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie';

export function Hero({ onRegisterClick }) {
  const router = useRouter();
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = cookies.get("token"); // Get token from cookies
    setIsAuthenticated(!!token); // Convert to boolean (true if exists)
  }, []);

  // Logout function
  const handleLogout = () => {
    cookies.remove("token", { path: "/" }); // Remove token from cookies
    setIsAuthenticated(false); // Update state
    router.push("/"); 
  };

  return (
    <section id="hero">
      <BackgroundLines className="hero-container">
        <h2 className="hero-heading" data-aos="fade-down">
          Wootz 2025 <br /> Empowering the Future with Metals
        </h2>

        <p className="hero-subtext" data-aos="fade-up" data-aos-delay="300">
          Join us for an incredible experience filled with innovation, workshops, and fun events. Register now!
        </p>

        {/* Buttons */}
        <div className="hero-buttons" data-aos="zoom-in" data-aos-delay="600">
          {isAuthenticated ? (
            <>
              <button className="hero-button" onClick={onRegisterClick}>
                Dashboard
              </button>
              <button className="hero-button logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="hero-button" onClick={() => router.push("/auth/login")}>
                Login
              </button>
              <button className="hero-button" onClick={() => router.push("/auth/signup")}>
                Register
              </button>
            </>
          )}
        </div>
      </BackgroundLines>
    </section>
  );
}

export default Hero;
