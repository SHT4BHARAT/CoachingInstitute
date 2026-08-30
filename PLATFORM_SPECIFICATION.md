# Regional EdTech Platform Specification & System Architecture
**Project Codename:** MahaShiksha / KonkanVidya Engine  
**Target Demographic:** Maharashtra State Board (SSC/HSC), MHT-CET, NEET/JEE (Marathi & Semi-English Medium)  
**Security Standard:** High-Assurance DRM & Zero-Trust Session Management  

---

## 1. Executive Summary

### 1.1 Vision & Regional Focus
The platform is an enterprise-grade, high-security EdTech ecosystem engineered to deliver hyper-localized test preparation and academic coaching for students across Maharashtra, specifically focusing on the Greater Maharashtra and Konkan regions. The platform mirrors the operational capabilities of market leaders (PhysicsWallah, Unacademy, Byju's) while providing native Devanagari/Marathi script integration, bilingual (Semi-English) curriculum structures, and low-latency streaming optimized for varied connectivity profiles (Tier-2/3 and coastal rural networks).

### 1.2 Core Pillars
1. **Isolated Role Channels:** Strict boundary isolation between Students, Faculty/Educators, and Institute Administrators.
2. **High-Assurance Content Security:** Multi-layered anti-piracy, DRM video pipelines, dynamic watermarking, and secure sandbox document viewing.
3. **Academic Workflow Engine:** Batch-level access controls, asynchronous and live doubt-solving channels, timed automated quizzes with regional language font engines, and lecture note distribution.
4. **Administrative Telemetry:** Granular monitoring of student watch-time, educator response SLAs, attendance analytics, and device fingerprint compliance.

---

## 2. Architecture & Tech Stack

### 2.1 High-Level Architecture

```
                                +---------------------------------------------------+
                                |            Cloudflare CDN + WAF / DDoS            |
                                +---------------------------------------------------+
                                                          |
                                +-------------------------+-------------------------+
                                |                                                   |
                     +---------------------+                             +---------------------+
                     | React/Vite Frontends|                             | Static Assets & DRM |
                     | - Student Web App   |                             | HLS Video Chunks    |
                     | - Educator Studio   |                             | CloudFront Signed   |
                     | - Admin Control Hub |                             +---------------------+
                     +---------------------+                                        |
                                |                                                   |
                                v                                                   |
            +---------------------------------------+                               |
            |      API Gateway / Reverse Proxy      |                               |
            |     (Traefik / Nginx / Kong)          |                               |
            +---------------------------------------+                               |
                                |                                                   |
         +----------------------+----------------------+                            |
         |                      |                      |                            |
         v                      v                      v                            v
+------------------+   +------------------+   +------------------+        +-------------------+
|  Auth & Session  |   | Academic Core    |   | Doubt Resolution |        | Transcoding & DRM |
|     Service      |   |     Service      |   |   (WebSockets)   |        | Pipeline (FFmpeg/ |
| (JWT/Fingerprint)|   | (Batches/Quizzes)|   | (Realtime Engine)|        |  MediaConvert)    |
+------------------+   +------------------+   +------------------+        +-------------------+
         |                      |                      |                            |
         +----------------------+----------------------+                            |
                                |                                                   |
         +----------------------+----------------------+                            |
         |                                             |                            |
         v                                             v                            v
+------------------+                         +------------------+         +-------------------+
| PostgreSQL (v16) |                         | Redis (Cache/MQ/ |         | S3 Encrypted Raw  |
| Primary Database |                         | Socket Adapter)  |         | & Processed Media |
+------------------+                         +------------------+         +-------------------+
```

### 2.2 Technology Stack

| Layer | Technology Selected | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite + TypeScript | High performance, rapid HMR, robust typing for complex state management. |
| **Styling & UI** | Vanilla CSS Design Tokens + Radix UI Primitives | Clean aesthetic, zero Tailwind overhead, zero layout shifts, full customization. |
| **Font Engine** | Google Noto Sans Devanagari + Mukta + Inter | Native Devanagari ligature accuracy for Marathi mathematical and scientific symbols. |
| **Backend API** | Node.js (NestJS / Express) + TypeScript | Modular architecture, native async I/O, enterprise-grade dependency injection. |
| **Database** | PostgreSQL 16 (with Row Level Security - RLS) | ACID compliance, complex relational models for batches, quizzes, and telemetry. |
| **Cache & Realtime** | Redis 7 (Cluster) + Socket.io | Session store, rate limiting, pub/sub for doubt ticketing and live polling. |
| **Video Engine** | FFmpeg Worker Cluster / AWS MediaConvert + HLS | AES-128 segment encryption, CMAF packaging, multi-bitrate adaptive ladder. |
| **Document Sandbox**| PDF.js wrapped in custom HTML5 Canvas | Disables native browser download/print hooks; embeds real-time dynamic overlays. |
| **Storage & Delivery**| AWS S3 (KMS Encrypted) + CloudFront Signed Cookies | Zero public S3 access; short-lived, signed token verification per segment. |
| **Payment Gateway** | Razorpay / Cashfree (UPI 2.0 AutoPay, RuPay, QR) | Dominant regional checkout options in Maharashtra. |

---

## 3. Security, DRM & Anti-Piracy Framework

EdTech piracy in regional India requires strict prevention against account sharing, screen capturing, and stream ripping.

```
+-----------------------------------------------------------------------------------+
|                             ANTI-PIRACY SECURITY LAYERS                           |
+-----------------------------------------------------------------------------------+
| 1. Dynamic Canvas Watermarking                                                    |
|    - Invisible & Visible canvas overlay moving pseudo-randomly every 10-15s       |
|    - Payload: Student Full Name + Obfuscated Phone (98****1210) + Student UUID    |
|               + Current Session IP + UTC Timestamp                               |
+-----------------------------------------------------------------------------------+
| 2. Strict Single-Device Concurrency Control                                       |
|    - Device Fingerprinting (Canvas, WebGL, AudioContext, Screen Res, OS)          |
|    - Redis-backed Active Session Heartbeat (Every 30 seconds)                      |
|    - Immediate termination of older session upon new login with audit alert       |
+-----------------------------------------------------------------------------------+
| 3. Video Pipeline Protection                                                      |
|    - Encrypted HLS (m3u8 index with AES-128 CBC chunk encryption)                 |
|    - CloudFront Signed Cookies bound to student IP and 120-minute expiry          |
|    - Automated short-lived key rotation endpoint (/api/v1/drm/key-exchange)       |
+-----------------------------------------------------------------------------------+
| 4. Anti-Inspection & Screen Capture Mitigation                                    |
|    - DevTools detection (debugger loop trapping, console size delta detection)    |
|    - CSS `user-select: none;` and Canvas DRM rendering for notes/slides          |
|    - Right-click, print-screen, and key combination interception                  |
+-----------------------------------------------------------------------------------+
```

---

## 4. Role-Based Channel Specifications

### 4.1 Student Portal (मराठी & English)

```
+-----------------------------------------------------------------------------------+
| STUDENT EXPERIENCE                                                                |
+-----------------------------------------------------------------------------------+
| 1. Regionalized Dashboard                                                         |
|    - Instant Language Toggle: Marathi (मराठी) / Semi-English / English            |
|    - Enrolled Batches (e.g., "इयत्ता १०वी - बोर्ड परीक्षा २०२६", "MHT-CET संकल्प")|
|    - Today's Live Schedule, Pending Quizzes, Unresolved Doubts                    |
+-----------------------------------------------------------------------------------+
| 2. Lecture Player (Live & Recorded)                                               |
|    - Adaptive HLS Player (1080p down to 240p for Konkan rural bandwidth)          |
|    - 0.75x to 2x playback speed control with pitch correction                     |
|    - Integrated chapter markers, timestamped notes, and bookmarks                 |
|    - Overlay watermark with Student Name & Mobile Number                          |
+-----------------------------------------------------------------------------------+
| 3. Study Material & Notes Viewer                                                  |
|    - Secure canvas-rendered PDF viewer (No direct PDF URL exposed)                |
|    - In-browser highlighter and personal sticky notes                             |
|    - Batch-wise categorization: Theory, Formula Sheets, Question Banks (PYQ)     |
+-----------------------------------------------------------------------------------+
| 4. Interactive Quiz & Mock Test Arena                                             |
|    - NTA & MHT-CET Exam Interface Simulator                                       |
|    - Full Devanagari equation and formula rendering via KaTeX / MathJax           |
|    - Instant score breakdown: Accuracy, Speed, Weak Topic Analysis, State Rank    |
+-----------------------------------------------------------------------------------+
| 5. Doubt Clearing Desk                                                            |
|    - Submit question via text, image crop upload, or audio note                   |
|    - Notification when assigned teacher posts video/audio/written solution        |
+-----------------------------------------------------------------------------------+
```

### 4.2 Faculty / Educator Studio

```
+-----------------------------------------------------------------------------------+
| TEACHER / EDUCATOR STUDIO                                                         |
+-----------------------------------------------------------------------------------+
| 1. Batch Command Center                                                           |
|    - View assigned batches, schedule live interactive classes via WebRTC/RTMP     |
|    - Upload pre-recorded video lectures for automated transcoding pipeline        |
+-----------------------------------------------------------------------------------+
| 2. Material Publishing Suite                                                      |
|    - Upload DPPs (Daily Practice Problems), lecture slides, handwritten notes     |
|    - Set publishing schedules, batch visibility, and syllabus module mapping      |
+-----------------------------------------------------------------------------------+
| 3. Doubt Resolution Queue                                                         |
|    - Centralized queue filtered by subject (गणित/Maths, भौतिकशास्त्र/Physics, etc.)|
|    - Interactive whiteboard tool for sketching mathematical proofs                |
|    - Voice recording tool for rapid audio explanations in Marathi                 |
+-----------------------------------------------------------------------------------+
| 4. Assessment Generator                                                           |
|    - Question Bank CMS supporting LaTeX, Marathi typography, and diagrams         |
|    - Automated grading for objective quizzes; manual grading UI for subjective    |
|    - Real-time batch performance heatmap and common error identification          |
+-----------------------------------------------------------------------------------+
```

### 4.3 Administrator Operations Hub

```
+-----------------------------------------------------------------------------------+
| ADMIN OPERATIONS HUB                                                              |
+-----------------------------------------------------------------------------------+
| 1. Platform & User Telemetry                                                      |
|    - Real-time active streams, student concurrency, system load                   |
|    - Educator SLA Tracking: Average doubt resolution time, classes conducted      |
|    - Student Engagement: Lecture completion rate, drop-off time points             |
+-----------------------------------------------------------------------------------+
| 2. Batch & Curriculum Management                                                  |
|    - Create batches, assign educators, configure fee structures, discounts        |
|    - Syllabus milestone tracking (HSC Board timeline vs. actual progress)         |
+-----------------------------------------------------------------------------------+
| 3. Security & Anti-Fraud Center                                                   |
|    - Concurrent session anomaly detection, rapid IP hopping alerts                |
|    - Watermark investigation log (lookup student identity from reported leak)     |
+-----------------------------------------------------------------------------------+
| 4. Financial & Enrollment Reconciliation                                          |
|    - Automated GST invoicing, regional payment method settlement logs             |
|    - Installment / EMI tracking, batch migration, and access revocation           |
+-----------------------------------------------------------------------------------+
```

---

## 5. Database Schema Specification (PostgreSQL)

```sql
-- 1. Core Users & RBAC
CREATE TYPE user_role AS ENUM ('STUDENT', 'TEACHER', 'ADMIN', 'SUPERADMIN');
CREATE TYPE language_preference AS ENUM ('mr', 'en', 'bilingual');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'STUDENT',
    preferred_lang language_preference DEFAULT 'bilingual',
    region VARCHAR(100) DEFAULT 'Maharashtra',
    district VARCHAR(100), -- e.g., Ratnagiri, Sindhudurg, Thane, Pune
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Batches & Courses
CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_mr VARCHAR(255) NOT NULL, -- "१०वी संपूर्ण विज्ञान व गणित बॅच २०२६"
    title_en VARCHAR(255) NOT NULL, -- "Class 10th Complete Sci & Math Batch 2026"
    slug VARCHAR(100) UNIQUE NOT NULL,
    target_exam VARCHAR(100) NOT NULL, -- "SSC_BOARD", "HSC_BOARD", "MHT_CET", "NEET"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Batch Enrollments
CREATE TABLE batch_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    payment_status VARCHAR(50) DEFAULT 'COMPLETED',
    UNIQUE(student_id, batch_id)
);

-- 3. Lectures & DRM Video Storage
CREATE TABLE lectures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title_mr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL, -- "Physics", "Chemistry", "Mathematics", "Biology"
    chapter_name VARCHAR(150),
    description TEXT,
    hls_master_playlist_url TEXT NOT NULL, -- S3/CloudFront encrypted m3u8
    duration_seconds INTEGER DEFAULT 0,
    is_live BOOLEAN DEFAULT FALSE,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Secure Study Materials / Notes
CREATE TABLE study_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    material_type VARCHAR(50) NOT NULL, -- 'HANDWRITTEN_NOTES', 'DPP', 'FORMULA_SHEET', 'PYQ'
    encrypted_s3_key TEXT NOT NULL,
    page_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quizzes & Tests (NTA / MHT-CET Pattern)
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    title_mr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    time_limit_minutes INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    passing_marks INTEGER NOT NULL,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text_mr TEXT NOT NULL,
    question_text_en TEXT,
    options_json JSONB NOT NULL, -- [{"id": "A", "text_mr": "...", "text_en": "..."}, ...]
    correct_option_id VARCHAR(10) NOT NULL,
    marks_positive NUMERIC(4,2) DEFAULT 1.00,
    marks_negative NUMERIC(4,2) DEFAULT 0.00,
    solution_explanation_mr TEXT,
    order_index INTEGER DEFAULT 0
);

-- 6. Doubt Resolution System
CREATE TYPE doubt_status AS ENUM ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

CREATE TABLE doubts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    attachment_url TEXT,
    assigned_teacher_id UUID REFERENCES users(id),
    status doubt_status DEFAULT 'OPEN',
    resolution_text TEXT,
    resolution_audio_url TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Security Telemetry & Sessions
CREATE TABLE user_active_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_fingerprint VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
    session_token_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, device_fingerprint)
);
```

---

## 6. Integration Specifications

### 6.1 Payment Gateway Pipeline (Razorpay / Cashfree)
1. **Order Initialization:** Web client initiates checkout -> Backend creates cryptographic order via Razorpay API.
2. **Webhook Verification:** Payment captured event validated with HMAC SHA-256 signature before granting `batch_enrollments` access.
3. **Regional Invoicing:** Automated Marathi/English PDF invoice generated with SAC 999293 (Educational Services) GST classification.

### 6.2 Communication & Notification Hub (SMS & WhatsApp)
1. **Providers:** Gupshup / Fast2SMS.
2. **Templates:**
   - *OTP Verification:* "आपला महा-शिक्षा लॉगिन ओटीपी {var1} आहे. कोणाशीही शेअर करू नका."
   - *Live Class Alert:* "{var1} बॅचचा '{var2}' विषयाचा लाईव्ह क्लास ५ मिनिटांत सुरू होत आहे."
   - *Doubt Resolved:* "तुमच्या '{var1}' शंकेचे निरसन सरांनी केले आहे. ॲपमध्ये तपासा."

---

## 7. Compliance & Regional Governance

1. **Digital Personal Data Protection Act (DPDPA 2023):** Explicit parental consent flow for students under age 18 during onboarding.
2. **Right to Erasure:** Student profile deactivation and data purging pipeline.
3. **Bandwidth Optimization for Coastal/Rural Regions:** Dynamic chunk fallbacks down to 240p / 128kbps audio-only mode for low-reception Konkan belt zones.

---

## 8. Success Metrics & Performance KPIs

| Metric | Target SLA / KPI | Validation Method |
| :--- | :--- | :--- |
| **API Response Time (P95)** | < 180 ms | Datadog / OpenTelemetry APM |
| **Video Start Time (4G/LTE)** | < 1.2 seconds | Real-User Monitoring (RUM) metrics |
| **Doubt Resolution SLA** | < 120 minutes during active hours | Automated Admin SLA dashboard |
| **Concurrent Session Violations** | 0 allowed; instant kill | Redis token heartbeat validator |
| **Devanagari Font Rendering Speed** | Zero FOUT (Flash of Unstyled Text) | Preloaded WOFF2 subset fonts |

---

## 9. Implementation Roadmap

```
+---------------------------------------------------------------------------------------+
| PHASE 1: Core Foundation & Security Shell (Weeks 1-3)                                 |
| - RBAC Auth engine with Device Fingerprinting and single-session lock                 |
| - High-performance UI Shell (Student, Teacher, Admin portals) with Marathi/EN switch |
| - PostgreSQL schema migration + Redis session infrastructure                          |
+---------------------------------------------------------------------------------------+
| PHASE 2: Media & Academic Engine (Weeks 4-6)                                          |
| - HLS Transcoding worker with dynamic watermark canvas generator                      |
| - Secure Canvas Document/PDF viewer                                                   |
| - Live Class WebRTC/RTMP streaming pipeline                                           |
+---------------------------------------------------------------------------------------+
| PHASE 3: Interactive Learning & Doubts (Weeks 7-9)                                     |
| - NTA/MHT-CET Pattern Quiz engine with KaTeX Devanagari math render                   |
| - Real-time Doubt Ticket Queue with whiteboard & audio responses                      |
| - Telemetry tracking (Watch-time, engagement scores, teacher SLAs)                    |
+---------------------------------------------------------------------------------------+
| PHASE 4: Payment, Hardening & Staging Pilot (Weeks 10-12)                             |
| - Razorpay UPI/AutoPay integration + automated invoicing                              |
| - Penetration testing (DRM rip tests, concurrent breach attempts)                     |
| - Pilot launch across 500 Konkan/Maharashtra students                                 |
+---------------------------------------------------------------------------------------+
```
