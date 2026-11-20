import { useState } from "react";
import {
  educationData,
  experienceData,
  skillsData
} from "../data/portfolioData";
import RevealOnScroll from "./RevealOnScroll";

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const activeItems =
    activeTab === "experience" ? experienceData : educationData;

  return (
    <section id="experience" className="page-section alternate-bg">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header">
            <h2>Background</h2>
            <div className="accent-line"></div>
          </div>

          <div className="tab-switcher" role="tablist" aria-label="Background tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "experience"}
              className={`tab-btn ${activeTab === "experience" ? "active" : ""}`}
              onClick={() => setActiveTab("experience")}
            >
              Experience ({experienceData.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "education"}
              className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
              onClick={() => setActiveTab("education")}
            >
              Education ({educationData.length})
            </button>
          </div>

          {/* key={activeTab} restarts the smooth fade-in whenever tabs switch */}
          <div key={activeTab} className="card-grid tab-panel" role="tabpanel">
            {activeItems.map((item) => (
              <div key={item.id} className="card interactive-card">
                <h3>
                  <img src={item.logo} className="icon" alt={item.alt} />
                  {item.role}
                </h3>
                <p className="org">
                  {item.org} &middot; {item.period}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <div className="section-header" style={{ marginTop: "4rem" }}>
            <h2>Technical Skills</h2>
            <div className="accent-line"></div>
          </div>

          <div className="skills-container">
            {skillsData.map((skill) => (
              <div key={skill} className="skill-chip">
                {skill}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ExperienceSection;