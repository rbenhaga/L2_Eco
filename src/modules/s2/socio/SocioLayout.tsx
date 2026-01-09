/**
 * SocioLayout - Uses unified CourseLayout
 */

import { CourseLayout } from '../../../features/course';
import { getSubject } from '../../../config/semesters';
import { socioNavGroups } from './config/navigation';

const socioSubject = getSubject('s2', 'socio')!;

export function SocioLayout() {
  return (
    <CourseLayout
      subject={socioSubject}
      navGroups={socioNavGroups}
      footerText="Guide de révision Sociologie L2 · Partiel 2024-2025"
    />
  );
}
