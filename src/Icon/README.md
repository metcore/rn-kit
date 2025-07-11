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
- Pdf  
- RadioButton  
- Search  
- StickyNote  
- Times  
- User  
- x-circle  