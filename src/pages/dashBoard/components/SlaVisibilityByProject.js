import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import AxiosInstance from '../../../appURL/AxiosInstance';
import BarChart from '../../../components/graphs/BarChart';
import { CardTitle } from '../../../components/ui/typography';
import CustomSelect from '../../../styledComponents/CustomSelect';
import { Project_Module_Name } from '../../../constants/project/TitleRoutesConstants';

const { Option } = Select;

const barColors = {
  'Within SLAs': { color: '#7AC555' },
  'SLAs Breached': { color: '#D95C41' },
};

const SlaVisibilityByProject = () => {
  const [slaVisibilityData, setSlaVisibilityData] = useState([]);
  const [filter, setFilter] = useState('Y');
  const userInfo = localStorage.getItem('user_info');
  const userId = userInfo ? JSON.parse(userInfo).id : null;
  useEffect(() => {
    const fetchSlaData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/v1/dashboard/tickets-per-project/${userId}?period=${filter}`
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
        <CardTitle>{`Tickets by ${Project_Module_Name}`}</CardTitle>
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
        // xAxisLabelOptions={{ interval: 0, rotate: 35 }}
        seriesData={slaVisibilityData}
        barColors={barColors}
        width="100%"
        height="350px"
      />
    </>
  );
};

export default SlaVisibilityByProject;
// import React, { useState, useEffect } from "react";
// import BarChart from "../../../components/graphs/BarChart";
// import { Select } from "antd";
// import CustomSelect from "../../../styledComponents/CustomSelect";
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
//         { name: "Nets", value: 120 },
//         { name: "Mobily", value: 100 },
//         { name: "Hyperoptic", value: 90 },
//         { name: "NETS UK", value: 120 },
//         { name: "Cisco", value: 100 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Nets", value: 140 },
//         { name: "Mobily", value: 80 },
//         { name: "Hyperoptic", value: 70 },
//         { name: "NETS UK", value: 50 },
//         { name: "Cisco", value: 80 },
//       ],
//     },
//   ],
//   M: [
//     {
//       name: "SLA Within",
//       data: [
//         { name: "Nets", value: 90 },
//         { name: "Mobily", value: 85 },
//         { name: "Hyperoptic", value: 60 },
//         { name: "NETS UK", value: 55 },
//         { name: "Cisco", value: 72 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Nets", value: 70 },
//         { name: "Mobily", value: 55 },
//         { name: "Hyperoptic", value: 80 },
//         { name: "NETS UK", value: 75 },
//         { name: "Cisco", value: 42 },
//       ],
//     },
//   ],
//   W: [
//     {
//       name: "SLA Within",
//       data: [
//         { name: "Nets", value: 80 },
//         { name: "Mobily", value: 75 },
//         { name: "Hyperoptic", value: 80 },
//         { name: "NETS UK", value: 75 },
//         { name: "Cisco", value: 52 },
//       ],
//     },
//     {
//       name: "SLA Breached",
//       data: [
//         { name: "Nets", value: 40 },
//         { name: "Mobily", value: 55 },
//         { name: "Hyperoptic", value: 90 },
//         { name: "NETS UK", value: 55 },
//         { name: "Cisco", value: 22 },
//       ],
//     },
//   ],
// };

// const SlaVisibilityByProject = () => {
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
//         <CardTitle>SLA Visibility By Project</CardTitle>
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
//         chartId="SlaVisibilityByProject"
//         seriesData={slaVisibilityData}
//         barColors={barColors}
//         width="100%"
//         height="350px"
//       />
//     </>
//   );
// };

// export default SlaVisibilityByProject;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Select } from "antd";
// import { fetchTicketsPerProject } from "../../../reduxToolkit/features/DashboardSlice";
// import BarChart from "../../../components/graphs/BarChart";
// import { CardTitle } from "../../../components/ui/typography";
// import CustomSelect from "../../../styledComponents/CustomSelect";

// const { Option } = Select;

// const barColors = {
//   "SLA Within": { color: "#7AC555" },
//   "SLA Breached": { color: "#D95C41" },
// };

// const SlaVisibilityByProject = () => {
//   const [filter, setFilter] = useState("Y");
//   const dispatch = useDispatch();
//   const ticketsPerProjectData = useSelector(
//     (state) => state.dashboard.ticketsPerProjectData
//   );
//   const userInfo = localStorage.getItem("user_info");
//   const userId = userInfo ? JSON.parse(userInfo).id : null;

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchTicketsPerProject({ userId, filter }));
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
//         chartId="SlaVisibilityByProject"
//         seriesData={ticketsPerProjectData}
//         barColors={barColors}
//         width="100%"
//         height="350px"
//       />
//     </>
//   );
// };

// export default SlaVisibilityByProject;
