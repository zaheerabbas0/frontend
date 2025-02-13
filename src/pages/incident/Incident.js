import { Card, Col, Row } from 'antd';
import IncidentForm from './components/IncidentForm';
import styled from 'styled-components';
import styles from './Incident.module.css';

const CustomStyledCard = styled(Card)`
  border-radius: 12px;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

const Incident = () => {
  return (
    <Row className={styles.container}>
      <Col span={24}>
        <CustomStyledCard style={{ borderRadius: '12px', height: '100%' }}>
          <IncidentForm />
        </CustomStyledCard>
      </Col>
    </Row>
  );
};

export default Incident;
