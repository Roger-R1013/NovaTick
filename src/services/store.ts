import { create } from 'zustand';

export type TicketStatus = 'pending' | 'scanned';

export interface Ticket {
  id: string;
  hash: string;
  status: TicketStatus;
  zoneId: string;
  attendeeName: string;
}

export interface Zone {
  id: string;
  name: string;
  capacity: number;
}

export interface ScanLog {
  id: string;
  attendeeName: string;
  status: 'concedido' | 'denegado' | 'revertido';
  timestamp: Date;
}

export interface AppState {
  zones: Zone[];
  tickets: Ticket[];
  recentScans: ScanLog[];
  scanTicket: (hash: string) => { success: boolean; message: string };
  toggleTicketStatus: (ticketId: string) => void;
  getMetrics: () => { totalScanned: number; totalPending: number; totalCapacity: number };
}

const MOCK_ZONES: Zone[] = [
  { id: 'z1', name: 'VIP', capacity: 100 },
  { id: 'z2', name: 'General', capacity: 500 },
];

const MOCK_TICKETS: Ticket[] = [
  { id: 't1', hash: 'VALID_HASH_123', status: 'pending', zoneId: 'z1', attendeeName: 'Juan Perez' },
  { id: 't2', hash: 'VALID_HASH_456', status: 'scanned', zoneId: 'z2', attendeeName: 'Ana Gomez' },
  { id: 't3', hash: 'MY_TICKET_HASH', status: 'pending', zoneId: 'z1', attendeeName: 'Mi Usuario' },
];

for(let i=4; i<=20; i++) {
  MOCK_TICKETS.push({
    id: `t${i}`,
    hash: `HASH_${i}`,
    status: i % 3 === 0 ? 'scanned' : 'pending',
    zoneId: i % 2 === 0 ? 'z1' : 'z2',
    attendeeName: `Asistente ${i}`
  });
}

export const useStore = create<AppState>((set, get) => ({
  zones: MOCK_ZONES,
  tickets: MOCK_TICKETS,
  recentScans: [],

  scanTicket: (hash) => {
    const { tickets } = get();
    const ticket = tickets.find(t => t.hash === hash);
    if (!ticket) {
      return { success: false, message: 'Ticket no encontrado o inválido.' };
    }
    if (ticket.status === 'scanned') {
      return { success: false, message: 'Este ticket ya ha sido escaneado.' };
    }
    
    const newLog: ScanLog = {
      id: Date.now().toString(),
      attendeeName: ticket.attendeeName,
      status: 'concedido',
      timestamp: new Date()
    };
    
    set((state) => ({
      tickets: state.tickets.map(t => 
        t.hash === hash ? { ...t, status: 'scanned' } : t
      ),
      recentScans: [newLog, ...state.recentScans].slice(0, 10)
    }));
    
    return { success: true, message: `Acceso concedido a ${ticket.attendeeName}` };
  },

  toggleTicketStatus: (ticketId) => {
    set((state) => {
      const ticket = state.tickets.find(t => t.id === ticketId);
      if (!ticket) return state;
      
      const isNowScanned = ticket.status === 'pending';
      const newLog: ScanLog = {
        id: Date.now().toString(),
        attendeeName: ticket.attendeeName,
        status: isNowScanned ? 'concedido' : 'revertido',
        timestamp: new Date()
      };

      return {
        tickets: state.tickets.map(t =>
          t.id === ticketId ? { ...t, status: isNowScanned ? 'scanned' : 'pending' } : t
        ),
        recentScans: [newLog, ...state.recentScans].slice(0, 10)
      };
    });
  },

  getMetrics: () => {
    const { tickets, zones } = get();
    const totalCapacity = zones.reduce((acc, z) => acc + z.capacity, 0);
    const totalScanned = tickets.filter(t => t.status === 'scanned').length;
    const totalPending = tickets.filter(t => t.status === 'pending').length;
    return { totalScanned, totalPending, totalCapacity };
  }
}));
