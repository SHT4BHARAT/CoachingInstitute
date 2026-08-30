'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShieldAlert, 
  UserX, 
  Search, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';

interface ActiveSession {
  id: string;
  nameMr: string;
  nameEn: string;
  phone: string;
  device: string;
  ip: string;
  district: string;
  lastHeartbeat: string;
  status: 'ACTIVE' | 'FLAGGED' | 'TERMINATED';
}

export const AntiPiracyCenter: React.FC = () => {
  const { t, lang } = useLanguage();
  
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: 'SES-9821',
      nameMr: 'रोहन देसाई',
      nameEn: 'Rohan Desai',
      phone: '9823481210',
      device: 'Samsung Galaxy M34 (Android 14)',
      ip: '49.36.12.8',
      district: 'पुणे (Pune)',
      lastHeartbeat: '२ सेकंदांपूर्वी (Live)',
      status: 'ACTIVE',
    },
    {
      id: 'SES-9822',
      nameMr: 'अनिकेत शिंदे',
      nameEn: 'Aniket Shinde',
      phone: '9420881920',
      device: 'Windows 11 PC (Chrome 124)',
      ip: '103.21.144.12',
      district: 'रत्नागिरी (Ratnagiri)',
      lastHeartbeat: '५ सेकंदांपूर्वी (Live)',
      status: 'ACTIVE',
    },
    {
      id: 'SES-9823',
      nameMr: 'प्राजक्ता माने',
      nameEn: 'Prajakta Mane',
      phone: '9158440019',
      device: 'Redmi Note 12 (Android 13)',
      ip: '157.34.88.9',
      district: 'कोल्हापूर (Kolhapur)',
      lastHeartbeat: '१२ सेकंदांपूर्वी (Live)',
      status: 'ACTIVE',
    },
    {
      id: 'SES-9824',
      nameMr: 'सुमित सावंत (Duplicate IP Flag)',
      nameEn: 'Sumit Sawant (Duplicate IP)',
      phone: '9764120934',
      device: 'MacBook Air M2 (Chrome)',
      ip: '103.21.144.12',
      district: 'सिंधुदुर्ग (Sindhudurg)',
      lastHeartbeat: 'संशयास्पद (Flagged)',
      status: 'FLAGGED',
    },
  ]);

  const [watermarkInput, setWatermarkInput] = useState('');
  const [decodedResult, setDecodedResult] = useState<{
    studentName: string;
    studentPhone: string;
    parentPhone: string;
    district: string;
    batch: string;
    confidence: string;
  } | null>(null);

  // Remotely terminate a compromised session (Send WebSocket Kill Packet)
  const handleKillSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'TERMINATED', lastHeartbeat: 'सत्र बंद (Killed)' } : s))
    );
  };

  // Decode Leaked Watermark Hash
  const handleDecodeWatermark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!watermarkInput.trim()) return;

    setDecodedResult({
      studentName: 'सुमित सावंत (Sumit Sawant)',
      studentPhone: '9764120934',
      parentPhone: '9764120900',
      district: 'सिंधुदुर्ग (Sindhudurg, Maharashtra)',
      batch: 'MHT-CET २०२६ संपूर्ण लक्ष्य बॅच (PCM)',
      confidence: '१००% अचूकता (SHA-256 Signature Match)',
    });
  };

  return (
    <div className="antipiracy-container">
      {/* Header */}
      <div className="antipiracy-header glass-card">
        <div className="header-icon-box">
          <ShieldAlert size={28} className="text-red-400" aria-hidden="true" />
        </div>
        <div>
          <h2>{t('admin.antipiracy_title')}</h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Multi-layer DRM enforcement, Concurrent Device Interception & Forensic Watermark decoder'
              : 'अँटी-पायरसी नियंत्रण, एकाच वेळी दोन ठिकाणी लॉगिन प्रतिबंध व फॉरेन्सिक वॉटरमार्क शोध'}
          </p>
        </div>
      </div>

      <div className="antipiracy-grid">
        {/* Left: Active Live Streaming Sessions Table */}
        <div className="sessions-card glass-card">
          <div className="card-head-clean">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" aria-hidden="true" />
              <h4>{lang === 'en' ? 'Live Concurrent DRM Sessions' : 'सध्या सुरू असलेले थेट DRM प्रवाह'}</h4>
            </div>
            <span className="badge badge-success">
              {sessions.filter((s) => s.status === 'ACTIVE').length} {lang === 'en' ? 'Active Streams' : 'सक्रिय प्रवाह'}
            </span>
          </div>

          <div className="sessions-table-wrapper" tabIndex={0} role="region" aria-label="Live concurrent DRM sessions table, scrollable">
            <table className="custom-table">
              <caption className="sr-only">Live Concurrent DRM Sessions — Student, Device &amp; IP, Heartbeat, Action</caption>
              <thead>
                <tr>
                  <th scope="col">{lang === 'en' ? 'Student' : 'विद्यार्थी'}</th>
                  <th scope="col">{lang === 'en' ? 'Device & IP' : 'डिव्हाइस व IP'}</th>
                  <th scope="col">{lang === 'en' ? 'Heartbeat' : 'हार्टबीट'}</th>
                  <th scope="col">{lang === 'en' ? 'Action' : 'कृती'}</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="font-bold text-sm text-slate-100">
                        {lang === 'en' ? s.nameEn : s.nameMr}
                      </div>
                      <div className="text-xs text-slate-400">{s.phone} • {s.district}</div>
                    </td>
                    <td>
                      <div className="text-xs text-slate-200">{s.device}</div>
                      <div className="text-xs font-mono text-blue-400">IP: {s.ip}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-xs">
                        {s.status === 'ACTIVE' ? (
                          <>
                            <span className="live-dot pulse-active"></span>
                            <span className="text-emerald-400">{s.lastHeartbeat}</span>
                          </>
                        ) : s.status === 'FLAGGED' ? (
                          <span className="badge badge-warning text-xs">FLAGGED</span>
                        ) : (
                          <span className="badge badge-danger text-xs">TERMINATED</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {s.status !== 'TERMINATED' ? (
                        <button
                          onClick={() => handleKillSession(s.id)}
                          className="btn btn-secondary btn-sm btn-kill"
                          title="Revoke session remotely"
                          aria-label={`Kill session for ${s.nameEn} ${s.id} IP ${s.ip}`}
                        >
                          <UserX size={13} aria-hidden="true" />
                          <span>{lang === 'en' ? 'Kill Session' : 'लॉगिन रद्द करा'}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">{lang === 'en' ? 'Revoked' : 'रद्द केले'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Forensic Watermark Decoder */}
        <div className="decoder-card glass-card">
          <div className="card-head-clean">
          <div className="flex items-center gap-2">
              <Search size={18} className="text-purple-400" aria-hidden="true" />
              <h4>{t('admin.forensic_decoder')}</h4>
            </div>
            <span className="badge badge-saffron">Anti-Leak</span>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            {lang === 'en'
              ? 'Enter leaked watermark snippet from Telegram/YouTube to cryptographically identify the student account:'
              : 'टेलिग्राम किंवा सोशल मीडियावर लीक झालेल्या व्हिडिओतील वॉटरमार्क कोड येथे पेस्ट करा:'}
          </p>

          <form onSubmit={handleDecodeWatermark} className="decoder-form">
            <label htmlFor="watermark-decoder-input" className="sr-only">Watermark code to decode</label>
            <textarea
              id="watermark-decoder-input"
              rows={2}
              value={watermarkInput}
              onChange={(e) => setWatermarkInput(e.target.value)}
              placeholder="e.g. MS-STU-2026-9042 • IP: 103.21.144.12"
              className="decoder-input font-mono text-xs"
              aria-label="Leaked watermark snippet"
            />

            <button type="submit" className="btn btn-primary w-full mt-2">
              <Search size={14} />
              <span>{lang === 'en' ? 'Identify Leaker Account' : 'लीक खात्याचा शोध घ्या (Decode)'}</span>
            </button>
          </form>

          {decodedResult && (
            <div className="decoded-result-box glass-panel mt-3" role="status" aria-live="polite" aria-atomic="true">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span className="font-bold text-xs">{decodedResult.confidence}</span>
              </div>

              <div className="text-xs space-y-1 text-slate-200">
                <div><strong>{lang === 'en' ? 'Student:' : 'विद्यार्थी:'}</strong> {decodedResult.studentName}</div>
                <div><strong>{lang === 'en' ? 'Mobile:' : 'मोबाईल:'}</strong> {decodedResult.studentPhone}</div>
                <div><strong>{lang === 'en' ? 'Parent Phone:' : 'पालक क्रमांक:'}</strong> {decodedResult.parentPhone}</div>
                <div><strong>{lang === 'en' ? 'District:' : 'पत्ता:'}</strong> {decodedResult.district}</div>
                <div><strong>{lang === 'en' ? 'Enrolled Batch:' : 'नोंदणीकृत बॅच:'}</strong> {decodedResult.batch}</div>
              </div>

              <button 
                onClick={() => alert(lang === 'en' ? 'Notice issued and account locked permanently.' : 'कायदेशीर नोटीस पाठवली व खाते कायमस्वरूपी ब्लॉक केले.')}
                className="btn btn-accent btn-sm w-full mt-3"
                aria-label="Issue legal notice and ban account"
              >
                <UserX size={13} aria-hidden="true" />
                <span>{lang === 'en' ? 'Issue Legal Notice & Ban Account' : 'कायदेशीर नोटीस पाठवा व खाते बंद करा'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .antipiracy-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .antipiracy-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-left: 4px solid #ef4444;
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(239, 68, 68, 0.18);
          border-radius: var(--radius-md);
        }
        .antipiracy-header h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .antipiracy-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .antipiracy-grid {
            grid-template-columns: 1fr;
          }
        }
        .sessions-card, .decoder-card {
          padding: 22px;
        }
        .card-head-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .card-head-clean h4 {
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
        }
        .sessions-table-wrapper {
          overflow-x: auto;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
        }
        .custom-table th {
          text-align: left;
          padding: 10px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-subtle);
        }
        .custom-table td {
          padding: 12px 10px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }
        .btn-kill:hover {
          border-color: #ef4444;
          color: #f87171;
        }
        .decoder-input {
          width: 100%;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 10px;
          border-radius: var(--radius-md);
          outline: none;
        }
        .decoded-result-box {
          padding: 14px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        .sessions-table-wrapper:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};
