"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountM = exports.getAccount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAccount(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.getAccount = getAccount;
async function getAccountM(req, res, next) {
    try {
        const userId = res.locals.decodedToken.id;
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const { password, ...userWithoutPassword } = user;
        console.log(userWithoutPassword);
        console.log('çilj!');
        return res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.log('çilj!2');
        console.error('Error:', error);
    }
}
exports.getAccountM = getAccountM;
