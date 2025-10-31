# 📦 Icon Library

Kumpulan icon siap pakai untuk digunakan di proyek Anda.

## 🚀 Instalasi

Install dependecy terlebih dahulu:
> Komponen ini mengguankan SVG [react-native-svg](https://www.npmjs.com/package/react-native-svg). Jadi anda harus menginstall package tersebut didalam project anda

- Install library
```bash
# dengan npm
npm install react-native-svg
# atau yarn
yarn add react-native-svg
```
- Link native (IOS)

```bash
cd ios && pod install
```

## 📦 Penggunaan

```tsx
import { Icon } from '@herca/rn-kit';

export default function App() {
  return (
    <View style={{ flexDirection: 'row' }}>
        <Icon name="Filter" size={15} color={Color.gray[600]} />
    </View>
  );
}

```

## Props
| Prop    | Tipe   | Default | Deskripsi                |
| ------- | ------ | ------- | ------------------------ |
| `name`  | string | null    | Jenis Icon |
| `size`  | number | 24      | Ukuran icon dalam piksel |
| `color` | string | "#000"  | Warna icon               |
| `style` | object | `{}`    | Gaya tambahan (optional) |


## Daftar Icon

- AirPlane
- ArrowBackAlt
- ArrowDown
- ArrowForwardAlt
- ArrowLeft
- ArrowRight
- ArrowUp
- Bold
- Camera
- Calendar
- Check
- Document
- Download
- Eye
- EyeOpen
- ExclamationMark
- Filter
- Home
- Image
- Italic
- Pdf
- RadioButton
- Search
- StickyNote
- Times
- User
- UnderLine
- x-circle
- Plus
- Bell
- file-list-check
- file-text
- bookmark-user
- folder-clock
- home-fill
- home-outline
- user-circle-outline
- user-circle-fill
- clipboard-list-check
- clipboard-list
- Megaphone
- clipboard-list-check-outline
- Scanner
- Clock
- clock-outline
- box-outline
- Box
- at-sign
- briefcase-outline
- edit-square-outline
- globe-earth
- lock-fill
- logo-herca-hris
- question-circle-outline
- shield-fill
- Users
- whatsapp-fill
- Bold
- UnderLine
- Italic
- settings-slider
- rotate-square-fill
- discount-fill
- location-pin-fill
- copy-fill
- copy-text-fill
- shield-checked-fill
- calendar-edit
- info-circle-outline
- Tag
- Tool
- user-edit
- Bolt
- bolt-slash
- image-plus
- Trash
- time-forward
- Signature
- Money
- info-circle-fill
- Flag
- Coupon
- more-vertical
- exclamation-triangle
- pdf-file
- rotate-right
- arrow-up-circle-fill
- clipboard-list-check-fill-2
- Phone
- Envelope
- briefcase-fill-bulk
- car-outline
- location-pin-outline
- money-down
