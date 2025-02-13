import React from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import { DarkColor } from './CustomColors';

const StyledDatePicker = styled(DatePicker)`
  .ant-picker-dropdown
    .ant-picker-cell-in-view.ant-picker-cell-today
    .ant-picker-cell-inner::before {
    border: 1px solid ${DarkColor};
    border-radius: 4px;
  }

  .ant-picker-dropdown
    .ant-picker-cell-in-view.ant-picker-cell-range-end:not(
      .ant-picker-cell-disabled
    )
    .ant-picker-cell-inner {
    color: #fff;
    background: #67ff16;
  }
  .ant-picker-dropdown
    .ant-picker-cell-in-view.ant-picker-cell-selected:not(
      .ant-picker-cell-disabled
    )
    .ant-picker-cell-inner {
    color: #fff;
    background: #229849;
  }
  .ant-btn-primary {
    background: #28951e;
  }
  .ant-picker-dropdown
    .ant-picker-time-panel-column
    > li.ant-picker-time-panel-cell-selected
    .ant-picker-time-panel-cell-inner {
    background: #cefdcd;
  }

  a {
    color: ${DarkColor};
  }
`;

const CustomDate = () => {
  return <StyledDatePicker />;
};

export default CustomDate;
