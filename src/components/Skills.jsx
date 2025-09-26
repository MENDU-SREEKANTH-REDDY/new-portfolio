import React, { useEffect, useRef } from 'react';
import './Skills.css';
import {
  FaDatabase,
  FaTools,
  FaJava,
  FaLaptopCode,
  FaServer,
  FaCodeBranch
} from 'react-icons/fa';

export default function Skills() {
  const sectionRef = useRef(null);

  // Cursor glow inside this section only
  useEffect(() => {
    const section = sectionRef.current;
    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      section.style.setProperty('--x', `${x}px`);
      section.style.setProperty('--y', `${y}px`);
    };
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-overlay">
        <h2 className="skills-title">Skills and Technologies</h2>
        <div className="skills-grid">
          <div className="skill-box">
            <h3><FaLaptopCode className="icon" /> Frontend</h3>
            <div className="icons">
              HTML | CSS | JavaScript | Tailwind | Bootstrap
            </div>
          </div>
          <div className="skill-box">
            <h3><FaServer className="icon" /> Backend</h3>
            <div className="icons">
              Express.js | Node.js | REST APIs
            </div>
          </div>
          <div className="skill-box">
            <h3><FaDatabase className="icon" /> Databases</h3>
            <div className="icons">
              MongoDB | MySQL
            </div>
          </div>
          <div className="skill-box">
            <h3><FaCodeBranch className="icon" /> Frameworks</h3>
            <div className="icons">
              React.js | Next.js 
            </div>
          </div>
        </div>

        <div className="tools-wrapper">
          <div className="skill-box">
            <h3><FaTools className="icon" /> Tools & Platforms</h3>
            <div className="icons">
              Git | GitHub | VS Code | Vercel | Render | Hoppscotch
            </div>
          </div>
          <div className="skill-box">
            <h3><FaJava className="icon" /> Java & DSA</h3>
            <div className="icons">
              Strong fundamentals | Problem-solving
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
