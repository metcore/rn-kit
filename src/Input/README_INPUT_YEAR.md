# InputYear

Field tahun yang dibuka lewat `YearPicker`. Kembarannya
[`InputMonth`](./README_INPUT_MONTH.md) — bentuk, prop, dan bentuk nilainya
sama persis.

Tidak ada prop `language`: tahun berupa angka, dan tidak ada yang berubah
antar-locale.

## Import

```jsx
import { InputYear } from '@herca/rn-kit';
```

## Contoh Penggunaan

```jsx
const [year, setYear] = useState<number>();

<InputYear
  label="Tahun masuk"
  placeholder="Pilih tahun"
  value={year}
  hasClear
  onChange={({ value }) => setYear(value ?? undefined)}
/>;
```

### Mode range

```jsx
<InputYear
  mode="range"
  label="Periode"
  placeholder="Tahun mulai"
  placeholderEnd="Tahun selesai"
  onChange={({ startValue, endValue }) => console.log(startValue, endValue)}
/>
```

### Bersama InputMonth

`MonthPicker` tidak membawa tahun, jadi bulan-dan-tahun disusun dari dua field:

```jsx
<InputMonth label="Bulan" placeholder="Pilih bulan" onChange={onMonthChange} />
<InputYear label="Tahun" placeholder="Pilih tahun" onChange={onYearChange} />
```

## Props

| Props            | Tipe                            | Wajib | Default    | Deskripsi                                                                    |
| ---------------- | ------------------------------- | ----- | ---------- | ----------------------------------------------------------------------------- |
| `label`          | `string`                        | ❌     | -          | Teks label di atas trigger. Kalau kosong, elemen labelnya tidak dirender.    |
| `placeholder`    | `string`                        | ✅     | -          | Teks trigger saat belum ada nilai.                                           |
| `placeholderEnd` | `string`                        | ✅\*   | -          | Placeholder trigger kedua. Wajib dan hanya berlaku saat `mode="range"`.      |
| `value`          | `number`                        | ❌     | -          | Tahun penuh, mis. `2024`. Kalau diisi, ia menang atas pilihan internal.      |
| `valueEnd`       | `number`                        | ❌     | -          | Tahun akhir. Hanya berlaku saat `mode="range"`.                              |
| `mode`           | `'single' \| 'range'`           | ❌     | `'single'` | Satu tahun, atau rentang dua tahun.                                          |
| `hasClear`       | `boolean`                       | ❌     | `false`    | Menampilkan tombol clear saat ada nilai.                                     |
| `onChange`       | `(v: PickerFieldValue) => void` | ❌     | -          | Dipanggil saat pilihan dikonfirmasi atau dibersihkan.                        |
| `onSelectClick`  | `() => void`                    | ❌     | -          | Dipanggil saat trigger ditekan.                                              |
| `onPickerClose`  | `() => void`                    | ❌     | -          | Dipanggil saat sheet ditutup.                                                |
| `title`          | `string`                        | ❌     | `'Pilih Tahun'` | Judul sheet, diteruskan ke `YearPicker`.                                |
| `cancelLabel`    | `string`                        | ❌     | `'Batal'`  | Label tombol batal di sheet.                                                 |
| `confirmLabel`   | `string`                        | ❌     | `'Pilih'`  | Label tombol konfirmasi di sheet.                                            |
| `testID`         | `string`                        | ❌     | -          | ID untuk automation testing. Suffix-nya sama dengan `InputMonth`.            |

\* Wajib secara tipe hanya ketika `mode="range"`.

## Bentuk nilai

Sama dengan `InputMonth`:

```ts
interface PickerFieldValue {
  value: number | null; // terisi di mode single
  startValue: number | null; // terisi di mode range
  endValue: number | null; // terisi di mode range
}
```

## Rentang tahun

`YearPicker` menampilkan 121 tahun: 60 tahun sebelum sampai 60 tahun sesudah
tahun berjalan. Rentang itu belum bisa diatur lewat prop.

## testID turunan

| Suffix         | Elemen                               |
| -------------- | ------------------------------------ |
| `-label`       | Label di atas trigger                |
| `-trigger`     | Trigger utama                        |
| `-trigger-end` | Trigger kedua (hanya `mode="range"`) |
| `-clear`       | Tombol clear (hanya saat ada nilai)  |
| `-sheet`       | `BottomSheet` milik `YearPicker`     |
| `-option-{th}` | Opsi tahun, mis. `-option-2024`      |
| `-confirm`     | Tombol konfirmasi di sheet           |
| `-cancel`      | Tombol batal di sheet                |

## Teks statis

Semua teks bawaan sheet berbahasa Indonesia dan bisa diganti dari sini, jadi
tidak perlu menyentuh `YearPicker` langsung:

```jsx
<InputYear
  label="Year"
  placeholder="Pick a year"
  title="Choose a year"
  cancelLabel="Cancel"
  confirmLabel="Apply"
/>
```
