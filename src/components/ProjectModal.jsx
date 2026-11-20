import { useEffect } from "react";
import { createPortal } from "react-dom";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <img src={project.image} alt={project.title} className="modal-image" />

        <div className="modal-body">
          <div className="modal-header-row">
            <h3>{project.title}</h3>
            <span className="status-badge">{project.status}</span>
          </div>

          <p className="tech-stack">{project.tech}</p>
          <p className="modal-summary">{project.summary}</p>

          <h4>Key Engineering Highlights</h4>
          <ul className="modal-highlights">
            {project.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <div className="modal-actions">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="modal-btn"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;