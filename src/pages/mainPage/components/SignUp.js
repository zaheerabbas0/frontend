import React, { useState } from 'react';
import { Form, Col, Row, message } from 'antd';
import { CustomButton } from '../../../styledComponents/CustomButton';
import { noWhitespaceValidator, passwordRules } from '../../../utils/Utils';
import { renderFormItem } from '../../projects/createProject/ProjectFormFields';
import styles from '../MainPage.module.css';
import CustomForm from '../../../styledComponents/CustomForm';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [base64Image, setBase64Image] = useState('');
  const { setLoading } = useOutletContext();

  const onFinish = async (credentials) => {
    setLoading(true);
    try {
      const { confirm_password, ...signUpData } = credentials;
      if (base64Image) {
        signUpData.image_base64 = base64Image;
      }
      signUpData.role_name = 'Admin';
      signUpData.user_type_id = 1;
      signUpData.organization_id = 1;

      await AxiosInstance.post('/api/v1/auth/sign-up', signUpData);
      message.success('Sign-up Successful');
      form.resetFields();
    } catch (error) {
      const apiErrorMessage = error.response?.data?.detail;
      message.error(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomForm
      className={styles.signup_form}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[24, 0]}>
        <Col span={24} className={styles.signup_upload_user}>
          <Form.Item name="image_base64">
            {renderFormItem(
              { type: 'upload' },
              fileList,
              setFileList,
              setBase64Image
            )}
          </Form.Item>
        </Col>
        {signUpFieldConfigurations.map((field) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            key={field.name}
          >
            <Form.Item
              label={field.label}
              name={field.name}
              rules={field.rules}
              validateTrigger="onSubmit"
            >
              {renderFormItem(field, fileList, setFileList, setBase64Image)}
            </Form.Item>
          </Col>
        ))}
        <Col span={24}>
          <div className={styles.signup_btns}>
            <CustomButton height="45px" width="45vh" htmlType="submit">
              Sign Up
            </CustomButton>
            <CustomButton
              variant="default"
              height="45px"
              width="45vh"
              htmlType="button"
              onClick={() => navigate('/')}
            >
              Back to Login
            </CustomButton>
          </div>
        </Col>
      </Row>
    </CustomForm>
  );
};
export default SignUp;

const signUpFieldConfigurations = [
  {
    label: 'Full Name',
    name: 'name',
    type: 'input',
    placeholder: 'Enter your full name',
    rules: [
      { required: true, message: 'Please input your name!' },
      { pattern: /^[a-zA-Z\s]*$/, message: 'Name can only include letters!' },
      { validator: noWhitespaceValidator('Name') },
    ],
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'input',
    placeholder: 'Enter your email',
    rules: [
      { required: true, message: 'Please input your email address!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    rules: passwordRules,
  },
  {
    label: 'Confirm Password',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Confirm your password',
    rules: [
      { required: true, message: 'Please confirm your password!' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match!'));
        },
      }),
    ],
  },
  {
    label: 'Phone Number',
    name: 'phone',
    type: 'phone',
    rules: [
      { required: true, message: 'Please input your phone number!' },
      { min: 11, message: 'At least 11 characters long!' },
    ],
  },
];
