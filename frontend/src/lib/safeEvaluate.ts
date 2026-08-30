/**
 * Safe arithmetic evaluator — no Function/eval; shunting-yard with two stacks.
 * Supports 0-9, decimal, unary minus, parentheses, + - * / .
 * Extracted from components/exam/MHTCETExamSimulator.tsx for testability.
 */
export const safeEvaluate = (expr: string): number => {
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

export default safeEvaluate;
