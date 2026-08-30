'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockBatches, mockDoubts } from '@/lib/mockData';
import { 
  UploadCloud, 
  PenTool, 
  FileCheck, 
  Users, 
  Clock, 
  ArrowRight
} from 'lucide-react';

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  return (
    <div className="teacher-dash-wrapper">
      {/* Welcome Banner */}
      <div className="teacher-welcome-banner glass-card">
        <div className="welcome-left">
          <div className="teacher-avatar-large">
            <span>{lang === 'en' ? user.name.slice(0, 1) : user.nameMr.slice(4, 5)}</span>
          </div>
          <div>
            <h2>{lang === 'en' ? `Welcome, ${user.name}` : user.nameMr}</h2>
            <p className="text-sm text-slate-400">
              {lang === 'en'
                ? `Senior Faculty • Department of Physics • ${user.district}`
                : `वरिष्ठ प्राध्यापक • भौतिकशास्त्र विभाग (Physics HOD) • ${user.district}`}
            </p>
          </div>
        </div>

        <div className="quick-stats-row">
          <div className="stat-pill glass-panel">
            <Users size={18} className="text-blue-400" aria-hidden="true" />
            <div>
              <div className="text-xs text-slate-400">
                {lang === 'en' ? 'Total Active Students' : 'एकूण सक्रिय विद्यार्थी'}
              </div>
              <div className="font-bold text-sm text-blue-400" style={{ fontVariantNumeric: 'tabular-nums' }} translate="no">१४,८५० (14,850)</div>
            </div>
          </div>
          <div className="stat-pill glass-panel">
            <Clock size={18} className="text-amber-400" aria-hidden="true" />
            <div>
              <div className="text-xs text-slate-400">
                {lang === 'en' ? 'Pending Doubts Queue' : 'प्रलंबित शंका (Pending)'}
              </div>
              <div className="font-bold text-sm text-amber-400">
                {lang === 'en' ? '3 Questions (SLA: < 60 min)' : '३ प्रश्न (SLA: < ६० मि.)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation Cards */}
      <div className="teacher-actions-grid">
        <Link href="/teacher/upload" className="action-card glass-card">
          <div className="action-icon bg-blue">
            <UploadCloud size={24} aria-hidden="true" />
          </div>
          <div className="action-info">
            <h4>{lang === 'en' ? 'Lecture Upload & DRM Encoding' : 'लेक्चर अपलोड व ट्रान्सकोडिंग'}</h4>
            <p>{lang === 'en' ? 'AES-128 HLS segmentation and 2 free trial demo tagging' : 'HLS AES-128 एन्क्रिप्शन व २ मोफत डेमो लेक्चर टॅगिंग'}</p>
          </div>
          <ArrowRight size={18} className="action-arrow" aria-hidden="true" />
        </Link>

        <Link href="/teacher/doubts" className="action-card glass-card">
          <div className="action-icon bg-emerald">
            <PenTool size={24} aria-hidden="true" />
          </div>
          <div className="action-info">
            <h4>{lang === 'en' ? 'Stylus Whiteboard Doubt Studio' : 'व्हाईटबोर्ड शंका निवारण'}</h4>
            <p>{lang === 'en' ? 'Live handwritten stylus canvas & Marathi audio note responses' : 'हस्तलिखित कॅनव्हास रेखाटन व मराठी ऑडिओ रेकॉर्डर'}</p>
          </div>
          <ArrowRight size={18} className="action-arrow" aria-hidden="true" />
        </Link>

        <Link href="/teacher/assessments" className="action-card glass-card">
          <div className="action-icon bg-purple">
            <FileCheck size={24} aria-hidden="true" />
          </div>
          <div className="action-info">
            <h4>{lang === 'en' ? 'MHT-CET Question Bank Builder' : 'MHT-CET प्रश्नपत्रिका बिल्डर'}</h4>
            <p>{lang === 'en' ? 'LaTeX math equations, Devanagari font & +2/0 marking' : 'LaTeX सूत्रे, Devanagari फॉन्ट व मार्किंग स्कीम्स (+२/०)'}</p>
          </div>
          <ArrowRight size={18} className="action-arrow" aria-hidden="true" />
        </Link>
      </div>

      {/* Main Grid: Assigned Batches & Recent Uploads */}
      <div className="teacher-content-grid">
        {/* Left: Assigned Batches */}
        <div className="assigned-batches-card glass-card">
          <div className="card-header-clean">
            <h4>{t('teacher.assigned_batches')}</h4>
            <span className="badge badge-primary">
              {lang === 'en' ? '3 Batches' : '३ बॅचेस'}
            </span>
          </div>

          <div className="batches-table-clean">
            {mockBatches.map((b) => (
              <div key={b.id} className="batch-row-item glass-panel">
                <div className="batch-row-info">
                  <span className="badge badge-saffron">{b.standard}</span>
                  <div className="font-bold text-sm mt-1">{lang === 'en' ? b.titleEn : b.titleMr}</div>
                  <span className="text-xs text-slate-400" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {b.totalLectures.toLocaleString(lang === 'en' ? 'en-IN' : 'mr-IN')} {lang === 'en' ? 'Lectures' : 'लेक्चर्स'} • {b.studentsCount.toLocaleString(lang === 'en' ? 'en-IN' : 'mr-IN')} {lang === 'en' ? 'Students' : 'विद्यार्थी'}
                  </span>
                </div>
                <Link href="/teacher/upload" className="btn btn-secondary btn-sm">
                  <UploadCloud size={13} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Upload' : 'अपलोड'}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Doubt Tickets Alert */}
        <div className="pending-doubts-card glass-card">
          <div className="card-header-clean">
            <h4>{t('teacher.pending_doubts_queue')}</h4>
            <Link href="/teacher/doubts" className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              <span>{lang === 'en' ? 'View All' : 'सर्व पहा'}</span> <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>

          <div className="mini-tickets-list">
            {mockDoubts.map((d) => (
              <div key={d.id} className="mini-ticket glass-panel">
                <div className="flex justify-between items-center mb-1">
                  <span className="badge badge-primary">{d.subject}</span>
                  <span className="text-xs text-slate-400">{d.timestamp}</span>
                </div>
                <div className="font-semibold text-xs text-slate-100">{d.questionMr}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {lang === 'en' ? `Student: ${d.studentNameMr}` : `विद्यार्थी: ${d.studentNameMr}`}
                </div>
                <Link href="/teacher/doubts" className="btn btn-primary btn-sm mt-2 w-full">
                  <PenTool size={12} aria-hidden="true" />
                  <span>{lang === 'en' ? 'Solve on Whiteboard' : 'व्हाईटबोर्डवर सोडवा'}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .teacher-dash-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .teacher-welcome-banner {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          border-left: 4px solid var(--brand-emerald);
        }
        .welcome-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .teacher-avatar-large {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-emerald), var(--brand-primary));
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: 800;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
        }
        .welcome-left h2 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
        }
        .quick-stats-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
        }
        .teacher-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .action-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          color: inherit;
        }
        .action-card:hover {
          transform: translateY(-3px);
          border-color: var(--brand-emerald);
        }
        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bg-blue { background: rgba(37, 99, 235, 0.18); color: #60a5fa; }
        .bg-emerald { background: rgba(16, 185, 129, 0.18); color: #34d399; }
        .bg-purple { background: rgba(139, 92, 246, 0.18); color: #a78bfa; }
        .action-info {
          flex: 1;
        }
        .action-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .action-info p {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .action-arrow {
          color: var(--text-tertiary);
          transition: transform var(--transition-fast);
        }
        .action-card:hover .action-arrow {
          color: var(--brand-emerald);
          transform: translateX(4px);
        }
        .teacher-content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .teacher-content-grid {
            grid-template-columns: 1fr;
          }
        }
        .assigned-batches-card, .pending-doubts-card {
          padding: 22px;
        }
        .card-header-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .card-header-clean h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }
        .batches-table-clean {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .batch-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          gap: 16px;
        }
        .mini-tickets-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mini-ticket {
          padding: 14px;
        }
      `}</style>
    </div>
  );
}
