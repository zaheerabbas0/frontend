import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../../../components/graphs/DoughnutChart';
import { CardTitle } from '../../../../components/ui/typography';
import AxiosInstance from '../../../../appURL/AxiosInstance';

const StatusColors = {
  Open: { color: '#609CF6' },
  Resolved: { color: '#20BC5B' },
  'On Hold': { color: '#F2994A' },
  Design: { color: '#F68D2B' },
  Development: { color: '#F4A79D' },
  Hardware: { color: '#344BFD' },
  Software: { color: '#FFD200' },
  Network: { color: '#20BC5B' },
};

const OnHoldRegionGraph = ({ data = {} }) => {
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
        <CardTitle> On-Hold Tickets</CardTitle>
      </div>
      <DoughnutChart
        chartId="StatusRegion"
        data={reformattedData}
        barColors={StatusColors}
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default OnHoldRegionGraph;
