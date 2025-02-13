import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Escalated_Key } from '../../constants/FieldOptionConstants';

const useTicketFilter = (dataSource, setDataSource) => {
  const location = useLocation();
  const pathState = location.state;

  const [filterValues, setFilterValues] = useState(pathState || {});

  useEffect(() => {
    const filterData = () => {
      let filteredData = dataSource;

      // console.log('Filter Values:', filterValues);

      if (filterValues.projects) {
        filteredData = filteredData.filter(
          (item) => item.project?.id === filterValues.projects
        );
      }
      if (filterValues.category) {
        filteredData = filteredData.filter(
          (item) => item.category?.id === filterValues.category
        );
      }
      if (filterValues.status) {
        if (filterValues.status !== Escalated_Key) {
          filteredData = filteredData.filter(
            (item) => item.status === filterValues.status
          );
        } else {
          filteredData = filteredData.filter((item) => item.is_escalated);
        }
      }

      if (filterValues.priority) {
        filteredData = filteredData.filter(
          (item) => item.sla?.id === filterValues.priority
        );
      }
      if (filterValues.assignee) {
        filteredData = filteredData.filter((item) =>
          item.assignees.some(
            (assignee) => assignee.id === filterValues.assignee
          )
        );
      }
      if (filterValues.sla) {
        filteredData = filteredData.filter(
          (item) => item.sla.id === filterValues.sla
        );
      }
      if (filterValues.region) {
        filteredData = filteredData.filter(
          (item) => item.region === filterValues.region
        );
      }

      if (filterValues.sla_status) {
        filteredData = filteredData.filter(
          (item) => item.violate_status === filterValues.sla_status
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

export default useTicketFilter;
