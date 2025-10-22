# InputSelect Component

Komponen dropdown/select yang fleksibel dengan dukungan modal, badge, subtitle, dan clear button. Dapat digunakan untuk single atau multiple selection dengan berbagai customization.

## Instalasi

```bash
npm install @herca/rn-kit
```

## Import

```tsx
import InputSelect from '@/components/InputSelect';
```

## Penggunaan Dasar

```tsx
import { useState } from 'react';
import InputSelect from '@/components/InputSelect';

export default function Example() {
  const [selected, setSelected] = useState('');

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <InputSelect
      label="Pilih Opsi"
      placeholder="Silakan pilih..."
      value={selected}
      options={options}
      selectProps={{
        onSubmit: (val) => setSelected(val[0]?.value),
      }}
    />
  );
}
```

## Props

### Required Props

| Prop    | Type     | Deskripsi                |
| ------- | -------- | ------------------------ |
| `label` | `string` | Label untuk input select |

### Optional Props

| Prop            | Type                                | Default            | Deskripsi                                            |
| --------------- | ----------------------------------- | ------------------ | ---------------------------------------------------- |
| `placeholder`   | `string`                            | `'Select here...'` | Teks placeholder ketika tidak ada nilai yang dipilih |
| `options`       | `ChipOptionProps[]`                 | `undefined`        | Daftar opsi yang dapat dipilih                       |
| `value`         | `string`                            | `undefined`        | Nilai yang dipilih saat ini                          |
| `selectProps`   | `SelectPropsWithoutData`            | `undefined`        | Props tambahan untuk komponen Select                 |
| `icon`          | `IconNameProps`                     | `undefined`        | Nama icon yang ditampilkan di sebelah kiri           |
| `iconColor`     | `string`                            | `undefined`        | Warna icon sebelah kiri                              |
| `hasError`      | `boolean`                           | `false`            | Menampilkan state error dengan border merah          |
| `hint`          | `string`                            | `undefined`        | Teks hint/bantuan di bawah input                     |
| `onClear`       | `() => void`                        | `undefined`        | Callback ketika tombol clear ditekan                 |
| `onSelectClick` | `() => void`                        | `undefined`        | Callback ketika input ditekan                        |
| `onSelectClose` | `() => void`                        | `undefined`        | Callback ketika modal ditutup                        |
| `subtitle`      | `string`                            | `undefined`        | Subtitle tambahan di bawah value                     |
| `badge`         | `{ value: string; color: Variant }` | `undefined`        | Badge yang ditampilkan di samping value              |
| `useModal`      | `boolean`                           | `true`             | Gunakan modal untuk menampilkan opsi                 |

### Pressable Props

Komponen ini extends dari `Pressable`, sehingga menerima semua props dari `React.ComponentProps<typeof Pressable>`:

```tsx
<InputSelect
  label="Select"
  disabled={false}
  onLongPress={() => console.log('long press')}
  // ... props lainnya
/>
```

## Contoh Penggunaan

### Dengan Badge

```tsx
<InputSelect
  label="Status Pembayaran"
  value="paid"
  badge={{
    value: 'Lunas',
    color: 'success',
  }}
  options={[
    { label: 'Dibayar', value: 'paid' },
    { label: 'Tertunda', value: 'pending' },
    { label: 'Ditolak', value: 'rejected' },
  ]}
  selectProps={{
    onSubmit: (val) => console.log(val),
  }}
/>
```

### Dengan Error State

```tsx
<InputSelect
  label="Email Provider"
  hasError={true}
  hint="Pilih email provider yang valid"
  placeholder="Contoh: Gmail, Outlook"
  options={[
    { label: 'Gmail', value: 'gmail' },
    { label: 'Outlook', value: 'outlook' },
  ]}
/>
```

### Dengan Icon dan Subtitle

```tsx
<InputSelect
  label="Lokasi Kerja"
  icon="MapPin"
  iconColor="#0066CC"
  value="jakarta"
  subtitle="Kantor Pusat"
  options={[
    { label: 'Jakarta', value: 'jakarta', icon: 'MapPin' },
    { label: 'Surabaya', value: 'surabaya', icon: 'MapPin' },
  ]}
/>
```

### Dengan Clear Button

```tsx
<InputSelect
  label="Kategori"
  value={category}
  onClear={() => setCategory('')}
  options={categoryOptions}
  selectProps={{
    onSubmit: (val) => setCategory(val[0]?.value),
  }}
/>
```

### Menggunakan Select Props untuk Advanced Config

```tsx
<InputSelect
  label="Multiple Selection"
  options={options}
  selectProps={{
    multiple: true,
    required: true,
    loading: false,
    delaySearch: 300,
    onSearch: (query) => console.log('Search:', query),
    onRefresh: () => fetchOptions(),
  }}
/>
```

