import type { ClientInput } from '../types';

export const KITS: Record<string, ClientInput> = {
    'SaaS MVP': {
        name: 'New SaaS MVP',
        companyName: 'Startup Inc.',
        projectType: 'SaaS',
        brand: { tone: 'Tech-focused', priority: 'Speed', assetsReady: false, notes: '' },
        tags: {
            industry: ['SaaS', 'Tech'],
            audience: ['B2B'],
            pages: ['Landing', 'Auth', 'Dashboard', 'Settings', 'Pricing'],
            features: ['Authentication', 'Stripe Subscription', 'User Profile', 'Usage Limits'],
            integrations: ['Stripe', 'Supabase', 'Resend'],
            constraints: ['Low Budget'],
            successMetrics: ['First 10 Paying Users'],
            risks: ['Market Fit', 'Churn']
        },
        goals: ['Verify willingness to pay', 'Launch in 3 weeks'],
        stack: { frontend: 'React + Vite', hosting: 'Vercel', backend: 'Supabase', email: 'Resend', analytics: 'PostHog', seo: 'Basic' }
    },
    'Portfolio': {
        name: 'New Portfolio',
        companyName: 'Personal Brand',
        projectType: 'Landing Page',
        brand: { tone: 'Minimalist', priority: 'Quality', assetsReady: true, notes: '' },
        tags: {
            industry: ['Creative'],
            audience: ['Recruiters', 'Clients'],
            pages: ['Home', 'About', 'Work', 'Contact'],
            features: ['Project Gallery', 'Contact Form', 'About Me', 'Resume Download'],
            integrations: [],
            constraints: [],
            successMetrics: ['Leads', 'Job Offers'],
            risks: []
        },
        goals: ['Showcase best work', 'Get hired'],
        stack: { frontend: 'React + Vite', hosting: 'Vercel', backend: 'None', email: 'None', analytics: 'Vercel Analytics', seo: 'High' }
    },
    'Internal Tool': {
        name: 'Internal Dashboard',
        companyName: 'Internal Ops',
        projectType: 'Internal Tool',
        brand: { tone: 'Professional', priority: 'Speed', assetsReady: false, notes: 'Function over form' },
        tags: {
            industry: ['Operations'],
            audience: ['Internal Staff'],
            pages: ['Dashboard', 'Table View', 'Edit Modal'],
            features: ['Data Table', 'Search/Filter', 'CSV Export', 'Role Based Access'],
            integrations: ['Internal API'],
            constraints: ['Intranet Only'],
            successMetrics: ['Reduce manual entry time'],
            risks: ['Data Integrity']
        },
        goals: ['Automate manual workflow'],
        stack: { frontend: 'React + Vite', hosting: 'Internal', backend: 'Node/Express', email: 'None', analytics: 'None', seo: 'None' }
    },
    'E-com': {
        name: 'New Store',
        companyName: 'Shop LLC',
        projectType: 'E-commerce',
        brand: { tone: 'Luxurious', priority: 'Quality', assetsReady: false, notes: '' },
        tags: {
            industry: ['Retail'],
            audience: ['B2C'],
            pages: ['Home', 'Product List', 'Product Detail', 'Cart', 'Checkout'],
            features: ['Cart', 'Checkout Flow', 'Order Management', 'Inventory'],
            integrations: ['Stripe', 'Shopify (Headless)'],
            constraints: [],
            successMetrics: ['Sales Conversion'],
            risks: ['Inventory Sync']
        },
        goals: ['Sell products online'],
        stack: { frontend: 'React + Vite', hosting: 'Vercel', backend: 'Shopify / Supabase', email: 'Klaviyo', analytics: 'GA4', seo: 'Advanced' }
    }
};
