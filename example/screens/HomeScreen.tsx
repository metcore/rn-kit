import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Container, Input, Typography } from '@herca/rn-kit';
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
          <View style={styles.header}>
            <ReactLogo size={48} />
            <Typography variant="h2" weight="bold">
              Rn-Kit Components
            </Typography>
          </View>

          <Button
            color="primary"
            title="Example"
            onPress={() => navigation.navigate('Example')}
            block
          />

          <Input
            icon="Search"
            placeholder="Cari komponen..."
            value={query}
            onChangeText={setQuery}
            clearButton
          />

          {filteredCatalog.length === 0 && (
            <Typography variant="t1" style={styles.emptyState}>
              No components found
            </Typography>
          )}

          {filteredCatalog.map((category) => (
            <View key={category.category} style={styles.section}>
              <Typography variant="h3" weight="bold">
                {category.category}
              </Typography>
              <View style={styles.grid}>
                {category.items.map((item) => (
                  <Button
                    key={item.screen}
                    color="primary"
                    title={item.label}
                    onPress={() => navigation.navigate(item.screen as never)}
                    width="48%"
                  />
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
    gap: 16,
  },
  header: {
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  section: {
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default HomeScreen;
