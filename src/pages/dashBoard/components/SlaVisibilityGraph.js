import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import CustomSelect from '../../../styledComponents/CustomSelect';
import { CardTitle } from '../../../components/ui/typography';
import BarChart from '../../../components/graphs/BarChart';
import AxiosInstance from '../../../appURL/AxiosInstance';

const { Option } = Select;

const barColors = {
  'Within SLAs': { color: '#7AC555' },
  'SLAs Breached': { color: '#D95C41' },
};

const SlaVisibilityGraph = () => {
  const [slaVisibilityData, setSlaVisibilityData] = useState([]);
  const [filter, setFilter] = useState('Y');
  const userInfo = localStorage.getItem('user_info');
  const userId = userInfo ? JSON.parse(userInfo).id : null;
  useEffect(() => {
    const fetchSlaData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/v1/dashboard/sla-visibility/${userId}?period=${filter}`
        );
        const data = response.data;
        setSlaVisibilityData(data);
      } catch (error) {
        console.error('Error fetching SLA visibility data:', error);
      }
    };

    fetchSlaData();
  }, [filter, userId]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>SLA Visibility by Status</CardTitle>
        <CustomSelect
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 120 }}
        >
          <Option value="Y">Year</Option>
          <Option value="M">Month</Option>
          <Option value="W">Week</Option>
        </CustomSelect>
      </div>
      <BarChart
        chartId="SlaVisibility"
        seriesData={slaVisibilityData}
        barColors={barColors}
        width="100%"
        height="350px"
      />
    </>
  );
};

export default SlaVisibilityGraph;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Select } from "antd";
// import { fetchSlaVisibility } from "../../../reduxToolkit/features/DashboardSlice";
// import BarChart from "../../../components/graphs/BarChart";
// import CustomSelect from "../../../styledComponents/CustomSelect";
// import { CardTitle } from "../../../components/ui/typography";

// const { Option } = Select;

// const barColors = {
//   "SLA Within": { color: "#7AC555" },
//   "SLA Breached": { color: "#D95C41" },
// };

// const SlaVisibilityGraph = () => {
//   const [filter, setFilter] = useState("Y");
//   const dispatch = useDispatch();
//   const slaVisibilityData = useSelector(
//     (state) => state.dashboard.slaVisibilityData
//   );
//   const userInfo = localStorage.getItem("user_info");
//   const userId = userInfo ? JSON.parse(userInfo).id : null;

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchSlaVisibility({ userId, filter }));
//     }
//   }, [filter, userId, dispatch]);

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

// export default SlaVisibilityGraph;

// import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/graphs/BarChart";
// import CustomSelect from "../../../styledComponents/CustomSelect";
// import { Select } from "antd";
// import { CardTitle } from "../../../components/ui/typography";

// const { Option } = Select;

// const barColors = {
//   "SLA Within": { color: "#7AC555" },
//   "SLA Breached": { color: "#D95C41" },
// };

// const slaData = {
//   Y: [
//     {
//       name: "SLA Within",
//       data: [
//         { name: "Jan", value: 120 },
//         { name: "Feb", value: 100 },
//         { name: "Mar", value: 90 },
//         { name: "Jan", value: 120 },
//         { name: "Feb", value: 100 },
//         { name: "Mar", value: 90 },
//         { name: "Jan", value: 120 },
//         { name: "Feb", value: 100 },
//         { name: "Mar", value: 90 },
//         { name: "Jan", value: 120 },
//         { name: "Feb", value: 100 },
//         { name: "Mar", value: 90 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Jan", value: 30 },
//         { name: "Feb", value: 20 },
//         { name: "Mar", value: 40 },
//         { name: "Jan", value: 30 },
//         { name: "Feb", value: 20 },
//         { name: "Mar", value: 40 },
//         { name: "Jan", value: 30 },
//         { name: "Feb", value: 20 },
//         { name: "Mar", value: 40 },
//         { name: "Jan", value: 30 },
//         { name: "Feb", value: 20 },
//         { name: "Mar", value: 40 },
//       ],
//     },
//   ],
//   M: [
//     {
//       name: "SLA Within",
//       data: [
//         { name: "Week 1", value: 10 },
//         { name: "Week 2", value: 15 },
//         { name: "Week 3", value: 20 },
//         { name: "Week 4", value: 5 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Week 1", value: 5 },
//         { name: "Week 2", value: 3 },
//         { name: "Week 3", value: 2 },
//         { name: "Week 4", value: 1 },
//       ],
//     },
//   ],
//   W: [
//     {
//       name: "SLA Within",
//       data: [
//         { name: "Mon", value: 2 },
//         { name: "Tue", value: 3 },
//         { name: "Wed", value: 1 },
//         { name: "Thu", value: 4 },
//         { name: "Fri", value: 5 },
//         { name: "Sat", value: 6 },
//         { name: "Sun", value: 2 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Mon", value: 1 },
//         { name: "Tue", value: 5 },
//         { name: "Wed", value: 1 },
//         { name: "Thu", value: 2 },
//         { name: "Fri", value: 7 },
//         { name: "Sat", value: 8 },
//         { name: "Sun", value: 5 },
//       ],
//     },
//   ],
// };

// const SlaVisibilityGraph = () => {
//   const [slaVisibilityData, setSlaVisibilityData] = useState([]);
//   const [filter, setFilter] = useState("Y");

//   useEffect(() => {
//     const data = slaData[filter];
//     setSlaVisibilityData(data);
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

// export default SlaVisibilityGraph;
