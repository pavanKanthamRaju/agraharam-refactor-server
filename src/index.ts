import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import routesConfig from "./routes/routesConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app: Express = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', routesConfig);

app.get('/', (req: Request, res: Response) => {
  res.send('API is working 🚀');
});

// Error Handler (must be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
