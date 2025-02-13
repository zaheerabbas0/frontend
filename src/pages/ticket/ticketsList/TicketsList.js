import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TicketTable from '../../../components/tables/ticketTable/ticketTable';
import useCheckStateStatus, {
  TICKETS_STATE,
} from '../../../hooks/useCheckStateStatus';
import { hasPermission } from '../../../constants/UsersRole';

const TicketsList = () => {
  const { tickets: ticketData } = useCheckStateStatus([TICKETS_STATE]);
  const ticketStatus = useSelector((state) => state.ticket.status);

  const [activeTicketTabKey, setActiveTicketTabKey] = useState(
    localStorage.getItem('activeTicketTabKey') || 'TicketsList'
  );

  return (
    <TicketTable
      spin={ticketStatus === 'loadingTickets'}
      title="Tickets"
      dataSource={ticketData}
      showFilters={true}
      showDelete={hasPermission('delete:ticket')}
      showCreate={hasPermission('create:ticket')}
      showImport={hasPermission('import:ticket')}
      showExport={hasPermission('export:ticket')}
    />
  );
};

export default TicketsList;
