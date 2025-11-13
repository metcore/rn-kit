import {
  Button,
  Color,
  Container,
  Footer,
  InputFile,
  Typography,
} from '@herca/rn-kit';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function InputFileScreen() {
  const onlineFiles = [
    {
      id: 1,
      name: 'React Native Docs.pdf',
      uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'application/pdf',
    },
    {
      id: 2,
      name: 'Sample Image.jpg',
      uri: 'https://cdn.herca.id/stg/uploads/images_face_recog/98_2025-09-03_1417182857c2f1-6278-4c26-9919-cad4495974ca.JPEG',
      type: 'image/jpeg',
    },
  ];

  const [attachments, setAttachments] = useState<any[]>(onlineFiles);
  const [hasError, setHasError] = useState(false);

  const validate = () => {
    const validated = attachments.map((file, index) => {
      const size = (file?.size ?? file?.fileSize ?? 0) / (1024 * 1024);
      if (size > 3) {
        setHasError(true);
        return {
          ...file,
          hint: `Ukuran file untuk file ke ${index + 1} melebihi 3MB`,
          error: true,
        };
      }

      return { ...file, hint: undefined, error: false };
    });

    setAttachments(validated);
  };

  // useEffect(() => {
  //   console.log(attachments);
  // }, [attachments]);

  return (
    <ScrollView>
      <Container style={styles.container}>
        <InputFile
          multiple
          variant="small"
          onChange={(value) => setAttachments(value)}
          hasError={hasError}
          value={attachments}
          title="Upload File"
          btnChooseFileText="Pilih File"
          modalPickFileText={{
            title: 'pilih file yang kamu sukai',
            description: 'Pilih file yang kamu sukai di alamm 5MB.',
            camera: {
              title: 'Ambil Fotooo',
              description: 'Ambil foto dari kamera mu',
            },
            gallery: {
              title: 'Ambil Foto Dari Galeri',
              description: 'Awas ada sule',
            },
            document: {
              title: 'Ambil dokumen',
              description: 'Cari dokumen dari file manager!',
            },
          }}
          modalDeleteText={{
            title: 'Ini Adalah Title',
            description: 'Ini Adalah description yang sangat panjang dan',
            confirmBtn: {
              confirm: 'Hapus',
              cancel: 'Cek Kembali',
            },
          }}
        />

        <InputFile
          value={attachments}
          hasError={hasError}
          onChange={(value) => setAttachments(value)}
          title="Upload bukti"
          btnChooseFileText="Pilih File"
          description="Uplaod bukti pembayaran sekarang juga gpl ya"
          modalPickFileText={{
            title: 'pilih file yang kamu sukai',
            description: 'Pilih file yang kamu sukai di alamm 5MB.',
            camera: {
              title: 'Ambil Fotooo',
              description: 'Ambil foto dari kamera mu',
            },
            gallery: {
              title: 'Ambil Foto Dari Galeri',
              description: 'Awas ada sule',
            },
            document: {
              title: 'Ambil dokumen',
              description: 'Cari dokumen dari file manager!',
            },
          }}
          modalDeleteText={{
            title: 'Ini Adalah Title',
            description: 'Ini Adalah description yang sangat panjang dan',
            confirmBtn: {
              confirm: 'Hapus',
              cancel: 'Cek Kembali',
            },
          }}
        />

        <View style={styles.resultContainer}>
          <Typography variant="t2" weight="medium" color={Color.gray[900]}>
            Result example:
          </Typography>
          <Typography variant="t3" weight="medium" color={Color.gray[600]}>
            {JSON.stringify(attachments, null, 2)}
          </Typography>
        </View>
        <Footer style={styles.footer}>
          <Button title="Simpan" onPress={validate} color="primary" />
        </Footer>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 45,
    gap: 10,
  },
  footer: {
    padding: 24,
  },
  resultContainer: { marginTop: 10 },
});
