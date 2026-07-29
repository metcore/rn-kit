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
- [Input Date](./src/Input/README_INPUT_DATE.md)
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

---

### Function

- [Date Formatter](./src/function/README_DATE_FORMATTER.md)

## 🧪 Automation Testing (testID)

Sebagian besar komponen interaktif pada `@herca/rn-kit` mendukung prop opsional **`testID`** untuk kebutuhan automation testing (Maestro, Detox, Appium, dan sejenisnya).

### Cara Kerja

- `testID` di React Native otomatis dipetakan native oleh platform:
  - **Android** → `resource-id`
  - **iOS** → `accessibilityIdentifier`
- Tool automation testing seperti **Maestro**, **Detox**, atau **Appium** menggunakan nilai ini untuk menemukan elemen di layar (`tapOn: { id: "..." }`, `element(by.id(...))`, dsb).
- Untuk komponen yang terdiri dari beberapa sub-elemen (misalnya `Input` yang punya label, field, tombol clear, dan pesan error), library ini menerapkan **konvensi derived-suffix**: satu `testID` yang Anda berikan pada komponen akan diturunkan menjadi beberapa ID turunan dengan pola `{testID}-{suffix}`.

  Contoh: `testID="email"` pada `Input` akan menghasilkan:
  - `email-input` → elemen `TextInput`
  - `email-label` → label
  - `email-error` → pesan error/hint
  - `email-clear` → tombol clear
  - `email-toggle` → tombol ikon kanan (mis. show/hide password)

- **Zero-overhead saat tidak digunakan**: jika prop `testID` tidak diisi (`undefined`), maka **tidak ada** prop `testID` yang dirender sama sekali pada elemen manapun (bukan string kosong) — sehingga tidak ada biaya tambahan maupun noise di tree komponen untuk aplikasi yang tidak memakai automation testing.

### Contoh Penggunaan (Maestro)

```yaml
- tapOn:
    id: "submit-btn"
- tapOn:
    id: "email-input"
- inputText: "user@mail.com"
    # target field: testID="email" -> email-input
```

### Tabel Konvensi Suffix per Komponen

| Komponen         | `testID` diterapkan pada       | Suffix turunan                                                        |
| ---------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `Button`         | `Pressable` (tanpa suffix)       | –                                                                      |
| `Switch`         | `Pressable` (tanpa suffix)       | `-label`                                                               |
| `CheckBox`       | `Pressable` (tanpa suffix)       | `-label`                                                               |
| `CounterButton`  | –                                | `-decrement`, `-input`, `-increment`                                   |
| `Toast`          | root (tanpa suffix)              | `-message`, `-clear` *(hanya jika `<Toast>` dirender langsung; belum diteruskan lewat `useToast().show()`)* |
| `Input`          | –                                | `-input`, `-label`, `-error`, `-clear`, `-toggle`                       |
| `TextArea`       | –                                | `-input`, `-label`, `-error`                                            |
| `InputPassword`  | –                                | Meneruskan `testID` apa adanya ke `Input`, sehingga mewarisi seluruh suffix `Input` (`-input`, `-label`, `-error`, `-clear`, `-toggle`; `-toggle` = tombol show/hide password) |
| `InputOtp`       | –                                | `-item-{index}` (per kotak digit), `-label`, `-error`                  |
| `CheckBoxList`   | –                                | `-option-{value}` (per opsi)                                           |
| `RadioButton`    | –                                | `-option-{value}`, `-option-{value}-label`                             |
| `Chip`           | – (tidak merender testID di root)| `-option-{value}` (per chip item)                                       |
| `InputSelect`    | –                                | `-trigger`, `-label`, `-clear`, `-error`, `-sheet`                      |
| `InputDate`      | –                                | `-trigger`, `-trigger-end` (mode range), `-label`, `-clear`, `-sheet`   |
| `DropDown`       | –                                | `-trigger`, `-modal`, `-option-{value}` / `-item-{index}`               |
| `Select`         | –                                | `-sheet`, `-search`, `-submit`, `-option-{value}` (via `Chip`)          |
| `DatePicker`     | –                                | `-sheet`, `-cancel`, `-confirm`, `-error`                               |
| `YearPicker`     | –                                | `-sheet`, `-cancel`, `-confirm`, `-option-{year}`                       |
| `MonthPicker`    | –                                | `-sheet`, `-cancel`, `-confirm`, `-option-{value}`                      |
| `TimePicker`     | –                                | `-sheet`, `-cancel`, `-confirm`, `-hour`, `-minute`                     |
| `Modal`          | elemen konten (tanpa suffix)      | `-backdrop`, `-close`                                                   |
| `BottomSheet`    | elemen konten (tanpa suffix)      | `-backdrop`, `-close`, `-pullbar`, `-footer`                            |
| `Tab`            | –                                | `-item-{index}`, `-panel-{index}`                                       |
| `Accordion`      | –                                | `-trigger`                                                              |
| `InputFile`      | –                                | `-trigger`, `-input-{index}`, `-item-{index}`, `-error`, `-sheet`, `-modal-delete` |

> Detail lebih lanjut untuk tiap komponen tersedia di README masing-masing komponen pada tabel [📚 Komponen Tersedia](#-komponen-tersedia) di atas.

---

## 🤝 Kontribusi

Silakan baca panduan kontribusi pada [CONTRIBUTING.md](CONTRIBUTING.md) untuk mengetahui alur pengembangan dan kontribusi pada proyek ini.

---

## 📄 Lisensi

MIT License
