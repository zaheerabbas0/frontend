import React from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import { isSessionExpired } from '../pages/mainPage/components/SessionExpired';

const ProtectedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  if (isSessionExpired()) {
    localStorage.clear();
    message.error('Session expired. Please login again.');
    return <Navigate to="/" />;
  }

  if (accessToken) {
    return children;
  } else {
    message.error('Authentication required');
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
