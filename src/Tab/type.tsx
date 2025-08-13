import React, { type ReactElement } from 'react';

export interface TabItemProps {
  name: string | number;
  component: React.ReactNode<any>;
}
export interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  onChangeTab?: (e: any) => void;
}
