import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
// import PlayerControls from '../components/PlayerControls'; // Temporarily disabled

const LiveRadioScreen = () => {
  const { colors, isDarkMode } = useTheme();

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York',
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York',
    });
  };

  const todaySchedule = [
    {
      time: '6:00 AM - 9:00 AM',
      show: 'మార్నింగ్ మెలోడీస్',
      description: 'Classical & Devotional songs to start your day',
      host: 'RJ Priya',
      status: 'upcoming',
      icon: 'sunny',
    },
    {
      time: '9:00 AM - 12:00 PM',
      show: 'Telugu Hits Express',
      description: 'Latest Telugu cinema songs and chartbusters',
      host: 'RJ Kiran',
      status: 'live',
      icon: 'musical-notes',
    },
    {
      time: '12:00 PM - 1:00 PM',
      show: 'తెలుగు టాక్ షో',
      description: 'Interactive discussions and listener calls',
      host: 'RJ Ramesh',
      status: 'upcoming',
      icon: 'mic',
    },
    {
      time: '1:00 PM - 4:00 PM',
      show: 'Afternoon Melodies',
      description: 'Soothing Telugu songs for your afternoon',
      host: 'RJ Swathi',
      status: 'upcoming',
      icon: 'partly-sunny',
    },
    {
      time: '4:00 PM - 6:00 PM',
      show: 'Request Hour',
      description: 'Your favorite songs on request',
      host: 'RJ Suresh',
      status: 'upcoming',
      icon: 'radio',
    },
    {
      time: '6:00 PM - 8:00 PM',
      show: 'Evening Express',
      description: 'Telugu folk and traditional songs',
      host: 'RJ Lakshmi',
      status: 'upcoming',
      icon: 'musical-notes',
    },
    {
      time: '8:00 PM - 11:00 PM',
      show: 'రాత్రి రాగం',
      description: 'Romantic melodies for the evening',
      host: 'RJ Arjun',
      status: 'upcoming',
      icon: 'moon',
    },
    {
      time: '11:00 PM - 6:00 AM',
      show: 'Overnight Mix',
      description: 'Continuous music mix for night owls',
      host: 'Auto DJ',
      status: 'upcoming',
      icon: 'moon',
    },
  ];

  const contactInfo = [
    { label: 'WhatsApp', value: '+91-9705222005', type: 'whatsapp' },
    { label: 'Call (USA)', value: '+1-9197012005', type: 'phone' },
    { label: 'Skype', value: 'telugunriradio', type: 'skype' },
  ];

  const handleContactPress = (item) => {
    let url = '';
    switch (item.type) {
      case 'whatsapp':
        url = `whatsapp://send?phone=${item.value}`;
        break;
      case 'phone':
        url = `tel:${item.value}`;
        break;
      case 'skype':
        url = `skype:${item.value}?chat`;
        break;
      default:
        return;
    }
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={
            isDarkMode
              ? ['#1f2937', '#111827']
              : ['#fef3c7', '#fed7aa']
          }
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Live Radio Schedule
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              {getCurrentDate()}
            </Text>
            <Text style={[styles.headerTime, { color: colors.brand.orange }]}>
              {getCurrentTime()} EST
            </Text>
          </View>
        </LinearGradient>

        {/* Player Controls */}
        <View
          style={[
            styles.playerSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.playerTitle, { color: colors.text }]}>
            Audio Player Coming Soon!
          </Text>
          <Text style={[styles.playerDescription, { color: colors.textSecondary }]}>
            Full audio streaming will be available in the next update.
          </Text>
        </View>

        {/* Schedule Section */}
        <View
          style={[
            styles.scheduleSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="time" size={24} color={colors.brand.orange} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Today's Schedule
            </Text>
          </View>

          {todaySchedule.map((show, index) => (
            <View
              key={index}
              style={[
                styles.scheduleItem,
                {
                  backgroundColor: show.status === 'live' 
                    ? 'rgba(34, 197, 94, 0.1)' 
                    : colors.surface,
                  borderColor: show.status === 'live' 
                    ? '#22c55e' 
                    : colors.border,
                  borderWidth: show.status === 'live' ? 2 : 1,
                },
              ]}
            >
              <View style={styles.scheduleIconContainer}>
                <Ionicons
                  name={show.icon}
                  size={24}
                  color={colors.brand.orange}
                />
              </View>
              
              <View style={styles.scheduleContent}>
                <View style={styles.scheduleHeader}>
                  <Text style={[styles.showTitle, { color: colors.text }]}>
                    {show.show}
                  </Text>
                  {show.status === 'live' && (
                    <View style={styles.liveBadge}>
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>
                
                <Text style={[styles.showDescription, { color: colors.textSecondary }]}>
                  {show.description}
                </Text>
                
                <View style={styles.scheduleFooter}>
                  <View style={styles.hostInfo}>
                    <Ionicons name="person" size={12} color={colors.textMuted} />
                    <Text style={[styles.hostText, { color: colors.textMuted }]}>
                      {show.host}
                    </Text>
                  </View>
                  <View style={styles.timeInfo}>
                    <Ionicons name="time" size={12} color={colors.textMuted} />
                    <Text style={[styles.timeText, { color: colors.textMuted }]}>
                      {show.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View
          style={[
            styles.contactSection,
            { 
              backgroundColor: isDarkMode ? 'rgba(251, 146, 60, 0.1)' : 'rgba(251, 146, 60, 0.1)',
              borderColor: colors.brand.orange + '40',
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="call" size={24} color={colors.brand.orange} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Request a Song or Join the Show
            </Text>
          </View>

          <View style={styles.contactGrid}>
            {contactInfo.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contactItem,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
                onPress={() => handleContactPress(contact)}
              >
                <Ionicons
                  name={contact.type === 'whatsapp' ? 'logo-whatsapp' : 
                        contact.type === 'phone' ? 'call' : 'logo-skype'}
                  size={20}
                  color={colors.brand.orange}
                />
                <View style={styles.contactTextContainer}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                    {contact.label}
                  </Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>
                    {contact.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingBottom: 100,
  },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  headerTime: {
    fontSize: 18,
    fontWeight: '600',
  },
  playerSection: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playerDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  scheduleSection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  scheduleIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  showTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  liveBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  showDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  scheduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostText: {
    fontSize: 12,
    marginLeft: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  contactSection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  contactGrid: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  contactTextContainer: {
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LiveRadioScreen;
