import React from 'react';
import { handleUserDelete } from '../../../utils/UserUtils';
import { Button } from 'antd';
import dayjs from 'dayjs';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import { renderStatusTag } from '../../../utils/Utils';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import styles from './UsersList.module.css';
import { User_Route_Name } from '../../../constants/user/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

export const UsersListColumns = (navigate, dispatch) => [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: 130,
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
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    width: 100,
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status) => renderStatusTag(status),
  },

  {
    title: 'Email Address',
    key: 'email',
    dataIndex: 'email',
    width: 140,
    sorter: (a, b) => a.email.localeCompare(b.email),
  },

  {
    title: 'Phone Number',
    key: 'phone',
    dataIndex: 'phone',
    width: 120,
    sorter: (a, b) => a.phone.localeCompare(b.phone),
  },
  {
    title: 'Skill',
    key: 'designation',
    dataIndex: 'designation',
    width: 120,
    sorter: (a, b) => {
      const nameA = a.designation?.name || '';
      const nameB = b.designation?.name || '';
      return nameA.localeCompare(nameB);
    },
    render: (designation) => designation?.name || 'N/A',
  },
  {
    title: 'Group',
    key: 'group',
    dataIndex: 'group',
    width: 120,
    sorter: (a, b) => {
      const nameA = a.group?.name || '';
      const nameB = b.group?.name || '';
      return nameA.localeCompare(nameB);
    },
    render: (group) => group?.name || 'N/A',
  },
  {
    title: 'Timezone',
    key: 'time_zone',
    dataIndex: 'time_zone',
    width: 140,
    sorter: (a, b) => {
      const nameA = a.time_zone || '';
      const nameB = b.time_zone || '';
      return nameA.localeCompare(nameB);
    },
    render: (time_zone) => time_zone || 'N/A',
  },
  {
    title: 'Created Date',
    key: 'created_at_date',
    dataIndex: 'created_at_date',
    sorter: (a, b) => a.created_at_date.localeCompare(b.created_at_date),
    render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    width: 120,
  },

  {
    title: 'Created Time',
    key: 'created_at_time',
    dataIndex: 'created_at_time',
    sorter: (a, b) => a.created_at_time.localeCompare(b.created_at_time),
    width: 120,
  },

  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 60,
    render: (_, userRecord) => (
      <>
        {hasPermission('delete:users') && (
          <Button
            className={styles.userActionBtns}
            onClick={(event) => {
              event.stopPropagation();
              handleUserDelete(userRecord.id, dispatch);
            }}
            icon={<img src={DeleteIcon} alt="delete" />}
          />
        )}
        {hasPermission('update:users') && (
          <Button
            className={styles.userActionBtns}
            onClick={(event) => {
              event.stopPropagation();
              navigate(`edit-${User_Route_Name}/${userRecord.id}`);
            }}
            icon={<img src={EditIcon} alt="edit" />}
          />
        )}
      </>
    ),
  },
];
