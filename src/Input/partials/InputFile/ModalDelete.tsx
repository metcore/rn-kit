import { StyleSheet, View } from 'react-native';
import BottomSheet from '../../../BottomSheet/BottomSheet';
import Center from '../../../Ui/Center';
import Typography from '../../../Typography/Typography';
import Color from '../../../Color/Color';
import Button from '../../../Button/Button';

interface Props extends React.ComponentProps<typeof BottomSheet> {
  title: string;
  descripition: string;
  confirm: string;
  onConfirm: () => void;
  cancel: string;
  onCnacel: () => void;
}

export default function ModalDelete({
  title,
  descripition,
  confirm,
  cancel,
  onCnacel,
  onConfirm,
  ...props
}: Props) {
  return (
    <BottomSheet {...props}>
      <View style={styles.deleteFileContent}>
        <Center style={styles.deleteFileCenter}>
          <Typography
            variant="p2"
            weight="semibold"
            color={Color.gray[800]}
            center
          >
            {title}
          </Typography>
          <Typography
            variant="t1"
            weight="regular"
            color={Color.gray[500]}
            center
          >
            {descripition}
          </Typography>
        </Center>
        <View>
          <Button color="danger" title={confirm} onPress={onConfirm} />
          <Button
            color="primary"
            variant="tertiary"
            title={cancel}
            onPress={onCnacel}
          />
        </View>
      </View>
    </BottomSheet>
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
