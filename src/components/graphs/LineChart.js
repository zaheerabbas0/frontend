import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

const LineChart = ({
  title,
  xAxisData,
  seriesData,
  height = '290px',
  width = '100%',
}) => {
  const chartRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: xAxisData,
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
      },
      legend: {
        y: 'bottom',
        icon: 'circle',
      },
      series: seriesData,
      emphasis: {
        focus: 'series',
      },
    };

    myChart.setOption(option);

    const debouncedResize = debounce(() => {
      myChart.resize();
    }, 100);

    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserver.observe(chartDom);
    resizeObserverRef.current = resizeObserver;

    return () => {
      resizeObserverRef.current.disconnect();
      myChart.dispose();
    };
  }, [title, xAxisData, seriesData]);

  return <div ref={chartRef} style={{ height, width }}></div>;
};

export default LineChart;
