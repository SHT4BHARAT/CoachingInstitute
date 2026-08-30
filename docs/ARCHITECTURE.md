# Technical Architecture & System Design
**Document Version:** 2.1.0 (Next.js TypeScript Edition)  
**Frontend Stack:** Next.js 14+ (App Router) + TypeScript + Vanilla CSS Tokens  
**Backend Stack (Phase 2):** Node.js/Express + PostgreSQL 16 (pgvector) + Redis 7  
**Execution Paradigm:** **Frontend-First MVP** (Complete UI/UX & Interactive Mocks prior to Backend Wiring)  

---

## 1. High-Level System Architecture

```mermaid
graph TD
    User([End Users: Students / Teachers / Admins]) --> Cloudflare[Cloudflare CDN & Enterprise WAF / DDoS]
    
    subgraph Frontend Tier: Next.js 14+ App Router
        Cloudflare --> NextPWA[Next.js PWA Client - TypeScript]
        
        subgraph Channel Route Groups
            NextPWA --> StudentRoutes[app/student/ - Student Portal]
            NextPWA --> TeacherRoutes[app/teacher/ - Educator Studio]
            NextPWA --> AdminRoutes[app/admin/ - Admin Control Hub]
        end
        
        subgraph In-Browser Security & Render Engines
            StudentRoutes --> WatermarkEngine[Dynamic Canvas Watermark: Moving every 12s]
            StudentRoutes --> PDFCanvas[PDF.js Canvas Sandbox: Zero Download]
            StudentRoutes --> CBTExamEngine[MHT-CET / Board CBT Simulator]
            StudentRoutes --> KaTeXEngine[Devanagari KaTeX Math Parser]
        end
    end

    subgraph Backend Services Layer (Phase 2 Backend Integration)
        NextPWA -.->|API Requests| Gateway[API Gateway / Auth Guard]
        Gateway --> AuthService[Auth & Session Service - Redis Heartbeat]
        Gateway --> AcademicService[Academic & Batch Core Service]
        Gateway --> AIDoubtService[AI Doubt Resolver - Balbharati RAG]
        Gateway --> FacultyDoubtService[Teacher Escalation & Whiteboard Hub]
        Gateway --> CBTService[MHT-CET CBT Exam Engine]
        Gateway --> MediaService[Transcoding & DRM Orchestrator]
    end

    subgraph Data Tier
        AuthService & AcademicService & CBTService --> PG[(PostgreSQL 16 Multi-AZ)]
        AIDoubtService --> PGVector[(pgvector - Balbharati Embeddings)]
        AuthService & FacultyDoubtService --> RedisCluster[(Redis 7 Cluster: Sessions / PubSub)]
        MediaService --> S3[(AWS S3 / MinIO Encrypted Media)]
    end
```
