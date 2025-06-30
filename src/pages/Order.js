import React from 'react';

function Order() {
  return (
    <div className="page">
      <h1>Order Now</h1>
      <div className="order-container">
        <section className="order-section">
          <h2>Delivery Information</h2>
          <form className="order-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Your phone number" />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <input type="text" placeholder="Street address" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" placeholder="Zip code" />
            </div>
          </form>
        </section>
        
        <section className="order-section">
          <h2>Order Summary</h2>
          <div className="order-summary">
            <p>Your cart is empty. Add items from our menu!</p>
          </div>
          <button className="order-button">Place Order</button>
        </section>
        
        <section className="delivery-info">
          <h3>Delivery Hours</h3>
          <p>Monday - Sunday: 11:00 AM - 10:00 PM</p>
          <h3>Delivery Time</h3>
          <p>Average delivery time: 30-45 minutes</p>
          <h3>Minimum Order</h3>
          <p>$15.00 for delivery</p>
        </section>
      </div>
    </div>
  );
}

export default Order;