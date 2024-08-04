import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import CORS middleware
import { registerUser } from './register'; 
import { loginUser } from './login'; 
import cookieParser from 'cookie-parser';
const recepy_route = require('./routes/recipes.route') 
const account_route = require('./routes/account.route') 
const shopping_list_route = require('./routes/shopping_list.route') 
const storage_route = require('./routes/storage.route') 
//node dist/server.js
    

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
const corsOptions: cors.CorsOptions = {
    origin: '*',
    credentials: true,
};


  

app.use(cookieParser());
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
});

app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);


app.use('/account', account_route);
app.use('/storage', storage_route);

app.use('/recipes', recepy_route);  
app.use('/shopping-list', shopping_list_route);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
