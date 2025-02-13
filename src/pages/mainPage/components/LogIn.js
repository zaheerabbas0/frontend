import { passwordRules } from '../../../utils/Utils';
import { MailOutlined } from '@ant-design/icons';
import { Col, Form, message } from 'antd';
import { CustomButton } from '../../../styledComponents/CustomButton';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { renderFormItem } from '../../projects/createProject/ProjectFormFields';
import styles from '../MainPage.module.css';
import { useDispatch } from 'react-redux';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { useEffect } from 'react';
import CustomForm from '../../../styledComponents/CustomForm';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('login', async () => {
  return true;
});
const LogIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading } = useOutletContext();

  const onFinish = async (credentials) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.post('/api/v1/auth/sign-in', credentials);
      const { access_token, user_info } = res.data;
      const loginTime = Date.now();

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_info', JSON.stringify(user_info));
      localStorage.setItem('login_time', loginTime);

      dispatch(login());
      navigate('/supportx/dashboard');
      form.resetFields();
    } catch (error) {
      const apiErrorMessage = error.response?.data?.detail;
      message.error(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      navigate('/supportx/dashboard');
    }
  }, [navigate]);

  return (
    <CustomForm
      className={styles.login_form}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      {logInFieldConfigurations.map((field) => (
        <Col span={field.colSpan} key={field.name}>
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

      <div className={styles.forgot_password}>
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </div>

      <div className={styles.login_btns}>
        <CustomButton
          className={styles.login_buttons}
          height="45px"
          htmlType="submit"
        >
          Login
        </CustomButton>

        {/* <CustomButton
          className={styles.login_buttons}
          variant="default"
          height="45px"
          width="30vw"
          htmlType="button"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </CustomButton> */}
      </div>
    </CustomForm>
  );
};

export default LogIn;
const logInFieldConfigurations = [
  {
    label: 'Email Address',
    name: 'email__eq',
    type: 'input',
    placeholder: 'Enter your email',
    rules: [
      { required: true, message: 'Please input your email!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
    suffixIcon: <MailOutlined />,
    colSpan: 24,
    autocomplete: 'email__eq',
  },
  {
    label: 'Password',
    name: 'new_password',
    type: 'password',
    placeholder: 'Enter your password',
    rules: passwordRules,
    colSpan: 24,
    autocomplete: 'new_password',
  },
];
