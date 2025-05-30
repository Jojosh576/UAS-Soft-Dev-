const express = require('express');
const cors = require('cors');
const path = require('path');
const paymentRoutes = require('./routes/payment.routes');
const roomRoutes = require('./routes/room.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// API routes
app.use('/api/payments', paymentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the dashboard at: http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET  /');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET  /api/auth/me');
    console.log('- GET  /api/rooms');
    console.log('- GET  /api/payments');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        console.error('Try running: taskkill /F /IM node.exe');
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
}); 