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

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});