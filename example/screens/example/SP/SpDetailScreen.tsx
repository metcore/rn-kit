import {
  Alert,
  Avatar,
  Badge,
  Card,
  Button,
  Color,
  Container,
  Footer,
  Icon,
  List,
  ListItem,
  Typography,
  BottomSheet,
  Timeline,
  TimelineItem,
} from '@herca/ui-kit';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SpDetailScreen() {
  const navigation = useNavigation<any>();

  const [isOpenModalStatus, setIosOpenModalStatus] = useState(false);
  return (
    <View>
      <ScrollView>
        <Container style={{ gap: 16 }}>
          <Card
            style={styles.containerCard}
            backgroundImage={require('../../../assets/sp_banner.png')}
          >
            <Image source={require('../../../assets/sp1.png')} />
            <View>
              <Typography
                variant="p2"
                weight="semibold"
                color={Color.base.white100}
              >
                Surat
              </Typography>
              <Typography
                variant="p2"
                weight="semibold"
                color={Color.base.white100}
              >
                Peringatan
              </Typography>
            </View>
          </Card>
          <Card>
            <View style={styles.containerCard}>
              <View style={{ flex: 1 }}>
                <Avatar source={require('../../../assets/avatar.png')} />
              </View>
              <View style={{ flex: 5 }}>
                <Badge color="info" value={'PT. Herca Cipta Dermal Perdana'} />
                <Typography variant="p3" weight="semibold">
                  Nurdin Maemunah
                </Typography>
                <Typography
                  variant="t3"
                  weight="medium"
                  color={Color.gray[600]}
                >
                  Nurdin Maemunah
                </Typography>
              </View>
            </View>

            <Alert
              icon="ExlamationMark"
              message="Karyawan tidak dapat melakukan absensi dan membuat surat pengajuan, sebelum menyelesaikan surat peringatan ini"
              color="warning"
            />
          </Card>
          <Card style={{ gap: 12 }}>
            <View style={{ gap: 8 }}>
              <Typography
                variant="p2"
                weight="semibold"
                color={Color.gray[800]}
              >
                Surat Peringatan 2 ⚠️
              </Typography>
              <Typography variant="t2" weight="medium" color={Color.gray[800]}>
                Jum’at, 14 Februari 2025 - 14:03
              </Typography>
            </View>
            <Card backgroundImage={require('../../../assets/sp_bg_card_2.png')}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'space-between',
                }}
              >
                <Image source={require('../../../assets/sp2.png')} />
                <View>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[700]}
                  >
                    Lihat surat peringatan ⚠️
                  </Typography>
                  <Typography
                    variant="t3"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    Unduh untuk melihat surat peringatan
                  </Typography>
                </View>
                <Button
                  title={<Icon name="Download" />}
                  size="small"
                  color="success"
                />
              </View>
            </Card>
            <Alert
              icon="ExlamationMark"
              message="Sp ini dapat didiskusikan dengna pembuat SP"
              color="info"
            />
          </Card>
          <Card>
            <Typography variant="t2" color={Color.gray[600]} weight="regular">
              Level Reprimend
            </Typography>
            <Typography variant="t1" color={Color.gray[800]} weight="semibold">
              SP2
            </Typography>
          </Card>
          <Typography variant="t2" weight="medium" color={Color.gray[600]}>
            Status
          </Typography>
          <Card>
            <TouchableOpacity
              onPress={() => setIosOpenModalStatus(!isOpenModalStatus)}
              style={styles.containerCard}
            >
              <View style={{ flex: 8 }}>
                <Typography
                  variant="t2"
                  color={Color.gray[800]}
                  weight="semibold"
                >
                  Status Terakhir
                </Typography>
                <Typography
                  variant="t3"
                  color={Color.gray[600]}
                  weight="regular"
                >
                  Jumat, 14 Februari 2025
                </Typography>
              </View>
              <Badge value="Terbuka" color="warning" />
            </TouchableOpacity>
          </Card>
          <Typography variant="t2" color={Color.gray[600]} weight="medium">
            Catatan
          </Typography>
          <Card style={{ flexDirection: 'row', gap: 15 }}>
            <Badge
              color="warning"
              value={<Icon name="StickyNote" color={Color.warning[300]} />}
            />

            <Typography variant="t2" color={Color.gray[600]} weight="regular">
              Berdasarkan catatan kehadiran kami, Anda telah beberapa kali
              teerlambat masuk kerja
            </Typography>
          </Card>
          <Typography variant="t2" color={Color.gray[600]} weight="medium">
            Catatan
          </Typography>
          <List>
            <ListItem>
              <View style={styles.containerListItem}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Icon name="Pdf" size={39} color={Color.danger[500]} />
                  <View>
                    <Typography
                      variant="t1"
                      weight="semibold"
                      color={Color.gray[600]}
                    >
                      Absensi.pdf
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[600]}
                    >
                      2 mb
                    </Typography>
                  </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Icon name="ArrowRight" size={14} />
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View style={styles.containerListItem}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Icon name="Pdf" size={39} color={Color.danger[500]} />
                  <View>
                    <Typography
                      variant="t1"
                      weight="semibold"
                      color={Color.gray[600]}
                    >
                      Absensi.pdf
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[600]}
                    >
                      2 mb
                    </Typography>
                  </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Icon name="ArrowRight" size={14} />
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View style={styles.containerListItem}>
                <Typography
                  variant="t1"
                  weight="semibold"
                  color={Color.gray[600]}
                >
                  Absensi.pdf
                </Typography>
                <View style={{ justifyContent: 'center' }}>
                  <Icon name="ArrowRight" size={14} />
                </View>
              </View>
            </ListItem>
            <ListItem>
              <View style={styles.containerListItem}>
                <Typography
                  variant="t1"
                  weight="semibold"
                  color={Color.gray[600]}
                >
                  Absensi.pdf
                </Typography>
                <View style={{ justifyContent: 'center' }}>
                  <Icon name="ArrowRight" size={14} />
                </View>
              </View>
            </ListItem>
          </List>
          <Typography variant="t2" color={Color.gray[600]} weight="medium">
            Pembuat surat peringatan
          </Typography>
          <Card style={styles.containerCard}>
            <Avatar source={require('../../../assets/avatar.png')} />
            <View>
              <Badge color="info" value={'PT. HERCA CIPTA DERMAL PERDANA'} />
              <Typography
                variant="p3"
                weight="semibold"
                color={Color.gray[800]}
              >
                The One Super Admin
              </Typography>
              <Typography variant="t3" weight="medium" color={Color.gray[600]}>
                The One Super Admin
              </Typography>
            </View>
          </Card>
        </Container>
      </ScrollView>
      <Footer>
        <Container>
          <Button
            onPress={() => navigation.navigate('SpLatter')}
            color="primary"
          >
            <Typography
              variant="t1"
              weight="semibold"
              color={Color.base.white100}
            >
              Setuju
            </Typography>
          </Button>
        </Container>
      </Footer>

      <BottomSheet
        onClose={() => setIosOpenModalStatus(false)}
        isOpen={isOpenModalStatus}
      >
        <View style={{ gap: 32 }}>
          <Card
            backgroundImage={require('../../../assets/sp_banner.png')}
            style={{ alignItems: 'center' }}
          >
            <Typography
              variant="p2"
              weight="semibold"
              color={Color.base.white100}
            >
              Detail Status
            </Typography>
            <Typography
              variant="p2"
              weight="semibold"
              color={Color.base.white100}
            >
              Surat Peringatan
            </Typography>
          </Card>
          <Card>
            <Timeline>
              <TimelineItem color={'warning'}>
                <View style={styles.containerListItem}>
                  <View>
                    <Typography
                      variant="t3"
                      weight="medium"
                      color={Color.gray[500]}
                    >
                      Pembuatn
                    </Typography>
                    <View style={{ gap: 4 }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[800]}
                      >
                        Mamet core
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="medium"
                        color={Color.gray[500]}
                      >
                        Jumat, 1 Februari 2025 - 14:03
                      </Typography>
                    </View>
                  </View>
                  <Badge value={'Terbuka'} color="warning" />
                </View>
              </TimelineItem>
              <TimelineItem color={'success'}>
                <View style={styles.containerListItem}>
                  <View>
                    <Typography
                      variant="t3"
                      weight="medium"
                      color={Color.gray[500]}
                    >
                      Pembuatn
                    </Typography>
                    <View style={{ gap: 4 }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[800]}
                      >
                        Mamet core
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="medium"
                        color={Color.gray[500]}
                      >
                        Jumat, 1 Februari 2025 - 14:03
                      </Typography>
                    </View>
                  </View>
                  <Badge value={'Terbuka'} color="success" />
                </View>
              </TimelineItem>
              <TimelineItem color={'primary'}>
                <View style={styles.containerListItem}>
                  <View>
                    <Typography
                      variant="t3"
                      weight="medium"
                      color={Color.gray[500]}
                    >
                      Pembuatn
                    </Typography>
                    <View style={{ gap: 4 }}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[800]}
                      >
                        Mamet core
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="medium"
                        color={Color.gray[500]}
                      >
                        Jumat, 1 Februari 2025 - 14:03
                      </Typography>
                    </View>
                  </View>
                  <Badge value={'paid'} color="primary" />
                </View>
              </TimelineItem>
            </Timeline>
          </Card>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  containerListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerCard: {
    flexDirection: 'row',
  },
});
