import { View } from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

interface Props {
  title: string;
  required?: boolean;
  color?: string;
}

export default function LabelForm({
  title,
  required,
  color = Color.gray[900],
}: Props) {
  return (
    <View>
      <Typography variant="t2" weight="semibold" color={color}>
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
