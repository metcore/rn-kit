# 📂 InputFile Component

Komponen `InputFile` digunakan untuk mengunggah, menampilkan, mengganti, menghapus, serta memberi label pada dokumen atau gambar di aplikasi React Native.
Mendukung **camera**, **gallery**, dan **document picker** dengan tampilan preview dan konfirmasi aksi.

---

## ✨ Fitur

- Upload file dari **kamera**, **galeri**, atau **dokumen perangkat**.
- Preview file (gambar atau dokumen).
- Mendukung **multiple file upload**.
- Ganti file (replace) atau hapus file dengan konfirmasi.
- Tambahkan label/nama dokumen secara manual (hanya untuk variant `default`).
- **2 Variant tampilan**: `default` (full) dan `small` (compact).
- Konfigurasi teks modal (custom title, description, button).
- Callback `onChange` untuk mengirim data file terbaru ke parent.

---

## 📦 Dependencies

Komponen ini membutuhkan beberapa library:

- [`@react-native-documents/picker`](https://github.com/react-native-documents/picker)
- [`@react-native-documents/viewer`](https://github.com/react-native-documents/viewer)
- [`react-native-image-picker`](https://github.com/react-native-image-picker/react-native-image-picker)

---

## 🚀 Penggunaan

### Variant Default (Full Features)

```tsx
import InputFile from '@/components/Input/InputFile';
import { useState } from 'react';

export default function ExampleScreen() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <InputFile
      variant="default" // atau bisa dihilangkan (default)
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
      modalPickFileText={{
        title: 'Pilih Sumber',
        description: 'Unggah dokumen atau ambil foto',
        camera: { title: 'Kamera', description: 'Ambil foto langsung' },
        gallery: { title: 'Galeri', description: 'Pilih gambar dari galeri' },
        document: {
          title: 'Dokumen',
          description: 'Pilih file dari perangkat',
        },
      }}
      modalDeleteText={{
        title: 'Hapus File?',
        description: 'Apakah kamu yakin ingin menghapus file ini?',
        confirmBtn: {
          confirm: 'Ya, Hapus',
          cancel: 'Batal',
        },
      }}
      onChange={(newFiles) => setFiles(newFiles)}
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
      // ❌ description, hint, useChangeLabel, changeLableProps TIDAK BISA dipakai di variant small
    />
  );
}
```

---

## ⚙️ Props

### Base Props (Tersedia di Semua Variant)

| Prop                | Tipe                              | Default                                          | Deskripsi                                                 |
| ------------------- | --------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `title`             | `string`                          | `"Upload File"`                                  | Judul input file.                                         |
| `accept`            | `string[]`                        | `["application/pdf", "image/jpeg", "image/png"]` | Tipe MIME file yang diizinkan.                            |
| `multiple`          | `boolean`                         | `false`                                          | Jika `true`, memungkinkan memilih banyak file sekaligus.  |
| `value`             | `any[]`                           | `[]`                                             | Daftar file yang sudah dipilih (state dari parent).       |
| `onChange`          | `(files: any[]) => void`          | `undefined`                                      | Callback saat daftar file berubah (add, replace, delete). |
| `btnChooseFileText` | `string`                          | `"Choose File"`                                  | Label tombol untuk memilih file.                          |
| `modalPickFileText` | `ModalPickFileText` (lihat bawah) | `undefined`                                      | Teks kustom pada modal pemilihan sumber file.             |
| `modalDeleteText`   | `ModalOption & confirmBtn`        | `undefined`                                      | Teks kustom pada modal konfirmasi hapus file.             |
| `hasError`          | `boolean`                         | `false`                                          | Menampilkan state error pada input.                       |

### Variant-Specific Props

#### Default Variant (`variant?: 'default'`)

| Prop               | Tipe                             | Default                                   | Deskripsi                                                    |
| ------------------ | -------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `variant`          | `'default'`                      | `'default'`                               | Variant default dengan fitur lengkap.                        |
| `description`      | `string`                         | `"File harus berformat JPG, PNG dan PDF"` | Deskripsi singkat tentang file yang diterima.                |
| `hint`             | `string`                         | `undefined`                               | Teks hint tambahan di bawah input.                           |
| `useChangeLabel`   | `boolean`                        | `false`                                   | Jika `true`, menampilkan input untuk memberi nama pada file. |
| `changeLableProps` | `ChangeLabelProps` (lihat bawah) | `undefined`                               | Teks kustom pada input label di atas preview file.           |

#### Small Variant (`variant: 'small'`)

| Prop      | Tipe      | Default | Deskripsi                             |
| --------- | --------- | ------- | ------------------------------------- |
| `variant` | `'small'` | -       | Variant compact tanpa fitur tambahan. |

> ⚠️ **Catatan**: Props `description`, `hint`, `useChangeLabel`, dan `changeLableProps` **TIDAK TERSEDIA** di variant `small`. TypeScript akan menampilkan error jika props ini digunakan dengan `variant: 'small'`.

---

## 🔤 Tipe Tambahan

### `ModalOption`

```ts
interface ModalOption {
  title?: string;
  description?: string;
}
```

### `ModalPickFileText`

```ts
interface ModalPickFileText {
  title?: string;
  description?: string;
  camera?: ModalOption;
  gallery?: ModalOption;
  document?: ModalOption;
}
```

### `ModalDeleteText`

```ts
type ModalDeleteText = ModalOption & {
  confirmBtn?: {
    confirm?: string;
    cancel?: string;
  };
};
```

### `ChangeLabelProps`

```ts
interface ChangeLabelProps {
  label?: string;
  placeholder?: string;
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

type InputFileProps = DefaultVariantProps | SmallVariantProps;
```

---

### Variant Default

- **Card input awal** → tombol pilih file + icon ilustrasi + description + hint.
- **Preview file** → menampilkan nama, ukuran, icon (atau thumbnail jika image).
- **Input label** (jika `useChangeLabel: true`) → input text untuk memberi nama dokumen.
- **Aksi file**:
  - 🔄 Replace
  - ❌ Delete
  - 👁 Preview (buka dokumen dengan `viewDocument`)

### Variant Small

- **Compact card** → tombol pilih file dengan tampilan lebih ringkas.
- **Preview file** → tampilan minimal tanpa label/hint tambahan.
- **Aksi file**: sama seperti variant default (replace, delete, preview).

---

## 🛠 Catatan

1. Pastikan permission kamera & storage sudah diatur (Android/iOS).
2. File hasil picker akan memiliki property standar (`uri`, `type`, `name`, `size`).
3. Untuk **multiple upload**, `value` berupa array file yang akan dikelola oleh parent.
4. **Variant `small`** cocok untuk form yang membutuhkan tampilan compact tanpa deskripsi dan hint.
5. **Variant `default`** cocok untuk form yang membutuhkan instruksi detail dan fitur labeling dokumen.
6. TypeScript akan memberikan error compile-time jika props yang tidak sesuai variant digunakan.
