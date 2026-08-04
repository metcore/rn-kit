import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Color from '../Color/Color';
import Icon from '../Icon';
import Typography from '../Typography/Typography';
import Footer from '../Ui/Footer';
import { getTestID } from '../helpers/getTestID';
import { TOOLBAR_BUTTONS } from './toolbarButtons';
import type { TextCommand } from './types';

interface ToolbarProps {
  keyboardHeight: number;
  isActive: (command: TextCommand) => boolean;
  onPress: (command: TextCommand) => void;
  testID?: string;
}

/**
 * The formatting bar that floats above the keyboard.
 *
 * Buttons render an icon, or their `text` when no icon fits -- the headings
 * have no glyph in Icon.
 */
export default function Toolbar({
  keyboardHeight,
  isActive,
  onPress,
  testID,
}: ToolbarProps) {
  return (
    <Footer
      style={[
        styles.toolbar,
        {
          bottom:
            Platform.OS === 'android' && Platform.Version < 35
              ? keyboardHeight - keyboardHeight
              : keyboardHeight,
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {TOOLBAR_BUTTONS.map((button) => (
          <TouchableOpacity
            key={button.command}
            testID={getTestID(testID, button.command)}
            accessibilityLabel={button.label}
            onPress={() => onPress(button.command)}
            style={[
              styles.button,
              isActive(button.command) && styles.buttonActive,
            ]}
          >
            {button.icon ? (
              <Icon
                name={button.icon}
                size={20}
                color={isActive(button.command) ? '#fff' : Color.gray[900]}
              />
            ) : (
              <Typography
                variant="t2"
                weight="semibold"
                color={isActive(button.command) ? '#fff' : Color.gray[900]}
              >
                {button.text}
              </Typography>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Footer>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: Color.gray[100],
    backgroundColor: Color.base.white100,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    padding: 8,
    borderRadius: 6,
  },
  buttonActive: {
    backgroundColor: Color.primary[1000],
  },
});
