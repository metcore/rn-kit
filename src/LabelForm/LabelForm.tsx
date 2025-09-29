import { View } from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

interface Props {
  title: string;
  required?: boolean;
}

export default function LabelForm({ title, required }: Props) {
  return (
    <View>
      <Typography variant="t2" weight="semibold">
        {title}{' '}
        {required && (
          <Typography variant="t2" weight="semibold" color={Color.danger[500]}>
            *
          </Typography>
        )}
      </Typography>
    </View>
  );
}
