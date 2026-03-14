import type { OikoSectionVisual } from '../services/oikoNews';

export function getFallbackVisualLabel(sectionKey?: string) {
  switch (sectionKey) {
    case 'header_visual':
      return 'Angle du jour';
    case 'lead_story':
      return 'Point de march\u00e9';
    case 'radar_section':
      return 'Signal sous surveillance';
    case 'carnet_section':
      return 'Ligne de force';
    default:
      return 'Rep\u00e8re visuel';
  }
}

export function shouldRenderEditorialFallbackCard(visual?: OikoSectionVisual | null, hidden = false) {
  if (!visual) return false;
  const hasEditorialCopy = Boolean(visual.alt_text || visual.section_key || visual.credit_line);
  return hasEditorialCopy && (hidden || !visual.image_url || visual.provider === 'oiko-fallback');
}
