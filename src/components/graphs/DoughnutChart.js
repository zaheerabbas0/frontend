import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

const DoughnutChart = ({
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

    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    const MIN_SEGMENT_VALUE = 0.25;

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          // Custom formatter to display actual value
          let value =
            params.data.realValue !== undefined
              ? params.data.realValue
              : params.value;
          return `${params.name}: ${value}`;
        },
      },
      legend: {
        icon: 'circle',
        bottom: 'bottom',
        data: legendData,
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 14,
      },
      series: [
        {
          data: data.map((item) => ({
            ...item,
            value: item.value === 0 ? MIN_SEGMENT_VALUE : item.value,
            realValue: item.value,
            itemStyle: {
              color: barColors[item.name]?.color || '#ccc',
            },
          })),
          type: 'pie',
          padAngle: 1,
          itemStyle: {
            borderRadius: 0,
            borderColor: 'none',
            borderWidth: 2,
          },
          radius: ['80%', '40%'],
          center: ['50%', '50%'],
          label: {
            show: true,
            position: 'inside',
            formatter: function (params) {
              // Display the real value if it's not 0, otherwise display an empty string
              let value =
                params.data.realValue !== undefined
                  ? params.data.realValue
                  : params.value;
              return value !== 0 ? value : 0;
            },
            color: '#fff',
            fontWeight: 500,
            fontSize: 20,
          },
          emphasis: {
            itemStyle: {
              borderColor: 'none',
              shadowBlur: 30,
              borderWidth: 5,
              shadowOffset: 5,
            },
          },
        },
      ],
      graphic: true
        ? [
            {
              type: 'text',
              left: 'center',
              top: '45%',
              style: {
                text: totalValue,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                fill: '#333',
              },
            },
            {
              type: 'text',
              left: 'center',
              top: '55%',
              style: {
                text: 'Total',
                fontSize: 16,
                textAlign: 'center',
                fill: '#999',
              },
            },
          ]
        : {},
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
  }, [chartId, data, otherOptions]);

  return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
};

export default DoughnutChart;

// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";
// import debounce from "lodash.debounce";

// const DoughnutChart = ({
//   chartId,
//   width = "100%",
//   height = "400px",
//   barColors = {},
//   data = [],
//   ...otherOptions
// }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartDom = chartRef.current;
//     const myChart = echarts.init(chartDom);
//     const legendData = data.map((item) => item.name);

//     const totalValue = data.reduce((acc, item) => acc + item.value, 0);

//     const option = {
//       tooltip: {
//         trigger: "item",
//       },
//       legend: {
//         icon: "circle",
//         bottom: "bottom",
//         data: legendData,
//         itemGap: 10,
//         itemWidth: 12,
//         itemHeight: 14,
//       },
//       series: [
//         {
//           data: data.map((item) => ({
//             ...item,
//             itemStyle: {
//               color: barColors[item.name]?.color || "#ccc",
//             },
//           })),
//           type: "pie",
//           padAngle: 1,
//           itemStyle: {
//             borderRadius: 0,
//             borderColor: "none",
//             borderWidth: 2,
//           },
//           radius: ["80%", "40%"],
//           center: ["50%", "50%"],
//           label: {
//             show: true,
//             position: "inside",
//             formatter: "{c}",
//             color: "#fff",
//             fontWeight: 500,
//             fontSize: 20,
//           },
//           emphasis: {
//             itemStyle: {
//               borderColor: "none",
//               shadowBlur: 30,
//               borderWidth: 5,
//               shadowOffset: 5,
//             },
//           },
//         },
//       ],
//       graphic: true
//         ? [
//             {
//               type: "text",
//               left: "center",
//               top: "45%",
//               style: {
//                 text: totalValue,
//                 fontSize: 24,
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 fill: "#333",
//               },
//             },
//             {
//               type: "text",
//               left: "center",
//               top: "55%",
//               style: {
//                 text: "Total",
//                 fontSize: 16,
//                 textAlign: "center",
//                 fill: "#999",
//               },
//             },
//           ]
//         : {},
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
//   }, [chartId, data, otherOptions]);

//   return <div ref={chartRef} id={chartId} style={{ width, height }}></div>;
// };

// export default DoughnutChart;
