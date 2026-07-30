import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Color, Drawing, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoSurface,
} from '../components/demo';

export default function DrawingScreen() {
  const [value, setValue] = useState<string | null | undefined>(null);

  const preview = value ? `${value.slice(0, 40)}...` : '-';

  return (
    <DemoScreen
      title="Drawing"
      description="Kanvas tanda tangan berbasis webview; hasil goresan dikirim sebagai string base64 lewat onChange."
      scrollable={false}
    >
      <DemoSection
        title="Kanvas tanda tangan"
        note="onChange mengirim base64 tiap kali pengguna selesai menggores; tombol Clear bawaan mengosongkan kanvas dan memanggil onChange(null)."
      >
        <DemoLabel text="onChange" />
        <DemoSurface style={styles.frame}>
          <Drawing onChange={setValue} />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Hasil: ${preview}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: 400,
  },
});
