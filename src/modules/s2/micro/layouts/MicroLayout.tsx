/**
 * MicroLayout - Uses unified CourseLayout
 */

import { CourseLayout } from '../../../../features/course';
import { getSubject } from '../../../../config/semesters';
import { microNavGroups } from '../config/navigation';

const microSubject = getSubject('s2', 'micro')!;

export function MicroLayout() {
  return (
    <CourseLayout
      subject={microSubject}
      navGroups={microNavGroups}
      footerText="Guide de révision Microéconomie L2 · Partiel CM 2024-2025"
    />
  );
}
