#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - MASTER COMMANDER
 * 
 * This script orchestrates the entire Army operation:
 * 1. Runs QA Unit for comprehensive testing
 * 2. Runs Resonance Unit for analysis, fixes, and cleanup
 * 3. Provides overall mission status and recommendations
 * 
 * MISSION: Complete end-to-end quality assurance and optimization
 */

const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SCRIPTS_DIR = '/workspaces/madanzo/army-command/command-center/scripts';
const INTELLIGENCE_REPORTS = '/workspaces/madanzo/army-command/command-center/intelligence-reports';
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

/**
 * 🎖️ ARMY COMMANDER
 */
class ArmyCommander {
  constructor() {
    this.missionStatus = {
      qaUnitStatus: 'pending',
      resonanceUnitStatus: 'pending',
      overallStatus: 'pending',
      startTime: Date.now(),
      endTime: null,
      errors: [],
      recommendations: []
    };
  }

  /**
   * 🚀 EXECUTE FULL ARMY OPERATION
   */
  async executeFullOperation() {
    console.log('🎖️ ARMY COMMAND CENTER - MASTER COMMANDER');
    console.log('==========================================');
    console.log(`📅 Operation Date: ${TIMESTAMP}`);
    console.log(`🎯 Mission: Complete QA and Resonance Analysis`);
    console.log(`📁 Intelligence Reports: ${INTELLIGENCE_REPORTS}`);
    console.log('\n🔄 OPERATION PHASES:');
    console.log('  Phase 1: QA Unit - Comprehensive Testing');
    console.log('  Phase 2: Resonance Unit - Analysis & Optimization');
    console.log('  Phase 3: Mission Summary & Recommendations\n');
    
    try {
      // Phase 1: Run QA Unit
      await this.runQAUnit();
      
      // Phase 2: Run Resonance Unit
      await this.runResonanceUnit();
      
      // Phase 3: Generate mission summary
      await this.generateMissionSummary();
      
      this.missionStatus.overallStatus = 'success';
      
    } catch (error) {
      console.error('❌ Operation failed:', error.message);
      this.missionStatus.errors.push(error.message);
      this.missionStatus.overallStatus = 'failed';
    } finally {
      this.missionStatus.endTime = Date.now();
      await this.displayFinalStatus();
    }
  }

  /**
   * 🧪 RUN QA UNIT
   */
  async runQAUnit() {
    console.log('🧪 PHASE 1: QA UNIT EXECUTION');
    console.log('===============================');
    
    try {
      const qaScriptPath = path.join(SCRIPTS_DIR, 'army-qa-unit.js');
      
      // Check if QA script exists
      await fs.access(qaScriptPath);
      
      console.log('🚀 Launching QA Unit...');
      
      // Execute QA unit with timeout
      const qaResult = execSync(`node "${qaScriptPath}"`, {
        cwd: SCRIPTS_DIR,
        timeout: 600000, // 10 minutes
        stdio: 'pipe'
      });
      
      console.log(qaResult.toString());
      this.missionStatus.qaUnitStatus = 'success';
      
      console.log('✅ QA Unit completed successfully\n');
      
    } catch (error) {
      console.error('❌ QA Unit failed:', error.message);
      this.missionStatus.qaUnitStatus = 'failed';
      this.missionStatus.errors.push(`QA Unit: ${error.message}`);
      
      // Continue with resonance unit even if QA fails
      console.log('⚠️ Continuing with Resonance Unit despite QA failure...\n');
    }
  }

