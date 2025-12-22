import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
    leftPanel: React.ReactNode;
    centerPanel: React.ReactNode;
    rightPanel: React.ReactNode;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function Layout({ leftPanel, centerPanel, rightPanel }: LayoutProps) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-200">
            {/* Left Panel: Client List */}
            <aside className="w-80 flex-shrink-0 border-r border-neutral-800 bg-neutral-900/50 flex flex-col">
                {leftPanel}
            </aside>

            {/* Center Panel: Workspace */}
            <main className="flex-1 flex flex-col min-w-0 bg-neutral-950 relative overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                    <div className="max-w-3xl mx-auto pb-20">
                        {centerPanel}
                    </div>
                </div>
            </main>

            {/* Right Panel: Output */}
            <aside className="w-[450px] flex-shrink-0 border-l border-neutral-800 bg-neutral-900/30 flex flex-col">
                {rightPanel}
            </aside>
        </div>
    );
}
