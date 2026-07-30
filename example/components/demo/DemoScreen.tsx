import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Color, Container, Typography } from '@herca/rn-kit';
import HeaderNavigation from '../Header/HeaderNavigation';

interface DemoScreenProps {
  title: string;
  description: string;
  scrollable?: boolean;
  children: React.ReactNode;
}

const DemoScreen: React.FC<DemoScreenProps> = ({
  title,
  description,
  scrollable = true,
  children,
}) => {
  return (
    <View style={styles.flex}>
      <HeaderNavigation title={title} />
      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <Container style={styles.container}>
            <Typography variant="t2" color={Color.gray[600]}>
              {description}
            </Typography>
            {children}
          </Container>
        </ScrollView>
      ) : (
        <Container style={styles.flexContainer}>
          <Typography variant="t2" color={Color.gray[600]}>
            {description}
          </Typography>
          {children}
        </Container>
      )}
    </View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Color.base.white100,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    gap: 20,
    paddingTop: 12,
  },
  flexContainer: {
    flex: 1,
  },
});
