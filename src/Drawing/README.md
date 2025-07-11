# 📅 Drawing

## Contoh

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
