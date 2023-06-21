import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';
// hooks = useState, useContext
// checks the admin rights of the user by checking context
export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}