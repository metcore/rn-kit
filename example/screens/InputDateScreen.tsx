import {
  Container,
  dateFormatter,
  InputDate,
  type DateProps,
  type DateRangeProps,
} from '@herca/rn-kit';
import { useState } from 'react';
import { spacing } from '../../src/styles/spacing';

export default function InputDateScreen() {
  const [singleDate, setSingleDate] = useState<DateProps>(new Date());

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: new Date(),
    endDate,
  });

  return (
    <Container style={spacing.gap[8]}>
      <InputDate label="Basic Single Date" placeholder="Select Date" />

      <InputDate
        mode="range"
        label="Basic Range Date"
        placeholder="Select Date"
        placeholderDateEnd="Select End Date"
      />

      <InputDate
        label="Single Date Custom Value"
        placeholder="Select Date"
        value={dateFormatter({ date: singleDate })}
        datePickerProps={{
          value: {
            date: singleDate,
          },
        }}
        onDateChange={(val) => {
          setSingleDate(val.date);
        }}
      />

      <InputDate
        label="Date Range Custom Value"
        mode="range"
        placeholder="Select Date"
        placeholderDateEnd="Select End Date"
        value={dateFormatter({
          date: dateRange?.startDate,
        })}
        valueDateEnd={dateFormatter({
          date: dateRange?.endDate,
        })}
        datePickerProps={{
          value: {
            startDate: dateRange?.startDate,
            endDate: dateRange?.endDate,
          },
        }}
        onDateChange={(val) => {
          setDateRange(val);
        }}
      />

      <InputDate
        label="Custom Language"
        placeholder="Select Date"
        language="en"
      />
    </Container>
  );
}
