import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useUserFilters = (dataSource, setDataSource) => {
  const location = useLocation();
  const pathState = location.state;

  const [filterValues, setFilterValues] = useState(pathState || {});

  useEffect(() => {
    const filterData = () => {
      let filteredData = dataSource;

      // console.log('Filter Values:', filterValues);

      if (filterValues.name) {
        filteredData = filteredData.filter(
          (item) => item.name === filterValues.name
        );
      }
      if (filterValues.status) {
        filteredData = filteredData.filter(
          (item) => item.status === filterValues.status
        );
      }
      if (filterValues.skill) {
        filteredData = filteredData.filter(
          (item) => item.designation?.id === filterValues.skill
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

export default useUserFilters;
