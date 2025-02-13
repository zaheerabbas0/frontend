import { useEffect, useState } from 'react';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomersListColumns } from './CustomersListColumns';
import { Icon } from '@iconify/react';
import {
  exportSelectedCustomers,
  handleCustomerDelete,
  customerRowClicked,
  customersFilterFields,
} from '../../../utils/CustomerUtils';
import { Col, Form, message, Row, Upload } from 'antd';
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
import DefaultTableConfigurations from '../../tableConfigurations';
import useCustomerFilter from '../../../hooks/tableFilter/useCustomerFilter';
import styles from './CustomersList.module.css';
import useCheckStateStatus, {
  SKILL_STATE,
} from '../../../hooks/useCheckStateStatus';
import AxiosInstance from '../../../appURL/AxiosInstance';
import {
  Customer_Entity_Name,
  Customer_Route_Name,
} from '../../../constants/customer/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

const CustomerTable = ({
  spin,
  title,
  dataSource = [],
  pagination,
  showFilters,
  showDelete,
  showCreate,
  showImport,
  showExport,
  showSwap,
  //   showImport,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [file, setFile] = useState(null);
  const [data, setDataSource] = useState(dataSource);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { filterValues, setFilterValues } = useCustomerFilter(
    dataSource,
    setDataSource
  );

  const [customersFilterForm] = Form.useForm();
  const [tableConfigurationsOpen, setTableConfigurationsOpen] = useState(false);

  const generatedColumns = CustomersListColumns(
    navigate,
    dispatch,
    filterValues
  );

  const [columns, setColumns] = useState(generatedColumns);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [displayColumns, setDisplayColumns] = useState(generatedColumns);

  const handleCustomerRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    customersFilterForm.resetFields();
  };

  const handleFilterOk = () => {
    customersFilterForm
      .validateFields()
      .then((values) => {
        setFilterValues(values);
        setIsDrawerVisible(false);
      })
      .catch((info) => {});
  };

  const { skills } = useCheckStateStatus([SKILL_STATE]);
  const userData = JSON.parse(localStorage.getItem('user_info'));

  useEffect(() => {
    const handleImport = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const userId = userData?.id;
        const response = await AxiosInstance.post(
          `/api/v1/ticket/create-tickets-bulk/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
        message.success(`${Customer_Entity_Name} imported successfully`);

        // dispatch(fetchTickets());
      } catch (error) {
        message.error(`Failed to import ${Customer_Entity_Name}`);
      }
    };

    if (file) {
      handleImport();
    }
  }, [file, userData, dispatch]);

  return (
    <>
      <Row className={styles.customer_list_header}>
        <Row>
          <CardTitle>{title}</CardTitle>
        </Row>
        <Row gutter={10}>
          {showDelete &&
            selectedRowKeys.length > 1 &&
            hasPermission('delete:users') && (
              <Col>
                <CustomButton
                  width="100px"
                  variant="danger"
                  onClick={() => {
                    setIsDeleting(true);
                    handleCustomerDelete(
                      selectedRowKeys,
                      dispatch,
                      setSelectedRowKeys
                    ).finally(() => setIsDeleting(false));
                  }}
                >
                  <DeleteOutlined /> Delete
                </CustomButton>
              </Col>
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
                  customersFilterForm.resetFields();
                }}
              >
                Remove Filters
              </CustomButton>
            )}
          </Col>
          {showSwap && (
            <Col>
              <CustomButton
                variant="default"
                onClick={() => setTableConfigurationsOpen(true)}
              >
                <Icon fontSize="20px" icon="fluent:stack-32-regular" />
              </CustomButton>
            </Col>
          )}
          {showFilters && (
            <Col>
              <CustomButton variant="default" onClick={showDrawer}>
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
                <CustomButton variant="default" icon={<UploadOutlined />}>
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
                  exportSelectedCustomers(
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
                onClick={() => {
                  navigate(`create-${Customer_Route_Name}`);
                }}
              >
                <PlusOutlined /> Create
              </CustomButton>
            </Col>
          )}
        </Row>
      </Row>

      <CustomSpin spinning={spin}>
        <CustomTable
          rowSelection={{
            selectedRowKeys,
            onChange: handleCustomerRowSelect,
          }}
          rowKey="id"
          onRow={customerRowClicked(navigate, dispatch)}
          columns={displayColumns}
          dataSource={data}
          pagination={pagination}
          size={'small'}
          scroll={{ x: 1600, y: 510 }}
          showSorterTooltip={false}
        />
      </CustomSpin>

      {showFilters && (
        <FilterDrawer
          isVisible={isDrawerVisible}
          onClose={handleDrawerClose}
          onOk={handleFilterOk}
          form={customersFilterForm}
          filterFields={customersFilterFields(skills)}
          title={`${Customer_Entity_Name} Filter`}
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

export default CustomerTable;
