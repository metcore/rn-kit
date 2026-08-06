import { StyleSheet, type ViewStyle } from 'react-native';
import Color from '../../Color/Color';

/**
 * Whether a Month/YearPicker option is drawn as selected.
 *
 * The pickers say "selected" through style alone -- there is no flag on the
 * node to read -- so the tint is what a test has to assert on.
 */
export const isHighlighted = (node: { props: { style?: unknown } }) =>
  (StyleSheet.flatten(node.props.style as ViewStyle) as ViewStyle | undefined)
    ?.backgroundColor === Color.primary[50];
