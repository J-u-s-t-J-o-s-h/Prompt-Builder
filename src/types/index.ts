export type ProjectType = 'Landing Page' | 'SaaS' | 'Internal Tool' | 'E-commerce' | 'Web App' | 'Other';
export type Priority = 'Speed' | 'Quality' | 'Cost';
export type BrandTone = 'Professional' | 'Playful' | 'Luxurious' | 'Minimalist' | 'Tech-focused';

export interface Client {
    id: string;
    name: string;
    companyName: string;
    website?: string;
    email?: string;
    phone?: string;
    projectType: ProjectType;

    brand: {
        tone: BrandTone;
        priority: Priority;
        assetsReady: boolean;
        notes: string;
    };

    tags: {
        industry: string[];
        audience: string[];
        pages: string[];
        features: string[];
        integrations: string[];
        constraints: string[];
        successMetrics: string[];
        risks: string[];
    };

    goals: string[]; // Ordered list of text goals

    stack: {
        frontend: string;
        hosting: string;
        backend: string;
        email: string;
        analytics: string;
        seo: string;
    };

    createdAt: number;
    updatedAt: number;
}

export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;
