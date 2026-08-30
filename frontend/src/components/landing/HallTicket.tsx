'use client';

import Link from 'next/link';
import { ShieldCheck, Wifi, Play, QrCode, GraduationCap, StickyNote } from 'lucide-react';
import type { Language } from '@/context/LanguageContext';

type Props = {
  lang: Language;
  ticketName: string;
  setTicketName: (v: string) => void;
  showWatermark: boolean;
  setShowWatermark: (v: boolean) => void;
  isKonkanMode: boolean;
  toggleKonkanMode: () => void;
  now: string;
  mounted: boolean;
};

export default function HallTicket({
  lang,
  ticketName,
  setTicketName,
  showWatermark,
  setShowWatermark,
  isKonkanMode,
  toggleKonkanMode,
  now,
  mounted,
}: Props) {
  return (
    <>
      <div className="hero-right">
        <div className="hall-ticket">
          <div className="perf-edge" aria-hidden="true" />

          <div className="ticket-header">
            <div className="ticket-brand">
              <div className="ticket-seal" aria-hidden="true">
                <GraduationCap size={18} aria-hidden="true" />
              </div>
              <div>
                <div className="ticket-title">MHT-CET 2026</div>
                <div className="ticket-sub">Hall Ticket — SPECIMEN • महा-शिक्षा</div>
              </div>
            </div>
            <div className="ticket-stamp">
              <span className={`stamp-pill ${isKonkanMode ? 'teal' : 'laterite'}`} aria-live="polite">
                {isKonkanMode ? '240p KONKAN' : '1080p HD'}
              </span>
            </div>
          </div>

          <div className="ticket-body">
            <div className="ticket-field">
              <label htmlFor="ticket-name-input">विद्यार्थ्याचे नाव / Student Name</label>
              <input
                id="ticket-name-input"
                name="studentName"
                type="text"
                autoComplete="name"
                spellCheck={false}
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                placeholder="तुमचे नाव लिहा…"
                className="ticket-input"
              />
              <span className="field-hand" aria-hidden="true">✎ edit to preview watermark</span>
            </div>

            <div className="ticket-grid">
              <div className="tg-item">
                <span className="tg-k">Seat No.</span>
                <span className="tg-v" translate="no" style={{ fontVariantNumeric: 'tabular-nums' }}>MH-26 / 881204</span>
              </div>
              <div className="tg-item">
                <span className="tg-k">Centre</span>
                <span className="tg-v">Pune • Ratnagiri • Nagpur</span>
              </div>
              <div className="tg-item">
                <span className="tg-k">Batch</span>
                <span className="tg-v">CET संकल्प 2026</span>
              </div>
              <div className="tg-item">
                <span className="tg-k">Medium</span>
                <span className="tg-v">Marathi + Semi-English</span>
              </div>
            </div>

            <div className="ticket-demo">
              <div className="demo-top">
                <span className="live-dot" aria-hidden="true" />
                <span className="demo-label">DRM lecture preview — Rotational Dynamics</span>
                <button
                  type="button"
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`wm-toggle ${showWatermark ? 'on' : ''}`}
                  aria-pressed={showWatermark}
                  aria-label={showWatermark ? 'Disable watermark' : 'Enable watermark'}
                >
                  <ShieldCheck size={12} aria-hidden="true" />
                  {showWatermark ? 'Watermark ON' : 'OFF'}
                </button>
              </div>
              <div className="demo-stage">
                <div className="chalk-formula">
                  <span className="formula-tag">Balbharati • Ch. 1</span>
                  <code translate="no">I = ½ M R² &nbsp;  τ = I α</code>
                  <span className="lecturer">प्रा. कुलकर्णी — समांतर अक्ष सिद्धांत</span>
                </div>
                {showWatermark && (
                  <div className="wm-float" aria-hidden="true">
                    {(ticketName || '—')} • 98****10 • 49.36.12.8 • {mounted ? now : '—:—:—'}
                  </div>
                )}
                <div className="bitrate" aria-live="polite">
                  <Wifi size={11} aria-hidden="true" />
                  {isKonkanMode ? '280 kbps • 68% saved' : '2.4 Mbps • HD'}
                </div>
              </div>
              <div className="demo-actions">
                <button
                  type="button"
                  onClick={toggleKonkanMode}
                  className={`konkan-stamp ${isKonkanMode ? 'active' : ''}`}
                  aria-pressed={isKonkanMode}
                  aria-label="Toggle Konkan low-bandwidth mode"
                >
                  {isKonkanMode ? '● 240p Konkan Mode Active' : '○ Switch to 240p Konkan Mode'}
                </button>
                <Link href="/student/lectures" className="demo-play">
                  <Play size={12} aria-hidden="true" /> Play demo
                </Link>
              </div>
            </div>

            <div className="ticket-stub">
              <div className="stub-cut" aria-hidden="true">
                <span>✂ — — — tear before entering hall — — — ✂</span>
              </div>
              <div className="stub-row">
                <span className="stub-k">Invoice SAC</span>
                <span className="stub-v" translate="no" style={{ fontVariantNumeric: 'tabular-nums' }}>999293 • 18% GST included</span>
                <QrCode size={28} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <span>Forensic watermark moves every 12s • Single-device lock • Canvas notes</span>
          </div>
        </div>

        <div className="floating-note" role="note">
          <StickyNote size={14} aria-hidden="true" />
          <span>{lang === 'en' ? '"Topper notes look like this" — 12th HSC 2025 rank 12' : '“टॉपरच्या नोट्स अशाच दिसतात” — HSC २०२५ Rank १२'}</span>
        </div>
      </div>

      <style jsx>{`
        .hero-right { position: relative; }
        .hall-ticket {
          background: #FFFFFF;
          border: 1px solid var(--graph-line-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          position: relative;
        }
        .perf-edge {
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 14px;
          background: radial-gradient(circle, transparent 6px, var(--paper-stock) 6.5px);
          background-size: 14px 20px;
          background-repeat: repeat-y;
          background-position: center;
          border-right: 1px dashed var(--graph-line-strong);
        }
        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px 14px 22px;
          background: linear-gradient(135deg, #0F2440 0%, #1A3A5E 100%);
          color: #FFFFFF;
        }
        .ticket-brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .ticket-seal {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--marigold);
          color: var(--ink-register);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255,255,255,0.9);
        }
        .ticket-title { font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; letter-spacing: -0.02em; text-wrap: balance; }
        .ticket-sub { font-family: var(--font-family-mono); font-size: 0.62rem; opacity: 0.85; letter-spacing: 0.05em; text-transform: uppercase; }
        .stamp-pill {
          font-family: var(--font-family-mono);
          font-size: 0.62rem;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 999px;
          letter-spacing: 0.06em;
        }
        .stamp-pill.laterite { background: var(--laterite); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
        .stamp-pill.teal { background: var(--copper-teal); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
        .ticket-body { padding: 18px 18px 14px 22px; display: flex; flex-direction: column; gap: 14px; }
        .ticket-field label {
          font-family: var(--font-family-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .ticket-input {
          width: 100%;
          margin-top: 6px;
          padding: 9px 12px;
          border: 1.5px dashed var(--graph-line-strong);
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink-register);
          background: var(--paper-stock-2);
          outline: none;
        }
        .ticket-input:focus { border-color: var(--laterite); background: #fff; }
        .field-hand {
          font-family: var(--font-family-mono);
          font-size: 0.62rem;
          color: var(--laterite);
          font-style: italic;
        }
        .ticket-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px;
          background: var(--paper-stock-2);
          border: 1px solid var(--graph-line);
          border-radius: var(--radius-md);
        }
        .tg-item { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .tg-k { font-family: var(--font-family-mono); font-size: 0.60rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); }
        .tg-v { font-size: 0.82rem; font-weight: 700; color: var(--ink-register); overflow-wrap: break-word; }
        .ticket-demo {
          border: 1px solid var(--graph-line-strong);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #0A0F1E;
        }
        .demo-top {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: #0F1B2E;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 8px rgba(239,68,68,0.6); animation: pulseGlow 1.8s infinite; }
        .demo-label { flex: 1; min-width: 0; font-family: var(--font-family-mono); font-size: 0.64rem; color: #CBD5E1; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; }
        .wm-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 7px;
          border-radius: 999px;
          font-family: var(--font-family-mono);
          font-size: 0.60rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #94A3B8;
          cursor: pointer;
          touch-action: manipulation;
        }
        .wm-toggle.on { background: rgba(14,111,92,0.25); color: #6EE7B7; border-color: rgba(14,111,92,0.35); }
        .demo-stage {
          position: relative;
          padding: 18px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 110px;
          background: radial-gradient(circle at center, #111D33 0%, #070B14 100%);
        }
        .chalk-formula { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
        .formula-tag { font-family: var(--font-family-mono); font-size: 0.60rem; color: #60A5FA; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .chalk-formula code { font-family: var(--font-family-mono); font-size: 1.05rem; color: #FDE68A; background: rgba(0,0,0,0.35); padding: 4px 10px; border-radius: 4px; }
        .lecturer { font-size: 0.74rem; color: #CBD5E1; }
        .wm-float {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%) rotate(-1deg);
          padding: 3px 8px;
          background: rgba(0,0,0,0.55);
          border: 1px dashed rgba(255,255,255,0.25);
          border-radius: 999px;
          font-family: var(--font-family-mono);
          font-size: 0.58rem;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          transform-origin: center;
        }
        .bitrate {
          position: absolute;
          bottom: 8px;
          right: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 7px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          font-family: var(--font-family-mono);
          font-size: 0.60rem;
          color: #34D399;
        }
        .demo-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background: #0F1B2E;
          border-top: 1px solid rgba(255,255,255,0.06);
          gap: 8px;
          flex-wrap: wrap;
        }
        .konkan-stamp {
          font-family: var(--font-family-mono);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 999px;
          border: 1px dashed var(--graph-line-strong);
          background: #FFFFFF;
          color: var(--ink-muted);
          cursor: pointer;
          touch-action: manipulation;
        }
        .konkan-stamp.active { background: var(--copper-teal-wash); color: var(--copper-teal); border-color: var(--copper-teal); border-style: solid; }
        .demo-play {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--laterite);
          color: #fff;
          font-size: 0.74rem;
          font-weight: 700;
          text-decoration: none;
          touch-action: manipulation;
        }
        .ticket-stub {
          border-top: 2px dashed var(--graph-line-strong);
          padding-top: 10px;
          margin-top: 2px;
        }
        .stub-cut { text-align: center; font-family: var(--font-family-mono); font-size: 0.58rem; color: var(--ink-muted); letter-spacing: 0.06em; margin-bottom: 8px; }
        .stub-row { display: flex; align-items: center; gap: 12px; font-family: var(--font-family-mono); }
        .stub-k { font-size: 0.60rem; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .stub-v { flex: 1; min-width: 0; font-size: 0.76rem; font-weight: 700; color: var(--ink-register); }
        .ticket-footer { padding: 8px 22px; background: var(--paper-stock-2); border-top: 1px solid var(--graph-line); font-family: var(--font-family-mono); font-size: 0.60rem; color: var(--ink-muted); text-align: center; letter-spacing: 0.04em; }
        .floating-note {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #FFF4CC;
          border: 1px solid rgba(232,163,23,0.35);
          border-radius: var(--radius-md);
          font-size: 0.76rem;
          color: var(--ink-register);
          transform: rotate(0.6deg);
          transform-origin: center;
          box-shadow: var(--shadow-sm);
        }
        @media (prefers-reduced-motion: reduce) {
          .live-dot { animation: none !important; }
          .floating-note { transform: none !important; }
        }
      `}</style>
    </>
  );
}
