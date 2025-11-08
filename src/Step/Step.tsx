import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Color from '../Color/Color';
import type { StepItemProps, StepProps } from './type';

const { width: screenWidth } = Dimensions.get('window');

const Step = ({ children, current = 0, onChangeStep }: StepProps) => {
  const childrenArray = React.Children.toArray(children).filter(
    React.isValidElement
  ) as React.ReactElement<StepItemProps>[];
  const totalSteps = childrenArray.length;

  const scrollRef = useRef<ScrollView>(null);
  const stepWidth = 100;
  useEffect(() => {
    onChangeStep?.(current);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: Math.max(0, current * stepWidth) - screenWidth / 2 + stepWidth / 2,
        animated: true,
      });
    }
  }, [current, onChangeStep]);

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.containerScrollView,
            {
              justifyContent:
                totalSteps * stepWidth < screenWidth ? 'center' : 'flex-start',
            },
          ]}
        >
          {childrenArray.map((child, index) =>
            React.cloneElement(child, {
              index,
              isActive: index === current,
              isCompleted: index < current,
              isLast: index === totalSteps - 1,
              isHeader: true,
              style: { width: stepWidth },
            })
          )}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {childrenArray[current] &&
          React.cloneElement(childrenArray[current], {
            index: current,
            isActive: true,
            isCompleted: false,
            isLast: current === totalSteps - 1,
            isHeader: false,
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    width: screenWidth,
    backgroundColor: Color.info[50],
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  containerScrollView: {
    flexGrow: 1,
  },
});

export default Step;
