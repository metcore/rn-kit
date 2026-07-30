import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoSurface } from '../components/demo';

export default function SkeletonScreen() {
  return (
    <DemoScreen
      title="Skeleton"
      description="Placeholder shimmer untuk menandakan konten sedang dimuat, dibentuk lewat kombinasi width, height, dan rounded."
    >
      <DemoSection
        title="Baris teks"
        note="Beberapa Skeleton tipis dengan width berbeda meniru baris paragraf yang sedang dimuat."
      >
        <DemoSurface>
          <Skeleton width="90%" height={14} rounded={4} />
          <Skeleton width="100%" height={14} rounded={4} />
          <Skeleton width="60%" height={14} rounded={4} />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Lingkaran / avatar"
        note="rounded setengah dari width/height membuat Skeleton berbentuk lingkaran, cocok untuk placeholder foto profil."
      >
        <DemoSurface style={styles.row}>
          <Skeleton width={32} height={32} rounded={16} />
          <Skeleton width={48} height={48} rounded={24} />
          <Skeleton width={64} height={64} rounded={32} />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Blok kotak"
        note="Skeleton berukuran besar dengan rounded kecil meniru placeholder gambar atau kartu."
      >
        <DemoSurface>
          <Skeleton width="100%" height={140} rounded={12} />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Komposisi placeholder list-item"
        note="Gabungan avatar bulat dan dua baris teks di sampingnya meniru satu baris daftar (mis. daftar kontak)."
      >
        <DemoSurface>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.listRow}>
              <Skeleton width={40} height={40} rounded={20} />
              <View style={styles.listText}>
                <Skeleton width="70%" height={12} rounded={4} />
                <Skeleton width="40%" height={12} rounded={4} />
              </View>
            </View>
          ))}
        </DemoSurface>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listText: {
    flex: 1,
    gap: 6,
  },
});
