import React from 'react';
import { Platform } from 'react-native';
import { Color, Typography } from '@herca/rn-kit';

interface DemoLabelProps {
  text: string;
}

const DemoLabel: React.FC<DemoLabelProps> = ({ text }) => {
  return (
    <Typography
      variant="t2"
      color={Color.gray[700]}
      style={{
        fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
      }}
    >
      {text}
    </Typography>
  );
};

export default DemoLabel;
