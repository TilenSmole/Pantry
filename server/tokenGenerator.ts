const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.SECRET_KEY 

export const generateToken = (user: { id: number, username: string, email: string }) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, {
        expiresIn: '30d'
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
