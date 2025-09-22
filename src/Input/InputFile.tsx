import { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Color from '../Color/Color';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Typography from '../Typography/Typography';
import Card from '../Ui/Card';
import Center from '../Ui/Center';

import { pick } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from '../Icon';
import Input from './Input';

export interface ModalOption {
  title?: string;
  description?: string;
}
export interface ModalPickFileText {
  title?: string;
  description?: string;
  camera?: ModalOption;
  gallery?: ModalOption;
  document?: ModalOption;
}

export interface ChangeLabelProps {
  label?: string;
  placeholder?: string;
}

type InputFileProps = {
  title?: string;
  description?: string;
  accept?: string[];
  multiple?: boolean;
  onChange?: (files: any) => void;
  value?: any[];
  modalPickFileText?: ModalPickFileText;
  useChangeLabel?: boolean;
  btnChooseFileText?: string;
  modalDeleteText?: ModalOption & {
    confirmBtn?: {
      confirm?: string;
      cancel?: string;
    };
  };
  changeLableProps?: ChangeLabelProps;
};

export default function InputFile({
  title = 'Upload File',
  description = 'File harus berformat JPG, PNG dan PDF',
  accept = ['application/pdf', 'image/jpeg', 'image/png'],
  btnChooseFileText = 'Choose File',
  multiple = false,
  value,
  modalPickFileText,
  modalDeleteText,
  useChangeLabel = false,
  changeLableProps,
  onChange,
}: InputFileProps) {
  const [isOpenBottomSheetTypeFile, setIsOpenBottomSheetTypeFile] =
    useState(false);
  const [isOpenBottomSheetDeleteFile, setIsOpenBottomSheetDeleteFile] =
    useState(false);
  const [files, setFiles] = useState<any[]>(value || []);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );

  const handleOnPresChoseFile = () => {
    setIsOpenBottomSheetTypeFile(true);
  };

  const handlePickFile = async () => {
    try {
      if (selectedFileIndex !== null) {
        console.log(selectedFileIndex);
        confirmReplaceFile(selectedFileIndex);
        return;
      }

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
      viewDocument({ uri: file.uri, mimeType: file.type }).catch((error) =>
        console.error('Error opening document:', error)
      );
    }
  };

  const handleOnPressButtonCamera = async () => {
    try {
      if (selectedFileIndex !== null) {
        confirmReplaceFile(selectedFileIndex, 'camera');
        return;
      }

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
      if (selectedFileIndex !== null) {
        confirmReplaceFile(selectedFileIndex, 'gallery');
        return;
      }

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

  const handleReplaceFile = (index: number) => {
    setIsOpenBottomSheetTypeFile(true);
    setSelectedFileIndex(index);
  };

  const confirmReplaceFile = async (
    index: number,
    type?: 'gallery' | 'camera'
  ) => {
    let replacedFile: any | null = null;

    if (type === 'gallery') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: multiple ? 0 : 1,
      });
      if (!result.assets || result.assets.length === 0) return;
      replacedFile = { ...result.assets[0], labelFile: files[index].labelFile };
    } else if (type === 'camera') {
      const result = await launchCamera({ mediaType: 'photo' });
      if (!result.assets || result.assets.length === 0) return;
      replacedFile = { ...result.assets[0], labelFile: files[index].labelFile };
    } else {
      const result = await pick({ type: accept, multiple });
      if (!result || result.length === 0) return;
      replacedFile = { ...result[0], labelFile: files[index].labelFile };
    }

    const updatedFiles = files.map((f, i) => (i === index ? replacedFile : f));

    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    setSelectedFileIndex(null);
    setIsOpenBottomSheetTypeFile(false);
  };

  useEffect(() => {
    setFiles(value ?? []);
  }, [value]);

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
            title={btnChooseFileText}
            size="small"
            onPress={handleOnPresChoseFile}
          />
        </Center>
      </Card>

      {files.map((file, index) => (
        <View style={styles.previewWrapper} key={index}>
          {useChangeLabel && (
            <Input
              label={`${changeLableProps?.label} ${index + 1}`}
              placeholder={changeLableProps?.placeholder}
              value={file.labelFile}
              onChangeText={(text) => {
                const updatedFiles = files.map((f, i) =>
                  i === index ? { ...f, labelFile: text } : f
                );
                setFiles(updatedFiles);
                onChange?.(updatedFiles);
              }}
            />
          )}
          <View style={styles.gap4}>
            <Card>
              <TouchableOpacity onPress={() => handlePreviewFile(file)}>
                <View style={styles.containerPreview}>
                  <View style={[styles.containerListItem, styles.flex1]}>
                    {file.type.startsWith('image') ? (
                      <Image
                        source={
                          file.uri?.endsWith('.pdf')
                            ? require('../Input/assets/input-file.png')
                            : { uri: file.uri }
                        }
                        style={styles.previewImage}
                      />
                    ) : (
                      <View style={styles.previewImage}>
                        <Icon name="Document" color={Color.primary[1000]} />
                      </View>
                    )}
                    <View style={styles.fileDetails}>
                      <Typography
                        variant="t1"
                        weight="semibold"
                        color={Color.gray[600]}
                        numberOfLines={1}
                      >
                        {file.name || `Image_${index + 1}`}
                      </Typography>
                      <Typography
                        variant="t2"
                        weight="regular"
                        color={Color.gray[600]}
                      >
                        {(
                          (file?.size ?? file?.fileSize ?? 0) /
                          (1024 * 1024)
                        ).toFixed(2)}
                        MB
                      </Typography>
                    </View>
                  </View>
                  <View style={styles.action}>
                    {file.error && (
                      <Icon
                        name="exclamation-triangle"
                        color={Color.danger[500]}
                        size={20}
                      />
                    )}
                    <TouchableOpacity onPress={() => handleReplaceFile(index)}>
                      <Icon
                        name="rotate-right"
                        size={18}
                        color={Color.gray[700]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmDeleteFile(index)}>
                      <Icon name="Times" size={12} color={Color.gray[700]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>

            {file.hint && (
              <Typography
                variant="t3"
                color={!file.error ? Color.gray[700] : Color.danger[500]}
              >
                {file.hint}
              </Typography>
            )}
          </View>
        </View>
      ))}

      <BottomSheet
        isOpen={isOpenBottomSheetTypeFile}
        onClose={() => setIsOpenBottomSheetTypeFile(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Center style={styles.bottomSheetCenter}>
            <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
              {modalPickFileText?.title || 'Upload Dokumen'}
            </Typography>
            <Typography variant="t1" weight="regular" color={Color.gray[600]}>
              {modalPickFileText?.description || 'Unggah dokumen maksimal'}
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
                      {modalPickFileText?.camera?.title || 'Ambil Foto'}
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      {modalPickFileText?.camera?.description ||
                        'Langsung ambil gambar dari kamera'}
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
                      {modalPickFileText?.gallery?.title || 'Pilih dari Galeri'}
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      {modalPickFileText?.gallery?.description ||
                        'Cari gambar dari galeri perangkatmu'}
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
                      {modalPickFileText?.document?.title || 'Pilih Dokumen'}
                    </Typography>
                    <Typography variant="t2" color={Color.gray[600]}>
                      {modalPickFileText?.document?.description ||
                        'Pilih dokumen dari perangkatmu'}
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
            <Typography
              variant="p2"
              weight="semibold"
              color={Color.gray[800]}
              center
            >
              {modalDeleteText?.title || 'Hapus Dokumen'}
            </Typography>
            <Typography
              variant="t1"
              weight="regular"
              color={Color.gray[500]}
              center
            >
              {modalDeleteText?.description ||
                'Apakah kamu akan menghapus dokumen yang dipilih?'}
            </Typography>
          </Center>
          <View>
            <Button
              color="danger"
              title={modalDeleteText?.confirmBtn?.confirm || 'Hapus'}
              onPress={deleteFile}
            />
            <Button
              color="primary"
              variant="tertiary"
              title={modalDeleteText?.confirmBtn?.cancel || 'Batal'}
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
    backgroundColor: Color.gray[50],
    borderRadius: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileDetails: {
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  containerListItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
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
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },
  previewWrapper: {
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  gap4: {
    gap: 4,
  },
});
