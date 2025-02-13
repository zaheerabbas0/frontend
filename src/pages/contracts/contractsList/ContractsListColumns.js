import React from 'react';
import {
  handleContractDelete,
  renderContractIdTag,
} from '../../../utils/ContractUtils';
import { Button } from 'antd';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import dayjs from 'dayjs';
import {
  getListTypeStyles,
  getTypeStyles,
  renderIdTag,
  renderStatusTag,
} from '../../../utils/Utils';

export const contractsListColumns = (navigate, dispatch, isUserAllowed) => [
  {
    title: ' ID',
    key: 'id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    render: (id) => renderIdTag(id),
    width: 100,
  },
  {
    title: 'Contract Name',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: 180,
  },
  {
    title: 'Type',
    key: 'contract_type',
    dataIndex: 'contract_type',
    sorter: (a, b) => a.contract_type.localeCompare(b.contract_type),
    render: (contract_type) =>
      // getListTypeStyles
      contract_type,

    width: 150,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status) => renderStatusTag(status),

    width: 150,
  },
  {
    title: 'Customer',
    key: 'customer',
    dataIndex: 'customer',
    sorter: (a, b) => {
      const customerA = a.customer
        ? typeof a.customer === 'string'
          ? a.customer
          : a.customer.name
        : '';
      const customerB = b.customer
        ? typeof b.customer === 'string'
          ? b.customer
          : b.customer.name
        : '';
      return customerA.localeCompare(customerB);
    },
    render: (_, { customer }) => (customer ? customer.name : ''),
    width: 180,
  },
  {
    title: 'Visible to',
    key: 'visible_users',
    dataIndex: 'visible_users',
    sorter: (a, b) => {
      const namesA = a.visible_users
        ? a.visible_users.map((user) => user.name).join(', ')
        : '';
      const namesB = b.visible_users
        ? b.visible_users.map((user) => user.name).join(', ')
        : '';
      return namesA.localeCompare(namesB);
    },

    render: (_, { visible_users }) =>
      visible_users
        ? visible_users.map((visible_user) => visible_user.name).join(', ')
        : '',
    width: 180,
  },
  {
    title: 'Vendor Name',
    key: 'vendor_name',
    dataIndex: 'vendor_name',
    sorter: (a, b) => a.vendor_name.localeCompare(b.vendor_name),
    width: 180,
  },

  {
    title: 'Collaborators',
    key: 'collaborators',
    dataIndex: 'collaborators',
    sorter: (a, b) => {
      const nameA =
        a.collaborators && a.collaborators.length > 0
          ? a.collaborators[0].name
          : '';
      const nameB =
        b.collaborators && b.collaborators.length > 0
          ? b.collaborators[0].name
          : '';
      return nameA.localeCompare(nameB);
    },
    render: (_, { collaborators }) =>
      collaborators
        ? collaborators.map((collaborator) => collaborator.name).join(', ')
        : '',
    width: 180,
  },

  {
    title: 'Cost',
    key: 'cost',
    dataIndex: 'cost',
    sorter: (a, b) => a.cost - b.cost,
    // render: (cost) => `$${cost.toFixed(2)}`,
    width: 120,
  },
  {
    title: 'Created Date',
    key: 'start_date',
    dataIndex: 'start_date',
    sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    width: 150,
  },
  {
    title: 'Created Time',
    key: 'start_date',
    dataIndex: 'start_date',
    sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    render: (date) => (date ? dayjs(date).format('HH:mm:ss') : ''),
    width: 150,
  },
  {
    title: 'Due Date',
    key: 'due_date',
    dataIndex: 'due_date',
    sorter: (a, b) => a.due_date.localeCompare(b.due_date),
    render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    width: 150,
  },
  {
    title: 'Due Time',
    key: 'due_date',
    dataIndex: 'due_date',
    sorter: (a, b) => a.due_date.localeCompare(b.due_date),
    render: (date) => (date ? dayjs(date).format('HH:mm:ss') : ''),
    width: 150,
  },

  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 75,
    render: (_, contractRecord) => (
      <>
        <Button
          disabled={!isUserAllowed}
          ghost
          className="contractActionBtns"
          onClick={(event) => {
            event.stopPropagation();
            handleContractDelete(contractRecord.id, dispatch);
          }}
          icon={<img src={DeleteIcon} alt="delete" />}
        />{' '}
        <Button
          disabled={!isUserAllowed}
          ghost
          className="contractActionBtns"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`edit-contract/${contractRecord.id}`);
          }}
          icon={<img src={EditIcon} alt="edit" />}
        />
      </>
    ),
  },
];
