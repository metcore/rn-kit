import { Calendar, Card, Color, Container, Typography } from '@herca/ui-kit';
import { useState } from 'react';

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };

export default function CalendarScreen() {
  const [endDate, setEndDate] = useState();

  const formatDate = (date) => {
    if (!date) return null;
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const hanOnChange = (obj) => {
    console.log(obj);
    setEndDate(formatDate(obj.endDate));
  };
  return (
    <Container>
      <Typography>Mode : Range</Typography>
      <Card>
        <Calendar
          mode="range"
          disabledDays={{
            0: {
              backgroundColor: Color.danger[50],
              textColor: Color.danger[400],
            },
            6: true,
            5: false,
          }}
          minDate={new Date(2025, 5, 5)}
          maxDate={new Date(2025, 6, 20)}
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
            '2025-06-19': { selected: true },
          }}
          selectedBackgroundColor={Color.primary[1000]}
          selectedTextColor={Color.danger[1000]}
          disabledBackgroundColor={Color.base.white100}
          disabledTextColor={Color.gray[400]}
          selectedStartDate={'2025-12-12'}
          selectedEndDate={'2025-12-12'}
          onChange={(obj) => {
            hanOnChange(obj);
          }}
        />
      </Card>
      <Typography style={{ display: endDate ? 'none' : 'contents' }}>
        Please select end date
      </Typography>
      <Typography>Mode : Single</Typography>

      <Card>
        <Calendar
          mode="single"
          // disabledDays={{
          //   days:0,
          //   selectedColor:'black'
          // }}
          minDate={new Date(2025, 5, 5)}
          maxDate={new Date(2025, 5, 20)}
          markedDates={{
            '2025-06-10': {
              dots: [vacation, massage, workout],
              selected: true,
              selectedColor: 'red',
            },
            '2025-06-11': { dots: [massage, workout], disabled: true },
          }}
        />
      </Card>
    </Container>
  );
}
