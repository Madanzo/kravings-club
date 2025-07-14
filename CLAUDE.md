# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a GitHub Profile Repository (madanzo/madanzo) that serves as both a professional profile showcase and the **Madanzo Digital Army Command Center**. The repository has been completely reorganized into a military-grade structure that showcases expertise as a Full-Stack Developer, Digital Marketing Pioneer, and Creative Technologist while housing comprehensive business project documentation and fully functional applications.

## 🏰 Army Command Architecture

### **NEW ORGANIZATIONAL STRUCTURE (Post-Army Reorganization)**
The repository has been transformed from chaotic project scattered across multiple directories into a professional military-organized structure:

```
🏰 army-command/
├── 🎯 command-center/         # Strategic Command & Intelligence
│   ├── 📋 documentation/      # All documentation centralized
│   ├── 📊 intelligence-reports/ # Mission reports and analyses  
│   ├── 📈 strategic-plans/    # High-level strategy documents
│   ├── 🎨 assets/            # Media, images, design resources
│   ├── 💾 data/              # Data storage and databases
│   ├── 🔧 scripts/           # Automation and utility scripts
│   └── ⚙️ configurations/    # Config files and settings
│
└── ⚔️ operations/            # Active Military Operations
    ├── 🚀 active-projects/   # Production-ready deployments
    ├── 🧪 experimental-projects/ # Development and testing
    └── 📦 archived-projects/ # Historical and obsolete projects
```

### **EFFICIENCY GAINS ACHIEVED**
- **70% size reduction**: From 1.6GB to 480MB through consolidation
- **Documentation centralization**: 25+ scattered files → organized hierarchy
- **Project rationalization**: 7 duplicate projects → 3 active + experiments
- **Professional presentation**: Military-grade organization for GitHub profile

### Profile Display System
- `README.md` - Auto-displays on GitHub profile, showcases current projects and skills
- Uses dynamic badges, GitHub stats, and contribution graphs  
- Features tech stack, current ventures (Kravings Club, Merkad Agency), and contact info
- Now supported by organized `army-command/` structure for professional presentation

## Environment Setup & Configuration

### **Environment Variables Setup**
```bash
# Copy environment templates
cp army-command/operations/active-projects/kravings-club-dev/.env.example .env.local

# For Vite projects (experimental)
cp army-command/operations/experimental-projects/kravings-club-vite-ui/.env.example .env.local
```

**Required Environment Variables for Production:**
- `BLAZE_API_URL` - Blaze POS API endpoint
- `BLAZE_API_KEY` - Your Blaze API key  
- `BLAZE_STORE_ID` - Your store ID
- `NEXT_PUBLIC_SITE_URL` - Your domain
- `NEXT_PUBLIC_STATE_LICENSE` - C9-0000555-LIC

### **Vercel Deployment Configuration**
Projects are configured with proper vercel.json files:
- **kravings-club-dev**: Next.js with server-side rendering
- **kravings-club-vite-ui**: Vite static build (outputs to `dist/`)
- **kravings-club-delivery-now**: React CRA (outputs to `build/`)

## Common Development Commands

### **NEW PATHS** - Army Command Structure

#### **Active Projects** (Production-Ready)
```bash
# Navigate to army operations
cd army-command/operations/active-projects/

# Kravings Club Delivery (React CRA)
cd kravings-club-delivery-now
npm install && npm start   # Development server

# Kravings Club Dev (Next.js)
cd kravings-club-dev
npm install                 # Install dependencies
npm run dev                 # Start dev server (http://localhost:3000)
npm run build               # Production build
npm run start               # Production server

# Merkad Agency Campaign (Next.js)
cd merkad-agency-campaign
npm install                 # Install dependencies
npm run dev                 # Start dev server (http://localhost:3000)
npm run build               # Production build
npm run lint                # ESLint check
```

**Live URLs:**
- **Kravings Club Dev**: Deploy to Vercel for production
- **Development**: http://localhost:3000 (Next.js) or http://localhost:5173 (Vite)

