import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import katex from 'katex';

const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT = path.join(PROJECT_ROOT, 'src/content');
const TSX_MATH_ROOTS = [
  path.join(PROJECT_ROOT, 'src/modules/s3/macro/pages/Chapter1.tsx'),
  path.join(PROJECT_ROOT, 'src/modules/s4/macro/pages/chapter1'),
  path.join(PROJECT_ROOT, 'src/modules/s4/macro/pages/chapter2'),
];
const ENCODING_ONLY_FILES = [
  'src/features/ai-chat/components/MarkdownMessage.tsx',
  'src/components/Math.tsx',
  'src/components/content/Math.tsx',
  'src/modules/s3/macro/components/interactive/Tooltip.tsx',
];

const CONTENT_EXTENSIONS = new Set(['.md', '.mdx', '.txt', '.tex', '.json']);
const TSX_EXTENSIONS = new Set(['.tsx', '.ts']);

const MOJIBAKE_TOKENS = [
  'Ã©', 'Ã¨', 'Ãª', 'Ã«', 'Ã ', 'Ã¢', 'Ã¹', 'Ã»', 'Ã§', 'Ã´', 'Ã®', 'Ã¯',
  'Ã‰', 'Ã€', 'Ã‡', 'Â·', 'Â«', 'Â»', 'â€™', 'â€œ', 'â€', 'â€“', 'â€”', 'â€¦', 'â†’',
  'ðŸ', 'ï¸\u008f', 'ÎŸá¼¶ÎºÎ¿', 'pÃ©dagogique', 'prÃ©cis', 'tronquÃ©', 'MacroÃ©conomie',
];

const KATEX_MACROS = {
  '\\E': '\\mathbb{E}',
  '\\Var': '\\operatorname{Var}',
  '\\that': '\\hat{\\theta}',
  '\\mhat': '\\hat{m}',
  '\\shat': '\\hat{\\sigma}',
  '\\imark': '\\overset{(i)}{=}',
  // Macros from chapitre-7/8/9.tex preambles
  '\\N': '\\mathcal{N}',
  '\\B': '\\mathcal{B}',
  '\\Prob': '\\mathbb{P}',
  '\\P': '\\mathbb{P}',
  '\\R': '\\mathbb{R}',
  '\\iid': '\\overset{\\text{i.i.d.}}{\\sim}',
  '\\appN': '\\overset{c}{\\approx}',
  '\\approxN': '\\overset{c}{\\approx}',
  '\\biais': '\\mathrm{Biais}(#1)',
  '\\corrsep': '',
  '\\pop': '\\textbf{#1}',
  '\\ech': '\\textit{#1}',
};

const latexErrors = [];
const encodingErrors = [];

function walkContentFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(PROJECT_ROOT, abs).replace(/\\/g, '/');

    if (rel.includes('/raw/')) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...walkContentFiles(abs));
      continue;
    }

    if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(abs);
    }
  }

  return files;
}

function walkFilesWithExtensions(dir, extensions) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFilesWithExtensions(abs, extensions));
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      files.push(abs);
    }
  }

  return files;
}

function collectTsxMathFiles(targets) {
  const files = [];

  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      files.push(...walkFilesWithExtensions(target, TSX_EXTENSIONS));
    } else if (stat.isFile() && TSX_EXTENSIONS.has(path.extname(target))) {
      files.push(target);
    }
  }

  return files;
}

function hasBadControlChar(text) {
  return /[\u0080-\u009F]/.test(text);
}

function validateEncoding(filePath, content) {
  if (content.includes('\uFFFD')) {
    encodingErrors.push(`${filePath}: contient le caractere de remplacement Unicode (U+FFFD).`);
  }

  if (hasBadControlChar(content)) {
    encodingErrors.push(`${filePath}: contient des caracteres de controle UTF-8 suspects (U+0080..U+009F).`);
  }

  for (const token of MOJIBAKE_TOKENS) {
    if (content.includes(token)) {
      encodingErrors.push(`${filePath}: contient une sequence mojibake suspecte "${token}".`);
      break;
    }
  }
}

