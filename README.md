# Praktikum React JS — Daftar Tugas Kuliah

Proyek praktikum mata kuliah **Pemrograman Web** menggunakan React + Vite.
Berisi 4 tugas pokok dan 2 tugas pengayaan sesuai modul praktikum.

---

## 1. Identitas

- **Nama** : Sebastianus William Dandi
- **NIM** : 255314077
- **Program Studi** : Informatika
- **Mata Kuliah** : Pemrograman Web
- **Dosen** : Dr. Puspaningtyas Sanjoyo Adi, S.T., M.T.

---

## 2. Fitur Aplikasi

| Tugas       | Fitur                                                                            |
| ----------- | -------------------------------------------------------------------------------- |
| Tugas 1     | Halaman profil mahasiswa (nama, NIM, program studi) dari variabel                |
| Tugas 2     | Daftar mata kuliah dengan komponen kartu dan props                               |
| Tugas 3     | Penghitung kehadiran dengan batas 0–30 (tombol Tambah, Kurangi, Reset)           |
| Tugas 4     | Daftar tugas kuliah: tambah, selesai/batalkan, hapus, filter Semua/Aktif/Selesai |
| Pengayaan 1 | Data tugas disimpan di localStorage, tetap ada setelah reload                    |
| Pengayaan 2 | Edit judul tugas dengan validasi input kosong, ID tetap sama                     |

---

## 3. Persyaratan Sistem

Sebelum menjalankan, pastikan sudah terpasang:

- Node.js versi 20.19+ atau 22.12+ — unduh di https://nodejs.org
- npm (sudah termasuk saat instalasi Node.js)
- Browser modern (Chrome, Firefox, atau Edge)

Cek versi Node dan npm di terminal:

    node -v
    npm -v

---

## 4. Cara Menjalankan Proyek

### Langkah 1 — Masuk ke folder proyek

