import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1.0);
  const soundRef = useRef(null);
  
  // Stream URLs - same as web version
  const streamUrls = [
    'https://cast5.asurahosting.com:2199/proxy/telugunr?mp=/stream',
    'http://cast5.asurahosting.com:2199/proxy/telugunr?mp=/stream',
    'https://cast5.asurahosting.com:2199/stream/telugunr',
    'http://cast5.asurahosting.com:2199/stream/telugunr',
    'https://cast5.asurahosting.com:2199/proxy/telugunr/;stream/1',
    'http://cast5.asurahosting.com:2199/proxy/telugunr/;stream/1',
    'https://cast5.asurahosting.com:2199/telugunr',
    'http://cast5.asurahosting.com:2199/telugunr',
    'https://cast5.asurahosting.com:2199/telugunr.mp3',
    'http://cast5.asurahosting.com:2199/telugunr.mp3'
  ];
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  // Initialize audio settings
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Set audio mode for streaming
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
      } catch (error) {
        console.error('Failed to set audio mode:', error);
      }
    };

    initializeAudio();

    // Cleanup function
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const tryNextUrl = () => {
    if (currentUrlIndex < streamUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
      return true;
    }
    return false;
  };

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      console.log(`Attempting to play stream URL ${currentUrlIndex + 1}/${streamUrls.length}:`, streamUrls[currentUrlIndex]);
      
      // Unload previous sound if exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Create new sound instance
      const { sound } = await Audio.Sound.createAsync(
        { uri: streamUrls[currentUrlIndex] },
        { 
          shouldPlay: true,
          volume: volume,
          isMuted: isMuted,
          isLooping: false,
        },
        (status) => {
          // Status update callback
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            setIsLoading(status.isBuffering);
            
            if (status.error) {
              console.error('Audio playback error:', status.error);
              handleError(status.error);
            }
          } else if (status.error) {
            console.error('Audio loading error:', status.error);
            handleError(status.error);
          }
        }
      );
      
      soundRef.current = sound;
      setIsPlaying(true);
      setIsLoading(false);
      console.log('Stream started successfully');
      
    } catch (error) {
      console.error('Error playing audio:', error);
      
      // Try next URL if available
      if (tryNextUrl()) {
        console.log(`Trying next URL in 2 seconds...`);
        setTimeout(() => handlePlay(), 2000);
        return;
      }
      
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
      console.log('All stream URLs failed');
    }
  };

  const handlePause = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };

  const handleStop = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  const handleError = (error) => {
    console.error('Audio error:', error);
    setIsLoading(false);
    setIsPlaying(false);
    
    // Try next URL if available
    if (tryNextUrl()) {
      console.log(`Trying fallback URL ${currentUrlIndex + 1}:`, streamUrls[currentUrlIndex + 1]);
      setTimeout(() => handlePlay(), 2000);
    } else {
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setCurrentUrlIndex(0); // Reset to first URL
    setHasError(false);
    handlePlay();
  };

  const handleVolumeChange = async (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    setIsMuted(clampedVolume === 0);
    
    try {
      if (soundRef.current) {
        await soundRef.current.setVolumeAsync(clampedVolume);
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
    
    // Store non-zero volume as previous volume for unmute
    if (clampedVolume > 0) {
      setPreviousVolume(clampedVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      const volumeToRestore = previousVolume > 0 ? previousVolume : 0.5;
      handleVolumeChange(volumeToRestore);
    } else {
      // Mute: set volume to 0
      setPreviousVolume(volume);
      handleVolumeChange(0);
    }
  };

  const value = {
    isLoading,
    hasError,
    isPlaying,
    volume,
    isMuted,
    soundRef,
    handlePlay,
    handlePause,
    handleStop,
    handleError,
    handleRetry,
    handleVolumeChange,
    toggleMute,
    setIsLoading,
    setIsPlaying,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
