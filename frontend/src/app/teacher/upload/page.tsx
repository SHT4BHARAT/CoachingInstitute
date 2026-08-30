'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Film, 
  ShieldCheck, 
  Wifi
} from 'lucide-react';

export default function TeacherUploadPage() {
  const [titleMr, setTitleMr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('batch-cet-2026');
  const [subject, setSubject] = useState('भौतिकशास्त्र (Physics)');
  const [chapter, setChapter] = useState('प्रकरण १: परिभ्रमण गती (Rotational Dynamics)');
  const [isFreeDemo, setIsFreeDemo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleStartUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  return (
    <div className="upload-page-wrapper">
      <div className="page-header-clean glass-card">
        <div className="header-icon-box">
          <UploadCloud size={28} className="text-blue-400" aria-hidden="true" />
        </div>
        <div>
          <h2>नवीन लेक्चर अपलोड व DRM ट्रान्सकोडिंग (Lecture Ingestion)</h2>
          <p className="text-xs text-slate-400">
            स्वयंचलित HLS AES-128 एन्क्रिप्शन • १०८०p, ७२०p, ४८०p व २४०p कोकण लो-डेटा प्रोफाइल निर्मिती
          </p>
        </div>
      </div>

      <div className="upload-grid">
        {/* Left: Upload Form */}
        <form onSubmit={handleStartUpload} className="upload-form-card glass-card">
          <h3 className="form-heading">लेक्चर तपशील (Lecture Details)</h3>

          <div className="form-group">
            <label htmlFor="titleMr" className="form-label">लेक्चर शीर्षक (मराठी):</label>
            <input
              id="titleMr"
              type="text"
              required
              value={titleMr}
              onChange={(e) => setTitleMr(e.target.value)}
              placeholder="उदा. लेक्चर ०४: कोनीय संवेग अक्षय्यता व उदाहरणे"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="titleEn" className="form-label">Lecture Title (English):</label>
            <input
              id="titleEn"
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Lecture 04: Conservation of Angular Momentum"
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="batchSelect" className="form-label">बॅच निवडा (Select Batch):</label>
              <select
                id="batchSelect"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="form-select"
              >
                <option value="batch-cet-2026">MHT-CET २०२६ विजय क्रॅश कोर्स</option>
                <option value="batch-12th-hsc">१२वी HSC सायन्स संपूर्ण बोर्ड बॅच</option>
                <option value="batch-10th-ssc">१०वी SSC बोर्ड टॉपर महा-बॅच</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subjectSelect" className="form-label">विषय (Subject):</label>
              <select
                id="subjectSelect"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-select"
              >
                <option value="भौतिकशास्त्र (Physics)">भौतिकशास्त्र (Physics)</option>
                <option value="गणित (Mathematics)">गणित (Mathematics)</option>
                <option value="रसायनशास्त्र (Chemistry)">रसायनशास्त्र (Chemistry)</option>
                <option value="जीवशास्त्र (Biology)">जीवशास्त्र (Biology)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="chapterUnit" className="form-label">प्रकरण / युनिट (Chapter / Unit):</label>
            <input
              id="chapterUnit"
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="form-input"
            />
          </div>

          {/* 2 Free Demo Lectures Toggle */}
          <div className="demo-toggle-box glass-panel">
            <div id="freeDemoLabel">
              <div className="font-bold text-sm text-amber-400">२ मोफत डेमो लेक्चर म्हणून सेट करा (Free Trial Gate)</div>
              <div className="text-xs text-slate-400">हे लेक्चर नोंदणी न केलेल्या नवीन विद्यार्थ्यांना विनामूल्य पाहता येईल.</div>
            </div>
            <input
              id="freeDemoCheck"
              type="checkbox"
              checked={isFreeDemo}
              onChange={(e) => setIsFreeDemo(e.target.checked)}
              className="demo-checkbox"
              aria-labelledby="freeDemoLabel"
            />
          </div>

          {/* Drag and Drop Zone */}
          <button type="button" className="dropzone-box" role="button" tabIndex={0} aria-label="Upload video file - drag and drop MP4 or click to browse" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (e.currentTarget as HTMLButtonElement).click(); }}}>
            <Film size={36} className="text-slate-400 mb-2" aria-hidden="true" />
            <div className="font-semibold text-sm">येथे MP4 व्हिडिओ फाइल ड्रॅग करा किंवा निवडा</div>
            <span className="text-xs text-slate-500">कमाल फाइल आकार: 2.5 GB (MP4, MOV)</span>
          </button>

          {/* Upload Progress */}
          {isUploading && (
            <div className="upload-progress-box">
              <div className="flex justify-between text-xs mb-1">
                <span>क्लाउडवर ट्रान्सकोडिंग सुरू आहे (AES-128 HLS Encoding)...</span>
                <span className="font-bold text-blue-400">{uploadProgress}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {uploadComplete && (
            <div className="upload-success-strip glass-panel">
              <CheckCircle2 size={20} className="text-emerald-400" aria-hidden="true" />
              <span>लेक्चरचे यशस्वीरीत्या ४-बिटरेट HLS एन्क्रिप्शन पूर्ण झाले! (Live on Student Portal)</span>
            </div>
          )}

          <button type="submit" disabled={isUploading} className="btn btn-primary btn-submit-upload">
            <UploadCloud size={16} aria-hidden="true" />
            <span>लेक्चर प्रसिद्ध करा (Publish Encrypted Lecture)</span>
          </button>
        </form>

        {/* Right: Automated Transcoding Pipeline Specs */}
        <div className="transcoding-info-card glass-card">
          <h4>⚙️ स्वयंचलित DRM ट्रान्सकोडिंग पाइपलाइन</h4>
          <p className="text-xs text-slate-400 mb-4">
            प्रत्येक अपलोड केलेले लेक्चर पुढील सुरक्षा व बँडविड्थ स्तरांवर स्वयंचलित प्रक्रिया केले जाते:
          </p>

          <div className="pipeline-steps">
            <div className="step-item glass-panel">
              <ShieldCheck size={18} className="text-purple-400" aria-hidden="true" />
              <div>
                <div className="font-bold text-xs">१. AES-128 सेगमेन्ट एन्क्रिप्शन</div>
                <div className="text-xs text-slate-400">प्रत्येक ६-सेकंद व्हिडिओ चंक एन्क्रिप्ट केला जातो</div>
              </div>
            </div>

            <div className="step-item glass-panel">
              <Wifi size={18} className="text-emerald-400" aria-hidden="true" />
              <div>
                <div className="font-bold text-xs">२. २४०p कोकण लो-बँडविड्थ प्रोफाइल</div>
                <div className="text-xs text-slate-400">२५० kbps विना-बफरिंग ग्रामीण प्रवाह</div>
              </div>
            </div>

            <div className="step-item glass-panel">
              <Sparkles size={18} className="text-amber-400" aria-hidden="true" />
              <div>
                <div className="font-bold text-xs">३. फॉरेन्सिक वॉटरमार्क जनरेटर</div>
                <div className="text-xs text-slate-400">विद्यार्थी नाव व मोबाईल क्रमांक १२ सेकंदांनी फिरतो</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .upload-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .page-header-clean {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(37, 99, 235, 0.15);
          border-radius: var(--radius-md);
        }
        .page-header-clean h2 {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .upload-grid {
            grid-template-columns: 1fr;
          }
        }
        .upload-form-card {
          padding: 24px;
        }
        .form-heading {
          font-size: 1.05rem;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .form-input, .form-select {
          width: 100%;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
        }
        .form-input:focus, .form-select:focus {
          border-color: var(--border-focus);
        }
        .demo-toggle-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          margin-bottom: 20px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .demo-checkbox {
          width: 20px;
          height: 20px;
          accent-color: var(--brand-accent);
          cursor: pointer;
        }
        .dropzone-box {
          border: 2px dashed var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 36px 20px;
          text-align: center;
          background: var(--bg-surface-2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .dropzone-box:hover {
          border-color: var(--brand-primary);
        }
        .upload-progress-box {
          margin-bottom: 16px;
        }
        .progress-bar-track {
          height: 8px;
          background: var(--bg-surface-3);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: var(--brand-primary);
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }
        .upload-success-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .btn-submit-upload {
          width: 100%;
        }
        .transcoding-info-card {
          padding: 22px;
          height: fit-content;
        }
        .transcoding-info-card h4 {
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
        .pipeline-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
        }
      `}</style>
    </div>
  );
}
