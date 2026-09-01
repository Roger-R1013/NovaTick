import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { View, StyleSheet, Platform } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={styles.root}>
      <View style={styles.mobileFrame}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000', // Deepest black for the outer background
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFrame: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 420 : '100%',
    maxHeight: Platform.OS === 'web' ? 900 : '100%',
    backgroundColor: '#050507',
    // Luxury gold frame styles for web/desktop
    ...(Platform.OS === 'web' && {
      borderRadius: 32,
      borderWidth: 1,
      borderColor: '#D4AF37',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(212, 175, 55, 0.15)',
      marginVertical: 20,
    }),
  }
});
