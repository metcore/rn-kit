# 📦 Komponen `ChipItem` – React Native

Komponen `ChipItem` merupakan komponen presentasional dalam bentuk "chip" atau "pill" yang digunakan sebagai bagian dari list filter/select menggunakan UI gaya chip, baik single maupun multiple select.

---

## 🔧 Props

| Prop           | Type                                                                                             | Default      | Description                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------- |
| `item`         | `ChipOptionProps`                                                                                | **Required** | Data item yang akan ditampilkan, berisi label, value, dan optional `disabled`      |
| `isSelected`   | `(value: boolean) => boolean`                                                                    | **Required** | Fungsi untuk menentukan apakah item saat ini sedang terpilih                       |
| `color`        | `'default' \| 'success' \| 'danger' \| 'primary' \| 'warning' \| 'info' \| 'purple' \| 'orange'` | `'default'`  | Warna tema chip berdasarkan `CHIP_COLOR_MAP`                                       |
| `block`        | `boolean`                                                                                        | `false`      | Apakah chip harus mengisi lebar penuh jika ditampilkan secara vertikal             |
| `size`         | `'small' \| 'medium' \| 'large'`                                                                 | `'medium'`   | Ukuran padding dan font chip                                                       |
| `renderItem`   | `(item: ChipOptionProps, selected: boolean, disabled: boolean) => ReactNode`                     | `undefined`  | Fungsi untuk mengkustomisasi isi tampilan chip                                     |
| `isHorizontal` | `boolean`                                                                                        | `false`      | Jika true, maka `block` akan diabaikan agar chip tetap fleksibel secara horizontal |
| `onPress`      | `(disabled: boolean, val: ChipOptionProps) => void`                                              | `undefined`  | Callback saat chip ditekan                                                         |
| `onLayout`     | `(event: LayoutChangeEvent) => void`                                                             | `undefined`  | Callback ketika layout chip dihitung oleh React Native                             |

---

## 🎨 Style Behavior

- **Warna Dinamis**: Warna border, background, dan teks akan menyesuaikan status:
  - Default
  - Selected
  - Disabled

- **Ukuran**:
  - `'small'`: Padding kecil, font size 12
  - `'medium'`: Default, font size 14
  - `'large'`: Padding besar, font size 16

- **Block Mode**:
  - Bila `block: true` dan `isHorizontal: false`, chip akan mengisi lebar penuh kontainer

---

## 💡 Contoh Penggunaan

```tsx
<ChipItem
  item={{ label: 'Marketing', value: 'marketing' }}
  isSelected={() => true}
  color="primary"
  size="medium"
  onPress={(disabled, val) => console.log('Pressed:', val)}
/>
```

---

## 🛠️ Tips

- Gunakan `renderItem` untuk mengganti isi chip dengan tampilan kustom.
- Pastikan `isSelected` di-define dengan benar agar state visual chip sesuai.

---

## 🧱 Dependencies

- `Typography`
- `CHIP_COLOR_MAP`
- `Pressable` & `StyleSheet` dari React Native

---

## 🗂️ Related

- `Chip`
- `Select`
- `ChipOptionProps`
