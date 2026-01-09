import { QCMPlayer } from '../../../../features/qcm';
import { chapters, totalQuestions } from '../data/chapters';
import type { QCMConfig } from '../../../../features/qcm';

const CHAPTER_COLORS: Record<string, string> = {
  blue: '#3b82f6',
  green: '#22c55e',
  violet: '#8b5cf6',
  default: '#8b5cf6'
};

const qcmConfig: QCMConfig = {
  subject: 'Sociologie',
  subjectId: 'socio',
  description: `${totalQuestions} questions · histoire & économie`,
  chapters: chapters.map(chapter => ({
    id: chapter.id,
    title: chapter.title,
    subtitle: chapter.subtitle,
    color: CHAPTER_COLORS[chapter.color] || CHAPTER_COLORS.default,
    questions: chapter.questions.map((q, idx) => ({
      id: `${chapter.id}-${q.id || idx}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correct,
      explanation: q.explanation
    }))
  }))
};

export default function SocioQCM() {
  return (
    <QCMPlayer
      config={qcmConfig}
      subjectColor="#8b5cf6"
      backLink="/socio"
    />
  );
}
