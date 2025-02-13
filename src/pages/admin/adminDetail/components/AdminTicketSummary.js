import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../../../reduxToolkit/features/UserSlice';
import {
  renderIdTag,
  renderPriorityTag,
  renderStatusTag,
} from '../../../../utils/Utils';
import TicketsSummary from '../../../../components/tableDataDetail/TicketsSummary';

const AdminTicketSummary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch, id]);

  const handleCardClick = (ticketId) => {
    navigate(`/supportx/tickets/ticket-detail/${ticketId}`);
  };

  return (
    <TicketsSummary
      title="Tickets Summary"
      tickets={userDetails || []}
      onCardClick={handleCardClick}
      renderStatusTag={renderStatusTag}
      renderIdTag={renderIdTag}
      renderPriorityTag={renderPriorityTag}
    />
  );
};

export default AdminTicketSummary;
