import { Col, Row } from 'antd';
import DetailRow from '../../projects/project/components/detailOutlined';
import SectionHeader from './sectionHeader';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import {
  CreatedDate,
  CustomerName,
} from '../../projects/project/components/customerDetail';

const CustomerDetails = ({ customer }) => {
  const customerDetails = {
    Phone: customer?.phone || '+92 3345745968',
    Email: customer?.email || 'abc.net@gmail.com',
    Status: customer?.status || 'In Progress',
    State: customer?.state || 'Islamabad',
    Country: customer?.country || 'Pakistan',
    State2: customer?.state || 'Islamabad',
    Address:
      customer?.address || 'Office 102, 1st Floor, Ufone tower, Islamabad',
  };

  const styles = {
    cell: {
      padding: '15px 20px',
    },
    label: {
      fontSize: '13.5px',
      marginBottom: '10px',
    },
    value: {
      fontSize: '12.5px',
    },
  };
  return (
    <div>
      <SectionHeader title="Customer Details" />
      <div style={{ display: 'flex', padding: '20px 10px' }}>
        <Row style={{ justifyContent: 'center', flexGrow: '2' }}>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <CustomAvatar name="Montex" size={100} showTooltip={false} />
            <CustomerName>{customer?.name || 'MonetX NDRMF'}</CustomerName>
            <CreatedDate>
              <span style={{ color: '#919191' }}>Created:</span>:
              {customer?.created_at || 'Aug 12, 2024'}
            </CreatedDate>
          </Col>
        </Row>
        <div style={{ width: '70%' }}>
          <DetailRow
            styles={styles}
            details={customerDetails}
            rowStyles={{ margin: '10px 0' }}
            minimumPerRow={3}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
