# MVP 4-Week Sprint Plan & Implementation Milestones
**Development Methodology:** **Frontend-First Validation** $\to$ **Backend Integration**  
**Frontend Framework:** Next.js 14+ (App Router) + TypeScript + Vanilla CSS Tokens  

---

## 📅 Sprint Schedule Overview

```
+---------------------------------------------------------------------------------------------------+
| SPRINT / TIMELINE | CORE FOCUS & DELIVERABLES                                                     |
+-------------------+-------------------------------------------------------------------------------+
| Sprint 1 (Week 1) | Next.js 14+ App Router Setup, Bilingual Design Tokens & 3 Role Channel Shells |
| Sprint 2 (Week 2) | DRM Player with Dynamic Watermark, Canvas Notes Sandbox & 2 Free Demo Gates   |
| Sprint 3 (Week 3) | AI Doubt Desk UI, Balbharati Search & Teacher Stylus Whiteboard Workspace     |
| Sprint 4 (Week 4) | MHT-CET CBT Exam Simulator, Admin Telemetry Center & Manual Verification      |
| Sprint 5 (Week 5) | Backend Node.js API, PostgreSQL/pgvector & Redis Integration (In One Pass)    |
+---------------------------------------------------------------------------------------------------+
```

---

## 🚀 Granular Milestones

### 🔹 Sprint 1 (Week 1): Next.js Shell & Bilingual Design System
- Initialize Next.js 14+ App Router project with TypeScript and Vanilla CSS tokens.
- Implement Bilingual LanguageContext (`mr`, `mr-en`, `en`) with preloaded `Noto Sans Devanagari`.
- Construct navigation layouts for `/student`, `/teacher`, and `/admin`.

### 🔹 Sprint 2 (Week 2): Video Engine & Notes Sandbox
- Build Custom DRM Video Player with HLS.js and 240p Konkan low-bandwidth mode.
- Implement HTML5 Canvas Dynamic Moving Watermark (`[Name] | [Phone] | [IP] | [Time]`) shifting every 12s.
- Build Canvas-sandboxed PDF.js notes viewer with screenshot/download suppression.

### 🔹 Sprint 3 (Week 3): AI Doubt Desk & Teacher Studio
- Student doubt submission interface (Photo crop + 60s Marathi voice note simulation).
- AI instant answer card with 1-click *"शिक्षकांना विचारा"* (Ask Teacher) escalation.
- Educator Studio doubt resolution queue with in-browser stylus whiteboard and voice response recorder.

### 🔹 Sprint 4 (Week 4): MHT-CET CBT Exam Simulator & Admin Hub
- Timed CBT Exam Simulator with section switching (Physics/Chem vs Math), question status palette, and KaTeX math formulas.
- Admin Telemetry Dashboard (active streams, watch-time drop-offs, educator SLAs).
- Complete end-to-end manual verification across desktop and mobile browsers.
