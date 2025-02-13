import React from 'react';
import { Row } from 'antd';
import { Container } from '../../styledComponents/CustomCard';
import TotalUsersGraph from './components/TotalUsersGraph';
import StatusByRegionGraph from './components/StatusByRegionGraph';
import SlaVisibilityByProject from './components/SlaVisibilityByProject';
import DashBoardTopDetails from './components/dashboardtopdetails';
import SlaVisibilityGraph from './components/SlaVisibilityGraph';
import DashboardRecentActivities from './components/DashboardRecentActivities';
import StyledCard from '../../styledComponents/StyledCard';
import { hasPermission } from '../../constants/UsersRole';

const DashBoard = () => {
  return (
    <Container>
      <DashBoardTopDetails />
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <StyledCard
          responsive={{ xxl: 9, xl: 9, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <StatusByRegionGraph />
        </StyledCard>
        <StyledCard
          responsive={{ xxl: 15, xl: 15, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <SlaVisibilityGraph />
        </StyledCard>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <StyledCard
          responsive={{
            xxl: hasPermission('view:users') ? 15 : 24,
            xl: hasPermission('view:users') ? 15 : 24,
            lg: 12,
            md: 24,
            sm: 24,
            xs: 24,
          }}
        >
          <SlaVisibilityByProject />
        </StyledCard>
        {hasPermission('view:users') && (
          <StyledCard
            responsive={{ xxl: 9, xl: 9, lg: 12, md: 24, sm: 24, xs: 24 }}
          >
            <TotalUsersGraph />
          </StyledCard>
        )}
      </Row>
      <StyledCard>
        <DashboardRecentActivities />
      </StyledCard>
    </Container>
  );
};

export default DashBoard;
