import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import CORS middleware
import { registerUser } from './register'; 
import { loginUser } from './login'; 

const recepy_route = require('./routes/recipes.route') 


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
});

app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);

app.use('/recipes', recepy_route);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
