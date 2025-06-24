import { DropDown } from '@herca/rn-kit';
import { View } from 'react-native';
const options = [
  {
    label: 'Januari',
    value: 'Jauary',
  },
  {
    label: 'Februari',
    value: 'Febriari',
  },
  {
    label: 'Maret',
    value: 'Maret',
  },
];

export default function DropDownScreen() {
  return (
    <View style={{ height: 100, borderColor: 'black', borderWidth: 1 }}>
      <DropDown options={options} maxHeight={200} />
    </View>
  );
}
