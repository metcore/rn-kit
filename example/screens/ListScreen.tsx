import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Icon, List, ListItem, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function ListScreen() {
  const [lastPressed, setLastPressed] = useState('-');

  return (
    <DemoScreen
      title="List"
      description="List menyusun ListItem secara vertikal dengan tampilan kartu; ListItem otomatis kehilangan border bawah pada baris terakhir."
    >
      <DemoSection
        title="Dasar"
        note="Setiap ListItem menampung children bebas, misalnya sepasang label dan nilai."
      >
        <List>
          <ListItem>
            <Typography variant="t2" color={Color.gray[600]}>
              Nama lengkap
            </Typography>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              Mama Alkatiri
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="t2" color={Color.gray[600]}>
              Nomor telepon
            </Typography>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              0812-3456-7890
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="t2" color={Color.gray[600]}>
              Alamat
            </Typography>
            <Typography variant="t2" weight="semibold" color={Color.gray[800]}>
              Jakarta Selatan
            </Typography>
          </ListItem>
        </List>
      </DemoSection>

      <DemoSection
        title="Ikon & elemen kanan"
        note="Baris dirender dalam View row berisi ikon di kiri atau elemen bebas di kanan, misalnya panah navigasi."
      >
        <List>
          <ListItem>
            <View style={styles.row}>
              <Icon name="User" size={18} color={Color.gray[600]} />
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                Profil saya
              </Typography>
            </View>
          </ListItem>
          <ListItem>
            <View style={[styles.row, styles.spaceBetween]}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                Pengaturan akun
              </Typography>
              <Icon name="ArrowRight" size={16} color={Color.gray[400]} />
            </View>
          </ListItem>
        </List>
      </DemoSection>

      <DemoSection
        title="Baris bisa ditekan"
        note="onPress membuat ListItem menjadi TouchableOpacity; readout di bawah menampilkan baris terakhir yang ditekan."
      >
        <DemoLabel text="onPress" />
        <List>
          <ListItem onPress={() => setLastPressed('Notifikasi')}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                Notifikasi
              </Typography>
              <Icon name="ArrowRight" size={16} color={Color.gray[400]} />
            </View>
          </ListItem>
          <ListItem onPress={() => setLastPressed('Keamanan')}>
            <View style={[styles.row, styles.spaceBetween]}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[800]}
              >
                Keamanan
              </Typography>
              <Icon name="ArrowRight" size={16} color={Color.gray[400]} />
            </View>
          </ListItem>
        </List>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terakhir ditekan: ${lastPressed}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
