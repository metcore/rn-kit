# 📢 Alert Component

Komponen `Alert` digunakan untuk menampilkan pesan notifikasi dengan ikon, judul, dan pesan yang dapat dikustomisasi warnanya sesuai konteks (seperti *success*, *info*, *warning*, dll).

<img src="../../assets/doc/Alert/Alert.png" alt="Deskripsi Alt" width="200" />

## ✨ Fitur

- Menampilkan ikon notifikasi
- Mendukung berbagai warna status
- Mendukung judul dan pesan
- Gaya dapat dikustomisasi

## 🧱 Props

| Prop           | Tipe                                                                 | Default            | Deskripsi                                                                 |
|----------------|----------------------------------------------------------------------|---------------------|---------------------------------------------------------------------------|
| `icon`         | `IconNameProps`                                                      | `'ExclamationMark'`  | Nama ikon dari komponen `Icon`                                           |
| `title`        | `string`                                                             | `undefined`         | Judul alert                                                               |
| `message`      | `string`                                                             | `undefined`         | Pesan tambahan                                                            |
| `color`        | `'success' \| 'info' \| 'warning' \| 'danger' \| 'primary' \| 'orange' \| 'purple'` | `'primary'` | Warna tema alert                                                         |
| `style`        | `ViewStyle`                                                          | `undefined`         | Gaya tambahan untuk container                                             |
| `titleStyle`   | `StyleProp<ViewStyle>`                                               | `undefined`         | Gaya tambahan untuk judul                                                 |
| `messageStyle` | `StyleProp<ViewStyle>`                                               | `undefined`         | Gaya tambahan untuk pesan                                                 |
| `testID` | `string` | - | ID untuk automation testing (Maestro/Detox/Appium). Diterapkan langsung ke elemen akar, tanpa suffix. |

## 🎨 Warna yang Didukung

```ts
type ColorProps =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'orange'
  | 'purple';
```

## 📦 Cara Penggunaan

```tsx
import React from 'react';
import Alert from './Alert'; // sesuaikan dengan path Anda

export default function MyScreen() {
  return (
    <Alert
      icon="CheckCircle"
      title="Berhasil"
      message="Data Anda berhasil disimpan."
      color="success"
    />
  );
}
```

## 🛠️ Kustomisasi

```tsx
<Alert
  icon="Warning"
  title="Peringatan"
  message="Pastikan semua data telah diisi."
  color="warning"
  style={{ marginTop: 16 }}
  titleStyle={{ fontSize: 16 }}
  messageStyle={{ fontStyle: 'italic' }}
/>
```
