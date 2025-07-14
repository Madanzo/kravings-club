#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - ENHANCED AGE VERIFICATION ARSENAL
 * 
 * Multi-browser strategy with device-specific handlers and advanced popup detection
 * Designed to achieve 95%+ success rate across all devices and browsers
 * 
 * MISSION: Dominate age verification on kravings.club across all platforms
 */

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const vision = require('@google-cloud/vision');

// Configuration
const BASE_URL = 'https://kravings.club';
const SCREENSHOT_DIR = '/workspaces/madanzo/army-command/command-center/assets/kravings-club-screenshots';
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

// Google Vision client for screenshot validation
const visionClient = new vision.ImageAnnotatorClient();

/**
 * 🎯 DEVICE PROFILES FOR TARGETED ASSAULT
 */
const DEVICE_PROFILES = {
  'iphone-safari': {
    browser: 'webkit',
    device: 'iPhone 12',
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    popupSelectors: [
      '.pum-close[data-mobile="true"]',
      'span[role="button"][aria-label*="21"]',
      'button[data-age-verify="mobile"]',
      '.age-gate-mobile .confirm-age',
      '[data-testid="age-verification-yes-mobile"]'
    ],
    strategy: 'mobile-first'
  },
  'android-chrome': {
    browser: 'chromium',
    device: 'Pixel 5',
    viewport: { width: 393, height: 851 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36',
    popupSelectors: [
      '.pum-close[data-android="true"]',
      'button[data-platform="android"]',
      '.android-age-gate button:first-child',
      '[data-age="21"][data-mobile="android"]',
      'span:contains("Yes, I\'m 21+")[data-touch="true"]'
    ],
    strategy: 'android-optimized'
  },
  'ipad-safari': {
    browser: 'webkit',
    device: 'iPad Pro',
    viewport: { width: 1024, height: 1366 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    popupSelectors: [
      '.pum-close[data-tablet="true"]',
      'button[data-device="tablet"]',
      '.tablet-age-verification .confirm',
      '[data-ipad="true"][data-age="confirm"]',
      'span[data-tablet="yes"]:contains("21+")'
    ],
    strategy: 'tablet-hybrid'
  },
  'desktop-chrome': {
    browser: 'chromium',
    device: null,
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    popupSelectors: [
      '.pum-close:contains("Yes, I\'m 21+")',
      'button[data-age="21"]:not([data-mobile])',
      '.desktop-age-gate .confirm-age',
      '[data-desktop="true"][data-verify="age"]',
      'span.pum-close[data-action="confirm"]'
    ],
    strategy: 'desktop-standard'
  },
  'desktop-firefox': {
    browser: 'firefox',
    device: null,
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    popupSelectors: [
      '.pum-close[data-firefox="true"]',
      'button[data-browser="firefox"]',
      '.firefox-age-verify button',
      '[data-gecko="true"][data-age="21"]',
      'span:contains("Yes"):not([data-mobile])'
    ],
    strategy: 'firefox-specific'
  }
};

/**
 * 🔍 ADVANCED POPUP DETECTION MATRIX
 */
class PopupDetectionMatrix {
  constructor() {
    this.strategies = [
      'direct-selector',
      'text-content-match',
      'xpath-search', 
      'computer-vision',
      'dom-traversal',
      'event-trigger',
      'iframe-detection'
    ];
  }

  /**
   * 🎯 DIRECT SELECTOR STRATEGY
   */
  async directSelector(page, selectors) {
    console.log('    🎯 Trying direct selector strategy...');
    
    for (const selector of selectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          const isVisible = await element.isVisible();
          if (isVisible) {
            console.log(`    ✅ Found element with selector: ${selector}`);
            await element.click();
            return { success: true, method: 'direct-selector', selector };
          }
        }
      } catch (error) {
        console.log(`    ⚠️ Selector failed: ${selector} - ${error.message}`);
      }
    }
    
    return { success: false, method: 'direct-selector' };
  }

  /**
   * 📝 TEXT CONTENT MATCH STRATEGY
   */
  async textContentMatch(page, textPatterns = ["Yes, I'm 21+", "I'm 21+", "Yes", "Enter", "Confirm"]) {
    console.log('    📝 Trying text content match strategy...');
    
    for (const text of textPatterns) {
      try {
        const result = await page.evaluate((searchText) => {
          const elements = Array.from(document.querySelectorAll('*'));
          const matches = elements.filter(el => 
            el.textContent && 
            el.textContent.trim().includes(searchText) &&
            (el.tagName === 'BUTTON' || el.tagName === 'SPAN' || el.role === 'button')
          );
          
          for (const match of matches) {
            if (match.offsetParent !== null) { // Check if visible
              match.click();
              return { found: true, text: searchText, tagName: match.tagName };
            }
          }
          
          return { found: false };
        }, text);
        
        if (result.found) {
          console.log(`    ✅ Found and clicked element with text: ${text}`);
          return { success: true, method: 'text-content-match', text: result.text };
        }
      } catch (error) {
        console.log(`    ⚠️ Text search failed for "${text}": ${error.message}`);
      }
    }
    
    return { success: false, method: 'text-content-match' };
  }

  /**
   * 🔍 XPATH SEARCH STRATEGY
   */
  async xpathSearch(page) {
    console.log('    🔍 Trying XPath search strategy...');
    
    const xpaths = [
      "//button[contains(text(), \"Yes, I'm 21+\")]",
      "//span[contains(text(), \"Yes, I'm 21+\")]",
      "//button[contains(text(), \"21+\")]",
      "//span[contains(@class, 'pum-close')]",
      "//*[@role='button' and contains(text(), 'Yes')]",
      "//button[contains(@data-age, '21')]",
      "//*[contains(@class, 'age-verify') and contains(text(), 'Yes')]"
    ];
    
    for (const xpath of xpaths) {
      try {
        const element = await page.$(`xpath=${xpath}`);
        if (element) {
          const isVisible = await element.isVisible();
          if (isVisible) {
            console.log(`    ✅ Found element with XPath: ${xpath}`);
            await element.click();
            return { success: true, method: 'xpath-search', xpath };
          }
        }
      } catch (error) {
        console.log(`    ⚠️ XPath failed: ${xpath.substring(0, 50)}...`);
      }
    }
    
    return { success: false, method: 'xpath-search' };
  }

  /**
   * 🖼️ COMPUTER VISION STRATEGY
   */
  async computerVision(page) {
    console.log('    🖼️ Trying computer vision strategy...');
    
    try {
      // Take screenshot for analysis
      const screenshotBuffer = await page.screenshot({ type: 'png' });
      
      // Use Google Vision API to detect text
      const [result] = await visionClient.textDetection({
        image: { content: screenshotBuffer }
      });
      
      const detections = result.textAnnotations;
      if (!detections || detections.length === 0) {
        return { success: false, method: 'computer-vision', reason: 'No text detected' };
      }
      
      // Look for age verification text
      const ageVerificationTexts = ["Yes, I'm 21+", "I'm 21+", "21 years", "age verification"];
      
      for (const detection of detections) {
        const text = detection.description.toLowerCase();
        const hasAgeText = ageVerificationTexts.some(ageText => 
          text.includes(ageText.toLowerCase())
        );
        
        if (hasAgeText && detection.boundingPoly) {
          // Get coordinates and click
          const vertices = detection.boundingPoly.vertices;
          const centerX = Math.round((vertices[0].x + vertices[2].x) / 2);
          const centerY = Math.round((vertices[0].y + vertices[2].y) / 2);
          
          console.log(`    🎯 Found age verification text at (${centerX}, ${centerY}): ${detection.description}`);
          await page.mouse.click(centerX, centerY);
          
          return { 
            success: true, 
            method: 'computer-vision', 
            text: detection.description,
            coordinates: { x: centerX, y: centerY }
          };
        }
      }
      
      return { success: false, method: 'computer-vision', reason: 'No age verification text found' };
      
    } catch (error) {
      console.log(`    ⚠️ Computer vision failed: ${error.message}`);
      return { success: false, method: 'computer-vision', error: error.message };
    }
  }

  /**
   * 🌳 DOM TRAVERSAL STRATEGY
   */
  async domTraversal(page) {
    console.log('    🌳 Trying DOM traversal strategy...');
    
    try {
      const result = await page.evaluate(() => {
        // Find all clickable elements
        const clickableElements = document.querySelectorAll('button, span[role="button"], div[role="button"], a[role="button"]');
        
        // Score elements based on age verification likelihood
        const candidates = Array.from(clickableElements).map(el => {
          let score = 0;
          const text = el.textContent?.toLowerCase() || '';
          const className = el.className?.toLowerCase() || '';
          const id = el.id?.toLowerCase() || '';
          
          // Text scoring
          if (text.includes("yes, i'm 21+")) score += 100;
          if (text.includes("21+")) score += 80;
          if (text.includes("yes")) score += 60;
          if (text.includes("enter")) score += 40;
          if (text.includes("confirm")) score += 40;
          
          // Class/ID scoring
          if (className.includes('pum-close')) score += 90;
          if (className.includes('age')) score += 70;
          if (className.includes('verify')) score += 70;
          if (className.includes('confirm')) score += 60;
          
          // Position scoring (popups usually centered)
          const rect = el.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0;
          const isCentered = Math.abs(rect.left - window.innerWidth/2) < window.innerWidth/4;
          
          if (isVisible) score += 50;
          if (isCentered) score += 30;
          
          return { element: el, score, text, rect };
        }).filter(candidate => candidate.score > 30)
          .sort((a, b) => b.score - a.score);
        
        // Click the highest scoring candidate
        if (candidates.length > 0) {
          const best = candidates[0];
          best.element.click();
          return { 
            success: true, 
            score: best.score, 
            text: best.text,
            rect: best.rect 
          };
        }
        
        return { success: false, reason: 'No suitable candidates found' };
      });
      
      if (result.success) {
        console.log(`    ✅ DOM traversal found element (score: ${result.score}): ${result.text}`);
        return { success: true, method: 'dom-traversal', ...result };
      } else {
        return { success: false, method: 'dom-traversal', reason: result.reason };
      }
      
    } catch (error) {
      console.log(`    ⚠️ DOM traversal failed: ${error.message}`);
      return { success: false, method: 'dom-traversal', error: error.message };
    }
  }

  /**
   * ⚡ EVENT TRIGGER STRATEGY
   */
  async eventTrigger(page) {
    console.log('    ⚡ Trying event trigger strategy...');
    
    try {
      const result = await page.evaluate(() => {
        // Look for elements with click event listeners
        const allElements = document.querySelectorAll('*');
        
        for (const element of allElements) {
          const events = getEventListeners ? getEventListeners(element) : {};
          
          if (events.click && 
              (element.textContent?.includes('21') || 
               element.className?.includes('pum') ||
               element.className?.includes('age'))) {
            
            // Trigger click event
            element.dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            }));
            
            return { 
              success: true, 
              text: element.textContent?.substring(0, 50),
              className: element.className 
            };
          }
        }
        
        return { success: false, reason: 'No event listeners found' };
      });
      
      if (result.success) {
        console.log(`    ✅ Event trigger successful: ${result.text}`);
        return { success: true, method: 'event-trigger', ...result };
      } else {
        return { success: false, method: 'event-trigger', reason: result.reason };
      }
      
    } catch (error) {
      console.log(`    ⚠️ Event trigger failed: ${error.message}`);
      return { success: false, method: 'event-trigger', error: error.message };
    }
  }

  /**
   * 🪟 IFRAME DETECTION STRATEGY
   */
  async iframeDetection(page) {
    console.log('    🪟 Trying iframe detection strategy...');
    
    try {
      const frames = page.frames();
      console.log(`    Found ${frames.length} frames`);
      
      for (const frame of frames) {
        if (frame === page.mainFrame()) continue;
        
        try {
          // Check if frame contains age verification
          const hasAgeVerification = await frame.evaluate(() => {
            const text = document.body.textContent?.toLowerCase() || '';
            return text.includes('21') || text.includes('age') || text.includes('verify');
          });
          
          if (hasAgeVerification) {
            console.log(`    🎯 Found age verification in iframe`);
            
            // Try to click age verification in iframe
            const clicked = await this.textContentMatch(frame);
            if (clicked.success) {
              return { success: true, method: 'iframe-detection', frame: frame.url() };
            }
          }
        } catch (frameError) {
          console.log(`    ⚠️ Frame access denied: ${frameError.message}`);
        }
      }
      
      return { success: false, method: 'iframe-detection', reason: 'No age verification iframes found' };
      
    } catch (error) {
      console.log(`    ⚠️ Iframe detection failed: ${error.message}`);
      return { success: false, method: 'iframe-detection', error: error.message };
    }
  }
}

