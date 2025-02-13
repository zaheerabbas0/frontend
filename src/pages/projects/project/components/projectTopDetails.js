import { useEffect, useState } from 'react';
import ResolvedTicketsIcon from '../../../../assets/ResolvedTicketsIcon.svg';
import UnresolvedTicketsIcon from '../../../../assets/UnresolvedTicketsIcon.svg';
import OnholdTicketsIcon from '../../../../assets/OnholdTicketsIcon.svg';
import SLAsBreachedIcon from '../../../../assets/SLAsBreachedIcon.svg';
import TopDetailCards from '../../../../components/ui/topDetailCards';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import { useParams } from 'react-router-dom';
import {
  ON_HOLD_KEY,
  Open_Key,
  RESOLVED_KEY,
  SlaStatusOptions,
} from '../../../../constants/FieldOptionConstants';

const ProjectTopDetails = () => {
  const { projectId } = useParams();

  const [projectTicketStats, setProjectTicketStats] = useState({
    resolvedTicketsCount: 0,
    unresolvedTicketsCount: 0,
    onholdTicketsCount: 0,
    SLAsBreachedCount: 0,
  });

  useEffect(() => {
    const fetchProjectTicketStats = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/v1/dashboard/project-ticket-stats/${projectId}`
        );
        const data = response.data;
        setProjectTicketStats({
          resolvedTicketsCount: data.resolved,
          unresolvedTicketsCount: data.unresolved,
          onholdTicketsCount: data.on_hold,
          SLAsBreachedCount: data.breached,
        });
      } catch (error) {
        // console.error("Error fetching ticket stats:", error);
      }
    };

    fetchProjectTicketStats();
  }, [projectId]);

  const cardData = [
    {
      title: 'Resolved Tickets',
      count: projectTicketStats.resolvedTicketsCount,
      icon: ResolvedTicketsIcon,
      path: '?tab=list',
      pathState: { status: RESOLVED_KEY },
    },
    {
      title: 'Open Tickets',
      count: projectTicketStats.unresolvedTicketsCount,
      icon: UnresolvedTicketsIcon,
      path: '?tab=list',
      pathState: { status: Open_Key },
    },
    {
      title: 'On Hold Tickets',
      count: projectTicketStats.onholdTicketsCount,
      icon: OnholdTicketsIcon,
      path: '?tab=list',
      pathState: { status: ON_HOLD_KEY },
    },
    {
      title: 'SLA Breached',
      count: projectTicketStats.SLAsBreachedCount,
      icon: SLAsBreachedIcon,
      path: '?tab=list',
      pathState: { sla_status: SlaStatusOptions[0] },
    },
  ];

  return <TopDetailCards cardData={cardData} />;
};

export default ProjectTopDetails;
