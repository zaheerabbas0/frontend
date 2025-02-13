import React from 'react';
import styled from 'styled-components';
import FormHeader from '../../../../components/ui/Form/FormHeader';
import DetailRow from './detailOutlined';
import { Col, Row } from 'antd';
import { CustomButton } from '../../../../styledComponents/CustomButton';
import { EditOutlined } from '@ant-design/icons';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import { Project_Route_Name } from '../../../../constants/project/TitleRoutesConstants';
import {
  Customer_Route_Name,
  Customer_Entity_Name,
} from '../../../../constants/customer/TitleRoutesConstants';
import { hasPermission } from '../../../../constants/UsersRole';

export const CustomerName = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18.96px;
  text-align: center;
  color: #474747;
  margin-top: 20px;
`;

export const CreatedDate = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 14.22px;
  text-align: center;
  color: #474747;
`;

export const NoCustomerAssigned = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85vh;
  border: 1px solid #a5a5a5;
  border-radius: 16px;
  transition: box-shadow 0.3s ease-in-out;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  &:hover {
    box-shadow: ${(props) =>
      props.disabled ? 'none' : '0 0 15px rgba(0, 0, 0, 0.2)'};
  }
  // &::after {
  //   content: ${(props) => (props.disabled ? "''" : 'none')};
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  /* background-color: ${(props) =>
    props.disabled ? 'rgba(165, 165, 165, 0.5)' : 'none'} */
  //   border-radius: 16px;
  // }
`;

const CustomerDetail = ({ customer }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  if (!customer) {
    return (
      <NoCustomerAssigned
        disabled={!hasPermission('create:customer')}
        onClick={() =>
          navigate(
            `/supportx/${Project_Route_Name}/create-${Customer_Route_Name}`,
            {
              state: { projectId },
            }
          )
        }
      >
        <div>{`No ${Customer_Entity_Name} assigned`}</div>
        <div width="100px" variant="default">
          {`Add ${Customer_Entity_Name}`}
        </div>
      </NoCustomerAssigned>
    );
  }

  const customerDetails = {
    Phone: customer.phone,
    Email: customer.email,
    Status: customer.status,
    Country: customer.country,
    State: customer.state,
    City: customer.state,
    Address: customer.address,
  };

  const HandleCustomerEdit = () => {
    navigate(
      `/supportx/${Project_Route_Name}/edit-${Customer_Route_Name}/${customer.id}`,
      {
        state: { projectId },
      }
    );
  };

  return (
    <>
      <FormHeader
        title={`${Customer_Entity_Name} Detail`}
        withBackButton={false}
        showDate={false}
        id={customer.id}
      />
      <Row style={{ justifyContent: 'center', marginBottom: '22px' }}>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <CustomAvatar
            name={customer.name || 'Montex'}
            image_url={customer.image_base64}
            size={120}
            showTooltip={false}
          />
          <CustomerName>{customer.name}</CustomerName>
          <CreatedDate>
            <span style={{ color: '#919191' }}>Created:</span>
            {customer.created_at}
          </CreatedDate>
        </Col>
      </Row>
      <DetailRow
        details={customerDetails}
        rowStyles={{ margin: '10px 45px' }}
      />
      <Row style={{ justifyContent: 'center', marginTop: '20px' }}>
        <CustomButton
          width="100px"
          variant="default"
          onClick={HandleCustomerEdit}
        >
          <EditOutlined /> Edit
        </CustomButton>
      </Row>
    </>
  );
};

export default CustomerDetail;
