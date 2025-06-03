import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Container, Typography } from '@herca/ui-kit';

const ButtonScreen = () => {
  const sizeButton = ['small', 'medium', 'large'] as const;
  const variantButton = ['default', 'outline', 'tertiary'] as const;
  const colorButton = [
    'default',
    'primary',
    'success',
    'danger',
    'warning',
    'info',
    'orange',
    'purple',
  ] as const;

  return (
    <ScrollView>
      <Container style={{ gap: 3 }}>
        <Button disabled title="Tes" color={'danger'} />
        <Button disabled title="Tes" color={'primary'} />
        <Button disabled title="Tes" color={'success'} />
        <Button
          disabled
          variant="outline"
          size="small"
          title="Tes"
          color={'danger'}
        />
        <Button disabled variant="outline" title="Tes" color={'primary'} />
        <Button disabled variant="outline" title="Tes" color={'success'} />
        <Button disabled variant="tertiary" title="Tes" color={'success'} />
        {sizeButton.map((size) => (
          <View key={size} style={styles.section}>
            <Typography variant="h3" weight="bold" style={styles.sectionTitle}>
              Size: {size}
            </Typography>
            {variantButton.map((variant) => (
              <View key={variant} style={styles.variantSection}>
                <Typography
                  variant="p3"
                  weight="semibold"
                  style={styles.variantTitle}
                >
                  variant: {variant}
                </Typography>
                <View style={styles.buttonRow}>
                  {colorButton.map((color) => (
                    <View
                      key={`${size}-${variant}-${color}`}
                      style={styles.buttonWrapper}
                    >
                      <Button
                        title={`${size} - ${variant} -${color}`}
                        size={size}
                        variant={variant}
                        color={color}
                        onPress={() =>
                          console.log(`Pressed ${size}-${variant}-${color}`)
                        }
                      />

                      <Button
                        title={`${size} - ${variant} -${color} - disabled`}
                        size={size}
                        disabled
                        variant={variant}
                        color={color}
                        onPress={() =>
                          console.log(`Pressed ${size}-${variant}-${color}`)
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    gap: 4,
  },
  section: {
    gap: 12,
  },
});

export default ButtonScreen;
