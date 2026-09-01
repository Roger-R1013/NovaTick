import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useStore } from '../services/store';
import { Theme } from '../components/Theme';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ticket, Users, CheckCircle, Clock, QrCode, LogOut } from 'lucide-react-native';

export const DashboardScreen = () => {
  const { getMetrics, zones, tickets, recentScans, logout } = useStore();
  const metrics = getMetrics();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER FUTURISTA */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Ticket color={Theme.colors.primary} size={24} />
          <Text style={styles.headerTitle}>NOVATICK <Text style={styles.headerVip}>VIP</Text></Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerScanBtn} onPress={() => navigation.navigate('Scanner')}>
            <QrCode color={Theme.colors.background} size={16} />
            <Text style={styles.headerScanText}>ESCÁNER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <LogOut color={Theme.colors.danger} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.liveIndicatorContainer}>
        <View style={styles.dot} />
        <Text style={styles.liveIndicatorText}>LIVE ACCESS CONTROL</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* GRID DE METRICAS 2x2 */}
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Users color={Theme.colors.primaryDark} size={20} />
            <Text style={styles.gridValue}>{metrics.totalCapacity}</Text>
            <Text style={styles.gridLabel}>AFORO MÁXIMO</Text>
          </View>
          <View style={styles.gridItem}>
            <CheckCircle color={Theme.colors.primary} size={20} />
            <Text style={styles.gridValue}>{metrics.totalScanned}</Text>
            <Text style={styles.gridLabel}>INGRESOS</Text>
          </View>
          <View style={styles.gridItem}>
            <Clock color={Theme.colors.textMuted} size={20} />
            <Text style={styles.gridValue}>{metrics.totalPending}</Text>
            <Text style={styles.gridLabel}>PENDIENTES</Text>
          </View>
          <View style={styles.gridItem}>
            <Ticket color={Theme.colors.info} size={20} />
            <Text style={styles.gridValue}>{Math.round((metrics.totalScanned / (metrics.totalCapacity || 1)) * 100)}%</Text>
            <Text style={styles.gridLabel}>OCUPACIÓN</Text>
          </View>
        </View>

        {/* MEDIDORES DE AFORO */}
        <Text style={styles.sectionTitle}>ESTADO POR ZONA</Text>
        {zones.map(zone => {
          const zoneTickets = tickets.filter(t => t.zoneId === zone.id);
          const scanned = zoneTickets.filter(t => t.status === 'scanned').length;
          const percentage = Math.min((scanned / (zone.capacity || 1)) * 100, 100);
          
          return (
            <View key={zone.id} style={styles.zoneContainer}>
              <View style={styles.zoneHeader}>
                <Text style={styles.zoneName}>{zone.name.toUpperCase()}</Text>
                <Text style={styles.zoneStats}>{scanned}/{zone.capacity}</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        })}

        {/* LIVE FEED */}
        <Text style={[styles.sectionTitle, { marginTop: Theme.spacing.l }]}>LIVE FEED (TIEMPO REAL)</Text>
        <View style={styles.feedContainer}>
          {recentScans.length === 0 ? (
            <Text style={styles.feedEmpty}>Esperando escaneos...</Text>
          ) : (
            recentScans.map((log) => (
              <View key={log.id} style={styles.feedItem}>
                <View style={styles.feedItemLeft}>
                  <Text style={styles.feedTime}>
                    {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Text>
                  <Text style={styles.feedName}>{log.attendeeName}</Text>
                </View>
                <View style={[
                  styles.feedBadge, 
                  log.status === 'concedido' ? styles.feedBadgeSuccess : styles.feedBadgeDanger
                ]}>
                  <Text style={styles.feedBadgeText}>
                    {log.status === 'concedido' ? 'ACCESO CONCEDIDO' : 'ACCESO DENEGADO'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    paddingTop: Theme.spacing.m,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.s,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Theme.colors.text,
    letterSpacing: 2,
  },
  headerVip: {
    color: Theme.colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  headerScanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.full,
    gap: 4,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  headerScanText: {
    color: Theme.colors.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  liveIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    marginTop: 8,
    paddingBottom: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.info,
    marginRight: 6,
    shadowColor: Theme.colors.info,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  liveIndicatorText: {
    color: Theme.colors.info,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  container: {
    padding: Theme.spacing.m,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.s,
    marginBottom: Theme.spacing.l,
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    borderWidth: 1,
    borderColor: Theme.colors.borderHighlight,
    alignItems: 'flex-start',
  },
  gridValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginTop: Theme.spacing.s,
  },
  gridLabel: {
    fontSize: 10,
    color: Theme.colors.textMuted,
    letterSpacing: 1,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 12,
    color: Theme.colors.primaryDark,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: Theme.spacing.m,
  },
  zoneContainer: {
    marginBottom: Theme.spacing.m,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  zoneName: {
    color: Theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  zoneStats: {
    color: Theme.colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: Theme.colors.borderHighlight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: 2,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  feedContainer: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.s,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    minHeight: 100,
  },
  feedEmpty: {
    color: Theme.colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: Theme.spacing.m,
  },
  feedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderHighlight,
  },
  feedItemLeft: {
    flexDirection: 'column',
  },
  feedTime: {
    color: Theme.colors.textMuted,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  feedName: {
    color: Theme.colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  feedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  feedBadgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10B981',
  },
  feedBadgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#EF4444',
  },
  feedBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.text,
  }
});
