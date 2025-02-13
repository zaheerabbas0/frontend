import { Project_Entity_Name } from '../project/TitleRoutesConstants';
import { Address_Field_Name, Region_Field_Name } from './FieldsLabelsConstants';

export const TICKET_FIELDS = {
  ID: { name: 'id', title: 'ID' },
  SUBJECT: { dataIndex: 'subject', name: 'name', title: 'Subject' },
  START_DATE: {
    dataIndex: 'start_date_date',
    name: 'start_date',
    title: 'Start Date',
    viewTitle: 'Created Date',
  },
  DUE_DATE: {
    dataIndex: 'close_date_date',
    name: 'close_date',
    title: 'Due Date',
    viewTitle: 'Closed Date',
  },
  CREATED_TIME: {
    dataIndex: 'start_date_time',
    viewTitle: 'Created Time',
  },
  CLOSED_TIME: {
    dataIndex: 'close_date_time',
    viewTitle: 'Created Time',
  },
  TEMPLATE: { name: 'template', title: 'Template' },
  STATUS: { name: 'status', title: 'Status' },
  PRIORITY: { dataIndex: 'sla', name: 'user_type_id', title: 'Priority' },
  CATEGORY: { name: 'category_id', title: 'Category' },
  SUB_CATEGORY: {
    dataIndex: 'sub_category',
    name: 'sub_category_id',
    title: 'Sub Category',
  },
  PROJECT: {
    dataIndex: 'project',
    name: 'project_id',
    title: `${Project_Entity_Name}`,
  },
  TAG: {
    name: 'tag_ids',
    title: 'Tag',
  },
  CLOSE_DATE: { name: 'due_date', title: 'Close Date' },
  CUSTOMER: { name: 'customer_id', title: 'Customer' },
  CONTRACT: { name: 'contract_id', title: 'Contract' },
  NOTIFY_TO: { name: 'notify_to', title: 'Notify To' },
  CITY: { name: 'city', title: 'City' },
  REGION: {
    name: 'region',
    title: `${Region_Field_Name}`,
  },
  TIME_ZONE: { name: 'time_zone', title: 'Timezone' },
  ADDRESS: {
    name: 'ticket_address',
    title: `${Address_Field_Name}`,
  },
  DESCRIPTION: {
    name: 'description',
    title: 'Description',
  },
  SLA_TIME: {
    dataIndex: 'sla_time',
    name: 'sla_time_priority',
    title: 'SLA Time',
    placeholder: 'Time to respond',
  },
  SLA_STATUS: {
    name: 'violate_status',
    title: 'SLA Status',
  },
  SLA_TYPE: {
    name: 'sla',
    title: 'SLA Type',
  },
  CUSTOM_SLA: {
    name: 'custom_user_type',
    title: 'Custom SLA',
    placeholder: 'Enter required time',
  },
  ASSIGNEE: { dataIndex: 'assignees', name: 'user_ids', title: 'Assignee' },
  REQUEST_TYPE: {
    name: 'request_type',
    title: 'Request Type',
  },
  ATTACHMENT: {
    name: 'attachment_file',
    title: 'Attachment',
  },
};
