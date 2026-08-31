# Aplikasi CRUD Data Mahasiswa - React & API

## Endpoint API yang Digunakan

Project ini berinteraksi dengan Backend yang berjalan di `http://localhost:8080` dan mengonsumsi **3 endpoint** berikut:

1. **`GET /api/mahasiswa`**  
   * **Fungsi:** Mengambil data seluruh mahasiswa untuk ditampilkan pada daftar utama.
2. **`POST /api/mahasiswa`**  
   * **Fungsi:** Mengirim data mahasiswa baru (Nama, NIM, Umur, Jurusan) dari input form ke database.
3. **`DELETE /api/mahasiswa/:nim`**  
   * **Fungsi:** Menghapus data mahasiswa dari database berdasarkan parameter nomor NIM yang dipilih.
