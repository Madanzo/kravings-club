import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Music from './pages/Music';
import About from './pages/About';
import Events from './pages/Events';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HashRouter>
      <div className="App">
        <nav className="navbar">
          <h1 className="logo">Nenes del Perreo</h1>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ''}`}>
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/music" onClick={closeMobileMenu}>Music</Link></li>
            <li><Link to="/events" onClick={closeMobileMenu}>Events</Link></li>
            <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;