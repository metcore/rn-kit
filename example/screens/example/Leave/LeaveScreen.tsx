import {
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  Chip,
  Color,
  Container,
  Devider,
  Footer,
  Icon,
  MonthPicker,
  Typography,
  YearPicker,
} from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from 'react-native';
import type { NavigationProps } from '../../../type/navigation';
import { useState } from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      name: 'Metcore',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp1',
    status: 'terbuka',
    periode: '26 Juli 2025 - 15 Januari 2026',
    leave_name: 'Cuti Tahunan',
    number: 'SL - 444',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-33ad53abb28ba',
    user: {
      name: 'Metcore',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp1',
    status: 'terbuka',
    periode: '26 Juli 2025 - 15 Januari 2026',
    leave_name: 'Cuti Tahunan',
    number: 'SL - 444',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3a2d53abb28ba',
    user: {
      name: 'Metcore',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp1',
    status: 'terbuka',
    periode: '26 Juli 2025 - 15 Januari 2026',
    leave_name: 'Cuti Tahunan',
    number: 'SL - 444',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad153abb28ba',
    user: {
      name: 'Metcore',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp1',
    status: 'disetujui',
    periode: '26 Juli 2025 - 15 Januari 2026',
    leave_name: 'Cuti Tahunan',
    number: 'SL - 444',
  },
];

interface DataProps {
  id: string;
  user: {
    name: string;
    image: ImageSourcePropType;
  };
  level_reprimand: string;
  status: string;
  periode: string;
  leave_name: string;
  number: string;
}

interface ItemProps {
  navigation: NavigationProps;
  item: DataProps;
}
const Item = ({ navigation, item }: ItemProps) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('LeaveDetail')}
    style={styles.containerItem}
  >
    <Card style={styles.containerItemCard}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Avatar source={item.user.image} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Typography variant="t1" weight="semibold" color={Color.gray[800]}>
              {item.leave_name}
            </Typography>
            <Typography variant="t2" weight="regular" color={Color.gray[600]}>
              {item.user?.name}
            </Typography>
            <Typography variant="t2" weight="regular" color={Color.gray[600]}>
              {item.number}
            </Typography>
          </View>
          <Badge
            value={item.status}
            color={item.status == 'disetujui' ? 'success' : 'warning'}
          />
        </View>
      </View>

      <Devider />
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ justifyContent: 'center' }}>
            <Icon name="AirPlane" size={18} color={Color.primary[1000]} />
          </View>
          <View>
            <Typography variant="t3" weight="regular" color={Color.gray[600]}>
              Tanggal Pengajuan Cuti
            </Typography>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              {item.periode}
            </Typography>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

export default function LeaveScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const [selectedFilter, setSelectedFilter] = useState<boolean>();
  const [isOpenBottomSheetFilter, setIsOpenBottomSheetFilter] =
    useState<boolean>(false);
  const [isOpenYearPicker, setIsOpenYearPicker] = useState(false);
  const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false);
  const handleOnCloseBottomSheetFilter = () => {
    setIsOpenBottomSheetFilter(false);
  };
  return (
    <Container>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View
          style={{
            borderRightWidth: 1,
            borderColor: Color.gray[200],
            paddingRight: 10,
          }}
        >
          <Chip
            options={[{ label: 'Option 1', value: '1' }]}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            onPress={() => setIsOpenBottomSheetFilter(true)}
            direction="horizontal"
            color="primary"
            renderItem={() => (
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Icon name="Filter" size={15} color={Color.gray[600]} />
                <Typography
                  variant="t2"
                  weight="semibold"
                  color={Color.gray[800]}
                >
                  Filter
                </Typography>
              </View>
            )}
          />
        </View>
        <Chip
          options={[
            { label: 'Semua', value: '1' },
            { label: 'Pengajuan Saya', value: '2' },
            { label: 'Option 1', value: '3' },
            { label: 'Option 1', value: '4' },
          ]}
          selected={selectedStatus}
          onSelect={setSelectedStatus}
          direction="horizontal"
          multiple
          color="primary"
        />
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />
      <Footer>
        <Container>
          <Button
            title="Buat Pengajuan"
            color="primary"
            onPress={() => navigation.navigate('LeaveForm')}
          />
        </Container>
      </Footer>
      <BottomSheet
        isOpen={isOpenBottomSheetFilter}
        onClose={handleOnCloseBottomSheetFilter}
        footer={<Button title="Tampilkan hasil" color="primary" />}
      >
        <ScrollView>
          <View style={{ gap: 12 }}>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Berdasrakan Peran
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Semua', value: '1' },
                    { label: 'Pengajuan Saya', value: '2' },
                    { label: 'Option 1', value: '3' },
                    { label: 'Option 1', value: '4' },
                  ]}
                  selected={selectedStatus}
                  onSelect={setSelectedStatus}
                  direction="vertical"
                  size="small"
                  multiple
                  color="primary"
                />
              </Card>
            </View>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Status
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Terbuka', value: 'tes ' },
                    { label: 'Disetujui ', value: 'tes2 ' },
                    { label: 'Disetujui HR ', value: 'tes4 ' },
                    { label: 'Ditolak ', value: 'tes3 ' },
                  ]}
                  scrollable
                  direction="vertical"
                  size="small"
                  color="primary"
                  multiple
                />
              </Card>
            </View>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Status
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Terbuka', value: 'tes' },
                    { label: 'Disetujui', value: 'tes2' },
                    { label: 'Disetujui HR', value: 'tes4' },
                    { label: 'Ditolak', value: 'tes3' },
                  ]}
                  scrollable
                  direction="vertical"
                  size="small"
                  color="primary"
                  multiple
                />
              </Card>
            </View>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Status
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Terbuka', value: 'tes' },
                    { label: 'Disetujui', value: 'tes2' },
                    { label: 'Disetujui HR', value: 'tes4' },
                    { label: 'Ditolak', value: 'tes3' },
                  ]}
                  scrollable
                  direction="vertical"
                  size="small"
                  color="primary"
                  multiple
                />
              </Card>
            </View>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Status
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Terbuka', value: 'tes' },
                    { label: 'Disetujui', value: 'tes2' },
                    { label: 'Disetujui HR', value: 'tes4' },
                    { label: 'Ditolak', value: 'tes3' },
                  ]}
                  scrollable
                  direction="vertical"
                  size="small"
                  color="primary"
                  multiple
                />
              </Card>
            </View>
            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Status
              </Typography>
              <Card>
                <Chip
                  options={[
                    { label: 'Terbuka', value: 'tes' },
                    { label: 'Disetujui', value: 'tes2' },
                    { label: 'Disetujui HR', value: 'tes4' },
                    { label: 'Ditolak', value: 'tes3' },
                  ]}
                  scrollable
                  direction="vertical"
                  size="small"
                  color="primary"
                  multiple
                />
              </Card>
            </View>

            <View style={{ gap: 12 }}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                Tanggal
              </Typography>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="outline"
                    onPress={() => setIsOpenYearPicker(true)}
                    color="primary"
                    size="small"
                    block
                    title="Pilih Tahun"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="outline"
                    onPress={() => setIsOpenMonthPicker(true)}
                    color="primary"
                    size="small"
                    block
                    title="Pilih Bulan"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
      <YearPicker
        isOpen={isOpenYearPicker}
        onClose={() => setIsOpenYearPicker(false)}
      />
      <MonthPicker isOpen={isOpenMonthPicker} />
    </Container>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 8,
    gap: 8,
    flex: 1,
  },
  containerItemCard: {
    marginBottom: 8,
    gap: 8,
    flex: 1,
  },
});
