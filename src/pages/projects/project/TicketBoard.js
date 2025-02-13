import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from '../../../components/boards/Board';
import { ticketStatusColorMap } from '../../../utils/TicketUtils';
import { useNavigate, useParams } from 'react-router-dom';
import {
  capitalizeInitials,
  renderPriorityTag,
  userNameBgColor,
} from '../../../utils/Utils';
import { Avatar, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { CommentOutlined } from '@ant-design/icons';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
// import {
//   fetchTickets,
//   fetchComments,
// } from "../../../reduxToolkit/features/TicketSlice";
import { useProjectTicket } from '../../../context/projectTicketContext';

const ProjectTicketBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useParams();

  // const ticketData = useSelector((state) =>
  //   state.ticket.tickets.filter(
  //     (ticket) => ticket.project.id === parseInt(projectId)
  //   )
  // );
  const {
    tickets: ticketData,
    fetchTickets,
    loading,
    isDataStale,
  } = useProjectTicket();
  // const commentsData = useSelector((state) => state.ticket.comments);
  // const status = useSelector((state) => state.ticket.status);

  useEffect(() => {
    if (!isDataStale) {
      fetchTickets(projectId);
    }
  }, [fetchTickets, projectId, isDataStale]);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchTickets());

  const getInitials = (name) => {
    if (!name) return '';
    const formattedName = capitalizeInitials(name);
    return formattedName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };
  const renderAssignees = (assignees) => (
    // <div className="ticket-assignees">
    <Avatar.Group>
      {assignees.map((c) => (
        <CustomAvatar
          key={c.id}
          name={c.name}
          image_url={c.image_url}
          size="medium"
        />
      ))}
    </Avatar.Group>
    // </div>s
  );

  const renderTicketDetail = (detail) => (
    <>
      <div>{renderPriorityTag(detail.priority)}</div>
      <div className="ticket-subject">{detail.subject}</div>
      <p className="ticket-description">{detail.description}</p>
      <p className="ticket-date">{formatDueDate(detail.due_date)}</p>
      <div className="board-assignee-comment">
        <div>{renderAssignees(detail.assignees)}</div>
        <div>
          <CommentOutlined />{' '}
          {/* {commentsData[detail.id] ? commentsData[detail.id].length : 0}{" "} */}
          {detail.comment_count} comments
        </div>
      </div>
    </>
  );

  const handleDetailClick = (detail) => {
    navigate(`/supportx/tickets/ticket-detail/${detail.id}`);
  };

  const formatDueDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  return (
    <Board
      data={ticketData}
      statusKey="status"
      titleKey="status"
      onDetailClick={handleDetailClick}
      navigatePath="/supportx/tickets/create-ticket"
      renderDetail={renderTicketDetail}
      cardStyles={{
        badgeBackgroundColor: (status) => ticketStatusColorMap[status],
        headBackgroundColor: (status) => ticketStatusColorMap[status],
      }}
    />
  );
};

export default ProjectTicketBoard;
