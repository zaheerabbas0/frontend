import React from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import { DarkColor, White } from './CustomColors';

const StyledForm = styled(Form)`
  // .ant-input {
  //   padding: 3px 11px;
  //   font-size: 13.5px;
  //   line-height: 2;
  //   height: 34px;
  //   border-radius: 5px;
  // }

  .ant-input-outlined {
    background: #fafafa;
    border-width: 1.5px;
    border-color: #dfdfdf;
  }

  .ant-picker {
    font-size: 13.5px;
    line-height: 1.5;
    height: 42.5px;
    padding: 4px 11px;
    background: #fafafa;
    border-radius: 5px;
    font-family: Rubik;
  }

  .ant-select-outlined.ant-select-status-error:not(.ant-select-customize-input)
    .ant-select-selector {
    background: #fafafa;
  }

  .ant-form-item .ant-form-item-label > label {
    font-size: 14px;
  }

  .ant-form-item-label {
    padding-bottom: 0px !important;
    margin-top: 6px !important;
  }

  .ant-row.ant-form-item-row {
    gap: 2px !important;
  }

  .ant-form-item-required::before {
    margin-top: -10px;
  }

  .ant-form-item-required {
    flex-direction: row-reverse;
  }

  .ant-form-item-control {
    // margin-top: 10px !important;
  }

  .ant-form-item-required::after {
    width: 0;
    margin: 1px !important;
  }

  .ant-picker:hover {
    box-shadow: none !important;
    outline: none !important;
    border: 1px solid ${DarkColor};
  }

  .ant-picker-suffix {
    color: ${DarkColor};
  }

  .anticon-user {
    color: ${DarkColor};
  }

  .anticon-plus {
    color: ${White};
    background: ${DarkColor};
  }

  .ant-form-item .ant-form-item-explain-error {
    // margin-top: 8px;
  }

  .ant-select-single {
    height: 41.5px;
  }

  .ant-select-multiple {
    font-size: 13.5px;
  }

  .ant-switch {
    margin-top: 22px;
  }
`;

const CustomForm = ({ children, className, ...props }) => {
  return (
    <StyledForm className={className} {...props}>
      {children}
    </StyledForm>
  );
};

export default CustomForm;