function validateLatexExpression(filePath, expression, displayMode, origin, line) {
  const latex = expression.trim();
  if (!latex) return;

  try {
    katex.renderToString(latex, {
      throwOnError: true,
      strict: 'error',
      displayMode,
      trust: false,
      macros: KATEX_MACROS,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    const snippet = latex.replace(/\s+/g, ' ').slice(0, 140);
    latexErrors.push(`${filePath}:${line} (${origin}) -> ${reason}\n  Extrait: ${snippet}`);
  }
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

function collectMatches(content, regex, handler) {
  let match = regex.exec(content);
  while (match) {
    handler(match);
    match = regex.exec(content);
  }
}

function validateLatexInFile(filePath, content) {
  collectMatches(content, /```latex\s*([\s\S]*?)```/gi, (match) => {
    validateLatexExpression(filePath, match[1], true, 'fenced-latex', lineOf(content, match.index));
  });

  collectMatches(content, /\\\[((?:.|\n)*?)\\\]/g, (match) => {
    validateLatexExpression(filePath, match[1], true, '\\[...\\]', lineOf(content, match.index));
  });

  collectMatches(content, /\\\((.*?)\\\)/g, (match) => {
    validateLatexExpression(filePath, match[1], false, '\\(...\\)', lineOf(content, match.index));
  });

  collectMatches(content, /\$\$([\s\S]*?)\$\$/g, (match) => {
    validateLatexExpression(filePath, match[1], true, '$$...$$', lineOf(content, match.index));
  });

  collectMatches(content, /(^|[^\\])\$([^\n$]+?)\$/gm, (match) => {
    validateLatexExpression(filePath, match[2], false, '$...$', lineOf(content, match.index));
  });

  if (filePath.endsWith('.tex')) {
    collectMatches(content, /\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (match) => {
      const wrapped = `\\begin{aligned}${match[1]}\\end{aligned}`;
      validateLatexExpression(filePath, wrapped, true, 'env:align', lineOf(content, match.index));
    });

    collectMatches(content, /\\begin\{(equation\*?|gather\*?|multline\*?)\}([\s\S]*?)\\end\{\1\}/g, (match) => {
      validateLatexExpression(filePath, match[2], true, `env:${match[1]}`, lineOf(content, match.index));
    });
  }
}

function decodeJsLikeStringLiteral(raw) {
  return raw
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n');
}

function validateLatexInTsxMath(filePath, content) {
  const patterns = [
    { regex: /<Math(?:\s[^>]*)?>\s*\{`([\s\S]*?)`\}\s*<\/Math>/g, origin: '<Math>{`...`}</Math>' },
    { regex: /<Math(?:\s[^>]*)?>\s*\{'([\s\S]*?)'\}\s*<\/Math>/g, origin: '<Math>{\'...\'}</Math>' },
    { regex: /<Math(?:\s[^>]*)?>\s*\{"([\s\S]*?)"\}\s*<\/Math>/g, origin: '<Math>{"..."}</Math>' },
    { regex: /<FormulaBox(?:\s[^>]*)?>\s*\{`([\s\S]*?)`\}\s*<\/FormulaBox>/g, origin: '<FormulaBox>{`...`}</FormulaBox>' },
    { regex: /<FormulaBox(?:\s[^>]*)?>\s*\{'([\s\S]*?)'\}\s*<\/FormulaBox>/g, origin: '<FormulaBox>{\'...\'}</FormulaBox>' },
    { regex: /<FormulaBox(?:\s[^>]*)?>\s*\{"([\s\S]*?)"\}\s*<\/FormulaBox>/g, origin: '<FormulaBox>{"..."}</FormulaBox>' },
  ];

  for (const { regex, origin } of patterns) {
    collectMatches(content, regex, (match) => {
      const expression = decodeJsLikeStringLiteral(match[1]);
      validateLatexExpression(filePath, expression, true, origin, lineOf(content, match.index));
    });
  }
}

function main() {
  const contentFiles = walkContentFiles(CONTENT_ROOT);
  const tsxMathFiles = collectTsxMathFiles(TSX_MATH_ROOTS);

  for (const absPath of contentFiles) {
    const content = fs.readFileSync(absPath, 'utf8');
    const relPath = path.relative(PROJECT_ROOT, absPath);
    validateEncoding(relPath, content);
    validateLatexInFile(relPath, content);
  }

  for (const absPath of tsxMathFiles) {
    const content = fs.readFileSync(absPath, 'utf8');
    const relPath = path.relative(PROJECT_ROOT, absPath).replace(/\\/g, '/');
    validateLatexInTsxMath(relPath, content);
  }

  for (const relPath of ENCODING_ONLY_FILES) {
    const absPath = path.join(PROJECT_ROOT, relPath);
    if (!fs.existsSync(absPath)) continue;
    const content = fs.readFileSync(absPath, 'utf8');
    validateEncoding(relPath, content);
  }

  if (encodingErrors.length > 0 || latexErrors.length > 0) {
    console.error('\nValidation de contenu echouee.\n');

    if (encodingErrors.length > 0) {
      console.error('Problemes UTF-8/mojibake detectes:');
      for (const issue of encodingErrors) {
        console.error(`- ${issue}`);
      }
      console.error('');
    }

    if (latexErrors.length > 0) {
      console.error('Problemes LaTeX detectes:');
      for (const issue of latexErrors) {
        console.error(`- ${issue}`);
      }
      console.error('');
    }

    process.exit(1);
  }

  console.log(
    `Validation OK: ${contentFiles.length} fichiers de contenu et ${tsxMathFiles.length} fichiers TS/TSX controles (LaTeX + UTF-8).`,
  );
}

main();
