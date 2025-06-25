# 📋 List & ListItem
List menyajikan kumpulan elemen secara vertikal dengan tampilan kartu (border & radius), sedangkan ListItem mewakili baris individual yang dapat bersifat statis ataupun interaktif (dapat ditekan).


## 📦 Contoh Penggunaan
``` tsx
import React from 'react';
import { Text } from 'react-native';
import List from '@herca/rn-kit/List';
import ListItem from '@herca/rn-kit/List/ListItem';

export default function SettingMenu() {
  const handleProfile = () => console.log('Go to Profile');

  return (
    <List>
      <ListItem onPress={handleProfile}>
        <Text>Profil</Text>
      </ListItem>

      <ListItem onPress={() => console.log('Go to Notifications')}>
        <Text>Notifikasi</Text>
      </ListItem>

      <ListItem>
        <Text>Tentang Aplikasi</Text>
      </ListItem>
    </List>
  );
}

```

## 🧩 API Reference

### List
| Prop       | Type        | Wajib | Default | Deskripsi                      |
| ---------- | ----------- | ----- | ------- | ------------------------------ |
| `children` | `ReactNode` | ✅     | —       | Satu atau beberapa `ListItem`. |
| `style`    | `ViewStyle` | ❌     | —       | Gaya tambahan untuk container. |

### ListItem
| Prop       | Type                   | Wajib | Default | Deskripsi                                                                 |
| ---------- | ---------------------- | ----- | ------- | ------------------------------------------------------------------------- |
| `children` | `ReactNode`            | ✅     | —       | Konten baris, bebas teks, ikon, atau komponen lain.                       |
| `onPress`  | `() => void`           | ❌     | —       | Jika diisi, baris menjadi dapat diklik (`TouchableOpacity`).              |
| `style`    | `StyleProp<ViewStyle>` | ❌     | —       | Gaya tambahan untuk baris.                                                |
| `isLast`   | `boolean`              | 🚫    | —       | Diisi otomatis oleh `List` untuk menghapus border bawah pada baris akhir. |
| `index`    | `number`               | 🚫    | —       | Tidak digunakan—disediakan untuk extensibility.                           |
