import React from 'react';
import { handleAdminDelete } from '../../../utils/AdminUtils';
import { Button } from 'antd';
import dayjs from 'dayjs';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import { renderStatusTag } from '../../../utils/Utils';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import styles from './AdminsList.module.css';
import { hasPermission } from '../../../constants/UsersRole';

export const AdminsListColumns = (navigate, dispatch) => [
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
            // size="large"
          />
          <span>{record.name}</span>
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
    width: 160,
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Phone Number',
    key: 'phone',
    dataIndex: 'phone',
    type: 'phone',
    width: 120,
    sorter: (a, b) => a.phone.localeCompare(b.phone),
  },
  {
    title: 'Timezone',
    key: 'time_zone',
    dataIndex: 'time_zone',
    sorter: (a, b) => {
      const timeZoneA = a.time_zone || '';
      const timeZoneB = b.time_zone || '';
      return timeZoneA.localeCompare(timeZoneB);
    },
    render: (time_zone) => (time_zone ? time_zone : 'N/A'),
    width: 120,
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
  ...(hasPermission('view:adminAction')
    ? [
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 45,
          render: (_, userRecord) => (
            <>
              {hasPermission('delete:admin') && (
                <Button
                  ghost
                  className={styles.admin_ActionBtns}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAdminDelete(userRecord.id, dispatch);
                  }}
                  icon={<img src={DeleteIcon} alt="delete" />}
                />
              )}
              {hasPermission('update:admin') && (
                <Button
                  ghost
                  className={styles.admin_ActionBtns}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`edit-admin/${userRecord.id}`);
                  }}
                  icon={<img src={EditIcon} alt="edit" />}
                />
              )}
            </>
          ),
        },
      ]
    : []),
];
