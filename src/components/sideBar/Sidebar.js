import React, { useEffect, useState } from 'react';
import { Layout, Menu, Divider, Modal } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '../../assets/DashboardIcon.svg';
import DashboardIconActive from '../../assets/DashboardIconActive.svg';
import TicketsIcon from '../../assets/TicketsIcon.svg';
import TicketsIconActive from '../../assets/TicketsIconActive.svg';
// import ContractIcon from "../../assets/ContractIcon.svg";
// import ContractIconActive from "../../assets/ContractIconActive.svg";
import UserIcon from '../../assets/UserIcon.svg';
import UserIconActive from '../../assets/UserIconActive.svg';
import ProjectIcon from '../../assets/ProjectIcon.svg';
import PlusOutlined from '../../assets/PlusOutlined.svg';
import ProjectIconActive from '../../assets/ProjectIconActive.svg';
// import ReportIcon from "../../assets/ReportIcon.svg";
// import ReportIconActive from "../../assets/ReportIcon.svg";
import ChatIcon from '../../assets/ChatIcon.svg';
import ChatIconActive from '../../assets/ChatIconActive.svg';
import HelpDesk from '../../assets/HelpDesk.svg';
import HelpDeskActive from '../../assets/HelpDeskActive.svg';
import Incident from '../../assets/Incident.svg';
import IncidentActive from '../../assets/IncidentActive.svg';
import CustomerIcon from '../../assets/membersPage/UserIcon.svg';
import SettingIcon from '../../assets/SettingIcon.svg';
import SettingIconActive from '../../assets/SettingIconActive.svg';
import LogoutIcon from '../../assets/LogoutIcon.svg';
import LogoutIconActive from '../../assets/LogoutIconActive.svg';
import AppLogo from '../../assets/AppLogo.png';
import SideBarCloser from '../../assets/SideBarCloser.svg';
import LogoCollapse from '../../assets/LogoCollapse.png';
// import HelpDeskIcon from "../../assets/HelpDeskIcon.svg";
// import IncidentIcon from "../../assets/IncidentIcon.svg";
// import TrashIcon from "../../assets/TrashIcon.svg";
import { CustomButton } from '../../styledComponents/CustomButton';
import { StyledMenu } from '../../styledComponents/CustomMenuItems';
// import { PlusOutlined } from "@ant-design/icons";
// import { ProjectList } from "./projectsList";
import AxiosInstance from '../../appURL/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../reduxToolkit/features/ProjectSlice';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import './Sidebar.css';
import LoadingSkeleton from '../skeleton/skeleton';
import {
  User_Module_Name,
  User_Route_Name,
} from '../../constants/user/TitleRoutesConstants';
import {
  Customer_Module_Name,
  Customer_Route_Name,
} from '../../constants/customer/TitleRoutesConstants';
import {
  Project_Module_Name,
  Project_Entity_Name,
  Project_Route_Name,
} from '../../constants/project/TitleRoutesConstants';
import { hasPermission } from '../../constants/UsersRole';

const { Sider } = Layout;

