import React, { type ReactElement } from 'react';
import type { RefreshControlProps } from 'react-native';

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
  refreshControl?: React.ReactElement<
    RefreshControlProps,
    string | React.JSXElementConstructor<any>
  >;
}
