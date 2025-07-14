#!/bin/bash

# Puppeteer MCP Screenshot Reconnaissance Mission
echo "🕷️ DEPLOYING PUPPETEER MCP FOR RECONNAISSANCE"
echo "============================================="
echo "Target: kravings.club"
echo ""

# Create screenshots directory
mkdir -p screenshots

# Run Puppeteer Docker container for screenshot capture
echo "📸 Executing screenshot capture mission..."

docker run --rm \
  -v $(pwd)/screenshots:/screenshots \
  --network=host \
  mcp/puppeteer \
  node -e "
const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Launching stealth browser...');
  
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new'
    });
    
    const page = await browser.newPage();
    
    // Desktop capture
    await page.setViewport({ width: 1920, height: 1080 });
    console.log('📡 Navigating to https://kravings.club ...');
    
    await page.goto('https://kravings.club', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    await page.waitForTimeout(3000);
    
    console.log('📸 Capturing desktop screenshot...');
    await page.screenshot({
      path: '/screenshots/kravings-desktop.png',
      fullPage: true
    });
    
    // Mobile capture
    await page.setViewport({ width: 375, height: 812 });
    await page.waitForTimeout(2000);
    
    console.log('📱 Capturing mobile screenshot...');
    await page.screenshot({
      path: '/screenshots/kravings-mobile.png',
      fullPage: true
    });
    
    // Extract basic info
    const pageInfo = await page.evaluate(() => ({
      title: document.title,
      url: window.location.href,
      hasAgeGate: document.body.innerText.includes('21') || document.body.innerText.includes('age')
    }));
    
    console.log('');
    console.log('📊 Page Intelligence:');
    console.log('Title:', pageInfo.title);
    console.log('URL:', pageInfo.url);
    console.log('Age Gate:', pageInfo.hasAgeGate ? 'Yes' : 'No');
    
    await browser.close();
    console.log('');
    console.log('✅ Mission complete! Screenshots saved.');
    
  } catch (error) {
    console.error('❌ Mission failed:', error.message);
    process.exit(1);
  }
})();
"

echo ""
echo "🎯 Checking captured intelligence..."
ls -la screenshots/

echo ""
echo "✅ RECONNAISSANCE MISSION COMPLETE"