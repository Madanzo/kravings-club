#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - QUALITY ASSURANCE UNIT
 * 
 * This unit double-checks all Army work and looks for edge cases
 * in the age verification automation and screenshot capture system.
 * 
 * MISSION: Ensure 100% reliability of cannabis site automation
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const BASE_URL = 'https://kravings.club';
const SCREENSHOT_DIR = '/workspaces/madanzo/army-command/command-center/assets/kravings-club-screenshots';
const QA_REPORT_DIR = '/workspaces/madanzo/army-command/command-center/intelligence-reports';
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

// Test scenarios
const TEST_SCENARIOS = [
  {
    name: 'Standard Desktop',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'Standard desktop browser simulation'
  },
  {
    name: 'Mobile Safari',
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    description: 'iPhone Safari simulation'
  },
  {
    name: 'Android Chrome',
    viewport: { width: 360, height: 640 },
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36',
    description: 'Android Chrome simulation'
  },
  {
    name: 'Tablet iPad',
    viewport: { width: 1024, height: 768 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    description: 'iPad Safari simulation'
  },
  {
    name: 'Slow Network',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    description: 'Slow 3G network simulation',
    networkThrottling: true
  }
];

// Pages to test
const TEST_PAGES = [
  { url: '/', name: 'homepage', critical: true },
  { url: '/menu/', name: 'menu', critical: true },
  { url: '/about-us/', name: 'about', critical: false },
  { url: '/contactus/', name: 'contact', critical: false },
  { url: '/faq/', name: 'faq', critical: false },
  { url: '/privacy-policy/', name: 'privacy', critical: false }
];

/**
 * 🔍 QA INSPECTION RESULTS
 */
class QAInspector {
  constructor() {
    this.results = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      edgeCases: [],
      criticalIssues: [],
      warnings: [],
      screenshots: [],
      performanceMetrics: []
    };
  }

  addResult(test, passed, details) {
    this.results.totalTests++;
    if (passed) {
      this.results.passedTests++;
    } else {
      this.results.failedTests++;
      if (test.critical) {
        this.results.criticalIssues.push({ test: test.name, details });
      }
    }
  }

  addEdgeCase(scenario, issue) {
    this.results.edgeCases.push({ scenario, issue, timestamp: new Date().toISOString() });
  }

  addWarning(message) {
    this.results.warnings.push({ message, timestamp: new Date().toISOString() });
  }

  addScreenshot(info) {
    this.results.screenshots.push(info);
  }

  addPerformanceMetric(metric) {
    this.results.performanceMetrics.push(metric);
  }

  generateReport() {
    const report = `
# 🎖️ ARMY QA UNIT - INSPECTION REPORT
## Date: ${new Date().toISOString()}

## 📊 OVERALL RESULTS
- **Total Tests**: ${this.results.totalTests}
- **Passed**: ${this.results.passedTests}
- **Failed**: ${this.results.failedTests}
- **Success Rate**: ${((this.results.passedTests / this.results.totalTests) * 100).toFixed(1)}%

## 🚨 CRITICAL ISSUES
${this.results.criticalIssues.length === 0 ? '✅ No critical issues found' : 
  this.results.criticalIssues.map(issue => `- **${issue.test}**: ${issue.details}`).join('\n')}

## ⚠️ EDGE CASES DISCOVERED
${this.results.edgeCases.length === 0 ? '✅ No edge cases found' : 
  this.results.edgeCases.map(edge => `- **${edge.scenario}**: ${edge.issue}`).join('\n')}

## 🔔 WARNINGS
${this.results.warnings.length === 0 ? '✅ No warnings' : 
  this.results.warnings.map(warn => `- ${warn.message}`).join('\n')}

## 📸 SCREENSHOT ANALYSIS
- **Total Screenshots**: ${this.results.screenshots.length}
- **Successful Captures**: ${this.results.screenshots.filter(s => s.success).length}
- **Failed Captures**: ${this.results.screenshots.filter(s => !s.success).length}

## ⚡ PERFORMANCE METRICS
${this.results.performanceMetrics.map(metric => 
  `- **${metric.scenario}**: ${metric.metric} = ${metric.value}${metric.unit || ''}`
).join('\n')}

## 🎯 RECOMMENDATIONS
${this.generateRecommendations()}
`;
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.criticalIssues.length > 0) {
      recommendations.push('🚨 **URGENT**: Address critical issues before deployment');
    }
    
    if (this.results.edgeCases.length > 0) {
      recommendations.push('🔍 **INVESTIGATE**: Review edge cases for potential improvements');
    }
    
    const avgPerformance = this.results.performanceMetrics
      .filter(m => m.metric === 'loadTime')
      .reduce((acc, m) => acc + m.value, 0) / this.results.performanceMetrics.length;
      
    if (avgPerformance > 10000) {
      recommendations.push('⚡ **OPTIMIZE**: Consider performance improvements for slow connections');
    }
    
    const successRate = (this.results.passedTests / this.results.totalTests) * 100;
    if (successRate < 95) {
      recommendations.push('🎯 **IMPROVE**: Success rate below 95% - investigate failures');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ **EXCELLENT**: All systems performing within acceptable parameters');
    }
    
    return recommendations.join('\n');
  }
}

