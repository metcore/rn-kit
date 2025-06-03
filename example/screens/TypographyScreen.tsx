import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography } from '@herca/ui-kit';

const TypographyScreen = () => {
  const variants = [
    'h1',
    'h2',
    'h3',
    'h4',
    'p1',
    'p2',
    'p3',
    'text-sm',
    'text-xs',
    'text-xxs',
  ] as const;
  const weights = ['regular', 'medium', 'semibold', 'bold'] as const;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {variants.map((variant) => (
        <View key={variant} style={styles.section}>
          <Typography
            variant={variant}
            weight="bold"
            style={styles.sectionTitle}
          >
            {variant.toUpperCase()}
          </Typography>
          {weights.map((weight) => (
            <Typography
              key={`${variant}-${weight}`}
              variant={variant}
              weight={weight}
              style={styles.typographyItem}
            >
              {`${variant} - ${weight}`}
            </Typography>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 12,
  },
});

export default TypographyScreen;
