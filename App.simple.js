import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Telugu NRI Radio - Test</Text>
      <Text style={styles.subtext}>If you can see this, the app is working!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
