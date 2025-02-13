import AddNewCustomOption from '../../../../components/ui/shared/addNewOption';
import {
  Escalated_Key,
  OVERDUE_Key,
  Pending_Approval_Key,
  RESOLVED_KEY,
  TicketConstants,
  TicketRegions,
} from '../../../../constants/FieldOptionConstants';
import { TICKET_FIELDS } from '../../../../constants/ticket/FieldsKeyConstant';
import {
  noWhitespaceValidator,
  renderPriorityTag,
  renderStatusTag,
  renderTag,
} from '../../../../utils/Utils';
import { Category, PRIORITY_MODAL, Subcategory, TAG } from '../CreateTicket';

const hiddenStatuses = [
  OVERDUE_Key,
  Escalated_Key,
  Pending_Approval_Key,
  RESOLVED_KEY,
];

const filteredTicketConstants = Object.entries(TicketConstants).map(
  ([key, value]) => ({
    value: key,
    name: renderStatusTag(value),
    isDisabled: hiddenStatuses.includes(key),
  })
);

// const SlaOptions = [
//   { key: 1, value: 'L1 - 8 hours to respond' },
//   { key: 2, value: 'L2 - 12 hours to respond' },
//   { key: 3, value: 'L3 - 24 hours to respond' },
// ];

export const leftColumnFields = (
  showDate,
  isGeneratingTemplate,
  tags,
  categories,
  priorities,
  category,
  setCategory,
  handlePriorityChange = () => {},
  openModal = () => {}
) => [
  {
    label: TICKET_FIELDS.START_DATE.title,
    name: TICKET_FIELDS.START_DATE.name,
    type: 'date',
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.START_DATE.title}`,
      },
    ],
  },
  {
    label: TICKET_FIELDS.DUE_DATE.title,
    name: TICKET_FIELDS.DUE_DATE.name,
    type: 'date',
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.DUE_DATE.title}`,
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const startDate = getFieldValue(`${TICKET_FIELDS.START_DATE.name}`);
          if (!value || !startDate || value.isSameOrAfter(startDate)) {
            return Promise.resolve();
          }
          // message.error('Due Date cannot be earlier than Start Date');
          return Promise.reject(
            new Error(
              `${TICKET_FIELDS.DUE_DATE.title} cannot be earlier than ${TICKET_FIELDS.START_DATE.title}`
            )
          );
        },
      }),
    ],
  },
  {
    label: TICKET_FIELDS.TEMPLATE.title,
    name: TICKET_FIELDS.TEMPLATE.name,
    type: 'template',
    placeholder: `Select ${TICKET_FIELDS.TEMPLATE.title}`,
    columnSpan: 24,
    options: [],
  },
  {
    label: TICKET_FIELDS.SUBJECT.title,
    name: TICKET_FIELDS.SUBJECT.name,
    type: 'input',
    rules: [
      {
        required: true,
        message: `Please enter ${TICKET_FIELDS.SUBJECT.title}`,
      },
      { validator: noWhitespaceValidator(`${TICKET_FIELDS.SUBJECT.title}`) },
    ],
    placeholder: `Enter ${TICKET_FIELDS.SUBJECT.title}`,
  },
  {
    label: TICKET_FIELDS.STATUS.title,
    name: TICKET_FIELDS.STATUS.name,
    type: 'status',
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.STATUS.title}`,
      },
    ],
    placeholder: `Select ${TICKET_FIELDS.STATUS.title}`,
    options: filteredTicketConstants || [],
  },
  {
    label: TICKET_FIELDS.PRIORITY.title,
    name: TICKET_FIELDS.PRIORITY.name,
    type: 'select',
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.PRIORITY.title}`,
      },
    ],
    placeholder: `Select ${TICKET_FIELDS.PRIORITY.title}`,
    options:
      priorities.map((priority) => ({
        id: priority.id,
        name: renderPriorityTag(priority),
      })) || [],
    props: {
      onChange: (v) => handlePriorityChange(v),
    },
    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={`Create New ${TICKET_FIELDS.PRIORITY.title}...`}
          onClick={(e) => {
            e.stopPropagation();
            openModal(PRIORITY_MODAL);
          }}
        />
      </>
    ),
  },
  {
    label: TICKET_FIELDS.CATEGORY.title,
    name: TICKET_FIELDS.CATEGORY.name,
    type: 'select',
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.CATEGORY.title}`,
      },
    ],
    placeholder: `Select ${TICKET_FIELDS.CATEGORY.title}`,
    options: categories?.data || [],
    props: {
      onChange: (category) => {
        setCategory(category);
      },
    },

    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={`Create New ${TICKET_FIELDS.CATEGORY.title}...`}
          onClick={(e) => {
            e.stopPropagation();
            openModal(Category);
          }}
        />
      </>
    ),
  },
  {
    label: TICKET_FIELDS.SUB_CATEGORY.title,
    name: TICKET_FIELDS.SUB_CATEGORY.name,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.SUB_CATEGORY.title}`,
      },
    ],
    placeholder: `Select ${TICKET_FIELDS.SUB_CATEGORY.title}`,
    type: 'select',
    options:
      categories?.data?.find((cat) => cat.id === category)?.subcategories || [],
    props: {
      disabled: !category,
    },
    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={`Create New ${TICKET_FIELDS.SUB_CATEGORY.title}...`}
          onClick={() => openModal(Subcategory)}
        />
      </>
    ),
  },
  {
    label: TICKET_FIELDS.PROJECT.title,
    name: TICKET_FIELDS.PROJECT.name,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.PROJECT.title}`,
      },
    ],
    placeholder: `Select ${TICKET_FIELDS.PROJECT.title}`,
    type: 'select',
    options: [],
  },
  {
    label: TICKET_FIELDS.TAG.title,
    name: TICKET_FIELDS.TAG.name,
    type: 'select',
    mode: 'multiple',
    placeholder: `Select ${TICKET_FIELDS.TAG.title}`,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.TAG.title}`,
      },
    ],
    options:
      tags.map((tag) => ({
        id: tag.id,
        name: renderTag(tag),
      })) || [],
    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={`Create New ${TICKET_FIELDS.TAG.title}...`}
          onClick={() => openModal(TAG)}
        />
      </>
    ),
  },
  {
    label: TICKET_FIELDS.CLOSE_DATE.title,
    name: TICKET_FIELDS.CLOSE_DATE.name,
    type: 'due_date',
    disabled: showDate || isGeneratingTemplate,
    rules: [
      {
        required: !showDate && !isGeneratingTemplate,
        message: `Please select ${TICKET_FIELDS.CLOSE_DATE.title}`,
      },
    ],
    // rules: [{ required: true, message: "Please select Closed Date!" }],
  },
  {
    label: TICKET_FIELDS.CUSTOMER.title,
    name: TICKET_FIELDS.CUSTOMER.name,
    type: 'select',
    placeholder: `Select ${TICKET_FIELDS.CUSTOMER.title}`,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.CUSTOMER.title}`,
      },
    ],
    options: [],
  },
  {
    label: TICKET_FIELDS.CONTRACT.title,
    name: TICKET_FIELDS.CONTRACT.name,
    type: 'select',
    placeholder: `Select ${TICKET_FIELDS.CONTRACT.title}`,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.CONTRACT.title}`,
      },
    ],
    options: [],
  },

  {
    label: TICKET_FIELDS.NOTIFY_TO.title,
    name: TICKET_FIELDS.NOTIFY_TO.name,
    type: 'input',
    placeholder: 'Enter Email',
    rules: [
      { required: true, message: 'Please enter Email' },
      { type: 'email', message: 'Invalid email format' },
    ],
  },
  {
    label: TICKET_FIELDS.CITY.title,
    name: TICKET_FIELDS.CITY.name,
    placeholder: `Select ${TICKET_FIELDS.CITY.title}`,
    type: 'input',
    isAddress: 'true',
  },
  {
    label: TICKET_FIELDS.REGION.title,
    name: TICKET_FIELDS.REGION.name,
    placeholder: `Select ${TICKET_FIELDS.REGION.title}`,
    type: 'select',
    isAddress: 'true',
    options: TicketRegions,
  },
  {
    label: TICKET_FIELDS.TIME_ZONE.title,
    name: TICKET_FIELDS.TIME_ZONE.name,
    placeholder: `Select ${TICKET_FIELDS.TIME_ZONE.title}`,
    type: 'time_zone',
    isAddress: 'true',
  },
  {
    label: TICKET_FIELDS.ADDRESS.title,
    name: TICKET_FIELDS.ADDRESS.name,
    placeholder: `Select ${TICKET_FIELDS.ADDRESS.title}`,
    type: 'input',
    isAddress: 'true',
  },
  {
    label: '',
    type: 'add_address',
    columnSpan: 24,
  },
  {
    label: TICKET_FIELDS.DESCRIPTION.title,
    name: TICKET_FIELDS.DESCRIPTION.name,
    rules: [
      {
        required: true,
        message: `Please enter ${TICKET_FIELDS.DESCRIPTION.title}`,
      },
      {
        validator: noWhitespaceValidator(`${TICKET_FIELDS.DESCRIPTION.title}`),
      },
    ],
    placeholder: `Enter ${TICKET_FIELDS.DESCRIPTION.title}`,
    type: 'textarea',
    columnSpan: 24,
  },
];

