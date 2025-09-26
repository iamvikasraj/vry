import React, { useState } from 'react'
import { motion } from 'framer-motion'

function UI() {
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="ui">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-brand">
          <h1>Vikas Raj Yadav</h1>
          <p>Design Director & Creative Technologist</p>
        </div>
        
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="content-section"
        >
          {activeSection === 'home' && (
            <div className="hero">
              <h2>Welcome to My 3D Portfolio</h2>
              <p>Explore my work through an interactive 3D experience</p>
            </div>
          )}
          
          {activeSection === 'about' && (
            <div className="about">
              <h2>About Me</h2>
              <p>Creative technologist passionate about immersive experiences</p>
            </div>
          )}
          
          {activeSection === 'projects' && (
            <div className="projects">
              <h2>Featured Projects</h2>
              <p>Interactive 3D experiences and creative solutions</p>
            </div>
          )}
          
          {activeSection === 'contact' && (
            <div className="contact">
              <h2>Get In Touch</h2>
              <p>Let's create something amazing together</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Controls Info */}
      <div className="controls-info">
        <p>🖱️ Click and drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default UI
