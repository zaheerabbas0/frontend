import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../../components/graphs/DoughnutChart';
import { Select } from 'antd';
import AxiosInstance from '../../../appURL/AxiosInstance';
import CustomSelect from '../../../styledComponents/CustomSelect';
import { CardTitle } from '../../../components/ui/typography';
import { Regions } from '../../../constants/FieldOptionConstants';
import { Region_Field_Name } from '../../../constants/ticket/FieldsLabelsConstants';

const { Option } = Select;

const StatusColors = {
  Open: { color: '#609CF6' },
  Resolved: { color: '#20BC5B' },
  'On hold': { color: '#F2994A' },
};

const StatusByRegionGraph = () => {
  const [statusRegionData, setStatusRegionData] = useState([]);
  const [filter, setFilter] = useState('All');

  const userInfo = localStorage.getItem('user_info');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const fetchStatusRegionData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/dashboard/region-status/${userId}?region=${filter}`
      );

      const data = response.data;
      if (Array.isArray(data)) {
        setStatusRegionData(data);
      } else {
        console.error('Unexpected data format', data);
      }
    } catch (err) {
      console.error('Error fetching status tickets data', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStatusRegionData();
    }
  }, [filter, userId]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardTitle>{`Status by ${Region_Field_Name}`}</CardTitle>
        <CustomSelect
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 120 }}
        >
          <Option value="All">ALL</Option>
          {Regions.map((region) => (
            <Option key={region} value={region}>
              {region}
            </Option>
          ))}
        </CustomSelect>
      </div>
      <DoughnutChart
        chartId="StatusRegion"
        data={statusRegionData}
        barColors={StatusColors}
        width="100%"
        height="350px"
      />
    </div>
  );
};

export default StatusByRegionGraph;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DoughnutChart from "../../../components/graphs/DoughnutChart";
// import { Select } from "antd";
// import { fetchStatusByRegion } from "../../../reduxToolkit/features/DashboardSlice";
// import CustomSelect from "../../../styledComponents/CustomSelect";
// import { CardTitle } from "../../../components/ui/typography";

// const { Option } = Select;

// const StatusColors = {
//   Open: { color: "#609CF6" },
//   Resolved: { color: "#20BC5B" },
//   "On hold": { color: "#F2994A" },
// };

// const StatusByRegionGraph = () => {
//   const dispatch = useDispatch();
//   const { statusByRegion } = useSelector((state) => state.dashboard);

//   const userData = JSON.parse(localStorage.getItem("user_info"));
//   const userId = userData?.id;

//   const [filter, setFilter] = React.useState("All");

//   const handleFilterChange = (value) => {
//     setFilter(value);
//   };

//   useEffect(() => {
//     console.log("Dispatching fetchStatusByRegion with:", { userId, filter });

//     if (userId) {
//       dispatch(fetchStatusByRegion({ userId, filter }));
//     }
//   }, [filter, userId, dispatch]);

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}>
//         <CardTitle>Status by Regions</CardTitle>
//         <CustomSelect
//           value={filter}
//           onChange={handleFilterChange}
//           style={{ width: 120 }}>
//           <Option value="All">ALL</Option>
//           <Option value="North">North</Option>
//           <Option value="West">West</Option>
//           <Option value="East">East</Option>
//           <Option value="South">South</Option>
//         </CustomSelect>
//       </div>
//       <DoughnutChart
//         chartId="StatusRegion"
//         data={statusByRegion}
//         barColors={StatusColors}
//         width="100%"
//         height="350px"
//       />
//     </div>
//   );
// };

// export default StatusByRegionGraph;
