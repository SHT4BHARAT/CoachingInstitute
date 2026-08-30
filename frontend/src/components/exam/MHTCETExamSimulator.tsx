'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { mockQuiz, QuizQuestion } from '@/lib/mockData';
import { MathFormula } from '@/components/common/MathFormula';
import { 
  Clock, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  FileCheck,
  Calculator,
  BookOpen,
  Bookmark,
  ChevronLeft,
  X
} from 'lucide-react';

export const MHTCETExamSimulator: React.FC = () => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [questionStatus, setQuestionStatus] = useState<Record<string, 'ANSWERED' | 'REVIEW' | 'UNANSWERED' | 'NOT_VISITED'>>({
    Q1: 'NOT_VISITED',
    Q2: 'NOT_VISITED',
    Q3: 'NOT_VISITED',
  });
  const [activeSection, setActiveSection] = useState<'Physics' | 'Chemistry' | 'Mathematics'>('Physics');
  const [secondsRemaining, setSecondsRemaining] = useState(mockQuiz.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  
  const [testResult, setTestResult] = useState<{
    score: number;
    totalPossible: number;
    percentile: number;
    rank: number;
    correctCount: number;
    incorrectCount: number;
  } | null>(null);

  const questions = mockQuiz.questions;
  const currentQ: QuizQuestion = questions[currentQuestionIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleSaveAndNext = () => {
    const isAnswered = !!selectedAnswers[currentQ.id];
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQ.id]: isAnswered ? 'ANSWERED' : 'UNANSWERED',
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleMarkForReview = () => {
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQ.id]: 'REVIEW',
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleClearResponse = () => {
    const updated = { ...selectedAnswers };
    delete updated[currentQ.id];
    setSelectedAnswers(updated);
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQ.id]: 'UNANSWERED',
    }));
  };

  const handleSubmitTest = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correctOptionId) {
        score += q.marksPositive;
        correct++;
      } else if (selected) {
        score -= q.marksNegative;
        incorrect++;
      }
    });

    const totalPossible = questions.reduce((acc, q) => acc + q.marksPositive, 0);
    const calculatedPercentile = Number((85 + (score / (totalPossible || 1)) * 14.5).toFixed(2));
    const estimatedRank = Math.max(120, Math.floor(25000 * (1 - calculatedPercentile / 100)));

    setTestResult({
      score,
      totalPossible,
      percentile: Math.min(99.98, calculatedPercentile),
      rank: estimatedRank,
      correctCount: correct,
      incorrectCount: incorrect,
    });
    setIsSubmitted(true);
  };

  // Safe arithmetic evaluator — no Function/eval; shunting-yard with two stacks.
  // Supports 0-9, decimal, unary minus, parentheses, + - * / . Production alternative: mathjs.
  const safeEvaluate = (expr: string): number => {
    const sanitized = expr.replace(/[^0-9+\-*/(). ]/g, '').replace(/\s+/g, '');
    if (!sanitized || /[a-zA-Z]/.test(expr)) throw new Error('Invalid chars');
    // Basic structure validation: balanced parens and no empty operator sequences
    let bal = 0;
    for (const ch of sanitized) {
      if (ch === '(') bal++;
      if (ch === ')') bal--;
      if (bal < 0) throw new Error('Unbalanced');
    }
    if (bal !== 0) throw new Error('Unbalanced');
    const vals: number[] = [];
    const ops: string[] = [];
    const prec = (op: string) => (op === '+' || op === '-' ? 1 : op === '*' || op === '/' ? 2 : 0);
    const apply = () => {
      const op = ops.pop()!;
      const b = vals.pop();
      const a = vals.pop();
      if (a === undefined || b === undefined) throw new Error('Syntax');
      let r: number;
      if (op === '+') r = a + b;
      else if (op === '-') r = a - b;
      else if (op === '*') r = a * b;
      else if (op === '/') {
        if (b === 0) throw new Error('Div0');
        r = a / b;
      } else throw new Error('Op');
      if (!isFinite(r)) throw new Error('Invalid');
      vals.push(r);
    };
    let i = 0;
    let expectNum = true;
    while (i < sanitized.length) {
      const ch = sanitized[i];
      if (ch === ' ') { i++; continue; }
      if (ch === '(') { ops.push(ch); expectNum = true; i++; }
      else if (ch === ')') {
        while (ops.length && ops[ops.length - 1] !== '(') apply();
        if (!ops.length) throw new Error('Syntax');
        ops.pop(); // '('
        expectNum = false; i++;
      } else if (/[0-9.]/.test(ch)) {
        let j = i;
        let dot = 0;
        while (j < sanitized.length && /[0-9.]/.test(sanitized[j])) {
          if (sanitized[j] === '.') dot++;
          j++;
        }
        if (dot > 1) throw new Error('Syntax');
        const numStr = sanitized.slice(i, j);
        if (numStr === '.' || numStr.endsWith('.')) throw new Error('Syntax');
        const n = Number(numStr);
        if (!isFinite(n)) throw new Error('Invalid');
        vals.push(n);
        expectNum = false; i = j;
      } else if (ch === '+' || ch === '*' || ch === '/' || ch === '-') {
        // Unary minus/plus when expecting number
        if (ch === '-' && expectNum) {
          // treat as 0 - num
          vals.push(0);
        } else if (ch === '+' && expectNum) {
          i++; continue;
        } else if (expectNum) throw newErrorWrap();
        while (ops.length && ops[ops.length - 1] !== '(' && prec(ops[ops.length - 1]) >= prec(ch)) apply();
        ops.push(ch);
        expectNum = true; i++;
        continue;
        function newErrorWrap() { throw new Error('Syntax'); }
      } else throw new Error('Invalid');
    }
    while (ops.length) {
      if (ops[ops.length - 1] === '(') throw new Error('Syntax');
      apply();
    }
    if (vals.length !== 1) throw new Error('Syntax');
    return vals[0];
  };

  const handleCalcClick = (val: string) => {
    if (val === 'C') setCalcInput('');
    else if (val === '=') {
      try {
        const res = safeEvaluate(calcInput);
        setCalcInput(String(res));
      } catch {
        setCalcInput('Error');
      }
    } else {
      if (/[^0-9+\-*/().]/.test(val) && val !== 'sin') return;
      // Block 'sin' token — not supported in safe evaluator; show hint instead of injecting.
      if (val === 'sin') {
        setCalcInput('Error');
        return;
      }
      setCalcInput((prev) => prev + val);
    }
  };

  return (
    <div className="mht-cet-exam-wrapper">
      {/* Top Test Header */}
      <div className="test-top-bar glass-card">
        <div className="test-title-col">
          <span className="badge badge-primary">{mockQuiz.targetExam}</span>
          <h2>{lang === 'en' ? mockQuiz.titleEn : mockQuiz.titleMr}</h2>
        </div>

        <div className="test-header-controls">
          {/* Scientific Calculator & Formula Drawer Buttons */}
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="btn btn-secondary btn-sm"
            title="Open On-Screen Scientific Calculator"
            aria-expanded={showCalculator}
            aria-controls="calc-modal"
            aria-label="Toggle scientific calculator"
          >
            <Calculator size={14} aria-hidden="true" />
            <span>{lang === 'en' ? 'Calculator' : 'कॅल्क्युलेटर'}</span>
          </button>

          <button 
            onClick={() => setShowFormulaSheet(!showFormulaSheet)}
            className="btn btn-secondary btn-sm"
            title="Formula Reference Sheet"
            aria-expanded={showFormulaSheet}
            aria-controls="formula-drawer"
            aria-label="Toggle formula reference sheet"
          >
            <BookOpen size={14} aria-hidden="true" />
            <span>{lang === 'en' ? 'Formulas' : 'सूत्र संदर्भ'}</span>
          </button>

          {/* Timer Clock */}
          <div className="timer-badge-pill">
            <Clock size={16} className="text-amber-400" aria-hidden="true" />
            <span className="timer-label">{t('exam.time_left')}</span>
            <span className="timer-countdown" role="timer" aria-live="polite" aria-atomic="true" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTimer(secondsRemaining)}</span>
          </div>

          {!isSubmitted && (
            <button 
              onClick={handleSubmitTest}
              className="btn btn-primary btn-sm"
            >
              <FileCheck size={14} />
              <span>{t('exam.btn_submit_test')}</span>
            </button>
          )}
        </div>
      </div>

      {!isSubmitted ? (
        <div className="exam-arena-grid">
          {/* Left Main Column: Question Arena */}
          <div className="question-arena-card glass-card">
            {/* Section Selector Tabs */}
            <div className="section-tabs-row" role="tablist" aria-label="Exam sections">
              {(['Physics', 'Chemistry', 'Mathematics'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`section-tab-btn ${activeSection === sec ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeSection === sec}
                  aria-controls={`section-panel-${sec}`}
                >
                  <span>{sec === 'Physics' ? 'विभाग १: भौतिकशास्त्र (Physics)' : sec === 'Chemistry' ? 'विभाग १: रसायनशास्त्र (Chemistry)' : 'विभाग २: गणित (Mathematics)'}</span>
                </button>
              ))}
            </div>

            {/* Question Details Header */}
            <div className="q-head-bar">
              <div className="flex items-center gap-2">
                <span className="q-num-pill">
                  {lang === 'en' ? 'Question' : 'प्रश्न'} {currentQuestionIndex + 1}
                </span>
                <span className="badge badge-success">+{currentQ.marksPositive} Marks</span>
                <span className="badge badge-secondary">{currentQ.marksNegative} Negative</span>
              </div>
              <span className="section-name-tag">{currentQ.section}</span>
            </div>

            {/* Question Statement */}
            <div className="question-statement-box">
              <p className="statement-mr">
                {lang === 'en' ? (currentQ.questionEn || currentQ.questionMr) : currentQ.questionMr}
              </p>
              {currentQ.formulaLatex && (
                <div className="formula-container glass-panel">
                  <MathFormula latex={currentQ.formulaLatex} />
                </div>
              )}
            </div>

            {/* Options List */}
            <fieldset className="options-grid" role="radiogroup" aria-label={`Options for question ${currentQuestionIndex + 1}`}>
              <legend className="sr-only">Choose one answer for question {currentQuestionIndex + 1}</legend>
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectOption(opt.id); }
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const next = (optIndex + 1) % currentQ.options.length; handleSelectOption(currentQ.options[next].id); const el = document.querySelectorAll<HTMLElement>('[role="radio"]')[next]; el?.focus(); }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const prev = (optIndex - 1 + currentQ.options.length) % currentQ.options.length; handleSelectOption(currentQ.options[prev].id); const el = document.querySelectorAll<HTMLElement>('[role="radio"]')[prev]; el?.focus(); }
                    }}
                    className={`option-card glass-panel ${isSelected ? 'selected' : ''}`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Option ${opt.id}: ${lang === 'en' ? (opt.textEn || opt.textMr) : opt.textMr}`}
                    tabIndex={isSelected ? 0 : 0}
                  >
                    <div className="option-letter-circle" aria-hidden="true">{opt.id}</div>
                    <div className="option-content">
                      <span>{lang === 'en' ? (opt.textEn || opt.textMr) : opt.textMr}</span>
                    </div>
                  </div>
                );
              })}
            </fieldset>

            {/* Bottom Actions Bar */}
            <div className="exam-bottom-actions">
              <div className="actions-left">
                <button 
                  onClick={handleClearResponse}
                  className="btn btn-secondary btn-sm"
                >
                  <RotateCcw size={14} />
                  <span>{t('exam.btn_clear_response')}</span>
                </button>
                <button 
                  onClick={handleMarkForReview}
                  className="btn btn-secondary btn-sm text-purple-400"
                >
                  <Bookmark size={14} />
                  <span>{t('exam.btn_mark_review')}</span>
                </button>
              </div>

              <div className="actions-right">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                  className="btn btn-secondary btn-sm"
                >
                  <ChevronLeft size={14} />
                  <span>{lang === 'en' ? 'Previous' : 'मागील'}</span>
                </button>
                <button 
                  onClick={handleSaveAndNext}
                  className="btn btn-primary btn-sm"
                >
                  <span>{t('exam.btn_save_next')}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Question Status Palette */}
          <div className="question-palette-card glass-card">
            <h4>{t('exam.palette_title')}</h4>

            {/* Legend */}
            <div className="palette-legend">
              <div className="legend-item">
                <span className="dot dot-answered"></span>
                <span>{lang === 'en' ? 'Answered' : 'उत्तर दिलेले'}</span>
              </div>
              <div className="legend-item">
                <span className="dot dot-review"></span>
                <span>{lang === 'en' ? 'Marked Review' : 'पुनरावलोकन'}</span>
              </div>
              <div className="legend-item">
                <span className="dot dot-unanswered"></span>
                <span>{lang === 'en' ? 'Unanswered' : 'अनुत्तरीत'}</span>
              </div>
              <div className="legend-item">
                <span className="dot dot-not-visited"></span>
                <span>{lang === 'en' ? 'Not Visited' : 'न पाहिलेले'}</span>
              </div>
            </div>

            {/* Questions Number Matrix */}
            <div className="palette-matrix" role="grid" aria-label="Question palette">
              {questions.map((q, idx) => {
                const status = questionStatus[q.id] || 'NOT_VISITED';
                const isCurrent = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`q-palette-btn status-${status.toLowerCase()} ${isCurrent ? 'active-q' : ''}`}
                    aria-label={`Go to question ${idx + 1}, ${status.toLowerCase().replace('_',' ')}${isCurrent ? ', current' : ''}`}
                    aria-current={isCurrent ? 'true' : undefined}
                    aria-pressed={isCurrent}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Candidate Identity Pill */}
            <div className="candidate-info-box glass-panel mt-4">
              <div className="text-xs text-slate-300">
                <div><strong>Candidate:</strong> {user.nameMr || user.name}</div>
                <div><strong>Roll No:</strong> MHTCET-2026-9042</div>
                <div><strong>Center:</strong> Maharashtra State CBT Server</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Result Scorecard & Solution Analysis */
        testResult && (
          <div className="result-container glass-card">
            <div className="result-header">
              <Award size={48} className="text-amber-400" />
              <div>
                <h2>{t('exam.result_title')}</h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Official State Normalization Scorecard & Topic-wise Accuracy breakdown'
                    : 'महाराष्ट्र राज्य सामान्यीकरण गुणपत्रिका व अचूकता विश्लेषण'}
                </p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="result-metrics-grid">
              <div className="metric-box glass-panel">
                <span className="metric-lbl">{lang === 'en' ? 'Total Score' : 'मिळालेले एकूण गुण'}</span>
                <span className="metric-val text-blue-400">{testResult.score} / {testResult.totalPossible}</span>
              </div>
              <div className="metric-box glass-panel">
                <span className="metric-lbl">{lang === 'en' ? 'Estimated Percentile' : 'अंदाजित पर्सेन्टाईल'}</span>
                <span className="metric-val text-emerald-400">{testResult.percentile}%tile</span>
              </div>
              <div className="metric-box glass-panel">
                <span className="metric-lbl">{lang === 'en' ? 'State Rank Projection' : 'राज्यस्तरीय अंदाजित रँक'}</span>
                <span className="metric-val text-amber-400">#{testResult.rank}</span>
              </div>
              <div className="metric-box glass-panel">
                <span className="metric-lbl">{lang === 'en' ? 'Accuracy' : 'अचूकता (Accuracy)'}</span>
                <span className="metric-val text-purple-400">
                  {Math.round((testResult.correctCount / (questions.length || 1)) * 100)}%
                </span>
              </div>
            </div>

            {/* Question Solutions Breakdown */}
            <div className="solutions-section">
              <h3 className="text-md font-bold text-slate-100 mb-3">
                {lang === 'en' ? 'Detailed Question Solutions & Formula Derivations' : 'सविस्तर उत्तरपत्रिका व गणितीय सिद्धता:'}
              </h3>

              <div className="solutions-list">
                {questions.map((q, idx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctOptionId;
                  return (
                    <div key={q.id} className="solution-item-card glass-panel">
                      <div className="sol-head">
                        <span className="font-bold text-xs">
                          Q{idx + 1}. {lang === 'en' ? (q.questionEn || q.questionMr) : q.questionMr}
                        </span>
                        <span className={`badge ${isCorrect ? 'badge-success' : studentAns ? 'badge-danger' : 'badge-warning'}`}>
                          {isCorrect ? '✓ Correct' : studentAns ? '✗ Incorrect' : 'Unattempted'}
                        </span>
                      </div>

                      {q.solutionMr && (
                        <div className="sol-body">
                          <span className="sol-title">स्पष्टीकरण (Solution):</span>
                          <p className="sol-text">{q.solutionMr}</p>
                          {q.solutionFormula && (
                            <div className="sol-formula-box">
                              <MathFormula latex={q.solutionFormula} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="result-actions-row">
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setSecondsRemaining(mockQuiz.timeLimitMinutes * 60);
                }}
                className="btn btn-primary"
              >
                <RotateCcw size={16} />
                <span>{lang === 'en' ? 'Retake CBT Mock Test' : 'पुन्हा सराव परीक्षा द्या (Retake Test)'}</span>
              </button>
            </div>
          </div>
        )
      )}

      {/* On-Screen Scientific Calculator Modal */}
      {showCalculator && (
        <div id="calc-modal" className="calc-modal glass-card" role="dialog" aria-modal="true" aria-label="MHT-CET Scientific Calculator" tabIndex={-1}>
          <div className="calc-header">
            <span className="text-xs font-bold text-slate-200" id="calc-title">MHT-CET Scientific Calculator</span>
            <button onClick={() => setShowCalculator(false)} className="calc-close-btn" aria-label="Close calculator">
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="calc-display font-mono">{calcInput || '0'}</div>
          <div className="calc-buttons-grid">
            {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'sin', '='].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcClick(btn)}
                className={`calc-btn ${btn === '=' ? 'calc-btn-equal' : btn === 'C' ? 'calc-btn-clear' : ''}`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Formula Cheat Sheet Drawer */}
      {showFormulaSheet && (
        <div id="formula-drawer" className="formula-drawer glass-card" role="dialog" aria-modal="true" aria-label="High-Yield Formulas">
          <div className="calc-header">
            <span className="text-xs font-bold text-slate-200" id="formula-title">High-Yield Formulas</span>
            <button onClick={() => setShowFormulaSheet(false)} className="calc-close-btn" aria-label="Close formula sheet">
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="formula-drawer-body text-xs space-y-3">
            <div>
              <strong className="text-amber-400">Moment of Inertia:</strong>
              <div className="font-mono text-slate-200 mt-1">I = (1/2) * M * R^2 (Disc)</div>
              <div className="font-mono text-slate-200">I_0 = I_c + M * h^2 (Parallel Axis)</div>
            </div>
            <div>
              <strong className="text-blue-400">Integration:</strong>
              <div className="font-mono text-slate-200 mt-1">Integral[sin^2(x)] = x/2 - sin(2x)/4</div>
            </div>
            <div>
              <strong className="text-emerald-400">Chemical Kinetics:</strong>
              <div className="font-mono text-slate-200 mt-1">t_(1/2) = 0.693 / k (1st Order)</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mht-cet-exam-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .test-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          flex-wrap: wrap;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 17, 23, 0.9);
        }
        .test-title-col {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .test-title-col h2 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }
        .test-header-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .timer-badge-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-full);
        }
        .timer-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .timer-countdown {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fbbf24;
          font-family: monospace;
        }
        .exam-arena-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .exam-arena-grid {
            grid-template-columns: 1fr;
          }
        }
        .question-arena-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 17, 23, 0.85);
        }
        .section-tabs-row {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 6px;
        }
        .section-tab-btn {
          padding: 7px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease;
        }
        .section-tab-btn.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: transparent;
        }
        .q-head-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .q-num-pill {
          font-size: 0.9rem;
          font-weight: 800;
          color: #ffffff;
        }
        .section-name-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #60a5fa;
        }
        .question-statement-box {
          padding: 16px 0;
        }
        .statement-mr {
          font-size: 1.05rem;
          font-weight: 600;
          color: #f8fafc;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .formula-container {
          padding: 12px 18px;
          margin-top: 8px;
          display: inline-block;
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .option-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, opacity 120ms ease;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .option-card:hover {
          border-color: var(--brand-primary);
          background: rgba(37, 99, 235, 0.08);
        }
        .option-card.selected {
          border-color: var(--brand-primary);
          background: rgba(37, 99, 235, 0.18);
        }
        .option-letter-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.82rem;
          color: #ffffff;
        }
        .option-card.selected .option-letter-circle {
          background: var(--brand-primary);
        }
        .option-content {
          font-size: 0.9rem;
          font-weight: 600;
          color: #e2e8f0;
        }
        .exam-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 10px;
        }
        .actions-left, .actions-right {
          display: flex;
          gap: 8px;
        }
        .question-palette-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .question-palette-card h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
        }
        .palette-legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        .dot-answered { background: #10b981; }
        .dot-review { background: #8b5cf6; }
        .dot-unanswered { background: #ef4444; }
        .dot-not-visited { background: #475569; }
        .palette-matrix {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          max-height: 280px;
          overflow-y: auto;
        }
        .q-palette-btn {
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
          color: #ffffff;
        }
        .status-answered { background: #10b981; }
        .status-review { background: #8b5cf6; }
        .status-unanswered { background: #ef4444; }
        .status-not_visited { background: #334155; color: #94a3b8; }
        .active-q {
          box-shadow: 0 0 0 2px #ffffff;
        }
        .candidate-info-box {
          padding: 12px;
        }
        .result-container {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .result-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .result-header h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
        }
        .result-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .result-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .metric-box {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
        }
        .metric-lbl {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .metric-val {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .solutions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .solution-item-card {
          padding: 16px;
        }
        .sol-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .sol-body {
          margin-top: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .sol-title {
          font-weight: 700;
          color: #34d399;
          display: block;
          margin-bottom: 4px;
        }
        .sol-formula-box {
          margin-top: 8px;
        }
        .result-actions-row {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .calc-modal {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 260px;
          padding: 14px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
          z-index: 999;
        }
        .calc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .calc-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .calc-display {
          background: #030712;
          padding: 10px;
          text-align: right;
          font-size: 1.1rem;
          color: #ffffff;
          border-radius: var(--radius-sm);
          margin-bottom: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .calc-buttons-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .calc-btn {
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          color: #ffffff;
          font-size: 0.82rem;
          cursor: pointer;
        }
        .calc-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }
        .calc-btn-equal {
          background: var(--brand-primary);
        }
        .calc-btn-clear {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
        }
        .formula-drawer {
          position: fixed;
          bottom: 24px;
          right: 300px;
          width: 300px;
          padding: 16px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
          z-index: 999;
        }
      `}</style>
    </div>
  );
};
