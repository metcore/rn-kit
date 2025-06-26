# 📂 Accordion

Komponen **Accordion** digunakan untuk menyembunyikan atau menampilkan konten secara dinamis. Biasanya digunakan untuk struktur seperti FAQ atau daftar konten bertingkat.

<img src="../../assets/doc/Accordion/Accordion.gif" alt="Deskripsi Alt" width="200" />

## 📦 USAGE

```tsx
import React from 'react';
import { Text } from 'react-native';
import Accordion from '@herca/rn-kit/Accordion';
import AccordionItem from '@herca/rn-kit/Accordion/AccordionItem';

export default function FAQSection() {
  return (
    <Accordion
      header={() => <Text style={{ fontWeight: 'bold' }}>Apa itu produk ini?</Text>}
      isOpen={false}
      onCollapse={(isOpen) => console.log('Status:', isOpen)}
    >
      <AccordionItem>
        Produk ini adalah solusi digital untuk kebutuhan bisnis Anda.
      </AccordionItem>
      <AccordionItem>
        Dapat digunakan di berbagai platform termasuk Android dan iOS.
      </AccordionItem>
    </Accordion>
  );
}

```


## Props
### Accordion
| Props          | Tipe                        | Wajib | Default | Deskripsi                                                                       |
| -------------- | --------------------------- | ----- | ------- | ------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                 | ✅     | -       | Isi Accordion, harus terdiri dari satu atau beberapa `AccordionItem`.           |
| `renderHeader` | `ReactNode \| null`         | ❌     | `null`  | Komponen untuk menampilkan header. Biasanya berupa `Text` atau komponen kustom. |
| `isOpen`       | `boolean`                   | ❌     | `true`  | Menentukan apakah Accordion terbuka saat pertama kali dirender.                 |
| `onCollapse`   | `(isOpen: boolean) => void` | ❌     | -       | Callback saat status terbuka/tutup berubah.                                     |

### AccordionItem
| Props      | Tipe        | Wajib | Default | Deskripsi                                                       |
| ---------- | ----------- | ----- | ------- | --------------------------------------------------------------- |
| `children` | `ReactNode` | ✅     | -       | Konten yang akan ditampilkan saat Accordion dibuka.             |
| `index`    | `number`    | ❌     | -       | Untuk pengendalian item tertentu jika diperlukan secara manual. |


## Note

Komponen Accordion menggunakan state internal (useState) untuk mengatur apakah kontennya sedang terbuka atau tidak.

Fungsi header digunakan untuk merender tampilan judul Accordion dan dapat disesuaikan.

Konten yang disembunyikan/diperluas sebaiknya dibungkus dalam AccordionItem.