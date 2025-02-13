import AddNewCustomOption from '../../../../components/ui/shared/addNewOption';
import { passwordRules, renderStatusTag } from '../../../../utils/Utils';
// import { userTypes } from '../CreateUser';

export const userFieldConfigurations = (
  admins,
  skills,
  groups,
  openRoleModal = () => {},
  openGroupModal = () => {}
) => [
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
    label: 'Phone Number',
    name: 'phone',
    type: 'phone',
    rules: [{ required: true, message: 'Please input Phone Number!' }],
    placeholder: 'Enter Phone Number',
  },
  // ...(hasPermission('select:admins')
  //   ? [
  //       {
  //         label: 'Select Admin',
  //         name: 'admins',
  //         type: 'select',
  //         options: admins || [],
  //         rules: [{ required: true, message: 'Please select Admin!' }],
  //         placeholder: 'Select Admin',
  //       },
  //     ]
  //   : []),
  {
    label: 'Status',
    name: 'status',
    type: 'status',
    rules: [{ required: true, message: 'Please select Status!' }],
    options: ['Active', 'In Active'].map((status) => ({
      value: status,
      label: renderStatusTag(status),
    })),
    placeholder: 'Select Status',
  },
  {
    label: 'Skill',
    name: 'designation_id',
    type: 'select',
    options: skills || [],
    placeholder: 'Select Skill',
    // customButton: {
    //   label: "+ Add Role",
    //   onclick: openRoleModal,
    //   align: "right",
    // },
    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={'+ Add New Skill...'}
          onClick={openRoleModal}
        />
      </>
    ),
  },
  {
    label: 'Group',
    name: 'group_id',
    type: 'select',
    options: groups || [],
    placeholder: 'Select Group',
    dropdownRender: (menu) => (
      <>
        {menu}
        <AddNewCustomOption
          text={'+ Add New Group...'}
          onClick={openGroupModal}
        />
      </>
    ),
  },
  {
    label: 'Timezone',
    name: 'time_zone',
    type: 'time_zone',
    placeholder: 'Select Timezone',
  },
  // {
  //   label: 'User Type',
  //   name: 'user_type_id',
  //   type: 'user_type_id',
  //   placeholder: 'Select User Type',
  //   rules: [{ required: true, message: 'Please select User Type!' }],
  //   options: userTypes || [],
  // },
];
