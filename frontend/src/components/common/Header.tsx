'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Award, 
  PenTool, 
  UploadCloud, 
  FileCheck, 
  ShieldCheck, 
  Activity, 
  Layers, 
  User, 
  Search,
  Wifi,
  Command
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isKonkanMode } = useAuth();
  const { t, lang } = useLanguage();

  const getRoleLabel = () => {
    if (user.role === 'STUDENT') {
      return lang === 'en' ? 'Student' : lang === 'mr' ? 'विद्यार्थी' : 'Student (विद्यार्थी)';
    }
    if (user.role === 'TEACHER') {
      return lang === 'en' ? 'Faculty HOD' : lang === 'mr' ? 'प्राध्यापक' : 'Faculty (प्राध्यापक)';
    }
    return lang === 'en' ? 'Administrator' : lang === 'mr' ? 'प्रशासक' : 'Admin (प्रशासक)';
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }));
  };

  return (
    <header className="main-header glass-panel">
      <div className="header-inner">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo">
          <div className="logo-badge" aria-hidden="true">
            <GraduationCap size={22} className="text-white" aria-hidden="true" />
          </div>
          <div className="brand-text">
            <span className="brand-title">{t('brand.name')}</span>
            <span className="brand-sub">Maharashtra EdTech • AI & DRM</span>
          </div>
        </Link>

        {/* Dynamic Contextual Navigation depending on active route */}
        <nav aria-label="Main Navigation" className="channel-nav">
          {pathname.startsWith('/student') ? (
            <>
              <Link href="/student" className={`nav-link ${pathname === '/student' ? 'active' : ''}`}>
                <BookOpen size={15} aria-hidden="true" /> <span>{t('nav.dashboard')}</span>
              </Link>
              <Link href="/student/lectures" className={`nav-link ${pathname === '/student/lectures' ? 'active' : ''}`}>
                <Sparkles size={15} aria-hidden="true" /> <span>{t('nav.lectures')}</span>
              </Link>
              <Link href="/student/notes" className={`nav-link ${pathname === '/student/notes' ? 'active' : ''}`}>
                <FileText size={15} aria-hidden="true" /> <span>{t('nav.notes')}</span>
              </Link>
              <Link href="/student/doubts" className={`nav-link ${pathname === '/student/doubts' ? 'active' : ''}`}>
                <HelpCircle size={15} aria-hidden="true" /> <span>{t('nav.doubts')}</span>
              </Link>
              <Link href="/student/exams" className={`nav-link ${pathname === '/student/exams' ? 'active' : ''}`}>
                <Award size={15} aria-hidden="true" /> <span>{t('nav.exams')}</span>
              </Link>
            </>
          ) : pathname.startsWith('/teacher') ? (
            <>
              <Link href="/teacher" className={`nav-link ${pathname === '/teacher' ? 'active' : ''}`}>
                <BookOpen size={15} aria-hidden="true" /> <span>{t('nav.dashboard')}</span>
              </Link>
              <Link href="/teacher/upload" className={`nav-link ${pathname === '/teacher/upload' ? 'active' : ''}`}>
                <UploadCloud size={15} aria-hidden="true" /> <span>{t('nav.upload')}</span>
              </Link>
              <Link href="/teacher/doubts" className={`nav-link ${pathname === '/teacher/doubts' ? 'active' : ''}`}>
                <PenTool size={15} aria-hidden="true" /> <span>{t('nav.whiteboard')}</span>
              </Link>
              <Link href="/teacher/assessments" className={`nav-link ${pathname === '/teacher/assessments' ? 'active' : ''}`}>
                <FileCheck size={15} aria-hidden="true" /> <span>{t('nav.assessments')}</span>
              </Link>
            </>
          ) : pathname.startsWith('/admin') ? (
            <>
              <Link href="/admin" className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}>
                <Activity size={15} aria-hidden="true" /> <span>{t('nav.telemetry')}</span>
              </Link>
              <Link href="/admin/anti-piracy" className={`nav-link ${pathname === '/admin/anti-piracy' ? 'active' : ''}`}>
                <ShieldCheck size={15} aria-hidden="true" /> <span>{t('nav.antipiracy')}</span>
              </Link>
              <Link href="/admin/batches" className={`nav-link ${pathname === '/admin/batches' ? 'active' : ''}`}>
                <Layers size={15} aria-hidden="true" /> <span>{t('nav.batches_admin')}</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="nav-link active">
                <BookOpen size={15} aria-hidden="true" /> <span>{t('nav.home')}</span>
              </Link>
              <Link href="/student" className="nav-link">
                <GraduationCap size={15} aria-hidden="true" /> <span>{t('nav.student')}</span>
              </Link>
              <Link href="/teacher" className="nav-link">
                <PenTool size={15} aria-hidden="true" /> <span>{t('nav.teacher')}</span>
              </Link>
              <Link href="/admin" className="nav-link">
                <ShieldCheck size={15} aria-hidden="true" /> <span>{t('nav.admin')}</span>
              </Link>
            </>
          )}
        </nav>

        {/* Right Header Controls */}
        <div className="header-right-group">
          {/* Global Command Palette Trigger Button */}
          <button 
            type="button"
            onClick={triggerCommandPalette} 
            className="command-bar-btn"
            aria-label="Open quick search"
            title="Quick Search & Actions (Cmd+K or /)"
          >
            <Search size={14} className="text-slate-400" aria-hidden="true" />
            <span className="search-text">{lang === 'en' ? 'Quick Search…' : 'शोधा…'}</span>
            <kbd className="cmd-badge" aria-hidden="true">
              <Command size={10} aria-hidden="true" /> K
            </kbd>
          </button>

          {/* Konkan Low-Bandwidth Mode Indicator */}
          {isKonkanMode && (
            <div className="konkan-live-pill" role="status" aria-live="polite" title="240p Konkan Coastal Network Optimization Active">
              <Wifi size={13} className="text-emerald-400 pulse-active" aria-hidden="true" />
              <span>240p Mode</span>
            </div>
          )}

          {/* User Profile Pill */}
          <div className="user-profile-pill glass-card">
            <div className="user-avatar-circle" aria-hidden="true">
              <User size={14} aria-hidden="true" />
            </div>
            <div className="user-details">
              <span className="user-name">{lang === 'en' ? user.name : user.nameMr}</span>
              <span className="user-role-label">{getRoleLabel()}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-header {
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-top: none;
          padding: 10px 24px;
          padding-left: max(24px, env(safe-area-inset-left));
          padding-right: max(24px, env(safe-area-inset-right));
          background: rgba(8, 9, 10, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }
        .logo-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #2563eb, #ea580c);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }
        .brand-title {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          display: block;
          line-height: 1.1;
          color: #ffffff;
        }
        .brand-sub {
          font-size: 0.68rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }
        .channel-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          overscroll-behavior: contain;
          padding: 3px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
          white-space: nowrap;
          touch-action: manipulation;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-link.active {
          color: #ffffff;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          box-shadow: 0 2px 10px rgba(37, 99, 235, 0.35);
        }
        .header-right-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .command-bar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          cursor: pointer;
          color: var(--text-secondary);
          transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
          touch-action: manipulation;
        }
        .command-bar-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .search-text {
          font-size: 0.76rem;
          font-weight: 500;
        }
        .cmd-badge {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 2px 5px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          font-size: 0.65rem;
          color: var(--text-tertiary);
          font-family: monospace;
        }
        .konkan-live-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 9px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          color: #34d399;
        }
        .user-profile-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .user-avatar-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .user-details {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-size: 0.78rem;
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
        }
        .user-role-label {
          font-size: 0.65rem;
          color: #60a5fa;
          font-weight: 600;
        }
      `}</style>
    </header>
  );
};