### Tanpa Modal (Arrow Right)

```tsx
<InputSelect
  label="Navigasi ke Detail"
  useModal={false}
  value="selected-item"
  onSelectClick={() => navigation.navigate('DetailScreen')}
/>
```

## State Management

Komponen ini menggunakan internal state untuk mengelola nilai. Untuk kontrol penuh dari parent component:

```tsx
import { useState } from 'react';

export default function Form() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (val) => {
    setSelectedValue(val[0]?.value || '');
  };

  return (
    <InputSelect
      label="Pilih Item"
      value={selectedValue}
      options={options}
      selectProps={{
        onSubmit: handleSelectChange,
      }}
    />
  );
}
```

## Styling & Customization

### Custom Border Color

```tsx
<InputSelect
  label="Custom Style"
  hasError={true} // Border merah
  value="selected"
  // atau
  value="selected" // Border biru
/>
```

### Custom Spacing

Komponen menggunakan spacing dari style config:

- Gap antar elements: `spacing.gap[4]`
- Padding: `paddingVertical: 10, paddingHorizontal: 12`
- Border radius: `borderRadius: 8`

Untuk override, gunakan prop `style` dari Pressable:

```tsx
<InputSelect label="Custom" style={{ paddingHorizontal: 16 }} />
```

## TypeScript

```tsx
import InputSelect from '@/components/InputSelect';
import type { ChipOptionProps } from '@herca/rn-kit';

const options: ChipOptionProps[] = [
  { label: 'Opsi 1', value: '1' },
  { label: 'Opsi 2', value: '2' },
];

<InputSelect
  label="Type Safe"
  options={options}
  value="1"
  selectProps={{
    multiple: false,
  }}
/>;
```

## Event Callbacks

### onSelectClick

Dipanggil ketika user menekan input (hanya jika `useModal = true`):

```tsx
<InputSelect
  label="Select"
  onSelectClick={() => {
    console.log('Modal akan dibuka');
  }}
/>
```

### onSelectClose

Dipanggil ketika modal ditutup:

```tsx
<InputSelect
  label="Select"
  onSelectClose={() => {
    console.log('Modal ditutup');
  }}
/>
```

### onClear

Dipanggil ketika user menekan tombol clear:

```tsx
<InputSelect
  label="Select"
  onClear={() => {
    console.log('Nilai di-clear');
  }}
/>
```

## Best Practices

1. **Selalu berikan label yang deskriptif**

   ```tsx
   <InputSelect label="Pilih Departemen" /> ✅
   <InputSelect label="Item" /> ❌
   ```

2. **Gunakan hint untuk memberikan konteks tambahan**

   ```tsx
   <InputSelect
     label="Role"
     hint="Pilih role yang sesuai dengan fungsi pengguna"
   />
   ```

3. **Validasi dan tampilkan error state**

   ```tsx
   <InputSelect
     label="Email"
     hasError={!isValid}
     hint={!isValid ? 'Email harus dipilih' : undefined}
   />
   ```

4. **Untuk multiple selection, gunakan selectProps.multiple**

   ```tsx
   <InputSelect label="Tags" selectProps={{ multiple: true }} />
   ```

5. **Manfaatkan subtitle untuk informasi sekunder**
   ```tsx
   <InputSelect label="Cabang" value="jakarta-pusat" subtitle="Kantor Pusat" />
   ```

## Accessibility

- Label selalu ditampilkan untuk clarity
- Error state ditunjukkan dengan visual feedback (border merah) dan text hint
- Icon dan button memiliki ukuran yang cukup untuk touch targets
- Color contrast mengikuti WCAG guidelines

## Troubleshooting

### Modal tidak membuka

```tsx
// Pastikan useModal = true (default)
<InputSelect useModal={true} />

// Atau jika ingin custom behavior
<InputSelect
  useModal={false}
  onSelectClick={() => {
    // Handle custom behavior
  }}
/>
```

### Value tidak update

```tsx
// Pastikan meng-update melalui selectProps.onSubmit
selectProps={{
  onSubmit: (val) => {
    // Update state parent
    setSelectedValue(val[0]?.value);
  }
}}
```

### Clear button tidak muncul

```tsx
// Clear button hanya muncul jika:
// 1. onClear prop ada
// 2. value tidak kosong
<InputSelect value="selected" onClear={() => setSelected('')} />
```

## Related Components

- [`Select`](./Select.md) - Base select component dengan modal
- [`Chip`](./Chip.md) - Komponen untuk menampilkan options
- [`Badge`](./Badge.md) - Komponen untuk menampilkan badge
- [`Input`](./Input.md) - Text input component

## License

MIT
