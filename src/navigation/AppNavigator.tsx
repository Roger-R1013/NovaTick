import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ScannerScreen } from '../screens/ScannerScreen';
import { MyTicketScreen } from '../screens/MyTicketScreen';
import { AttendeesScreen } from '../screens/AttendeesScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { Theme } from '../components/Theme';
import { LayoutDashboard, ScanLine, QrCode, Users, Calendar, Clock, LogOut } from 'lucide-react-native';
import { useStore } from '../services/store';

const Tab = createBottomTabNavigator();

const commonTabOptions = {
  headerStyle: { backgroundColor: Theme.colors.card, shadowColor: 'transparent', borderBottomWidth: 0, elevation: 0 },
  headerTintColor: Theme.colors.text,
  tabBarStyle: { backgroundColor: Theme.colors.card, borderTopColor: Theme.colors.border, borderTopWidth: 1, elevation: 0 },
  tabBarActiveTintColor: Theme.colors.primary,
  tabBarInactiveTintColor: Theme.colors.textMuted,
};

const HeaderLogout = () => {
  const logout = useStore(state => state.logout);
  return (
    <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
      <LogOut color={Theme.colors.danger} size={24} />
    </TouchableOpacity>
  );
}

const AdminTabs = () => (
  <Tab.Navigator screenOptions={{ ...commonTabOptions, headerRight: () => <HeaderLogout /> }}>
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} /> }} />
    <Tab.Screen name="Scanner" component={ScannerScreen} options={{ tabBarIcon: ({ color, size }) => <ScanLine color={color} size={size} /> }} />
    <Tab.Screen name="Attendees" component={AttendeesScreen} options={{ title: 'Asistentes', tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> }} />
  </Tab.Navigator>
);

const AttendeeTabs = () => (
  <Tab.Navigator screenOptions={{ ...commonTabOptions, headerRight: () => <HeaderLogout /> }}>
    <Tab.Screen name="MyTicket" component={MyTicketScreen} options={{ title: 'Mi Entrada', tabBarIcon: ({ color, size }) => <QrCode color={color} size={size} /> }} />
    <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Eventos', tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }} />
    <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historial', tabBarIcon: ({ color, size }) => <Clock color={color} size={size} /> }} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const userRole = useStore(state => state.userRole);

  return (
    <NavigationContainer>
      {!userRole ? (
        <LoginScreen />
      ) : userRole === 'admin' ? (
        <AdminTabs />
      ) : (
        <AttendeeTabs />
      )}
    </NavigationContainer>
  );
};
