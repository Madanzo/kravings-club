#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - KRAVINGS CLUB SCREENSHOT MISSION
 * 
 * Comprehensive screenshot documentation of kravings.club
 * Organized by page and viewport for military-grade intelligence
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const BASE_URL = 'https://kravings.club';
const SCREENSHOT_DIR = '/workspaces/madanzo/army-command/command-center/assets/kravings-club-screenshots';
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

// Viewport configurations
const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 1024, height: 768 },
  mobile: { width: 375, height: 667 }
};

// Pages to capture
const PAGES = [
  { name: 'homepage', url: '/', folder: '01-homepage' },
  { name: 'menu', url: '/menu/', folder: '02-menu-products' },
  { name: 'about', url: '/about-us/', folder: '03-about-contact' },
  { name: 'contact', url: '/contactus/', folder: '03-about-contact' },
  { name: 'faq', url: '/faq/', folder: '04-legal-compliance' },
  { name: 'privacy', url: '/privacy-policy/', folder: '04-legal-compliance' }
];

async function createScreenshotDir(folder, viewport) {
  const dir = path.join(SCREENSHOT_DIR, folder, viewport);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

async function captureScreenshot(page, folder, viewport, pageName, element = 'full') {
  const dir = await createScreenshotDir(folder, viewport);
  const filename = `kravings-${pageName}-${viewport}-${element}-${TIMESTAMP}.png`;
  const filepath = path.join(dir, filename);
  
  console.log(`📸 Capturing: ${filename}`);
  
  if (element === 'full') {
    await page.screenshot({ 
      path: filepath, 
      fullPage: true,
      type: 'png'
    });
  } else {
    // Capture specific element if selector provided
    const elementHandle = await page.$(element);
    if (elementHandle) {
      await elementHandle.screenshot({ path: filepath, type: 'png' });
    }
  }
  
  return filepath;
}

async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Additional wait for dynamic content
}

async function capturePageScreenshots(browser, pageConfig) {
  console.log(`\n🎯 CAPTURING PAGE: ${pageConfig.name.toUpperCase()}`);
  
  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    console.log(`  📱 Viewport: ${viewportName} (${viewport.width}x${viewport.height})`);
    
    const page = await browser.newPage();
    await page.setViewportSize(viewport);
    
    // Set user agent for mobile
    if (viewportName === 'mobile') {
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
    }
    
    try {
      const url = `${BASE_URL}${pageConfig.url}`;
      console.log(`    🔗 Navigating to: ${url}`);
      
      await page.goto(url, { waitUntil: 'networkidle' });
      await waitForPageLoad(page);
      
      // Capture full page
      await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name);
      
      // Mobile-specific captures
      if (viewportName === 'mobile') {
        // Try to capture mobile menu if hamburger exists
        const hamburger = await page.$('button[aria-label="Toggle menu"], .hamburger, .mobile-menu-toggle');
        if (hamburger) {
          await hamburger.click();
          await page.waitForTimeout(1000);
          await captureScreenshot(page, '06-mobile-specific', viewportName, pageConfig.name, 'menu');
        }
      }
      
      // Page-specific captures
      if (pageConfig.name === 'homepage') {
        // Capture hero section
        const hero = await page.$('.hero, .banner, .main-hero');
        if (hero) {
          await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name, 'hero');
        }
      }
      
      if (pageConfig.name === 'menu') {
        // Capture product grid
        const products = await page.$('.products, .product-grid, .menu-items');
        if (products) {
          await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name, 'products');
        }
      }
      
    } catch (error) {
      console.error(`    ❌ Error capturing ${pageConfig.name} at ${viewportName}:`, error.message);
    }
    
    await page.close();
  }
}

async function main() {
  console.log('🎖️ ARMY COMMAND CENTER - KRAVINGS CLUB SCREENSHOT MISSION');
  console.log('=========================================================');
  console.log(`📅 Mission Date: ${TIMESTAMP}`);
  console.log(`🎯 Target: ${BASE_URL}`);
  console.log(`📁 Assets Directory: ${SCREENSHOT_DIR}\n`);
  
  let browser;
  try {
    console.log('🚀 Launching Puppeteer...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    });
    
    console.log('✅ Puppeteer launched successfully');
    
    // Capture all pages
    for (const pageConfig of PAGES) {
      await capturePageScreenshots(browser, pageConfig);
    }
    
    console.log('\n🎯 MISSION COMPLETE');
    console.log('✅ All screenshots captured successfully');
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`);
    
  } catch (error) {
    console.error('❌ Mission failed:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Execute mission
main().catch(console.error);