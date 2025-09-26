import { useRef, useEffect, useState } from 'react';
import profileImg from '../assets/profile.jpg';
import './AboutMe.css';

export default function AboutMe() {
  const sectionRef = useRef();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="intro"   // ✅ Added for navbar scrolling
      ref={sectionRef}
      className="about-me-section w-full min-h-screen flex items-center justify-center bg-black px-0"
    >
      <div
        className={`w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 py-20 items-center pl-8 md:pl-20 ${animate ? 'animate-aboutMeFadeIn' : ''}`}
      >
        {/* Image Section */}
        <div className="md:col-span-4 flex items-center justify-start">
          <div className="relative w-80 h-80 flex items-center justify-center">
            <img
              src={profileImg}
              alt="Sreekanth"
              className="rounded-full object-cover w-80 h-80 shadow-xl"
              style={{ objectPosition: 'center 70%' }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:col-span-8 h-full flex flex-col justify-center px-12 py-10 bg-neutral-900/80 rounded-xl shadow-lg">
          <h2 className="text-cyan-400 text-4xl md:text-5xl font-bold mb-4 font-heading">
            Hi, I am Sreekanth
          </h2>
          <h3 className="text-white text-2xl md:text-3xl font-semibold mb-6">
            MERN Stack Developer
          </h3>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            With a passion for crafting robust web solutions, I embrace continuous learning and collaborative problem-solving. My focus is on building scalable, intuitive digital experiences that empower users and drive results. Let's create meaningful impact together.
          </p>
        </div>
      </div>
    </section>
  );
}
