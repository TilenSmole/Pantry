import { Request, Response, NextFunction } from 'express';
import {  verifyToken } from "./tokenGenerator"

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.sessionToken;

    if (!accessToken) {
        return res.status(403).json({ error: "Access token is missing" });
    }

    try {
        console.log(accessToken);
        // Verify the token
        const decoded = verifyToken(accessToken);
        // Attach decoded token to request object
        res.locals.decodedToken = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};



export const authenticateMiddlewareM = (req: Request, res: Response, next: NextFunction) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;
console.log('¸dsfsadf');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('¸wtr');
        return res.status(403).json({ error: "Access token is missing or invalid format" });
    }

    // Remove 'Bearer ' from the start of the header value
    const token = authHeader.split(' ')[1];

    try {
        console.log('Extracted Token:', token);
        // Verify the token
        const decoded = verifyToken(token);
        // Attach decoded token to request object
        res.locals.decodedToken = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
