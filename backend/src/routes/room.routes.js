const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const auth = require('../middleware/auth');

// Create new room (admin only)
router.post('/', auth, roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get room by ID
router.get('/:id', roomController.getRoomById);

// Update room (admin only)
router.put('/:id', auth, roomController.updateRoom);

// Delete room (admin only)
router.delete('/:id', auth, roomController.deleteRoom);

// Get available rooms
router.get('/available', roomController.getAvailableRooms);

module.exports = router; 