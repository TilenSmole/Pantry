import { Request, Response, NextFunction } from 'express';
import {  verifyToken } from "./tokenGenerator"

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.sessionToken;

    if (!accessToken) {
        return res.status(403).json({ error: "Access token is missing" });
    }

    try {
        console.log('¸fdsa');
        // Verify the token
        const decoded = verifyToken(accessToken);
        // Attach decoded token to request object
        res.locals.decodedToken = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
