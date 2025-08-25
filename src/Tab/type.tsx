import React, { type ReactElement } from 'react';

export type TabItemProps =
  | {
      name: string | number;
      children: React.ReactElement<any>;
      height?: number;
      renderTabName?: never;
    }
  | {
      name?: string | number;
      children: React.ReactElement<any>;
      height?: number;
      renderTabName: (props: { isActive: boolean }) => React.ReactElement;
    };

export interface TabProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  current?: number;
  renderHeader?: React.ReactElement;
  onChangeTab?: (e: any) => void;
}
