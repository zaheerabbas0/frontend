import { useState } from 'react';
import CustomSpin from '../../styledComponents/CustomSpin';
import CustomTable from '../../styledComponents/CustomTable';
import { useNavigate } from 'react-router-dom';
import { ticketsListColumns } from './TicketsListColumns';
import { Row } from 'antd';
import { CardTitle } from '../ui/typography';

const RecentActivitiesTable = ({
  spin,
  dataSource = [],
  pagination = true,
  showHeader = true,
}) => {
  const navigate = useNavigate();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const handleTicketRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div style={{ width: '100%' }}>
      <Row className="ticket-list">
        {showHeader && (
          <Row>
            <CardTitle>Recent Activities</CardTitle>
          </Row>
        )}
      </Row>
      <CustomSpin spinning={false}>
        <CustomTable
          rowKey="id"
          columns={ticketsListColumns(filterValues)}
          dataSource={dataSource}
          size={'small'}
          pagination={false}
        />
      </CustomSpin>
    </div>
  );
};

export default RecentActivitiesTable;
