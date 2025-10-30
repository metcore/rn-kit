# dateFormatter Function

Utility function untuk memformat objek Date ke berbagai format string dengan dukungan multi-bahasa dan kustomisasi tampilan.

## Import

```typescript
import { dateFormatter } from './function/dateFormatter';
```

## Signature

```typescript
dateFormatter({ date, options }: DateFormatterProps): string
```

## Parameters

### DateFormatterProps

| Parameter | Type                | Required | Deskripsi                                    |
| --------- | ------------------- | -------- | -------------------------------------------- |
| `date`    | `Date \| DateProps` | ✅ Yes   | Objek Date atau DateProps yang akan diformat |
| `options` | `Object`            | ❌ No    | Opsi konfigurasi untuk formatting            |

### Options Object

| Property      | Type                                                      | Default     | Deskripsi                                                      |
| ------------- | --------------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| `useTime`     | `boolean`                                                 | `false`     | Menambahkan waktu (jam:menit:detik) ke output                  |
| `useWeekDay`  | `boolean`                                                 | `false`     | Menambahkan nama hari ke output (hanya untuk format localized) |
| `monthFormat` | `'numeric' \| '2-digit' \| 'long' \| 'short' \| 'narrow'` | `'long'`    | Format tampilan bulan (hanya untuk format localized)           |
| `language`    | `'en' \| 'id'`                                            | `'en'`      | Bahasa untuk format localized                                  |
| `format`      | `'default' \| 'iso' \| 'localized'`                       | `'default'` | Tipe format output                                             |

## Format Types

### 1. Default Format

Format: `YYYY-MM-DD`

```typescript
dateFormatter({
  date: new Date('2024-03-15'),
});
// Output: "2024-03-15"
```

### 2. ISO Format

Format: `YYYY-MM-DD` atau `YYYY-MM-DD HH:mm:ss` (jika useTime: true)

```typescript
dateFormatter({
  date: new Date('2024-03-15T14:30:45'),
  options: { format: 'iso' },
});
// Output: "2024-03-15"

dateFormatter({
  date: new Date('2024-03-15T14:30:45'),
  options: { format: 'iso', useTime: true },
});
// Output: "2024-03-15 14:30:45"
```

### 3. Localized Format

Format berdasarkan locale dengan dukungan bahasa.

**Bahasa Indonesia:**

```typescript
dateFormatter({
  date: new Date('2024-03-15'),
  options: { format: 'localized', language: 'id' },
});
// Output: "15 Maret 2024"
```

**Bahasa Inggris:**

```typescript
dateFormatter({
  date: new Date('2024-03-15'),
  options: { format: 'localized', language: 'en' },
});
// Output: "15 March 2024"
```

## Contoh Penggunaan

### Basic Usage

```typescript
// Format default
const formatted = dateFormatter({
  date: new Date('2024-12-25'),
});
console.log(formatted); // "2024-12-25"
```

### Dengan Waktu

```typescript
// ISO format dengan waktu
const withTime = dateFormatter({
  date: new Date('2024-12-25T15:30:00'),
  options: {
    format: 'iso',
    useTime: true,
  },
});
console.log(withTime); // "2024-12-25 15:30:00"
```

### Format Localized Indonesia

```typescript
// Tanggal lengkap bahasa Indonesia
const indonesian = dateFormatter({
  date: new Date('2024-12-25'),
  options: {
    format: 'localized',
    language: 'id',
  },
});
console.log(indonesian); // "25 Desember 2024"
```

### Dengan Nama Hari

```typescript
// Dengan nama hari (bahasa Indonesia)
const withWeekday = dateFormatter({
  date: new Date('2024-12-25'),
  options: {
    format: 'localized',
    language: 'id',
    useWeekDay: true,
  },
});
console.log(withWeekday); // "Rabu, 25 Desember 2024"

// Dengan nama hari (bahasa Inggris)
const withWeekdayEn = dateFormatter({
  date: new Date('2024-12-25'),
  options: {
    format: 'localized',
    language: 'en',
    useWeekDay: true,
  },
});
console.log(withWeekdayEn); // "Wednesday, 25 December 2024"
```

### Custom Month Format

```typescript
// Bulan dalam format singkat
const shortMonth = dateFormatter({
  date: new Date('2024-12-25'),
  options: {
    format: 'localized',
    language: 'id',
    monthFormat: 'short',
  },
});
console.log(shortMonth); // "25 Des 2024"

// Bulan dalam format numerik
const numericMonth = dateFormatter({
  date: new Date('2024-12-25'),
  options: {
    format: 'localized',
    language: 'id',
    monthFormat: 'numeric',
  },
});
console.log(numericMonth); // "25/12/2024"
```

### Tanggal dan Waktu Lengkap

