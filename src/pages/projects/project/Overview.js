import { Card, Col, Row } from 'antd';
import { Container } from '../../../styledComponents/CustomCard';
import ProjectTopDetails from './components/projectTopDetails';
import ProjectTicketStatsChart from './components/projectTicketStatsChart';
import CollaboratorsList from './components/projectCollaborators';
import Description from './Description';
import ProjectRecentActivities from './components/ProjectRecentActivities';
import { useNavigate } from 'react-router-dom';
// import { EDIT_PROJECT_BASE_PATH } from './components/pageHeader';
import { EDIT_PROJECT_BASE_PATH } from './mainPage/main-page';
import StyledCard from '../../../styledComponents/StyledCard';

const ProjectOverview = ({ project }) => {
  const navigate = useNavigate();
  const responsive = { xxl: 8, xl: 8, lg: 8, md: 24, sm: 24, xs: 24 };

  const navigatToEdit = () => {
    navigate(`${EDIT_PROJECT_BASE_PATH}/${project?.id}`);
  };

  return (
    <Container style={{ padding: 0 }}>
      <ProjectTopDetails />
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col {...responsive}>
          <StyledCard>
            <ProjectTicketStatsChart />
          </StyledCard>
        </Col>
        <Col {...responsive}>
          <StyledCard>
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '380px',
                height: '380px',
                paddingRight: '5px',
              }}
            >
              <Description description={project?.description} />
            </div>
          </StyledCard>
        </Col>
        <Col {...responsive}>
          <StyledCard>
            <CollaboratorsList
              collabrators={project?.users}
              navigatToEdit={navigatToEdit}
            />
          </StyledCard>
        </Col>
      </Row>
      <ProjectRecentActivities />
    </Container>
  );
};

export default ProjectOverview;
