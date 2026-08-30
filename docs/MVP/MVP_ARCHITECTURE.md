# Minimum Viable Product (MVP) Architecture & Design
**Frontend Architecture:** Next.js 14+ (App Router) + TypeScript + Vanilla CSS Tokens  
**Backend Architecture:** Modular API Layer (Node.js/Express) + PostgreSQL (pgvector) + Redis  
**Strategy:** **Frontend-First MVP** (Complete UI/UX & Interactive Client Mocking prior to Backend Integration)  

---

## 1. High-Level Architecture (Frontend-First Validation)

```mermaid
graph TD
    subgraph Client Architecture: Next.js 14+ App Router
        PWA[Next.js PWA Client - TypeScript]
        
        subgraph Portals & Route Groups
            SP[app/student/ - Student Portal]
            TP[app/teacher/ - Educator Studio]
            AP[app/admin/ - Admin Control Hub]
        end
        
        subgraph Client-Side Subsystems
            WM[Dynamic Canvas Watermark Engine]
            PDFC[Canvas-Sandboxed PDF.js Viewer]
            CBT[MHT-CET / Board CBT Exam Engine]
            KaTeXEngine[Devanagari KaTeX Math Parser]
            MockStore[In-Memory Mock State & LocalStorage]
        end

        PWA --> SP & TP & AP
        SP --> WM & PDFC & CBT & KaTeXEngine & MockStore
        TP --> KaTeXEngine & MockStore
        AP --> MockStore
    end

    subgraph Backend Integration Layer (Post-UI Validation)
        NextAPI[Next.js API Routes / External Node.js API]
        PG[(PostgreSQL 16 with pgvector)]
        Redis[(Redis 7 Cluster)]
        S3[(AWS S3 / MinIO Encrypted Storage)]

        PWA -.->|API Contract| NextAPI
        NextAPI --> PG & Redis & S3
    end
```

---

## 2. Next.js 14+ Project Structure

```
frontend/
├── public/
│   ├── manifest.json              # PWA Configuration
│   ├── icons/                     # Maharashtra EdTech app icons
│   └── fonts/                     # Self-hosted Noto Sans Devanagari & Mukta WOFF2
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with ThemeProvider & LanguageProvider
│   │   ├── page.tsx               # Landing page with Course Explorer & Demo Lecture Gates
│   │   ├── student/
│   │   │   ├── layout.tsx         # Student channel layout & single-session heartbeat
│   │   │   ├── page.tsx           # Student Dashboard & Batch Hub
│   │   │   ├── lectures/[id]/     # DRM Video Player with Dynamic Canvas Watermark
│   │   │   ├── notes/[id]/        # Canvas-Sandboxed PDF Notes Viewer
│   │   │   ├── doubts/            # AI Doubt Desk & Teacher Escalation Queue
│   │   │   └── exams/[id]/        # MHT-CET CBT Exam Simulator
│   │   ├── teacher/
│   │   │   ├── layout.tsx         # Educator Studio Layout
│   │   │   ├── page.tsx           # Educator Command Dashboard
│   │   │   ├── upload/            # Lecture Upload & Tagging Interface
│   │   │   ├── doubts/            # Doubt Queue with Interactive Stylus Whiteboard
│   │   │   └── assessments/       # MCQ / DPP Question Builder with Devanagari LaTeX
│   │   └── admin/
│   │       ├── layout.tsx         # Admin Hub Layout
│   │       ├── page.tsx           # Real-Time Telemetry & Watch-Time Metrics
│   │       ├── anti-piracy/       # Session Kill-Switch & Watermark Lookup
│   │       └── batches/           # Batch Config, Pricing & GST Invoicing
│   ├── components/
│   │   ├── common/                # Navbar, BilingualToggle, Modal, Toast
│   │   ├── player/                # DRMPlayer, DynamicWatermarkCanvas, SpeedSelector
│   │   ├── notes/                 # CanvasPDFViewer, NotesToolbar
│   │   ├── doubts/                # AIDoubtCard, VoiceRecorder, StylusWhiteboard
│   │   └── exam/                  # CBTExamHeader, QuestionPalette, QuestionCard
│   ├── context/
│   │   ├── AuthContext.tsx        # Single-device session state
│   │   └── LanguageContext.tsx    # Marathi / Semi-English / English i18n
│   ├── lib/
│   │   ├── mockData.ts            # Realistic Maharashtra SSC/HSC & CET curriculum data
│   │   ├── watermark.ts           # Canvas dynamic coordinate randomization engine
│   │   └── katexRender.ts         # Math formula compilation
│   └── styles/
│       ├── globals.css            # Vanilla CSS Design Tokens
│       ├── student.module.css
│       ├── teacher.module.css
│       └── admin.module.css
```
