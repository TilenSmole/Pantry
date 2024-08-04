"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const saltRounds = process.env.SALT;
const bcrypt = require("bcrypt");
async function registerUser(req, res) {
    // Example: Save user data to database
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(Number(saltRounds));
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.users.create({
        data: {
            username: username,
            password: hashPassword,
            email: email,
        },
    });
    res.status(200).json({ message: 'User registered successfully' });
}
exports.registerUser = registerUser;
;
