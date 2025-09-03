import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LiveRadioScreen from '../screens/LiveRadioScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import NewsScreen from '../screens/NewsScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Live Radio':
              iconName = focused ? 'radio' : 'radio-outline';
              break;
            case 'Programs':
              iconName = focused ? 'mic' : 'mic-outline';
              break;
            case 'News':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'About':
              iconName = focused ? 'information-circle' : 'information-circle-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.brand.orange,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Live Radio" 
        component={LiveRadioScreen}
        options={{ title: 'Live Radio' }}
      />
      <Tab.Screen 
        name="Programs" 
        component={ProgramsScreen}
        options={{ title: 'Programs' }}
      />
      <Tab.Screen 
        name="News" 
        component={NewsScreen}
        options={{ title: 'News' }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDarkMode,
        colors: {
          primary: colors.brand.orange,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.brand.orange,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen}
          options={{
            headerShown: true,
            title: 'Contact Us',
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.text,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
