import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-cyan-500 py-10 flex flex-col items-center text-white">
      <div className="flex gap-10 mb-4">
        <a
          href="https://github.com/MENDU-SREEKANTH-REDDY"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-white transition-transform transform hover:-translate-y-1 hover:scale-110"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/mendusreekanthreddy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-white transition-transform transform hover:-translate-y-1 hover:scale-110"
        >
          <FaLinkedin />
        </a>

        <a
          href="mailto:mendusreekanthreddy@gmail.com"
          className="text-3xl text-white transition-transform transform hover:-translate-y-1 hover:scale-110"
        >
          <FaEnvelope />
        </a>
      </div>

      <p className="text-sm tracking-widest text-white">
        © {new Date().getFullYear()} M. SREEKANTH REDDY
      </p>
    </footer>
  );
}
