import React, { useState } from 'react';
import HorizontalNav from '../../components/ui/nav/horizontalNav';
import BoardIcon from '../../assets/BoardIcon.svg';
import ListIcon from '../../assets/ListIcon.svg';
import PendingApprovalIcon from '../../assets/icons/PendingApproval.svg';
import TicketsBoard from './ticketsBoard/TicketsBoard';
import TicketsList from './ticketsList/TicketsList';
import { Row } from 'antd';
import ApprovalList from './approvals';
import { hasPermission } from '../../constants/UsersRole';

const TicketPage = () => {
  const [activeTicketTabKey, setActiveTicketTabKey] = useState(
    localStorage.getItem('activeTicketTabKey') || 'TicketsList'
  );

  const tabData = [
    {
      key: 'board',
      icon: BoardIcon,
      text: 'Board',
      altText: 'Board',
      iconStyle: { height: '20px', width: '30px' },
      content: <TicketsBoard />,
    },
    {
      key: 'list',
      icon: ListIcon,
      text: 'List',
      altText: 'List',
      iconStyle: { height: '17px', width: '30px' },
      content: <TicketsList />,
    },
    {
      key: 'approvals',
      icon: PendingApprovalIcon,
      text: 'Pending Approvals',
      altText: 'Approvals',
      iconStyle: { height: '20px', width: '30px' },
      isAuthorized: hasPermission('resolve:approvals'),
      content: <ApprovalList />,
    },
  ];

  const handleTabChange = (key) => {
    setActiveTicketTabKey(key);
    localStorage.setItem('activeTicketTabKey', key);
  };

  return (
    <Row style={{ padding: '1vw 1vw 0.5vw 1vw ' }}>
      <HorizontalNav
        tabData={tabData}
        defaultActiveKey="list"
        onChange={handleTabChange}
      />
    </Row>
  );
};

export default TicketPage;
