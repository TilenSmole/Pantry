"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddlewareM = exports.authenticateMiddleware = void 0;
const tokenGenerator_1 = require("./tokenGenerator");
const authenticateMiddleware = (req, res, next) => {
    const accessToken = req.cookies.sessionToken;
    if (!accessToken) {
        return res.status(403).json({ error: "Access token is missing" });
    }
    try {
        console.log(accessToken);
        // Verify the token
        const decoded = (0, tokenGenerator_1.verifyToken)(accessToken);
        // Attach decoded token to request object
        res.locals.decodedToken = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
exports.authenticateMiddleware = authenticateMiddleware;
const authenticateMiddlewareM = (req, res, next) => {
    // Extract the Authorization header
    console.log('¸fdsafas');
    const authHeader = req.headers.authorization;
    console.log('¸dsfsadf');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('¸wtr');
        return res.status(403).json({ error: "Access token is missing or invalid format" });
    }
    // Remove 'Bearer ' from the start of the header value
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        console.log('Extracted Token:', token);
        // Verify the token
        const decoded = (0, tokenGenerator_1.verifyToken)(token);
        // Attach decoded token to request object
        res.locals.decodedToken = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
exports.authenticateMiddlewareM = authenticateMiddlewareM;
