# Finalized System Specification: Regional EdTech Platform
**Document Version:** 2.0.0 (Brainstormed & Scope-Locked)  
**Target Region:** Maharashtra & Konkan Region (Tier-2/3 & Coastal Focus)  
**Primary Curriculums:** Maharashtra State Board (10th SSC & 12th HSC Science) & MHT-CET (Engineering/Pharmacy)  
**Medium of Instruction:** Marathi (मराठी) & Semi-English (Bilingual)  
**Client Form Factor:** Mobile-First Responsive Progressive Web App (PWA) with Offline Caching  

---

## 1. Executive Summary & Scope Decisions

| Architectural Scope Area | Finalized Specification |
| :--- | :--- |
| **Primary Curriculum** | **MHT-CET + Maharashtra State Board (10th SSC & 12th HSC Science)** in Marathi & Semi-English. |
| **Video Delivery Model**| **Hybrid Model:** Pre-recorded DRM VOD lectures for core conceptual theory + Scheduled Live interactive WebRTC sessions for numerical problem solving, test discussions, and revisions. |
| **Doubt Resolution** | **AI-Assisted First Response + Faculty Escalation:** Immediate AI responses indexed from State Board textbooks & PYQs, automatically escalating unresolved doubts to human faculty (with Marathi voice note & whiteboard tools). |
| **Target Client** | **Mobile-First Responsive PWA:** Universal access across smartphones, tablets, and laptops with low-bandwidth offline caching for Konkan network resilience. |
| **Monetization Engine** | **Per-Batch One-Time / Installment Fee:** Students purchase specific courses (e.g., *MHT-CET Crash Course 2026*, *१०वी बोर्ड विज्ञान महा-बॅच*) with 2 free demo lectures per subject. |
| **Assessment Arena** | **Full MHT-CET / NTA CBT Simulator + Daily Practice Problems (DPP):** Timed section-based test engine, question status palette, custom marking rules (+2/0, +4/-1), and state-wide percentile analytics. |
| **Content Security** | **Full Defensive Web Shield:** Dynamic moving canvas watermark (Name + Phone + IP + Timestamp) + AES-128 HLS chunk encryption + Single-device login lock (Redis heartbeat) + Canvas PDF notes sandbox + DevTools anti-scrape hooks. |

---

## 2. Role-Based Channel Specifications

### 2.1 Student Portal (विद्यार्थी कक्ष)

```
+---------------------------------------------------------------------------------------------------+
| 1. Regionalized Learning Dashboard                                                                |
|    - Language toggle: Pure Marathi (मराठी), Semi-English (द्विभाषिक), English                     |
|    - Enrolled Batches with progress ring (Syllabus % completed, watch time)                       |
|    - Daily Schedule: Upcoming live revision sessions, daily practice problems (DPP), pending tests |
+---------------------------------------------------------------------------------------------------+
| 2. High-Security Hybrid Video Player                                                              |
|    - Multi-bitrate HLS streaming: 1080p, 720p, 480p, 360p, and 240p Konkan Low-Bandwidth Mode     |
|    - Moving semi-transparent watermark: [Student Name] [98****4321] [IP: 103.21.x.x] [Timestamp] |
|    - Speed modifier (0.75x to 2.0x) with pitch normalization; timestamped chapter bookmarks       |
|    - 2 Free Demo Lectures accessible per course prior to payment                                 |
+---------------------------------------------------------------------------------------------------+
| 3. Canvas-Protected Notes & Study Material                                                        |
|    - PDF.js rendered directly to HTML5 Canvas (Zero raw PDF file exposure)                       |
|    - Right-click, Ctrl+P, Ctrl+S, printing, and screenshot shortcuts intercepted and blocked      |
|    - Categorized into: Class Notes, Formula Sheets, DPP PDFs, and Maharashtra PYQ Archives       |
+---------------------------------------------------------------------------------------------------+
| 4. AI-First & Faculty Doubt Clearing Desk                                                         |
|    - Step 1: Student submits doubt (Text, Cropped Image, or Marathi Voice Note)                   |
|    - Step 2: Instant AI Engine analyzes question against Balbharati & MHT-CET database (0-5 sec) |
|    - Step 3: If unsatisfied, 1-click escalation to assigned Subject Teacher                      |
|    - Step 4: Teacher delivers annotated whiteboard solution or Marathi voice note                |
+---------------------------------------------------------------------------------------------------+
| 5. Full MHT-CET / Board CBT Exam Simulator                                                        |
|    - Real MHT-CET UI: Section 1 (Physics & Chemistry), Section 2 (Mathematics / Biology)          |
|    - Interactive Question Palette (Answered, Not Answered, Marked for Review)                     |
|    - KaTeX Devanagari mathematical formula & diagram rendering                                    |
|    - Instant Results: State Rank, Percentile, Accuracy %, Question-by-Question Solution in Marathi|
+---------------------------------------------------------------------------------------------------+
```

