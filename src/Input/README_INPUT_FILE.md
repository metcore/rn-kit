# 📂 InputFile Component

Komponen `InputFile` digunakan untuk mengunggah, menampilkan, mengganti, dan menghapus dokumen atau gambar di aplikasi React Native. Mendukung **camera**, **gallery**, dan **document picker** dengan fitur upload otomatis ke server, validasi ukuran file, loading state, dan konfirmasi aksi.

---

## ✨ Fitur

- Upload file dari **kamera**, **galeri**, atau **dokumen perangkat**.
- **Auto-upload ke server** setiap kali file dipilih via `uploadConfig`.
- **Validasi ukuran file** per file sebelum diproses.
- **Loading state** (`uploading: true`) selama proses upload berlangsung.
- **Error state** otomatis jika upload gagal (HTTP error / network error).
- Preview file (gambar atau dokumen).
- Mendukung **multiple file upload**.
- Ganti file (replace) atau hapus file dengan konfirmasi.
- Tambahkan label/nama dokumen secara manual (hanya untuk variant `default`).
- **2 Variant tampilan**: `default` (full) dan `small` (compact).
- Konfigurasi teks modal (custom title, description, button).
- Callback `onChange` untuk mengirim data file terbaru ke parent.

---

## 📦 Dependencies

