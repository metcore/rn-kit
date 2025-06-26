# Color Palette

Berikut adalah definisi warna yang digunakan di design system React Native Anda. Palette mencakup warna dasar (*base*), skala abu‐abu (*gray*), kategori semantik (*primary*, *success*, *danger*, *warning*, *info*, *orange*, *purple*), serta utilitas lain seperti `divider` dan `disabled`.

Warna tersimpan dalam objek `Color` dengan struktur hierarkis seperti contoh berikut:

```ts
Color.primary[500] // -> "#4D46FF"
Color.gray[200]   // -> "#EBEBEB"
```

---

## Struktur Objek Color

```ts
const Color = {
  base: { ... },
  gray: { ... },
  primary: { ... },
  warning: { ... },
  danger: { ... },
  success: { ... },
  info: { ... },
  orange: { ... },
  purple: { ... },
  divider: { ... },
  disabled: { ... },
  shadow: { ... },
};
```

### Skema Skala Warna

* **0–1000** (atau 0–950) – Semakin besar angka, semakin gelap warna.
* **50** – Latar paling terang (sering dipakai untuk *background* highlight).
* **500** – Warna utama (brand color dan teks link normal).
* **700/800/900** – Warna paling gelap untuk teks di atas latar berkait.

---

## Tabel Ringkasan

| Kategori   | Contoh Penggunaan     | Keterangan                                  |
| ---------- | --------------------- | ------------------------------------------- |
| `base`     | `Color.base.white100` | Warna putih/ hitam utama UI dasar.          |
| `gray`     | `Color.gray[700]`     | Teks, ikon sekunder, border netral.         |
| `primary`  | `Color.primary[500]`  | Aksi utama, tombol brand, ikon utama.       |
| `success`  | `Color.success[500]`  | Status berhasil: label “Success”, badge OK. |
| `danger`   | `Color.danger[500]`   | Error, status gagal.                        |
| `warning`  | `Color.warning[500]`  | Peringatan.                                 |
| `info`     | `Color.info[500]`     | Informasi tambahan.                         |
| `orange`   | `Color.orange[500]`   | Aksen/ badge khusus.                        |
| `purple`   | `Color.purple[500]`   | Aksen sekunder/ grafik.                     |
| `divider`  | `Color.divider[25]`   | Garis pemisah tipis.                        |
| `disabled` | `Color.disabled[25]`  | Kontrol non‐aktif.                          |

> Anda bisa menambahkan `shadow` palette jika diperlukan gradasi drop shadow.

---

## TypeScript Helper

```ts
export type ColorVariantType =
  | 'default'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'info'
  | 'purple'
  | 'orange';
```

Tipe ini dipakai di komponen lain (mis. `Label`) untuk membatasi nama variant.

---

## Contoh Implementasi

```tsx
import Color from '@/components/Color/Color';

const MyButton = () => (
  <View style={{ backgroundColor: Color.primary[500], padding: 12 }}>
    <Text style={{ color: Color.base.white100 }}>Click Me</Text>
  </View>
);
```

---

## Tips Penggunaan

* Gunakan warna **50** untuk latar lembut (highlight, badge background).
* Gunakan warna **500** untuk elemen interaktif utama.
* Gunakan warna **700+** untuk teks di atas warna **50–300**.
* Gunakan `rgba(..., 0.x)` jika memerlukan translusi.

---

## Lisensi

Bagian dari library internal Anda; ikuti lisensi proyek.
