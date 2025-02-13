import React, { useEffect, useState } from 'react';
import TopDetailCards from '../../../components/ui/topDetailCards';
import TicketIcon from '../../../assets/TotalTicketIcon.svg';
import TotalSLAsIcon from '../../../assets/TotalSLAsIcon.svg';
import WithInSLAsIcon from '../../../assets/WithInSLAs.svg';
import SLAsBreachedIcon from '../../../assets/SLAsBreachedIcon.svg';
import EscalatedticketIcon from '../../../assets/EscalatedticketIcon.svg';
import onHold from '../../../assets/onHold.svg';
import AxiosInstance from '../../../appURL/AxiosInstance';
import {
  Escalated_Key,
  Open_Key,
  RESOLVED_KEY,
  SlaStatusOptions,
  ON_HOLD_KEY,
} from '../../../constants/FieldOptionConstants';

const DashBoardTopDetails = () => {
  const [ticketStats, setTicketStats] = useState({
    totalTicketsCount: 0,
    totalSLAsCount: 0,
    resolvedWithinSLAsCount: 0,
    SLAsBreachedCount: 0,
    Escalatedtickets: 0,
    onHold: 0,
  });

  const userData = JSON.parse(localStorage.getItem('user_info'));
  const userId = userData?.id;

  useEffect(() => {
    const fetchTicketStats = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/v1/dashboard/tickets-stats/${userId}`
        );
        const data = response.data;
        console.log('dfssd', data);

        setTicketStats({
          totalTicketsCount: data?.total_tickets,
          totalSLAsCount: data?.open,
          resolvedWithinSLAsCount: data?.resolved,
          SLAsBreachedCount: data?.breached,
          Escalatedtickets: data?.escalated,
          onHold: data?.on_hold,
        });
      } catch (error) {
        // console.error("Error fetching ticket stats:", error);
      }
    };

    fetchTicketStats();
  }, [userId]);

  const cardData = [
    {
      title: 'Total Tickets',
      count: ticketStats.totalTicketsCount,
      icon: TicketIcon,
      path: '/supportx/tickets',
      colSpan: 8,
    },
    {
      title: 'Open Tickets',
      count: ticketStats.totalSLAsCount,
      icon: TotalSLAsIcon,
      path: '/supportx/tickets',
      colSpan: 8,
      pathState: { status: Open_Key },
    },
    {
      // title: "Resolved within SLAs",
      title: 'Resolved within SLAs',
      count: ticketStats.resolvedWithinSLAsCount,
      icon: WithInSLAsIcon,
      path: '/supportx/tickets',
      colSpan: 8,
      pathState: { sla_status: SlaStatusOptions[1], status: RESOLVED_KEY },
    },
    {
      // title: "Resolved with SLAs Breached",
      title: 'SLAs Breached',
      count: ticketStats.SLAsBreachedCount,
      icon: SLAsBreachedIcon,
      path: '/supportx/tickets',
      colSpan: 8,
      pathState: { sla_status: SlaStatusOptions[0] },
    },
    {
      title: 'Escalated Tickets',
      count: ticketStats.Escalatedtickets,
      icon: EscalatedticketIcon,
      colSpan: 8,
      path: '/supportx/tickets',
      pathState: { status: Escalated_Key },
    },
    {
      title: 'On Hold Tickets',
      count: ticketStats.onHold,
      icon: onHold,
      colSpan: 8,
      path: '/supportx/tickets',
      pathState: { status: ON_HOLD_KEY },
    },
  ];

  return <TopDetailCards cardData={cardData} />;
};

export default DashBoardTopDetails;
