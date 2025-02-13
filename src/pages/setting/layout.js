import { Layout, Menu } from 'antd';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SettingIcon from '../../assets/SettingIcon.svg';
import SettingIconActive from '../../assets/SettingIconActive.svg';
import AccountSettingIcon from '../../assets/icons/AccountSetting.svg';
import AccountSettingIconActive from '../../assets/icons/AccountSettingActiveIcon.svg';
import { StyledMenu } from '../../styledComponents/CustomMenuItems';
import { Container } from '../../styledComponents/CustomCard';
import { hasPermission } from '../../constants/UsersRole';

const { Sider, Content } = Layout;

const SettingLayout = () => {
  return (
    <Container style={{ height: '100%' }}>
      <Layout style={{ height: '100%', gap: '10px' }}>
        <SettingSider />
        <Content style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Outlet />
        </Content>
      </Layout>
    </Container>
  );
};

const SettingSider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sideBarItems = [
    {
      title: 'Account Setting',
      key: 'account',
      icon: AccountSettingIcon,
      activeIcon: AccountSettingIconActive,
      path: '',
    },
    {
      title: 'System Setting',
      key: 'system',
      icon: SettingIcon,
      activeIcon: SettingIconActive,
      path: 'system',
      view: hasPermission('view:systemSetting'),
      children: [
        {
          title: 'Category',
          key: 'category',
          path: 'system/category',
        },
        {
          title: 'Tags',
          key: 'tags',
          path: 'system/tags',
        },
        {
          title: 'Priority',
          key: 'priority',
          path: 'system/priority',
        },
        {
          title: 'Skills',
          key: 'skills',
          path: 'system/skills',
        },
        {
          title: 'Groups',
          key: 'groups',
          path: 'system/groups',
        },
      ],
    },
    // {
    //   title: 'Users',
    //   key: 'users',
    //   icon: UserIcon,
    //   activeIcon: UserIconActive,
    //   path: 'security',
    //   view: hasPermission('view:users'),
    // },
  ];

  const selectedKey =
    false ||
    sideBarItems.find((item) => location.pathname.includes(item.path))?.key ||
    '';

  const selectedKeys = false ? ['projects', 'account'] : [selectedKey];

  return (
    <Sider width="16%" theme="light">
      <StyledMenu>
        <Menu
          mode="inline"
          defaultSelectedKeys={'account'}
          // defaultOpenKeys={['projects']}
        >
          {sideBarItems
            .filter((item) => item.view !== false)
            .map((item) => {
              const isActive = location.pathname.includes(item?.path);

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
                        {item.title}
                      </span>
                    }
                  >
                    {item.children.map((child) => {
                      // const isChildActive = selectedKeys.includes(child.key);

                      return (
                        <Menu.Item
                          key={child.key}
                          style={{ paddingLeft: '35px', maxHeight: '30px' }}
                        >
                          <NavLink to={child.path}>
                            <span style={{ marginLeft: '8px' }}>
                              {child.title}
                            </span>
                          </NavLink>
                        </Menu.Item>
                      );
                    })}
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
                  //   onClick={item.key === 'logout' ? showLogoutModal : undefined}
                >
                  <NavLink to={item.path}>
                    <span>{item.title}</span>
                  </NavLink>
                </Menu.Item>
              );
            })}
        </Menu>
      </StyledMenu>
    </Sider>
  );
};

export default SettingLayout;
