import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Avatar } from 'antd';
import styled from 'styled-components';
import ResolvedTicketsIcon from '../../../assets/ResolvedTicketsIcon.svg';
import TotalTicketIcon from '../../../assets/TotalTicketIcon.svg';
import InProgressIcon from '../../../assets/InProgressIcon.svg';
import OverdueIcon from '../../../assets/OverdueIcon.svg';
import CustomCard from '../../../styledComponents/CustomCard';
import { userNameBgColor } from '../../../utils/Utils';
import { Project_Module_Name } from '../../../constants/project/TitleRoutesConstants';
import { User_Route_Name } from '../../../constants/user/TitleRoutesConstants';

export const ReportCard = ({ title, count, icon, styles }) => {
  return (
    <Col xs={24} sm={12} md={6} lg={6}>
      <CustomCard title={title} count={count} icon={icon} styles={styles} />
    </Col>
  );
};
const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const Logo = styled.img`
  margin: 22px 0;
  padding: 0 8px;
`;

const MonthDetails = styled.div`
  margin: 22px 0;
  padding: 0 8px;
  font-size: 11px;
  & > div {
    font-size: 12.5px;
    color: #0d062d;
    font-weight: 500;
    line-height: 140%;
  }
`;

const ReportDetails = styled.div`
  margin: 22px 0;
  padding: 0 8px;
`;

const ReportTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 25px;
  & > span {
    font-weight: 400;
  }
`;

const ReportDiscrption = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 177.78%;
`;

const Header = ({ data }) => {
  const ticketData = useSelector((state) => state.ticket.tickets);

  const cardData = [
    {
      title: 'Total Tickets',
      count: data?.total_tickets,
      icon: TotalTicketIcon,
      path: '/supportx/tickets',
    },
    {
      title: 'Resolved Tickets',
      count: data?.resolved_tickets || 0,
      icon: ResolvedTicketsIcon,
      path: '/supportx/contracts',
    },
    {
      title: 'On-Hold Tickets',
      count: data?.On_hold_tickets || 0,
      icon: InProgressIcon,
      path: '/supportx/customers',
    },
    {
      title: 'SLAs Breached',
      count: data?.sla_breached || 0,
      icon: OverdueIcon,
      path: `/supportx/${User_Route_Name}`,
    },
  ];

  const styles = {
    card: {
      padding: '10px 5px',
      gap: '2px',
      boxShadow: false,
    },
    iconWrapper: {
      margin: '8px 10px 8px 4px',
      icon: {
        height: '45px',
      },
    },
    content: {
      gap: '2px',
      flexGrow: '2',
    },
    title: {
      fontSize: '12.5px',
      fontWeight: '400',
    },
    count: {
      fontSize: '18px',
      lineHeight: '26px',
    },
  };

  return (
    <div>
      <ReportHeader>
        {data?.image_url ? (
          <img
            src={data?.image_url}
            alt={data?.name}
            style={{ height: '100px' }}
          />
        ) : (
          <Avatar
            shape="square"
            size={110}
            style={{
              backgroundColor: userNameBgColor(data?.name),
              fontSize: '36px',
            }}
          >
            {data?.name
              ? data.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'N/A'}
          </Avatar>
        )}
        <MonthDetails>
          Report of:
          <div>{data?.current_month}</div>
        </MonthDetails>
      </ReportHeader>
      <ReportDetails>
        <ReportTitle>
          {data?.name} -<span>{`${Project_Module_Name}  Overview Report`}</span>
        </ReportTitle>
        <ReportDiscrption>{data?.description}</ReportDiscrption>
      </ReportDetails>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {cardData.map((data, index) => (
          <ReportCard key={index} {...data} styles={styles} />
        ))}
      </Row>
    </div>
  );
};

export default Header;
