import React, { useEffect, useState } from 'react';
import ProjectOverview from '../Overview';
import ProjectTicketBoard from '../TicketBoard';
import Customer from '../Customer';
import EventCalendar from '../../../calender/EventCalender';
import ProjectTicketList from '../TicketList';
import Files from '../Files';
import OverviewIcon from '../../../../assets/OverviewIcon.svg';
import ListIcon from '../../../../assets/ListIcon.svg';
import BoardIcon from '../../../../assets/BoardIcon.svg';
import ContractIcon from '../../../../assets/ContractsIcon.svg';
import CalendarIcon from '../../../../assets/CalendarIcon.svg';
import FilesIcon from '../../../../assets/FilesIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectTicket } from '../../../../context/projectTicketContext';
import HorizontalNav from '../../../../components/ui/nav/horizontalNav';
import { Customer_Entity_Name } from '../../../../constants/customer/TitleRoutesConstants';

const NavigationTabs = ({ project, activeTab }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { invalidateData, isDataStale } = useProjectTicket();
  useEffect(() => {
    return () => {
      invalidateData();
    };
  }, [invalidateData, projectId]);

  const handleTabChange = (newTab) => {
    navigate(`?tab=${newTab}`);
  };

  const tabData = [
    {
      key: 'overview',
      icon: OverviewIcon,
      text: 'Overview',
      altText: 'Overview',
      iconStyle: { height: '20px', width: '30px' },
      content: <ProjectOverview project={project} />,
    },
    {
      key: 'list',
      icon: ListIcon,
      text: 'List',
      altText: 'List',
      iconStyle: { height: '17px', width: '30px' },
      content: <ProjectTicketList />,
    },
    {
      key: 'board',
      icon: BoardIcon,
      text: 'Board',
      altText: 'Board',
      iconStyle: { height: '20px', width: '30px' },
      content: <ProjectTicketBoard />,
    },
    {
      // text: `${Customer_Entity_Name}`,
      text: `Contract`,
      key: 'customer',
      icon: ContractIcon,
      altText: '',
      iconStyle: { height: '17px', width: '30px' },
      content: <Customer project={project} />,
    },
    {
      key: 'calendar',
      icon: CalendarIcon,
      text: 'Calendar',
      altText: 'Calendar',
      iconStyle: { height: '19px', width: '30px' },
      content: <EventCalendar />,
    },
    {
      key: 'files',
      icon: FilesIcon,
      text: 'Files',
      altText: 'Files',
      iconStyle: { height: '25px', width: '32px' },
      content: <Files />,
    },
  ];

  return (
    <HorizontalNav
      destroyInactiveTabPane
      tabData={tabData}
      activeKey={activeTab}
      onChange={handleTabChange}
      key={`${projectId}`}
    />
  );
};

export default NavigationTabs;