/**
 * 🔑 ENHANCED AGE VERIFICATION TEST
 */
async function testAgeVerification(page, scenario) {
  console.log(`    🔍 Testing age verification for ${scenario.name}...`);
  
  const startTime = Date.now();
  
  try {
    // Wait for popup to appear
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if popup is present
    const popupPresent = await page.evaluate(() => {
      const popup = document.querySelector('.pum-overlay.pum-active');
      return popup !== null;
    });
    
    if (!popupPresent) {
      return { success: false, reason: 'Age verification popup not found', loadTime: Date.now() - startTime };
    }
    
    // Try multiple click strategies
    const clickStrategies = [
      // Strategy 1: Direct pum-close with text match
      () => {
        const pumCloseElements = document.querySelectorAll('.pum-close');
        for (const element of pumCloseElements) {
          if (element.textContent.trim() === "Yes, I'm 21+") {
            element.click();
            return 'pum-close-direct';
          }
        }
        return false;
      },
      
      // Strategy 2: Any element with exact text
      () => {
        const allElements = document.querySelectorAll('*');
        for (const element of allElements) {
          if (element.textContent.trim() === "Yes, I'm 21+") {
            element.click();
            return 'text-match';
          }
        }
        return false;
      },
      
      // Strategy 3: Button with text containing "21+"
      () => {
        const buttons = document.querySelectorAll('button, span[role="button"], .pum-close');
        for (const button of buttons) {
          if (button.textContent.includes("21+")) {
            button.click();
            return 'text-contains';
          }
        }
        return false;
      }
    ];
    
    let clickResult = false;
    let usedStrategy = 'none';
    
    for (const strategy of clickStrategies) {
      const result = await page.evaluate(strategy);
      if (result) {
        clickResult = true;
        usedStrategy = result;
        break;
      }
    }
    
    if (!clickResult) {
      return { success: false, reason: 'Could not click age verification button', loadTime: Date.now() - startTime };
    }
    
    // Wait for popup to disappear
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verify popup is gone
    const popupGone = await page.evaluate(() => {
      const popup = document.querySelector('.pum-overlay.pum-active');
      return popup === null;
    });
    
    // Check if actual content is visible
    const contentVisible = await page.evaluate(() => {
      const content = document.querySelector('body');
      const hasContent = content && content.textContent.includes('CANNABIS DELIVERY');
      return hasContent;
    });
    
    const loadTime = Date.now() - startTime;
    
    return {
      success: popupGone && contentVisible,
      reason: popupGone ? (contentVisible ? 'Success' : 'Popup closed but content not loaded') : 'Popup still present',
      loadTime,
      strategy: usedStrategy,
      popupGone,
      contentVisible
    };
    
  } catch (error) {
    return { success: false, reason: `Error: ${error.message}`, loadTime: Date.now() - startTime };
  }
}

/**
 * 📸 SCREENSHOT VALIDATION
 */
