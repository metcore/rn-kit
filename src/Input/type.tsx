import type { GestureResponderEvent, TextInputProps } from 'react-native';
import type { IconNameProps } from '../Icon';
import type { types } from '@react-native-documents/picker';

export interface InputProps extends TextInputProps {
  icon?: IconNameProps;
  iconRight?: IconNameProps;
  label?: string | undefined;
  clearButton?: boolean;
  hasError?: boolean;
  hint?: string;
  onPressIconLeft?: (val?: GestureResponderEvent) => void;
  onPressIconRight?: (val?: GestureResponderEvent) => void;
  onChangeText?: (val: string) => void;
  secureTextEntry?: boolean;
  iconRightColor?: string;
  prefix?: React.ReactNode;
  required?: boolean;
}

export interface TextAreaProps extends InputProps {
  height?: number;
}

// input file
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

export interface PickedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export interface ImageAsset {
  uri?: string;
  fileName?: string;
  type?: string;
  fileSize?: number;
  width?: number;
  height?: number;
}

export interface UploadedFile<UploadedData> {
  id: string;
  originalName: string;
  customName?: string;
  uploadedData: UploadedData | null;
}

export interface UploadConfig {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  fieldName?: string;
  headers?: Record<string, string>;
  extractUrl?: (response: unknown) => string; // default: (res) => res.url
  onError?: (fileItem: FileItem, error: string) => void;
  errorMessage?: string;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
  onUploading?: (isUploading?: boolean) => void;
}

export type FileItemExtras = {
  labelFile?: string;
  hint?: string;
  error?: boolean;
  name?: string;
  size?: number;
  fileSize?: number;
  uploading?: boolean;
};

export type FileItem = (PickedFile | ImageAsset) & FileItemExtras;

export type DocumentType = (typeof types)[keyof typeof types];

export interface BaseInputFileProps {
  title?: string;
  accept?: string[] | DocumentType[];
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
  uploadConfig?: UploadConfig;
  maxSize?: number;
  maxSizeErrorMessage?: string;
}

export type DefaultVariantProps = BaseInputFileProps & {
  variant?: 'default';
  description?: string;
  useChangeLabel?: boolean;
  changeLableProps?: ChangeLabelProps;
  hint?: string;
};

export type SmallVariantProps = BaseInputFileProps & {
  variant: 'small';
  description?: never;
  useChangeLabel?: never;
  changeLableProps?: never;
  hint?: never;
};

export type InputFileProps = DefaultVariantProps | SmallVariantProps;
