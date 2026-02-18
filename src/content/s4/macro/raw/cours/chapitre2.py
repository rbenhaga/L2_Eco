#!/usr/bin/env python3
"""
Génération du PDF - Chapitre 2 : L'équilibre macroéconomique en économie ouverte
Le modèle Mundell-Fleming
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
import numpy as np
import os
import io

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import (
    HexColor, black, white, Color
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Image, KeepTogether, ListFlowable, ListItem,
    Flowable, Frame, NextPageTemplate, PageTemplate, BaseDocTemplate
)
from reportlab.pdfgen import canvas
from reportlab.lib.fonts import addMapping
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Colors ──────────────────────────────────────────────────────────
DARK_BLUE = HexColor("#1a365d")
MEDIUM_BLUE = HexColor("#2b6cb0")
LIGHT_BLUE = HexColor("#bee3f8")
VERY_LIGHT_BLUE = HexColor("#ebf8ff")
ACCENT_ORANGE = HexColor("#dd6b20")
ACCENT_GREEN = HexColor("#276749")
LIGHT_GREEN = HexColor("#c6f6d5")
LIGHT_ORANGE = HexColor("#feebc8")
LIGHT_RED = HexColor("#fed7d7")
GRAY_BG = HexColor("#f7fafc")
GRAY_TEXT = HexColor("#4a5568")
GRAY_BORDER = HexColor("#e2e8f0")
DARK_RED = HexColor("#c53030")
DARK_GREEN = HexColor("#2f855a")

# ── Page dimensions ─────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
MARGIN_LEFT = 2.2 * cm
MARGIN_RIGHT = 2.2 * cm
MARGIN_TOP = 2.5 * cm
MARGIN_BOTTOM = 2.5 * cm
CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT

# ── Graph output dir ────────────────────────────────────────────────
GRAPH_DIR = "/home/claude/graphs"
os.makedirs(GRAPH_DIR, exist_ok=True)

# ── Styles ──────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

# Override base
styles['Normal'].fontSize = 10.5
styles['Normal'].leading = 14
styles['Normal'].textColor = HexColor("#2d3748")
styles['Normal'].alignment = TA_JUSTIFY
styles['Normal'].spaceAfter = 4

# Title style (chapter)
styles.add(ParagraphStyle(
    'ChapterTitle',
    parent=styles['Normal'],
    fontSize=26,
    leading=32,
    textColor=DARK_BLUE,
    alignment=TA_LEFT,
    spaceAfter=6,
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    'ChapterSubtitle',
    parent=styles['Normal'],
    fontSize=16,
    leading=20,
    textColor=MEDIUM_BLUE,
    alignment=TA_LEFT,
    spaceAfter=20,
    fontName='Helvetica',
))

styles.add(ParagraphStyle(
    'SectionTitle',
    parent=styles['Normal'],
    fontSize=18,
    leading=24,
    textColor=DARK_BLUE,
    alignment=TA_LEFT,
    spaceBefore=20,
    spaceAfter=10,
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    'SubSectionTitle',
    parent=styles['Normal'],
    fontSize=14,
    leading=18,
    textColor=MEDIUM_BLUE,
    alignment=TA_LEFT,
    spaceBefore=14,
    spaceAfter=6,
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    'SubSubSection',
    parent=styles['Normal'],
    fontSize=12,
    leading=16,
    textColor=HexColor("#2b6cb0"),
    alignment=TA_LEFT,
    spaceBefore=10,
    spaceAfter=4,
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    'BodyText2',
    parent=styles['Normal'],
    fontSize=10.5,
    leading=14.5,
    textColor=HexColor("#2d3748"),
    alignment=TA_JUSTIFY,
    spaceAfter=6,
))

styles.add(ParagraphStyle(
    'Formula',
    parent=styles['Normal'],
    fontSize=12,
    leading=18,
    textColor=DARK_BLUE,
    alignment=TA_CENTER,
    spaceBefore=8,
    spaceAfter=8,
    fontName='Helvetica-Bold',
))

styles.add(ParagraphStyle(
    'BoxTitle',
    parent=styles['Normal'],
    fontSize=11,
    leading=14,
    textColor=white,
    fontName='Helvetica-Bold',
    spaceBefore=0,
    spaceAfter=0,
))

styles.add(ParagraphStyle(
    'BoxBody',
    parent=styles['Normal'],
    fontSize=10,
    leading=14,
    textColor=HexColor("#2d3748"),
    alignment=TA_JUSTIFY,
    spaceAfter=2,
))

styles.add(ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontSize=10.5,
    leading=14,
    leftIndent=18,
    bulletIndent=6,
    spaceAfter=3,
))

styles.add(ParagraphStyle(
    'TableHeader',
    parent=styles['Normal'],
    fontSize=10,
    leading=13,
    textColor=white,
    fontName='Helvetica-Bold',
    alignment=TA_CENTER,
))

styles.add(ParagraphStyle(
    'TableCell',
    parent=styles['Normal'],
    fontSize=9.5,
    leading=12.5,
    textColor=HexColor("#2d3748"),
    alignment=TA_CENTER,
))

styles.add(ParagraphStyle(
    'Footer',
    parent=styles['Normal'],
    fontSize=8,
    leading=10,
    textColor=GRAY_TEXT,
    alignment=TA_CENTER,
))

styles.add(ParagraphStyle(
    'Caption',
    parent=styles['Normal'],
    fontSize=9,
    leading=12,
    textColor=GRAY_TEXT,
    alignment=TA_CENTER,
    spaceBefore=2,
    spaceAfter=8,
    fontName='Helvetica-Oblique',
))

# ── Custom Flowables ────────────────────────────────────────────────
class ColoredBox(Flowable):
    """A colored box with optional title bar and body text."""
    def __init__(self, title, body_elements, width=None,
                 title_bg=MEDIUM_BLUE, body_bg=VERY_LIGHT_BLUE,
                 border_color=MEDIUM_BLUE, title_color=white):
        Flowable.__init__(self)
        self.title = title
        self.body_elements = body_elements
        self.box_width = width or CONTENT_W
        self.title_bg = title_bg
        self.body_bg = body_bg
        self.border_color = border_color
        self.title_color = title_color
        self._fixed_height = None

    def wrap(self, availWidth, availHeight):
        self.box_width = min(self.box_width, availWidth)
        inner_w = self.box_width - 20
        h = 0
        if self.title:
            h += 26
        for elem in self.body_elements:
            ew, eh = elem.wrap(inner_w, availHeight)
            h += eh + 2
        h += 16
        self._fixed_height = h
        return (self.box_width, h)

    def draw(self):
        c = self.canv
        w = self.box_width
        h = self._fixed_height

        # Border
        c.setStrokeColor(self.border_color)
        c.setLineWidth(1)
        c.setFillColor(self.body_bg)
        c.roundRect(0, 0, w, h, 6, stroke=1, fill=1)

        y = h
        # Title bar
        if self.title:
            c.setFillColor(self.title_bg)
            c.roundRect(0, h - 26, w, 26, 6, stroke=0, fill=1)
            c.rect(0, h - 26, w, 13, stroke=0, fill=1)
            c.setFillColor(self.title_color)
            c.setFont("Helvetica-Bold", 11)
            c.drawString(10, h - 18, self.title)
            y = h - 32

        # Body
        inner_w = w - 20
        for elem in self.body_elements:
            ew, eh = elem.wrap(inner_w, 1000)
            y -= eh
            elem.drawOn(c, 10, y)
            y -= 2


class HorizontalLine(Flowable):
    def __init__(self, width=None, color=GRAY_BORDER, thickness=1):
        Flowable.__init__(self)
        self.line_width = width or CONTENT_W
        self.color = color
        self.thickness = thickness

    def wrap(self, availWidth, availHeight):
        return (min(self.line_width, availWidth), self.thickness + 4)

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 2, self.line_width, 2)


# ── Graph generation functions ──────────────────────────────────────
def set_graph_style():
    """Configure matplotlib for consistent styling."""
    plt.rcParams.update({
        'font.family': 'sans-serif',
        'font.size': 11,
        'axes.labelsize': 13,
        'axes.titlesize': 14,
        'axes.spines.top': False,
        'axes.spines.right': False,
        'figure.facecolor': 'white',
        'axes.facecolor': 'white',
        'axes.grid': False,
    })

set_graph_style()


def save_fig(fig, name, dpi=180):
    path = os.path.join(GRAPH_DIR, f"{name}.png")
    fig.savefig(path, dpi=dpi, bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close(fig)
    return path


def graph_j_curve():
    fig, ax = plt.subplots(figsize=(7, 4))
    t = np.linspace(0, 10, 300)
    nx = np.where(t < 1, 0, -1.2 * np.exp(-0.8 * (t - 1)) + 1.5 * (1 - np.exp(-0.5 * (t - 1))))
    nx = np.where(t < 1, -0.3 * t, nx)
    # Smooth
    nx[0] = 0
    ax.plot(t, nx, color='#2b6cb0', linewidth=2.5)
    ax.axhline(0, color='gray', linewidth=0.8, linestyle='--')
    ax.axvline(1, color='#dd6b20', linewidth=1.2, linestyle=':', label='Dépréciation')
    ax.fill_between(t, nx, 0, where=(nx < 0), alpha=0.15, color='#c53030')
    ax.fill_between(t, nx, 0, where=(nx > 0), alpha=0.15, color='#276749')
    ax.annotate('Dépréciation', xy=(1, 0), xytext=(1.5, -0.25),
                fontsize=10, color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.annotate('Phase 1 :\nEffet prix\n(dégradation)', xy=(0.5, -0.15), xytext=(0.1, -0.35),
                fontsize=9, color='#c53030', ha='center')
    ax.annotate('Phase 2 :\nEffet volume\n(amélioration)', xy=(6, 0.6), xytext=(6.5, 0.8),
                fontsize=9, color='#276749', ha='center')
    ax.set_xlabel('Temps (t)', fontsize=12)
    ax.set_ylabel('Solde commercial (NX)', fontsize=12)
    ax.set_title('La courbe en J', fontsize=14, fontweight='bold', color='#1a365d')
    ax.set_xlim(-0.2, 10)
    ax.set_xticks([])
    ax.set_yticks([])
    fig.tight_layout()
    return save_fig(fig, 'j_curve')


def graph_ptinc_basic():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    i_vals = np.linspace(-0.02, 0.08, 100)
    i_star = 0.03
    E_e = 1.10
    E_vals = E_e * (1 + i_vals) / (1 + i_star)
    ax.plot(i_vals * 100, E_vals, color='#2b6cb0', linewidth=2.5, label='PTINC')
    ax.plot(i_star * 100, E_e, 'o', color='#dd6b20', markersize=8, zorder=5)
    ax.annotate(f'(i* = {i_star*100:.0f}%, E$^e$ = {E_e:.2f})',
                xy=(i_star * 100, E_e), xytext=(i_star * 100 + 1.5, E_e - 0.02),
                fontsize=10, color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.axhline(E_e, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
    ax.axvline(i_star * 100, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
    ax.set_xlabel('Taux d\'intérêt national i (%)', fontsize=12)
    ax.set_ylabel('Taux de change E ($/€)', fontsize=12)
    ax.set_title('Courbe PTINC dans le repère (i, E)', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(loc='lower right', fontsize=10)
    fig.tight_layout()
    return save_fig(fig, 'ptinc_basic')


def graph_ptinc_i_increase():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    i_vals = np.linspace(-0.02, 0.08, 100)
    i_star = 0.03
    E_e = 1.10
    E_vals = E_e * (1 + i_vals) / (1 + i_star)
    ax.plot(i_vals * 100, E_vals, color='#2b6cb0', linewidth=2.5, label='PTINC')

    i0 = 0.02
    i1 = 0.05
    E0 = E_e * (1 + i0) / (1 + i_star)
    E1 = E_e * (1 + i1) / (1 + i_star)

    ax.plot(i0 * 100, E0, 'o', color='#276749', markersize=8, zorder=5)
    ax.plot(i1 * 100, E1, 'o', color='#c53030', markersize=8, zorder=5)
    ax.annotate('', xy=(i1 * 100, E1), xytext=(i0 * 100, E0),
                arrowprops=dict(arrowstyle='->', color='#dd6b20', lw=2))
    ax.annotate(f'E₀ = {E0:.3f}', xy=(i0 * 100, E0), xytext=(i0 * 100 - 1.5, E0 + 0.01),
                fontsize=9, color='#276749')
    ax.annotate(f'E₁ = {E1:.3f}', xy=(i1 * 100, E1), xytext=(i1 * 100 + 0.3, E1 - 0.015),
                fontsize=9, color='#c53030')
    ax.annotate('i↑ → E↑\n(Appréciation)', xy=((i0+i1)/2*100, (E0+E1)/2),
                xytext=((i0+i1)/2*100 - 3, (E0+E1)/2 + 0.01),
                fontsize=10, color='#dd6b20', fontweight='bold')
    ax.set_xlabel('Taux d\'intérêt i (%)', fontsize=12)
    ax.set_ylabel('Taux de change E', fontsize=12)
    ax.set_title('Hausse de i → Appréciation de E', fontsize=14, fontweight='bold', color='#1a365d')
    fig.tight_layout()
    return save_fig(fig, 'ptinc_i_increase')


def graph_ptinc_Ee_shift():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    i_vals = np.linspace(-0.02, 0.08, 100)
    i_star = 0.03
    E_e0 = 1.05
    E_e1 = 1.15

    E_vals0 = E_e0 * (1 + i_vals) / (1 + i_star)
    E_vals1 = E_e1 * (1 + i_vals) / (1 + i_star)

    ax.plot(i_vals * 100, E_vals0, color='#2b6cb0', linewidth=2, label='PTINC₀ (E$^e$ = 1.05)')
    ax.plot(i_vals * 100, E_vals1, color='#c53030', linewidth=2, linestyle='--', label='PTINC₁ (E$^e$ = 1.15)')

    i0 = 0.03
    E0 = E_e0 * (1 + i0) / (1 + i_star)
    E1_new = E_e1 * (1 + i0) / (1 + i_star)
    ax.plot(i0 * 100, E0, 'o', color='#2b6cb0', markersize=8, zorder=5)
    ax.plot(i0 * 100, E1_new, 'o', color='#c53030', markersize=8, zorder=5)
    ax.annotate('', xy=(i0 * 100, E1_new), xytext=(i0 * 100, E0),
                arrowprops=dict(arrowstyle='->', color='#dd6b20', lw=2))
    ax.annotate('E$^e$↑\nAppréciation', xy=(i0 * 100, (E0 + E1_new) / 2),
                xytext=(i0 * 100 + 1.5, (E0 + E1_new) / 2),
                fontsize=10, color='#dd6b20', fontweight='bold')
    ax.set_xlabel('Taux d\'intérêt i (%)', fontsize=12)
    ax.set_ylabel('Taux de change E', fontsize=12)
    ax.set_title('Hausse des anticipations (E$^e$↑)', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='lower right')
    fig.tight_layout()
    return save_fig(fig, 'ptinc_Ee_shift')


def graph_is_curve():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 250, 100)
    i_IS = 12 - 0.04 * Y
    ax.plot(Y, i_IS, color='#2b6cb0', linewidth=2.5, label='IS')
    YA, iA = 100, 12 - 0.04 * 100
    YB, iB = 175, 12 - 0.04 * 175
    ax.plot(YA, iA, 'o', color='#276749', markersize=8, zorder=5)
    ax.plot(YB, iB, 'o', color='#c53030', markersize=8, zorder=5)
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 8, iA + 0.5), fontsize=12, fontweight='bold', color='#276749')
    ax.annotate('B', xy=(YB, iB), xytext=(YB + 8, iB + 0.5), fontsize=12, fontweight='bold', color='#c53030')
    ax.annotate('', xy=(YB, iB), xytext=(YA, iA),
                arrowprops=dict(arrowstyle='->', color='#dd6b20', lw=1.5, connectionstyle='arc3,rad=-0.2'))
    ax.annotate('i↓ → I↑ → Y↑', xy=(140, 6), fontsize=10, color='#dd6b20', ha='center')
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('La courbe IS', fontsize=14, fontweight='bold', color='#1a365d')
    ax.set_xlim(40, 260)
    fig.tight_layout()
    return save_fig(fig, 'is_curve')


def graph_lm_curve():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 250, 100)
    i_LM = -2 + 0.04 * Y
    ax.plot(Y, i_LM, color='#c53030', linewidth=2.5, label='LM')
    YA, iA = 100, -2 + 0.04 * 100
    YB, iB = 175, -2 + 0.04 * 175
    ax.plot(YA, iA, 'o', color='#276749', markersize=8, zorder=5)
    ax.plot(YB, iB, 'o', color='#2b6cb0', markersize=8, zorder=5)
    ax.annotate('A', xy=(YA, iA), xytext=(YA - 15, iA + 0.3), fontsize=12, fontweight='bold', color='#276749')
    ax.annotate('B', xy=(YB, iB), xytext=(YB - 15, iB + 0.3), fontsize=12, fontweight='bold', color='#2b6cb0')
    ax.annotate('', xy=(YB, iB), xytext=(YA, iA),
                arrowprops=dict(arrowstyle='->', color='#dd6b20', lw=1.5, connectionstyle='arc3,rad=-0.2'))
    ax.annotate('Y↑ → L$^d$↑ → i↑', xy=(140, 5.5), fontsize=10, color='#dd6b20', ha='center')
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('La courbe LM', fontsize=14, fontweight='bold', color='#1a365d')
    ax.set_xlim(40, 260)
    fig.tight_layout()
    return save_fig(fig, 'lm_curve')


def graph_is_shift():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 300, 100)
    i_IS0 = 10 - 0.035 * Y
    i_IS1 = 12 - 0.035 * Y  # G↑
    i_IS2 = 8 - 0.035 * Y   # G↓
    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2.5, label='IS₀')
    ax.plot(Y, i_IS1, color='#276749', linewidth=2, linestyle='--', label='IS₁ (G↑)')
    ax.plot(Y, i_IS2, color='#c53030', linewidth=2, linestyle=':', label='IS₂ (G↓)')
    ax.annotate('', xy=(220, 12 - 0.035 * 220), xytext=(170, 10 - 0.035 * 170),
                arrowprops=dict(arrowstyle='->', color='#276749', lw=1.5))
    ax.annotate('', xy=(100, 8 - 0.035 * 100), xytext=(150, 10 - 0.035 * 150),
                arrowprops=dict(arrowstyle='->', color='#c53030', lw=1.5))
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Déplacements de IS (politique budgétaire)', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=10, loc='upper right')
    ax.set_xlim(40, 300)
    fig.tight_layout()
    return save_fig(fig, 'is_shift')


def graph_lm_shift():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 300, 100)
    i_LM0 = -2 + 0.04 * Y
    i_LM1 = -4 + 0.04 * Y  # Ls↑
    i_LM2 = 0 + 0.04 * Y   # Ls↓
    ax.plot(Y, i_LM0, color='#c53030', linewidth=2.5, label='LM₀')
    ax.plot(Y, i_LM1, color='#276749', linewidth=2, linestyle='--', label='LM₁ (L$^s$↑)')
    ax.plot(Y, i_LM2, color='#2b6cb0', linewidth=2, linestyle=':', label='LM₂ (L$^s$↓)')
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Déplacements de LM (politique monétaire)', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=10, loc='lower right')
    ax.set_xlim(40, 300)
    fig.tight_layout()
    return save_fig(fig, 'lm_shift')


def graph_islm_equilibrium():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 250, 100)
    i_IS = 12 - 0.04 * Y
    i_LM = -2 + 0.04 * Y
    # Intersection: 12 - 0.04Y = -2 + 0.04Y => 14 = 0.08Y => Y = 175, i = 5
    Yeq = 175
    ieq = 5
    ax.plot(Y, i_IS, color='#2b6cb0', linewidth=2.5, label='IS')
    ax.plot(Y, i_LM, color='#c53030', linewidth=2.5, label='LM')
    ax.plot(Yeq, ieq, 'o', color='#dd6b20', markersize=10, zorder=5)
    ax.annotate('Ω (Y*, i*)', xy=(Yeq, ieq), xytext=(Yeq + 10, ieq + 1.5),
                fontsize=12, fontweight='bold', color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.axhline(ieq, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
    ax.axvline(Yeq, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Équilibre IS-LM', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=10)
    ax.set_xlim(40, 260)
    fig.tight_layout()
    return save_fig(fig, 'islm_eq')


def graph_bp_construction():
    fig, ax = plt.subplots(figsize=(6, 4.5))
    Y = np.linspace(50, 300, 100)
    # BP: i = (m/k)*Y + const
    # moderate k
    i_BP = -2 + 0.025 * Y
    ax.plot(Y, i_BP, color='#276749', linewidth=2.5, label='BP (BP = 0)')
    # Point A and B
    YA, iA = 120, -2 + 0.025 * 120
    YB, iB = 220, -2 + 0.025 * 220
    ax.plot(YA, iA, 'o', color='#2b6cb0', markersize=8, zorder=5)
    ax.plot(YB, iB, 'o', color='#c53030', markersize=8, zorder=5)
    ax.annotate('A', xy=(YA, iA), xytext=(YA - 15, iA + 0.5), fontsize=12, fontweight='bold', color='#2b6cb0')
    ax.annotate('B', xy=(YB, iB), xytext=(YB + 5, iB + 0.5), fontsize=12, fontweight='bold', color='#c53030')
    ax.annotate('', xy=(YB, iB), xytext=(YA, iA),
                arrowprops=dict(arrowstyle='->', color='#dd6b20', lw=1.5, connectionstyle='arc3,rad=-0.15'))
    # Zones
    ax.fill_between(Y, i_BP, 12, alpha=0.08, color='#276749')
    ax.fill_between(Y, i_BP, -3, alpha=0.08, color='#c53030')
    ax.text(100, 6, 'BP > 0\n(Excédent)', fontsize=10, color='#276749', ha='center', fontweight='bold')
    ax.text(220, 1, 'BP < 0\n(Déficit)', fontsize=10, color='#c53030', ha='center', fontweight='bold')
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('La courbe BP et ses zones de déséquilibre', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=10, loc='lower right')
    ax.set_xlim(40, 310)
    ax.set_ylim(-3, 8)
    fig.tight_layout()
    return save_fig(fig, 'bp_construction')


def graph_bp_mobility():
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 300, 100)
    i_world = 3

    # k → 0: vertical
    ax.axvline(150, color='#c53030', linewidth=2, linestyle='-', label='k → 0 (verticale)')
    # k small
    ax.plot(Y, i_world - 3 + 0.04 * Y, color='#dd6b20', linewidth=2, linestyle='--', label='k faible')
    # k large
    ax.plot(Y, i_world - 1 + 0.013 * Y, color='#2b6cb0', linewidth=2, linestyle='-.', label='k élevé')
    # k → ∞: horizontal
    ax.axhline(i_world, color='#276749', linewidth=2, linestyle=':', label='k → ∞ (horizontale)')

    ax.annotate('i*', xy=(55, i_world), fontsize=12, color='#276749', fontweight='bold')
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Influence de k sur la pente de BP', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='upper left')
    ax.set_xlim(40, 300)
    ax.set_ylim(-1, 12)
    fig.tight_layout()
    return save_fig(fig, 'bp_mobility')


def graph_islmbp_equilibrium():
    fig, ax = plt.subplots(figsize=(6.5, 5))
    Y = np.linspace(50, 250, 100)
    i_IS = 10 - 0.035 * Y
    i_LM = -2 + 0.04 * Y
    # Intersection IS-LM: 10-0.035Y = -2+0.04Y => 12 = 0.075Y => Y=160, i=4.4
    Yeq = 160
    ieq = 10 - 0.035 * 160

    i_BP = -1 + 0.025 * Y
    # BP at Y=160: -1+0.025*160 = 3. We want BP to pass through eq point too
    # Adjust: i_BP = ieq - 0.025*(Yeq - Y) => i_BP = ieq + 0.025*(Y - Yeq)
    # = 4.4 + 0.025*(Y - 160) = 4.4 - 4 + 0.025Y = 0.4 + 0.025Y
    i_BP = 0.4 + 0.025 * Y

    ax.plot(Y, i_IS, color='#2b6cb0', linewidth=2.5, label='IS')
    ax.plot(Y, i_LM, color='#c53030', linewidth=2.5, label='LM')
    ax.plot(Y, i_BP, color='#276749', linewidth=2.5, label='BP')
    ax.plot(Yeq, ieq, 'o', color='#dd6b20', markersize=10, zorder=5)
    ax.annotate('Ω', xy=(Yeq, ieq), xytext=(Yeq + 8, ieq + 1),
                fontsize=14, fontweight='bold', color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.axhline(ieq, color='gray', linewidth=0.5, linestyle='--', alpha=0.4)
    ax.axvline(Yeq, color='gray', linewidth=0.5, linestyle='--', alpha=0.4)
    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Équilibre IS-LM-BP', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=10, loc='upper right')
    ax.set_xlim(40, 260)
    fig.tight_layout()
    return save_fig(fig, 'islmbp_eq')


def graph_fiscal_floating_k_high():
    """Relance budgétaire en changes flottants, k élevé (forte mobilité)."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 280, 100)

    # Initial
    i_IS0 = 10 - 0.035 * Y
    i_LM = -2 + 0.04 * Y
    i_BP0 = 1 + 0.015 * Y  # flat BP (k élevé)

    # After G↑ (IS shifts right)
    i_IS_tr = 12.5 - 0.035 * Y

    # Transitional point A: IS_tr ∩ LM
    # 12.5 - 0.035Y = -2+0.04Y => 14.5 = 0.075Y => Y=193.3, i=5.73
    YA = 193.3
    iA = -2 + 0.04 * YA

    # Final (after appreciation): IS and BP shift
    i_ISf = 11.3 - 0.035 * Y
    i_BPf = 1.8 + 0.015 * Y

    # Final eq: ISf ∩ LM
    # 11.3 - 0.035Y = -2+0.04Y => 13.3 = 0.075Y => Y=177.3, i=5.09
    Yf = 177.3
    i_f = -2 + 0.04 * Yf

    # Initial eq: Y=160, i=4.4
    Y0 = 160
    i0 = -2 + 0.04 * Y0

    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2, label='IS₀')
    ax.plot(Y, i_IS_tr, color='#2b6cb0', linewidth=1.5, linestyle=':', alpha=0.5, label='IS (transitoire)')
    ax.plot(Y, i_ISf, color='#2b6cb0', linewidth=2, linestyle='--', label='IS final')
    ax.plot(Y, i_LM, color='#c53030', linewidth=2.5, label='LM')
    ax.plot(Y, i_BP0, color='#276749', linewidth=2, label='BP₀')
    ax.plot(Y, i_BPf, color='#276749', linewidth=2, linestyle='--', label='BP final')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=9, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.7)
    ax.plot(Yf, i_f, 'D', color='#dd6b20', markersize=9, zorder=5)

    ax.annotate('Ω₀', xy=(Y0, i0), xytext=(Y0 - 20, i0 - 1), fontsize=11, fontweight='bold', color='#dd6b20')
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 5, iA + 0.5), fontsize=11, fontweight='bold', color='gray')
    ax.annotate('Ω₁', xy=(Yf, i_f), xytext=(Yf + 5, i_f + 0.8), fontsize=11, fontweight='bold', color='#dd6b20')

    ax.annotate('ε↑', xy=(200, 7), fontsize=14, color='#c53030', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='#fed7d7', alpha=0.8))

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Relance budgétaire (G↑) – Changes flottants, k élevé',
                 fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=8, loc='upper right', ncol=2)
    ax.set_xlim(50, 280)
    ax.set_ylim(0, 10)
    fig.tight_layout()
    return save_fig(fig, 'fiscal_floating_k_high')


