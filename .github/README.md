# GitHub Actions Configuration

This directory contains CI/CD workflows for the Madanzo Digital Army repository.

## Workflows

### 🚀 `deploy-kravings-club.yml`
- **Trigger**: Push to main branch (kravings-club-dev changes)
- **Purpose**: Automated deployment of Kravings Club to Vercel
- **Requirements**: 
  - `VERCEL_TOKEN` secret
  - `VERCEL_ORG_ID` secret  
  - `VERCEL_PROJECT_ID` secret

### 🧪 `build-and-test.yml`
- **Trigger**: Push to main/develop, PRs to main
- **Purpose**: Build and test all active projects
- **Tests**:
  - Kravings Club Dev (Next.js): Build, lint, static export
  - Kravings Club Delivery (React CRA): Test, build
  - Kravings Club Vite UI (Experimental): Lint, build
  - Security audit with Trivy scanner

### 🎖️ `army-automation.yml`
- **Trigger**: Daily at 2 AM UTC, manual dispatch
- **Purpose**: Run army automation scripts
- **Features**:
  - Automated QA testing
  - Performance monitoring
  - Intelligence report generation

## Setup Instructions

### 1. Vercel Deployment Secrets
Add these secrets in GitHub Settings → Secrets and variables → Actions:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
```

### 2. Getting Vercel Credentials
```bash
# Install Vercel CLI
npm i -g vercel

# Login and get credentials
vercel login
vercel link
```

### 3. Manual Workflow Triggers
- Go to Actions tab in GitHub
- Select workflow
- Click "Run workflow"
- Choose parameters if applicable

## Monitoring

- **Build Status**: Check Actions tab for build results
- **Security Reports**: View in Security tab (Code scanning alerts)
- **Automation Reports**: Download from workflow artifacts
- **Deployment Status**: Monitor in Vercel dashboard

## Troubleshooting

### Common Issues:
1. **Build failures**: Check Node.js version compatibility
2. **Vercel deployment fails**: Verify secrets are set correctly
3. **Tests fail**: Ensure all dependencies are included in package-lock.json
4. **Automation scripts fail**: Check Puppeteer/Playwright setup

### Debug Steps:
1. Check workflow logs in Actions tab
2. Verify file paths in repository
3. Test builds locally first
4. Ensure environment variables are set correctly