import assert from 'node:assert/strict';

import { getFallbackVisualLabel, shouldRenderEditorialFallbackCard } from '../src/pages/oikoEditionVisuals.ts';

assert.equal(getFallbackVisualLabel('header_visual'), 'Angle du jour');
assert.equal(getFallbackVisualLabel('lead_story'), 'Point de marché');
assert.equal(getFallbackVisualLabel('lead_story').includes('HEADER VISUAL'), false);
assert.equal(getFallbackVisualLabel('lead_story').includes('LEAD STORY'), false);

assert.equal(
  shouldRenderEditorialFallbackCard({
    section_key: 'header_visual',
    asset_type: 'header',
    image_url: 'http://localhost:3001/static/oiko-news/images/2026-03-09/header_visual-fallback.png',
    alt_text: 'Carte éditoriale pour le numéro du jour',
    credit_line: 'Carte éditoriale Oiko News',
    provider: 'oiko-fallback',
  }),
  true,
);

assert.equal(
  shouldRenderEditorialFallbackCard({
    section_key: 'header_visual',
    asset_type: 'header',
    image_url: 'https://commons.wikimedia.org/wiki/File:real.jpg',
    alt_text: 'Photo sourcée',
    credit_line: 'Crédit : Wikimedia Commons',
    provider: 'wikimedia',
  }),
  false,
);

console.log('Oiko visual rendering checks passed');
