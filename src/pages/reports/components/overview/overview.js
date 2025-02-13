import { Card, Col, Row } from 'antd';
import SectionHeader from '../sectionHeader';
import OnHoldRegionGraph from './onHoldTicketsGraph';
import TicketsByRegionGraph from './ticketsByRegionGraph';
import SlaGraph from './slaGraph';
import AverageTicketGraph from './AverageTicketGraph';
import ResolvedTicketsIcon from '../../../../assets/WithInSLAs.svg';
import TotalTicketIcon from '../../../../assets/SLAsBreachedIcon.svg';
import CustomCard from '../../../../styledComponents/CustomCard';
import TotalTicketsGraph from './totalTicketsGraph';

const GraphWrapper = ({ children, responsive, cardStyle = {} }) => (
  <Col {...responsive}>
    <Card style={cardStyle}>{children}</Card>
  </Col>
);
const styles = {
  card: {
    padding: '0 !important',
    gap: '14px',
    boxShadow: false,
    height: '100%',
  },
  iconWrapper: {
    margin: '8px 10px 8px 4px',
    icon: {
      height: '75px',
    },
  },
  content: {
    gap: '12px',
    flexGrow: '2',
  },
  title: {
    fontSize: '16.5px',
    fontWeight: '400',
  },
  count: {
    fontSize: '20px',
    lineHeight: '26px',
  },
};

const Overview = ({ data }) => {
  const cardData = [
    {
      title: 'SLAs by Percentage',
      count: data?.sla_percentage || 0,
      icon: ResolvedTicketsIcon,
      path: '/supportx/tickets',
    },
    {
      title: 'SLAs Breached by Percentage',
      count: data?.sla_breached_percentage || 0,
      icon: TotalTicketIcon,
      path: '/supportx/contracts',
    },
  ];
  return (
    <div>
      <SectionHeader title="Overview" />
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <Row style={{ height: '370px', gap: '15px' }}>
            {cardData.map((data, index) => (
              <CustomCard key={index} {...data} styles={styles} />
            ))}
          </Row>
        </GraphWrapper>
        <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <TotalTicketsGraph data={data?.total_tickets_chart} />
        </GraphWrapper>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <TicketsByRegionGraph />
        </GraphWrapper>
        <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <SlaGraph data={data?.sla_chart || []} />
        </GraphWrapper>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {/* <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <AverageTicketGraph />
        </GraphWrapper> */}
        <GraphWrapper
          responsive={{ xxl: 12, xl: 12, lg: 12, md: 24, sm: 24, xs: 24 }}
        >
          <OnHoldRegionGraph data={data?.on_hold_ticket_chart} />
        </GraphWrapper>
      </Row>
    </div>
  );
};

export default Overview;
