import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { useStore } from '../services/store';
import { Theme } from '../components/Theme';
import { Button } from '../components/Button';
import { Search } from 'lucide-react-native';

export const AttendeesScreen = () => {
  const { tickets, toggleTicketStatus } = useStore();
  const [search, setSearch] = useState('');

  const filteredTickets = tickets.filter(t => 
    t.attendeeName.toLowerCase().includes(search.toLowerCase()) || 
    t.hash.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search color={Theme.colors.textMuted} size={20} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar asistente o código..."
            placeholderTextColor={Theme.colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList 
          data={filteredTickets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.ticketItem}>
              <View style={styles.ticketInfo}>
                <Text style={styles.attendeeName}>{item.attendeeName}</Text>
                <Text style={styles.hash}>Código: {item.hash.substring(0,8)}...</Text>
              </View>
              <Button 
                title={item.status === 'pending' ? 'Ingresar' : 'Revertir'} 
                variant={item.status === 'pending' ? 'primary' : 'danger'}
                onPress={() => toggleTicketStatus(item.id)}
                style={styles.actionBtn}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Theme.colors.background },
  container: { flex: 1, padding: Theme.spacing.m },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.m,
    paddingHorizontal: Theme.spacing.m,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.m,
  },
  searchInput: {
    flex: 1,
    padding: Theme.spacing.m,
    color: Theme.colors.text,
  },
  ticketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.m,
    borderRadius: Theme.borderRadius.m,
    marginBottom: Theme.spacing.s,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  ticketInfo: { flex: 1 },
  attendeeName: { fontSize: 16, fontWeight: 'bold', color: Theme.colors.text },
  hash: { fontSize: 12, color: Theme.colors.textMuted, marginTop: 4 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 12 }
});
