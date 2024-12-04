import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? children : <Navigate to="/adminlogin" />;
};

export default ProtectedAdmin;