import type { ReactNode } from 'react';

interface CoursePageShellProps {
  children: ReactNode;
  className?: string;
}

interface CoursePaperProps {
  children: ReactNode;
  className?: string;
}

interface CourseFlowProps {
  children: ReactNode;
  className?: string;
}

export function CoursePageShell({ children, className = '' }: CoursePageShellProps) {
  return <main className={`course-page ${className}`.trim()}>{children}</main>;
}

export function CoursePaper({ children, className = '' }: CoursePaperProps) {
  return <div className={`course-paper ${className}`.trim()}>{children}</div>;
}

export function CourseFlow({ children, className = '' }: CourseFlowProps) {
  return <div className={`course-flow ${className}`.trim()}>{children}</div>;
}

