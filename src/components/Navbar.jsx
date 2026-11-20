import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience & Skills" },
  { id: "projects", label: "Projects" }
];

const Navbar = ({ onCopyEmail,onOpenPalette }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      const sections = ["home", "about", "experience", "projects"];
      let current = "home";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          current = id;
        }
      }

      if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 10) {
        current = "projects";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="main-nav">
        <ul className="nav-links">
          <li>
            <a
              href="#home"
              className={`logo ${activeSection === "home" ? "active-link" : ""}`}
            >
              Sabeeh Ashir
            </a>
          </li>

          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active-link" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="/assets/Sabeeh_ashir_CV.pdf"
              target="_blank"
              rel="noreferrer"
            >
              CV
            </a>
          </li>
          <li>
                <button
                type="button"
                className="copy-email-btn"
                onClick={onCopyEmail}
                >
                 Contact
                </button>
          </li>
          <li>
            <button
              type="button"
              className="cmd-trigger-btn"
              onClick={onOpenPalette}
              title="Open Command Palette (Ctrl + K)"
            >
              <span>Search</span>
              <kbd className="cmd-kbd">Ctrl K</kbd>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;