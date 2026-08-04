import { StyleSheet, View } from 'react-native';
import { Avatar, Color } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoRow,
  DemoLabel,
} from '../components/demo';

const SIZES = ['small', 'medium', 'large'] as const;

export default function AvatarScreen() {
  return (
    <DemoScreen
      title="Avatar"
      description="Avatar menampilkan foto pengguna, atau inisial nama bila gambar tidak tersedia, dalam tiga ukuran."
    >
      <DemoSection
        title="Ukuran"
        note="size mengubah dimensi avatar: small (30px), medium (40px), large (50px)."
      >
        <DemoRow>
          {SIZES.map((size) => (
            <View key={size} style={styles.item}>
              <Avatar
                size={size}
                name="RK"
                backgroundColor={Color.primary[600]}
                textColor={Color.base.white100}
              />
              <DemoLabel text={`size="${size}"`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Gambar vs inisial"
        note="source menampilkan gambar; jika kosong, Avatar otomatis menampilkan inisial dari name."
      >
        <DemoRow>
          <View style={styles.item}>
            <Avatar size="large" source={require('../assets/avatar.png')} />
            <DemoLabel text="source" />
          </View>
          <View style={styles.item}>
            <Avatar
              size="large"
              name="RK"
              backgroundColor={Color.primary[600]}
              textColor={Color.base.white100}
            />
            <DemoLabel text="name" />
          </View>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Fallback tanpa data"
        note="Tanpa source maupun name, Avatar tetap tampil sebagai lingkaran polos berwarna backgroundColor."
      >
        <DemoLabel text="backgroundColor" />
        <Avatar size="large" backgroundColor={Color.gray[300]} />
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    gap: 8,
  },
});
