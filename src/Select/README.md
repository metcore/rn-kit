# 📦 Select Component

Komponen `Select` adalah komponen pemilihan data berbasis bottom sheet dengan dukungan pencarian, multiple select, custom item renderer, dan pull-to-refresh.

## 🚀 Fitur

- ✅ Bottom Sheet
- 🔍 Pencarian dengan debounce
- 🔁 Pull-to-refresh support
- 🔘 Multiple/Single select
- 🎨 Custom render item
- ⚠️ Validasi jika required
- 🔄 Loading state

## 📦 Props

| Prop          | Tipe                                            | Default | Keterangan                                                                                                                                                    |
| ------------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`      | `boolean`                                       | `false` | Menentukan apakah bottom sheet terbuka                                                                                                                        |
| `data`        | `ChipOptionProps[]`                             | -       | Data pilihan untuk ditampilkan                                                                                                                                |
| `multiple`    | `boolean`                                       | `false` | Mengizinkan multiple selection                                                                                                                                |
| `renderItem`  | `(item, selected, disabled) => React.ReactNode` | -       | Kustom tampilan item                                                                                                                                          |
| `onSubmit`    | `(selected: ChipSelectedProps) => void`         | -       | Callback saat tombol submit ditekan                                                                                                                           |
| `onClose`     | `(val: boolean) => void`                        | -       | Callback saat bottom sheet ditutup                                                                                                                            |
| `onSearch`    | `(val: string) => void`                         | -       | Callback saat input pencarian berubah                                                                                                                         |
| `required`    | `boolean`                                       | `false` | Jika `true`, validasi input saat submit                                                                                                                       |
| `loading`     | `boolean`                                       | `false` | Menampilkan loading saat data di-fetch                                                                                                                        |
| `delaySearch` | `number`                                        | `300`   | Delay pencarian dalam milidetik                                                                                                                               |
| `height`      | `BottomSheetHeighProps`                         | -       | Ukuran tinggi BottomSheet                                                                                                                                     |
| `onRefresh`   | `() => void`                                    | -       | Callback saat pull-to-refresh dilakukan                                                                                                                       |
| `header`      | ReactElement                                    | –       | Jika ingin chip mempunyai header.                                                                                                                             |
| `footer`      | ReactElement                                    | –       | Jika ingin chip mempunyai footer.                                                                                                                             |
| `value`       | ChipSelectedProps                               | –       | Nilai pilihan yang dikontrol dari luar. Cocok untuk membuat komponen controlled. Akan mensinkronkan state internal selected dengan value setiap kali berubah. |

## 📌 Contoh Penggunaan

```tsx
import Select from './components/Select/Select';

const MyScreen = () => {
  const [open, setOpen] = useState(false);

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  const handleSubmit = (selected) => {
    console.log('Selected:', selected);
  };

  return (
    <>
      <Button title="Pilih Data" onPress={() => setOpen(true)} />
      <Select
        isOpen={open}
        value={selected}
        data={data}
        multiple={true}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        onSearch={(val) => console.log('Search:', val)}
        onRefresh={() => console.log('Refresh triggered')}
        required={true}
        loading={false}
      />
    </>
  );
};
```

## 🔧 Catatan

- Komponen ini membutuhkan komponen-komponen pendukung:  
  - `BottomSheet`
  - `Input`
  - `Button`
  - `Chip`
  - `Loading`
  - `Toast` (untuk validasi/error)

- Jika ingin menambahkan animasi shimmer saat loading, bisa modifikasi komponen `Loading`.

## ⚠️ Behavior Penting

- Jika `multiple={false}` dan `required={true}`, maka:
  - Item yang dipilih akan langsung dikirim ke `onSubmit`.
  - BottomSheet akan langsung tertutup tanpa menekan tombol submit.
- Jika `required={false}`, user bisa membatalkan pilihan (deselect), dan mengirim data kosong.