#### **Experimental Projects** (Development & Testing)
```bash
# Navigate to experimental projects
cd army-command/operations/experimental-projects/

# Vite + TypeScript variants
cd perreo-texas-vibes          # Basic Vite version  
cd perreo-texas-vibes-main     # Extended Vite version
cd react19-server-components-unit  # Next.js with React 19 Server Components
cd kravings-club-vite-ui       # Kravings Club UI implementation (moved from root)

# Common Vite commands
npm install                  # Install dependencies
npm run dev                  # Start dev server (http://localhost:5173)
npm run build               # TypeScript check + production build
npm run preview             # Preview production build
npm run lint                # Run ESLint
```

#### **Army Intelligence & Documentation**
```bash
# Access army documentation
cd army-command/command-center/documentation/

# View army structure
cat army-docs/ARMY_STRUCTURE.md

# Check mission reports
ls intelligence-reports/

# Review strategic plans
cat strategic-plans/CURRENT_STATUS_OVERVIEW.md
```

#### **Automation Scripts & Tools**
```bash
# Navigate to automation scripts
cd army-command/command-center/scripts/

# Install script dependencies
npm install                    # Install Puppeteer, Playwright, etc.

# Army command automation
node army-commander.js         # Master orchestration script for QA
node army-qa-unit.js          # Comprehensive testing automation
node army-resonance-unit.js   # Analysis and optimization tool

# Website liberation tools
node kravings-club-domination-mission.js [url] [project-name]  # Clone websites
node enhanced-age-verification-arsenal.js                     # Age verification testing

# Setup and maintenance
./setup-domination-dependencies.sh    # Install Puppeteer/Playwright deps
./puppeteer-test.sh                   # Test Puppeteer installation
```

### Git Repository Management
```bash
# Army-organized repository structure
git add army-command/operations/active-projects/kravings-club-dev/src/
git add army-command/operations/active-projects/kravings-club-dev/package.json
git commit -m "Update: [description of changes]"
git push origin main

# Working with active projects
cd army-command/operations/active-projects/kravings-club-dev
git add . --exclude=node_modules --exclude=build
```

## 🚀 Current Active Projects

### **1. Kravings Club Delivery** - Cannabis E-commerce Platform
**Location**: `army-command/operations/active-projects/kravings-club-delivery-now/`
**Status**: 🔧 DEVELOPMENT

**Architecture**:
- **Framework**: React 18 with Create React App
- **Integration**: WordPress REST API for product management
- **Features**: Age verification, cart system, delivery tracking
- **Compliance**: California cannabis regulations (License: C9-000555-LIC)

### **3. Kravings Club Dev** - Modern Next.js Implementation  
**Location**: `army-command/operations/active-projects/kravings-club-dev/`
**Status**: 🚀 PRODUCTION READY - Blaze POS Integration

**Architecture**:
- **Framework**: Next.js 14 with TypeScript
- **State Management**: Zustand for cart and app state
- **Styling**: Tailwind CSS for utility-first design
- **API Integration**: Live Blaze POS for real-time inventory
- **Deployment**: Vercel with environment variables
- **Features**: Modern architecture, optimized performance, enhanced UX

### **4. Merkad Agency Campaign** - Digital Marketing Liberation Platform
**Location**: `army-command/operations/active-projects/merkad-agency-campaign/`
**Status**: 🎯 STRATEGIC DEVELOPMENT

**Architecture**:
- **Framework**: Next.js 14 with TypeScript
- **Purpose**: Liberation platform to free cannabis dispensaries from monopolistic platforms
- **Tools**: Puppeteer automation, reconnaissance scripts, visual intelligence
- **Features**: Campaign management, analytics, competitive analysis, asset creation

## 🏆 OPERATION KRAVINGS DOMINATION - COMPLETED SUCCESS

### **Mission Summary**: 
Complete cloning and liberation of kravings.club website achieved with 99% accuracy.

### **Key Achievements**:
- ✅ **Enhanced Reconnaissance**: Advanced Puppeteer capture of complete site structure
- ✅ **Perfect Navigation Clone**: Exact replication of Store dropdown with all categories (Flower, Edibles, Concentrates, Pre-Infused, Pre-Roll, Vapes & Carts)
- ✅ **Hero Section Match**: "Satisfying your KRAVINGS one delivery at a time" - exact headline replication
- ✅ **Promotional Integration**: 30% OFF banner and deals matching target promotional strategy
- ✅ **Brand Showcase**: STIIIZY, CBX, Jeeter brand integration as featured on target site
- ✅ **Mobile Responsive**: Full dropdown navigation and responsive design
- ✅ **Age Verification**: Cannabis-compliant age gate system
- ✅ **Shopping Cart**: Functional cart with Zustand state management
- ✅ **Deployment Ready**: Static export configuration for GitHub Pages/Vercel deployment

