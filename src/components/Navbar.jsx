// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

const sections = [
  { id: "intro", label: "INTRO" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("intro");
  const [showDesktopNavbar, setShowDesktopNavbar] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // close mobile menu after click
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const startSection = document.getElementById("start");
      let current = "intro";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (
          element &&
          window.scrollY >= element.offsetTop - element.offsetHeight / 3
        ) {
          current = section.id;
        }
      });

      setActiveSection(current);

      const bottomStart = startSection
        ? startSection.offsetTop + startSection.offsetHeight
        : 0;

      // Desktop Navbar: hide on intro, show after
      if (window.scrollY > bottomStart) {
        setShowDesktopNavbar(true);
      } else {
        setShowDesktopNavbar(false);
      }

      // Mobile Navbar: show if scrolling up or at start
      if (window.scrollY < prevScroll || window.scrollY < bottomStart) {
        setShowMobileNavbar(true);
      } else {
        setShowMobileNavbar(false);
      }

      setPrevScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <>
      {/* Desktop Vertical Navbar */}
      {showDesktopNavbar && (
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col space-y-8 z-50">
          {sections.map((section) => (
            <div key={section.id} className="relative group flex items-center">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-cyan-400 scale-125"
                    : "bg-gray-500 hover:bg-gray-300"
                }`}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {section.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Navbar */}
      {showMobileNavbar && (
        <div className="md:hidden fixed top-4 right-4 z-50">
          {/* Hamburger Icon */}
          {!mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col justify-between w-8 h-6 bg-transparent focus:outline-none"
            >
              <span className="block h-1 w-full bg-white rounded" />
              <span className="block h-1 w-full bg-white rounded" />
              <span className="block h-1 w-full bg-white rounded" />
            </button>
          )}

          {/* Fullscreen Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-gray-900 text-white flex flex-col justify-center items-center z-50 space-y-8">
              {/* Cross Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white text-3xl font-bold focus:outline-none"
              >
                &times;
              </button>

              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-2xl hover:text-cyan-400 transition-colors duration-200"
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
