'use client';

import React, { useState } from 'react';
import { SecureNotesViewer } from '@/components/notes/SecureNotesViewer';
import { useLanguage } from '@/context/LanguageContext';
import { mockStudyMaterials, StudyMaterial } from '@/lib/mockData';
import { FileText } from 'lucide-react';

export default function StudentNotesPage() {
  const { t, lang } = useLanguage();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(mockStudyMaterials[0].id);

  const currentMaterial: StudyMaterial =
    mockStudyMaterials.find((m) => m.id === selectedMaterialId) || mockStudyMaterials[0];

  return (
    <div className="notes-page-wrapper">
      <div className="page-title-strip glass-panel">
        <div className="title-icon">
          <FileText size={22} className="text-emerald-400" aria-hidden="true" />
        </div>
        <div>
          <h2>{t('notes.title_strip')}</h2>
          <p className="text-xs text-slate-400">
            {t('notes.subtitle_strip')}
          </p>
        </div>
      </div>

      {/* Materials Selector Tabs */}
      <div className="materials-tabs-bar" role="tablist" aria-label="Study materials">
        {mockStudyMaterials.map((mat) => (
          <button
            key={mat.id}
            type="button"
            role="tab"
            aria-selected={mat.id === selectedMaterialId}
            aria-current={mat.id === selectedMaterialId ? 'true' : undefined}
            onClick={() => setSelectedMaterialId(mat.id)}
            className={`mat-tab-btn glass-card ${mat.id === selectedMaterialId ? 'active' : ''}`}
          >
            <div className="mat-tab-top">
              <span className="badge badge-primary">{mat.type}</span>
              <span className="text-xs text-slate-400">
                {mat.pages} {lang === 'en' ? 'Pages' : 'पाने'}
              </span>
            </div>
            <div className="mat-tab-title">
              {lang === 'en' ? mat.titleEn : mat.titleMr}
            </div>
            <div className="mat-tab-author text-xs text-slate-400">
              {lang === 'en' ? `Author: ${mat.author}` : `लेखक: ${mat.author}`}
            </div>
          </button>
        ))}
      </div>

      {/* Canvas Sandboxed Viewer */}
      <SecureNotesViewer material={currentMaterial} />

      <style jsx>{`
        .notes-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .page-title-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 22px;
          border-left: 4px solid var(--brand-emerald);
        }
        .title-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(16, 185, 129, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-title-strip h2 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .materials-tabs-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .mat-tab-btn {
          padding: 14px 18px;
          text-align: left;
          cursor: pointer;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-1);
          transition: border-color var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .mat-tab-btn:hover {
          border-color: var(--border-medium);
        }
        .mat-tab-btn.active {
          border-color: var(--brand-emerald);
          background: rgba(16, 185, 129, 0.08);
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
        }
        .mat-tab-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .mat-tab-title {
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
