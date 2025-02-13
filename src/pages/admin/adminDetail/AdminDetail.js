import React from 'react';
import { Col, Row } from 'antd';
import AdminInfo from './components/AdminInfo';
import AdminUsers from './components/AdminUsers';
import AdminDetailGraph from './components/AdminDetailGraph';
import AdminTicketsCount from './components/AdminTicketsCount';
import BackButton from '../../../components/buttons/BackButton';
// import AdminTicketSummary from './components/AdminTicketSummary';

const AdminDetail = () => {
  return (
    <Row style={{ padding: '1vw' }}>
      <Col span={24}>
        <BackButton />
      </Col>

      <Col span={10}>
        <AdminInfo />
      </Col>
      <Col span={10}>
        <AdminDetailGraph />
      </Col>
      <Col span={4}>
        <AdminTicketsCount />
      </Col>
      {/* <Col span={24}>
        <AdminTicketSummary />
      </Col> */}
      <Col span={24}>
        <AdminUsers />
      </Col>
    </Row>
  );
};

export default AdminDetail;
