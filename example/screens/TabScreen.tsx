import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Tab, TabItem, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoSurface,
} from '../components/demo';

export default function TabScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [stickyTab, setStickyTab] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);

  return (
    <DemoScreen
      title="Tab"
      description="Tab menampilkan beberapa panel konten yang berpindah lewat tap atau swipe, dengan label dan header opsional yang bisa sticky saat discroll."
      scrollable={false}
    >
      <DemoSection
        title="Tab dasar & label kustom"
        note="name memberi label teks bawaan; renderTabName mengganti label dengan tampilan sendiri, di sini berupa pill berwarna saat aktif."
      >
        <View style={styles.frame}>
          <Tab onChangeTab={setActiveTab}>
            <TabItem name="Ringkasan">
              <View style={styles.panel}>
                <Typography variant="t2" color={Color.gray[700]}>
                  Konten ringkasan akun ditampilkan di sini.
                </Typography>
              </View>
            </TabItem>
            <TabItem name="Riwayat">
              <View style={styles.panel}>
                <Typography variant="t2" color={Color.gray[700]}>
                  Daftar riwayat transaksi ditampilkan di sini.
                </Typography>
              </View>
            </TabItem>
            <TabItem
              renderTabName={({ isActive }) => (
                <View style={[styles.pill, isActive && styles.pillActive]}>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={isActive ? Color.base.white100 : Color.gray[700]}
                  >
                    Bantuan
                  </Typography>
                </View>
              )}
            >
              <View style={styles.panel}>
                <Typography variant="t2" color={Color.gray[700]}>
                  Label tab ini dirender lewat renderTabName, bukan name.
                </Typography>
              </View>
            </TabItem>
          </Tab>
        </View>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Tab aktif: ${activeTab}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Header sticky"
        note="renderHeader menambah konten tetap terlihat di atas tab bar; height pada TabItem membatasi tinggi panel agar pas dalam frame."
      >
        <DemoLabel text="renderHeader height" />
        <View style={styles.stickyFrame}>
          <Tab
            onChangeTab={setStickyTab}
            renderHeader={
              <DemoSurface style={styles.stickyHeader}>
                <Typography
                  variant="t2"
                  weight="semibold"
                  color={Color.gray[900]}
                >
                  Ringkasan saldo
                </Typography>
              </DemoSurface>
            }
          >
            <TabItem name="Info" height={panelHeight}>
              <View
                onLayout={(e) => setPanelHeight(e.nativeEvent.layout.height)}
              >
                <Typography variant="t2" color={Color.gray[700]}>
                  Saldo aktif, mutasi, dan poin ditampilkan di panel ini.
                </Typography>
              </View>
            </TabItem>
            <TabItem name="Lainnya" height={panelHeight}>
              <View>
                <Typography variant="t2" color={Color.gray[700]}>
                  Panel kedua tetap berbagi header sticky yang sama.
                </Typography>
              </View>
            </TabItem>
          </Tab>
        </View>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Tab sticky aktif: ${stickyTab}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: 190,
  },
  panel: {
    padding: 16,
  },
  pill: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: Color.gray[100],
  },
  pillActive: {
    backgroundColor: Color.primary[1000],
  },
  stickyFrame: {
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.gray[300],
  },
  stickyHeader: {
    borderRadius: 0,
    marginBottom: 0,
  },
});
