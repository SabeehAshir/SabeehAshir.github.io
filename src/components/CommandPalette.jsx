import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projectsData } from "../data/portfolioData";

const CommandPalette = ({ isOpen, onClose, onCopyEmail, onSelectProject }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const navCommands = [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Go to Home",
        hint: "Section",
        keywords: "top hero start home",
        action: () => scrollTo("home")
      },
      {
        id: "nav-about",
        group: "Navigation",
        label: "Go to About Me",
        hint: "Section",
        keywords: "bio background intro about",
        action: () => scrollTo("about")
      },
      {
        id: "nav-experience",
        group: "Navigation",
        label: "Go to Experience & Skills",
        hint: "Section",
        keywords: "work education university skills tech stack",
        action: () => scrollTo("experience")
      },
      {
        id: "nav-projects",
        group: "Navigation",
        label: "Go to Projects",
        hint: "Section",
        keywords: "portfolio work apps code projects",
        action: () => scrollTo("projects")
      }
    ];

    const projectCommands = projectsData.map((project) => ({
      id: `project-${project.id}`,
      group: "Projects",
      label: project.title,
      hint: project.status,
      keywords: `${project.title} ${project.tech} ${project.tags.join(" ")}`,
      action: () => {
        scrollTo("projects");
        onSelectProject(project);
      }
    }));

    const quickActions = [
      {
        id: "action-email",
        group: "Quick Actions",
        label: "Copy Email Address",
        hint: "Sabeehashir10@gmail.com",
        keywords: "contact mail email reach out",
        action: () => onCopyEmail()
      },
      {
        id: "action-cv",
        group: "Quick Actions",
        label: "Open CV / Resume",
        hint: "PDF",
        keywords: "resume cv download pdf",
        action: () =>
          window.open("/assets/Sabeeh_ashir_CV.pdf", "_blank", "noreferrer")
      },
      {
        id: "action-github",
        group: "Quick Actions",
        label: "Open GitHub Profile",
        hint: "@SabeehAshir",
        keywords: "github code repos git",
        action: () =>
          window.open("https://github.com/SabeehAshir", "_blank", "noreferrer")
      }
    ];

    return [...navCommands, ...projectCommands, ...quickActions];
  }, [onCopyEmail, onSelectProject]);

  const filteredCommands = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(term) ||
        cmd.group.toLowerCase().includes(term) ||
        cmd.keywords.toLowerCase().includes(term)
    );
  }, [commands, query]);

  const executeCommand = (cmd) => {
    if (!cmd) return;
    onClose();
    cmd.action();
  };

  // Focus input and lock background scroll when opened
  useEffect(() => {
    if (!isOpen) return;

    setQuery("");
    setActiveIndex(0);
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 10);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keep highlight index valid when filtering
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation inside the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredCommands.length ? (prev + 1) % filteredCommands.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredCommands.length
            ? (prev - 1 + filteredCommands.length) % filteredCommands.length
            : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(filteredCommands[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex, onClose]);

  if (!isOpen) return null;

  // Group filtered commands for clean section headers
  const grouped = filteredCommands.reduce((acc, item, flatIndex) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push({ ...item, flatIndex });
    return acc;
  }, {});

  return createPortal(
    <div
      className="cmd-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-row">
          <span className="cmd-prompt">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search projects (e.g. React, CV, Email)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="cmd-kbd">ESC</kbd>
        </div>

        <div className="cmd-list" role="listbox">
          {filteredCommands.length === 0 ? (
            <p className="cmd-empty">No matching commands for "{query}"</p>
          ) : (
            Object.entries(grouped).map(([groupName, items]) => (
              <div key={groupName} className="cmd-group">
                <div className="cmd-group-label">{groupName}</div>
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={activeIndex === item.flatIndex}
                    className={`cmd-item ${
                      activeIndex === item.flatIndex ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(item.flatIndex)}
                    onClick={() => executeCommand(item)}
                  >
                    <span className="cmd-item-label">{item.label}</span>
                    <span className="cmd-item-hint">{item.hint}</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>
            <kbd className="cmd-kbd">&uarr;</kbd>{" "}
            <kbd className="cmd-kbd">&darr;</kbd> Navigate
          </span>
          <span>
            <kbd className="cmd-kbd">&crarr;</kbd> Open
          </span>
          <span>
            <kbd className="cmd-kbd">Ctrl</kbd> +{" "}
            <kbd className="cmd-kbd">K</kbd> Toggle
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;