import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Tab from '../Tab/Tab';
import TabItem from '../Tab/TabItem';

// react-native-pager-view ships its "react-native" package.json field pointing
// at un-transpiled TS source, which the RN jest preset's transformIgnorePatterns
// does not cover (it only exempts react-native/@react-native packages). Loading
// it for real fails with "Cannot use import statement outside a module". Stub it
// with a minimal View-based mock so Tab (and only Tab, scoped to this file) can
// be rendered under jest.
jest.mock('react-native-pager-view', () => {
  const ReactActual = require('react');
  const RN = require('react-native');
  const PagerView = ReactActual.forwardRef(
    (props: any, ref: React.Ref<any>) => {
      ReactActual.useImperativeHandle(ref, () => ({
        setPage: () => {},
        setPageWithoutAnimation: () => {},
      }));
      return ReactActual.createElement(RN.View, null, props.children);
    }
  );
  return { __esModule: true, default: PagerView };
});

describe('Tab testID', () => {
  it('derives per-index tab header testIDs', () => {
    const { getByTestId } = render(
      <Tab testID="settings">
        <TabItem name="A">
          <Text>A</Text>
        </TabItem>
        <TabItem name="B">
          <Text>B</Text>
        </TabItem>
      </Tab>
    );
    expect(getByTestId('settings-item-0')).toBeTruthy();
    expect(getByTestId('settings-item-1')).toBeTruthy();
  });

  it('derives per-index tab panel testIDs', () => {
    const { getByTestId } = render(
      <Tab testID="settings">
        <TabItem name="A">
          <Text>A</Text>
        </TabItem>
        <TabItem name="B">
          <Text>B</Text>
        </TabItem>
      </Tab>
    );
    expect(getByTestId('settings-panel-0')).toBeTruthy();
    expect(getByTestId('settings-panel-1')).toBeTruthy();
  });

  it('renders no derived testID when testID prop is omitted', () => {
    const { queryByTestId } = render(
      <Tab>
        <TabItem name="A">
          <Text>A</Text>
        </TabItem>
      </Tab>
    );
    expect(queryByTestId('undefined-item-0')).toBeNull();
  });
});

describe('Tab behaviour', () => {
  it('reports the index of a newly tapped tab', () => {
    const onChangeTab = jest.fn();
    const { getByTestId } = render(
      <Tab testID="settings" onChangeTab={onChangeTab}>
        <TabItem name="One">
          <Text>first</Text>
        </TabItem>
        <TabItem name="Two">
          <Text>second</Text>
        </TabItem>
      </Tab>
    );

    fireEvent.press(getByTestId('settings-item-1'));

    expect(onChangeTab).toHaveBeenCalledWith(1);
  });

  it('stays quiet when the active tab is tapped again', () => {
    const onChangeTab = jest.fn();
    const { getByTestId } = render(
      <Tab testID="settings" onChangeTab={onChangeTab}>
        <TabItem name="One">
          <Text>first</Text>
        </TabItem>
        <TabItem name="Two">
          <Text>second</Text>
        </TabItem>
      </Tab>
    );

    fireEvent.press(getByTestId('settings-item-0'));

    expect(onChangeTab).not.toHaveBeenCalled();
  });
});
