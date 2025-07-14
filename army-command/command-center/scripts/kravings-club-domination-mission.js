#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - KRAVINGS.CLUB DOMINATION MISSION
 * 
 * Advanced multi-browser screenshot capture with 95%+ success rate
 * Leverages Enhanced Age Verification Arsenal and Google Vision API
 * 
 * MISSION: Complete domination of kravings.club screenshot capture
 * SUCCESS CRITERIA: 95%+ success rate across all devices
 */

const { EnhancedAgeVerificationArsenal, DEVICE_PROFILES } = require('./enhanced-age-verification-arsenal');
const fs = require('fs').promises;
const path = require('path');
const vision = require('@google-cloud/vision');

// Configuration
const BASE_URL = 'https://kravings.club';
const SCREENSHOT_DIR = '/workspaces/madanzo/army-command/command-center/assets/kravings-club-screenshots';
const INTELLIGENCE_DIR = '/workspaces/madanzo/army-command/command-center/intelligence-reports';
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

// Mission parameters
const PAGES_TO_CAPTURE = [
  { name: 'homepage', url: '/', folder: '01-homepage', priority: 'critical' },
  { name: 'menu', url: '/menu/', folder: '02-menu-products', priority: 'critical' },
  { name: 'about', url: '/about-us/', folder: '03-about-contact', priority: 'high' },
  { name: 'contact', url: '/contactus/', folder: '03-about-contact', priority: 'high' },
  { name: 'faq', url: '/faq/', folder: '04-legal-compliance', priority: 'medium' },
  { name: 'privacy', url: '/privacy-policy/', folder: '04-legal-compliance', priority: 'medium' }
];

/**
 * 🎖️ DOMINATION MISSION COMMANDER
 */
class DominationMissionCommander {
  constructor() {
    this.arsenal = new EnhancedAgeVerificationArsenal();
    this.visionClient = new vision.ImageAnnotatorClient();
    this.missionResults = {
      totalAttempts: 0,
      successfulCaptures: 0,
      failedCaptures: 0,
      deviceResults: {},
      pageResults: {},
      strategies: {},
      startTime: Date.now(),
      endTime: null
    };
  }

  /**
   * 🚀 EXECUTE FULL DOMINATION MISSION
   */
  async executeFullDominationMission() {
    console.log('🎖️ KRAVINGS.CLUB DOMINATION MISSION - COMMENCING');
    console.log('================================================');
    console.log(`📅 Mission Date: ${TIMESTAMP}`);
    console.log(`🎯 Target: ${BASE_URL}`);
    console.log(`📱 Devices: ${Object.keys(DEVICE_PROFILES).length}`);
    console.log(`📄 Pages: ${PAGES_TO_CAPTURE.length}`);
    console.log(`🎖️ Success Target: 95%+\n`);

    try {
      // Phase 1: Device Reconnaissance
      await this.deviceReconnaissance();

      // Phase 2: Multi-Device Assault
      await this.multiDeviceAssault();

      // Phase 3: Quality Validation
      await this.qualityValidation();

      // Phase 4: Mission Analysis
      await this.missionAnalysis();

      this.missionResults.endTime = Date.now();
      await this.generateMissionReport();

    } catch (error) {
      console.error('❌ Mission failed:', error);
      this.missionResults.endTime = Date.now();
      await this.generateFailureReport(error);
    }
  }

  /**
   * 🔍 DEVICE RECONNAISSANCE
   */
  async deviceReconnaissance() {
    console.log('🔍 PHASE 1: DEVICE RECONNAISSANCE');
    console.log('==================================');

    for (const [deviceName, profile] of Object.entries(DEVICE_PROFILES)) {
      console.log(`📱 Analyzing ${deviceName}...`);
      
      try {
        const { browser, context, page } = await this.arsenal.launchMultiBrowserAssault(profile);
        
        // Test basic connectivity
        await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
        
        // Test age verification capability
        const verificationTest = await this.arsenal.executeDeviceSpecificStrategy(page, profile);
        
        this.missionResults.deviceResults[deviceName] = {
          connectivity: 'success',
          ageVerification: verificationTest.success ? 'success' : 'failed',
          strategy: verificationTest.method || 'unknown',
          browser: profile.browser
        };
        
        console.log(`  ✅ ${deviceName}: ${verificationTest.success ? 'READY' : 'NEEDS ATTENTION'}`);
        
        await browser.close();
        
      } catch (error) {
        console.log(`  ❌ ${deviceName}: FAILED - ${error.message}`);
        this.missionResults.deviceResults[deviceName] = {
          connectivity: 'failed',
          ageVerification: 'failed',
          error: error.message,
          browser: profile.browser
        };
      }
    }

    const readyDevices = Object.values(this.missionResults.deviceResults)
      .filter(result => result.connectivity === 'success').length;
    
    console.log(`\n📊 Reconnaissance Summary: ${readyDevices}/${Object.keys(DEVICE_PROFILES).length} devices ready\n`);
  }