async function validateScreenshot(page, scenario, pageName) {
  console.log(`    📸 Validating screenshot for ${scenario.name} - ${pageName}...`);
  
  try {
    // Take screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, 'qa-validation', `${scenario.name.replace(/\s+/g, '-')}-${pageName}-${TIMESTAMP}.png`);
    
    await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Validate screenshot content
    const validation = await page.evaluate(() => {
      const body = document.body;
      const hasAgeVerificationPopup = document.querySelector('.pum-overlay.pum-active') !== null;
      const hasMainContent = body.textContent.includes('CANNABIS DELIVERY') || body.textContent.includes('Kravings');
      const hasNavigation = document.querySelector('nav') !== null || body.textContent.includes('STORE');
      const hasFooter = document.querySelector('footer') !== null || body.textContent.includes('Contact');
      
      return {
        hasAgeVerificationPopup,
        hasMainContent,
        hasNavigation,
        hasFooter,
        bodyTextLength: body.textContent.length,
        imageCount: document.querySelectorAll('img').length,
        buttonCount: document.querySelectorAll('button').length
      };
    });
    
    const issues = [];
    if (validation.hasAgeVerificationPopup) {
      issues.push('Age verification popup still visible');
    }
    if (!validation.hasMainContent) {
      issues.push('Main content not loaded');
    }
    if (validation.bodyTextLength < 100) {
      issues.push('Very little text content');
    }
    if (validation.imageCount === 0) {
      issues.push('No images found');
    }
    
    return {
      success: issues.length === 0,
      path: screenshotPath,
      issues,
      validation
    };
    
  } catch (error) {
    return {
      success: false,
      path: null,
      issues: [`Screenshot error: ${error.message}`],
      validation: null
    };
  }
}

/**
 * 🌐 NETWORK CONDITION TESTING
 */
async function testNetworkConditions(page) {
  console.log('    🌐 Testing network conditions...');
  
  try {
    // Simulate slow 3G
    await page.emulate({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    const client = await page.target().createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
      uploadThroughput: 750 * 1024 / 8, // 750 Kbps
      latency: 300 // 300ms latency
    });
    
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    const loadTime = Date.now() - startTime;
    
    // Test age verification under slow conditions
    const ageVerificationResult = await testAgeVerification(page, { name: 'Slow Network' });
    
    return {
      success: ageVerificationResult.success,
      loadTime,
      ageVerificationTime: ageVerificationResult.loadTime,
      issues: ageVerificationResult.success ? [] : [ageVerificationResult.reason]
    };
    
  } catch (error) {
    return {
      success: false,
      loadTime: 0,
      ageVerificationTime: 0,
      issues: [`Network test error: ${error.message}`]
    };
  }
}

/**
 * 🎯 MAIN QA MISSION
 */
