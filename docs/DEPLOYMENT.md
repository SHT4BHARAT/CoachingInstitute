# Deployment & Infrastructure Guide
**Document Version:** 2.1.0 (Next.js TypeScript Edition)  
**Frontend Architecture:** Next.js 14+ (App Router) + TypeScript  
**Strategy:** Frontend-First Development & Phased Deployment  

---

## 1. Frontend-First MVP Local Setup

```bash
# 1. Navigate to project root
cd d:\Projects\CoachingWebsite

# 2. Bootstrap Next.js 14+ App Router
npx create-next-app@latest frontend --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm

# 3. Install core UI, icons, math, and video libraries
cd frontend
npm install lucide-react katex pdfjs-dist hls.js
npm install -D @types/katex

# 4. Start Next.js Development Server
npm run dev

# 5. Access Interactive Portals:
# Student Portal:     http://localhost:3000/student
# Educator Studio:    http://localhost:3000/teacher
# Admin Control Hub:  http://localhost:3000/admin
```

---

## 2. 3-Tier Enterprise Deployment Topology

```
+---------------------------------------------------------------------------------------------------+
| ENVIRONMENT       | INFRASTRUCTURE TIER                 | PURPOSE / WORKLOAD                      |
+-------------------+-------------------------------------+-----------------------------------------+
| 1. Local Dev      | Next.js Dev Server + Mock State     | Interactive UI review, Devanagari math  |
|    (स्थानिक)       | (Node.js/PostgreSQL added later)    | rendering, dynamic watermark validation.|
+-------------------+-------------------------------------+-----------------------------------------+
| 2. Staging / Test | Vercel / Railway / Docker Staging   | End-to-end integration, manual testing, |
|    (चाचणी)         | Managed Postgres + Redis Cache      | 10,000 synthetic student load test.     |
+-------------------+-------------------------------------+-----------------------------------------+
| 3. Production     | Next.js SSR + AWS Multi-AZ EKS/VPS  | Live student traffic across Maharashtra,|
|    (उत्पादन)      | CloudFront CDN + Cloudflare WAF     | 99.95% SLA, 240p Konkan ABR streaming. |
+---------------------------------------------------------------------------------------------------+
```
