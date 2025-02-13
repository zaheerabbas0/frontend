import { useState } from 'react';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UsersListColumns } from './UsersListColumns';
import { Icon } from '@iconify/react';
import {
  exportSelectedUsers,
  handleUserDelete,
  userRowClicked,
  usersFilterFields,
} from '../../../utils/UserUtils';
import { Col, Form, Row } from 'antd';
import { CardTitle } from '../../ui/typography';
import { CustomButton } from '../../../styledComponents/CustomButton';
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import FilterDrawer from '../../filterDrawer/FilterDrawer';
import DefaultTableConfigurations from '../../tableConfigurations';
import useUserFilter from '../../../hooks/tableFilter/useUserFilters';
import styles from './UsersList.module.css';
import useCheckStateStatus, {
  SKILL_STATE,
} from '../../../hooks/useCheckStateStatus';
import { User_Route_Name } from '../../../constants/user/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

const UserTable = ({
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
  const { filterValues, setFilterValues } = useUserFilter(
    dataSource,
    setDataSource
  );

  const [usersFilterForm] = Form.useForm();
  const [tableConfigurationsOpen, setTableConfigurationsOpen] = useState(false);

  const generatedColumns = UsersListColumns(navigate, dispatch, filterValues);

  const [columns, setColumns] = useState(generatedColumns);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [displayColumns, setDisplayColumns] = useState(generatedColumns);

  const handleUserRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    usersFilterForm.resetFields();
  };

  const handleFilterOk = () => {
    usersFilterForm
      .validateFields()
      .then((values) => {
        setFilterValues(values);
        setIsDrawerVisible(false);
      })
      .catch((info) => {});
  };

  const { skills } = useCheckStateStatus([SKILL_STATE]);

  return (
    <>
      <Row className={styles.user_list_header}>
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
                    handleUserDelete(
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
                  usersFilterForm.resetFields();
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
                  exportSelectedUsers(
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
                  navigate(`create-${User_Route_Name}`);
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
            onChange: handleUserRowSelect,
          }}
          rowKey="id"
          onRow={userRowClicked(navigate, dispatch)}
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
          form={usersFilterForm}
          filterFields={usersFilterFields(skills)}
          title="User Filter"
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

export default UserTable;
