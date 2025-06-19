# 📦 Konstanta: Color
Konstanta Color berisi daftar token warna yang digunakan untuk styling antarmuka aplikasi menggunakan React Native. Warna-warna ini disusun berdasarkan tema dan gradasi, cocok digunakan bersama desain sistem seperti Design Token.

## 🎨 Struktur Warna
✅ Base
Warna dasar utama:

white100: putih solid

white60: putih transparan 60%

black100: hitam solid

black60: hitam transparan 60%

### ⚪ Gray (abu-abu)
Gradasi abu-abu dari terang (gray.50) hingga gelap (gray.950), cocok untuk teks, latar, border, dsb.

### 🔵 Primary
Gradasi warna utama (biru), digunakan untuk tombol, highlight, atau elemen penting lainnya.

### 🟠 Warning
Warna peringatan, digunakan untuk menandai hal-hal seperti alert, notifikasi kuning, dll.

### 🔴 Danger
Warna untuk kondisi berbahaya atau error (merah).

### 🟢 Success
Digunakan untuk kondisi berhasil atau sukses (hijau).

### 🔷 Info
Warna tambahan untuk informasi, notifikasi, atau status sekunder.

### 🟧 Orange
Warna oranye, alternatif dari primary/warning.

### 🟣 Purple
Warna ungu, bisa digunakan untuk status spesial atau branding.

🧱 Divider
divider.25: Warna pembatas antar elemen UI.

📴 Disabled
disabled.25: Warna untuk elemen non-aktif.

## Cara menggunakan 

```tsx
import Color from '@herca/kit';

<View style={{ backgroundColor: Color.primary[500] }} />
<Text style={{ color: Color.gray[900] }}>Teks</Text>

```