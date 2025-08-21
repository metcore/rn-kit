import React, { type ReactElement } from 'react';

export interface TabItemProps {
  index?: number;
  isActive?: boolean;
  isLast?: boolean;
  isHeader?: boolean;
  name: string | number;
  children: React.ReactNode;
  onPressHeader?: (index: number) => void;
}
export interface TabProps {
  stickyHeader?: boolean;
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  onChangeTab?: (e: any) => void;
}
