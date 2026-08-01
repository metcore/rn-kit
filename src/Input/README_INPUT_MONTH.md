# InputMonth

Field bulan yang dibuka lewat `MonthPicker`. Bentuk dan alurnya mengikuti
`InputDate`: satu trigger (dua kalau `mode="range"`), tombol clear opsional,
dan sheet yang muncul saat trigger ditekan.

Yang dipilih hanya **bulan**, tanpa tahun — sama seperti `MonthPicker` yang
dibungkusnya. Kalau butuh bulan sekaligus tahun, pasangkan dengan
[`InputYear`](./README_INPUT_YEAR.md).

## Import

```jsx
import { InputMonth } from '@herca/rn-kit';
```

## Contoh Penggunaan

```jsx
const [month, setMonth] = useState<number>();

<InputMonth
  label="Bulan lahir"
  placeholder="Pilih bulan"
  value={month}
  hasClear
  onChange={({ value }) => setMonth(value ?? undefined)}
/>;
```

### Mode range

```jsx
const [range, setRange] = useState({ start: undefined, end: undefined });

<InputMonth
  mode="range"
  label="Periode"
  placeholder="Bulan mulai"
  placeholderEnd="Bulan selesai"
  value={range.start}
  valueEnd={range.end}
  onChange={({ startValue, endValue }) =>
    setRange({ start: startValue ?? undefined, end: endValue ?? undefined })
  }
/>;
```

### Bahasa

```jsx
<InputMonth label="Month" placeholder="Pick one" value={1} language="en" />
// menampilkan "January"; tanpa language menampilkan "Januari"
```

## Props

| Props            | Tipe                       | Wajib | Default    | Deskripsi                                                                                         |
| ---------------- | -------------------------- | ----- | ---------- | ------------------------------------------------------------------------------------------------- |
| `label`          | `string`                   | ❌     | -          | Teks label di atas trigger. Kalau kosong, elemen labelnya tidak dirender sama sekali.             |
| `placeholder`    | `string`                   | ✅     | -          | Teks trigger saat belum ada nilai.                                                                |
| `placeholderEnd` | `string`                   | ✅\*   | -          | Placeholder trigger kedua. Wajib dan hanya berlaku saat `mode="range"`.                           |
| `value`          | `number`                   | ❌     | -          | Nomor bulan, `1` (Januari) sampai `12` (Desember). Kalau diisi, ia menang atas pilihan internal. Di luar 1–12 dianggap kosong. |
| `valueEnd`       | `number`                   | ❌     | -          | Nomor bulan akhir, `1`–`12`. Hanya berlaku saat `mode="range"`.                                    |
| `mode`           | `'single' \| 'range'`      | ❌     | `'single'` | Satu bulan, atau rentang dua bulan.                                                               |
| `language`       | `'en' \| 'id'`             | ❌     | `'id'`     | Bahasa nama bulan yang ditampilkan.                                                               |
| `hasClear`       | `boolean`                  | ❌     | `false`    | Menampilkan tombol clear saat ada nilai.                                                          |
| `onChange`       | `(v: PickerFieldValue) => void` | ❌ | -          | Dipanggil saat pilihan dikonfirmasi atau dibersihkan.                                             |
| `onSelectClick`  | `() => void`               | ❌     | -          | Dipanggil saat trigger ditekan.                                                                   |
| `onPickerClose`  | `() => void`               | ❌     | -          | Dipanggil saat sheet ditutup.                                                                     |
| `title`          | `string`                   | ❌     | `'Pilih Bulan'` | Judul sheet, diteruskan ke `MonthPicker`.                                                    |
| `cancelLabel`    | `string`                   | ❌     | `'Batal'`  | Label tombol batal di sheet.                                                                      |
| `confirmLabel`   | `string`                   | ❌     | `'pilih'`  | Label tombol konfirmasi di sheet.                                                                 |
| `testID`         | `string`                   | ❌     | -          | ID untuk automation testing. Lihat tabel di bawah.                                                |

\* Wajib secara tipe hanya ketika `mode="range"`.

## Bentuk nilai

`onChange` selalu menerima bentuk yang sama, apa pun mode-nya:

```ts
interface PickerFieldValue {
  value: number | null; // terisi di mode single
  startValue: number | null; // terisi di mode range
  endValue: number | null; // terisi di mode range
}
```

Hanya satu sisi yang terisi, ditentukan `mode`. Saat dibersihkan, ketiganya
`null`.

**Bulan dihitung dari 1**, jadi Januari adalah `1` dan Desember `12` — baik
untuk prop `value` maupun untuk yang dilaporkan `onChange`. `MonthPicker` di
baliknya memakai indeks 0–11, tapi indeks itu tidak pernah bocor ke luar.

## testID turunan

| Suffix           | Elemen                                     |
| ---------------- | ------------------------------------------ |
| `-label`         | Label di atas trigger                      |
| `-trigger`       | Trigger utama                              |
| `-trigger-end`   | Trigger kedua (hanya `mode="range"`)       |
| `-clear`         | Tombol clear (hanya saat ada nilai)        |
| `-sheet`         | `BottomSheet` milik `MonthPicker`          |
| `-option-{i}`    | Opsi bulan di sheet, memakai indeks 0–11 milik `MonthPicker` |
| `-confirm`       | Tombol konfirmasi di sheet                 |
| `-cancel`        | Tombol batal di sheet                      |

`testID` diteruskan mentah ke `MonthPicker`, jadi id sheet dan opsinya
diturunkan dari basis yang sama — polanya sama seperti `InputDate` dengan
`DatePicker`.

## Teks statis

Semua teks bawaan sheet berbahasa Indonesia dan bisa diganti dari sini, jadi
tidak perlu menyentuh `MonthPicker` langsung:

```jsx
<InputMonth
  label="Month"
  placeholder="Pick a month"
  language="en"
  title="Choose a month"
  cancelLabel="Cancel"
  confirmLabel="Apply"
/>
```

`language` mengatur nama bulan; `title`, `cancelLabel` dan `confirmLabel`
mengatur teks statis sheet. Keduanya terpisah — mengubah `language` tidak ikut
menerjemahkan tombolnya.
