'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, Language } from '@/context/LanguageContext';
import { 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  Globe, 
  Smartphone, 
  Sparkles, 
  AlertTriangle, 
  Home
} from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const pathname = usePathname();
  const { switchRole, heartbeatSecondsLeft, simulateConcurrentLogin, isSessionBlocked, unblockSession } = useAuth();
  const { lang, setLang } = useLanguage();

  return (
    <div className="role-switcher-wrapper">
      {/* Top Quick Bar */}
      <aside aria-label="Demo Bar" className="role-switcher-bar glass-panel">
        <div className="switcher-left">
          <div className="demo-badge">
            <Sparkles size={14} className="text-amber-400" aria-hidden="true" />
            <span className="demo-title">MahaShiksha Demo Console</span>
          </div>

          <div className="role-buttons">
            <Link 
              href="/" 
              className={`role-btn ${pathname === '/' ? 'active' : ''}`}
            >
              <Home size={14} aria-hidden="true" />
              <span>मुख्य / Catalog</span>
            </Link>

            <Link 
              href="/student" 
              onClick={() => switchRole('STUDENT')}
              className={`role-btn ${pathname.startsWith('/student') ? 'active' : ''}`}
            >
              <GraduationCap size={14} aria-hidden="true" />
              <span>विद्यार्थी / Student</span>
            </Link>

            <Link 
              href="/teacher" 
              onClick={() => switchRole('TEACHER')}
              className={`role-btn ${pathname.startsWith('/teacher') ? 'active' : ''}`}
            >
              <Briefcase size={14} aria-hidden="true" />
              <span>शिक्षक / Faculty</span>
            </Link>

            <Link 
              href="/admin" 
              onClick={() => switchRole('ADMIN')}
              className={`role-btn ${pathname.startsWith('/admin') ? 'active' : ''}`}
            >
              <ShieldAlert size={14} aria-hidden="true" />
              <span>प्रशासक / Admin</span>
            </Link>
          </div>
        </div>

        <div className="switcher-right">
          {/* Heartbeat / Single Device Lock Indicator */}
          <div className="heartbeat-pill" title="Single Device Active Session Lock - Redis Heartbeat" role="status" aria-live="polite">
            <span className="heartbeat-dot pulse-active" aria-hidden="true"></span>
            <span className="heartbeat-text">
              Single-Device Lock: <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{heartbeatSecondsLeft}s</strong>
            </span>
          </div>

          {/* Simulate Concurrent Login Attack Button */}
          <button 
            type="button"
            onClick={simulateConcurrentLogin}
            className="btn-sim-attack"
            title="Simulate someone logging in with your password from another phone"
          >
            <Smartphone size={13} aria-hidden="true" />
            <span>Simulate Device Conflict</span>
          </button>

          {/* Language Selector */}
          <div className="lang-selector">
            <Globe size={14} aria-hidden="true" />
            <select 
              value={lang} 
              aria-label="Language Selector"
              onChange={(e) => setLang(e.target.value as Language)}
              className="lang-dropdown"
            >
              <option value="mr">मराठी (Pure)</option>
              <option value="mr-en">द्विभाषिक (Semi-EN)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Concurrent Login Interception Alert Modal */}
      {isSessionBlocked && (
        <div className="modal-backdrop" role="presentation" style={{ overscrollBehavior: 'contain' }}>
          <div className="security-alert-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="session-block-title" style={{ overscrollBehavior: 'contain' }}>
            <div className="alert-icon-wrapper" aria-hidden="true">
              <AlertTriangle size={42} className="text-red-500" aria-hidden="true" />
            </div>
            <h3 id="session-block-title" style={{ textWrap: 'balance' }}>⚠️ एकाधिक डिव्हाइस लॉगिन आढळले! (Device Conflict)</h3>
            <p className="alert-desc">
              तुमचे खाते दुसऱ्या डिव्हाइसवरून (<strong>Samsung Galaxy M34 - Pune IP: 49.36.12.8</strong>) 
              लॉगिन झाले आहे. सुरक्षिततेच्या नियमांनुसार तुमचे हे सत्र तात्काळ <strong>सस्पेंड</strong> करण्यात आले आहे.
            </p>
            <div className="security-badge-row">
              <span className="badge badge-danger">DRM Violation Intercepted</span>
              <span className="badge badge-warning">Device Hash Mismatch</span>
            </div>
            <div className="alert-actions">
              <button type="button" onClick={unblockSession} className="btn btn-primary">
                माझे हे डिव्हाइस पुन्हा सक्रिय करा (Re-Authorize This Device)
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .role-switcher-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(8, 12, 20, 0.92);
          border-bottom: 1px solid var(--border-subtle);
          padding: 8px 16px;
        }
        .role-switcher-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 6px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-1);
        }
        .switcher-left, .switcher-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .demo-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
        }
        .role-buttons {
          display: flex;
          gap: 6px;
        }
        .role-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
          touch-action: manipulation;
        }
        .role-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }
        .role-btn.active {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-primary-hover));
          color: #ffffff;
          border-color: transparent;
        }
        .heartbeat-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          color: #34d399;
        }
        .heartbeat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }
        .btn-sim-attack {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 9px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color var(--transition-fast), border-color var(--transition-fast);
          touch-action: manipulation;
        }
        .btn-sim-attack:hover {
          background: rgba(239, 68, 68, 0.25);
        }
        .lang-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .lang-dropdown {
          background: transparent;
          color: var(--text-primary);
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .lang-dropdown option {
          background: #0f172a;
          color: #f8fafc;
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }
        .security-alert-modal {
          max-width: 500px;
          width: 100%;
          padding: 24px;
          text-align: center;
          background: #0f172a;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }
        .alert-icon-wrapper {
          display: inline-flex;
          padding: 16px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.15);
          margin-bottom: 16px;
        }
        .alert-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin: 12px 0 16px;
          line-height: 1.6;
        }
        .security-badge-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .alert-actions {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
