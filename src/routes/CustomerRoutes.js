import React from 'react';
import CustomersList from '../pages/customer/customersList/CustomersList';
import CustomerDetail from '../pages/customer/customerDetail/CustomerDetail';
import CreateCustomer from '../pages/customer/createCustomer/CreateCustomer';
import { Outlet } from 'react-router-dom';
import { Customer_Route_Name } from '../constants/customer/TitleRoutesConstants';

const routeConfig = {
  path: `${Customer_Route_Name}`,
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <CustomersList />,
    },
    {
      path: `create-${Customer_Route_Name}`,
      element: <CreateCustomer />,
    },
    {
      path: `edit-${Customer_Route_Name}/:id`,
      element: <CreateCustomer />,
    },
    {
      path: `${Customer_Route_Name}-detail/:id`,
      element: <CustomerDetail />,
    },
  ],
};

export default routeConfig;
