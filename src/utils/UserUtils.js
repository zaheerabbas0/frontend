import React from 'react';
import { Tag, message } from 'antd';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {
  // fetchUsers,
  deleteUser,
  createUser,
  updateUser,
  fetchUserDetails,
} from '../reduxToolkit/features/UserSlice';
import { renderStatusTag } from './Utils';
import {
  User_Route_Name,
  User_Entity_Name,
} from '../constants/user/TitleRoutesConstants';
import { getUserRole } from '../constants/UsersRole';

export const handleUserFilter = (ticketsFilterForm, setIsDrawerVisible) => {
  ticketsFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      ticketsFilterForm.resetFields();
    })
    .catch((info) => {});
};

export const userStatusColorMap = {
  Active: 'green',
  InActive: 'red',
};

export const renderUserStatusTag = (status) => (
  <Tag
    color={userStatusColorMap[status]}
    style={{ borderRadius: '10px', border: 'none' }}
  >
    <span>&bull;</span> {status}
  </Tag>
);
export const capitalizeInitials = (name) => {
  if (typeof name !== 'string' || !name.trim()) {
    return '';
  }

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const userNameBgColor = (text) => {
  if (typeof text !== 'string') {
    return '#FFFFFF';
  }

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  const brightness =
    (parseInt(color.substring(1, 3), 16) +
      parseInt(color.substring(3, 5), 16) +
      parseInt(color.substring(5, 7), 16)) /
    3;
  const threshold = 128;
  if (brightness < threshold) {
    const darkenAmount = threshold - brightness;
    color = color.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (r, g, b) =>
        '#' +
        Math.min(255, parseInt(r, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0') +
        Math.min(255, parseInt(g, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0') +
        Math.min(255, parseInt(b, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0')
    );
  }
  return color;
};

export const handleUserDelete = async (
  userIds,
  dispatch,
  setSelectedRowKeys = null
) => {
  try {
    const userIdArray = Array.isArray(userIds) ? userIds : [userIds];
    const isMultiple = userIds.length > 1;
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${isMultiple ? `these ${User_Entity_Name}s` : `this ${User_Entity_Name}`}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      for (const userId of userIdArray) {
        await dispatch(deleteUser(userId)).unwrap();
      }
      if (setSelectedRowKeys) {
        setSelectedRowKeys([]);
      }
      Swal.fire({
        title: 'Deleted!',
        text: `${isMultiple ? `${User_Entity_Name} have` : `${User_Entity_Name}s has`} been deleted.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (confirmation.dismiss === Swal.DismissReason.cancel) {
      if (setSelectedRowKeys) {
        setSelectedRowKeys([]);
      }
    }
  } catch (error) {
    throw error;
  }
};

export const exportSelectedUsers = (selectedRowKeys, userData) => {
  let usersToExport = [];

  if (selectedRowKeys.length === 0) {
    usersToExport = userData;
  } else {
    usersToExport = userData.filter((user) =>
      selectedRowKeys.includes(user.userId)
    );
  }

  if (usersToExport.length === 0) {
    message.warning('No users available for export');
    return;
  }

  const formattedUsers = usersToExport.map(
    ({
      id,
      role_id,
      organization_id,
      static_password,
      image_url,
      user_token,
      ...rest
    }) => {
      return rest;
    }
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${User_Entity_Name}s`);

  XLSX.writeFile(workbook, `${User_Entity_Name} List.xlsx`);
};

export const usersFilterFields = (skills = []) => [
  {
    label: 'By Name',
    name: 'name',
    type: 'input',
    placeholder: 'Enter Name',
  },
  {
    label: 'By Status',
    name: 'status',
    type: 'select',
    placeholder: 'Select Status',
    options: [
      { value: 'Active', label: renderStatusTag('Active') },
      { value: 'In Active', label: renderStatusTag('In Active') },
    ],
  },
  {
    label: 'By Skills',
    name: 'skill',
    type: 'select',
    placeholder: 'Select Skill',
    options: skills,
  },
];
export const userRowClicked = (navigate, dispatch) => (record) => {
  return {
    onClick: (event) => {
      if (
        event.target.tagName === 'INPUT' ||
        event.target.closest('.ant-table-selection-column')
      ) {
        return;
      }
      const UserRole = getUserRole();
      const path =
        UserRole === 'super admin'
          ? `/supportx/members/detail-${User_Route_Name}/${record.id}`
          : `/supportx/${User_Route_Name}/detail-${User_Route_Name}/${record.id}`;

      navigate(path);
      dispatch(fetchUserDetails(record.id));
    },
    style: { cursor: 'pointer' },
  };
};

export const handleUserForm = async (values, id, dispatch, navigate) => {
  try {
    if (id) {
      await dispatch(updateUser({ id, updatedUser: values })).unwrap();
      Swal.fire({
        title: `${User_Entity_Name} Updated Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(createUser(values)).unwrap();
      Swal.fire({
        title: `${User_Entity_Name} Created Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate(-1);
  } catch (error) {
    Swal.fire({
      title: '',
      icon: 'error',
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
