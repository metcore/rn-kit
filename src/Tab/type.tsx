import React, { type ReactElement } from 'react';

export interface TabItemProps {
  name: string | number;
  children: React.ReactNode;
}
export interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  onChangeTab?: (e: any) => void;
}
