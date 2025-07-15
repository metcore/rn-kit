# 📦 CounterButton Component

Komponen `CounterButton` adalah tombol penghitung sederhana (+ / -) yang digunakan untuk mengatur nilai numerik dalam batas minimum dan maksimum. Komponen ini cocok digunakan untuk fitur seperti jumlah produk, kuantitas, atau pengaturan lainnya.

---

## ✨ Fitur

- Menambah dan mengurangi nilai dengan tombol.
- Mendukung batas nilai minimum dan maksimum.
- Tampilan dapat disesuaikan dengan `variant`.
- Mengirim nilai yang telah diubah ke parent melalui `onChange`.

---

## 🧩 Props

| Prop      | Tipe                         | Default     | Deskripsi                                                                 |
|-----------|------------------------------|-------------|---------------------------------------------------------------------------|
| `value`   | `number`                     | `0`         | Nilai awal yang akan ditampilkan pada counter.                           |
| `onChange`| `(val: number) => void`      | `undefined` | Callback yang dipanggil saat nilai counter berubah.                      |
| `min`     | `number`                     | `undefined` | Nilai minimum yang diperbolehkan untuk counter.                          |
| `max`     | `number`                     | `undefined` | Nilai maksimum yang diperbolehkan untuk counter.                         |
| `variant` | `'default'` \| `'color'`     | `'default'` | Menentukan gaya visual: `default` (outline) atau `color` (filled).       |
| `disabledDecrease` | boolean    | `'false'` | disabled decrease    |
| `disabledIncrease` | boolean    | `'false'` | disabled increase    |

---

## 🎨 Variasi Tampilan

### 1. Default

```tsx
<CounterButton
  value={1}
  onChange={(val) => console.log(val)}
  min={1}
  max={5}
/>

```

### 1. Warna Filled Button

```tsx
<CounterButton
  value={2}
  onChange={(val) => console.log(val)}
  min={1}
  max={10}
  variant="color"
/>
```

## 🧪 Contoh Implementasi

```tsx

import CounterButton from './CounterButton';

export default function ProductCounter() {
  const [quantity, setQuantity] = useState(1);

  return (
    <CounterButton
      value={quantity}
      min={1}
      max={10}
      onChange={setQuantity}
      variant="color"
    />
  );
}

```