// utils/uploadFile.ts
import ReactNativeBlobUtil from 'react-native-blob-util';
import type { FileItem, UploadedFile, UploadConfig } from '../type';

export async function uploadFile<T = unknown>(
  file: FileItem,
  config: UploadConfig
): Promise<UploadedFile<T>> {
  const {
    url,
    method = 'POST',
    fieldName = 'file',
    headers = {},
    errorMessage = 'Upload failed',
    onError,
  } = config;

  const uri = 'uri' in file ? file.uri : file.uri;
  const name = 'name' in file ? file.name : (file.fileName ?? 'file');

  const type =
    'type' in file
      ? (file.type ?? 'application/octet-stream')
      : (file.type ?? 'image/jpeg');

  if (!uri) throw new Error('File URI is missing');

  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    const response = await ReactNativeBlobUtil.fetch(
      method,
      url,
      { 'Content-Type': 'multipart/form-data', ...headers },
      [
        {
          name: fieldName,
          filename: name,
          type,
          data: ReactNativeBlobUtil.wrap(uri.replace('file://', '')),
        },
      ]
    );

    const statusCode = response.respInfo.status;
    if (statusCode < 200 || statusCode >= 300) {
      const errorBody = response.json();
      const message = errorBody?.message ?? errorMessage;
      onError?.(file, message);
      return {
        id,
        originalName: name ?? '',
        customName: file.labelFile,
        uploadedData: null,
      };
    }

    const json = response.json();
    const uploadedData = json as T;

    return {
      id,
      originalName: String(name ?? 'Attachment'),
      customName: file.labelFile,
      uploadedData,
    };
  } catch (err: any) {
    const message = err?.message ?? errorMessage;
    onError?.(file, message);
    return {
      id,
      originalName: String(name ?? 'Attachment'),
      customName: file.labelFile,
      uploadedData: null,
    };
  }
}
