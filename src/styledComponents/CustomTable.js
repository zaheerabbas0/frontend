import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { DarkColor, LightColor, White } from './CustomColors';

const StyledTable = styled(Table)`
  .ant-table-thead th {
    background: ${(props) => props.theme.colors.background};
    .ant-table-column-title {
      color: ${(props) => props.theme.colors.text};
    }
  }
  .ant-table-tbody > tr > td {
    padding: 3px !important;
    border-bottom: 1px solid #e3e3e3;
    background: ${(props) => props.theme.colors.background};
  }
  .ant-table-row {
    height: 70px;
  }
  .ant-table.ant-table-small {
    font-size: 13px !important;
  }

  .ant-table-selection .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: ${DarkColor};
  }

  .ant-table-wrapper td.ant-table-column-sort {
    background: ${LightColor};
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox-wrapper .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${DarkColor};
    border-color: ${DarkColor};
  }

  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: ${LightColor};
  }

  .ant-pagination-item-active a {
    color: ${White};
    border-radius: 3px;
  }

  .ant-pagination-item a:hover {
    color: ${White};
  }

  .ant-table-wrapper .ant-table-column-sorter-up.active {
    color: ${DarkColor};
  }

  .ant-table-wrapper .ant-table-column-sorter-down.active {
    color: ${DarkColor};
  }

  .ant-table-wrapper .ant-table-filter-trigger.active {
    color: ${DarkColor};
  }
  .ant-pagination-item {
    color: ${White};
    outline: none;
    border: none;
    background-color: ${DarkColor};
    border-radius: 5px;
  }

  .ant-table-body {
    scrollbar-width: thin;
    /* scrollbar-color: ${DarkColor} ${LightColor}; */
  }

  .ant-table-tbody > tr:nth-child(even) {
    background-color: ${White};
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #fafafa;
  }

  .ant-table-pagination {
    gap: 5px;
  }
  /* .ant-table-tbody > tr:hover > td {
    background-color: ${LightColor};
  } */
`;

const CustomTable = ({ ...props }) => {
  return <StyledTable {...props} />;
};

export default CustomTable;