Buka terminal di folder yang berisi file package.json ini.
Kalau pakai VS Code: File -> Open Folder -> pilih folder ini, lalu tekan Ctrl + ` untuk membuka terminal.

### Langkah 2 — Install dependensi

    npm install

Perintah ini mengunduh semua paket yang dibutuhkan (React, Vite, dll.) ke folder node_modules/.
Proses ini hanya perlu dilakukan sekali setelah proyek diunduh.

### Langkah 3 — Jalankan server development

    npm run dev

Terminal akan mencetak URL seperti:

    VITE v5.x.x  ready in 300 ms
    Local:   http://localhost:5173/

Buka URL http://localhost:5173 di browser.

### Langkah 4 — Hentikan server

Tekan Ctrl + C di terminal untuk menghentikan server.

---

## 5. Cara Build untuk Produksi (Opsional)

Untuk memeriksa apakah proyek bisa di-build tanpa error:

    npm run build

Hasilnya ada di folder dist/. Untuk melihat hasil build secara lokal:

    npm run preview

Buka URL yang dicetak terminal (biasanya http://localhost:4173).

Catatan: npm run preview hanya untuk pemeriksaan lokal, bukan untuk hosting produksi.

---

## 6. Struktur Folder

    praktikum-react/
    ├── public/                       Aset statis (favicon, dll.)
    ├── src/
    │   ├── tugas/
    │   │   ├── Tugas1Profil.jsx      Profil mahasiswa (3 komponen)
    │   │   ├── Tugas2MataKuliah.jsx  Daftar mata kuliah (props + key)
    │   │   ├── Tugas3Kehadiran.jsx   Penghitung 0-30
    │   │   └── Tugas4DaftarTugas.jsx Daftar tugas + filter + localStorage + edit
    │   ├── App.jsx                   Komponen utama (menu tab / satu tugas)
    │   ├── main.jsx                  Entry point React
    │   └── index.css                 CSS global
    ├── index.html                    Dokumen HTML
    ├── package.json                  Daftar dependensi & script
    ├── package-lock.json             Lock file dependensi
    ├── vite.config.js                Konfigurasi Vite
    └── README.md                     File ini

Catatan: folder node_modules/ tidak disertakan dalam pengumpulan karena berisi dependensi yang bisa diunduh ulang lewat npm install.

---

## 7. Cara Menggunakan Aplikasi

### Tugas 1 — Profil Mahasiswa

Halaman hanya menampilkan data profil. Ubah nilai variabel di Tugas1Profil.jsx untuk mengganti data.

### Tugas 2 — Daftar Mata Kuliah

Menampilkan 5 kartu mata kuliah. Jumlah kartu mengikuti panjang array daftarMataKuliah.

### Tugas 3 — Penghitung Kehadiran

- Klik Tambah untuk menaikkan (maksimal 30).
- Klik Kurangi untuk menurunkan (minimal 0).
- Klik Reset untuk kembali ke 0.
- Tombol otomatis nonaktif saat mencapai batas.

### Tugas 4 — Daftar Tugas Kuliah

1. Ketik judul tugas, klik Tambah.
2. Klik Selesai untuk menandai tugas selesai (judul dicoret).
3. Klik Batalkan untuk mengembalikan ke aktif.
4. Klik Edit untuk mengubah judul (tidak boleh kosong).
5. Klik Hapus untuk menghapus tugas.
6. Gunakan tombol Semua / Aktif / Selesai untuk memfilter tampilan.

Data tersimpan otomatis di browser (localStorage) sehingga tetap ada setelah halaman dimuat ulang.

---

## 8. Cara Menjalankan Ulang di Komputer Lain

1. Ekstrak folder proyek (tanpa node_modules/).
2. Buka terminal di folder yang berisi package.json.
3. Jalankan:

   npm install
   npm run dev

4. Buka http://localhost:5173.

Pastikan Node.js versi 20.19+ atau 22.12+ sudah terpasang.

---

## 9. Teknologi yang Digunakan

| Teknologi            | Fungsi                       |
| -------------------- | ---------------------------- |
| React 18             | Library UI berbasis komponen |
| Vite 5               | Build tool & dev server      |
| JavaScript (ES2022+) | Bahasa pemrograman           |
| CSS                  | Penataan tampilan            |
| localStorage         | Penyimpanan data di browser  |

---

## 10. Pemecahan Masalah

### npm tidak dikenali

Node.js belum terpasang atau terminal belum di-restart. Install Node.js dari https://nodejs.org, lalu buka terminal baru.

### Error engine saat npm install

Versi Node.js terlalu lama. Update ke versi 20.19+ atau 22.12+.

### Halaman kosong di browser

Buka Console di DevTools (F12). Periksa pesan error, biasanya karena:

- Ada tag JSX yang belum ditutup.
- Nama file import salah huruf besar/kecil.
- Ada export default ganda dalam satu file.

### Cannot find module './tugas/Tugas1Profil.jsx'

Path import salah. Pastikan:

- Folder bernama persis tugas (bukan "tugas 1-4").
- Nama file persis Tugas1Profil.jsx.
- Lokasi file ada di src/tugas/.

### Data tugas hilang setelah reload

- Pastikan browser tidak dalam mode private/incognito.
- Pastikan localStorage tidak diblokir (cek pengaturan situs).
- Buka DevTools -> Application -> Local Storage -> cari kunci tugas-kuliah.

### Port 5173 sudah dipakai

Vite otomatis pindah ke port lain (5174, 5175, dst.). Pakai URL yang dicetak terminal.

---

## 11. Catatan Pengembangan

- Semua file tugas berada di src/tugas/.
- App.jsx bisa berisi menu tab untuk berpindah antar tugas, atau hanya menampilkan satu tugas.
- Untuk berpindah tugas saat pengujian, cukup ubah import dan komponen yang dirender di App.jsx.

---

## 12. Lisensi & Penggunaan

Proyek ini dibuat untuk keperluan praktikum mata kuliah Pemrograman Web.
Bebas digunakan untuk pembelajaran.
