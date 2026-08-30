# Terminal Commands Log & Execution Queue
> **Purpose:** This file tracks all required CLI commands, their operational rationale, and current execution status. When automated execution encounters environment/permission constraints, you can execute these commands in your host terminal.

---

## 📋 Execution Queue & History

### 1. Next.js 14+ Frontend Scaffolding
* **Status:** ✅ Executed by User
* **Working Directory:** `d:\Projects\CoachingWebsite`
* **Command:** `npx create-next-app@latest frontend --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm`

---

### 2. Frontend Dependencies Installation (Lucide, KaTeX, PDF.js, Hls.js)
* **Status:** ✅ Executed by User
* **Working Directory:** `d:\Projects\CoachingWebsite\frontend`
* **Command:** `npm install lucide-react katex pdfjs-dist hls.js && npm install -D @types/katex`

---

### 3. ESLint & TypeScript Verification
* **Status:** ✅ Executed & Verified (0 errors, 0 warnings)
* **Working Directory:** `d:\Projects\CoachingWebsite\frontend`
* **Command:** `npm run lint`

---

### 4. Next.js Production Build Verification
* **Status:** ✅ Executed & Verified (All 14 routes statically optimized)
* **Working Directory:** `d:\Projects\CoachingWebsite\frontend`
* **Command:** `npm run build`

---

### 5. Launch Interactive Next.js Frontend Development Server
* **Status:** ⏳ Ready for User Execution
* **Working Directory:** `d:\Projects\CoachingWebsite\frontend`
* **Reason:** Start the Next.js development server to interactively test and verify the **Student Portal**, **Educator Studio**, **Admin Hub**, and **Landing Page** with dynamic DRM watermarking, 240p Konkan mode, AI doubt desk, and MHT-CET CBT mock tests.
* **Command to Run:**
```powershell
cd d:\Projects\CoachingWebsite\frontend
npm run dev
```
* **Local Web URLs to Access:**
  - 🏠 **Main Catalog & Landing:** `http://localhost:3000/`
  - 🎓 **Student Portal (विद्यार्थी कक्ष):** `http://localhost:3000/student`
  - 📹 **DRM Video Classroom (२४०p कोकण मोड):** `http://localhost:3000/student/lectures`
  - 📄 **Canvas Notes Sandbox (डाऊनलोड बंदी):** `http://localhost:3000/student/notes`
  - 🤖 **AI Doubt Desk (बालभारती RAG + ऑडिओ):** `http://localhost:3000/student/doubts`
  - 🏆 **MHT-CET CBT Exam Simulator:** `http://localhost:3000/student/exams`
  - 👨‍🏫 **Educator Studio (शिक्षक स्टुडिओ):** `http://localhost:3000/teacher`
  - 🎨 **Teacher Stylus Whiteboard & Voice Desk:** `http://localhost:3000/teacher/doubts`
  - 🛡️ **Admin Live Telemetry & Anti-Piracy:** `http://localhost:3000/admin`
  - 🔍 **Forensic Watermark Decoder:** `http://localhost:3000/admin/anti-piracy`
  - 🧾 **Batch Pricing & GST Invoices:** `http://localhost:3000/admin/batches`

---

### 6. Git Commit Snapshot
* **Status:** ⏳ Pending User Execution
* **Working Directory:** `d:\Projects\CoachingWebsite`
* **Reason:** Commit the complete Next.js TypeScript frontend implementation as requested in `docs/AGENTS.md`.
* **Command to Run:**
```powershell
cd d:\Projects\CoachingWebsite
git add .
git commit -m "feat(frontend): implement presentation-ready Next.js 14+ MVP with DRM player, canvas notes, AI doubt desk, and MHT-CET CBT simulator"
```
