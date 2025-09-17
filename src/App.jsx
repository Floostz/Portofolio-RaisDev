import { createSignal, onMount } from 'solid-js';
import * as THREE from 'three';
import styles from './App.module.css';
import emailIcon from '/src/assets/img/mail.svg';
import linkedinIcon from '/src/assets/img/linkedin.svg';
import githubIcon from '/src/assets/img/github.svg';
import codeIcon from '/src/assets/img/code.svg';

import reactLogo from '/src/assets/React.png';
import vueLogo from '/src/assets/Vue.js.png';
import solidLogo from '/src/assets/Solid.js.png';
import jsLogo from '/src/assets/JavaScript.png';
import tsLogo from '/src/assets/TypeScript.png';
import htmlLogo from '/src/assets/HTML5.png';
import cssLogo from '/src/assets/CSS3.png';
import threeLogo from '/src/assets/Three.js.png';

import nodeLogo from '/src/assets/Node.js.png';
import pythonLogo from '/src/assets/Python.png';
import expressLogo from '/src/assets/Express.png';
import rustLogo from '/src/assets/Rust.png';
import postgresLogo from '/src/assets/PostgresSQL.png';
import mongoLogo from '/src/assets/MongoDB.png';
import csharpLogo from '/src/assets/csap.png';
import firebaseLogo from '/src/assets/Firebase.png';

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function App() {
  const [activeSection, setActiveSection] = createSignal('home');
  let canvasRef;
  
  // Initialize Three.js scene
  onMount(() => {
    if (!canvasRef) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.5, 8),
      new THREE.OctahedronGeometry(0.8),
    ];

    const material = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });

    const meshes = [];
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    camera.position.z = 10;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.001 * (index + 1);
        mesh.rotation.y += 0.001 * (index + 1);
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });
      
      renderer.render(scene, camera);
    }
    animate();

  
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });
    
    // SweetAlert success
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Pesan berhasil dikirim.',
      confirmButtonColor: '#3085d6'
    });

    e.target.reset();
  } catch (err) {
    console.error(err);
    // SweetAlert error
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Gagal mengirim pesan.',
      confirmButtonColor: '#d33'
    });
  }
};




  const projects = [
    {
      title: "XIIRENT",
      description: "Aplikasi mobile untuk pemesanan tempat di warnet secara real-time, dilengkapi fitur pemilihan kursi, jadwal, dan sistem notifikasi. Aplikasi ini dibuat saat PSAJ (Penilaian Akhir Jenjang).",
      tech: ["React-Native",  "PostgresSQL", "Rust"],
      github: "https://github.com/Floostz/XIIRENT",
    
    },
    {
      title: "Rais.Calcu",
      description: "Kalkulator lengkap menggunakan Solid.js dan Firebase.",
      tech: ["Solid.js", "Firebase",],
      github: "https://github.com/Floostz/fawazcalcu",
      demo: "https://fawazcalcu-ujak.vercel.app/"
    },
    {
      title: "Laundry Management-APP",
      description: "Aplikasi untuk membantu pengelolaan pelanggan laundry dengan nota digital dan print Bluetooth.",
      tech: ["React-Native", "Firebase",],
      github: "https://github.com/Floostz/SalamoenLaundryAPP",
      demo: "https://solidjs.com"
    }
  ];

 const skills = {
  frontend: [
    { name: "React", logo: reactLogo },
    { name: "Vue.js", logo: vueLogo },
    { name: "SolidJS", logo: solidLogo },
    { name: "JavaScript", logo: jsLogo },
    { name: "TypeScript", logo: tsLogo },
    { name: "HTML5", logo: htmlLogo },
    { name: "CSS3", logo: cssLogo },
    { name: "Three.js", logo: threeLogo }
  ],
  backend: [
    { name: "Node.js", logo: nodeLogo },
    { name: "Python", logo: pythonLogo },
    { name: "Express", logo: expressLogo },
    { name: "Rust", logo: rustLogo },
    { name: "PostgreSQL", logo: postgresLogo },
    { name: "MongoDB", logo: mongoLogo },
    { name: "C#", logo: csharpLogo },
    { name: "Firebase", logo: firebaseLogo }
  ]
};
  return (
    <div class={styles.app}>
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} class={styles.threeCanvas}></canvas>
      
      {/* Navigation */}
      <nav class={styles.nav}>
        <div class={styles.navContainer}>
          <div class={styles.logo}>
         
          RAIS PORTOFOLIO
          </div>
          <ul class={styles.navMenu}>
            <li>
              <button 
                class={activeSection() === 'home' ? styles.navLinkActive : styles.navLink}
                onClick={() => scrollToSection('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                class={activeSection() === 'about' ? styles.navLinkActive : styles.navLink}
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                class={activeSection() === 'skills' ? styles.navLinkActive : styles.navLink}
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </button>
            </li>
            <li>
              <button 
                class={activeSection() === 'projects' ? styles.navLinkActive : styles.navLink}
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                class={activeSection() === 'contact' ? styles.navLinkActive : styles.navLink}
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" class={styles.hero}>
        <div class={styles.heroContent}>
          <div class={styles.heroText}>
            <h1 class={styles.heroTitle}>
              Hi, I'm <span class={styles.highlight}>Fawwaz Rais</span>
            </h1>
            <h2 class={styles.heroSubtitle}>Fullstack Developer</h2>
            <p class={styles.heroDescription}>
              I create beautiful, responsive web applications using modern technologies. 
              Passionate about clean code, user experience, and innovative solutions.
            </p>
            <div class={styles.heroButtons}>
              <button 
                class={styles.btnPrimary}
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                class={styles.btnSecondary}
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div class={styles.heroImage}>
            <div class={styles.profileImage}>
              <div class={styles.imageWrapper}>
             <div className={styles.floatingElements}>
 


</div>
<img
  src={codeIcon}
  alt="My Avatar"
  class={styles.avatarPlaceholder}
/>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class={styles.about}>
        <div class={styles.container}>
          <h2 class={styles.sectionTitle}>About Me</h2>
          <div class={styles.aboutContent}>
            <div class={styles.aboutText}>
              <p class={styles.aboutParagraph}>
                I'm a passionate fullstack developer with over 1,5 years of experience 
                building web applications. I love turning complex problems into simple, 
                beautiful, and intuitive solutions.
              </p>
              <p class={styles.aboutParagraph}>
             
              </p>
              <div class={styles.aboutStats}>
            
               
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" class={styles.skills}>
        <div class={styles.container}>
          <h2 class={styles.sectionTitle}>Skills & Technologies</h2>
          <div class={styles.skillsContent}>
            <div class={styles.skillCategory}>
              <h3 class={styles.skillCategoryTitle}>Frontend</h3>
              <div class={styles.skillGrid}>
                {skills.frontend.map((skill) => (
                  <div class={styles.skillCard}>
                 <img src={skill.logo} alt={skill.name} width={70} height={70}/>
                
                  </div>
                ))}
              </div>
            </div>
            <div class={styles.skillCategory}>
              <h3 class={styles.skillCategoryTitle}>Backend</h3>
              <div class={styles.skillGrid}>
                {skills.backend.map((skill) => (
                  <div class={styles.skillCard}>
                   <img src={skill.logo} alt={skill.name} width={70} height={70}/>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" class={styles.projects}>
        <div class={styles.container}>
          <h2 class={styles.sectionTitle}>Featured Projects</h2>
          <div class={styles.projectsGrid}>
            {projects.map((project) => (
              <div class={styles.projectCard}>
                <div class={styles.projectHeader}>
                  <h3 class={styles.projectTitle}>{project.title}</h3>
                  <div class={styles.projectLinks}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" class={styles.projectLink}>
                      <svg viewBox="0 0 24 24" class={styles.linkIcon}>
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                      </svg>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" class={styles.projectLink}>
                      <svg viewBox="0 0 24 24" class={styles.linkIcon}>
                        <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <p class={styles.projectDescription}>{project.description}</p>
                <div class={styles.projectTech}>
                  {project.tech.map((tech) => (
                    <span class={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class={styles.contact}>
        <div class={styles.container}>
          <h2 class={styles.sectionTitle}>Get In Touch</h2>
          <div class={styles.contactContent}>
            <div class={styles.contactText}>
              <p class={styles.contactDescription}>
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project in mind or just want to chat about tech, 
                feel free to reach out!
              </p>
       <div class={styles.contactInfo}>
  <div class={styles.contactItem}>
    <span class={styles.contactIcon}>
      <img src={emailIcon} alt="Email" />
    </span>
    <span>fawwazaziz96s@gmail.com</span>
  </div>

  <div class={styles.contactItem}>
    <span class={styles.contactIcon}>
      <img src={linkedinIcon} alt="LinkedIn" />
    </span>
    <a href="https://www.linkedin.com/in/fawwaz-aziz-6862b32b2/" target="_blank" rel="noopener noreferrer">linkedin.com/in/fawwaz-aziz</a>
  </div>

  <div class={styles.contactItem}>
    <span class={styles.contactIcon}>
      <img src={githubIcon} alt="GitHub" />
    </span>
    <a href="https://github.com/Floostz" target="_blank" rel="noopener noreferrer">github.com/Floostz</a>
  </div>
</div>

            </div>
            <div class={styles.contactForm}>
          <form class={styles.form} onSubmit={handleSubmit}>
  <input 
    type="text" 
    name="name"
    placeholder="Your Name" 
    class={styles.formInput}
  />
  <input 
    type="email" 
    name="email"
    placeholder="Your Email" 
    class={styles.formInput}
  />
  <textarea 
    name="message"
    placeholder="Your Message" 
    rows="5"
    class={styles.formTextarea}
  ></textarea>
  <button type="submit" class={styles.formSubmit}>
    Send Message
  </button>
</form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class={styles.footer}>
        <div class={styles.container}>
          <p class={styles.footerText}>
            © 2025 Rais Dev
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;