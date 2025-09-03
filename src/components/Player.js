import React, { useEffect } from 'react';
import { View } from 'react-native';
import { usePlayer } from '../contexts/PlayerContext';

const Player = () => {
  const {
    soundRef,
    volume,
    handleError,
    setIsLoading,
    setIsPlaying,
  } = usePlayer();

  // This component manages the audio state but doesn't render any UI
  // The actual audio is handled by expo-av in the PlayerContext
  
  useEffect(() => {
    // Any additional audio setup can go here
    console.log('Player component mounted');
    
    return () => {
      console.log('Player component unmounted');
      // Cleanup is handled in PlayerContext
    };
  }, []);

  // This component doesn't render anything visible
  // All audio management is done through expo-av in the context
  return <View style={{ display: 'none' }} />;
};

export default Player;
