import React, { useState } from 'react'
import { motion } from 'framer-motion'

function UI() {
  const [activeSection, setActiveSection] = useState('gallery')

  const sections = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
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

      {/* Gallery Info */}
      <div className="gallery-info">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="info-card"
        >
          <h3>🎨 Interactive Art Gallery</h3>
          <p>Click on any video installation to play • Hover to preview</p>
          <div className="stats">
            <span>📹 12 Video Installations</span>
            <span>🎯 Click to Play</span>
            <span>🖱️ Drag to Explore</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="content-section"
        >
          {activeSection === 'gallery' && (
            <div className="hero">
              <h2>Digital Art Exhibition</h2>
              <p>Explore my creative work through interactive video installations</p>
              <div className="gallery-features">
                <div className="feature">
                  <span className="icon">🎬</span>
                  <span>Video Installations</span>
                </div>
                <div className="feature">
                  <span className="icon">🎮</span>
                  <span>Interactive Controls</span>
                </div>
                <div className="feature">
                  <span className="icon">🌟</span>
                  <span>Immersive Experience</span>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'about' && (
            <div className="about">
              <h2>About the Artist</h2>
              <p>Creative technologist passionate about immersive experiences and digital art</p>
              <div className="skills">
                <span>Design Direction</span>
                <span>Creative Technology</span>
                <span>Interactive Media</span>
                <span>Visual Storytelling</span>
              </div>
            </div>
          )}
          
          {activeSection === 'contact' && (
            <div className="contact">
              <h2>Let's Create Together</h2>
              <p>Ready to bring your vision to life with cutting-edge design and technology</p>
              <div className="contact-methods">
                <a href="mailto:vikas@example.com">📧 Email</a>
                <a href="https://linkedin.com/in/vikasraj">💼 LinkedIn</a>
                <a href="https://github.com/vikasraj">💻 GitHub</a>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Controls Info */}
      <div className="controls-info">
        <p>🖱️ Click and drag to explore • Scroll to zoom • Click videos to play</p>
      </div>
    </div>
  )
}

export default UI
