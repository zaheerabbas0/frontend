import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from '../../../components/boards/Board';
import { ticketStatusColorMap } from '../../../utils/TicketUtils';
import { useNavigate } from 'react-router-dom';
import {
  // capitalizeInitials,
  renderPriorityTag,
  statusBgColorMap,
  statusColorMap,
  // userNameBgColor,
} from '../../../utils/Utils';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import { CommentOutlined } from '@ant-design/icons';
import {
  fetchTickets,
  // fetchComments,
} from '../../../reduxToolkit/features/TicketSlice';
import CustomAvatar from '../../../styledComponents/CustomAvatar';
import { OVERDUE_Key } from '../../../constants/FieldOptionConstants';

const TicketsBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ticketData = useSelector((state) => state.ticket.tickets);
  // const commentsData = useSelector((state) => state.ticket.comments);
  const status = useSelector((state) => state.ticket.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [dispatch, status]);

  // useEffect(() => {
  //   ticketData.forEach((ticket) => {
  //     if (!commentsData[ticket.id]) {
  //       dispatch(fetchComments(ticket.id));
  //     }
  //   });
  // }, [dispatch, ticketData, commentsData]);

  // if (status === "loadingTickets") {
  //   return <CustomSpin />;
  // }

  // const getInitials = (name) => {
  //   if (!name) return "";
  //   const formattedName = capitalizeInitials(name);
  //   return formattedName
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase())
  //     .join("");
  // };

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
    navigate(`ticket-detail/${detail.id}`);
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
      navigatePath="create-ticket"
      renderDetail={renderTicketDetail}
      cardStyles={{
        badgeBackgroundColor: (status) =>
          status === OVERDUE_Key
            ? statusBgColorMap[status]
            : statusColorMap[status],
        headBackgroundColor: (status) => ticketStatusColorMap[status],
      }}
    />
  );
};

export default TicketsBoard;
