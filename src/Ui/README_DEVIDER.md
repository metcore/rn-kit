# Divider

**Divider** adalah komponen garis horizontal sederhana yang digunakan untuk memisahkan konten secara visual dalam antarmuka pengguna.

---

## Instalasi

Komponen ini tidak memerlukan dependensi eksternal. Hanya menggunakan:

* `Color` – untuk warna garis.
* `View` dan `StyleSheet` dari `react-native`.

---

## API Reference

Tidak memiliki properti (props) khusus. Komponen ini dapat digunakan langsung dan bisa dikustomisasi melalui `style` eksternal jika diperlukan.

---

## Contoh Penggunaan

### Divider Default

```tsx
import Divider from '@/components/Divider/Divider';

<View>
  <Text>Bagian Atas</Text>
  <Divider />
  <Text>Bagian Bawah</Text>
</View>
```

### Divider dengan Margin

```tsx
<View style={{ marginVertical: 12 }}>
  <Divider />
</View>
```

### Divider yang Dikustomisasi

```tsx
<Divider style={{ backgroundColor: 'red', height: 2 }} />
```

> Catatan: Untuk mengubah gaya `Divider`, bungkus komponen dengan `View` tambahan atau tambahkan prop `style` melalui wrapper jika perlu.

---

## Style Default

```ts
{
  height: 1,
  backgroundColor: Color.gray[200],
}
```

