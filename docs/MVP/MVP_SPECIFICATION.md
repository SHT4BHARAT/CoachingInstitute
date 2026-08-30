# Minimum Viable Product (MVP) Specification
**Project:** MahaShiksha / KonkanVidya Regional Platform  
**Architecture Methodology:** **Frontend-First MVP** (Complete interactive Next.js + TypeScript UI verification prior to backend construction)  
**Target Delivery Window:** 4 Weeks  
**Primary Curriculums:** Maharashtra State Board (10th SSC & 12th HSC Science) & MHT-CET (Engineering / Pharmacy)  
**Target Region:** Maharashtra & Konkan Coastal Belt (Tier-2/3 & Rural Focus)  
**Medium of Instruction:** Marathi (मराठी) & Semi-English (द्विभाषिक)  
**Frontend Framework:** Next.js 14+ (App Router) + TypeScript + Vanilla CSS Design Tokens  

---

## 1. Executive Summary & MVP Scope Boundaries

The MVP follows a **Frontend-First Validation Model**. All three operational channels (**Student Portal**, **Educator Studio**, and **Admin Control Hub**) will be fully built and interactive in **Next.js + TypeScript**, allowing manual end-to-end verification of user flows, regional typography, dynamic DRM watermarks, CBT exams, and doubt queues before locking backend APIs.

```
+---------------------------------------------------------------------------------------------------+
| IN-SCOPE FOR MVP (PHASE 1: FRONTEND-FIRST)         | DEFERRED TO POST-MVP (PHASE 2)               |
+----------------------------------------------------+----------------------------------------------+
| • Next.js 14+ (App Router) + TypeScript PWA       | • Native iOS & Android APK Store builds      |
| • Pre-recorded HLS Video Player (240p - 1080p)     | • Custom RTMP multi-camera live broadcast    |
| • Dynamic Canvas Watermark (Name+Phone+IP+Time)    | • Offline peer-to-peer mesh file sharing     |
| • Canvas-Sandboxed PDF notes (No downloads/print)  | • Automated AI subjective answer grading     |
| • AI-First Doubt Desk UI (Balbharati RAG mockup)   | • Hardwired HDMI HDCP hardware checks        |
| • 1-Click Teacher Escalation (Voice/Whiteboard)    | • Physical center biometric attendance sync  |
| • MHT-CET CBT Exam Simulator (PCM/PCB) + DPPs      | • Automated installment debt recovery agent  |
| • Single-Device Active Session Lock Simulation     | • White-label franchising multi-tenant CMS   |
| • Per-Batch Checkout Flow (2 Free Demo Lectures)   | • Dynamic recurring subscription billing     |
| • Administrator Concurrency & SLA Telemetry View   | • Deep AI audio pronunciation evaluator      |
+----------------------------------------------------+----------------------------------------------+
```

---

## 2. MVP User Personas & Functional Matrix

