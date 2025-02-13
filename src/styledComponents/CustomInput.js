import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { DarkColor } from './CustomColors';

const StyledInput = styled(Input)`
  && {
    font-size: 13.5px !important;
    height: 42px !important;
    &:hover,
    &:focus {
      border: 1px solid ${DarkColor};
      overflow: hidden !important;
      box-shadow: none !important;
      outline: ${DarkColor} !important;
    }
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  && {
    font-size: 13.5px !important;
    height: 42px !important;
    padding-top: 2px !important;
    &:hover,
    &:focus {
      border: 1px solid ${DarkColor};
      overflow: hidden !important;
      box-shadow: none !important;
      outline: ${DarkColor} !important;
    }
  }
`;

const CustomInput = ({ className, ...rest }) => {
  return <StyledInput className={className} {...rest} />;
};

const CustomPasswordInput = ({ className, ...rest }) => {
  return <StyledPasswordInput className={className} {...rest} />;
};

export { CustomInput, CustomPasswordInput };
