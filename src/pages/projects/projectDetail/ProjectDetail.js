import { Avatar, Card, Col, Row, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import ProjectDetailGraph from './ProjectDetailGraph';
import BackIcon from '../../../assets/BackIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjectDetails,
  fetchProjects,
} from '../../../reduxToolkit/features/ProjectSlice';
import {
  capitalizeInitials,
  renderIdTag,
  renderPriorityTag,
  renderStatusTag,
  userNameBgColor,
} from '../../../utils/Utils';
import './ProjectDetail.css';
import { CardTitle } from '../../../components/ui/typography';
import dayjs from 'dayjs';
import { Project_Route_Name } from '../../../utils/TitleRoutesConstants';

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, projectDetails } = useSelector((state) => state.project);

  const currentProject = projects.find(
    (project) => project.id === parseInt(id)
  );

  // const handleCardClick = (ticket) => {
  //   console.log("Ticket clicked:", ticket);
  //   navigate(`/tickets/ticket-detail/${ticket.id}`);
  // };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchProjectDetails(id));
  }, [dispatch, id]);

  const totalTickets = projectDetails ? projectDetails.length : 0;
  const resolvedTickets =
    projectDetails?.filter((ticket) => ticket.status === 'Resolved').length ||
    0;
  const pendingTickets =
    projectDetails?.filter((ticket) => ticket.status === 'Open').length || 0;

  const cardData = [
    { title: 'Total Tickets', value: totalTickets },
    { title: 'Resolved Tickets', value: resolvedTickets },
    { title: 'Open Tickets', value: pendingTickets },
  ];

  return (
    <Row className="project-detail">
      <Col span={24}>
        <div className="project-back-button">
          <img
            className="project-back-click"
            onClick={() => navigate(`/supportx/${Project_Route_Name}`)}
            src={BackIcon}
            alt="Back Icon"
          />
          <span
            onClick={() => navigate(`/supportx/${Project_Route_Name}`)}
            className="project-back-click"
          >
            Back
          </span>
        </div>
      </Col>

      <Col span={10}>
        <Card className="project-info">
          <div className="project-info-header">
            <CardTitle>Details</CardTitle>
            <div>
              {currentProject ? renderStatusTag(currentProject.status) : 'N/A'}
            </div>
          </div>
          <div className="project-info-image">
            {currentProject?.image_url ? (
              <img src={currentProject.image_url} alt={currentProject.name} />
            ) : (
              <Avatar
                shape="square"
                size={110}
                style={{
                  backgroundColor: userNameBgColor(currentProject?.name),
                  fontSize: '36px',
                }}
              >
                {currentProject?.name
                  ? currentProject.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'N/A'}
              </Avatar>
            )}
          </div>

          <div className="project-card-detail">
            <div className="project-card-content">
              <div>Name:</div>
              <div>{currentProject?.name}</div>
            </div>
            <div className="project-card-content">
              <div>Start Date:</div>
              <div>
                {currentProject?.created_at
                  ? dayjs(currentProject.created_at).format('DD-MM-YYYY')
                  : 'N/A'}
              </div>
            </div>
            {/* <div className="project-card-content">
              <div>Project Type:</div>
              <div>{currentProject?.project_type}</div>
            </div> */}
          </div>
          <div className="project-card-detail">
            {/* <div className="project-card-content">
              <div>Start Date:</div>
              <div>
                {currentProject?.created_at
                  ? dayjs(currentProject.created_at).format("DD-MM-YYYY")
                  : "N/A"}
              </div>
            </div> */}
            <div className="project-card-content">
              <div>Closed date:</div>
              <div>
                {currentProject?.due_date
                  ? dayjs(currentProject.due_date).format('DD-MM-YYYY')
                  : 'N/A'}
              </div>
            </div>
          </div>
          <div className="project-card-detail">
            {/* <div className="project-card-content">
              <div>Created By:</div>
              <div>{currentProject?.assigned_by}</div>
            </div> */}
            {/* <div className="project-card-content">
              <div>Collaborators:</div>
              <div>
                {currentProject?.[0]?.assignees.map((assignee) => (
                  <span key={assignee.id}>{assignee.name}</span>
                ))}
              </div>
            </div> */}
          </div>
        </Card>
      </Col>

      <Col span={10}>
        <Card className="project-graph">
          <ProjectDetailGraph />
        </Card>
      </Col>

      <Col span={4} className="project-card-value-count">
        {cardData.map((card, index) => (
          <Card key={index} className="project-card-count">
            <p>{card.title}</p>
            <span className="project-card-value">{card.value}</span>
          </Card>
        ))}
      </Col>
      <Col span={24}>
        <Card className="project-ticket-summary">
          <CardTitle>Tickets Summary</CardTitle>
          {projectDetails?.length ? (
            <div className="project-ticket-scrollable">
              {projectDetails.map((ticket) => (
                <Card key={ticket.id} className="project-ticket-detail">
                  <div className="project-ticket-info">
                    <h4>{ticket.subject}</h4>
                    <div className="project-id-status">
                      {renderStatusTag(ticket.status)}
                      {renderIdTag(ticket.id)}
                    </div>
                  </div>
                  <div className="project-ticket-descrip">
                    {ticket.description}
                  </div>
                  <div className="project-ticket-footer">
                    <div className="project-priority-tag">
                      <div>{renderPriorityTag(ticket.priority)}</div>
                      <div>{ticket.category}</div>
                    </div>

                    <div className="project-ticket-collab">
                      {ticket.assignees.map((assignee, index) => {
                        const { name, image_url } = assignee;
                        const avatarStyle = image_url
                          ? { border: '2px solid #379B47' }
                          : {};
                        const capitalizedText = capitalizeInitials(name);
                        const initials = capitalizedText
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase();
                        const bgColor = userNameBgColor(name);

                        return (
                          <Tooltip key={index} title={name}>
                            <div className="initials-avatar">
                              {image_url ? (
                                <Avatar
                                  src={image_url}
                                  alt={name}
                                  style={{ ...avatarStyle, marginRight: '5px' }}
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    backgroundColor: bgColor,
                                    ...avatarStyle,
                                  }}
                                  alt={name}
                                >
                                  {initials}
                                </Avatar>
                              )}
                            </div>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p>No tickets found</p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
