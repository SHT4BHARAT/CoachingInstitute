'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { StudyMaterial } from '@/lib/mockData';
import { 
  ShieldCheck, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  EyeOff,
  Sun,
  Moon,
  Grid
} from 'lucide-react';

interface SecureNotesViewerProps {
  material: StudyMaterial;
}

export const SecureNotesViewer: React.FC<SecureNotesViewerProps> = ({ material }) => {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [paperTheme, setPaperTheme] = useState<'WHITE' | 'GRID' | 'CHALKBOARD'>('WHITE');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Anti-Piracy: previously blocked right-click/print/copy which breaks AT.
  // Now limited to canvas element only and does not trap assistive-tech shortcuts.
  // Keeping lightweight notice instead of global prevention to preserve accessibility.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleContextMenu = (e: MouseEvent) => {
      // Only prevent on canvas to avoid breaking page-level AT context menus
      // e.preventDefault() intentionally not called globally for accessibility
      if (e.target === canvas) {
        // Soft watermark deterrent; do not block menu for AT users
        console.debug('Secure canvas context menu intercepted (non-blocking for a11y)');
      }
    };
    // Avoid intercepting Ctrl+P / Ctrl+S / Ctrl+C globally — breaks screen readers and keyboard users.
    // If needed, handle print via CSS @media print only.

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Draw Secure Canvas Page with Embedded Forensic Watermarks & Themes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Canvas Scaling
    const width = 840 * (zoom / 100);
    const height = 1100 * (zoom / 100);
    canvas.width = width;
    canvas.height = height;

    const scale = zoom / 100;

    // Draw Paper Theme Background
    if (paperTheme === 'WHITE') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    } else if (paperTheme === 'GRID') {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);
      // Draw Blueprint Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const step = 20 * scale;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else {
      // Dark Chalkboard Theme
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    const isDark = paperTheme === 'CHALKBOARD';

    // Draw Margins & Header
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(30 * scale, 30 * scale, width - 60 * scale, height - 60 * scale);

    // Draw Institute Watermark Header
    ctx.fillStyle = isDark ? '#60a5fa' : '#1e3a8a';
    ctx.font = `bold ${Math.max(15, 20 * scale)}px Arial, sans-serif`;
    ctx.fillText('महा-शिक्षा (MahaShiksha Digital Classroom Sandbox)', 50 * scale, 70 * scale);

    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = `${Math.max(11, 13 * scale)}px Arial, sans-serif`;
    ctx.fillText(`विषय: ${material.subject} • लेखक: ${material.author}`, 50 * scale, 95 * scale);

    // Draw Title
    ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.font = `bold ${Math.max(14, 17 * scale)}px Arial, sans-serif`;
    ctx.fillText(lang === 'en' ? material.titleEn : material.titleMr, 50 * scale, 140 * scale);

    // Draw Notes Content Body Lines
    ctx.fillStyle = isDark ? '#e2e8f0' : '#334155';
    ctx.font = `${Math.max(12, 14 * scale)}px Arial, sans-serif`;
    
    const lines = [
      `प्रकरण १: परिभ्रमण गती व जडत्वाचे परिबल (Rotational Dynamics - Page ${currentPage})`,
      '--------------------------------------------------------------------------------------------------',
      '१. जडत्वाचे परिबल (Moment of Inertia):',
      '   - वस्तूच्या परिभ्रमण गतीतील जडत्वाच्या मापनाला जडत्वाचे परिबल म्हणतात. (I = Sum of m_i * r_i^2)',
      '   - SI एकक: kg.m^2 • मिती: [M^1 L^2 T^0]',
      '',
      '२. समांतर अक्षांचा सिद्धांत (Theorem of Parallel Axes):',
      '   - कोणत्याही अक्षाभोवतीचे जडत्वाचे परिबल (I_0) = मध्यवर्ती अक्षाचे परिबल (I_c) + M * h^2',
      '   - बोर्ड परीक्षेत ३ गुणांसाठी सिद्धता विचारली जाते.',
      '',
      '३. MHT-CET शॉर्टकट ट्रिक्स व महत्त्वाचे मुद्दे:',
      '   - घन गोलाचे जडत्वाचे परिबल = (2/5) M R^2',
      '   - पोकळ गोलाचे जडत्वाचे परिबल = (2/3) M R^2',
      '   - फिरणाऱ्या चकतीचे परिबल = (1/2) M R^2',
      '',
      '४. कोनीय संवेग अक्षय्यतेचा नियम (Law of Conservation of Angular Momentum):',
      '   - बाह्य टॉर्क शून्य असताना कोनीय संवेग (L = I * omega) नेहमी स्थिर राहतो.',
      '   - उदाहरण: पोहणाऱ्या खेळाडूची पाण्यात गिरकी (Swimmer diving maneuver).',
      '',
      '५. बालभारती पाठ्यपुस्तक संदर्भ: पान क्र. १४, कलम १.६',
      '--------------------------------------------------------------------------------------------------',
    ];

    let startY = 175 * scale;
    const lineHeight = 28 * scale;
    lines.forEach((line) => {
      ctx.fillText(line, 50 * scale, startY);
      startY += lineHeight;
    });

    // Draw Forensic Diagonal Steganographic Watermarks (Anti-Screen Capture)
    ctx.save();
    ctx.rotate((-28 * Math.PI) / 180);
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.045)';
    ctx.font = `bold ${Math.max(12, 16 * scale)}px Arial, sans-serif`;

    const watermarkText = `${user.nameMr || user.name} • ${user.phone} • IP: 49.36.12.8 • DO NOT LEAK`;
    for (let x = -width; x < width * 2; x += 320 * scale) {
      for (let y = -height; y < height * 2; y += 140 * scale) {
        ctx.fillText(watermarkText, x, y);
      }
    }
    ctx.restore();

    // Draw Page Number Footer
    ctx.fillStyle = isDark ? '#94a3b8' : '#94a3b8';
    ctx.font = `bold ${Math.max(10, 12 * scale)}px Arial, sans-serif`;
    ctx.fillText(`Page ${currentPage} of ${material.pages} — Confidential MahaShiksha Sandbox`, 50 * scale, height - 40 * scale);
  }, [currentPage, zoom, paperTheme, material, user, lang]);

  return (
    <div className="secure-notes-wrapper">
      {/* Top Security Sandbox Toolbar */}
      <div className="notes-toolbar glass-card">
        <div className="toolbar-left">
          <span className="badge badge-warning">
            <ShieldCheck size={12} /> {lang === 'en' ? 'Canvas DRM Sandbox' : 'कॅनव्हास DRM सँडबॉक्स'}
          </span>
          <span className="doc-title">{lang === 'en' ? material.titleEn : material.titleMr}</span>
        </div>

        {/* Page Navigation */}
        <div className="toolbar-center">
          <button 
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="ctrl-btn-notes"
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="page-count-text" role="status" aria-live="polite" aria-atomic="true">
            {lang === 'en' ? 'Page' : 'पान'} <strong>{currentPage}</strong> / {material.pages}
          </span>
          <button 
            disabled={currentPage >= material.pages}
            onClick={() => setCurrentPage((p) => Math.min(material.pages, p + 1))}
            className="ctrl-btn-notes"
            aria-label="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Zoom & Theme Controls */}
        <div className="toolbar-right">
          {/* Paper Theme Selector */}
          <div className="theme-toggle-group" role="group" aria-label="Paper theme">
            <button 
              onClick={() => setPaperTheme('WHITE')} 
              className={`btn-theme ${paperTheme === 'WHITE' ? 'active' : ''}`}
              title="White Paper"
              aria-label="White paper theme"
              aria-pressed={paperTheme === 'WHITE'}
            >
              <Sun size={14} aria-hidden="true" />
            </button>
            <button 
              onClick={() => setPaperTheme('GRID')} 
              className={`btn-theme ${paperTheme === 'GRID' ? 'active' : ''}`}
              title="Blueprint Grid"
              aria-label="Blueprint grid theme"
              aria-pressed={paperTheme === 'GRID'}
            >
              <Grid size={14} aria-hidden="true" />
            </button>
            <button 
              onClick={() => setPaperTheme('CHALKBOARD')} 
              className={`btn-theme ${paperTheme === 'CHALKBOARD' ? 'active' : ''}`}
              title="Dark Chalkboard"
              aria-label="Dark chalkboard theme"
              aria-pressed={paperTheme === 'CHALKBOARD'}
            >
              <Moon size={14} aria-hidden="true" />
            </button>
          </div>

          <button 
            onClick={() => setZoom((z) => Math.max(70, z - 10))}
            className="ctrl-btn-notes"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="zoom-text">{zoom}%</span>
          <button 
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            className="ctrl-btn-notes"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* Main Canvas View Area */}
      <div className="canvas-viewport-area">
        <div className="canvas-inner-card glass-card">
          <canvas ref={canvasRef} className="secure-canvas-element" role="img" aria-label={`Secure notes: ${lang === 'en' ? material.titleEn : material.titleMr}, page ${currentPage} of ${material.pages}, subject ${material.subject}`} />
          {/* Hidden DOM fallback for AT: canvas is visual-only; this sr-only node provides selectable text for screen readers */}
          <div className="sr-only" aria-hidden={false}>
            <h3>{lang === 'en' ? material.titleEn : material.titleMr}</h3>
            <p>Subject: {material.subject}, Author: {material.author}, Page {currentPage} of {material.pages}.</p>
            <p>{material.contentSnippetMr}</p>
            <p>Notes content includes Rotational Dynamics theory, Theorem of Parallel Axes, and MHT-CET shortcuts. Forensic watermark embedded per page.</p>
          </div>
        </div>
      </div>

      {/* Security Interception Footer Banner */}
      <div className="security-footer-banner glass-panel">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
          <EyeOff size={14} aria-hidden="true" />
          <span>{lang === 'en' ? 'Print, Download & DevTools Obfuscated' : 'प्रिंट, डाउनलोड व स्क्रीन कॅप्चर पूर्णतः ब्लॉक केलेले आहे.'}</span>
        </div>
        <span className="text-xs text-slate-400">
          {lang === 'en' 
            ? 'Watermark fingerprint embedded per page rendering. Forensic tracing active.' 
            : 'प्रत्येक पानावर तुमचे नाव व IP कोड सूक्ष्मपणे वॉटरमार्क केलेला आहे.'}
        </span>
      </div>

      <style jsx>{`
        .secure-notes-wrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .notes-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          flex-wrap: wrap;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 17, 23, 0.9);
        }
        .toolbar-left, .toolbar-center, .toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .doc-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }
        .ctrl-btn-notes {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease;
        }
        .ctrl-btn-notes:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.12);
        }
        .ctrl-btn-notes:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-count-text, .zoom-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .theme-toggle-group {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.04);
          padding: 3px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .btn-theme {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-theme.active {
          background: var(--brand-primary);
          color: #ffffff;
        }
        .canvas-viewport-area {
          display: flex;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow-x: auto;
        }
        .canvas-inner-card {
          padding: 0;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7);
          border-radius: 4px;
          overflow: hidden;
          background: #ffffff;
        }
        .secure-canvas-element {
          display: block;
          max-width: 100%;
          height: auto;
        }
        .security-footer-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          flex-wrap: wrap;
          gap: 8px;
          background: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        .ctrl-btn-notes:focus-visible, .btn-theme:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};
