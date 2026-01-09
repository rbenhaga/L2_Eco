/**
 * StatsLayout - Uses unified CourseLayout
 */

import { CourseLayout } from '../../../../features/course';
import { getSubject } from '../../../../config/semesters';
import { statsNavGroups } from '../config/navigation';

const statsSubject = getSubject('s2', 'stats')!;

export function StatsLayout() {
  return (
    <CourseLayout
      subject={statsSubject}
      navGroups={statsNavGroups}
      footerText="Guide de révision Statistiques L2 · Partiel 2024-2025"
    />
  );
}
