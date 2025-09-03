import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

const AppContent = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Telugu NRI Radio
      </Text>
      <Text style={[styles.subtext, { color: colors.textSecondary }]}>
        Theme Context Working! 🎉
      </Text>
      <Text style={[styles.subtext, { color: colors.textMuted }]}>
        Ready to add navigation...
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});
