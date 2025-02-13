import { noWhitespaceValidator, renderStatusTag } from '../../../utils/Utils';
import { disabledDate } from '../../../utils/ProjectUtils';
import { Customer_Entity_Name } from '../../../constants/customer/TitleRoutesConstants';
import { Project_Entity_Name } from '../../../constants/project/TitleRoutesConstants';

const statusOptions = [
  { name: renderStatusTag('Active'), id: 'active', value: 'active' },
  { name: renderStatusTag('In Active'), id: 'inactive', value: 'inactive' },
];

// export const customerFieldConfigurations = (mode) => [
//   {
//     name: 'image_base64',
//     type: 'upload',
//     label: '',
//     responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
//     placeholder: 'Upload project image',
//     rules: [{ required: false }],
//   },
//   {
//     label: `${Customer_Entity_Name} Name`,
//     name: 'name',
//     type: 'input',
//     placeholder: `Enter ${Customer_Entity_Name} Name`,
//     rules: [
//       {
//         required: true,
//         message: `Please enter ${Customer_Entity_Name} Name!`,
//       },
//       { validator: noWhitespaceValidator(`${Customer_Entity_Name} Name`) },
//     ],
//   },
//   {
//     label: 'Email',
//     name: 'email',
//     type: 'input',
//     placeholder: 'Enter Email',
//     rules: [
//       { required: true, message: 'Please enter Email!' },
//       { type: 'email', message: 'Invalid email format!' },
//     ],
//     props: {
//       // disabled: mode === EDIT_CUSTOMER,
//     },
//   },
//   // DONT REMOVE, WILL NEED IN FUTURE
//   // {
//   //   label: 'Password',
//   //   name: 'password',
//   //   type: 'input',
//   //   inputType: 'password',
//   //   placeholder: 'Enter Address',
//   //   rules: passwordRules,
//   // },
//   {
//     label: 'Phone Number',
//     name: 'phone',
//     type: 'phone',
//     // placeholder: "+92",
//     rules: [
//       { required: true, message: 'Please enter Phone Number!' },
//       { min: 11, message: 'Phone No must be at least 11 characters long!' },
//     ],
//   },
//   {
//     label: 'Status',
//     name: 'status',
//     type: 'select',
//     placeholder: 'Select Status',
//     rules: [{ required: true, message: 'Please select Status!' }],
//     options: statusOptions,
//   },
//   {
//     label: 'Country',
//     name: 'country',
//     type: 'country',
//     placeholder: 'Select Country',
//   },
//   {
//     label: 'State',
//     name: 'state',
//     type: 'state',
//     placeholder: 'Select State',
//   },
//   {
//     label: 'City',
//     name: 'city',
//     type: 'city',
//     placeholder: 'Select City',
//   },
// ];

export const projectFieldConfigurations = (
  customers = [],
  slaType = [],
  assignee = [],
  openSLAModal = () => {},
  onPictureRemove = () => {}
) => {
  let userNames =
    assignee.length > 0
      ? [{ name: 'All', id: 'all', value: 'all' }, ...assignee]
      : [];
  // let slatyoeOptions = [
  //   { tag: 'P1', time: 4, id: 1, name: 'P1 - hours  4 to respond' },
  //   { tag: 'P2', time: 8, id: 2, name: 'P1 - hours 8 to respond' },
  //   { tag: 'P3', time: 10, id: 3, name: 'P1 - hours 10 to respond' },
  // ];
  return [
    {
      name: 'image_url',
      type: 'upload',
      label: '',
      responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
      placeholder: `Upload ${Project_Entity_Name} image`,
      // valuePropName: 'fileList',
      showUserIcon: false,
      props: {
        onRemove: onPictureRemove,
      },

      // rules: [{ required: false }],
    },
    {
      label: `${Project_Entity_Name} Name`,
      name: 'name',
      type: 'input',
      placeholder: 'Enter project name',
      rules: [
        { required: true, message: 'Please enter Project Name!' },
        { validator: noWhitespaceValidator('Project Name') },
      ],
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      placeholder: 'Select Status',
      rules: [{ required: true, message: 'Please select Status!' }],
      options: statusOptions,
    },
    {
      label: `${Customer_Entity_Name} Name`,
      name: 'customer_id',
      type: 'select',
      placeholder: `Select ${Customer_Entity_Name}`,
      // rules: [{ required: true, message: `Please select ${Customer_Entity_Name}!` }],
      options: customers, // Assuming options are populated dynamically
    },
    // {
    //   label: 'Select SLAs type according to project',
    //   name: 'sla_ids',
    //   type: 'select',
    //   placeholder: 'Select SLAs type',
    //   mode: 'multiple',
    //   rules: [{ required: true, message: 'SLA type is required!' }],
    //   options: slaType,
    //   // customButton: {
    //   //   label: "Add Custom SLA",
    //   //   onclick: openSLAModal,
    //   //   align: "right",
    //   // },
    //   dropdownRender: (menu) => (
    //     <>
    //       {menu}
    //       <AddNewCustomOption
    //         text={'+ Add Custom Sla...'}
    //         onClick={openSLAModal}
    //       />
    //     </>
    //   ),
    // },
    {
      label: 'Assign To',
      name: 'user_ids',
      type: 'select',
      mode: 'multiple',
      placeholder: 'Select Assignee',
      rules: [{ required: true, message: 'Please select Assignee!' }],
      options: userNames,
    },
    {
      label: 'Due Date',
      name: 'due_date',
      type: 'date',
      placeholder: 'Select due date',
      rules: [{ required: true, message: 'Please select Due Date!' }],
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea',
      rules: [
        { required: true, message: 'Write a Description!' },
        { validator: noWhitespaceValidator('Description') },
      ],
      columnSpan: 24,
      placeholder: 'Enter Description',
      responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
    },
  ];
};

