import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';

import { pick } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { spacing } from '../styles/spacing';
import Input from './Input';
import CardTrigger from './partials/InputFile/CardTrigger';
import ItemPreview from './partials/InputFile/ItemPreview';
import ModalDelete from './partials/InputFile/ModalDelete';
import ModalPicker from './partials/InputFile/ModalPicker';
import CardTriggerSmall from './partials/InputFile/CardTriggerSmall';
import ReactNativeBlobUtil from 'react-native-blob-util';

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

type BaseInputFileProps = {
  title?: string;
  accept?: string[];
  multiple?: boolean;
  onChange?: (files: any) => void;
  value?: any[];
  modalPickFileText?: ModalPickFileText;
  btnChooseFileText?: string;
  modalDeleteText?: ModalOption & {
    confirmBtn?: {
      confirm?: string;
      cancel?: string;
    };
  };
  hasError?: boolean;
};

type DefaultVariantProps = BaseInputFileProps & {
  variant?: 'default';
  description?: string;
  useChangeLabel?: boolean;
  changeLableProps?: ChangeLabelProps;
  hint?: string;
};

type SmallVariantProps = BaseInputFileProps & {
  variant: 'small';
  description?: never;
  useChangeLabel?: never;
  changeLableProps?: never;
  hint?: never;
};

// Union type
type InputFileProps = DefaultVariantProps | SmallVariantProps;

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
  variant = 'default',
  hint,
  hasError,
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

  const handlePreviewFile = async (file: any) => {
    try {
      let fileUri = file.uri;
      let fileType = file.type;

      if (file.uri.startsWith('http')) {
        const { dirs } = ReactNativeBlobUtil.fs;
        const dir = dirs.DocumentDir;
        const ext = file.name.split('.').pop() || 'tmp';
        const localPath = `${dir}/${Date.now()}.${ext}`;

        const res = await ReactNativeBlobUtil.config({ path: localPath }).fetch(
          'GET',
          file.uri
        );

        fileUri = 'file://' + res.path();
        fileType = res.respInfo.headers['content-type'];
      }

      await viewDocument({
        uri: fileUri,
        mimeType: fileType,
      });
    } catch (err) {
      console.error('Error opening document:', err);
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
    <View style={spacing.gap[12]}>
      {variant === 'default' && (
        <CardTrigger
          title={title}
          hint={hint}
          hasError={hasError}
          description={description}
          btnSelect={btnChooseFileText}
          onPress={handleOnPresChoseFile}
        />
      )}

      {variant === 'small' && (
        <View style={spacing.gap[4]}>
          <CardTriggerSmall
            files={files}
            title={title}
            hasError={hasError}
            textButton={btnChooseFileText}
            onChooseFile={handleOnPresChoseFile}
            onPreview={handlePreviewFile}
            onReplace={handleReplaceFile}
            onDelete={confirmDeleteFile}
          />
          {files.length > 0 && (
            <>
              {files
                .filter((file) => !!file.error)
                .map((file, index) => (
                  <Typography
                    key={index}
                    variant="t3"
                    color={Color.danger[500]}
                  >
                    {file.hint}
                  </Typography>
                ))}
            </>
          )}
        </View>
      )}

      {variant === 'default' &&
        files.map((file, index) => (
          <View style={spacing.gap[12]} key={index}>
            {useChangeLabel && (
              <Input
                label={`${changeLableProps?.label || 'Nama Dokumen'} ${index + 1}`}
                value={file.labelFile}
                placeholder={
                  changeLableProps?.placeholder || 'Masukan Nama Dokumen'
                }
                onChangeText={(text) => {
                  const updatedFiles = files.map((f, i) =>
                    i === index ? { ...f, labelFile: text } : f
                  );
                  setFiles(updatedFiles);
                  onChange?.(updatedFiles);
                }}
              />
            )}

            <View style={spacing.gap[4]}>
              <ItemPreview
                index={index}
                file={file}
                onPress={() => handlePreviewFile(file)}
                onReplace={() => handleReplaceFile(index)}
                onDelete={() => confirmDeleteFile(index)}
              />

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

      <ModalPicker
        isOpen={isOpenBottomSheetTypeFile}
        onClose={() => setIsOpenBottomSheetTypeFile(false)}
        title={modalPickFileText?.title || 'Upload Dokumen'}
        description={
          modalPickFileText?.description || 'Unggah dokumen maksimal'
        }
        camera={{
          icon: 'Camera',
          title: modalPickFileText?.camera?.title || 'Ambil Foto',
          onPress: handleOnPressButtonCamera,
          description:
            modalPickFileText?.camera?.description ||
            'Langsung ambil gambar dari kamera',
        }}
        gallery={{
          icon: 'Image',
          title: modalPickFileText?.gallery?.title || 'Pilih Dari Galeri',
          onPress: handleOnPressButtonGallery,
          description:
            modalPickFileText?.gallery?.description ||
            'Cari gambar dari galeri perangkatmu',
        }}
        document={{
          icon: 'Document',
          title: modalPickFileText?.document?.title || 'Pilih Dokumen',
          onPress: handlePickFile,
          description:
            modalPickFileText?.document?.description ||
            'Pilih dokumen dari perangkatmu',
        }}
      />

      <ModalDelete
        isOpen={isOpenBottomSheetDeleteFile}
        onClose={() => setIsOpenBottomSheetDeleteFile(false)}
        title={modalDeleteText?.title || 'Hapus Dokumen'}
        descripition={
          modalDeleteText?.description ||
          'Apakah kamu akan menghapus dokumen yang dipilih?'
        }
        confirm={modalDeleteText?.confirmBtn?.confirm || 'Hapus'}
        onConfirm={deleteFile}
        cancel={modalDeleteText?.confirmBtn?.cancel || 'Batal'}
        onCnacel={() => setIsOpenBottomSheetDeleteFile(false)}
      />
    </View>
  );
}
