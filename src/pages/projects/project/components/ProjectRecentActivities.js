import React, { useEffect, useState } from 'react';
import TicketTable from '../../../../components/tables/ticketTable/ticketTable';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import { useParams } from 'react-router-dom';

const ProjectRecentActivities = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchRecentTickets = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user_info'));
        const userId = userData?.id;
        const response = await AxiosInstance.get(
          `/api/v1/ticket/get-tickets-recent-project/${userId}?project_id=${projectId}`
        );
        setDataSource(response.data);
      } catch (error) {
        console.error('Error fetching recent tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentTickets();
  }, [projectId]);

  return (
    <TicketTable
      title="Recent Activities"
      spin={loading}
      dataSource={dataSource}
      showFilters={false}
      showDelete={false}
      showCreate={false}
      showImport={false}
      showExport={false}
      pagination={false}
    />
  );
};

export default ProjectRecentActivities;
