import { describe, it, expect } from 'vitest';
import { safeEvaluate } from './safeEvaluate';

describe('safeEvaluate', () => {
  it('correct calc 2+3*4 = 14 (operator precedence)', () => {
    expect(safeEvaluate('2+3*4')).toBe(14);
  });

  it('parentheses (2+3)*4 = 20', () => {
    expect(safeEvaluate('(2+3)*4')).toBe(20);
  });

  it('unary minus -5+3 = -2', () => {
    expect(safeEvaluate('-5+3')).toBe(-2);
  });

  it('handles decimals 1.5*2 = 3', () => {
    expect(safeEvaluate('1.5*2')).toBe(3);
  });

  it('throws on div0', () => {
    expect(() => safeEvaluate('10/0')).toThrow(/Div0/);
  });

  it('throws on injection 2; alert(1)', () => {
    expect(() => safeEvaluate('2; alert(1)')).toThrow();
  });

  it('throws on empty string', () => {
    expect(() => safeEvaluate('')).toThrow();
    expect(() => safeEvaluate('   ')).toThrow();
  });

  it('throws on unbalanced parentheses', () => {
    expect(() => safeEvaluate('(2+3')).toThrow(/Unbalanced/);
    expect(() => safeEvaluate('2+3)')).toThrow(/Unbalanced/);
  });
});
