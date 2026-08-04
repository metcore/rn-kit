import { View } from 'react-native';
import type { ReactNode } from 'react';

const Gap = ({
  children,
  testID,
}: {
  children: ReactNode;
  testID?: string;
}) => {
  return <View testID={testID}>{children}</View>;
};

export default Gap;
