import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useTheme } from '../contexts/ThemeContext';
import { usePlayer } from '../contexts/PlayerContext';

const { width } = Dimensions.get('window');

const PlayerControls = () => {
  const { theme, colors } = useTheme();
  const {
    isLoading,
    hasError,
    isPlaying,
    volume,
    isMuted,
    handlePlay,
    handlePause,
    handleRetry,
    handleVolumeChange,
    toggleMute,
  } = usePlayer();

  const [showVolumeModal, setShowVolumeModal] = useState(false);

  const getVolumeIconName = () => {
    if (isMuted || volume === 0) return 'volume-mute';
    if (volume < 0.5) return 'volume-low';
    return 'volume-high';
  };

  const renderPlayButton = () => {
    if (isLoading) {
      return (
        <TouchableOpacity style={[styles.playButton, { backgroundColor: colors.button.primary }]} disabled>
          <ActivityIndicator size="small" color={colors.button.primaryText} />
          <Text style={[styles.buttonText, { color: colors.button.primaryText }]}>
            Connecting...
          </Text>
        </TouchableOpacity>
      );
    }

    if (hasError) {
      return (
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: '#ef4444' }]}
          onPress={handleRetry}
        >
          <Ionicons name="warning" size={16} color="white" />
          <Text style={[styles.buttonText, { color: 'white' }]}>Retry</Text>
        </TouchableOpacity>
      );
    }

    if (isPlaying) {
      return (
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: '#ef4444' }]}
          onPress={handlePause}
        >
          <Ionicons name="pause" size={16} color="white" />
          <Text style={[styles.buttonText, { color: 'white' }]}>Stop</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: colors.button.primary }]}
        onPress={handlePlay}
      >
        <Ionicons name="play" size={16} color={colors.button.primaryText} />
        <Text style={[styles.buttonText, { color: colors.button.primaryText }]}>
          Play
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Status Indicator */}
      {isPlaying && (
        <View style={styles.statusContainer}>
          <View style={[styles.liveIndicator, { backgroundColor: '#22c55e' }]} />
          <Text style={[styles.statusText, { color: '#22c55e' }]}>Live</Text>
        </View>
      )}

      {/* Play/Pause Button */}
      {renderPlayButton()}

      {/* Volume Button */}
      <TouchableOpacity
        style={[styles.volumeButton, { backgroundColor: colors.button.secondary }]}
        onPress={() => setShowVolumeModal(true)}
      >
        <Ionicons
          name={getVolumeIconName()}
          size={20}
          color={colors.button.secondaryText}
        />
      </TouchableOpacity>

      {/* Volume Modal */}
      <Modal
        visible={showVolumeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVolumeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVolumeModal(false)}
        >
          <View style={[styles.volumeModal, { backgroundColor: colors.card }]}>
            <Text style={[styles.volumeTitle, { color: colors.text }]}>
              Volume Control
            </Text>
            
            <View style={styles.volumeContainer}>
              <Text style={[styles.volumeText, { color: colors.textSecondary }]}>
                {Math.round(volume * 100)}%
              </Text>
              
              <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={handleVolumeChange}
                minimumTrackTintColor={colors.brand.orange}
                maximumTrackTintColor={colors.border}
                thumbStyle={{ backgroundColor: colors.brand.orange }}
                trackStyle={{ height: 4, borderRadius: 2 }}
              />
              
              <View style={styles.volumeButtons}>
                <TouchableOpacity
                  style={[styles.volumePresetButton, { backgroundColor: colors.button.secondary }]}
                  onPress={() => handleVolumeChange(0.25)}
                >
                  <Text style={[styles.volumePresetText, { color: colors.button.secondaryText }]}>
                    25%
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.volumePresetButton, { backgroundColor: colors.button.secondary }]}
                  onPress={() => handleVolumeChange(0.5)}
                >
                  <Text style={[styles.volumePresetText, { color: colors.button.secondaryText }]}>
                    50%
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.volumePresetButton, { backgroundColor: colors.button.secondary }]}
                  onPress={() => handleVolumeChange(0.75)}
                >
                  <Text style={[styles.volumePresetText, { color: colors.button.secondaryText }]}>
                    75%
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.volumePresetButton, { backgroundColor: colors.button.secondary }]}
                  onPress={() => handleVolumeChange(1.0)}
                >
                  <Text style={[styles.volumePresetText, { color: colors.button.secondaryText }]}>
                    100%
                  </Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={[styles.muteButton, { backgroundColor: isMuted ? '#ef4444' : colors.button.secondary }]}
                onPress={toggleMute}
              >
                <Ionicons
                  name={isMuted ? 'volume-mute' : 'volume-high'}
                  size={20}
                  color="white"
                />
                <Text style={[styles.buttonText, { color: 'white' }]}>
                  {isMuted ? 'Unmute' : 'Mute'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.brand.orange }]}
              onPress={() => setShowVolumeModal(false)}
            >
              <Text style={[styles.closeButtonText, { color: 'white' }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  volumeButton: {
    padding: 8,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeModal: {
    width: width * 0.8,
    maxWidth: 300,
    padding: 20,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  volumeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  volumeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  volumeSlider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  volumeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  volumePresetButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  volumePresetText: {
    fontSize: 12,
    fontWeight: '500',
  },
  muteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PlayerControls;
