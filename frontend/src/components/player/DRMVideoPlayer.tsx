'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockLectures, Lecture } from '@/lib/mockData';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ShieldCheck, 
  Wifi, 
  Lock, 
  Clock, 
  Sparkles, 
  FileText, 
  AlertTriangle, 
  Zap, 
  Sliders, 
  Bookmark 
} from 'lucide-react';

export interface DRMVideoPlayerProps {
  lecture?: Lecture;
  initialLecture?: Lecture;
  onSelectLecture?: (id: string) => void;
  allLectures?: Lecture[];
}

export const DRMVideoPlayer: React.FC<DRMVideoPlayerProps> = ({ 
  lecture, 
  initialLecture, 
  onSelectLecture, 
  allLectures = mockLectures 
}) => {
  const { user, isEnrolled, isKonkanMode, toggleKonkanMode } = useAuth();
  const { t, lang } = useLanguage();
  
  const [selectedLecture, setSelectedLecture] = useState<Lecture>(
    lecture || initialLecture || allLectures[0] || mockLectures[0]
  );

  useEffect(() => {
    if (lecture) {
      setSelectedLecture(lecture);
    }
  }, [lecture]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(selectedLecture.durationMinutes * 60 || 3600);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [audioBoost, setAudioBoost] = useState(100);
  const [activeTab, setActiveTab] = useState<'CHAPTERS' | 'PLAYLIST' | 'TRANSCRIPT'>('CHAPTERS');
  const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([120, 780]);
  const [showWatermarkTest] = useState(true);

  // Dynamic moving watermark position states
  const [watermarkPos, setWatermarkPos] = useState({ top: '25%', left: '30%' });
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const hasAccess = selectedLecture.isFreeDemo || isEnrolled(selectedLecture.batchId);

  // Move watermark every 4 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const top = Math.floor(15 + Math.random() * 65) + '%';
      const left = Math.floor(10 + Math.random() * 60) + '%';
      setWatermarkPos({ top, left });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulated timer progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const jumpToChapter = (timeSec: number) => {
    setCurrentTime(timeSec);
    setIsPlaying(true);
  };

  const toggleBookmark = () => {
    if (bookmarkedTimes.includes(currentTime)) {
      setBookmarkedTimes(bookmarkedTimes.filter((t) => t !== currentTime));
    } else {
      setBookmarkedTimes([...bookmarkedTimes, currentTime]);
    }
  };

  const handleLecturePick = (lec: Lecture) => {
    setSelectedLecture(lec);
    if (onSelectLecture) {
      onSelectLecture(lec.id);
    }
  };

  return (
    <div className="drm-player-container">
      {/* Left Column: Video Viewport & Controls */}
      <div className="player-main-col">
        <div className="video-viewport glass-card" ref={videoContainerRef}>
          {hasAccess ? (
            <div className="relative w-full h-full">
              {/* Simulated High-Res / 240p Canvas Canvas Video Element */}
              <div className={`video-simulated-canvas ${isKonkanMode ? 'konkan-stream' : ''}`}>
                <div className="lecture-chalkboard-visual">
                  <div className="math-derivation-box">
                    <span className="subject-tag">{selectedLecture.subject} • {selectedLecture.chapter}</span>
                    <h3>{lang === 'en' ? selectedLecture.titleEn : selectedLecture.titleMr}</h3>
                    <div className="chalkboard-equations">
                      <code>{'I = Sum(m_i * r_i^2)  ==>  I_disc = (1/2) * M * R^2'}</code>
                      <code>{'Parallel Axis Theorem: I_0 = I_c + M * h^2'}</code>
                    </div>
                    <span className="faculty-badge-overlay">
                      {selectedLecture.teacherNameMr}
                    </span>
                  </div>
                </div>

                {/* 240p Konkan Mode Live Indicator */}
                {isKonkanMode && (
                  <div className="konkan-mode-badge pulse-active" role="status" aria-live="polite">
                    <Wifi size={14} aria-hidden="true" />
                    <span>{lang === 'en' ? '240p Konkan Low-Data Mode (280 kbps)' : '२४०p कोकण लो-बँडविड्थ मोड (२८० kbps)'}</span>
                  </div>
                )}

                {/* Dynamic Forensic Watermark Overlay (Anti-Screen Capture Leak Defense) */}
                {showWatermarkTest && (
                  <div 
                    className="dynamic-watermark"
                    style={{ top: watermarkPos.top, left: watermarkPos.left }}
                  >
                    <div className="watermark-pill">
                      <span>{user.nameMr || user.name}</span>
                      <span className="watermark-sep">•</span>
                      <span>{user.phone}</span>
                      <span className="watermark-sep">•</span>
                      <span>IP: 49.36.12.8</span>
                      <span className="watermark-sep">•</span>
                      <span>{formatTime(currentTime)}</span>
                    </div>
                  </div>
                )}

                {/* Video Controls Overlay */}
                <div className="custom-controls-overlay">
                  {/* Timeline Scrubber */}
                  <div className="scrubber-wrapper">
                    <input 
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="timeline-slider"
                      aria-label="Seek timeline"
                      aria-valuemin={0}
                      aria-valuemax={duration}
                      aria-valuenow={Math.round(currentTime)}
                      aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    />
                    {/* Chapter Tick Marks */}
                    {selectedLecture.chapters.map((ch, idx) => {
                      const posPercent = (ch.time / duration) * 100;
                      return (
                        <div 
                          key={idx} 
                          className="chapter-tick" 
                          style={{ left: `${posPercent}%` }}
                          title={`${ch.title} (${formatTime(ch.time)})`}
                        />
                      );
                    })}
                  </div>

                  <div className="controls-row">
                    <div className="controls-left">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="ctrl-btn"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
                      </button>

                      <button 
                        onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                        className="ctrl-btn"
                        title="Rewind 10s"
                        aria-label="Rewind 10 seconds"
                      >
                        <RotateCcw size={16} aria-hidden="true" />
                      </button>

                      <div className="volume-control-group">
                        <button 
                          onClick={() => setIsMuted(!isMuted)}
                          className="ctrl-btn"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                          aria-pressed={isMuted}
                        >
                          {isMuted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                        </button>
                        <input 
                          type="range" 
                          min={0} 
                          max={1} 
                          step={0.05} 
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            setVolume(Number(e.target.value));
                            setIsMuted(false);
                          }}
                          className="volume-slider"
                          aria-label="Volume"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
                          aria-valuetext={`${Math.round((isMuted ? 0 : volume) * 100)} percent volume`}
                        />
                      </div>

                      <span className="time-display">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>

                      <button 
                        onClick={toggleBookmark}
                        className={`ctrl-btn ${bookmarkedTimes.includes(currentTime) ? 'text-amber-400' : ''}`}
                        title="Bookmark Current Timestamp"
                        aria-label="Bookmark current timestamp"
                        aria-pressed={bookmarkedTimes.includes(currentTime)}
                      >
                        <Bookmark size={16} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="controls-right">
                      {/* Audio Booster Slider */}
                      <div className="audio-boost-pill" title="Audio Booster for budget phones & rural environments">
                        <Sliders size={12} className="text-amber-400" aria-hidden="true" />
                        <span className="text-xs">{audioBoost}% Vol</span>
                        <input 
                          type="range" 
                          min={100} 
                          max={250} 
                          step={25} 
                          value={audioBoost} 
                          onChange={(e) => setAudioBoost(Number(e.target.value))}
                          className="boost-slider"
                          aria-label="Audio boost"
                          aria-valuemin={100}
                          aria-valuemax={250}
                          aria-valuenow={audioBoost}
                          aria-valuetext={`${audioBoost} percent audio boost`}
                        />
                      </div>

                      {/* Speed Selector */}
                      <select 
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="ctrl-select"
                        aria-label="Playback Speed"
                      >
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1.0x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2.0x</option>
                      </select>

                      {/* 240p Konkan Toggle */}
                      <button 
                        onClick={toggleKonkanMode}
                        className={`ctrl-btn-mode ${isKonkanMode ? 'active-konkan' : ''}`}
                        title="240p Konkan Rural Stream Toggle"
                        aria-label="Toggle 240p Konkan low-data mode"
                        aria-pressed={isKonkanMode}
                      >
                        <Wifi size={14} aria-hidden="true" />
                        <span>{isKonkanMode ? '240p' : 'HD 1080p'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="paywall-lock-screen">
              <div className="lock-icon-circle">
                <Lock size={32} className="text-amber-400" />
              </div>
              <h3>{t('player.paywall_title')}</h3>
              <p>{t('player.paywall_desc')}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedLecture(mockLectures[0])}
                  className="btn btn-secondary btn-sm"
                >
                  {lang === 'en' ? 'Watch Free Demo Lecture' : 'मोफत २ डेमो लेक्चर्स पहा'}
                </button>
                <button 
                  onClick={() => alert(lang === 'en' ? 'Redirecting to Razorpay checkout...' : 'पेमेंट गेटवेकडे पाठवत आहे...')}
                  className="btn btn-accent btn-sm"
                >
                  <Zap size={14} />
                  <span>{t('player.enroll_now')}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lecture Metadata Card */}
        <div className="lecture-meta-card glass-card">
          <div className="meta-badges">
            <span className="badge badge-primary">{selectedLecture.subject}</span>
            <span className="badge badge-saffron">{selectedLecture.chapter}</span>
            {selectedLecture.isFreeDemo && (
              <span className="badge badge-success">
                {lang === 'en' ? '✓ Free Demo Lecture' : '✓ मोफत डेमो लेक्चर'}
              </span>
            )}
            <span className="badge badge-warning">
              <ShieldCheck size={12} /> {lang === 'en' ? 'AES-128 DRM Encrypted' : 'AES-128 DRM सुरक्षित'}
            </span>
          </div>

          <h2 className="lecture-title-main">
            {lang === 'en' ? selectedLecture.titleEn : selectedLecture.titleMr}
          </h2>

          <div className="lecture-teacher-row">
            <div className="teacher-avatar-xs">
              {selectedLecture.teacherNameMr.charAt(0)}
            </div>
            <span>{selectedLecture.teacherNameMr}</span>
            <span className="text-slate-500">•</span>
            <span>{selectedLecture.durationMinutes} mins</span>
            <span className="text-slate-500">•</span>
            <span>{selectedLecture.notesPagesCount} pages notes</span>
          </div>

          <div className="anti-piracy-notice glass-panel">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <AlertTriangle size={14} aria-hidden="true" />
              <span>{t('player.watermark_notice')}</span>
            </div>
            <span className="text-xs text-slate-400 mt-1 block">
              {lang === 'en'
                ? 'Your student fingerprint & IP are cryptographically embedded. Screen captures are traceable.'
                : 'तुमचा नाव, फोन व IP कोड स्क्रीनवर सतत फिरत आहे. अनधिकृत रेकॉर्डिंग केल्यास खाते कायमचे बंद होईल.'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Chapters, Playlist & Transcript */}
      <div className="player-sidebar-col">
        <div className="sidebar-tabs-header glass-card">
          <button 
            onClick={() => setActiveTab('CHAPTERS')}
            className={`tab-btn ${activeTab === 'CHAPTERS' ? 'active' : ''}`}
          >
            <Clock size={14} />
            <span>{t('player.chapters')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('PLAYLIST')}
            className={`tab-btn ${activeTab === 'PLAYLIST' ? 'active' : ''}`}
          >
            <Sparkles size={14} />
            <span>{t('player.playlist')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('TRANSCRIPT')}
            className={`tab-btn ${activeTab === 'TRANSCRIPT' ? 'active' : ''}`}
          >
            <FileText size={14} />
            <span>{lang === 'en' ? 'Notes Sync' : 'नोट्स सिंक'}</span>
          </button>
        </div>

        {activeTab === 'CHAPTERS' && (
          <div className="chapters-list-card glass-card" role="list">
            {selectedLecture.chapters.map((ch, index) => {
              const isActive = currentTime >= ch.time && (index === selectedLecture.chapters.length - 1 || currentTime < selectedLecture.chapters[index + 1].time);
              return (
              <div 
                key={index}
                onClick={() => jumpToChapter(ch.time)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jumpToChapter(ch.time); } }}
                role="button"
                tabIndex={0}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Jump to chapter ${ch.title} at ${formatTime(ch.time)}`}
                className={`chapter-item glass-panel ${isActive ? 'active-chapter' : ''}`}
              >
                <span className="chapter-time-badge">{formatTime(ch.time)}</span>
                <div className="chapter-info">
                  <span className="chapter-title-text">
                    {ch.title}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        )}

        {activeTab === 'PLAYLIST' && (
          <div className="all-lectures-playlist glass-card" role="list">
            {allLectures.map((lec) => {
              const isSelected = lec.id === selectedLecture.id;
              const canWatch = lec.isFreeDemo || isEnrolled(lec.batchId);
              return (
                <div 
                  key={lec.id}
                  onClick={() => handleLecturePick(lec)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLecturePick(lec); } }}
                  role="button"
                  tabIndex={0}
                  aria-current={isSelected ? 'true' : undefined}
                  aria-label={`Play lecture ${lang === 'en' ? lec.titleEn : lec.titleMr}`}
                  className={`playlist-item glass-panel ${isSelected ? 'active-lec' : ''}`}
                >
                    <div className="playlist-icon-col" aria-hidden="true">
                      {canWatch ? (
                        <Play size={16} className={isSelected ? 'text-blue-400' : 'text-slate-400'} aria-hidden="true" />
                      ) : (
                        <Lock size={16} className="text-amber-400" aria-hidden="true" />
                      )}
                    </div>
                  <div className="playlist-details">
                    <span className="playlist-title">
                      {lang === 'en' ? lec.titleEn : lec.titleMr}
                    </span>
                    <div className="playlist-sub">
                      <span>{lec.subject}</span>
                      <span>•</span>
                      <span>{lec.durationMinutes} mins</span>
                      {lec.isFreeDemo && (
                        <span className="badge badge-success text-xs py-0 px-1">Free Demo</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'TRANSCRIPT' && (
          <div className="transcript-card glass-card">
            <div className="transcript-header">
              <span className="font-bold text-xs text-slate-200">
                {lang === 'en' ? 'Synchronized Lecture Highlights' : 'लेक्चर सारांश व सूत्र नोंदी'}
              </span>
              <span className="badge badge-primary text-xs">Balbharati Ch. 1</span>
            </div>
            <div className="transcript-body text-xs text-slate-300 space-y-2">
              <p><strong>०२:००</strong> - जडत्वाचे परिबल (Moment of Inertia) व्याख्या व SI एकक (kg.m²).</p>
              <p><strong>१३:००</strong> - समांतर अक्षांचा सिद्धांत (Theorem of Parallel Axes): I_0 = I_c + Mh².</p>
              <p><strong>२५:००</strong> - MHT-CET शॉर्टकट: घन गोल व पोकळ गोलाच्या परिबलांची तुलना.</p>
              <p><strong>४५:००</strong> - कोनीय संवेग अक्षय्यतेचे नियम व प्रत्यक्ष सोडवलेली उदाहरणे.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .drm-player-container {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .drm-player-container {
            grid-template-columns: 1fr;
          }
        }
        .player-main-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .video-viewport {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000000;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .video-simulated-canvas {
          width: 100%;
          height: 100%;
          position: relative;
          background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .konkan-stream {
          filter: contrast(1.05);
        }
        .lecture-chalkboard-visual {
          text-align: center;
          padding: 24px;
        }
        .math-derivation-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .subject-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #60a5fa;
          text-transform: uppercase;
        }
        .math-derivation-box h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }
        .chalkboard-equations {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 6px 0;
        }
        .chalkboard-equations code {
          background: rgba(0, 0, 0, 0.45);
          color: #fde047;
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-family: monospace;
        }
        .faculty-badge-overlay {
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .dynamic-watermark {
          position: absolute;
          pointer-events: none;
          z-index: 40;
          transition: top 1.2s cubic-bezier(0.16, 1, 0.3, 1), left 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .watermark-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          border: 1px dashed rgba(255, 255, 255, 0.25);
          border-radius: var(--radius-full);
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.5px;
        }
        .watermark-sep {
          opacity: 0.4;
        }
        .konkan-mode-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(16, 185, 129, 0.85);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          z-index: 30;
        }
        .custom-controls-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          padding: 20px 16px 12px;
          z-index: 30;
        }
        .scrubber-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: 10px;
        }
        .timeline-slider {
          width: 100%;
          height: 5px;
          accent-color: var(--brand-primary);
          cursor: pointer;
        }
        .chapter-tick {
          position: absolute;
          top: -2px;
          width: 3px;
          height: 9px;
          background: #f59e0b;
          border-radius: 1px;
          pointer-events: none;
        }
        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .controls-left, .controls-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ctrl-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: transform var(--transition-fast), color var(--transition-fast), opacity var(--transition-fast);
        }
        .ctrl-btn:hover {
          transform: scale(1.12);
          color: var(--brand-primary);
        }
        .ctrl-btn:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .chapter-item:focus-visible, .playlist-item:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .dynamic-watermark {
            transition: none;
          }
          .pulse-active {
            animation: none !important;
          }
        }
        .volume-control-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .volume-slider {
          width: 60px;
          height: 4px;
          accent-color: var(--brand-primary);
          cursor: pointer;
        }
        .time-display {
          font-size: 0.75rem;
          color: #cbd5e1;
          font-family: monospace;
        }
        .audio-boost-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .boost-slider {
          width: 50px;
          height: 3px;
          accent-color: #f59e0b;
          cursor: pointer;
        }
        .ctrl-select {
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          border: 1px solid var(--border-medium);
          padding: 3px 6px;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .ctrl-btn-mode {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          cursor: pointer;
        }
        .ctrl-btn-mode.active-konkan {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
          color: #34d399;
        }
        .paywall-lock-screen {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px;
          background: radial-gradient(circle, #1e293b, #090d16);
        }
        .lock-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .paywall-lock-screen h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 6px;
        }
        .paywall-lock-screen p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 440px;
          margin-bottom: 18px;
        }
        .lecture-meta-card {
          padding: 22px;
        }
        .meta-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .lecture-title-main {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .lecture-teacher-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .teacher-avatar-xs {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .anti-piracy-notice {
          padding: 10px 14px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
        }
        .player-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sidebar-tabs-header {
          display: flex;
          padding: 4px;
          gap: 4px;
        }
        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .tab-btn.active {
          background: var(--bg-surface-2);
          color: #ffffff;
          box-shadow: var(--shadow-sm);
        }
        .chapters-list-card, .all-lectures-playlist, .transcript-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          max-height: 520px;
          overflow-y: auto;
        }
        .chapter-item, .playlist-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
        }
        .chapter-item:hover, .playlist-item:hover {
          border-color: var(--brand-primary);
          background: rgba(37, 99, 235, 0.08);
        }
        .active-chapter, .active-lec {
          border-color: var(--brand-primary);
          background: rgba(37, 99, 235, 0.15);
        }
        .chapter-time-badge {
          padding: 3px 8px;
          background: var(--bg-surface-3);
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 700;
          color: #60a5fa;
          font-family: monospace;
        }
        .chapter-title-text {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .playlist-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .playlist-sub {
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .transcript-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
};