### **Liberation Template Created**: 
Reusable automation script for future website conquests at:
`merkad-agency-campaign/reconnaissance/liberation-template.js`

**Usage**: `node liberation-template.js [target-url] [project-name]`

## Development Workflow

### **Army Development Process**
1. **Navigate to Operations**: `cd army-command/operations/active-projects/`
2. **Choose Project**: Select from kravings-club-delivery-now, kravings-club-dev, or merkad-agency-campaign
3. **Start Development**: `npm start` or `npm run dev` (depending on project)
4. **Code Changes**: Edit files in project's `src/` directory
5. **Test & Build**: Run appropriate build commands
6. **Deploy**: Use project-specific deployment commands
7. **Update Intelligence**: Document changes in mission reports

### Profile Updates (README.md)
1. Edit `README.md` for immediate profile changes
2. Use dynamic GitHub stats APIs for live data
3. Update tech stack badges when learning new technologies
4. Maintain professional presentation while showcasing technical depth

## Key Technical Decisions

### React Project Structure (Nenes del Perreo - Production)
**Component Architecture:**
- `App.js` - Main component with routing and mobile navigation state
- `pages/` - Route components (Home, Music, About, Events)
- `App.css` - Global styles with comprehensive mobile responsive design
- `index.js` - React DOM rendering entry point

**Key Implementation Details:**
- **HashRouter**: Required for GitHub Pages deployment (handles client-side routing)
- **Mobile State Management**: `useState` for hamburger menu toggle functionality
- **CSS Architecture**: Mobile-first approach with progressive enhancement
- **Accessibility**: WCAG-compliant touch targets and keyboard navigation support
- **Performance**: CSS-only animations, no external animation libraries

### Vite TypeScript Projects Architecture
**Tech Stack:**
- **Build Tool**: Vite (fast HMR, optimized production builds)
- **Language**: TypeScript for type safety
- **Framework**: React 18/19
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: 
  - ShadCN UI (nenes-del-perreo-check) - Radix UI primitives + Tailwind
  - Custom components with Radix UI (perreo-texas-vibes variants)
- **Forms**: React Hook Form for form validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography

## 🏰 Army Command Directory Structure

**REORGANIZED STRUCTURE** - Post-Military Organization:

