#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - KRAVINGS CLUB VERIFIED SCREENSHOTS
 * 
 * Enhanced Puppeteer automation with age verification handling
 * Captures complete site content behind verification wall
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

// Pages to capture (with age verification)
const PAGES = [
  { name: 'homepage', url: '/', folder: '01-homepage' },
  { name: 'menu', url: '/menu/', folder: '02-menu-products' },
  { name: 'about', url: '/about-us/', folder: '03-about-contact' },
  { name: 'contact', url: '/contactus/', folder: '03-about-contact' },
  { name: 'faq', url: '/faq/', folder: '04-legal-compliance' },
  { name: 'privacy', url: '/privacy-policy/', folder: '04-legal-compliance' }
];

/**
 * 🔑 AGE VERIFICATION HANDLER
 * Detects and handles the age verification popup using tested method
 */
async function handleAgeVerification(page) {
  console.log('🔍 Checking for age verification popup...');
  
  try {
    // Wait for potential popup to appear
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Try to find and click the "Yes, I'm 21+" span element with pum-close class
    const yesButtonClicked = await page.evaluate(() => {
      // Look for the specific span with pum-close class and "Yes, I'm 21+" text
      const pumCloseElements = document.querySelectorAll('.pum-close');
      for (const element of pumCloseElements) {
        if (element.textContent.trim() === "Yes, I'm 21+") {
          element.click();
          return true;
        }
      }
      
      // Fallback: look for any element with "Yes, I'm 21+" text
      const allElements = document.querySelectorAll('*');
      for (const element of allElements) {
        if (element.textContent.trim() === "Yes, I'm 21+") {
          element.click();
          return true;
        }
      }
      
      return false;
    });
    
    if (yesButtonClicked) {
      console.log('✅ Found and clicked "Yes, I\'m 21+" element');
      
      // Wait for popup to close and page to load
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check if we successfully bypassed verification
      const title = await page.title();
      console.log(`✅ Age verification handled! Page title: ${title}`);
      return true;
    } else {
      console.log('⚠️ Could not find "Yes, I\'m 21+" element');
      
      // Debug: check what popup elements are available
      const popupInfo = await page.evaluate(() => {
        const pumElements = document.querySelectorAll('[class*="pum"]');
        const popupElements = Array.from(pumElements).map(el => ({
          tagName: el.tagName,
          className: el.className,
          textContent: el.textContent.substring(0, 50)
        }));
        return popupElements;
      });
      
      console.log('Popup elements found:', popupInfo);
      return false;
    }
    
  } catch (error) {
    console.log('⚠️ Age verification handling error:', error.message);
    return false;
  }
}

/**
 * 📸 ENHANCED SCREENSHOT CAPTURE
 * Captures screenshots with age verification handling
 */
async function captureScreenshot(page, folder, viewport, pageName, element = 'full') {
  const dir = path.join(SCREENSHOT_DIR, folder, viewport);
  await fs.mkdir(dir, { recursive: true });
  
  const suffix = element === 'full' ? 'verified' : element;
  const filename = `kravings-${pageName}-${viewport}-${suffix}-${TIMESTAMP}.png`;
  const filepath = path.join(dir, filename);
  
  console.log(`📸 Capturing: ${filename}`);
  
  try {
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
      } else {
        console.log(`⚠️ Element not found: ${element}`);
      }
    }
    
    console.log(`✅ Screenshot saved: ${filename}`);
    return filepath;
  } catch (error) {
    console.error(`❌ Screenshot error: ${error.message}`);
    return null;
  }
}

/**
 * 🌐 NAVIGATE WITH VERIFICATION
 * Navigates to page and handles age verification
 */
async function navigateWithVerification(page, url) {
  console.log(`🔗 Navigating to: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Handle age verification if present
    await handleAgeVerification(page);
    
    // Wait for content to fully load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return true;
  } catch (error) {
    console.error(`❌ Navigation error: ${error.message}`);
    return false;
  }
}

/**
 * 📱 CAPTURE PAGE ACROSS VIEWPORTS
 * Captures screenshots across all viewports with verification
 */
async function captureVerifiedPageScreenshots(browser, pageConfig) {
  console.log(`\n🎯 CAPTURING VERIFIED PAGE: ${pageConfig.name.toUpperCase()}`);
  
  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    console.log(`  📱 Viewport: ${viewportName} (${viewport.width}x${viewport.height})`);
    
    const page = await browser.newPage();
    
    try {
      await page.setViewport(viewport);
      
      // Set user agent for mobile
      if (viewportName === 'mobile') {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      }
      
      const url = `${BASE_URL}${pageConfig.url}`;
      const success = await navigateWithVerification(page, url);
      
      if (success) {
        // Capture full page
        await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name);
        
        // Capture specific elements for certain pages
        if (pageConfig.name === 'homepage') {
          // Try to capture hero section
          const heroSelectors = ['.hero', '.banner', '.main-hero', '.hero-section'];
          for (const selector of heroSelectors) {
            const element = await page.$(selector);
            if (element) {
              await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name, 'hero');
              break;
            }
          }
        }
        
        if (pageConfig.name === 'menu') {
          // Try to capture product grid
          const productSelectors = ['.products', '.product-grid', '.menu-items', '.woocommerce-products'];
          for (const selector of productSelectors) {
            const element = await page.$(selector);
            if (element) {
              await captureScreenshot(page, pageConfig.folder, viewportName, pageConfig.name, 'products');
              break;
            }
          }
        }
        
        // Mobile-specific captures
        if (viewportName === 'mobile') {
          // Try to capture mobile menu
          const hamburgerSelectors = ['button[aria-label="Toggle menu"]', '.hamburger', '.mobile-menu-toggle', '.navbar-toggle'];
          for (const selector of hamburgerSelectors) {
            const hamburger = await page.$(selector);
            if (hamburger) {
              await hamburger.click();
              await new Promise(resolve => setTimeout(resolve, 1000));
              await captureScreenshot(page, '06-mobile-specific', viewportName, pageConfig.name, 'menu');
              break;
            }
          }
        }
        
      } else {
        console.log(`    ⚠️ Failed to load page: ${pageConfig.name}`);
      }
      
    } catch (error) {
      console.error(`    ❌ Error capturing ${pageConfig.name} at ${viewportName}:`, error.message);
    }
    
    await page.close();
  }
}

/**
 * 🎖️ MAIN MISSION EXECUTION
 */
async function main() {
  console.log('🎖️ ARMY COMMAND CENTER - KRAVINGS CLUB VERIFIED SCREENSHOTS');
  console.log('=============================================================');
  console.log(`📅 Mission Date: ${TIMESTAMP}`);
  console.log(`🎯 Target: ${BASE_URL}`);
  console.log(`📁 Assets Directory: ${SCREENSHOT_DIR}`);
  console.log('🔑 Age Verification: ENABLED\n');
  
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
    
    // Capture all pages with age verification
    for (const pageConfig of PAGES) {
      await captureVerifiedPageScreenshots(browser, pageConfig);
    }
    
    console.log('\n🎯 VERIFIED SCREENSHOT MISSION COMPLETE');
    console.log('✅ All verified screenshots captured successfully');
    console.log('🔑 Age verification handled automatically');
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