import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../appURL/AxiosInstance';
import LineChart from '../../../components/graphs/LineChart';
import CustomSelect from '../../../styledComponents/CustomSelect';
import { Select } from 'antd';
import { CardTitle } from '../../../components/ui/typography';

const { Option } = Select;

const ContractDetailGraph = () => {
  const { id: contractId } = useParams();
  const [xAxisData, setXAxisData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [filter, setFilter] = useState('Y');

  const filterOptions = [
    { label: 'Year', value: 'Y' },
    { label: 'Month', value: 'M' },
    { label: 'Week', value: 'W' },
  ];

  const fetchData = useCallback(async () => {
    if (!contractId) return;

    try {
      const response = await AxiosInstance.get(
        `/api/v1/dashboard/count-tickets-by-contract/${contractId}?period=${filter}`
      );
      const { labels, resolved_tickets, pending_tickets } = response.data;

      setXAxisData(labels);
      setSeriesData([
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
      ]);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }, [contractId, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <CardTitle>Tickets Overview</CardTitle>
        <CustomSelect
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 120 }}
        >
          {filterOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </CustomSelect>
      </div>
      <div>
        <LineChart xAxisData={xAxisData} seriesData={seriesData} />
      </div>
    </>
  );
};

export default ContractDetailGraph;
