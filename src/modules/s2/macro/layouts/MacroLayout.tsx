/**
 * MacroLayout - Uses unified CourseLayout
 */

import { CourseLayout } from '../../../../features/course';
import { getSubject } from '../../../../config/semesters';
import { macroNavGroups } from '../config/navigation';

const macroSubject = getSubject('s2', 'macro')!;

export function MacroLayout() {
  return (
    <CourseLayout
      subject={macroSubject}
      navGroups={macroNavGroups}
      footerText="Guide de révision Macroéconomie L2 · Partiel CM 2024-2025"
    />
  );
}
