/**
 * SECURITY CONFIGURATION FOR CANNABIS E-COMMERCE PLATFORM
 * Comprehensive security hardening for Kravings Club
 */

// Security Headers Configuration
export const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.blaze.me https://*.stripe.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.blaze.me https://*.stripe.com https://*.google-analytics.com; frame-src https://*.stripe.com; object-src 'none';"
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

// Rate Limiting Configuration
export const rateLimiting = {
  // API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many API requests from this IP'
  },
  
  // Login attempts
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP'
  },
  
  // Cart operations
  cart: {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // limit each IP to 30 cart operations per minute
    message: 'Too many cart operations from this IP'
  },
  
  // Order creation
  orders: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // limit each IP to 3 order attempts per 10 minutes
    message: 'Too many order attempts from this IP'
  }
};

// Port Configuration
export const portConfig = {
  // Only allow necessary ports
  allowedPorts: [
    80,   // HTTP (redirect to HTTPS)
    443,  // HTTPS
    22    // SSH (admin only, with key authentication)
  ],
  
  // Block these ports explicitly
  blockedPorts: [
    21,    // FTP
    23,    // Telnet
    25,    // SMTP
    53,    // DNS (unless DNS server)
    110,   // POP3
    143,   // IMAP
    993,   // IMAPS
    995,   // POP3S
    1433,  // SQL Server
    3306,  // MySQL
    5432,  // PostgreSQL
    6379,  // Redis
    27017, // MongoDB
    8080,  // Alternative HTTP (dev only)
    8443,  // Alternative HTTPS (dev only)
    9200,  // Elasticsearch
    9300   // Elasticsearch
  ],
  
  // Development ports (only allowed in development)
  devPorts: [
    3000,  // Next.js dev server
    3001,  // Alternative dev server
    5173,  // Vite dev server
    8080,  // Alternative HTTP dev
    8443   // Alternative HTTPS dev
  ]
};

// Firewall Rules Configuration
export const firewallRules = {
  // Allow HTTPS traffic
  https: {
    port: 443,
    protocol: 'tcp',
    action: 'allow',
    source: 'any'
  },
  
  // Allow HTTP traffic (for redirects)
  http: {
    port: 80,
    protocol: 'tcp',
    action: 'allow',
    source: 'any'
  },
  
  // SSH access (admin IPs only)
  ssh: {
    port: 22,
    protocol: 'tcp',
    action: 'allow',
    source: 'admin_ips_only' // Define admin IPs
  },
  
  // Block all other incoming traffic
  default: {
    action: 'deny',
    direction: 'incoming'
  }
};

// Cannabis-Specific Security Requirements
export const cannabisSecurity = {
  // Age verification requirements
  ageVerification: {
    required: true,
    minimumAge: 21,
    verificationMethods: ['id_check', 'age_gate'],
    sessionTimeout: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // Purchase limits (California compliance)
  purchaseLimits: {
    flower: {
      daily: 28.5, // grams
      perTransaction: 14.25 // grams
    },
    concentrates: {
      daily: 8, // grams
      perTransaction: 4 // grams
    },
    edibles: {
      daily: 'unlimited', // no limit on edibles in CA
      perTransaction: 'unlimited'
    }
  },
  
  // Data protection requirements
  dataProtection: {
    encryption: 'AES-256',
    dataRetention: 90, // days
    anonymization: true,
    gdprCompliance: true
  },
  
  // Payment security
  paymentSecurity: {
    pciCompliance: true,
    allowedProcessors: ['indicapay', 'naturepay', 'stripe'],
    sslRequired: true,
    tokenization: true
  }
};

// Security Monitoring Configuration
export const securityMonitoring = {
  // Log suspicious activities
  logging: {
    failedLogins: true,
    unusualTraffic: true,
    sqlInjectionAttempts: true,
    xssAttempts: true,
    bruteForceDetection: true,
    ipBlocking: true
  },
  
  // Alert thresholds
  alerts: {
    failedLoginsThreshold: 5,
    trafficSpikeThreshold: 1000, // requests per minute
    errorRateThreshold: 10 // percent
  },
  
  // Backup and recovery
  backup: {
    frequency: 'daily',
    retention: 30, // days
    encryption: true,
    offsite: true
  }
};

// Environment-specific configurations
export const environmentConfig = {
  production: {
    debug: false,
    logging: 'error',
    rateLimiting: rateLimiting,
    securityHeaders: securityHeaders,
    allowedPorts: portConfig.allowedPorts,
    httpsOnly: true
  },
  
  staging: {
    debug: false,
    logging: 'warn',
    rateLimiting: { ...rateLimiting, api: { ...rateLimiting.api, max: 200 } },
    securityHeaders: securityHeaders,
    allowedPorts: [...portConfig.allowedPorts, ...portConfig.devPorts],
    httpsOnly: true
  },
  
  development: {
    debug: true,
    logging: 'debug',
    rateLimiting: { ...rateLimiting, api: { ...rateLimiting.api, max: 1000 } },
    securityHeaders: [], // Reduced headers for dev
    allowedPorts: [...portConfig.allowedPorts, ...portConfig.devPorts],
    httpsOnly: false
  }
};

// IP Whitelist for admin access
export const ipWhitelist = {
  admin: [
    // Add your admin IPs here
    '127.0.0.1',      // localhost
    '::1',            // localhost IPv6
    // '192.168.1.100', // example admin IP
  ],
  
  // Cannabis compliance systems
  compliance: [
    // Metrc system IPs (if applicable)
    // BioTrack system IPs (if applicable)
  ],
  
  // Payment processor IPs
  payments: [
    // Stripe webhook IPs
    '54.187.174.169',
    '54.187.205.235',
    '54.187.216.72',
    // Add other payment processor IPs
  ]
};

export default {
  securityHeaders,
  rateLimiting,
  portConfig,
  firewallRules,
  cannabisSecurity,
  securityMonitoring,
  environmentConfig,
  ipWhitelist
};