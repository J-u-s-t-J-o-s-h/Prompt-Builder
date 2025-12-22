import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { Plus, Trash2, Search } from 'lucide-react';
import { cn } from './Layout';
import type { ClientInput } from '../types';
import { KITS } from '../lib/kits';

export function ClientList() {
    const { clients, activeClientId, selectClient, createClient, deleteClient } = useClientStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateNew = () => {
        const newClient: ClientInput = {
            name: 'New Client',
            companyName: 'Company Inc.',
            projectType: 'Landing Page',
            brand: {
                tone: 'Professional',
                priority: 'Quality',
                assetsReady: false,
                notes: ''
            },
            tags: {
                industry: [],
                audience: [],
                pages: [],
                features: [],
                integrations: [],
                constraints: [],
                successMetrics: [],
                risks: []
            },
            goals: ['Launch MVP in 4 weeks'],
            stack: {
                frontend: 'React + Tailwind',
                hosting: 'Vercel',
                backend: 'Supabase',
                email: 'Resend',
                analytics: 'PostHog',
                seo: 'Basic'
            }
        };
        createClient(newClient);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">Clients</h2>
                    <button
                        onClick={handleCreateNew}
                        className="p-1.5 hover:bg-neutral-800 rounded-md transition-colors text-emerald-500"
                        title="New Client"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-1.5 pl-9 pr-3 text-sm text-neutral-300 focus:outline-none focus:border-neutral-700 placeholder:text-neutral-600"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {filteredClients.length === 0 ? (
                    <div className="p-8 text-center text-neutral-600 text-sm">
                        No clients found.
                    </div>
                ) : (
                    <div className="divide-y divide-neutral-800/50">
                        {filteredClients.map(client => (
                            <div
                                key={client.id}
                                onClick={() => selectClient(client.id)}
                                className={cn(
                                    "p-4 cursor-pointer group hover:bg-neutral-800/50 transition-colors",
                                    activeClientId === client.id ? "bg-neutral-800 border-l-2 border-emerald-500" : "border-l-2 border-transparent"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={cn(
                                            "font-medium text-sm truncate",
                                            activeClientId === client.id ? "text-neutral-100" : "text-neutral-400 group-hover:text-neutral-200"
                                        )}>
                                            {client.name}
                                        </h3>
                                        <p className="text-xs text-neutral-600 truncate mt-0.5">{client.companyName}</p>
                                    </div>
                                    {activeClientId === client.id && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm('Delete client?')) deleteClient(client.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-neutral-600 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-neutral-800/80 text-neutral-500 border border-neutral-800">
                                        {client.projectType}
                                    </span>
                                    <span className="text-[10px] text-neutral-600">
                                        {new Date(client.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Kits Area (Bottom) */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
                <h3 className="text-xs font-medium text-neutral-500 mb-3 px-1">Quick Kits</h3>
                <div className="grid grid-cols-2 gap-2">
                    {/* Quick Kit Buttons would go here */}
                    {Object.keys(KITS).map(kitKey => (
                        <button
                            key={kitKey}
                            onClick={() => createClient(KITS[kitKey])}
                            className="text-xs py-2 px-3 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200 transition-colors text-left truncate"
                        >
                            {kitKey}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
