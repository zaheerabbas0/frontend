import React, { useState, useEffect } from 'react';
import { CardTitle } from '../../../../components/ui/typography';
import BarChart from '../../../../components/graphs/BarChart';

const barColors = {
  'SLA Within': { color: '#7AC555' },
  'SLA Breached': { color: '#D95C41' },
};

const slaData = {
  Y: [
    {
      name: 'SLA Within',
      data: [{ name: 'Nets', value: 120 }],
    },
    {
      name: 'SLA Breached',
      data: [{ name: 'Nets', value: 140 }],
    },
  ],
};

const SlaGraph = ({ data = [] }) => {
  // const [slaVisibilityData, setSlaVisibilityData] = useState([]);
  // const [filter, setFilter] = useState("Y");

  // useEffect(() => {
  //   const data = slaData[filter];
  //   setSlaVisibilityData(data);
  // }, [filter]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>SLA </CardTitle>
      </div>
      <BarChart
        chartId="SlaGraph"
        seriesData={data}
        barColors={barColors}
        width="100%"
        height="350px"
      />
    </>
  );
};

export default SlaGraph;

// import React, { useState, useEffect } from "react";
// import BarChart from "../../components/graphs/BarChart";
// import AxiosInstance from "../../appURL/AxiosInstance";
// import { Select } from "antd";
// import CustomSelect from "../../styledComponents/CustomSelect";
// import { CardTitle } from "../../components/ui/typography";

// const { Option } = Select;

// const barColors = {
//   "SLA Within": { color: "#7AC555" },
//   "SLA Breached": { color: "#D95C41" },
// };

// const SlaVisibilityByProject = () => {
//   const [slaVisibilityData, setSlaVisibilityData] = useState([]);
//   const [filter, setFilter] = useState("Y");
//   const userInfo = localStorage.getItem("user_info");
//   const userId = userInfo ? JSON.parse(userInfo).id : null;
//   useEffect(() => {
//     const fetchSlaData = async () => {
//       try {
//         const response = await AxiosInstance.get(
//           `/api/v1/dashboard/tickets-per-project/${userId}?period=${filter}`
//         );
//         const data = response.data;
//         setSlaVisibilityData(data);
//       } catch (error) {
//         console.error("Error fetching SLA visibility data:", error);
//       }
//     };

//     fetchSlaData();
//   }, [filter]);

//   const handleFilterChange = (value) => {
//     setFilter(value);
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}>
//         <CardTitle>SLA Visibility by Status</CardTitle>
//         <CustomSelect
//           value={filter}
//           onChange={handleFilterChange}
//           style={{ width: 120 }}>
//           <Option value="Y">Year</Option>
//           <Option value="M">Month</Option>
//           <Option value="W">Week</Option>
//         </CustomSelect>
//       </div>
//       <BarChart
//         chartId="SlaVisibility"
//         seriesData={slaVisibilityData}
//         barColors={barColors}
//         width="100%"
//         height="350px"
//       />
//     </>
//   );
// };

// export default SlaVisibilityByProject;
