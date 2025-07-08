# ✅ Komponen CheckBoxList

`CheckBoxList` adalah komponen React Native untuk menampilkan daftar checkbox berdasarkan array item yang dapat dipilih lebih dari satu.

---

## 🚀 Contoh Penggunaan

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import CheckBoxList from './CheckBoxList';

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <View>
      <CheckBoxList
        items={[
          { label: 'Item A', value: 'a' },
          { label: 'Item B', value: 'b' },
          { label: 'Item C', value: 'c' },
        ]}
        selectedValues={selected}
        onChange={setSelected}
        direction="vertical"
      />
    </View>
  );
}
```

## ⚙️ Props

| Prop             | Tipe                           | Deskripsi                                                                    |                                                 |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `items`          | `CheckBoxListItem[]`           | Daftar item yang akan ditampilkan. Setiap item memiliki `label` dan `value`. |                                                 |
| `selectedValues` | `string[]`                     | Nilai-nilai yang saat ini sedang dipilih.                                    |                                                 |
| `onChange`       | `(selected: string[]) => void` | Callback saat nilai pilihan berubah.                                         |                                                 |
| `direction`      | \`'vertical'                   | 'horizontal'\` (opsional)                                                    | Arah tampilan checkbox (default: `'vertical'`). |

