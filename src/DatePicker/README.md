# 📅 DatePicker Component

Komponen `DatePicker` adalah antarmuka pemilih tanggal yang dibungkus dalam sebuah **BottomSheet**, dan menggunakan komponen `Calendar` di dalamnya. Pengguna dapat memilih tanggal (tunggal atau rentang), lalu mengonfirmasi atau membatalkan pemilihan dengan tombol aksi.

Komponen ini extend dari Calendar, jadi kalian bisa menggunakan semua props yang ada di Calendar [Calendar](../Calendar/README.md)

---

## ✨ Fitur

- Pilih tanggal dalam mode **single** atau **range**
- Tersedia dalam tampilan **BottomSheet**
- Terdapat tombol **Batalkan** dan **Terapkan**
- Terintegrasi dengan `Calendar` dan `Button` custom

---

## ⚙️ Props

| Prop        | Tipe Data                       | Keterangan |
|-------------|----------------------------------|------------|
| `mode`      | `'single'` \| `'range'`         | Menentukan mode pemilihan tanggal |
| `onChange`  | `(value: Date \| [Date, Date]) => void` | Callback saat tanggal dipilih dan tombol **Terapkan** ditekan |
| `onClose`   | `() => void`                    | Callback saat BottomSheet ditutup |
| `isOpen`    | `boolean`                       | Menentukan apakah BottomSheet sedang terbuka |
| `hasError`  | `boolean`                       | (Opsional) Menandai jika terjadi kesalahan validasi |

---

## 🧪 Contoh Penggunaan

```jsx
import DatePicker from "./components/DatePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Button title="Pilih Tanggal" onPress={() => setIsOpen(true)} />

      <DatePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode="range"
        onChange={(date) => setSelectedDate(date)}
      />
    </>
  );
}