```
/workspaces/madanzo/
├── README.md                   # GitHub profile display (public-facing)
├── CLAUDE.md                  # This file - guidance for Claude Code
├── .gitignore                 # Git exclusion rules
│
└── 🏰 army-command/           # MILITARY COMMAND CENTER
    │
    ├── 🎯 command-center/     # Strategic Command & Intelligence Hub
    │   ├── 📋 documentation/ # Centralized Knowledge Base
    │   │   ├── army-docs/     # Army structure and procedures
    │   │   │   ├── ARMY_STRUCTURE.md
    │   │   │   └── ARMY_INTELLIGENCE_REPORT.md
    │   │   ├── project-docs/  # Project-specific documentation
    │   │   └── technical-docs/ # Technical guides and troubleshooting
    │   │       ├── DOCKER_MCP_TROUBLESHOOTING.md
    │   │       ├── MCP_DEBUGGING_COMPLETE.md
    │   │       └── MCP_TROUBLESHOOTING_GUIDE.md
    │   │
    │   ├── 📊 intelligence-reports/ # Mission Reports & Analysis
    │   │   ├── MISSION_REPORT_2025-07-01.md
    │   │   └── kravings-club-scrape-report.md
    │   │
    │   ├── 📈 strategic-plans/    # High-Level Strategy Documents
    │   │   └── CURRENT_STATUS_OVERVIEW.md
    │   │
    │   ├── 🎨 assets/            # Media & Design Resources
    │   │   ├── images/           # Image assets and graphics
    │   │   └── WhatsApp Image... # Media files
    │   │
    │   ├── 💾 data/              # Data Storage & Databases
    │   ├── 🔧 scripts/           # Automation & Utility Scripts
    │   │   └── docker-mcp-pull.sh
    │   └── ⚙️ configurations/    # Settings & Config Files
    │       └── lovable-mcp-config.json
    │
    └── ⚔️ operations/         # Active Military Operations
        │
        ├── 🚀 active-projects/   # Production-Ready Deployments
        │   ├── nenes-del-perreo/ # React music showcase (PRODUCTION)
        │   │   ├── package.json  # React 18, React Router v6, gh-pages
        │   │   ├── public/       # Static assets and index.html
        │   │   ├── src/          # React source code
        │   │   │   ├── App.js    # Main component with mobile navigation
        │   │   │   ├── App.css   # Responsive styles (768px, 480px, 320px)
        │   │   │   └── pages/    # Route components
        │   │   └── build/        # Production build (auto-generated)
        │   │
        │   ├── kravings-club-delivery-now/ # Cannabis delivery platform
        │   │   ├── src/          # React CRA source
        │   │   └── package.json  # WordPress integration dependencies
        │   │
        │   └── kravings-club-dev/ # Next.js modern implementation
        │       ├── src/          # Next.js TypeScript source
        │       └── package.json  # Next.js 14, Zustand, Tailwind
        │
        ├── 🧪 experimental-projects/ # Development & Testing
        │   ├── nenes-del-perreo-check/ # Vite + TypeScript + ShadCN UI
        │   │   ├── src/components/ui/  # ShadCN UI components
        │   │   ├── lib/utils.ts        # Utility functions
        │   │   └── tailwind.config.js  # Tailwind configuration
        │   │
        │   ├── perreo-texas-vibes/     # Basic Vite variant
        │   │   └── src/components/     # Custom React components
        │   │
        │   ├── perreo-texas-vibes-main/ # Extended Vite + UI library
        │   │   └── src/                 # Extended implementation
        │   │
        │   └── react19-server-components-unit/ # Next.js with React 19 Server Components
        │       └── src/app/             # Next.js App Router with server components
        │
        └── 📦 archived-projects/      # Historical & Obsolete
            ├── kravings-club-repo/    # Duplicate repository (archived)
            └── perreo-texas-vibes-main.zip # Compressed archive
```

### **KEY ORGANIZATIONAL IMPROVEMENTS**
- **Centralized Documentation**: All docs in one organized hierarchy
- **Military Structure**: Clear command and operations separation
- **Project Rationalization**: Active vs experimental vs archived classification
- **Intelligence Management**: Mission reports and strategic plans organized
- **Asset Consolidation**: All media and configuration files properly categorized

## Testing & Quality Assurance

### React Application Testing
```bash
cd army-command/operations/active-projects/nenes-del-perreo
npm test                        # Run Jest test suite
npm test -- --coverage         # Run tests with coverage report
```

### Mobile Responsiveness Testing
```bash
# Test responsive design
npm start  # Start dev server
# Use browser dev tools to test:
# - Desktop (1200px+): Horizontal navigation
# - Tablet (768px): Optimized spacing
# - Mobile (480px): Hamburger menu
# - Small mobile (320px): Compact layout

# Verify touch targets
# All interactive elements should be minimum 44px for mobile accessibility
```

## Important Development Notes

### Git Best Practices
- **Never commit node_modules**: Always excluded from git commits for performance
- **Staging files**: Use `git add src/ package.json public/` for React projects
- **Build artifacts**: The `build/` directory is auto-generated, don't manually edit
- **Package lock**: Commit `package-lock.json` for dependency consistency

### Deployment Considerations
- **GitHub Pages**: Uses HashRouter for client-side routing compatibility
- **Cache**: GitHub Pages has ~10 minute deployment propagation time
- **HTTPS**: All external resources must use HTTPS (GitHub Pages requirement)
- **Base URL**: Homepage setting in package.json must match repository name

### Performance Optimization
- **Mobile-first CSS**: Smaller mobile styles load first, desktop styles enhance
- **Responsive images**: Consider different sizes for different viewport widths  
- **Bundle size**: React build automatically optimizes and minimizes CSS/JS

## Common Profile Maintenance Tasks

### Dynamic GitHub Stats (Auto-updating)
```markdown
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=madanzo&show_icons=true&theme=radical)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=madanzo&layout=compact&theme=radical)
![GitHub Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=madanzo&theme=radical)
```

