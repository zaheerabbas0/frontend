import React from 'react';
import Chat from '../pages/chat/Chat';
import { Outlet } from 'react-router-dom';

const routeConfig = {
  path: 'chat',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <Chat />,
    },
  ],
};

export default routeConfig;
