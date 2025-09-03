const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Disable static rendering for web
if (process.env.EXPO_USE_STATIC === 'true') {
  process.env.EXPO_USE_STATIC = 'false';
}

module.exports = config;
