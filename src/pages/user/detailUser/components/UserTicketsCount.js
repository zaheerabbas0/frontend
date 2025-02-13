import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../../../reduxToolkit/features/UserSlice';
import TicketsCount from '../../../../components/tableDataDetail/TicketsCount';

const UserTicketsCount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch, id]);

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
        data.filter((ticket) => ticket.status === 'Open').length,
    },
  ];

  return (
    <TicketsCount
      data={userDetails || []}
      cardConfigurations={cardConfigurations}
    />
  );
};

export default UserTicketsCount;
