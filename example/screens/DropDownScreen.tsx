import {
  Container,
  DropDown,
  Icon,
  Typography,
  type ChipOptionProps,
  type IconNameProps,
} from '@herca/rn-kit';
import { View } from 'react-native';
import { layouting } from '../../src/styles/layouting';
import { spacing } from '../../src/styles/spacing';

type OptionsProp = ChipOptionProps & {
  icon: IconNameProps;
  iconSize: number;
  iconColor?: string;
};

const options: OptionsProp[] = [
  {
    label: 'Bagikan',
    value: 0,
    icon: 'share-up',
    iconSize: 20,
  },
  {
    label: 'Ubah Pengajuan',
    value: 1,
    icon: 'edit-square-outline',
    iconSize: 20,
  },
  {
    label: 'Pembayaran',
    value: 2,
    icon: 'Money',
    iconSize: 20,
  },
  {
    label: 'Tambah Komentar',
    value: 3,
    icon: 'comment-fill',
    iconSize: 20,
  },
  {
    label: 'Batalkan Pembayaran',
    value: 4,
    icon: 'Money',
    iconSize: 20,
    iconColor: 'red',
  },
  {
    label: 'Hapus Pengajuan',
    value: 5,
    icon: 'Trash',
    iconSize: 20,
    iconColor: 'red',
  },
];

export default function DropDownScreen() {
  // const [selected, setSelected] = useState<number | null>(null);
  // const handleSelect = (val: number) => {
  //   setSelected(val);

  //   setTimeout(() => {
  //     setSelected(null);
  //   }, 300);
  // };
  return (
    <Container>
      <DropDown
        maxHeight={500}
        options={options}
        // value={selected}
        // onSelect={(val) => handleSelect(val as number)}
        renderButton={<Icon name="more-vertical" />}
        renderItem={(item) => (
          <View style={[layouting.flex.rowCenter, spacing.gap[4]]}>
            <Icon
              name={item.icon as IconNameProps}
              size={item.iconSize as number}
              style={layouting.flex.shrink}
              color={item.iconColor as string}
            />
            <Typography variant="t2">{item.label}</Typography>
          </View>
        )}
      />
    </Container>
  );
}
