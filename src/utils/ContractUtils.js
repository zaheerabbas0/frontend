import React from 'react';
import { message, Tag } from 'antd';
import Swal from 'sweetalert2';
import {
  fetchContracts,
  deleteContract,
  createContract,
  updateContract,
  fetchContractDetails,
} from '../reduxToolkit/features/ContractSlice';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

export const handleContractCreate = (navigate) => {
  navigate('create-contract');
};

export const renderContractIdTag = (id) => (
  <Tag
    style={{
      background: ' #ededed',
      fontSize: '10px',
      fontWeight: 'bold',
      color: '#9a9a9a',
      padding: '0px 2px ',
    }}
  >
    ID #{id}
  </Tag>
);

export const contractRowClicked = (navigate, dispatch) => (record) => ({
  onClick: (event) => {
    if (
      event.target.tagName === 'INPUT' ||
      event.target.closest('.ant-table-selection-column')
    ) {
      return;
    }
    navigate(`contract-detail/${record.id}`);
    dispatch(fetchContractDetails(record.id));
  },
  style: { cursor: 'pointer' },
});

export const handleContractForm = async (formData, id, dispatch, navigate) => {
  try {
    if (id) {
      await dispatch(
        updateContract({ id, updatedContract: formData })
      ).unwrap();
      Swal.fire({
        title: 'Contract Updated Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(createContract(formData)).unwrap();
      Swal.fire({
        title: 'Contract Created Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // navigate(-1);
  } catch (error) {
    throw error;
  }
};

export const handleContractDelete = async (
  contractIds,
  dispatch,
  setSelectedRowKeys
) => {
  try {
    const isBatchDelete = Array.isArray(contractIds);
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${
        isBatchDelete ? 'selected Contracts' : 'this Contract'
      }!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      if (isBatchDelete) {
        await Promise.all(
          contractIds.map((id) => dispatch(deleteContract(id)).unwrap())
        );
        setSelectedRowKeys([]);
      } else {
        await dispatch(deleteContract(contractIds)).unwrap();
        setSelectedRowKeys([]);
      }
      Swal.fire({
        title: 'Deleted!',
        text: isBatchDelete
          ? 'Selected Contracts have been deleted.'
          : 'Contract has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      dispatch(fetchContracts());
    }
  } catch (error) {
    Swal.fire({
      title: 'Deleted!',
      text: 'Contract have been deleted',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
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

export const exportSelectedContracts = (selectedRowKeys, contractData) => {
  let contractsToExport = [];

  if (selectedRowKeys.length === 0) {
    contractsToExport = contractData;
  } else {
    contractsToExport = contractData.filter((contract) =>
      selectedRowKeys.includes(contract.id)
    );
  }

  if (contractsToExport.length === 0) {
    message.warning('No Contract available for export');
    return;
  }

  const formattedContracts = contractsToExport.map(
    ({ id, created_by, image_url, ...rest }) => rest
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedContracts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contracts');

  XLSX.writeFile(workbook, 'Contracts List.xlsx');
};

export const handleContractOk = (contractsFilterForm, setIsDrawerVisible) => {
  contractsFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      contractsFilterForm.resetFields();
    })
    .catch((info) => {});
};

// export const projectsFilterFields = [
//   {
//     label: "Project",
//     name: "project",
//     type: "select",
//     placeholder: "Select assignee",
//     options: [
//       { value: "open", label: "Open" },
//       { value: "onHold", label: "onHold" },
//       { value: "closed", label: "Closed" },
//     ],
//   },
//   {
//     label: "By Status",
//     name: "status",
//     type: "select",
//     placeholder: "Select status",
//     options: [
//       { value: "open", label: "Open" },
//       { value: "onHold", label: "OnHold" },
//       { value: "closed", label: "Closed" },
//     ],
//   },
//   {
//     name: "priority",
//     label: "By priority",
//     type: "select",
//     placeholder: "Select priority",
//     options: [
//       { value: "low", label: "Low" },
//       { value: "medium", label: "Medium" },
//       { value: "high", label: "High" },
//     ],
//   },
//   {
//     name: "createdDate",
//     label: "By Date",
//     type: "select",
//     options: [
//       { value: "today", label: "Today" },
//       { value: "month", label: "Month" },
//       { value: "Year", label: "Year" },
//     ],
//   },
// ];
