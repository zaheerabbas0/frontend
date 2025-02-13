// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";
// import debounce from "lodash.debounce";

// const BarChart = ({
//   chartId,
//   width = "100%",
//   height = "400px",
//   seriesData = [],
//   barColors = {},
//   ...otherOptions
// }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartDom = chartRef.current;

//     const myChart = echarts.init(chartDom);

//     const series = seriesData.map((seriesItem) => ({
//       name: seriesItem.name,
//       type: "bar",
//       data: seriesItem.data.map((item) => ({
//         value: item.value,
//         itemStyle: { color: barColors[seriesItem.name]?.color },
//       })),
//       itemStyle: {
//         color: barColors[seriesItem.name]?.color,
//         borderRadius: [5, 5, 0, 0],
//       },
//       label: {
//         show: true,
//         position: "top",
//       },
//     }));

//     const xAxisData = seriesData[0]?.data
//       ? seriesData[0].data.map((item) => item.name)
//       : [];

//     const option = {
//       tooltip: {
//         trigger: "item",
//       },
//       legend: {
//         icon: "circle",
//         y: "bottom",
//         textStyle: {
//           color: (name) => barColors[name]?.color,
//         },
//       },
//       xAxis: {
//         type: "category",
//         data: xAxisData,
//         axisTick: {
//           show: false,
//         },
//         axisLine: {
//           show: false,
//         },
//       },
//       yAxis: {
//         type: "value",
//       },
//       series: series,
//       ...otherOptions,
//     };

//     myChart.setOption(option);

//     const debouncedResize = debounce(() => {
//       myChart.resize();
//     }, 100);

//     const resizeObserver = new ResizeObserver(() => {
//       debouncedResize();
//     });
//     resizeObserver.observe(chartDom);

//     return () => {
//       resizeObserver.disconnect();
//       myChart.dispose();
//     };
//   }, [chartId, seriesData, barColors, otherOptions]);

//   return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
// };

// export default BarChart;
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

const BarChart = ({
  chartId,
  width = '100%',
  height = '400px',
  seriesData = [],
  barColors = {},
  xAxisLabelOptions = {},
  ...otherOptions
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const series =
      seriesData.length > 0 && seriesData[0].data
        ? seriesData.map((seriesItem) => ({
            name: seriesItem.name,
            type: 'bar',
            data: seriesItem.data.map((item) => ({
              value: item.value,
              itemStyle: {
                color: barColors[seriesItem.name]?.color || '#000',
              },
            })),
            itemStyle: {
              color: barColors[seriesItem.name]?.color || '#000',
              borderRadius: [5, 5, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
            },
          }))
        : [
            {
              data: seriesData.map((item) => ({
                value: item.value,
                itemStyle: {
                  color: barColors[item.name]?.color || '#000',
                },
              })),
              type: 'bar',
              label: {
                show: true,
                position: 'top',
              },
            },
          ];

    const xAxisData =
      seriesData.length > 0 && seriesData[0].data
        ? seriesData[0].data.map((item) => item.name)
        : seriesData.map((i) => i.name);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        icon: 'circle',
        y: 'bottom',
        // textStyle: {
        //   color: (name) => barColors[name]?.color || "#000",
        // },
        bottom: 0,
      },

      xAxis: {
        type: 'category',
        data: xAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          rotate: 0,
          ...xAxisLabelOptions,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: series,
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
  }, [chartId, seriesData, barColors, otherOptions]);

  return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
};

export default BarChart;
