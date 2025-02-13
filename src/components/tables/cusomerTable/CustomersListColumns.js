import React from 'react';
import dayjs from 'dayjs';
import { Button } from 'antd';
import EditIcon from '../../../assets/EditIcon.svg';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import { handleCustomerDelete } from '../../../utils/CustomerUtils';
import { renderIdTag, renderStatusTag } from '../../../utils/Utils';
import styles from './CustomersList.module.css';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import { Customer_Route_Name } from '../../../constants/customer/TitleRoutesConstants';

export const CustomersListColumns = (navigate, dispatch, isUserAllowed) => [
  {
    title: ' ID',
    key: 'id',
    dataIndex: 'id',
    render: (id) => renderIdTag(id),
    sorter: (a, b) => a.id - b.id,
    width: 80,
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: 140,
    render: (_, record) => {
      return (
        <>
          <CustomAvatar
            key={record?.id}
            name={record?.name}
            image_url={record?.image_url}
          />
          <span>{record?.name}</span>
        </>
      );
    },
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    width: 180,
  },

  {
    title: 'Phone Number',
    key: 'phone',
    dataIndex: 'phone',
    sorter: (a, b) => a.phone.localeCompare(b.phone),
    width: 140,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    width: 110,
    render: (status) => renderStatusTag(status),
  },
  // {
  //   title: 'Country',
  //   key: 'country',
  //   dataIndex: 'country',
  //   sorter: (a, b) => a.country.localeCompare(b.country),
  //   width: 150,
  // },
  // {
  //   title: 'State',
  //   key: 'state',
  //   dataIndex: 'state',
  //   sorter: (a, b) => a.state.localeCompare(b.state),
  //   width: 120,
  // },
  // {
  //   title: 'Address',
  //   key: 'address',
  //   dataIndex: 'address',
  //   sorter: (a, b) => a.address.localeCompare(b.address),
  //   width: 160,
  // },
  {
    title: 'Created Date',
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render: (date) => (date ? dayjs(date).format('DD:MM:YYYY') : ''),
    width: 120,
  },
  {
    title: 'Created Time',
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render: (date) => (date ? dayjs(date).format('HH:mm:ss') : ''),
    width: 120,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 55,
    render: (_, customerRecord) => (
      <>
        <Button
          disabled={!isUserAllowed}
          className={styles.customerActionBtns}
          onClick={(event) => {
            event.stopPropagation();
            handleCustomerDelete(customerRecord.id, dispatch);
          }}
          icon={<img src={DeleteIcon} alt="delete" />}
        />{' '}
        <Button
          disabled={!isUserAllowed}
          className={styles.customerActionBtns}
          onClick={(event) => {
            event.stopPropagation();
            navigate(`edit-${Customer_Route_Name}/${customerRecord.id}`);
          }}
          icon={<img src={EditIcon} alt="edit" />}
        />
      </>
    ),
  },
];
