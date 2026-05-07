import {
  Button,
  Color,
  Container,
  Footer,
  InputFile,
  Typography,
  useToast,
} from '@herca/rn-kit';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { FileItem, UploadedFile } from '../../src/Input/type';
import { types } from '@react-native-documents/picker';

export default function InputFileScreen() {
  const toast = useToast();
  const onlineFiles: FileItem[] & { id: number }[] = [
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

  const [attachments, setAttachments] = useState<FileItem[]>(onlineFiles);
  const [hasError, setHasError] = useState(false);

  const [demoUploadValue, setDemoUploadValue] = useState<
    UploadedFile<any>[] | null
  >(null);

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
          multiple
          maxSize={5}
          title="Upload KTP"
          maxSizeErrorMessage="File terlalu besar"
          accept={[types.pdf, types.images]}
          value={demoUploadValue as any[]}
          uploadConfig={{
            url: 'https://stg.media.herca.id/api/upload',
            method: 'POST',
            fieldName: 'file',
            headers: {
              'X-API-KEY': '',
            },
            extractUrl: (res: any) => res.data.url,
            errorMessage: 'Gagal mengupload file',

            onError: (file, err) => {
              console.warn('Gagal upload:', file, err);
            },

            onUploadSuccess: (results) => {
              console.log({ results });
              toast.show('Uploaded', {
                color: 'success',
              });
            },
          }}
          onChange={(uploadedResults) => {
            setDemoUploadValue(uploadedResults);
          }}
        />

        {/* <InputFile
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
        /> */}

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
