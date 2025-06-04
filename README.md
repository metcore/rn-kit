# @herca/ui-kit

UI Kit untuk pengembangan aplikasi internal **HerCa**.

Kit ini dirancang untuk mempercepat proses pengembangan antarmuka pengguna dengan pendekatan minimal terhadap penggunaan `style` manual. Beberapa komponen dibuat **fix dan konsisten** agar tampilan aplikasi memiliki nuansa yang seragam.

> **Catatan:** Jika menggunakan UI Kit ini, **tidak disarankan untuk menambahkan style atau melakukan kustomisasi manual**.  
> Untuk kebutuhan kustomisasi, gunakan konfigurasi `Theme` yang telah disediakan.

---

## ❌ Contoh Penggunaan yang Tidak Disarankan

```js
import { View, Text, StyleSheet } from 'react-native';

return (
  <View style={styles.container}>
    <Text style={styles.text}>
      Hello World
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
```

## ✅ Contoh Penggunaan yang Disarankan

```js
import { Container, Center, Typography } from '@herca/ui-kit';

return (
  <Container>
    <Center>
      <Typography variant="t2" weight="bold">
        Hello World
      </Typography>
    </Center>
  </Container>
);
```

---

## 📦 Instalasi

```bash
npm install @herca/ui-kit
```

---

## 🚀 Penggunaan

```js
import { Button } from '@herca/ui-kit';

<Button title="Click Me" />
```

---

## 📚 Komponen Tersedia

### 📐 Layout
- [Alert](./src/Alert/README.md)
- [Badge](./src/Badge/README.md)
- [Container](./docs/components/Input.md)
- [Card](./docs/components/Input.md)
- [List](./docs/components/Input.md)
- [Footer](./docs/components/Input.md)
- [Typography](./docs/components/Input.md)

### 🧾 Form
- [Button](./docs/components/Input.md)
- [Checkbox](./docs/components/Input.md)
- [Drawing](./docs/components/Input.md)
- [Input](./docs/components/Input.md)
- [Input Password](./docs/components/Input.md)
- [Radio Button](./docs/components/Input.md)
- [Select](./docs/components/Input.md)
- [Switch](./docs/components/Input.md)

### 🛠️ Tool
- [Bottom Sheet](./src/BottomSheet/README.md)
- [Modal](./docs/components/Input.md)
- [Accordion](./docs/components/Input.md)

---

## 🤝 Kontribusi

Silakan baca panduan kontribusi pada [CONTRIBUTING.md](CONTRIBUTING.md) untuk mengetahui alur pengembangan dan kontribusi pada proyek ini.

---

## 📄 Lisensi

MIT License