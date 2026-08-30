# Minimum Viable Product (MVP) Specification
**Project:** MahaShiksha / KonkanVidya Regional Platform  
**Target Delivery Window:** 4 Weeks  
**Primary Curriculums:** Maharashtra State Board (10th SSC & 12th HSC Science) & MHT-CET (Engineering / Pharmacy)  
**Target Region:** Maharashtra & Konkan Coastal Belt (Tier-2/3 & Rural Focus)  
**Medium of Instruction:** Marathi (मराठी) & Semi-English (द्विभाषिक)  

---

## 1. Executive Summary & MVP Scope Boundaries

The MVP objective is to deliver a functional, secure, production-ready core learning platform that validates student engagement, video protection, AI-assisted doubt resolution, and batch monetization across Maharashtra.

```
+---------------------------------------------------------------------------------------------------+
| IN-SCOPE FOR MVP (PHASE 1)                         | DEFERRED TO POST-MVP (PHASE 2)               |
+----------------------------------------------------+----------------------------------------------+
| • Mobile-First Responsive PWA with offline notes  | • Native iOS & Android APK Store builds      |
| • Pre-recorded HLS Video Player (240p - 1080p)     | • Custom RTMP multi-camera live broadcast    |
| • Dynamic Canvas Watermark (Name+Phone+IP+Time)    | • Offline peer-to-peer mesh file sharing     |
| • Canvas-Sandboxed PDF notes (No downloads/print)  | • Automated AI subjective answer grading     |
| • AI-First Doubt Engine (Balbharati RAG database)  | • Hardwired HDMI HDCP hardware checks        |
| • 1-Click Teacher Escalation (Voice/Whiteboard)    | • Physical center biometric attendance sync  |
| • MHT-CET CBT Exam Simulator (PCM/PCB) + DPPs      | • Automated installment debt recovery agent  |
| • Single-Device Active Session Lock (Redis)        | • White-label franchising multi-tenant CMS   |
| • Per-Batch Razorpay UPI Checkout (2 free demos)   | • Dynamic recurring subscription billing     |
| • Administrator Concurrency & SLA Telemetry        | • Deep AI audio pronunciation evaluator      |
+----------------------------------------------------+----------------------------------------------+
```

---

## 2. MVP User Personas & Functional Matrix

### 2.1 Student Portal (विद्यार्थी कक्ष)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION                                                   |
+--------------------+------------------------------------------------------------------------------+
| 1. Onboarding &    | • Mobile number + OTP authentication.                                        |
|    Language Switch | • Instant bilingual switch: Marathi (मराठी) / Semi-English / English.        |
|                    | • Enrolled batch view with syllabus progress indicator.                     |
+--------------------+------------------------------------------------------------------------------+
| 2. Hybrid DRM      | • Adaptive HLS player with 240p Konkan low-bandwidth mode.                   |
|    Video Player    | • Moving semi-transparent watermark overlaid on canvas every 12 seconds.      |
|                    | • 2 Free Demo Lectures accessible per course before checkout lock.           |
|                    | • Playback speed control (0.75x to 2.0x) + timestamped chapter markers.       |
+--------------------+------------------------------------------------------------------------------+
| 3. Secure Notes    | • PDF.js canvas-rendered notes viewer (no direct PDF download URL exposed). |
|    Viewer          | • Context menu, right-click, Ctrl+P, and print-screen disabled.             |
|                    | • Categorized by: Class Notes, Formula Sheets, and PYQ Archives.             |
+--------------------+------------------------------------------------------------------------------+
| 4. AI Doubt Desk   | • Student submits doubt via Text, Cropped Photo, or 60s Marathi Voice Note.  |
|    + Escalation    | • Instant AI response from Balbharati textbook & MHT-CET PYQ database.       |
|                    | • 1-click escalation button: "शिक्षकांना विचारा" (Ask Assigned Teacher).       |
+--------------------+------------------------------------------------------------------------------+
| 5. MHT-CET Exam    | • Timed CBT interface: Section 1 (Physics/Chem) & Section 2 (Maths/Bio).     |
|    Simulator       | • Interactive question status palette (Answered, Marked for Review, Visited).|
|                    | • Real-time score breakdown, state percentile estimate, and Marathi solutions|
+--------------------+------------------------------------------------------------------------------+
```

---

### 2.2 Educator Studio (शिक्षक स्टुडिओ)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION                                                   |
+--------------------+------------------------------------------------------------------------------+
| 1. Lecture Upload  | • Upload MP4 lecture files (triggers automated local/cloud HLS transcoding). |
|    & Management    | • Tag lectures by Standard (10th/12th/CET), Subject, Chapter, and Free Trial.|
+--------------------+------------------------------------------------------------------------------+
| 2. Study Material  | • Upload lecture slide notes, DPP PDFs, and formula cheat sheets.            |
|    Publisher       | • Assign materials to specific student batches.                              |
+--------------------+------------------------------------------------------------------------------+
| 3. Doubt Queue     | • Unified inbox of AI-escalated doubts filtered by Subject.                  |
|    & Whiteboard    | • In-browser stylus whiteboard to sketch step-by-step mathematical proofs.   |
|                    | • 1-click Marathi audio recorder to dispatch voice solutions.                |
+--------------------+------------------------------------------------------------------------------+
| 4. Assessment      | • MCQ authoring interface supporting LaTeX math and Devanagari Unicode.      |
|    Builder         | • Configure marking schemes (+2/0 for MHT-CET Math, +1/0 for Physics/Chem).  |
+--------------------+------------------------------------------------------------------------------+
```

