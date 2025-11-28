# Fix Admin Login & Materi Management

## Masalah
Admin dengan email `admin@gmail.com` dan password `admin123` tidak bisa menambah/menghapus materi setelah login.

## Penyebab
1. **Backend**: Middleware `isAdmin` hanya mengecek header `x-user-email` tanpa verifikasi ke database admin
2. **Backend**: Controller `login` tidak membedakan response untuk admin vs user biasa
3. **Frontend**: AuthContext tidak menyimpan email dengan benar untuk admin
4. **Frontend**: Service layer tidak mengembalikan data dengan struktur yang benar

## Solusi yang Diterapkan

### Backend Changes

#### 1. `server/middleware/adminAuth.js`
- Mengubah middleware untuk melakukan query ke database admin
- Memverifikasi apakah email ada di table `admin`
- Menyimpan data admin di `req.admin` untuk digunakan controller

#### 2. `server/controllers/sparkControllers.js`
- **login()**: Membedakan response untuk admin dan user biasa
  - Admin: `{ email, nama, isAdmin: true }`
  - User: `{ id, email, nama_user, nim, universitas, no_hp, isAdmin: false }`
- **createMateri()**: Disederhanakan karena middleware sudah handle verifikasi
- **deleteMateri()**: Disederhanakan karena middleware sudah handle verifikasi

#### 3. `server/services/sparkServices.js`
- **login()**: Mengecek table `admin` terlebih dahulu, baru table `users`
- Mengembalikan flag `isAdmin: true/false`

### Frontend Changes

#### 1. `client/src/services/authService.js`
- Mengembalikan `response.data.data` (bukan `response.data`)

#### 2. `client/src/context/AuthContext.jsx`
- Membedakan handling untuk admin dan user biasa
- Menyimpan email dengan benar untuk kedua tipe user
- Admin disimpan dengan struktur: `{ id: 'admin', email, name, isAdmin: true }`

#### 3. `client/src/services/materiService.js`
- Interceptor menambahkan header `x-user-email` dari auth context
- `createMateri()` dan `deleteMateri()` mengembalikan `response.data.data`

#### 4. `client/src/pages/ChooseQuiz.jsx`
- Menghapus parameter `user.email` yang tidak diperlukan (sudah ada di interceptor)

## Cara Testing

1. **Login sebagai Admin**:
   ```
   Email: admin@gmail.com
   Password: admin123
   ```

2. **Verifikasi**:
   - Setelah login, cek localStorage: `localStorage.getItem('user')`
   - Harus ada `isAdmin: true` dan `email: "admin@gmail.com"`

3. **Test Tambah Materi**:
   - Buka halaman Choose Quiz
   - Form "Tambah Materi Kuis" harus muncul (hanya untuk admin)
   - Isi form dan submit
   - Materi baru harus muncul di list

4. **Test Hapus Materi**:
   - Tombol delete (ikon trash) harus muncul di setiap card materi
   - Klik tombol delete
   - Konfirmasi penghapusan
   - Materi harus hilang dari list

## Catatan Penting

- Admin disimpan di table `admin` dengan kolom: `nama_admin`, `email`, `pass`
- User biasa disimpan di table `users` dengan kolom: `nama_user`, `email_user`, `pass`, dll
- Password di-hash menggunakan bcrypt sebelum disimpan
- Middleware `isAdmin` sekarang async karena melakukan query database