  /**
   * 🔄 RUN RESONANCE UNIT
   */
  async runResonanceUnit() {
    console.log('🔄 PHASE 2: RESONANCE UNIT EXECUTION');
    console.log('=====================================');
    
    try {
      const resonanceScriptPath = path.join(SCRIPTS_DIR, 'army-resonance-unit.js');
      
      // Check if Resonance script exists
      await fs.access(resonanceScriptPath);
      
      console.log('🚀 Launching Resonance Unit...');
      
      // Execute Resonance unit with timeout
      const resonanceResult = execSync(`node "${resonanceScriptPath}"`, {
        cwd: SCRIPTS_DIR,
        timeout: 300000, // 5 minutes
        stdio: 'pipe'
      });
      
      console.log(resonanceResult.toString());
      this.missionStatus.resonanceUnitStatus = 'success';
      
      console.log('✅ Resonance Unit completed successfully\n');
      
    } catch (error) {
      console.error('❌ Resonance Unit failed:', error.message);
      this.missionStatus.resonanceUnitStatus = 'failed';
      this.missionStatus.errors.push(`Resonance Unit: ${error.message}`);
    }
  }

  /**
   * 📊 GENERATE MISSION SUMMARY
   */
  async generateMissionSummary() {
    console.log('📊 PHASE 3: MISSION SUMMARY GENERATION');
    console.log('=======================================');
    
    try {
      // Read QA report if available
      const qaReport = await this.readLatestReport('QA_UNIT_REPORT_');
      
      // Read Resonance report if available
      const resonanceReport = await this.readLatestReport('RESONANCE_REPORT_');
      
      // Extract key metrics
      const metrics = await this.extractMetrics(qaReport, resonanceReport);
      
      // Generate recommendations
      this.generateRecommendations(metrics);
      
      // Create consolidated report
      const consolidatedReport = this.createConsolidatedReport(metrics, qaReport, resonanceReport);
      
      // Save consolidated report
      const reportPath = path.join(INTELLIGENCE_REPORTS, `ARMY_COMMANDER_REPORT_${TIMESTAMP}.md`);
      await fs.writeFile(reportPath, consolidatedReport);
      
      console.log(`✅ Mission summary generated: ${reportPath}\n`);
      
    } catch (error) {
      console.error('❌ Mission summary generation failed:', error.message);
      this.missionStatus.errors.push(`Summary generation: ${error.message}`);
    }
  }

  async readLatestReport(prefix) {
    try {
      const files = await fs.readdir(INTELLIGENCE_REPORTS);
      const reportFiles = files.filter(file => file.startsWith(prefix));
      
      if (reportFiles.length === 0) {
        return null;
      }
      
      // Get the most recent report
      const latestReport = reportFiles.sort().reverse()[0];
      const reportPath = path.join(INTELLIGENCE_REPORTS, latestReport);
      
      return await fs.readFile(reportPath, 'utf-8');
      
    } catch (error) {
      console.log(`⚠️ Could not read ${prefix} report: ${error.message}`);
      return null;
    }
  }

  async extractMetrics(qaReport, resonanceReport) {
    const metrics = {
      qa: {
        successRate: null,
        totalTests: null,
        passedTests: null,
        failedTests: null,
        criticalIssues: null,
        edgeCases: null
      },
      resonance: {
        fixesApplied: null,
        optimizationsApplied: null,
        cleanupActions: null,
        resourceUsage: null
      }
    };
    
    // Extract QA metrics
    if (qaReport) {
      const successRateMatch = qaReport.match(/Success Rate\*\*: ([\d.]+)%/);
      if (successRateMatch) {
        metrics.qa.successRate = parseFloat(successRateMatch[1]);
      }
      
      const totalTestsMatch = qaReport.match(/Total Tests\*\*: (\d+)/);
      if (totalTestsMatch) {
        metrics.qa.totalTests = parseInt(totalTestsMatch[1]);
      }
      
      const passedTestsMatch = qaReport.match(/Passed\*\*: (\d+)/);
      if (passedTestsMatch) {
        metrics.qa.passedTests = parseInt(passedTestsMatch[1]);
      }
      
      const failedTestsMatch = qaReport.match(/Failed\*\*: (\d+)/);
      if (failedTestsMatch) {
        metrics.qa.failedTests = parseInt(failedTestsMatch[1]);
      }
      
      metrics.qa.criticalIssues = !qaReport.includes('No critical issues found');
      metrics.qa.edgeCases = !qaReport.includes('No edge cases found');
    }
    
    // Extract Resonance metrics
    if (resonanceReport) {
      const fixesMatch = resonanceReport.match(/Fixes Applied: (\d+)/);
      if (fixesMatch) {
        metrics.resonance.fixesApplied = parseInt(fixesMatch[1]);
      }
      
      const optimizationsMatch = resonanceReport.match(/Optimizations Applied: (\d+)/);
      if (optimizationsMatch) {
        metrics.resonance.optimizationsApplied = parseInt(optimizationsMatch[1]);
      }
      
      const cleanupMatch = resonanceReport.match(/Cleanup Actions: (\d+)/);
      if (cleanupMatch) {
        metrics.resonance.cleanupActions = parseInt(cleanupMatch[1]);
      }
    }
    
    return metrics;
  }

