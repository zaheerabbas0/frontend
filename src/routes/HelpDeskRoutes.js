import React from 'react';
import HelpDesk from '../pages/helpDesk/HelpDesk';
import { Outlet } from 'react-router-dom';

const routeConfig = {
  path: 'helpdesk',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <HelpDesk />,
    },
  ],
};

export default routeConfig;
