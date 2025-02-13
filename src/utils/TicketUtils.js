import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  // FlagOutlined,
  PauseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Tag, message } from 'antd';
import React from 'react';
import Swal from 'sweetalert2';
import {
  deleteComment,
  deleteTicket,
  editComment,
  fetchTickets,
  postComment,
} from '../reduxToolkit/features/TicketSlice';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import {
  createTicket,
  updateTicket,
} from './../reduxToolkit/features/TicketSlice';
import {
  // renderPriorityTag,
  renderStatusTag,
  renderTag,
  statusColorMap,
} from './Utils';
import {
  // CategoriesOptions,
  // KeyToStatusMap,
  // Open_Key,
  // PriorityConstants,
  SlaStatusOptions,
  TicketConstants,
  TicketRegions,
} from '../constants/FieldOptionConstants';
import AxiosInstance from '../appURL/AxiosInstance';
import { Region_Field_Name } from '../constants/ticket/FieldsLabelsConstants';

const RED = '#D95C41';
// const YELLOW = "#FFA500";
const GREEN = '#229849';
const BLUE = '#52C1FF';

export const handleBack = (navigate) => {
  navigate('/supportx/tickets');
};

export const handleTicketForm = async (
  values,
  id,
  dispatch,
  navigate,
  isCreatingTemplate = false
) => {
  try {
    if (id) {
      await dispatch(updateTicket({ id, updatedTicket: values })).unwrap();
      Swal.fire({
        title: 'Ticket Updated Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(createTicket(values)).unwrap();
      Swal.fire({
        title: isCreatingTemplate
          ? 'Template Created Successfully'
          : 'Ticket Created Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate('/supportx/tickets');
  } catch (error) {
    throw error;
  }
};

export const DATE_FORMAT = 'DD-MM-YYYY';

export const formatDate = (date) =>
  dayjs(date, DATE_FORMAT).format(DATE_FORMAT);

export const showAlert = (title, icon) => {
  Swal.fire({
    title,
    icon,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const handleTicketCreate = (navigate) => {
  navigate('/supportx/tickets/create-ticket');
};

export const ticketHeaderBtns = [
  {
    icon: <PlusOutlined />,
    text: 'Create Ticket',
    heading: 'Create Ticket',
    route: 'create-ticket',
  },
];
export const handleTicketDelete = async (
  ticketId,
  dispatch,
  setSelectedRowKeys
) => {
  console.log('LENGHT', ticketId);
  const isMultiple = ticketId.length > 1;
  try {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${
        isMultiple ? 'these tickets?' : 'this ticket?'
      }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      await dispatch(deleteTicket(ticketId)).unwrap();
      if (setSelectedRowKeys) {
        setSelectedRowKeys([]);
      }
      Swal.fire({
        title: 'Deleted!',
        text: `${
          isMultiple ? 'Tickets have' : 'Ticket have'
        }  has been deleted.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

// export const ticketPriorityColorMap = {
//   P1: "green",
//   P2: "orange",
//   P3: RED,
// };

// export const renderTicketPriorityTag = (priority) => (
//   <Tag color={ticketPriorityColorMap[priority]}>
//     <span>
//       <FlagOutlined />
//     </span>{" "}
//     {priority}
//   </Tag>
// );

export const renderTicketIdTag = (ticketId) => (
  <Tag
    style={{
      background: ' #ededed',
      fontSize: '10px',
      fontWeight: 'bold',
      color: '#9a9a9a',
      padding: '0px 2px ',
    }}
  >
    ID #{ticketId}
  </Tag>
);
export const ticketStatusBgColorMap = {
  Pending: 'lightred',
  Active: 'lightgreen',
  Resolved: 'green',
  OnHold: '#F2C94C',
  Overdue: RED,
};
export const ticketStatusColorMap = {
  Pending: BLUE,
  Active: 'white',
  Resolved: GREEN,
  'On Hold': '#white',
  Overdue: RED,
};
export const ticketDetailStatusColorMap = {
  Pending: 'lightred',
  Active: 'lightgreen',
  Resolved: 'green',
  'On Hold': '#F2C94C',
  Overdue: RED,
};
export const renderTicketStatusTag = (status) => (
  <Tag
    style={{
      border: 'none',
      color: ticketStatusColorMap[status],
      background: ticketStatusBgColorMap[status],
    }}
  >
    • {status}
  </Tag>
);

export const ticketsFilterFields = (
  users = [],
  priorities = [],
  categorires = [],
  projects = []
) => [
  {
    label: 'By Status',
    name: 'status',
    type: 'select',
    placeholder: 'Select status',
    options:
      Object.entries(TicketConstants).map(([key, value]) => ({
        value: key,
        name: renderStatusTag(value),
      })) || [],
  },
  {
    label: 'By Assignee',
    name: 'assignee',
    type: 'select',
    placeholder: 'Select assignee',
    options: users,
  },
  {
    label: 'By Priority',
    name: 'priority',
    type: 'select',
    placeholder: 'Select priority',
    options: priorities.map((priority) => ({
      value: priority.id,
      name: renderTag(priority),
    })),
  },
  {
    label: 'By Category',
    name: 'category',
    type: 'select',
    placeholder: 'Select category',
    options: categorires,
  },
  {
    label: 'By Projects',
    name: 'projects',
    type: 'select',
    placeholder: 'Select project',
    options: projects,
  },
  {
    label: 'By Sla Status',
    name: 'sla_status',
    type: 'select',
    placeholder: 'Select sla status',
    options: SlaStatusOptions.map((p) => ({
      value: p,
      name: renderStatusTag(p),
    })),
  },
  {
    label: `By ${Region_Field_Name}`,
    name: 'region',
    type: 'select',
    placeholder: `Select ${Region_Field_Name}`,
    options: TicketRegions,
  },
  // {
  //   name: 'sla',
  //   label: 'By SLAs',
  //   placeholder: 'Select Sla',
  //   type: 'select',
  //   options: slas,
  // },
  // {
  //   name: "createdDate",
  //   label: "By Date",
  //   type: "select",
  //   options: [
  //     { value: "today", label: "Today" },
  //     { value: "month", label: "Month" },
  //     { value: "Year", label: "Year" },
  //   ],
  // },
];

export const exportSelectedTickets = (selectedRowKeys, ticketData, columns) => {
  let ticketsToExport = [];
  const exportFuncsMap = columns.reduce((acc, column) => {
    if (column.exportFunc) {
      acc[column.dataIndex] = column.exportFunc;
    }
    return acc;
  }, {});

  if (selectedRowKeys.length === 0) {
    ticketsToExport = ticketData;
  } else {
    ticketsToExport = ticketData.filter((ticket) =>
      // selectedRowKeys.includes(ticket.id)
      selectedRowKeys.includes(ticket.ticketId)
    );
  }

  if (ticketsToExport.length === 0) {
    message.warning('No tickets available for export');
    return;
  }

  // Map the data to only include columns that are displayed in the table
  const formattedTickets = ticketsToExport.map((ticket) => {
    const ticketForExport = {};

    Object.entries(ticket).forEach(([key, value]) => {
      // Use the map for a quick lookup of the exportFunc
      const exportFunc = exportFuncsMap[key];
      ticketForExport[key] = exportFunc ? exportFunc(ticket) : value;
    });

    return ticketForExport;
  });

  // console.clear();
  // console.log("LOGGING EXCEL DATA", formattedTickets[0], exportFuncsMap);

  const worksheet = XLSX.utils.json_to_sheet(formattedTickets);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

  XLSX.writeFile(workbook, 'TicketsList.xlsx');
};

export const handleFetchTickets = async (dispatch, ticketStatus) => {
  try {
    if (ticketStatus === 'idle') {
      await dispatch(fetchTickets());
    }
  } catch (error) {
    message.error('Failed to fetch tickets');
  }
};

export const getTicketHeaderText = (location, TicketHeaderBtns) => {
  const currentButton = TicketHeaderBtns.find(
    (button) => button.route === location.pathname
  );
  return currentButton ? currentButton.heading : 'Tickets';
};

export const handleFilterOk = (ticketsFilterForm, setIsDrawerVisible) => {
  ticketsFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      ticketsFilterForm.resetFields();
    })
    .catch((info) => {});
};

export const ticketRowClicked = (navigate) => (record) => ({
  onClick: (event) => {
    if (
      event.target.tagName === 'INPUT' ||
      event.target.closest('.ant-table-selection-column')
    ) {
      return;
    }
    navigate(`/supportx/tickets/ticket-detail/${record.id}`);
  },
  style: { cursor: 'pointer' },
});

// export const selectColorMap = {
//   'Mark as Resolved': '#229849',
//   'Mark as Hold': BLUE,
//   'Mark as Open': RED,
// };
// export const selectMarksOptions = [
//   {
//     value: 'On Hold',
//     icon: <PauseCircleOutlined />,
//     label: 'Mark as Hold',
//     color: statusColorMap['On Hold'],
//   },
//   {
//     value: 'Pending',
//     icon: <ClockCircleOutlined />,
//     label: 'Mark as Open',
//     color: statusColorMap['Pending'],
//   },

// ];
export const selectMarksOptions = [
  {
    value: 'On Hold',
    icon: <PauseCircleOutlined />,
    label: 'Mark as Hold',
    color: statusColorMap['On Hold'],
  },
  {
    value: 'Open',
    icon: <ClockCircleOutlined />,
    label: 'Mark as Open',
    color: statusColorMap['Open'],
  },
  {
    value: 'Resolved',
    icon: <CheckCircleOutlined />,
    label: 'Mark as Resolved',
    color: statusColorMap['Resolved'],
  },
];

export const modalFields = [
  {
    type: 'input',
    label: 'Email',
    name: 'email',
    rules: [
      { required: true, message: 'Please enter Email!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
    placeholder: 'Enter email',
  },
  {
    type: 'datePicker',
    label: 'Due Date',
    name: 'due_date',
    rules: [{ required: true, message: 'Please select the closed date!' }],
    placeholder: 'Select closed date',
  },
  {
    type: 'textarea',
    label: 'Comment',
    name: 'comment',
    rules: [{ required: true, message: 'Please input the comment!' }],
    placeholder: 'Enter comment',
  },
];

export const handlePostComment = (form, dispatch, id, ticket) => {
  return form.validateFields().then(() => {
    const commentValue = form.getFieldValue('comment');
    if (commentValue.trim()) {
      try {
        return dispatch(
          postComment({
            ticket_id: id,
            comment: commentValue,
          })
        )
          .unwrap()
          .then(() => {
            message.success('Comment posted successfully');
            form.resetFields();
          })
          .catch((error) => {
            console.error('Error posting comment:', error);
            message.error(
              `Failed to post comment: ${error.message || 'Unknown error'}`
            );
            return Promise.reject();
          });
      } catch (error) {
        console.error('Unexpected error in handlePostComment:', error);
        message.error('Unexpected error occurred while posting comment.');
        return Promise.reject();
      }
    } else {
      message.warning('Please enter a comment');
      return Promise.reject();
    }
  });
};

export const handleEditComment = (commentId, updatedComment, dispatch) => {
  if (updatedComment.trim()) {
    return dispatch(
      editComment({
        comment_id: commentId,
        comment: updatedComment,
      })
    )
      .unwrap()
      .then(() => {
        message.success('Comment updated successfully');
      })
      .catch((error) => {
        console.error('Error editing comment:', error);
        message.error(
          `Failed to edit comment: ${error?.message || 'Unknown error'}`
        );
        return Promise.reject(error);
      });
  } else {
    message.warning('Comment cannot be empty');
    return Promise.reject(new Error('Comment cannot be empty'));
  }
};

export const handleDeleteComment = (commentId, dispatch) => {
  return dispatch(
    deleteComment({
      comment_id: commentId,
    })
  )
    .unwrap()
    .then(() => {
      message.success('Comment deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting comment:', error);
      message.error(
        `Failed to delete comment: ${error.message || 'Unknown error'}`
      );
      return Promise.reject();
    });
};

export const handleImportTickets = async (file, userData, dispatch) => {
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  try {
    const userId = userData?.id;
    await AxiosInstance.post(
      `/api/v1/ticket/create-tickets-bulk/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    );
    message.success('Tickets imported successfully');
    dispatch(fetchTickets());
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || 'Failed to import tickets';
    message.error(errorMessage);
  }
};
