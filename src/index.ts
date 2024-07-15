import express, { Router } from 'express';
import mongoose from 'mongoose';
import { router } from './router';

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/tsnode')
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(router);

    const port: number = 5000;
    app.listen(5000, () => {
      console.log(`Server está rodando na porta http://localhost:${port}`);
    });
  })
  .catch((err) => console.log('Encontrei algum erro:' + err));
