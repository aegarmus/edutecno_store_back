import express, { urlencoded } from 'express';
import { serverInit } from './services/serverInit.js';

import UserRouter from './routes/usuario.routes.js';

import { errorHandler } from './middlewares/error.middleware.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1', UserRouter);

app.use(errorHandler)

serverInit(app, PORT);

