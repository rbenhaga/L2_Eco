export function sanitizeLatexInput(input: string): string {
  if (!input) return input;

  const accentMap: Record<string, string> = {
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'à': 'a', 'â': 'a', 'ä': 'a',
    'ù': 'u', 'û': 'u', 'ü': 'u',
    'î': 'i', 'ï': 'i',
    'ô': 'o', 'ö': 'o',
    'ç': 'c', 'œ': 'oe',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
    'À': 'A', 'Â': 'A', 'Ä': 'A',
    'Ù': 'U', 'Û': 'U', 'Ü': 'U',
    'Î': 'I', 'Ï': 'I',
    'Ô': 'O', 'Ö': 'O',
    'Ç': 'C', 'Œ': 'OE',
  };

  return input
    // KaTeX strict mode: unescaped '%' is treated as a comment.
    .replace(/(^|[^\\])%/g, '$1\\%')
    // Avoid strict unicode errors in math mode by transliterating accents.
    .replace(/[éèêëàâäùûüîïôöçœÉÈÊËÀÂÄÙÛÜÎÏÔÖÇŒ]/g, (ch) => accentMap[ch] ?? ch)
    .replace(/\\euro/g, '\\mathrm{EUR}')
    .replace(/\u20AC/g, '\\mathrm{EUR}')
    .replace(/\\\$/g, '\\mathrm{USD}')
    .replace(/\$/g, '\\mathrm{USD}');
}
