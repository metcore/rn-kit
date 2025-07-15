import React from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import { Icon } from '../Icon';
import type { IconNameProps } from '../Icon/type';
import type { ColorVariantType } from '../Color/type';

interface AlertProps {
  icon?: IconNameProps;
  title?: string;
  message?: string;
  color?: ColorVariantType;
  style?: ViewStyle;
  titleStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<ViewStyle>;
  hide?: boolean;
}

const COLORS: Record<
  ColorVariantType,
  {
    background: string;
    borderColor: string;
    fontColor: string;
  }
> = {
  success: {
    background: Color.success[50],
    fontColor: Color.success[500],
    borderColor: Color.success[500],
  },
  default: {
    background: Color.gray[50],
    fontColor: Color.gray[500],
    borderColor: Color.gray[500],
  },
  info: {
    background: Color.info[50],
    fontColor: Color.info[500],
    borderColor: Color.info[500],
  },
  warning: {
    background: Color.warning[50],
    fontColor: Color.warning[400],
    borderColor: Color.warning[400],
  },
  danger: {
    background: Color.danger[50],
    fontColor: Color.danger[500],
    borderColor: Color.danger[200],
  },
  primary: {
    background: Color.primary[50],
    fontColor: Color.primary[500],
    borderColor: Color.primary[200],
  },
  orange: {
    background: Color.orange[50],
    fontColor: Color.orange[500],
    borderColor: Color.orange[200],
  },
  purple: {
    background: Color.purple[50],
    fontColor: Color.purple[500],
    borderColor: Color.purple[200],
  },
};

const Alert: React.FC<AlertProps> = ({
  icon = 'ExclamationMark',
  title,
  message,
  color = 'primary',
  titleStyle,
  messageStyle,
  hide = false,
}) => {
  const { background, fontColor, borderColor } = COLORS[color];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          borderColor: borderColor,
        },
        hide ? { display: 'none' } : null,
      ]}
    >
      <View style={{ marginRight: 10 }}>
        <Icon name={icon || 'ExclamationMark'} color={fontColor} />
      </View>
      <View style={styles.textContainer}>
        {title && (
          <Typography
            variant="t2"
            weight="bold"
            color={fontColor}
            style={StyleSheet.flatten([styles.title, titleStyle])}
          >
            {title}
          </Typography>
        )}
        {message && (
          <Typography
            variant="t3"
            color={fontColor}
            style={StyleSheet.flatten([styles.message, messageStyle])}
          >
            {message}
          </Typography>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 10,
    width: 24,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    maxWidth: '90%',
  },
  title: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  message: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default Alert;
