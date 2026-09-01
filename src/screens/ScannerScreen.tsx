import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useStore } from '../services/store';
import { Theme } from '../components/Theme';
import { Button } from '../components/Button';
import * as Haptics from 'expo-haptics';

export const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const scanTicket = useStore(state => state.scanTicket);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    const result = scanTicket(data);
    
    if (result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('✅ Éxito', result.message, [{ text: 'OK', onPress: () => setScanned(false) }]);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('❌ Error', result.message, [{ text: 'OK', onPress: () => setScanned(false) }]);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Solicitando permiso de cámara...</Text></View>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay acceso a la cámara</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CameraView 
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.focusFrame} />
        {scanned && (
          <Button 
            title="Escanear de nuevo" 
            onPress={() => setScanned(false)} 
            style={styles.rescanBtn} 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  text: {
    color: Theme.colors.text,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  focusFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    backgroundColor: 'transparent',
    borderRadius: Theme.borderRadius.m,
  },
  rescanBtn: {
    position: 'absolute',
    bottom: 50,
  }
});
