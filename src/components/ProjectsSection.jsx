import { useState } from "react";
import { projectsData } from "../data/portfolioData";
import "../Css/interactive.css";

const FILTERS = ["All", "React", "Full-Stack", "Python", "SQL", "C#"];

const ProjectsSection = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="page-section">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="accent-line"></div>
        </div>

        <div className="filter-bar">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card interactive-card"
              onClick={() => onSelectProject(project)}
            >
              <figure className="project-image">
                <img src={project.image} alt={project.title} />
              </figure>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="tech-stack">{project.tech}</p>
                <p>{project.summary}</p>
                <span className="card-cta">View Details &rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;