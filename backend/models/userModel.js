import mongoose from 'mongoose';

// schema for users
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }, // will check if the user is an admin or not
  },
  {
    // createdAt updatedAt etc (console can be checked for this)
    timestamps: true,
  }
);
// mongoose.model() creates a model in mongoDB
const User = mongoose.model('User', userSchema);
export default User;