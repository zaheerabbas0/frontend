import React from 'react';
import { Col, Row } from 'antd';
import DetailUserGraph from './components/UserDetailGraph';
import UserTicketSummary from './components/UserTicketSummary';
import UserInfo from './components/UserInfo';
import UserTicketsCount from './components/UserTicketsCount';
import './DetailUser.css';
import BackButton from '../../../components/buttons/BackButton';

const DetailUser = () => {
  return (
    <Row style={{ padding: '1vw' }}>
      <Col span={24}>
        <BackButton />
      </Col>

      <Col span={10}>
        <UserInfo />
      </Col>

      <Col span={10}>
        <DetailUserGraph />
      </Col>

      <Col span={4}>
        <UserTicketsCount />
      </Col>

      <Col span={24}>
        <UserTicketSummary />
      </Col>
    </Row>
  );
};

export default DetailUser;
