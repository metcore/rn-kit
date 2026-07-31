import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Accordion from '../Accordion/Accordion';
import AccordionItem from '../Accordion/AccordionItem';
import Step from '../Step/Step';
import StepItem from '../Step/StepItem';
import Timeline from '../Timeline/Timeline';
import TimelineItem from '../Timeline/TimelineItem';

// TabItem is deliberately absent: it renders null and exists only to carry
// config that <Tab> reads, and Tab derives its own `item-N` / `panel-N` ids
// from the Tab testID. A testID on TabItem would have nothing to land on.
// Its coverage lives in Tab.test.tsx.

describe('AccordionItem', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <AccordionItem testID="row">
        <Text>isi</Text>
      </AccordionItem>
    );

    expect(getByText('isi')).toBeTruthy();
  });

  it('forwards testID through to the ListItem it wraps', () => {
    const { getByTestId } = render(
      <AccordionItem testID="row">
        <Text>isi</Text>
      </AccordionItem>
    );

    expect(getByTestId('row')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <AccordionItem>
        <Text>isi</Text>
      </AccordionItem>
    );

    expect(getByText('isi')).toBeTruthy();
    expect(queryByTestId('row')).toBeNull();
  });

  it('is what an open Accordion reveals', () => {
    const { getByTestId, queryByText } = render(
      <Accordion testID="faq" renderHeader={<Text>Header</Text>}>
        <AccordionItem testID="row">
          <Text>isi</Text>
        </AccordionItem>
      </Accordion>
    );

    expect(queryByText('isi')).toBeNull();

    fireEvent.press(getByTestId('faq-trigger'));

    expect(getByTestId('row')).toBeTruthy();
  });
});

describe('Timeline', () => {
  it('renders its items and takes a testID', () => {
    const { getByTestId, getByText } = render(
      <Timeline testID="history">
        <TimelineItem testID="history-item-0">
          <Text>langkah satu</Text>
        </TimelineItem>
      </Timeline>
    );

    expect(getByTestId('history')).toBeTruthy();
    expect(getByTestId('history-item-0')).toBeTruthy();
    expect(getByText('langkah satu')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <Timeline>
        <TimelineItem>
          <Text>langkah satu</Text>
        </TimelineItem>
      </Timeline>
    );

    expect(getByText('langkah satu')).toBeTruthy();
    expect(queryByTestId('history')).toBeNull();
    expect(queryByTestId('history-item-0')).toBeNull();
  });
});

describe('Step', () => {
  // An array, not a fragment: Step walks its children with
  // React.Children.toArray, which counts a fragment as one child and would
  // render both bodies at once.
  const steps = [
    <StepItem key="0" testID="wizard-step-0">
      <Text>isi satu</Text>
    </StepItem>,
    <StepItem key="1" testID="wizard-step-1">
      <Text>isi dua</Text>
    </StepItem>,
  ];

  it('shows only the current step body', () => {
    const { getByText, queryByText } = render(
      <Step testID="wizard" current={0} onChangeStep={() => {}}>
        {steps}
      </Step>
    );

    expect(getByText('isi satu')).toBeTruthy();
    expect(queryByText('isi dua')).toBeNull();
  });

  it('swaps the body when current moves', () => {
    const { getByText, queryByText, rerender } = render(
      <Step testID="wizard" current={0} onChangeStep={() => {}}>
        {steps}
      </Step>
    );

    rerender(
      <Step testID="wizard" current={1} onChangeStep={() => {}}>
        {steps}
      </Step>
    );

    expect(getByText('isi dua')).toBeTruthy();
    expect(queryByText('isi satu')).toBeNull();
  });

  it('reports the current index through onChangeStep', () => {
    const onChangeStep = jest.fn();
    const { rerender } = render(
      <Step testID="wizard" current={0} onChangeStep={onChangeStep}>
        {steps}
      </Step>
    );

    expect(onChangeStep).toHaveBeenCalledWith(0);

    rerender(
      <Step testID="wizard" current={1} onChangeStep={onChangeStep}>
        {steps}
      </Step>
    );

    expect(onChangeStep).toHaveBeenLastCalledWith(1);
  });

  it('numbers the pending headers and ticks the completed ones', () => {
    const { getByText, queryByText } = render(
      <Step testID="wizard" current={1} onChangeStep={() => {}}>
        {steps}
      </Step>
    );

    // Step 1 is behind `current`, so its number gives way to a check icon.
    expect(queryByText('1')).toBeNull();
    expect(getByText('2')).toBeTruthy();
  });

  it('applies the testID it was given', () => {
    const { getByTestId } = render(
      <Step testID="wizard" current={0} onChangeStep={() => {}}>
        {steps}
      </Step>
    );

    expect(getByTestId('wizard')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <Step current={0} onChangeStep={() => {}}>
        <StepItem>
          <Text>isi satu</Text>
        </StepItem>
      </Step>
    );

    expect(getByText('isi satu')).toBeTruthy();
    expect(queryByTestId('wizard')).toBeNull();
  });
});
