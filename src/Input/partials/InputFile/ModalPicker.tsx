import { StyleSheet, View } from 'react-native';
import BottomSheet from '../../../BottomSheet/BottomSheet';
import Center from '../../../Ui/Center';
import Typography from '../../../Typography/Typography';
import List from '../../../List/List';
import ListItem from '../../../List/ListItem';
import ItemPicker from './ItemPicker';
import Color from '../../../Color/Color';
import type { IconNameProps } from '../../../Icon';

interface FilePicker {
  title: string;
  description: string;
  onPress: () => void;
  icon: IconNameProps;
}

interface Props extends React.ComponentProps<typeof BottomSheet> {
  title: string;
  description: string;
  camera: FilePicker;
  gallery: FilePicker;
  document: FilePicker;
}

export default function ModalPicker({
  title,
  description,
  camera,
  gallery,
  document,
  ...props
}: Props) {
  return (
    <BottomSheet {...props}>
      <View style={styles.bottomSheetContent}>
        <Center style={styles.bottomSheetCenter}>
          <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
            {title}
          </Typography>
          <Typography variant="t1" weight="regular" color={Color.gray[600]}>
            {description}
          </Typography>
        </Center>

        <List>
          <ListItem>
            <ItemPicker
              title={camera?.title}
              icon={camera?.icon}
              onPress={camera?.onPress}
              description={camera?.description}
            />
          </ListItem>

          <ListItem>
            <ItemPicker
              title={gallery?.title}
              icon={gallery?.icon}
              onPress={gallery?.onPress}
              description={gallery?.description}
            />
          </ListItem>

          <ListItem>
            <ItemPicker
              title={document?.title}
              icon={document?.icon}
              onPress={document?.onPress}
              description={document?.description}
            />
          </ListItem>
        </List>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    gap: 16,
  },
  bottomSheetCenter: {
    alignItems: 'center',
  },
});