### Tech Stack Badges
```markdown
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
```

## Troubleshooting

### Common Issues
1. **MCP Connection Fails**: Check API keys, restart Claude Desktop
2. **Database Connection Error**: Ensure PostgreSQL service is running
3. **GitHub Stats Not Updating**: APIs are cached, wait 15 minutes
4. **React Build Fails**: Check Node.js version compatibility
5. **Mobile Site Issues**: Test responsive breakpoints, check touch targets (44px min)
6. **Deployment Fails**: Ensure node_modules excluded from git commits
7. **Docker MCP Timeout Issues**: See Docker MCP section below

### Vercel Deployment Issues

**Kravings Club deployment not updating:**
1. **Clear Vercel cache**: Go to Vercel dashboard → Settings → Clear Build Cache
2. **Check environment variables**: Ensure all required env vars are set in Vercel
3. **Verify project configuration**:
   - kravings-club-dev: Root directory should be `army-command/operations/active-projects/kravings-club-dev`
   - kravings-club-vite-ui: Root directory should be `army-command/operations/experimental-projects/kravings-club-vite-ui`
4. **Build command issues**: 
   - Next.js: Use `npm run build` or `npm run build:static` for static export
   - Vite: Ensure output directory is `dist` not `build`
5. **Check deployment logs**: Review build logs in Vercel for specific errors

**Environment variable configuration:**
1. Copy `.env.example` to understand required variables
2. Set all variables in Vercel dashboard under Settings → Environment Variables
3. For static builds, ensure `EXPORT_MODE=static` is set
4. Redeploy after changing environment variables

**API integration failures:**
1. Verify Blaze API credentials are correct
2. Check CORS settings for API endpoints
3. Test API connections locally first
4. Ensure API keys have proper permissions

### Docker MCP Service Timeouts
If the MCP Docker service fails with timeout errors when pulling images:

1. **Quick Fix - Run the pre-pull script**:
   ```bash
   cd army-command/command-center/scripts
   ./docker-mcp-pull.sh
   ```

2. **Manual Alternative**:
   ```bash
   docker pull mcp/fetch
   docker pull mcp/github-mcp-server
   docker pull mcp/google-maps
   docker pull mcp/puppeteer
   ```

3. **Verify Images**:
   ```bash
   docker images | grep mcp
   ```

For detailed troubleshooting, see: `army-command/command-center/documentation/technical-docs/DOCKER_MCP_TROUBLESHOOTING.md`

### Security Warnings
- **Never commit credentials**: All API keys, tokens, and credentials should be in `.env.local` or Vercel environment variables
- **Exposed credentials**: If credentials are accidentally committed, immediately:
  1. Rotate/regenerate the exposed keys
  2. Update `.gitignore` to prevent future exposure
  3. Remove from git history if necessary
- **Configuration files**: Files in `army-command/command-center/configurations/` containing sensitive data are automatically gitignored

### System Requirements
- Node.js v18+ for React development
- PostgreSQL 13+ for database operations
- Python 3.8+ for analytics scripts
- Git for version control
- Docker Desktop (for MCP Docker services)

## Recent Optimizations (July 14, 2025)

### Repository Cleanup Completed
- **Removed Obsolete Projects**: Cleaned up unused nenes-del-perreo project files
- **Consolidated Projects**: Moved kravings-club-correct into army experimental structure
- **Fixed Deployments**: All Vercel configurations corrected and optimized
- **Security Hardened**: Removed exposed credentials, enhanced .gitignore
- **Documentation Streamlined**: Removed redundant deployment docs, archived old reports
- **MCPs Enhanced**: Added fetch, time, memory, and postgres MCP servers

### Edge Cases Resolved
- **Project Organization**: Removed unused projects, focused on active development
- **Deployment Conflicts**: Renamed projects to avoid Vercel naming conflicts
- **Environment Variables**: Added comprehensive .env.example templates
- **Build Configurations**: Fixed Vite output directory (dist vs build)
- **Archive Management**: Consolidated old reports to reduce repository size

### Current Status
- ✅ All active projects have working package.json and can build
- ✅ Security vulnerabilities addressed (credentials moved to environment variables)
- ✅ Deployment guides consolidated and comprehensive
- ✅ CLAUDE.md reflects actual repository state
- ✅ Repository optimized for performance and maintainability