"use client";

import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout , fetchUser} from "@/store/authSlice";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useRouter } from "next/navigation";
import "../styles/Hero.css";

export function Hero({ onRegisterClick }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLocalLogout = () => {
    dispatch(handleLogout());
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

        <div className="hero-buttons" data-aos="zoom-in" data-aos-delay="600">
          {auth === null ? ( 
            <button className="hero-button">Loading...</button>
          ) : auth ? (
            <>
              <button className="hero-button" onClick={onRegisterClick}>
                Dashboard
              </button>
              <button className="hero-button logout-btn" onClick={handleLocalLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="hero-button" onClick={() => window.location.href = "/auth/login"}>   
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
