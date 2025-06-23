import { DropDown } from '@herca/kit';
import { View } from 'react-native';
const options = ['Januari', 'Februrari', 'Maret', 'April', 'Mei', 'Juni'];

export default function DropDownScreen() {
  return (
    <View style={{ height: 100, borderColor: 'black', borderWidth: 1 }}>
      <DropDown options={options} maxHeight={200} />
    </View>
  );
}
