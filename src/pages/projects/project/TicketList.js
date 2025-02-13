import { useParams } from 'react-router-dom';
import TicketTable from '../../../components/tables/ticketTable/ticketTable';
import { useEffect } from 'react';
import { useProjectTicket } from '../../../context/projectTicketContext';
import { Project_Module_Name } from '../../../constants/project/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

const ProjectTicketList = () => {
  const { projectId } = useParams();
  const { tickets, fetchTickets, loading, isDataStale } = useProjectTicket();

  useEffect(() => {
    if (!isDataStale) {
      fetchTickets(projectId);
    }
  }, [fetchTickets, projectId, isDataStale]);

  return (
    <TicketTable
      title={`${Project_Module_Name} Tickets`}
      dataSource={tickets}
      spin={loading}
      showFilters={true}
      showDelete={hasPermission('delete:ticket')}
      showCreate={hasPermission('create:ticket')}
      showExport={hasPermission('export:ticket')}
      showImport={hasPermission('import:ticket')}
    />
  );
};

export default ProjectTicketList;