  generateRecommendations(metrics) {
    // QA-based recommendations
    if (metrics.qa.successRate !== null && metrics.qa.successRate < 95) {
      this.missionStatus.recommendations.push({
        priority: 'high',
        category: 'quality',
        message: `Success rate is ${metrics.qa.successRate}% - investigate failed tests`
      });
    }
    
    if (metrics.qa.criticalIssues) {
      this.missionStatus.recommendations.push({
        priority: 'urgent',
        category: 'critical',
        message: 'Critical issues detected - immediate attention required'
      });
    }
    
    if (metrics.qa.edgeCases) {
      this.missionStatus.recommendations.push({
        priority: 'medium',
        category: 'improvement',
        message: 'Edge cases discovered - consider enhancing robustness'
      });
    }
    
    // Resonance-based recommendations
    if (metrics.resonance.fixesApplied > 0) {
      this.missionStatus.recommendations.push({
        priority: 'medium',
        category: 'maintenance',
        message: `${metrics.resonance.fixesApplied} fixes applied - monitor for stability`
      });
    }
    
    if (metrics.resonance.cleanupActions > 5) {
      this.missionStatus.recommendations.push({
        priority: 'low',
        category: 'optimization',
        message: 'High cleanup activity - consider improving cleanup automation'
      });
    }
    
    // Overall recommendations
    if (this.missionStatus.errors.length > 0) {
      this.missionStatus.recommendations.push({
        priority: 'high',
        category: 'reliability',
        message: 'Operation errors detected - review and fix underlying issues'
      });
    }
    
    if (this.missionStatus.recommendations.length === 0) {
      this.missionStatus.recommendations.push({
        priority: 'info',
        category: 'status',
        message: 'All systems operating optimally - continue current procedures'
      });
    }
  }

