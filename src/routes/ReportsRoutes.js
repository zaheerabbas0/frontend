import React from 'react';
import Reports from '../pages/reports/Reports';
import { Outlet } from 'react-router-dom';

const routeConfig = {
  path: 'reports',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <Reports />,
    },
  ],
};

export default routeConfig;
