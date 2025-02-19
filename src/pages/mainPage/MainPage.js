import React, { useState } from 'react';
import { Row, Col } from 'antd';
import LoginBg from '../../assets/LoginBg.svg';
import AppLogo from '../../assets/AppLogo.png';
import CustomSpin from '../../styledComponents/CustomSpin';
import styles from './MainPage.module.css';
import { Outlet, useLocation } from 'react-router-dom';

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const getLoginText = () => {
    switch (location.pathname) {
      case '/':
        return 'Login to your account';
      case '/signup':
        return 'Signup as an admin';
      case '/forgot-password':
        return 'Forgot your Password';
      case '/set-password':
        return 'Set your Password';
      default:
        return '';
    }
  };

  return (
    <CustomSpin spinning={loading}>
      <Row className={styles.login_page_container}>
        <Col xs={0} sm={0} md={0} lg={11} className={styles.left_container}>
          <div className={styles.left_container_text}>
            <h1>Hello zaheer from lahore</h1>
            <p>
              Designed to manage any type of work. Manage your work in your way
            </p>
          </div>
          <div className={styles.left_container_image}>
            <img src={LoginBg} alt="" />
          </div>
        </Col>
        <Col
          className={styles.right_container}
          xs={24}
          sm={24}
          md={24}
          lg={13}
          xxl={12}
        >
          <div>
            <Col className={styles.login_right}>
              <img className={styles.supportX_logo} src={AppLogo} alt="" />

              {location.pathname !== '/forgot-password' && (
                <p className={styles.welcome}>Welcome! 👋</p>
              )}

              <p className={styles.login_text}>{getLoginText()}</p>
              <Outlet context={{ setLoading }} />
            </Col>
          </div>
        </Col>
      </Row>
    </CustomSpin>
  );
};

export default MainPage;
