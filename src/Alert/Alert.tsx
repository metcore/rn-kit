import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import { Icon } from '../Icon';

type ColorProps =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'orange'
  | 'purple';

interface AlertProps {
  icon?: string;
  title?: string;
  message?: string;
  color?: ColorProps;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

const COLORS: Record<ColorProps, { background: string; color: string }> = {
  success: {
    background: Color.success[50],
    fontColor: Color.success[500],
    borderColor: Color.success[500],
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
  primary: { background: Color.primary[50], fontColor: Color.primary[500] },
  orange: { background: '#FFEDD5', fontColor: '#F97316' },
  purple: { background: '#EDE9FE', fontColor: '#8B5CF6' },
};

const Alert: React.FC<AlertProps> = ({
  icon = 'ExlamationMark',
  title,
  message,
  color = 'primary',
  titleStyle,
  messageStyle,
}) => {
  const { background, fontColor, borderColor } = COLORS[color];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, borderColor: borderColor },
      ]}
    >
      <View style={{ marginRight: 10 }}>
        <Icon name={icon} color={fontColor} />
      </View>
      <View style={{ justifyContent: 'center' }}>
        {title && (
          <Typography
            variant="t2"
            weight="bold"
            color={fontColor}
            style={[styles.title, titleStyle]}
          >
            {title}
          </Typography>
        )}
        {message && (
          <Typography
            variant="t3"
            color={fontColor}
            style={[styles.message, messageStyle]}
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
  title: {
    marginBottom: 4,
  },
  message: {
    lineHeight: 18,
  },
});

export default Alert;
