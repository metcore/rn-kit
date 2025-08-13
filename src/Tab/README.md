# 📱 Komponen Tab Kustom untuk React Native

Komponen tab ringan dan fleksibel untuk React Native yang mendukung:

- ✅ Swipe kiri/kanan antar tab
- ✅ Scroll vertikal di dalam konten tiap tab
- ✅ Tampilan tab yang bisa disesuaikan
- ✅ Tanpa dependensi eksternal (tidak butuh react-navigation)

---

## ⚙️ Instalasi

Komponen tab ini dibangun menggunakan [react-native-pager-view](https://github.com/callstack/react-native-pager-view) untuk mengatur perpindahan tab secara swipe kiri/kanan.
Pastikan Anda menginstal dependensi ini sebelum menggunakan komponen.

### 1. Install Dependensi

```sh
# Menggunakan npm
npm install react-native-pager-view

# Menggunakan yarn
yarn add react-native-pager-view
```

### 2. Konfigurasi Platform

#### iOS

Setelah instalasi, jalankan perintah berikut untuk meng-install pod:

```sh
cd ios && pod install && cd ..
```

Tidak ada konfigurasi tambahan untuk iOS, namun pastikan proyek Anda sudah menggunakan **minimum iOS 11** atau sesuai rekomendasi React Native agar kompatibel.

#### Android

`react-native-pager-view` akan otomatis ter-link di Android tanpa perlu langkah tambahan.
Namun, Anda perlu memastikan bahwa **minimum SDK version** Anda adalah 21 atau lebih tinggi.
Periksa file `android/app/build.gradle`:

```gradle
android {
  defaultConfig {
    minSdkVersion = 21
  }
}
```

Jika nilai `minSdkVersion` di bawah 21, tingkatkan agar komponen dapat berjalan dengan baik.

## 💡 Contoh Penggunaan

```tsx
import Tab from './Tab';
import TabItem from './TabItem';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';

export default function App() {
  return (
    <Tab>
      <TabItem name="Beranda" component={HomeScreen} />
      <TabItem name="Profil" component={ProfileScreen} />
    </Tab>
  );
}
```

---

## ✨ Fitur

### 1. Navigasi Tab

- Tap pada header tab untuk berpindah
- Swipe kiri/kanan untuk berpindah antar tab

### 2. Konten Scrollable

Setiap tab dibungkus dalam `ScrollView` vertikal, sehingga bisa discroll ke bawah jika konten panjang.

---

## 🧩 Props

### `TabProps`

| Properti       | Tipe                      | Keterangan                    |
| -------------- | ------------------------- | ----------------------------- |
| `children`     | `React.ReactNode`         | Daftar elemen `<TabItem />`   |
| `current?`     | `number`                  | Indeks tab aktif (default: 0) |
| `onChangeTab?` | `(index: number) => void` | Callback saat tab berpindah   |

### `TabItemProps`

| Properti    | Tipe                  | Keterangan                         |
| ----------- | --------------------- | ---------------------------------- |
| `name`      | `string`              | Nama/tab label yang ditampilkan    |
| `component` | `React.ComponentType` | Komponen yang akan dirender di tab |

---

## 🧪 Contoh Screen

```tsx
const HomeScreen = () => (
  <View style={{ padding: 20 }}>
    <Text>Selamat datang di tab Beranda!</Text>
  </View>
);
```

---
