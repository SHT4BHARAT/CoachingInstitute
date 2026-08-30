'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export interface MathFormulaProps {
  math?: string;
  latex?: string;
  block?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ math, latex, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const formulaStr = latex || math || '';

  useEffect(() => {
    if (containerRef.current && formulaStr) {
      try {
        katex.render(formulaStr, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch {
        if (containerRef.current) {
          containerRef.current.innerText = formulaStr;
        }
      }
    }
  }, [formulaStr, block]);

  const Tag = block ? 'div' : 'span';
  return (
    <Tag role="math" aria-label={formulaStr} className={`math-formula ${block ? 'math-block' : 'math-inline'} ${className}`}>
      <span ref={containerRef as React.RefObject<HTMLSpanElement>} aria-hidden="true" />
      <span className="sr-only">{formulaStr}</span>
    </Tag>
  );
};
