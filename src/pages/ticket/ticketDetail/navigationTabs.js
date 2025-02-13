import React, { useState } from 'react';
import AttachmentsIcon from '../../../assets/RowAttachments.svg';
import CommentsIcon from '../../../assets/Comments.svg';
import ActivityIcon from '../../../assets/Activity.svg';
import ResolutionIcon from '../../../assets/icons/Resoolutionicon.svg';
import HorizontalNav from '../../../components/ui/nav/horizontalNav';
import TicketComments from './sections/TicketComments';
import TicketActivity from './sections/TicketActivity';
import AttachmentList from './sections/AttachmentList';
import Resolution from './sections/Resolution';
import { hasPermission } from '../../../constants/UsersRole';

const NavigationTabs = ({ hasResolution = false }) => {
  const [activeTabKey, setActiveTabKey] = useState('attachments');
  const handleTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem('activeTabKey', key);
  };

  const tabData = [
    {
      key: 'attachments',
      icon: AttachmentsIcon,
      text: 'Attachments',
      altText: 'Attachments',
      iconStyle: { height: '17px', width: '30px' },
      tabClassName: '',
      tabPaneStyles: {},
      content: <AttachmentList />,
    },
    {
      key: 'comments',
      icon: CommentsIcon,
      text: 'Comments',
      altText: 'Comments',
      iconStyle: { height: '20px', width: '30px' },
      tabClassName: '',
      tabPaneStyles: { height: '100%', overflow: 'none' },
      content: <TicketComments />,
    },
    {
      key: 'activity',
      icon: ActivityIcon,
      text: 'Activity',
      altText: 'Activity',
      iconStyle: { height: '19px', width: '30px' },
      tabClassName: '',
      tabPaneStyles: {},
      content: <TicketActivity />,
    },
    {
      key: 'resolution',
      icon: ResolutionIcon,
      text: 'Resolution',
      altText: 'Resolution',
      iconStyle: { height: '18px', width: '28px' },
      isAuthorized: hasPermission('view:resolutions'),

      // isAuthorized: hasResolution,
      content: <Resolution />,
    },
  ];

  return (
    <HorizontalNav
      tabData={tabData}
      activeKey={activeTabKey}
      onChange={handleTabChange}
      styles={{ flexGrow: 1 }}
    />
  );
};

export default NavigationTabs;
