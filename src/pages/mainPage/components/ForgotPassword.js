import React, { useState } from 'react';
import { Col, Form, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import {
  CustomInput,
  CustomPasswordInput,
} from '../../../styledComponents/CustomInput';
import { CustomButton } from '../../../styledComponents/CustomButton';
import styles from '../MainPage.module.css';
import CustomForm from '../../../styledComponents/CustomForm';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { passwordRules } from '../../../utils/Utils';
import { useNavigate, useOutletContext } from 'react-router-dom';

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [tokenVisible, setTokenVisible] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const { setLoading } = useOutletContext();

  const onFinish = async (credentials) => {
    setLoading(true);
    try {
      if (!tokenVisible) {
        await AxiosInstance.post('/api/v1/auth/forgot-password', {
          email: credentials.email,
        });
        message.success('OTP is successfully sent to your email.');
        setEmail(credentials.email);
        setTokenVisible(true);
      } else if (showNewPasswordFields) {
        await AxiosInstance.post('/api/v1/auth/reset-password', {
          email,
          new_password: credentials.new_password,
          confirm_password: credentials.confirm_password,
        });
        message.success('Password reset successfully.');
        setTokenVisible(false);
        setShowNewPasswordFields(false);
        form.resetFields();
      } else {
        await AxiosInstance.post('/api/v1/auth/verify-token', {
          email,
          token,
        });
        message.success('OTP verified successfully.');
        setShowNewPasswordFields(true);
      }
    } catch (error) {
      const apiErrorMessage = error.response?.data?.detail;
      message.error(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderFormItem = (field) => {
    switch (field.type) {
      case 'input':
        return (
          <CustomInput
            placeholder={field.placeholder}
            suffix={field.suffixIcon}
            value={field.name === 'token' ? token : undefined}
            onChange={
              field.name === 'token'
                ? (e) => setToken(e.target.value)
                : field.name === 'email'
                  ? (e) => setEmail(e.target.value)
                  : undefined
            }
          />
        );
      case 'password':
        return (
          <CustomPasswordInput
            type="password"
            placeholder={field.placeholder}
            iconRender={field.iconRender}
          />
        );
      default:
        return null;
    }
  };

  const fieldConfigurations = [
    !tokenVisible && {
      label: 'Email Address',
      name: 'email',
      type: 'input',
      placeholder: 'Enter your email',
      rules: [
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Invalid email format!' },
      ],
      suffixIcon: <MailOutlined />,
    },
    tokenVisible &&
      !showNewPasswordFields && {
        label: 'Enter OTP',
        name: 'token',
        type: 'input',
        placeholder: 'Enter OTP',
        rules: [{ required: true, message: 'Please enter the OTP!' }],
      },
    tokenVisible &&
      showNewPasswordFields && {
        label: 'New Password',
        name: 'new_password',
        type: 'password',
        placeholder: 'Enter your new password',
        rules: passwordRules,
      },
    tokenVisible &&
      showNewPasswordFields && {
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
  ].filter(Boolean);

  return (
    <Col>
      <CustomForm form={form} onFinish={onFinish} layout="vertical">
        {fieldConfigurations.map((field, index) => (
          <Form.Item
            label={field.label}
            name={field.name}
            rules={field.rules}
            key={index}
            validateTrigger="onSubmit"
          >
            {renderFormItem(field)}
          </Form.Item>
        ))}

        <div className={styles.forgot_btns}>
          <CustomButton
            className={styles.login_buttons}
            height="45px"
            htmlType="submit"
          >
            {tokenVisible
              ? showNewPasswordFields
                ? 'Submit Password'
                : 'Verify OTP'
              : 'Verify Email'}
          </CustomButton>
          <CustomButton
            className={styles.login_buttons}
            variant="default"
            height="45px"
            htmlType="button"
            onClick={() => navigate('/')}
          >
            Back to Login
          </CustomButton>
        </div>
      </CustomForm>
    </Col>
  );
};

export default ForgotPassword;
