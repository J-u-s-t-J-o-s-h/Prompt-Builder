import type { Client } from '../types';

function formatList(items: string[]) {
    if (!items || items.length === 0) return 'None specified';
    return items.map(i => `- ${i}`).join('\n');
}

export function generateMVP(client: Client): string {
    return `# MVP SCOPE: ${client.name}

## 1. Snapshot
- **Client:** ${client.companyName}
- **Type:** ${client.projectType}
- **Priority:** ${client.brand.priority}
- **Constraints:** ${client.tags.constraints.join(', ') || 'None'}

## 2. Primary Goals
${formatList(client.goals)}

## 3. Core MVP Features (In-Scope)
${formatList(client.tags.features)}

## 4. Technical Approach
- **Frontend:** ${client.stack.frontend}
- **Backend:** ${client.stack.backend}
- **Hosting:** ${client.stack.hosting}

## 5. Success Metrics
${formatList(client.tags.successMetrics)}

## 6. EXPLICITLY OUT OF SCOPE
- Any features not listed above.
- Complex animations (unless specified).
- Legacy browser support.
`;
}

export function generatePRD(client: Client): string {
    return `# Product Requirements Document (PRD)
**Project:** ${client.name}
**Date:** ${new Date().toLocaleDateString()}

---

## 1. Overview
**${client.companyName}** requires a **${client.projectType.toLowerCase()}** solution.
This project prioritizes **${client.brand.priority}** with a brand tone described as **${client.brand.tone}**.

## 2. Goals & Objectives
${formatList(client.goals)}

## 3. Target Audience
${formatList(client.tags.audience)}

## 4. Functional Requirements
### Core Features
${formatList(client.tags.features)}

### Integrations
${formatList(client.tags.integrations)}

## 5. Non-Functional Requirements
- **Performance:** Optimized for speed and low latency.
- **Security:** Standard security practices for ${client.stack.backend}.
- **Device Support:** Responsive design (Mobile/Desktop).

## 6. Technical Architecture
| Component | Technology |
|-----------|------------|
| Frontend | ${client.stack.frontend} |
| Backend | ${client.stack.backend} |
| Deployment | ${client.stack.hosting} |
| Analytics | ${client.stack.analytics} |
| Database | IndexedDB / Local (implied) or ${client.stack.backend} |

## 7. Design Guidelines
- **Tone:** ${client.brand.tone}
- **Assets:** ${client.brand.assetsReady ? 'Provided by client' : 'Need to be created/generated'}
- **Notes:** ${client.brand.notes || 'None'}

## 8. Risks
${formatList(client.tags.risks)}

## 9. Assumptions
- Client will provide copy/content if not ready.
- Standard legal/privacy policies apply.
`;
}

export function generateMasterPrompt(client: Client): string {
    return `<!-- MASTER BUILD PROMPT -->
<!-- Copy this prompt into a coding agent to build the project. -->

You are an expert Senior Software Engineer and Product Architect.
You are tasked with building a **${client.projectType}** for **${client.companyName}**.

YOUR GOAL: Build a production-ready, clean, and functioning application based STRICTLY on the requirements below.

---

### 1. PROJECT IDENTITY
- **Name:** ${client.name}
- **Type:** ${client.projectType}
- **Tone:** ${client.brand.tone}
- **Priority:** ${client.brand.priority} (Optimize for this!)

### 2. CORE STACK (NON-NEGOTIABLE)
- **Frontend:** ${client.stack.frontend}
- **Backend:** ${client.stack.backend}
- **Deployment:** ${client.stack.hosting}
- **Styling:** TailwindCSS (Mandatory)

### 3. REQUIREMENTS & SCOPE
**Implement these features (and ONLY these features):**
${formatList(client.tags.features)}

**Design Constraints:**
${formatList(client.tags.constraints)}

**User Audience:**
${client.tags.audience.join(', ')}

### 4. DATA MODEL / SCHEMA (Proposed)
Based on the features, infer a minimal schema.
If this is a SaaS, include User, Subscription, etc.
If this is a Landing Page, include Lead/ContactForm.

### 5. EXECUTION PLAN
1. **Initialize Project:** Setup ${client.stack.frontend}.
2. **Scaffold Components:** Build the core UI shell.
3. **Implement Features:** Build the features listed above.
4. **Style & Polish:** Apply the ${client.brand.tone} design language.

---

### CRITICAL INSTRUCTIONS
1. **NO FLUFF:** Do not build features not requested.
2. **NO PLACEHOLDERS:** Build working components. Use detailed mock data if backend is not available.
3. **AESTHETICS:** This must look ${client.brand.tone} and professional.
4. **MOBILE FIRST:** Ensure specialized mobile responsiveness.

START NOW.
`;
}
