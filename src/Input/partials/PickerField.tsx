import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Color from '../../Color/Color';
import Icon from '../../Icon/Icon';
import Typography from '../../Typography/Typography';
import { getTestID } from '../../helpers/getTestID';
import { layouting } from '../../styles/layouting';
import { spacing } from '../../styles/spacing';

interface PickerFieldProps {
  /** Omitted entirely when absent -- no empty element is left behind. */
  label?: string;
  placeholder: string;
  placeholderEnd?: string;
  mode?: 'single' | 'range';
  /** Already formatted for display; the field does no formatting itself. */
  display?: string | null;
  displayEnd?: string | null;
  hasClear?: boolean;
  onPress: () => void;
  onClear?: () => void;
  testID?: string;
}

/**
 * The read-only trigger a picker-backed field sits behind: a label, one or two
 * pressable slots, and an optional clear button.
 *
 * Shared by InputMonth and InputYear so the two cannot drift apart visually,
 * and so neither has to restate InputDate's markup. It holds no state and does
 * no formatting -- callers pass strings that are ready to show.
 */
export default function PickerField({
  label,
  placeholder,
  placeholderEnd,
  mode = 'single',
  display,
  displayEnd,
  hasClear,
  onPress,
  onClear,
  testID,
}: PickerFieldProps) {
  return (
    <View style={styles.gap4}>
      {label ? (
        <Typography
          testID={getTestID(testID, 'label')}
          variant="t2"
          weight="semibold"
          color={Color.gray[900]}
        >
          {label}
        </Typography>
      ) : null}

      <View style={styles.wrapper}>
        <Pressable
          testID={getTestID(testID, 'trigger')}
          style={[styles.pickerTrigger, !!display && styles.hasValue]}
          onPress={onPress}
        >
          <Typography variant="t2" color={Color.gray[900]} weight="medium">
            {display || placeholder}
          </Typography>
          <View style={[layouting.flex.rowCenter, spacing.gap[8]]}>
            {hasClear && !!display && (
              <TouchableOpacity
                testID={getTestID(testID, 'clear')}
                style={styles.clear}
                onPress={onClear}
              >
                <Icon name="times-new" size={14} color="white" />
              </TouchableOpacity>
            )}
            <Icon name="ArrowDown" size={14} color={Color.gray[700]} />
          </View>
        </Pressable>

        {mode === 'range' && (
          <Pressable
            testID={getTestID(testID, 'trigger-end')}
            style={[styles.pickerTrigger, !!displayEnd && styles.hasValue]}
            onPress={onPress}
          >
            <Typography variant="t2" color={Color.gray[900]} weight="medium">
              {displayEnd || placeholderEnd}
            </Typography>
            <Icon name="ArrowDown" size={14} color={Color.gray[700]} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gap4: {
    gap: 4,
  },
  pickerTrigger: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.gray[200],
    flex: 1,
  },
  hasValue: {
    borderColor: Color.primary[300],
  },
  wrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  clear: {
    backgroundColor: Color.gray[600],
    borderRadius: 999,
    padding: 3,
  },
});
