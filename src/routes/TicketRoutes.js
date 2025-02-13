import React from 'react';
import CreateTicket from '../pages/ticket/createTicket/CreateTicket';
import TicketDetail from '../pages/ticket/ticketDetail/TicketDetail';
import { Outlet } from 'react-router-dom';
import TicketPage from '../pages/ticket';

const routeConfig = {
  path: 'tickets',
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    { index: true, element: <TicketPage /> },
    {
      path: 'create-ticket',
      element: <CreateTicket />,
      isAuthorizedTo: 'create:ticket',
    },
    {
      path: 'edit-ticket/:id',
      element: <CreateTicket />,
      isAuthorizedTo: 'update:ticket',
    },
    { path: 'ticket-detail/:id', element: <TicketDetail /> },
  ],
};

export default routeConfig;
