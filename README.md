# 📋 InvoicePro - Invoice Generator

Generator faktur modern berbasis web yang ringan, cepat, dan gratis. Cocok untuk freelancer, UMKM, dan profesional yang butuh membuat invoice profesional dalam hitungan detik.

---

## ✨ Fitur Utama

### 📝 Generator Invoice
- **Input Klien & Perusahaan** - Nama klien, nomor invoice kustom, nama & logo perusahaan (upload gambar)
- **Multi-Item** - Tambah banyak item/baris (deskripsi, jumlah, harga) tanpa batas
- **Auto-Hitung** - Subtotal & total otomatis terupdate setiap kali ada perubahan
- **Format Rupiah** - Tampilan mata uang Rupiah (Rp) dengan format ribuan Indonesia
- **Preview Sebelum Print** - Modal preview dengan tampilan profesional A4
- **Print** - Cetak langsung via browser (`window.print()`)
- **Export PDF** - Export invoice ke PDF dengan format rapi

### 📊 Dashboard Pembayaran
- **Daftar Invoice** - Tabel rapi menampilkan seluruh invoice tersimpan
- **Status Pembayaran** - Toggle status: **Lunas**, **Menunggu**, **Dibatalkan**
- **Filter Rentang Tanggal** - Filter data dari tanggal ke tanggal (e.g., 3 Agustus - 10 Agustus)
- **Filter Status** - Saring data berdasarkan status pembayaran
- **Hapus Invoice** - Tombol hapus dengan konfirmasi
- **Export CSV** - Download data dashboard ke file CSV untuk audit
- **Auto-Save** - Invoice otomatis tersimpan saat preview

### 🎨 UI/UX Modern
- **Tema Kuning-Hitam** - Aksen warna kuning pada latar hitam, modern & elegan
- **Tailwind CSS** - Styling menggunakan framework utility-first
- **Responsive** - Tampilan optimal di desktop, tablet, & mobile
- **Sidebar Navigation** - Sidebar dengan toggle antara Generator & Dashboard
- **Font Awesome Icons** - Ikon konsisten di seluruh aplikasi

### ⚡ Ringan & Sederhana
- **3 File Saja** - `index.html`, `style.css`, `script.js` - tidak ada build tools
- **Vanilla JavaScript** - Tidak butuh runtime tambahan
- **Tanpa Backend** - Data tersimpan di `localStorage` browser
- **Tanpa Instalasi** - Buka langsung di browser, langsung bisa dipakai

---

## 🚀 Cara Pakai

### Untuk User
1. Buka `index.html` di browser
2. Isi form Generator (nama klien, nomor invoice, item, dll.)
3. Klik **Preview Invoice** untuk melihat hasil
4. Klik **Print** atau **Export PDF**
5. Buka tab **Dashboard** untuk lihat semua invoice
6. Filter, ubah status, atau hapus data sesuai kebutuhan

### Untuk Developer
```bash
git clone https://github.com/username/invoice-app.git
cd invoice-app
```
Buka `index.html` di browser - selesai!

---

## 🛠️ Tech Stack

- **HTML5** - Struktur halaman
- **CSS3** + **Tailwind CSS** (CDN) - Styling modern
- **JavaScript Vanilla** - Logic aplikasi tanpa framework
- **Font Awesome 6** - Icon library
- **LocalStorage** - Penyimpanan data di browser

---

## 📂 Struktur File

```
invoice-app/
├── index.html       # Struktur halaman utama
├── style.css        # Custom CSS & print styles
├── script.js        # Semua logic aplikasi
└── README.md        # Dokumentasi ini
```

---

## 🗺️ Roadmap / Ide Pengembangan

- [ ] Login & multi-user (Firebase Auth)
- [ ] Backend cloud (Supabase / Firebase)
- [ ] Kirim invoice via email
- [ ] Template invoice tambahan
- [ ] Recurring invoice (jadwal otomatis)
- [ ] Integrasi payment gateway
- [ ] Multi-currency support
- [ ] API publik untuk aplikasi lain

---

## 📄 Lisensi

Bebas digunakan untuk keperluan pribadi & komersial.

---

**Made with ❤️ untuk UMKM Indonesia**
