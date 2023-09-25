import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import  morgan from 'morgan';
import cors from 'cors';

dotenv.config();
let app = express();

app.use(morgan('dev'), cors());
app.use(express.json());
app.use('/', router);

app.listen(process.env.VITE_PORT_BACKEND, process.env.VITE_HOST,  ()=>{
    console.log(`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
});