---

### 2.2 Faculty / Educator Studio (शिक्षक स्टुडिओ)

```
+---------------------------------------------------------------------------------------------------+
| 1. Batch & Lecture Management                                                                     |
|    - Upload pre-recorded MP4 lectures (triggers automated SQS -> FFmpeg HLS transcoding)          |
|    - Schedule and launch Live WebRTC/RTMP Revision Sessions with live chat and student polling   |
+---------------------------------------------------------------------------------------------------+
| 2. Material Publishing Suite                                                                      |
|    - Upload DPPs, handwritten notes, and formula sheets; batch-tagging and auto-release schedules |
+---------------------------------------------------------------------------------------------------+
| 3. Doubt Resolution Workspace                                                                     |
|    - Inbox of AI-escalated doubts filtered by Subject (गणित, भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र)|
|    - Stylus-compatible digital whiteboard for sketching proofs, derivations, and circuit diagrams|
|    - In-browser Marathi voice recorder to dispatch rapid audio solutions                          |
+---------------------------------------------------------------------------------------------------+
| 4. Question Bank & Assessment Generator                                                           |
|    - Author MCQs and DPPs with LaTeX Devanagari typography support                                |
|    - Set marking schemes (+2 for Math, +1 for Physics/Chem, 0 negative for MHT-CET)               |
|    - Batch performance heatmaps: identify toughest questions and common student mistakes          |
+---------------------------------------------------------------------------------------------------+
```

---

### 2.3 Administrator Operations Hub (प्रशासकीय नियंत्रण केंद्र)

```
+---------------------------------------------------------------------------------------------------+
| 1. Live Activity & Telemetry Monitor                                                              |
|    - Real-time active streams, student concurrency count, server CPU/memory load                  |
|    - Student Engagement: Average watch time per lecture, drop-off heatmap, DPP completion rates   |
|    - Faculty SLA Tracker: Average doubt resolution turnaround time (Target: < 120 mins)          |
+---------------------------------------------------------------------------------------------------+
| 2. Anti-Piracy Security Command Center                                                            |
|    - Single-device active session enforcement (Redis heartbeat monitor)                           |
|    - Concurrent login attempt alerts; one-click force logout & account freeze                     |
|    - Forensic Watermark Lookup: Enter leaked watermark phone/timestamp to identify infringer      |
+---------------------------------------------------------------------------------------------------+
| 3. Batch, Curriculum & Financial Center                                                           |
|    - Create batches, assign educators, configure pricing & 2-lecture free trials                  |
|    - Razorpay / Cashfree payment settlement reconciliation with automated GST invoices (SAC 999293)|
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Security & Anti-Piracy Architecture

```
+-----------------------------------------------------------------------------------+
| ANTI-PIRACY SECURITY PROTOCOLS                                                    |
+-----------------------------------------------------------------------------------+
| 1. Dynamic Canvas Watermarking                                                    |
|    - Moves every 12 seconds across 9 randomized screen zones                      |
|    - Formatted string: [Full Name] | [98****4321] | [IP Address] | [UTC Time]     |
+-----------------------------------------------------------------------------------+
| 2. Zero Raw Media Exposure                                                        |
|    - HLS AES-128 chunk encryption with dynamic key exchange endpoint              |
|    - CloudFront Signed Cookies expiring every 120 minutes                         |
+-----------------------------------------------------------------------------------+
| 3. Single-Device Session Lock                                                     |
|    - Browser fingerprinting (WebGL + Canvas + Screen + AudioContext hash)         |
|    - 30-second Redis heartbeat; immediate eviction of prior device upon new login |
+-----------------------------------------------------------------------------------+
| 4. Notes Sandbox & Anti-Inspection                                                |
|    - PDF rendered to HTML5 Canvas; direct binary download URLs are blocked       |
|    - DevTools detection loop and context menu suppression                         |
+-----------------------------------------------------------------------------------+
```

---

## 4. Regional & Low-Bandwidth Optimizations

1. **240p Konkan Low-Bandwidth Profile:** H.264 Baseline at 250 kbps video + 48 kbps AAC audio for rural coastal connectivity.
2. **Audio-Only Mode:** 32 kbps audio stream with synchronized static slide images.
3. **PWA Offline Sync:** Notes and offline quiz attempts stored in IndexedDB, auto-syncing when internet restores.
4. **Devanagari Font Engine:** Subsets of Google `Noto Sans Devanagari` and `Mukta` preloaded with KaTeX math rendering.
