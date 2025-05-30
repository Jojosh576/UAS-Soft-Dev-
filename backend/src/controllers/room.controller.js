// Temporary storage
let rooms = [];
let roomId = 1;

// Create new room
exports.createRoom = async (req, res) => {
    try {
        const { roomNumber, capacity, price } = req.body;
        
        const room = {
            id: roomId++,
            roomNumber,
            capacity,
            price,
            status: 'available',
            currentOccupants: 0,
            createdAt: new Date()
        };

        rooms.push(room);
        res.status(201).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = rooms.find(r => r.id === parseInt(req.params.id));
        if (!room) {
            return res.status(404).json({ success: false, error: 'Room not found' });
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update room
exports.updateRoom = async (req, res) => {
    try {
        const { roomNumber, capacity, price, status, currentOccupants } = req.body;
        const roomIndex = rooms.findIndex(r => r.id === parseInt(req.params.id));
        
        if (roomIndex === -1) {
            return res.status(404).json({ success: false, error: 'Room not found' });
        }

        rooms[roomIndex] = {
            ...rooms[roomIndex],
            roomNumber,
            capacity,
            price,
            status,
            currentOccupants
        };

        res.status(200).json({ success: true, data: rooms[roomIndex] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete room
exports.deleteRoom = async (req, res) => {
    try {
        const roomIndex = rooms.findIndex(r => r.id === parseInt(req.params.id));
        
        if (roomIndex === -1) {
            return res.status(404).json({ success: false, error: 'Room not found' });
        }

        rooms.splice(roomIndex, 1);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get available rooms
exports.getAvailableRooms = async (req, res) => {
    try {
        const availableRooms = rooms.filter(r => r.status === 'available');
        res.status(200).json({ success: true, data: availableRooms });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}; 