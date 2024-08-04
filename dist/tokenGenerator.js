"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, {
        expiresIn: '30d'
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
exports.verifyToken = verifyToken;
