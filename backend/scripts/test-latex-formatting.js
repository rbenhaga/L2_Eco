import { AIRouter } from '../ai/core/AIRouter.js';
import geminiProvider from '../ai/providers/GeminiProvider.js';

function assertEqual(actual, expected, label) {
  const actualNormalized = actual.replace(/\r\n/g, '\n');
  const expectedNormalized = expected.replace(/\r\n/g, '\n');
  if (actualNormalized !== expectedNormalized) {
    throw new Error(
      `${label} failed.\nExpected:\n${expectedNormalized}\n\nActual:\n${actualNormalized}`
    );
  }
}

function assert(condition, label) {
  if (!condition) {
    throw new Error(`${label} failed.`);
  }
}

function testBackendNormalization() {
  const router = new AIRouter();

  const inlineInput = 'Variable: \\(\\alpha_i = 0.5\\)';
  const inlineExpected = 'Variable: $\\alpha_i = 0.5$';
  assertEqual(
    router.normalizeMathFormatting(inlineInput),
    inlineExpected,
    'inline delimiter conversion'
  );

  const blockInput = 'Equation:\n\\[\\sum_{i=1}^{n} x_i\\]';
  const blockActual = router.normalizeMathFormatting(blockInput);
  assert(
    /^Equation:\n\n\$\$\n\\sum_\{i=1\}\^\{n\} x_i\n\$\$\n?$/.test(
      blockActual.replace(/\r\n/g, '\n')
    ),
    'block delimiter conversion'
  );

  const fencedInput = '```latex\n\\mu = \\frac{1}{n}\\sum x_i\n```';
  const fencedExpected = '\n$$\n\\mu = \\frac{1}{n}\\sum x_i\n$$\n';
  assertEqual(
    router.normalizeMathFormatting(fencedInput),
    fencedExpected,
    'fenced latex conversion'
  );
}

function testGeminiSystemInjection() {
  const converted = geminiProvider.convertMessagesToGeminiFormat([
    { role: 'system', content: 'Always write math in LaTeX.' },
    { role: 'user', content: 'Explain alpha.' },
    { role: 'assistant', content: 'Alpha is a parameter.' },
    { role: 'user', content: 'Show formula.' }
  ]);

  assert(converted.length === 3, 'gemini message count');
  assert(converted[0].role === 'user', 'first role is user');
  assert(
    converted[0].parts[0].text.includes('[INSTRUCTIONS SYSTÈME]') &&
      converted[0].parts[0].text.includes('Always write math in LaTeX.') &&
      converted[0].parts[0].text.includes('Explain alpha.'),
    'system instructions injected in first user message'
  );
  assert(converted[1].role === 'model', 'assistant role converted to model');
  assert(
    converted[1].parts[0].text === 'Alpha is a parameter.',
    'assistant content preserved'
  );
  assert(
    converted[2].parts[0].text === 'Show formula.',
    'later user message preserved'
  );
}

function run() {
  testBackendNormalization();
  testGeminiSystemInjection();
  console.log('All LaTeX/chat formatting tests passed.');
}

run();

