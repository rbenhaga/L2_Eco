import fs from 'fs';
import path from 'path';
import { Chart, registerables } from 'chart.js';
import { Canvas } from 'skia-canvas';
import OIKO_CONFIG from './config.ts';
import { resolveEditionAssets } from './assets.ts';
import { OikoEditionV21Schema, blockToPlainText, partsToPlainText } from './content.ts';
import { ensureDir, htmlEscape, toAbsoluteUrl } from './utils.ts';

Chart.register(...registerables);

async function renderLineChart(filePath: string, title: string, labels: string[], values: number[], color: string) {
  const canvas = new Canvas(1200, 630);
  const chart = new Chart(canvas as any, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          borderColor: color,
          backgroundColor: `${color}22`,
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointRadius: 2,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          color: '#1f2937',
          font: { size: 28, weight: 600 },
          padding: { top: 16, bottom: 20 },
        },
      },
      scales: {
        x: { grid: { color: '#e5e7eb' }, ticks: { color: '#4b5563' } },
        y: { grid: { color: '#e5e7eb' }, ticks: { color: '#4b5563' } },
      },
    },
  });

  const buffer = await canvas.toBuffer('png');
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, buffer);
  chart.destroy();
}

export async function renderEditionAssets({ editionDate, marketSnapshot }: { editionDate: string; marketSnapshot: any }) {
  const chartDir = path.join(OIKO_CONFIG.chartsDir, editionDate);
  ensureDir(chartDir);

  const manifest: Array<{ key: string; fileName: string; filePath: string; url: string }> = [];
  const chartConfig: Record<string, { color: string; title: string }> = {
    actions: { color: '#0f766e', title: 'Bourse' },
    crypto: { color: '#d97706', title: 'Crypto' },
  };

  for (const key of ['actions', 'crypto']) {
    const items = marketSnapshot.chartCandidates?.[key] || [];
    if (!Array.isArray(items) || items.length === 0) continue;
    const source = items[0];
    const labels = source.labels || [];
    const points = source.points || [];
    if (!labels.length || !points.length) continue;

    const fileName = `${key}.png`;
    const filePath = path.join(chartDir, fileName);
    await renderLineChart(filePath, source.label || chartConfig[key].title, labels, points, chartConfig[key].color);
    manifest.push({
      key,
      fileName,
      filePath,
      url: toAbsoluteUrl(OIKO_CONFIG.publicBaseUrl, `/static/oiko-news/charts/${editionDate}/${fileName}`),
    });
  }

  return manifest;
}

function renderPartsHtml(parts: Array<{ text: string; href?: string }>, linkStyle = 'color:#111827;text-decoration:underline;text-underline-offset:0.15em;') {
  return parts
    .map((part) => {
      const text = htmlEscape(part.text);
      if (!part.href) return text;
      return `<a href="${htmlEscape(part.href)}" style="${linkStyle}">${text}</a>`;
    })
    .join('');
}

function renderSectionImage(image: any, width = 560) {
  if (!image?.image_url) return '';
  return `
    <tr>
      <td style="padding:0 0 16px;">
        <img src="${htmlEscape(image.image_url)}" alt="${htmlEscape(image.alt_text)}" width="${width}" style="display:block;width:100%;max-width:${width}px;height:auto;border:0;border-radius:18px;" />
      </td>
    </tr>
    ${image.credit_line ? `<tr><td style="padding:0 0 12px;font-size:12px;line-height:1.5;color:#6b7280;">${htmlEscape(image.credit_line)}</td></tr>` : ''}`;
}

function renderDivider() {
  return '<tr><td style="padding:20px 0;border-bottom:1px solid #e5e7eb;font-size:0;line-height:0;">&nbsp;</td></tr>';
}

function renderChartRow(charts: Array<{ key: string; image_url: string; alt_text: string }>) {
  const usableCharts = charts.filter((chart) => chart.image_url);
  if (!usableCharts.length) return '';

  const cells = usableCharts
    .map((chart, index) => {
      const pad = index === 0 && usableCharts.length > 1 ? '0 8px 0 0' : index === usableCharts.length - 1 ? '0 0 0 8px' : '0';
      return `<td valign="top" width="${Math.floor(100 / usableCharts.length)}%" style="padding:${pad};"><img src="${htmlEscape(chart.image_url)}" alt="${htmlEscape(chart.alt_text)}" width="260" style="display:block;width:100%;max-width:260px;height:auto;border:0;border-radius:16px;" /></td>`;
    })
    .join('');

  return `
    <tr>
      <td style="padding:0 24px 14px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>${cells}</tr>
        </table>
      </td>
    </tr>`;
}

