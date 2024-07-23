import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt")
const prisma = new PrismaClient();
const saltRounds = process.env.SALT
import { generateToken, verifyToken } from "./tokenGenerator"
const jwt = require('jsonwebtoken');





export async function loginUser(req: Request, res: Response) {
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

        const token =  generateToken(user)


        res.send({ token });




      //  res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
