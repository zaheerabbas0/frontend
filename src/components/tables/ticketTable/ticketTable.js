import { useEffect, useState } from 'react';
import './TicketsList.css';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useIsAuthorized from '../../../hooks/useIsAuthorized';
import { Icon } from '@iconify/react';
import {
  exportSelectedTickets,
  handleImportTickets,
  handleTicketCreate,
  handleTicketDelete,
  ticketRowClicked,
  ticketsFilterFields,
} from '../../../utils/TicketUtils';
import { Col, Form, Row, Upload } from 'antd';
import { CardTitle } from '../../ui/typography';
import { CustomButton } from '../../../styledComponents/CustomButton';
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  FilterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import FilterDrawer from '../../filterDrawer/FilterDrawer';
// import AxiosInstance from '../../../appURL/AxiosInstance';
import useCheckStateStatus, {
  CATEGORY_STATE,
  PRIORITY_STATE,
  PROJECT_STATE,
  // SLA_STATE,
  USER_STATE,
} from '../../../hooks/useCheckStateStatus';
import DefaultTableConfigurations from '../../tableConfigurations';
import useTicketFilter from '../../../hooks/tableFilter/useTicketFilters';
import { ticketsListColumns } from './TicketsListColumns';
import { hasPermission } from '../../../constants/UsersRole';
// import { fetchTickets } from '../../../reduxToolkit/features/TicketSlice';
// import { dummyData } from "./data";

const TicketTable = ({
  spin,
  title,
  dataSource = [],
  pagination,
  showFilters,
  showDelete,
  showCreate,
  showImport,
  showExport,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAllowed = useIsAuthorized();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setDataSource] = useState(dataSource);
  const [fileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { filterValues, setFilterValues } = useTicketFilter(
    dataSource,
    setDataSource
  );

  const [ticketsFilterForm] = Form.useForm();
  const [tableConfigurationsOpen, setTableConfigurationsOpen] = useState(false);

  const generatedColumns = ticketsListColumns(
    navigate,
    dispatch,
    isUserAllowed,
    filterValues
  );

  const [columns, setColumns] = useState(generatedColumns);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [displayColumns, setDisplayColumns] = useState(generatedColumns);

  const handleTicketRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleFilterOk = () => {
    ticketsFilterForm
      .validateFields()
      .then((values) => {
        setFilterValues(values);
        setIsDrawerVisible(false);
      })
      .catch((info) => {});
  };

  const userData = JSON.parse(localStorage.getItem('user_info'));

  const handleImport = async () => {
    if (!file || fileUpload) return;

    setFileUpload(true);
    await handleImportTickets(file, userData, dispatch);
    setFile(null);
    setFileUpload(false);
  };

  useEffect(() => {
    if (file) {
      handleImport();
    }
  }, [file]);

  const { users, priorities, categories, projects } = useCheckStateStatus([
    USER_STATE,
    PRIORITY_STATE,
    CATEGORY_STATE,
    PROJECT_STATE,
  ]);

  return (
    <>
      <Row className="ticket-list">
        <Row>
          <CardTitle>{title}</CardTitle>
        </Row>
        <Row gutter={10}>
          {showDelete &&
            selectedRowKeys.length > 1 &&
            hasPermission('delete:ticket') && (
              <CustomButton
                width="100px"
                variant="danger"
                onClick={() => {
                  setIsDeleting(true);
                  handleTicketDelete(
                    selectedRowKeys,
                    dispatch,
                    setSelectedRowKeys
                  ).finally(() => setIsDeleting(false));
                }}
                loading={isDeleting}
                disabled={isDeleting}
              >
                <DeleteOutlined /> Delete
              </CustomButton>
            )}
          <Col>
            {Object.values(filterValues).some(
              (value) => value !== undefined
            ) && (
              <CustomButton
                width="120px"
                variant="default"
                onClick={() => {
                  setFilterValues({});
                  ticketsFilterForm.resetFields();
                }}
              >
                Remove Filters
              </CustomButton>
            )}
          </Col>
          <Col>
            <CustomButton
              variant="default"
              onClick={() => setTableConfigurationsOpen(true)}
            >
              <Icon fontSize="20px" icon="fluent:stack-32-regular" />
            </CustomButton>
          </Col>
          {showFilters && (
            <Col>
              <CustomButton
                variant="default"
                onClick={() => setIsDrawerVisible(true)}
              >
                <FilterOutlined />
              </CustomButton>
            </Col>
          )}

          {showImport && (
            <Col>
              <Upload
                customRequest={({ file, onSuccess }) => {
                  setFile(file);
                  onSuccess(null, file);
                }}
                showUploadList={false}
                accept=".xlsx,.xls"
              >
                <CustomButton
                  variant="default"
                  loading={fileUpload}
                  disabled={fileUpload}
                  icon={<UploadOutlined />}
                >
                  Import
                </CustomButton>
              </Upload>
            </Col>
          )}

          {showExport && (
            <Col>
              <CustomButton
                width="100px"
                variant="default"
                onClick={() =>
                  exportSelectedTickets(
                    selectedRowKeys,
                    dataSource,
                    displayColumns
                  )
                }
              >
                <ExportOutlined /> Export
              </CustomButton>
            </Col>
          )}

          {showCreate && (
            <Col>
              <CustomButton
                width="100px"
                onClick={() => handleTicketCreate(navigate)}
              >
                <PlusOutlined /> Create
              </CustomButton>
            </Col>
          )}
        </Row>
      </Row>

      <CustomSpin spinning={spin || fileUpload || isDeleting}>
        <CustomTable
          rowClassName={(record) =>
            record.is_escalated ? 'highlighted-row' : ''
          }
          rowSelection={{
            selectedRowKeys,
            onChange: handleTicketRowSelect,
          }}
          rowKey="id"
          onRow={ticketRowClicked(navigate)}
          columns={displayColumns}
          dataSource={data}
          pagination={{
            pagination,
            // pageSize: 143
          }}
          size={'small'}
          scroll={{ x: 3200, y: 590 }}
          showSorterTooltip={false}
        />
      </CustomSpin>

      {showFilters && (
        <FilterDrawer
          isVisible={isDrawerVisible}
          onClose={() => {
            setIsDrawerVisible(false);
            ticketsFilterForm.resetFields();
          }}
          onOk={handleFilterOk}
          form={ticketsFilterForm}
          filterFields={ticketsFilterFields(
            users,
            priorities,
            categories?.data,
            projects
          )}
          title="Ticket Filter"
          filterValues={filterValues}
        />
      )}
      {tableConfigurationsOpen ? (
        <DefaultTableConfigurations
          columns={columns}
          availableColumns={availableColumns}
          setAvailableColumns={setAvailableColumns}
          displayColumns={displayColumns}
          setDisplayColumns={setDisplayColumns}
          setColumns={setColumns}
          open={tableConfigurationsOpen}
          setOpen={setTableConfigurationsOpen}
        />
      ) : null}
    </>
  );
};

export default TicketTable;
