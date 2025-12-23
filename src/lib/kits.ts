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
    },
    'AI Wrapper': {
        name: 'AI Tool MVP',
        companyName: 'NextGen AI',
        projectType: 'SaaS',
        brand: { tone: 'Tech-focused', priority: 'Speed', assetsReady: false, notes: 'Clean, futuristic UI' },
        tags: {
            industry: ['AI Wrapper', 'SaaS'],
            audience: ['B2C', 'Prosumers'],
            pages: ['Landing', 'App', 'Pricing', 'Sign Up'],
            features: ['AI Text Gen', 'Chat Interface', 'Credit System', 'History', 'Export'],
            integrations: ['OpenAI', 'Stripe', 'Supabase'],
            constraints: ['API Cost Management'],
            successMetrics: ['User Retention', 'API Usage'],
            risks: ['Platform Risk (OpenAI Wrappers)']
        },
        goals: ['Validate simple AI use case', 'Get first users'],
        stack: { frontend: 'React + Vite', hosting: 'Vercel', backend: 'Supabase Functions', email: 'Resend', analytics: 'PostHog', seo: 'Basic' }
    },
    'Directory': {
        name: 'Niche Directory',
        companyName: 'Curated List',
        projectType: 'Web App',
        brand: { tone: 'Minimalist', priority: 'Cost', assetsReady: false, notes: 'Content focus' },
        tags: {
            industry: ['Marketplace', 'Directory'],
            audience: ['Niche Community'],
            pages: ['Home', 'Listing Detail', 'Submit Listing', 'Category'],
            features: ['Search', 'Filter', 'Submission Form', 'Admin Review', 'Newsletter'],
            integrations: ['Airtable', 'Beehiiv'],
            constraints: ['SEO Critical'],
            successMetrics: ['Organic Traffic', 'Subscribers'],
            risks: ['Chicken-Egg Problem']
        },
        goals: ['Build traffic', 'Monetize via featured listings'],
        stack: { frontend: 'React + Vite', hosting: 'Vercel', backend: 'Supabase / Airtable', email: 'Beehiiv', analytics: 'Plausible', seo: 'Critical' }
    },
    'Agency': {
        name: 'Agency Website',
        companyName: 'Creative Studio',
        projectType: 'Landing Page',
        brand: { tone: 'Professional', priority: 'Quality', assetsReady: true, notes: 'High-end animations' },
        tags: {
            industry: ['Service', 'Marketing'],
            audience: ['Enterprise Clients'],
            pages: ['Home', 'Services', 'Case Studies', 'Contact'],
            features: ['CMS for Case Studies', 'Contact Form', 'Calendly Embed'],
            integrations: ['Calendly', 'Sanity / Contentful'],
            constraints: ['Performance with Animations'],
            successMetrics: ['Inbound Inquiries'],
            risks: []
        },
        goals: ['Attract high-ticket clients'],
        stack: { frontend: 'React + Vite', hosting: 'Netlify', backend: 'Sanity CMS', email: 'Resend', analytics: 'GA4', seo: 'High' }
    }
};
