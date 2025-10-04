
import express from 'express';
import"dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './src/config/db.js';
import userRouter from './src/routes/user.routes.js';

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use('/api/status', (req, res) => 
   res.send("server is runnning")
);
app.use('/api/auth', userRouter);

const PORT = process.env.PORT || 5000;

connectDB();


server.listen(PORT, () => 
   console.log("Server is running on port " + PORT)
);


