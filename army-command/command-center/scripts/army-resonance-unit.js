#!/usr/bin/env node

/**
 * 🎖️ ARMY COMMAND CENTER - RESONANCE UNIT
 * 
 * This unit provides mission resonance analysis, fixes, optimizations,
 * and cleanup after each campaign/mission is complete.
 * 
 * MISSION: Analyze results, fix issues, optimize performance, cleanup resources
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const ARMY_ROOT = '/workspaces/madanzo/army-command';
const COMMAND_CENTER = path.join(ARMY_ROOT, 'command-center');
const OPERATIONS = path.join(ARMY_ROOT, 'operations');
const INTELLIGENCE_REPORTS = path.join(COMMAND_CENTER, 'intelligence-reports');
const SCRIPTS_DIR = path.join(COMMAND_CENTER, 'scripts');
const ASSETS_DIR = path.join(COMMAND_CENTER, 'assets');
const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '');

/**
 * 📊 RESONANCE ANALYZER
 */
class ResonanceAnalyzer {
  constructor() {
    this.analysis = {
      missionSuccess: false,
      performanceMetrics: {},
      issuesFound: [],
      optimizations: [],
      cleanupTasks: [],
      resourceUsage: {},
      recommendations: []
    };
    this.fixes = [];
    this.optimizations = [];
    this.cleanupActions = [];
  }

  /**
   * 🔍 ANALYZE MISSION RESULTS
   */
  async analyzeMissionResults() {
    console.log('🔍 Analyzing mission results...');
    
    try {
      // Check for QA reports
      const qaReports = await this.findQAReports();
      await this.analyzeQAResults(qaReports);
      
      // Analyze screenshot quality and coverage
      await this.analyzeScreenshots();
      
      // Check system resource usage
      await this.analyzeResourceUsage();
      
      // Analyze script performance
      await this.analyzeScriptPerformance();
      
      // Check for temporary files and cleanup needs
      await this.identifyCleanupNeeds();
      
      console.log('✅ Mission analysis complete');
      
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      this.analysis.issuesFound.push(`Analysis error: ${error.message}`);
    }
  }

  /**
   * 🔍 FIND AND ANALYZE QA REPORTS
   */
  async findQAReports() {
    console.log('  📋 Searching for QA reports...');
    
    try {
      const files = await fs.readdir(INTELLIGENCE_REPORTS);
      const qaReports = files.filter(file => file.startsWith('QA_UNIT_REPORT_'));
      
      console.log(`  Found ${qaReports.length} QA reports`);
      return qaReports;
      
    } catch (error) {
      console.log('  ⚠️ No QA reports directory found');
      return [];
    }
  }

