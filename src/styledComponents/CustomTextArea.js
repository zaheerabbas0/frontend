import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { DarkColor } from './CustomColors';

const { TextArea } = Input;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  height: ${({ height }) => height || '90px'} !important;
  font-size: ${({ fontSize }) => fontSize || '13.5px'};
  position: ${({ position }) => position || ''};
  resize: none !important;

  &:hover {
    border-color: ${DarkColor};
  }

  &:focus {
    border-color: ${DarkColor};
    box-shadow: none;
  }
`;

const CustomTextArea = ({ ...props }) => {
  return <StyledTextArea {...props} />;
};

export default CustomTextArea;
