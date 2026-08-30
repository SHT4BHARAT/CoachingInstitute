'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockBatches } from '@/lib/mockData';
import { 
  Play, 
  FileText, 
  HelpCircle, 
  Award, 
  Clock, 
  ShieldCheck, 
  Flame, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user, isEnrolled } = useAuth();
  const { t, lang } = useLanguage();

  const enrolledBatches = mockBatches.filter((b) => isEnrolled(b.id));

  return (
    <div className="student-dash-wrapper">
      {/* Top Welcome & Telemetry Strip */}
      <div className="student-hero-banner glass-card">
        <div className="hero-left">
          <div className="student-avatar-ring">
            <span>{lang === 'en' ? user.name.slice(0, 1) : user.nameMr.slice(0, 1)}</span>
          </div>
          <div>
            <h2>
              {lang === 'en' ? `Welcome back, ${user.name}!` : `${t('student.welcome')}, ${user.nameMr}!`}
            </h2>
            <p className="hero-subtext">
              {lang === 'en' 
                ? `Class 12th HSC Science + MHT-CET 2026 • ${user.district}`
                : `इयत्ता १२वी सायन्स + MHT-CET २०२६ • ${user.district}`}
            </p>
          </div>
        </div>

        <div className="hero-metrics">
          <div className="metric-badge glass-panel">
            <Flame size={20} className="text-amber-400" aria-hidden="true" />
            <div>
              <div className="metric-label">{t('student.streak')}</div>
              <div className="metric-value text-amber-400" style={{ fontVariantNumeric: 'tabular-nums' }}>{t('student.days_continuous')}</div>
            </div>
          </div>

          <div className="metric-badge glass-panel">
            <ShieldCheck size={20} className="text-emerald-400" aria-hidden="true" />
            <div>
              <div className="metric-label">{t('student.security_status')}</div>
              <div className="metric-value text-emerald-400">
                <span className="live-dot pulse-active" aria-hidden="true"></span> {t('student.security_active')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Feature Jump Cards */}
      <div className="quick-access-grid">
        <Link href="/student/lectures" className="qa-card glass-card qa-blue">
          <div className="qa-icon-wrapper">
            <Play size={24} aria-hidden="true" />
          </div>
          <div className="qa-body">
            <h4>{t('card.lectures.title')}</h4>
            <p>{t('card.lectures.desc')}</p>
          </div>
          <ArrowRight size={18} className="qa-arrow" aria-hidden="true" />
        </Link>

        <Link href="/student/notes" className="qa-card glass-card qa-emerald">
          <div className="qa-icon-wrapper">
            <FileText size={24} aria-hidden="true" />
          </div>
          <div className="qa-body">
            <h4>{t('card.notes.title')}</h4>
            <p>{t('card.notes.desc')}</p>
          </div>
          <ArrowRight size={18} className="qa-arrow" aria-hidden="true" />
        </Link>

        <Link href="/student/doubts" className="qa-card glass-card qa-amber">
          <div className="qa-icon-wrapper">
            <HelpCircle size={24} aria-hidden="true" />
          </div>
          <div className="qa-body">
            <h4>{t('card.doubts.title')}</h4>
            <p>{t('card.doubts.desc')}</p>
          </div>
          <ArrowRight size={18} className="qa-arrow" aria-hidden="true" />
        </Link>

        <Link href="/student/exams" className="qa-card glass-card qa-purple">
          <div className="qa-icon-wrapper">
            <Award size={24} aria-hidden="true" />
          </div>
          <div className="qa-body">
            <h4>{t('card.exams.title')}</h4>
            <p>{t('card.exams.desc')}</p>
          </div>
          <ArrowRight size={18} className="qa-arrow" aria-hidden="true" />
        </Link>
      </div>

      {/* Main Content Layout: 2 Columns */}
      <div className="dash-columns-layout">
        {/* Left Column: My Enrolled Batches */}
        <div className="dash-col-left">
          <div className="section-header-clean">
            <h3>{t('student.my_batches')}</h3>
            <span className="badge badge-primary">{t('student.active_batches_count')}</span>
          </div>

          <div className="enrolled-batches-list">
            {enrolledBatches.map((batch) => (
              <div key={batch.id} className="enrolled-batch-card glass-card">
                <div className="eb-header">
                  <div className="eb-meta">
                    <span className="badge badge-saffron">{batch.standard}</span>
                    <span className="badge badge-primary">{batch.targetExam}</span>
                  </div>
                  <Link href="/student/lectures" className="btn btn-primary btn-sm">
                    <Play size={13} aria-hidden="true" />
                    <span>{t('student.btn_continue')}</span>
                  </Link>
                </div>

                <h4 className="eb-title">
                  {lang === 'en' ? batch.titleEn : batch.titleMr}
                </h4>

                <p className="eb-faculty">
                  {lang === 'en'
                    ? 'Prof. Anant Kulkarni (Physics) • Prof. Mandar Joshi (Maths) • Dr. Suhas Kadam (Chemistry)'
                    : 'प्रा. अनंत कुलकर्णी (Physics) • प्रा. मंदार जोशी (Maths) • डॉ. सुहास कदम (Chemistry)'}
                </p>

                {/* Progress bar */}
                <div className="eb-progress-box">
                  <div className="progress-info">
                    <span className="text-xs text-slate-400">{t('student.syllabus_progress')}</span>
                    <span className="progress-percent font-bold text-blue-400" style={{ fontVariantNumeric: 'tabular-nums' }} translate="no">६८% (68%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-bar" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Today's Live Schedule & Doubt SLA Tracker */}
        <div className="dash-col-right">
          {/* Today's Schedule Card */}
          <div className="schedule-card glass-card">
            <div className="card-header-mini">
              <Clock size={18} className="text-blue-400" aria-hidden="true" />
              <h4>{t('student.today_schedule')}</h4>
            </div>

            <div className="schedule-items">
              <div className="schedule-item glass-panel">
                <div className="time-badge" style={{ fontVariantNumeric: 'tabular-nums' }} translate="no">
                  {lang === 'en' ? new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(new Date().setHours(18,0,0,0))) : 'संध्या. ६:००'}
                </div>
                <div className="schedule-text">
                  <div className="font-bold text-sm text-slate-100">
                    {lang === 'en' ? 'Physics Live Problem Solving' : 'भौतिकशास्त्र लाईव्ह समस्या निवारण'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'en' ? 'Prof. Kulkarni • Rotational Motion PYQ' : 'प्रा. अनंत कुलकर्णी • रोटेशनल मोशन PYQ'}
                  </div>
                </div>
              </div>

              <div className="schedule-item glass-panel">
                <div className="time-badge" style={{ fontVariantNumeric: 'tabular-nums' }} translate="no">
                  {lang === 'en' ? new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(new Date().setHours(20,30,0,0))) : 'रात्री ८:३०'}
                </div>
                <div className="schedule-text">
                  <div className="font-bold text-sm text-slate-100">
                    {lang === 'en' ? 'Maths DPP 03 Deadline' : 'गणित DPP ०३ सबमिशन अंतिम मुदत'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'en' ? 'Definite Integration PYQs' : 'निश्चित संकलन (Definite Integration)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doubt Status Mini Card */}
          <div className="doubt-tracker-card glass-card">
            <div className="card-header-mini">
              <HelpCircle size={18} className="text-amber-400" aria-hidden="true" />
              <h4>{t('student.doubt_tracker')}</h4>
            </div>

            <div className="doubt-status-box glass-panel">
              <CheckCircle2 size={24} className="text-emerald-400" aria-hidden="true" />
              <div>
                <div className="font-bold text-sm text-slate-100">{t('student.doubt_all_resolved')}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {lang === 'en' ? 'Average Resolution Time: 28 mins' : 'सरासरी निवारण वेळ: २८ मिनिटे (SLA: < ६० मि.)'}
                </div>
              </div>
            </div>

            <Link href="/student/doubts" className="btn btn-secondary btn-sm mt-3 w-full">
              <Sparkles size={14} className="text-amber-400" aria-hidden="true" />
              <span>{t('student.ask_new_doubt')}</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .student-dash-wrapper {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .student-hero-banner {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          border-left: 4px solid var(--brand-primary);
        }
        .hero-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .student-avatar-ring {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #8b5cf6);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 800;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
        }
        .hero-left h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .hero-subtext {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .hero-metrics {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .metric-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          background: rgba(15, 23, 42, 0.7);
        }
        .metric-label {
          font-size: 0.68rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .metric-value {
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }
        .quick-access-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        .qa-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          color: inherit;
        }
        .qa-card:hover {
          transform: translateY(-3px);
        }
        .qa-blue:hover { border-color: #3b82f6; box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25); }
        .qa-emerald:hover { border-color: #10b981; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25); }
        .qa-amber:hover { border-color: #f59e0b; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.25); }
        .qa-purple:hover { border-color: #8b5cf6; box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25); }
        .qa-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .qa-blue .qa-icon-wrapper { background: rgba(37, 99, 235, 0.18); color: #60a5fa; }
        .qa-emerald .qa-icon-wrapper { background: rgba(16, 185, 129, 0.18); color: #34d399; }
        .qa-amber .qa-icon-wrapper { background: rgba(245, 158, 11, 0.18); color: #fbbf24; }
        .qa-purple .qa-icon-wrapper { background: rgba(139, 92, 246, 0.18); color: #a78bfa; }
        .qa-body {
          flex: 1;
        }
        .qa-body h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .qa-body p {
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }
        .qa-arrow {
          color: var(--text-tertiary);
          transition: transform var(--transition-fast);
        }
        .qa-card:hover .qa-arrow {
          transform: translateX(4px);
          color: var(--brand-primary);
        }
        .dash-columns-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 22px;
        }
        @media (max-width: 1024px) {
          .dash-columns-layout {
            grid-template-columns: 1fr;
          }
        }
        .section-header-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .section-header-clean h3 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
        }
        .enrolled-batches-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .enrolled-batch-card {
          padding: 22px;
        }
        .eb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .eb-meta {
          display: flex;
          gap: 8px;
        }
        .eb-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .eb-faculty {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .eb-progress-box {
          margin-top: 8px;
        }
        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .progress-track {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #2563eb, #f97316);
          border-radius: var(--radius-full);
        }
        .schedule-card, .doubt-tracker-card {
          padding: 20px;
          margin-bottom: 16px;
        }
        .card-header-mini {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .card-header-mini h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
        }
        .schedule-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .schedule-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
        }
        .time-badge {
          padding: 4px 8px;
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(37, 99, 235, 0.4);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          color: #93c5fd;
          white-space: nowrap;
        }
        .doubt-status-box {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
        }
      `}</style>
    </div>
  );
}
