import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useAdminFilters = (dataSource, setDataSource) => {
  const location = useLocation();
  const pathState = location.state;

  const [filterValues, setFilterValues] = useState(pathState || {});

  useEffect(() => {
    const filterData = () => {
      let filteredData = dataSource;

      // console.log('Filter Values:', filterValues);

      if (filterValues.name) {
        const escapedName = filterValues.name.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        ); // Escape special characters
        const regex = new RegExp(escapedName, 'i');
        filteredData = filteredData.filter((item) => regex.test(item?.name));
      }

      if (filterValues.email) {
        const regex = new RegExp(`\\b${filterValues.email}\\b`, 'i');
        filteredData = filteredData.filter((item) => regex.test(item?.email));
      }

      if (filterValues.status) {
        filteredData = filteredData.filter(
          (item) => item.status === filterValues.status
        );
      }
      if (filterValues.role) {
        filteredData = filteredData.filter(
          (item) => item.user_type_id === filterValues.role
        );
      }
      setDataSource(filteredData);
    };

    filterData();
  }, [filterValues, dataSource]);

  useEffect(() => {
    return () => {
      setFilterValues({});
    };
  }, []);

  return { filterValues, setFilterValues };
};

export default useAdminFilters;
