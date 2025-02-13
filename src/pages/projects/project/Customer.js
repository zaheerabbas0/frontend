import styled from 'styled-components';
import { Card as AntCard, Col, Row } from 'antd';
import { Container } from '../../../styledComponents/CustomCard';
import CustomerDetail from './components/customerDetail';
import ContractDetail from './components/contractDetail';

const StyledCard = styled(AntCard)`
  border: 1px solid #eaeaea;
  border-radius: 16px;
  height: 100%;
  .ant-card-body {
    height: 100%;
  }
`;

const Customer = ({ project }) => {
  // console.log("LOGGING", project);
  return (
    <Container style={{ padding: 0 }}>
      <Row
        gutter={[25, 25]}
        style={{
          marginBottom: '16px',
          // height: "680px",
          justifyContent: 'stretch',
        }}
      >
        {/* <Col xs={24} md={24} lg={12} xxl={11}>
          <StyledCard>
            <CustomerDetail customer={project?.customer[0]} />
          </StyledCard>
        </Col> */}
        <Col xs={24} md={24} lg={12} xxl={13}>
          <StyledCard>
            <ContractDetail
              contract={project?.contract}
              isCustomerAssigned={project?.customer[0]}
            />
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Customer;
