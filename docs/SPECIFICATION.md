# Finalized System Specification: Regional EdTech Platform
**Document Version:** 2.1.0 (Next.js TypeScript Frontend-First Edition)  
**Target Region:** Maharashtra & Konkan Region (Tier-2/3 & Coastal Focus)  
**Primary Curriculums:** Maharashtra State Board (10th SSC & 12th HSC Science) & MHT-CET (Engineering / Pharmacy)  
**Medium of Instruction:** Marathi (मराठी) & Semi-English (द्विभाषिक)  
**Frontend Framework:** Next.js 14+ (App Router) + TypeScript + Vanilla CSS Tokens  

---

## 1. Executive Summary & Scope Decisions

| Architectural Scope Area | Finalized Specification |
| :--- | :--- |
| **Frontend Framework** | **Next.js 14+ (App Router) + TypeScript** with Vanilla CSS design tokens (Zero Tailwind, high performance, native SSR/SSG). |
| **Development Strategy**| **Frontend-First MVP:** Complete interactive frontend covering all 3 portals with realistic mock data & client state for manual user validation prior to backend construction. |
| **Primary Curriculum** | **MHT-CET + Maharashtra State Board (10th SSC & 12th HSC Science)** in Marathi & Semi-English. |
| **Video Delivery Model**| **Hybrid Model:** Pre-recorded DRM VOD lectures for theory + Scheduled Live WebRTC sessions for problem-solving/revisions. |
| **Doubt Resolution** | **AI-Assisted First Response + Faculty Escalation:** Immediate AI responses indexed from State Board textbooks & PYQs, automatically escalating unresolved doubts to human faculty (with Marathi voice note & whiteboard tools). |
| **Monetization Engine** | **Per-Batch One-Time / Installment Fee:** Students purchase specific courses (e.g., *MHT-CET Crash Course 2026*, *१०वी बोर्ड विज्ञान महा-बॅच*) with 2 free demo lectures per subject. |
| **Assessment Arena** | **Full MHT-CET / NTA CBT Simulator + Daily Practice Problems (DPP):** Timed section-based test engine, question status palette, custom marking rules (+2/0, +4/-1), and state-wide percentile analytics. |
| **Content Security** | **Full Defensive Web Shield:** Dynamic moving canvas watermark (Name + Phone + IP + Timestamp) + AES-128 HLS chunk encryption + Single-device login lock (Redis heartbeat) + Canvas PDF notes sandbox + DevTools anti-scrape hooks. |

---

## 2. Role-Based Channel Specifications (Next.js Routes)

### 2.1 Student Portal (`/student`)
- **Dashboard (`/student`):** Bilingual toggle (`mr`, `mr-en`, `en`), enrolled batches, today's schedule, pending quizzes.
- **Lecture Room (`/student/lectures/[id]`):** DRM HLS player with 240p Konkan mode, dynamic moving canvas watermark, speed controls, and 2-lecture free trial gates.
- **Notes Sandbox (`/student/notes/[id]`):** Canvas-sandboxed PDF.js viewer with screenshot/download suppression.
- **Doubt Desk (`/student/doubts`):** Photo/voice upload, AI instant solution card, and 1-click teacher escalation.
- **Exam Simulator (`/student/exams/[id]`):** Full MHT-CET CBT timed simulator with KaTeX Devanagari math rendering.

### 2.2 Educator Studio (`/teacher`)
- **Studio Dashboard (`/teacher`):** Batch assignments, pending escalated doubts, and scheduled live revision sessions.
- **Lecture Upload Manager (`/teacher/upload`):** Video upload interface with tagging (Class 10/12/CET, chapter, free trial flag).
- **Doubt Workspace (`/teacher/doubts`):** Stylus digital whiteboard solver and Marathi audio voice recorder.
- **Assessment Builder (`/teacher/assessments`):** MCQ / DPP creator supporting Devanagari LaTeX math notation.

### 2.3 Administrator Operations Hub (`/admin`)
- **Telemetry Monitor (`/admin`):** Real-time active streams, student concurrency count, server load, and drop-off analytics.
- **Anti-Piracy Command (`/admin/anti-piracy`):** Single-device active session monitor, force-logout kill-switch, and watermark forensic lookup.
- **Batch & Financial Center (`/admin/batches`):** Batch pricing configuration, free demo lecture allocation, and GST tax invoice generation.
