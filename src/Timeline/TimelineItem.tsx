import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import { Icon } from '../Icon';

const COLOR_MAP = {
  warning: Color.warning[400],
  primary: Color.primary[900],
  success: Color.success[500],
  purple: Color.purple[500],
  danger: Color.danger[500],
};
type ColorKey = keyof typeof COLOR_MAP;

interface TimelineItemProps {
  children: React.ReactNode;
  color: ColorKey;
}

export default function TimelineItem({
  children,
  color = 'primary',
}: TimelineItemProps) {
  const [contentHeight, setContentHeight] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.contentLeft}>
        <Icon name="RadioButton" color={COLOR_MAP[color]} />
        <View style={[styles.border, { height: contentHeight - 20 }]} />
      </View>
      <View
        style={styles.flex}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          setContentHeight(height);
        }}
      >
        <View>{children}</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentLeft: {
    alignItems: 'center',
    marginRight: 8,
  },
  border: {
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: Color.gray[400],
    borderStyle: 'dashed',
    marginTop: 4,
  },
  flex: {
    flex: 1,
  },
});
