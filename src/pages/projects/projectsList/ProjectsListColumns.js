import React from 'react';
import { handleProjectDelete } from '../../../utils/ProjectUtils';
import { Avatar, Button } from 'antd';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import dayjs from 'dayjs';
import {
  capitalizeInitials,
  renderStatusTag,
  userNameBgColor,
} from '../../../utils/Utils';
import { Project_Route_Name } from '../../../utils/TitleRoutesConstants';

export const projectsListColumns = (navigate, dispatch, isUserAllowed) => [
  {
    title: 'Projects',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => {
      const { name, image_url } = record;
      const avatarStyle = Avatar ? { border: '2px solid #379B47' } : {};
      const capitalizedText = capitalizeInitials(name);
      const initials = capitalizedText
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

      return (
        <div
          className="initials-avatar"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {image_url ? (
            <Avatar src={image_url} alt={name} style={avatarStyle} />
          ) : (
            <Avatar
              style={{
                backgroundColor: userNameBgColor(capitalizedText),
              }}
            >
              {initials}
            </Avatar>
          )}
          <span style={{ marginLeft: '10px' }}>{capitalizedText}</span>
        </div>
      );
    },
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status) => renderStatusTag(status),
  },
  {
    title: 'Created Date',
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
  },
  {
    title: 'Created Time',
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render: (date) => (date ? dayjs(date).format('HH:mm:ss') : ''),
  },
  {
    title: 'Due Date',
    key: 'due_date',
    dataIndex: 'due_date',
    sorter: (a, b) => a.due_date.localeCompare(b.due_date),
    render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
  },
  // {
  //   title: "Due Time",
  //   key: "due_date",
  //   dataIndex: "due_date",
  //   sorter: (a, b) => a.due_date.localeCompare(b.due_date),
  //   render: (date) => (date ? dayjs(date).format("HH:mm:ss") : ""),
  // },
  // {
  //   title: "Total Tickets",
  //   key: "total_tickets",
  //   dataIndex: "total_tickets",
  //   sorter: (a, b) => a.total_tickets.localeCompare(b.total_tickets),
  // },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 75,
    render: (_, projectRecord) => (
      <>
        <Button
          disabled={!isUserAllowed}
          ghost
          className="projectActionBtns"
          onClick={(event) => {
            event.stopPropagation();
            handleProjectDelete(projectRecord.id, dispatch);
          }}
          icon={<img src={DeleteIcon} alt="delete" />}
        />{' '}
        <Button
          disabled={!isUserAllowed}
          ghost
          className="projectActionBtns"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`edit-${Project_Route_Name}/${projectRecord.id}`);
          }}
          icon={<img src={EditIcon} alt="edit" />}
        />
      </>
    ),
  },
];
