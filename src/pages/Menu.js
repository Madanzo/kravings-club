import React from 'react';

function Menu() {
  return (
    <div className="page">
      <h1>Our Menu</h1>
      <section className="menu-section">
        <h2>Burgers 🍔</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <h3>Classic Burger</h3>
            <p>Beef patty, lettuce, tomato, onion, pickles</p>
            <span className="price">$12.99</span>
          </div>
          <div className="menu-item">
            <h3>Bacon Cheeseburger</h3>
            <p>Double beef, bacon, cheddar, special sauce</p>
            <span className="price">$15.99</span>
          </div>
          <div className="menu-item">
            <h3>Veggie Burger</h3>
            <p>Plant-based patty, avocado, sprouts</p>
            <span className="price">$13.99</span>
          </div>
        </div>
      </section>
      
      <section className="menu-section">
        <h2>Pizza 🍕</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <h3>Margherita</h3>
            <p>Fresh mozzarella, basil, tomato sauce</p>
            <span className="price">$18.99</span>
          </div>
          <div className="menu-item">
            <h3>Pepperoni Supreme</h3>
            <p>Double pepperoni, extra cheese</p>
            <span className="price">$20.99</span>
          </div>
          <div className="menu-item">
            <h3>Hawaiian</h3>
            <p>Ham, pineapple, mozzarella</p>
            <span className="price">$19.99</span>
          </div>
        </div>
      </section>
      
      <section className="menu-section">
        <h2>Drinks 🥤</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <h3>Soft Drinks</h3>
            <p>Coke, Sprite, Orange, Lemonade</p>
            <span className="price">$2.99</span>
          </div>
          <div className="menu-item">
            <h3>Fresh Juices</h3>
            <p>Orange, Apple, Mango</p>
            <span className="price">$4.99</span>
          </div>
          <div className="menu-item">
            <h3>Milkshakes</h3>
            <p>Vanilla, Chocolate, Strawberry</p>
            <span className="price">$5.99</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;