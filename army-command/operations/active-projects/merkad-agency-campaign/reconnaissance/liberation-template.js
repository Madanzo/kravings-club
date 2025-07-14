const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

/**
 * LIBERATION TEMPLATE - OPERATION WORLD DOMINATION
 * Reusable script for cloning any target website
 * 
 * Usage: node liberation-template.js [target-url] [project-name]
 * Example: node liberation-template.js https://example.com my-new-project
 */

class WebsiteLiberator {
  constructor(targetUrl, projectName) {
    this.targetUrl = targetUrl;
    this.projectName = projectName;
    this.outputDir = path.join(__dirname, 'liberation-results', projectName);
  }

  async init() {
    console.log('🏰 LIBERATION TEMPLATE INITIATED');
    console.log('================================');
    console.log(`Target: ${this.targetUrl}`);
    console.log(`Project: ${this.projectName}`);
    console.log('================================');

    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.mkdir(path.join(this.outputDir, 'screenshots'), { recursive: true });
  }

  async captureIntelligence() {
    console.log('📡 Phase 1: Intelligence Gathering...');
    
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
    
    // Desktop capture
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(this.targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📸 Capturing desktop screenshots...');
    await page.screenshot({
      path: path.join(this.outputDir, 'screenshots', 'desktop-full.png'),
      fullPage: true
    });
    
    await page.screenshot({
      path: path.join(this.outputDir, 'screenshots', 'desktop-hero.png'),
      fullPage: false
    });
    
    // Mobile capture
    console.log('📱 Capturing mobile screenshots...');
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.screenshot({
      path: path.join(this.outputDir, 'screenshots', 'mobile-full.png'),
      fullPage: true
    });

    // Extract comprehensive intelligence
    console.log('🔍 Extracting intelligence data...');
    
    const intelligence = await page.evaluate(() => {
      // Extract complete page structure
      const getElements = (selector) => {
        return Array.from(document.querySelectorAll(selector)).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          innerText: el.innerText?.substring(0, 200),
          href: el.href || null,
          src: el.src || null
        }));
      };

      return {
        // Basic page info
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        favicon: document.querySelector('link[rel="icon"]')?.href,
        
        // Navigation structure
        navigation: getElements('nav a, .nav a, [class*="nav"] a'),
        
        // Content structure
        headings: {
          h1: getElements('h1'),
          h2: getElements('h2'),
          h3: getElements('h3')
        },
        
        // Interactive elements
        buttons: getElements('button, .btn, [class*="button"]'),
        links: getElements('a'),
        forms: getElements('form'),
        
        // Media
        images: getElements('img'),
        videos: getElements('video'),
        
        // Layout sections
        sections: getElements('section, .section, main, [class*="section"]'),
        
        // Color scheme analysis
        colors: {
          backgroundColor: getComputedStyle(document.body).backgroundColor,
          textColor: getComputedStyle(document.body).color,
          primaryColors: Array.from(document.styleSheets).flatMap(sheet => {
            try {
              return Array.from(sheet.cssRules).map(rule => rule.cssText);
            } catch (e) {
              return [];
            }
          }).join(' ').match(/#[0-9a-f]{3,6}/gi) || []
        },
        
        // Fonts
        fonts: Array.from(new Set(
          Array.from(document.querySelectorAll('*')).map(el => 
            getComputedStyle(el).fontFamily
          )
        )).slice(0, 10),
        
        // Page dimensions
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollHeight: document.documentElement.scrollHeight
        }
      };
    });

    // Save intelligence reports
    await fs.writeFile(
      path.join(this.outputDir, 'intelligence-report.json'),
      JSON.stringify(intelligence, null, 2)
    );

    // Save HTML source
    const htmlContent = await page.content();
    await fs.writeFile(
      path.join(this.outputDir, 'source.html'),
      htmlContent
    );

    await browser.close();
    console.log('✅ Intelligence gathering complete!');
    
    return intelligence;
  }

  generateCloneScript(intelligence) {
    console.log('🛠️ Phase 2: Generating clone components...');
    
    const componentTemplate = `'use client';

export default function ClonedComponent() {
  return (
    <div className="liberated-component">
      <h1 className="text-4xl font-bold text-center">
        ${intelligence.title}
      </h1>
      <p className="text-gray-600 text-center mt-4">
        ${intelligence.description || 'Liberated content'}
      </p>
      
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          ${intelligence.navigation.slice(0, 5).map(nav => 
            `<li><a href="${nav.href || '#'}" className="hover:text-gray-300">${nav.innerText}</a></li>`
          ).join('\n          ')}
        </ul>
      </nav>
      
      {/* Main content sections */}
      <main className="container mx-auto py-8">
        ${intelligence.headings.h2.slice(0, 3).map(h2 => 
          `<section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">${h2.innerText}</h2>
            <p className="text-gray-700">Liberated content section</p>
          </section>`
        ).join('\n        ')}
      </main>
    </div>
  );
}`;

    return componentTemplate;
  }

  async generateProject(intelligence) {
    console.log('🚀 Phase 3: Creating project structure...');
    
    const projectStructure = {
      'package.json': JSON.stringify({
        name: this.projectName,
        version: '1.0.0',
        description: `Liberated version of ${this.targetUrl}`,
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint'
        },
        dependencies: {
          'next': '^14.2.30',
          'react': '^18',
          'react-dom': '^18',
          'tailwindcss': '^3.4.1',
          'autoprefixer': '^10.4.19',
          'postcss': '^8.4.38'
        }
      }, null, 2),
      
      'README.md': `# ${this.projectName}

🏆 **LIBERATED VERSION** of ${this.targetUrl}

## Liberation Report
- **Target**: ${this.targetUrl}
- **Title**: ${intelligence.title}
- **Navigation Items**: ${intelligence.navigation.length}
- **Images Found**: ${intelligence.images.length}
- **Sections**: ${intelligence.sections.length}

## Development
\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

Generated by Liberation Template - Operation World Domination 🌍
`,
      
      'src/components/LibratedComponent.js': this.generateCloneScript(intelligence),
      
      'liberation-plan.md': `# Liberation Execution Plan

## Target Analysis
- **URL**: ${this.targetUrl}
- **Title**: ${intelligence.title}
- **Primary Colors**: ${intelligence.colors.primaryColors.slice(0, 5).join(', ')}
- **Font Stack**: ${intelligence.fonts.slice(0, 3).join(', ')}

## Components to Replicate
${intelligence.headings.h2.map(h => `- ${h.innerText}`).join('\n')}

## Next Steps
1. Install dependencies: \`npm install\`
2. Customize components based on intelligence data
3. Update styling to match color scheme
4. Add content from intelligence report
5. Test responsive design
6. Deploy for world domination! 🌍
`
    };

    // Write all project files
    for (const [filename, content] of Object.entries(projectStructure)) {
      const filePath = path.join(this.outputDir, filename);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, content);
    }

    console.log('✅ Project structure generated!');
  }

  async generateReport() {
    const reportPath = path.join(this.outputDir, 'LIBERATION_REPORT.md');
    const report = `# 🏆 LIBERATION MISSION REPORT

## Target Acquired: ${this.targetUrl}

### 📊 Intelligence Summary
- **Mission Date**: ${new Date().toISOString()}
- **Target URL**: ${this.targetUrl}
- **Project Name**: ${this.projectName}
- **Status**: ✅ SUCCESSFULLY LIBERATED

### 📁 Generated Assets
- ✅ Desktop & Mobile Screenshots
- ✅ Complete HTML Source Code
- ✅ Intelligence Report (JSON)
- ✅ Liberation Components
- ✅ Project Structure
- ✅ Development Environment

### 🚀 Next Steps for World Domination
1. Navigate to: \`${this.outputDir}\`
2. Install dependencies: \`npm install\`
3. Start development: \`npm run dev\`
4. Customize and enhance
5. Deploy and conquer! 🌍

### 🎯 Mission Objectives
- [x] Target reconnaissance
- [x] Intelligence gathering
- [x] Asset extraction
- [x] Component generation
- [x] Project structure creation
- [ ] Content customization (manual)
- [ ] Styling refinement (manual)
- [ ] Deployment (manual)

---
**Liberation Template v1.0**  
*Operation World Domination - One Website at a Time* 🏰
`;

    await fs.writeFile(reportPath, report);
    console.log(`📋 Liberation report saved: ${reportPath}`);
  }

  async execute() {
    try {
      await this.init();
      const intelligence = await this.captureIntelligence();
      await this.generateProject(intelligence);
      await this.generateReport();
      
      console.log('\n🏆 LIBERATION MISSION COMPLETE!');
      console.log('================================');
      console.log(`📂 Project Location: ${this.outputDir}`);
      console.log('🎯 Ready for world domination!');
      console.log('\nNext steps:');
      console.log(`1. cd ${this.outputDir}`);
      console.log('2. npm install');
      console.log('3. npm run dev');
      console.log('4. Customize and deploy! 🚀');
      
    } catch (error) {
      console.error('❌ LIBERATION MISSION FAILED:', error.message);
      console.error('Possible causes:');
      console.error('- Target site has anti-bot protection');
      console.error('- Network connectivity issues');
      console.error('- Invalid target URL');
      console.error('- Site structure incompatible');
    }
  }
}

// Command line execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('🏰 LIBERATION TEMPLATE - OPERATION WORLD DOMINATION');
    console.log('Usage: node liberation-template.js [target-url] [project-name]');
    console.log('Example: node liberation-template.js https://example.com my-liberated-site');
    process.exit(1);
  }
  
  const [targetUrl, projectName] = args;
  const liberator = new WebsiteLiberator(targetUrl, projectName);
  liberator.execute();
}

module.exports = WebsiteLiberator;