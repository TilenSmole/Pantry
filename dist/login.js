"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const saltRounds = process.env.SALT;
const tokenGenerator_1 = require("./tokenGenerator");
const jwt = require('jsonwebtoken');
async function loginUser(req, res) {
    console.log('Request body:', req.body); // Debug print
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = (0, tokenGenerator_1.generateToken)(user);
        res.send({ token });
        //  res.status(200).json({ message: 'Login successful', user: user });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.loginUser = loginUser;