  /**
   * ⚔️ MULTI-DEVICE ASSAULT
   */
  async multiDeviceAssault() {
    console.log('⚔️ PHASE 2: MULTI-DEVICE ASSAULT');
    console.log('=================================');

    const assaultPromises = [];

    // Launch parallel assaults on all devices
    for (const [deviceName, profile] of Object.entries(DEVICE_PROFILES)) {
      if (this.missionResults.deviceResults[deviceName]?.connectivity === 'success') {
        assaultPromises.push(this.executeDeviceAssault(deviceName, profile));
      } else {
        console.log(`⚠️ Skipping ${deviceName} - failed reconnaissance`);
      }
    }

    // Wait for all assaults to complete
    const assaultResults = await Promise.allSettled(assaultPromises);
    
    // Process results
    assaultResults.forEach((result, index) => {
      const deviceName = Object.keys(DEVICE_PROFILES)[index];
      if (result.status === 'fulfilled') {
        console.log(`✅ ${deviceName} assault completed`);
      } else {
        console.log(`❌ ${deviceName} assault failed: ${result.reason}`);
      }
    });

    console.log('\n⚔️ Multi-device assault phase completed\n');
  }

  /**
   * 📱 EXECUTE DEVICE ASSAULT
   */
  async executeDeviceAssault(deviceName, profile) {
    console.log(`📱 ${deviceName.toUpperCase()} ASSAULT COMMENCING`);
    
    const { browser, context, page } = await this.arsenal.launchMultiBrowserAssault(profile);
    
    try {
      for (const pageConfig of PAGES_TO_CAPTURE) {
        console.log(`  🎯 Capturing ${pageConfig.name} on ${deviceName}...`);
        
        this.missionResults.totalAttempts++;
        
        try {
          // Navigate to page
          const url = `${BASE_URL}${pageConfig.url}`;
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          
          // Execute age verification with retry
          const verificationResult = await this.arsenal.retryWithBackoff(
            () => this.arsenal.executeDeviceSpecificStrategy(page, profile)
          );
          
          if (!verificationResult.success) {
            throw new Error(`Age verification failed: ${verificationResult.reason}`);
          }
          
          // Wait for content to load after verification
          await this.waitForContentReady(page);
          
          // Capture screenshot
          const screenshotPath = await this.captureValidatedScreenshot(
            page, deviceName, pageConfig, verificationResult.method
          );
          
          // Validate screenshot quality
          const validation = await this.validateScreenshotQuality(screenshotPath);
          
          if (validation.isValid) {
            this.missionResults.successfulCaptures++;
            console.log(`    ✅ ${pageConfig.name} captured successfully`);
            
            // Track successful strategy
            const strategyKey = `${deviceName}-${verificationResult.method}`;
            this.missionResults.strategies[strategyKey] = 
              (this.missionResults.strategies[strategyKey] || 0) + 1;
              
          } else {
            throw new Error(`Screenshot validation failed: ${validation.reason}`);
          }
          
        } catch (error) {
          this.missionResults.failedCaptures++;
          console.log(`    ❌ ${pageConfig.name} failed: ${error.message}`);
          
          // Record failure details
          const pageKey = `${deviceName}-${pageConfig.name}`;
          this.missionResults.pageResults[pageKey] = {
            status: 'failed',
            error: error.message,
            timestamp: new Date().toISOString()
          };
        }
      }
      
    } finally {
      await browser.close();
    }
  }