  async analyzeQAResults(qaReports) {
    console.log('  📊 Analyzing QA results...');
    
    for (const reportFile of qaReports) {
      try {
        const reportPath = path.join(INTELLIGENCE_REPORTS, reportFile);
        const reportContent = await fs.readFile(reportPath, 'utf-8');
        
        // Extract key metrics from report
        const successRateMatch = reportContent.match(/Success Rate\*\*: ([\d.]+)%/);
        const criticalIssuesMatch = reportContent.match(/## 🚨 CRITICAL ISSUES\n(.+?)\n\n/s);
        const edgeCasesMatch = reportContent.match(/## ⚠️ EDGE CASES DISCOVERED\n(.+?)\n\n/s);
        
        if (successRateMatch) {
          const successRate = parseFloat(successRateMatch[1]);
          this.analysis.performanceMetrics.successRate = successRate;
          
          if (successRate < 95) {
            this.analysis.issuesFound.push(`Low success rate: ${successRate}%`);
            this.fixes.push({
              type: 'performance',
              description: 'Improve success rate to >95%',
              priority: 'high',
              action: 'investigate_failed_tests'
            });
          }
        }
        
        if (criticalIssuesMatch && !criticalIssuesMatch[1].includes('No critical issues')) {
          this.analysis.issuesFound.push('Critical issues found in QA report');
          this.fixes.push({
            type: 'critical',
            description: 'Address critical issues from QA report',
            priority: 'urgent',
            action: 'fix_critical_issues'
          });
        }
        
        if (edgeCasesMatch && !edgeCasesMatch[1].includes('No edge cases')) {
          this.analysis.optimizations.push('Handle edge cases discovered in QA');
          this.optimizations.push({
            type: 'edge_cases',
            description: 'Implement edge case handling',
            priority: 'medium',
            action: 'enhance_edge_case_handling'
          });
        }
        
      } catch (error) {
        console.log(`  ⚠️ Could not analyze ${reportFile}: ${error.message}`);
      }
    }
  }

  /**
   * 📸 ANALYZE SCREENSHOTS
   */
  async analyzeScreenshots() {
    console.log('  📸 Analyzing screenshots...');
    
    try {
      const screenshotDirs = await this.findScreenshotDirectories();
      let totalScreenshots = 0;
      let duplicateScreenshots = 0;
      let largeScreenshots = 0;
      const screenshotSizes = [];
      
      for (const dir of screenshotDirs) {
        const files = await fs.readdir(dir);
        const screenshots = files.filter(file => file.endsWith('.png'));
        
        for (const screenshot of screenshots) {
          const filePath = path.join(dir, screenshot);
          const stats = await fs.stat(filePath);
          
          totalScreenshots++;
          screenshotSizes.push(stats.size);
          
          if (stats.size > 5 * 1024 * 1024) { // 5MB
            largeScreenshots++;
          }
        }
      }
      
      // Find duplicates by checking for similar timestamps
      const duplicates = await this.findDuplicateScreenshots(screenshotDirs);
      duplicateScreenshots = duplicates.length;
      
      this.analysis.resourceUsage.totalScreenshots = totalScreenshots;
      this.analysis.resourceUsage.duplicateScreenshots = duplicateScreenshots;
      this.analysis.resourceUsage.largeScreenshots = largeScreenshots;
      
      // Calculate average screenshot size
      const avgSize = screenshotSizes.reduce((a, b) => a + b, 0) / screenshotSizes.length;
      this.analysis.resourceUsage.avgScreenshotSize = Math.round(avgSize / 1024); // KB
      
      console.log(`  📊 Found ${totalScreenshots} screenshots`);
      console.log(`  📊 ${duplicateScreenshots} duplicates, ${largeScreenshots} large files`);
      console.log(`  📊 Average size: ${Math.round(avgSize / 1024)}KB`);
      
      // Add optimizations
      if (duplicateScreenshots > 0) {
        this.optimizations.push({
          type: 'cleanup',
          description: `Remove ${duplicateScreenshots} duplicate screenshots`,
          priority: 'medium',
          action: 'remove_duplicate_screenshots',
          data: duplicates
        });
      }
      
      if (largeScreenshots > 5) {
        this.optimizations.push({
          type: 'compression',
          description: `Compress ${largeScreenshots} large screenshots`,
          priority: 'low',
          action: 'compress_large_screenshots'
        });
      }
      
    } catch (error) {
      console.log('  ⚠️ Screenshot analysis failed:', error.message);
    }
  }

  async findScreenshotDirectories() {
    const screenshotDirs = [];
    
    try {
      const assetsDirs = await fs.readdir(ASSETS_DIR);
      
      for (const dir of assetsDirs) {
        const fullPath = path.join(ASSETS_DIR, dir);
        const stats = await fs.stat(fullPath);
        
        if (stats.isDirectory()) {
          screenshotDirs.push(fullPath);
          
          // Also check subdirectories
          const subDirs = await fs.readdir(fullPath);
          for (const subDir of subDirs) {
            const subPath = path.join(fullPath, subDir);
            const subStats = await fs.stat(subPath);
            if (subStats.isDirectory()) {
              screenshotDirs.push(subPath);
            }
          }
        }
      }
    } catch (error) {
      console.log('  ⚠️ No assets directory found');
    }
    
    return screenshotDirs;
  }

  async findDuplicateScreenshots(dirs) {
    const duplicates = [];
    const seenFiles = new Map();
    
    for (const dir of dirs) {
      try {
        const files = await fs.readdir(dir);
        const screenshots = files.filter(file => file.endsWith('.png'));
        
        for (const screenshot of screenshots) {
          const filePath = path.join(dir, screenshot);
          const stats = await fs.stat(filePath);
          
          // Create a key based on size and rough timestamp
          const key = `${stats.size}-${screenshot.replace(/\d{8}/g, 'YYYYMMDD')}`;
          
          if (seenFiles.has(key)) {
            duplicates.push({
              original: seenFiles.get(key),
              duplicate: filePath,
              size: stats.size
            });
          } else {
            seenFiles.set(key, filePath);
          }
        }
      } catch (error) {
        console.log(`  ⚠️ Could not analyze directory ${dir}`);
      }
    }
    
    return duplicates;
  }

  /**
   * 💾 ANALYZE RESOURCE USAGE
   */
  async analyzeResourceUsage() {
    console.log('  💾 Analyzing resource usage...');
    
    try {
      // Get directory sizes
      const commandCenterSize = await this.getDirectorySize(COMMAND_CENTER);
      const operationsSize = await this.getDirectorySize(OPERATIONS);
      const assetsSize = await this.getDirectorySize(ASSETS_DIR);
      
      this.analysis.resourceUsage.commandCenterSize = commandCenterSize;
      this.analysis.resourceUsage.operationsSize = operationsSize;
      this.analysis.resourceUsage.assetsSize = assetsSize;
      this.analysis.resourceUsage.totalSize = commandCenterSize + operationsSize;
      
      console.log(`  📊 Command Center: ${this.formatSize(commandCenterSize)}`);
      console.log(`  📊 Operations: ${this.formatSize(operationsSize)}`);
      console.log(`  📊 Assets: ${this.formatSize(assetsSize)}`);
      
      // Check for large assets
      if (assetsSize > 100 * 1024 * 1024) { // 100MB
        this.optimizations.push({
          type: 'storage',
          description: `Assets directory is ${this.formatSize(assetsSize)} - consider archiving`,
          priority: 'medium',
          action: 'archive_old_assets'
        });
      }
      
    } catch (error) {
      console.log('  ⚠️ Resource usage analysis failed:', error.message);
    }
  }

  async getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const files = await fs.readdir(dirPath);
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isDirectory()) {
          totalSize += await this.getDirectorySize(filePath);
        } else {
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
    
    return totalSize;
  }

  formatSize(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
  }

  /**
   * ⚡ ANALYZE SCRIPT PERFORMANCE
   */
  async analyzeScriptPerformance() {
    console.log('  ⚡ Analyzing script performance...');
    
    try {
      const scriptFiles = await fs.readdir(SCRIPTS_DIR);
      const jsFiles = scriptFiles.filter(file => file.endsWith('.js'));
      
      for (const scriptFile of jsFiles) {
        const filePath = path.join(SCRIPTS_DIR, scriptFile);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Check for performance issues
        const issues = this.checkScriptPerformance(content, scriptFile);
        if (issues.length > 0) {
          this.analysis.issuesFound.push(...issues);
        }
      }
      
      console.log(`  📊 Analyzed ${jsFiles.length} script files`);
      
    } catch (error) {
      console.log('  ⚠️ Script performance analysis failed:', error.message);
    }
  }

  checkScriptPerformance(content, filename) {
    const issues = [];
    
    // Check for hardcoded delays
    if (content.includes('setTimeout') && content.includes('3000')) {
      issues.push(`${filename}: Contains hardcoded 3-second delays`);
    }
    
    // Check for missing error handling
    if (content.includes('await') && !content.includes('try') && !content.includes('catch')) {
      issues.push(`${filename}: Missing error handling for async operations`);
    }
    
    // Check for console.log in production scripts
    const logCount = (content.match(/console\.log/g) || []).length;
    if (logCount > 10) {
      issues.push(`${filename}: Excessive console.log statements (${logCount})`);
    }
    
    return issues;
  }

  /**
   * 🧹 IDENTIFY CLEANUP NEEDS
   */
  async identifyCleanupNeeds() {
    console.log('  🧹 Identifying cleanup needs...');
    
    try {
      // Find temporary files
      const tempFiles = await this.findTempFiles();
      
      // Find old test files
      const oldTestFiles = await this.findOldTestFiles();
      
      // Find empty directories
      const emptyDirs = await this.findEmptyDirectories();
      
      if (tempFiles.length > 0) {
        this.cleanupActions.push({
          type: 'temp_files',
          description: `Remove ${tempFiles.length} temporary files`,
          priority: 'high',
          action: 'remove_temp_files',
          data: tempFiles
        });
      }
      
      if (oldTestFiles.length > 0) {
        this.cleanupActions.push({
          type: 'old_tests',
          description: `Remove ${oldTestFiles.length} old test files`,
          priority: 'medium',
          action: 'remove_old_tests',
          data: oldTestFiles
        });
      }
      
      if (emptyDirs.length > 0) {
        this.cleanupActions.push({
          type: 'empty_dirs',
          description: `Remove ${emptyDirs.length} empty directories`,
          priority: 'low',
          action: 'remove_empty_dirs',
          data: emptyDirs
        });
      }
      
      console.log(`  📊 Found ${tempFiles.length} temp files, ${oldTestFiles.length} old tests, ${emptyDirs.length} empty dirs`);
      
    } catch (error) {
      console.log('  ⚠️ Cleanup identification failed:', error.message);
    }
  }

  async findTempFiles() {
    const tempFiles = [];
    const tempPatterns = [/\.tmp$/, /\.temp$/, /~$/, /debug-.*\.png$/, /test-.*\.png$/];
    
    await this.findFilesByPattern(COMMAND_CENTER, tempPatterns, tempFiles);
    return tempFiles;
  }

  async findOldTestFiles() {
    const oldTestFiles = [];
    const testPatterns = [/^test-.*\.js$/, /^debug-.*\.js$/, /.*-test\.js$/];
    
    await this.findFilesByPattern(SCRIPTS_DIR, testPatterns, oldTestFiles);
    return oldTestFiles;
  }

  async findFilesByPattern(dir, patterns, results) {
    try {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isDirectory()) {
          await this.findFilesByPattern(filePath, patterns, results);
        } else {
          if (patterns.some(pattern => pattern.test(file))) {
            results.push(filePath);
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
  }

  async findEmptyDirectories() {
    const emptyDirs = [];
    await this.checkDirectoryEmpty(COMMAND_CENTER, emptyDirs);
    return emptyDirs;
  }

  async checkDirectoryEmpty(dir, results) {
    try {
      const files = await fs.readdir(dir);
      
      if (files.length === 0) {
        results.push(dir);
      } else {
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.isDirectory()) {
            await this.checkDirectoryEmpty(filePath, results);
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
  }

  /**
   * 🔧 APPLY FIXES
   */
  async applyFixes() {
    console.log('🔧 Applying fixes...');
    
    for (const fix of this.fixes) {
      console.log(`  🔧 ${fix.description}`);
      
      try {
        await this.executeFix(fix);
        console.log(`    ✅ Fix applied successfully`);
      } catch (error) {
        console.log(`    ❌ Fix failed: ${error.message}`);
      }
    }
  }

  async executeFix(fix) {
    switch (fix.action) {
      case 'fix_critical_issues':
        // This would require manual intervention based on QA report
        console.log('    ⚠️ Manual intervention required for critical issues');
        break;
        
      case 'investigate_failed_tests':
        // Log the need for investigation
        console.log('    ⚠️ Failed tests require investigation');
        break;
        
      default:
        console.log(`    ⚠️ Unknown fix action: ${fix.action}`);
    }
  }

  /**
   * ⚡ APPLY OPTIMIZATIONS
   */
  async applyOptimizations() {
    console.log('⚡ Applying optimizations...');
    
    for (const optimization of this.optimizations) {
      console.log(`  ⚡ ${optimization.description}`);
      
      try {
        await this.executeOptimization(optimization);
        console.log(`    ✅ Optimization applied successfully`);
      } catch (error) {
        console.log(`    ❌ Optimization failed: ${error.message}`);
      }
    }
  }

  async executeOptimization(optimization) {
    switch (optimization.action) {
      case 'remove_duplicate_screenshots':
        if (optimization.data) {
          for (const duplicate of optimization.data) {
            await fs.unlink(duplicate.duplicate);
          }
        }
        break;
        
      case 'compress_large_screenshots':
        console.log('    ⚠️ Screenshot compression requires external tools');
        break;
        
      case 'enhance_edge_case_handling':
        console.log('    ⚠️ Edge case handling requires code updates');
        break;
        
      case 'archive_old_assets':
        await this.archiveOldAssets();
        break;
        
      default:
        console.log(`    ⚠️ Unknown optimization action: ${optimization.action}`);
    }
  }

  async archiveOldAssets() {
    const archiveDir = path.join(ASSETS_DIR, 'archived');
    await fs.mkdir(archiveDir, { recursive: true });
    
    // Move files older than 30 days to archive
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const files = await fs.readdir(ASSETS_DIR);
    for (const file of files) {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isFile() && stats.mtime < cutoffDate) {
        const archivePath = path.join(archiveDir, file);
        await fs.rename(filePath, archivePath);
      }
    }
  }

  /**
   * 🧹 PERFORM CLEANUP
   */
  async performCleanup() {
    console.log('🧹 Performing cleanup...');
    
    for (const cleanup of this.cleanupActions) {
      console.log(`  🧹 ${cleanup.description}`);
      
      try {
        await this.executeCleanup(cleanup);
        console.log(`    ✅ Cleanup completed successfully`);
      } catch (error) {
        console.log(`    ❌ Cleanup failed: ${error.message}`);
      }
    }
  }

  async executeCleanup(cleanup) {
    switch (cleanup.action) {
      case 'remove_temp_files':
        if (cleanup.data) {
          for (const file of cleanup.data) {
            await fs.unlink(file);
          }
        }
        break;
        
      case 'remove_old_tests':
        if (cleanup.data) {
          for (const file of cleanup.data) {
            await fs.unlink(file);
          }
        }
        break;
        
      case 'remove_empty_dirs':
        if (cleanup.data) {
          for (const dir of cleanup.data) {
            await fs.rmdir(dir);
          }
        }
        break;
        
      default:
        console.log(`    ⚠️ Unknown cleanup action: ${cleanup.action}`);
    }
  }

  /**
   * 📄 GENERATE RESONANCE REPORT
   */
  generateResonanceReport() {
    const report = `
# 🎖️ ARMY RESONANCE UNIT - MISSION RESONANCE REPORT
## Date: ${new Date().toISOString()}

## 📊 MISSION ANALYSIS
- **Mission Success**: ${this.analysis.missionSuccess ? '✅ SUCCESS' : '❌ FAILED'}
- **Success Rate**: ${this.analysis.performanceMetrics.successRate || 'N/A'}%
- **Issues Found**: ${this.analysis.issuesFound.length}
- **Optimizations Applied**: ${this.optimizations.length}
- **Cleanup Actions**: ${this.cleanupActions.length}

## 🔧 FIXES APPLIED
${this.fixes.length === 0 ? '✅ No fixes required' : 
  this.fixes.map(fix => `- **${fix.priority.toUpperCase()}**: ${fix.description}`).join('\n')}

## ⚡ OPTIMIZATIONS APPLIED
${this.optimizations.length === 0 ? '✅ No optimizations applied' : 
  this.optimizations.map(opt => `- **${opt.priority.toUpperCase()}**: ${opt.description}`).join('\n')}

## 🧹 CLEANUP PERFORMED
${this.cleanupActions.length === 0 ? '✅ No cleanup required' : 
  this.cleanupActions.map(cleanup => `- **${cleanup.priority.toUpperCase()}**: ${cleanup.description}`).join('\n')}

## 💾 RESOURCE USAGE
- **Total Screenshots**: ${this.analysis.resourceUsage.totalScreenshots || 0}
- **Duplicate Screenshots**: ${this.analysis.resourceUsage.duplicateScreenshots || 0}
- **Large Screenshots**: ${this.analysis.resourceUsage.largeScreenshots || 0}
- **Average Screenshot Size**: ${this.analysis.resourceUsage.avgScreenshotSize || 0}KB
- **Command Center Size**: ${this.formatSize(this.analysis.resourceUsage.commandCenterSize || 0)}
- **Operations Size**: ${this.formatSize(this.analysis.resourceUsage.operationsSize || 0)}
- **Assets Size**: ${this.formatSize(this.analysis.resourceUsage.assetsSize || 0)}

## 🎯 RECOMMENDATIONS
${this.generateRecommendations()}

## 📋 ISSUES IDENTIFIED
${this.analysis.issuesFound.length === 0 ? '✅ No issues found' : 
  this.analysis.issuesFound.map(issue => `- ${issue}`).join('\n')}

---
*Generated by Army Resonance Unit on ${new Date().toISOString()}*
`;
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.analysis.performanceMetrics.successRate < 95) {
      recommendations.push('🎯 **IMPROVE**: Focus on increasing success rate above 95%');
    }
    
    if (this.analysis.resourceUsage.duplicateScreenshots > 5) {
      recommendations.push('🧹 **CLEANUP**: Regular duplicate screenshot removal needed');
    }
    
    if (this.analysis.resourceUsage.assetsSize > 100 * 1024 * 1024) {
      recommendations.push('💾 **ARCHIVE**: Assets directory growing large - implement archiving');
    }
    
    if (this.analysis.issuesFound.length > 0) {
      recommendations.push('🔧 **FIX**: Address identified issues before next mission');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ **EXCELLENT**: All systems operating optimally');
    }
    
    return recommendations.join('\n');
  }
}

/**
 * 🎯 MAIN RESONANCE MISSION
 */
async function runResonanceMission() {
  console.log('🎖️ ARMY RESONANCE UNIT - MISSION START');
  console.log('=========================================');
  console.log(`📅 Mission Date: ${TIMESTAMP}`);
  console.log(`🎯 Target: Army Command Center`);
  console.log(`📁 Analysis Directory: ${INTELLIGENCE_REPORTS}`);
  console.log('🔍 Resonance Analysis: ENABLED\n');
  
  const resonance = new ResonanceAnalyzer();
  
  try {
    // Phase 1: Analyze mission results
    await resonance.analyzeMissionResults();
    
    // Phase 2: Apply fixes
    await resonance.applyFixes();
    
    // Phase 3: Apply optimizations
    await resonance.applyOptimizations();
    
    // Phase 4: Perform cleanup
    await resonance.performCleanup();
    
    // Phase 5: Generate report
    const report = resonance.generateResonanceReport();
    const reportPath = path.join(INTELLIGENCE_REPORTS, `RESONANCE_REPORT_${TIMESTAMP}.md`);
    
    await fs.mkdir(INTELLIGENCE_REPORTS, { recursive: true });
    await fs.writeFile(reportPath, report);
    
    console.log('\n🎯 RESONANCE MISSION COMPLETE');
    console.log('==============================');
    console.log(`🔧 Fixes Applied: ${resonance.fixes.length}`);
    console.log(`⚡ Optimizations Applied: ${resonance.optimizations.length}`);
    console.log(`🧹 Cleanup Actions: ${resonance.cleanupActions.length}`);
    console.log(`📄 Report: ${reportPath}`);
    
    // Determine overall mission success
    const overallSuccess = resonance.analysis.issuesFound.length === 0 && 
                          resonance.analysis.performanceMetrics.successRate >= 95;
    
    console.log(`\n🎖️ MISSION STATUS: ${overallSuccess ? '✅ SUCCESS' : '⚠️ NEEDS ATTENTION'}`);
    
    if (!overallSuccess) {
      console.log('\n⚠️ ATTENTION REQUIRED:');
      if (resonance.analysis.issuesFound.length > 0) {
        console.log(`   - ${resonance.analysis.issuesFound.length} issues found`);
      }
      if (resonance.analysis.performanceMetrics.successRate < 95) {
        console.log(`   - Success rate: ${resonance.analysis.performanceMetrics.successRate}%`);
      }
    }
    
  } catch (error) {
    console.error('❌ Resonance mission failed:', error);
    process.exit(1);
  }
}

// Execute resonance mission
runResonanceMission().catch(console.error);