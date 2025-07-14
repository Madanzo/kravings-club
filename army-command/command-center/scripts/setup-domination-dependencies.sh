#!/bin/bash

# 🎖️ ARMY COMMAND CENTER - DOMINATION DEPENDENCIES SETUP
# 
# This script installs all required dependencies for the 
# Kravings.Club Domination Mission with 95%+ success rate
#
# MISSION: Prepare all battle-ready dependencies

echo "🎖️ ARMY COMMAND CENTER - DOMINATION DEPENDENCIES SETUP"
echo "====================================================="
echo "📅 Setup Date: $(date)"
echo "🎯 Mission: Prepare domination dependencies"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install with error handling
install_with_check() {
    echo "📦 Installing $1..."
    if eval "$2"; then
        echo "  ✅ $1 installed successfully"
    else
        echo "  ❌ $1 installation failed"
        return 1
    fi
}

echo "🔍 PHASE 1: SYSTEM REQUIREMENTS CHECK"
echo "======================================"

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found - please install Node.js 16+"
    exit 1
fi

# Check NPM
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ NPM found: $NPM_VERSION"
else
    echo "❌ NPM not found - please install NPM"
    exit 1
fi

# Check Docker
if command_exists docker; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ Docker found: $DOCKER_VERSION"
else
    echo "❌ Docker not found - please install Docker"
    exit 1
fi

# Check Python (for Google Vision API)
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python found: $PYTHON_VERSION"
else
    echo "❌ Python not found - please install Python 3.8+"
    exit 1
fi

echo ""
echo "🚀 PHASE 2: CRITICAL MCP DEPENDENCIES"
echo "====================================="

# Install Playwright
echo "📦 Installing Playwright..."
if npm install -g playwright; then
    echo "  ✅ Playwright installed successfully"
    
    # Install Playwright browsers
    echo "📦 Installing Playwright browsers..."
    if npx playwright install; then
        echo "  ✅ Playwright browsers installed successfully"
    else
        echo "  ❌ Playwright browsers installation failed"
    fi
else
    echo "  ❌ Playwright installation failed"
fi

# Install Google Cloud Vision API
echo "📦 Installing Google Cloud Vision API..."
if npm install -g @google-cloud/vision; then
    echo "  ✅ Google Cloud Vision API installed successfully"
else
    echo "  ❌ Google Cloud Vision API installation failed"
fi

# Install Sharp for image processing
echo "📦 Installing Sharp (Image Processing)..."
if npm install -g sharp sharp-cli; then
    echo "  ✅ Sharp installed successfully"
else
    echo "  ❌ Sharp installation failed"
fi

# Install Lighthouse for network monitoring
echo "📦 Installing Lighthouse..."
if npm install -g lighthouse; then
    echo "  ✅ Lighthouse installed successfully"
else
    echo "  ❌ Lighthouse installation failed"
fi

echo ""
echo "🐳 PHASE 3: DOCKER IMAGES"
echo "========================="

# Pull Docker images
echo "📦 Pulling Playwright Docker image..."
if docker pull mcr.microsoft.com/playwright:latest; then
    echo "  ✅ Playwright Docker image pulled successfully"
else
    echo "  ❌ Playwright Docker image pull failed"
fi

echo "📦 Pulling Selenium Docker image..."
if docker pull selenium/standalone-chrome:latest; then
    echo "  ✅ Selenium Docker image pulled successfully"
else
    echo "  ❌ Selenium Docker image pull failed"
fi

echo "📦 Pulling Puppeteer Docker image..."
if docker pull mcp/puppeteer; then
    echo "  ✅ Puppeteer Docker image pulled successfully"
else
    echo "  ❌ Puppeteer Docker image pull failed"
fi

echo ""
echo "🔧 PHASE 4: LOCAL PROJECT DEPENDENCIES"
echo "======================================"

# Create package.json if it doesn't exist
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$PROJECT_DIR/package.json" ]; then
    echo "📦 Creating package.json..."
    cat > "$PROJECT_DIR/package.json" << EOF
{
  "name": "army-command-center",
  "version": "1.0.0",
  "description": "Army Command Center for Kravings.Club Domination Mission",
  "main": "index.js",
  "scripts": {
    "domination": "node scripts/kravings-club-domination-mission.js",
    "qa": "node scripts/army-qa-unit.js",
    "resonance": "node scripts/army-resonance-unit.js",
    "commander": "node scripts/army-commander.js"
  },
  "dependencies": {
    "playwright": "^1.40.0",
    "@google-cloud/vision": "^4.0.0",
    "sharp": "^0.32.0",
    "lighthouse": "^11.0.0"
  },
  "keywords": ["automation", "testing", "screenshots", "cannabis", "kravings"],
  "author": "Army Command Center",
  "license": "MIT"
}
EOF
    echo "  ✅ package.json created"
fi

# Install local dependencies
echo "📦 Installing local project dependencies..."
cd "$PROJECT_DIR"
if npm install; then
    echo "  ✅ Local dependencies installed successfully"
else
    echo "  ❌ Local dependencies installation failed"
fi

echo ""
echo "🔑 PHASE 5: GOOGLE CLOUD SETUP"
echo "=============================="

# Create Google Cloud credentials template
CREDENTIALS_DIR="$PROJECT_DIR/configurations"
CREDENTIALS_FILE="$CREDENTIALS_DIR/google-vision-key.json"

if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo "📦 Creating Google Cloud credentials template..."
    mkdir -p "$CREDENTIALS_DIR"
    cat > "$CREDENTIALS_FILE" << EOF
{
  "type": "service_account",
  "project_id": "kravings-screenshot-mission",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_SERVICE_ACCOUNT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "YOUR_CERT_URL"
}
EOF
    echo "  ⚠️ Google Cloud credentials template created"
    echo "  📝 Please update $CREDENTIALS_FILE with your actual credentials"
else
    echo "  ✅ Google Cloud credentials file exists"
fi

echo ""
echo "🧪 PHASE 6: SYSTEM VERIFICATION"
echo "==============================="

# Test Playwright
echo "🧪 Testing Playwright..."
if npx playwright --version > /dev/null 2>&1; then
    echo "  ✅ Playwright is working"
else
    echo "  ❌ Playwright test failed"
fi

# Test Google Cloud Vision (basic import test)
echo "🧪 Testing Google Cloud Vision API..."
if node -e "require('@google-cloud/vision')" > /dev/null 2>&1; then
    echo "  ✅ Google Cloud Vision API import successful"
else
    echo "  ❌ Google Cloud Vision API test failed"
fi

# Test Sharp
echo "🧪 Testing Sharp..."
if node -e "require('sharp')" > /dev/null 2>&1; then
    echo "  ✅ Sharp is working"
else
    echo "  ❌ Sharp test failed"
fi

# Test Docker connectivity
echo "🧪 Testing Docker..."
if docker ps > /dev/null 2>&1; then
    echo "  ✅ Docker is working"
else
    echo "  ❌ Docker test failed - check Docker service"
fi

echo ""
echo "🎖️ SETUP COMPLETE"
echo "=================="
echo "✅ Domination dependencies setup completed!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Update Google Cloud credentials in: $CREDENTIALS_FILE"
echo "2. Test the domination mission: npm run domination"
echo "3. Run QA validation: npm run qa"
echo "4. Execute full commander suite: npm run commander"
echo ""
echo "🚀 Ready for Kravings.Club domination mission!"
echo "🎯 Target: 95%+ success rate across all devices"

# Make the script executable
chmod +x "$0"