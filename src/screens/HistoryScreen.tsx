import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Theme } from '../components/Theme';
import { Card } from '../components/Card';
import { Clock } from 'lucide-react-native';

export const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Historial de Accesos</Text>
        
        <Card style={styles.historyCard}>
          <Clock color={Theme.colors.primaryDark} size={24} />
          <View style={styles.historyInfo}>
            <Text style={styles.historyName}>Ingreso a Zona VIP</Text>
            <Text style={styles.historyDate}>Hoy, 20:45 PM</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.background },
  container: { padding: Theme.spacing.m },
  title: { fontSize: 24, fontWeight: 'bold', color: Theme.colors.text, marginBottom: Theme.spacing.l },
  historyCard: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m, marginBottom: Theme.spacing.s },
  historyInfo: { flex: 1 },
  historyName: { color: Theme.colors.text, fontSize: 16, fontWeight: 'bold' },
  historyDate: { color: Theme.colors.textMuted, marginTop: 4 }
});
