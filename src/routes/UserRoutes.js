import React from 'react';
import { Outlet } from 'react-router-dom';
import CreateUser from '../pages/user/createUser/CreateUser';
import UsersList from '../pages/user/usersList/UsersList';
import DetailUser from '../pages/user/detailUser/DetailUser';
import { User_Route_Name } from '../constants/user/TitleRoutesConstants';

const routeConfig = {
  path: `${User_Route_Name}`,
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <UsersList />,
      protected: true,
      isAuthorizedTo: 'view:users',
    },
    {
      path: `create-${User_Route_Name}`,
      element: <CreateUser />,
      isAuthorizedTo: 'create:users',
    },
    {
      path: `edit-${User_Route_Name}/:id`,
      element: <CreateUser />,
      protected: true,
      isAuthorizedTo: 'update:users',
    },
    {
      path: `detail-${User_Route_Name}/:id`,
      element: <DetailUser />,
      protected: true,
      isAuthorizedTo: 'view:users',
    },
  ],
};

export default routeConfig;
