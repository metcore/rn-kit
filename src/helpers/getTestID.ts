/**
 * Derive a stable testID for a sub-element from a single base testID.
 * Returns undefined when base is falsy so no empty testID is rendered.
 *
 * @example getTestID('email', 'input') // 'email-input'
 * @example getTestID('email')          // 'email'
 * @example getTestID(undefined, 'x')   // undefined
 */
export const getTestID = (
  base?: string,
  suffix?: string
): string | undefined => {
  if (!base) return undefined;
  return suffix ? `${base}-${suffix}` : base;
};
