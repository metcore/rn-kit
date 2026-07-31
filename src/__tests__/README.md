# Konvensi test rn-kit

Runner: Jest 30 + `@testing-library/react-native`. Semua test tinggal di folder
ini, bukan bersebelahan dengan source.

```
yarn test              # semua suite
yarn test Button       # satu file
```

## Bar minimum per komponen

Tiap file test menutup empat hal berikut. Komponen presentasional (Badge,
Avatar, Skeleton) memang tidak punya callback — lewati poin 2, jangan
dipaksakan.

1. **Render** — elemen wajib muncul dengan prop minimum.
2. **Callback** — satu test per callback publik, dibuktikan lewat `fireEvent`.
   Pakai `toHaveBeenCalledWith` kalau argumennya bermakna, bukan sekadar
   `toHaveBeenCalled`.
3. **Prop utama** — variasi prop terpenting terlihat efeknya di output
   (varian, `disabled`, error, value).
4. **testID** — tiap suffix yang diturunkan komponen di-assert, plus kasus
   `testID` dihilangkan → `queryByTestId('undefined-*')` bernilai null.

## Aturan anti-test-bohong

**Test negatif harus membuktikan aksinya benar-benar terjadi.** Assert null
saja bisa lolos hanya karena tidak ada yang bergerak. Buktikan dulu:

```tsx
fireEvent.press(getByText('Choose File'));

// Tanpa baris ini, dua assert di bawah bisa hijau walau sheet-nya tidak pernah
// terbuka -- lolos vakum, bukan bukti getTestID mengembalikan undefined.
expect(getByText('Upload Dokumen')).toBeTruthy();
expect(queryByTestId('undefined-sheet')).toBeNull();
```

**Test yang langsung hijau begitu ditulis** berarti menguji perilaku yang sudah
ada. Sah sebagai regression guard, tapi jangan diklaim sebagai coverage baru.
Untuk perilaku baru, lihat dulu test-nya merah sebelum menulis implementasi.

**Ragu sebuah test benar-benar menggigit?** Rusak sumbernya sebentar, pastikan
test merah, lalu kembalikan.

## testID

Diturunkan lewat `getTestID` dari `src/helpers/getTestID.ts` — jangan rangkai
string sendiri. Helper ini mengembalikan `undefined` kalau base-nya falsy,
sehingga tidak ada `testID` kosong yang ikut ter-render.

```tsx
testID={getTestID(testID, 'trigger')}   // 'email-trigger', atau undefined
```

Elemen akar memakai `testID` mentah tanpa suffix.

## Helper

- `helpers/render.tsx` — `renderWithProviders` membungkus `ToastProvider`.
  Wajib untuk komponen yang memanggil `useToast`, langsung maupun lewat anak
  (mis. `InputSelect`), karena `useToast` melempar error di luar provider.

`testMatch` sengaja dipersempit ke `*.test.*` supaya file helper di folder ini
tidak ikut dianggap suite.

## Mock paket native

Ada di `__mocks__/` pada root repo, bukan di dalam test. Jest memakainya
otomatis untuk paket `node_modules` — **tidak perlu** memanggil `jest.mock`.
Tersedia untuk `react-native-pdf`, `react-native-webview`, dan
`react-native-signature-canvas`.

`jest.mock` inline tetap dipakai kalau mocknya khusus satu test — lihat
`InputFile.test.tsx` yang menstub picker dokumen dan blob util.

## Timer

`jest.setup.js` memasang fake timers global lewat `beforeEach`. Preset jest
bawaan react-native mem-polyfill `requestAnimationFrame` sebagai
`setTimeout(cb, 0)` dan menutup animasi lewat `setTimeout(endCallback, 16)`.
Komponen ber-`Animated` (semua turunan `BottomSheet`) terus menjadwalkan ulang
timer melewati unmount — tanpa fake timers, callback-nya menyala setelah
environment dibongkar dan melempar `ReferenceError`.

**Jangan tambahkan `afterEach(() => jest.useRealTimers())`.** Hook di setup
file terdaftar **sebelum** auto-cleanup milik RNTL, dan hook selevel jalan
sesuai urutan pendaftaran — bukan terbalik. Jadi `useRealTimers` akan mendarat
sebelum RNTL meng-unmount, lalu unmount-nya menjadwalkan timer asli yang
berumur lebih panjang dari environment. Sudah diverifikasi: menambahkannya
kembali memunculkan tepat satu error "torn down" di `BottomSheet.test.tsx`.

Kalau sebuah test perlu menuntaskan animasi, majukan waktunya sendiri:

```tsx
act(() => {
  jest.advanceTimersByTime(500);
});
```
