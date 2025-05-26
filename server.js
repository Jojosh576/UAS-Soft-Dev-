const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // untuk kirim index.html

// Middleware untuk parsing data JSON dari frontend
app.use(express.json());

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
