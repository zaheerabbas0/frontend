import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

const PieChart = ({
  chartId,
  width = '100%',
  height = '400px',
  barColors = {},
  data = [],
  ...otherOptions
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const legendData = data.map((item) => item.name);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        icon: 'circle',
        bottom: 'bottom',
        data: legendData,
        // textStyle: {
        //   color: (name) => barColors[name]?.color || "#000",
        // },
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 14,
      },
      series: [
        {
          data: data.map((item) => ({
            ...item,
            itemStyle: {
              color: barColors[item.name]?.color || '#ccc',
            },
          })),
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          label: {
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
            fontWeight: 500,
            fontSize: 20,
          },
          emphasis: {
            itemStyle: {
              borderColor: 'none',
              shadowBlur: 10,
              borderWidth: 2,
              shadowOffset: 3,
            },
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
  }, [chartId, data, barColors, otherOptions]);

  return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
};

export default PieChart;