export const rightColumnFields = [
  {
    label: TICKET_FIELDS.SLA_TIME.title,
    name: TICKET_FIELDS.SLA_TIME.name,
    placeholder: `${TICKET_FIELDS.SLA_TIME.placeholder}`,
    type: 'input',
    props: {
      readOnly: true,
    },
  },
  {
    label: TICKET_FIELDS.CUSTOM_SLA.title,
    name: TICKET_FIELDS.CUSTOM_SLA.name,
    placeholder: `Enter ${TICKET_FIELDS.CUSTOM_SLA.placeholder}`,
    type: 'input',
  },
  {
    label: TICKET_FIELDS.ASSIGNEE.title,
    name: TICKET_FIELDS.ASSIGNEE.name,
    placeholder: `Select ${TICKET_FIELDS.ASSIGNEE.title}`,
    rules: [
      {
        required: true,
        message: `Please select ${TICKET_FIELDS.ASSIGNEE.title}`,
      },
    ],
    type: 'select',
    mode: 'multiple',
    options: [],
  },

  {
    label: TICKET_FIELDS.REQUEST_TYPE.title,
    name: TICKET_FIELDS.REQUEST_TYPE.name,
    placeholder: `Enter ${TICKET_FIELDS.REQUEST_TYPE.title}`,
    type: 'input',
  },
  {
    label: TICKET_FIELDS.ATTACHMENT.title,
    name: TICKET_FIELDS.ATTACHMENT.name,
    type: 'dragger',
  },
];