  createConsolidatedReport(metrics, qaReport, resonanceReport) {
    const duration = this.missionStatus.endTime - this.missionStatus.startTime;
    const durationMinutes = Math.round(duration / 60000);
    
    const report = `
# 🎖️ ARMY COMMANDER - CONSOLIDATED MISSION REPORT
## Date: ${new Date().toISOString()}
## Duration: ${durationMinutes} minutes

## 🎯 MISSION OVERVIEW
- **Overall Status**: ${this.missionStatus.overallStatus.toUpperCase()}
- **QA Unit Status**: ${this.missionStatus.qaUnitStatus.toUpperCase()}
- **Resonance Unit Status**: ${this.missionStatus.resonanceUnitStatus.toUpperCase()}
- **Total Errors**: ${this.missionStatus.errors.length}

## 📊 KEY METRICS

### QA Unit Results
- **Success Rate**: ${metrics.qa.successRate ? metrics.qa.successRate + '%' : 'N/A'}
- **Total Tests**: ${metrics.qa.totalTests || 'N/A'}
- **Passed Tests**: ${metrics.qa.passedTests || 'N/A'}
- **Failed Tests**: ${metrics.qa.failedTests || 'N/A'}
- **Critical Issues**: ${metrics.qa.criticalIssues ? '❌ DETECTED' : '✅ NONE'}
- **Edge Cases**: ${metrics.qa.edgeCases ? '⚠️ DETECTED' : '✅ NONE'}

### Resonance Unit Results
- **Fixes Applied**: ${metrics.resonance.fixesApplied || 'N/A'}
- **Optimizations Applied**: ${metrics.resonance.optimizationsApplied || 'N/A'}
- **Cleanup Actions**: ${metrics.resonance.cleanupActions || 'N/A'}

## 🎯 RECOMMENDATIONS

### High Priority
${this.missionStatus.recommendations.filter(r => r.priority === 'urgent' || r.priority === 'high').map(r => `- **${r.category.toUpperCase()}**: ${r.message}`).join('\n') || '✅ No high priority recommendations'}

### Medium Priority
${this.missionStatus.recommendations.filter(r => r.priority === 'medium').map(r => `- **${r.category.toUpperCase()}**: ${r.message}`).join('\n') || '✅ No medium priority recommendations'}

### Low Priority
${this.missionStatus.recommendations.filter(r => r.priority === 'low').map(r => `- **${r.category.toUpperCase()}**: ${r.message}`).join('\n') || '✅ No low priority recommendations'}

## ❌ ERRORS ENCOUNTERED
${this.missionStatus.errors.length === 0 ? '✅ No errors encountered' : 
  this.missionStatus.errors.map(error => `- ${error}`).join('\n')}

## 📋 NEXT STEPS
1. **Review**: Examine detailed QA and Resonance reports
2. **Address**: Handle high-priority recommendations first
3. **Monitor**: Track performance metrics over time
4. **Optimize**: Implement suggested improvements
5. **Repeat**: Schedule regular Army operations

## 📄 DETAILED REPORTS
- **QA Unit Report**: ${qaReport ? 'Available' : 'Not generated'}
- **Resonance Unit Report**: ${resonanceReport ? 'Available' : 'Not generated'}

---
*Generated by Army Commander on ${new Date().toISOString()}*
*Mission Duration: ${durationMinutes} minutes*
`;
    
    return report;
  }

  /**
   * 📱 DISPLAY FINAL STATUS
   */
  async displayFinalStatus() {
    const duration = this.missionStatus.endTime - this.missionStatus.startTime;
    const durationMinutes = Math.round(duration / 60000);
    
    console.log('🎖️ ARMY COMMANDER - FINAL STATUS');
    console.log('==================================');
    console.log(`⏱️ Duration: ${durationMinutes} minutes`);
    console.log(`🎯 Overall Status: ${this.missionStatus.overallStatus.toUpperCase()}`);
    console.log(`🧪 QA Unit: ${this.missionStatus.qaUnitStatus.toUpperCase()}`);
    console.log(`🔄 Resonance Unit: ${this.missionStatus.resonanceUnitStatus.toUpperCase()}`);
    
    if (this.missionStatus.errors.length > 0) {
      console.log(`\n❌ Errors: ${this.missionStatus.errors.length}`);
      this.missionStatus.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
    }
    
    if (this.missionStatus.recommendations.length > 0) {
      console.log(`\n🎯 Recommendations: ${this.missionStatus.recommendations.length}`);
      
      const urgent = this.missionStatus.recommendations.filter(r => r.priority === 'urgent');
      const high = this.missionStatus.recommendations.filter(r => r.priority === 'high');
      
      if (urgent.length > 0) {
        console.log(`   🚨 URGENT (${urgent.length}): ${urgent[0].message}`);
      }
      
      if (high.length > 0) {
        console.log(`   ⚠️ HIGH (${high.length}): ${high[0].message}`);
      }
    }
    
    console.log(`\n📄 Consolidated report saved to intelligence reports`);
    console.log(`🎖️ Mission ${this.missionStatus.overallStatus === 'success' ? 'SUCCESSFUL' : 'REQUIRES ATTENTION'}`);
  }
}

/**
 * 🎯 MAIN COMMANDER EXECUTION
 */
async function main() {
  const commander = new ArmyCommander();
  await commander.executeFullOperation();
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ArmyCommander;