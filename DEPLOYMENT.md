# GitHub Pages Deployment Guide

This guide explains how to deploy the Telugu NRI Radio app to GitHub Pages.

## 🚀 Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Deploy automatically:**
   - Push changes to the `main` or `master` branch
   - The GitHub Actions workflow will automatically build and deploy your app
   - Your app will be available at: `https://yourusername.github.io/telugu-nri-radio-native`

3. **Manual trigger:**
   - Go to the "Actions" tab in your repository
   - Click on "Deploy to GitHub Pages" workflow
   - Click "Run workflow" button
   - Select the branch and click "Run workflow"

## 🛠️ Manual Deployment

If you prefer to deploy manually, you can use the deployment script:

```bash
# Make the script executable (if not already)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

Or run the build command directly:

```bash
# Install dependencies
npm install

# Build for web
npm run build:web
```

## 📁 Project Structure

After building, the following structure is created:

```
dist/                  # Built web application
├── index.html        # Main HTML file
├── static/           # Static assets
│   ├── js/          # JavaScript bundles
│   ├── css/         # Stylesheets
│   └── media/       # Images and other media
└── ...
```

## 🔧 Configuration Details

### Package.json Scripts

- `build:web` - Builds the Expo app for web deployment
- `deploy` - Alias for build:web
- `predeploy` - Runs before deployment

### App.json Web Configuration

The `web` section in `app.json` includes:

```json
{
  "web": {
    "favicon": "./assets/favicon.png",
    "name": "Telugu NRI Radio",
    "shortName": "TNR Radio",
    "themeColor": "#ff6b35",
    "backgroundColor": "#ff6b35",
    "display": "standalone",
    "bundler": "metro",
    "output": "static",
    "template": "./web/index.html",
    "build": {
      "babel": {
        "include": ["@expo/vector-icons"]
      }
    }
  }
}
```

### Custom Web Template

The app uses a custom HTML template (`web/index.html`) that includes:

- **Proper document title**: "Telugu NRI Radio - Listen to Telugu Music Online"
- **App logo and favicon**: Uses your app icon and favicon
- **Loading screen**: Beautiful loading animation with your app logo
- **SEO optimization**: Meta tags for search engines and social media
- **PWA support**: Web app manifest for "Add to Home Screen" functionality
- **Brand theming**: Your app's orange theme (#ff6b35) throughout

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) automatically:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the web application
5. Deploys to GitHub Pages

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the repository settings in GitHub

## 🐛 Troubleshooting

### Common Issues

**Build fails with dependency errors:**
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npm start -- --clear`

**App doesn't load on GitHub Pages:**
- Check that GitHub Pages is enabled in repository settings
- Verify the workflow completed successfully in the Actions tab
- Ensure the source is set to "GitHub Actions"

**Assets not loading:**
- Verify asset paths are correct
- Check that assets exist in the `assets` folder
- Ensure `assetBundlePatterns` includes your assets

**Audio not working:**
- Note that some browsers require user interaction before playing audio
- Ensure your audio sources support HTTPS
- Check browser console for CORS errors

### Getting Help

If you encounter issues:

1. Check the GitHub Actions logs in the "Actions" tab
2. Verify your app works locally with `npm run web`
3. Check the browser console for errors
4. Ensure all required assets are present

## 📊 Monitoring Deployment

### GitHub Actions Status

- Green checkmark: Deployment successful
- Red X: Deployment failed (check logs)
- Yellow circle: Deployment in progress

### Accessing Your Deployed App

Your app will be available at:
- `https://yourusername.github.io/telugu-nri-radio-native`
- Replace `yourusername` with your actual GitHub username

## 🔄 Updating Your Deployment

To update your live app:

1. Make changes to your code
2. Commit and push to the main branch
3. GitHub Actions will automatically rebuild and redeploy
4. Changes will be live within a few minutes

## 📱 Mobile Considerations

While this deploys the web version of your app:

- The app will work on mobile browsers
- For better mobile experience, users can "Add to Home Screen"
- Consider creating native apps for iOS and Android app stores using Expo's build services

---

**Happy Deploying! 🎉**

Your Telugu NRI Radio app is ready to reach listeners worldwide through GitHub Pages!
