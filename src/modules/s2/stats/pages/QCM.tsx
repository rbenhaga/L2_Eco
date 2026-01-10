/**
 * Statistiques QCM Page
 * Uses the unified QCMPlayer with extracted data
 */

import { QCMPlayer } from '../../../../features/qcm';
import { chapters, totalQuestions } from '../data/chapters';
import type { QCMConfig } from '../../../../features/qcm';

// Color mapping from Tailwind color names to hex
const colorMap: Record<string, string> = {
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  amber: '#f59e0b',
  rose: '#f43f5e',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  indigo: '#6366f1',
  slate: '#64748b',
};

// Convert our chapter data format to QCMConfig format
const qcmConfig: QCMConfig = {
  subject: 'Statistiques',
  subjectId: 'stats',
  description: `${totalQuestions} questions · cours + annales`,
  chapters: chapters.map(ch => ({
    id: ch.id,
    title: ch.title,
    subtitle: ch.subtitle,
    color: colorMap[ch.color] || '#3b82f6',
    questions: ch.questions.map((q, idx) => ({
      id: `${ch.id}-${q.id || idx + 1}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correct,
      explanation: q.explanation,
    })),
  })),
};

export function QCM() {
  return (
    <QCMPlayer
      config={qcmConfig}
      subjectColor="#3b82f6"
      backLink="/stats"
      subjectId="stats"
    />
  );
}
