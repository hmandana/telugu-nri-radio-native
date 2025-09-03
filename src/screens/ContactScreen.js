import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const ContactScreen = () => {
  const { colors } = useTheme();

  const contactMethods = [
    {
      title: 'WhatsApp',
      value: '+91-9705222005',
      icon: 'logo-whatsapp',
      type: 'whatsapp',
      color: '#25d366',
    },
    {
      title: 'Phone (USA)',
      value: '+1-9197012005',
      icon: 'call',
      type: 'phone',
      color: colors.brand.orange,
    },
    {
      title: 'Skype',
      value: 'telugunriradio',
      icon: 'logo-skype',
      type: 'skype',
      color: '#00aff0',
    },
    {
      title: 'Email',
      value: 'info@telugunriradio.com',
      icon: 'mail',
      type: 'email',
      color: colors.brand.orange,
    },
  ];

  const handleContact = (method) => {
    let url = '';
    switch (method.type) {
      case 'whatsapp':
        url = `whatsapp://send?phone=${method.value}`;
        break;
      case 'phone':
        url = `tel:${method.value}`;
        break;
      case 'skype':
        url = `skype:${method.value}?chat`;
        break;
      case 'email':
        url = `mailto:${method.value}`;
        break;
      default:
        return;
    }
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Ionicons name="call" size={80} color={colors.brand.orange} />
          <Text style={[styles.title, { color: colors.text }]}>Contact Us</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Get in touch with Telugu NRI Radio team
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How to Reach Us
          </Text>
          
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactMethod, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleContact(method)}
            >
              <View style={[styles.contactIcon, { backgroundColor: method.color }]}>
                <Ionicons name={method.icon} size={24} color="white" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>
                  {method.title}
                </Text>
                <Text style={[styles.contactValue, { color: colors.textSecondary }]}>
                  {method.value}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Best Times to Contact */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Best Times to Contact
          </Text>
          <View style={styles.timeSlot}>
            <Ionicons name="time" size={20} color={colors.brand.orange} />
            <View style={styles.timeInfo}>
              <Text style={[styles.timeTitle, { color: colors.text }]}>
                Live Show Hours
              </Text>
              <Text style={[styles.timeValue, { color: colors.textSecondary }]}>
                9:00 AM - 11:00 PM EST (Daily)
              </Text>
            </View>
          </View>
          
          <View style={styles.timeSlot}>
            <Ionicons name="person" size={20} color={colors.brand.orange} />
            <View style={styles.timeInfo}>
              <Text style={[styles.timeTitle, { color: colors.text }]}>
                Administration
              </Text>
              <Text style={[styles.timeValue, { color: colors.textSecondary }]}>
                10:00 AM - 6:00 PM EST (Mon-Fri)
              </Text>
            </View>
          </View>
        </View>

        {/* What We Can Help With */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What We Can Help With
          </Text>
          <View style={styles.helpList}>
            <View style={styles.helpItem}>
              <Ionicons name="musical-note" size={16} color={colors.brand.orange} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Song requests and dedications
              </Text>
            </View>
            <View style={styles.helpItem}>
              <Ionicons name="mic" size={16} color={colors.brand.orange} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Participation in live shows
              </Text>
            </View>
            <View style={styles.helpItem}>
              <Ionicons name="business" size={16} color={colors.brand.orange} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Business partnerships and advertising
              </Text>
            </View>
            <View style={styles.helpItem}>
              <Ionicons name="help-circle" size={16} color={colors.brand.orange} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Technical support and feedback
              </Text>
            </View>
            <View style={styles.helpItem}>
              <Ionicons name="calendar" size={16} color={colors.brand.orange} />
              <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                Community event promotions
              </Text>
            </View>
          </View>
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
    textAlign: 'center',
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
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 14,
  },
  helpList: {
    gap: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  helpText: {
    fontSize: 16,
    flex: 1,
  },
});

export default ContactScreen;
