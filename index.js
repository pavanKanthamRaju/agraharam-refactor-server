import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routesConfig from "./routes/routesConfig.js"
import {errorHandler} from "./middlewares/errorHandler.js"


const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: '*', // Or your frontend URL like 'http://localhost:5173'
  methods: ['GET', 'POST', 'OPTIONS','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());


//Routes
app.use('/api', routesConfig);


app.get('/', (req, res) => res.send('API is working 🚀'));

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
