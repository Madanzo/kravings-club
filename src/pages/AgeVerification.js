import React, { useState } from 'react';

function AgeVerification({ onVerified }) {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const verifyAge = (e) => {
    e.preventDefault();
    
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    if (age >= 21) {
      // Set cookie for 30 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `age-verified=true; expires=${expires.toUTCString()}; path=/`;
      onVerified();
    } else {
      setError('You must be 21 or older to access this site.');
    }
  };

  return (
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        <h1>Age Verification Required</h1>
        <p>You must be 21 years or older to enter this site.</p>
        
        <form onSubmit={verifyAge} className="age-form">
          <label htmlFor="birthdate">Enter Your Birth Date:</label>
          <input
            type="date"
            id="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            max={new Date().toISOString().split('T')[0]}
          />
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="verify-button">Verify Age</button>
        </form>
        
        <p className="disclaimer">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
          This site is for adults 21+ only.
        </p>
      </div>
    </div>
  );
}

export default AgeVerification;