def graph_fiscal_floating_k_perfect():
    """Relance budgétaire avec k → ∞ en changes flottants: efficacité nulle."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 280, 100)

    i_star = 3
    i_IS0 = 10 - 0.035 * Y
    i_LM = -2 + 0.04 * Y
    i_IS_tr = 12.5 - 0.035 * Y

    # IS0 ∩ LM: Y = (10+2)/0.075 = 160, i = 4.4 — but we need IS0 ∩ BP
    # With BP horizontal at i*, IS0: i*=10-0.035Y => Y = (10-3)/0.035 = 200
    # LM at Y=200: i = -2+0.04*200 = 6 ≠ 3. Hmm.
    # Let's adjust so IS0 ∩ LM ∩ BP all meet at same point
    # Need: 10-0.035Y = -2+0.04Y = 3
    # -2+0.04Y=3 => Y=125; 10-0.035*125 = 5.625 ≠ 3
    # Let's use different params
    # IS: i = a - 0.05Y, LM: i = b + 0.03Y, BP: i = 3
    # Triple eq: a-0.05Y = b+0.03Y = 3
    # b+0.03Y=3 => Y=(3-b)/0.03
    # a-0.05*(3-b)/0.03 = 3 => a - 5*(3-b)/3 = 3
    # Let b=-0.6: Y=(3+0.6)/0.03=120; a-0.05*120=3 => a=9
    a, b = 9, -0.6
    i_IS0 = a - 0.05 * Y
    i_LM = b + 0.03 * Y
    Y0 = 120
    i0 = 3

    i_IS_tr = (a + 3) - 0.05 * Y  # G↑
    # IS_tr ∩ LM: 12-0.05Y = -0.6+0.03Y => 12.6 = 0.08Y => Y=157.5, i=4.125
    YA = 157.5
    iA = b + 0.03 * YA

    ax.axhline(i_star, color='#276749', linewidth=2.5, label='BP (i = i*)')
    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2.5, label='IS₀')
    ax.plot(Y, i_IS_tr, color='#2b6cb0', linewidth=1.5, linestyle=':', alpha=0.5, label='IS (transitoire)')
    ax.plot(Y, i_LM, color='#c53030', linewidth=2.5, label='LM')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=10, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.7)
    # Final: IS returns to IS0 (eviction totale)
    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2.5)

    ax.annotate('Ω₀ = Ω₁', xy=(Y0, i0), xytext=(Y0 + 10, i0 - 1.2),
                fontsize=11, fontweight='bold', color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 5, iA + 0.6),
                fontsize=11, fontweight='bold', color='gray')
    ax.annotate('Éviction\ntotale', xy=(140, 5.5), fontsize=12, color='#c53030',
                fontweight='bold', ha='center',
                bbox=dict(boxstyle='round', facecolor='#fed7d7', alpha=0.8))
    ax.annotate('IS revient\nà IS₀', xy=(100, a - 0.05 * 100), xytext=(60, 7),
                fontsize=9, color='#2b6cb0', fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#2b6cb0'))

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Relance budgétaire (G↑) – k → ∞ : Efficacité NULLE',
                 fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='upper right')
    ax.set_xlim(50, 250)
    ax.set_ylim(-1, 9)
    fig.tight_layout()
    return save_fig(fig, 'fiscal_floating_k_perfect')


def graph_monetary_floating():
    """Politique monétaire expansionniste en changes flottants."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 280, 100)

    a, b0 = 9, -0.6
    i_IS0 = a - 0.05 * Y
    i_LM0 = b0 + 0.03 * Y
    i_BP0 = 0.5 + 0.015 * Y

    Y0 = 120
    i0 = 3

    # LM shifts right (Ls↑)
    b1 = -2.6
    i_LMf = b1 + 0.03 * Y
    # ISf ∩ LMf (transitional): 9-0.05Y = -2.6+0.03Y => 11.6 = 0.08Y => Y=145, i=1.75
    YA = 145
    iA = b1 + 0.03 * YA

    # After depreciation: IS shifts right, BP shifts down
    a2 = 11
    i_ISf = a2 - 0.05 * Y
    i_BPf = -0.5 + 0.015 * Y

    # Final eq: ISf ∩ LMf: 11-0.05Y = -2.6+0.03Y => 13.6=0.08Y => Y=170, i=2.5
    Yf = 170
    i_f = b1 + 0.03 * Yf

    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2, label='IS₀')
    ax.plot(Y, i_ISf, color='#2b6cb0', linewidth=2, linestyle='--', label='IS final')
    ax.plot(Y, i_LM0, color='#c53030', linewidth=2, label='LM₀')
    ax.plot(Y, i_LMf, color='#c53030', linewidth=2, linestyle='--', label='LM final')
    ax.plot(Y, i_BP0, color='#276749', linewidth=2, label='BP₀')
    ax.plot(Y, i_BPf, color='#276749', linewidth=2, linestyle='--', label='BP final')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=9, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.6)
    ax.plot(Yf, i_f, 'D', color='#dd6b20', markersize=9, zorder=5)

    ax.annotate('Ω₀', xy=(Y0, i0), xytext=(Y0 - 18, i0 + 0.8), fontsize=11, fontweight='bold', color='#dd6b20')
    ax.annotate('A', xy=(YA, iA), xytext=(YA - 12, iA - 0.8), fontsize=11, fontweight='bold', color='gray')
    ax.annotate('Ω₁', xy=(Yf, i_f), xytext=(Yf + 5, i_f + 0.8), fontsize=11, fontweight='bold', color='#dd6b20')
    ax.annotate('ε↓\n(Boost)', xy=(200, 5), fontsize=12, color='#276749', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='#c6f6d5', alpha=0.8))

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Politique monétaire (L$^s$↑) – Changes flottants',
                 fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=8, loc='upper right', ncol=2)
    ax.set_xlim(50, 280)
    ax.set_ylim(-1, 8)
    fig.tight_layout()
    return save_fig(fig, 'monetary_floating')


