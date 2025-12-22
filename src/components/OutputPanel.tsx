import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { Copy, Download, FileJson, FileText, Terminal } from 'lucide-react';
import { cn } from './Layout';
import { generateMVP, generatePRD, generateMasterPrompt } from '../lib/generators';

type Tab = 'MVP' | 'PRD' | 'MASTER';

export function OutputPanel() {
    const { clients, activeClientId } = useClientStore();
    const client = clients.find(c => c.id === activeClientId);
    const [activeTab, setActiveTab] = useState<Tab>('MVP');
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

    if (!client) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-neutral-600 p-8 text-center">
                <p>Generated outputs will appear here.</p>
            </div>
        );
    }

    // Generate content based on tab
    // (We will implement the generators in lib/generators.ts next)
    const getContent = () => {
        switch (activeTab) {
            case 'MVP': return generateMVP(client);
            case 'PRD': return generatePRD(client);
            case 'MASTER': return generateMasterPrompt(client);
            default: return '';
        }
    };

    const content = getContent();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopyFeedback('Copied!');
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${client.name.replace(/\s+/g, '_')}_${activeTab}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full bg-neutral-900/30">

            {/* Tabs */}
            <div className="flex border-b border-neutral-800 bg-neutral-900/50">
                {[
                    { id: 'MVP', icon: FileJson, label: 'MVP Scope' },
                    { id: 'PRD', icon: FileText, label: 'Full PRD' },
                    { id: 'MASTER', icon: Terminal, label: 'Master Prompt' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={cn(
                            "flex-1 py-3 text-xs font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
                            activeTab === tab.id
                                ? "border-emerald-500 text-emerald-400 bg-neutral-800/50"
                                : "border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30"
                        )}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-neutral-800 bg-neutral-900">
                <span className="text-xs text-neutral-500 pl-2">
                    {content.length} chars
                </span>
                <div className="flex gap-1">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                        title="Copy to Clipboard"
                    >
                        {copyFeedback ? <span className="text-emerald-500 text-xs font-bold">{copyFeedback}</span> : <Copy size={16} />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                        title="Download .md"
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>

            {/* Editor/Preview Area */}
            <div className="flex-1 overflow-hidden relative">
                <textarea
                    readOnly
                    value={content}
                    className="w-full h-full bg-neutral-950 p-4 text-sm font-mono text-neutral-300 resize-none focus:outline-none leading-relaxed"
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
