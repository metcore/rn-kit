import type { DateProps } from '../Calendar/CalendarPropsType';

interface DateFormatterProps {
  date: Date | DateProps;
  options?: {
    useTime?: boolean;
    useWeekDay?: boolean;
    monthFormat?: Intl.DateTimeFormatOptions['month'];
    language?: 'en' | 'id';
    format?: 'default' | 'iso' | 'localized';
    /**
     * Token pattern, e.g. 'DD/MM/YYYY HH:mm' or 'MMMM YYYY'.
     * Wins over `format` when set. Month and weekday names follow `language`.
     *
     * YYYY 2024 | YY 24 | MMMM Januari | MMM Jan | MM 01 | M 1
     * DD 05 | D 5 | dddd Jumat | HH 09 | mm 30 | ss 05
     *
     * Anything that is not a token is copied through as-is. There is no
     * escape syntax, so avoid literal text containing these exact tokens.
     */
    pattern?: string;
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

  if (options?.pattern) {
    const locale = options?.language !== 'en' ? 'id-ID' : 'en-GB';
    const named = (opts: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, opts).format(dateObj);

    const tokens: Record<string, string> = {
      YYYY: String(year),
      YY: String(year).slice(-2),
      MMMM: named({ month: 'long' }),
      MMM: named({ month: 'short' }),
      MM: month,
      M: String(dateObj.getMonth() + 1),
      DD: day,
      D: String(dateObj.getDate()),
      dddd: named({ weekday: 'long' }),
      HH: hours,
      mm: minutes,
      ss: seconds,
    };

    // One pass, longest token first: a sequential replace would go on to chew
    // its own output (MMMM -> 'Januari' still contains 'a', 'n', 'M'-less but
    // MM -> '01' inside a longer run would misfire the same way).
    return options.pattern.replace(
      /dddd|YYYY|MMMM|MMM|YY|MM|DD|HH|mm|ss|M|D/g,
      (token) => tokens[token] ?? token
    );
  }

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
