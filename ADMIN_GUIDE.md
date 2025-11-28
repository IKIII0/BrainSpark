# Admin Guide - BrainSpark

## Login Admin

**Kredensial Admin:**
- Email: `admin@gmail.com`
- Password: `admin123`

## Akses Admin Dashboard

Setelah login, admin akan otomatis diarahkan ke `/admin` yang menampilkan:

### 1. Header Dashboard
- Nama admin dan email
- Tombol logout

### 2. Statistik Cards
- **Total Materi**: Jumlah semua materi yang tersedia
- **Total Soal**: Jumlah total soal dari semua materi
- **Status**: Status sistem (Aktif/Tidak Aktif)

### 3. Manajemen Materi

#### Tambah Materi Baru
1. Klik tombol "Tambah Materi Baru"
2. Isi form:
   - **Judul Materi** (wajib): Nama materi, contoh "Algoritma Dasar"
   - **Level**: Pilih Pemula, Menengah, atau Lanjutan
   - **Deskripsi**: Penjelasan singkat tentang materi
   - **Jumlah Soal**: Berapa banyak soal dalam materi ini
3. Klik "Simpan Materi"
4. Materi baru akan muncul di tabel

#### Hapus Materi
1. Cari materi yang ingin dihapus di tabel
2. Klik tombol "Hapus" di kolom Aksi
3. Konfirmasi penghapusan
4. Materi akan dihapus dari database

### 4. Tabel Materi
Menampilkan semua materi dengan informasi:
- Nama materi dan deskripsi
- Level (dengan badge berwarna)
- Jumlah soal
- Tombol aksi (Hapus)

## Perbedaan Admin vs User Biasa

| Fitur | Admin | User Biasa |
|-------|-------|------------|
| Dashboard | `/admin` - Dashboard pengelolaan | `/ChooseQuiz` - Pilih materi |
| Tambah Materi | ✅ Ya | ❌ Tidak |
| Hapus Materi | ✅ Ya | ❌ Tidak |
| Edit Materi | ✅ Ya | ❌ Tidak |
| Ikut Kuis | ❌ Tidak (bisa ditambahkan) | ✅ Ya |
| Lihat Profil | ❌ Tidak | ✅ Ya |

## Database

### Table: `admin`
```sql
- id (serial, primary key)
- nama_admin (varchar)
- email (varchar, unique)
- pass (varchar, hashed)
```

### Table: `materi`
```sql
- id (serial, primary key)
- nama_materi (varchar)
- level (varchar)
- deskripsi (text)
- jumlah_soal (integer)
```

## API Endpoints untuk Admin

### Login
```
POST /api/login
Body: { email_user: "admin@gmail.com", pass: "admin123" }
Response: { status: "success", data: { email, nama, isAdmin: true } }
```

### Create Materi (Admin Only)
```
POST /api/materi
Headers: { x-user-email: "admin@gmail.com" }
Body: { nama_materi, level, deskripsi, jumlah_soal }
```

### Delete Materi (Admin Only)
```
DELETE /api/materi/:id
Headers: { x-user-email: "admin@gmail.com" }
```

### Update Materi (Admin Only)
```
PUT /api/materi/:id
Headers: { x-user-email: "admin@gmail.com" }
Body: { nama_materi, level, deskripsi, jumlah_soal }
```

## Troubleshooting

### Admin tidak bisa tambah/hapus materi
1. Cek localStorage: `localStorage.getItem('user')`
2. Pastikan ada `isAdmin: true` dan `email: "admin@gmail.com"`
3. Cek console browser untuk error
4. Pastikan backend middleware `isAdmin` berjalan dengan benar

### Error 403 Forbidden
- Email admin tidak ditemukan di database
- Header `x-user-email` tidak dikirim
- Email di localStorage tidak sesuai dengan database

### Redirect ke halaman user
- `isAdmin` flag tidak tersimpan dengan benar
- Cek response dari `/api/login`
- Clear localStorage dan login ulang

## Tips

1. **Jangan hapus admin dari database** - Pastikan selalu ada minimal 1 admin
2. **Backup data** - Sebelum menghapus materi, pastikan tidak ada user yang sedang mengerjakan
3. **Password admin** - Ganti password default untuk keamanan
4. **Logging** - Cek console browser untuk debug masalah
