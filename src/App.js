import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './components/sideBar/Sidebar';
import NavBar from './components/navBar/NavBar';
import './App.css';
import { ThemeProvider } from './styledComponents/themeContext';

const { Content } = Layout;

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isAuthenticated = localStorage.getItem('access_token');

  const excludedPaths = ['/', '/signup', '/forgot-password', '/set-password'];

  const shouldRenderSideNav =
    isAuthenticated && !excludedPaths.includes(currentPath);
  const shouldRenderTopNav =
    isAuthenticated && !excludedPaths.includes(currentPath);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768; // Adjust this breakpoint as needed
      setIsSmallScreen(isSmall);

      // Automatically collapse the sidebar for small screens
      if (isSmall) {
        setIsCollapsed(true);
      } else {
        // Restore the previous state for larger screens
        const collapsedState = localStorage.getItem('sidebarCollapsed');
        setIsCollapsed(
          collapsedState !== null ? JSON.parse(collapsedState) : false
        );
      }
    };

    // Initialize the state based on the current window size
    handleResize();

    // Attach the resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
    if (!isSmallScreen) {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
    }
  };

  return (
    <ThemeProvider>
      <Layout style={{ minHeight: '100vh' }}>
        {shouldRenderSideNav && (
          <SideBar isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        )}
        <Layout>
          {shouldRenderTopNav && <NavBar isCollapsed={isCollapsed} />}
          <Content
            style={{ background: 'black' }}
            id="main-container"
            className={`app-content ${excludedPaths.includes(currentPath) ? 'login-page' : ''} ${
              isCollapsed ? 'collapsed' : ''
            }`}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
