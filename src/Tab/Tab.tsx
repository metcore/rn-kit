import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  Children,
  isValidElement,
} from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import type { TabItemProps, TabProps } from './type';

const Tab: React.FC<TabProps> = ({ children, current = 0, onChangeTab }) => {
  const items = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<TabItemProps>[];

  const [activeIndex, setActiveIndex] = useState<number>(current);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    setActiveIndex(current);
    pagerRef.current?.setPageWithoutAnimation(current);
  }, [current]);

  const updateActive = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        setActiveIndex(index);
        onChangeTab?.(index);
      }
    },
    [activeIndex, onChangeTab]
  );

  const handleHeaderPress = (index: number) => {
    pagerRef.current?.setPage(index);
    updateActive(index);
  };

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={index}
              style={[
                styles.tabButton,
                isActive ? styles.tabActive : styles.tabInactive,
              ]}
              onPress={() => handleHeaderPress(index)}
            >
              <Typography
                center
                variant="t2"
                weight="semibold"
                color={isActive ? Color.base.white100 : Color.gray[700]}
              >
                {item.props.name}
              </Typography>
            </Pressable>
          );
        })}
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={current}
        onPageSelected={(e) => updateActive(e.nativeEvent.position)}
      >
        {items.map((item, index) => {
          const Comp = item.props.component;
          return (
            <View key={index} collapsable={false} style={{ flex: 1 }}>
              {Comp ? <Comp /> : null}
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: Color.gray[100],
    padding: 4,
    borderRadius: 8,
  },
  tabButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: { backgroundColor: Color.primary[1000] },
  tabInactive: { backgroundColor: Color.gray[100] },
  pager: { flex: 1 },
});
