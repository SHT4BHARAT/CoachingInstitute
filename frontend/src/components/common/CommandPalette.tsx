'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Award, 
  UploadCloud, 
  PenTool, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Globe, 
  Wifi, 
  CornerDownLeft,
  X
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  titleMr: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'SETTINGS';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const { switchRole, isKonkanMode, toggleKonkanMode } = useAuth();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(0);
  }, []);

  const commands: CommandItem[] = [
    // Navigation - Student
    {
      id: 'nav-student-dash',
      title: 'Student Dashboard',
      titleMr: 'विद्यार्थी डॅशबोर्ड (Student Dashboard)',
      category: 'NAVIGATION',
      icon: <BookOpen size={16} className="text-blue-400" aria-hidden="true" />,
      action: () => { switchRole('STUDENT'); router.push('/student'); closePalette(); },
      shortcut: 'G S',
    },
    {
      id: 'nav-lectures',
      title: 'DRM Video Lectures & 240p Mode',
      titleMr: 'DRM व्हिडिओ लेक्चर्स व २४०p मोड',
      category: 'NAVIGATION',
      icon: <Sparkles size={16} className="text-amber-400" aria-hidden="true" />,
      action: () => { switchRole('STUDENT'); router.push('/student/lectures'); closePalette(); },
      shortcut: 'G L',
    },
    {
      id: 'nav-notes',
      title: 'Canvas-Protected Study Notes & Formulas',
      titleMr: 'कॅनव्हास-संरक्षित नोट्स व सूत्रे',
      category: 'NAVIGATION',
      icon: <FileText size={16} className="text-emerald-400" aria-hidden="true" />,
      action: () => { switchRole('STUDENT'); router.push('/student/notes'); closePalette(); },
      shortcut: 'G N',
    },
    {
      id: 'nav-doubts',
      title: 'Balbharati AI Doubt Desk',
      titleMr: 'बालभारती AI शंका निवारण डेस्क',
      category: 'NAVIGATION',
      icon: <HelpCircle size={16} className="text-purple-400" aria-hidden="true" />,
      action: () => { switchRole('STUDENT'); router.push('/student/doubts'); closePalette(); },
      shortcut: 'G D',
    },
    {
      id: 'nav-exams',
      title: 'MHT-CET CBT Mock Exam Simulator',
      titleMr: 'MHT-CET ऑनलाइन CBT परीक्षा',
      category: 'NAVIGATION',
      icon: <Award size={16} className="text-rose-400" aria-hidden="true" />,
      action: () => { switchRole('STUDENT'); router.push('/student/exams'); closePalette(); },
      shortcut: 'G E',
    },

    // Navigation - Teacher
    {
      id: 'nav-teacher-studio',
      title: 'Teacher Stylus Whiteboard Studio',
      titleMr: 'शिक्षक व्हाईटबोर्ड स्टुडिओ',
      category: 'NAVIGATION',
      icon: <PenTool size={16} className="text-indigo-400" aria-hidden="true" />,
      action: () => { switchRole('TEACHER'); router.push('/teacher/doubts'); closePalette(); },
      shortcut: 'G T',
    },
    {
      id: 'nav-teacher-upload',
      title: 'HLS Lecture & DPP Upload Pipeline',
      titleMr: 'व्हिडिओ लेक्चर्स व DPP अपलोड',
      category: 'NAVIGATION',
      icon: <UploadCloud size={16} className="text-cyan-400" aria-hidden="true" />,
      action: () => { switchRole('TEACHER'); router.push('/teacher/upload'); closePalette(); },
    },

    // Navigation - Admin
    {
      id: 'nav-admin-telemetry',
      title: 'Live Telemetry & Maharashtra District Radar',
      titleMr: 'थेट टेलीमेट्री व जिल्हा विश्लेषण',
      category: 'NAVIGATION',
      icon: <Activity size={16} className="text-teal-400" aria-hidden="true" />,
      action: () => { switchRole('ADMIN'); router.push('/admin'); closePalette(); },
      shortcut: 'G A',
    },
    {
      id: 'nav-admin-antipiracy',
      title: 'Anti-Piracy & Forensic Watermark Decoder',
      titleMr: 'अँटी-पायरसी व वॉटरमार्क डिकोडर',
      category: 'NAVIGATION',
      icon: <ShieldCheck size={16} className="text-red-400" aria-hidden="true" />,
      action: () => { switchRole('ADMIN'); router.push('/admin/anti-piracy'); closePalette(); },
    },
    {
      id: 'nav-admin-batches',
      title: 'Course Batches & GST Invoices (SAC 999293)',
      titleMr: 'बॅच व्यवस्थापन व GST इनव्हॉइस',
      category: 'NAVIGATION',
      icon: <Layers size={16} className="text-amber-400" aria-hidden="true" />,
      action: () => { switchRole('ADMIN'); router.push('/admin/batches'); closePalette(); },
    },

    // Actions & Settings
    {
      id: 'action-toggle-konkan',
      title: isKonkanMode ? 'Disable 240p Konkan Mode' : 'Enable 240p Konkan Low-Bandwidth Mode',
      titleMr: isKonkanMode ? '२४०p कोकण मोड बंद करा' : '२४०p कोकण ग्रामीण मोड सुरू करा',
      category: 'ACTIONS',
      icon: <Wifi size={16} className="text-emerald-400" aria-hidden="true" />,
      action: () => { toggleKonkanMode(); closePalette(); },
      shortcut: 'Alt+K',
    },
    {
      id: 'setting-lang-mr',
      title: 'Switch Language to मराठी (Pure)',
      titleMr: 'भाषा बदला: मराठी (Pure)',
      category: 'SETTINGS',
      icon: <Globe size={16} className="text-orange-400" aria-hidden="true" />,
      action: () => { setLang('mr'); closePalette(); },
    },
    {
      id: 'setting-lang-semi',
      title: 'Switch Language to द्विभाषिक (Semi-EN)',
      titleMr: 'भाषा बदला: द्विभाषिक (Semi-EN)',
      category: 'SETTINGS',
      icon: <Globe size={16} className="text-blue-400" aria-hidden="true" />,
      action: () => { setLang('mr-en'); closePalette(); },
    },
    {
      id: 'setting-lang-en',
      title: 'Switch Language to English',
      titleMr: 'भाषा बदला: English',
      category: 'SETTINGS',
      icon: <Globe size={16} className="text-slate-300" aria-hidden="true" />,
      action: () => { setLang('en'); closePalette(); },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.titleMr.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (index: number) => {
    const target = filteredCommands[index];
    if (target) {
      target.action();
    }
  };

  const handleKeyDownPalette = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" role="presentation" onClick={closePalette} style={{ overscrollBehavior: 'contain' }}>
      <div 
        className="palette-modal glass-card"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownPalette}
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Search Header */}
        <div className="palette-search-bar">
          <Search size={18} className="text-slate-400" aria-hidden="true" />
          <label htmlFor="command-palette-input" className="sr-only">Search commands</label>
          <input
            id="command-palette-input"
            autoFocus
            type="text"
            name="commandSearch"
            autoComplete="off"
            aria-label="Search commands"
            placeholder={
              lang === 'en'
                ? 'Type a command, page, or search feature… (e.g. Lectures, CET, Doubt, Konkan)'
                : 'कमांड किंवा विषय शोधा… (उदा. लेक्चर्स, CET, शंका, कोकण मोड)'
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="palette-input"
          />
          <button type="button" onClick={closePalette} className="palette-close-btn" aria-label="Close command palette">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Command Items List */}
        <div className="palette-list" role="listbox" aria-label="Commands">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                type="button"
                role="option"
                aria-selected={selectedIndex === idx}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                onFocus={() => setSelectedIndex(idx)}
                className={`palette-item ${selectedIndex === idx ? 'selected' : ''}`}
              >
                <div className="item-icon-box" aria-hidden="true">{cmd.icon}</div>
                <div className="item-details">
                  <span className="item-title">
                    {lang === 'en' ? cmd.title : cmd.titleMr}
                  </span>
                  <span className="item-category">{cmd.category}</span>
                </div>
                {cmd.shortcut && (
                  <kbd className="item-shortcut" translate="no">{cmd.shortcut}</kbd>
                )}
                {selectedIndex === idx && (
                  <CornerDownLeft size={14} className="text-slate-400 ml-2" aria-hidden="true" />
                )}
              </button>
            ))
          ) : (
            <div className="palette-empty" role="status" aria-live="polite">
              <span>कोणताही पर्याय सापडला नाही (No matching command found)</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="palette-footer">
          <div className="footer-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <span className="platform-tag">MahaShiksha Command Bar</span>
        </div>
      </div>

      <style jsx>{`
        .palette-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 12vh;
          z-index: 99999;
          animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .palette-modal {
          width: 100%;
          max-width: 640px;
          background: rgba(11, 16, 28, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .palette-search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .palette-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .palette-input::placeholder {
          color: var(--text-tertiary);
          font-size: 0.88rem;
        }
        .palette-close-btn {
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .palette-close-btn:hover {
          color: #ffffff;
        }
        .palette-list {
          max-height: 380px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .palette-item {
          display: flex;
          width: 100%;
          text-align: left;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
          border: 1px solid transparent;
          background: transparent;
          font: inherit;
          touch-action: manipulation;
        }
        .palette-item:focus-visible { outline: 2px solid var(--laterite); outline-offset: 2px; }
        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        .palette-item:hover, .palette-item.selected {
          background: rgba(37, 99, 235, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }
        .item-icon-box {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .item-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #f8fafc;
        }
        .item-category {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.5px;
        }
        .item-shortcut {
          padding: 3px 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.68rem;
          color: var(--text-secondary);
          font-family: monospace;
        }
        .palette-empty {
          padding: 32px 20px;
          text-align: center;
          color: var(--text-tertiary);
          font-size: 0.88rem;
        }
        .palette-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.25);
          font-size: 0.72rem;
          color: var(--text-tertiary);
        }
        .footer-hints {
          display: flex;
          gap: 14px;
        }
        .footer-hints kbd {
          padding: 2px 5px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          font-size: 0.65rem;
          color: var(--text-secondary);
        }
        .platform-tag {
          font-weight: 600;
          color: #60a5fa;
        }
      `}</style>
    </div>
  );
};
