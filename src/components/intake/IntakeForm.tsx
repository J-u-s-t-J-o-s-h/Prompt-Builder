import { useClientStore } from '../../store/clientStore';
import { TagInput } from './TagInput';
import { GoalList } from './GoalList';
import type { Client } from '../../types';

// Preset Options for Tags
const OPTION_PRESETS = {
    industries: [
        'SaaS', 'E-commerce', 'HealthTech', 'FinTech', 'EdTech', 'Real Estate', 'Logistics',
        'Social Media', 'Marketplace', 'Productivity', 'DevTools', 'AI Wrapper', 'Marketing',
        'Travel', 'Hospitality', 'Legal', 'Construction', 'Energy', 'Non-Profit'
    ],
    audiences: ['B2B', 'B2C', 'Internal', 'Enterprise', 'Startups', 'Students', 'SMEs', 'Developers', 'Designers', 'Freelancers', 'Government', 'Non-Technical Users', 'Gamers', 'Parents', 'Seniors', 'Gen Z'],
    features: ['Auth', 'Payments', 'Dashboard', 'Admin Panel', 'Email Notifications', 'File Upload', 'Search', 'Filtering', 'Export', 'Real-time Chat', 'AI Integration', 'Analytics', 'Social Login', 'Dark Mode', 'Mobile Responsive', 'API Access', 'Calendar', 'Maps', 'Push Notifications', 'User Roles', 'Audit Logs'],
    constraints: ['Low Budget', 'Tight Deadline', 'High Security', 'Mobile First', 'SEO Critical', 'GDPR Compliance', 'Offline First', 'Accessibility (WCAG)', 'Legacy Integration', 'Scalability First', 'Zero Maintenance', 'Open Source', 'Local Only', 'PWA'],
    tech: ['Next.js', 'React', 'Node.js', 'Python', 'Supabase', 'Firebase', 'AWS', 'Vercel', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'Cloudflare', 'Stripe', 'Prisma', 'tRPC', 'Vite', 'Express', 'Django', 'FastAPI', 'Go', 'Rust'],
    integrations: ['Stripe', 'PayPal', 'Google Auth', 'Apple Sign-in', 'SendGrid', 'Resend', 'Twilio', 'Slack', 'Discord', 'OpenAI', 'Anthropic', 'Google Maps', 'Mapbox', 'HubSpot', 'Salesforce', 'Zapier', 'Sentry', 'PostHog', 'Mixpanel', 'GA4', 'Intercom', 'Crisp', 'Shopify', 'WordPress']
};

export function IntakeForm() {
    const { clients, activeClientId, updateClient } = useClientStore();
    const client = clients.find(c => c.id === activeClientId);

    if (!client) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-neutral-600">
                <p>Select or create a client to begin.</p>
            </div>
        );
    }

    const handleChange = (field: keyof Client, value: any) => {
        updateClient({ ...client, [field]: value });
    };

    const handleNestedChange = (parent: 'brand' | 'stack' | 'tags', field: string, value: any) => {
        updateClient({
            ...client,
            [parent]: {
                ...client[parent],
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">

            {/* 1. Core Info */}
            <section className="space-y-4">
                <h2 className="text-lg font-light text-emerald-500 border-b border-neutral-800 pb-2">Client Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-500 uppercase">Project Name</label>
                        <input
                            type="text"
                            value={client.name}
                            onChange={e => handleChange('name', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-emerald-500 outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-500 uppercase">Company</label>
                        <input
                            type="text"
                            value={client.companyName}
                            onChange={e => handleChange('companyName', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-emerald-500 outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-500 uppercase">Type</label>
                        <select
                            value={client.projectType}
                            onChange={e => handleChange('projectType', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-emerald-500 outline-none appearance-none"
                        >
                            {['Landing Page', 'SaaS', 'Internal Tool', 'E-commerce', 'Other'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-500 uppercase">Priority</label>
                        <select
                            value={client.brand.priority}
                            onChange={e => handleNestedChange('brand', 'priority', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-emerald-500 outline-none appearance-none"
                        >
                            {['Speed', 'Quality', 'Cost'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-500 uppercase">Tone</label>
                        <select
                            value={client.brand.tone}
                            onChange={e => handleNestedChange('brand', 'tone', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-emerald-500 outline-none appearance-none"
                        >
                            {['Professional', 'Playful', 'Luxurious', 'Minimalist', 'Tech-focused'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
            </section>

            {/* 2. Goals */}
            <section className="space-y-4">
                <h2 className="text-lg font-light text-emerald-500 border-b border-neutral-800 pb-2">Goals & Objectives</h2>
                <GoalList
                    goals={client.goals}
                    onChange={(goals) => handleChange('goals', goals)}
                />
            </section>

            {/* 3. Scope & Features */}
            <section className="space-y-6">
                <h2 className="text-lg font-light text-emerald-500 border-b border-neutral-800 pb-2">Scope & Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TagInput
                        label="Target Audience"
                        value={client.tags.audience}
                        onChange={v => handleNestedChange('tags', 'audience', v)}
                        options={OPTION_PRESETS.audiences}
                    />
                    <TagInput
                        label="Industry / Vertical"
                        value={client.tags.industry}
                        onChange={v => handleNestedChange('tags', 'industry', v)}
                        options={OPTION_PRESETS.industries}
                    />
                    <TagInput
                        label="Core Features (MVP)"
                        value={client.tags.features}
                        onChange={v => handleNestedChange('tags', 'features', v)}
                        options={OPTION_PRESETS.features}
                    />
                    <TagInput
                        label="Integrations"
                        value={client.tags.integrations}
                        onChange={v => handleNestedChange('tags', 'integrations', v)}
                        options={OPTION_PRESETS.integrations}
                    />
                </div>

                <div className="pt-4 border-t border-neutral-800/50">
                    <TagInput
                        label="Constraints & Risks"
                        value={client.tags.constraints}
                        onChange={v => handleNestedChange('tags', 'constraints', v)}
                        options={OPTION_PRESETS.constraints}
                    />
                </div>
            </section>

            {/* 4. Tech Stack */}
            <section className="space-y-4">
                <h2 className="text-lg font-light text-emerald-500 border-b border-neutral-800 pb-2">Technical Preferences</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(client.stack).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                            <label className="text-xs font-medium text-neutral-500 uppercase">{key}</label>
                            <input
                                type="text"
                                value={val as string}
                                onChange={e => handleNestedChange('stack', key, e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-300 focus:border-emerald-500 outline-none text-sm"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Spacer */}
            <div className="h-12" />
        </div>
    );
}
