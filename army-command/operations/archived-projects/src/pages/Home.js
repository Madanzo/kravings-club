import React from 'react';

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Nenes del Perreo</h1>
        <p>El ritmo que prende la noche 🔥</p>
        <p>Reggaeton con sabor auténtico desde Texas</p>
      </div>
      
      <section className="featured">
        <h2>Latest Tracks</h2>
        <div className="track-grid">
          <div className="track-card">
            <h3>Track 1</h3>
            <p>Coming Soon...</p>
          </div>
          <div className="track-card">
            <h3>Track 2</h3>
            <p>Coming Soon...</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;