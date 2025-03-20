"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { IoMenu, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import "../styles/header.css";

const Header = ({ onRegisterClick }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user)?.user;
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setAuth(isAuthenticated); 
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch by rendering only on client

  return (
    <header className={`header ${isSticky ? "sticky" : ""}`}>
      <h1>Wootz 2025</h1>

      <nav>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="hero" smooth={true} duration={500} onClick={() => setMenuOpen(false)} style={{ cursor: 'pointer' }}>Home</Link></li>
          <li><Link to="events" smooth={true} duration={500} onClick={() => setMenuOpen(false)} style={{ cursor: 'pointer' }}>Events</Link></li>
          <li><Link to="workshops" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Workshops</Link></li>
          <li><Link to="faq" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>FAQs</Link></li>
          <li><Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Contact</Link></li>
          {user ? (
            <li onClick={() => { setMenuOpen(false); onRegisterClick(); }}>
              Dashboard
            </li>
          ) : (
            <li onClick={() => {
              setMenuOpen(false);
              window.location.href = "/auth/signup";
            }}>
              Register
            </li>
          )}
        </ul>

        {menuOpen ? (
          <IoClose className="menu-icon" onClick={() => setMenuOpen(false)} />
        ) : (
          <IoMenu className="menu-icon" onClick={() => setMenuOpen(true)} />
        )}
      </nav>
    </header>
  );
};

export default Header;
