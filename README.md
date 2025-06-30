# Kravings Club - Food Delivery Platform

A modern, responsive food delivery web application built with React, designed to satisfy your cravings with quick and convenient delivery service.

## 🍔 Project Overview

Kravings Club is a full-featured food delivery platform that offers a seamless ordering experience for customers. The application features a beautiful, mobile-responsive design with an intuitive user interface for browsing menus, placing orders, and tracking deliveries.

## 🚀 Tech Stack

- **React 18.2.0** - Frontend framework
- **React Router DOM 6.20.0** - Client-side routing
- **React Scripts 5.0.1** - Build configuration
- **CSS3** - Custom styling with mobile-first approach
- **Vercel** - Deployment platform

## 📁 Project Structure

```
src/
├── App.js          # Main application component with routing
├── App.css         # Global styles and responsive design
├── index.js        # Application entry point
├── index.css       # Base styles
└── pages/          # Page components
    ├── Home.js     # Landing page with popular items
    ├── Menu.js     # Full menu with categories
    ├── Order.js    # Order form and checkout
    └── About.js    # About us and contact info
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode (http://localhost:3000)
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel` (follow prompts)

### Environment Variables

Create a `.env.local` file for sensitive data:

```env
REACT_APP_API_URL=your-api-url
REACT_APP_GOOGLE_MAPS_KEY=your-maps-key
REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-key
```

## ✨ Features

### Core Features
- **Dynamic Menu System** - Browse categories: Burgers, Pizza, Drinks, and more
- **Order Management** - Complete order form with delivery details
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Fast Performance** - Optimized build for quick loading

### User Experience
- **Mobile-First Navigation** - Hamburger menu for mobile devices
- **Touch-Friendly Interface** - 44px minimum touch targets
- **Smooth Animations** - CSS-based transitions for better performance
- **Intuitive Layout** - Easy-to-navigate interface

### Business Features
- **Menu Management** - Easy to update menu items and prices
- **Delivery Information** - Clear delivery hours and minimum order info
- **Contact Integration** - Phone and email contact options

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Desktop**: 1200px+ (full layout with sidebar)
- **Tablet**: 768px (optimized spacing)
- **Mobile**: 480px (hamburger menu, stacked layout)
- **Small Mobile**: 320px (compact design)

### Mobile Features
- Animated hamburger navigation menu
- Touch-optimized controls and buttons
- Responsive typography and spacing
- Mobile-first CSS architecture

## 🔒 Cannabis Compliance (Future Feature)

### Age Verification
The application is prepared for age verification integration:
- Age gate on first visit
- Cookie-based verification persistence
- Compliance with local regulations

### Implementation Guide
```javascript
// middleware.js (for Next.js deployment)
export function middleware(request) {
  const ageVerified = request.cookies.get('age-verified')
  
  if (!ageVerified && request.nextUrl.pathname !== '/age-verification') {
    return NextResponse.redirect(new URL('/age-verification', request.url))
  }
}
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Madanzo/kravings-club.git
   cd kravings-club
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Theme Colors
The app uses a warm color palette:
- Primary: `#ff6b6b` (Coral Red)
- Secondary: `#feca57` (Golden Yellow)
- Background: Linear gradient from coral to yellow

### Adding Menu Items
Edit `src/pages/Menu.js` to add new items:
```javascript
<div className="menu-item">
  <h3>Item Name</h3>
  <p>Item description</p>
  <span className="price">$XX.99</span>
</div>
```

## 📈 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order tracking system
- [ ] Payment integration (Stripe/PayPal)
- [ ] SMS notifications
- [ ] Loyalty program
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Contact

- **Business**: hello@kravingsclub.com
- **Support**: support@kravingsclub.com
- **Phone**: (555) 123-4567

---

Built with ❤️ by Kravings Club Team