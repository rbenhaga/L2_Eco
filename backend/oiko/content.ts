import { z } from 'zod';

export const RichTextPartSchema = z.object({
  text: z.string().min(1),
  href: z.string().url().optional(),
});

export const RichTextBlockSchema = z.object({
  parts: z.array(RichTextPartSchema).min(1),
});

export const SectionVisualSchema = z.object({
  section_key: z.string().min(1),
  asset_type: z.string().min(1),
  image_url: z.string().url(),
  alt_text: z.string().min(8),
  credit_line: z.string().min(1),
  provider: z.string().min(1),
  source_url: z.string().url().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const MenuItemSchema = z.object({
  label: z.string().min(2),
  parts: z.array(RichTextPartSchema).min(1),
});

export const LabeledParagraphSchema = z.object({
  label: z.enum(['Marchés', 'Change', 'Valeur', 'Crypto']),
  parts: z.array(RichTextPartSchema).min(1),
});

export const RadarItemSchema = z.object({
  title: z.string().min(4),
  paragraphs: z.array(RichTextBlockSchema).min(1).max(2),
});

export const CarnetItemSchema = z.object({
  title: z.string().min(4),
  paragraphs: z.array(RichTextBlockSchema).min(1).max(2),
});

export const BriefItemSchema = z.object({
  parts: z.array(RichTextPartSchema).min(1),
});

export const GeneratedSectionVisualHintSchema = z.object({
  alt_text: z.string().min(8),
  geo_hint: z.string().min(0).max(120).default(''),
  entity_hint: z.string().min(0).max(120).default(''),
  image_style_hint: z.enum(['sobriety', 'documentary', 'business', 'innovation']).default('business'),
});

const OpeningBriefTitleSchema = z.string().trim().min(3);

export const GeneratedOikoEditionV21Schema = z.object({
  content_version: z.literal('v2.1'),
  email_subject: z.string().min(5),
  preview_text: z.string().min(20).max(160),
  date_label: z.string().min(5),
  header_visual: GeneratedSectionVisualHintSchema.nullable().optional(),
  intro: z.object({
    paragraphs: z.array(RichTextBlockSchema).min(2).max(2),
    signature: z.string().min(2).optional(),
  }),
  opening_brief: z.object({
    title: OpeningBriefTitleSchema,
    items: z.array(MenuItemSchema).min(2).max(5),
  }),
  markets_section: z.object({
    title: z.string().min(3).max(40),
    charts: z.array(z.object({
      key: z.enum(['actions', 'crypto']),
      title: z.string().min(3),
      image_url: z.string().min(0),
      alt_text: z.string().min(8),
    })).length(2),
    paragraphs: z.array(LabeledParagraphSchema).length(3),
  }),
  lead_story: z.object({
    kicker: z.string().min(2).max(40),
    title: z.string().min(8),
    visual_hint: GeneratedSectionVisualHintSchema.nullable().optional(),
    paragraphs: z.array(RichTextBlockSchema).min(5).max(8),
    signature: z.string().min(2).optional(),
  }),
  radar_section: z.object({
    title: z.string().min(3),
    visual_hint: GeneratedSectionVisualHintSchema.nullable().optional(),
    items: z.array(RadarItemSchema).min(0).max(4),
  }),
  carnet_section: z.object({
    title: z.string().min(3),
    visual_hint: GeneratedSectionVisualHintSchema.nullable().optional(),
    items: z.array(CarnetItemSchema).min(0).max(3),
  }),
  briefs_section: z.object({
    title: z.string().min(3),
    items: z.array(BriefItemSchema).min(0).max(5),
  }),
  footer_sources_note: RichTextBlockSchema,
  footer_disclaimer: z.string().min(10),
});

export const OikoEditionV21Schema = z.object({
  content_version: z.literal('v2.1'),
  email_subject: z.string().min(5),
  preview_text: z.string().min(20).max(160),
  date_label: z.string().min(5),
  header_visual: SectionVisualSchema.nullable().optional(),
  intro: z.object({
    paragraphs: z.array(RichTextBlockSchema).min(2).max(2),
    signature: z.string().min(2).optional(),
  }),
  opening_brief: z.object({
    title: OpeningBriefTitleSchema,
    items: z.array(MenuItemSchema).min(2).max(5),
  }),
  markets_section: z.object({
    title: z.string().min(3).max(40),
    charts: z.array(z.object({
      key: z.enum(['actions', 'crypto']),
      title: z.string().min(3),
      image_url: z.union([z.string().url(), z.literal('')]),
      alt_text: z.string().min(8),
    })).length(2),
    paragraphs: z.array(LabeledParagraphSchema).length(3),
  }),
  lead_story: z.object({
    kicker: z.string().min(2).max(40),
    title: z.string().min(8),
    visual: SectionVisualSchema.nullable().optional(),
    paragraphs: z.array(RichTextBlockSchema).min(5).max(8),
    signature: z.string().min(2).optional(),
  }),
  radar_section: z.object({
    title: z.string().min(3),
    visual: SectionVisualSchema.nullable().optional(),
    items: z.array(RadarItemSchema).min(0).max(4),
  }),
  carnet_section: z.object({
    title: z.string().min(3),
    visual: SectionVisualSchema.nullable().optional(),
    items: z.array(CarnetItemSchema).min(0).max(3),
  }),
  briefs_section: z.object({
    title: z.string().min(3),
    items: z.array(BriefItemSchema).min(0).max(5),
  }),
  footer_sources_note: RichTextBlockSchema,
  footer_disclaimer: z.string().min(10),
});

export type RichTextPart = z.infer<typeof RichTextPartSchema>;
export type RichTextBlock = z.infer<typeof RichTextBlockSchema>;
export type GeneratedOikoEditionV21 = z.infer<typeof GeneratedOikoEditionV21Schema>;
export type OikoEditionV21 = z.infer<typeof OikoEditionV21Schema>;

export function partsToPlainText(parts: RichTextPart[] = []) {
  return parts.map((part) => String(part.text || '')).join('').trim();
}

export function blockToPlainText(block?: RichTextBlock | null) {
  if (!block?.parts?.length) return '';
  return partsToPlainText(block.parts);
}

export function textToParts(text: string, href?: string) {
  const clean = String(text || '').trim();
  if (!clean) {
    return [{ text: '' }];
  }
  return [{ text: clean, ...(href ? { href } : {}) }];
}

export function textToBlock(text: string, href?: string): RichTextBlock {
  return { parts: textToParts(text, href) };
}

export function compactParts(parts: RichTextPart[] = []) {
  return parts.filter((part) => String(part?.text || '').length > 0);
}
