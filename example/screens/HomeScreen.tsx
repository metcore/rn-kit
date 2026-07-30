import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Color, Container, Icon, Input, Typography } from '@herca/rn-kit';
import { useNavigation } from '@react-navigation/native';
import ReactLogo from '../components/ReactLogo';
import { COMPONENT_CATALOG } from '../data/componentCatalog';
import type { NavigationProps } from '../type/navigation';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [query, setQuery] = useState('');

  const filteredCatalog = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return COMPONENT_CATALOG;
    }
    return COMPONENT_CATALOG.map((category) => {
      if (category.category.toLowerCase().includes(normalizedQuery)) {
        return category;
      }
      return {
        ...category,
        items: category.items.filter((item) =>
          item.label.toLowerCase().includes(normalizedQuery)
        ),
      };
    }).filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Container style={styles.container}>
          <View style={styles.topBar}>
            <ReactLogo size={28} />
            <View style={styles.flex}>
              <Input
                icon="Search"
                placeholder="Cari komponen..."
                value={query}
                onChangeText={setQuery}
                clearButton
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.banner,
              pressed && styles.bannerPressed,
            ]}
            onPress={() => navigation.navigate('Example')}
          >
            <View style={styles.flex}>
              <Typography
                variant="t1"
                weight="bold"
                color={Color.base.white100}
              >
                Example App
              </Typography>
              <Typography variant="t3" color={Color.primary[200]}>
                Lihat contoh screen jadi dari komponen rn-kit
              </Typography>
            </View>
            <Icon name="arrow-right-long" size={20} color="#FFFFFF" />
          </Pressable>

          {filteredCatalog.length === 0 && (
            <Typography variant="t1" style={styles.emptyState}>
              No components found
            </Typography>
          )}

          {filteredCatalog.map((category) => (
            <View key={category.category} style={styles.section}>
              <Typography variant="p3" weight="semibold">
                {category.category}
              </Typography>
              <View style={styles.grid}>
                {category.items.map((item) => (
                  <Pressable
                    key={item.screen}
                    style={styles.tile}
                    onPress={() => navigation.navigate(item.screen as never)}
                  >
                    {({ pressed }) => (
                      <>
                        <View
                          style={[
                            styles.tileIconBox,
                            pressed && styles.tileIconBoxPressed,
                          ]}
                        >
                          <Icon
                            name={item.icon}
                            size={24}
                            color={Color.primary[600]}
                          />
                        </View>
                        <Typography
                          variant="t3"
                          style={styles.tileLabel}
                          numberOfLines={2}
                        >
                          {item.label}
                        </Typography>
                      </>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    gap: 20,
    paddingTop: 8,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Color.primary[500],
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  bannerPressed: {
    backgroundColor: Color.primary[600],
  },
  section: {
    gap: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
  },
  tile: {
    width: '25%',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  tileIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Color.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIconBoxPressed: {
    backgroundColor: Color.primary[100],
  },
  tileLabel: {
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default HomeScreen;
