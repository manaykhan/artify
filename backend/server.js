import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config(); // env variables are loaded from .env file

mongoose
  .connect(process.env.MONGODB_URI) // connect db
  .then(() => {
    console.log('connected to db'); // ensures db connection
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
// parsing the JSON requests to make it JavaScript acessible through req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// api endpoints and their respective logics
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// sends error message if it occurs
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// server listens to this port
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`); // indicates server started successfully
});