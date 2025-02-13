import React, { useState, useEffect } from 'react';
import { CardTitle } from '../../../../components/ui/typography';
import PieChart from '../../../../components/graphs/PieChart';

const StatusColors = {
  open: { color: '#D86D30' },
  resolved: { color: '#8BC591' },
  on_hold: { color: '#F2C94C' },
};

const TotalTicketsGraph = ({ data = {} }) => {
  const reformattedData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>Total Tickets</CardTitle>
      </div>
      <PieChart
        chartId="StatusRegion"
        data={reformattedData}
        barColors={StatusColors}
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default TotalTicketsGraph;
