# 📅 Drawing Component

Komponen untuk menggambar tanda tangan atau coretan bebas menggunakan kanvas berbasis webview.

## 🚀 Instalasi

Komponen ini menggunakan:

- [`react-native-signature-canvas`](https://www.npmjs.com/package/react-native-signature-canvas)
- [`react-native-webview`](https://github.com/react-native-webview/react-native-webview)

### 📦 Install Dependency

```bash
# Menggunakan yarn
yarn add react-native-signature-canvas
yarn add react-native-webview

# Menggunakan npm
npm install --save react-native-signature-canvas
npm install --save react-native-webview

```
### 🔗 Instalasi Pod (iOS)
```bash
cd ios && pod install
```
## ✍️ Contoh Penggunaan

```tsx
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import Drawing from './components/Drawing/Drawing';

export default function SignatureForm() {
  const [result, setResult] = useState<string | undefined>();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Drawing onDraw={setResult} />

      {result && (
        <Image
          source={{ uri: result }}
          style={{ width: 300, height: 100, marginTop: 24 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}
```

## props

| Prop     | Tipe                                   | Default     | Deskripsi                                                                                                             |
| -------- | -------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `onDraw` | `(value?: string \| undefined) ⇒ void` | `undefined` | Callback berisi tanda tangan **base64** saat pengguna menggambar (dipicu otomatis di `onDraw`). |
