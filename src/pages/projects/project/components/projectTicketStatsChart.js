import React, { useState, useEffect, useCallback } from 'react';
import DoughnutChart from '../../../../components/graphs/DoughnutChart';
import { CardTitle } from '../../../../components/ui/typography';
import CustomSelect from '../../../../styledComponents/CustomSelect';
import { Select } from 'antd';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../../appURL/AxiosInstance';

const { Option } = Select;

const StatusColors = {
  Resolved: { color: '#20BC5B' },
  Open: { color: '#F2994A' },
  'On-Hold': { color: '#F2C94C' },
  'SLAs Breach': { color: '#EB5757' },
};

const ProjectTicketStatsChart = () => {
  const { projectId } = useParams();
  const [projectStatsData, setProjectStatsData] = useState([]);
  const [filter, setFilter] = useState('All');

  const transformDataForChart = (data) => {
    return data.map((item) => ({
      name: item.name === 'Un-Resolved' ? 'Open' : item?.name,
      value: item?.value,
    }));
  };

  // const fetchProjectStatusData = async () => {
  //   try {
  //     const response = await AxiosInstance.get(
  //       `/api/v1/project/get-project-ticket-status/${projectId}?period=${filter}`
  //     );

  //     const data = response.data;
  //     if (Array.isArray(data)) {
  //       const transformedData = transformDataForChart(data);
  //       setProjectStatsData(transformedData);
  //     } else {
  //       console.error("Unexpected data format", data);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching project status data", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProjectStatusData();
  // }, [filter, projectId]);

  const fetchProjectStatusData = useCallback(async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/project/get-project-ticket-status/${projectId}?period=${filter}`
      );

      const data = response.data;
      if (Array.isArray(data)) {
        const transformedData = transformDataForChart(data);
        setProjectStatsData(transformedData);
      } else {
        console.error('Unexpected data format', data);
      }
    } catch (err) {
      console.error('Error fetching project status data', err);
    }
  }, [projectId, filter]);

  useEffect(() => {
    fetchProjectStatusData();
  }, [fetchProjectStatusData]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>Ticket Stats</CardTitle>
        <CustomSelect
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 120 }}
        >
          <Option value="All">ALL</Option>
          <Option value="Y">Year</Option>
          <Option value="M">Month</Option>
          <Option value="W">Week</Option>
        </CustomSelect>
      </div>
      <DoughnutChart
        chartId="projectTicketStats"
        barColors={StatusColors}
        data={projectStatsData}
        width="100%"
        height="350px"
      />
    </>
  );
};

export default ProjectTicketStatsChart;