| Library                                                                                               | Kegunaan                        |
| ----------------------------------------------------------------------------------------------------- | ------------------------------- |
| [`@react-native-documents/picker`](https://github.com/react-native-documents/picker)                  | Pick file dari storage          |
| [`@react-native-documents/viewer`](https://github.com/react-native-documents/viewer)                  | Preview dokumen                 |
| [`react-native-image-picker`](https://github.com/react-native-image-picker/react-native-image-picker) | Akses kamera & galeri           |
| [`react-native-blob-util`](https://github.com/RonRadtke/react-native-blob-util)                       | Upload file multipart ke server |

---

## 🚀 Penggunaan

### Variant Default (tanpa upload otomatis)

```tsx
import InputFile from '@/components/Input/InputFile';
import { useState } from 'react';

export default function ExampleScreen() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <InputFile
      title="Upload Dokumen"
      description="Format file: JPG, PNG, PDF"
      hint="Maksimal ukuran file 5MB"
      hasError={false}
      btnChooseFileText="Pilih File"
      multiple={true}
      value={files}
      useChangeLabel={true}
      changeLableProps={{
        label: 'Nama Dokumen',
        placeholder: 'Masukkan nama dokumen',
      }}
      onChange={(newFiles) => setFiles(newFiles)}
    />
  );
}
```

### Variant Default (dengan auto-upload ke server)

```tsx
import InputFile from '@/components/Input/InputFile';
import { useState } from 'react';

export default function ExampleScreen() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <InputFile
      title="Upload KTP"
      description="Format file: JPG, PNG, PDF. Maksimal 5MB."
      multiple={false}
      value={files}
      uploadConfig={{
        url: 'https://api.example.com/upload',
        method: 'POST',
        fieldName: 'file',
        headers: { Authorization: 'Bearer your-token' },
        maxSize: 5 * 1024 * 1024, // 5MB
        maxSizeErrorMessage: 'File tidak boleh lebih dari 5MB',
        errorMessage: 'Gagal mengupload file, coba lagi',
        onUploadSuccess: (results) => {
          console.log('Upload berhasil:', results);
        },
        onError: (file, errorMsg) => {
          console.warn('Upload gagal:', file, errorMsg);
        },
      }}
      onChange={(updatedFiles) => {
        // updatedFiles berisi FileItem[] dengan uploadedData dari server
        setFiles(updatedFiles);
      }}
    />
  );
}
```

### Variant Small (Compact)

```tsx
import InputFile from '@/components/Input/InputFile';
import { useState } from 'react';

export default function ExampleScreen() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <InputFile
      variant="small"
      title="Upload KTP"
      btnChooseFileText="Pilih"
      multiple={false}
      value={files}
      hasError={false}
      onChange={(newFiles) => setFiles(newFiles)}
      // ❌ description, hint, useChangeLabel, changeLableProps tidak tersedia di variant small
    />
  );
}
```

---

## ⚙️ Props

### Base Props (Tersedia di Semua Variant)

| Prop                | Tipe                              | Default                                          | Deskripsi                                                                                                                          |
| ------------------- | --------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | `string`                          | `"Upload File"`                                  | Judul input file.                                                                                                                  |
| `accept`            | `string[]`                        | `["application/pdf", "image/jpeg", "image/png"]` | Tipe MIME file yang diizinkan.                                                                                                     |
| `multiple`          | `boolean`                         | `false`                                          | Jika `true`, memungkinkan memilih banyak file sekaligus.                                                                           |
| `value`             | `any[]`                           | `[]`                                             | Daftar file yang sudah dipilih (state dari parent).                                                                                |
| `onChange`          | `(files: any[]) => void`          | `undefined`                                      | Callback saat daftar file berubah (add, replace, delete). Menerima `FileItem[]` (dengan `uploadedData` jika `uploadConfig` diset). |
| `btnChooseFileText` | `string`                          | `"Choose File"`                                  | Label tombol untuk memilih file.                                                                                                   |
| `uploadConfig`      | `UploadConfig`                    | `undefined`                                      | Konfigurasi upload otomatis ke server. Jika tidak diset, file hanya disimpan di local state.                                       |
| `modalPickFileText` | `ModalPickFileText`               | `undefined`                                      | Teks kustom pada modal pemilihan sumber file.                                                                                      |
| `modalDeleteText`   | `ModalOption & confirmBtn`        | `undefined`                                      | Teks kustom pada modal konfirmasi hapus file.                                                                                      |
| `hasError`          | `boolean`                         | `false`                                          | Menampilkan state error pada input.                                                                                                |
| `onUploading`       | `(isUploading?: boolean) => void` | `undefiend`                                      | Expose value uploading ke parent                                                                                                   |

### Default Variant Props (`variant?: 'default'`)

| Prop               | Tipe               | Default                                   | Deskripsi                                                    |
| ------------------ | ------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| `variant`          | `'default'`        | `'default'`                               | Variant default dengan fitur lengkap.                        |
| `description`      | `string`           | `"File harus berformat JPG, PNG dan PDF"` | Deskripsi singkat tentang file yang diterima.                |
| `hint`             | `string`           | `undefined`                               | Teks hint tambahan di bawah input.                           |
| `useChangeLabel`   | `boolean`          | `false`                                   | Jika `true`, menampilkan input untuk memberi nama pada file. |
| `changeLableProps` | `ChangeLabelProps` | `undefined`                               | Kustomisasi label dan placeholder input nama dokumen.        |

### Small Variant Props (`variant: 'small'`)

| Prop      | Tipe      | Default | Deskripsi                             |
| --------- | --------- | ------- | ------------------------------------- |
| `variant` | `'small'` | —       | Variant compact tanpa fitur tambahan. |

> ⚠️ Props `description`, `hint`, `useChangeLabel`, dan `changeLableProps` **tidak tersedia** di variant `small`. TypeScript akan error jika props ini digunakan bersama `variant: 'small'`.

---

## 🔧 UploadConfig

Konfigurasi untuk mengaktifkan auto-upload ke server setiap kali file dipilih.

```ts
interface UploadConfig {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH'; // default: 'POST'
  fieldName?: string; // default: 'file'
  headers?: Record<string, string>;
  maxSize?: number; // dalam bytes, misal 5MB = 5 * 1024 * 1024
  maxSizeErrorMessage?: string; // pesan error jika file melebihi maxSize
  errorMessage?: string; // pesan error jika upload gagal
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
  onError?: (file: FileItem, error: string) => void;
}
```

### Alur Upload

```
User pick file
  → validasi maxSize
    → gagal: tampilkan internalErrorMessage, stop
    → lolos: set uploading: true di UI
      → upload ke server
        → sukses: set uploadedData, uploading: false
        → gagal (HTTP error / network): set error: true, hint: errorMessage, uploading: false
          → onChange dipanggil dengan FileItem[] terbaru
```

### Data yang diterima `onChange` saat uploadConfig aktif

`onChange` menerima `FileItem[]` dimana setiap item berisi data asli file **plus** `uploadedData` dari server:

```ts
// contoh item di dalam array onChange
{
  // data asli dari picker/camera/gallery
  uri: "file:///...",
  fileName: "foto.jpg",
  fileSize: 105629,
  width: 562,
  height: 1000,
  type: "image/jpg",

  // ditambahkan oleh komponen
  uploading: false,
  error: false,
  uploadedData: {
    message: "File berhasil diunggah",
    data: {
      url: "https://cdn.example.com/uploads/foto.jpg",
      path: "uploads/foto.jpg",
      name: "foto.jpg",
      extension: "jpg",
      size: 105629,
      mime_type: "image/jpeg"
    }
  }
}
```

---

## 📐 Type Definitions

```ts
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
  maxSize?: number;
  maxSizeErrorMessage?: string;
  errorMessage?: string;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
  onError?: (file: FileItem, error: string) => void;
}

export type FileItemExtras = {
  labelFile?: string;
  hint?: string;
  error?: boolean;
  uploading?: boolean;
  uploadedData?: unknown;
};

export type FileItem = (PickedFile | ImageAsset) & FileItemExtras;

type BaseInputFileProps = {
  title?: string;
  accept?: string[];
  multiple?: boolean;
  onChange?: (files: any) => void;
  value?: any[];
  uploadConfig?: UploadConfig;
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

type InputFileProps = DefaultVariantProps | SmallVariantProps;
```

---

## 🛠 Catatan

1. Pastikan permission kamera & storage sudah diatur di `Info.plist` (iOS) dan `AndroidManifest.xml` (Android).
2. `uploadConfig.maxSize` divalidasi **sebelum** file diupload. File yang melebihi batas tidak akan diproses sama sekali.
3. Upload menggunakan `multipart/form-data`. Pastikan server menerima format ini.
4. HTTP error (4xx, 5xx) akan di-treat sebagai upload gagal — `uploadedData` akan bernilai `null` dan `error: true` di-set pada file tersebut.
5. Saat `uploading: true`, komponen menampilkan loading indicator di preview file. Pastikan `ItemPreview` menangani prop ini.
6. `useEffect` yang sync `value` ke internal state tidak akan berjalan selama ada file yang sedang uploading, untuk mencegah state reset di tengah proses upload.
7. Untuk **multiple upload**, semua file diupload secara paralel via `Promise.all`.
8. **Variant `small`** cocok untuk form compact tanpa deskripsi dan hint tambahan.
9. **Variant `default`** cocok untuk form yang membutuhkan instruksi detail dan fitur labeling dokumen.
