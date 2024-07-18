"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const register_1 = require("./register"); // Assuming register.ts is in the same directory
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware to enable CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.json());
app.post('/register', register_1.registerUser);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
