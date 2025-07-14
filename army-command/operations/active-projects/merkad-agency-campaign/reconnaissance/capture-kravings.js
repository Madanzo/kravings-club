const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

// ENHANCED RECONNAISSANCE MISSION: COMPLETE SITE LIBERATION
async function captureKravingsClub() {
  console.log('🏰 ENHANCED PUPPETEER RECONNAISSANCE MISSION INITIATED');
  console.log('Target: kravings.club - OPERATION KRAVINGS DOMINATION');
  console.log('Mission: Complete site capture for liberation purposes');
  console.log('=======================================================');
  
  try {
    // Launch stealth browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport for desktop capture
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to target
    console.log('📡 Navigating to enemy territory...');
    await page.goto('https://kravings.club', {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });
    
    // Wait for content to load
    console.log('⏳ Waiting for page to stabilize...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Capture full page screenshot
    console.log('📸 Capturing desktop view...');
    await page.screenshot({
      path: path.join(__dirname, 'screenshots/kravings-desktop-full.png'),
      fullPage: true
    });
    
    // Capture above-fold screenshot
    await page.screenshot({
      path: path.join(__dirname, 'screenshots/kravings-desktop-hero.png'),
      fullPage: false
    });
    
    // Mobile reconnaissance
    console.log('📱 Switching to mobile reconnaissance...');
    await page.setViewport({ width: 375, height: 812 }); // iPhone X
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({
      path: path.join(__dirname, 'screenshots/kravings-mobile-full.png'),
      fullPage: true
    });
    
    // ENHANCED INTELLIGENCE EXTRACTION
    console.log('🔍 Extracting comprehensive page intelligence...');
    
    const pageData = await page.evaluate(() => {
      // Extract complete HTML structure
      const htmlContent = document.documentElement.outerHTML;
      
      // Extract all styles
      const stylesheets = Array.from(document.styleSheets).map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch (e) {
          return '/* External stylesheet */';
        }
      }).join('\n');
      
      // Extract all images
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className,
        width: img.width,
        height: img.height
      }));
      
      // Extract navigation structure
      const navigation = Array.from(document.querySelectorAll('nav, .nav, [class*="nav"], header')).map(nav => ({
        html: nav.outerHTML,
        links: Array.from(nav.querySelectorAll('a')).map(a => ({
          text: a.innerText.trim(),
          href: a.href,
          className: a.className
        }))
      }));
      
      // Extract color scheme
      const colors = {
        primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        textColor: getComputedStyle(document.body).color,
        linkColor: getComputedStyle(document.querySelector('a') || document.body).color
      };
      
      // Extract fonts
      const fonts = Array.from(new Set(
        Array.from(document.querySelectorAll('*')).map(el => 
          getComputedStyle(el).fontFamily
        )
      ));
      
      // Extract layout sections
      const sections = Array.from(document.querySelectorAll('section, .section, main, [class*="section"]')).map(section => ({
        className: section.className,
        id: section.id,
        html: section.outerHTML,
        text: section.innerText.substring(0, 500) // First 500 chars
      }));
      
      return {
        // Basic info
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        favicon: document.querySelector('link[rel="icon"]')?.href,
        
        // Content structure
        h1: document.querySelector('h1')?.innerText,
        h2s: Array.from(document.querySelectorAll('h2')).map(h => h.innerText),
        heroText: document.querySelector('.hero-section, [class*="hero"], .banner')?.innerText,
        
        // Navigation
        navigation,
        
        // Visual design
        colors,
        fonts,
        images,
        
        // Layout sections
        sections,
        
        // Complete page data
        htmlContent,
        stylesheets,
        
        // Cannabis-specific features
        hasAgeGate: !!document.querySelector('[class*="age"], [id*="age"]'),
        hasWeedmapsWidget: !!document.querySelector('[class*="weedmaps"], [id*="weedmaps"]'),
        hasBlazeIntegration: !!document.querySelector('[class*="blaze"], [id*="blaze"]'),
        hasShoppingCart: !!document.querySelector('[class*="cart"], [class*="shop"]'),
        hasDeliveryInfo: !!document.querySelector('[class*="delivery"], [class*="shipping"]'),
        
        // Technical details
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        userAgent: navigator.userAgent
      };
    });
    
    console.log('\n📊 COMPREHENSIVE INTELLIGENCE GATHERED:');
    console.log('=======================================');
    console.log('Title:', pageData.title);
    console.log('Description:', pageData.description);
    console.log('H1:', pageData.h1);
    console.log('Navigation sections:', pageData.navigation.length);
    console.log('Layout sections:', pageData.sections.length);
    console.log('Images found:', pageData.images.length);
    console.log('Fonts detected:', pageData.fonts.length);
    console.log('Age Gate Present:', pageData.hasAgeGate);
    console.log('Shopping Cart:', pageData.hasShoppingCart);
    console.log('Delivery Info:', pageData.hasDeliveryInfo);
    console.log('Weedmaps Integration:', pageData.hasWeedmapsWidget);
    console.log('Blaze Integration:', pageData.hasBlazeIntegration);
    
    // Save comprehensive intelligence reports
    await fs.writeFile(
      path.join(__dirname, 'screenshots/complete-intelligence-report.json'),
      JSON.stringify(pageData, null, 2)
    );
    
    // Save extracted HTML for reference
    await fs.writeFile(
      path.join(__dirname, 'screenshots/extracted-html.html'),
      pageData.htmlContent
    );
    
    // Save extracted CSS for reference
    await fs.writeFile(
      path.join(__dirname, 'screenshots/extracted-styles.css'),
      pageData.stylesheets
    );
    
    // Create simplified component breakdown
    const componentBreakdown = {
      navigation: pageData.navigation,
      sections: pageData.sections.map(s => ({
        className: s.className,
        id: s.id,
        preview: s.text.substring(0, 100)
      })),
      colors: pageData.colors,
      fonts: pageData.fonts,
      features: {
        ageGate: pageData.hasAgeGate,
        shoppingCart: pageData.hasShoppingCart,
        deliveryInfo: pageData.hasDeliveryInfo,
        weedmapsIntegration: pageData.hasWeedmapsWidget,
        blazeIntegration: pageData.hasBlazeIntegration
      }
    };
    
    await fs.writeFile(
      path.join(__dirname, 'screenshots/component-breakdown.json'),
      JSON.stringify(componentBreakdown, null, 2)
    );
    
    await browser.close();
    
    console.log('\n✅ ENHANCED RECONNAISSANCE MISSION COMPLETE');
    console.log('🏆 OPERATION KRAVINGS DOMINATION - INTELLIGENCE PHASE SUCCESS');
    console.log('================================================');
    console.log('📁 Assets captured:');
    console.log('   • Desktop screenshots (full + hero)');
    console.log('   • Mobile screenshots (full)');
    console.log('   • Complete HTML structure');
    console.log('   • All CSS styles');
    console.log('   • Component breakdown');
    console.log('   • Intelligence reports');
    console.log('📂 Location:', path.join(__dirname, 'screenshots/'));
    console.log('🎯 Ready for cloning operations!');
    
  } catch (error) {
    console.error('❌ MISSION FAILED:', error.message);
    console.error('Possible causes:');
    console.error('- Site may have anti-bot protection');
    console.error('- Network connectivity issues');
    console.error('- Site structure changed');
  }
}

// Execute mission
captureKravingsClub();