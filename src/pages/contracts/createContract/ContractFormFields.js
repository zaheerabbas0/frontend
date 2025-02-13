import React, { useState } from 'react';
import { Col, Form, DatePicker, Select, Switch, Tag } from 'antd';
import { CustomInput } from '../../../styledComponents/CustomInput';
import CustomSelect from '../../../styledComponents/CustomSelect';
import { disabledDate, handleOpenChange } from '../../../utils/ContractUtils';
import CustomDragger from '../../../styledComponents/CustomDragger';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getStatusStyles, getTypeStyles } from '../../../utils/Utils';

const { Option } = Select;

const contractFieldConfigurations = [
  {
    label: 'Contract Name',
    name: 'name',
    type: 'input',
    placeholder: 'Enter Contract name',
    rules: [{ required: true, message: 'Please enter Contract Name!' }],
  },
  {
    label: 'Type',
    name: 'contract_type',
    type: 'contract_type',
    placeholder: 'Select type',
    rules: [{ required: true, message: 'Please select Type!' }],
    options: [
      'Warranty',
      'Maintenance',
      'Lease',
      'Software License',
      'Manage Services',
      'Annual Contract',
    ],
  },
  {
    label: 'Status',
    name: 'status',
    type: 'status',
    placeholder: 'Select status',
    rules: [{ required: true, message: 'Please select Status!' }],
    options: ['In Progress', 'On Hold', 'Resolved'],
  },
  {
    label: 'Customer',
    name: 'customer_id',
    type: 'customer_id',
    placeholder: 'Select Customer',
    rules: [{ required: true, message: 'Please select Customer!' }],
    options: [],
  },

  {
    label: 'Visible To',
    name: 'visible_to_ids',
    type: 'visible_to_ids',
    mode: 'multiple',
    placeholder: 'Select visibility',
    rules: [{ required: true, message: 'Please select visibility!' }],
    options: [],
  },
  {
    label: 'Vendor Name',
    name: 'vendor_name',
    type: 'input',
    placeholder: 'Enter Vendor name',
    rules: [{ required: true, message: 'Please enter Vendor Name!' }],
  },
  {
    label: 'Collaborators',
    name: 'collaborator_ids',
    type: 'collaborator_ids',
    placeholder: 'Select Collaborators',
    options: [],
    mode: 'multiple',
    rules: [{ required: true, message: 'Please select Collaborators!' }],
  },
  {
    label: 'Cost',
    name: 'cost',
    type: 'input',
    placeholder: 'Enter cost',
    rules: [{ required: true, message: 'Please enter Cost!' }],
  },
  {
    label: 'Start Date',
    name: 'start_date',
    type: 'date',
    placeholder: 'Select start date',
    rules: [{ required: true, message: 'Please select Start Date!' }],
  },
  {
    label: 'Due Date',
    name: 'due_date',
    type: 'date',
    placeholder: 'Select due date',
    rules: [{ required: true, message: 'Please select Due Date!' }],
  },
  {
    label: 'Auto Renew',
    name: 'auto_renew',
    type: 'auto_renew',
    colSpan: 24,
  },
  {
    label: 'Notify Expire',
    name: 'notify_expire',
    type: 'notify_expire',
    placeholder: '',
    colSpan: 24,
  },
  {
    label: 'Notify To',
    name: 'notify_expiry',
    type: 'input',
    placeholder: 'Enter multiple emails',
    rules: [
      { required: true, message: 'Please enter email addresses!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
  },
  {
    label: 'Notify Before',
    name: 'notify_before',
    type: 'input',
    placeholder: 'Enter number of days',
    rules: [{ required: true, message: 'Please enter notification days!' }],
  },
  {
    label: 'Attachment',
    name: 'attachment_file',
    type: 'dragger',
    placeholder: 'Select attachment',
    colSpan: 24,
  },
];

const renderFormItem = (
  field,
  users,
  customers,
  notifyExpire,
  onNotifyExpireChange,
  autoRenew,
  onAutoRenewChange,
  onFileChange
) => {
  switch (field.type) {
    case 'input':
      return (
        <CustomInput
          placeholder={field.placeholder}
          style={{ width: '100%' }}
        />
      );
    case 'select':
      return (
        <CustomSelect placeholder={field.placeholder} style={{ width: '100%' }}>
          {field.options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'status':
      return (
        <CustomSelect placeholder={field.placeholder}>
          {field.options.map((option) => {
            const { color, backgroundColor } = getStatusStyles(option);
            return (
              <Option key={option} value={option}>
                <Tag color={backgroundColor} style={{ color }}>
                  {option}
                </Tag>
              </Option>
            );
          })}
        </CustomSelect>
      );
    case 'contract_type':
      return (
        <CustomSelect placeholder={field.placeholder}>
          {field.options.map((option) => {
            const { color, backgroundColor } =
              // getTypeStyles
              option;
            return (
              <Option key={option} value={option}>
                <Tag color={backgroundColor} style={{ color }}>
                  {option}
                </Tag>
              </Option>
            );
          })}
        </CustomSelect>
      );

    case 'customer_id':
      return (
        <CustomSelect
          placeholder={field.placeholder}
          allowClear
          style={{ width: '100%' }}
        >
          {customers.map((customer) => (
            <Option key={customer.id} value={customer.id}>
              {customer.name}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'collaborator_ids':
      return (
        <CustomSelect
          placeholder={field.placeholder}
          allowClear
          mode={field.mode}
          style={{ width: '100%' }}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'visible_to_ids':
      return (
        <CustomSelect
          placeholder={field.placeholder}
          allowClear
          mode={field.mode}
          style={{ width: '100%' }}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'date':
      return (
        <DatePicker
          showTime
          placeholder={field.placeholder}
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          onOpenChange={handleOpenChange}
        />
      );
    case 'notify_expire':
      return (
        <SwitchContainer>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={onNotifyExpireChange}
          />
          <span>{field.label}</span>
        </SwitchContainer>
      );
    case 'dragger':
      return (
        <CustomDragger mode="single" height={120} onFileChange={onFileChange} />
      );
    case 'auto_renew':
      return (
        <SwitchContainer>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={autoRenew === 'True'}
            onChange={(checked) =>
              onAutoRenewChange(checked ? 'True' : 'False')
            }
          />
          <span>{field.label}</span>
        </SwitchContainer>
      );
    default:
      return <CustomInput style={{ width: '100%' }} />;
  }
};

const ContractFormFields = ({ customers, users, onFileChange }) => {
  const [notifyExpire, setNotifyExpire] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  const handleNotifyExpireChange = (checked) => {
    setNotifyExpire(checked);
  };

  const handleAutoRenewChange = (checked) => {
    setAutoRenew(checked);
  };

  return (
    <>
      {contractFieldConfigurations.map((field) => {
        if (field.name === 'notify_expiry' || field.name === 'notify_before') {
          if (!notifyExpire) return null;
        }
        return (
          <Col lg={field.colSpan || 12} xs={24} sm={24} key={field.name}>
            <Form.Item
              label={
                field.name === 'auto_renew' || field.name === 'notify_expire'
                  ? null
                  : field.label
              }
              name={field.name}
              rules={field.rules}
              validateTrigger="onSubmit"
            >
              {renderFormItem(
                field,
                users,
                customers,
                notifyExpire,
                handleNotifyExpireChange,
                autoRenew,
                handleAutoRenewChange,
                onFileChange
              )}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
};

export default ContractFormFields;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 10px;
  margin-top: 15px;
`;
