import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Theme } from '../components/Theme';
import { useStore } from '../services/store';

export const MyTicketScreen = () => {
  const { tickets } = useStore();
  const myTicket = tickets.find(t => t.id === 't3');
  
  const [opacity] = useState(new Animated.Value(0.4));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 1000, useNativeDriver: true })
      ])
    ).start();
  }, [opacity]);

  if (!myTicket) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mi Entrada</Text>
        <Text style={styles.subtitle}>{myTicket.attendeeName}</Text>
        
        <View style={styles.qrContainer}>
          <Animated.View style={[styles.qrWrapper, { borderColor: opacity.interpolate({
            inputRange: [0.4, 1],
            outputRange: [Theme.colors.primaryDark, Theme.colors.primary]
          }) }]}>
            <QRCode 
              value={myTicket.hash}
              size={200}
              color={Theme.colors.background}
              backgroundColor={Theme.colors.text}
            />
          </Animated.View>
          <Text style={styles.statusText}>
            Estado: {myTicket.status === 'scanned' ? '✅ Usada' : '⏳ Válida'}
          </Text>
        </View>
        <Text style={styles.warning}>
          Los códigos QR son dinámicos y se actualizan constantemente para prevenir capturas de pantalla.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.background },
  container: { flex: 1, alignItems: 'center', padding: Theme.spacing.l, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: Theme.colors.text },
  subtitle: { fontSize: 18, color: Theme.colors.info, marginTop: 8 },
  qrContainer: { 
    marginTop: 40, 
    padding: Theme.spacing.l, 
    backgroundColor: Theme.colors.card, 
    borderRadius: Theme.borderRadius.l,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border
  },
  qrWrapper: {
    padding: 10,
    backgroundColor: Theme.colors.text,
    borderWidth: 4,
    borderRadius: 8,
  },
  statusText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.text
  },
  warning: {
    marginTop: 40,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    fontSize: 12,
    paddingHorizontal: 20
  }
});
