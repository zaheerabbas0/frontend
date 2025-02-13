import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import { DarkColor } from './CustomColors';

const StyledTabs = styled(Tabs)`
  // overflow: auto;
  width: 100%;
  height: 52%;
  .ant-tabs-nav {
    background-color: ${(props) => props.theme.colors.background};
  }
  .ant-tabs-nav-list {
    padding-left: 8px;
    background-color: ${(props) => props.theme.colors.background};
    width: 100%;
  }
  .ant-tabs-content-holder {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .ant-tabs-content-holder::-webkit-scrollbar {
    display: none;
  }
  .ant-tabs-content {
    height: 100%;
  }

  .ant-tabs-tab {
    padding: 8px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.text};

    &:hover {
      color: ${DarkColor};
      overflow: hidden !important;

      .ant-tabs-tab-btn img {
        filter: brightness(0) saturate(100%) invert(38%) sepia(66%)
          saturate(586%) hue-rotate(91deg) brightness(90%) contrast(89%) !important;
      }
    }

    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${DarkColor};
      overflow: hidden !important;

      img {
        filter: brightness(0) saturate(100%) invert(38%) sepia(66%)
          saturate(586%) hue-rotate(91deg) brightness(90%) contrast(89%) !important;
      }
    }

    .ant-tabs-tab-btn:active {
      color: ${DarkColor};
    }
  }
  .ant-tabs-tab img {
    transition: filter 0.3s ease;
  }
`;

const CustomTabs = ({ children, styles, ...props }) => {
  return (
    <StyledTabs {...props} style={styles}>
      {children}
    </StyledTabs>
  );
};

export default CustomTabs;
