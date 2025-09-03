import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const AboutScreen = () => {
  const { colors } = useTheme();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'logo-facebook',
      url: 'https://www.facebook.com/TeluguNriRadio/',
      color: '#1877f2',
    },
    {
      name: 'Twitter/X',
      icon: 'logo-twitter',
      url: 'https://x.com/TeluguNriRadio/',
      color: '#1d9bf0',
    },
    {
      name: 'YouTube',
      icon: 'logo-youtube',
      url: 'https://www.youtube.com/channel/UCJoUiTK6OHcHK6sRuZYPPtQ',
      color: '#ff0000',
    },
  ];

  const handleSocialPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Ionicons name="radio" size={80} color={colors.brand.orange} />
          <Text style={[styles.title, { color: colors.text }]}>
            Telugu NRI Radio
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            ప్రవాసాంధ్రుల గుండె చప్పుడు
          </Text>
        </View>

        {/* Mission */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Mission</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            Telugu NRI Radio is dedicated to connecting Telugu communities worldwide through 
            authentic cultural programming, timeless music, and interactive shows that keep 
            our heritage alive across continents.
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What We Offer</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="musical-notes" size={20} color={colors.brand.orange} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                24/7 Telugu music from classics to contemporary hits
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="mic" size={20} color={colors.brand.orange} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Live interactive shows with experienced RJs
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="globe" size={20} color={colors.brand.orange} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Global reach connecting Telugu diaspora
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="heart" size={20} color={colors.brand.orange} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Cultural programs celebrating Telugu heritage
              </Text>
            </View>
          </View>
        </View>

        {/* Social Media */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Follow Us</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => handleSocialPress(social.url)}
              >
                <Ionicons name={social.icon} size={24} color="white" />
                <Text style={styles.socialText}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Get in Touch</Text>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactText, { color: colors.textSecondary }]}>
              For program suggestions, requests, or partnerships:
            </Text>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={16} color={colors.brand.orange} />
              <Text style={[styles.contactValue, { color: colors.text }]}>
                info@telugunriradio.com
              </Text>
            </View>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            © 2025 HMV Entertainment
          </Text>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            All rights reserved
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
    padding: 16,
    paddingBottom: 100,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  socialText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfo: {
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AboutScreen;