def graph_fiscal_fixed_k_high():
    """Relance budgétaire en changes fixes, k élevé."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 300, 100)

    i_star = 3
    a = 9
    i_IS0 = a - 0.05 * Y
    b0 = -0.6
    i_LM0 = b0 + 0.03 * Y
    Y0 = 120
    i0 = 3

    # G↑
    a1 = 12
    i_IS1 = a1 - 0.05 * Y
    # IS1 ∩ LM0: 12-0.05Y = -0.6+0.03Y => 12.6=0.08Y => Y=157.5, i=4.125
    YA = 157.5
    iA = b0 + 0.03 * YA

    # BC forced to accommodate: LM shifts right until IS1 ∩ LM1 ∩ BP
    # IS1 at i*: 3 = 12-0.05Y => Y=180
    Yf = 180
    # LM1: 3 = b1+0.03*180 => b1 = 3-5.4 = -2.4
    b1 = -2.4
    i_LMf = b1 + 0.03 * Y

    ax.axhline(i_star, color='#276749', linewidth=2.5, label='BP (i = i*)')
    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=2, label='IS₀')
    ax.plot(Y, i_IS1, color='#2b6cb0', linewidth=2, linestyle='--', label='IS₁ (G↑)')
    ax.plot(Y, i_LM0, color='#c53030', linewidth=2, label='LM₀')
    ax.plot(Y, i_LMf, color='#c53030', linewidth=2, linestyle='--', label='LM₁ (L$^s$↑ auto)')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=10, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.7)
    ax.plot(Yf, i_star, 'D', color='#dd6b20', markersize=10, zorder=5)

    ax.annotate('Ω₀', xy=(Y0, i0), xytext=(Y0 - 20, i0 - 1.2), fontsize=11, fontweight='bold', color='#dd6b20')
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 5, iA + 0.5), fontsize=11, fontweight='bold', color='gray')
    ax.annotate('Ω₁', xy=(Yf, i_star), xytext=(Yf + 5, i_star + 1), fontsize=11, fontweight='bold', color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.annotate('LM accompagne\nautomatiquement', xy=(220, 2), fontsize=10, color='#c53030',
                bbox=dict(boxstyle='round', facecolor='#fed7d7', alpha=0.8))

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Relance budgétaire (G↑) – Changes fixes, k → ∞',
                 fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='upper right')
    ax.set_xlim(50, 280)
    ax.set_ylim(-1, 9)
    fig.tight_layout()
    return save_fig(fig, 'fiscal_fixed_k_high')


def graph_monetary_fixed():
    """Politique monétaire en changes fixes: inefficace."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 280, 100)

    i_star = 3
    a = 9
    i_IS = a - 0.05 * Y
    b0 = -0.6
    i_LM0 = b0 + 0.03 * Y
    Y0 = 120
    i0 = 3

    # BC tente Ls↑
    b1 = -2.6
    i_LMtr = b1 + 0.03 * Y
    # IS ∩ LMtr: 9-0.05Y=-2.6+0.03Y => 11.6=0.08Y => Y=145, i=1.75
    YA = 145
    iA = b1 + 0.03 * YA

    ax.axhline(i_star, color='#276749', linewidth=2.5, label='BP (i = i*)')
    ax.plot(Y, i_IS, color='#2b6cb0', linewidth=2.5, label='IS')
    ax.plot(Y, i_LM0, color='#c53030', linewidth=2.5, label='LM₀ = LM final')
    ax.plot(Y, i_LMtr, color='#c53030', linewidth=1.5, linestyle=':', alpha=0.5, label='LM (transitoire)')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=10, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.7)

    ax.annotate('Ω₀ = Ω final', xy=(Y0, i0), xytext=(Y0 + 10, i0 + 1.5),
                fontsize=11, fontweight='bold', color='#dd6b20',
                arrowprops=dict(arrowstyle='->', color='#dd6b20'))
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 5, iA - 0.8), fontsize=11, fontweight='bold', color='gray')
    ax.annotate('LM revient\n(ΔRC↓)', xy=(170, 5.5), fontsize=11, color='#c53030', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='#fed7d7', alpha=0.8))
    ax.annotate('Inefficacité\ntotale', xy=(80, 6.5), fontsize=12, color='#c53030', fontweight='bold',
                ha='center')

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Politique monétaire (L$^s$↑) – Changes fixes : INEFFICACE',
                 fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='upper right')
    ax.set_xlim(50, 250)
    ax.set_ylim(-1, 9)
    fig.tight_layout()
    return save_fig(fig, 'monetary_fixed')


