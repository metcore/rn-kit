// imports tetap sama
import {
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  Color,
  Container,
  Footer,
  Icon,
  Label,
  List,
  ListItem,
  Timeline,
  TimelineItem,
  Typography,
} from '@herca/rn-kit';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Attachment from '../../../components/Attachment';
import { useNavigation } from '@react-navigation/native';
import { type NavigationProps } from '../../../type/navigation';

export default function LeaveDetailScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [isOpenModalStatus, setIosOpenModalStatus] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={styles.containerGap}>
          <Card
            style={[styles.listItemContainer, styles.cardBanner]}
            backgroundImage={require('../../../assets/sp_banner.png')}
          >
            <View>
              <Typography
                variant="p2"
                weight="semibold"
                color={Color.base.white100}
              >
                Pengajuan
              </Typography>
              <Typography
                variant="p2"
                weight="semibold"
                color={Color.base.white100}
              >
                Cuti
              </Typography>
            </View>
          </Card>

          <Card style={styles.cardGap}>
            <View style={styles.headerInfo}>
              <Avatar
                source={require('../../../assets/leave/type_cuti1.png')}
              />
              <View style={styles.headerText}>
                <View>
                  <Badge
                    value="PT. Herca Cipta Dermal Perdana"
                    size="small"
                    color="info"
                  />
                  <Typography
                    variant="t1"
                    weight="semibold"
                    color={Color.gray[900]}
                  >
                    Mama Alkatiri User
                  </Typography>
                  <Typography
                    variant="t3"
                    weight="medium"
                    color={Color.gray[900]}
                  >
                    Finance
                  </Typography>
                </View>
                <Icon name="AirPlane" size={29} color={Color.warning[300]} />
              </View>
            </View>

            <List>
              <ListItem>
                <View style={styles.listItemContainer}>
                  <Label icon="Calendar" color="success" />
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[600]}
                    >
                      Dibuat Pada
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[900]}
                    >
                      Selasa, 24 Des 2024 - 16:00:00
                    </Typography>
                  </View>
                </View>
              </ListItem>

              <ListItem>
                <View style={styles.listItemContainer}>
                  <Label icon="Calendar" color="warning" />
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[600]}
                    >
                      Tanggal Pengajuan Cuti
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[900]}
                    >
                      Selasa, 24 Des 2024 - 16:00:00
                    </Typography>
                  </View>
                </View>
              </ListItem>

              <ListItem style={styles.highlightedListItem}>
                <View style={styles.listItemContainer}>
                  <Typography
                    variant="t2"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    Nomor Pengajuan{' '}
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[800]}
                  >
                    Sl - 444
                  </Typography>
                </View>
              </ListItem>
            </List>
          </Card>

          <View>
            <Typography variant="t2" weight="medium" color={Color.gray[600]}>
              Informasi Pengajuan
            </Typography>
            <List>
              {[
                ['Tipe Cuti', 'Cuti Melahirkan'],
                ['Permintaa Cuti', 'Cuti Setengah hari'],
                ['Maksimal Jumlah Cuti', '2 hari'],
              ].map(([label, value], i) => (
                <ListItem key={i}>
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[600]}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[800]}
                    >
                      {value}
                    </Typography>
                  </View>
                </ListItem>
              ))}
            </List>
          </View>
          <View>
            <Typography variant="t2" weight="medium" color={Color.gray[600]}>
              Informasi Pengajuan
            </Typography>
            <Card>
              <TouchableOpacity
                onPress={() => setIosOpenModalStatus(!isOpenModalStatus)}
                style={styles.statusRow}
              >
                <View style={styles.statusText}>
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
          </View>
          <View>
            <Typography variant="t2" weight="medium" color={Color.gray[600]}>
              Dokumen
            </Typography>
            <Attachment
              data={[
                require('../../../assets/sp2.png'),
                require('../../../assets/input-file.png'),
                require('../../../assets/avatar.png'),
              ]}
            />
          </View>
          <View>
            <Typography variant="t2" color={Color.gray[600]} weight="medium">
              Catatan
            </Typography>
            <Card style={styles.noteCard}>
              <Label icon="StickyNote" color="warning" />
              <Typography variant="t2" color={Color.gray[600]} weight="regular">
                Berdasarkan catatan kehadiran kami, Anda telah beberapa kali
                teerlambat masuk kerja
              </Typography>
            </Card>
          </View>
          <View>
            <Typography variant="t2" color={Color.gray[600]} weight="medium">
              Persetujuan
            </Typography>
            <List>
              <ListItem>
                <View style={styles.listApprover}>
                  <Label icon="Check" color="success" />
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[700]}
                    >
                      Disetujui Oleh
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[900]}
                    >
                      Metcore
                    </Typography>
                  </View>
                </View>
              </ListItem>
              <ListItem>
                <View style={styles.listApprover}>
                  <Label icon="Check" color="success" />
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[700]}
                    >
                      Disetujui Oleh
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[900]}
                    >
                      Metcore
                    </Typography>
                  </View>
                </View>
              </ListItem>
              <ListItem>
                <View style={styles.listApprover}>
                  <Label icon="Check" color="success" size="medium" />
                  <View>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[700]}
                    >
                      Disetujui Oleh
                    </Typography>
                    <Typography
                      variant="t2"
                      weight="regular"
                      color={Color.gray[900]}
                    >
                      Metcore
                    </Typography>
                  </View>
                </View>
              </ListItem>
            </List>
          </View>
        </Container>
      </ScrollView>

      <BottomSheet
        onClose={() => setIosOpenModalStatus(false)}
        isOpen={isOpenModalStatus}
      >
        <View style={styles.bottomSheetContent}>
          <Card
            backgroundImage={require('../../../assets/sp_banner.png')}
            style={styles.centeredCard}
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
              {[
                ['warning', 'Terbuka'],
                ['success', 'Terbuka'],
                ['primary', 'paid'],
              ].map(([color, value], index) => (
                <TimelineItem color={color as any} key={index}>
                  <View style={styles.containerListItem}>
                    <View>
                      <Typography
                        variant="t3"
                        weight="medium"
                        color={Color.gray[500]}
                      >
                        Pembuatn
                      </Typography>
                      <View style={styles.timelineText}>
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
                    <Badge value={value} color={color as any} />
                  </View>
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
        </View>
      </BottomSheet>
      <Footer>
        <Container>
          <View style={styles.containerFooter}>
            <View style={styles.containerButton}>
              <Button title="Tolak" variant="tertiary" color="danger" />
            </View>
            <View style={styles.containerButton}>
              <Button
                title="Setuju"
                color="success"
                onPress={() => navigation.navigate('LeaveApprove')}
              />
            </View>
          </View>
        </Container>
      </Footer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGap: {
    gap: 16,
  },
  cardBanner: {},
  cardGap: {
    gap: 12,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  headerText: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 2,
  },
  listItemContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  highlightedListItem: {
    backgroundColor: Color.primary[50],
  },
  statusRow: {
    flexDirection: 'row',
  },
  statusText: {
    flex: 8,
  },
  noteCard: {
    flexDirection: 'row',
    gap: 15,
  },
  containerListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomSheetContent: {
    gap: 32,
  },
  centeredCard: {
    alignItems: 'center',
  },
  timelineText: {
    gap: 4,
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  containerButton: {
    flex: 1,
  },
  listApprover: {
    flexDirection: 'row',
    gap: 12,
  },
});
