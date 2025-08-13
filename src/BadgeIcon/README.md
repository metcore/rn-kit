# BadgeIcon Component

`BadgeIcon` adalah komponen React Native untuk menampilkan **badge** yang dapat berisi **ikon** atau **konten custom** (children). Komponen ini fleksibel dalam ukuran (`size`), warna (`color`), dan varian (`variant`).

---

## ⚙️ Props

### **BaseBadgeProps**

| Prop      | Tipe                                 | Default     | Deskripsi                                                                 |
| --------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------- |
| `color`   | `Variant` \| `HexColor`              | `"default"` | Warna badge. Bisa berupa nama varian yang tersedia atau kode warna HEX.   |
| `size`    | `"small"` \| `"medium"` \| `"large"` | `"medium"`  | Ukuran badge. Mengatur tinggi, lebar minimum, padding, dan radius border. |
| `variant` | `Variant`                            | -           | Alias untuk varian warna (tidak digunakan langsung di komponen ini).      |

---

### **IconBadgeProps** (Badge dengan Icon)

| Prop       | Tipe            | Deskripsi                                       |
| ---------- | --------------- | ----------------------------------------------- |
| `icon`     | `IconNameProps` | Nama ikon yang akan ditampilkan.                |
| `children` | `never`         | Tidak boleh ada children jika menggunakan ikon. |

---

### **ChildrenBadgeProps** (Badge dengan Konten Custom)

| Prop       | Tipe              | Deskripsi                                       |
| ---------- | ----------------- | ----------------------------------------------- |
| `children` | `React.ReactNode` | Konten yang akan ditampilkan di dalam badge.    |
| `icon`     | `never`           | Tidak boleh ada icon jika menggunakan children. |

---

## 🎨 Varian Warna (`Variant`)

| Nama Varian | Background          | Font Color            |
| ----------- | ------------------- | --------------------- |
| `default`   | `Color.gray[100]`   | `Color.gray[800]`     |
| `primary`   | `Color.primary[50]` | `Color.primary[1000]` |
| `success`   | `Color.success[50]` | `Color.success[500]`  |
| `info`      | `Color.info[50]`    | `Color.info[500]`     |
| `danger`    | `Color.danger[50]`  | `Color.danger[600]`   |
| `warning`   | `Color.warning[50]` | `Color.warning[300]`  |
| `orange`    | `Color.orange[50]`  | `Color.orange[500]`   |
| `purple`    | `Color.purple[50]`  | `Color.purple[500]`   |

> Jika `color` berupa kode HEX, maka background badge akan otomatis diubah menjadi warna transparan (`opacity 0.1`) menggunakan helper `hexToRGBA`.

---

## 📏 Ukuran Badge (`size`)

| Ukuran   | minHeight | minWidth | Padding | BorderRadius | Icon Size |
| -------- | --------- | -------- | ------- | ------------ | --------- |
| `small`  | 24        | 24       | 4       | 4            | 16        |
| `medium` | 32        | 32       | 4       | 4            | 24        |
| `large`  | 40        | 40       | 8       | 4            | 24        |

---

## 💻 Contoh Penggunaan

```tsx
<BadgeIcon icon="check" size="small" color="success" />
```

---

## 🛠 Catatan Implementasi

- Jika `color` adalah varian (`default`, `primary`, dsb.), warna background dan font color akan diambil dari konstanta `COLORS`.
- Jika `color` adalah kode HEX (`#rrggbb`), maka background akan menggunakan versi transparan dari warna tersebut.
- Menggunakan helper `hexToRGBA` untuk mengubah HEX menjadi warna RGBA.
- Komponen `Icon` digunakan untuk menampilkan ikon sesuai ukuran badge.
