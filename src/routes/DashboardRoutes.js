import React from 'react';
import DashBoard from '../pages/dashBoard/DashBoard';
import { Outlet } from 'react-router-dom';

const routeConfig = {
  path: 'dashboard',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <DashBoard />,
    },
  ],
};

export default routeConfig;
