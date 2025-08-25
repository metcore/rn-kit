import React, { type ReactElement } from 'react';

export interface TabItemProps {
  name: string | number;
  children: React.ReactElement<any>;
  height?: number;
}
export interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  renderHeader?: React.ReactElement;
  onChangeTab?: (e: any) => void;
}
