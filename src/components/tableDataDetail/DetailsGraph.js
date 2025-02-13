import React, { useState, useEffect, useCallback } from 'react';
import { Card, Select } from 'antd';
import LineChart from '../graphs/LineChart';
import { CardTitle } from '../ui/typography';
import CustomSelect from '../../styledComponents/CustomSelect';
import styles from './DetailsPage.module.css';

const { Option } = Select;

const DetailsGraph = ({
  title,
  fetchDataFn,
  filterOptions = [
    { label: 'Year', value: 'Y' },
    { label: 'Month', value: 'M' },
    { label: 'Week', value: 'W' },
  ],
}) => {
  const [xAxisData, setXAxisData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [filter, setFilter] = useState(filterOptions[0].value);

  const fetchData = useCallback(async () => {
    try {
      const { labels, series } = await fetchDataFn(filter);
      setXAxisData(labels);
      setSeriesData(series);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }, [fetchDataFn, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <Card className={styles.details_graph}>
      <div className={styles.graph_header}>
        <CardTitle>{title}</CardTitle>
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
      <LineChart xAxisData={xAxisData} seriesData={seriesData} />
    </Card>
  );
};

export default DetailsGraph;
