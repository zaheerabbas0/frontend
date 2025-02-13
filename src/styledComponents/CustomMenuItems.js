import styled from 'styled-components';
import { LightColor, DarkColor, Red } from './CustomColors';

export const StyledMenu = styled.div`
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu-item-selected {
    background-color: ${LightColor};
    color: ${DarkColor};
    font-weight: bold !important;
  }

  .ant-menu-item:hover .menu-icon,
  .ant-menu-item-active .menu-icon,
  .ant-menu-item-selected .menu-icon {
    filter: invert(58%) sepia(95%) saturate(274%) hue-rotate(64deg)
      brightness(92%) contrast(92%);
  }

  .ant-menu-item[data-menu-key='logout'] .menu-icon {
    filter: none;
    color: ${Red};
  }
  .ant-menu-light .ant-menu-submenu-selected > .ant-menu-submenu-title,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-menu-light
    > .ant-menu
    .ant-menu-submenu-selected
    > .ant-menu-submenu-title {
    color: ${DarkColor};
    font-weight: bold !important;
  }
  .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-submenu-title:active,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-menu-light
    > .ant-menu:not(.ant-menu-horizontal)
    .ant-menu-submenu-title:active {
    background-color: ${LightColor};
  }

  .ant-menu-light .ant-menu-item-selected a,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-menu-light
    > .ant-menu
    .ant-menu-item-selected
    a,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-menu-light
    .ant-menu-item-selected
    a:hover,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-menu-light
    > .ant-menu
    .ant-menu-item-selected
    a:hover {
    color: ${DarkColor};
    background: ${LightColor};
  }
  .ant-menu-inline .ant-menu-sub.ant-menu-inline {
    max-height: 250px !important;
    overflow-y: auto !important;
  }
  .ant-menu-light .ant-menu-item {
    padding: 5px 0px 0px 30px;
  }
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 7px 0px 0px 30px;
  }
  /* .ant-menu-light > .ant-menu .ant-menu-item-selected {
    background-color: #effae4;
    font-weight: bold;
  }
  .ant-menu-light .ant-menu-item-selected,
  .ant-menu-light > .ant-menu .ant-menu-item-selected {
    color: #229849;
  }
  .ant-menu-light .ant-menu-item-selected,
  .ant-menu-light > .ant-menu .ant-menu-item:focus {
    background-color: #229849;
  }
  .ant-menu-submenu-popup
    .ant-menu-vertical.ant-menu-sub:not([class*="-active"]) {
    max-height: 50vh;
  } */

  .ant-menu-sub::-webkit-scrollbar {
    width: 5px;
  }

  .ant-menu-sub::-webkit6scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
