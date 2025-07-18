/**
 * Convert HEX color to RGBA string with given alpha.
 * Supports #RGB and #RRGGBB format.
 *
 * @param hex - HEX color string (e.g. "#000" or "#336699")
 * @param alpha - Opacity value (0 to 1)
 * @returns rgba string (e.g. "rgba(51, 102, 153, 0.5)")
 */
export const hexToRGBA = (hex: string, alpha: number = 1): string => {
  let r = 0,
    g = 0,
    b = 0;

  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    console.warn(`Invalid HEX color: ${hex}`);
    return `rgba(0, 0, 0, ${alpha})`;
  }

  if (hex.length === 4) {
    // Format: #RGB → expand ke #RRGGBB
    const rHex = hex[1] ?? '0';
    const gHex = hex[2] ?? '0';
    const bHex = hex[3] ?? '0';
    r = parseInt(rHex + rHex, 16);
    g = parseInt(gHex + gHex, 16);
    b = parseInt(bHex + bHex, 16);
  } else if (hex.length === 7) {
    // Format: #RRGGBB
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
