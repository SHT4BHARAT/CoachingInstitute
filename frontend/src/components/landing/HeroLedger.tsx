'use client';

import Link from 'next/link';
import { Play, BookMarked, ArrowUpRight } from 'lucide-react';
import type { Language } from '@/context/LanguageContext';

type Props = {
  lang: Language;
};

export default function HeroLedger({ lang }: Props) {
  return (
    <>
      <div className="hero-left">
        <div className="ledger-margin" aria-hidden="true">
          <span className="hole" /><span className="hole" /><span className="hole" /><span className="hole" /><span className="hole" />
        </div>

        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="stamp" translate="no">महाराष्ट्र शासन मान्यताप्राप्त</span>
            <span className="eyebrow-text">
              {lang === 'en' ? 'Maharashtra State Board • Marathi & Semi-English' : 'महाराष्ट्र स्टेट बोर्ड • मराठी व सेमी-इंग्रजी'}
            </span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            {lang === 'en' ? (
              <>
                The <em>notebook</em> that <br /> cracks <span className="laterite-underline">MHT-CET</span> &<br /> 12th HSC —
                <span className="pencil-note"> बोर्ड + CET एकत्र !</span>
              </>
            ) : (
              <>
                <em>बोर्ड</em> आणि <span className="laterite-underline">MHT-CET</span> —<br /> एकाच <em>वहीत</em> फोडा
                <span className="pencil-note"> २४०p मध्येही!</span>
              </>
            )}
          </h1>

          <p className="hero-desc">
            {lang === 'en'
              ? 'Balbharati-aligned theory, topper handwriting, DRM-locked lectures and a real CET timer. Built for Pune, Konkan & Vidarbha — not Kota.'
              : 'बालभारती धडा-दर-धडा, टॉपरच्या हस्तलिखित नोट्स, DRM व्हिडिओ आणि खरा CET टायमर. कोटा नाही — आपला महाराष्ट्र.'}
          </p>

          <div className="register-stats" role="table" aria-label="Key metrics">
            <div className="reg-row" role="row">
              <span className="reg-label" role="cell">विद्यार्थी / Students</span>
              <span className="reg-value" role="cell" style={{ fontVariantNumeric: 'tabular-nums' }}>14,800+</span>
              <span className="reg-hand" role="cell">36 जिल्हे ✓</span>
            </div>
            <div className="reg-row" role="row">
              <span className="reg-label" role="cell">शंका समाधान / Doubt SLA</span>
              <span className="reg-value" role="cell" style={{ fontVariantNumeric: 'tabular-nums' }}>&lt; 90 min</span>
              <span className="reg-hand" role="cell">AI + सर ✓</span>
            </div>
            <div className="reg-row" role="row">
              <span className="reg-label" role="cell">पायरसी संरक्षण</span>
              <span className="reg-value" role="cell" style={{ fontVariantNumeric: 'tabular-nums' }}>99.8%</span>
              <span className="reg-hand" role="cell">watermark on</span>
            </div>
          </div>

          <div className="hero-ctas">
            <Link href="/student/lectures" className="btn btn-primary cta-perf">
              <Play size={16} aria-hidden="true" />
              <span>{lang === 'en' ? 'Watch 2 free demos' : '२ डेमो मोफत पहा'}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('batch-ledger')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary"
            >
              <BookMarked size={16} aria-hidden="true" />
              <span>{lang === 'en' ? 'See batches' : 'बॅचेस पहा'}</span>
            </button>
          </div>

          <div className="trust-line">
            <span className="trust-dot" aria-hidden="true" /> {lang === 'en' ? 'No Kota accent. Marathi explanations first, then English.' : 'कोटा ॲक्सेंट नाही — प्रथम मराठी, मग इंग्रजी.'}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-left {
          position: relative;
          background: #FFFFFF;
          border: 1px solid var(--graph-line-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          overflow: hidden;
          min-height: 560px;
        }
        .ledger-margin {
          width: 56px;
          flex-shrink: 0;
          background: #FFFEFA;
          border-right: 2px solid var(--rule-red-faint);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 28px 0;
        }
        .ledger-margin::after {
          content: '';
          position: absolute;
          top: 0;
          right: 6px;
          bottom: 0;
          width: 1.5px;
          background: var(--rule-red);
          opacity: 0.9;
        }
        .hole {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--paper-stock);
          border: 1px solid var(--graph-line-strong);
          box-shadow: inset 0 1px 2px rgba(15,36,64,0.12);
        }
        .hero-copy {
          flex: 1;
          min-width: 0;
          padding: 28px 28px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background-image: linear-gradient(to bottom, transparent 31px, var(--graph-line) 31px);
          background-size: 100% 32px;
          background-position: 0 56px;
          background-repeat: repeat;
        }
        @media (max-width: 600px) { .hero-copy { padding: 20px 16px 20px 14px; } }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .stamp {
          padding: 3px 8px;
          border: 1.5px solid var(--laterite);
          color: var(--laterite);
          font-family: var(--font-family-mono);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transform: rotate(-0.6deg);
          background: var(--laterite-wash);
          border-radius: 2px;
        }
        .eyebrow-text {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--ink-muted);
          font-family: var(--font-family-mono);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4.2vw, 3.1rem);
          line-height: 0.98;
          font-weight: 800;
          color: var(--ink-register);
          letter-spacing: -0.04em;
          position: relative;
          text-wrap: balance;
          scroll-margin-top: 80px;
        }
        .hero-title em {
          font-style: italic;
          font-weight: 500;
          color: var(--copper-teal);
        }
        .laterite-underline {
          background: linear-gradient(to bottom, transparent 62%, var(--marigold-wash) 62%, var(--marigold-wash) 92%, transparent 92%);
          padding: 0 2px;
        }
        .pencil-note {
          display: inline-block;
          font-family: var(--font-family-mono);
          font-size: 0.42em;
          font-weight: 700;
          color: var(--laterite);
          background: #FFF4CC;
          border: 1px dashed rgba(166,60,40,0.35);
          padding: 2px 8px;
          border-radius: 999px;
          transform: rotate(1.2deg) translateY(-4px);
          vertical-align: middle;
          letter-spacing: 0.02em;
        }
        .hero-desc {
          font-size: 1.02rem;
          line-height: 1.55;
          color: var(--ink-secondary);
          max-width: 520px;
          background: #FFFFFF;
          padding: 4px 0;
          overflow-wrap: break-word;
        }
        .register-stats {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid var(--graph-line);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-top: 4px;
        }
        .reg-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 12px;
          align-items: center;
          padding: 10px 14px;
          border-bottom: 1px dashed var(--graph-line);
          font-family: var(--font-family-mono);
        }
        .reg-row:last-child { border-bottom: none; }
        .reg-label { font-size: 0.70rem; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }
        .reg-value { font-size: 1.05rem; font-weight: 800; color: var(--ink-register); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
        .reg-hand { font-size: 0.70rem; color: var(--copper-teal); background: var(--copper-teal-wash); padding: 2px 7px; border-radius: 999px; font-weight: 700; }
        .hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 6px; background: #fff; }
        .cta-perf { position: relative; }
        .trust-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: var(--ink-muted);
          background: #fff;
          padding-top: 2px;
          font-style: italic;
        }
        .trust-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--copper-teal); flex-shrink: 0; }
        @media (prefers-reduced-motion: reduce) {
          .pencil-note { transform: none !important; }
        }
      `}</style>
    </>
  );
}
