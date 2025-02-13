import React from 'react';
import { Outlet } from 'react-router-dom';
import ContractsList from '../pages/contracts/contractsList/ContractsList';
import CreateContract from '../pages/contracts/createContract/CreateContract';
import ContractDetail from '../pages/contracts/contractDetail/ContractDetail';

const routeConfig = {
  path: 'contracts',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      index: true,
      element: <ContractsList />,
    },
    {
      path: 'create-contract',
      element: <CreateContract />,
    },
    {
      path: 'edit-contract/:id',
      element: <CreateContract />,
    },
    {
      path: 'contract-detail/:id',
      element: <ContractDetail />,
    },
  ],
};

export default routeConfig;
