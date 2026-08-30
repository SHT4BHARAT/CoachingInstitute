# Technical Roadblocks, Architectural Constraints & Risk Mitigation
**Document Version:** 2.0.0 (Brainstormed & Scope-Locked)  
**Platform Focus:** Maharashtra State Board (SSC/HSC) & MHT-CET (Engineering/Pharmacy)  

---

## 1. Executive Summary

With the scope locked on a **Mobile-First Responsive PWA**, a **Hybrid DRM Video Model** (VOD + Live), and an **AI-First Doubt Resolution Engine with Teacher Escalation**, this document catalogs the critical engineering constraints and the pragmatic mitigations engineered to ensure high platform resilience.

---

## 2. Updated Technical Constraints & Mitigations

### 2.1 Web PWA Anti-Piracy Shield
- **Constraint:** Generic web browsers lack OS-level hardware screen capture blockers (`FLAG_SECURE`).
- **Mitigation Architecture:**
  1. **Dynamic Moving Canvas Watermark:** Overlaying `[Student Full Name]`, `[Obfuscated Mobile]`, `[IP Address]`, and `[Timestamp]` across 9 randomized coordinates on the video and document canvas, shifting every 12s.
  2. **Single-Device Active Lock:** Redis-backed 30-second heartbeat ensuring only one active browser session per student account. Concurrent logins instantly trigger WebSocket force logouts.
  3. **Canvas PDF Sandbox:** Eliminates raw PDF exposure in DOM or network payloads by converting pages to canvas bitmaps client-side.

### 2.2 Coastal Konkan & Rural Connectivity (240p Mode)
- **Constraint:** Monsoon network throttling and high packet drop rates in coastal districts (Ratnagiri, Sindhudurg, Raigad).
- **Mitigation Architecture:**
  1. **240p Konkan Adaptive Bitrate Profile:** 250 kbps video + 48 kbps AAC audio for uninterrupted playback on 2G/3G connections.
  2. **PWA Offline Sync:** Service Worker caches encrypted notes, DPP PDFs, and offline quiz payloads via IndexedDB, syncing test submissions when back online.

### 2.3 AI-First Doubt Matching & Marathi Devanagari OCR
- **Constraint:** Students uploading handwritten questions in mixed Marathi/English script require accurate OCR and semantic retrieval against Balbharati textbooks.
- **Mitigation Architecture:**
  1. **Dual Devanagari OCR Pipeline:** Tesseract OCR tuned for Devanagari script + Vision AI extraction.
  2. **Confidence-Gated Escalation:** If AI similarity score $< 0.85$, the ticket automatically bypasses the AI card and routes directly to the assigned teacher's subject queue.

---

## 3. Risk Matrix & Action Blueprint

| ID | Risk Description | Severity | Likelihood | Impact Area | Finalized Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **R-01** | Credential Sharing / Group Buying | **HIGH** | **HIGH** | Revenue | Single-device active session lock enforced via Redis heartbeat & WebSockets. |
| **R-02** | Screen Recording of Paid Lectures | **HIGH** | **MEDIUM** | Content Leakage | Dynamic moving canvas watermark + forensic steganography. |
| **R-03** | Low Bandwidth in Konkan Monsoon | **MEDIUM**| **HIGH** | Retention | Dedicated 240p HLS profile + Audio-only mode + PWA IndexedDB cache. |
| **R-04** | AI Hallucinations in Math / Science | **HIGH** | **LOW** | Academic Quality | RAG grounded strictly on Balbharati textbooks + 1-click teacher escalation. |
| **R-05** | Educator Response Delay during Exams| **MEDIUM**| **HIGH** | SLA Compliance | Auto-rebalancing of unassigned doubts after 60 min to peer faculty. |
