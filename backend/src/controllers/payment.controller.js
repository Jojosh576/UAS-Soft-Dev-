const { validationResult } = require('express-validator');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');

// Temporary storage
let payments = [];
let paymentId = 1;

// Create new payment
exports.createPayment = async (req, res) => {
  try {
    const { userId, roomNumber, amount, month, year, proofImage } = req.body;
    
    const payment = {
      id: paymentId++,
      userId,
      roomNumber,
      amount,
      month,
      year,
      proofImage,
      status: 'pending',
      paymentDate: new Date()
    };

    payments.push(payment);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = payments.find(p => p.id === parseInt(req.params.id));
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const paymentIndex = payments.findIndex(p => p.id === parseInt(req.params.id));
    
    if (paymentIndex === -1) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    payments[paymentIndex].status = status;
    res.status(200).json({ success: true, data: payments[paymentIndex] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get payments by user ID
exports.getPaymentsByUserId = async (req, res) => {
  try {
    const userPayments = payments.filter(p => p.userId === req.params.userId);
    res.status(200).json({ success: true, data: userPayments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const paymentIndex = payments.findIndex(p => p.id === parseInt(req.params.id));
    
    if (paymentIndex === -1) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }

    payments.splice(paymentIndex, 1);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: payments
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment history'
    });
  }
}; 