def graph_mundell_triangle():
    """Triangle d'incompatibilité de Mundell."""
    fig, ax = plt.subplots(figsize=(7, 6))
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-0.8, 1.5)
    ax.set_aspect('equal')
    ax.axis('off')

    # Triangle vertices
    top = (0, 1.3)
    left = (-1.2, -0.4)
    right = (1.2, -0.4)

    triangle = plt.Polygon([top, left, right], fill=False, edgecolor='#1a365d', linewidth=2.5)
    ax.add_patch(triangle)

    # Labels at vertices
    ax.text(top[0], top[1] + 0.12, '1. Autonomie\nmonétaire', ha='center', va='bottom',
            fontsize=11, fontweight='bold', color='#1a365d')
    ax.text(left[0] - 0.1, left[1] - 0.08, '2. Changes\nfixes', ha='center', va='top',
            fontsize=11, fontweight='bold', color='#1a365d')
    ax.text(right[0] + 0.1, right[1] - 0.08, '3. Mobilité\ndes capitaux', ha='center', va='top',
            fontsize=11, fontweight='bold', color='#1a365d')

    # Edge labels (options)
    mid_top_left = ((top[0] + left[0]) / 2 - 0.25, (top[1] + left[1]) / 2 + 0.1)
    mid_top_right = ((top[0] + right[0]) / 2 + 0.25, (top[1] + right[1]) / 2 + 0.1)
    mid_bottom = ((left[0] + right[0]) / 2, (left[1] + right[1]) / 2 - 0.15)

    ax.text(mid_top_left[0], mid_top_left[1], 'Option C\n(Contrôle\ndes capitaux)',
            ha='center', fontsize=9, color='#c53030', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#fed7d7', alpha=0.7))
    ax.text(mid_top_right[0], mid_top_right[1], 'Option A\n(Changes\nflottants)',
            ha='center', fontsize=9, color='#276749', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#c6f6d5', alpha=0.7))
    ax.text(mid_bottom[0], mid_bottom[1], 'Option B\n(Ancrage fixe)',
            ha='center', fontsize=9, color='#2b6cb0', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#bee3f8', alpha=0.7))

    ax.set_title('Triangle d\'incompatibilité de Mundell', fontsize=14,
                 fontweight='bold', color='#1a365d', pad=15)
    fig.tight_layout()
    return save_fig(fig, 'mundell_triangle')


def graph_us_policy_mix():
    """Policy mix américain 2022-2024."""
    fig, ax = plt.subplots(figsize=(7, 5))
    Y = np.linspace(50, 280, 100)

    # Initial
    a0, b0 = 9, -0.6
    i_IS0 = a0 - 0.05 * Y
    i_LM0 = b0 + 0.03 * Y
    i_BP0 = 0.5 + 0.015 * Y

    Y0 = 120
    i0 = 3

    # IS shifts right (relance budgétaire)
    a1 = 12
    i_IS1 = a1 - 0.05 * Y
    # LM shifts left (resserrement monétaire)
    b1 = 1.4
    i_LM1 = b1 + 0.03 * Y

    # IS1 ∩ LM1: 12-0.05Y = 1.4+0.03Y => 10.6=0.08Y => Y=132.5, i=5.375
    YA = 132.5
    iA = b1 + 0.03 * YA

    # After appreciation: IS recedes, BP shifts up
    a_f = 10.8
    i_ISf = a_f - 0.05 * Y
    i_BPf = 1.5 + 0.015 * Y

    # Final: ISf ∩ LM1: 10.8-0.05Y = 1.4+0.03Y => 9.4=0.08Y => Y=117.5, i=4.925
    Yf = 117.5
    i_f = b1 + 0.03 * Yf

    ax.plot(Y, i_IS0, color='#2b6cb0', linewidth=1.5, alpha=0.4, label='IS₀')
    ax.plot(Y, i_IS1, color='#2b6cb0', linewidth=1.5, linestyle=':', alpha=0.4)
    ax.plot(Y, i_ISf, color='#2b6cb0', linewidth=2, linestyle='--', label='IS final')
    ax.plot(Y, i_LM0, color='#c53030', linewidth=1.5, alpha=0.4, label='LM₀')
    ax.plot(Y, i_LM1, color='#c53030', linewidth=2.5, label='LM₁')
    ax.plot(Y, i_BP0, color='#276749', linewidth=1.5, alpha=0.4, label='BP₀')
    ax.plot(Y, i_BPf, color='#276749', linewidth=2, linestyle='--', label='BP final')

    ax.plot(Y0, i0, 'o', color='#dd6b20', markersize=9, zorder=5)
    ax.plot(YA, iA, 's', color='gray', markersize=7, zorder=5, alpha=0.7)
    ax.plot(Yf, i_f, 'D', color='#dd6b20', markersize=9, zorder=5)

    ax.annotate('Ω₀', xy=(Y0, i0), xytext=(Y0 - 20, i0 - 1), fontsize=11, fontweight='bold', color='#dd6b20')
    ax.annotate('A', xy=(YA, iA), xytext=(YA + 5, iA + 0.5), fontsize=10, fontweight='bold', color='gray')
    ax.annotate('Ω₁', xy=(Yf, i_f), xytext=(Yf + 8, i_f + 0.8), fontsize=11, fontweight='bold', color='#dd6b20')

    ax.annotate('$ fort (ε↑)', xy=(200, 7), fontsize=12, color='#c53030', fontweight='bold',
                bbox=dict(boxstyle='round', facecolor='#fed7d7', alpha=0.8))

    ax.set_xlabel('Revenu Y', fontsize=12)
    ax.set_ylabel('Taux d\'intérêt i', fontsize=12)
    ax.set_title('Policy mix américain 2022-2024', fontsize=13, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=8, loc='upper right', ncol=2)
    ax.set_xlim(50, 250)
    ax.set_ylim(-1, 9)
    fig.tight_layout()
    return save_fig(fig, 'us_policy_mix')


def graph_depreciation_example():
    """Exemple chiffré de la dépréciation."""
    fig, ax = plt.subplots(figsize=(6, 4))
    states = ['t₀\n(Initial)', 't₁\n(Court terme)', 't₂\n(Moyen terme)']
    nx_vals = [0, -25, 40]
    colors = ['#2b6cb0', '#c53030', '#276749']

    bars = ax.bar(states, nx_vals, color=colors, width=0.5, edgecolor='white', linewidth=2)
    ax.axhline(0, color='gray', linewidth=1)

    for bar, val in zip(bars, nx_vals):
        ypos = val + 2 if val >= 0 else val - 3
        ax.text(bar.get_x() + bar.get_width() / 2, ypos, f'{val:+d} €',
                ha='center', fontsize=12, fontweight='bold',
                color='white' if abs(val) > 10 else 'black')

    ax.set_ylabel('Solde commercial NX (€)', fontsize=12)
    ax.set_title('Dépréciation de l\'euro : exemple chiffré', fontsize=14, fontweight='bold', color='#1a365d')
    ax.set_ylim(-35, 50)
    fig.tight_layout()
    return save_fig(fig, 'depreciation_example')


def graph_ptinc_2022():
    """Choc PTINC 2022: Fed vs BCE."""
    fig, ax = plt.subplots(figsize=(7, 5))
    i_vals = np.linspace(-0.02, 0.06, 100)

    # Mai 2022: i* faible
    i_star_may = 0.01
    E_e_may = 1.10
    E_may = E_e_may * (1 + i_vals) / (1 + i_star_may)

    # Sept 2022: i* élevé (Fed hawkish)
    i_star_sept = 0.035
    E_e_sept = 1.05
    E_sept = E_e_sept * (1 + i_vals) / (1 + i_star_sept)

    ax.plot(i_vals * 100, E_may, color='#2b6cb0', linewidth=2.5, label='PTINC (Mai 2022)')
    ax.plot(i_vals * 100, E_sept, color='#c53030', linewidth=2.5, linestyle='--', label='PTINC (Sept 2022)')

    # Mai point: i=-0.5%, E=1.05
    i_bce_may = -0.005
    E_spot_may = E_e_may * (1 + i_bce_may) / (1 + i_star_may)
    ax.plot(i_bce_may * 100, E_spot_may, 'o', color='#2b6cb0', markersize=10, zorder=5)
    ax.annotate('Mai 2022\n(1,05$)', xy=(i_bce_may * 100, E_spot_may),
                xytext=(i_bce_may * 100 - 1.5, E_spot_may + 0.04),
                fontsize=9, color='#2b6cb0', fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#2b6cb0'))

    # Sept point: i=0.75%, E=0.96
    i_bce_sept = 0.0075
    E_spot_sept = E_e_sept * (1 + i_bce_sept) / (1 + i_star_sept)
    ax.plot(i_bce_sept * 100, E_spot_sept, 'D', color='#c53030', markersize=10, zorder=5)
    ax.annotate('Sept 2022\n(0,96$)', xy=(i_bce_sept * 100, E_spot_sept),
                xytext=(i_bce_sept * 100 + 1, E_spot_sept - 0.05),
                fontsize=9, color='#c53030', fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#c53030'))

    ax.set_xlabel('Taux BCE i (%)', fontsize=12)
    ax.set_ylabel('Taux de change E ($/€)', fontsize=12)
    ax.set_title('Choc PTINC 2022 : la Fed l\'emporte', fontsize=14, fontweight='bold', color='#1a365d')
    ax.legend(fontsize=9, loc='upper left')
    fig.tight_layout()
    return save_fig(fig, 'ptinc_2022')


# ── Generate all graphs ─────────────────────────────────────────────
print("Generating graphs...")
g_j_curve = graph_j_curve()
g_depreciation = graph_depreciation_example()
g_ptinc_basic = graph_ptinc_basic()
g_ptinc_i = graph_ptinc_i_increase()
g_ptinc_Ee = graph_ptinc_Ee_shift()
g_ptinc_2022 = graph_ptinc_2022()
g_is = graph_is_curve()
g_lm = graph_lm_curve()
g_is_shift = graph_is_shift()
g_lm_shift = graph_lm_shift()
g_islm = graph_islm_equilibrium()
g_bp = graph_bp_construction()
g_bp_mob = graph_bp_mobility()
g_islmbp = graph_islmbp_equilibrium()
g_fiscal_float_high = graph_fiscal_floating_k_high()
g_fiscal_float_perf = graph_fiscal_floating_k_perfect()
g_monetary_float = graph_monetary_floating()
g_fiscal_fixed = graph_fiscal_fixed_k_high()
g_monetary_fixed = graph_monetary_fixed()
g_triangle = graph_mundell_triangle()
g_us_mix = graph_us_policy_mix()
print("All graphs generated.")


# ══════════════════════════════════════════════════════════════════════
#                     BUILD THE PDF
# ══════════════════════════════════════════════════════════════════════

OUTPUT_PATH = "/home/claude/chapitre2_macro.pdf"

def header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    # Header line
    canvas_obj.setStrokeColor(MEDIUM_BLUE)
    canvas_obj.setLineWidth(1.5)
    canvas_obj.line(MARGIN_LEFT, PAGE_H - MARGIN_TOP + 8, PAGE_W - MARGIN_RIGHT, PAGE_H - MARGIN_TOP + 8)
    canvas_obj.setFont("Helvetica", 7.5)
    canvas_obj.setFillColor(GRAY_TEXT)
    canvas_obj.drawString(MARGIN_LEFT, PAGE_H - MARGIN_TOP + 12, "Macroéconomie L2/S2 — Chapitre 2 : Le modèle Mundell-Fleming")
    canvas_obj.drawRightString(PAGE_W - MARGIN_RIGHT, PAGE_H - MARGIN_TOP + 12, "A. PIETRI — Univ. Montpellier 2025-2026")

    # Footer
    canvas_obj.setStrokeColor(GRAY_BORDER)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(MARGIN_LEFT, MARGIN_BOTTOM - 10, PAGE_W - MARGIN_RIGHT, MARGIN_BOTTOM - 10)
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawCentredString(PAGE_W / 2, MARGIN_BOTTOM - 22, f"— {doc.page} —")
    canvas_obj.restoreState()


doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=MARGIN_LEFT,
    rightMargin=MARGIN_RIGHT,
    topMargin=MARGIN_TOP,
    bottomMargin=MARGIN_BOTTOM,
)

story = []

# ═══════════════════════════════════════════════
#  COVER PAGE
# ═══════════════════════════════════════════════
story.append(Spacer(1, 3 * cm))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=3))
story.append(Spacer(1, 0.5 * cm))
story.append(Paragraph("CHAPITRE 2", styles['ChapterTitle']))
story.append(Paragraph("L'équilibre macroéconomique<br/>en économie ouverte", styles['ChapterTitle']))
story.append(Spacer(1, 0.3 * cm))
story.append(Paragraph("Le modèle Mundell-Fleming (IS-LM-BP)", styles['ChapterSubtitle']))
story.append(Spacer(1, 0.3 * cm))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=3))
story.append(Spacer(1, 1.5 * cm))
story.append(Paragraph("Cours de Macroéconomie — Licence 2 / Semestre 2", styles['BodyText2']))
story.append(Paragraph("Antoine PIETRI — Université de Montpellier", styles['BodyText2']))
story.append(Paragraph("Année universitaire 2025-2026", styles['BodyText2']))
story.append(Spacer(1, 1.5 * cm))

# Table of contents
toc_data = [
    ["Section", "Contenu"],
    ["1", "Le marché des biens et services en économie ouverte"],
    ["2", "L'équilibre financier et la mobilité des capitaux"],
    ["3", "Le modèle Mundell-Fleming (IS-LM-BP)"],
    ["4", "Efficacité des politiques économiques en économie ouverte"],
]
toc_table = Table(toc_data, colWidths=[1.5 * cm, CONTENT_W - 1.5 * cm])
toc_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('ALIGN', (0, 0), (0, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, VERY_LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(toc_table)
story.append(Spacer(1, 1 * cm))

refs_box = ColoredBox(
    "Ouvrages de référence",
    [
        Paragraph("• Bailly, Caire, Quiles, Montoussé et Lavialle (2019). <i>Macroéconomie</i>, Bréal — Chapitre 6", styles['BoxBody']),
        Paragraph("• Brana et Bergouignan (2015). <i>TD de Macroéconomie</i> (5<super>e</super> éd.), Dunod — Chapitres 6 et 7", styles['BoxBody']),
    ],
    title_bg=ACCENT_GREEN, body_bg=LIGHT_GREEN, border_color=ACCENT_GREEN
)
story.append(refs_box)

story.append(PageBreak())


# ═══════════════════════════════════════════════
#  SECTION 1: MARCHÉ DES BIENS ET SERVICES
# ═══════════════════════════════════════════════
story.append(Paragraph("Section 1 — Le marché des biens et services en économie ouverte", styles['SectionTitle']))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=2))
story.append(Spacer(1, 0.4 * cm))

