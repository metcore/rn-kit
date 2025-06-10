import { View } from 'react-native';
import type { ReactNode } from 'react';

const Gap = ({ children }: { children: ReactNode }) => {
  return <View>{children}</View>;
};

export default Gap;
