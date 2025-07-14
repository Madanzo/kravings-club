#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - ENHANCED ARSENAL TEST
 * 
 * Quick test of the Enhanced Age Verification Arsenal
 * Tests core functionality before full domination mission
 */

const { chromium } = require('playwright');
const { EnhancedAgeVerificationArsenal, DEVICE_PROFILES } = require('./enhanced-age-verification-arsenal');

async function testEnhancedArsenal() {
  console.log('🎖️ ENHANCED ARSENAL TEST - COMMENCING');
  console.log('====================================');
  console.log(`📅 Test Date: ${new Date().toISOString()}`);
  console.log(`🎯 Target: https://kravings.club`);
  console.log(`📱 Testing: Desktop Chrome profile\n`);

  const arsenal = new EnhancedAgeVerificationArsenal();
  const testProfile = DEVICE_PROFILES['desktop-chrome'];
  
  let browser;
  
  try {
    console.log('🚀 Launching browser...');
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: testProfile.viewport,
      userAgent: testProfile.userAgent
    });
    
    const page = await context.newPage();
    
    console.log('🔗 Navigating to kravings.club...');
    await page.goto('https://kravings.club', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('🎯 Testing age verification strategies...');
    
    // Test the enhanced arsenal
    const result = await arsenal.executeDeviceSpecificStrategy(page, testProfile);
    
    if (result.success) {
      console.log(`✅ SUCCESS: Age verification bypassed using ${result.method}`);
      
      // Wait for content to load
      await page.waitForTimeout(3000);
      
      // Check if content is visible
      const contentCheck = await page.evaluate(() => {
        const bodyText = document.body.textContent?.toLowerCase() || '';
        const hasContent = bodyText.includes('cannabis delivery') || bodyText.includes('kravings');
        const hasPopup = document.querySelector('.pum-overlay.pum-active') !== null;
        
        return {
          hasContent,
          hasPopup,
          bodyLength: bodyText.length,
          title: document.title
        };
      });
      
      console.log(`📄 Page title: ${contentCheck.title}`);
      console.log(`📝 Content detected: ${contentCheck.hasContent ? 'YES' : 'NO'}`);
      console.log(`🚫 Popup present: ${contentCheck.hasPopup ? 'YES' : 'NO'}`);
      console.log(`📊 Body text length: ${contentCheck.bodyLength} chars`);
      
      if (contentCheck.hasContent && !contentCheck.hasPopup) {
        console.log('\n🎖️ ENHANCED ARSENAL TEST: SUCCESS');
        console.log('✅ Age verification working correctly');
        console.log('✅ Content loading properly');
        console.log('✅ Ready for full domination mission');
      } else {
        console.log('\n⚠️ ENHANCED ARSENAL TEST: PARTIAL SUCCESS');
        console.log('✅ Age verification bypassed');
        if (contentCheck.hasPopup) console.log('❌ Popup still visible');
        if (!contentCheck.hasContent) console.log('❌ Content not detected');
      }
      
    } else {
      console.log(`❌ FAILED: Age verification failed - ${result.reason || 'Unknown reason'}`);
      console.log('\n🚨 ENHANCED ARSENAL TEST: FAILED');
      console.log('❌ Age verification not working');
      console.log('⚠️ Need to investigate before domination mission');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🚨 ENHANCED ARSENAL TEST: ERROR');
    console.log(`❌ ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testEnhancedArsenal().catch(console.error);