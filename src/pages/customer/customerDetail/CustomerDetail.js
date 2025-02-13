import React from 'react';
import { Col, Row } from 'antd';
import BackButton from '../../../components/buttons/BackButton';
import CustomerDetailGraph from './components/CustomerDetailGraph';
import CustomerInfo from './components/CustomerInfo';
import CustomerTicketsCount from './components/CustomerTicketsCount';
import CustomerTicketSummary from './components/CustomerTicketSummary';

const CustomerDetail = () => {
  return (
    <Row style={{ padding: '1vw' }}>
      <Col span={24}>
        <BackButton />
      </Col>

      <Col span={10}>
        <CustomerInfo />
      </Col>

      <Col span={10}>
        <CustomerDetailGraph />
      </Col>

      <Col span={4}>
        <CustomerTicketsCount />
      </Col>

      <Col span={24}>
        <CustomerTicketSummary />
      </Col>
    </Row>
  );
};

export default CustomerDetail;
