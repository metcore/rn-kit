import { View } from 'react-native';
import Typography from '../Typography/Typography';

export default function LabelForm({ title }) {
  return (
    <View>
      <Typography variant="t2" weight="semibold">
        {title}
      </Typography>
    </View>
  );
}
