import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Avatar } from 'antd';
// import SearchIcon from '../../assets/SearchIcon.svg';
// import { CustomInput } from '../../styledComponents/CustomInput';
import { capitalizeInitials, userNameBgColor } from '../../utils/Utils';
import NotificationsPanel from './notification/notificationPanel';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { lightTheme } from '../../styledComponents/theme';
import { ThemeContext } from '../../styledComponents/themeContext';
import './NavBar.css';
import { CustomButton } from '../../styledComponents/CustomButton';
import { getUserRole } from '../../constants/UsersRole';

const { Header } = Layout;

const NavBar = ({ isCollapsed }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userInfoID, setUserInfoID] = useState();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      setUserName(userInfo.name);
      setUserAvatar(userInfo.image_url || '');
      setUserInfoID(userInfo.id);
    }
  };

  useEffect(() => {
    getUserInfo();
    const handleStorageChange = () => {
      getUserInfo();
    };

    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, []);

  const renderUserAvatar = () => {
    const avatarStyle = userAvatar ? { border: '2px solid #379B47' } : {};
    if (userAvatar) {
      return <Avatar src={userAvatar} alt={userName} style={avatarStyle} />;
    } else {
      const initials = capitalizeInitials(userName)
        .split(' ')
        .map((word) => word.charAt(0))
        .join('');
      const bgColor = userNameBgColor(userName);
      return (
        <Avatar
          style={{ backgroundColor: bgColor, ...avatarStyle }}
          alt={userName}
        >
          {initials}
        </Avatar>
      );
    }
  };
  const UserRole = getUserRole();

  return (
    <Header
      className="header-container"
      style={{
        width: `calc(100% - ${isCollapsed ? '90px' : '200px'})`,
        marginLeft: `calc(${isCollapsed ? '90px' : '235px'})`,
        zIndex: '999',
      }}
    >
      <div className="header-search">
        {/* <CustomInput
          placeholder="Search for anything..."
          prefix={<img src={SearchIcon} alt="search" />}
        /> */}
      </div>

      <NotificationsPanel user_id={userInfoID} />
      {/* <CustomButton onClick={toggleTheme}>
        {theme === lightTheme ? <MoonOutlined /> : <SunOutlined />}
      </CustomButton> */}
      <div className="icon">
        <div className="user-profile">
          {renderUserAvatar()}
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">
              {UserRole?.charAt(0).toUpperCase() + UserRole.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default NavBar;