story.append(Paragraph(
    "Lorsque l'on passe d'une économie fermée à une économie ouverte, le marché des biens et services intègre "
    "deux flux supplémentaires : les <b>exportations</b> (X) et les <b>importations</b> (M). L'équilibre "
    "macroéconomique ne dépend plus uniquement de la demande intérieure, mais aussi de la <b>compétitivité-prix</b> "
    "et de la <b>conjoncture mondiale</b>.",
    styles['BodyText2']
))

# 1.1 Importations
story.append(Paragraph("1.1 Les déterminants des importations (M)", styles['SubSectionTitle']))
story.append(Paragraph(
    "Les importations dépendent de deux facteurs principaux :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>1. Le revenu national (Y) :</b> Plus le revenu national est élevé, plus les agents économiques consomment, "
    "y compris des biens et services (B&amp;S) étrangers. La sensibilité des importations au revenu est mesurée par "
    "la <b>propension marginale à importer</b> (notée <i>m</i>), qui correspond à la part de chaque euro "
    "supplémentaire de revenu consacrée à l'achat de produits étrangers.",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>2. Le taux de change réel (ε) :</b> Si ε est élevé (monnaie nationale forte / prix nationaux élevés), "
    "les B&amp;S étrangers deviennent relativement moins chers, ce qui incite les résidents à importer davantage. "
    "Inversement, une monnaie faible renchérit les produits importés.",
    styles['BodyText2']
))

formula_box = ColoredBox(
    "Fonction d'importation",
    [
        Paragraph("<b>M = M(Y, ε)</b>  avec  ∂M/∂Y &gt; 0  (propension marginale <i>m</i>)  et  ∂M/∂ε &gt; 0", styles['Formula']),
    ],
    title_bg=MEDIUM_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=MEDIUM_BLUE
)
story.append(formula_box)
story.append(Spacer(1, 0.2 * cm))

