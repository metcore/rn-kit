import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Color, Step, StepItem, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const STEPS = [
  { title: 'Alamat', desc: 'Isi alamat lengkap tujuan pengiriman.' },
  { title: 'Pembayaran', desc: 'Pilih metode pembayaran yang tersedia.' },
  { title: 'Konfirmasi', desc: 'Periksa kembali detail sebelum mengirim.' },
];

export default function StepScreen() {
  const [current, setCurrent] = useState(0);

  return (
    <DemoScreen
      title="Step"
      description="Step menampilkan alur bertahap (wizard) dengan header horizontal; StepItem dengan index lebih kecil dari current otomatis ditandai selesai."
    >
      <DemoSection
        title="Navigasi terkontrol"
        note="current dari state luar menentukan langkah aktif; langkah sebelumnya otomatis bercentang hijau (selesai)."
      >
        <DemoLabel text="current onChangeStep" />
        <View style={styles.frame}>
          <Step current={current} onChangeStep={setCurrent}>
            {STEPS.map((step) => (
              <StepItem key={step.title} title={step.title}>
                <View style={styles.content}>
                  <Typography
                    variant="t2"
                    weight="semibold"
                    color={Color.gray[900]}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="t3" color={Color.gray[600]}>
                    {step.desc}
                  </Typography>
                </View>
              </StepItem>
            ))}
          </Step>
        </View>
        <DemoLabel text="Sebelumnya / Berikutnya" />
        <View style={styles.actions}>
          <Button
            title="Sebelumnya"
            variant="outline"
            color="primary"
            disabled={current === 0}
            onPress={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          />
          <Button
            title="Berikutnya"
            color="primary"
            disabled={current === STEPS.length - 1}
            onPress={() =>
              setCurrent((prev) => Math.min(prev + 1, STEPS.length - 1))
            }
          />
        </View>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Langkah aktif: ${current + 1} dari ${STEPS.length} (${STEPS[current]?.title})`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.gray[300],
    backgroundColor: Color.base.white100,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});
