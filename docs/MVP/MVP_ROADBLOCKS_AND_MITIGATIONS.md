# MVP Roadblocks & Technical Mitigations
**Scope:** Actionable Solutions for Minimum Viable Product (Phase 1)  
**Target Region:** Maharashtra State Board & MHT-CET (Konkan & Greater Maharashtra)  

---

## 1. Executive Summary

Implementing an EdTech MVP with enterprise-level security, AI doubt answering, and regional optimization within a 4-week window involves key engineering trade-offs. This document catalogs each identified roadblock and provides the concrete architectural mitigation required to build and deploy the MVP successfully.

---

## 2. Technical Roadblocks & Actionable Mitigations

### 🚧 Roadblock 1: Expensive Video Transcoding Infrastructure vs. MVP Budget
* **The Hurdle:** Enterprise cloud transcoding (AWS Elemental MediaConvert) incurs high setup complexity, AWS IAM overhead, and per-minute costs that drain early-stage capital during MVP validation.
* **Concrete Mitigation:**
  1. **Containerized FFmpeg Transcoder Worker:** Run an in-house Dockerized FFmpeg worker process that listens to an upload queue in Redis.
  2. **Automated Multi-Bitrate AES-128 HLS Script:** The worker takes any uploaded `.mp4` file and generates a 4-tier adaptive ladder (`1080p`, `720p`, `480p`, and `240p Konkan Mode`), automatically generating `enc.key`, `enc.keyinfo`, and `.m3u8` playlists in a single pass.
  3. **Zero AWS Cost:** Runs entirely on the existing backend host machine.

```bash
# Production-ready FFmpeg AES-128 HLS Transcoding Command for MVP:
ffmpeg -i raw_lecture.mp4 \
  -filter_complex \
  "[0:v]split=4[v1,v2,v3,v4]; \
   [v1]scale=w=1920:h=1080[v1out]; \
   [v2]scale=w=1280:h=720[v2out]; \
   [v3]scale=w=854:h=480[v3out]; \
   [v4]scale=w=426:h=240[v4out]" \
  -map "[v1out]" -c:v:0 libx264 -b:v:0 2500k \
  -map "[v2out]" -c:v:1 libx264 -b:v:1 1200k \
  -map "[v3out]" -c:v:2 libx264 -b:v:2 600k \
  -map "[v4out]" -c:v:3 libx264 -b:v:3 250k \
  -map a:0 -c:a aac -b:a 64k \
  -hls_time 6 -hls_playlist_type vod \
  -hls_key_info_file /keys/enc.keyinfo \
  -master_pl_name master.m3u8 \
  -f hls /output/stream_%v.m3u8
```

---

### 🚧 Roadblock 2: AI Hallucinations in Marathi Math & Science Solutions
* **The Hurdle:** Standard general-purpose AI LLMs produce incorrect mathematical steps or hallucinated Marathi scientific terminology when asked complex State Board/MHT-CET questions.
* **Concrete Mitigation:**
  1. **Strict Knowledge-Gated RAG:** Vectorize official Balbharati 10th/12th textbooks and 10 years of MHT-CET Previous Year Questions (PYQ) into PostgreSQL using `pgvector`.
  2. **Cosine Similarity Threshold Gate ($\ge 0.85$):** If the vector search cosine similarity is below 0.85, the AI engine is suppressed from guessing, and the doubt is automatically forwarded to the assigned subject faculty.
  3. **1-Click Human Escalation:** If the student finds the AI answer insufficient, a single tap on *"शिक्षकांना विचारा"* routes the exact question context to the teacher's whiteboard queue.

---

