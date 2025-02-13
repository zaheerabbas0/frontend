import React, { useState } from 'react';
import HorizontalNav from '../../../components/ui/nav/horizontalNav';
import UsersListData from '../../user/usersList/UsersListData';
import AdminIcon from '../../../assets/membersPage/AdminIcon.svg';
import UserIcon from '../../../assets/membersPage/UserIcon.svg';
import AdminsListData from '../../admin/adminList/AdminsListData';
import { User_Entity_Name } from '../../../constants/user/TitleRoutesConstants';

const MemberNavigation = () => {
  const [activeKey, setActiveKey] = useState(
    localStorage.getItem('activeTab') || 'admins'
  );

  const handleTabChange = (key) => {
    localStorage.setItem('activeTab', key);
    setActiveKey(key);
  };

  const tabData = [
    {
      key: 'admins',
      icon: AdminIcon,
      text: 'Admins',
      altText: '',
      iconStyle: { height: '18px', width: '24px' },
      content: <AdminsListData />,
    },
    {
      key: 'users',
      icon: UserIcon,
      text: `${User_Entity_Name}`,
      altText: '',
      iconStyle: { height: '18px', width: '24px' },
      content: <UsersListData />,
    },
  ];

  return (
    <>
      <HorizontalNav
        tabData={tabData}
        activeKey={activeKey}
        onChange={handleTabChange}
      />
    </>
  );
};

export default MemberNavigation;
