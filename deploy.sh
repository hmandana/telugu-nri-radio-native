#!/bin/bash

# GitHub Pages Deployment Script for Telugu NRI Radio
# This script builds the Expo web app and can be used for manual deployment

set -e

echo "🚀 Starting deployment process for Telugu NRI Radio..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: This script must be run in a Git repository"
    exit 1
fi

# Check if we have uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: You have uncommitted changes. Consider committing them first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the web version
echo "🏗️  Building web application..."
npm run build:web

echo "✅ Build completed successfully!"

# Check if GitHub Actions is set up
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "🔄 GitHub Actions workflow detected."
    echo "💡 To deploy automatically:"
    echo "   1. Push your changes to the main branch"
    echo "   2. Enable GitHub Pages in your repository settings"
    echo "   3. Set the source to 'GitHub Actions'"
    echo ""
    echo "🔄 Or trigger deployment manually:"
    echo "   - Go to Actions tab in your GitHub repository"
    echo "   - Click 'Deploy to GitHub Pages' workflow"
    echo "   - Click 'Run workflow'"
else
    echo "❌ GitHub Actions workflow not found!"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo "📁 Built files are in the 'dist' directory"
