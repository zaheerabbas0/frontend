import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Row, Tabs, Upload, message } from 'antd';
import {
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchContracts } from '../../../reduxToolkit/features/ContractSlice';
import {
  handleContractDelete,
  exportSelectedContracts,
  handleContractCreate,
  contractRowClicked,
} from '../../../utils/ContractUtils';
import './ContractsList.css';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { CustomButton } from '../../../styledComponents/CustomButton';
import { contractsListColumns } from './ContractsListColumns';
import CustomTabs from '../../../styledComponents/CustomTabs';
import CustomersList from '../../customer/customersList/CustomersList';
import CustomersIcon from '../../../assets/CustomersListIcon.svg';
import ContractsIcon from '../../../assets/ContractsIcon.svg';
import AxiosInstance from '../../../appURL/AxiosInstance';
import useIsAuthorized from '../../../hooks/useIsAuthorized';
import { CardTitle } from '../../../components/ui/typography';

const ContractsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const contractData = useSelector((state) => state.contract.contracts);
  const contractStatus = useSelector((state) => state.contract.status);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const isUserAllowed = useIsAuthorized();

  const handleContractRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const userData = JSON.parse(localStorage.getItem('user_info'));

  useEffect(() => {
    const handleImport = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const userId = userData?.id;

        const response = await AxiosInstance.post(
          `/api/v1/contract/create-contracts-bulk/${userId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    if (file) {
      handleImport();
    }
  }, [file, userData]);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        if (contractStatus === 'idle') {
          await dispatch(fetchContracts());
        }
      } catch (error) {
        message.error('Failed to fetch contracts');
      }
    };
    fetchContractData();
  }, [contractStatus, dispatch]);

  const [activeContractTabKey, setActiveTicketTabKey] = useState(
    localStorage.getItem('activeContractTabKey') || 'ContractsList'
  );

  const handleTabChange = (key) => {
    setActiveTicketTabKey(key);
    localStorage.setItem('activeContractTabKey', key);
  };

  return (
    <div className="contracts-list-tabs">
      <Row className="contracts-tabs">
        <CustomTabs
          activeKey={activeContractTabKey}
          onChange={handleTabChange}
          style={{ overflow: 'auto', width: '100%' }}
        >
          <Tabs.TabPane
            tab={
              <span>
                <img src={CustomersIcon} alt="Customers" />
                Customers
              </span>
            }
            key="CustomerList"
          >
            <CustomersList />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <img src={ContractsIcon} alt="Contracts" />
                Contracts
              </span>
            }
            key="ContractsList"
          >
            <Row
              className="contract-list-header"
              style={{ background: 'white' }}
            >
              <Row>
                <CardTitle>Contracts</CardTitle>
              </Row>
              <Row gutter={10}>
                <Col>
                  {selectedRowKeys.length > 1 && isUserAllowed && (
                    <CustomButton
                      width="100px"
                      variant="danger"
                      onClick={() => {
                        setIsDeleting(true);
                        handleContractDelete(
                          selectedRowKeys,
                          dispatch,
                          setSelectedRowKeys
                        ).finally(() => setIsDeleting(false));
                      }}
                    >
                      <DeleteOutlined /> Delete
                    </CustomButton>
                  )}
                </Col>
                <Col>
                  <Upload
                    customRequest={({ file, onSuccess }) => {
                      setFile(file);
                      onSuccess(null, file);
                    }}
                    showUploadList={false}
                    // onChange={handleFileChange}
                  >
                    <CustomButton variant="default" icon={<UploadOutlined />}>
                      Import
                    </CustomButton>
                  </Upload>
                </Col>
                <Col>
                  <CustomButton
                    variant="default"
                    width="100px"
                    onClick={() =>
                      exportSelectedContracts(selectedRowKeys, contractData)
                    }
                  >
                    <ExportOutlined /> Export
                  </CustomButton>
                </Col>
                <Col>
                  {isUserAllowed && (
                    <CustomButton
                      variant="colored"
                      onClick={() => handleContractCreate(navigate)}
                      width="100px"
                    >
                      <PlusOutlined /> Create
                    </CustomButton>
                  )}
                </Col>
              </Row>
            </Row>
            <CustomSpin
              spinning={contractStatus === 'loadingContracts' || isDeleting}
            >
              <CustomTable
                rowSelection={{
                  selectedRowKeys,
                  onChange: handleContractRowSelect,
                }}
                rowKey="id"
                onRow={contractRowClicked(navigate, dispatch)}
                size={'small'}
                columns={contractsListColumns(
                  navigate,
                  dispatch,
                  isUserAllowed
                )}
                dataSource={contractData}
                scroll={{ x: 2000, y: 840 }}
              />
            </CustomSpin>
          </Tabs.TabPane>
        </CustomTabs>
      </Row>
    </div>
  );
};

export default ContractsList;
