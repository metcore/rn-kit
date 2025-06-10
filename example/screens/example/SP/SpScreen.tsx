import {
  Alert,
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
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  type ImageSourcePropType,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { type NavigationProps } from '../../../type/navigation';

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
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed3-3ad53abb28da',
    user: {
      name: 'Jhon',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp2',
    status: 'disetujui',
    periode: '16 Juli 2025 - 15 Januari 2026',
  },
  {
    id: 'bd7acbea-c1b1-46c4-aed5-3ad53abb28da',
    user: {
      name: 'Jhon',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp2',
    status: 'disetujui',
    periode: '16 Juli 2025 - 15 Januari 2026',
  },
  {
    id: 'bd7acbea-c1b1-56c4-aed5-3ad53abb28da',
    user: {
      name: 'Jhon',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp2',
    status: 'disetujui',
    periode: '16 Juli 2025 - 15 Januari 2026',
  },
  {
    id: 'bd7acbea-c16b1-56c4-aed5-3ad53abb28da',
    user: {
      name: 'Jhon',
      image: require('../../../assets/avatar.png'),
    },
    level_reprimand: 'Sp2',
    status: 'disetujui',
    periode: '16 Juli 2025 - 15 Januari 2026',
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
}

interface ItemProps {
  navigation: NavigationProps;
  item: DataProps;
}
const Item = ({ navigation, item }: ItemProps) => (
  <TouchableOpacity onPress={() => navigation.navigate('SpDetail')}>
    <Card style={{ marginBottom: 8, gap: 8, flex: 1 }}>
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
              {item.user.name}
            </Typography>
            <Typography variant="t2" weight="regular" color={Color.gray[600]}>
              {item.status}
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
            <Icon name="Document" size={18} color={Color.primary[1000]} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Typography variant="t3" weight="regular" color={Color.gray[600]}>
                Level Reprimand
              </Typography>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                {item.level_reprimand}
              </Typography>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ justifyContent: 'center' }}>
            <Icon name="Calendar" size={18} color={Color.primary[1000]} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Typography variant="t3" weight="regular" color={Color.gray[600]}>
                Masa Periode Surat Peringatan
              </Typography>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                {item.periode}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

export default function SpScreen() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaProvider>
      <Container style={styles.container}>
        <Alert
          color="info"
          title="20 Desember 2024 - 19 Juni 2025 (6 Bulan)"
          message="Dalam masa periode Surat Peringatan ini, jika kamu menerima Surat Peringatan lain, maka Level Surat Peringatan akan ditingkatkan."
        />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </Container>
      <Footer>
        <Container>
          <Button title="Add Sp" size="small" color="primary" />
        </Container>
      </Footer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
