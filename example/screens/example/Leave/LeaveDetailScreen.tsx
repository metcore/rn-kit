// imports tetap sama
import {
  Avatar,
  Badge,
  BottomSheet,
  Card,
  Color,
  Container,
  Icon,
  List,
  ListItem,
  Timeline,
  TimelineItem,
  Typography,
} from '@herca/ui-kit';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Attachment from '../../../components/Attachment';

export default function LeaveDetailScreen() {
  const [isOpenModalStatus, setIosOpenModalStatus] = useState(false);

  return (
    <View>
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
                <Badge value="PT. Herca Cipta Dermal Perdana" color="info" />
                <Typography
                  variant="t1"
                  weight="semibold"
                  color={Color.gray[800]}
                >
                  Mama Alkatiri User
                </Typography>
                <Typography
                  variant="t3"
                  weight="medium"
                  color={Color.gray[600]}
                >
                  Finance
                </Typography>
              </View>
              <Image source={require('../../../assets/leave/briefcase.png')} />
            </View>

            <List>
              <ListItem>
                <View style={styles.listItemContainer}>
                  <Badge color="success">
                    <Icon name="Calendar" color={Color.success[300]} />
                  </Badge>
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
                      color={Color.gray[800]}
                    >
                      Selasa, 24 Des 2024 - 16:00:00
                    </Typography>
                  </View>
                </View>
              </ListItem>

              <ListItem>
                <View style={styles.listItemContainer}>
                  <Badge color="warning">
                    <Icon name="Calendar" color={Color.warning[300]} />
                  </Badge>
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
                      color={Color.gray[800]}
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

          <Typography variant="t2" weight="medium" color={Color.gray[600]}>
            Dokumen
          </Typography>

          <Attachment
            data={[
              require('../../../assets/sp2.png'),
              require('../../../assets/sp2.png'),
              require('../../../assets/sp_banner.png'),
            ]}
          />

          <Typography variant="t2" color={Color.gray[600]} weight="medium">
            Catatan
          </Typography>
          <Card style={styles.noteCard}>
            <Badge
              color="warning"
              value={<Icon name="StickyNote" color={Color.warning[300]} />}
            />
            <Typography variant="t2" color={Color.gray[600]} weight="regular">
              Berdasarkan catatan kehadiran kami, Anda telah beberapa kali
              teerlambat masuk kerja
            </Typography>
          </Card>
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
    </View>
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
    gap: 2,
  },
  listItemContainer: {
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
});
