import { useState } from 'react';
import { Color, InputFile, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';
import { types } from '@react-native-documents/picker';
// TODO: export dari @herca/rn-kit
import type { FileItem } from '../../src/Input/type';

const preloadedFiles: FileItem[] = [
  {
    name: 'React Native Docs.pdf',
    uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    type: 'application/pdf',
  },
];

export default function InputFileScreen() {
  const [picked, setPicked] = useState<FileItem[]>([]);
  const [attachments, setAttachments] = useState<FileItem[]>(preloadedFiles);

  return (
    <DemoScreen
      title="Input File"
      description="Pemicu untuk memilih file dari kamera, galeri, atau dokumen perangkat, lengkap dengan preview, ganti, dan hapus file."
    >
      <DemoSection
        title="Alur pilih file"
        note="Menekan trigger membuka bottom sheet pilihan sumber (kamera/galeri/dokumen); multiple mengizinkan lebih dari satu file."
      >
        <InputFile
          multiple
          variant="small"
          title="Upload dokumen"
          btnChooseFileText="Pilih file"
          value={picked}
          onChange={setPicked}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${picked.length} file`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Daftar file terpilih"
        note="value diisi dari luar untuk menampilkan file yang sudah ada, mis. saat mode edit; variant default menampilkan judul dan deskripsi."
      >
        <InputFile
          title="Bukti pembayaran"
          description="Format JPG, PNG, atau PDF"
          value={attachments}
          onChange={setAttachments}
        />
      </DemoSection>

      <DemoSection
        title="Batasan tipe & ukuran"
        note="accept membatasi tipe dokumen; maxSize (dalam MB) dan maxSizeErrorMessage menolak file yang kelebihan ukuran sebelum diproses."
      >
        <DemoLabel text="accept maxSize={1}" />
        <InputFile
          variant="small"
          title="Upload KTP"
          accept={[types.pdf, types.images]}
          maxSize={1}
          maxSizeErrorMessage="Ukuran file maksimal 1MB"
        />
      </DemoSection>

      <DemoSection
        title="Hapus file"
        note="Menekan file yang sudah ada memunculkan opsi ganti/hapus; modalDeleteText mengganti teks pada modal konfirmasi hapus."
      >
        <InputFile
          title="Bukti pembayaran"
          value={attachments}
          onChange={setAttachments}
          modalDeleteText={{
            title: 'Hapus dokumen ini?',
            description: 'Dokumen yang dihapus tidak bisa dikembalikan.',
            confirmBtn: { confirm: 'Hapus', cancel: 'Batal' },
          }}
        />
      </DemoSection>
    </DemoScreen>
  );
}
