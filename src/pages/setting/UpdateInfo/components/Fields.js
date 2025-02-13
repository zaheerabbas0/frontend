import { passwordRules } from '../../../../utils/Utils';

export const settingFieldConfigurations = [
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: 'Please input Name!' },
      {
        pattern: /^(?! )[a-zA-Z]+( [a-zA-Z]+)*$/,
        message: 'Name can only include letters and one space between words!',
      },
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
    rules: [
      {
        pattern: /^(?!.*(\d)\1{6,})(?:\d{7,15})$/,
        message: 'Invalid phone number! Please enter a valid number.',
      },
    ],
    placeholder: 'Enter Phone Number',
  },
  {
    label: 'Country',
    name: 'country',
    type: 'country',
    placeholder: 'Select Country',
  },
  {
    label: 'State',
    name: 'state',
    type: 'state',
    placeholder: 'Select State',
  },
  {
    label: 'City',
    name: 'city',
    type: 'city',
    placeholder: 'Select City',
  },
  {
    label: 'Present Address',
    name: 'address',
    type: 'input',
    rules: [
      {
        pattern: /^(?! )(.*?)( [^ ]+)*$/,
        message: 'Address can only have one space between words!',
      },
    ],

    placeholder: 'Enter Address',
  },
  {
    label: 'Timezone',
    name: 'time_zone',
    type: 'time_zone',
    // rules: [{ required: true, message: "Please select Timezone!" }],
    // options: ["North", "South", "East", "West"],
    placeholder: 'Select Timezone',
  },
];
