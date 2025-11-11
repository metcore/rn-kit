import { Image, StyleSheet, View } from 'react-native';
import Button from '../../../Button/Button';
import Typography from '../../../Typography/Typography';
import Card from '../../../Ui/Card';
import Center from '../../../Ui/Center';
import Color from '../../../Color/Color';
import { spacing } from '../../../styles/spacing';

interface Props {
  title: string;
  description: string;
  btnSelect?: string;
  onPress?: () => void;
  hasError?: boolean;
  hint?: string;
}

export default function CardTrigger({
  title,
  description,
  btnSelect,
  onPress,
  hint,
  hasError,
}: Props) {
  return (
    <Card style={styles.containerInput}>
      <Center style={styles.centerInput}>
        <Image source={require('../../assets/input-file.png')} />
        <View style={spacing.gap[4]}>
          <Typography
            variant="t1"
            weight="semibold"
            color={Color.gray[500]}
            center
          >
            {title}
          </Typography>
          {hint && (
            <Typography
              variant="t3"
              weight="regular"
              color={hasError ? Color.danger[500] : Color.gray[500]}
              center
            >
              {hint}
            </Typography>
          )}
          <Typography variant="t3" weight="regular" color={Color.gray[500]}>
            {description}
          </Typography>
        </View>
        <Button
          color="primary"
          title={btnSelect}
          size="small"
          onPress={onPress}
        />
      </Center>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  containerInput: {
    borderStyle: 'dashed',
    backgroundColor: Color.gray[50],
    borderRadius: 16,
  },
  centerInput: {
    gap: 14,
  },
  deleteFileContent: {
    gap: 10,
  },
  deleteFileCenter: {
    alignItems: 'center',
    gap: 4,
  },

  previewWrapper: {
    gap: 12,
  },
});
