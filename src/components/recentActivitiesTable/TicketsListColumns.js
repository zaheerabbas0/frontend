import React from 'react';
import { Avatar, Button, Tooltip } from 'antd';
import { renderStatusTag } from '../../utils/Utils';
import dayjs from 'dayjs';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import { Region_Field_Name } from '../../constants/ticket/FieldsLabelsConstants';
// import CustomAvatar from "../../../styledComponents/CustomAvatar";

export const ticketsListColumns = (filters) => {
  return [
    {
      title: 'Subject',
      key: 'subject',
      dataIndex: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
      render: (text) => (
        <div className="tickets-subject" style={{ paddingLeft: '8px' }}>
          <b>{text}</b>
        </div>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (text) => <div className="tickets-description">{text}</div>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => renderStatusTag(status),
      onFilter: (value, record) => {
        const filterValue = value || filters.status || '';

        return record.status
          .toString()
          .toLowerCase()
          .includes(filterValue?.toLowerCase() || '');
      },
      defaultFilteredValue: [filters?.status || ''],
    },
    {
      title: 'Assignee',
      key: 'assigned_by',
      dataIndex: 'assigned_by',
      sorter: (a, b) => {
        const nameA =
          a.assignees && a.assignees.length > 0
            ? a.assignees[0].name || ''
            : '';
        const nameB =
          b.assignees && b.assignees.length > 0
            ? b.assignees[0].name || ''
            : '';
        return nameA.localeCompare(nameB);
      },
      render: (_, { assignees }) => {
        if (!assignees || assignees.length === 0) return '';

        return (
          <div
            style={{ display: 'flex', overflowY: 'visible' }}
            className="hide-scrollbar"
          >
            <Avatar.Group>
              {assignees.map((c, index) => (
                <CustomAvatar
                  key={c.id}
                  name={c.name}
                  image_url={c.image_url}
                  size="medium"
                />
              ))}
            </Avatar.Group>
          </div>
        );
      },
    },

    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      onFilter: (value, record) => {
        // Provide a default value for `value` if it's undefined
        const filterValue = value || filters.priority || '';

        return record.priority
          ? record.priority
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          : false;
      },
      defaultFilteredValue: [filters?.priority || ''],
    },
    {
      title: 'SLA Time',
      key: 'sla_time',
      dataIndex: 'sla_time',
      sorter: (a, b) => a.sla_time.localeCompare(b.sla_time),
    },
    {
      title: `${Region_Field_Name}`,
      key: 'region',
      dataIndex: 'regon',
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: 'Created Date',
      key: 'created_at',
      dataIndex: 'created_at',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    },
    {
      title: 'Closed Date',
      key: 'due_date',
      dataIndex: 'due_date',
      sorter: (a, b) => new Date(a.due_date) - new Date(b.due_date),
      render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    },
  ];
};
