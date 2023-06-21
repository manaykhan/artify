// necessary imports

// modules
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

// models
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// utility functions isAuth isAdmin 
import { isAuth, isAdmin } from '../utils.js';

// instance of express
// handles order related routes
const orderRouter = express.Router();

// handling HTTP POST requests and authorizing the user
orderRouter.post(
  '/',
  isAuth,

  // using async handler to resolve/handle errors (if they occur)
  expressAsyncHandler(async (req, res) => {
    // maps the requested order in these fields
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    // .save() method saves the newly created order into the DB
    const order = await newOrder.save();

    // response sent back to the client
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {

        // group pipeline stage used to perform calculations on specific fields
        // and stored in variables (orders, users etc) 
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // sends summary data as JSON to the client
    // can be seen on network tab in dev tools
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

// handles GET request for an order identified by ID
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    // order retrieving from database using .findById()
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }

    // response will be sent if order exists or not
  })
);
export default orderRouter;