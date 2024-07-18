import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const saltRounds = process.env.SALT
const bcrypt = require("bcrypt")

export async  function registerUser  (req: Request, res: Response)  {
    // Example: Save user data to database
    const { username, email, password } = req.body;
  

    const salt = await bcrypt.genSalt(Number(saltRounds))
    const hashPassword: string = await bcrypt.hash(password, salt)

    const newUser = await prisma.users.create({
        data: {
            username: username,
            password: hashPassword,
            email: email,
        },
      });

    res.status(200).json({ message: 'User registered successfully' });
};
