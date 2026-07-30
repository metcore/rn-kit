import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Input, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function InputScreen() {
  const [name, setName] = useState('');

  return (
    <DemoScreen
      title="Input"
      description="Input teks dasar dengan label, ikon, tombol clear, prefix, dan status error yang bisa dikombinasikan."
    >
      <DemoSection
        title="Dasar"
        note="label menampilkan judul field; required menambah tanda bintang merah di label."
      >
        <DemoLabel text="label required" />
        <Input label="Nama lengkap" placeholder="Tulis nama kamu" required />
      </DemoSection>

      <DemoSection
        title="Ikon"
        note="icon menampilkan ikon di kiri, iconRight di kanan; onPressIconLeft/onPressIconRight menangani tekanannya."
      >
        <DemoLabel text='icon="User"' />
        <Input icon="User" label="Username" placeholder="Tulis username" />
        <DemoLabel text='iconRight="Search" onPressIconRight' />
        <Input
          icon="User"
          iconRight="Search"
          label="Cari pengguna"
          placeholder="Ketik nama pengguna"
          onPressIconLeft={() => console.log('Ikon kiri ditekan')}
          onPressIconRight={() => console.log('Ikon kanan ditekan')}
        />
      </DemoSection>

      <DemoSection
        title="Tombol hapus"
        note="clearButton menampilkan tombol x untuk mengosongkan isi input saat ada teks."
      >
        <DemoLabel text="clearButton" />
        <Input
          icon="User"
          label="Bisa dihapus"
          placeholder="Tulis lalu hapus"
          clearButton
        />
      </DemoSection>

      <DemoSection
        title="Prefix"
        note="prefix menyisipkan react node bebas di depan field, misalnya kode negara."
      >
        <DemoLabel text="prefix" />
        <Input
          label="Nomor telepon"
          placeholder="8123456789"
          prefix={
            <View style={styles.prefix}>
              <Typography
                variant="t2"
                weight="semibold"
                color={Color.gray[900]}
              >
                +62
              </Typography>
            </View>
          }
        />
      </DemoSection>

      <DemoSection
        title="Error & hint"
        note="hasError mengubah border jadi merah; hint menampilkan teks kecil di bawah field untuk pesan atau petunjuk."
      >
        <DemoLabel text="hasError hint" />
        <Input
          icon="User"
          label="Email"
          placeholder="Tulis email"
          hasError
          hint="Format email tidak valid"
        />
      </DemoSection>

      <DemoSection
        title="Nonaktif"
        note="editable={false}, salah satu props bawaan TextInput, mengunci input agar tidak bisa diubah."
      >
        <DemoLabel text="editable={false}" />
        <Input label="Terkunci" value="Tidak bisa diedit" editable={false} />
      </DemoSection>

      <DemoSection
        title="Controlled"
        note="value + onChangeText menjadikan Input terkontrol dari state; readout di bawah menampilkan nilainya."
      >
        <Input
          icon="User"
          label="Nama panggilan"
          placeholder="Tulis nama panggilan"
          clearButton
          value={name}
          onChangeText={setName}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${name || '-'}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  prefix: {
    borderRightWidth: 1,
    borderColor: Color.gray[100],
    paddingRight: 8,
  },
});
