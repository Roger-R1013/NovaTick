import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ScannerScreen } from '../screens/ScannerScreen';
import { MyTicketScreen } from '../screens/MyTicketScreen';
import { AttendeesScreen } from '../screens/AttendeesScreen';
import { Theme } from '../components/Theme';
import { LayoutDashboard, ScanLine, QrCode, Users } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Theme.colors.card,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTintColor: Theme.colors.text,
          tabBarStyle: {
            backgroundColor: Theme.colors.card,
            borderTopColor: Theme.colors.border,
            borderTopWidth: 1,
            elevation: 0,
          },
          tabBarActiveTintColor: Theme.colors.primary,
          tabBarInactiveTintColor: Theme.colors.textMuted,
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="MyTicket" 
          component={MyTicketScreen} 
          options={{
            title: 'Mi Entrada',
            tabBarIcon: ({ color, size }) => <QrCode color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Attendees" 
          component={AttendeesScreen} 
          options={{
            title: 'Asistentes',
            tabBarIcon: ({ color, size }) => <Users color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
