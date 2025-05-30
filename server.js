const express = require('express');
const path = require('path');

const app = express();

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware untuk parsing data JSON dari frontend
app.use(express.json());

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'Tampilan awal.html'));
});

// Route untuk halaman login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Route untuk halaman register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'Register.html'));
});

// Route untuk halaman home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
});

// Route untuk halaman admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

// Route untuk halaman admin login
app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin-login.html'));
});

// Route untuk menangani file HTML di folder pages
app.get('/pages/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'frontend', 'pages', filename));
});

// Contoh endpoint POST
app.post('/api/bayar', (req, res) => {
    const { name, amount } = req.body;
    console.log(`Pembayaran: ${name} - ${amount}`);
    res.json({ status: 'sukses', name, amount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
