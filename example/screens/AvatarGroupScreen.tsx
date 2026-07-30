import { StyleSheet, View } from 'react-native';
import { AvatarGroup, Color } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const SIZES = ['small', 'medium', 'large'] as const;

const team = [
  { name: 'RK', backgroundColor: Color.primary[600] },
  { name: 'AS', backgroundColor: Color.success[500] },
  { source: require('../assets/avatar.png') },
  { name: 'DP', backgroundColor: Color.warning[500] },
  {},
  { name: 'MI', backgroundColor: Color.purple[500] },
];

export default function AvatarGroupScreen() {
  return (
    <DemoScreen
      title="Avatar Group"
      description="AvatarGroup menyusun beberapa Avatar bertumpuk; entri tanpa name maupun source menampilkan ikon pengguna sebagai fallback."
    >
      <DemoSection
        title="Grup dasar"
        note="avatars menerima array objek AvatarProps; urutan menentukan tumpukan dari kiri ke kanan."
      >
        <DemoLabel text="avatars" />
        <AvatarGroup avatars={team} />
      </DemoSection>

      <DemoSection
        title="Overflow +N"
        note="maxVisible membatasi jumlah avatar yang tampil; sisanya diringkas jadi bubble +N."
      >
        <DemoLabel text="maxVisible={3}" />
        <AvatarGroup avatars={team} maxVisible={3} />
      </DemoSection>

      <DemoSection
        title="Ukuran"
        note="size mengatur dimensi seluruh avatar dalam grup: small, medium, atau large."
      >
        <View style={styles.stack}>
          {SIZES.map((size) => (
            <View key={size} style={styles.item}>
              <AvatarGroup avatars={team} maxVisible={4} size={size} />
              <DemoLabel text={`size="${size}"`} />
            </View>
          ))}
        </View>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
  item: {
    gap: 8,
  },
});
