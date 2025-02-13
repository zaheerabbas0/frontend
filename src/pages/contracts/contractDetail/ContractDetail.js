import { Avatar, Card, Col, Row, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import ContractDetailGraph from './ContractDetailGraph';
import BackIcon from '../../../assets/BackIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContractDetails,
  fetchContracts,
} from '../../../reduxToolkit/features/ContractSlice';
import {
  capitalizeInitials,
  renderIdTag,
  renderPriorityTag,
  renderStatusTag,
  userNameBgColor,
} from '../../../utils/Utils';
import './ContractDetail.css';
import dayjs from 'dayjs';

const ContractDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contracts, contractDetails } = useSelector((state) => state.contract);

  useEffect(() => {
    dispatch(fetchContracts());
    dispatch(fetchContractDetails(id));
  }, [dispatch, id]);

  const currentContract = contracts.find(
    (contract) => contract.id === parseInt(id)
  );

  const totalTickets = contractDetails ? contractDetails.length : 0;
  const resolvedTickets =
    contractDetails?.filter((ticket) => ticket.status === 'Resolved').length ||
    0;
  const pendingTickets =
    contractDetails?.filter((ticket) => ticket.status === 'Open').length || 0;

  const cardData = [
    { title: 'Total Tickets', value: totalTickets },
    { title: 'Resolved Tickets', value: resolvedTickets },
    { title: 'Open Tickets', value: pendingTickets },
  ];

  return (
    <Row className="contract-detail">
      <Col span={24}>
        <div className="contract-back-button">
          <img
            className="contract-back-click"
            onClick={() => navigate('/supportx/contracts')}
            src={BackIcon}
            alt="Back Icon"
          />
          <span
            className="contract-back-click"
            onClick={() => navigate('/supportx/contracts')}
          >
            Back
          </span>
        </div>
      </Col>

      <Col span={10}>
        <Card className="contract-info">
          <div className="contract-info-header">
            <h3>Details</h3>
            <div>{currentContract?.status || 'N/A'}</div>
          </div>

          <div className="contract-info-image">
            <Avatar
              shape="square"
              size={110}
              style={{
                backgroundColor: userNameBgColor(currentContract?.name),
                fontSize: '36px',
              }}
            >
              {currentContract.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </Avatar>
          </div>
          <div className="contract-card-detail">
            <div className="contract-card-content">
              <div>Contract Name:</div>
              <div>{currentContract?.name}</div>
            </div>
            <div className="contract-card-content">
              <div>Created at:</div>
              <div>
                {currentContract?.created_at
                  ? dayjs(currentContract.created_at).format('DD-MM-YYYY')
                  : 'N/A'}
              </div>
            </div>
          </div>
          <div className="contract-card-detail">
            <div className="contract-card-content">
              <div>Type:</div>
              <div>{currentContract?.contract_type}</div>
            </div>
            <div className="contract-card-content">
              <div>Collaborators:</div>
              <div>
                {currentContract?.collaborators.map((assignee) => (
                  <span key={assignee.id}>{assignee.name}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Col>

      <Col span={10}>
        <Card className="contract-graph">
          <ContractDetailGraph />
        </Card>
      </Col>
      <Col span={4} className="contract-card-value-count">
        {cardData.map((card, index) => (
          <Card key={index} className="contract-card-count">
            <p>{card.title}</p>
            <span className="contract-card-value">{card.value}</span>
          </Card>
        ))}
      </Col>
      <Col span={24}>
        <Card className="contract-ticket-summary">
          <h3>Tickets Summary</h3>
          {contractDetails?.length ? (
            <div className="contract-ticket-scrollable">
              {contractDetails.map((ticket) => (
                <Card key={ticket.id} className="contract-ticket-detail">
                  <div className="contract-ticket-info">
                    <h4>{ticket.subject}</h4>
                    <div className="contract-id-status">
                      {renderStatusTag(ticket.status)}
                      {renderIdTag(ticket.id)}
                    </div>
                  </div>
                  <div className="contract-ticket-descrip">
                    {ticket.description}
                  </div>
                  <div className="contract-ticket-footer">
                    <div className="contract-priority-tag">
                      <div>{renderPriorityTag(ticket.priority)}</div>
                      <div>{ticket.category}</div>
                    </div>

                    <div className="contract-ticket-collab">
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
                            <div>
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

export default ContractDetail;
