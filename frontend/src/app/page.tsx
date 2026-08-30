'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockBatches, Batch } from '@/lib/mockData';
import { ShieldCheck, Award, CheckCircle2, QrCode } from 'lucide-react';
import HeroLedger from '@/components/landing/HeroLedger';
import HallTicket from '@/components/landing/HallTicket';
import LedgerCard from '@/components/landing/LedgerCard';
import TimetableBoard from '@/components/landing/TimetableBoard';

const priceFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

function LandingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isEnrolled, enrollInBatch, isKonkanMode, toggleKonkanMode } = useAuth();
  const { lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [checkoutBatch, setCheckoutBatch] = useState<Batch | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ticketName, setTicketName] = useState('Rohan Desai');
  const [showWatermark, setShowWatermark] = useState(true);
  const [now, setNow] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const update = () => setNow(timeFmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // nuqs-style URL sync: read filter from searchParams
  useEffect(() => {
    const f = searchParams.get('filter');
    if (f && ['ALL', 'CET', 'HSC', 'SSC'].includes(f)) setSelectedFilter(f);
    else if (!f) setSelectedFilter('ALL');
  }, [searchParams]);

  // nuqs-style URL sync: write filter via router.replace (keeps aria handling intact)
  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams(searchParams.toString());
    if (selectedFilter === 'ALL') params.delete('filter');
    else params.set('filter', selectedFilter);
    const qs = params.toString();
    const href = qs ? `?${qs}` : window.location.pathname;
    router.replace(href, { scroll: false });
  }, [selectedFilter, mounted, router, searchParams]);

  // Modal: inert background, focus trap (Tab loop), Escape, and restore previous focus
  useEffect(() => {
    if (!checkoutBatch) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const modalEl = modalRef.current;
    const mainEl = mainContentRef.current;

    const getFocusable = (): HTMLElement[] => {
      if (!modalEl) return [];
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(modalEl.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !paymentSuccess) {
        setCheckoutBatch(null);
        return;
      }
      if (e.key === 'Tab' && modalEl) {
        const focusable = getFocusable();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKey);
    // focus first actionable element after mount
    setTimeout(() => modalCloseRef.current?.focus(), 50);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // inert background: hide main content from AT and interaction
    if (mainEl) {
      mainEl.setAttribute('aria-hidden', 'true');
      (mainEl as HTMLElement & { inert?: boolean }).inert = true;
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (mainEl) {
        mainEl.removeAttribute('aria-hidden');
        (mainEl as HTMLElement & { inert?: boolean }).inert = false;
      }
      previouslyFocused?.focus();
    };
  }, [checkoutBatch, paymentSuccess]);

  const filteredBatches = mockBatches.filter((b) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'CET') return b.targetExam.includes('CET');
    if (selectedFilter === 'HSC') return b.standard.includes('12th');
    if (selectedFilter === 'SSC') return b.standard.includes('10th');
    return true;
  });

  const handleSimulatePayment = () => {
    if (checkoutBatch) {
      enrollInBatch(checkoutBatch.id);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setCheckoutBatch(null);
      }, 2200);
    }
  };

  return (
    <div className="maha-landing">
      <div ref={mainContentRef as React.RefObject<HTMLDivElement>}>
      <div className="notice-strip" role="status" aria-live="polite">
        <span className="notice-label">सूचना</span>
        <span className="notice-text">
          {lang === 'en'
            ? 'MHT-CET 2026 registration closing soon — Balbharati syllabus 100% covered • 2 free demos live now'
            : 'MHT-CET २०२६ नोंदणी लवकरच बंद — बालभारती अभ्यासक्रम १००% पूर्ण • २ मोफत डेमो लेक्चर्स सुरू'}
        </span>
        <span className="notice-meta" translate="no">EVEREST • MS-CET/26</span>
      </div>

      <section className="hero-ledger" aria-labelledby="hero-heading">
        <HeroLedger lang={lang} />
        <HallTicket
          lang={lang}
          ticketName={ticketName}
          setTicketName={setTicketName}
          showWatermark={showWatermark}
          setShowWatermark={setShowWatermark}
          isKonkanMode={isKonkanMode}
          toggleKonkanMode={toggleKonkanMode}
          now={now}
          mounted={mounted}
        />
      </section>

      <TimetableBoard lang={lang} />

      <section id="batch-ledger" className="ledger-section" aria-labelledby="ledger-heading">
        <div className="section-head">
          <div className="min-w-0">
            <h2 id="ledger-heading" className="section-title">
              {lang === 'en' ? 'Choose your register —' : 'तुमची वही निवडा —'}
              <em> {lang === 'en' ? 'batches as ledgers' : 'बॅचेस'}</em>
            </h2>
            <p className="section-sub">
              {lang === 'en' ? 'Each batch is a ruled ledger. Hole-punched, stamped, GST-ready. 2 demos free.' : 'प्रत्येक बॅच एक रुल्ड लेजर — होल-पंच, शिक्का, GST पावतीसह. २ डेमो मोफत.'}
            </p>
          </div>
          <div className="filter-pills" role="group" aria-label="Filter batches">
            {(['ALL', 'CET', 'HSC', 'SSC'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                className={`filter-btn ${selectedFilter === f ? 'active' : ''}`}
                aria-pressed={selectedFilter === f}
              >
                {f === 'ALL' ? (lang === 'en' ? 'All' : 'सर्व') : f === 'CET' ? 'MHT-CET' : f === 'HSC' ? '१२वी HSC' : '१०वी SSC'}
              </button>
            ))}
          </div>
        </div>

        <div className="ledger-grid-cards">
          {filteredBatches.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No batches match this filter. Try another category.</p>
              <button type="button" onClick={() => setSelectedFilter('ALL')} className="btn btn-secondary btn-sm">Show all batches</button>
            </div>
          ) : filteredBatches.map((batch) => (
            <LedgerCard
              key={batch.id}
              batch={batch}
              lang={lang}
              enrolled={isEnrolled(batch.id)}
              onEnroll={() => setCheckoutBatch(batch)}
              priceFmt={priceFmt}
            />
          ))}
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="sr-only">Student testimonial</h2>
        <div className="trust-card">
          <div className="quote-mark" aria-hidden="true">“</div>
          <p className="trust-text">
            {lang === 'en'
              ? 'I watched lectures on 240p from my village in Sindhudurg. No buffering, and Sir answered my doubt with a voice note in Marathi at 11pm.'
              : 'सिंधुदुर्गातील गावातून २४०p वर लेक्चर पाहिले — बफर नाही. सरांनी रात्री ११ वाजता मराठीत व्हॉईस नोटने शंका सोडवली.'}
          </p>
          <div className="trust-who">— Sneha Sawant, MHT-CET 2025 • 98.2 percentile (PCB)</div>
          <div className="hand-annotation">खरोखर आलेला अभिप्राय — verified ✓</div>
        </div>
        <div className="trust-meta">
          <div className="meta-item">
            <Award size={16} aria-hidden="true" /> <span>CET CBT simulator — same timer, same negative marking</span>
          </div>
          <div className="meta-item">
            <ShieldCheck size={16} aria-hidden="true" /> <span>Moving watermark with your name • screen-record blocked</span>
          </div>
        </div>
      </section>
      </div>

      {checkoutBatch && (
        <div className="modal-backdrop" role="presentation" onClick={() => !paymentSuccess && setCheckoutBatch(null)} style={{ overscrollBehavior: 'contain' }}>
          <div ref={modalRef} className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title" aria-describedby="receipt-desc" onClick={(e) => e.stopPropagation()} style={{ overscrollBehavior: 'contain' }}>
            {!paymentSuccess ? (
              <>
                <div className="receipt-header">
                  <div id="receipt-title" className="receipt-title">RECEIPT • पावती</div>
                  <div className="receipt-no" translate="no">SAC 999293 • MS-INV/2026</div>
                </div>
                <div className="receipt-body" id="receipt-desc">
                  <div className="r-row"><span>Batch</span><strong className="break-words min-w-0" style={{ textAlign: 'right' }}>{lang === 'en' ? checkoutBatch.titleEn : checkoutBatch.titleMr}</strong></div>
                  <div className="r-row"><span>Fee</span><span translate="no" style={{ fontVariantNumeric: 'tabular-nums' }}>{priceFmt.format(checkoutBatch.price)}</span></div>
                  <div className="r-row"><span>18% GST</span><span>Included</span></div>
                  <div className="r-row total"><span>Total</span><span translate="no" style={{ fontVariantNumeric: 'tabular-nums' }}>{priceFmt.format(checkoutBatch.price)}</span></div>
                  <div className="qr-box" aria-hidden="true"><QrCode size={96} aria-hidden="true" /><span translate="no">UPI: mahashiksha@icici • GPay / PhonePe</span></div>
                </div>
                <div className="receipt-actions">
                  <button ref={modalCloseRef} type="button" onClick={() => setCheckoutBatch(null)} className="btn btn-secondary">Cancel</button>
                  <button type="button" onClick={handleSimulatePayment} className="btn btn-primary"><CheckCircle2 size={16} aria-hidden="true" /> Simulate Payment</button>
                </div>
              </>
            ) : (
              <div className="receipt-success" role="status" aria-live="polite">
                <CheckCircle2 size={48} className="text-teal" aria-hidden="true" />
                <h3>Enrollment done — प्रवेश निश्चित!</h3>
                <p>DRM tokens + GST invoice generated. Check Student → Lectures.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .maha-landing { display: flex; flex-direction: column; gap: 28px; padding-top: 12px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .min-w-0 { min-width: 0; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .break-words { overflow-wrap: break-word; word-break: break-word; }
        .notice-strip { display: flex; align-items: center; gap: 12px; padding: 7px 14px; background: var(--ink-register); color: #FDF6E3; border-radius: var(--radius-sm); font-size: 0.76rem; font-family: var(--font-family-mono); overflow: hidden; }
        .notice-label { background: var(--marigold); color: var(--ink-register); padding: 2px 8px; border-radius: 3px; font-weight: 800; letter-spacing: 0.04em; flex-shrink: 0; }
        .notice-text { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.95; }
        .notice-meta { opacity: 0.55; font-size: 0.68rem; flex-shrink: 0; }
        @media (max-width: 700px) { .notice-meta { display: none; } .notice-text { white-space: normal; } }
        .hero-ledger { display: grid; grid-template-columns: 1.05fr 0.92fr; gap: 18px; align-items: start; }
        @media (max-width: 980px) { .hero-ledger { grid-template-columns: 1fr; } }
        .ledger-section { display: flex; flex-direction: column; gap: 16px; scroll-margin-top: 80px; }
        .section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .section-title { font-family: var(--font-display); font-size: 1.9rem; font-weight: 800; color: var(--ink-register); letter-spacing: -0.03em; text-wrap: balance; scroll-margin-top: 80px; }
        .section-title em { font-style: italic; font-weight: 500; color: var(--copper-teal); }
        .section-sub { font-size: 0.88rem; color: var(--ink-muted); margin-top: 4px; overflow-wrap: break-word; }
        .filter-pills { display: flex; gap: 6px; padding: 4px; background: #FFFFFF; border: 1px solid var(--graph-line); border-radius: 999px; box-shadow: var(--shadow-sm); }
        .filter-btn { padding: 6px 14px; border-radius: 999px; font-family: var(--font-family-mono); font-size: 0.74rem; font-weight: 700; border: none; background: transparent; color: var(--ink-muted); cursor: pointer; touch-action: manipulation; }
        .filter-btn.active { background: var(--ink-register); color: #FFFFFF; }
        .ledger-grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
        .empty-state { grid-column: 1 / -1; padding: 24px; text-align: center; background: #fff; border: 1px dashed var(--graph-line-strong); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .trust-section { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 16px; scroll-margin-top: 80px; }
        @media (max-width: 860px) { .trust-section { grid-template-columns: 1fr; } }
        .trust-card { position: relative; background: #FFFFFF; border: 1px solid var(--graph-line-strong); border-radius: var(--radius-lg); padding: 24px 24px 20px; box-shadow: var(--shadow-md); overflow: hidden; }
        .quote-mark { position: absolute; top: -6px; left: 14px; font-family: var(--font-display); font-size: 4rem; line-height: 1; color: var(--graph-line-strong); opacity: 0.6; }
        .trust-text { position: relative; font-family: var(--font-display); font-size: 1.15rem; line-height: 1.5; color: var(--ink-register); font-style: italic; text-wrap: pretty; }
        .trust-who { margin-top: 10px; font-family: var(--font-family-mono); font-size: 0.72rem; color: var(--ink-muted); font-weight: 700; letter-spacing: 0.04em; }
        .hand-annotation { margin-top: 12px; display: inline-block; font-family: var(--font-family-mono); font-size: 0.68rem; color: var(--laterite); background: var(--laterite-wash); padding: 3px 8px; border-radius: 999px; transform: rotate(-0.8deg); transform-origin: center; border: 1px dashed rgba(166,60,40,0.25); }
        .trust-meta { display: flex; flex-direction: column; gap: 10px; justify-content: center; }
        .meta-item { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #FFFFFF; border: 1px solid var(--graph-line); border-radius: var(--radius-md); font-size: 0.82rem; color: var(--ink-secondary); box-shadow: var(--shadow-sm); }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(15,36,64,0.55); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 16px; padding-top: env(safe-area-inset-top, 16px); overscroll-behavior: contain; }
        .receipt-modal { width: 100%; max-width: 440px; background: #FFFFFF; border: 1px solid var(--graph-line-strong); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; overscroll-behavior: contain; }
        .receipt-header { padding: 14px 18px; background: var(--ink-register); color: #FDF6E3; display: flex; justify-content: space-between; align-items: center; }
        .receipt-title { font-family: var(--font-family-mono); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; }
        .receipt-no { font-family: var(--font-family-mono); font-size: 0.68rem; opacity: 0.8; }
        .receipt-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
        .r-row { display: flex; justify-content: space-between; font-size: 0.86rem; color: var(--ink-secondary); gap: 12px; }
        .r-row strong { color: var(--ink-register); text-align: right; }
        .r-row.total { padding-top: 10px; border-top: 2px dashed var(--graph-line-strong); font-weight: 800; color: var(--ink-register); font-size: 1rem; }
        .qr-box { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px; background: var(--paper-stock-2); border: 1px dashed var(--graph-line-strong); border-radius: var(--radius-md); margin-top: 6px; }
        .qr-box span { font-family: var(--font-family-mono); font-size: 0.68rem; color: var(--ink-muted); }
        .receipt-actions { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 18px; border-top: 1px solid var(--graph-line); background: var(--paper-stock-2); }
        .receipt-success { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .receipt-success h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: var(--ink-register); text-wrap: balance; }
        .receipt-success p { font-size: 0.86rem; color: var(--ink-muted); overflow-wrap: break-word; }
        .text-teal { color: var(--copper-teal); }
        @media (prefers-reduced-motion: reduce) { .hand-annotation { transform: none !important; } }
      `}</style>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="maha-landing" aria-busy="true">Loading…</div>}>
      <LandingPageInner />
    </Suspense>
  );
}
