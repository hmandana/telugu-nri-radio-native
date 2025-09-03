import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const { colors, isDarkMode } = useTheme();

  const features = [
    {
      icon: 'musical-notes',
      title: '24/7 Music',
      description: 'Non-stop Telugu hits from classics to contemporary',
      gradient: ['#f97316', '#ea580c'],
    },
    {
      icon: 'globe',
      title: 'Global Reach',
      description: 'Connecting Telugu communities across continents',
      gradient: ['#3b82f6', '#2563eb'],
    },
    {
      icon: 'radio',
      title: 'Live Shows',
      description: 'Interactive programs with call-ins and requests',
      gradient: ['#10b981', '#059669'],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Gradient */}
        <LinearGradient
          colors={
            isDarkMode
              ? ['#1f2937', '#111827', '#000000']
              : ['#fef3c7', '#fed7aa', '#fdba74']
          }
          style={styles.backgroundGradient}
        />

        {/* Logo and Title Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoWrapper, { backgroundColor: colors.surface }]}>
              <Ionicons name="radio" size={60} color={colors.brand.orange} />
              <View style={[styles.liveBadge, { backgroundColor: '#ef4444' }]}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Telugu NRI Radio
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            ప్రవాసాంధ్రుల గుండె చప్పుడు
          </Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            Connecting Telugu hearts worldwide through music, culture, and community
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Why Choose Us?
          </Text>
          
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                styles.featureCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <LinearGradient
                colors={feature.gradient}
                style={styles.featureIcon}
              >
                <Ionicons name={feature.icon} size={24} color="white" />
              </LinearGradient>
              
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Current Status */}
        <View
          style={[
            styles.statusSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.statusTitle, { color: colors.text }]}>
            Coming Soon
          </Text>
          <Text style={[styles.statusDescription, { color: colors.textSecondary }]}>
            Audio player will be available soon!
          </Text>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            © 2025 HMV Entertainment • Telugu NRI Radio
          </Text>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            Connecting hearts worldwide
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    position: 'relative',
  },
  liveBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    elevation: 3,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 30,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen;
