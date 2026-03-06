import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';

const TARGET_DIR = path.resolve('src/modules/s4/stats/pages');

function sanitizeLatexInput(input) {
  if (!input) return input;

  const accentMap = {
    e: /[éèêë]/g,
    a: /[àâä]/g,
    u: /[ùûü]/g,
    i: /[îï]/g,
    o: /[ôö]/g,
    c: /[ç]/g,
    oe: /[œ]/g,
    E: /[ÉÈÊË]/g,
    A: /[ÀÂÄ]/g,
    U: /[ÙÛÜ]/g,
    I: /[ÎÏ]/g,
    O: /[ÔÖ]/g,
    C: /[Ç]/g,
    OE: /[Œ]/g,
  };

  let out = input;
  out = out.replace(/(^|[^\\])%/g, '$1\\%');
  for (const [to, re] of Object.entries(accentMap)) out = out.replace(re, to);
  out = out.replace(/\\euro/g, '\\mathrm{EUR}');
  out = out.replace(/\\\$/g, '\\mathrm{USD}');
  out = out.replace(/\$/g, '\\mathrm{USD}');
  return out;
}

function collectTsxFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectTsxFiles(full));
      continue;
    }
    if (entry.isFile() && full.endsWith('.tsx')) out.push(full);
  }
  return out;
}

function unescapeJsStringLiteral(raw) {
  // Two-pass approach: protect \\ with a placeholder before handling single-char
  // escape sequences, to avoid corrupting LaTeX commands like \right, \nu, \text.
  // e.g. "\\alpha" in file (chars: \,\,a,l,p,h,a) → "\alpha" (chars: \,a,l,p,h,a)
  // e.g. "\\right)" in file → protect "\" "\" as \x00 → "\\r" pattern won't match → restore → "\right)"
  const PH = '\x00';
  return raw
    .replace(/\\\\/g, PH)   // protect double-backslash with placeholder
    .replace(/\\n/g, '\n')  // remaining \n → newline
    .replace(/\\t/g, '\t')  // remaining \t → tab
    .replace(/\\r/g, '\r')  // remaining \r → CR
    .replace(/\x00/g, '\\'); // restore placeholder → single backslash
}

const files = collectTsxFiles(TARGET_DIR);
const exprRegex = /<(Math|FormulaBox)(?:\s[^>]*)?>\{"([\s\S]*?)"\}<\/(Math|FormulaBox)>/g;

const errors = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = exprRegex.exec(text)) !== null) {
    const raw = match[2];
    const expr = sanitizeLatexInput(unescapeJsStringLiteral(raw));
    try {
      katex.renderToString(expr, { throwOnError: true, strict: 'error', trust: false });
    } catch (err) {
      const line = text.slice(0, match.index).split(/\r?\n/).length;
      errors.push({
        file: path.relative(process.cwd(), file),
        line,
        message: err instanceof Error ? err.message : String(err),
        expr: raw,
      });
    }
  }
}

if (errors.length) {
  console.error(`LaTeX validation failed with ${errors.length} error(s):`);
  for (const e of errors) {
    console.error(`- ${e.file}:${e.line}`);
    console.error(`  ${e.message}`);
    console.error(`  expr: ${e.expr}`);
  }
  process.exit(1);
}

console.log('LaTeX validation passed.');
