import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useStore, UserRole } from '../services/store';
import { Theme } from '../components/Theme';
import { Button } from '../components/Button';
import { Ticket } from 'lucide-react-native';

export const LoginScreen = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('attendee');
  const login = useStore(state => state.login);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Ticket color={Theme.colors.primary} size={64} />
          <Text style={styles.title}>NOVATICK</Text>
          <Text style={styles.subtitle}>El futuro del acceso a eventos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.prompt}>Selecciona tu tipo de cuenta</Text>
          
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[styles.segment, selectedRole === 'attendee' && styles.segmentActive]}
              onPress={() => setSelectedRole('attendee')}
            >
              <Text style={[styles.segmentText, selectedRole === 'attendee' && styles.segmentTextActive]}>
                ASISTENTE
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.segment, selectedRole === 'admin' && styles.segmentActive]}
              onPress={() => setSelectedRole('admin')}
            >
              <Text style={[styles.segmentText, selectedRole === 'admin' && styles.segmentTextActive]}>
                ORGANIZADOR
              </Text>
            </TouchableOpacity>
          </View>

          <Button 
            title="INICIAR SESIÓN" 
            onPress={() => login(selectedRole)} 
            style={styles.loginBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.background },
  container: { flex: 1, justifyContent: 'center', padding: Theme.spacing.l },
  logoContainer: { alignItems: 'center', marginBottom: 60 },
  title: { fontSize: 42, fontWeight: '900', color: Theme.colors.primary, letterSpacing: 4, marginTop: 16 },
  subtitle: { color: Theme.colors.textMuted, fontSize: 16, marginTop: 8 },
  card: { backgroundColor: Theme.colors.card, padding: Theme.spacing.l, borderRadius: Theme.borderRadius.xl, borderWidth: 1, borderColor: Theme.colors.border },
  prompt: { color: Theme.colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  segmentedControl: { flexDirection: 'row', backgroundColor: Theme.colors.background, borderRadius: Theme.borderRadius.m, padding: 4, marginBottom: 30 },
  segment: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: Theme.borderRadius.s },
  segmentActive: { backgroundColor: Theme.colors.cardAlt, borderWidth: 1, borderColor: Theme.colors.primaryDark },
  segmentText: { color: Theme.colors.textMuted, fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  segmentTextActive: { color: Theme.colors.primary },
  loginBtn: { paddingVertical: 16 }
});
