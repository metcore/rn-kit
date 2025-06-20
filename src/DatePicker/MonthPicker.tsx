import { View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';

interface MonthPickerProps {
  isOpen: boolean;
}
export default function MonthPicker({ isOpen }: MonthPickerProps) {
  return (
    <View>
      <BottomSheet isOpen={isOpen}></BottomSheet>
    </View>
  );
}
