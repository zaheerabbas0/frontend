// import React from "react";
import { message } from 'antd';
import Swal from 'sweetalert2';
import {
  // fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  fetchCustomerDetails,
} from '../reduxToolkit/features/CustomerSlice';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { renderStatusTag } from './Utils';
import {
  Customer_Route_Name,
  Customer_Entity_Name,
} from '../constants/customer/TitleRoutesConstants';

export const handleCustomerCreate = (navigate) => {
  navigate(`create-${Customer_Route_Name}`);
};

export const customerRowClicked = (navigate, dispatch) => (record) => ({
  onClick: (event) => {
    if (
      event.target.tagName === 'INPUT' ||
      event.target.closest('.ant-table-selection-column')
    ) {
      return;
    }
    navigate(`${Customer_Route_Name}-detail/${record.id}`);
    dispatch(fetchCustomerDetails(record.id));
  },
  style: { cursor: 'pointer' },
});

export const handleCustomerForm = async (formData, id, dispatch, navigate) => {
  try {
    if (id) {
      await dispatch(
        updateCustomer({ id, updatedCustomer: formData })
      ).unwrap();
      Swal.fire({
        title: `${Customer_Entity_Name} Updated Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(createCustomer(formData)).unwrap();
      Swal.fire({
        title: `${Customer_Entity_Name} Created Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate(-1);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const handleCustomerDelete = async (
  customerId,
  dispatch,
  setSelectedRowKeys
) => {
  const isMultiple = customerId.length > 1;
  try {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${
        isMultiple
          ? `these ${Customer_Entity_Name}s`
          : `this ${Customer_Entity_Name}`
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
      await dispatch(deleteCustomer(customerId)).unwrap();
      if (setSelectedRowKeys) {
        setSelectedRowKeys([]);
      }
      Swal.fire({
        title: 'Deleted!',
        text: `${isMultiple ? `${Customer_Entity_Name} have` : `${Customer_Entity_Name}s has`} been deleted.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const disabledDate = (current) => {
  return current && current < dayjs().startOf('day');
};

export const handleOpenChange = (open) => {
  if (open) {
    setTimeout(() => {
      const calendar = document.querySelector('.ant-picker-dropdown');
      if (calendar) {
        const prevMonthButton = calendar.querySelector(
          '.ant-picker-header-prev-btn'
        );
        const prevYearButton = calendar.querySelector(
          '.ant-picker-header-super-prev-btn'
        );
        if (prevMonthButton) {
          prevMonthButton.style.display = 'none';
        }
        if (prevYearButton) {
          prevYearButton.style.display = 'none';
        }
      }
    }, 0);
  }
};

export const exportSelectedCustomers = (selectedRowKeys, customerData) => {
  let customersToExport = [];

  if (selectedRowKeys.length === 0) {
    customersToExport = customerData;
  } else {
    customersToExport = customerData.filter((customer) =>
      selectedRowKeys.includes(customer.id)
    );
  }

  if (customersToExport.length === 0) {
    message.warning(`No ${Customer_Entity_Name} available for export`);
    return;
  }

  const formattedCustomers = customersToExport.map(
    ({ id, created_by_id, image_url, ...rest }) => rest
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedCustomers);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${Customer_Entity_Name}`);

  XLSX.writeFile(workbook, `${Customer_Entity_Name} List.xlsx`);
};

export const handleCustomerOk = (customersFilterForm, setIsDrawerVisible) => {
  customersFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      customersFilterForm.resetFields();
    })
    .catch((info) => {});
};

export const customersFilterFields = (skills = []) => [
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
  // {
  //   label: 'By Skills',
  //   name: 'skill',
  //   type: 'select',
  //   placeholder: 'Select Skill',
  //   options: skills,
  // },
];
