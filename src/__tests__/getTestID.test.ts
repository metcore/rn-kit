import { getTestID } from '../helpers/getTestID';

describe('getTestID', () => {
  it('joins base and suffix', () => {
    expect(getTestID('email', 'input')).toBe('email-input');
  });
  it('returns base when no suffix', () => {
    expect(getTestID('email')).toBe('email');
  });
  it('returns undefined when base is missing', () => {
    expect(getTestID(undefined, 'input')).toBeUndefined();
  });
  it('returns undefined when base is empty string', () => {
    expect(getTestID('')).toBeUndefined();
  });
});
