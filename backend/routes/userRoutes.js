import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';

// express instance
const userRouter = express.Router();

// user related routes, POST 
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    // checks if the user email exists in DB
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // if user email exist then compare and check the encrypted password
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // generate the specific user token
          token: generateToken(user),
        });
        return;
      }
    }
    // else send error
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

// handles users signing up by taking their name, email etc...
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // password is encrypted and hashed using bcrypt
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

// updates the existing user's profile name password etc
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // finds user in db
    const user = await User.findById(req.user._id);
    if (user) {
      // new name and email
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      // saves updated user
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;