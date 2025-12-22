import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import type { Client, ClientInput } from '../types';

// Storage Config
localforage.config({
    name: 'prompt-gen',
    storeName: 'clients'
});

// State & Actions
interface ClientState {
    clients: Client[];
    activeClientId: string | null;
    isLoading: boolean;
    error: string | null;
}

type Action =
    | { type: 'LOAD_START' }
    | { type: 'LOAD_SUCCESS'; payload: Client[] }
    | { type: 'LOAD_ERROR'; payload: string }
    | { type: 'SELECT_CLIENT'; payload: string | null }
    | { type: 'ADD_CLIENT'; payload: Client }
    | { type: 'UPDATE_CLIENT'; payload: Client }
    | { type: 'DELETE_CLIENT'; payload: string };

const initialState: ClientState = {
    clients: [],
    activeClientId: null,
    isLoading: true,
    error: null,
};

// Reducer
function clientReducer(state: ClientState, action: Action): ClientState {
    switch (action.type) {
        case 'LOAD_START':
            return { ...state, isLoading: true, error: null };
        case 'LOAD_SUCCESS':
            return { ...state, clients: action.payload, isLoading: false };
        case 'LOAD_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'SELECT_CLIENT':
            return { ...state, activeClientId: action.payload };
        case 'ADD_CLIENT':
            return { ...state, clients: [...state.clients, action.payload], activeClientId: action.payload.id };
        case 'UPDATE_CLIENT':
            return {
                ...state,
                clients: state.clients.map((c) => (c.id === action.payload.id ? action.payload : c)),
            };
        case 'DELETE_CLIENT': {
            const newState = {
                ...state,
                clients: state.clients.filter((c) => c.id !== action.payload),
            };
            if (state.activeClientId === action.payload) {
                newState.activeClientId = null;
            }
            return newState;
        }
        default:
            return state;
    }
}

// Context
interface ClientContextType extends ClientState {
    selectClient: (id: string | null) => void;
    createClient: (input: ClientInput) => Promise<void>;
    updateClient: (client: Client) => Promise<void>;
    deleteClient: (id: string) => Promise<void>;
    refreshClients: () => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Provider
export function ClientProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(clientReducer, initialState);

    const loadClients = async () => {
        dispatch({ type: 'LOAD_START' });
        try {
            const keys = await localforage.keys();
            const clients: Client[] = [];
            for (const key of keys) {
                const client = await localforage.getItem<Client>(key);
                if (client) clients.push(client);
            }
            clients.sort((a, b) => b.updatedAt - a.updatedAt);
            dispatch({ type: 'LOAD_SUCCESS', payload: clients });
        } catch (err: any) {
            console.error(err);
            dispatch({ type: 'LOAD_ERROR', payload: 'Failed to load clients' });
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const selectClient = (id: string | null) => {
        dispatch({ type: 'SELECT_CLIENT', payload: id });
    };

    const createClient = async (input: ClientInput) => {
        const newClient: Client = {
            ...input,
            id: uuidv4(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        await localforage.setItem(newClient.id, newClient);
        dispatch({ type: 'ADD_CLIENT', payload: newClient });
    };

    const updateClient = async (client: Client) => {
        const updated = { ...client, updatedAt: Date.now() };
        await localforage.setItem(updated.id, updated);
        dispatch({ type: 'UPDATE_CLIENT', payload: updated });
    };

    const deleteClient = async (id: string) => {
        await localforage.removeItem(id);
        dispatch({ type: 'DELETE_CLIENT', payload: id });
    };

    const value: ClientContextType = {
        ...state,
        selectClient,
        createClient,
        updateClient,
        deleteClient,
        refreshClients: loadClients,
    };

    return (
        <ClientContext.Provider value={value} >
            {children}
        </ClientContext.Provider>
    );
}

export function useClientStore() {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClientStore must be used within a ClientProvider');
    }
    return context;
}
