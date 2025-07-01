import React from 'react';

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Kravings Club</h1>
        <p>Satisfying your cravings, delivered now! 🍔</p>
        <p>Fresh food delivered fast to your doorstep</p>
      </div>
      
      <section className="featured">
        <h2>Popular Items</h2>
        <div className="track-grid">
          <div className="track-card">
            <h3>Burgers</h3>
            <p>Juicy, handcrafted burgers made to order</p>
          </div>
          <div className="track-card">
            <h3>Pizza</h3>
            <p>Wood-fired pizzas with fresh ingredients</p>
          </div>
          <div className="track-card">
            <h3>Salads</h3>
            <p>Fresh, healthy options for every taste</p>
          </div>
          <div className="track-card">
            <h3>Desserts</h3>
            <p>Sweet treats to complete your meal</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;