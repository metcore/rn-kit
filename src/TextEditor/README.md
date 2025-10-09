# TextEditor Component

Rich text editor component untuk React Native dengan toolbar formatting yang lengkap dan support untuk link, list, dan text alignment.

## Features

- ✅ Rich text formatting (Bold, Italic, Underline, Strikethrough)
- ✅ Insert dan edit hyperlinks
- ✅ Bullet dan numbered lists
- ✅ Text alignment (Left, Center, Right)
- ✅ Character counter dengan max length validation
- ✅ Custom placeholder
- ✅ WebView-based editor dengan contenteditable
- ✅ Toolbar otomatis muncul saat keyboard aktif
- ✅ Support iOS dan Android
- ✅ Imperative methods (getContent, setContent, clearContent)

## Installation

Pastikan dependencies berikut sudah terinstall:

```bash
npm install react-native-webview
# atau
yarn add react-native-webview
```

## Basic Usage

```tsx
import { TextEditor } from '@herca/rn-kit';

export default function MyScreen() {
  const handleChange = (html: string) => {
    console.log('Content:', html);
  };

  return (
    <TextEditor
      label="Deskripsi"
      placeholder="Tulis sesuatu di sini..."
      onChange={handleChange}
      maxLength={4000}
      height={300}
    />
  );
}
```

## Props

| Prop                      | Type                     | Default                      | Description                                  |
| ------------------------- | ------------------------ | ---------------------------- | -------------------------------------------- |
| `label`                   | `string`                 | -                            | Label yang ditampilkan di atas editor        |
| `height`                  | `number`                 | `300`                        | Tinggi editor dalam pixels                   |
| `initialValue`            | `string`                 | `''`                         | Konten HTML awal                             |
| `placeholder`             | `string`                 | `'Tulis sesuatu di sini...'` | Placeholder text                             |
| `maxLength`               | `number`                 | -                            | Maksimal karakter (dihitung tanpa HTML tags) |
| `hasError`                | `boolean`                | -                            | Menampilkan state error                      |
| `hint`                    | `string`                 | -                            | Hint text di bawah editor                    |
| `onChange`                | `(html: string) => void` | -                            | Callback saat konten berubah                 |
| `onFocus`                 | `() => void`             | -                            | Callback saat editor focus                   |
| `onBlur`                  | `() => void`             | -                            | Callback saat editor blur                    |
| `inputLabelLinkText`      | `string`                 | `'Teks Link'`                | Label untuk input teks link                  |
| `inputLabelLinkUrl`       | `string`                 | `'Link URL'`                 | Label untuk input URL link                   |
| `inputLinkTextPlacholder` | `string`                 | `'Link URL'`                 | Placeholder untuk input teks link            |
| `inputLinkUrlPlacholder`  | `string`                 | `'https://www.example.com'`  | Placeholder untuk input URL                  |
| `saveLinkButtonText`      | `string`                 | `'Simpan'`                   | Text tombol simpan link                      |
| `cancelLinkButtonText`    | `string`                 | `'Batal'`                    | Text tombol batal link                       |

## Advanced Usage

### Using Ref Methods

```tsx
import { useRef } from 'react';
import { TextEditor, TextEditorRef } from '@herca/rn-kit';

export default function MyScreen() {
  const editorRef = useRef<TextEditorRef>(null);

  const getContent = () => {
    editorRef.current?.getContent();
  };

  const setContent = () => {
    editorRef.current?.setContent('<p><strong>Bold text</strong></p>');
  };

  const clearContent = () => {
    editorRef.current?.clearContent();
  };

  return (
    <>
      <TextEditor
        ref={editorRef}
        label="Deskripsi"
        onChange={(html) => console.log(html)}
      />

      <Button title="Get Content" onPress={getContent} />
      <Button title="Set Content" onPress={setContent} />
      <Button title="Clear" onPress={clearContent} />
    </>
  );
}
```

### With Initial Value

```tsx
<TextEditor
  label="Edit Description"
  initialValue="<p>Konten awal dengan <strong>bold</strong> dan <em>italic</em></p>"
  onChange={handleChange}
/>
```

