import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { fetchUserDetails } from '../../../../reduxToolkit/features/UserSlice';
import {
  renderIdTag,
  renderPriorityTag,
  renderStatusTag,
} from '../../../../utils/Utils';
import TicketsSummary from '../../../../components/tableDataDetail/TicketsSummary';
import { fetchCustomerDetails } from '../../../../reduxToolkit/features/CustomerSlice';

const CustomerTicketSummary = () => {
  const { id: customerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerDetails } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomerDetails(customerId));
  }, [dispatch, customerId]);

  const handleCardClick = (ticketId) => {
    navigate(`/supportx/tickets/ticket-detail/${ticketId}`);
  };

  return (
    <TicketsSummary
      title="Tickets Summary"
      tickets={customerDetails || []}
      onCardClick={handleCardClick}
      renderStatusTag={renderStatusTag}
      renderIdTag={renderIdTag}
      renderPriorityTag={renderPriorityTag}
    />
  );
};

export default CustomerTicketSummary;