---

### 2.3 Administrator Operations Hub (प्रशासकीय नियंत्रण केंद्र)

```
+---------------------------------------------------------------------------------------------------+
| FEATURE MODULE     | MVP CAPABILITY DESCRIPTION                                                   |
+--------------------+------------------------------------------------------------------------------+
| 1. Live Telemetry  | • Real-time active student streams, concurrent sessions, server resource load.|
|    Dashboard       | • Watch-time analytics and drop-off points per lecture.                      |
|                    | • Educator SLA monitoring (Average doubt resolution turnaround time).        |
+--------------------+------------------------------------------------------------------------------+
| 2. Anti-Piracy     | • Single-device active session enforcement with Redis heartbeats.            |
|    Command Center  | • Concurrent session violation alert + instant "Terminate Session" action.  |
|                    | • Watermark lookup tool: Enter phone/timestamp from leak to find infringer.  |
+--------------------+------------------------------------------------------------------------------+
| 3. Batch & Finance | • Create batches, set pricing (₹999 - ₹2,499), configure 2-lecture trials.  |
|    Reconciliation  | • Razorpay payment webhook transaction logs and GST invoice generation.      |
+--------------------+------------------------------------------------------------------------------+
```

---

## 3. MVP Security Baseline

1. **Dynamic Canvas Watermark:** `[Student Name] | [98****4321] | [IP: 103.21.x.x] | [Time: 14:30:12]` rendering continuously across moving coordinates.
2. **Single Active Device Lock:** Redis-backed `session:active:<user_id>` key refreshed via 30s client heartbeats. Second login automatically evicts first session.
3. **Encrypted HLS Streams:** AES-128 chunk encryption with dynamic key exchange endpoint validating active session tokens.
4. **Canvas Document Sandbox:** Direct binary PDF URLs are not accessible by browser network inspect tools.

---

## 4. MVP Success Criteria & Launch Metrics

| Success Metric | Target Threshold |
| :--- | :--- |
| **PWA Load Time (3G/4G)** | First Contentful Paint < 1.5s on mobile |
| **240p Konkan Video Startup** | Video playback begins within 1.2s on low-bandwidth connections |
| **AI Doubt Match Rate** | $\ge 65\%$ of standard textbook questions resolved instantly by AI |
| **Teacher Doubt SLA** | $\le 120$ minutes resolution time during daytime hours (08:00 - 21:00) |
| **Concurrent Session Breaches** | 0 duplicate simultaneous streams per student account |
| **MHT-CET Test Engine Accuracy** | 100% score calculation accuracy adhering to official MHT-CET criteria |
