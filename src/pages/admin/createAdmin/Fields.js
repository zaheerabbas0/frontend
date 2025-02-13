// import React from 'react';
// import AddNewCustomOption from '../../../components/ui/shared/addNewOption';
import { passwordRules, renderStatusTag } from '../../../utils/Utils';

const statusOptions = [
  { name: renderStatusTag('Active'), id: 'Active', value: 'Active' },
  { name: renderStatusTag('In Active'), id: 'In Active', value: 'In Active' },
];

export const adminFieldConfigurations = () => [
  {
    name: 'image_base64',
    type: 'upload',
    label: '',
    placeholder: 'Upload project image',
    colSpan: 24,
    rules: [{ required: false }],
  },
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: 'Please input Name!' },
      {
        validator: (_, value) => {
          if (!value) {
            return Promise.resolve();
          }
          if (/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)) {
            return Promise.resolve();
          }
          if (/ {2,}/.test(value)) {
            return Promise.reject('Only one space is allowed between words!');
          }
          if (/[^a-zA-Z ]/.test(value)) {
            return Promise.reject('Name can only include letters!');
          }
          return Promise.reject('Invalid name format!');
        },
      },
      { min: 3, message: 'At least 3 characters long!' },
    ],
    placeholder: 'Enter Name',
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'input',
    rules: [
      { required: true, message: 'Please input Email!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
    placeholder: 'Enter Email',
  },

  {
    label: 'Password',
    name: 'password',
    type: 'password',
    rules: passwordRules,
    placeholder: 'Enter Password',
  },
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    options: statusOptions,
    rules: [{ required: true, message: 'Please select Status!' }],
    placeholder: 'Select Status',
  },
  {
    label: 'Phone Number',
    name: 'phone',
    type: 'phone',
    rules: [{ required: true, message: 'Please input Phone Number!' }],
    placeholder: 'Enter Phone Number',
  },
  {
    label: 'Timezone',
    name: 'time_zone',
    type: 'time_zone',
    placeholder: 'Select Timezone',
  },
];

// {
//   label: 'Skill',
//   name: 'designation_id',
//   type: 'select',
//   options: skills || [],
//   placeholder: 'Select Skill',
//   // customButton: {
//   //   label: "+ Add Role",
//   //   onclick: openRoleModal,
//   //   align: "right",
//   // },
//   dropdownRender: (menu) => (
//     <>
//       {menu}
//       <AddNewCustomOption
//         text={'+ Add New Skill...'}
//         onClick={openRoleModal}
//       />
//     </>
//   ),
// },
// {
//   label: 'Group',
//   name: 'group',
//   type: 'select',
//   options: groups?.data || [],
//   placeholder: 'Select Group',
//   dropdownRender: (menu) => (
//     <>
//       {menu}
//       <AddNewCustomOption
//         text={'+ Add New Group...'}
//         onClick={openGroupModal}
//       />
//     </>
//   ),
// },
// {
//   label: 'User Type',
//   name: 'user_type_id',
//   type: 'user_type_id',
//   placeholder: 'Select User Type',
//   rules: [{ required: true, message: 'Please select User Type!' }],
//   options: userTypes || [],
// },