### 🚧 Roadblock 3: Client-Side Content Piracy & Screen Recording in Web Browsers
* **The Hurdle:** Desktop and mobile web browsers cannot enforce OS-level `FLAG_SECURE` screen blacking unlike native mobile apps.
* **Concrete Mitigation:**
  1. **Dynamic Pseudo-Random Watermark:** Superimpose a moving semi-transparent overlay directly on the HTML5 video canvas displaying `[Student Full Name] | [98****4321] | [IP Address] | [Time]`. Coordinates shift across 9 screen zones every 12 seconds, making static cropping impossible.
  2. **Single-Device Concurrency Lock:** Redis tracks the active session hash. A second login immediately evicts the first session with a WebSocket `FORCE_LOGOUT` signal.
  3. **Canvas PDF Notes Sandbox:** PDF notes are rendered as in-memory canvas pixels via PDF.js worker; no direct PDF download URLs exist in network traffic.

---

### 🚧 Roadblock 4: High Packet Loss & Low Bandwidth in Coastal Konkan Regions
* **The Hurdle:** Coastal districts (Ratnagiri, Sindhudurg) and rural interiors experience severe 4G network throttling during monsoon periods, causing continuous video buffering.
* **Concrete Mitigation:**
  1. **Dedicated 240p Konkan HLS Profile:** Ultra-low bitrate profile (250 kbps video + 48 kbps audio) optimized for sub-1Mbps network conditions.
  2. **Progressive Web App (PWA) Offline Cache:** Service Worker caches encrypted notes, formula sheets, and offline practice test question sets in IndexedDB for seamless offline practice.

---

### 🚧 Roadblock 5: Teacher Doubt Response Bottlenecks during Exam Peaks
* **The Hurdle:** Teacher burnout and delayed response times (> 6 hours) during exam months (January–May).
* **Concrete Mitigation:**
  1. **AI First-Pass Filter:** Resolves $\approx 60-70\%$ of recurring textbook doubts instantaneously without teacher involvement.
  2. **60-Minute SLA Dynamic Load Balancing:** If an assigned teacher does not claim an escalated ticket within 60 minutes, the ticket is auto-promoted to available peer educators across the institute.
  3. **Marathi Voice Note & Whiteboard Tools:** Teachers can solve questions in $< 90$ seconds using a stylus on canvas and recording a quick 45-second Marathi voice note instead of typing lengthy explanations.

---

### 🚧 Roadblock 6: Devanagari Typography & Mathematical Formatting Shifts (FOUT)
* **The Hurdle:** Complex Marathi text combined with mathematical symbols ($\int, \sum, \sqrt{x}$) causes layout shifts and missing character boxes on low-end smartphones.
* **Concrete Mitigation:**
  1. **Preloaded WOFF2 Font Subsets:** Self-hosted `Noto Sans Devanagari` and `Mukta` bundled directly with `font-display: swap`.
  2. **KaTeX In-Browser Math Renderer:** Lightweight math rendering with zero external network dependencies.

---

## 3. MVP Roadblocks & Mitigations Summary Matrix

| Roadblock | Primary Risk | Mitigation Implemented | Impact on MVP |
| :--- | :--- | :--- | :--- |
| **High Video Transcoding Costs** | Cloud bill exhaustion | Containerized FFmpeg worker with automated AES-128 HLS packaging | $0 AWS bill for video processing |
| **AI Math Hallucinations** | Student mistrust | Balbharati RAG vector gating ($\ge 0.85$) + 1-click teacher escalation | 100% answer reliability |
| **Web Screen Recording Piracy** | Course material leak | Dynamic moving canvas watermark + Redis single-device lock | Instant leak attribution & single user access |
| **Konkan Low Bandwidth** | Playback buffering | Dedicated 240p HLS profile + PWA IndexedDB offline notes | Smooth streaming even on 2G/3G |
| **Teacher Doubt Overload** | SLA violations | AI first-pass + 60s Marathi voice & whiteboard tools | SLA reduced from 6 hrs to < 120 mins |
| **Devanagari Math Shifts** | Broken UI on mobile | Bundled Noto Sans Devanagari WOFF2 + KaTeX renderer | Zero layout shifts on any device |
