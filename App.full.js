import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { PlayerProvider } from './src/contexts/PlayerContext';
import AppNavigator from './src/navigation/AppNavigator';
import Player from './src/components/Player';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PlayerProvider>
          <View style={styles.container}>
            <AppNavigator />
            <Player />
            <StatusBar style="auto" />
          </View>
        </PlayerProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
