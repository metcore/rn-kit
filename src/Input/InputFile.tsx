import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';

import { pick, types } from '@react-native-documents/picker';
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
import type {
  FileItem,
  InputFileProps,
  UploadConfig,
  UploadedFile,
} from './type';
import { uploadFile } from './helpers/uploadFile';

export default function InputFile({
  title = 'Upload File',
  description = 'File harus berformat JPG, PNG dan PDF',
  accept = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    types.pdf,
    types.images,
  ],
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
  uploadConfig,
  maxSize = 5, //5MB
  maxSizeErrorMessage,
}: InputFileProps) {
  const [isOpenBottomSheetTypeFile, setIsOpenBottomSheetTypeFile] = useState(false); //prettier-ignore
  const [isOpenBottomSheetDeleteFile, setIsOpenBottomSheetDeleteFile] = useState(false); //prettier-ignore
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null); //prettier-ignore
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile<unknown>[]>([]); //prettier-ignore
  const [internalErrorMessage, setInternalErrorMessage] = useState<string | null>(null); //prettier-ignore
  const [files, setFiles] = useState<FileItem[]>(value || []);
  const filesRef = useRef<FileItem[]>(files);

  const calculatedMaxSize = maxSize * 1024 * 1024;

  const uploadAndTrack = async (newFiles: FileItem[], config: UploadConfig) => {
    setIsOpenBottomSheetTypeFile(false);

    const withLoading = newFiles.map((f) => ({ ...f, uploading: true }));
    setFiles((prev) => [...prev, ...withLoading]);

    const results = await Promise.all(
      newFiles.map((f) => uploadFile(f, config))
    );

    const currentFiles = filesRef.current;
    const updatedFiles = currentFiles.map((f) => {
      const match = results.find(
        (r) => r.originalName === ('name' in f ? f.name : f.fileName)
      );

      if (!match) return f;

      return {
        ...f,
        uploading: false,
        error: match.uploadedData === null,
        uploadedData: match.uploadedData,
        hint:
          match.uploadedData === null
            ? (config.errorMessage ?? 'Upload gagal')
            : f.hint,
      };
    });

    setFiles(updatedFiles);

    const newUploaded = [...uploadedFiles, ...results];
    setUploadedFiles(newUploaded);
    uploadConfig?.onUploadSuccess?.(newUploaded);
    onChange?.(updatedFiles);
  };

  // validate max size
  const validateMaxSize = (
    assets: { size?: number | null; fileSize?: number | null }[]
  ): boolean => {
    if (!maxSize) return true;

    const oversized = assets.filter((f) => {
      const size = f.size ?? f.fileSize ?? 0;
      return size > (calculatedMaxSize ?? Infinity);
    });

    if (oversized.length > 0) {
      setInternalErrorMessage(
        maxSizeErrorMessage ?? 'Ukuran file melebihi batas maksimal'
      );
      setIsOpenBottomSheetTypeFile(false);
      return false;
    }

    return true;
  };

  // preview file
  const handlePreviewFile = async (file: any) => {
    try {
      let fileUri = file.uri;
      let fileType = file.type;

      if (file.uri.startsWith('http')) {
        const { dirs } = ReactNativeBlobUtil.fs;
        const dir = dirs.CacheDir;
        const ext = file.name.split('.').pop() || 'tmp';
        const localPath = `${dir}/${Date.now()}.${ext}`;

        const res = await ReactNativeBlobUtil.config({
          path: localPath,
          fileCache: true,
        }).fetch('GET', file.uri);

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

  // pick file
  const handlePickFile = async () => {
    try {
      if (selectedFileIndex !== null) {
        confirmReplaceFile(selectedFileIndex);
        return;
      }

      const result = await pick({
        type: accept,
        allowMultiSelection: multiple,
      });

      const pickedFiles = multiple ? result : [result[0]];

      if (!validateMaxSize(pickedFiles)) return;
      setInternalErrorMessage(null);

      if (uploadConfig) {
        await uploadAndTrack(
          pickedFiles as unknown as FileItem[],
          uploadConfig
        );
      } else {
        const newFiles = [...files, ...(pickedFiles as unknown as FileItem[])];
        setFiles(newFiles);
        onChange?.(newFiles);
      }

      setIsOpenBottomSheetTypeFile(false);
    } catch (error: any) {
      if (error?.message?.toLowerCase().includes('user canceled')) return;
      console.error('Failed to pick document:', error);
    }
  };

  const handleOnPressButtonCamera = async () => {
    try {
      if (selectedFileIndex !== null) {
        await confirmReplaceFile(selectedFileIndex, 'camera');
        return;
      }

      const result = await launchCamera({ mediaType: 'photo' });
      if (result.didCancel || !result.assets) return;

      if (!validateMaxSize(result.assets)) return;
      setInternalErrorMessage(null);

      if (uploadConfig) {
        await uploadAndTrack(result.assets as FileItem[], uploadConfig);
      } else {
        const newFiles = [...files, result.assets[0] as FileItem];
        setFiles(newFiles);
        onChange?.(newFiles);
      }

      setIsOpenBottomSheetTypeFile(false);
    } catch (error: any) {
      console.error('Failed to open camera:', error);
    }
  };

  const handleOnPressButtonGallery = async () => {
    try {
      if (selectedFileIndex !== null) {
        await confirmReplaceFile(selectedFileIndex, 'gallery');
        return;
      }

      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: multiple ? 0 : 1,
      });
      if (result.didCancel || !result.assets) return;

      if (!validateMaxSize(result.assets)) return;
      setInternalErrorMessage(null);

      if (uploadConfig) {
        await uploadAndTrack(result.assets as FileItem[], uploadConfig);
      } else {
        const newFiles = [...files, ...(result.assets as FileItem[])];
        setFiles(newFiles);
        onChange?.(newFiles);
      }

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
      setUploadedFiles(newFiles as unknown as UploadedFile<unknown>[]);
      onChange?.(newFiles);
      setSelectedFileIndex(null);
    }
    setIsOpenBottomSheetDeleteFile(false);
  };

  // replace attachment
  const handleReplaceFile = (index: number) => {
    setIsOpenBottomSheetTypeFile(true);
    setSelectedFileIndex(index);
  };

  const confirmReplaceFile = async (
    index: number,
    type?: 'gallery' | 'camera'
  ) => {
    const labelFile = files?.[index]?.labelFile;

    // handler untuk pick
    const pickFile = async (): Promise<FileItem | null> => {
      if (type === 'gallery') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: multiple ? 0 : 1,
        });

        if (!result.assets?.length) return null;
        return { ...result.assets[0], labelFile };
      }

      if (type === 'camera') {
        const result = await launchCamera({ mediaType: 'photo' });

        if (!result.assets?.length) return null;
        return { ...result.assets[0], labelFile: files?.[index]?.labelFile };
      }

      const result = await pick({
        type: accept,
        allowMultiSelection: multiple,
      });

      if (!result?.length) return null;
      return { ...result[0], labelFile } as unknown as FileItem;
    };

    const replacedFile = await pickFile();
    if (!replacedFile) return;

    // handle validasi max size
    if (!validateMaxSize([replacedFile])) return;
    setInternalErrorMessage(null);

    // handle upload
    if (uploadConfig) {
      setIsOpenBottomSheetTypeFile(false);

      const withLoading = files.map((f, i) =>
        i === index ? { ...replacedFile, uploading: true } : f
      );

      setFiles(withLoading);

      const results = await Promise.all([
        uploadFile(replacedFile, uploadConfig),
      ]);

      const uploadResult = results[0];
      const updatedFiles = filesRef.current.map((f, i) =>
        i === index
          ? {
              ...replacedFile,
              uploading: false,
              uploadedData: uploadResult.uploadedData,
              error: uploadResult.uploadedData === null,
              hint:
                uploadResult.uploadedData === null
                  ? (uploadConfig.errorMessage ?? 'Upload gagal')
                  : replacedFile.hint,
            }
          : f
      );

      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    } else {
      const updatedFiles = files.map((f, i) =>
        i === index ? replacedFile : f
      );
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    }

    setSelectedFileIndex(null);
    setIsOpenBottomSheetTypeFile(false);
  };

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    setFiles(value ?? []);
  }, [value]);

  return (
    <View style={spacing.gap[12]}>
      {variant === 'default' && (
        <CardTrigger
          title={title}
          hint={hint || (internalErrorMessage as string)}
          hasError={hasError || !!internalErrorMessage}
          description={description}
          btnSelect={btnChooseFileText}
          onPress={() => setIsOpenBottomSheetTypeFile(true)}
        />
      )}

      {variant === 'small' && (
        <View style={spacing.gap[4]}>
          <CardTriggerSmall
            files={files}
            title={title}
            hasError={hasError}
            textButton={btnChooseFileText}
            onChooseFile={() => setIsOpenBottomSheetTypeFile(true)}
            onPreview={handlePreviewFile}
            onReplace={handleReplaceFile}
            onDelete={confirmDeleteFile}
          />
          {internalErrorMessage && (
            <Typography variant="t3" color={Color.danger[500]}>
              {internalErrorMessage}
            </Typography>
          )}

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
                loading={file.uploading}
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
