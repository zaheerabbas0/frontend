import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

const TicketsProject = ({
  chartId,
  width = '100%',
  height = '400px',
  data = [],
  slaColors,
  ...otherOptions
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        data: data.map((item) => item.name),
        orient: 'horizontal',
        bottom: '400%',
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: data.map((item) => item.value),
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: (params) =>
              slaColors[data[params.dataIndex].name]?.color || '#000',
          },
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
      ...otherOptions,
    };

    myChart.setOption(option);

    const debouncedResize = debounce(() => {
      myChart.resize();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserver.observe(chartDom);

    return () => {
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, [chartId, data, slaColors, otherOptions]);

  return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
};

export default TicketsProject;
