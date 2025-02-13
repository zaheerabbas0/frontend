import { Col, Form } from 'antd';
import { renderStatusTag } from '../../../utils/Utils';
import { renderFormItem } from '../../projects/createProject/ProjectFormFields';
import styles from './CreateCustomer.module.css';
import { Customer_Entity_Name } from '../../../constants/customer/TitleRoutesConstants';
const statusOptions = [
  { name: renderStatusTag('Active'), id: 'Active', value: 'Active' },
  { name: renderStatusTag('In Active'), id: 'In Active', value: 'In Active' },
];
export const CustomerFieldConfigurations = [
  {
    name: 'image_base64',
    type: 'upload',
    label: '',
    placeholder: 'Upload project image',
    colSpan: 24,
    rules: [{ required: false }],
  },
  {
    label: `${Customer_Entity_Name} Name`,
    name: 'name',
    type: 'input',
    placeholder: `Enter ${Customer_Entity_Name} name`,
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
  },
  {
    label: 'Email',
    name: 'email',
    type: 'input',
    placeholder: 'Enter Email',
    rules: [
      { required: true, message: 'Please enter Email!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
  },
  {
    label: 'Phone Number',
    name: 'phone',
    type: 'phone',
    rules: [
      { required: true, message: 'Please input Phone Number!' },
      { min: 11, message: 'At least 11 characters long!' },
    ],
  },
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    placeholder: 'Select Status',
    options: statusOptions,
    rules: [{ required: true, message: 'Please select Status!' }],
  },
  // {
  //   label: 'Country',
  //   name: 'country',
  //   type: 'country',
  //   placeholder: 'Select Country',
  //   // rules: [{ required: true, message: 'Please select Country!' }],
  // },
  // {
  //   label: 'State',
  //   name: 'state',
  //   type: 'state',
  //   placeholder: 'Select State',
  //   // rules: [{ required: true, message: 'Please select State!' }],
  // },
  // {
  //   label: 'City',
  //   name: 'city',
  //   type: 'city',
  //   placeholder: 'Select City',
  //   // rules: [{ required: true, message: 'Please select City!' }],
  // },
  // {
  //   label: 'Address',
  //   name: 'address',
  //   type: 'input',
  //   placeholder: 'Enter Address',
  //   // rules: [{ required: true, message: 'Please enter Address!' }],
  // },
];

const CustomerFormFields = ({
  fileList,
  setFileList,
  setBase64Image,
  countriesList,
  GetState,
  stateList,
  setStateList,
  GetCity,
  cityList,
  setCityList,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
}) => {
  return (
    <>
      {CustomerFieldConfigurations.map((field) => (
        <Col
          sm={field.colSpan || 24}
          md={field.colSpan || 12}
          lg={field.colSpan || 12}
          xl={field.colSpan || 12}
          key={field.name}
        >
          <Form.Item
            label={field.label}
            name={field.name}
            rules={field.rules}
            className={
              field.name.endsWith('image_url') ||
              field.name.endsWith('image_base64')
                ? styles.upload_customer
                : ''
            }
            validateTrigger="onSubmit"
          >
            {renderFormItem(
              field,
              fileList,
              setFileList,
              setBase64Image,
              countriesList,
              GetState,
              stateList,
              setStateList,
              GetCity,
              cityList,
              setCityList,
              country,
              setCountry,
              state,
              setState,
              city,
              setCity
            )}
          </Form.Item>
        </Col>
      ))}
    </>
  );
};

export default CustomerFormFields;
