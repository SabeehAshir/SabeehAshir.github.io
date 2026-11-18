import './Css/Reset.css';
import './Css/main.css';
import './Css/mobile.css';
function App() {
  return (
    <>
      <header>
        <nav className="main-nav">
            <ul className="nav-links">
                <li><a href="#home" className="logo">Sabeeh Ashir</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience & Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="/assets/Sabeeh_ashir_CV.pdf" target="_blank" rel="noreferrer">CV</a></li>
            </ul>
            <ul className="auth-links">
                <li><a className="login-btn" onClick={() => alert('Login/Admin features are disabled on this version. Check Github for the full code!')}>Login</a></li>
            </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section alternate-bg">
            <div className="profile-container">
                <img src="images/sabeeh.jpg" alt="Sabeeh Ashir" className="main-photo" />
                <h1>Sabeeh Ashir</h1>
                <p className="tagline">2nd-Year Computer Science Student</p>
            </div>
            <div className="social-hub">
                <a href="https://www.linkedin.com/in/sabeeh-ashir-50ab6a340/" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="images/linkedin.png" alt="LinkedIn" />
                </a>
                <a href="mailto:Sabeehashir10@gmail.com" className="social-icon">
                    <img src="images/email2.png" alt="Email" />
                </a>
                <a href="https://github.com/SabeehAshir" target="_blank" rel="noreferrer" className="social-icon">
                    <img src="images/github.png" alt="github" />
                </a>
            </div>
        </section>

        <section id="about" className="page-section">
            <div className="container">
                <div className="about-grid">
                    <figure className="profile-frame">
                        <img src="images/sabeeh-removebg-preview.png" alt="Sabeeh Ashir" />
                    </figure>
                    <div className="about-text">
                        <h2>About Me</h2>
                        <div className="accent-line-left"></div>
                        <p className="subtitle">2nd-Year Computer Science Student @ QMUL</p>
                        
                        <p>I am a second-year Computer Science student at Queen Mary University of London with a passion for turning complex problems into clean, efficient software. Having established a strong technical foundation, I am actively expanding my expertise in modern web frameworks, Artificial Intelligence, and Cybersecurity.</p>
                        
                        <p>Beyond academics, I thrive in collaborative, agile environments. I am always eager to team up with other developers to build innovative solutions that make a real-world impact.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="experience" className="page-section alternate-bg">
            <div className="container">

                <div className="section-header">
                    <h2> Education</h2>
                    <div className="accent-line"></div>
                </div>

                <div className="card-grid">
                    <div className="card">
                        <h3><img src="images/QMUL_logo.png" className="icon" alt="Ricards School" />Queen Mary University of London</h3>
                        <p className="org">2024 - Present</p>
                        <p>Currently studying Computer Science. Completed first-year modules including Programming, Computer Systems and Networking, and Logic and Discrete Structures.</p>
                    </div>
                    <div className="card">
                        <h3><img src="images/Kingston_logo.png" className="icon" alt="Kingston college" />Kingston College</h3>
                        <p className="org">2022 - 2023</p>
                        <p>Access to Higher Education Diploma - Computing. Grasped good knowledge about C#, Database and Algorithms, Database implementation, and SQL.</p>
                    </div>
                </div>

                <div className="section-header" style={{ marginTop: '4rem' }}>
                    <h2>Experience</h2>
                    <div className="accent-line"></div>
                </div>
                
                <div className="card-grid">
                    <div className="card">
                        <h3><img src="images/ricards_logo.png" className="icon" alt="Ricards School" /> CS Teaching Assistant Intern</h3>
                        <p className="org">Ricards Lodge High School (June 2026 - July 2026)</p>
                        <p>Assisting in delivering the Computer Science curriculum, guiding students through foundational programming concepts and providing one-on-one technical support.</p>
                    </div>
                    <div className="card">
                        <h3><img src="images/noor academy.png" className="icon" alt="Noor" /> Admin & IT Support</h3>
                        <p className="org">Noor Academy (Continued)</p>
                        <p>Providing essential technical support and administrative assistance for students and faculty. Managing IT resources, troubleshooting technical issues, and ensuring smooth operation of digital platforms to enhance the educational experience.</p>
                    </div>
                    <div className="card">
                        <h3><img src="images/Voi.jpeg" className="icon" alt="VOI" /> Media Volunteer</h3>
                        <p className="org">Voice of Islam</p>
                        <p>Supported live broadcasts and technical operations in a high-pressure radio environment.</p>
                    </div>
                </div>

                <div className="section-header" style={{ marginTop: '4rem' }}>
                    <h2>Technical Skills</h2>
                    <div className="accent-line"></div>
                </div>
                
                <div className="skills-container">
                    <div className="skill-chip">Java</div>
                    <div className="skill-chip">JavaScript</div>
                    <div className="skill-chip">C++</div>
                    <div className="skill-chip">C#</div>
                    <div className="skill-chip">Python</div>
                    <div className="skill-chip">SQL</div>
                    <div className="skill-chip">HTML</div>
                    <div className="skill-chip">CSS</div>
                    <div className="skill-chip">Next.js</div>
                    <div className="skill-chip">React</div>
                    <div className="skill-chip">Prisma</div>
                    <div className="skill-chip">PostgreSQL</div>
                </div>
            </div>
        </section>

        <section id="projects" className="page-section">
            <div className="container">
                <div className="section-header">
                    <h2>My Projects</h2>
                    <div className="accent-line"></div>
                </div>

                <div className="projects-grid">
                    <article className="project-card">
                        <figure className="project-image">
                            <img src="images/Academy.png" alt="Academy project" />
                        </figure>
                        <div className="project-info">
                            <h3>Noor Academy Web Application (In Progress) </h3>
                            <p className="tech-stack">Next.js / Prisma / PostgreSQL / React / Role-Based Access / Rest API / SQL integration</p>
                            <p>Developing a comprehensive web application for Noor academy, enabling students to view their timetables, access course materials, and track their progress. The application features a user-friendly interface and robust backend functionality, providing an efficient platform for students to manage their academic activities.</p>
                        </div>
                    </article>
                    
                    <article className="project-card">
                        <figure className="project-image">
                            <img src="images/FDM.png" alt="FDM Expense Flow Application" />
                        </figure>
                        <div className="project-info">
                            <h3>FDM Expense APP</h3>
                            <p className="tech-stack"> React / Django / Full Stack Development / Rest API / Python / Web App / Role-Based Access</p>
                            <p>Designed and developed a full-stack expense management application for FDM Group. The app allows users to track and manage their expenses efficiently, featuring a user friendly interface and robust backend functionality.</p>
                            <p>Designed Line Manager and Finance Team fully working Dashboard allowing them to Review, Approve and Reject expense claims submitted by employees.</p>
                        </div>
                    </article>

                    <article className="project-card">
                        <figure className="project-image">
                            <img src="images/BerryGuide.png" alt="BerryGuide Weather App" />
                        </figure>
                        <div className="project-info">
                            <h3>Weather app for Berry Farmers</h3>
                            <p className="tech-stack"> React / Figma / OpenWeather API / Rest API / Automation</p>
                            <p>Designed and developed a weather application tailored for berry farmers. The app provides real time weather updates, forecasts, and alerts to help farmers make informed decisions about their crops. The user friendly interface allows farmers to easily access critical weather information specific to their location.</p>
                        </div>
                    </article>

                    <article className="project-card">
                        <figure className="project-image">
                            <img src="images/Portfolio-Preview.png" alt="Personal Portfolio Website" />
                        </figure>
                        <div className="project-info">
                            <h3>Personal Portfolio Website</h3>
                            <p className="tech-stack">HTML / CSS / JavaScript / PHP / SQL / Rest API</p>
                            <p>Designed and developed a personal portfolio website to showcase my skills, projects, and experience. The site features a clean, responsive design and highlights my background in computer science.</p>
                        </div>
                    </article>

                    <article className="project-card">
                        <figure className="project-image">
                            <img src="images/visual programming.png" alt="Mobile Tariff Application" />
                        </figure>
                        <div className="project-info">
                            <h3>Mobile Tariff Application</h3>
                            <p className="tech-stack">C# / Visual Programming / Automation / Role-Based Access</p>
                            <p>Developed a mobile tariff application for network users. It enables users to select their preferred network, tariff, data limits, and minutes. The system actively tracks data usage and calculates remaining allowances.</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Sabeeh Ashir. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;