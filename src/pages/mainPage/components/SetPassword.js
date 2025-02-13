import React from 'react';
import { Form, Col, message } from 'antd';
import { CustomButton } from '../../../styledComponents/CustomButton';
import { passwordRules } from '../../../utils/Utils';
import { renderFormItem } from '../../projects/createProject/ProjectFormFields';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import CustomForm from '../../../styledComponents/CustomForm';
import styles from '../MainPage.module.css';

const SetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setLoading } = useOutletContext();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const onFinish = async (passwords) => {
    setLoading(true);
    try {
      const payload = {
        ...passwords,
        email: email,
      };

      const response = await AxiosInstance.post(
        `/api/v1/auth/reset-password`,
        payload
      );
      message.success('Password updated successfully');
      localStorage.clear();
      navigate('/');
      form.resetFields();
      return response.data;
    } catch (error) {
      const apiErrorMessage = error.response?.data?.detail;
      message.error(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomForm
      className={styles.setpass_form}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      {fieldConfigurations.map((field) => (
        <Col span={24} key={field.name}>
          <Form.Item
            label={field.label}
            name={field.name}
            rules={field.rules}
            validateTrigger="onSubmit"
          >
            {renderFormItem(field)}
          </Form.Item>
        </Col>
      ))}
      <Col span={24}>
        <CustomButton
          className={styles.setpass_btn}
          height="45px"
          htmlType="submit"
        >
          Submit
        </CustomButton>
      </Col>
    </CustomForm>
  );
};

export default SetPassword;

const fieldConfigurations = [
  {
    label: 'New Password',
    name: 'new_password',
    type: 'password',
    rules: passwordRules,
    placeholder: 'Enter your new password',
  },
  {
    label: 'Confirm Password',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Confirm your new password',
    rules: [
      { required: true, message: 'Please confirm your password!' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('new_password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match!'));
        },
      }),
    ],
  },
];

// const fetchUserId = async (email) => {
//   try {
//     const response = await AxiosInstance.get(
//       `/api/v1/authget-user_id/${email}`
//     );
//     return response.data.user_id;
//   } catch (error) {
//     throw error;
//   }
// };
