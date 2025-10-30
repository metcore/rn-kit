import type { DateProps } from '../Calendar/CalendarPropsType';

interface DateFormatterProps {
  date: Date | DateProps;
  options?: {
    useTime?: boolean;
    useWeekDay?: boolean;
    monthFormat?: Intl.DateTimeFormatOptions['month'];
    language?: 'en' | 'id';
    format?: 'default' | 'iso' | 'localized';
  };
}

export const dateFormatter = ({ date, options }: DateFormatterProps) => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  if (options?.format === 'iso') {
    return `${year}-${month}-${day}${options?.useTime ? ` ${hours}:${minutes}:${seconds}` : ''}`;
  } else if (options?.format === 'localized') {
    const datePart = new Intl.DateTimeFormat(
      options?.language !== 'en' ? 'id-ID' : 'en-GB',
      {
        day: 'numeric',
        month: options?.monthFormat ?? 'long',
        year: 'numeric',
        ...(options?.useWeekDay ? { weekday: 'long' } : {}),
      }
    ).format(dateObj);

    if (!options?.useTime) return datePart;

    const timePart = dateObj
      .toLocaleTimeString(options?.language !== 'en' ? 'id-ID' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace('.', ':');

    return `${datePart} - ${timePart}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};
