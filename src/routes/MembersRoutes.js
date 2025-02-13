import React from 'react';
import { Outlet } from 'react-router-dom';
import MembersPage from '../pages/members/Members';
import CreateUser from '../pages/user/createUser/CreateUser';
import UsersList from '../pages/user/usersList/UsersList';
import DetailUser from '../pages/user/detailUser/DetailUser';
import CreateAdmin from '../pages/admin/createAdmin/CreateAdmin';
import AdminDetail from '../pages/admin/adminDetail/AdminDetail';
import { User_Route_Name } from '../constants/user/TitleRoutesConstants';

const routeConfig = {
  path: 'members',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    { index: true, element: <MembersPage />, isAuthorizedTo: 'view:members' },
    {
      index: true,
      element: <UsersList />,
      protected: true,
    },
    {
      path: 'create-admin',
      element: <CreateAdmin />,
      isAuthorizedTo: 'create:admins',
    },
    {
      path: 'edit-admin/:id',
      element: <CreateAdmin />,
      protected: true,
      isAuthorizedTo: 'update:admins',
    },
    {
      path: 'admin-detail/:id',
      element: <AdminDetail />,
      protected: true,
      isAuthorizedTo: 'view:admins',
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
      isAuthorizedTo: 'view:members',
    },
  ],
};

export default routeConfig;