```typescript
// Format lengkap dengan hari dan waktu
const fullDateTime = dateFormatter({
  date: new Date('2024-12-25T15:30:00'),
  options: {
    format: 'localized',
    language: 'id',
    useWeekDay: true,
    useTime: true,
  },
});
console.log(fullDateTime); // "Rabu, 25 Desember 2024 - 15:30"
```

### Handling Invalid Dates

```typescript
// Date tidak valid
const invalid1 = dateFormatter({ date: null });
console.log(invalid1); // ""

const invalid2 = dateFormatter({ date: new Date('invalid') });
console.log(invalid2); // ""

const invalid3 = dateFormatter({ date: undefined });
console.log(invalid3); // ""
```

## Use Cases

### 1. Display Tanggal di UI

```typescript
function DateDisplay({ date }: { date: Date }) {
  const formattedDate = dateFormatter({
    date,
    options: {
      format: 'localized',
      language: 'id'
    }
  });

  return <Text>{formattedDate}</Text>;
}
```

### 2. Format untuk API Request

```typescript
function submitBooking(date: Date) {
  const isoDate = dateFormatter({
    date,
    options: { format: 'iso' },
  });

  api.post('/bookings', { date: isoDate });
}
```

### 3. Log dengan Timestamp

```typescript
function logEvent(message: string) {
  const timestamp = dateFormatter({
    date: new Date(),
    options: {
      format: 'iso',
      useTime: true,
    },
  });

  console.log(`[${timestamp}] ${message}`);
}
```

### 4. Multi-language Support

```typescript
function DatePicker({ language }: { language: 'en' | 'id' }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const displayDate = dateFormatter({
    date: selectedDate,
    options: {
      format: 'localized',
      language,
      useWeekDay: true
    }
  });

  return <Text>{displayDate}</Text>;
}
```

## Output Examples

### Default Format

```
2024-03-15
```

### ISO Format

```
2024-03-15
2024-03-15 14:30:45 (with time)
```

### Localized Format (Indonesian)

```
15 Maret 2024
Jumat, 15 Maret 2024 (with weekday)
15 Maret 2024 - 14:30 (with time)
Jumat, 15 Maret 2024 - 14:30 (full)
```

### Localized Format (English)

```
15 March 2024
Friday, 15 March 2024 (with weekday)
15 March 2024 - 14:30 (with time)
Friday, 15 March 2024 - 14:30 (full)
```

## Return Values

| Kondisi                      | Return Value                    |
| ---------------------------- | ------------------------------- |
| Date valid                   | String terformat sesuai options |
| Date `null` atau `undefined` | Empty string `""`               |
| Date invalid                 | Empty string `""`               |

## Fitur

- ✅ Support multiple format types (default, ISO, localized)
- ✅ Multi-language support (English & Indonesian)
- ✅ Optional time inclusion
- ✅ Optional weekday display
- ✅ Customizable month format
- ✅ Graceful error handling untuk invalid dates
- ✅ TypeScript support dengan type definitions
- ✅ Zero-padded values untuk konsistensi
- ✅ 24-hour time format

## Technical Details

### Time Formatting

- Waktu menggunakan format 24-jam (HH:mm:ss untuk ISO, HH:mm untuk localized)
- Separator waktu: `:` untuk semua format
- Separator antara tanggal dan waktu (localized): `-`

### Locale Mapping

- `language: 'id'` → `id-ID` locale
- `language: 'en'` → `en-GB` locale (British English format)

### Month Format Options

Sesuai dengan `Intl.DateTimeFormatOptions['month']`:

- `'numeric'`: 3
- `'2-digit'`: 03
- `'long'`: March / Maret
- `'short'`: Mar / Mar
- `'narrow'`: M

## Best Practices

1. **Selalu handle empty/invalid dates** - Function mengembalikan empty string untuk input invalid
2. **Gunakan format yang sesuai konteks**:
   - `default` atau `iso` untuk data processing/API
   - `localized` untuk user-facing display
3. **Konsisten dengan language setting** aplikasi
4. **Cache formatted values** jika digunakan berulang kali
5. **Validate date objects** sebelum formatting jika memungkinkan

## TypeScript

Function ini fully typed dengan interface:

```typescript
interface DateFormatterProps {
  date: Date | DateProps;
  options?: {
    useTime?: boolean;
    useWeekDay?: boolean;
    monthFormat?: Intl.DateTimeFormatOptions['month'];
    language?: 'en' | 'id';
    format?: 'default' | 'iso' | 'localized';
  };
}
```

## Dependencies

- `Intl.DateTimeFormat` - Native JavaScript API untuk formatting tanggal
- Tidak memerlukan library eksternal

## Browser/Platform Support

Function ini menggunakan `Intl.DateTimeFormat` yang didukung oleh:

- ✅ Semua browser modern
- ✅ React Native (dengan polyfill jika diperlukan)
- ✅ Node.js

## License

MIT
