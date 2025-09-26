import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiMaildotru } from "react-icons/si";

import csnlogo from "../assets/csnlogo.png";
import csnthumbnail from "../assets/csnthumbnail.png";
import expirencebg from "../assets/expirencebg.jpg";

// Small hook to detect mobile
function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = `(max-width: ${breakpointPx - 1}px)`;
    const mql = window.matchMedia(query);

    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [breakpointPx]);

  return isMobile;
}

export default function Experience() {
  const isMobile = useIsMobile(768);

  const [activeCategory, setActiveCategory] = useState("internship");
  const [activeCard, setActiveCard] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Data
  const internships = useMemo(
    () => [
      {
        title: "Web Development Intern",
        company: "CSN Global IT Solutions",
        duration: "July 28 – Sept 28, 2025",
        description:
          "Engineered a fully responsive, production-grade web platform using React.js and Tailwind CSS, delivering an intuitive, high-performance interface across all devices. Architected and integrated a secure MailJS-powered contact system, optimized for reliability and speed, while overseeing the complete deployment lifecycle from initial build to live launch.",
        logo: csnlogo,
        thumbnail: csnthumbnail,
        tech: [
          { icon: <SiReact className="text-cyan-400" />, name: "React.js" },
          { icon: <SiTailwindcss className="text-sky-400" />, name: "TailwindCSS" },
          { icon: <SiMaildotru className="text-red-400" />, name: "MailJS" },
        ],
      },
      { title: "Coming Soon", company: "", duration: "", description: "" },
      { title: "Coming Soon", company: "", duration: "", description: "" },
    ],
    []
  );

  const fulltimes = useMemo(
    () => [
      { title: "Coming Soon", company: "", duration: "", description: "" },
      { title: "Coming Soon", company: "", duration: "", description: "" },
    ],
    []
  );

  const data = activeCategory === "internship" ? internships : fulltimes;

  // Animate on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  // Sync activeCard with screen size
  useEffect(() => {
    setActiveCard(isMobile ? 0 : null);
  }, [isMobile, activeCategory]);

  // Switch category
  const switchCategory = (cat) => {
    setActiveCategory(cat);
    setActiveCard(isMobile ? 0 : null);
  };

  const handlePrev = () => {
    setActiveCard((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + data.length) % data.length;
    });
  };

  const handleNext = () => {
    setActiveCard((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % data.length;
    });
  };

  // Card content component
  const CardContent = ({ card, isActive }) => (
    <>
      {card.logo && (
        <img
          src={card.logo}
          alt={`${card.company || "Company"} logo`}
          className="w-28 h-16 object-contain mx-auto mb-3"
        />
      )}
      <h2 className="text-xl font-bold mb-1 text-cyan-400 text-center">
        {card.title}
      </h2>
      {card.company && <h3 className="text-lg text-center">{card.company}</h3>}
      {card.duration && (
        <p className="text-sm mb-3 text-center text-gray-300">{card.duration}</p>
      )}

      {card.thumbnail && (
        <img
          src={card.thumbnail}
          alt="Project Thumbnail"
          className="w-full h-30 object-cover rounded-lg mb-1 border border-gray-600"
        />
      )}

      {card.tech && (
        <div className="flex justify-center gap-4 mb-3">
          {card.tech.map((t, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-2xl">{t.icon}</div>
              <p className="text-xs">{t.name}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-gray-300 text-sm text-justify leading-relaxed">
        {card.description}
      </p>

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="p-2 bg-gray-600 rounded-full hover:bg-gray-500"
          aria-label="Previous"
        >
          <FaArrowLeft />
        </button>

        {!isMobile && isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveCard(null);
            }}
            className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full shadow hover:bg-red-500"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="p-2 bg-gray-600 rounded-full hover:bg-gray-500"
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen text-white py-12 flex flex-col items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${expirencebg})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold text-white mb-12">Experience</h1>

        {/* Category Switch */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => switchCategory("internship")}
            className={`px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 ${
              activeCategory === "internship"
                ? "bg-cyan-500 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Internship
          </button>
          <button
            onClick={() => switchCategory("fulltime")}
            className={`px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 ${
              activeCategory === "fulltime"
                ? "bg-cyan-500 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Full Time
          </button>
        </div>

        {/* Cards container */}
        <div
          className={[
            "relative w-full max-w-5xl flex justify-center items-center",
            "transition-all duration-500",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            "mt-10 mb-24",
          ].join(" ")}
        >
          {data.map((card, index) => {
            const isActive = activeCard === index;

            // On mobile, render ONLY the active card
            if (isMobile && activeCard !== index) return null;

            // Decide base classes per layout
            const baseCard =
              "p-6 rounded-2xl shadow-2xl bg-gray-700 transition-all duration-500 relative cursor-pointer";
            const sizeMobile = "w-[92%] h-auto";
            const sizeDesktop = "absolute w-80 md:w-[22rem] lg:w-[25rem] h-[35rem]";

            // Desktop stacked transforms - Adjusted for a wider, fanned-out look
            const desktopTransform = !isMobile
              ? isActive
                ? "translateY(0) scale(1.05) translateZ(10px)"
                : `translateX(${(index - 1) * 75}px) translateY(${Math.abs(index - 1) * 45}px) rotate(${(index - 1) * 8}deg) scale(${1 - Math.abs(index - 1) * 0.05})`
              : "none";
              
            // Desktop zIndex change - Ensures the first card (index 0) is on top when not active
            const zIndex = isActive ? 50 : 10 - index;
            
            // Opacity change
            const opacity = isActive || activeCard === null ? 1 : 0.6;

            return (
              <div
                key={index}
                onClick={() => {
                  if (!isMobile) setActiveCard(index);
                }}
                className={`${baseCard} ${isMobile ? sizeMobile : sizeDesktop} ${
                  !isMobile && !isActive ? "hover:scale-105" : ""
                }`}
                style={{
                  zIndex: zIndex,
                  opacity: opacity,
                  transform: desktopTransform,
                }}
              >
                {/* Conditionally render content */}
                {isMobile || isActive ? (
                  <CardContent card={card} isActive={isActive} />
                ) : (
                  // Desktop collapsed card (click to expand)
                  <div className="flex flex-col justify-center items-center h-full">
                    <h2 className="text-xl font-bold mb-2 text-cyan-400 text-center">
                      {card.title}
                    </h2>
                    {card.company && (
                      <p className="text-gray-300 text-center">at {card.company}</p>
                    )}
                    <p className="text-gray-400 text-center mt-2">
                      Click to view details
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