/**
 * 🎖️ ENHANCED AGE VERIFICATION ARSENAL
 */
class EnhancedAgeVerificationArsenal {
  constructor() {
    this.popupDetector = new PopupDetectionMatrix();
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 8000
    };
  }

  /**
   * 🚀 LAUNCH MULTI-BROWSER ASSAULT
   */
  async launchMultiBrowserAssault(deviceProfile) {
    console.log(`🚀 Launching ${deviceProfile.browser} for ${deviceProfile.device || 'desktop'}...`);
    
    let browser;
    switch (deviceProfile.browser) {
      case 'webkit':
        browser = await webkit.launch({ headless: true });
        break;
      case 'firefox':
        browser = await firefox.launch({ headless: true });
        break;
      case 'chromium':
      default:
        browser = await chromium.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        break;
    }
    
    const context = await browser.newContext({
      viewport: deviceProfile.viewport,
      userAgent: deviceProfile.userAgent,
      ...(deviceProfile.device && { 
        ...playwright.devices[deviceProfile.device] 
      })
    });
    
    const page = await context.newPage();
    
    return { browser, context, page };
  }

  /**
   * 🎯 EXECUTE DEVICE-SPECIFIC STRATEGY
   */
  async executeDeviceSpecificStrategy(page, deviceProfile) {
    console.log(`🎯 Executing ${deviceProfile.strategy} strategy...`);
    
    switch (deviceProfile.strategy) {
      case 'mobile-first':
        return await this.mobileFirstStrategy(page, deviceProfile);
      case 'android-optimized':
        return await this.androidOptimizedStrategy(page, deviceProfile);
      case 'tablet-hybrid':
        return await this.tabletHybridStrategy(page, deviceProfile);
      case 'desktop-standard':
        return await this.desktopStandardStrategy(page, deviceProfile);
      case 'firefox-specific':
        return await this.firefoxSpecificStrategy(page, deviceProfile);
      default:
        return await this.universalStrategy(page, deviceProfile);
    }
  }

  /**
   * 📱 MOBILE-FIRST STRATEGY
   */
  async mobileFirstStrategy(page, deviceProfile) {
    console.log('  📱 Executing mobile-first strategy...');
    
    // Wait for mobile popup with longer timeout
    await this.waitForPopupWithRetry(page, 5000);
    
    // Try mobile-specific selectors first
    const directResult = await this.popupDetector.directSelector(page, deviceProfile.popupSelectors);
    if (directResult.success) return directResult;
    
    // Mobile touch events
    await page.touchscreen.tap(200, 400); // Common popup location on mobile
    await page.waitForTimeout(1000);
    
    // Text content match with mobile-specific patterns
    const textResult = await this.popupDetector.textContentMatch(page, ["I'm 21+", "Yes", "Enter"]);
    if (textResult.success) return textResult;
    
    // DOM traversal as fallback
    return await this.popupDetector.domTraversal(page);
  }

  /**
   * 🤖 ANDROID-OPTIMIZED STRATEGY
   */
  async androidOptimizedStrategy(page, deviceProfile) {
    console.log('  🤖 Executing Android-optimized strategy...');
    
    // Android-specific popup detection
    await this.waitForPopupWithRetry(page, 4000);
    
    // Try Android-specific selectors
    const directResult = await this.popupDetector.directSelector(page, deviceProfile.popupSelectors);
    if (directResult.success) return directResult;
    
    // Android touch behavior simulation
    await page.evaluate(() => {
      // Simulate Android touch events
      const touchEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [new Touch({
          identifier: 1,
          target: document.body,
          clientX: 200,
          clientY: 400,
          radiusX: 2.5,
          radiusY: 2.5,
          rotationAngle: 0,
          force: 0.5
        })]
      });
      document.body.dispatchEvent(touchEvent);
    });
    
    await page.waitForTimeout(1000);
    
    // XPath search with Android-specific patterns
    const xpathResult = await this.popupDetector.xpathSearch(page);
    if (xpathResult.success) return xpathResult;
    
    return await this.popupDetector.eventTrigger(page);
  }

  /**
   * 📊 TABLET-HYBRID STRATEGY
   */
  async tabletHybridStrategy(page, deviceProfile) {
    console.log('  📊 Executing tablet-hybrid strategy...');
    
    // Tablet popups sometimes behave like desktop
    await this.waitForPopupWithRetry(page, 3000);
    
    // Try tablet-specific selectors
    const directResult = await this.popupDetector.directSelector(page, deviceProfile.popupSelectors);
    if (directResult.success) return directResult;
    
    // Computer vision for tablets (better screen real estate)
    const visionResult = await this.popupDetector.computerVision(page);
    if (visionResult.success) return visionResult;
    
    // Text content match
    const textResult = await this.popupDetector.textContentMatch(page);
    if (textResult.success) return textResult;
    
    return await this.popupDetector.domTraversal(page);
  }

  /**
   * 🖥️ DESKTOP-STANDARD STRATEGY
   */
  async desktopStandardStrategy(page, deviceProfile) {
    console.log('  🖥️ Executing desktop-standard strategy...');
    
    await this.waitForPopupWithRetry(page, 2000);
    
    // Desktop-specific selectors
    const directResult = await this.popupDetector.directSelector(page, deviceProfile.popupSelectors);
    if (directResult.success) return directResult;
    
    // XPath search (works well on desktop)
    const xpathResult = await this.popupDetector.xpathSearch(page);
    if (xpathResult.success) return xpathResult;
    
    // Text content match
    const textResult = await this.popupDetector.textContentMatch(page);
    if (textResult.success) return textResult;
    
    // Computer vision as backup
    const visionResult = await this.popupDetector.computerVision(page);
    if (visionResult.success) return visionResult;
    
    return await this.popupDetector.domTraversal(page);
  }

  /**
   * 🦊 FIREFOX-SPECIFIC STRATEGY
   */
  async firefoxSpecificStrategy(page, deviceProfile) {
    console.log('  🦊 Executing Firefox-specific strategy...');
    
    // Firefox sometimes needs extra time for popups
    await this.waitForPopupWithRetry(page, 4000);
    
    // Firefox-specific selectors
    const directResult = await this.popupDetector.directSelector(page, deviceProfile.popupSelectors);
    if (directResult.success) return directResult;
    
    // Event trigger (Firefox handles events differently)
    const eventResult = await this.popupDetector.eventTrigger(page);
    if (eventResult.success) return eventResult;
    
    // DOM traversal
    const domResult = await this.popupDetector.domTraversal(page);
    if (domResult.success) return domResult;
    
    return await this.popupDetector.textContentMatch(page);
  }

  /**
   * 🌐 UNIVERSAL STRATEGY (Fallback)
   */
  async universalStrategy(page, deviceProfile) {
    console.log('  🌐 Executing universal strategy...');
    
    await this.waitForPopupWithRetry(page, 3000);
    
    // Try all strategies in order
    const strategies = [
      () => this.popupDetector.directSelector(page, deviceProfile.popupSelectors),
      () => this.popupDetector.textContentMatch(page),
      () => this.popupDetector.xpathSearch(page),
      () => this.popupDetector.domTraversal(page),
      () => this.popupDetector.computerVision(page),
      () => this.popupDetector.eventTrigger(page),
      () => this.popupDetector.iframeDetection(page)
    ];
    
    for (const strategy of strategies) {
      try {
        const result = await strategy();
        if (result.success) {
          return result;
        }
      } catch (error) {
        console.log(`    ⚠️ Strategy failed: ${error.message}`);
      }
    }
    
    return { success: false, method: 'universal-strategy', reason: 'All strategies failed' };
  }

  /**
   * ⏰ WAIT FOR POPUP WITH RETRY
   */
  async waitForPopupWithRetry(page, maxWait = 3000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWait) {
      try {
        // Check for popup indicators
        const popupExists = await page.evaluate(() => {
          const indicators = [
            '.pum-overlay',
            '.pum-active',
            '[class*="popup"]',
            '[class*="modal"]',
            '[class*="age"]',
            'iframe[src*="age"]'
          ];
          
          return indicators.some(selector => {
            const element = document.querySelector(selector);
            return element && element.offsetParent !== null;
          });
        });
        
        if (popupExists) {
          console.log(`    ✅ Popup detected after ${Date.now() - startTime}ms`);
          return true;
        }
        
        await page.waitForTimeout(500);
      } catch (error) {
        // Continue waiting
      }
    }
    
    console.log(`    ⚠️ No popup detected after ${maxWait}ms`);
    return false;
  }

  /**
   * 🔄 RETRY WITH EXPONENTIAL BACKOFF
   */
  async retryWithBackoff(operation, context = {}) {
    let lastError;
    
    for (let attempt = 0; attempt < this.retryConfig.maxRetries; attempt++) {
      try {
        const result = await operation();
        if (result.success) {
          return result;
        }
        lastError = result;
      } catch (error) {
        lastError = { success: false, error: error.message };
      }
      
      if (attempt < this.retryConfig.maxRetries - 1) {
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(2, attempt),
          this.retryConfig.maxDelay
        );
        console.log(`    🔄 Retry ${attempt + 1}/${this.retryConfig.maxRetries} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return lastError || { success: false, reason: 'Max retries exceeded' };
  }

  /**
   * 📸 VALIDATE SCREENSHOT WITH GOOGLE VISION
   */
  async validateScreenshotWithVision(screenshotBuffer) {
    try {
      const [result] = await visionClient.textDetection({
        image: { content: screenshotBuffer }
      });
      
      const detections = result.textAnnotations;
      if (!detections || detections.length === 0) {
        return { isValid: false, reason: 'No text detected' };
      }
      
      const fullText = detections[0].description.toLowerCase();
      
      // Check for age verification popup text (bad)
      const popupIndicators = [
        'you must be at least 21',
        'are you 21 years',
        'age verification',
        'yes, i\'m 21+',
        'i\'m not 21 yet'
      ];
      
      const hasPopup = popupIndicators.some(indicator => fullText.includes(indicator));
      
      if (hasPopup) {
        return { 
          isValid: false, 
          reason: 'Age verification popup still visible',
          detectedText: fullText.substring(0, 200)
        };
      }
      
      // Check for actual site content (good)
      const contentIndicators = [
        'cannabis delivery',
        'kravings',
        'menu',
        'products',
        'store',
        'about us',
        'contact'
      ];
      
      const hasContent = contentIndicators.some(indicator => fullText.includes(indicator));
      
      return {
        isValid: hasContent,
        reason: hasContent ? 'Valid content detected' : 'No recognizable content',
        detectedText: fullText.substring(0, 200),
        confidence: hasContent ? 0.9 : 0.1
      };
      
    } catch (error) {
      console.log(`    ⚠️ Vision API validation failed: ${error.message}`);
      return { 
        isValid: false, 
        reason: `Vision API error: ${error.message}` 
      };
    }
  }
}

// Export for use in other modules
module.exports = { EnhancedAgeVerificationArsenal, PopupDetectionMatrix, DEVICE_PROFILES };