const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth');

// Create new payment
router.post('/', auth, paymentController.createPayment);

// Get all payments (admin only)
router.get('/', auth, paymentController.getAllPayments);

// Get payment by ID
router.get('/:id', auth, paymentController.getPaymentById);

// Update payment status (admin only)
router.patch('/:id/status', auth, paymentController.updatePaymentStatus);

// Get payments by user ID
router.get('/user/:userId', auth, paymentController.getPaymentsByUserId);

// Delete payment (admin only)
router.delete('/:id', auth, paymentController.deletePayment);

module.exports = router; 