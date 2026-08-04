import { dateFormatter } from '../function/dateFormatter';

// Pinned so nothing depends on today: Friday 5 January 2024, 09:30:05.
const date = new Date(2024, 0, 5, 9, 30, 5);

describe('dateFormatter existing formats', () => {
  it('defaults to an ISO-like date', () => {
    expect(dateFormatter({ date })).toBe('2024-01-05');
  });

  it('appends the time to an iso format when asked', () => {
    expect(
      dateFormatter({ date, options: { format: 'iso', useTime: true } })
    ).toBe('2024-01-05 09:30:05');
  });

  it('returns an empty string for an unusable date', () => {
    expect(dateFormatter({ date: new Date('nope') })).toBe('');
  });
});

describe('dateFormatter pattern', () => {
  it('fills a month-and-year pattern', () => {
    expect(dateFormatter({ date, options: { pattern: 'MM YYYY' } })).toBe(
      '01 2024'
    );
  });

  it('fills a full day-month-year pattern', () => {
    expect(dateFormatter({ date, options: { pattern: 'DD/MM/YYYY' } })).toBe(
      '05/01/2024'
    );
  });

  it('fills time tokens', () => {
    expect(
      dateFormatter({ date, options: { pattern: 'DD/MM/YYYY HH:mm:ss' } })
    ).toBe('05/01/2024 09:30:05');
  });

  it('drops the padding for single-letter day and month tokens', () => {
    expect(dateFormatter({ date, options: { pattern: 'D/M/YY' } })).toBe(
      '5/1/24'
    );
  });

  it('writes month names in Indonesian by default', () => {
    expect(dateFormatter({ date, options: { pattern: 'MMMM YYYY' } })).toBe(
      'Januari 2024'
    );
    expect(dateFormatter({ date, options: { pattern: 'MMM YYYY' } })).toBe(
      'Jan 2024'
    );
  });

  it('writes month names in English when asked', () => {
    expect(
      dateFormatter({ date, options: { pattern: 'MMMM YYYY', language: 'en' } })
    ).toBe('January 2024');
  });

  it('writes the weekday name', () => {
    expect(dateFormatter({ date, options: { pattern: 'dddd, DD MMMM' } })).toBe(
      'Jumat, 05 Januari'
    );
    expect(
      dateFormatter({ date, options: { pattern: 'dddd', language: 'en' } })
    ).toBe('Friday');
  });

  it('leaves separators and literal text alone', () => {
    expect(
      dateFormatter({ date, options: { pattern: 'Update: DD-MM-YYYY' } })
    ).toBe('Update: 05-01-2024');
  });

  it('takes precedence over the format option', () => {
    expect(
      dateFormatter({
        date,
        options: { format: 'localized', pattern: 'MM YYYY' },
      })
    ).toBe('01 2024');
  });

  it('never rewrites a substitution it just made', () => {
    // MMMM yields 'Januari', which contains an 'a' and 'n' -- a naive
    // sequential replace could go on to chew its own output.
    expect(dateFormatter({ date, options: { pattern: 'MMMM' } })).toBe(
      'Januari'
    );
  });

  it('returns an empty string for an unusable date', () => {
    expect(
      dateFormatter({ date: new Date('nope'), options: { pattern: 'MM YYYY' } })
    ).toBe('');
  });
});
