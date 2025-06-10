import { View } from 'react-native';

interface Timeline {
  children: React.ReactNode;
}

export default function Timeline({ children }: Timeline) {
  return <View>{children}</View>;
}
