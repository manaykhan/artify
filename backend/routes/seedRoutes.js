import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

// express instance stored in seedRouter variable
const seedRouter = express.Router();

// seeding or populating DB w initial data
seedRouter.get('/', async (req, res) => {
  // delete existing products and users and then insert
  await Product.deleteMany({}); //.remove() method
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  // JSON res sent
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;