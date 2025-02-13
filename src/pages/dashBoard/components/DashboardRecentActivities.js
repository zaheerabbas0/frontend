import React, { useEffect, useState } from 'react';
import TicketTable from '../../../components/tables/ticketTable/ticketTable';
import AxiosInstance from '../../../appURL/AxiosInstance';

const DashboardRecentActivities = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchRecentTickets = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user_info'));
        const userId = userData?.id;
        const response = await AxiosInstance.get(
          `/api/v1/ticket/get-tickets-recent/${userId}`
        );
        setDataSource(response.data);
      } catch (error) {
        console.error('Error fetching recent tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTickets();
  }, []);

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

export default DashboardRecentActivities;
