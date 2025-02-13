import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../../components/graphs/DoughnutChart';
import { CardTitle } from '../../../components/ui/typography';
import AxiosInstance from '../../../appURL/AxiosInstance';

const UserStatusColors = {
  Active: { color: '#7AC555' },
  Inactive: { color: '#D95C41' },
};

const TotalUsersGraph = () => {
  const [totalUserData, setTotalUserData] = useState([]);

  const userInfo = localStorage.getItem('user_info');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const fetchTotalUserData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/dashboard/total-created-users/${userId}`
      );

      const data = response.data;
      if (Array.isArray(data)) {
        setTotalUserData(data);
      } else {
        console.error('Unexpected data format', data);
      }
    } catch (err) {
      console.error('Error fetching status tickets data', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTotalUserData();
    }
  }, [userId]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>Total Users</CardTitle>
      </div>
      <DoughnutChart
        chartId="StatusRegion"
        data={totalUserData}
        barColors={UserStatusColors}
        width="100%"
        height="360px"
      />
    </>
  );
};

export default TotalUsersGraph;
