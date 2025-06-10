import {
  Avatar,
  Badge,
  Button,
  Card,
  Color,
  Container,
  Devider,
  Footer,
  Icon,
  Typography,
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
  return (
    <Container>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            borderRightWidth: 1,
            borderColor: Color.gray[200],
            paddingRight: 10,
          }}
        >
          <Button variant="outline" size="small">
            <Icon name="Filter" size={20} color={Color.gray[600]} />
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              Filter
            </Typography>
          </Button>
        </View>
        <View style={{ paddingLeft: 10, flexDirection: 'row', gap: 10 }}>
          <Button variant="outline" title="Semua" />
          <Button variant="outline" title="Pengajuan Saya (2)" />
          <Button variant="outline" title="Persetujuan Saya (2)" />
        </View>
      </ScrollView>

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
