# 📂 InputFile Component

Komponen `InputFile` digunakan untuk mengunggah, menampilkan, mengganti, menghapus, serta memberi label pada dokumen atau gambar di aplikasi React Native.
Mendukung **camera**, **gallery**, dan **document picker** dengan tampilan preview dan konfirmasi aksi.

---

## ✨ Fitur

- Upload file dari **kamera**, **galeri**, atau **dokumen perangkat**.
- Preview file (gambar atau dokumen).
- Mendukung **multiple file upload**.
- Ganti file (replace) atau hapus file dengan konfirmasi.
- Tambahkan label/nama dokumen secara manual.
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

```tsx
import InputFile from '@/components/Input/InputFile';
import { useState } from 'react';

export default function ExampleScreen() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <InputFile
      title="Upload Dokumen"
      description="Format file: JPG, PNG, PDF"
      btnChooseFileText="Pilih File"
      multiple={true}
      value={files}
      useChangeLabel={true}
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

---

## ⚙️ Props

| Prop                | Tipe                              | Default                                          | Deskripsi                                                          |
| ------------------- | --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `title`             | `string`                          | `"Upload File"`                                  | Judul input file.                                                  |
| `description`       | `string`                          | `"File harus berformat JPG, PNG dan PDF"`        | Deskripsi singkat tentang file yang diterima.                      |
| `accept`            | `string[]`                        | `["application/pdf", "image/jpeg", "image/png"]` | Tipe MIME file yang diizinkan.                                     |
| `multiple`          | `boolean`                         | `false`                                          | Jika `true`, memungkinkan memilih banyak file sekaligus.           |
| `value`             | `any[]`                           | `[]`                                             | Daftar file yang sudah dipilih (state dari parent).                |
| `onChange`          | `(files: any[]) => void`          | `undefined`                                      | Callback saat daftar file berubah (add, replace, delete).          |
| `btnChooseFileText` | `string`                          | `"Choose File"`                                  | Label tombol untuk memilih file.                                   |
| `modalPickFileText` | `ModalPickFileText` (lihat bawah) | `undefined`                                      | Teks kustom pada modal pemilihan sumber file.                      |
| `modalDeleteText`   | `ModalOption & confirmBtn`        | `undefined`                                      | Teks kustom pada modal konfirmasi hapus file.                      |
| `useChangeLabel`    | `boolean`                         | `false`                                          | Jika `true`, menampilkan input untuk memberi nama/label pada file. |
| `changeLableProps`  | `ChangeLabelProps` (lihat bawah)  | `undefined`                                      | Teks kustom pada input text diatas preview file untuk              |

---

## 🔤 Tipe Tambahan

### `ModalOption`

```ts
interface ModalOption {
  title?: string;
  description?: string;
}
```

### `modalPickFileText`

```ts
interface ModalPickFileText {
  title?: string;
  description?: string;
  camera?: ModalOption;
  gallery?: ModalOption;
  document?: ModalOption;
}
```

### `modalDeleteText`

```ts
interface ModalOption {
  title?: string;
  description?: string;
  confirmBtn?: {
    confirm?: string;
    cancel?: string;
  };
}
```

### `changeLabelProps`

```ts
interface ChangeLabelProps {
  label?: string;
  placeholder?: string;
}
```

---

## 📸 Preview UI

- **Card input awal** → tombol pilih file + icon ilustrasi.
- **Preview file** → menampilkan nama, ukuran, icon (atau thumbnail jika image).
- **Aksi file**:
  - 🔄 Replace
  - ❌ Delete
  - 👁 Preview (buka dokumen dengan `viewDocument`)

---

## 🛠 Catatan

1. Pastikan permission kamera & storage sudah diatur (Android/iOS).
2. File hasil picker akan memiliki property standar (`uri`, `type`, `name`, `size`).
3. Untuk **multiple upload**, `value` berupa array file yang akan dikelola oleh parent.