const SideBar = ({ isCollapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    try {
      await AxiosInstance.post('/api/v1/auth/logout');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const projects = useSelector((state) => state.project.projects);
  const projectStatus = useSelector((state) => state.project.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectStatus === 'idle') {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  const dynamicProjectsMenu = projects.map((project) => ({
    // key: project.id,
    key: project.id.toString(),
    label: project.name,
    path: `/supportx/${Project_Route_Name}/${project.id}`,
    icon: (
      <CustomAvatar
        showTooltip={false}
        name={project?.name}
        image_url={project?.image_url}
        size="small"
        fontSize="13px"
      />
    ),
  }));

  const sideBarItems = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
      path: '/supportx/dashboard',
      view: hasPermission('view:dashboard'),
    },
    {
      title: 'Tickets',
      key: 'tickets',
      icon: TicketsIcon,
      activeIcon: TicketsIconActive,
      path: '/supportx/tickets',
    },
    {
      title: 'Members',
      key: 'members',
      icon: UserIcon,
      activeIcon: UserIconActive,
      path: '/supportx/members',
      view: hasPermission('view:members'),
    },
    {
      title: User_Module_Name,
      key: 'users',
      icon: UserIcon,
      activeIcon: UserIconActive,
      path: `/supportx/${User_Route_Name}`,
      view: hasPermission('view:users'),
    },
    {
      title: hasPermission('chat:internal') ? 'Chat' : 'HelpDesk',
      key: 'chat',
      icon: hasPermission('chat:internal') ? ChatIcon : HelpDesk,
      activeIcon: hasPermission('chat:internal')
        ? ChatIconActive
        : HelpDeskActive,
      path: '/supportx/chat',
      view: hasPermission('view:chat'),
    },
    {
      title: 'Report Problem',
      key: 'incident',
      icon: Incident,
      activeIcon: IncidentActive,
      path: '/supportx/incident',
      view: hasPermission('create:incident'),
    },
    {
      title: Customer_Module_Name,
      key: 'customers',
      path: `/supportx/${Customer_Route_Name}`,
      icon: CustomerIcon,
      activeIcon: CustomerIcon,
      view: hasPermission('view:customer'),
    },
    { key: 'separator', isSeparator: true },
    {
      title: Project_Module_Name,
      key: 'projects',
      icon: ProjectIcon,
      activeIcon: ProjectIconActive,
      loading: projectStatus === 'loadingProjects',
      children: dynamicProjectsMenu,
      view: hasPermission('view:project'),
    },
    {
      title: `Create ${Project_Entity_Name}`,
      icon: PlusOutlined,
      activeIcon: PlusOutlined,
      key: 'create_project',
      path: `/supportx/${Project_Route_Name}/create-${Project_Route_Name}`,
      view: hasPermission('create:project'),
    },
    { key: 'separator-2', isSeparator: true },
    {
      title: 'Settings',
      key: 'setting',
      icon: SettingIcon,
      activeIcon: SettingIconActive,
      path: '/supportx/setting',
    },
    {
      title: <span className="logout">Logout</span>,
      key: 'logout',
      icon: LogoutIcon,
      activeIcon: LogoutIconActive,
      path: '#',
    },
  ];
  const selectedProject = dynamicProjectsMenu.find(
    (project) =>
      location.pathname === `/supportx/${Project_Route_Name}/${project.key}`
  );

  const selectedKey =
    selectedProject?.key ||
    sideBarItems.find((item) => location.pathname.includes(item.path))?.key ||
    '';

  const selectedKeys = selectedProject
    ? ['projects', selectedProject.key]
    : [selectedKey];

  return (
    <>
      <Sider
        style={{
          height: '100vh',
          position: 'fixed',
          zIndex: '999',
        }}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onCollapse}
        width={235}
        collapsedWidth={90}
        trigger={null}
        theme="light"
        className="sider"
      >
        <div className="sidebar-top">
          <img
            className="app-logo"
            src={isCollapsed ? LogoCollapse : AppLogo}
            alt="logo"
          />
          <img
            className={`bar-closer ${isCollapsed ? 'rotate' : ''}`}
            src={SideBarCloser}
            alt="close"
            onClick={() => onCollapse(!isCollapsed)}
          />
        </div>
        <StyledMenu>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={['projects']}
          >
            {sideBarItems
              .filter((item) => item.view !== false)
              .map((item) => {
                const isActive = selectedKeys.includes(item.key);

                if (item.isSeparator) {
                  return <Divider key={item.key} className="divider-line" />;
                }

                if (item.children) {
                  return (
                    <Menu.SubMenu
                      key={item.key}
                      title={
                        <span
                          style={{
                            display: 'flex',
                          }}
                        >
                          <img
                            style={{ marginRight: '5px' }}
                            src={isActive ? item.activeIcon : item.icon}
                            alt=""
                            className="menu-icon"
                          />
                          {!isCollapsed && item.title}
                        </span>
                      }
                    >
                      {!item.loading
                        ? item.children.map((child) => {
                            // const isChildActive = selectedKeys.includes(child.key);

                            return (
                              <Menu.Item
                                key={child.key}
                                style={{ paddingLeft: '45px' }}
                              >
                                <NavLink to={child.path}>
                                  {child.icon}
                                  {
                                    <span style={{ marginLeft: '8px' }}>
                                      {child.label}
                                    </span>
                                  }
                                </NavLink>
                              </Menu.Item>
                            );
                          })
                        : [1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              style={{
                                margin: '0px 10px',
                              }}
                            >
                              <ProjectSkeleton i={i} />
                            </div>
                          ))}
                    </Menu.SubMenu>
                  );
                }

                return (
                  <Menu.Item
                    key={item.key}
                    title={item.title}
                    icon={
                      <img
                        src={isActive ? item.activeIcon : item.icon}
                        alt=""
                        className={`menu-icon ${
                          item.key === 'logout' ? 'logout-icon' : ''
                        }`}
                      />
                    }
                    data-menu-key={item.key}
                    onClick={
                      item.key === 'logout' ? showLogoutModal : undefined
                    }
                  >
                    <NavLink to={item.path}>
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </Menu.Item>
                );
              })}
          </Menu>
        </StyledMenu>
      </Sider>

      <LogoutModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default SideBar;

const LogoutModal = ({ isModalVisible, handleOk, handleCancel }) => {
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <CustomButton variant="default" key="cancel" onClick={handleCancel}>
          Cancel
        </CustomButton>,
        <CustomButton key="logout" variant="danger" onClick={handleOk}>
          Logout
        </CustomButton>,
      ]}
      width={400}
      className="logout-modal"
      centered
    >
      <div className="logout-modal-content">
        <img src={LogoutIcon} alt="logout" className="logout-modal-icon" />
        <h3>Logout?</h3>
        <p>Are you sure you want to logout?</p>
      </div>
    </Modal>
  );
};

function ProjectSkeleton({ i }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginTop: i === 1 ? '8px' : '',
        marginBottom: '4px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingSkeleton
        num={1}
        styles={{
          height: '32px',
          width: '32px',
          borderRadius: '50%',
        }}
      />
      <LoadingSkeleton
        num={1}
        styles={{
          height: '16px',
          width: '110px',
        }}
      />
    </div>
  );
}
