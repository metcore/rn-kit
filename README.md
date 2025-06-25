# @herca/rn-kit

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
import { Container, Center, Typography } from '@herca/rn-kit';

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
npm install @herca/rn-kit
```

---

## 🚀 Penggunaan

```js
import { Button } from '@herca/rn-kit';

<Button title="Click Me" />
```

---

## 📚 Komponen Tersedia

### 🔹 1. Input / Form Components

Komponen untuk mengumpulkan input dari pengguna.

- [Checkbox](./src/Checkbox/README.md)
- [Chip-(Select)](./src/Chip/README.md)
- [DatePicker](./src/DatePicker/README.md)
- [DropDown](./src/DropDown/README.md)
- [Input](./src/Input/README.md)
- [Input Password](./src/InputPassword/README.md)
- [Radio Button](./src/RadioButton/README.md)
- [Select](./src/Select/README.md)
- [Switch](./src/Switch/README.md)
- [TextArea](./src/TextArea/README.md)

---

### 🔹 2. Overlay

Komponen yang muncul di atas konten utama untuk interaksi sementara.

- [Bottom Sheet](./src/BottomSheet/README.md)
- [Modal](./src/Modal/README.md)

---

### 🔹 3. Disclosure / Navigation Components

Komponen untuk menyembunyikan atau menampilkan konten.

- [Accordion](./src/Accordion/README.md)

---

### 🔹 4. Feedback 

Komponen untuk memberikan umpan balik atau informasi kepada pengguna.

- [Alert](./src/Alert/README.md)
- [Badge](./src/Badge/README.md)
- [Toast](./src/Toast/README.md)

---

### 🔹 5. Data Display

Komponen untuk menampilkan informasi atau elemen visual.

- [Avatar](./src/Avatar/README_AVATAR.md)
- [AvatarGroup](./src/Alert/README_AVATARGROUP.md)
- [Calendar](./src/Calendar/README.md)
- [Color](./src/Color/README.md)
- [Card](./src/Card/README.md)
- [Drawing](./src/Drawing/README.md)
- [List](./src/List/README.md)
- [Typography](./src/Typography/README.md)

---

## 🤝 Kontribusi

Silakan baca panduan kontribusi pada [CONTRIBUTING.md](CONTRIBUTING.md) untuk mengetahui alur pengembangan dan kontribusi pada proyek ini.

---

## 📄 Lisensi

MIT License