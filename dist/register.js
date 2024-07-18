"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const registerUser = (req, res) => {
    // Example: Save user data to database
    const { username, email, password } = req.body;
    console.log(username);
    console.log('username');
    // Implement your registration logic here (e.g., save to database)
    // Return a success message or status code
    res.status(200).json({ message: 'User registered successfully' });
};
exports.registerUser = registerUser;
