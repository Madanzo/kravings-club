import React from 'react';

function Music() {
  return (
    <div className="page">
      <h1>Music</h1>
      <div className="music-section">
        <h2>Latest Releases</h2>
        <div className="track-list">
          <div className="track-item">
            <h3>Perreo Texas Style</h3>
            <p>The fusion of reggaeton with Texas swagger</p>
          </div>
          <div className="track-item">
            <h3>Noche de Fuego</h3>
            <p>Pure reggaeton energy</p>
          </div>
          <div className="track-item">
            <h3>Texas Heat</h3>
            <p>Southern vibes meet Latin beats</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;