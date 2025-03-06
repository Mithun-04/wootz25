"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { IoMenu, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies  from "universal-cookie";
import "../styles/header.css";

const Header = ({onRegisterClick}) => {

  const cookies = new Cookies();
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    const token = cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isSticky ? "sticky" : ""}`}>
      <h1>Wootz 2025</h1>
      <nav>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="hero" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="events" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Events</Link></li>
          <li><Link to="workshops" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Workshops</Link></li>
          <li><Link to="paper-presentation" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Paper Presentation</Link></li>
          <li><Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Contact</Link></li>

          {/* Show Dashboard + Logout if authenticated, else show Register */}
          {isAuthenticated ? (
            <>
              <li onClick={() => {
                setMenuOpen(false);
                onRegisterClick();
              }}>
                <a href="#">Dashboard</a>
              </li>
            </>
          ) : (
            <li onClick={() => {
              setMenuOpen(false);
              window.location.href = "/auth/signup";
            }}>
              <a href="#">Register</a>
            </li>
          )}
        </ul>

        {/* Toggle Menu Icon */}
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
