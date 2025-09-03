import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LiveRadioScreen from '../screens/LiveRadioScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import NewsScreen from '../screens/NewsScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: '#ff6b35',
          tabBarInactiveTintColor: '#666',
          headerShown: false, // Disable headers completely
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Live Radio" component={LiveRadioScreen} />
        <Tab.Screen name="Programs" component={ProgramsScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
