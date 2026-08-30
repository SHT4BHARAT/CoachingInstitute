# MahaShiksha (महा-शिक्षा) — Regional Coaching Platform
> **Enterprise-Grade, Secure EdTech Infrastructure tailored for Maharashtra State Board (SSC/HSC) & MHT-CET (Marathi & Semi-English Medium)**

[![Status](https://img.shields.io/badge/Status-Frontend--First%20MVP%20Ready-success)]()
[![Target](https://img.shields.io/badge/Target-MHT--CET%20%2B%20State%20Board%20(10th%2F12th)-blue)]()
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014%2B%20(App%20Router)%20%2B%20TypeScript-blueviolet)]()
[![Security](https://img.shields.io/badge/Security-Full%20Defensive%20Shield-red)]()

---

## 📌 Executive Summary & Scope

**MahaShiksha** is an online coaching platform engineered specifically for students in the **Greater Maharashtra and Konkan regions**. It combines the pedagogical scale of PhysicsWallah and Unacademy with native Devanagari math rendering, bilingual instruction, low-bandwidth coastal optimization (240p Konkan mode), and DRM-grade content protection.

### 🎯 Core Architecture & Workflow
1. **Methodology:** **Frontend-First MVP** (Complete interactive Next.js 14+ TypeScript UI covering all 3 portals with realistic mock data & client state for manual user validation prior to backend wiring).
2. **Frontend Stack:** **Next.js 14+ (App Router) + TypeScript + Vanilla CSS Tokens** (Zero Tailwind, high performance, native SSR/PWA).
3. **Curriculum Focus:** Maharashtra State Board (10th SSC & 12th HSC Science) and MHT-CET (Engineering / Pharmacy).
4. **Video Engine:** Hybrid Model (Pre-recorded DRM VOD for theory + Scheduled Live WebRTC revision classes).
5. **Doubt Resolution:** AI-Assisted First Response (Balbharati textbook RAG) with 1-click Faculty Escalation (Marathi voice notes + stylus whiteboard).
6. **Monetization:** Per-batch pricing model with 2 free trial demo lectures per course.
7. **Assessment Arena:** Full MHT-CET / NTA Computer-Based Test (CBT) interface simulator + Daily Practice Problems (DPP).
8. **Content Security:** Full Defensive Web Shield (Dynamic moving watermark with student name/phone/IP, AES-128 HLS chunk encryption, single-device active session lock, Canvas PDF notes sandbox, DevTools anti-scrape hooks).

---

## 🏛️ System Channels & Next.js Routes

```
+---------------------------------------------------------------------------------------------------+
| 👨‍🎓 STUDENT PORTAL (विद्यार्थी कक्ष — Route: /student)                                             |
+---------------------------------------------------------------------------------------------------+
| • Hybrid DRM Video Player with Dynamic Anti-Piracy Watermarking (Name + Phone + IP + Time)        |
| • 240p Konkan Low-Bandwidth Mode for coastal and rural connectivity                               |
| • Canvas-Protected Notes Sandbox (Disables download, print, context menu & screen capture)       |
| • AI-First Doubt Clearance with 1-click Teacher Escalation (Voice note & Whiteboard solutions)   |
| • MHT-CET CBT Exam Simulator with section-switching, timer, and state-wide percentile ranking     |
+---------------------------------------------------------------------------------------------------+
| 👨‍🏫 TEACHER / EDUCATOR STUDIO (शिक्षक स्टुडिओ — Route: /teacher)                                   |
+---------------------------------------------------------------------------------------------------+
| • Batch & Lecture Management (Automated HLS Transcoding pipeline & live session scheduler)        |
| • Study Material & DPP Publishing Suite (PDF DRM tagging, formula sheets, PYQs)                   |
| • Real-Time Doubt Workspace (Stylus whiteboard solver + Marathi voice note recorder)             |
| • Question Bank Builder with Devanagari LaTeX and custom marking schemes (+2/0, +4/-1)           |
+---------------------------------------------------------------------------------------------------+
| 🛡️ ADMIN CONTROL HUB (प्रशासकीय नियंत्रण केंद्र — Route: /admin)                                 |
+---------------------------------------------------------------------------------------------------+
| • Real-time Telemetry: Active student streams, system load & watch-time completion rates          |
| • Educator SLA Monitor: Doubt resolution turnaround times & live class compliance                |
| • Anti-Piracy Command Center: Concurrent device session kill-switch & watermark forensics         |
| • Financial & Batch Center: Automated GST invoices (SAC 999293) & Razorpay/Cashfree reconciliation|
+---------------------------------------------------------------------------------------------------+
```

---

## 📚 Complete Documentation Index

### 🚀 MVP Documentation Suite ([docs/MVP/](file:///d:/Projects/CoachingWebsite/docs/MVP))
| Document | File Path | Focus & Deliverables |
| :--- | :--- | :--- |
| 📋 **MVP Specification** | [docs/MVP/MVP_SPECIFICATION.md](file:///d:/Projects/CoachingWebsite/docs/MVP/MVP_SPECIFICATION.md) | Frontend-First MVP, Next.js 14+ TypeScript, 3 Role Channels, 2 Free Demo Lectures |
| 🏗️ **MVP Architecture** | [docs/MVP/MVP_ARCHITECTURE.md](file:///d:/Projects/CoachingWebsite/docs/MVP/MVP_ARCHITECTURE.md) | Next.js App Router Structure, Components, Contexts, Dynamic Canvas Watermark |
| 🚀 **MVP Deployment** | [docs/MVP/MVP_DEPLOYMENT.md](file:///d:/Projects/CoachingWebsite/docs/MVP/MVP_DEPLOYMENT.md) | Next.js Local Dev, Staging on Vercel/PaaS, Single-Node Production Guide |
| 🚧 **MVP Roadblocks & Mitigations** | [docs/MVP/MVP_ROADBLOCKS_AND_MITIGATIONS.md](file:///d:/Projects/CoachingWebsite/docs/MVP/MVP_ROADBLOCKS_AND_MITIGATIONS.md) | FFmpeg AES-128 Transcoding, RAG Hallucination Gating, Konkan 240p Bitrate, Moving Watermarks |
| 📅 **MVP Sprint Plan** | [docs/MVP/MVP_SPRINT_PLAN.md](file:///d:/Projects/CoachingWebsite/docs/MVP/MVP_SPRINT_PLAN.md) | 5-Week Schedule: Frontend-First Validation $\to$ Backend Integration |

---

### 🌐 Core Platform Documentation ([docs/](file:///d:/Projects/CoachingWebsite/docs))
| Document | File Path | Focus Areas |
| :--- | :--- | :--- |
| 📄 **Full Specification** | [docs/SPECIFICATION.md](file:///d:/Projects/CoachingWebsite/docs/SPECIFICATION.md) | Enterprise Platform Specification & Non-Functional Requirements |
| 🏗️ **System Architecture** | [docs/ARCHITECTURE.md](file:///d:/Projects/CoachingWebsite/docs/ARCHITECTURE.md) | C4 Diagrams, DRM Video Pipeline, PostgreSQL Schema & Redis Cluster |
| 🚀 **Infrastructure Guide** | [docs/DEPLOYMENT.md](file:///d:/Projects/CoachingWebsite/docs/DEPLOYMENT.md) | 3-Tier Deployment Guide (Local Dev, EKS Staging, Multi-AZ Production) |
| 🔄 **Data Flow Diagrams** | [docs/DATA_FLOW_DIAGRAMS.md](file:///d:/Projects/CoachingWebsite/docs/DATA_FLOW_DIAGRAMS.md) | DFD Level 0, Level 1, and Level 2 System Interaction Sequences |
| ⚠️ **Risks & Roadblocks** | [docs/ROADBLOCKS_AND_RISKS.md](file:///d:/Projects/CoachingWebsite/docs/ROADBLOCKS_AND_RISKS.md) | Comprehensive Platform Risk Assessment & Mitigation Matrix |
| 💻 **Terminal Commands** | [TERMINAL_COMMANDS.md](file:///d:/Projects/CoachingWebsite/TERMINAL_COMMANDS.md) | CLI Commands Execution Queue & Historical Logs |

---

## ⚡ Quick Start (Next.js Frontend-First Setup)

```bash
# 1. Bootstrap Next.js 14+ (App Router) with TypeScript
npx create-next-app@latest frontend --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm

# 2. Install UI, math, and video libraries
cd frontend
npm install lucide-react katex pdfjs-dist hls.js
npm install -D @types/katex

# 3. Start development server for manual verification
npm run dev
```