remark_box = ColoredBox(
    "Remarque sur la notation",
    [
        Paragraph(
            "On considère que <b>ε = ε<sub>devise/€</sub></b>. Ainsi, une <b>hausse de ε</b> correspond à une "
            "<b>appréciation de l'Euro</b> par rapport à la devise considérée (par ex. le dollar). "
            "À court terme dans le modèle IS-LM-BP, on suppose les prix fixes (P = P* = 1), "
            "de sorte que le taux de change réel ε se confond avec le taux de change nominal E.",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_ORANGE, body_bg=LIGHT_ORANGE, border_color=ACCENT_ORANGE
)
story.append(remark_box)

# 1.2 Exportations
story.append(Paragraph("1.2 Les déterminants des exportations (X)", styles['SubSectionTitle']))
story.append(Paragraph(
    "Les exportations sont, par symétrie, les importations du reste du monde. Elles dépendent de :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>1. Le revenu étranger (Y<super>RDM</super>) :</b> Si nos partenaires commerciaux (ex. : l'Allemagne, les USA) "
    "sont en phase de croissance, ils consomment davantage et nous achètent plus de B&amp;S. La demande externe "
    "dépend donc de la conjoncture mondiale.",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>2. Le taux de change réel (ε) :</b> Si ε est <i>faible</i> (monnaie nationale dépréciée), nos produits "
    "sont compétitifs à l'étranger et les exportations augmentent. Inversement, une appréciation dégrade "
    "notre compétitivité-prix.",
    styles['BodyText2']
))

formula_box2 = ColoredBox(
    "Fonction d'exportation",
    [
        Paragraph("<b>X = X(Y<super>RDM</super>, ε)</b>  avec  ∂X/∂Y<super>RDM</super> &gt; 0  et  ∂X/∂ε &lt; 0", styles['Formula']),
    ],
    title_bg=MEDIUM_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=MEDIUM_BLUE
)
story.append(formula_box2)

# 1.3 Solde extérieur
story.append(Paragraph("1.3 Le solde extérieur (NX) et les effets d'une dépréciation", styles['SubSectionTitle']))
story.append(Paragraph(
    "Le solde extérieur (ou exportations nettes) est défini par :",
    styles['BodyText2']
))
story.append(Paragraph("<b>NX = X − M/ε</b>", styles['Formula']))
story.append(Paragraph(
    "Une baisse de la valeur de l'Euro (ε↓, dépréciation) déclenche <b>deux phases distinctes</b> :",
    styles['BodyText2']
))

story.append(Paragraph("<b>Phase 1 — Court terme : l'effet prix</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Les contrats commerciaux sont déjà signés. Les volumes (X, M) sont rigides à très court terme. "
    "Les importations sont souvent libellées en devises étrangères : si ε↓, la facture s'alourdit en euros. "
    "Les exportations sont généralement libellées en monnaie nationale : la recette unitaire reste stable. "
    "Le <b>résultat</b> est une <b>dégradation du solde NX</b>.",
    styles['BodyText2']
))

story.append(Paragraph("<b>Phase 2 — Moyen terme : l'effet volume</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Les agents économiques ajustent leurs comportements aux nouveaux prix relatifs. Nos produits sont devenus "
    "moins chers pour les étrangers, donc les exportations augmentent (X↑). Les produits importés sont plus chers, "
    "donc les résidents se tournent vers des substituts nationaux (M↓). Le <b>résultat</b> est une "
    "<b>amélioration du solde NX</b>.",
    styles['BodyText2']
))

story.append(Paragraph(
    "Cette séquence temporelle — dégradation puis amélioration — est à l'origine de la célèbre <b>courbe en J</b>.",
    styles['BodyText2']
))

# J-curve graph
story.append(Image(g_j_curve, width=14 * cm, height=8 * cm))
story.append(Paragraph("Figure 1 — La courbe en J : dynamique du solde commercial après une dépréciation", styles['Caption']))

# Numerical example
story.append(Paragraph("1.4 Exemple chiffré : dépréciation de l'euro", styles['SubSectionTitle']))

example_box = ColoredBox(
    "Exemple numérique",
    [
        Paragraph(
            "<b>Données initiales (t<sub>0</sub>) :</b> E<sub>$/€</sub> = 1, P = 10€, P* = 10$, donc ε = 1. "
            "Initialement : X = 100 et M = 100.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>État initial :</b> NX<sub>0</sub> = X − M/ε = 100 − 100/1 = <b>0€</b> (équilibre commercial)",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Court terme (t<sub>1</sub>), ε' = 0,8 :</b> Les volumes ne bougent pas. "
            "NX<sub>CT</sub> = 100 − 100/0,8 = 100 − 125 = <b>−25€</b> (dégradation par effet comptable)",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Moyen terme (t<sub>2</sub>) :</b> Ajustement des comportements : X = 140, M = 80. "
            "NX<sub>MT</sub> = 140 − 80/0,8 = 140 − 100 = <b>+40€</b> (l'effet volume l'emporte)",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(example_box)
story.append(Spacer(1, 0.3 * cm))
story.append(Image(g_depreciation, width=12 * cm, height=8 * cm))
story.append(Paragraph("Figure 2 — Évolution du solde NX dans l'exemple chiffré", styles['Caption']))

# Marshall-Lerner
story.append(Paragraph("1.5 La condition de Marshall-Lerner", styles['SubSectionTitle']))
story.append(Paragraph(
    "Pour déterminer si, à moyen terme, une dépréciation réelle améliore ou dégrade le solde extérieur, "
    "on utilise le <b>théorème des élasticités critiques</b>. Il arbitre entre deux forces opposées : "
    "l'<b>effet prix</b> (négatif — on perd de la valeur sur chaque unité importée) et l'<b>effet volume</b> "
    "(positif — les quantités s'ajustent favorablement).",
    styles['BodyText2']
))

ml_box = ColoredBox(
    "Condition de Marshall-Lerner",
    [
        Paragraph(
            "En partant d'un solde initial <b>équilibré</b>, une dépréciation réelle (ε↓) <b>améliore</b> le solde "
            "extérieur (NX↑) si et seulement si :",
            styles['BoxBody']
        ),
        Paragraph("<b>|η<sub>x</sub>| + |η<sub>m</sub>| &gt; 1</b>", styles['Formula']),
        Paragraph(
            "Où |η<sub>x</sub>| est l'élasticité-prix des exportations et |η<sub>m</sub>| l'élasticité-prix "
            "des importations (en valeur absolue).",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(ml_box)
story.append(Spacer(1, 0.2 * cm))

story.append(Paragraph(
    "<b>Intuition du seuil de 1 :</b> Le chiffre 1 représente l'effet prix (la perte de valeur unitaire sur les importations). "
    "Pour que NX s'améliore, la <i>réaction des quantités</i> (hausse de X et baisse de M) doit plus que compenser "
    "cette perte. Si la somme des élasticités dépasse 1, le pays est « gagnant » à la dépréciation.",
    styles['BodyText2']
))

# Le puzzle de 2022
story.append(Paragraph("1.6 Le puzzle de la dépréciation : le choc de 2022", styles['SubSectionTitle']))
story.append(Paragraph(
    "En 2022, le différentiel de taux d'intérêt entre les USA et la Zone Euro, couplé à la crise énergétique "
    "(guerre en Ukraine), a entraîné une chute historique de la monnaie unique : l'euro est passé de 1,15$ "
    "(janvier 2022) à 0,96$ (septembre 2022).",
    styles['BodyText2']
))
story.append(Paragraph(
    "L'<b>effet prix immédiat</b> a été particulièrement violent car le pétrole et le gaz sont libellés en dollars. "
    "La facture énergétique payée en euros a bondi de ~20% par pur effet de change, avant même d'avoir consommé "
    "un litre de plus. La question centrale : à quelle condition ce renchérissement sera-t-il compensé par un "
    "regain de nos exportations ? La réponse est donnée par la condition de Marshall-Lerner.",
    styles['BodyText2']
))

# Démonstration ML
story.append(Paragraph("1.7 Démonstration de la condition de Marshall-Lerner", styles['SubSectionTitle']))
story.append(Paragraph(
    "On part de la définition du solde extérieur en unités de biens nationaux : NX = X(ε) − M(ε)/ε. "
    "On dérive par rapport à ε :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>dNX/dε = dX/dε − (1/ε)(dM/dε) + M/ε<super>2</super></b>",
    styles['Formula']
))
story.append(Paragraph(
    "En multipliant par ε/X et en supposant un solde initial équilibré (X = M/ε), on obtient :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>(dNX/dε)(ε/X) = η<sub>x</sub> − η<sub>m</sub> + 1</b>",
    styles['Formula']
))
story.append(Paragraph(
    "Pour qu'une dépréciation (dε &lt; 0) améliore NX (dNX &gt; 0), il faut dNX/dε &lt; 0, donc : "
    "η<sub>x</sub> − η<sub>m</sub> + 1 &lt; 0, soit η<sub>m</sub> − η<sub>x</sub> &gt; 1. "
    "Comme η<sub>m</sub> &gt; 0 et η<sub>x</sub> &lt; 0, on a |η<sub>x</sub>| + |η<sub>m</sub>| &gt; 1.",
    styles['BodyText2']
))

story.append(PageBreak())


# ═══════════════════════════════════════════════
#  SECTION 2: ÉQUILIBRE FINANCIER
# ═══════════════════════════════════════════════
story.append(Paragraph("Section 2 — L'équilibre financier et la mobilité des capitaux", styles['SectionTitle']))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=2))
story.append(Spacer(1, 0.4 * cm))

story.append(Paragraph(
    "Contrairement au marché des biens, les marchés financiers réagissent <i>à la seconde</i>. Cette section "
    "explore les mécanismes d'arbitrage qui lient les taux d'intérêt aux taux de change, et qui constituent "
    "le fondement de la courbe BP du modèle Mundell-Fleming.",
    styles['BodyText2']
))

# 2.1 Parfaite mobilité
story.append(Paragraph("2.1 La parfaite mobilité des capitaux", styles['SubSectionTitle']))

mob_box = ColoredBox(
    "Hypothèse fondamentale",
    [
        Paragraph(
            "Les investisseurs déplacent leurs fonds <b>instantanément</b> et <b>sans coût</b> entre les pays. "
            "Il n'existe que deux actifs dans le monde : des actifs européens (taux i<sub>t</sub>) et "
            "des actifs américains (taux i*<sub>t</sub>). Pour les comparer, il faut les exprimer dans la même monnaie.",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_GREEN, body_bg=LIGHT_GREEN, border_color=ACCENT_GREEN
)
story.append(mob_box)

# 2.2 Spot et Forward
story.append(Paragraph("2.2 Cours Spot et cours Forward", styles['SubSectionTitle']))
story.append(Paragraph(
    "<b>Le cours Spot (E<sub>t</sub>)</b> est le taux de change pour une transaction dont le règlement et la livraison "
    "interviennent immédiatement (sous 2 jours ouvrés). Exemple : j'échange 100€ contre des $ maintenant.",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>Le cours Forward (F<sub>t,T</sub>)</b> est le taux de change fixé aujourd'hui pour une transaction qui sera "
    "exécutée à une date future précise. Exemple : je m'engage aujourd'hui à acheter des $ dans 3 mois à un prix fixé. "
    "Ces termes (spot et forward) s'appliquent à presque tous les marchés financiers et de matières premières.",
    styles['BodyText2']
))

spot_example = ColoredBox(
    "Exemple : Spot vs Forward",
    [
        Paragraph(
            "Une entreprise dispose de 1 000€. Cours Spot : 1€ = 1,10$. Cours Forward à 1 an : 1€ = 1,05$.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Choix 1 (Spot) :</b> Échange immédiat → 1 000 × 1,10 = <b>1 100$</b> tout de suite.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Choix 2 (Forward) :</b> Contrat signé aujourd'hui, exécuté dans 1 an → <b>1 050$</b> dans 1 an "
            "(couverture contre le risque de change).",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(spot_example)

# 2.3 Arbitrage
story.append(Paragraph("2.3 Le mécanisme d'arbitrage financier", styles['SubSectionTitle']))
story.append(Paragraph(
    "L'<b>arbitrage</b> est l'action de tirer profit d'un écart de prix entre deux marchés pour réaliser un gain "
    "<b>sans prendre de risque</b> (<i>free lunch</i>). Sur le marché des changes, si le cours Spot et le cours "
    "Forward ne sont pas cohérents entre eux, les investisseurs achètent la devise là où elle est peu chère et "
    "la revendent là où elle est plus chère. Puisque le prix de revente est fixé par contrat Forward, le gain est garanti.",
    styles['BodyText2']
))
story.append(Paragraph(
    "La <b>force de rappel du marché</b> : en se précipitant sur l'opportunité, les arbitragistes font varier "
    "l'offre et la demande. Leurs actions font monter le prix bas et baisser le prix haut jusqu'à ce que "
    "l'opportunité disparaisse. C'est le principe du <i>« no free lunch »</i> (Milton Friedman).",
    styles['BodyText2']
))

arb_example = ColoredBox(
    "Exemple d'arbitrage",
    [
        Paragraph(
            "<b>Données :</b> E<sub>t</sub> = 1,10 (Spot), F<sub>t</sub> = 1,05 (Forward). Investisseur : 1 000€.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Étape 1 :</b> Change au comptant → 1 000 × 1,10 = 1 100$.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Étape 2 :</b> Signe un contrat Forward pour revendre 1 100$ dans 1 an à 1,05.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Étape 3 :</b> Un an plus tard, il reçoit 1 100 ÷ 1,05 = 1 047,62€.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Bilan :</b> 1 000€ → 1 047,62€. Gain de +4,76% <b>sans risque</b>. → Free lunch !",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_ORANGE, body_bg=LIGHT_ORANGE, border_color=ACCENT_ORANGE
)
story.append(arb_example)

# 2.4 PTIC
story.append(Paragraph("2.4 La parité des taux d'intérêt couverte (PTIC)", styles['SubSectionTitle']))
story.append(Paragraph(
    "Si l'investisseur utilise un contrat Forward pour <b>éliminer le risque de change</b> (couverture/hedging), "
    "l'arbitrage impose que les deux placements rapportent exactement la même chose :",
    styles['BodyText2']
))

ptic_box = ColoredBox(
    "Parité des taux d'intérêt couverte (PTIC)",
    [
        Paragraph("<b>1 + i<sub>t</sub> = (E<sub>t</sub> / F<sub>t</sub>) × (1 + i*<sub>t</sub>)</b>", styles['Formula']),
        Paragraph(
            "Placer 1€ en Europe rapporte (1 + i). Placer 1€ aux USA couvert rapporte : "
            "conversion Spot (1€ → E<sub>t</sub> $), placement US (E<sub>t</sub>(1+i*)), "
            "reconversion Forward (E<sub>t</sub>(1+i*)/F<sub>t</sub> €).",
            styles['BoxBody']
        ),
        Paragraph(
            "C'est une relation d'<b>arbitrage pure</b>, vérifiée en permanence. S'il y a un écart, des flux "
            "massifs rétablissent instantanément l'égalité.",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(ptic_box)

story.append(Paragraph(
    "<b>Mécanisme de rééquilibrage :</b> Si le placement US couvert rapporte plus que le placement européen, "
    "les arbitragistes vendent des euros au Spot (E↓) et achètent des euros au Forward (F↑). "
    "Le ratio E/F diminue mécaniquement jusqu'à ce que le profit disparaisse.",
    styles['BodyText2']
))

ptic_example = ColoredBox(
    "Vérification numérique de la PTIC",
    [
        Paragraph("<b>Données :</b> i = 2%, i* = 5%, E<sub>t</sub> = 1,10, F<sub>t</sub> = 1,1323", styles['BoxBody']),
        Paragraph("Rendement européen : 1 + 0,02 = <b>1,02€</b>", styles['BoxBody']),
        Paragraph("Rendement US couvert : (1,10/1,1323) × (1,05) = 1,155/1,1323 ≈ <b>1,02€</b>", styles['BoxBody']),
        Paragraph(
            "Bien que le taux US soit plus attractif (5% vs 2%), le <b>coût de la couverture</b> annule exactement "
            "cet avantage. Pas de free lunch !",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_GREEN, body_bg=LIGHT_GREEN, border_color=ACCENT_GREEN
)
story.append(ptic_example)

# 2.5 PTINC
story.append(Paragraph("2.5 La parité des taux d'intérêt non couverte (PTINC)", styles['SubSectionTitle']))
story.append(Paragraph(
    "Dans la réalité, tous les investisseurs ne se couvrent pas. Beaucoup acceptent de prendre un <b>risque de "
    "change</b> en pariant sur l'avenir. On remplace le taux certain du contrat (F<sub>t</sub>) par le taux de "
    "change <b>anticipé</b> (E<super>e</super><sub>t+1</sub>).",
    styles['BodyText2']
))

ptinc_box = ColoredBox(
    "Parité des taux d'intérêt non couverte (PTINC)",
    [
        Paragraph(
            "<b>Relation exacte :</b>  1 + i<sub>t</sub> = (E<sub>t</sub> / E<super>e</super><sub>t+1</sub>) × (1 + i*<sub>t</sub>)",
            styles['Formula']
        ),
        Paragraph(
            "<b>Approximation linéaire</b> (pour des taux et variations faibles) :",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>i<sub>t</sub> ≈ i*<sub>t</sub> − (E<super>e</super><sub>t+1</sub> − E<sub>t</sub>) / E<sub>t</sub></b>",
            styles['Formula']
        ),
        Paragraph(
            "Interprétation : pour qu'un investisseur accepte de garder ses fonds en Europe alors que i &lt; i*, "
            "il doit <b>s'attendre à ce que l'Euro s'apprécie</b> (E<super>e</super> &gt; E). "
            "Le manque à gagner sur les intérêts est compensé par le gain sur le change.",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(ptinc_box)
story.append(Spacer(1, 0.2 * cm))

story.append(Paragraph(
    "L'hypothèse de <b>neutralité au risque</b> : en macroéconomie, on suppose souvent que les investisseurs sont "
    "neutres au risque. Pour eux, un profit espéré est équivalent à un profit certain.",
    styles['BodyText2']
))

# PTINC graphique
story.append(Paragraph("2.6 Représentation graphique de la PTINC", styles['SubSectionTitle']))
story.append(Paragraph(
    "En isolant E<sub>t</sub> de la relation exacte, on obtient : "
    "<b>E<sub>t</sub> = E<super>e</super><sub>t+1</sub> × (1 + i<sub>t</sub>) / (1 + i*<sub>t</sub>)</b>. "
    "C'est une <b>droite croissante</b> dans le repère (i, E). La pente est E<super>e</super>/(1+i*) &gt; 0.",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>Propriété remarquable :</b> la courbe passe par le point (i = i*, E = E<super>e</super>). Si les taux "
    "sont identiques, il n'y a aucune raison que le change varie.",
    styles['BodyText2']
))

story.append(Image(g_ptinc_basic, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 3 — La courbe PTINC dans le repère (i, E)", styles['Caption']))

story.append(Paragraph("2.7 Effets sur la PTINC", styles['SubSectionTitle']))
story.append(Paragraph(
    "<b>Hausse du taux d'intérêt domestique (i↑) :</b> Les capitaux affluent vers l'Europe (arbitrage), "
    "la demande d'Euro augmente, provoquant une <b>appréciation immédiate</b> (E↑). On se déplace le long "
    "de la courbe PTINC vers le haut.",
    styles['BodyText2']
))
story.append(Image(g_ptinc_i, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 4 — Hausse de i et appréciation de E", styles['Caption']))

story.append(Paragraph(
    "<b>Hausse des anticipations (E<super>e</super>↑) :</b> Si les investisseurs deviennent plus optimistes sur "
    "l'Euro demain, la droite PTINC se déplace vers le haut et devient plus raide. À taux i constant, l'Euro "
    "est devenu trop attractif, provoquant une <b>appréciation immédiate</b> du cours Spot.",
    styles['BodyText2']
))
story.append(Image(g_ptinc_Ee, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 5 — Hausse des anticipations et déplacement de la PTINC", styles['Caption']))

# 2.8 Application 2022
story.append(Paragraph("2.8 Application : le basculement monétaire de 2022", styles['SubSectionTitle']))
story.append(Paragraph(
    "En 2022, la Fed a agi plus tôt et plus fort que la BCE face à l'inflation (hausse de 0,25% à 5,5% en 18 mois). "
    "Trois raisons : surchauffe par la demande (plans de relance massifs), risque de boucle prix-salaires (chômage "
    "historiquement bas), et un mandat centré sur la stabilité des prix.",
    styles['BodyText2']
))
story.append(Paragraph(
    "Sur la PTINC : la hausse massive de i* (taux US) a <b>déplacé la courbe vers le bas et l'a aplatie</b>. "
    "Même si la BCE a relevé ses taux (de −0,50% à 0,75%), l'effet Fed l'a emporté : l'Euro a chuté de 1,05$ "
    "à 0,96$.",
    styles['BodyText2']
))
story.append(Image(g_ptinc_2022, width=13 * cm, height=9 * cm))
story.append(Paragraph("Figure 6 — Le choc PTINC de 2022 : Fed vs BCE", styles['Caption']))

story.append(PageBreak())


# ═══════════════════════════════════════════════
#  SECTION 3: MODÈLE MUNDELL-FLEMING
# ═══════════════════════════════════════════════
story.append(Paragraph("Section 3 — Le modèle Mundell-Fleming (IS-LM-BP)", styles['SectionTitle']))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=2))
story.append(Spacer(1, 0.4 * cm))

# 3.1 Rappel IS-LM
story.append(Paragraph("3.1 Rappel : le modèle IS-LM en économie fermée", styles['SubSectionTitle']))
story.append(Paragraph(
    "Le modèle IS-LM analyse l'équilibre simultané sur deux marchés fondamentaux à court terme (prix fixes). "
    "Il détermine le couple (Y*, i*) qui assure l'équilibre général de l'économie.",
    styles['BodyText2']
))

# IS
story.append(Paragraph("<b>La courbe IS (Investment-Saving)</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Elle représente l'ensemble des couples (Y, i) pour lesquels le <b>marché des biens et services</b> est à "
    "l'équilibre. Sa pente est <b>négative</b> car : une baisse de i diminue le coût du capital → "
    "l'investissement augmente (I↑) → la demande globale augmente → la production augmente par effet "
    "multiplicateur (Y↑).",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>Équation de IS (éco. fermée) :</b> À partir de Y = C + I + G, avec C = c(Y−T) + C̄ et I = Ī + d<sub>1</sub>Y − d<sub>2</sub>i :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>i = (1/d<sub>2</sub>)(C̄ − cT + Ī + Ḡ) − [(1−c−d<sub>1</sub>)/d<sub>2</sub>] × Y</b>",
    styles['Formula']
))
story.append(Image(g_is, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 7 — La courbe IS dans le repère (Y, i)", styles['Caption']))

story.append(Paragraph(
    "<b>Déplacements de IS :</b> Une hausse de G (relance budgétaire) déplace IS vers la droite. "
    "Une baisse de G (rigueur) la déplace vers la gauche. Tout choc de demande autonome "
    "(C̄, Ī, T) agit de la même façon.",
    styles['BodyText2']
))
story.append(Image(g_is_shift, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 8 — Déplacements de IS (politique budgétaire)", styles['Caption']))

# LM
story.append(Paragraph("<b>La courbe LM (Liquidity-Money)</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Elle représente l'ensemble des couples (Y, i) pour lesquels le <b>marché de la monnaie</b> est à l'équilibre. "
    "Sa pente est <b>positive</b> car : une hausse de Y augmente le volume des transactions → la demande de "
    "monnaie pour motif de transaction augmente → sur un marché où l'offre est fixe, i doit monter pour "
    "réduire la demande spéculative et restaurer l'équilibre.",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>Équation de LM :</b> À l'équilibre L<super>s</super> = l<sub>1</sub>Y − l<sub>2</sub>i, donc :",
    styles['BodyText2']
))
story.append(Paragraph(
    "<b>i = (l<sub>1</sub>/l<sub>2</sub>) × Y − (1/l<sub>2</sub>) × L̄</b>",
    styles['Formula']
))
story.append(Image(g_lm, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 9 — La courbe LM dans le repère (Y, i)", styles['Caption']))

story.append(Paragraph(
    "<b>Déplacements de LM :</b> Une hausse de L<super>s</super> (expansion monétaire) déplace LM vers la droite/bas. "
    "Une baisse de L<super>s</super> (contraction) la déplace vers la gauche/haut.",
    styles['BodyText2']
))
story.append(Image(g_lm_shift, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 10 — Déplacements de LM (politique monétaire)", styles['Caption']))

# IS-LM equilibrium
story.append(Paragraph("<b>L'équilibre IS-LM</b>", styles['SubSubSection']))
story.append(Paragraph(
    "L'équilibre général est atteint lorsque les marchés des biens (IS) et de la monnaie (LM) sont simultanément "
    "à l'équilibre. C'est l'unique couple (Y<super>Ω</super>, i<sup>Ω</sup>) qui vérifie les deux conditions. "
    "Si l'économie n'est pas en Ω, des forces de marché ramènent le système vers ce point.",
    styles['BodyText2']
))
story.append(Image(g_islm, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 11 — L'équilibre IS-LM", styles['Caption']))

# 3.2 Vers l'économie ouverte
story.append(Paragraph("3.2 Vers l'économie ouverte : la contrainte extérieure", styles['SubSectionTitle']))
story.append(Paragraph(
    "Le modèle IS-LM classique est incomplet car il ignore deux réalités : "
    "(1) la <b>fuite par les importations</b> — une relance (Y↑) augmente la consommation de produits étrangers ; "
    "(2) l'<b>arbitrage des capitaux</b> — une hausse de i attire les investisseurs étrangers, modifiant le taux de change E. "
    "Il nous faut donc prendre en compte la <b>balance des paiements (BP)</b> et passer au modèle IS-LM-BP.",
    styles['BodyText2']
))

vigilance_box = ColoredBox(
    "Points de vigilance",
    [
        Paragraph(
            "<b>Terminologie :</b> Dans certains manuels, l'ancienne appellation « Balance des Capitaux » (BK) "
            "correspond en réalité au <b>Compte Financier</b> (SF) de la comptabilité moderne (norme BPM6). "
            "Attention à ne pas confondre avec le Compte de Capital (KA).",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Norme actuelle (post-2015) :</b> SF &gt; 0 = sortie nette de capitaux (achat d'actifs étrangers). "
            "SF &lt; 0 = entrée nette de capitaux. Le signe suit la logique de l'investissement.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Prix fixes :</b> À court terme, P = P* = 1, donc ε = E (taux réel = taux nominal).",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_ORANGE, body_bg=LIGHT_ORANGE, border_color=ACCENT_ORANGE
)
story.append(vigilance_box)

# 3.3 De la comptabilité au modèle
story.append(Paragraph("3.3 De la comptabilité au modèle : construction de la courbe BP", styles['SubSectionTitle']))
story.append(Paragraph(
    "En simplifiant (KA = 0, EO = 0), l'identité comptable NX − SF<sub>priv</sub> ≡ ΔRC nous dit que si les flux "
    "privés ne s'équilibrent pas, la Banque Centrale doit combler l'écart. Dans le <b>modèle</b>, le solde BP "
    "désigne les transactions autonomes (secteur privé uniquement) :",
    styles['BodyText2']
))
story.append(Paragraph("<b>BP = NX − SF<sub>priv</sub></b>", styles['Formula']))

# NX function
story.append(Paragraph("<b>La sphère réelle : exportations nettes (NX)</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Exportations : X = X̄ − x·ε (x &gt; 0 : sensibilité au change). "
    "Importations (en €) : M = m·Y + μ·ε (m = propension marginale à importer, μ &gt; 0). "
    "Donc :",
    styles['BodyText2']
))
story.append(Paragraph("<b>NX = X̄ − mY + vε</b>  avec v = −(x+μ) &lt; 0 (condition ML vérifiée)", styles['Formula']))

# SF function
story.append(Paragraph("<b>La sphère financière : solde financier (SF<sub>priv</sub>)</b>", styles['SubSubSection']))
story.append(Paragraph(
    "Le solde financier résulte de l'arbitrage des investisseurs (PTINC simplifiée avec anticipations statiques) :",
    styles['BodyText2']
))
story.append(Paragraph("<b>SF<sub>priv</sub> = S̄F − k·i</b>", styles['Formula']))
story.append(Paragraph(
    "Où k ≥ 0 est le <b>degré de mobilité des capitaux</b> (la « nervosité » des investisseurs). "
    "Si i↑, les placements domestiques sont plus attractifs, les capitaux entrent (SF↓). "
    "S̄F capture les flux structurels (risque pays, taux mondiaux).",
    styles['BodyText2']
))

# BP equation
story.append(Paragraph("<b>Équation de la droite BP</b>", styles['SubSubSection']))
story.append(Paragraph("En posant BP = NX − SF<sub>priv</sub> = 0 et en isolant i :", styles['BodyText2']))
story.append(Paragraph(
    "<b>i = (m/k) × Y + (S̄F − X̄ − vε) / k</b>",
    styles['Formula']
))
story.append(Paragraph(
    "La <b>pente</b> de BP est m/k. Plus les capitaux sont mobiles (k↑), plus la pente est faible. "
    "Sur cette droite, l'offre et la demande privées de devises s'égalisent (ΔRC = 0).",
    styles['BodyText2']
))

story.append(Image(g_bp, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 12 — La courbe BP et les zones de déséquilibre", styles['Caption']))

story.append(Paragraph(
    "<b>Au-dessus de BP :</b> excédent (BP &gt; 0). Le taux i est élevé, afflux de capitaux, pression à l'appréciation. "
    "<b>En-dessous :</b> déficit (BP &lt; 0). Le taux i est trop faible, fuite de capitaux, pression à la dépréciation.",
    styles['BodyText2']
))

# BP déplacements
story.append(Paragraph("<b>Déplacements de BP :</b>", styles['SubSubSection']))
story.append(Paragraph(
    "BP se déplace vers le <b>bas</b> si : Y<super>RDM</super>↑ (X̄↑), ε↓ (dépréciation), ou S̄F↓ (baisse du risque pays). "
    "BP se déplace vers le <b>haut</b> si : récession mondiale, appréciation réelle, ou hausse de la prime de risque.",
    styles['BodyText2']
))

# Influence de k
story.append(Paragraph("3.4 L'influence de la mobilité des capitaux (k)", styles['SubSectionTitle']))
story.append(Image(g_bp_mob, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 13 — Influence du paramètre k sur la pente de BP", styles['Caption']))

# Tableau des cas
k_data = [
    ["Mobilité", "Pente de BP", "Description"],
    ["k → 0", "Verticale (∞)", "Seul NX impose l'équilibre. Le taux i n'a aucun impact."],
    ["k faible", "Forte (m/k élevé)", "Mobilité imparfaite. Le commerce domine."],
    ["k élevé", "Faible (m/k petit)", "La finance réagit fortement. Peu de hausse de i suffit."],
    ["k → ∞", "Horizontale (0)", "Parfaite mobilité. La moindre variation de i provoque des flux infinis."],
]
k_table = Table(k_data, colWidths=[2.5 * cm, 3 * cm, CONTENT_W - 5.5 * cm])
k_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('ALIGN', (0, 0), (1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, VERY_LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))
story.append(k_table)
story.append(Paragraph("Tableau 1 — Pente de BP selon le degré de mobilité des capitaux", styles['Caption']))

# 3.5 Impact sur IS et LM
story.append(Paragraph("3.5 L'impact de l'ouverture sur IS et LM", styles['SubSectionTitle']))
story.append(Paragraph(
    "<b>Sur IS :</b> L'identité ressources-emplois devient Y = C + I + G + NX. La logique reste la même "
    "(on isole i en fonction de Y), mais les exportations nettes modifient l'ordonnée à l'origine et la pente "
    "de la courbe IS.",
    styles['BodyText2']
))

lm_regime_box = ColoredBox(
    "L'ouverture et la courbe LM : une question de régime",
    [
        Paragraph(
            "<b>Changes flottants :</b> La BC fixe L<super>s</super> de manière exogène. Un déséquilibre BP≠0 est "
            "résolu par le prix (ε). LM est fixe (sauf décision de la BC). BP≠0 → Δε≠0 → ΔIS.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Changes fixes :</b> La BC doit maintenir ε̄. Toute tension BP≠0 modifie les réserves (ΔRC≠0), "
            "ce qui modifie L<super>s</super>. BP≠0 → ΔRC≠0 → ΔL<super>s</super>≠0 → ΔLM.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>Conséquence majeure :</b> En change fixe, la BC perd le contrôle de sa masse monétaire "
            "au profit de la défense de la parité.",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(lm_regime_box)

# 3.6 Equilibre IS-LM-BP
story.append(Paragraph("3.6 L'équilibre global IS-LM-BP", styles['SubSectionTitle']))
story.append(Paragraph(
    "L'équilibre macroéconomique complet impose la satisfaction <b>simultanée de trois conditions</b> : "
    "équilibre du marché des biens (IS), du marché de la monnaie (LM) et de la balance des paiements (BP). "
    "Au point Ω, les trois courbes se croisent.",
    styles['BodyText2']
))
story.append(Image(g_islmbp, width=12 * cm, height=9 * cm))
story.append(Paragraph("Figure 14 — L'équilibre global IS-LM-BP", styles['Caption']))

# Résolution
story.append(Paragraph("3.7 Résolution algébrique du modèle", styles['SubSectionTitle']))
solve_box = ColoredBox(
    "Système de 3 équations à 3 inconnues",
    [
        Paragraph("<b>(IS) :</b> Y = C + I + G + NX (marché des biens)", styles['BoxBody']),
        Paragraph("<b>(LM) :</b> L<super>s</super> = L<super>d</super> (marché monétaire)", styles['BoxBody']),
        Paragraph("<b>(BP) :</b> NX − SF<sub>priv</sub> = 0 (équilibre extérieur)", styles['BoxBody']),
        Paragraph(
            "<b>En changes flottants :</b> Y, i et ε sont endogènes ; L<super>s</super> est exogène.",
            styles['BoxBody']
        ),
        Paragraph(
            "<b>En changes fixes :</b> Y, i et L<super>s</super> sont endogènes ; ε̄ est exogène.",
            styles['BoxBody']
        ),
    ],
    title_bg=MEDIUM_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=MEDIUM_BLUE
)
story.append(solve_box)

story.append(PageBreak())


# ═══════════════════════════════════════════════
#  SECTION 4: EFFICACITÉ DES POLITIQUES
# ═══════════════════════════════════════════════
story.append(Paragraph("Section 4 — Efficacité des politiques économiques en économie ouverte", styles['SectionTitle']))
story.append(HorizontalLine(color=MEDIUM_BLUE, thickness=2))
story.append(Spacer(1, 0.4 * cm))

story.append(Paragraph(
    "C'est ici que le modèle Mundell-Fleming prend toute sa puissance : il montre que l'efficacité des politiques "
    "budgétaire et monétaire dépend fondamentalement du <b>régime de change</b> et du <b>degré de mobilité "
    "des capitaux</b>.",
    styles['BodyText2']
))

# 4.1 CHANGES FLOTTANTS
story.append(Paragraph("4.1 Régime de changes flottants", styles['SubSectionTitle']))

float_box = ColoredBox(
    "Propriétés fondamentales du flottement pur",
    [
        Paragraph("• La BC n'intervient <b>jamais</b> sur le marché des changes.", styles['BoxBody']),
        Paragraph("• ε s'ajuste pour assurer en permanence BP = 0 (<b>endogénéité du change</b>).", styles['BoxBody']),
        Paragraph("• L<super>s</super> est une décision exogène de la BC (<b>autonomie monétaire</b>).", styles['BoxBody']),
        Paragraph("• Toute variation de ε modifie NX et déplace <b>IS</b> (pas LM).", styles['BoxBody']),
        Paragraph("→ Déséquilibre BP → Variation de ε → Variation de NX → Déplacement de IS", styles['BoxBody']),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(float_box)

# Politique budgétaire flottant
story.append(Paragraph("4.1.1 Relance budgétaire (G↑) en changes flottants", styles['SubSubSection']))
story.append(Paragraph(
    "<b>Avec forte mobilité des capitaux (k élevé) :</b> La relance déplace IS vers la droite. "
    "Au point transitoire A, i a augmenté → excédent BP (BP &gt; 0) → appréciation de ε. "
    "L'appréciation dégrade les exportations nettes, repoussant IS vers la gauche et BP vers le haut. "
    "Résultat : le revenu final est <b>inférieur</b> à celui espéré. L'appréciation a exercé un <b>effet "
    "d'éviction par le commerce extérieur</b>.",
    styles['BodyText2']
))
story.append(Image(g_fiscal_float_high, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 15 — Relance budgétaire en changes flottants (k élevé)", styles['Caption']))

story.append(Paragraph(
    "<b>Avec parfaite mobilité (k → ∞) :</b> BP est horizontale à i*. Toute hausse de i au-dessus de i* "
    "provoque un afflux infini de capitaux → appréciation massive → NX chute totalement. "
    "IS revient <b>exactement</b> à sa position initiale. Le revenu Y n'a pas bougé : <b>efficacité nulle</b>. "
    "La composition de la demande a changé (plus de G, moins de NX), mais pas le niveau global.",
    styles['BodyText2']
))
story.append(Image(g_fiscal_float_perf, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 16 — Relance budgétaire avec k → ∞ : éviction totale", styles['Caption']))

# Le « bug dans la matrice »
story.append(Paragraph("4.1.2 Le rôle clé de la mobilité des capitaux", styles['SubSubSection']))
story.append(Paragraph(
    "<b>Le constat paradoxal :</b> avec k → 0 (absence de mobilité), la relance est <b>plus efficace</b> "
    "qu'en économie fermée ! Au point transitoire A, le revenu élevé crée un déficit commercial (BP &lt; 0) → "
    "dépréciation → boost de compétitivité → IS se déplace <i>encore plus</i> à droite. La dépréciation "
    "<b>amplifie</b> le multiplicateur budgétaire.",
    styles['BodyText2']
))

condition_box = ColoredBox(
    "Condition mathématique de l'efficacité budgétaire",
    [
        Paragraph(
            "Le signe de l'ajustement du change dépend de la position du point A par rapport à BP, "
            "c'est-à-dire du rapport entre la <b>pente de LM</b> (l<sub>1</sub>/l<sub>2</sub>) et la "
            "<b>pente de BP</b> (m/k) :",
            styles['BoxBody']
        ),
        Paragraph(
            "• <b>Pente BP &gt; Pente LM</b> (m/k &gt; l<sub>1</sub>/l<sub>2</sub>, k faible) : "
            "A est sous BP → déficit → <b>dépréciation → relance amplifiée</b>",
            styles['BoxBody']
        ),
        Paragraph(
            "• <b>Pente LM &gt; Pente BP</b> (l<sub>1</sub>/l<sub>2</sub> &gt; m/k, k élevé) : "
            "A est au-dessus de BP → excédent → <b>appréciation → relance freinée</b>",
            styles['BoxBody']
        ),
        Paragraph(
            "• <b>Seuil de bascule :</b> si k = m·l<sub>2</sub>/l<sub>1</sub>, A tombe pile sur BP. "
            "L'ouverture est neutre.",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_ORANGE, body_bg=LIGHT_ORANGE, border_color=ACCENT_ORANGE
)
story.append(condition_box)

# Synthèse budget flottant
budget_float_data = [
    [Paragraph("<b>Mobilité</b>", styles['TableHeader']),
     Paragraph("<b>Pente</b>", styles['TableHeader']),
     Paragraph("<b>Ajust. change</b>", styles['TableHeader']),
     Paragraph("<b>Impact sur Y</b>", styles['TableHeader'])],
    ["k → 0", "BP verticale", "Dépréciation max", "Maximum (boost)"],
    ["k faible", "BP > LM", "Dépréciation", "Amplifié (> éco. fermée)"],
    ["k élevé", "LM > BP", "Appréciation", "Affaibli (< éco. fermée)"],
    ["k → ∞", "BP horizontale", "Appréciation max", "Nul (éviction totale)"],
]
budget_float_table = Table(budget_float_data, colWidths=[2.5*cm, 3*cm, 3.5*cm, CONTENT_W - 9*cm])
budget_float_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, VERY_LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))
story.append(budget_float_table)
story.append(Paragraph("Tableau 2 — Efficacité de la politique budgétaire selon k (changes flottants)", styles['Caption']))

# Politique monétaire flottant
story.append(Paragraph("4.1.3 Politique monétaire expansionniste (L<super>s</super>↑) en changes flottants", styles['SubSubSection']))
story.append(Paragraph(
    "La hausse de L<super>s</super> déplace LM vers la droite → i chute → au point A, déficit BP → "
    "<b>dépréciation</b> (ε↓). Le gain de compétitivité déplace IS vers la droite et BP vers le bas. "
    "La dépréciation <b>amplifie</b> l'effet initial de la baisse des taux. Il n'y a pas de conflit entre "
    "les pentes ici : la baisse de i entraîne <b>toujours</b> une sortie de capitaux et une dépréciation.",
    styles['BodyText2']
))
story.append(Image(g_monetary_float, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 17 — Politique monétaire expansionniste en changes flottants", styles['Caption']))

retenir_box = ColoredBox(
    "À retenir",
    [
        Paragraph(
            "En changes flottants, le change agit comme un <b>accélérateur</b> pour la politique monétaire "
            "(il dope NX en plus de I) mais comme un <b>frein</b> pour la politique budgétaire "
            "(il dégrade NX quand k est élevé). Plus k est élevé, plus la monnaie est efficace et le budget inefficace.",
            styles['BoxBody']
        ),
    ],
    title_bg=ACCENT_GREEN, body_bg=LIGHT_GREEN, border_color=ACCENT_GREEN
)
story.append(retenir_box)

# 4.2 CHANGES FIXES
story.append(Paragraph("4.2 Régime de changes fixes", styles['SubSectionTitle']))

fix_box = ColoredBox(
    "Propriétés fondamentales du change fixe pur",
    [
        Paragraph("• La BC s'engage à défendre une <b>parité cible</b> (ε̄) envers et contre tout.", styles['BoxBody']),
        Paragraph("• L<super>s</super> devient <b>endogène</b>. Elle s'ajuste pour maintenir le change.", styles['BoxBody']),
        Paragraph("• LM est la <b>variable d'ajustement</b> et se déplace pour assurer le triple équilibre.", styles['BoxBody']),
        Paragraph("→ Déséquilibre BP → Pression sur ε → Intervention BC → Δ L<super>s</super> → Déplacement de LM", styles['BoxBody']),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(fix_box)

# Budget fixe
story.append(Paragraph("4.2.1 Relance budgétaire (G↑) en changes fixes avec k → ∞", styles['SubSubSection']))
story.append(Paragraph(
    "La forte mobilité des capitaux devient <b>l'alliée</b> de la politique budgétaire en change fixe. "
    "G↑ déplace IS vers la droite → au point A, i &gt; i* → excédent BP → pression à l'appréciation. "
    "Pour défendre ε̄, la BC vend des euros → accumule des réserves (ΔRC↑) → L<super>s</super> augmente "
    "automatiquement → LM se déplace vers la droite jusqu'à ce que le triple équilibre soit atteint. "
    "Résultat : <b>efficacité maximale</b>. LM accompagne la relance.",
    styles['BodyText2']
))
story.append(Image(g_fiscal_fixed, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 18 — Relance budgétaire en changes fixes (k → ∞)", styles['Caption']))

# Monétaire fixe
story.append(Paragraph("4.2.2 Politique monétaire (L<super>s</super>↑) en changes fixes : inefficace", styles['SubSubSection']))
story.append(Paragraph(
    "C'est le <b>paradoxe des changes fixes</b> : la BC perd son autonomie monétaire. "
    "L<super>s</super>↑ déplace LM vers la droite → i chute → au point A, déficit BP → pression à la "
    "dépréciation. Pour défendre ε̄, la BC doit racheter sa propre monnaie → ΔRC↓ → L<super>s</super> se "
    "contracte → LM revient <b>exactement</b> à son point de départ. <b>Inefficacité totale.</b>",
    styles['BodyText2']
))
story.append(Image(g_monetary_fixed, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 19 — Politique monétaire en changes fixes : inefficacité totale", styles['Caption']))

# 4.3 Triangle de Mundell
story.append(Paragraph("4.3 Le triangle d'incompatibilité de Mundell", styles['SubSectionTitle']))
story.append(Paragraph(
    "Le modèle IS-LM-BP démontre qu'un pays ne peut atteindre <b>simultanément</b> ces trois objectifs : "
    "(1) l'autonomie de la politique monétaire, (2) un taux de change fixe, (3) la libre circulation des capitaux. "
    "Il doit en <b>sacrifier un</b>.",
    styles['BodyText2']
))
story.append(Image(g_triangle, width=13 * cm, height=11 * cm))
story.append(Paragraph("Figure 20 — Le triangle d'incompatibilité de Mundell", styles['Caption']))

triangle_data = [
    [Paragraph("<b>Option</b>", styles['TableHeader']),
     Paragraph("<b>Sacrifie</b>", styles['TableHeader']),
     Paragraph("<b>Exemple</b>", styles['TableHeader']),
     Paragraph("<b>Coût</b>", styles['TableHeader'])],
    ["A : Flottement", "Changes fixes", "USA, Zone Euro\n(vs RDM)", "Incertitude de change"],
    ["B : Ancrage fixe", "Autonomie\nmonétaire", "Hong Kong\n(HKD ancré au USD)", "i dicté par la Fed"],
    ["C : Contrôle\ndes capitaux", "Mobilité\ndes capitaux", "Chine\n(gestion historique)", "Frein aux\ninvestissements"],
]
triangle_table = Table(triangle_data, colWidths=[3*cm, 2.5*cm, 3.5*cm, CONTENT_W - 9*cm])
triangle_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, VERY_LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))
story.append(triangle_table)
story.append(Paragraph("Tableau 3 — Les trois options du triangle de Mundell", styles['Caption']))

# 4.4 Synthèse
story.append(Paragraph("4.4 Tableau récapitulatif : efficacité des politiques avec k → ∞", styles['SubSectionTitle']))

final_data = [
    [Paragraph("<b>Régime</b>", styles['TableHeader']),
     Paragraph("<b>Politique budgétaire (G↑)</b>", styles['TableHeader']),
     Paragraph("<b>Politique monétaire (L<super>s</super>↑)</b>", styles['TableHeader'])],
    [Paragraph("<b>Changes flottants</b>", styles['TableCell']),
     Paragraph("<b>NULLE</b><br/>(Éviction totale par ε↑)", styles['TableCell']),
     Paragraph("<b>MAXIMALE</b><br/>(Boost total par ε↓)", styles['TableCell'])],
    [Paragraph("<b>Changes fixes</b>", styles['TableCell']),
     Paragraph("<b>MAXIMALE</b><br/>(Accompagnement de L<super>s</super>↑)", styles['TableCell']),
     Paragraph("<b>NULLE</b><br/>(Impuissance via ΔRC↓)", styles['TableCell'])],
]
final_table = Table(final_data, colWidths=[3.5*cm, (CONTENT_W - 3.5*cm)/2, (CONTENT_W - 3.5*cm)/2])
final_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('BACKGROUND', (1, 1), (1, 1), LIGHT_RED),
    ('BACKGROUND', (2, 1), (2, 1), LIGHT_GREEN),
    ('BACKGROUND', (1, 2), (1, 2), LIGHT_GREEN),
    ('BACKGROUND', (2, 2), (2, 2), LIGHT_RED),
    ('GRID', (0, 0), (-1, -1), 1, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
]))
story.append(final_table)
story.append(Paragraph("Tableau 4 — Efficacité des politiques économiques avec k → ∞", styles['Caption']))

story.append(Paragraph(
    "<b>En changes flottants :</b> le change est libre — il « sabote » le budget (appréciation) mais "
    "« booste » la monnaie (dépréciation). <b>En changes fixes :</b> le change est une contrainte — la BC "
    "perd son autonomie et doit « aider » le budget pour sauver la parité.",
    styles['BodyText2']
))

# 4.5 Étude de cas
story.append(Paragraph("4.5 Étude de cas : le policy mix américain (2022-2024)", styles['SubSectionTitle']))
story.append(Paragraph(
    "Les États-Unis ont été soumis à deux forces contradictoires : une <b>relance budgétaire</b> massive "
    "(Inflation Reduction Act, CHIPS Act → IS vers la droite) couplée à un <b>resserrement monétaire</b> "
    "agressif de la Fed (taux de 0,25% à 5,5% → LM vers la gauche).",
    styles['BodyText2']
))
story.append(Paragraph(
    "Résultat dans le modèle : au point A, le taux i est très élevé → excédent BP massif → forte "
    "appréciation du dollar. IS recule (moins d'exportations nettes), BP remonte. Le <b>revenu reste proche "
    "de Y<sub>0</sub></b> (croissance résiliente) mais avec des <b>taux d'intérêt bien plus hauts</b> et "
    "un <b>dollar fort</b>.",
    styles['BodyText2']
))
story.append(Image(g_us_mix, width=13 * cm, height=9.5 * cm))
story.append(Paragraph("Figure 21 — Policy mix américain 2022-2024 dans le modèle IS-LM-BP", styles['Caption']))

us_data = [
    [Paragraph("<b>Variable</b>", styles['TableHeader']),
     Paragraph("<b>Théorie</b>", styles['TableHeader']),
     Paragraph("<b>Réalité</b>", styles['TableHeader']),
     Paragraph("<b>Explication</b>", styles['TableHeader'])],
    ["Revenu Y", "Ambigu", "Croissance résiliente", "IS a compensé le frein de LM"],
    ["Taux i", "Hausse (↑↑)", "5,5% en 2024", "Cumul du besoin public\net rareté monétaire"],
    ["Change ε", "Appréciation", "Dollar fort", "Différentiel de taux\nattire les capitaux"],
]
us_table = Table(us_data, colWidths=[2.5*cm, 2.5*cm, 3.5*cm, CONTENT_W - 8.5*cm])
us_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), white),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, VERY_LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, GRAY_BORDER),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))
story.append(us_table)
story.append(Paragraph("Tableau 5 — Le modèle face au réel : policy mix américain", styles['Caption']))

conclusion_box = ColoredBox(
    "Conclusion du chapitre",
    [
        Paragraph(
            "Le cas américain confirme la prédiction du modèle Mundell-Fleming : en changes flottants, "
            "une politique budgétaire agressive (G↑) couplée à une politique monétaire rigoureuse (L<super>s</super>↓) "
            "crée une <b>monnaie forte</b> et des <b>taux élevés</b>, tout en maintenant une croissance modérée "
            "grâce à la compensation partielle entre les deux instruments.",
            styles['BoxBody']
        ),
    ],
    title_bg=DARK_BLUE, body_bg=VERY_LIGHT_BLUE, border_color=DARK_BLUE
)
story.append(conclusion_box)

# ═══════════════════════════════════════════════
#  BUILD
# ═══════════════════════════════════════════════
print("Building PDF...")
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f"PDF generated: {OUTPUT_PATH}")