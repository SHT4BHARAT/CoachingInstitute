'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockDoubts, DoubtTicket } from '@/lib/mockData';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  Square, 
  Image as ImageIcon, 
  UserCheck, 
  BookOpen, 
  HelpCircle, 
  Play,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AIDoubtDesk: React.FC = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  
  const [doubtsList, setDoubtsList] = useState<DoubtTicket[]>(mockDoubts);
  const [questionInput, setQuestionInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('भौतिकशास्त्र (Physics)');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [activeDoubt, setActiveDoubt] = useState<DoubtTicket>(mockDoubts[0]);
  const [escalated, setEscalated] = useState(false);

  // Audio Recording Simulator with waveform timer
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecordedAudio(true);
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 45) {
            clearInterval(timer);
            setIsRecording(false);
            setHasRecordedAudio(true);
            return 45;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Submit Doubt -> Instant AI matching
  const handleSubmitDoubt = () => {
    if (!questionInput.trim() && !hasRecordedAudio) return;

    setIsProcessingAI(true);
    setTimeout(() => {
      const newDoubt: DoubtTicket = {
        id: `DBT-${Math.floor(1000 + Math.random() * 9000)}`,
        studentNameMr: user.nameMr || user.name,
        studentPhone: user.phone,
        subject: selectedSubject,
        standard: '12th HSC + CET',
        questionMr: questionInput || 'मराठी व्हॉईस नोटद्वारे विचारलेली शंका (Audio Doubt Query)',
        status: 'AI_RESOLVED',
        hasVoiceNote: hasRecordedAudio,
        aiAnswerMr: `तुमच्या शंकेचे बालभारती पाठ्यपुस्तकानुसार विश्लेषण: ${
          selectedSubject.includes('Physics') 
            ? 'न्यूटनच्या नियमांनुसार आणि ऊर्जेच्या अक्षय्यतेच्या नियमानुसार, पदार्थाची एकूण ऊर्जा स्थिर राहते (I = \\frac{1}{2}MR^2).' 
            : 'समीकरणाच्या दोन्ही बाजूंचे संकलन (Integration) केल्यास अंतिम सिद्धता प्राप्त होते (\\int_0^{\\pi/2} f(x)dx).'
        }`,
        aiBalbharatiRef: `महाराष्ट्र राज्य पाठ्यपुस्तक (बालभारती) १२वी, प्रकरण २, पृष्ठ क्र. ४२ (Cosine Match: 96.4%)`,
        assignedTeacherMr: selectedSubject.includes('Physics') ? 'प्रा. अनंत कुलकर्णी' : 'प्रा. मंदार जोशी',
        timestamp: lang === 'en' ? 'Just now' : 'आत्ताच',
      };

      setDoubtsList([newDoubt, ...doubtsList]);
      setActiveDoubt(newDoubt);
      setQuestionInput('');
      setHasRecordedAudio(false);
      setIsProcessingAI(false);
    }, 1200);
  };

  // 1-Click Teacher Escalation
  const handleEscalateToTeacher = (doubtId: string) => {
    setEscalated(true);
    setDoubtsList((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? { ...d, status: 'ASSIGNED', assignedTeacherMr: 'प्रा. अनंत कुलकर्णी (Senior Physics Faculty)' }
          : d
      )
    );
    if (activeDoubt.id === doubtId) {
      setActiveDoubt((prev) => ({
        ...prev,
        status: 'ASSIGNED',
        assignedTeacherMr: 'प्रा. अनंत कुलकर्णी (Senior Physics Faculty)',
      }));
    }
  };

  return (
    <div className="doubt-desk-container">
      {/* Header Banner */}
      <div className="doubt-header glass-card">
        <div className="header-icon-box">
          <Bot size={28} className="text-blue-400" aria-hidden="true" />
        </div>
        <div>
          <h2>{t('doubt.title')}</h2>
          <p>{t('doubt.subtitle')}</p>
        </div>
      </div>

      <div className="doubt-grid">
        {/* Left Column: Ask a New Doubt */}
        <div className="ask-doubt-card glass-card">
          <h3>{lang === 'en' ? 'Ask a New Doubt (Marathi / Semi-EN)' : 'नवीन शंका विचारा (Ask Doubt)'}</h3>
          
          {/* Subject Selector */}
          <div className="form-group">
            <label htmlFor="doubt-subject-select" className="form-label">{lang === 'en' ? 'Select Subject:' : 'विषय निवडा:'}</label>
            <select
              id="doubt-subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="subject-select"
            >
              <option value="भौतिकशास्त्र (Physics)">भौतिकशास्त्र (Physics)</option>
              <option value="गणित (Mathematics)">गणित (Mathematics)</option>
              <option value="रसायनशास्त्र (Chemistry)">रसायनशास्त्र (Chemistry)</option>
              <option value="जीवशास्त्र (Biology)">जीवशास्त्र (Biology)</option>
            </select>
          </div>

          {/* Textarea */}
          <div className="form-group">
            <label htmlFor="doubt-question-textarea" className="form-label">{lang === 'en' ? 'Type your doubt or equation:' : 'तुमची शंका किंवा गणितीय प्रश्न लिहा:'}</label>
            <textarea
              id="doubt-question-textarea"
              rows={4}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Why does angular momentum remain constant when torque is zero in rotational dynamics?' : 'उदा. परिभ्रमण गतीमध्ये जडत्वाचे परिबल चकती व घन गोळ्यासाठी कसे बदलते?'}
              className="doubt-textarea"
              aria-label={lang === 'en' ? 'Type your doubt or equation' : 'तुमची शंका लिहा'}
            />
          </div>

          {/* Voice Note & Media Row */}
          <div className="doubt-input-tools">
            <button 
              type="button"
              onClick={toggleRecording}
              className={`tool-btn-record ${isRecording ? 'recording-active pulse-active' : ''}`}
              aria-pressed={isRecording}
              aria-label={isRecording ? `Stop recording, ${recordingSeconds} seconds recorded` : hasRecordedAudio ? 'Voice note ready, tap to re-record' : 'Start voice recording'}
            >
              {isRecording ? <Square size={16} aria-hidden="true" /> : <Mic size={16} aria-hidden="true" />}
              <span>
                {isRecording 
                  ? `${t('doubt.recording_in_progress')} (${recordingSeconds}s)`
                  : hasRecordedAudio 
                  ? t('doubt.voice_ready')
                  : t('doubt.mic_btn')
                }
              </span>
            </button>

            <button 
              type="button" 
              onClick={() => alert(lang === 'en' ? 'Attached math textbook snapshot.' : 'बालभारती पुस्तकाचा फोटो जोडला.')} 
              className="tool-btn-secondary"
            >
              <ImageIcon size={16} />
              <span>{t('doubt.img_btn')}</span>
            </button>
          </div>

          {/* Live Waveform Indicator while recording */}
          {isRecording && (
            <div className="audio-waveform-box glass-panel" role="status" aria-live="polite" aria-label={`Recording in progress ${recordingSeconds} seconds`}>
              <div className="wave-bar h-3" aria-hidden="true"></div>
              <div className="wave-bar h-6" aria-hidden="true"></div>
              <div className="wave-bar h-4" aria-hidden="true"></div>
              <div className="wave-bar h-8" aria-hidden="true"></div>
              <div className="wave-bar h-5" aria-hidden="true"></div>
              <div className="wave-bar h-7" aria-hidden="true"></div>
              <div className="wave-bar h-4" aria-hidden="true"></div>
              <span className="text-xs text-amber-400 font-bold ml-2">Marathi Voice Note Streaming (WAV)...</span>
            </div>
          )}

          {/* Quick Prompt Templates */}
          <div className="prompt-templates">
            <span className="template-label">{lang === 'en' ? 'High Yield Shortcuts:' : 'वारंवार विचारले जाणारे प्रश्न:'}</span>
            <div className="tags-row">
              <button 
                type="button"
                onClick={() => setQuestionInput('रोटेशनल मोशनमध्ये कोनीय संवेग अक्षय्यतेचा नियम काय आहे?')}
                className="prompt-tag"
              >
                कोनीय संवेग अक्षय्यता
              </button>
              <button 
                type="button"
                onClick={() => setQuestionInput('निश्चित संकलनामध्ये किंग प्रॉपर्टी वापरून गणित कसे सोडवावे?')}
                className="prompt-tag"
              >
                किंग प्रॉपर्टी संकलन
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="button"
            disabled={isProcessingAI || (!questionInput.trim() && !hasRecordedAudio)}
            onClick={handleSubmitDoubt}
            className="btn btn-primary btn-submit-doubt"
            aria-busy={isProcessingAI}
            aria-label={isProcessingAI ? 'Processing AI search' : 'Solve with Balbharati AI'}
          >
            {isProcessingAI ? (
              <>
                <Sparkles size={16} className="pulse-active" aria-hidden="true" />
                <span>{lang === 'en' ? 'RAG Searching Balbharati Database...' : 'AI पाठ्यपुस्तक शोधत आहे... (RAG Searching)'}</span>
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                <span>{lang === 'en' ? 'Solve with Balbharati AI' : 'शंका पाठवा व तत्काळ AI उत्तर मिळवा'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Resolution Card & Escalation Status */}
        <div className="doubt-response-column">
          {activeDoubt && (
            <div className="doubt-detail-card glass-card">
              <div className="card-header-clean">
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary">{activeDoubt.subject}</span>
                  <span className="badge badge-saffron">{activeDoubt.id}</span>
                </div>
                <span className="text-xs text-slate-400">{activeDoubt.timestamp}</span>
              </div>

              {/* Question Box */}
              <div className="question-box glass-panel">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
                  <HelpCircle size={14} className="text-blue-400" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Student Query:' : 'विद्यार्थ्याची शंका:'}</span>
                </div>
                <p className="question-text">{activeDoubt.questionMr}</p>
                {activeDoubt.hasVoiceNote && (
                  <div className="voice-badge-pill">
                    <Play size={12} className="text-emerald-400" />
                    <span>{lang === 'en' ? 'Audio Note Attached (32s)' : 'मराठी व्हॉईस नोट जोडलेली आहे (३२s)'}</span>
                  </div>
                )}
              </div>

              {/* Balbharati AI Solution Box */}
              {activeDoubt.aiAnswerMr && (
                <div className="ai-solution-box glass-panel">
                  <div className="ai-sol-header">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-400" />
                      <span className="font-bold text-xs text-amber-300">
                        {t('doubt.verified_by_balbharati')}
                      </span>
                    </div>
                    <span className="badge badge-success text-xs">96.4% Match</span>
                  </div>

                  <p className="ai-answer-text">{activeDoubt.aiAnswerMr}</p>

                  <div className="balbharati-ref-box">
                    <BookOpen size={14} className="text-emerald-400" />
                    <span>{activeDoubt.aiBalbharatiRef}</span>
                  </div>
                </div>
              )}

              {/* 1-Click Teacher Escalation Box */}
              <div className="teacher-escalation-card glass-panel">
                {activeDoubt.status === 'ASSIGNED' || escalated ? (
                  <div className="escalated-state">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    <div>
                      <h4 className="font-bold text-xs text-emerald-300">
                        {lang === 'en' ? 'Escalated to Teacher Whiteboard Studio' : 'शिक्षकांकडे हस्तांतरित (SLA Guaranteed)'}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {activeDoubt.assignedTeacherMr} {lang === 'en' ? 'is reviewing your query on stylus blackboard.' : 'लवकरच हस्तलिखित व्हाईटबोर्ड सोडवून पाठवतील.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <UserCheck size={18} className="text-blue-400" />
                      <div>
                        <span className="block font-bold text-xs text-slate-100">
                          {lang === 'en' ? 'Need human faculty explanation?' : 'शिक्षकांचे वैयक्तिक मार्गदर्शन हवे आहे का?'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lang === 'en' ? '1-Click Whiteboard transfer to Senior Faculty' : '१-क्लिकने शंका प्रा. अनंत कुलकर्णी यांच्याकडे पाठवा'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEscalateToTeacher(activeDoubt.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      <ArrowRight size={14} />
                      <span>{t('doubt.escalate_to_teacher')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Tickets List */}
          <div className="recent-tickets-section glass-card">
            <h4>{t('doubt.recent_tickets')}</h4>
            <div className="tickets-list" role="list">
              {doubtsList.map((d) => (
                <div 
                  key={d.id}
                  onClick={() => { setActiveDoubt(d); setEscalated(d.status === 'ASSIGNED'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveDoubt(d); setEscalated(d.status === 'ASSIGNED'); } }}
                  role="button"
                  tabIndex={0}
                  aria-current={activeDoubt.id === d.id ? 'true' : undefined}
                  aria-label={`View doubt ${d.id}: ${d.questionMr.substring(0,40)}`}
                  className={`ticket-row-item glass-panel ${activeDoubt.id === d.id ? 'active-ticket' : ''}`}
                >
                  <div className="ticket-info">
                    <span className="ticket-id">{d.id}</span>
                    <span className="ticket-title">{d.questionMr}</span>
                  </div>
                  <span className={`badge ${d.status === 'AI_RESOLVED' ? 'badge-primary' : d.status === 'RESOLVED' ? 'badge-success' : 'badge-warning'}`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .doubt-desk-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .doubt-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-left: 4px solid var(--brand-primary);
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(37, 99, 235, 0.15);
          border-radius: var(--radius-md);
        }
        .doubt-header h2 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .doubt-header p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .doubt-grid {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .doubt-grid {
            grid-template-columns: 1fr;
          }
        }
        .ask-doubt-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 17, 23, 0.85);
        }
        .ask-doubt-card h3 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .subject-select {
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 10px 12px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
        }
        .doubt-textarea {
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          line-height: 1.5;
          outline: none;
          resize: vertical;
        }
        .doubt-input-tools {
          display: flex;
          gap: 10px;
        }
        .tool-btn-record, .tool-btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease;
        }
        .tool-btn-record {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171;
        }
        .tool-btn-record.recording-active {
          background: rgba(239, 68, 68, 0.3);
          border-color: #ef4444;
          color: #ffffff;
        }
        .tool-btn-secondary {
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }
        .audio-waveform-box {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px dashed rgba(239, 68, 68, 0.3);
        }
        .wave-bar {
          width: 3px;
          background: #f87171;
          border-radius: 2px;
          animation: pulseGlow 1s infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-bar {
            animation: none;
          }
          .pulse-active {
            animation: none !important;
          }
        }
        .ticket-row-item:focus-visible {
          outline: 2px solid var(--brand-primary);
          outline-offset: 2px;
        }
        .prompt-templates {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .template-label {
          font-size: 0.72rem;
          color: var(--text-tertiary);
          font-weight: 700;
        }
        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .prompt-tag {
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .prompt-tag:hover {
          color: #ffffff;
          border-color: var(--border-medium);
        }
        .btn-submit-doubt {
          width: 100%;
          padding: 12px;
        }
        .doubt-response-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .doubt-detail-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .card-header-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .question-box {
          padding: 14px;
          border-left: 3px solid #3b82f6;
        }
        .question-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #f8fafc;
        }
        .voice-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          background: rgba(16, 185, 129, 0.12);
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          color: #34d399;
          margin-top: 8px;
        }
        .ai-solution-box {
          padding: 16px;
          border-left: 3px solid #f59e0b;
        }
        .ai-sol-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .ai-answer-text {
          font-size: 0.88rem;
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .balbharati-ref-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: #6ee7b7;
          font-weight: 600;
        }
        .teacher-escalation-card {
          padding: 14px;
        }
        .escalated-state {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .recent-tickets-section {
          padding: 20px;
        }
        .recent-tickets-section h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ticket-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          cursor: pointer;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease;
        }
        .ticket-row-item:hover, .active-ticket {
          border-color: var(--brand-primary);
          background: rgba(37, 99, 235, 0.1);
        }
        .ticket-info {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }
        .ticket-id {
          font-size: 0.72rem;
          font-weight: 700;
          color: #60a5fa;
          font-family: monospace;
        }
        .ticket-title {
          font-size: 0.8rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 320px;
        }
      `}</style>
    </div>
  );
};
