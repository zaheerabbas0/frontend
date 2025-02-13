// import React from 'react';
import { message } from 'antd';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import {
  clearAdminUsers,
  createAdmin,
  deleteAdmin,
  fetchAdminDetails,
  fetchAdminUsers,
  updateAdmin,
} from '../reduxToolkit/features/AdminSlice';
import { renderStatusTag } from './Utils';

export const handleAdminDelete = async (
  adminIds,
  dispatch,
  setSelectedRowKeys = null
) => {
  try {
    const adminIdArray = Array.isArray(adminIds) ? adminIds : [adminIds];
    const isMultiple = adminIds.length > 1;
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${isMultiple ? 'these admins' : 'this admin'}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      for (const adminId of adminIdArray) {
        await dispatch(deleteAdmin(adminId)).unwrap();
      }
      if (setSelectedRowKeys) {
        setSelectedRowKeys([]);
      }
      Swal.fire({
        title: 'Deleted!',
        text: `${isMultiple ? 'Admins have' : 'Admin has'} been deleted.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const adminsFilterFields = [
  {
    label: 'By Name',
    name: 'name',
    type: 'input',
    placeholder: 'Enter Name',
  },
  {
    label: 'By Email',
    name: 'email',
    type: 'input',
    placeholder: 'Enter Email',
  },
  {
    label: 'By Status',
    name: 'status',
    type: 'select',
    placeholder: 'Select Status',
    options: [
      { label: renderStatusTag('Active'), value: 'Active' },
      { label: renderStatusTag('In Active'), value: 'In Active' },
    ],
  },
];

export const adminRowClicked = (navigate, dispatch) => (record) => ({
  onClick: (event) => {
    if (
      event.target.tagName === 'INPUT' ||
      event.target.closest('.ant-table-selection-column')
    ) {
      return;
    }
    navigate(`admin-detail/${record.id}`);
    dispatch(clearAdminUsers());
    dispatch(fetchAdminDetails(record.id));
    dispatch(fetchAdminUsers(record.id));
  },
  style: { cursor: 'pointer' },
});

export const exportSelectedAdmins = (selectedRowKeys, admins) => {
  let adminsToExport = [];

  if (selectedRowKeys.length === 0) {
    adminsToExport = admins;
  } else {
    adminsToExport = admins.filter((admin) =>
      selectedRowKeys.includes(admin.adminId)
    );
  }

  if (adminsToExport.length === 0) {
    message.warning('No admin available for export');
    return;
  }

  const formattedAdmins = adminsToExport.map(
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

  const worksheet = XLSX.utils.json_to_sheet(formattedAdmins);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Admins');

  XLSX.writeFile(workbook, 'Admins List.xlsx');
};

export const handleAdminForm = async (values, id, dispatch, navigate) => {
  try {
    if (id) {
      await dispatch(updateAdmin({ id, updatedAdmin: values })).unwrap();
      Swal.fire({
        title: 'Admin Updated Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(createAdmin(values)).unwrap();
      Swal.fire({
        title: 'Admin Created Successfully',
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
      // text: JSON.stringify(error),
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
