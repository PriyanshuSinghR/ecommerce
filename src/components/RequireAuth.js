import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const RequireAuth = ({ children }) => {
  let location = useLocation();
  const { state } = useContext(CartContext);
  return state.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};
