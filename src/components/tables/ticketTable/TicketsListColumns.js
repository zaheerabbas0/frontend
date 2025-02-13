import React from 'react';
import { Avatar, Button } from 'antd';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import { handleTicketDelete } from '../../../utils/TicketUtils';
import {
  renderIdTag,
  renderPriorityTag,
  renderProjects,
  renderStatusTag,
} from '../../../utils/Utils';
import dayjs from 'dayjs';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import { hasPermission } from '../../../constants/UsersRole';
import { ticketExcludedFields } from '../../../constants/ticket/TicketExcludedFields';
import { TICKET_FIELDS } from '../../../constants/ticket/FieldsKeyConstant';

export const ticketsListColumns = (navigate, dispatch) => {
  const columns = [
    {
      title: TICKET_FIELDS.ID.title,
      dataIndex: TICKET_FIELDS.ID.name,
      sorter: (a, b) =>
        (a[TICKET_FIELDS.ID.name] || 0) - (b[TICKET_FIELDS.ID.name] || 0),
      render: (id) => renderIdTag(id),
      width: 100,
    },
    {
      title: TICKET_FIELDS.SUBJECT.title,
      dataIndex: TICKET_FIELDS.SUBJECT.dataIndex,
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.SUBJECT.dataIndex;
        return (a[dataIndex] || '').localeCompare(b[dataIndex] || '');
      },
      render: (text) => (
        <div className="tickets-subject">
          <b>{text || 'N/A'}</b>
        </div>
      ),
    },
    {
      title: TICKET_FIELDS.DESCRIPTION.title,
      dataIndex: TICKET_FIELDS.DESCRIPTION.name,
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.DESCRIPTION.name;
        return (a[dataIndex] || '').localeCompare(b[dataIndex] || '');
      },
      render: (text) => (
        <div className="tickets-description">{text || 'N/A'}</div>
      ),
    },

    {
      title: TICKET_FIELDS.STATUS.title,
      dataIndex: TICKET_FIELDS.STATUS.name,
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.STATUS.name;
        const statusA = a[dataIndex] || '';
        const statusB = b[dataIndex] || '';
        return statusA.localeCompare(statusB);
      },
      render: (status, ticketRecord) =>
        ticketRecord.is_escalated
          ? renderStatusTag('Escalated')
          : renderStatusTag(status),
    },
    {
      title: TICKET_FIELDS.ASSIGNEE.title,
      dataIndex: TICKET_FIELDS.ASSIGNEE.dataIndex,
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.ASSIGNEE.dataIndex;
        const assigneeA = (a[dataIndex]?.[0]?.name || '').toLowerCase();
        const assigneeB = (b[dataIndex]?.[0]?.name || '').toLowerCase();

        return assigneeA.localeCompare(assigneeB);
      },
      width: 120,
      render: (_, record) => {
        const assignees = record[TICKET_FIELDS.ASSIGNEE.dataIndex];

        if (!assignees || assignees.length === 0) return 'N/A';

        return (
          <div
            style={{ display: 'flex', overflowX: 'visible' }}
            className="hide-scrollbar"
          >
            <Avatar.Group>
              {assignees.map((assignee) => (
                <CustomAvatar
                  key={assignee?.id}
                  name={assignee?.name}
                  image_url={assignee?.image_url}
                  size="medium"
                />
              ))}
            </Avatar.Group>
          </div>
        );
      },
      exportFunc: (record) => {
        const assignees = record[TICKET_FIELDS.ASSIGNEE.dataIndex];

        return assignees?.length > 0
          ? assignees.map((a) => a.name).join(', ')
          : 'none';
      },
    },
    {
      title: TICKET_FIELDS.PRIORITY.title,
      dataIndex: TICKET_FIELDS.PRIORITY.dataIndex,
      render: (sla) => renderPriorityTag(sla),
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.PRIORITY.dataIndex;
        const nameA = a[dataIndex]?.name || '';
        const nameB = b[dataIndex]?.name || '';
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: TICKET_FIELDS.CATEGORY.title,
      dataIndex: TICKET_FIELDS.CATEGORY.name,
      render: (_, record) =>
        record[TICKET_FIELDS.CATEGORY.name]
          ? record[TICKET_FIELDS.CATEGORY.name].name
          : 'N/A',
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.CATEGORY.name;
        const nameA = a[dataIndex]?.name || '';
        const nameB = b[dataIndex]?.name || '';
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: TICKET_FIELDS.SUB_CATEGORY.title,
      dataIndex: TICKET_FIELDS.SUB_CATEGORY.dataIndex,
      render: (_, record) =>
        record[TICKET_FIELDS.SUB_CATEGORY.dataIndex]?.name || 'N/A',
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.SUB_CATEGORY.dataIndex;
        const nameA = a[dataIndex]?.name || '';
        const nameB = b[dataIndex]?.name || '';
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: TICKET_FIELDS.PROJECT.title,
      dataIndex: TICKET_FIELDS.PROJECT.dataIndex,
      sorter: (a, b) => {
        const dataIndex = TICKET_FIELDS.PROJECT.dataIndex;

        const projectA = (a[dataIndex]?.name || '').toLowerCase();
        const projectB = (b[dataIndex]?.name || '').toLowerCase();

        return projectA.localeCompare(projectB);
      },
      render: (project) => renderProjects(project),
      exportFunc: (record) =>
        record[TICKET_FIELDS.PROJECT.dataIndex]?.name || 'N/A',
    },
    {
      title: TICKET_FIELDS.START_DATE.viewTitle,
      dataIndex: TICKET_FIELDS.START_DATE.dataIndex,
      sorter: (a, b) =>
        new Date(a[TICKET_FIELDS.START_DATE.dataIndex]) -
        new Date(b[TICKET_FIELDS.START_DATE.dataIndex]),
      render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    },
    {
      title: TICKET_FIELDS.CREATED_TIME.viewTitle,
      dataIndex: TICKET_FIELDS.CREATED_TIME.dataIndex,
      sorter: (a, b) =>
        new Date(a[TICKET_FIELDS.CREATED_TIME.dataIndex]) -
        new Date(b[TICKET_FIELDS.CREATED_TIME.dataIndex]),
    },
    {
      title: TICKET_FIELDS.DUE_DATE.viewTitle,
      dataIndex: TICKET_FIELDS.DUE_DATE.dataIndex,
      sorter: (a, b) =>
        new Date(a[TICKET_FIELDS.DUE_DATE.dataIndex]) -
        new Date(b[TICKET_FIELDS.DUE_DATE.dataIndex]),
      render: (date) => (date ? dayjs(date).format('DD-MM-YYYY') : ''),
    },
    {
      title: TICKET_FIELDS.CLOSED_TIME.viewTitle,
      dataIndex: TICKET_FIELDS.CLOSED_TIME.dataIndex,
      sorter: (a, b) =>
        new Date(a[TICKET_FIELDS.CLOSED_TIME.dataIndex]) -
        new Date(b[TICKET_FIELDS.CLOSED_TIME.dataIndex]),
    },

    {
      title: TICKET_FIELDS.ADDRESS.title,
      dataIndex: TICKET_FIELDS.ADDRESS.name,
      sorter: (a, b) => {
        const addressA = a[TICKET_FIELDS.ADDRESS.name] || '';
        const addressB = b[TICKET_FIELDS.ADDRESS.name] || '';
        return addressA.localeCompare(addressB);
      },
      render: (ticket_address) => (ticket_address ? ticket_address : 'N/A'),
      exportFunc: (ticket_address) => (ticket_address ? ticket_address : 'N/A'),
    },
    {
      title: TICKET_FIELDS.CITY.title,
      dataIndex: TICKET_FIELDS.CITY.name,
      sorter: (a, b) => {
        const cityA = a[TICKET_FIELDS.CITY.name] || '';
        const cityB = b[TICKET_FIELDS.CITY.name] || '';
        return cityA.localeCompare(cityB);
      },
      render: (city) => (city ? city : 'N/A'),
    },
    {
      title: TICKET_FIELDS.REGION.title,
      dataIndex: TICKET_FIELDS.REGION.name,
      sorter: (a, b) => {
        const regionA = a[TICKET_FIELDS.REGION.name] || '';
        const regionB = b[TICKET_FIELDS.REGION.name] || '';
        return regionA.localeCompare(regionB);
      },
      render: (region) => (region ? region : 'N/A'),
    },
    {
      title: TICKET_FIELDS.TIME_ZONE.title,
      dataIndex: TICKET_FIELDS.TIME_ZONE.name,
      sorter: (a, b) => {
        const timeZoneA = a[TICKET_FIELDS.TIME_ZONE.name] || '';
        const timeZoneB = b[TICKET_FIELDS.TIME_ZONE.name] || '';
        return timeZoneA.localeCompare(timeZoneB);
      },
      render: (time_zone) => (time_zone ? time_zone : 'N/A'),
      width: 200,
    },
    {
      title: TICKET_FIELDS.SLA_TYPE.title,
      dataIndex: TICKET_FIELDS.SLA_TYPE.name,
      sorter: (a, b) =>
        (a[TICKET_FIELDS.SLA_TYPE.name]?.name || '').localeCompare(
          b[TICKET_FIELDS.SLA_TYPE.name]?.name || ''
        ),
      render: (sla) =>
        sla?.duration ? `${sla.duration} Hours To resolve` : 'N/A',
      exportFunc: (record) =>
        record[TICKET_FIELDS.SLA_TYPE.name]
          ? `${record[TICKET_FIELDS.SLA_TYPE.name].name} - ${record[TICKET_FIELDS.SLA_TYPE.name].duration} Hours`
          : 'N/A',
    },
    {
      title: TICKET_FIELDS.SLA_TIME.title,
      dataIndex: TICKET_FIELDS.SLA_TIME.dataIndex,
      width: '220',
      render: (sla_time) => (sla_time ? sla_time : 'N/A'),
      sorter: (a, b) =>
        (a[TICKET_FIELDS.SLA_TIME.dataIndex] || '').localeCompare(
          b[TICKET_FIELDS.SLA_TIME.dataIndex] || ''
        ),
    },
    {
      title: TICKET_FIELDS.SLA_STATUS.title,
      dataIndex: TICKET_FIELDS.SLA_STATUS.name,
      sorter: (a, b) =>
        (a[TICKET_FIELDS.SLA_STATUS.name] || '').localeCompare(
          b[TICKET_FIELDS.SLA_STATUS.name] || ''
        ),
      render: (status) => renderStatusTag(status),
    },
    ...(hasPermission('view:ticketAction')
      ? [
          {
            title: 'Action',
            fixed: 'right',
            width: 70,
            render: (_, ticketRecord) => (
              <>
                {hasPermission('delete:ticket') && (
                  <Button
                    ghost
                    className="ticketActionBtns"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTicketDelete(ticketRecord.id, dispatch);
                    }}
                    icon={<img src={DeleteIcon} alt="delete" />}
                  />
                )}
                {hasPermission('update:ticket') && (
                  <Button
                    ghost
                    className="ticketActionBtns"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(
                        `/supportx/tickets/edit-ticket/${ticketRecord.id}`
                      );
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
  return columns.filter((column) => !ticketExcludedFields.includes(column.key));
};
