import React, { useEffect, useRef, useState } from "react";
import "./projects.css";
import wanderlustImg from "../assets/wanderlust.png";
import spotifyImg from "../assets/spotify.png";
import blogImg from "../assets/blog.png";
import chatImg from "../assets/chat.png";

export default function Projects() {
  const [showTitle, setShowTitle] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowTitle(true);
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Wanderlust",
      description:
        '"Wanderlust" is a full-stack MERN application that enables users to add and manage property listings with full CRUD functionality. It features user authentication for secure login and signup.',
      image: wanderlustImg,
      projectUrl: "https://wanderlust-jw26.onrender.com/listings",
      codeUrl: "https://github.com/MENDU-SREEKANTH-REDDY/WANDERLUST",
      align: "right",
    },
    {
      title: "Spotify Landing Page",
      description:
        "A responsive landing page for Spotify, built using HTML and CSS.",
      image: spotifyImg,
      projectUrl: "https://mendu-sreekanth-reddy.github.io/SPOTIFY-FRONTEND/",
      codeUrl: "https://github.com/MENDU-SREEKANTH-REDDY/SPOTIFY-FRONTEND",
      align: "left",
    },
    {
      title: "Blog Page",
      description:
        "A RESTful API-powered blog page with CRUD functionality.",
      image: blogImg,
      projectUrl: null,
      codeUrl: "https://github.com/MENDU-SREEKANTH-REDDY/PROJECTS/tree/main/restful-api",
      align: "right",
    },
    {
      title: "Chat Box",
      description:
        "A responsive chat box with CRUD functionality, powered by MongoDB.",
      image: chatImg,
      projectUrl: null,
      codeUrl: "https://github.com/MENDU-SREEKANTH-REDDY/PROJECTS/tree/main/mongoDB%20with%20express",
      align: "left",
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <h2
        className={`projects-title ${showTitle ? "visible" : ""}`}
        ref={titleRef}
      >
        Projects
      </h2>

      <div className="timeline-line"></div>

      {projects.map((project, index) => (
        <div
          key={index}
          className={`project-card ${
            project.align === "right" ? "right" : "left"
          }`}
        >
          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
           <div className="buttons">
  {project.projectUrl && (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Project
    </a>
  )}
  <a
    href={project.codeUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    View Code
  </a>
</div>

          </div>
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
          />
        </div>
      ))}
    </section>
  );
}
