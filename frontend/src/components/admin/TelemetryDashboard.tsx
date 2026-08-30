'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Users, 
  Video, 
  Wifi, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export const TelemetryDashboard: React.FC = () => {
  const { lang } = useLanguage();

  const districtData = [
    { name: 'पुणे (Pune)', students: 5420, percent: 36.5 },
    { name: 'मुंबई व उपनगर (Mumbai)', students: 3180, percent: 21.4 },
    { name: 'रत्नागिरी (Konkan)', students: 1840, percent: 12.3 },
    { name: 'कोल्हापूर (Kolhapur)', students: 1650, percent: 11.1 },
    { name: 'नाशिक (Nashik)', students: 1420, percent: 9.5 },
    { name: 'सिंधुदुर्ग (Sindhudurg)', students: 1340, percent: 9.0 },
  ];

  return (
    <div className="telemetry-dashboard-container">
      {/* Top Real-time Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card glass-card" aria-label="Active Students Online 1482">
          <div className="stat-card-header">
            <h3 className="stat-title">{lang === 'en' ? 'Active Students Online' : 'सध्या ऑनलाइन असलेले विद्यार्थी'}</h3>
            <div className="icon-badge bg-blue" aria-hidden="true"><Users size={18} aria-hidden="true" /></div>
          </div>
          <div className="stat-number text-blue-400" aria-hidden="true">1,482</div>
          <div className="stat-footer text-emerald-400">
            <span className="live-dot pulse-active" role="status" aria-label="Live"></span>
            <span>+14.2% {lang === 'en' ? 'peak evening study hour' : 'संध्याकाळचा अभ्यास वेळ'}</span>
          </div>
        </div>

        <div className="stat-card glass-card" aria-label="Live DRM Video Streams 894">
          <div className="stat-card-header">
            <h3 className="stat-title">{lang === 'en' ? 'Live DRM Video Streams' : 'सक्रिय DRM व्हिडिओ प्रवाह'}</h3>
            <div className="icon-badge bg-emerald" aria-hidden="true"><Video size={18} aria-hidden="true" /></div>
          </div>
          <div className="stat-number text-emerald-400" aria-hidden="true">894</div>
          <div className="stat-footer text-slate-400">
            <span>{lang === 'en' ? '0 DRM breaches detected' : '० DRM उल्लंघन (100% Secure)'}</span>
          </div>
        </div>

        <div className="stat-card glass-card" aria-label="240p Konkan Mode Savings 420 GB">
          <div className="stat-card-header">
            <h3 className="stat-title">{lang === 'en' ? '240p Konkan Mode Savings' : '२४०p कोकण मोड डेटा बचत'}</h3>
            <div className="icon-badge bg-amber" aria-hidden="true"><Wifi size={18} aria-hidden="true" /></div>
          </div>
          <div className="stat-number text-amber-400" aria-hidden="true">420 GB</div>
          <div className="stat-footer text-emerald-400">
            <span>68% {lang === 'en' ? 'cellular data bandwidth saved' : 'मोबाईल डेटा बचत'}</span>
          </div>
        </div>

        <div className="stat-card glass-card" aria-label="Device Conflict Blocks 28">
          <div className="stat-card-header">
            <h3 className="stat-title">{lang === 'en' ? 'Device Conflict Blocks' : 'डिव्हाइस संघर्ष रोखले'}</h3>
            <div className="icon-badge bg-purple" aria-hidden="true"><ShieldCheck size={18} aria-hidden="true" /></div>
          </div>
          <div className="stat-number text-purple-400" aria-hidden="true">28</div>
          <div className="stat-footer text-slate-400">
            <span>{lang === 'en' ? '100% Single-Device Session Enforced' : '१००% सिंगल-डिव्हाइस लॉक सक्रिय'}</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="charts-grid">
        {/* District-wise Distribution */}
        <div className="chart-card glass-card">
          <div className="card-head">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-400" aria-hidden="true" />
              <h4>{lang === 'en' ? 'District-Wise Student Distribution (Maharashtra)' : 'जिल्हानिहाय विद्यार्थी संख्या (महाराष्ट्र राज्य)'}</h4>
            </div>
            <span className="badge badge-primary">
              {lang === 'en' ? '14,850 Active' : '१४,८५० एकूण'}
            </span>
          </div>

          <div className="district-bars-list">
            {districtData.map((d, idx) => (
              <div key={idx} className="district-row">
                <div className="dist-label-row">
                  <span className="dist-name">{d.name}</span>
                  <span className="dist-count">{d.students.toLocaleString()} {lang === 'en' ? 'students' : 'विद्यार्थी'} ({d.percent}%)</span>
                </div>
                <div className="dist-bar-track" role="progressbar" aria-valuenow={d.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${d.name} ${d.students} students ${d.percent} percent`}>
                  <div className="dist-bar-fill" style={{ width: `${d.percent * 2.8}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch Time Drop-Off Telemetry */}
        <div className="chart-card glass-card">
          <div className="card-head">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" aria-hidden="true" />
              <h4>{lang === 'en' ? 'VOD Lecture Retention Curve (Drop-off Analysis)' : 'लेक्चर पाहण्याचा अवधी व ड्रॉप-ऑफ विश्लेषण'}</h4>
            </div>
            <span className="badge badge-success">
              {lang === 'en' ? 'High Retention' : 'उत्कृष्ट सातत्य'}
            </span>
          </div>

          <div className="retention-curve-box glass-panel">
            <div className="retention-step">
              <span className="retention-time">0 - 15 {lang === 'en' ? 'min' : 'मि.'}</span>
              <div className="retention-bar-wrap">
                <div className="ret-bar" style={{ width: '96%' }}>96%</div>
              </div>
            </div>
            <div className="retention-step">
              <span className="retention-time">15 - 30 {lang === 'en' ? 'min' : 'मि.'}</span>
              <div className="retention-bar-wrap">
                <div className="ret-bar" style={{ width: '88%' }}>88%</div>
              </div>
            </div>
            <div className="retention-step">
              <span className="retention-time">30 - 45 {lang === 'en' ? 'min' : 'मि.'}</span>
              <div className="retention-bar-wrap">
                <div className="ret-bar" style={{ width: '79%' }}>79%</div>
              </div>
            </div>
            <div className="retention-step">
              <span className="retention-time">45 - 60 {lang === 'en' ? 'min' : 'मि.'}</span>
              <div className="retention-bar-wrap">
                <div className="ret-bar" style={{ width: '74%' }}>74%</div>
              </div>
            </div>
          </div>

          <div className="retention-footer text-xs text-slate-400 mt-3 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400" aria-hidden="true" />
            <span>{lang === 'en' ? '240p Konkan mode reduced video buffering drop-offs by 64%' : '२४०p कोकण मोडमुळे बफरिंगमुळे होणारे ड्रॉप-ऑफ ६४% कमी झाले आहेत.'}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .telemetry-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }
        .stat-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .stat-title {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .icon-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-blue { background: rgba(37, 99, 235, 0.18); color: #60a5fa; }
        .bg-emerald { background: rgba(16, 185, 129, 0.18); color: #34d399; }
        .bg-amber { background: rgba(245, 158, 11, 0.18); color: #fbbf24; }
        .bg-purple { background: rgba(139, 92, 246, 0.18); color: #a78bfa; }
        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
        }
        .stat-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
        }
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
        .chart-card {
          padding: 22px;
        }
        .card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-head h4 {
          font-size: 0.98rem;
          font-weight: 800;
          color: #ffffff;
        }
        .district-bars-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dist-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 4px;
        }
        .dist-name {
          color: var(--text-primary);
          font-weight: 600;
        }
        .dist-count {
          color: var(--text-secondary);
        }
        .dist-bar-track {
          height: 7px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .dist-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          border-radius: var(--radius-full);
        }
        .retention-curve-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
        }
        .retention-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-items: center;
          gap: 12px;
        }
        .retention-time {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .retention-bar-wrap {
          height: 20px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .ret-bar {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #ffffff;
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-active {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