  /**
   * ⏰ WAIT FOR CONTENT READY
   */
  async waitForContentReady(page, maxWait = 10000) {
    console.log('    ⏰ Waiting for content to be ready...');
    
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWait) {
      try {
        const isReady = await page.evaluate(() => {
          // Check for content indicators
          const contentIndicators = [
            'cannabis delivery',
            'kravings',
            'menu',
            'about',
            'contact'
          ];
          
          const bodyText = document.body.textContent?.toLowerCase() || '';
          const hasContent = contentIndicators.some(indicator => bodyText.includes(indicator));
          
          // Check for no popup overlay
          const hasPopup = document.querySelector('.pum-overlay.pum-active') !== null;
          
          // Check for loaded images
          const images = Array.from(document.querySelectorAll('img'));
          const imagesLoaded = images.length === 0 || images.every(img => img.complete);
          
          return hasContent && !hasPopup && imagesLoaded;
        });
        
        if (isReady) {
          console.log(`    ✅ Content ready after ${Date.now() - startTime}ms`);
          return true;
        }
        
        await page.waitForTimeout(500);
        
      } catch (error) {
        console.log(`    ⚠️ Content check error: ${error.message}`);
      }
    }
    
    console.log(`    ⚠️ Content ready timeout after ${maxWait}ms`);
    return false;
  }

  /**
   * 📸 CAPTURE VALIDATED SCREENSHOT
   */
  async captureValidatedScreenshot(page, deviceName, pageConfig, strategy) {
    const filename = `${pageConfig.name}-${deviceName}-${strategy}-${TIMESTAMP}.png`;
    const folderPath = path.join(SCREENSHOT_DIR, pageConfig.folder, deviceName);
    const screenshotPath = path.join(folderPath, filename);
    
    // Ensure directory exists
    await fs.mkdir(folderPath, { recursive: true });
    
    // Capture screenshot
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: 'png'
    });
    
    console.log(`    📸 Screenshot saved: ${filename}`);
    return screenshotPath;
  }

  /**
   * 🔍 VALIDATE SCREENSHOT QUALITY
   */
  async validateScreenshotQuality(screenshotPath) {
    try {
      // Read screenshot
      const screenshotBuffer = await fs.readFile(screenshotPath);
      
      // Use Enhanced Arsenal validation (includes Google Vision)
      const validation = await this.arsenal.validateScreenshotWithVision(screenshotBuffer);
      
      // Additional local validation
      const stats = await fs.stat(screenshotPath);
      const fileSizeKB = Math.round(stats.size / 1024);
      
      // Check file size (too small might indicate error)
      if (fileSizeKB < 10) {
        return {
          isValid: false,
          reason: `Screenshot too small: ${fileSizeKB}KB`,
          validation
        };
      }
      
      // Check file size (too large might indicate popup)
      if (fileSizeKB > 2000) {
        return {
          isValid: false,
          reason: `Screenshot suspiciously large: ${fileSizeKB}KB`,
          validation
        };
      }
      
      return {
        isValid: validation.isValid,
        reason: validation.reason,
        fileSizeKB,
        confidence: validation.confidence || 0.5,
        detectedText: validation.detectedText
      };
      
    } catch (error) {
      return {
        isValid: false,
        reason: `Validation error: ${error.message}`
      };
    }
  }

  /**
   * 🔍 QUALITY VALIDATION
   */
  async qualityValidation() {
    console.log('🔍 PHASE 3: QUALITY VALIDATION');
    console.log('===============================');

    // Find all captured screenshots
    const screenshots = await this.findAllScreenshots();
    
    console.log(`📸 Found ${screenshots.length} screenshots to validate`);
    
    let validScreenshots = 0;
    let invalidScreenshots = 0;
    
    for (const screenshot of screenshots) {
      try {
        const validation = await this.validateScreenshotQuality(screenshot);
        
        if (validation.isValid) {
          validScreenshots++;
          console.log(`  ✅ ${path.basename(screenshot)}: Valid (${validation.confidence})`);
        } else {
          invalidScreenshots++;
          console.log(`  ❌ ${path.basename(screenshot)}: Invalid - ${validation.reason}`);
          
          // Move invalid screenshots to quarantine
          await this.quarantineScreenshot(screenshot, validation.reason);
        }
        
      } catch (error) {
        invalidScreenshots++;
        console.log(`  ❌ ${path.basename(screenshot)}: Validation error - ${error.message}`);
      }
    }
    
    console.log(`\n📊 Quality Validation Summary:`);
    console.log(`  ✅ Valid: ${validScreenshots}`);
    console.log(`  ❌ Invalid: ${invalidScreenshots}`);
    console.log(`  📈 Quality Rate: ${((validScreenshots / screenshots.length) * 100).toFixed(1)}%\n`);
  }

  /**
   * 🔍 FIND ALL SCREENSHOTS
   */
  async findAllScreenshots() {
    const screenshots = [];
    
    try {
      const folders = await fs.readdir(SCREENSHOT_DIR);
      
      for (const folder of folders) {
        const folderPath = path.join(SCREENSHOT_DIR, folder);
        const stats = await fs.stat(folderPath);
        
        if (stats.isDirectory()) {
          const subfolders = await fs.readdir(folderPath);
          
          for (const subfolder of subfolders) {
            const subfolderPath = path.join(folderPath, subfolder);
            const substats = await fs.stat(subfolderPath);
            
            if (substats.isDirectory()) {
              const files = await fs.readdir(subfolderPath);
              
              for (const file of files) {
                if (file.endsWith('.png') && file.includes(TIMESTAMP)) {
                  screenshots.push(path.join(subfolderPath, file));
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(`⚠️ Error finding screenshots: ${error.message}`);
    }
    
    return screenshots;
  }

  /**
   * 🚨 QUARANTINE SCREENSHOT
   */
  async quarantineScreenshot(screenshotPath, reason) {
    try {
      const quarantineDir = path.join(SCREENSHOT_DIR, 'quarantine', TIMESTAMP);
      await fs.mkdir(quarantineDir, { recursive: true });
      
      const filename = path.basename(screenshotPath);
      const quarantinePath = path.join(quarantineDir, `INVALID-${filename}`);
      
      await fs.rename(screenshotPath, quarantinePath);
      
      // Create reason file
      const reasonFile = path.join(quarantineDir, `${filename}.reason.txt`);
      await fs.writeFile(reasonFile, `Invalid reason: ${reason}\nTimestamp: ${new Date().toISOString()}`);
      
      console.log(`    🚨 Quarantined: ${filename}`);
      
    } catch (error) {
      console.log(`    ⚠️ Quarantine failed: ${error.message}`);
    }
  }

  /**
   * 📊 MISSION ANALYSIS
   */
  async missionAnalysis() {
    console.log('📊 PHASE 4: MISSION ANALYSIS');
    console.log('=============================');

    const totalAttempts = this.missionResults.totalAttempts;
    const successRate = ((this.missionResults.successfulCaptures / totalAttempts) * 100);
    
    console.log(`📈 Overall Success Rate: ${successRate.toFixed(1)}%`);
    console.log(`✅ Successful Captures: ${this.missionResults.successfulCaptures}`);
    console.log(`❌ Failed Captures: ${this.missionResults.failedCaptures}`);
    console.log(`🎯 Target: 95%+`);
    
    if (successRate >= 95) {
      console.log(`🎖️ MISSION SUCCESS: Target achieved!`);
    } else {
      console.log(`⚠️ MISSION INCOMPLETE: ${(95 - successRate).toFixed(1)}% improvement needed`);
    }
    
    // Analyze successful strategies
    console.log(`\n🧠 Most Successful Strategies:`);
    const sortedStrategies = Object.entries(this.missionResults.strategies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
      
    sortedStrategies.forEach(([strategy, count]) => {
      console.log(`  🏆 ${strategy}: ${count} successes`);
    });
    
    // Analyze device performance
    console.log(`\n📱 Device Performance:`);
    Object.entries(this.missionResults.deviceResults).forEach(([device, result]) => {
      const status = result.ageVerification === 'success' ? '✅' : '❌';
      console.log(`  ${status} ${device}: ${result.ageVerification} (${result.browser})`);
    });
  }

  /**
   * 📄 GENERATE MISSION REPORT
   */
  async generateMissionReport() {
    const duration = this.missionResults.endTime - this.missionResults.startTime;
    const durationMinutes = Math.round(duration / 60000);
    const successRate = ((this.missionResults.successfulCaptures / this.missionResults.totalAttempts) * 100);
    
    const report = `
# 🎖️ KRAVINGS.CLUB DOMINATION MISSION REPORT
## Date: ${new Date().toISOString()}
## Duration: ${durationMinutes} minutes

## 🎯 MISSION RESULTS
- **Overall Success Rate**: ${successRate.toFixed(1)}%
- **Target Achievement**: ${successRate >= 95 ? '✅ SUCCESS' : '❌ INCOMPLETE'}
- **Successful Captures**: ${this.missionResults.successfulCaptures}
- **Failed Captures**: ${this.missionResults.failedCaptures}
- **Total Attempts**: ${this.missionResults.totalAttempts}

## 📱 DEVICE PERFORMANCE
${Object.entries(this.missionResults.deviceResults).map(([device, result]) => 
  `- **${device}**: ${result.ageVerification} (${result.browser}) - ${result.strategy || 'N/A'}`
).join('\n')}

## 🧠 SUCCESSFUL STRATEGIES
${Object.entries(this.missionResults.strategies)
  .sort(([,a], [,b]) => b - a)
  .map(([strategy, count]) => `- **${strategy}**: ${count} successes`)
  .join('\n')}

## 📊 PAGE RESULTS
${PAGES_TO_CAPTURE.map(page => {
  const deviceResults = Object.keys(DEVICE_PROFILES).map(device => {
    const key = `${device}-${page.name}`;
    const result = this.missionResults.pageResults[key];
    return result?.status === 'failed' ? '❌' : '✅';
  });
  return `- **${page.name}**: ${deviceResults.join(' ')} (${page.priority})`;
}).join('\n')}

## 🎖️ MISSION STATUS
${successRate >= 95 ? 
  '**🏆 MISSION ACCOMPLISHED** - Target success rate achieved!' :
  `**⚠️ MISSION INCOMPLETE** - Need ${(95 - successRate).toFixed(1)}% improvement`}

## 📈 RECOMMENDATIONS
${this.generateRecommendations(successRate)}

---
*Generated by Domination Mission Commander on ${new Date().toISOString()}*
*Mission Duration: ${durationMinutes} minutes*
`;

    const reportPath = path.join(INTELLIGENCE_DIR, `DOMINATION_MISSION_REPORT_${TIMESTAMP}.md`);
    await fs.mkdir(INTELLIGENCE_DIR, { recursive: true });
    await fs.writeFile(reportPath, report);
    
    console.log(`\n📄 Mission report generated: ${reportPath}`);
    
    return reportPath;
  }

  /**
   * 📈 GENERATE RECOMMENDATIONS
   */
  generateRecommendations(successRate) {
    const recommendations = [];
    
    if (successRate < 95) {
      recommendations.push('🎯 **IMPROVE**: Focus on failed device/page combinations');
      
      // Device-specific recommendations
      const failedDevices = Object.entries(this.missionResults.deviceResults)
        .filter(([, result]) => result.ageVerification === 'failed')
        .map(([device]) => device);
        
      if (failedDevices.length > 0) {
        recommendations.push(`🔧 **FIX DEVICES**: ${failedDevices.join(', ')}`);
      }
    }
    
    if (successRate >= 95) {
      recommendations.push('✅ **MAINTAIN**: Current strategies are effective');
      recommendations.push('📊 **MONITOR**: Continue tracking performance metrics');
    }
    
    if (successRate >= 98) {
      recommendations.push('🚀 **OPTIMIZE**: Consider expanding to additional pages or devices');
    }
    
    // Strategy recommendations
    const topStrategy = Object.entries(this.missionResults.strategies)
      .sort(([,a], [,b]) => b - a)[0];
      
    if (topStrategy) {
      recommendations.push(`🏆 **PRIORITIZE**: ${topStrategy[0]} strategy is most effective`);
    }
    
    return recommendations.join('\n');
  }

  /**
   * ❌ GENERATE FAILURE REPORT
   */
  async generateFailureReport(error) {
    const failureReport = `
# ❌ DOMINATION MISSION FAILURE REPORT
## Date: ${new Date().toISOString()}

## 🚨 MISSION FAILURE
**Error**: ${error.message}
**Stack**: ${error.stack}

## 📊 PARTIAL RESULTS
- **Successful Captures**: ${this.missionResults.successfulCaptures}
- **Failed Captures**: ${this.missionResults.failedCaptures}
- **Total Attempts**: ${this.missionResults.totalAttempts}

## 🔧 IMMEDIATE ACTIONS REQUIRED
1. **Debug Error**: Investigate root cause of failure
2. **System Check**: Verify all MCPs and dependencies
3. **Retry Mission**: After addressing identified issues

---
*Generated by Domination Mission Commander on ${new Date().toISOString()}*
`;

    const reportPath = path.join(INTELLIGENCE_DIR, `DOMINATION_MISSION_FAILURE_${TIMESTAMP}.md`);
    await fs.mkdir(INTELLIGENCE_DIR, { recursive: true });
    await fs.writeFile(reportPath, failureReport);
    
    console.log(`\n❌ Failure report generated: ${reportPath}`);
  }
}

/**
 * 🎯 MAIN MISSION EXECUTION
 */
async function main() {
  const commander = new DominationMissionCommander();
  await commander.executeFullDominationMission();
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = DominationMissionCommander;