export const contractFieldConfigurations = (
  customers = [],
  assignee = [],
  onFileChange,
  setStartDate,
  startDate
) => {
  let userNames =
    assignee.length > 0
      ? [{ name: 'All', id: 'all', value: 'all' }, ...assignee]
      : [];
  const typeOptions = [
    { name: 'Warranty', id: 'warranty', value: 'Warranty' },
    { name: 'Maintenance', id: 'maintenance', value: 'Maintenance' },
    { name: 'Lease', id: 'lease', value: 'Lease' },
    {
      name: 'Software License',
      id: 'software_license',
      value: 'Software License',
    },
    {
      name: 'Manage Services',
      id: 'manage_services',
      value: 'Manage Services',
    },
    {
      name: 'Annual Contract',
      id: 'annual_contract',
      value: 'Annual Contract',
    },
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const dueDateElement = document.querySelector('.DUE_DATE');
    if (dueDateElement) {
      const clearButton = dueDateElement.querySelector(
        '.ant-picker-clear[role="button"]'
      );
      if (clearButton) {
        clearButton.click();
      }
    }
  };
  return [
    {
      label: 'Contract Contract',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Contract name',
      rules: [
        { required: true, message: 'Please enter Contract Name!' },
        { validator: noWhitespaceValidator('Contract Name') },
      ],
    },
    {
      label: 'Type',
      name: 'contract_type',
      type: 'select',
      placeholder: 'Select type',
      rules: [{ required: true, message: 'Please select Type!' }],
      options: typeOptions,
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      placeholder: 'Select status',
      rules: [{ required: true, message: 'Please select Status!' }],
      options: statusOptions,
    },
    // {
    //   label: `${Customer_Entity_Name}`,
    //   name: 'customer_id',
    //   type: 'select',
    //   placeholder: `Select ${Customer_Entity_Name}`,
    //   // rules: [{ required: true, message: `Please select ${Customer_Entity_Name}!` }],
    //   options: customers, // Assuming options are populated dynamically
    // },
    {
      label: 'Visible To',
      name: 'visible_to_ids',
      type: 'select',
      mode: 'multiple',
      placeholder: 'Select visibility',
      rules: [{ required: true, message: 'Please select visibility!' }],
      options: userNames,
    },
    {
      label: 'Vendor Name',
      name: 'vendor_name',
      type: 'input',
      placeholder: 'Enter Vendor name',
      rules: [{ required: true, message: 'Please enter Vendor Name!' }],
    },
    {
      label: 'Collaborators',
      name: 'collaborator_ids',
      type: 'select',
      placeholder: 'Select Collaborators',
      options: userNames,
      mode: 'multiple',
      rules: [{ required: true, message: 'Please select Collaborators!' }],
    },
    {
      label: 'Cost',
      name: 'cost',
      type: 'input',
      props: {
        type: 'number',
        defaultValue: 0,
      },
      placeholder: 'Enter cost',
      rules: [{ required: true, message: 'Please enter Cost!' }],
    },
    {
      label: 'Start Date',
      name: 'start_date',
      type: 'date',
      placeholder: 'Select start date',
      rules: [{ required: true, message: 'Please select Start Date!' }],
      props: {
        onChange: handleStartDateChange,
        disabledDate: disabledDate,
      },
    },
    {
      label: 'Due Date',
      name: 'due_date',
      type: 'date',
      placeholder: 'Select due date',
      rules: [{ required: true, message: 'Please select Due Date!' }],
      props: {
        disabled: !startDate,
        disabledDate: (current) => current && current < startDate,
        className: 'DUE_DATE',
      },
    },
    {
      labelAfter: 'Auto Renew',
      name: 'auto_renew',
      type: 'switch',
      colStyles: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
      },
      valuePropName: 'checked',
      Layout: 'horizontal',
      responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
      itemStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      rules: [{ required: false }],
    },
    {
      labelAfter: 'Notify Expire',
      name: 'notify_expire',
      type: 'switch',
      colStyles: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
      },
      valuePropName: 'checked',
      Layout: 'horizontal',
      responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
      itemStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      rules: [{ required: false }],
    },
    {
      label: 'Notify To',
      name: 'notify_expiry',
      type: 'input',
      placeholder: 'Enter email',
      rules: [{ required: true, message: 'Please enter email addresses!' }],
    },
    {
      label: 'Notify Before',
      name: 'notify_before',
      type: 'input',
      placeholder: 'Enter number of days',
      rules: [{ required: true, message: 'Please enter notification days!' }],
    },
    {
      label: 'Attachment',
      name: 'attachment_file',
      type: 'dragger',
      responsiveness: { lg: 24, md: 24, sm: 24, xs: 24 },
      props: {
        accept: '.pdf',
        mode: 'multiple',
        onFileChange: onFileChange,
        checkPDFType: true,
        maxCount: 1,
      },
    },
  ];
};
