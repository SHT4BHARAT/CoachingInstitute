'use client';

import React, { useState } from 'react';
import { DRMVideoPlayer } from '@/components/player/DRMVideoPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { mockLectures, Lecture } from '@/lib/mockData';
import { Video } from 'lucide-react';

export default function StudentLecturesPage() {
  const { t } = useLanguage();
  const [selectedLectureId, setSelectedLectureId] = useState<string>(mockLectures[0].id);

  const currentLecture: Lecture = 
    mockLectures.find((l) => l.id === selectedLectureId) || mockLectures[0];

  return (
    <div className="lectures-page-wrapper">
      <div className="page-title-strip glass-panel">
        <div className="title-icon">
          <Video size={22} className="text-blue-400" />
        </div>
        <div>
          <h2>{t('drm.title_strip')}</h2>
          <p className="text-xs text-slate-400">
            {t('drm.subtitle_strip')}
          </p>
        </div>
      </div>

      <DRMVideoPlayer
        lecture={currentLecture}
        onSelectLecture={(id) => setSelectedLectureId(id)}
        allLectures={mockLectures}
      />

      <style jsx>{`
        .lectures-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .page-title-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 22px;
          border-left: 4px solid var(--brand-primary);
        }
        .title-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(37, 99, 235, 0.18);
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
      `}</style>
    </div>
  );
}
