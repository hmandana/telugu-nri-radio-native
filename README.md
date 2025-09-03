# Telugu NRI Radio - React Native App

A React Native mobile application for Telugu NRI Radio, bringing live Telugu radio streaming, program schedules, and community features to your mobile device.

## Features

- 🎵 **Live Audio Streaming** - 24/7 Telugu radio with high-quality audio using Expo AV
- 📱 **Cross-platform** - Works on both iOS and Android devices
- 🎨 **Dark/Light Themes** - Automatic theme switching based on system preference
- 📻 **Program Schedule** - View daily radio program listings with live indicators
- 🎛️ **Player Controls** - Play/pause, volume control, and retry functionality
- 📞 **Contact Integration** - Direct links to WhatsApp, phone, and Skype
- 🌐 **Social Media Links** - Connect to Facebook, Twitter, and YouTube
- 📱 **Responsive Design** - Optimized for phones and tablets

## Technology Stack

- **React Native** with Expo SDK 53
- **Expo AV** for audio streaming
- **React Navigation** for navigation
- **Expo Linear Gradient** for beautiful UI elements
- **AsyncStorage** for local data persistence
- **React Native Safe Area Context** for proper device handling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Player.js           # Hidden audio player
│   └── PlayerControls.js   # Play/pause/volume controls
├── contexts/           # React context providers
│   ├── ThemeContext.js     # Theme management
│   └── PlayerContext.js    # Audio player state
├── navigation/         # Navigation setup
│   └── AppNavigator.js     # Tab and stack navigation
├── screens/           # App screens
│   ├── HomeScreen.js       # Welcome screen with features
│   ├── LiveRadioScreen.js  # Schedule and live streaming
│   ├── ProgramsScreen.js   # Program listings
│   ├── NewsScreen.js       # News updates
│   ├── AboutScreen.js      # About the radio station
│   └── ContactScreen.js    # Contact information
└── assets/            # Images and media files
```

## Installation

### Prerequisites
- Node.js (v18 or later)
- Expo CLI installed globally: `npm install -g @expo/cli`
- iOS Simulator (Mac) or Android Studio (for Android emulation)

### Setup

1. **Clone and navigate to the project:**
   ```bash
   cd telugu-nri-radio-native
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on devices:**
   - **iOS Simulator:** Press `i` in the terminal
   - **Android Emulator:** Press `a` in the terminal
   - **Physical Device:** Scan the QR code with Expo Go app

## Key Features Implemented

### Audio Streaming
- Uses Expo AV for reliable audio streaming
- Multiple fallback stream URLs for reliability
- Background audio support
- Volume controls with presets
- Live status indicators

### UI/UX
- Consistent theming system with dark/light mode support
- Smooth animations and transitions
- Responsive design for different screen sizes
- Native-feeling navigation with bottom tabs

### Navigation
- Bottom tab navigation for main sections
- Stack navigation for detailed views
- Proper header styling and theming

### Contact Integration
- Direct dialing with tel: links
- WhatsApp integration with whatsapp: links
- Skype integration for international users
- Email mailto: links

## Development Notes

### Audio Streaming
The app uses multiple stream URLs as fallbacks to ensure reliability:
- Primary HTTPS streams
- HTTP fallbacks
- Multiple format options (mp3, stream)

### Theme System
The theme context provides:
- Automatic dark/light mode detection
- Consistent color schemes
- Smooth theme transitions
- Persistent theme preferences

### State Management
- React Context for global state (theme, audio player)
- AsyncStorage for persistent data
- Proper cleanup and memory management

## Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

## Customization

### Changing Stream URLs
Edit the `streamUrls` array in `src/contexts/PlayerContext.js`:

```javascript
const streamUrls = [
  'your-stream-url-here',
  // Add fallback URLs
];
```

### Updating Colors
Modify the theme colors in `src/contexts/ThemeContext.js`:

```javascript
const colors = {
  brand: {
    orange: '#ff6b35', // Change primary brand color
    // ... other colors
  }
};
```

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.js`
3. Update tab bar icons if needed

## Common Issues

### Audio Not Playing
- Check network connection
- Verify stream URLs are accessible
- Check device audio permissions

### Navigation Issues
- Ensure all screen components are properly exported
- Check navigation prop passing

### Theme Not Applying
- Verify ThemeProvider wraps the entire app
- Check AsyncStorage permissions

## Contributing

This app was built to mirror the functionality of the original Telugu NRI Radio web application while providing a native mobile experience. The component structure and styling closely follow the web version for consistency.

## License

© 2025 HMV Entertainment. All rights reserved.

---

**Telugu NRI Radio** - ప్రవాసాంధ్రుల గుండె చప్పుడు - Connecting Telugu hearts worldwide
