import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Card from '../Ui/Card';
import Center from '../Ui/Center';
import Typography from '../Typography/Typography';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useState } from 'react';
import List from '../List/List';
import ListItem from '../List/ListItem';

import { pick } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from '../Icon';

type InputFileProps = {
  title?: string;
  description?: string;
  maxFileSize?: number;
  accept?: string[];
  multiple?: boolean;
  onChange?: (files: any[]) => void;
};

export default function InputFile({
  title = 'Upload File',
  description = 'File harus berformat JPG, PNG dan PDF',
  maxFileSize = 5,
  accept = ['application/pdf', 'image/jpeg', 'image/png'],
  multiple = false,
  onChange,
}: InputFileProps) {
  const [isOpenBottomSheetTypeFile, setIsOpenBottomSheetTypeFile] =
    useState(false);
  const [isOpenBottomSheetDeleteFile, setIsOpenBottomSheetDeleteFile] =
    useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );

  const handleOnPresChoseFile = () => {
    setIsOpenBottomSheetTypeFile(true);
  };

  const handlePickFile = async () => {
    try {
      const result = await pick({ type: accept, multiple });
      const pickedFiles = multiple ? result : [result[0]];
      const newFiles = [...files, ...pickedFiles];
      setFiles(newFiles);
      onChange?.(newFiles);
      setIsOpenBottomSheetTypeFile(false);
    } catch (error: any) {
      if (error?.message?.toLowerCase().includes('user canceled')) return;
      console.error('Failed to pick document:', error);
    }
  };

  const handlePreviewFile = (file: any) => {
    if (file?.uri) {
      viewDocument(file.uri);
    }
  };

  const handleOnPressButtonCamera = async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo' });
      if (result.didCancel || !result.assets) return;
      const newFiles = [...files, result.assets[0]];
      setFiles(newFiles);
      onChange?.(newFiles);
      setIsOpenBottomSheetTypeFile(false);
    } catch (error: any) {
      console.error('Failed to open camera:', error);
    }
  };

  const handleOnPressButtonGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: multiple ? 0 : 1,
      });
      if (result.didCancel || !result.assets) return;
      const newFiles = [...files, ...result.assets];
      setFiles(newFiles);
      onChange?.(newFiles);
      setIsOpenBottomSheetTypeFile(false);
    } catch (error: any) {
      console.error('Failed to open gallery:', error);
    }
  };

  const confirmDeleteFile = (index: number) => {
    setSelectedFileIndex(index);
    setIsOpenBottomSheetDeleteFile(true);
  };

  const deleteFile = () => {
    if (selectedFileIndex !== null) {
      const newFiles = files.filter((_, i) => i !== selectedFileIndex);
      setFiles(newFiles);
      onChange?.(newFiles);
      setSelectedFileIndex(null);
    }
    setIsOpenBottomSheetDeleteFile(false);
  };

  return (
    <View style={styles.wrapper}>
      <Card style={styles.containerInput}>
        <Center style={styles.centerInput}>
          <Image source={require('./assets/input-file.png')} />
          <Typography variant="t1" weight="semibold" color={Color.gray[500]}>
            {title}
          </Typography>
          <Typography variant="t3" weight="regular" color={Color.gray[500]}>
            {description}
          </Typography>
          <Button
            color="primary"
            title="Choose File"
            onPress={handleOnPresChoseFile}
          />
        </Center>
      </Card>

      {files.map((file, index) => (
        <Card key={index}>
          <TouchableOpacity onPress={() => handlePreviewFile(file)}>
            <View style={styles.containerPreview}>
              <View style={styles.containerListItem}>
                <Image
                  source={
                    file.uri?.endsWith('.pdf')
                      ? require('../Input/assets/input-file.png')
                      : { uri: file.uri }
                  }
                  style={styles.previewImage}
                />
                <View style={styles.fileDetails}>
                  <Typography
                    variant="t1"
                    weight="semibold"
                    color={Color.gray[600]}
                  >
                    {file.name || `Image_${index + 1}`}
                  </Typography>
                  <Typography
                    variant="t2"
                    weight="regular"
                    color={Color.gray[600]}
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </View>
              </View>
              <Button
                variant="tertiary"
                title="X"
                onPress={() => confirmDeleteFile(index)}
              />
            </View>
          </TouchableOpacity>
        </Card>
      ))}

      <BottomSheet
        isOpen={isOpenBottomSheetTypeFile}
        onClose={() => setIsOpenBottomSheetTypeFile(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Center style={styles.bottomSheetCenter}>
            <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
              Upload Dokumen
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[800]}>
              Unggah dokumen maksimal {maxFileSize}MB
            </Typography>
          </Center>
          <List>
            <ListItem>
              <TouchableOpacity onPress={handleOnPressButtonCamera}>
                <View style={styles.containerListItem}>
                  <Icon name="Camera" color={Color.primary[1000]} />
                  <View>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[800]}
                    >
                      Ambil Foto
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      Langsung ambil gambar dari kamera
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity onPress={handleOnPressButtonGallery}>
                <View style={styles.containerListItem}>
                  <Icon name="Image" color={Color.primary[1000]} />
                  <View>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[800]}
                    >
                      Pilih dari Galeri
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      Cari gambar dari galeri perangkatmu
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity onPress={handlePickFile}>
                <View style={styles.containerListItem}>
                  <Icon name="Document" color={Color.primary[1000]} />
                  <View>
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={Color.gray[800]}
                    >
                      Pilih dari Dokumen
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      Cari file dari penyimpanan dokumen
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>
            </ListItem>
          </List>
        </View>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenBottomSheetDeleteFile}
        onClose={() => setIsOpenBottomSheetDeleteFile(false)}
      >
        <View style={styles.deleteFileContent}>
          <Center style={styles.deleteFileCenter}>
            <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
              Hapus Dokumen
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[500]}>
              Apakah kamu akan menghapus dokumen yang dipilih?
            </Typography>
          </Center>
          <View>
            <Button
              color="danger"
              title="Ya, Hapus File"
              onPress={deleteFile}
            />
            <Button
              color="primary"
              variant="tertiary"
              title="Batal"
              onPress={() => setIsOpenBottomSheetDeleteFile(false)}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  containerInput: {
    borderStyle: 'dashed',
    backgroundColor: Color.gray[100],
  },
  centerInput: {
    gap: 14,
  },
  containerPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  previewImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  fileDetails: {
    justifyContent: 'center',
    gap: 8,
  },
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bottomSheetContent: {
    gap: 16,
  },
  bottomSheetCenter: {
    alignItems: 'center',
  },
  deleteFileContent: {
    gap: 10,
  },
  deleteFileCenter: {
    alignItems: 'center',
    gap: 4,
  },
});
