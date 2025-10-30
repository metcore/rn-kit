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

Dengan npm
```bash
npm install @herca/rn-kit
```
Atau dengan yarn

```bash
yarn add @herca/rn-kit
```
Pod install

```bash
cd ios
pod install
```

Wrap content utama dengan Provider

```tsx

import {Provider} from '@herca/rn-kit';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider>
      <YoyrCode>
    </Provider>
  )
}
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

- [Button](./src/Button/README.md)
- [Checkbox](./src/CheckBox/README_CHECKBOX.md)
- [Checkbox List](./src/CheckBox/README_CHECKBOXLIST.md)
- [Chip-(Select)](./src/Chip/README.md)
- [ChipItem](./src/Chip/README_CHIP_ITEM.md)
- [CounterButton](./src/CounterButton/README.md)
- [DatePicker](./src/DatePicker/README_DATEPICKER.md)
- [DropDown](./src/DropDown/README.md)
- [Input](./src/Input/README_INPUT.md)
- [Input Select](./src/Input/README_INPUT_SELECT.md)
- [InputOtp](./src/Input/README_INPUT_OTP.md)
- [Input Month](./src/Datepicker/README_MONTHPICKER.md)
- [Input Password](./src/InputPassword/README.md)
- [Input Time](./src/Datepicker/README_TIMEPICKER.md)
- [Input Year](./src/Datepicker/README_YEARPICKER.md)
- [Radio Button](./src/RadioButton/README.md)
- [Select](./src/Select/README.md)
- [Switch](./src/Switch/README.md)
- [TextArea](./src/TextArea/README.md)
- [InputFile](./src/Input/README_INPUT_FILE.md)

---

### 🔹 2. Overlay

Komponen yang muncul di atas konten utama untuk interaksi sementara.

- [Bottom Sheet](./src/BottomSheet/README.md)
- [Modal](./src/Modal/README.md)

---

### 🔹 3. Disclosure / Navigation Components

Komponen untuk menyembunyikan atau menampilkan konten.

- [Accordion](./src/Accordion/README.md)
- [Step](./src/Step/README.md)
- [Tab](./src/Tab/README.md)

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
- [Container](./src/Ui/README_CONTAINER.md)
- [Card](./src/Ui/README_CARD.md)
- [Devider](./src/Ui/README_DEVIDER.md)
- [Drawing](./src/Drawing/README.md)
- [Footer](./src/Ui/README_FOOTER.md)
- [ViewInsets](./src/Ui/README_VIEWINSETS.md)
- [Icon](./src/Icon/README.md)
- [List](./src/List/README.md)
- [Timeline](./src/Timeline/README.md)
- [Typography](./src/Typography/README.md)
- [Skeleton](./src/Skeleton/README.md)
- [PdfView](./src/FileView/PDF_VIEW_README.md)

---

### Contex

- [Provider](./src/Provider/README.md)

## 🤝 Kontribusi

Silakan baca panduan kontribusi pada [CONTRIBUTING.md](CONTRIBUTING.md) untuk mengetahui alur pengembangan dan kontribusi pada proyek ini.

---

## 📄 Lisensi

MIT License
