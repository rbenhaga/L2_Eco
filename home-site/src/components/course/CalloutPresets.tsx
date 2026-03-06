import type { ReactNode } from 'react';
import { Callout } from '../Callout';
import { Math } from '../Math';

interface BoxProps {
  title: string;
  children: ReactNode;
}

export function DefBox({ title, children }: BoxProps) {
  return <Callout type="key" title={title}>{children}</Callout>;
}

export function ThmBox({ title, children }: BoxProps) {
  return <Callout type="important" title={title}>{children}</Callout>;
}

export function MethBox({ title, children }: BoxProps) {
  return <Callout type="method" title={title}>{children}</Callout>;
}

export function AlertBox({ title, children }: BoxProps) {
  return <Callout type="warning" title={title}>{children}</Callout>;
}

export function ExBox({ title, children }: BoxProps) {
  return <Callout type="example" title={title}>{children}</Callout>;
}

export function DemoBox({ title, children }: BoxProps) {
  return <Callout type="insight" title={title}>{children}</Callout>;
}

export function Formula({ children }: { children: string }) {
  return <Math display>{children}</Math>;
}
