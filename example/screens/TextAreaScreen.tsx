import { useState } from 'react';
import { Color, TextArea, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const MAX_LENGTH = 120;

export default function TextAreaScreen() {
  const [bio, setBio] = useState('');

  return (
    <DemoScreen
      title="Text Area"
      description="Input teks multi-baris untuk konten panjang seperti deskripsi atau catatan, dengan tinggi yang bisa diatur."
    >
      <DemoSection
        title="Dasar"
        note="label menampilkan judul field di atas area teks."
      >
        <TextArea label="Catatan" placeholder="Tulis catatan di sini" />
      </DemoSection>

      <DemoSection
        title="Tinggi kustom"
        note="height mengatur tinggi area teks secara eksplisit (default 116)."
      >
        <DemoLabel text="height={80}" />
        <TextArea
          label="Ringkasan singkat"
          placeholder="Tulis ringkasan singkat"
          height={80}
        />
      </DemoSection>

      <DemoSection
        title="Penghitung karakter"
        note="maxLength (props bawaan TextInput) membatasi input; readout di bawah menghitung sisa karakter secara manual."
      >
        <TextArea
          label="Bio"
          placeholder="Ceritakan tentang dirimu"
          maxLength={MAX_LENGTH}
          value={bio}
          onChangeText={setBio}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`${bio.length}/${MAX_LENGTH} karakter`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Error & hint"
        note="hasError mengubah border jadi merah; hint menampilkan pesan kecil di bawah area teks."
      >
        <DemoLabel text="hasError hint" />
        <TextArea
          label="Alasan pengajuan"
          placeholder="Tulis alasan"
          hasError
          hint="Alasan wajib diisi"
        />
      </DemoSection>

      <DemoSection
        title="Keadaan nonaktif"
        note="editable={false} mengunci area teks agar tidak bisa diubah."
      >
        <DemoLabel text="editable={false}" />
        <TextArea
          label="Terkunci"
          value="Konten ini tidak bisa diedit"
          editable={false}
        />
      </DemoSection>
    </DemoScreen>
  );
}
