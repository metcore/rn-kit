import {
  StyleSheet,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from 'react-native';
import Icon, { type IconNameProps } from '../../../Icon';
import Typography from '../../../Typography/Typography';
import Color from '../../../Color/Color';

interface Props extends TouchableOpacityProps {
  title: string;
  description: string;
  icon: IconNameProps;
}

export default function ItemPicker({
  title,
  description,
  icon,
  ...props
}: Props) {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.containerListItem}>
        <Icon name={icon} color={Color.primary[1000]} />
        <View>
          <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
            {title}
          </Typography>
          <Typography variant="t2" color={Color.gray[600]}>
            {description}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
