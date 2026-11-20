import './Css/Reset.css';
import './Css/main.css';
import './Css/mobile.css';
import ProjectsSection from "./components/ProjectsSection";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ExperienceSection from "./components/ExperienceSection";
import RevealOnScroll from "./components/RevealOnScroll";
import StarfieldBackground from "./components/StarfieldBackground";
import CommandPalette from "./components/CommandPalette";
import ProjectModal from "./components/ProjectModal";
function App() {
  const [toastMessage, setToastMessage] = useState("");

useEffect(() => {
  if (!toastMessage) return;
  const timer = setTimeout(() => setToastMessage(""), 2500);
  return () => clearTimeout(timer);
}, [toastMessage]);

const [isPaletteOpen, setIsPaletteOpen] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);

useEffect(() => {
  const handleGlobalKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setIsPaletteOpen((prev) => !prev);
    }
  };

  window.addEventListener("keydown", handleGlobalKeyDown);
  return () => window.removeEventListener("keydown", handleGlobalKeyDown);
}, []);

const handleCopyEmail = (e) => {
  if (e) e.preventDefault();
  navigator.clipboard.writeText("Sabeehashir10@gmail.com");
  setToastMessage("Email copied: Sabeehashir10@gmail.com");
};
  return (
    <>
        <StarfieldBackground />
        <Navbar
          onCopyEmail={handleCopyEmail}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

      <main>
        <section id="home" className="hero-section alternate-bg">
            <div className="profile-container">
                <img src="images/sabeeh.jpg" alt="Sabeeh Ashir" className="main-photo" />
                <h1>Sabeeh Ashir</h1>
                <p className="tagline">Final Year Computer Science Student</p>
            </div>
            <div className="social-hub">
                <a href="https://www.linkedin.com/in/sabeeh-ashir-50ab6a340/" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="images/linkedin.png" alt="LinkedIn" />
                </a>
                <a href="mailto:Sabeehashir10@gmail.com"
                   className="social-icon"
                   onClick={handleCopyEmail}
                   title="Click to copy email"
                >
                  <img src="images/email2.png" alt="Email" />
                </a>
                <a href="https://github.com/SabeehAshir" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="images/github.png" alt="github" />
                </a>
            </div>
        </section>

        <section id="about" className="page-section">
            <RevealOnScroll>
                <div className="container">
                    <div className="about-grid">
                        <figure className="profile-frame">
                            <img src="images/sabeeh-removebg-preview.png" alt="Sabeeh Ashir" />
                        </figure>
                        <div className="about-text">
                            <h2>About Me</h2>
                            <div className="accent-line-left"></div>
                            <p className="subtitle">Final Year Computer Science Student @ QMUL</p>
                            
                            <p>I am a Final year Computer Science student at Queen Mary University of London with a passion for turning complex problems into clean, efficient software. Having established a strong technical foundation, I am actively expanding my expertise in modern web frameworks, Artificial Intelligence, and Cybersecurity.</p>
                            
                            <p>Beyond academics, I thrive in collaborative, agile environments. I am always eager to team up with other developers to build innovative solutions that make a real-world impact.</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>

        <ExperienceSection />

        <RevealOnScroll>
          <ProjectsSection onSelectProject={setSelectedProject} />
        </RevealOnScroll>
        

      </main>

      <footer>
        <p>&copy; 2026 Sabeeh Ashir. All rights reserved.</p>
      </footer>
      
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onCopyEmail={handleCopyEmail}
        onSelectProject={setSelectedProject}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      
      <Toast message={toastMessage} />
          </>
  );
}

export default App;