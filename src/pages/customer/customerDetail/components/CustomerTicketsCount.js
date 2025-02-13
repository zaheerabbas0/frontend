import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TicketsCount from '../../../../components/tableDataDetail/TicketsCount';
import { fetchCustomerDetails } from '../../../../reduxToolkit/features/CustomerSlice';

const CustomerTicketsCount = () => {
  const { id: customerId } = useParams();

  const dispatch = useDispatch();
  const { customerDetails } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomerDetails(customerId));
  }, [dispatch, customerId]);

  const cardConfigurations = [
    {
      title: 'Total Tickets',
      calculateValue: (data) => data.length,
    },
    {
      title: 'Resolved Tickets',
      calculateValue: (data) =>
        data.filter((ticket) => ticket.status === 'Resolved').length,
    },
    {
      title: 'Open Tickets',
      calculateValue: (data) =>
        data.filter((ticket) => ticket.status === 'Pending').length,
    },
  ];

  return (
    <TicketsCount
      data={customerDetails || []}
      cardConfigurations={cardConfigurations}
    />
  );
};

export default CustomerTicketsCount;
