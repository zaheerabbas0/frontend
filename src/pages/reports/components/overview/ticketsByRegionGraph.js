import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import DoughnutChart from '../../../../components/graphs/DoughnutChart';
import { CardTitle } from '../../../../components/ui/typography';
import { Region_Field_Name } from '../../../../constants/ticket/FieldsLabelsConstants';

const StatusColors = {
  Open: { color: '#609CF6' },
  Resolved: { color: '#20BC5B' },
  'On hold': { color: '#F2994A' },
};

const TicketsByRegionGraph = () => {
  const [statusRegionData, setStatusRegionData] = useState([]);
  const [filter, setFilter] = useState('All');

  const userInfo = localStorage.getItem('user_info');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const fetchStatusRegionData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/dashboard/region-status/${userId}?region=${filter}`
      );

      const data = response.data;
      if (Array.isArray(data)) {
        setStatusRegionData(data);
      } else {
        console.error('Unexpected data format', data);
      }
    } catch (err) {
      console.error('Error fetching status tickets data', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStatusRegionData();
    }
  }, [filter, userId]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>{`Tickets by ${Region_Field_Name}`}</CardTitle>
      </div>
      <DoughnutChart
        chartId="StatusRegion"
        data={statusRegionData}
        barColors={StatusColors}
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default TicketsByRegionGraph;
