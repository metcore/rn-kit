# ViewInsets Component

Komponen React Native yang menyediakan padding otomatis berdasarkan safe area insets untuk menghindari area sistem seperti notch, status bar, dan navigation bar.

## Instalasi

Komponen ini membutuhkan dependency berikut:

```bash
npm install react-native-safe-area-context
# atau
yarn add react-native-safe-area-context
```

Pastikan untuk membungkus aplikasi Anda dengan `SafeAreaProvider`:

```jsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>{/* Konten aplikasi Anda */}</SafeAreaProvider>;
}
```

## Penggunaan Dasar

```jsx
import ViewInsets from './ViewInsets';

function MyScreen() {
  return (
    <ViewInsets useTop useBottom>
      {/* Konten Anda */}
    </ViewInsets>
  );
}
```

## Props

| Prop        | Type                   | Default      | Deskripsi                                               |
| ----------- | ---------------------- | ------------ | ------------------------------------------------------- |
| `children`  | `React.ReactNode`      | **Required** | Konten yang akan ditampilkan di dalam container         |
| `useTop`    | `boolean`              | `false`      | Menambahkan padding top sesuai safe area inset atas     |
| `useBottom` | `boolean`              | `false`      | Menambahkan padding bottom sesuai safe area inset bawah |
| `useLeft`   | `boolean`              | `false`      | Menambahkan padding left sesuai safe area inset kiri    |
| `useRight`  | `boolean`              | `false`      | Menambahkan padding right sesuai safe area inset kanan  |
| `style`     | `StyleProp<ViewStyle>` | `undefined`  | Style tambahan untuk container                          |
| `...rest`   | `ViewProps`            | -            | Props lainnya akan diteruskan ke komponen View          |

## Contoh Penggunaan

### Layar dengan Safe Area Atas dan Bawah

```jsx
<ViewInsets useTop useBottom>
  <Text>Konten aman dari notch dan navigation bar</Text>
</ViewInsets>
```

### Layar dengan Safe Area Atas Saja

```jsx
<ViewInsets useTop>
  <Text>Konten aman dari status bar/notch</Text>
</ViewInsets>
```

### Layar dengan Safe Area di Semua Sisi

```jsx
<ViewInsets useTop useBottom useLeft useRight>
  <Text>Konten aman dari semua area sistem</Text>
</ViewInsets>
```

### Dengan Custom Style

```jsx
<ViewInsets
  useTop
  useBottom
  style={{ backgroundColor: '#fff', paddingHorizontal: 16 }}
>
  <Text>Konten dengan style tambahan</Text>
</ViewInsets>
```

### Dengan Props View Lainnya

```jsx
<ViewInsets useTop useBottom testID="main-container" accessible={true}>
  <Text>Konten dengan props accessibility</Text>
</ViewInsets>
```

## Fitur

- ✅ Otomatis menangani safe area insets
- ✅ Kontrol granular untuk setiap sisi (atas, bawah, kiri, kanan)
- ✅ Performa optimal dengan `useMemo` untuk menghindari re-render tidak perlu
- ✅ Mendukung semua props dari komponen View React Native
- ✅ TypeScript support dengan type definitions lengkap
- ✅ Default `flex: 1` untuk kemudahan layout

## Catatan

- Komponen ini secara default menggunakan `flex: 1` pada container
- Safe area insets akan disesuaikan secara otomatis berdasarkan perangkat
- Berguna untuk menghindari area yang tertutup oleh notch, status bar, home indicator, dll
- Dapat dikombinasikan dengan style custom untuk kebutuhan layout yang lebih kompleks

## TypeScript

Komponen ini sudah dilengkapi dengan TypeScript definitions. Interface `ViewInsetsProps` extends dari `ViewProps` sehingga mendukung semua props dari View React Native.

```typescript
interface ViewInsetsProps extends ViewProps {
  children: React.ReactNode;
  useTop?: boolean;
  useBottom?: boolean;
  useLeft?: boolean;
  useRight?: boolean;
  bottomType?: 'inset' | 'tabbar'; // Prop ini didefinisikan tapi belum diimplementasikan
}
```
