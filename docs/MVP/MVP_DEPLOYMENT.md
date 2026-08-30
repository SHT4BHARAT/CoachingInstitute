# Minimum Viable Product (MVP) Deployment Guide
**Frontend Stack:** Next.js 14+ (App Router) + TypeScript  
**Strategy:** Frontend-First Rapid Prototyping & Staging  

---

## 1. Frontend-First MVP Local Execution

### 1.1 Prerequisites
- Node.js v18.17+ or v20 LTS
- npm v10+

### 1.2 Step-by-Step Setup
```bash
# 1. Navigate to project root
cd d:\Projects\CoachingWebsite

# 2. Bootstrap Next.js App Router (TypeScript, no-tailwind)
npx create-next-app@latest frontend --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm

# 3. Install core UI & math dependencies
cd frontend
npm install lucide-react katex pdfjs-dist hls.js
npm install -D @types/katex

# 4. Start Next.js development server
npm run dev

# 5. Access routes:
# Student Portal:     http://localhost:3000/student
# Educator Studio:    http://localhost:3000/teacher
# Admin Control Hub:  http://localhost:3000/admin
```

---

## 2. Staging & Production Deployment Options

```
+---------------------------------------------------------------------------------------------------+
| TARGET             | PLATFORM                           | CONFIGURATION                           |
+--------------------+------------------------------------+-----------------------------------------+
| 1. Instant Staging | Vercel / Netlify                   | One-click Git connect, zero-config SSR  |
| 2. Self-Hosted VPS | Ubuntu 22.04 + Node.js (PM2/Docker)| `next build` -> `pm2 start npm -- start`|
+---------------------------------------------------------------------------------------------------+
```
