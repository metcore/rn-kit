import type { ReactNode } from 'react';

export interface AccordionContextType {
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

export type AccordionRenderHeaderProps = ReactNode | null;

export interface AccordionProps {
  children: ReactNode;
  renderHeader?: AccordionRenderHeaderProps;
  isOpen?: boolean;
  onCollapse?: (isOpen: boolean) => void;
  variant?: 'default' | 'borderless';
  testID?: string;
}
export interface AccordionItemProps {
  children: ReactNode;
  index?: number;
  testID?: string;
}
