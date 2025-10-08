import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import "./MobileNavbar.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Show sidebar
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(overlayRef.current, {
        opacity: 0.5,
        duration: 0.3,
        pointerEvents: "auto",
      });
    } else {
      // Hide sidebar
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="mobile-navbar">
      {/* Top Navbar */}
      <div className="navbar-top">
        <button onClick={() => setIsOpen(true)}>
          <FiMenu size={28} />
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="overlay"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div ref={sidebarRef} className="sidebarrr">
        {/* Header */}
        <div className="sidebarrr-header">
          <h2>Menu</h2>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebarrr-nav">
          {/* <a href="/dashboard">Dashboard</a> */}
          <a href="/products">Product Management</a>
          <a href="/blogs">Blog Management</a>
          <a href="/contact">Contact Us</a>
          <a href="/investors">Investor Relations</a>
          <a href="/banner">Banner</a>
          <a href="/newsletter">Newsletter</a>
          <a href="/job-applications">Career Form</a>
          <a href="/distributors">Distributor Form</a>
          <a href="/contact-queries">Contact Us Form</a>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
