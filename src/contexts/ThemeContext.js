import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load saved theme preference or use system default
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          // Default to system preference
          const systemTheme = Appearance.getColorScheme();
          setIsDarkMode(systemTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
        setIsDarkMode(true); // Default to dark
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem('theme').then(savedTheme => {
        if (!savedTheme) {
          setIsDarkMode(colorScheme === 'dark');
        }
      });
    });

    return () => subscription?.remove();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  // Color definitions
  const colors = {
    brand: {
      orange: '#ff6b35',
      cream: '#fff8dc',
      yellow: '#ffd700',
      amber: '#ff8c00',
      gold: '#daa520',
      blue: '#4a90e2',
      purple: '#8e44ad',
    },
    dark: {
      background: '#0f0f0f',
      surface: '#1a1a1a',
      card: '#2d2d2d',
      border: '#404040',
      text: '#ffffff',
      textSecondary: '#d0d0d0',
      textMuted: '#a0a0a0',
      accent: '#ff6b35',
    },
    light: {
      background: '#fbecc1',
      surface: '#ffffff',
      card: '#f9f9f9',
      border: '#e0e0e0',
      text: '#1f1f1f',
      textSecondary: '#4a4a4a',
      textMuted: '#6a6a6a',
      accent: '#ff8c00',
    }
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const theme = {
    isDarkMode,
    colors: {
      ...colors,
      ...currentColors,
      primary: currentColors.accent,
      background: currentColors.background,
      surface: currentColors.surface,
      card: currentColors.card,
      border: currentColors.border,
      text: currentColors.text,
      textSecondary: currentColors.textSecondary,
      textMuted: currentColors.textMuted,
      // Player specific colors
      player: {
        background: isDarkMode ? '#2d2d2d' : '#ffffff',
        border: isDarkMode ? '#404040' : '#e0e0e0',
        text: currentColors.text,
        textMuted: currentColors.textMuted,
      },
      // Button colors
      button: {
        primary: colors.brand.orange,
        primaryText: '#ffffff',
        secondary: isDarkMode ? '#404040' : '#f0f0f0',
        secondaryText: currentColors.text,
      }
    }
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
    colors: theme.colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
