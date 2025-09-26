import { useEffect, useState } from "react";
import spaceImg from "../assets/space.jpg";
import "./Intro.css";

export default function Intro() {
  const [showLine, setShowLine] = useState(false);
  const [showText, setShowText] = useState(false);
  const [hideLine, setHideLine] = useState(false);

  useEffect(() => {
    const showLineTimer = setTimeout(() => setShowLine(true), 200);
    const showTextTimer = setTimeout(() => setShowText(true), 1200);
    const hideLineTimer = setTimeout(() => setHideLine(true), 1900);

    return () => {
      clearTimeout(showLineTimer);
      clearTimeout(showTextTimer);
      clearTimeout(hideLineTimer);
    };
  }, []);

  return (
    <div
      id="start"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with scale and fixed effect */}
      <img
        src={spaceImg}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover animate-bgScale"
        style={{
          position: "fixed", // parallax effect
          zIndex: -1,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-center">
          {showText && (
            <div className="animate-popOut font-heading text-white text-5xl font-bold mb-4">
              Mendu Sreekanth Reddy
            </div>
          )}

          {showLine && (
            <div
              className={`bg-white h-px ${
                hideLine ? "animate-shrinkLineX" : "animate-growLineX"
              }`}
              style={{ width: "20rem", margin: "0 auto" }}
            ></div>
          )}

          {showText && (
            <div className="animate-popOut text-cyan-400 text-xl tracking-widest mt-4">
              Full Stack Web Developer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
