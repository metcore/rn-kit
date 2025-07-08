import React, { type ReactElement } from 'react';

export interface TabItemProps {
  name: string | number;
  component: React.ComponentType<any>;
}
export interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  onChangeTab?: (e: any) => void;
}
