import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row } from 'antd';
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  exportSelectedAdmins,
  handleAdminDelete,
  adminRowClicked,
  adminsFilterFields,
} from '../../../utils/AdminUtils';
import { AdminsListColumns } from './AdminsListColumns';
import FilterDrawer from '../../filterDrawer/FilterDrawer';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { CustomButton } from '../../../styledComponents/CustomButton';
import { CardTitle } from '../../ui/typography';
import { Icon } from '@iconify/react';
import DefaultTableConfigurations from '../../tableConfigurations';
import useAdminFilter from '../../../hooks/tableFilter/useUserFilters';
// import useCheckStateStatus, {
//   SKILL_STATE,
// } from '../../../hooks/useCheckStateStatus';
import styles from './AdminsList.module.css';
import { hasPermission } from '../../../constants/UsersRole';

const AdminTable = ({
  spin,
  title,
  dataSource = [],
  pagination,
  showFilters,
  showDelete,
  showCreate,
  showExport,
  showSwap,
  //   showImport,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  //   const [file, setFile] = useState(null);
  const [data, setDataSource] = useState(dataSource);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { filterValues, setFilterValues } = useAdminFilter(
    dataSource,
    setDataSource
  );

  const [adminsFilterForm] = Form.useForm();
  const [tableConfigurationsOpen, setTableConfigurationsOpen] = useState(false);

  const generatedColumns = AdminsListColumns(navigate, dispatch, filterValues);

  const [columns, setColumns] = useState(generatedColumns);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [displayColumns, setDisplayColumns] = useState(generatedColumns);

  const handleAdminRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    adminsFilterForm.resetFields();
  };

  const handleFilterOk = () => {
    adminsFilterForm
      .validateFields()
      .then((values) => {
        setFilterValues(values);
        setIsDrawerVisible(false);
      })
      .catch((info) => {});
  };

  return (
    <>
      <Row className={styles.admin_list_header}>
        <Row>
          <CardTitle>{title}</CardTitle>
        </Row>
        <Row gutter={10}>
          {showDelete &&
            selectedRowKeys.length > 1 &&
            hasPermission('delete:admins') && (
              <Col>
                <CustomButton
                  width="100px"
                  variant="danger"
                  onClick={() => {
                    setIsDeleting(true);
                    handleAdminDelete(
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
                  adminsFilterForm.resetFields();
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

          {showExport && (
            <Col>
              <CustomButton
                width="100px"
                variant="default"
                onClick={() =>
                  exportSelectedAdmins(
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
                  navigate('create-admin');
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
            onChange: handleAdminRowSelect,
          }}
          rowKey="id"
          onRow={adminRowClicked(navigate, dispatch)}
          columns={displayColumns}
          dataSource={data}
          pagination={pagination}
          size={'small'}
          scroll={{ x: 1600, y: 640 }}
          showSorterTooltip={false}
        />
      </CustomSpin>

      {showFilters && (
        <FilterDrawer
          isVisible={isDrawerVisible}
          onClose={handleDrawerClose}
          onOk={handleFilterOk}
          form={adminsFilterForm}
          filterFields={adminsFilterFields}
          title="Admins Filter"
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

export default AdminTable;
