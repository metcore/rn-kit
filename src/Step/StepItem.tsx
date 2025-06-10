import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  type StyleProp,
  type ViewStyle,
  type FlatListProps,
} from 'react-native';
import Color from '../Color/Color';

interface StepItemProps {
  index?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
  isHeader?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  title: string;
}

const StepItem = ({
  index = 0,
  isActive,
  isCompleted,
  isLast,
  isHeader,
  children,
  style,
  title,
}: StepItemProps) => {
  if (isHeader) {
    return (
      <View style={[styles.headerItem, style]}>
        <View
          style={[
            styles.circle,
            isCompleted && styles.completed,
            isActive && styles.active,
          ]}
        >
          <Text style={styles.circleText}>{index + 1}</Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>
    );
  }

  if (React.isValidElement(children) && children.type === FlatList) {
    const flatListElement = children as React.ReactElement<FlatListProps<any>>;
    return React.cloneElement(flatListElement, {
      style: [styles.content, flatListElement.props.style],
      contentContainerStyle: [
        styles.listContent,
        flatListElement.props.contentContainerStyle,
      ],
      nestedScrollEnabled: true,
      title: title,
    });
  }

  return <View style={styles.content}>{children}</View>;
};
const styles = StyleSheet.create({
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: Color.info[500],
  },
  completed: {
    backgroundColor: Color.info[500],
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: Color.info[500],
    marginHorizontal: 8,
  },
  content: {},
  listContent: {},
});
export default StepItem;
