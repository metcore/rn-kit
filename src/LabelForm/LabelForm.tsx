import { View } from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

interface Props {
  title: string;
  required?: boolean;
  color?: string;
  testID?: string;
}

export default function LabelForm({
  title,
  required,
  color = Color.gray[900],
  testID,
}: Props) {
  return (
    <View testID={testID}>
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
