# InputDate Component

Komponen React Native untuk input tanggal dengan dukungan mode single date dan date range. Terintegrasi dengan DatePicker dari `@herca/rn-kit` dan menyediakan UI yang user-friendly untuk pemilihan tanggal.

## Penggunaan Dasar

### Single Date Mode

```jsx
import InputDate from './InputDate';

function MyForm() {
  const [date, setDate] = useState('');

  return (
    <InputDate
      label="Tanggal Lahir"
      placeholder="Pilih tanggal"
      value={date}
      onDateChange={(val) => setDate(val.date)}
    />
  );
}
```

### Date Range Mode

```jsx
import InputDate from './InputDate';

function MyForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <InputDate
      mode="range"
      label="Periode"
      placeholder="Tanggal mulai"
      placeholderDateEnd="Tanggal selesai"
      value={startDate}
      valueDateEnd={endDate}
      onDateChange={(val) => {
        setStartDate(val.startDate);
        setEndDate(val.endDate);
      }}
    />
  );
}
```

## Props

### Base Props

| Prop                | Type                              | Default            | Deskripsi                                          |
| ------------------- | --------------------------------- | ------------------ | -------------------------------------------------- |
| `label`             | `string`                          | **Required**       | Label yang ditampilkan di atas input               |
| `placeholder`       | `string`                          | `"Select here..."` | Placeholder untuk tanggal pertama/single           |
| `value`             | `string`                          | `undefined`        | Nilai tanggal terpilih (formatted)                 |
| `valueDateEnd`      | `string`                          | `undefined`        | Nilai tanggal akhir untuk mode range (formatted)   |
| `datePickerProps`   | `DatePickerPropsWithoutOnChange`  | `undefined`        | Props tambahan untuk DatePicker (kecuali onChange) |
| `onSelectClick`     | `() => void`                      | `undefined`        | Callback ketika input diklik                       |
| `onDatePickerClose` | `() => void`                      | `undefined`        | Callback ketika DatePicker ditutup                 |
| `onDateChange`      | `(value: DateRangeProps) => void` | `undefined`        | Callback ketika tanggal berubah                    |
| `mode`              | `'single' \| 'range'`             | `'single'`         | Mode pemilihan tanggal                             |
| `language`          | `'en' \| 'id'`                    | `undefined`        | Bahasa untuk format tanggal                        |

### Single Mode Specific Props

Ketika `mode` tidak diset atau `mode="single"`:

| Prop                 | Type    | Deskripsi                     |
| -------------------- | ------- | ----------------------------- |
| `placeholderDateEnd` | `never` | Tidak tersedia di single mode |

### Range Mode Specific Props

Ketika `mode="range"`:

| Prop                 | Type     | Deskripsi                                      |
| -------------------- | -------- | ---------------------------------------------- |
| `placeholderDateEnd` | `string` | **Required** - Placeholder untuk tanggal akhir |

## Return Value dari onDateChange

Callback `onDateChange` menerima objek dengan struktur:

```typescript
{
  date: string | null; // Untuk single mode
  startDate: string | null; // Untuk range mode (tanggal mulai)
  endDate: string | null; // Untuk range mode (tanggal selesai)
}
```

## Contoh Penggunaan

### Single Date dengan Language

```jsx
<InputDate
  label="Select Date"
  placeholder="Choose a date"
  mode="single"
  language="id"
  onDateChange={(val) => console.log(val.date)}
/>
```

### Date Range dengan Controlled Values

```jsx
function BookingForm() {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  return (
    <InputDate
      mode="range"
      label="Periode Booking"
      placeholder="Check-in"
      placeholderDateEnd="Check-out"
      value={dateRange.start}
      valueDateEnd={dateRange.end}
      onDateChange={(val) => {
        setDateRange({
          start: val.startDate || '',
          end: val.endDate || '',
        });
      }}
    />
  );
}
```

### Dengan Custom DatePicker Props

```jsx
<InputDate
  label="Tanggal Lahir"
  placeholder="Pilih tanggal"
  datePickerProps={{
    minDate: new Date('1900-01-01'),
    maxDate: new Date(),
    value: { date: new Date() },
  }}
  onDateChange={(val) => console.log(val)}
/>
```

### Dengan Event Callbacks

```jsx
<InputDate
  label="Appointment Date"
  placeholder="Select date"
  onSelectClick={() => console.log('Picker opened')}
  onDatePickerClose={() => console.log('Picker closed')}
  onDateChange={(val) => {
    console.log('Date changed:', val);
  }}
/>
```

### English Language Format

```jsx
<InputDate
  label="Birth Date"
  placeholder="Select date"
  language="en"
  onDateChange={(val) => console.log(val.date)}
/>
```

### Indonesian Language Format

```jsx
<InputDate
  label="Tanggal Lahir"
  placeholder="Pilih tanggal"
  language="id"
  onDateChange={(val) => console.log(val.date)}
/>
```

## Fitur

- ✅ Dua mode: Single date dan Date range
- ✅ Support multi-bahasa (English & Indonesian)
- ✅ Controlled component dengan value props
- ✅ Auto-formatting tanggal berdasarkan bahasa
- ✅ Visual feedback untuk nilai yang sudah dipilih
- ✅ Terintegrasi dengan DatePicker dari @herca/rn-kit
- ✅ TypeScript support dengan discriminated unions untuk type safety
- ✅ Customizable melalui datePickerProps
- ✅ Event callbacks untuk lifecycle DatePicker

## Styling

Komponen menggunakan styling internal dengan karakteristik:

- Border color berubah ke `primary[300]` ketika ada nilai terpilih
- Layout responsive dengan flexbox
- Gap 8px antara input start date dan end date (mode range)
- Border radius 8px dengan padding yang konsisten
- Typography menggunakan variant `t2` dari @herca/rn-kit

## State Management Internal

Komponen mengelola beberapa state internal:

- `isDatePickerOpen`: Status buka/tutup DatePicker
- `dateValue`: Nilai tanggal yang sudah diformat
- `raw`: Nilai tanggal raw dari DatePicker

State internal ini memungkinkan komponen bekerja baik sebagai controlled maupun uncontrolled component.

## TypeScript

Komponen menggunakan discriminated unions untuk type safety antara single dan range mode:

```typescript
type SingleModeProps = BaseProps & {
  mode?: 'single';
  placeholderDateEnd?: never;
};

type RangeModeProps = BaseProps & {
  mode: 'range';
  placeholderDateEnd: string;
};

export type Props = SingleModeProps | RangeModeProps;
```

Ini memastikan `placeholderDateEnd` hanya required ketika `mode="range"`.

## Dependencies

- `@herca/rn-kit` - Untuk komponen DatePicker, Icon, Typography, dan Color
- `react-native` - Core components (View, Pressable, StyleSheet)

## Best Practices

1. **Selalu provide label yang jelas** untuk accessibility
2. **Gunakan language prop** untuk konsistensi format tanggal di aplikasi
3. **Handle onDateChange** untuk update state parent component
4. **Gunakan controlled values** untuk form validation
5. **Provide meaningful placeholders** yang menjelaskan expected input

## Catatan

- Props tambahan akan diteruskan ke Pressable trigger
- Nilai yang dikembalikan via `onDateChange` selalu dalam format yang sudah diproses menggunakan `dateFormatter`
- Raw value dari DatePicker tetap tersimpan untuk keperluan internal
- Komponen dapat bekerja sebagai controlled maupun uncontrolled component
- Border color otomatis berubah ketika ada nilai terpilih untuk visual feedback

## License

MIT