### With Max Length and Error State

```tsx
<TextEditor
  label="Bio"
  maxLength={500}
  hasError={error}
  hint={error ? 'Bio terlalu panjang' : 'Ceritakan tentang dirimu'}
  onChange={handleChange}
/>
```

### Custom Link Labels

```tsx
<TextEditor
  label="Content"
  inputLabelLinkText="Display Text"
  inputLabelLinkUrl="Web Address"
  inputLinkTextPlacholder="Enter text to display"
  inputLinkUrlPlacholder="https://example.com"
  saveLinkButtonText="Insert Link"
  cancelLinkButtonText="Cancel"
  onChange={handleChange}
/>
```

## Toolbar Commands

Editor menyediakan toolbar dengan commands berikut:

- **Bold** - Membuat teks tebal
- **Italic** - Membuat teks miring
- **Underline** - Membuat garis bawah
- **Strikethrough** - Membuat teks tercoret
- **Link** - Insert atau edit hyperlink
- **Bullet List** - Membuat unordered list
- **Numbered List** - Membuat ordered list
- **Align Left** - Align teks ke kiri
- **Align Center** - Align teks ke tengah
- **Align Right** - Align teks ke kanan

## Ref Methods

### `getContent()`

Mendapatkan konten HTML dari editor.

```tsx
editorRef.current?.getContent();
```

### `setContent(html: string)`

Set konten HTML ke editor.

```tsx
editorRef.current?.setContent('<p>New content</p>');
```

### `clearContent()`

Menghapus semua konten dari editor.

```tsx
editorRef.current?.clearContent();
```

## Important Notes

### Height Prop

- ⚠️ **Disarankan Jangan** ubah prop `height` secara dinamis saat keyboard muncul/hilang
- Gunakan fixed height atau hitung sekali di awal component
- Mengubah height akan menyebabkan WebView reload dan keyboard hilang

### Character Count

- Character count dihitung dari plain text (tanpa HTML tags)
- Jika `maxLength` diset, user tidak bisa mengetik lebih dari limit tersebut
- Counter akan berubah warna merah saat melebihi `maxLength`

### Link Insertion

- User bisa select text kemudian klik tombol link untuk menambahkan hyperlink
- Jika tidak ada text yang diselect, link text akan sama dengan URL
- Protocol `https://` akan otomatis ditambahkan jika tidak ada
- User bisa edit existing link dengan cara klik link tersebut dan tekan tombol link di toolbar

## Styling

Component menggunakan styling internal yang sudah optimal. Jika perlu custom styling, wrap component dengan View:

```tsx
<View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
  <TextEditor label="Content" />
</View>
```

## Platform-Specific Behavior

### iOS

- Menggunakan `KeyboardAvoidingView` dengan behavior `'padding'`
- Toolbar positioning disesuaikan dengan keyboard height
- `injectJavaScript` digunakan untuk commands

### Android

- `KeyboardAvoidingView` tanpa behavior khusus
- `postMessage` digunakan untuk commands
- Pastikan `android:windowSoftInputMode="adjustResize"` di AndroidManifest.xml

## Troubleshooting

### Keyboard Langsung Hilang

**Problem:** Keyboard hilang setelah muncul

**Solution:** Jangan ubah prop `height` secara dinamis. Gunakan fixed value.

### Content Tidak Ter-update

**Problem:** Perubahan konten tidak terdeteksi

**Solution:** Pastikan `onChange` callback di-implement dengan benar.

### Toolbar Tidak Muncul

**Problem:** Toolbar tidak tampil saat keyboard aktif

**Solution:** Pastikan component tidak di-wrap dengan View yang membatasi positioning absolute.

## Performance Tips

1. Gunakan `useCallback` untuk `onChange` handler jika parent component sering re-render
2. Jangan pass object atau array baru sebagai props setiap render
3. Untuk list besar, pertimbangkan lazy loading atau pagination
4. Batasi `maxLength` sesuai kebutuhan untuk performa optimal

## Dependencies

- `react-native-webview` - WebView component
- Internal components: `BottomSheet`, `Button`, `Icon`, `Input`, `LabelForm`, `Typography`
