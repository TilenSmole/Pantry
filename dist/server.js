"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const register_1 = require("./register");
const login_1 = require("./login");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const recepy_route = require('./routes/recipes.route');
const account_route = require('./routes/account.route');
const shopping_list_route = require('./routes/shopping_list.route');
const storage_route = require('./routes/storage.route');
//node dist/server.js
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware to enable CORS
const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.json());
app.post('/register', register_1.registerUser);
app.post('/login', login_1.loginUser);
app.use('/account', account_route);
app.use('/storage', storage_route);
app.use('/recipes', recepy_route);
app.use('/shopping-list', shopping_list_route);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
