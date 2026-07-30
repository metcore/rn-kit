import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Typography } from '@herca/rn-kit';

interface DemoSectionProps {
  title: string;
  note?: string;
  row?: boolean;
  children: React.ReactNode;
}

const DemoSection: React.FC<DemoSectionProps> = ({
  title,
  note,
  row = false,
  children,
}) => {
  return (
    <View style={styles.section}>
      <Typography variant="p3" weight="semibold" color={Color.gray[900]}>
        {title}
      </Typography>
      {note ? (
        <Typography variant="t3" color={Color.gray[600]}>
          {note}
        </Typography>
      ) : null}
      <View style={[styles.content, row && styles.row]}>{children}</View>
    </View>
  );
};

export default DemoSection;

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  content: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
