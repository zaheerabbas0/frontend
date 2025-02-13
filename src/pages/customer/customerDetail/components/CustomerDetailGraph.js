import React from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import DetailsGraph from '../../../../components/tableDataDetail/DetailsGraph';

const CustomerDetailGraph = () => {
  const { id: customerId } = useParams();

  const fetchTicketsData = async (filter) => {
    const response = await AxiosInstance.get(
      `/api/v1/dashboard/count-tickets-by-customer/${customerId}?period=${filter}`
    );

    const { labels, resolved_tickets, pending_tickets } = response.data;

    return {
      labels,
      series: [
        {
          name: 'Resolved',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          data: resolved_tickets,
          itemStyle: {
            color: 'green',
          },
        },
        {
          name: 'Open',
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          data: pending_tickets,
          itemStyle: {
            color: '#5030E5',
          },
        },
      ],
    };
  };

  return (
    <DetailsGraph title="Tickets Overview" fetchDataFn={fetchTicketsData} />
  );
};

export default CustomerDetailGraph;
