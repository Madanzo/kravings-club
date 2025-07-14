#!/bin/bash

echo "🕷️ PUPPETEER DIRECT CAPTURE MISSION"
echo "==================================="

# Test if Puppeteer container works
echo "Testing Puppeteer MCP availability..."
docker run --rm mcp/puppeteer node --version

# Simple screenshot capture
echo ""
echo "📸 Attempting screenshot capture..."

docker run --rm -i \
  -v /workspaces/madanzo/army-command/operations/active-projects/merkad-agency-campaign/assets/enemy-reconnaissance:/output \
  --network=host \
  mcp/puppeteer node -e "
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-extensions'
      ],
      headless: true
    });
    
    console.log('Browser launched, creating page...');
    const page = await browser.newPage();
    
    console.log('Setting viewport...');
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to kravings.club...');
    await page.goto('https://kravings.club', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('Taking screenshot...');
    const screenshotBuffer = await page.screenshot({ fullPage: false });
    
    console.log('Saving screenshot...');
    fs.writeFileSync('/output/kravings-homepage.png', screenshotBuffer);
    
    console.log('Screenshot saved successfully!');
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
})();
" 2>&1

echo ""
echo "📁 Checking assets directory..."
ls -la /workspaces/madanzo/army-command/operations/active-projects/merkad-agency-campaign/assets/enemy-reconnaissance/

echo ""
echo "Mission status check complete."