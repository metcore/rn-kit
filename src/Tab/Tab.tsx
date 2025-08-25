import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  Children,
  isValidElement,
} from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import type { TabItemProps, TabProps } from './type';

const Tab: React.FC<TabProps> = ({
  children,
  current = 0,
  onChangeTab,
  renderHeader,
}) => {
  const items = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<TabItemProps>[];

  const [activeIndex, setActiveIndex] = useState<number>(current);
  const pagerRef = useRef<PagerView>(null);
  const currentHeight = items[activeIndex]?.props?.height ?? 0;

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
      <ScrollView
        stickyHeaderIndices={[renderHeader ? 1 : 0]} // bikin tabBar sticky
        contentContainerStyle={styles.scrollViewContainer}
      >
        {/* Header */}
        {renderHeader ? renderHeader : null}

        {/* TabBar (sticky + horizontal scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarWrapper}
        >
          <View style={styles.tabBar}>
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
        </ScrollView>

        {/* Konten */}
        <PagerView
          ref={pagerRef}
          style={[styles.pager, { height: currentHeight || 800 }]}
          initialPage={current}
          onPageSelected={(e) => updateActive(e.nativeEvent.position)}
        >
          {items.map((item, index) => (
            <View key={index} collapsable={false}>
              {item?.props?.children}
            </View>
          ))}
        </PagerView>
      </ScrollView>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBarWrapper: {
    backgroundColor: Color.gray[100],
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: 'row', // tetap row
    padding: 4,
    borderRadius: 8,
  },
  tabButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  tabActive: { backgroundColor: Color.primary[1000] },
  tabInactive: { backgroundColor: Color.gray[100] },
  pager: { flex: 1, minHeight: 800, marginBottom: 10 },
  scrollViewContainer: { flexGrow: 1 },
});
