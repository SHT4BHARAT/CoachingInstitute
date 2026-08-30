'use client';

import Link from 'next/link';
import { CheckCircle2, Play, Zap } from 'lucide-react';
import type { Batch } from '@/lib/mockData';
import type { Language } from '@/context/LanguageContext';

type Props = {
  batch: Batch;
  lang: Language;
  enrolled: boolean;
  onEnroll: () => void;
  priceFmt: Intl.NumberFormat;
};

export default function LedgerCard({ batch, lang, enrolled, onEnroll, priceFmt }: Props) {
  const teacher = batch.teachers[0] || 'प्रा. अनंत कुलकर्णी';
  return (
    <>
      <div className="ledger-card">
        <div className="ledger-card-margin" aria-hidden="true">
          <span className="hole sm" /><span className="hole sm" /><span className="hole sm" />
        </div>
        <div className="ledger-card-body min-w-0">
          <div className="lc-top">
            <span className="badge badge-primary">{batch.standard}</span>
            <span className="badge badge-saffron">{batch.targetExam.split('(')[0].trim()}</span>
          </div>
          <h3 className="lc-title break-words">{lang === 'en' ? batch.titleEn : batch.titleMr}</h3>
          <div className="lc-teacher">
            <div className="teacher-initial" aria-hidden="true">{teacher.charAt(0)}</div>
            <div className="min-w-0">
              <span className="t-name truncate">{teacher}</span>
              <span className="t-sub" style={{ fontVariantNumeric: 'tabular-nums' }}>{batch.totalLectures} lectures • {batch.syllabusCompletion}% done</span>
            </div>
          </div>

          <div className="lc-perks">
            <span><CheckCircle2 size={13} aria-hidden="true" /> {batch.totalLectures} DRM lectures</span>
            <span><CheckCircle2 size={13} aria-hidden="true" /> 2 free demos</span>
            <span><CheckCircle2 size={13} aria-hidden="true" /> {lang === 'en' ? 'Canvas notes • no download' : 'कॅनव्हास नोट्स • डाउनलोड नाही'}</span>
          </div>

          <div className="lc-footer">
            <div className="price" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <span className="p-main" translate="no">{priceFmt.format(batch.price)}</span>
              <span className="p-cut" translate="no">{priceFmt.format(batch.originalPrice)}</span>
              <span className="p-gst">18% GST incl.</span>
            </div>
            {enrolled ? (
              <Link href="/student/lectures" className="btn btn-primary btn-sm">
                <Play size={13} aria-hidden="true" /> {lang === 'en' ? 'Open' : 'उघडा'}
              </Link>
            ) : (
              <div className="lc-actions">
                <Link href="/student/lectures" className="btn btn-secondary btn-sm">Demo</Link>
                <button
                  type="button"
                  onClick={onEnroll}
                  className="btn btn-primary btn-sm"
                  aria-label={`Enroll in ${lang === 'en' ? batch.titleEn : batch.titleMr}`}
                >
                  <Zap size={13} aria-hidden="true" /> {lang === 'en' ? 'Enroll' : 'प्रवेश'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="perf-bottom" aria-hidden="true" />
      </div>

      <style jsx>{`
        .min-w-0 { min-width: 0; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .break-words { overflow-wrap: break-word; word-break: break-word; }
        .ledger-card {
          display: flex;
          background: #FFFFFF;
          border: 1px solid var(--graph-line-strong);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          position: relative;
        }
        .ledger-card-margin {
          width: 36px;
          flex-shrink: 0;
          background: #FFFEFA;
          border-right: 1.5px solid var(--rule-red-faint);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 18px 0;
          position: relative;
        }
        .ledger-card-margin::after {
          content: '';
          position: absolute;
          right: 5px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--rule-red);
          opacity: 0.8;
        }
        .hole.sm { width: 10px; height: 10px; border-radius: 50%; background: var(--paper-stock); border: 1px solid var(--graph-line-strong); box-shadow: inset 0 1px 2px rgba(15,36,64,0.12); }
        .ledger-card-body { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .lc-top { display: flex; gap: 6px; flex-wrap: wrap; }
        .lc-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; line-height: 1.25; color: var(--ink-register); text-wrap: pretty; }
        .lc-teacher {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: var(--paper-stock-2);
          border: 1px solid var(--graph-line);
          border-radius: var(--radius-sm);
        }
        .teacher-initial {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--ink-register);
          color: #FDF6E3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.82rem;
          flex-shrink: 0;
        }
        .t-name { display: block; font-size: 0.82rem; font-weight: 700; color: var(--ink-register); }
        .t-sub { font-size: 0.68rem; color: var(--ink-muted); font-family: var(--font-family-mono); font-variant-numeric: tabular-nums; }
        .lc-perks { display: flex; flex-direction: column; gap: 6px; font-size: 0.78rem; color: var(--ink-secondary); }
        .lc-perks span { display: flex; align-items: center; gap: 6px; }
        .lc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed var(--graph-line);
          gap: 10px;
          flex-wrap: wrap;
        }
        .price { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; font-variant-numeric: tabular-nums; }
        .p-main { font-size: 1.25rem; font-weight: 800; color: var(--ink-register); letter-spacing: -0.02em; }
        .p-cut { font-size: 0.78rem; color: var(--ink-muted); text-decoration: line-through; }
        .p-gst { font-family: var(--font-family-mono); font-size: 0.62rem; color: var(--copper-teal); font-weight: 700; background: var(--copper-teal-wash); padding: 2px 6px; border-radius: 999px; }
        .lc-actions { display: flex; gap: 6px; }
        .perf-bottom {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 10px;
          background: radial-gradient(circle, transparent 5px, #FFFFFF 5.5px);
          background-size: 14px 10px;
          background-repeat: repeat-x;
          background-position: top;
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}
