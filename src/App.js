import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Order from './pages/Order';
import AgeVerification from './pages/AgeVerification';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  // Check if user is already age verified
  useEffect(() => {
    const checkAgeVerification = () => {
      const cookies = document.cookie.split(';');
      const ageVerifiedCookie = cookies.find(cookie => 
        cookie.trim().startsWith('age-verified=')
      );
      
      if (ageVerifiedCookie && ageVerifiedCookie.includes('true')) {
        setAgeVerified(true);
      }
    };
    
    checkAgeVerification();
  }, []);

  const handleAgeVerified = () => {
    setAgeVerified(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Show age verification if not verified
  if (!ageVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <HashRouter>
      <div className="App">
        <nav className="navbar">
          <h1 className="logo">Kravings Club</h1>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ''}`}>
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/menu" onClick={closeMobileMenu}>Menu</Link></li>
            <li><Link to="/order" onClick={closeMobileMenu}>Order Now</Link></li>
            <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;