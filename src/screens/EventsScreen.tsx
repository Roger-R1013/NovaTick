import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Theme } from '../components/Theme';
import { Card } from '../components/Card';
import { Calendar } from 'lucide-react-native';

export const EventsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Catálogo de Eventos</Text>
        
        <Card style={styles.eventCard}>
          <Calendar color={Theme.colors.primary} size={32} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>Cyberpunk Festival 2026</Text>
            <Text style={styles.eventDate}>15 de Octubre, 2026</Text>
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
  eventCard: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  eventInfo: { flex: 1 },
  eventName: { color: Theme.colors.text, fontSize: 18, fontWeight: 'bold' },
  eventDate: { color: Theme.colors.info, marginTop: 4 }
});
