import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Dropdown, Menu, message } from 'antd';
import {
  approveResolutionAction,
  escalateTicket,
  fetchComments,
  fetchTickets,
  updateTicketStatus,
} from '../../../reduxToolkit/features/TicketSlice';
import {
  // selectColorMap,
  modalFields,
  selectMarksOptions,
} from '../../../utils/TicketUtils';
import SLAsSection from './sections/SLAsSection';
import DateSection from './sections/DateSection';
import CustomSpin from '../../../styledComponents/CustomSpin';
import PeopleSection from './sections/PeopleSection';
import CustomModal from '../../../styledComponents/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../../styledComponents/CustomButton';
import TicketDetailsHeader from './sections/TicketDetailsHeader';
import TicketDetailsContent from './sections/TicketDetailsContent';
import { DownOutlined } from '@ant-design/icons';
import // KeyToStatusMap,
// ON_HOLD_KEY,
// Opens_Key,
'../../../constants/FieldOptionConstants';
import NavigationTabs from './navigationTabs';
import ResolutionModal, {
  COMMENT_MODE,
  RESOLUTION_MODE,
} from '../modals/resolutionModal';
import {
  Pending_Approval_Key,
  RESOLVED_KEY,
} from '../../../constants/FieldOptionConstants';
import { DarkColor } from '../../../styledComponents/CustomColors';
import { hasPermission } from '../../../constants/UsersRole';

const TicketDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [selectedColor, setSelectedColor] = useState("black");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resolutionModalOpen, setResolutionModalOpen] = useState(null);

  const [isEscalating, setIsEscalating] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [escalateLoading, setCommentLoading] = useState(false);

  const [form] = Form.useForm();

  const ticket = useSelector((state) => {
    const ticketById = state.ticket.tickets.find(
      (ticket) => ticket.id === parseInt(id)
    );
    return (
      ticketById ||
      state.ticket.approvals.find((ticket) => ticket.id === parseInt(id))
    );
  });

  const [activeTabKey, setActiveTabKey] = useState('attachments');

  useEffect(() => {
    const storedActiveKey = localStorage.getItem('activeTabKey');
    if (storedActiveKey) {
      setActiveTabKey(storedActiveKey);
    }
  }, []);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem('activeTabKey', key);
  };

  // useEffect(() => {
  //   if (!ticket) {
  //     dispatch(fetchTickets());
  //   } else {
  //     dispatch(fetchComments(ticket.id));
  //   }
  // }, [id, ticket, dispatch]);

  useEffect(() => {
    if (!ticket) {
      dispatch(fetchTickets()).then(() => {
        if (ticket) {
          dispatch(fetchComments(ticket.id));
        }
      });
    } else {
      dispatch(fetchComments(ticket.id));
    }
  }, [id, ticket, dispatch]);

  if (!ticket) {
    return (
      <div
        style={{
          marginTop: '10vh',
        }}
      >
        <CustomSpin size="large" />
      </div>
    );
  }

  // const handleSelectChange = (value) => {
  //   setSelectedColor(selectColorMap[value] || "black");
  // };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const escalationData = {
        ...values,
        ticket_id: ticket.id,
      };
      setIsEscalating(true);
      dispatch(escalateTicket({ escalationData }))
        .unwrap()
        .then((response) => {
          console.log('Escalation submitted successfully:', response);
          message.success('Ticket is escalated');
          setIsModalVisible(false);
          setIsEscalating(false);

          form.resetFields();
        })
        .catch((error) => {
          console.error('Error submitting escalation:', error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const isOverdue = ticket.status === 'Overdue';

  return (
    <>
      <Row className="ticket-row-detail">
        <Col
          xs={24}
          sm={24}
          md={23}
          lg={16}
          xl={16}
          className="left-row-detail"
        >
          <TicketDetailsHeader ticket={ticket} navigate={navigate} />
          <TicketDetailsContent ticket={ticket} loading={loading} />
          <NavigationTabs hasResolution={ticket?.has_resolution} />
        </Col>
        <Col xs={24} sm={24} md={23} lg={7} xl={7} className="right-row-detail">
          <div className="details">
            <PeopleSection
              assignedBy={ticket.assigned_by}
              assignees={ticket.assignees}
            />
            <SLAsSection
              userType={ticket.user_type || ''}
              timeCovered={ticket.sla_time}
              timeRemaining={ticket.remaining_time}
              requestType={ticket.request_type}
              category={ticket.category}
            />
            <DateSection
              creationDate={ticket.start_date_date}
              closedDate={ticket.close_date_date}
            />
          </div>
          <ResolutionButton
            ticket={ticket}
            setLoading={setLoading}
            setResolutionModalOpen={setResolutionModalOpen}
          />
          <CustomButton
            variant="danger"
            height="35px"
            marginTop="0"
            width="100%"
            onClick={() => setIsModalVisible(true)}
            disabled={
              !hasPermission('escalate:ticket') ||
              !isOverdue ||
              ticket.is_escalated
            }
          >
            {ticket.is_escalated ? 'Escalated' : 'Escalate Ticket'}
          </CustomButton>
        </Col>
      </Row>
      <CustomModal
        variant="danger"
        isVisible={isModalVisible}
        onClose={handleCancel}
        onOk={handleOk}
        form={form}
        modalFields={modalFields}
        title={ticket.subject}
        okButtonText="Escalate"
        buttonLoading={isEscalating}
      />
      <ResolutionModal
        open={resolutionModalOpen === RESOLUTION_MODE}
        close={() => setResolutionModalOpen(null)}
      />
      <ResolutionModal
        open={resolutionModalOpen === COMMENT_MODE}
        close={() => setResolutionModalOpen(null)}
        mode={COMMENT_MODE}
      />
    </>
  );
};

export default TicketDetail;

const ResolutionButton = ({ setResolutionModalOpen, setLoading, ticket }) => {
  const dispatch = useDispatch();

  const approveResolution = () => {
    dispatch(
      approveResolutionAction({
        id: ticket.id,
        status: 'Resolved',
      })
    )
      .unwrap()
      .then(() => {
        message.success('Ticket status updated to Resolved');
        dispatch(fetchTickets(ticket.id));
      })
      .catch((error) => {
        console.error('Error updating ticket status:', error);
      });
  };

  const isAdmin = hasPermission('resolve:approvals');

  const disableResolveButton = isAdmin
    ? !ticket?.has_resolution ||
      (ticket.has_resolution && ticket?.status !== Pending_Approval_Key)
    : (ticket.has_resolution && ticket?.status === RESOLVED_KEY) ||
      (ticket.has_resolution && ticket?.status === Pending_Approval_Key);

  const resolveButtonText = isAdmin
    ? ticket?.status === RESOLVED_KEY
      ? 'Approved'
      : 'Approve Resolution'
    : ticket?.has_resolution && ticket?.status === RESOLVED_KEY
      ? 'Approved'
      : ticket.has_resolution && ticket?.status === Pending_Approval_Key
        ? 'Pending Approval'
        : 'Mark as Resolve';

  // Filter out the option that matches the ticket's current status
  const filteredSelectMarksOptions = selectMarksOptions?.filter((option) => {
    if (ticket.status === RESOLVED_KEY && option.label === 'Mark as Resolved') {
      return false; // Hide 'Mark as Resolved' if ticket is already resolved
    }
    return option.value !== ticket.status; // Exclude the current ticket status
  });

  return (
    <Dropdown
      overlay={
        <Menu
          style={{
            width: '100%',
            maxWidth: 'none',
          }}
        >
          {filteredSelectMarksOptions?.map((option) => (
            <Menu.Item
              key={option.value}
              style={{
                color: option.color,
                textAlign: 'center',
              }}
              onClick={async () => {
                // Check if the admin is selecting "Mark as Resolved"
                if (isAdmin && option.label === 'Mark as Resolved') {
                  // Admin can directly approve resolution without approval step
                  if (ticket.status !== RESOLVED_KEY) {
                    approveResolution(); // Approve resolution directly
                  }
                  return;
                }

                if (
                  option.label === 'Mark as Open' &&
                  ticket.status === Pending_Approval_Key
                ) {
                  setResolutionModalOpen(COMMENT_MODE);
                  return;
                }

                try {
                  setLoading(true);
                  await dispatch(
                    updateTicketStatus({
                      id: ticket.id,
                      status: option.value,
                    })
                  ).unwrap();
                  message.success('Ticket status has been updated');
                } catch (error) {
                  console.error('Failed to update the ticket status: ', error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {option.icon} {option.label}
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}
    >
      <span
        style={{
          cursor: 'pointer',
          height: '35px',
          borderRadius: '6px',
          border: '1px solid #229849',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <CustomButton
          variant={ticket?.status === RESOLVED_KEY ? '' : 'default'}
          color={DarkColor}
          height="35px"
          style={{
            borderRadius: '0',
            borderLeft: 'none',
            flex: '1',
          }}
          onClick={async (e) => {
            e.stopPropagation();
            if (isAdmin) {
              // Admin can approve resolution directly
              if (ticket.status !== RESOLVED_KEY) {
                approveResolution();
              }
            } else {
              setResolutionModalOpen(RESOLUTION_MODE);
            }
          }}
          disabled={disableResolveButton}
        >
          {resolveButtonText}
        </CustomButton>
        <DownOutlined
          color={DarkColor}
          style={{
            width: '10%',
            textAlign: 'center',
            border: `1px solid ${DarkColor}`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </span>
    </Dropdown>
  );
};