export function renderEditionHtml({ payload, unsubscribeUrl }: { payload: any; unsubscribeUrl?: string | null }) {
  const openingHtml = payload.opening_brief.items
    .map((item: any) => `<tr><td style="padding:0 0 8px;font-size:15px;line-height:1.6;color:#1f2937;"><strong>${htmlEscape(item.label)} :</strong> ${renderPartsHtml(item.parts, 'color:#374151;text-decoration:none;')}</td></tr>`)
    .join('');

  const radarHtml = payload.radar_section.items
    .map(
      (item: any) => `
        <tr><td style="padding:0 0 10px;font-size:22px;line-height:1.3;color:#111827;font-weight:700;">${htmlEscape(item.title)}</td></tr>
        ${item.paragraphs.map((paragraph: any) => `<tr><td style="padding:0 0 12px;font-size:15px;line-height:1.78;color:#374151;">${renderPartsHtml(paragraph.parts)}</td></tr>`).join('')}`,
    )
    .join('<tr><td style="padding:10px 0 2px;"></td></tr>');

  const carnetHtml = payload.carnet_section.items
    .map(
      (item: any) => `
        <tr><td style="padding:0 0 8px;font-size:20px;line-height:1.3;color:#111827;font-weight:700;">${htmlEscape(item.title)}</td></tr>
        ${item.paragraphs.map((paragraph: any) => `<tr><td style="padding:0 0 12px;font-size:15px;line-height:1.78;color:#374151;">${renderPartsHtml(paragraph.parts)}</td></tr>`).join('')}`,
    )
    .join('<tr><td style="padding:8px 0 0;"></td></tr>');

  const briefsHtml = payload.briefs_section.items
    .map((item: any) => `<tr><td style="padding:0 0 8px;font-size:15px;line-height:1.65;color:#374151;">&bull; ${renderPartsHtml(item.parts)}</td></tr>`)
    .join('');

  const radarSectionHtml = payload.radar_section.items.length ? `
            ${renderDivider()}
            <tr><td style="padding:18px 24px 14px;font-size:24px;line-height:1.2;color:#111827;font-weight:700;">${htmlEscape(payload.radar_section.title)}</td></tr>
            ${renderSectionImage(payload.radar_section.visual, 552)}
            ${radarHtml}` : '';

  const carnetSectionHtml = payload.carnet_section.items.length ? `
            ${renderDivider()}
            <tr><td style="padding:18px 24px 14px;font-size:24px;line-height:1.2;color:#111827;font-weight:700;">${htmlEscape(payload.carnet_section.title)}</td></tr>
            ${renderSectionImage(payload.carnet_section.visual, 552)}
            ${carnetHtml}` : '';

  const briefsSectionHtml = payload.briefs_section.items.length ? `
            ${renderDivider()}
            <tr><td style="padding:18px 24px 14px;font-size:24px;line-height:1.2;color:#111827;font-weight:700;">${htmlEscape(payload.briefs_section.title)}</td></tr>
            ${briefsHtml}` : '';

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:0;background:#eef2f7;color:#111827;font-family:Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${htmlEscape(payload.preview_text)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#eef2f7;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 24px 12px;font-size:13px;line-height:1.4;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;">${htmlEscape(payload.date_label)}</td>
            </tr>
            ${renderSectionImage(payload.header_visual, 552)}
            ${payload.intro.paragraphs.map((paragraph: any) => `<tr><td style="padding:0 24px 12px;font-size:16px;line-height:1.82;color:#374151;">${renderPartsHtml(paragraph.parts)}</td></tr>`).join('')}
            ${payload.intro.signature ? `<tr><td style="padding:0 24px 8px;font-size:14px;line-height:1.5;color:#6b7280;">${htmlEscape(payload.intro.signature)}</td></tr>` : ''}
            ${renderDivider()}
            <tr><td style="padding:18px 24px 12px;font-size:24px;line-height:1.2;color:#111827;font-weight:700;">${htmlEscape(payload.opening_brief.title)}</td></tr>
            ${openingHtml}
            ${renderDivider()}
            <tr><td style="padding:18px 24px 12px;font-size:24px;line-height:1.2;color:#111827;font-weight:700;">${htmlEscape(payload.markets_section.title)}</td></tr>
            ${renderChartRow(payload.markets_section.charts)}
            ${payload.markets_section.paragraphs.map((paragraph: any) => `<tr><td style="padding:0 24px 12px;font-size:15px;line-height:1.78;color:#374151;"><strong>${htmlEscape(paragraph.label)} :</strong> ${renderPartsHtml(paragraph.parts)}</td></tr>`).join('')}
            ${renderDivider()}
            <tr><td style="padding:18px 24px 8px;font-size:13px;line-height:1.4;color:#6b7280;text-transform:uppercase;letter-spacing:0.12em;">${htmlEscape(payload.lead_story.kicker)}</td></tr>
            <tr><td style="padding:0 24px 14px;font-size:30px;line-height:1.15;color:#111827;font-weight:700;">${htmlEscape(payload.lead_story.title)}</td></tr>
            ${renderSectionImage(payload.lead_story.visual, 552)}
            ${payload.lead_story.paragraphs.map((paragraph: any) => `<tr><td style="padding:0 24px 12px;font-size:15px;line-height:1.82;color:#374151;">${renderPartsHtml(paragraph.parts)}</td></tr>`).join('')}
            ${payload.lead_story.signature ? `<tr><td style="padding:0 24px 10px;font-size:14px;line-height:1.5;color:#6b7280;">${htmlEscape(payload.lead_story.signature)}</td></tr>` : ''}
            ${radarSectionHtml}
            ${carnetSectionHtml}
            ${briefsSectionHtml}
            ${renderDivider()}
            <tr><td style="padding:18px 24px 10px;font-size:13px;line-height:1.75;color:#6b7280;">${renderPartsHtml(payload.footer_sources_note.parts, 'color:#374151;text-decoration:underline;')}</td></tr>
            <tr><td style="padding:0 24px 10px;font-size:12px;line-height:1.7;color:#6b7280;">${htmlEscape(payload.footer_disclaimer)}</td></tr>
            ${unsubscribeUrl ? `<tr><td style="padding:0 24px 24px;font-size:12px;line-height:1.7;color:#6b7280;">Se désabonner : <a href="${htmlEscape(unsubscribeUrl)}" style="color:#374151;text-decoration:underline;">${htmlEscape(unsubscribeUrl)}</a></td></tr>` : '<tr><td style="padding:0 24px 24px;"></td></tr>'}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderEditionText({ payload, unsubscribeUrl }: { payload: any; unsubscribeUrl?: string | null }) {
  return [
    payload.date_label,
    '',
    ...payload.intro.paragraphs.map((paragraph: any) => blockToPlainText(paragraph)),
    payload.intro.signature || '',
    '',
    payload.opening_brief.title,
    ...payload.opening_brief.items.map((item: any) => `- ${item.label}: ${partsToPlainText(item.parts)}`),
    '',
    payload.markets_section.title,
    ...payload.markets_section.paragraphs.map((paragraph: any) => `${paragraph.label}: ${partsToPlainText(paragraph.parts)}`),
    '',
    payload.lead_story.kicker,
    payload.lead_story.title,
    ...payload.lead_story.paragraphs.map((paragraph: any) => blockToPlainText(paragraph)),
    payload.lead_story.signature || '',
    '',
    ...(payload.radar_section.items.length ? [payload.radar_section.title, ...payload.radar_section.items.flatMap((item: any) => [item.title, ...item.paragraphs.map((paragraph: any) => blockToPlainText(paragraph)), ''])] : []),
    ...(payload.carnet_section.items.length ? [payload.carnet_section.title, ...payload.carnet_section.items.flatMap((item: any) => [item.title, ...item.paragraphs.map((paragraph: any) => blockToPlainText(paragraph)), ''])] : []),
    ...(payload.briefs_section.items.length ? [payload.briefs_section.title, ...payload.briefs_section.items.map((item: any) => `- ${partsToPlainText(item.parts)}`)] : []),
    '',
    blockToPlainText(payload.footer_sources_note),
    payload.footer_disclaimer,
    unsubscribeUrl ? `Se désabonner : ${unsubscribeUrl}` : '',
  ].join('\n');
}

export async function renderEditionBundle({ editionDate, payload, marketSnapshot, context }: { editionDate: string; payload: any; marketSnapshot: any; context: any }) {
  const chartManifest = await renderEditionAssets({ editionDate, marketSnapshot });
  const chartMap = new Map(chartManifest.map((item) => [item.key, item.url]));
  const imageAssets = await resolveEditionAssets({ editionDate, payload, context });
  const resolvedVisuals = imageAssets.map((item) => ({ ...item, image_url: item.stored_url }));
  const imageMap = new Map(resolvedVisuals.map((item) => [item.section_key, item]));

  const preliminaryPayload = {
    ...payload,
    header_visual: imageMap.get('header_visual') || null,
    markets_section: {
      ...payload.markets_section,
      charts: payload.markets_section.charts.map((chart: any) => ({
        ...chart,
        image_url: chartMap.get(chart.key) || chart.image_url,
      })),
    },
    lead_story: {
      ...payload.lead_story,
      visual: imageMap.get('lead_story') || null,
    },
    radar_section: {
      ...payload.radar_section,
      visual: imageMap.get('radar_section') || null,
    },
    carnet_section: {
      ...payload.carnet_section,
      visual: imageMap.get('carnet_section') || null,
    },
  };

  const finalPayload = OikoEditionV21Schema.parse(preliminaryPayload);

  return {
    payload: finalPayload,
    html: renderEditionHtml({ payload: finalPayload }),
    text: renderEditionText({ payload: finalPayload }),
    chartManifest,
    assets: imageAssets,
  };
}

export default {
  renderEditionAssets,
  renderEditionHtml,
  renderEditionText,
  renderEditionBundle,
};
