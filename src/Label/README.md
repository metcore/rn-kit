# Label

**Label** adalah komponen kecil berbentuk badge untuk menampilkan status, kategori, atau metadata ringkas. Komponen ini mendukung ikon, variasi warna, dan konten kustom.

## API Reference

| Prop       | Tipe                                                                                             | Default     | Deskripsi                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| `label`    | `string`                                                                                         | `''`        | Teks yang ditampilkan jika `children` tidak disediakan.                        |
| `children` | `React.ReactNode`                                                                                | `undefined` | Menampilkan elemen kustom sebagai isi label. Jika ada, `label` akan diabaikan. |
| `color`    | `'default' \| 'success' \| 'danger' \| 'primary' \| 'warning' \| 'info' \| 'purple' \| 'orange'` | `'default'` | Variasi warna latar dan teks.                                                  |
| `icon`     | `IconNameProps`                                                                                  | `undefined` | Menampilkan ikon di sebelah kiri teks.                                         |
| `size`     | `'small' \| 'medium'`                                                                            | `'medium'`  | (Belum digunakan – untuk ekspansi ukuran ke depan.)                            |

---

## Warna yang Didukung

| Warna     | Background          | Teks                 |
| --------- | ------------------- | -------------------- |
| `default` | `Color.gray[50]`    | `Color.gray[900]`    |
| `success` | `Color.success[50]` | `Color.success[300]` |
| `danger`  | `Color.danger[50]`  | `Color.danger[300]`  |
| `primary` | `Color.primary[50]` | `Color.primary[300]` |
| `warning` | `Color.warning[50]` | `Color.warning[300]` |
| `info`    | `Color.info[50]`    | `Color.info[300]`    |
| `purple`  | `Color.purple[50]`  | `Color.purple[300]`  |
| `orange`  | `Color.orange[50]`  | `Color.orange[300]`  |

---

## Contoh Penggunaan

### Label Sederhana

```tsx
<Label label="Active" color="success" />
```

### Label dengan Ikon

```tsx
<Label label="Error" color="danger" icon="AlertCircle" />
```

### Kustom Isi (Children)

```tsx
<Label color="primary">
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name="Check" color={Color.primary[300]} size={12} />
    <Text style={{ color: Color.primary[300], marginLeft: 4 }}>Custom</Text>
  </View>
</Label>
```

---

## Catatan Tambahan

* Jika Anda memberikan `children`, maka `label` dan `icon` akan diabaikan.
* Komponen ini menggunakan `alignSelf: 'flex-start'` agar ukuran label tidak penuh.
* Prop `size` belum aktif, namun sudah disiapkan jika ke depan ingin mendukung skala `small`/`large`.

---
