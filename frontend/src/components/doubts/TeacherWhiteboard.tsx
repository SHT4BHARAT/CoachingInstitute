'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockDoubts, DoubtTicket } from '@/lib/mockData';
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  Mic, 
  Square, 
  Send, 
  CheckCircle2, 
  Clock
} from 'lucide-react';

export const TeacherWhiteboard: React.FC = () => {
  const { t, lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [tickets, setTickets] = useState<DoubtTicket[]>(mockDoubts);
  const [selectedTicket, setSelectedTicket] = useState<DoubtTicket>(mockDoubts[0]);
  
  // Whiteboard drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  // Keyboard cursor for a11y alternative to mouse/touch
  const [kbCursor, setKbCursor] = useState({ x: 400, y: 230 });

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [solutionDispatched, setSolutionDispatched] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 460;
    ctx.fillStyle = '#0f172a'; // Blackboard background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial helpful grid / sample equation
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 60);
    ctx.lineTo(760, 60);
    ctx.stroke();

    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px Arial';
    ctx.fillText('MahaShiksha Stylus Blackboard • Live Derivation Workspace', 50, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.fillText('v = \\sqrt{5rg}  (At lowest point of Vertical Circle)', 50, 100);
    ctx.fillText('T_{bottom} - mg = \\frac{m v^2}{r}', 50, 135);
  }, []);

  // Canvas Mouse / Touch Events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = isEraser ? 20 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#0f172a' : brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Keyboard alternative: arrow keys move virtual cursor, Space draws dot
  const handleCanvasKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const step = 10;
    let { x, y } = kbCursor;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      y = Math.max(0, y - step);
      setKbCursor({ x, y });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      y = Math.min(canvas.height, y + step);
      setKbCursor({ x, y });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      x = Math.max(0, x - step);
      setKbCursor({ x, y });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      x = Math.min(canvas.width, x + step);
      setKbCursor({ x, y });
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      // draw dot at virtual cursor
      ctx.beginPath();
      ctx.arc(kbCursor.x, kbCursor.y, isEraser ? 10 : brushSize + 2, 0, Math.PI * 2);
      ctx.fillStyle = isEraser ? '#0f172a' : brushColor;
      ctx.fill();
    }
  };

  // Audio Recorder Simulation
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setAudioRecorded(true);
    } else {
      setIsRecording(true);
      setAudioSeconds(0);
      const interval = setInterval(() => {
        setAudioSeconds((s) => {
          if (s >= 60) {
            clearInterval(interval);
            setIsRecording(false);
            setAudioRecorded(true);
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    }
  };

  // Dispatch Solution
  const handleDispatchSolution = () => {
    setSolutionDispatched(true);
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: 'RESOLVED',
              assignedTeacherMr: lang === 'en' ? 'Prof. Anant Kulkarni' : 'प्रा. अनंत कुलकर्णी',
              teacherVoiceAnswerUrl: 'https://example.com/voice-note-demo.mp3',
            }
          : t
      )
    );
    setTimeout(() => {
      setSolutionDispatched(false);
    }, 3000);
  };

  return (
    <div className="teacher-workspace-container">
      {/* Top Banner */}
      <div className="workspace-header glass-card">
        <div className="header-icon-box">
          <PenTool size={26} className="text-emerald-400" />
        </div>
        <div>
          <h2>{t('teacher.whiteboard_title')}</h2>
          <p>{t('teacher.whiteboard_sub')}</p>
        </div>
      </div>

      <div className="workspace-grid">
        {/* Left: Pending Tickets Queue */}
        <div className="tickets-queue-card glass-card">
          <div className="queue-header">
            <h4>{lang === 'en' ? 'Pending Doubts Queue' : 'शंका रांग (Pending Queue)'}</h4>
            <span className="badge badge-warning">
              {tickets.length} {lang === 'en' ? 'Tickets' : 'प्रश्न'}
            </span>
          </div>

          <div className="tickets-list" role="list">
            {tickets.map((tItem) => (
              <div 
                key={tItem.id}
                onClick={() => setSelectedTicket(tItem)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTicket(tItem); } }}
                role="button"
                tabIndex={0}
                aria-current={selectedTicket.id === tItem.id ? 'true' : undefined}
                aria-label={`Select doubt ${tItem.id}: ${tItem.questionMr.substring(0,40)}`}
                className={`ticket-item ${selectedTicket.id === tItem.id ? 'active' : ''}`}
              >
                <div className="ticket-top">
                  <span className="badge badge-primary">{tItem.subject.split(' ')[0]}</span>
                  <span className="ticket-time"><Clock size={11} /> {tItem.timestamp}</span>
                </div>
                <div className="ticket-q">{tItem.questionMr}</div>
                <div className="ticket-student">
                  {lang === 'en' ? `Student: ${tItem.studentNameMr} (${tItem.standard})` : `विद्यार्थी: ${tItem.studentNameMr} (${tItem.standard})`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Whiteboard & Audio Recorder */}
        <div className="whiteboard-col">
          {selectedTicket && (
            <div className="active-ticket-banner glass-panel" role="status" aria-live="polite" aria-atomic="true">
              <div>
                <span className="text-xs text-amber-400 font-semibold">
                  {lang === 'en' ? `Selected Doubt (#${selectedTicket.id}):` : `निवडलेली शंका (#${selectedTicket.id}):`}
                </span>
                <p className="font-bold text-sm text-slate-100">{selectedTicket.questionMr}</p>
                <span className="text-xs text-slate-400">
                  {lang === 'en' ? `Student: ${selectedTicket.studentNameMr} (${selectedTicket.studentPhone})` : `विद्यार्थी: ${selectedTicket.studentNameMr} (${selectedTicket.studentPhone})`}
                </span>
              </div>
            </div>
          )}

          {/* Whiteboard Controls Toolbar */}
          <div className="whiteboard-toolbar glass-panel">
            <div className="tools-left">
              <button 
                onClick={() => setIsEraser(false)} 
                className={`tool-btn ${!isEraser ? 'active' : ''}`}
                title="Pen"
                aria-label="Pen tool"
                aria-pressed={!isEraser}
              >
                <PenTool size={16} aria-hidden="true" />
              </button>
              <button 
                onClick={() => setIsEraser(true)} 
                className={`tool-btn ${isEraser ? 'active' : ''}`}
                title="Eraser"
                aria-label="Eraser tool"
                aria-pressed={isEraser}
              >
                <Eraser size={16} aria-hidden="true" />
              </button>
              <button onClick={clearCanvas} className="tool-btn" title="Clear Canvas" aria-label="Clear whiteboard canvas">
                <RotateCcw size={16} aria-hidden="true" />
              </button>

              {/* Color Swatches */}
              <div className="color-swatches" role="group" aria-label="Brush color">
                {['#ffffff', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'].map((color) => (
                  <div
                    key={color}
                    onClick={() => { setBrushColor(color); setIsEraser(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBrushColor(color); setIsEraser(false); } }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select brush color ${color}`}
                    aria-selected={brushColor === color && !isEraser}
                    className={`color-dot ${brushColor === color && !isEraser ? 'active' : ''}`}
                    style={{ background: color }}
                  />
                ))}
              </div>

              {/* Brush Sizes */}
              <div className="brush-sizes flex gap-1 items-center ml-2" role="group" aria-label="Brush size">
                {[2, 4, 6].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setBrushSize(sz)}
                    className={`tool-btn text-xs ${brushSize === sz ? 'active' : ''}`}
                    style={{ padding: '2px 6px', height: '26px' }}
                    aria-pressed={brushSize === sz}
                    aria-label={`Brush size ${sz} pixels`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>
            </div>

            <div className="tools-right">
              {/* Voice Note Recording Button */}
              <button 
                onClick={toggleRecording}
                className={`btn-record-audio ${isRecording ? 'recording' : ''}`}
                aria-pressed={isRecording}
                aria-label={isRecording ? `Stop recording ${audioSeconds} seconds` : audioRecorded ? 'Voice note ready' : 'Add audio note'}
              >
                {isRecording ? (
                  <>
                    <Square size={14} className="text-red-500" aria-hidden="true" />
                    <span>{lang === 'en' ? `Recording (${audioSeconds}s)` : `रेकॉर्डिंग सुरू आहे (${audioSeconds}s)`}</span>
                  </>
                ) : (
                  <>
                    <Mic size={14} aria-hidden="true" />
                    <span>{audioRecorded ? (lang === 'en' ? '✓ Audio Note Ready' : '✓ व्हॉईस नोट तयार (४५s)') : (lang === 'en' ? 'Add Audio Note' : 'मराठी व्हॉईस नोट जोडा')}</span>
                  </>
                )}
              </button>

              <button 
                onClick={handleDispatchSolution}
                className="btn btn-primary btn-sm"
              >
                <Send size={14} />
                <span>{t('teacher.btn_dispatch')}</span>
              </button>
            </div>
          </div>

          {/* Canvas Element - keyboard alternative: arrow keys move virtual cursor, Space draws dot */}
          <div className="canvas-wrapper-teacher glass-card">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onKeyDown={handleCanvasKeyDown}
              className="whiteboard-canvas"
              role="img"
              aria-label="Teacher whiteboard drawing canvas. Use mouse or touch to draw; keyboard: arrow keys to move, Space to dot"
              aria-description="Use mouse or touch to draw; keyboard: arrow keys to move, Space to dot"
              tabIndex={0}
            />
            <p className="sr-only">Interactive whiteboard canvas for handwriting solutions. Drawing content is visual; a text description is provided in the selected ticket. Keyboard: arrow keys to move virtual cursor, Space to draw dot.</p>
          </div>

          {solutionDispatched && (
            <div className="dispatch-success-banner glass-panel" role="status" aria-live="polite" aria-atomic="true">
              <CheckCircle2 size={20} className="text-emerald-400" aria-hidden="true" />
              <span>
                {lang === 'en' ? 'Solution dispatched to student app successfully! (Status: RESOLVED)' : 'उत्तर विद्यार्थ्याच्या ॲपवर यशस्वीरीत्या पाठवले गेले! (Status: RESOLVED)'}
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .teacher-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .workspace-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-left: 4px solid var(--brand-emerald);
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(16, 185, 129, 0.18);
          border-radius: var(--radius-md);
        }
        .workspace-header h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .workspace-header p {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .workspace-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .workspace-grid {
            grid-template-columns: 1fr;
          }
        }
        .tickets-queue-card {
          padding: 18px;
        }
        .queue-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .queue-header h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
        }
        .tickets-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 540px;
          overflow-y: auto;
        }
        .ticket-item {
          padding: 12px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
        }
        .ticket-item:hover, .ticket-item.active {
          border-color: var(--brand-emerald);
          background: rgba(16, 185, 129, 0.12);
        }
        .ticket-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .ticket-time {
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ticket-q {
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .ticket-student {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        .whiteboard-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .active-ticket-banner {
          padding: 12px 18px;
          border-left: 4px solid var(--brand-amber);
        }
        .whiteboard-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tools-left, .tools-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tool-btn {
          padding: 6px 10px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tool-btn.active {
          background: var(--brand-emerald);
          color: #ffffff;
          border-color: var(--brand-emerald);
        }
        .color-swatches {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 0 4px;
        }
        .color-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
        }
        .color-dot.active {
          border-color: #ffffff;
          transform: scale(1.2);
        }
        .btn-record-audio {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-record-audio.recording {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }
        .canvas-wrapper-teacher {
          padding: 16px;
          display: flex;
          justify-content: center;
          background: #020617;
          overflow-x: auto;
        }
        .whiteboard-canvas {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
          border-radius: var(--radius-sm);
          cursor: crosshair;
        }
        .dispatch-success-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          font-size: 0.85rem;
          font-weight: 700;
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
        .ticket-item:focus-visible, .color-dot:focus-visible, .tool-btn:focus-visible, .whiteboard-canvas:focus-visible {
          outline: 2px solid var(--brand-emerald);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};
