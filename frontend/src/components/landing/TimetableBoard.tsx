'use client';

import { Clock3, FlaskConical, Calculator, Sparkles } from 'lucide-react';
import type { Language } from '@/context/LanguageContext';

type Props = {
  lang: Language;
};

export default function TimetableBoard({ lang }: Props) {
  return (
    <>
      <section className="timetable-board" aria-labelledby="timetable-heading">
        <div className="board-header">
          <div className="board-title" id="timetable-heading">
            <Clock3 size={16} aria-hidden="true" />
            <span>{lang === 'en' ? 'Today on MahaShiksha — विभागीय वेळापत्रक' : 'आजचे वेळापत्रक — विभागीय वेळापत्रक'}</span>
          </div>
          <span className="board-meta">Solapur • Kolhapur • Konkan — LIVE</span>
        </div>
        <div className="board-grid">
          <div className="board-card">
            <FlaskConical size={18} aria-hidden="true" />
            <div className="min-w-0">
              <div className="bc-k">07:30 • Physics</div>
              <div className="bc-v truncate">Chemical Kinetics — डॉ. कदम (Marathi)</div>
            </div>
            <span className="bc-badge live">LIVE</span>
          </div>
          <div className="board-card">
            <Calculator size={18} aria-hidden="true" />
            <div className="min-w-0">
              <div className="bc-k">09:00 • Maths</div>
              <div className="bc-v truncate">Definite Integration — प्रा. जोशी</div>
            </div>
            <span className="bc-badge">DEMO FREE</span>
          </div>
          <div className="board-card">
            <Sparkles size={18} aria-hidden="true" />
            <div className="min-w-0">
              <div className="bc-k">18:00 • Doubt Desk</div>
              <div className="bc-v truncate">Balbharati AI + voice notes</div>
            </div>
            <span className="bc-badge teal">OPEN 24h</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .min-w-0 { min-width: 0; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .timetable-board {
          background: #FFFFFF;
          border: 1px solid var(--graph-line-strong);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          scroll-margin-top: 80px;
        }
        .board-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--ink-register);
          color: #FDF6E3;
          font-family: var(--font-family-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          gap: 12px;
          flex-wrap: wrap;
        }
        .board-title { display: flex; align-items: center; gap: 8px; }
        .board-meta { opacity: 0.7; font-size: 0.68rem; }
        .board-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        @media (max-width: 760px) { .board-grid { grid-template-columns: 1fr; } }
        .board-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-right: 1px solid var(--graph-line);
          background: #FFFFFF;
        }
        .board-card:last-child { border-right: none; }
        @media (max-width: 760px) { .board-card { border-right: none; border-bottom: 1px solid var(--graph-line); } .board-card:last-child { border-bottom: none; } }
        .bc-k { font-family: var(--font-family-mono); font-size: 0.68rem; font-weight: 800; color: var(--laterite); }
        .bc-v { font-size: 0.84rem; font-weight: 600; color: var(--ink-register); line-height: 1.3; }
        .bc-badge { margin-left: auto; padding: 3px 7px; border-radius: 999px; font-family: var(--font-family-mono); font-size: 0.60rem; font-weight: 800; background: var(--laterite-wash); color: var(--laterite); border: 1px solid rgba(166,60,40,0.2); white-space: nowrap; }
        .bc-badge.live { background: #FEE2E2; color: #C52828; border-color: rgba(197,40,40,0.2); }
        .bc-badge.teal { background: var(--copper-teal-wash); color: var(--copper-teal); }
      `}</style>
    </>
  );
}
