'use client';

import React, { useState } from 'react';
import { MathFormula } from '@/components/common/MathFormula';
import { 
  FileCheck, 
  CheckCircle2, 
  Eye, 
  Save
} from 'lucide-react';

export default function TeacherAssessmentsPage() {
  const [subject, setSubject] = useState('गणित (Mathematics)');
  const [questionMr, setQuestionMr] = useState('समीकरण सोडवा: निश्चित संकलन (Definite Integration)');
  const [formulaLatex, setFormulaLatex] = useState('\\int_0^{\\pi} \\sin^2(x) dx = \\frac{\\pi}{2}');
  const [optionA, setOptionA] = useState('\\pi');
  const [optionB, setOptionB] = useState('\\frac{\\pi}{2}');
  const [optionC, setOptionC] = useState('\\frac{\\pi}{4}');
  const [optionD, setOptionD] = useState('0');
  const [correctOption, setCorrectOption] = useState('B');
  const [positiveMarks, setPositiveMarks] = useState(2);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="assessments-page-wrapper">
      <div className="page-header-clean glass-card">
        <div className="header-icon-box">
          <FileCheck size={28} className="text-purple-400" aria-hidden="true" />
        </div>
        <div>
          <h2>MHT-CET व स्टेट बोर्ड प्रश्नपत्रिका बिल्डर (Assessment Engine)</h2>
          <p className="text-xs text-slate-400">
            LaTeX गणितीय सूत्रे, Devanagari फॉन्ट समर्थन, आणि MHT-CET नियमांनुसार मार्किंग (+२ / ०)
          </p>
        </div>
      </div>

      <div className="assessment-grid">
        {/* Left: Question Creator Form */}
        <form onSubmit={handleSaveQuestion} className="q-form-card glass-card">
          <h3 className="form-heading">नवीन MCQ प्रश्न तयार करा</h3>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="subject" className="form-label">विषय (Subject):</label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-select">
                <option value="गणित (Mathematics)">गणित (Mathematics - +२ गुण)</option>
                <option value="भौतिकशास्त्र (Physics)">भौतिकशास्त्र (Physics - +१ गुण)</option>
                <option value="रसायनशास्त्र (Chemistry)">रसायनशास्त्र (Chemistry - +१ गुण)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="positiveMarks" className="form-label">गुण योजना (Marking Scheme):</label>
              <select 
                id="positiveMarks"
                value={positiveMarks} 
                onChange={(e) => setPositiveMarks(parseInt(e.target.value))}
                className="form-select"
              >
                <option value={2}>+२ गुण (MHT-CET Maths, Negative: ०)</option>
                <option value={1}>+१ गुण (MHT-CET Physics/Chem, Negative: ०)</option>
                <option value={4}>+४ गुण (NEET/JEE, Negative: -१)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="questionMr" className="form-label">प्रश्नाचा मजकूर (मराठी/Semi-EN Text):</label>
            <textarea
              id="questionMr"
              rows={2}
              required
              value={questionMr}
              onChange={(e) => setQuestionMr(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="formulaLatex" className="form-label">LaTeX गणितीय सूत्र (Math Formula):</label>
            <input
              id="formulaLatex"
              type="text"
              value={formulaLatex}
              onChange={(e) => setFormulaLatex(e.target.value)}
              placeholder="e.g. \int_0^{\pi} \sin^2(x) dx"
              className="form-input"
            />
          </div>

          {/* Options Grid */}
          <div className="options-input-grid">
            <div className="form-group">
              <label htmlFor="optionA" className="form-label">पर्याय A:</label>
              <input id="optionA" type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="optionB" className="form-label">पर्याय B:</label>
              <input id="optionB" type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="optionC" className="form-label">पर्याय C:</label>
              <input id="optionC" type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="optionD" className="form-label">पर्याय D:</label>
              <input id="optionD" type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)} className="form-input" />
            </div>
          </div>

          <fieldset className="form-group" style={{ border: 'none', padding: 0, margin: 0, marginBottom: '16px' }}>
            <legend className="form-label">अचूक उत्तर (Correct Option):</legend>
            <div className="option-radio-row" role="radiogroup" aria-label="Correct option">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <label key={opt} className={`radio-pill ${correctOption === opt ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="correctOpt"
                    value={opt}
                    checked={correctOption === opt}
                    onChange={(e) => setCorrectOption(e.target.value)}
                  />
                  <span>पर्याय {opt}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {isSaved && (
            <div className="save-success-strip glass-panel">
              <CheckCircle2 size={18} className="text-emerald-400" aria-hidden="true" />
              <span>प्रश्न यशस्वीरीत्या प्रश्नपेढीत (Question Bank) जतन झाला!</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            <Save size={16} aria-hidden="true" />
            <span>प्रश्न जतन करा (Save to Exam Bank)</span>
          </button>
        </form>

        {/* Right: Live CBT Question Preview */}
        <div className="preview-card glass-card">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} className="text-blue-400" aria-hidden="true" />
            <h4>थेट विद्यार्थी CBT पूर्वावलोकन (Live Preview)</h4>
          </div>

          <div className="cbt-preview-box glass-panel">
            <div className="text-xs font-bold text-blue-400 mb-2">प्रश्न १ • {subject} • +{positiveMarks} गुण</div>
            <p className="font-semibold text-sm mb-3">{questionMr}</p>
            
            {formulaLatex && (
              <div className="p-3 bg-slate-800/80 rounded-md mb-4 inline-block">
                <MathFormula math={formulaLatex} block />
              </div>
            )}

            <div className="preview-opts-list">
              <div className={`preview-opt ${correctOption === 'A' ? 'is-correct' : ''}`}>
                <span className="opt-badge">A</span>
                <MathFormula math={optionA} />
              </div>
              <div className={`preview-opt ${correctOption === 'B' ? 'is-correct' : ''}`}>
                <span className="opt-badge">B</span>
                <MathFormula math={optionB} />
              </div>
              <div className={`preview-opt ${correctOption === 'C' ? 'is-correct' : ''}`}>
                <span className="opt-badge">C</span>
                <MathFormula math={optionC} />
              </div>
              <div className={`preview-opt ${correctOption === 'D' ? 'is-correct' : ''}`}>
                <span className="opt-badge">D</span>
                <MathFormula math={optionD} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .assessments-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .page-header-clean {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-md);
        }
        .page-header-clean h2 {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .assessment-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .assessment-grid {
            grid-template-columns: 1fr;
          }
        }
        .q-form-card, .preview-card {
          padding: 24px;
        }
        .form-heading {
          font-size: 1.05rem;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          outline: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--border-focus);
        }
        .options-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .option-radio-row {
          display: flex;
          gap: 10px;
        }
        .radio-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--bg-surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          cursor: pointer;
        }
        .radio-pill.active {
          background: var(--brand-emerald);
          color: #fff;
          border-color: var(--brand-emerald);
        }
        .cbt-preview-box {
          padding: 20px;
          border-radius: var(--radius-md);
        }
        .preview-opts-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .preview-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: var(--bg-surface-2);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }
        .preview-opt.is-correct {
          border: 1px solid #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        .opt-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--bg-surface-3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.72rem;
        }
        .save-success-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          color: #34d399;
          font-size: 0.8rem;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}
