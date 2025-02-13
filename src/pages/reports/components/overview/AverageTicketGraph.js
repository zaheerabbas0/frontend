import React, { useEffect, useState } from 'react';
import LineChart from '../../../../components/graphs/LineChart';
import { CardTitle } from '../../../../components/ui/typography';

const AverageTicketGraph = () => {
  const [data, setData] = useState({
    xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    seriesData: [
      {
        name: 'Average Ticket Open Age',
        type: 'line',
        data: [10, 18, 25, 15, 20, 12],
        smooth: true,
        // areaStyle: {},
      },
    ],
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>Average Ticket Open Age (Hours) </CardTitle>
      </div>
      <LineChart
        title=""
        xAxisData={data.xAxisData}
        seriesData={data.seriesData}
        height="350px"
        width="100%"
      />
    </>
  );
};

export default AverageTicketGraph;
