# MahaShiksha (महा-शिक्षा) — Regional Coaching Platform
> **Enterprise-Grade, Secure EdTech Infrastructure tailored for Maharashtra State Board (SSC/HSC) & MHT-CET (Marathi & Semi-English Medium)**

[![Status](https://img.shields.io/badge/Status-Scope%20Finalized%20%26%20Locked-success)]()
[![Target](https://img.shields.io/badge/Target-MHT--CET%20%2B%20State%20Board%20(10th%2F12th)-blue)]()
[![Platform](https://img.shields.io/badge/Platform-Mobile--First%20PWA-orange)]()
[![Security](https://img.shields.io/badge/Security-Full%20Defensive%20Shield-red)]()

---

## 📌 Executive Summary & Finalized Scope

**MahaShiksha** is an online coaching platform engineered specifically for students in the **Greater Maharashtra and Konkan regions**. It combines the proven pedagogical scale of PhysicsWallah and Unacademy with native Devanagari math rendering, bilingual instruction, low-bandwidth coastal optimization, and DRM-grade content security.

### 🎯 Finalized Scope Pillars
1. **Target Curriculum:** Maharashtra State Board (10th SSC & 12th HSC Science) and MHT-CET (Engineering / Pharmacy).
2. **Video Delivery:** Hybrid Model (Pre-recorded DRM VOD for theory + Scheduled Live WebRTC revision classes).
3. **Doubt Resolution:** AI-Assisted First Response (Balbharati textbook RAG) with 1-click Faculty Escalation (Marathi voice notes + stylus whiteboard).
4. **Client Form Factor:** Mobile-First Responsive Progressive Web App (PWA) with offline IndexedDB caching.
5. **Monetization:** Per-batch pricing model with 2 free trial demo lectures per course.
6. **Assessment Arena:** Full MHT-CET / NTA Computer-Based Test (CBT) interface simulator + Daily Practice Problems (DPP).
7. **Content Security:** Full Defensive Web Shield (Dynamic moving watermark with student name/phone/IP, AES-128 HLS chunk encryption, single-device active session lock, Canvas PDF notes sandbox, DevTools anti-scrape hooks).

---

## 🏛️ System Channels & User Roles

```
+---------------------------------------------------------------------------------------------------+
| 👨‍🎓 STUDENT PORTAL (विद्यार्थी पोर्टल)                                                              |
+---------------------------------------------------------------------------------------------------+
| • Hybrid DRM Video Player with Dynamic Anti-Piracy Watermarking (Name + Phone + IP + Time)        |
| • 240p Konkan Low-Bandwidth Mode for coastal and rural connectivity                               |
| • Canvas-Protected Notes Sandbox (Disables download, print, context menu & screen capture)       |
| • AI-First Doubt Clearance with 1-click Teacher Escalation (Voice note & Whiteboard solutions)   |
| • MHT-CET CBT Exam Simulator with section-switching, timer, and state-wide percentile ranking     |
+---------------------------------------------------------------------------------------------------+
| 👨‍🏫 TEACHER / EDUCATOR STUDIO (शिक्षक स्टुडिओ)                                                    |
+---------------------------------------------------------------------------------------------------+
| • Batch & Lecture Management (Automated HLS Transcoding pipeline & live session scheduler)        |
| • Study Material & DPP Publishing Suite (PDF DRM tagging, formula sheets, PYQs)                   |
| • Real-Time Doubt Workspace (Stylus whiteboard solver + Marathi voice note recorder)             |
| • Question Bank Builder with Devanagari LaTeX and custom marking schemes (+2/0, +4/-1)           |
+---------------------------------------------------------------------------------------------------+
| 🛡️ ADMIN CONTROL HUB (प्रशासकीय नियंत्रण केंद्र)                                                 |
+---------------------------------------------------------------------------------------------------+
| • Real-time Telemetry: Active student streams, system load & watch-time completion rates          |
| • Educator SLA Monitor: Doubt resolution turnaround times & live class compliance                |
| • Anti-Piracy Command Center: Concurrent device session kill-switch & watermark forensics         |
| • Financial & Batch Center: Automated GST invoices (SAC 999293) & Razorpay/Cashfree reconciliation|
+---------------------------------------------------------------------------------------------------+
```

---

## 📚 Documentation Index

All detailed specifications, technical architectures, deployment manuals, and risk assessments are cataloged within the [`docs/`](file:///d:/Projects/CoachingWebsite/docs) directory:

| Document | File Path | Focus Areas |
| :--- | :--- | :--- |
| 📄 **[docs/SPECIFICATION.md](file:///d:/Projects/CoachingWebsite/docs/SPECIFICATION.md)** | Full Platform & Functional Specification | User Personas, Role Matrices, Portal Features, Non-Functional Standards, Regionalization |
| 🏗️ **[docs/ARCHITECTURE.md](file:///d:/Projects/CoachingWebsite/docs/ARCHITECTURE.md)** | Technical Architecture & System Design | C4 Diagrams, DRM Video Transcoding Pipeline, Real-Time Sockets, Database ERD, Redis Cache |
| 🚀 **[docs/DEPLOYMENT.md](file:///d:/Projects/CoachingWebsite/docs/DEPLOYMENT.md)** | 3-Tier Infrastructure & Deployment Manual | Local Dev (Docker Compose), Testing/Staging (EKS Staging + Load Testing), Production (AWS Multi-AZ) |
| 🔄 **[docs/DATA_FLOW_DIAGRAMS.md](file:///d:/Projects/CoachingWebsite/docs/DATA_FLOW_DIAGRAMS.md)** | Data Flow & Sequence Diagrams | DFD Level 0 (Context), Level 1 (Subsystems), Level 2 (Single-Session Auth, DRM Player, Doubts) |
| ⚠️ **[docs/ROADBLOCKS_AND_RISKS.md](file:///d:/Projects/CoachingWebsite/docs/ROADBLOCKS_AND_RISKS.md)** | Technical Roadblocks & Risk Mitigation | Screen Recording Defenses, Konkan Bandwidth, Devanagari Math, Educator SLAs, Risk Matrix |

---

## ⚡ Implementation Roadmap

```
+---------------------------------------------------------------------------------------+
| PHASE 1: Core Foundation, RBAC & Security Shell                                       |
| - Monorepo / modular frontend shell (Student, Teacher, Admin portals)                 |
| - Redis Single-Device Session Lock & Fingerprint validation                           |
| - Bilingual i18n Engine (Marathi / English / Semi-English)                            |
+---------------------------------------------------------------------------------------+
| PHASE 2: Media, DRM Player & Document Sandbox                                         |
| - AES-128 HLS Player with 240p Konkan profile & moving canvas watermark               |
| - Secure Canvas PDF viewer (No download/print)                                        |
| - Lecture Upload & WebRTC live class scheduler                                        |
+---------------------------------------------------------------------------------------+
| PHASE 3: AI Doubt Desk & MHT-CET CBT Exam Arena                                       |
| - Balbharati / PYQ vector database for instant AI doubt answers                       |
| - Teacher escalation queue with Marathi voice note recorder & stylus whiteboard       |
| - Full MHT-CET CBT Exam Simulator with negative marking & state percentile ranking   |
+---------------------------------------------------------------------------------------+
| PHASE 4: Billing, Hardening & Staging Pilot                                           |
| - Razorpay UPI / QR checkout with 2-lecture free trials                               |
| - 10,000 concurrent student load testing & DRM penetration test                      |
| - Regional pilot launch in Maharashtra & Konkan test groups                           |
+---------------------------------------------------------------------------------------+
```
