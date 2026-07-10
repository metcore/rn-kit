import {
  Button,
  Calendar,
  Card,
  Color,
  Container,
  dateFormatter,
  Typography,
  type DateRangeProps,
} from '@herca/rn-kit';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import type { DateProps } from '../../src/Calendar/CalendarPropsType';

export default function CalendarScreen() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState<string | null | undefined>(
    dateFormatter({ date: firstDayOfMonth })
  );
  const [endDate, setEndDate] = useState<string | null | undefined>(
    dateFormatter({ date: lastDayOfMonth })
  );

  const formatDate = (date: DateProps) => {
    if (!date) return null;
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const hanOnChange = (obj: DateRangeProps) => {
    setStartDate(formatDate(obj.startDate));
    setEndDate(formatDate(obj.endDate));

    console.log({ obj });
  };

  console.log({ startDate, endDate });
  return (
    <Container>
      <Button
        title="reset"
        onPress={() => {
          setStartDate(undefined);
          setEndDate(undefined);
        }}
      />
      <ScrollView>
        <Typography>Mode : Range</Typography>
        <Card>
          <Calendar
            mode="range"
            dateStart={startDate}
            dateEnd={endDate}
            onChange={hanOnChange}
            onMonthChange={(month) => console.log({ month })}
            onYearChange={(year) => console.log({ year })}
            disabledDays={{
              0: {
                backgroundColor: Color.danger[50],
                textColor: Color.danger[400],
              },
              6: true,
              5: false,
            }}
            minDate={new Date(2025, 5, 5)}
            // maxDate={new Date(2025, 6, 20)}
            dayName={['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'ming']}
            markedDates={{
              '2025-06-10': {
                selected: true,
                backgroundColor: Color.danger[300],
                dots: [
                  Color.primary[1000],
                  Color.primary[200],
                  Color.primary[300],
                ],
              },
              '2025-06-11': {
                dots: [Color.success[700], Color.danger[900]],
                disabled: true,
              },
              '2025-06-12': {
                dots: [Color.success[700], Color.danger[900]],
                disabled: {
                  backgroundColor: Color.warning[500],
                  textColor: Color.success[900],
                },
              },
              '2025-06-19': { selected: true },
              '2025-06-20': {
                selected: true,
                textColor: Color.base.white100,
              },
            }}
          />
        </Card>
        {startDate && !endDate && (
          <Typography>Please select end date</Typography>
        )}
        <Typography>
          Selected Date : {startDate} - {endDate}
        </Typography>
        <Typography>Mode : Single</Typography>

        <Calendar
          mode="single"
          minDate={new Date(2025, 5, 5)}
          maxDate={new Date(2025, 5, 20)}
          selectedBackgroundColor={Color.primary[200]}
          markedDates={{
            '2025-06-10': {
              dots: [
                Color.success[600],
                Color.primary[1000],
                Color.danger[600],
              ],
              selected: true,
              backgroundColor: 'red',
              textColor: 'white',
            },
            '2025-06-11': {
              dots: [Color.base.black100, Color.success[600]],
              disabled: true,
            },
          }}
          disabledBackgroundColor={Color.danger[500]}
        />
      </ScrollView>
    </Container>
  );
}