async function runQAMission() {
  console.log('🎖️ ARMY QA UNIT - MISSION START');
  console.log('=====================================');
  console.log(`📅 Mission Date: ${TIMESTAMP}`);
  console.log(`🎯 Target: ${BASE_URL}`);
  console.log(`📁 QA Report Directory: ${QA_REPORT_DIR}`);
  console.log('🔍 Edge Case Detection: ENABLED\n');
  
  const qa = new QAInspector();
  let browser;
  
  try {
    console.log('🚀 Launching QA Browser...');
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
    
    console.log('✅ QA Browser launched successfully\n');
    
    // Test each scenario
    for (const scenario of TEST_SCENARIOS) {
      console.log(`🧪 TESTING SCENARIO: ${scenario.name}`);
      console.log(`   📋 ${scenario.description}`);
      
      const page = await browser.newPage();
      
      try {
        await page.setViewport(scenario.viewport);
        await page.setUserAgent(scenario.userAgent);
        
        // Special handling for network throttling
        if (scenario.networkThrottling) {
          const networkResult = await testNetworkConditions(page);
          qa.addResult(
            { name: `${scenario.name}-Network`, critical: false },
            networkResult.success,
            networkResult.issues.join(', ')
          );
          qa.addPerformanceMetric({
            scenario: scenario.name,
            metric: 'loadTime',
            value: networkResult.loadTime,
            unit: 'ms'
          });
          
          if (networkResult.loadTime > 30000) {
            qa.addEdgeCase(scenario.name, 'Very slow load time under throttled conditions');
          }
        } else {
          // Standard testing
          console.log(`    🔗 Loading ${BASE_URL}...`);
          const startTime = Date.now();
          
          await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
          const loadTime = Date.now() - startTime;
          
          qa.addPerformanceMetric({
            scenario: scenario.name,
            metric: 'loadTime',
            value: loadTime,
            unit: 'ms'
          });
          
          // Test age verification
          const ageVerificationResult = await testAgeVerification(page, scenario);
          qa.addResult(
            { name: `${scenario.name}-AgeVerification`, critical: true },
            ageVerificationResult.success,
            ageVerificationResult.reason
          );
          
          if (ageVerificationResult.strategy === 'text-contains') {
            qa.addEdgeCase(scenario.name, 'Had to use fallback text-contains strategy');
          }
          
          // Test screenshot validation for critical pages
          for (const testPage of TEST_PAGES.filter(p => p.critical)) {
            if (testPage.url !== '/') {
              await page.goto(`${BASE_URL}${testPage.url}`, { waitUntil: 'networkidle2', timeout: 30000 });
              const pageAgeVerification = await testAgeVerification(page, scenario);
              
              if (!pageAgeVerification.success && testPage.url === '/') {
                qa.addResult(
                  { name: `${scenario.name}-${testPage.name}`, critical: true },
                  false,
                  `Age verification failed on ${testPage.name}`
                );
              }
            }
            
            const screenshotResult = await validateScreenshot(page, scenario, testPage.name);
            qa.addResult(
              { name: `${scenario.name}-${testPage.name}-Screenshot`, critical: testPage.critical },
              screenshotResult.success,
              screenshotResult.issues.join(', ')
            );
            
            qa.addScreenshot({
              scenario: scenario.name,
              page: testPage.name,
              success: screenshotResult.success,
              path: screenshotResult.path,
              issues: screenshotResult.issues
            });
          }
        }
        
        console.log(`    ✅ ${scenario.name} testing complete`);
        
      } catch (error) {
        console.error(`    ❌ ${scenario.name} testing failed:`, error.message);
        qa.addResult(
          { name: `${scenario.name}-General`, critical: true },
          false,
          `Scenario failed: ${error.message}`
        );
        
        if (error.message.includes('timeout')) {
          qa.addEdgeCase(scenario.name, 'Timeout occurred - may indicate slow loading');
        }
      }
      
      await page.close();
      console.log('');
    }
    
    // Generate and save report
    const report = qa.generateReport();
    const reportPath = path.join(QA_REPORT_DIR, `QA_UNIT_REPORT_${TIMESTAMP}.md`);
    
    await fs.mkdir(QA_REPORT_DIR, { recursive: true });
    await fs.writeFile(reportPath, report);
    
    console.log('🎯 QA MISSION COMPLETE');
    console.log('======================');
    console.log(`📊 Tests Run: ${qa.results.totalTests}`);
    console.log(`✅ Passed: ${qa.results.passedTests}`);
    console.log(`❌ Failed: ${qa.results.failedTests}`);
    console.log(`🔍 Edge Cases: ${qa.results.edgeCases.length}`);
    console.log(`📸 Screenshots: ${qa.results.screenshots.length}`);
    console.log(`📄 Report: ${reportPath}`);
    
    if (qa.results.criticalIssues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES FOUND:');
      qa.results.criticalIssues.forEach(issue => {
        console.log(`   - ${issue.test}: ${issue.details}`);
      });
    }
    
    if (qa.results.edgeCases.length > 0) {
      console.log('\n⚠️ EDGE CASES DISCOVERED:');
      qa.results.edgeCases.forEach(edge => {
        console.log(`   - ${edge.scenario}: ${edge.issue}`);
      });
    }
    
  } catch (error) {
    console.error('❌ QA Mission failed:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Execute QA mission
runQAMission().catch(console.error);