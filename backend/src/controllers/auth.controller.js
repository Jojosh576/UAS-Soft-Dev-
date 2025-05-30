// Temporary storage
let users = [];
let userId = 1;

// Register
exports.register = async (req, res) => {
    try {
        const { username, email, password, room } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.username === username || u.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        // Create new user
        const user = {
            id: userId++,
            username,
            email,
            password, // In production, this should be hashed
            room,
            role: 'user',
            createdAt: new Date()
        };

        users.push(user);

        // Create token (in production, use proper JWT)
        const token = `token_${user.id}`;

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password (in production, use proper password comparison)
        if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Create token (in production, use proper JWT)
        const token = `token_${user.id}`;

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided' });
        }

        // Extract user ID from token (in production, use proper JWT verification)
        const userId = parseInt(token.split('_')[1]);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
}; 