### 2.1 Student Portal (विद्यार्थी कक्ष — Next.js App Router: `/student`)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION (NEXT.JS + TYPESCRIPT)                            |
+--------------------+------------------------------------------------------------------------------+
| 1. Onboarding &    | • Mobile number + OTP simulation.                                            |
|    Language Switch | • Instant bilingual switch: Marathi (मराठी) / Semi-English / English.        |
|                    | • Enrolled batch view with interactive syllabus progress indicator.         |
+--------------------+------------------------------------------------------------------------------+
| 2. Hybrid DRM      | • Adaptive HLS player with 240p Konkan low-bandwidth mode.                   |
|    Video Player    | • Moving semi-transparent canvas watermark shifting coordinates every 12s.   |
|                    | • 2 Free Demo Lectures accessible per course before checkout lock.           |
|                    | • Playback speed control (0.75x to 2.0x) + timestamped chapter markers.       |
+--------------------+------------------------------------------------------------------------------+
| 3. Secure Notes    | • PDF.js canvas-rendered notes viewer (no direct PDF download URL exposed). |
|    Viewer          | • Context menu, right-click, Ctrl+P, and print-screen disabled.             |
|                    | • Categorized by: Class Notes, Formula Sheets, and PYQ Archives.             |
+--------------------+------------------------------------------------------------------------------+
| 4. AI Doubt Desk   | • Student submits doubt via Text, Cropped Photo, or 60s Marathi Voice Note.  |
|    + Escalation    | • Instant AI response card matched against Balbharati & MHT-CET textbook DB. |
|                    | • 1-click escalation button: "शिक्षकांना विचारा" (Ask Assigned Teacher).       |
+--------------------+------------------------------------------------------------------------------+
| 5. MHT-CET Exam    | • Timed CBT interface: Section 1 (Physics/Chem) & Section 2 (Maths/Bio).     |
|    Simulator       | • Interactive question status palette (Answered, Marked for Review, Visited).|
|                    | • KaTeX Devanagari math formula rendering with instant score breakdown.      |
+--------------------+------------------------------------------------------------------------------+
```

---

### 2.2 Educator Studio (शिक्षक स्टुडिओ — Next.js App Router: `/teacher`)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION (NEXT.JS + TYPESCRIPT)                            |
+--------------------+------------------------------------------------------------------------------+
| 1. Lecture Upload  | • Drag-and-drop video upload manager with HLS status progression.            |
|    & Management    | • Tag lectures by Standard (10th/12th/CET), Subject, Chapter, and Free Demo. |
+--------------------+------------------------------------------------------------------------------+
| 2. Study Material  | • Upload lecture slide notes, DPP PDFs, and formula cheat sheets.            |
|    Publisher       | • Assign materials to specific student batches.                              |
+--------------------+------------------------------------------------------------------------------+
| 3. Doubt Queue     | • Unified inbox of AI-escalated doubts filtered by Subject.                  |
|    & Whiteboard    | • In-browser stylus whiteboard canvas to sketch proofs and derivations.      |
|                    | • 1-click Marathi audio recorder to dispatch voice solutions.                |
+--------------------+------------------------------------------------------------------------------+
| 4. Assessment      | • MCQ authoring interface supporting LaTeX math and Devanagari Unicode.      |
|    Builder         | • Configure marking schemes (+2/0 for MHT-CET Math, +1/0 for Physics/Chem).  |
+--------------------+------------------------------------------------------------------------------+
```

---

### 2.3 Administrator Operations Hub (प्रशासकीय नियंत्रण केंद्र — Next.js App Router: `/admin`)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION (NEXT.JS + TYPESCRIPT)                            |
+--------------------+------------------------------------------------------------------------------+
| 1. Live Telemetry  | • Real-time active student streams, concurrent sessions, server resource load.|
|    Dashboard       | • Watch-time analytics and drop-off points per lecture.                      |
|                    | • Educator SLA monitoring (Average doubt resolution turnaround time).        |
+--------------------+------------------------------------------------------------------------------+
| 2. Anti-Piracy     | • Single-device active session enforcement monitor.                          |
|    Command Center  | • Concurrent session violation alert + instant "Terminate Session" action.  |
|                    | • Watermark lookup tool: Enter phone/timestamp from leak to find infringer.  |
+--------------------+------------------------------------------------------------------------------+
| 3. Batch & Finance | • Create batches, set pricing (₹999 - ₹2,499), configure 2-lecture trials.  |
|    Reconciliation  | • Razorpay payment webhook transaction logs and GST invoice generation.      |
+--------------------+------------------------------------------------------------------------------+
```

---

## 3. Frontend-First MVP Validation Workflow

1. **Step 1 (UI/UX Validation):** Deploy Next.js frontend with full interactive mocks across Student, Teacher, and Admin routes.
2. **Step 2 (Manual Verification):** Review all screens on physical mobile (Android/iOS) and desktop browsers to verify Devanagari ligatures, canvas watermark performance, and CBT test flows.
3. **Step 3 (Refinement):** Fine-tune UI components, layouts, and regional terminology based on hands-on inspection.
4. **Step 4 (Backend Integration):** Implement the Node.js API and PostgreSQL/Redis backend in one streamlined execution pass matching the validated frontend contracts.
